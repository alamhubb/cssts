import type { VueCodeInformation, VueLanguagePlugin } from '@vue/language-core'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import type { EnhancedMapping } from 'slime-generator'
import Glog from 'glogjs'

const PLUGIN_VERSION = '4.0.0-testts-resolveEmbeddedCode-script_ts-mapping'

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

type SfcScriptLike = {
  name?: string
  lang?: string
  attrs?: Record<string, string | true>
  content?: string
}

type SfcLike = {
  script?: SfcScriptLike | null
  scriptSetup?: SfcScriptLike | null
}

type SlimeTransformResult = {
  code: string
  mapping: EnhancedMapping[]
}

function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  if (!block) return false
  if (block.lang === 'testts') return true
  return block.attrs?.lang === 'testts'
}

function transformTesttsToTs(sourceCode: string): SlimeTransformResult {
  const parser = new SlimeParser(sourceCode)
  const cst = parser.Program()
  const ast = SlimeCstToAstUtils.toProgram(cst)
  const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
  const transformedCode = typeof generated.code === 'string' ? generated.code : sourceCode
  const transformedMapping = Array.isArray((generated as any).mapping)
    ? SlimeMappingConverter.convertMappings((generated as any).mapping)
    : []
  return {
    code: transformedCode,
    mapping: transformedMapping,
  }
}

const ALL_CODE_FEATURES: VueCodeInformation = {
  verification: true,
  completion: true,
  semantic: true,
  navigation: true,
}

function buildSegmentsFromMapping(
  generatedCode: string,
  mapping: EnhancedMapping[],
  sourceName: string
): (string | [string, string, number, VueCodeInformation])[] {
  const segments: (string | [string, string, number, VueCodeInformation])[] = []
  const sorted = mapping
    .filter(item => {
      const sourceStart = item.original?.offset
      const generatedStart = item.generated?.offset
      const generatedLength = item.generated?.length
      return (
        typeof sourceStart === 'number' &&
        sourceStart >= 0 &&
        typeof generatedStart === 'number' &&
        generatedStart >= 0 &&
        typeof generatedLength === 'number' &&
        generatedLength > 0
      )
    })
    .sort((a, b) => (a.generated.offset - b.generated.offset))

  let cursor = 0
  for (const item of sorted) {
    const sourceStart = item.original.offset
    const generatedStart = item.generated.offset
    const generatedEnd = generatedStart + item.generated.length

    if (generatedStart < cursor) {
      continue
    }
    if (generatedStart > cursor) {
      segments.push(generatedCode.slice(cursor, generatedStart))
    }

    const mappedText = generatedCode.slice(generatedStart, generatedEnd)
    if (mappedText.length > 0) {
      segments.push([mappedText, sourceName, sourceStart, ALL_CODE_FEATURES])
    }
    cursor = generatedEnd
  }

  if (cursor < generatedCode.length) {
    segments.push(generatedCode.slice(cursor))
  }

  if (segments.length === 0) {
    segments.push([generatedCode, sourceName, 0, ALL_CODE_FEATURES])
  }

  return segments
}

function getPrimaryTesttsBlock(sfc: SfcLike): SfcScriptLike | undefined {
  if (isTesttsScriptBlock(sfc.scriptSetup)) return sfc.scriptSetup ?? undefined
  if (isTesttsScriptBlock(sfc.script)) return sfc.script ?? undefined
  return undefined
}

const plugin: VueLanguagePlugin = ({ modules }) => {
  const ts = modules.typescript
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  Glog.info('[language-plugin-testts] mode=resolveEmbeddedCode_script_ts_with_mapping')

  return {
    name: 'language-plugin-testts',
    version: 2.2,
    order: 10000,

    compileSFCScript(lang, script) {
      if (lang !== 'testts') return

      try {
        const transformed = transformTesttsToTs(script)
        return ts.createSourceFile('.ts', transformed.code, 99)
      } catch (error: any) {
        const message = error?.message || String(error)
        Glog.warn(`[testts] compileSFCScript transform failed, fallback ts parser: error=${message}`)
        return ts.createSourceFile('.ts', script, 99)
      }
    },

    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      if (embeddedFile.id !== 'script_ts') return

      const target = getPrimaryTesttsBlock(sfc as SfcLike)
      if (!target) return

      const sourceCode = typeof target.content === 'string' ? target.content : ''
      const sourceName = target.name || (target === (sfc as SfcLike).scriptSetup ? 'scriptSetup' : 'script')

      try {
        const transformed = transformTesttsToTs(sourceCode)
        const segments = buildSegmentsFromMapping(transformed.code, transformed.mapping, sourceName)
        embeddedFile.content = segments as any
        Glog.info(
          `[testts] resolveEmbeddedCode(script_ts) transformed: file=${fileName}, source=${sourceName}, codeLen=${transformed.code.length}, mapTokens=${transformed.mapping.length}`
        )
      } catch (error: any) {
        const message = error?.message || String(error)
        embeddedFile.content = [[sourceCode, sourceName, 0, ALL_CODE_FEATURES]] as any
        Glog.warn(
          `[testts] resolveEmbeddedCode(script_ts) transform failed, fallback identity: file=${fileName}, source=${sourceName}, error=${message}`
        )
      }
    },
  }
}

export default plugin
