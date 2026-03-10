import type { VueCodeInformation, VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import { transformCssTs, CsstsInit, writeAtomUsedDts, RuntimeStore } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import type { EnhancedMapping } from 'slime-generator'
import Glog from 'glogjs'
import fs from 'node:fs'
import path from 'node:path'

const PLUGIN_VERSION = '4.2.1-cssts-parseSFC2-ts-then-resolve-merge'

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-cssts v${PLUGIN_VERSION}] initialized`)

type SfcScriptLike = {
  name?: string
  lang?: string
  attrs?: Record<string, string | true>
  content?: string
}

type ParsedSfcLike = {
  descriptor: {
    script?: SfcScriptLike | null
    scriptSetup?: SfcScriptLike | null
  }
}

type CsstsTransformResult = {
  code: string
  mapping: EnhancedMapping[]
}

type ReplacementItem = {
  sourceName: 'script' | 'scriptSetup'
  transformed: CsstsTransformResult
}

type Segment = string | [string, string, number, VueCodeInformation]

const ALL_CODE_FEATURES: VueCodeInformation = {
  verification: true,
  completion: true,
  semantic: true,
  navigation: true,
}

const fileReplacementCache = new Map<string, ReplacementItem[]>()

function resolveDtsOutputDir(): string {
  let current = process.cwd()
  while (true) {
    const candidate = path.resolve(current, 'node_modules/@types/cssts-ts')
    if (fs.existsSync(candidate)) {
      return candidate
    }
    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }

  return path.resolve(process.cwd(), 'node_modules/@types/cssts-ts')
}

function isCsstsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  return block?.lang === 'cssts' || block?.attrs?.lang === 'cssts'
}

function createIdentityResult(sourceCode: string): CsstsTransformResult {
  return {
    code: sourceCode,
    mapping: [
      {
        original: { offset: 0, length: sourceCode.length },
        generated: { offset: 0, length: sourceCode.length },
      },
    ],
  }
}

function transformCsstsToTs(sourceCode: string): CsstsTransformResult {
  try {
    const transformed = transformCssTs(sourceCode)
    const generatedCode = typeof transformed?.code === 'string' ? transformed.code : ''
    const rawMappings = Array.isArray((transformed as any)?.mapping) ? (transformed as any).mapping : []

    if (!generatedCode.length || !rawMappings.length) {
      Glog.warn('[cssts][transform] empty transform output, fallback to identity')
      return createIdentityResult(sourceCode)
    }

    const mapping = SlimeMappingConverter.convertMappings(rawMappings) as EnhancedMapping[]
    if (!mapping.length) {
      Glog.warn('[cssts][transform] empty converted mapping, fallback to identity')
      return createIdentityResult(sourceCode)
    }

    return {
      code: generatedCode,
      mapping,
    }
  } catch (error) {
    Glog.warn(`[cssts][transform] exception fallback to identity: ${String(error)}`)
    return createIdentityResult(sourceCode)
  }
}

function buildSegmentsFromMapping(
  generatedCode: string,
  mapping: EnhancedMapping[],
  sourceName: string
): Segment[] {
  const segments: Segment[] = []
  const sorted = [...mapping].sort((a, b) => a.generated.offset - b.generated.offset)
  let cursor = 0

  for (const item of sorted) {
    const generatedStart = item.generated.offset
    const generatedEnd = item.generated.offset + item.generated.length
    const sourceStart = item.original.offset
    const gap = generatedCode.slice(cursor, generatedStart)
    const mapped = generatedCode.slice(generatedStart, generatedEnd)

    if (gap) segments.push(gap)
    segments.push([mapped, sourceName, sourceStart, ALL_CODE_FEATURES])
    cursor = generatedEnd
  }

  const tail = generatedCode.slice(cursor)
  if (tail) segments.push(tail)
  return segments
}

function mergeReplacementsIntoContent(baseContent: any[], replacements: Map<string, Segment[]>): any[] {
  const merged: any[] = []
  const injectedBySource = new Set<string>()

  for (const segment of baseContent) {
    const sourceBlockName = Array.isArray(segment) ? segment[1] : undefined
    const replacement = typeof sourceBlockName === 'string' ? replacements.get(sourceBlockName) : undefined

    if (replacement) {
      if (!injectedBySource.has(sourceBlockName)) {
        merged.push(...replacement)
        injectedBySource.add(sourceBlockName)
      }
      continue
    }

    merged.push(segment)
  }

  return merged
}

const plugin: VueLanguagePlugin = ({ modules }) => {
  const ts = modules.typescript
  Glog.info(`[language-plugin-cssts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  Glog.info('[language-plugin-cssts] mode=parseSFC2_lang_to_ts_then_resolve_merge')

  // Hardcoded language-plugin settings (not overridden by tsconfig plugin options).
  const dtsEnabled = true
  const dtsOutputDir = resolveDtsOutputDir()
  const autoUpdateAtomUsedDts = true

  fs.mkdirSync(dtsOutputDir, { recursive: true })

  // Initialize runtime atom registry for language-service transforms.
  // This is not the Vite runtime, keep Vite mode off.
  CsstsInit.setViteEnvironment(false)
  CsstsInit.init({
    dtsOutputDir,
  })

  function refreshAtomUsedDts() {
    if (!dtsEnabled || !autoUpdateAtomUsedDts) return
    try {
      writeAtomUsedDts(dtsOutputDir)
      Glog.info(`[cssts] Updated atomUsedCssts.d.ts with ${RuntimeStore.getUsedStyles().size} styles`)
    } catch (error) {
      Glog.warn(`[cssts] Failed to update atomUsedCssts.d.ts: ${String(error)}`)
    }
  }

  return [
    {
      name: 'language-plugin-cssts-parse',
      version: 2.2,
      order: -10000,

      parseSFC2(fileName, languageId, content) {
        if (languageId !== 'vue') return

        const sfc = parseSfc(content) as ParsedSfcLike
        const replacements: ReplacementItem[] = []
        const scriptSetup = sfc.descriptor.scriptSetup
        const script = sfc.descriptor.script

        if (isCsstsScriptBlock(scriptSetup)) {
          const source = scriptSetup?.content as string
          const transformed = transformCsstsToTs(source)
          scriptSetup!.content = transformed.code
          scriptSetup!.lang = 'ts'
          scriptSetup!.attrs = { ...(scriptSetup!.attrs || {}), lang: 'ts' }
          replacements.push({ sourceName: 'scriptSetup', transformed })
        }

        if (isCsstsScriptBlock(script)) {
          const source = script?.content as string
          const transformed = transformCsstsToTs(source)
          script!.content = transformed.code
          script!.lang = 'ts'
          script!.attrs = { ...(script!.attrs || {}), lang: 'ts' }
          replacements.push({ sourceName: 'script', transformed })
        }

        if (replacements.length === 0) {
          fileReplacementCache.delete(fileName)
          return
        }

        // Keep IDE hint module in sync with transformed used atoms.
        refreshAtomUsedDts()

        fileReplacementCache.set(fileName, replacements)
        Glog.info(
          `[cssts][parse] file=${fileName}, replacements=${replacements.map(item => item.sourceName).join(',')}, cacheSize=${fileReplacementCache.size}`
        )
        return sfc as any
      },
    },
    {
      name: 'language-plugin-cssts-resolve',
      version: 2.2,
      order: 10000,

      resolveEmbeddedCode(fileName, _sfc, embeddedFile) {
        if (embeddedFile.id !== 'script_ts') return

        const replacementItems = fileReplacementCache.get(fileName)
        if (!replacementItems?.length) return

        const replacements = new Map<string, Segment[]>()
        for (const item of replacementItems) {
          replacements.set(
            item.sourceName,
            buildSegmentsFromMapping(item.transformed.code, item.transformed.mapping, item.sourceName)
          )
        }

        const mergedContent = mergeReplacementsIntoContent(embeddedFile.content as any[], replacements)
        embeddedFile.content = mergedContent as any

        Glog.info(`[cssts][resolve] file=${fileName}, mergedSegments=${mergedContent.length}`)
      },
    },
  ]
}

export default plugin
