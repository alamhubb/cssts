import type { VueLanguagePlugin } from '@vue/language-core'
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator } from 'slime-generator'
import Glog from 'glogjs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const PLUGIN_VERSION = '1.0.16-testts-identity-baseline'
type TesttsBisectMode =
    | 'identity_script_ts'
    | 'parse_ast_script_ts'
    | 'generate_only_script_ts'
    | 'apply_mapping_no_cache'
const TESTTS_BISECT_MODE: TesttsBisectMode = 'identity_script_ts'
const require = createRequire(import.meta.url)

Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

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
            entryPath
        }
    } catch {
        return { version: 'unresolved', entryPath: 'unresolved' }
    }
}

function formatPackageMeta(packageName: string): string {
    const meta = readPackageMeta(packageName)
    return `${packageName}=${meta.version} (${meta.entryPath})`
}

function countLines(input: string): number {
    if (input.length === 0) return 0
    return input.split(/\r?\n/).length
}

type RawMapping = {
    source?: { index?: number, length?: number }
    generate?: { index?: number, length?: number }
}

type NormalizedMapping = {
    sourceStart: number
    sourceEnd: number
    generatedStart: number
    generatedEnd: number
}

type MappingNormalizeStats = {
    rawCount: number
    validCount: number
    invalidNonNumeric: number
    invalidNonPositive: number
    outOfRange: number
    nonMonotonicInput: number
    overlapDropped: number
}

type SourceCoverage = {
    totalNonWhitespace: number
    mappedNonWhitespace: number
    ratio: number
}

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

function contentMayContainTestts(content: string): boolean {
    return content.includes('lang="testts"')
        || content.includes("lang='testts'")
        || content.includes('lang=testts')
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

function materializeEmbeddedText(content: any[]): string {
    return content
        .map(segment => Array.isArray(segment) ? (segment[0] ?? '') : (segment ?? ''))
        .join('')
}

function findFirstDiffIndex(a: string, b: string): number {
    const len = Math.min(a.length, b.length)
    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) return i
    }
    return a.length === b.length ? -1 : len
}

function previewAround(text: string, index: number, radius: number = 20): string {
    if (index < 0) return ''
    const start = Math.max(0, index - radius)
    const end = Math.min(text.length, index + radius)
    return text.slice(start, end).replace(/\r/g, '\\r').replace(/\n/g, '\\n')
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

function runParseAstOnly(sourceCode: string) {
    const parser = new SlimeParser(sourceCode)
    const cst = parser.Program()
    SlimeCstToAstUtils.toProgram(cst)
}

function runParseAstGenerate(sourceCode: string): { generatedCode: string, rawMappings: RawMapping[], changed: boolean } {
    const parser = new SlimeParser(sourceCode)
    const cst = parser.Program()
    const ast = SlimeCstToAstUtils.toProgram(cst)
    const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
    const generatedCode = typeof generated.code === 'string' ? generated.code : sourceCode
    const rawMappings = Array.isArray(generated.mapping) ? generated.mapping as RawMapping[] : []
    return {
        generatedCode,
        rawMappings,
        changed: generatedCode !== sourceCode,
    }
}

function normalizeMappings(
    rawMappings: RawMapping[],
    sourceLength: number,
    generatedLength: number
): { mappings: NormalizedMapping[], stats: MappingNormalizeStats } {
    const stats: MappingNormalizeStats = {
        rawCount: rawMappings.length,
        validCount: 0,
        invalidNonNumeric: 0,
        invalidNonPositive: 0,
        outOfRange: 0,
        nonMonotonicInput: 0,
        overlapDropped: 0,
    }
    const normalized: NormalizedMapping[] = []

    let lastInputGeneratedStart = -1
    for (const mapping of rawMappings) {
        const srcStart = mapping.source?.index
        const srcLength = mapping.source?.length
        const genStart = mapping.generate?.index
        const genLength = mapping.generate?.length

        if (
            !Number.isFinite(srcStart)
            || !Number.isFinite(srcLength)
            || !Number.isFinite(genStart)
            || !Number.isFinite(genLength)
        ) {
            stats.invalidNonNumeric++
            continue
        }

        const sStart = srcStart as number
        const sLength = srcLength as number
        const gStart = genStart as number
        const gLength = genLength as number

        if (lastInputGeneratedStart >= 0 && gStart < lastInputGeneratedStart) {
            stats.nonMonotonicInput++
        }
        lastInputGeneratedStart = gStart

        if (sLength <= 0 || gLength <= 0) {
            stats.invalidNonPositive++
            continue
        }

        const sEnd = sStart + sLength
        const gEnd = gStart + gLength
        if (sStart < 0 || gStart < 0 || sEnd > sourceLength || gEnd > generatedLength) {
            stats.outOfRange++
            continue
        }

        normalized.push({
            sourceStart: sStart,
            sourceEnd: sEnd,
            generatedStart: gStart,
            generatedEnd: gEnd,
        })
    }

    normalized.sort((a, b) => {
        if (a.generatedStart !== b.generatedStart) return a.generatedStart - b.generatedStart
        return a.generatedEnd - b.generatedEnd
    })

    const noOverlap: NormalizedMapping[] = []
    let lastGeneratedEnd = -1
    for (const mapping of normalized) {
        if (mapping.generatedStart < lastGeneratedEnd) {
            stats.overlapDropped++
            continue
        }
        noOverlap.push(mapping)
        lastGeneratedEnd = mapping.generatedEnd
    }

    stats.validCount = noOverlap.length
    return { mappings: noOverlap, stats }
}

function calcSourceNonWhitespaceCoverage(sourceCode: string, mappings: NormalizedMapping[]): SourceCoverage {
    const coverage = new Uint8Array(sourceCode.length)
    for (const mapping of mappings) {
        for (let i = mapping.sourceStart; i < mapping.sourceEnd; i++) {
            coverage[i] = 1
        }
    }

    let totalNonWhitespace = 0
    let mappedNonWhitespace = 0
    for (let i = 0; i < sourceCode.length; i++) {
        if (/\s/.test(sourceCode[i])) continue
        totalNonWhitespace++
        if (coverage[i]) mappedNonWhitespace++
    }

    return {
        totalNonWhitespace,
        mappedNonWhitespace,
        ratio: totalNonWhitespace > 0 ? mappedNonWhitespace / totalNonWhitespace : 1,
    }
}

function applyMappedSegments(
    embeddedFile: { content: any[] },
    scriptBlockName: string,
    generatedCode: string,
    mappings: NormalizedMapping[]
): { mappedSegments: number } {
    embeddedFile.content.length = 0
    const features = {
        verification: true,
        completion: true,
        semantic: true,
        navigation: true,
        structure: true,
        format: true,
    }

    let lastGeneratedEnd = 0
    let mappedSegments = 0
    for (const mapping of mappings) {
        if (mapping.generatedStart > lastGeneratedEnd) {
            const gapText = generatedCode.slice(lastGeneratedEnd, mapping.generatedStart)
            if (gapText) {
                embeddedFile.content.push(gapText)
            }
        }

        const mappedText = generatedCode.slice(mapping.generatedStart, mapping.generatedEnd)
        if (mappedText) {
            embeddedFile.content.push([mappedText, scriptBlockName, mapping.sourceStart, features])
            embeddedFile.content.push(['', scriptBlockName, mapping.sourceEnd, features])
            mappedSegments++
        }
        lastGeneratedEnd = mapping.generatedEnd
    }

    if (lastGeneratedEnd < generatedCode.length) {
        const tailText = generatedCode.slice(lastGeneratedEnd)
        if (tailText) {
            embeddedFile.content.push(tailText)
        }
    }

    return { mappedSegments }
}

const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript
    Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(`[language-plugin-testts] bisect mode=${TESTTS_BISECT_MODE}`)
    Glog.info(
        `[language-plugin-testts] Runtime deps: `
        + `${formatPackageMeta('slime-parser')}, `
        + `${formatPackageMeta('slime-generator')}`
    )

    return {
        name: 'language-plugin-testts',
        version: 2.2,
        order: -10000,

        parseSFC2(fileName, languageId, content) {
            if (languageId !== 'vue') {
                return
            }
            if (!contentMayContainTestts(content)) {
                return
            }
            const sfc = parseSfc(content) as ParsedSfcLike
            const patched = patchSfcScriptLangForVolar(sfc)
            if (!patched) {
                return
            }
            Glog.info(`[testts] parseSFC2 intercepted: patched script lang testts->ts for ${fileName}`)
            return sfc
        },

        getEmbeddedCodes(fileName, sfc) {
            Glog.filePath = fileName
            Glog.debug(`[testts] getEmbeddedCodes: ${fileName}`)

            const scriptBlock = sfc.scriptSetup || sfc.script
            if (scriptBlock) {
                Glog.debug(`[testts] Script lang: "${scriptBlock.lang}", length: ${scriptBlock.content.length}`)
            }
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            Glog.debug(`[testts] resolveEmbeddedCode: id="${embeddedFile.id}"`)
            if (embeddedFile.id !== 'script_ts') {
                return
            }

            const scriptBlock = sfc.scriptSetup || sfc.script
            if (!scriptBlock || !isTesttsScriptBlock(scriptBlock as SfcScriptLike)) {
                return
            }

            const sourceCode = scriptBlock.content
            if (TESTTS_BISECT_MODE === 'parse_ast_script_ts') {
                try {
                    runParseAstOnly(sourceCode)
                } catch (e: any) {
                    const message = e?.message || String(e)
                    Glog.warn(`[testts-bisect] parse-ast failed: ${message}`)
                }
            } else if (TESTTS_BISECT_MODE === 'generate_only_script_ts') {
                try {
                    const res = runParseAstGenerate(sourceCode)
                    Glog.info(
                        `[testts-bisect] generate-only done: srcLen=${sourceCode.length}, `
                        + `genLen=${res.generatedCode.length}, changed=${res.changed}`
                    )
                } catch (e: any) {
                    const message = e?.message || String(e)
                    Glog.warn(`[testts-bisect] generate-only failed: ${message}`)
                }
            } else if (TESTTS_BISECT_MODE === 'apply_mapping_no_cache') {
                try {
                    const res = runParseAstGenerate(sourceCode)
                    const normalized = normalizeMappings(res.rawMappings, sourceCode.length, res.generatedCode.length)
                    const sourceCoverage = calcSourceNonWhitespaceCoverage(sourceCode, normalized.mappings)

                    if (normalized.mappings.length === 0) {
                        Glog.warn('[testts-map] no valid mappings after normalize, fallback to identity')
                        applyIdentitySegments(embeddedFile, scriptBlock.name, sourceCode)
                    } else {
                        const applied = applyMappedSegments(
                            embeddedFile,
                            scriptBlock.name,
                            res.generatedCode,
                            normalized.mappings
                        )
                        const reconstructed = materializeEmbeddedText(embeddedFile.content)
                        if (reconstructed !== res.generatedCode) {
                            const diffIndex = findFirstDiffIndex(reconstructed, res.generatedCode)
                            Glog.error(
                                `[testts-map] reconstructed code mismatch: diffIndex=${diffIndex}, `
                                + `reconstructedLen=${reconstructed.length}, generatedLen=${res.generatedCode.length}, `
                                + `reconstructedPreview="${previewAround(reconstructed, diffIndex)}", `
                                + `generatedPreview="${previewAround(res.generatedCode, diffIndex)}"`
                            )
                        } else {
                            Glog.debug(
                                `[testts-map] reconstructed code matches generated code: len=${reconstructed.length}`
                            )
                        }
                        Glog.info(
                            `[testts-map] apply done: raw=${normalized.stats.rawCount}, valid=${normalized.stats.validCount}, `
                            + `segments=${embeddedFile.content.length}, mappedSegments=${applied.mappedSegments}, `
                            + `srcLen=${sourceCode.length}, genLen=${res.generatedCode.length}, changed=${res.changed}, `
                            + `sourceNonWs=${sourceCoverage.mappedNonWhitespace}/${sourceCoverage.totalNonWhitespace} `
                            + `(${(sourceCoverage.ratio * 100).toFixed(1)}%), invalidNonNumeric=${normalized.stats.invalidNonNumeric}, `
                            + `invalidNonPositive=${normalized.stats.invalidNonPositive}, outOfRange=${normalized.stats.outOfRange}, `
                            + `nonMonotonicInput=${normalized.stats.nonMonotonicInput}, overlapDropped=${normalized.stats.overlapDropped}`
                        )
                        if (sourceCoverage.ratio < 1) {
                            Glog.warn(
                                `[testts-map] source coverage below 100%: ${sourceCoverage.mappedNonWhitespace}/`
                                + `${sourceCoverage.totalNonWhitespace} (${(sourceCoverage.ratio * 100).toFixed(1)}%)`
                            )
                        }
                    }
                    Glog.info(
                        `[testts-bisect] apply-mapping-no-cache done: srcLen=${sourceCode.length}, `
                        + `genLen=${res.generatedCode.length}, changed=${res.changed}, rawMappings=${res.rawMappings.length}`
                    )
                } catch (e: any) {
                    const message = e?.message || String(e)
                    Glog.warn(`[testts-bisect] apply-mapping-no-cache failed: ${message}`)
                    applyIdentitySegments(embeddedFile, scriptBlock.name, sourceCode)
                }
            }
            if (TESTTS_BISECT_MODE !== 'apply_mapping_no_cache') {
                applyIdentitySegments(embeddedFile, scriptBlock.name, sourceCode)
            }
            Glog.info(`[testts-bisect] ${TESTTS_BISECT_MODE} applied: id=${embeddedFile.id}, length=${sourceCode.length}, lines=${countLines(sourceCode)}`)
        },
    }
}

export default plugin
