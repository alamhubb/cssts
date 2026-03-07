import type { VueLanguagePlugin } from '@vue/language-core'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import Glog from 'glogjs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

// version
const PLUGIN_VERSION = '1.0.11-bisect-modes'
type TesttsBisectMode =
    | 'identity_script_ts'
    | 'parse_only_minimal'
    | 'transform_script_ts_no_cache'
    | 'transform_script_ts_cache'
    | 'transform_both_cache'
const TESTTS_BISECT_MODE: TesttsBisectMode = 'parse_only_minimal'
type TesttsTransformStage = 'parse_only' | 'parse_ast_only' | 'parse_ast_generate'
const TESTTS_TRANSFORM_STAGE: TesttsTransformStage = 'parse_only'
const require = createRequire(import.meta.url)

type TypeScriptLike = {
    ScriptTarget?: { Latest?: number }
    createSourceFile?: (fileName: string, sourceText: string, languageVersion: number, setParentNodes?: boolean) => { parseDiagnostics?: any[] }
    flattenDiagnosticMessageText?: (messageText: any, newLine: string) => string
}

type FileTrendState = {
    sourceHash: string
    generatedHash: string
    sourceLength: number
    generatedLength: number
    parseDiagCount: number
}

type OffsetMapping = {
    original: { offset: number, length: number }
    generated: { offset: number, length: number }
}

type MappingLike = {
    source?: { index?: number, length?: number }
    generate?: { index?: number, length?: number }
}

type NonWhitespaceCoverage = {
    total: number
    mapped: number
    ratio: number
    missingIndexes: number[]
}

type TransformSnapshot = {
    sourceHash: string
    sourceLength: number
    parseDiagCount: number
    mappingCoverage: number
    tsCode: string
    offsets: OffsetMapping[]
}

// Initialize Glog
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

function extractErrorCodeIndex(errorMessage: string): number | null {
    const match = /position\s+(\d+)/i.exec(errorMessage)
    if (!match) {
        return null
    }
    const parsed = Number(match[1])
    return Number.isFinite(parsed) ? parsed : null
}

function previewText(text: string, maxLength: number = 160): string {
    return text
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .slice(0, maxLength)
}

function hashString(input: string): string {
    let hash = 2166136261 >>> 0
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i)
        hash = Math.imul(hash, 16777619)
    }
    return (hash >>> 0).toString(16).padStart(8, '0')
}

function countLines(input: string): number {
    if (input.length === 0) return 0
    return input.split(/\r?\n/).length
}

function flattenDiagnosticMessage(ts: TypeScriptLike, messageText: any): string {
    if (typeof messageText === 'string') return messageText
    if (typeof ts.flattenDiagnosticMessageText === 'function') {
        return ts.flattenDiagnosticMessageText(messageText, '\n')
    }
    if (messageText && typeof messageText.messageText === 'string') {
        return messageText.messageText
    }
    return String(messageText)
}

function logSuspiciousPlusPattern(tag: 'source' | 'generated', code: string): number {
    let count = 0
    for (let i = 0; i < code.length && count < 12; i++) {
        if (code[i] !== '+') continue

        const prev = i > 0 ? code[i - 1] : ''
        const next = i + 1 < code.length ? code[i + 1] : ''
        if (prev === '+' || next === '+') continue

        let j = i + 1
        while (j < code.length && (code[j] === ' ' || code[j] === '\t')) {
            j++
        }
        const near = j >= code.length || code[j] === '\n' || code[j] === '\r' || code[j] === '}' || code[j] === ';'
        if (!near) continue

        const lc = toLineCol(code, i)
        Glog.warn(
            `[testts-pattern][${tag}] suspicious '+' at idx=${i} (L${lc.line}:C${lc.column}), `
            + `snippet="${previewText(getSnippetAround(code, i, 18))}"`
        )
        count++
    }
    if (count > 0) {
        Glog.warn(`[testts-pattern][${tag}] suspicious '+' total=${count}`)
    }
    return count
}

function logGeneratedParseDiagnostics(
    ts: TypeScriptLike,
    fileName: string,
    generatedCode: string
): number {
    const createSourceFile = ts?.createSourceFile
    const latest = ts?.ScriptTarget?.Latest
    if (typeof createSourceFile !== 'function' || typeof latest !== 'number') {
        Glog.warn('[testts-generated-parse] TypeScript parser API unavailable, skip parse diagnostics')
        return -1
    }

    const virtualName = `${fileName.split(/[\\/]/).pop() || 'unknown'}.testts.generated.ts`
    const sourceFile = createSourceFile(virtualName, generatedCode, latest, true)
    const diagnostics = sourceFile.parseDiagnostics ?? []
    if (diagnostics.length === 0) {
        Glog.debug(`[testts-generated-parse] OK: no parse diagnostics for ${virtualName}`)
        return 0
    }

    Glog.error(`[testts-generated-parse] diagnostics=${diagnostics.length} for ${virtualName}`)
    diagnostics.slice(0, 12).forEach((diag, index) => {
        const start = typeof diag.start === 'number' ? diag.start : 0
        const length = typeof diag.length === 'number' && diag.length > 0 ? diag.length : 1
        const message = flattenDiagnosticMessage(ts, diag.messageText)
        const lc = toLineCol(generatedCode, start)
        Glog.error(
            `[testts-generated-parse][${index}] code=${diag.code ?? 'unknown'} `
            + `at idx=${start} len=${length} (L${lc.line}:C${lc.column}) `
            + `message="${previewText(message)}" snippet="${previewText(getSnippetAround(generatedCode, start, 20))}"`
        )
    })
    return diagnostics.length
}

function getSnippetAround(sourceCode: string, index: number, radius: number = 25): string {
    const start = Math.max(0, index - radius)
    const end = Math.min(sourceCode.length, index + radius)
    return sourceCode.slice(start, end).replace(/\r?\n/g, '\\n')
}

function toLineCol(sourceCode: string, index: number): { line: number, column: number } {
    const safeIndex = Math.max(0, Math.min(index, sourceCode.length))
    let line = 1
    let column = 1
    for (let i = 0; i < safeIndex; i++) {
        if (sourceCode[i] === '\n') {
            line++
            column = 1
        } else {
            column++
        }
    }
    return { line, column }
}

function findStandalonePlusIndexes(sourceCode: string): number[] {
    const indexes: number[] = []
    for (let i = 0; i < sourceCode.length; i++) {
        if (sourceCode[i] !== '+') continue
        const prev = i > 0 ? sourceCode[i - 1] : ''
        const next = i + 1 < sourceCode.length ? sourceCode[i + 1] : ''
        const isDoublePlus = prev === '+' || next === '+'
        if (!isDoublePlus) {
            indexes.push(i)
        }
    }
    return indexes
}

function calcMappedCoverage(mappings: any[], generatedLength: number): number {
    if (generatedLength <= 0) return 0
    let covered = 0
    for (const m of mappings) {
        const g = m?.generate
        if (!g || typeof g.length !== 'number') continue
        covered += Math.max(0, g.length)
    }
    return Math.min(1, covered / generatedLength)
}

function calcSourceNonWhitespaceCoverage(sourceCode: string, mappings: MappingLike[]): NonWhitespaceCoverage {
    const coverage = new Uint8Array(sourceCode.length)
    for (const m of mappings) {
        const start = m?.source?.index
        const length = m?.source?.length
        if (!Number.isFinite(start) || !Number.isFinite(length)) continue
        const safeStart = Math.max(0, Math.min(sourceCode.length, start as number))
        const safeEnd = Math.max(safeStart, Math.min(sourceCode.length, (start as number) + (length as number)))
        for (let i = safeStart; i < safeEnd; i++) {
            coverage[i] = 1
        }
    }

    let total = 0
    let mapped = 0
    const missingIndexes: number[] = []
    for (let i = 0; i < sourceCode.length; i++) {
        const char = sourceCode[i]
        if (/\s/.test(char)) continue
        total++
        if (coverage[i]) {
            mapped++
        } else if (missingIndexes.length < 20) {
            missingIndexes.push(i)
        }
    }

    return {
        total,
        mapped,
        ratio: total > 0 ? mapped / total : 1,
        missingIndexes,
    }
}

function applyMappedSegments(
    embeddedFile: { content: any[] },
    scriptBlockName: string,
    tsCode: string,
    offsets: OffsetMapping[]
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

    const sortedOffsets = [...offsets]
        .filter(m => m.generated.length > 0 && m.original.length > 0)
        .sort((a, b) => a.generated.offset - b.generated.offset)

    let lastGenEnd = 0
    let mappedSegments = 0
    for (const m of sortedOffsets) {
        const genStart = m.generated.offset
        const genEnd = m.generated.offset + m.generated.length
        const srcStart = m.original.offset
        const srcEnd = m.original.offset + m.original.length

        if (genStart > lastGenEnd) {
            const gapText = tsCode.slice(lastGenEnd, genStart)
            if (gapText) {
                embeddedFile.content.push(gapText)
            }
        }

        const code = tsCode.slice(genStart, genEnd)
        if (code) {
            embeddedFile.content.push([code, scriptBlockName, srcStart, features])
            // Keep cursor-at-token-end stable for completion/navigation.
            embeddedFile.content.push(['', scriptBlockName, srcEnd, features])
            mappedSegments++
        }

        lastGenEnd = Math.max(lastGenEnd, genEnd)
    }

    if (lastGenEnd < tsCode.length) {
        const tailText = tsCode.slice(lastGenEnd)
        if (tailText) {
            embeddedFile.content.push(tailText)
        }
    }

    return { mappedSegments }
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
    // Boundary anchor for completion/navigation stability at file end.
    embeddedFile.content.push(['', scriptBlockName, sourceCode.length, features])
}

/**
 * Parse/AST-only transform for bisection:
 * run parser (+ optional CST->AST) but keep output as identity code/mapping.
 */
type RawMapping = {
    source?: { index?: number, length?: number }
    generate?: { index?: number, length?: number }
}

function isValidRawMapping(mapping: RawMapping): boolean {
    const srcIndex = mapping.source?.index
    const srcLength = mapping.source?.length
    const genIndex = mapping.generate?.index
    const genLength = mapping.generate?.length
    return Number.isFinite(srcIndex)
        && Number.isFinite(srcLength)
        && Number.isFinite(genIndex)
        && Number.isFinite(genLength)
        && (srcLength as number) > 0
        && (genLength as number) > 0
}

function transformTestTs(code: string) {
    if (TESTTS_TRANSFORM_STAGE === 'parse_only') {
        const parser = new SlimeParser(code)
        parser.Program()
        return {
            code,
            mapping: code.length > 0
                ? [{
                    source: { index: 0, length: code.length },
                    generate: { index: 0, length: code.length },
                }]
                : []
        }
    }

    if (TESTTS_TRANSFORM_STAGE === 'parse_ast_only') {
        const parser = new SlimeParser(code)
        const cst = parser.Program()
        SlimeCstToAstUtils.toProgram(cst)
        return {
            code,
            mapping: code.length > 0
                ? [{
                    source: { index: 0, length: code.length },
                    generate: { index: 0, length: code.length },
                }]
                : []
        }
    }

    const parser = new SlimeParser(code)
    const cst = parser.Program()
    const ast = SlimeCstToAstUtils.toProgram(cst)
    const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
    const rawMappings = Array.isArray(generated.mapping) ? generated.mapping as RawMapping[] : []
    const mapping = rawMappings.filter(isValidRawMapping)

    return {
        code: typeof generated.code === 'string' ? generated.code : code,
        mapping
    }
}

/**
 * Vue language plugin for testts.
 * Uses slime-parser + slime-generator for parse + generate.
 * Emits multi-segment mapped content.
 */
const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript
    const fileTrend = new Map<string, FileTrendState>()
    const transformSnapshots = new Map<string, TransformSnapshot>()

    Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(`[language-plugin-testts] bisect mode=${TESTTS_BISECT_MODE}`)
    Glog.info(`[language-plugin-testts] transform stage=${TESTTS_TRANSFORM_STAGE}`)
    Glog.info(
        `[language-plugin-testts] Runtime deps: ` +
        `${formatPackageMeta('slime-parser')}, ` +
        `${formatPackageMeta('slime-generator')}, ` +
        `${formatPackageMeta('subhuti')}`
    )

    return {
        name: 'language-plugin-testts',
        version: 2.2,

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

            const allowScriptSetupRaw = TESTTS_BISECT_MODE === 'transform_both_cache'
            const useIdentityMode = TESTTS_BISECT_MODE === 'identity_script_ts'
            const useParseOnlyMinimal = TESTTS_BISECT_MODE === 'parse_only_minimal'
            const useCache = TESTTS_BISECT_MODE === 'transform_script_ts_cache'
                || TESTTS_BISECT_MODE === 'transform_both_cache'

            if (embeddedFile.id !== 'script_ts' && !(allowScriptSetupRaw && embeddedFile.id === 'scriptsetup_raw')) {
                return
            }

            const scriptBlock = sfc.scriptSetup || sfc.script
            if (!scriptBlock || scriptBlock.lang !== 'testts') {
                return
            }

            if (useIdentityMode) {
                const sourceCode = scriptBlock.content
                applyIdentitySegments(embeddedFile, scriptBlock.name, sourceCode)
                Glog.info(
                    `[testts-bisect] identity mode applied: id=${embeddedFile.id}, `
                    + `length=${sourceCode.length}, lines=${countLines(sourceCode)}`
                )
                return
            }

            // Minimal parser-only bisection mode:
            // parse once, keep identity mapping, skip diagnostics/cache/trend extras.
            if (useParseOnlyMinimal) {
                const sourceCode = scriptBlock.content
                try {
                    const parser = new SlimeParser(sourceCode)
                    parser.Program()
                } catch (e: any) {
                    const message = e?.message || String(e)
                    Glog.warn(`[testts-bisect] parse-only-minimal parse failed: ${message}`)
                }
                applyIdentitySegments(embeddedFile, scriptBlock.name, sourceCode)
                Glog.info(
                    `[testts-bisect] parse-only-minimal applied: id=${embeddedFile.id}, `
                    + `length=${sourceCode.length}, lines=${countLines(sourceCode)}`
                )
                return
            }

            Glog.info(`[testts] 检测到 testts 脚本块，长度=${scriptBlock.content.length}, id=${embeddedFile.id}`)
            const sourceCode = scriptBlock.content
            const sourceHash = hashString(sourceCode)
            const cachedBefore = useCache ? transformSnapshots.get(fileName) : undefined
            let transientSnapshot: TransformSnapshot | undefined

            if (!useCache || !cachedBefore || cachedBefore.sourceHash !== sourceHash) {
                try {
                    Glog.debug(
                        `[testts] source fingerprint: hash=${sourceHash}, length=${sourceCode.length}, lines=${countLines(sourceCode)}`
                    )
                    logSuspiciousPlusPattern('source', sourceCode)

                    const result = transformTestTs(sourceCode)
                    if (!result.mapping.length) {
                        throw new Error('[testts] transform returned empty mapping')
                    }
                    const tsCode = result.code
                    const generatedHash = hashString(tsCode)
                    const offsets = SlimeMappingConverter.convertMappings(result.mapping) as OffsetMapping[]
                    const mappingCoverage = calcMappedCoverage(result.mapping, tsCode.length)
                    const sourceNonWhitespaceCoverage = calcSourceNonWhitespaceCoverage(sourceCode, result.mapping as MappingLike[])
                    Glog.debug(`[testts] mapping coverage(generate): ${(mappingCoverage * 100).toFixed(1)}%`)
                    Glog.debug(
                        `[testts] source non-whitespace coverage: ${sourceNonWhitespaceCoverage.mapped}/${sourceNonWhitespaceCoverage.total} `
                        + `(${(sourceNonWhitespaceCoverage.ratio * 100).toFixed(1)}%)`
                    )
                    if (sourceNonWhitespaceCoverage.ratio < 1) {
                        Glog.error(
                            `[testts-map-check] source non-whitespace coverage must be 100%: `
                            + `${sourceNonWhitespaceCoverage.mapped}/${sourceNonWhitespaceCoverage.total} `
                            + `(${(sourceNonWhitespaceCoverage.ratio * 100).toFixed(1)}%)`
                        )
                        for (const sourceIndex of sourceNonWhitespaceCoverage.missingIndexes) {
                            const lc = toLineCol(sourceCode, sourceIndex)
                            const token = sourceCode[sourceIndex]
                            Glog.error(
                                `[testts-map-check] unmapped source char idx=${sourceIndex} `
                                + `(L${lc.line}:C${lc.column}) token=${JSON.stringify(token)} `
                                + `snippet="${previewText(getSnippetAround(sourceCode, sourceIndex, 20))}"`
                            )
                        }
                    }

                    Glog.debug(`[testts] 源码长度: ${sourceCode.length}, 生成码长度: ${tsCode.length}`)
                    Glog.debug(`[testts] 长度差异: ${sourceCode.length - tsCode.length}`)
                    Glog.debug(`[testts] mapping 数量: ${offsets.length}`)
                    Glog.debug(`[testts] 源码 === 生成码: ${sourceCode === tsCode}`)

                    Glog.debug('[testts] === Mapping 详情 (前5条) ===')
                    for (let i = 0; i < Math.min(5, result.mapping.length); i++) {
                        const m = result.mapping[i]
                        Glog.debug(
                            `[testts] mapping[${i}]: source=[${m.source?.index}, len=${m.source?.length}] `
                            + `-> generate=[${m.generate?.index}, len=${m.generate?.length}]`
                        )
                    }

                    Glog.debug(`[testts] 源码前100: ${JSON.stringify(sourceCode.substring(0, 100))}`)
                    Glog.debug(`[testts] 生成码前100: ${JSON.stringify(tsCode.substring(0, 100))}`)
                    logSuspiciousPlusPattern('generated', tsCode)
                    const parseDiagCount = logGeneratedParseDiagnostics(ts as TypeScriptLike, fileName, tsCode)

                    const prev = fileTrend.get(fileName)
                    if (prev) {
                        if (
                            prev.sourceHash !== sourceHash
                            || prev.generatedHash !== generatedHash
                            || prev.parseDiagCount !== parseDiagCount
                            || prev.sourceLength !== sourceCode.length
                            || prev.generatedLength !== tsCode.length
                        ) {
                            Glog.warn(
                                `[testts-trend] changed for ${fileName}: `
                                + `srcHash ${prev.sourceHash}->${sourceHash}, `
                                + `genHash ${prev.generatedHash}->${generatedHash}, `
                                + `parseDiag ${prev.parseDiagCount}->${parseDiagCount}, `
                                + `srcLen ${prev.sourceLength}->${sourceCode.length}, `
                                + `genLen ${prev.generatedLength}->${tsCode.length}`
                            )
                        }
                        if (prev.parseDiagCount === 0 && parseDiagCount > 0) {
                            Glog.error(
                                `[testts-trend] regression detected: parse diagnostics changed from 0 to ${parseDiagCount}. `
                                + 'This often explains why completion used to work but now degrades.'
                            )
                        } else if (prev.parseDiagCount > 0 && parseDiagCount === 0) {
                            Glog.info('[testts-trend] recovered: parse diagnostics dropped to 0.')
                        }
                    } else {
                        Glog.debug(
                            `[testts-trend] first snapshot for ${fileName}: srcHash=${sourceHash}, genHash=${generatedHash}, parseDiag=${parseDiagCount}`
                        )
                    }
                    fileTrend.set(fileName, {
                        sourceHash,
                        generatedHash,
                        sourceLength: sourceCode.length,
                        generatedLength: tsCode.length,
                        parseDiagCount,
                    })

                    const preferCache = useCache && parseDiagCount > 0 && cachedBefore && cachedBefore.parseDiagCount === 0
                    if (preferCache) {
                        Glog.warn('[testts-cache] generated parse diagnostics > 0; reusing last clean snapshot')
                    } else {
                        const nextSnapshot: TransformSnapshot = {
                            sourceHash,
                            sourceLength: sourceCode.length,
                            parseDiagCount,
                            mappingCoverage,
                            tsCode,
                            offsets,
                        }
                        if (useCache) {
                            transformSnapshots.set(fileName, nextSnapshot)
                            Glog.debug(`[testts-cache] updated snapshot for ${fileName}, id=${embeddedFile.id}`)
                        } else {
                            transientSnapshot = nextSnapshot
                            Glog.debug(`[testts-bisect] transient snapshot ready for ${fileName}, id=${embeddedFile.id}`)
                        }
                    }
                } catch (e: any) {
                    const message = e?.message || String(e)
                    Glog.error(`[testts] Transform error: ${message}`)
                    if (e?.stack) {
                        Glog.error(`[testts] Transform stack: ${e.stack}`)
                    }
                    const failedCodeIndex = extractErrorCodeIndex(message)
                    if (failedCodeIndex !== null) {
                        Glog.warn(
                            `[testts] Transform failed around codeIndex=${failedCodeIndex}, `
                            + `snippet="${getSnippetAround(sourceCode, failedCodeIndex)}"`
                        )
                    }
                    if (/UnaryExpression CST(?:不完整|incomplete)/i.test(message)) {
                        const standalonePlus = findStandalonePlusIndexes(sourceCode)
                        if (standalonePlus.length) {
                            const top = standalonePlus.slice(0, 3).map((idx, i) => {
                                const lc = toLineCol(sourceCode, idx)
                                return `#${i + 1}@${idx}(L${lc.line}:C${lc.column}) "${getSnippetAround(sourceCode, idx, 18)}"`
                            })
                            Glog.warn(
                                `[testts] UnaryExpression debug: standalone '+' candidates(${standalonePlus.length}) -> ${top.join(' | ')}`
                            )
                        } else {
                            Glog.warn('[testts] UnaryExpression debug: no standalone "+" candidate found in current source')
                        }
                    }

                    if (!useCache) {
                        Glog.warn('[testts-bisect] no-cache mode transform failed; skip this update')
                        return
                    }

                    if (cachedBefore) {
                        Glog.warn('[testts-cache] transform failed; reusing last snapshot')
                    } else {
                        Glog.warn('[testts-cache] transform failed and no cached snapshot; keep existing embedded content')
                        return
                    }
                }
            } else {
                Glog.debug(`[testts-cache] hit for ${fileName}, id=${embeddedFile.id}`)
            }

            const snapshot = useCache ? transformSnapshots.get(fileName) : transientSnapshot
            if (!snapshot) {
                Glog.warn('[testts-cache] missing snapshot after transform; keep existing embedded content')
                return
            }

            const { mappedSegments } = applyMappedSegments(
                embeddedFile,
                scriptBlock.name,
                snapshot.tsCode,
                snapshot.offsets
            )
            Glog.info(
                `[testts] Applied snapshot to ${embeddedFile.id}; Created ${embeddedFile.content.length} segments; `
                + `mappedSegments=${mappedSegments}, mode=precise-multi-segment, `
                + `coverage=${(snapshot.mappingCoverage * 100).toFixed(1)}%, parseDiag=${snapshot.parseDiagCount}`
            )
        },
    }
}

export default plugin

