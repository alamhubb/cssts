import type { VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import Glog from 'glogjs'

const PLUGIN_VERSION = '3.0.0-testts-parseSFC2-transform-only'

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

type SfcScriptLike = {
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

function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  if (!block) return false
  if (block.lang === 'testts') return true
  return block.attrs?.lang === 'testts'
}

function transformTesttsToTs(sourceCode: string): string {
  if (sourceCode.endsWith('\n')) {
    return `${sourceCode}\n;`
  }
  return `${sourceCode}\n\n;`
}

function patchSfcForVolar(sfc: ParsedSfcLike): { patched: boolean, transformedBlocks: number } {
  let patched = false
  let transformedBlocks = 0
  const blocks = [sfc.descriptor.script, sfc.descriptor.scriptSetup]

  for (const block of blocks) {
    if (!isTesttsScriptBlock(block)) continue

    const sourceCode = typeof block?.content === 'string' ? block.content : ''
    const transformedCode = transformTesttsToTs(sourceCode)
    if (block) {
      block.content = transformedCode
      if (block.lang !== 'ts') {
        block.lang = 'ts'
      }
      patched = true
      transformedBlocks++
    }
  }

  return { patched, transformedBlocks }
}

const plugin: VueLanguagePlugin = ({ modules }) => {
  const ts = modules.typescript
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  Glog.info('[language-plugin-testts] mode=parseSFC2_transform_only (stable path)')

  return {
    name: 'language-plugin-testts',
    version: 2.2,
    order: -10000,

    parseSFC2(fileName, languageId, content) {
      if (languageId !== 'vue') return

      const sfc = parseSfc(content) as ParsedSfcLike
      const result = patchSfcForVolar(sfc)
      if (!result.patched) return

      Glog.info(
        `[testts] parseSFC2 transformed: file=${fileName}, blocks=${result.transformedBlocks}`
      )
      return sfc
    },
  }
}

export default plugin
