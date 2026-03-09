import type { VueCodeInformation, VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import type { EnhancedMapping } from 'slime-generator'
import Glog from 'glogjs'

const PLUGIN_VERSION = '4.2.0-testts-parseSFC2-ts-then-resolve-merge'

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

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

type SlimeTransformResult = {
  code: string
  mapping: EnhancedMapping[]
}

type ReplacementItem = {
  sourceName: 'script' | 'scriptSetup'
  transformed: SlimeTransformResult
}

type Segment = string | [string, string, number, VueCodeInformation]

const ALL_CODE_FEATURES: VueCodeInformation = {
  verification: true,
  completion: true,
  semantic: true,
  navigation: true,
}

const fileReplacementCache = new Map<string, ReplacementItem[]>()

function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  return block?.lang === 'testts' || block?.attrs?.lang === 'testts'
}

function createIdentityResult(sourceCode: string): SlimeTransformResult {
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

function removeWhitespace(text: string): string {
  return text.replace(/\s+/g, '')
}

function isSubsequence(needle: string, haystack: string): boolean {
  if (needle.length === 0) return true
  let i = 0
  for (let j = 0; j < haystack.length; j++) {
    if (haystack[j] === needle[i]) i++
    if (i === needle.length) return true
  }
  return false
}

function hasTokenLoss(sourceCode: string, generatedCode: string): boolean {
  const sourceNoWs = removeWhitespace(sourceCode)
  const generatedNoWs = removeWhitespace(generatedCode)
  return !isSubsequence(sourceNoWs, generatedNoWs)
}

type ParsedTokenLike = {
  codeIndex?: number
  tokenValue?: string
}

function getConsumedRanges(parsedTokens: unknown[]): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = []

  for (const token of parsedTokens) {
    const t = token as ParsedTokenLike | undefined
    if (!t || typeof t.codeIndex !== 'number' || typeof t.tokenValue !== 'string') continue
    if (t.tokenValue.length === 0) continue
    ranges.push({ start: t.codeIndex, end: t.codeIndex + t.tokenValue.length })
  }

  ranges.sort((a, b) => a.start - b.start)
  const merged: Array<{ start: number; end: number }> = []
  for (const range of ranges) {
    const last = merged[merged.length - 1]
    if (!last || range.start > last.end) {
      merged.push({ ...range })
      continue
    }
    last.end = Math.max(last.end, range.end)
  }
  return merged
}

function hasUnconsumedNonWhitespace(sourceCode: string, parsedTokens: unknown[]): boolean {
  const ranges = getConsumedRanges(parsedTokens)
  let rangeIndex = 0

  for (let i = 0; i < sourceCode.length; i++) {
    const ch = sourceCode[i]
    if (/\s/.test(ch)) continue

    while (rangeIndex < ranges.length && ranges[rangeIndex].end <= i) {
      rangeIndex++
    }

    const current = ranges[rangeIndex]
    const covered = current && i >= current.start && i < current.end
    if (!covered) return true
  }

  return false
}

function transformTesttsToTs(sourceCode: string): SlimeTransformResult {
  try {
    const parser = new SlimeParser(sourceCode)
    const cst = parser.Program()
    const ast = SlimeCstToAstUtils.toProgram(cst)
    const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
    const generatedCode = generated.code as string

    const parserDroppedTokens = hasUnconsumedNonWhitespace(sourceCode, parser.parsedTokens as unknown[])
    const generatorDroppedChars = hasTokenLoss(sourceCode, generatedCode)
    if (parserDroppedTokens || generatorDroppedChars) {
      Glog.warn(
        `[testts][transform] token loss detected, fallback to identity; parserDropped=${String(parserDroppedTokens)}, generatorDropped=${String(generatorDroppedChars)}`
      )
      return createIdentityResult(sourceCode)
    }

    return {
      code: generatedCode,
      mapping: SlimeMappingConverter.convertMappings((generated as any).mapping),
    }
  } catch (error) {
    Glog.warn(`[testts][transform] exception fallback to identity: ${String(error)}`)
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
  const sourceBlockNames = new Set<string>()
  let tupleCount = 0

  for (const segment of baseContent) {
    const isTupleSegment = Array.isArray(segment)
    if (isTupleSegment) tupleCount++
    const sourceBlockName = isTupleSegment ? segment[1] : undefined
    if (typeof sourceBlockName === 'string') sourceBlockNames.add(sourceBlockName)

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

  Glog.info(
    `[testts][merge] baseSegments=${baseContent.length}, tupleSegments=${tupleCount}, sourceBlocks=${Array.from(sourceBlockNames).join(',')}, replacementKeys=${Array.from(replacements.keys()).join(',')}, injectedKeys=${Array.from(injectedBySource).join(',')}`
  )

  const uninjected = Array.from(replacements.keys()).filter(key => !injectedBySource.has(key))
  if (uninjected.length) {
    Glog.warn(`[testts][merge] replacements not injected: ${uninjected.join(',')}`)
  }

  return merged
}

const plugin: VueLanguagePlugin = ({ modules }) => {
  const ts = modules.typescript
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  Glog.info('[language-plugin-testts] mode=parseSFC2_lang_to_ts_then_resolve_merge')

  return [
    {
      name: 'language-plugin-testts-parse',
      version: 2.2,
      order: -10000,

      parseSFC2(fileName, languageId, content) {
        if (languageId !== 'vue') return

        const sfc = parseSfc(content) as ParsedSfcLike
        const replacements: ReplacementItem[] = []
        const scriptSetup = sfc.descriptor.scriptSetup
        const script = sfc.descriptor.script

        if (isTesttsScriptBlock(scriptSetup)) {
          const source = scriptSetup?.content as string
          const transformed = transformTesttsToTs(source)
          scriptSetup!.content = transformed.code
          scriptSetup!.lang = 'ts'
          scriptSetup!.attrs = { ...(scriptSetup!.attrs || {}), lang: 'ts' }
          replacements.push({ sourceName: 'scriptSetup', transformed })
        }

        if (isTesttsScriptBlock(script)) {
          const source = script?.content as string
          const transformed = transformTesttsToTs(source)
          script!.content = transformed.code
          script!.lang = 'ts'
          script!.attrs = { ...(script!.attrs || {}), lang: 'ts' }
          replacements.push({ sourceName: 'script', transformed })
        }

        if (replacements.length === 0) {
          fileReplacementCache.delete(fileName)
          return
        }

        fileReplacementCache.set(fileName, replacements)
        Glog.info(
          `[testts][parse] file=${fileName}, replacements=${replacements.map(item => item.sourceName).join(',')}, cacheSize=${fileReplacementCache.size}`
        )
        return sfc as any
      },
    },
    {
      name: 'language-plugin-testts-resolve',
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

        const baseContent = embeddedFile.content as any[]
        const baseTupleSourceBlocks = Array.from(new Set(
          baseContent
            .filter(item => Array.isArray(item) && typeof item[1] === 'string')
            .map(item => item[1] as string)
        ))
        Glog.info(
          `[testts][resolve] file=${fileName}, baseSegments=${baseContent.length}, baseTupleBlocks=${baseTupleSourceBlocks.join(',')}, replacementKeys=${Array.from(replacements.keys()).join(',')}`
        )

        const mergedContent = mergeReplacementsIntoContent(baseContent, replacements)
        embeddedFile.content = mergedContent as any

        Glog.info(`[testts][resolve] mergedSegments=${mergedContent.length}`)
      },
    },
  ]
}

export default plugin
