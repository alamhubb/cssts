import type { VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import { transformCssTs, CsstsInit, RuntimeStore, writeAtomUsedDts } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import Glog from 'glogjs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const PLUGIN_VERSION = '1.0.11-core-only'
const require = createRequire(import.meta.url)

type SfcScriptLike = {
    name?: string
    lang?: string
    attrs?: Record<string, string | true>
    content: string
}

type ParsedSfcLike = {
    descriptor: {
        script?: SfcScriptLike | null
        scriptSetup?: SfcScriptLike | null
    }
}

type OffsetMapping = {
    original: { offset: number, length: number }
    generated: { offset: number, length: number }
}

type CsstsTransformMeta = {
    sourceCode: string
    generatedCode: string
    offsets: OffsetMapping[]
    rawMappings: number
}

type FileTransformMeta = {
    script?: CsstsTransformMeta
    scriptSetup?: CsstsTransformMeta
}

let initialized = false
let dtsOutputDir: string | null = null
const transformMetaStore = new Map<string, FileTransformMeta>()

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-cssts v${PLUGIN_VERSION}] initialized`)

function findPackageJsonPath(entryFilePath: string): string | null {
    let current = dirname(entryFilePath)
    while (true) {
        const candidate = join(current, 'package.json')
        if (existsSync(candidate)) {
            return candidate
        }
        const parent = dirname(current)
        if (parent === current) {
            return null
        }
        current = parent
    }
}

function readPackageMeta(packageName: string): { version: string, entryPath: string } {
    try {
        const entryPath = require.resolve(packageName)
        const packageJsonPath = findPackageJsonPath(entryPath)
        if (!packageJsonPath) {
            return { version: 'unknown', entryPath }
        }
        const pkgText = readFileSync(packageJsonPath, 'utf8')
        const pkg = JSON.parse(pkgText)
        return {
            version: pkg?.version ?? 'unknown',
            entryPath,
        }
    } catch {
        return { version: 'unresolved', entryPath: 'unresolved' }
    }
}

function formatPackageMeta(packageName: string): string {
    const meta = readPackageMeta(packageName)
    return `${packageName}=${meta.version} (${meta.entryPath})`
}

function findNearestNodeModules(startPath: string): string | null {
    let currentDir = dirname(startPath)
    while (true) {
        const nodeModulesPath = join(currentDir, 'node_modules')
        if (existsSync(nodeModulesPath)) {
            return nodeModulesPath
        }
        const parentDir = dirname(currentDir)
        if (parentDir === currentDir) {
            return null
        }
        currentDir = parentDir
    }
}

function initCssts(fileName: string): void {
    if (initialized) return

    const nodeModulesDir = findNearestNodeModules(fileName)
    if (!nodeModulesDir) {
        throw new Error(`[cssts] Cannot find node_modules from path: ${fileName}`)
    }

    dtsOutputDir = join(nodeModulesDir, '@types', 'cssts-ts')
    CsstsInit.init({ dtsOutputDir })
    initialized = true
    Glog.info(`[cssts] initialized dts output: ${dtsOutputDir}`)
}

function updateModulesDts(): void {
    if (!dtsOutputDir) return

    const usedStyles = RuntimeStore.getUsedStyles()
    if (usedStyles.size === 0) {
        return
    }

    try {
        writeAtomUsedDts(dtsOutputDir)
        Glog.info(`[cssts] updated atomUsedCssts.d.ts: styles=${usedStyles.size}`)
    } catch (e: any) {
        const message = e?.message || String(e)
        Glog.warn(`[cssts] writeAtomUsedDts failed: ${message}`)
    }
}

function contentMayContainCssts(content: string): boolean {
    return content.includes('lang="cssts"')
        || content.includes("lang='cssts'")
        || content.includes('lang=cssts')
}

function isCsstsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
    if (!block) return false
    if (block.lang === 'cssts') return true
    return block.attrs?.lang === 'cssts'
}

function buildTransformMeta(fileName: string, sourceCode: string): CsstsTransformMeta | null {
    try {
        initCssts(fileName)
        const result = transformCssTs(sourceCode)
        const generatedCode = typeof result.code === 'string' ? result.code : ''
        const offsets = SlimeMappingConverter.convertMappings(result.mapping) as OffsetMapping[]
        return {
            sourceCode,
            generatedCode,
            offsets,
            rawMappings: Array.isArray(result.mapping) ? result.mapping.length : 0,
        }
    } catch (e: any) {
        const message = e?.message || String(e)
        Glog.warn(`[cssts] parseSFC2 pre-transform failed: ${message}`)
        return null
    }
}

function patchSfcScriptForVolar(fileName: string, sfc: ParsedSfcLike): boolean {
    let patched = false
    const fileMeta: FileTransformMeta = {}
    const blocks: Array<{ key: 'script' | 'scriptSetup', block: SfcScriptLike | null | undefined }> = [
        { key: 'script', block: sfc.descriptor.script },
        { key: 'scriptSetup', block: sfc.descriptor.scriptSetup },
    ]
    for (const { key, block } of blocks) {
        if (!isCsstsScriptBlock(block)) {
            continue
        }
        const sourceCode = block.content ?? ''
        const meta = buildTransformMeta(fileName, sourceCode)
        if (meta) {
            fileMeta[key] = meta
            if (meta.generatedCode.length > 0) {
                block.content = meta.generatedCode
            }
        }
        if (block && block.lang !== 'ts') {
            block.lang = 'ts'
            patched = true
        }
    }
    if (fileMeta.script || fileMeta.scriptSetup) {
        transformMetaStore.set(fileName, fileMeta)
    } else {
        transformMetaStore.delete(fileName)
    }
    return patched
}

function countLines(input: string): number {
    if (input.length === 0) return 0
    return input.split(/\r?\n/).length
}

function applyIdentitySegments(
    embeddedFile: { content: any[] },
    scriptBlockName: string,
    sourceCode: string
) {
    embeddedFile.content.length = 0
    const features = {
        verification: true,
        completion: true,
        semantic: true,
        navigation: true,
        structure: true,
        format: true,
    }
    embeddedFile.content.push([sourceCode, scriptBlockName, 0, features])
    embeddedFile.content.push(['', scriptBlockName, sourceCode.length, features])
}

function applyMappedSegments(
    embeddedFile: { content: any[] },
    scriptBlockName: string,
    generatedCode: string,
    offsets: OffsetMapping[],
    sourceLength: number
): { mappedSegments: number, gapSegments: number } {
    embeddedFile.content.length = 0

    const features = {
        verification: true,
        completion: true,
        semantic: true,
        navigation: true,
        structure: true,
        format: true,
    }

    const sortedOffsets = [...offsets]
        .filter(m => (m.generated?.length ?? 0) > 0)
        .sort((a, b) => a.generated.offset - b.generated.offset)

    const clamp = (n: number) => Math.max(0, Math.min(sourceLength, n))

    let mappedSegments = 0
    let gapSegments = 0
    let lastGenEnd = 0

    for (const m of sortedOffsets) {
        const genStart = m.generated.offset
        const genEnd = m.generated.offset + m.generated.length

        if (genStart > lastGenEnd) {
            const gapText = generatedCode.slice(lastGenEnd, genStart)
            if (gapText) {
                embeddedFile.content.push(gapText)
                gapSegments++
            }
        }

        const mappedText = generatedCode.slice(genStart, genEnd)
        if (mappedText) {
            const srcStart = clamp(m.original.offset)
            const srcEnd = clamp(m.original.offset + Math.max(0, m.original.length))
            if (srcEnd > srcStart) {
                embeddedFile.content.push([mappedText, scriptBlockName, srcStart, features])
                embeddedFile.content.push(['', scriptBlockName, srcEnd, features])
                mappedSegments++
            } else {
                embeddedFile.content.push(mappedText)
                gapSegments++
            }
        }

        lastGenEnd = Math.max(lastGenEnd, genEnd)
    }

    if (lastGenEnd < generatedCode.length) {
        const tail = generatedCode.slice(lastGenEnd)
        if (tail) {
            embeddedFile.content.push(tail)
            gapSegments++
        }
    }

    return { mappedSegments, gapSegments }
}

const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript

    Glog.info(`[language-plugin-cssts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(
        `[language-plugin-cssts] Runtime deps: `
        + `${formatPackageMeta('cssts-compiler')}, `
        + `${formatPackageMeta('slime-parser')}, `
        + `${formatPackageMeta('slime-generator')}, `
        + `${formatPackageMeta('subhuti')}`
    )

    return {
        name: 'language-plugin-cssts',
        version: 2.2,
        order: -10000,

        parseSFC2(fileName, languageId, content) {
            if (languageId !== 'vue') {
                return
            }
            if (!contentMayContainCssts(content)) {
                transformMetaStore.delete(fileName)
                return
            }
            const sfc = parseSfc(content) as ParsedSfcLike
            const patched = patchSfcScriptForVolar(fileName, sfc)
            if (!patched) {
                transformMetaStore.delete(fileName)
                return
            }
            Glog.info(`[cssts] parseSFC2 intercepted: patched script cssts->ts for ${fileName}`)
            return sfc
        },

        getEmbeddedCodes(fileName, sfc) {
            Glog.filePath = fileName
            const scriptBlock = sfc.scriptSetup || sfc.script
            if (scriptBlock) {
                Glog.debug(`[cssts] getEmbeddedCodes: ${fileName}, lang=${scriptBlock.lang}, len=${scriptBlock.content.length}`)
            }
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            if (embeddedFile.id !== 'script_ts' && embeddedFile.id !== 'scriptsetup_raw') {
                return
            }

            const scriptBlock = (sfc.scriptSetup || sfc.script) as SfcScriptLike | null
            if (!isCsstsScriptBlock(scriptBlock)) {
                return
            }

            const fileMeta = transformMetaStore.get(fileName)
            const meta = embeddedFile.id === 'scriptsetup_raw'
                ? (fileMeta?.scriptSetup ?? fileMeta?.script)
                : (fileMeta?.script ?? fileMeta?.scriptSetup)
            const sourceCode = meta?.sourceCode ?? (scriptBlock?.content ?? '')
            const scriptBlockName = scriptBlock?.name ?? 'scriptSetup'

            try {
                let tsCode = meta?.generatedCode ?? ''
                let offsets = meta?.offsets ?? []
                let rawMappings = meta?.rawMappings ?? 0

                if (!tsCode.length || !offsets.length) {
                    const rebuiltMeta = buildTransformMeta(fileName, sourceCode)
                    if (rebuiltMeta) {
                        tsCode = rebuiltMeta.generatedCode
                        offsets = rebuiltMeta.offsets
                        rawMappings = rebuiltMeta.rawMappings
                    }
                }

                if (!offsets.length || !tsCode.length) {
                    Glog.warn('[cssts] empty transform result, fallback to identity')
                    applyIdentitySegments(embeddedFile, scriptBlockName, sourceCode)
                    return
                }

                const applied = applyMappedSegments(
                    embeddedFile,
                    scriptBlockName,
                    tsCode,
                    offsets,
                    sourceCode.length
                )

                updateModulesDts()
                Glog.info(
                    `[cssts] applied core transform: id=${embeddedFile.id}, `
                    + `srcLen=${sourceCode.length}, genLen=${tsCode.length}, `
                    + `rawMappings=${rawMappings}, offsets=${offsets.length}, `
                    + `mappedSegments=${applied.mappedSegments}, gapSegments=${applied.gapSegments}, `
                    + `lines=${countLines(sourceCode)}`
                )
            } catch (e: any) {
                const message = e?.message || String(e)
                Glog.warn(`[cssts] core transform failed, fallback to identity: ${message}`)
                applyIdentitySegments(embeddedFile, scriptBlockName, sourceCode)
            }
        },
    }
}

export default plugin
