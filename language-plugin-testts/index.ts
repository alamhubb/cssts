import type { VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import Glog from 'glogjs'

const PLUGIN_VERSION = '1.0.19-parse-descriptor-only'

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

type SfcScriptLike = {
    lang?: string
    attrs?: Record<string, string | true>
}

type ParsedSfcLike = {
    descriptor: {
        script?: SfcScriptLike | null
        scriptSetup?: SfcScriptLike | null
    }
}

type BlockSnapshot = {
    exists: boolean
    lang?: string
    attrsLang?: string | true
}

function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
    if (!block) return false
    if (block.lang === 'testts') return true
    return block.attrs?.lang === 'testts'
}

function patchSfcScriptLangForVolar(sfc: ParsedSfcLike): boolean {
    let patched = false
    const blocks = [sfc.descriptor.script, sfc.descriptor.scriptSetup]
    for (const block of blocks) {
        if (!isTesttsScriptBlock(block)) {
            continue
        }
        if (block && block.lang !== 'ts') {
            block.lang = 'ts'
            patched = true
        }
    }
    return patched
}

function snapshotBlock(block: SfcScriptLike | null | undefined): BlockSnapshot {
    if (!block) {
        return { exists: false }
    }
    return {
        exists: true,
        lang: block.lang,
        attrsLang: block.attrs?.lang,
    }
}

function snapshotDescriptor(sfc: ParsedSfcLike) {
    return {
        script: snapshotBlock(sfc.descriptor.script),
        scriptSetup: snapshotBlock(sfc.descriptor.scriptSetup),
    }
}

const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript
    Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info('[language-plugin-testts] mode=parse_only_descriptor_snapshot (parseSFC2 only, script blocks only)')

    return {
        name: 'language-plugin-testts',
        version: 2.2,
        order: -10000,

        parseSFC2(fileName, languageId, content) {
            if (languageId !== 'vue') {
                return
            }

            const sfc = parseSfc(content) as ParsedSfcLike
            const hasTesttsInScript =
                isTesttsScriptBlock(sfc.descriptor.script)
                || isTesttsScriptBlock(sfc.descriptor.scriptSetup)
            if (!hasTesttsInScript) {
                return
            }

            const before = snapshotDescriptor(sfc)
            const patched = patchSfcScriptLangForVolar(sfc)
            const after = snapshotDescriptor(sfc)

            Glog.info(`[testts] parseSFC2 descriptor before: ${JSON.stringify(before)} file=${fileName}`)
            Glog.info(`[testts] parseSFC2 descriptor after: ${JSON.stringify(after)} patched=${patched} file=${fileName}`)

            if (!patched) {
                return
            }

            Glog.info(`[testts] parseSFC2 intercepted: patched script lang testts->ts for ${fileName}`)
            return sfc
        },
    }
}

export default plugin
