import type { VueLanguagePlugin } from '@vue/language-core'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { transformCssTs, CsstsInit, RuntimeStore, writeAtomUsedDts } from 'cssts-compiler'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import Glog from 'glogjs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

// version
const PLUGIN_VERSION = '1.0.9-trend-diagnostics'
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

let initialized = false
let dtsOutputDir: string | null = null

// Initialize Glog
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
    Glog.debug(`[cssts] Found node_modules: ${nodeModulesDir}`)
    Glog.debug(`[cssts] DTS output dir: ${dtsOutputDir}`)

    CsstsInit.init({ dtsOutputDir })
    Glog.debug('[cssts] CsstsInit initialized')
    initialized = true
}

function updateModulesDts(): void {
    if (!dtsOutputDir) return

    const usedStyles = RuntimeStore.getUsedStyles()
    if (usedStyles.size === 0) {
        Glog.debug('[cssts] No used styles, skip atomUsedCssts.d.ts generation')
        return
    }

    try {
        writeAtomUsedDts(dtsOutputDir)
        Glog.info(`[cssts] Updated atomUsedCssts.d.ts with ${usedStyles.size} styles`)
    } catch (e: any) {
        const message = e?.message || String(e)
        Glog.error(`[cssts] writeAtomUsedDts failed: ${message}`)
        if (e?.stack) {
            Glog.error(`[cssts] writeAtomUsedDts stack: ${e.stack}`)
        }
    }
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
            `[cssts-pattern][${tag}] suspicious '+' at idx=${i} (L${lc.line}:C${lc.column}), `
            + `snippet="${previewText(getSnippetAround(code, i, 18))}"`
        )
        count++
    }
    if (count > 0) {
        Glog.warn(`[cssts-pattern][${tag}] suspicious '+' total=${count}`)
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
        Glog.warn('[cssts-generated-parse] TypeScript parser API unavailable, skip parse diagnostics')
        return -1
    }

    const virtualName = `${fileName.split(/[\\/]/).pop() || 'unknown'}.cssts.generated.ts`
    const sourceFile = createSourceFile(virtualName, generatedCode, latest, true)
    const diagnostics = sourceFile.parseDiagnostics ?? []
    if (diagnostics.length === 0) {
        Glog.debug(`[cssts-generated-parse] OK: no parse diagnostics for ${virtualName}`)
        return 0
    }

    Glog.error(`[cssts-generated-parse] diagnostics=${diagnostics.length} for ${virtualName}`)
    diagnostics.slice(0, 12).forEach((diag, index) => {
        const start = typeof diag.start === 'number' ? diag.start : 0
        const length = typeof diag.length === 'number' && diag.length > 0 ? diag.length : 1
        const message = flattenDiagnosticMessage(ts, diag.messageText)
        const lc = toLineCol(generatedCode, start)
        Glog.error(
            `[cssts-generated-parse][${index}] code=${diag.code ?? 'unknown'} `
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

/**
 * Transform code via slime-parser + slime-generator.
 * Mirrors the cssts transformCssts() pipeline.
 */
/*function transformCssts(code: string) {
    // 1) Parse source code
    const parser = new SlimeParser(code)
    const cst = parser.Program()

    // 2) Convert CST to AST
    const ast = SlimeCstToAstUtils.toProgram(cst)

    // 3) Collect parsed tokens
    const tokens = parser.parsedTokens

    // 4) Generate target code
    const result = SlimeGenerator.generator(ast, tokens)

    // 5) Remove invalid mappings
    const mapping = result.mapping.filter(
        (m: any) => m.source && m.generate && m.source.length > 0
    )

    return {
        code: result.code,
        mapping
    }
}*/

/**
 * Vue language plugin for cssts.
 * Uses slime-parser + slime-generator for parse + generate.
 * Emits multi-segment mapped content.
 */
const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript
    const fileTrend = new Map<string, FileTrendState>()

    Glog.info(`[language-plugin-cssts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(
        `[language-plugin-cssts] Runtime deps: ` +
        `${formatPackageMeta('cssts-compiler')}, ` +
        `${formatPackageMeta('slime-parser')}, ` +
        `${formatPackageMeta('slime-generator')}, ` +
        `${formatPackageMeta('subhuti')}`
    )

    return {
        name: 'language-plugin-cssts',
        version: 2.2,

        getEmbeddedCodes(fileName, sfc) {
            Glog.filePath = fileName
            Glog.debug(`[cssts] getEmbeddedCodes: ${fileName}`)

            const scriptBlock = sfc.scriptSetup || sfc.script
            if (scriptBlock) {
                Glog.debug(`[cssts] Script lang: "${scriptBlock.lang}", length: ${scriptBlock.content.length}`)
            }
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            Glog.debug(`[cssts] resolveEmbeddedCode: id="${embeddedFile.id}"`)

            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script

                if (scriptBlock && scriptBlock.lang === 'cssts') {
                    Glog.info(`[cssts] 检测到 cssts 脚本块，长度=${scriptBlock.content.length}`)
                    try {
                        initCssts(fileName)

                        const sourceCode = scriptBlock.content
                        const sourceHash = hashString(sourceCode)
                        Glog.debug(
                            `[cssts] source fingerprint: hash=${sourceHash}, length=${sourceCode.length}, lines=${countLines(sourceCode)}`
                        )
                        logSuspiciousPlusPattern('source', sourceCode)

                        // Transform code with slime-parser + slime-generator
                        const result = transformCssTs(sourceCode)
                        const tsCode = result.code
                        const generatedHash = hashString(tsCode)
                        const offsets = SlimeMappingConverter.convertMappings(result.mapping)
                        const mappingCoverage = calcMappedCoverage(result.mapping, tsCode.length)
                        Glog.debug(`[cssts] mapping coverage(generate): ${(mappingCoverage * 100).toFixed(1)}%`)

                        Glog.debug(`[cssts] 源码长度: ${sourceCode.length}, 生成码长度: ${tsCode.length}`)
                        Glog.debug(`[cssts] 长度差异: ${sourceCode.length - tsCode.length}`)
                        Glog.debug(`[cssts] mapping 数量: ${offsets.length}`)
                        Glog.debug(`[cssts] 源码 === 生成码: ${sourceCode === tsCode}`)

                        // Print first few mapping details
                        Glog.debug(`[cssts] === Mapping 详情 (前5条) ===`)
                        for (let i = 0; i < Math.min(5, result.mapping.length); i++) {
                            const m = result.mapping[i]
                            Glog.debug(`[cssts] mapping[${i}]: source=[${m.source?.index}, len=${m.source?.length}] -> generate=[${m.generate?.index}, len=${m.generate?.length}]`)
                        }

                        // Print source/generated preview (first 100 chars)
                        Glog.debug(`[cssts] 源码前100: ${JSON.stringify(sourceCode.substring(0, 100))}`)
                        Glog.debug(`[cssts] 生成码前100: ${JSON.stringify(tsCode.substring(0, 100))}`)
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
                                    `[cssts-trend] changed for ${fileName}: `
                                    + `srcHash ${prev.sourceHash}->${sourceHash}, `
                                    + `genHash ${prev.generatedHash}->${generatedHash}, `
                                    + `parseDiag ${prev.parseDiagCount}->${parseDiagCount}, `
                                    + `srcLen ${prev.sourceLength}->${sourceCode.length}, `
                                    + `genLen ${prev.generatedLength}->${tsCode.length}`
                                )
                            }
                            if (prev.parseDiagCount === 0 && parseDiagCount > 0) {
                                Glog.error(
                                    `[cssts-trend] regression detected: parse diagnostics changed from 0 to ${parseDiagCount}. `
                                    + 'This often explains why completion used to work but now degrades.'
                                )
                            } else if (prev.parseDiagCount > 0 && parseDiagCount === 0) {
                                Glog.info('[cssts-trend] recovered: parse diagnostics dropped to 0.')
                            }
                        } else {
                            Glog.debug(
                                `[cssts-trend] first snapshot for ${fileName}: srcHash=${sourceHash}, genHash=${generatedHash}, parseDiag=${parseDiagCount}`
                            )
                        }
                        fileTrend.set(fileName, {
                            sourceHash,
                            generatedHash,
                            sourceLength: sourceCode.length,
                            generatedLength: tsCode.length,
                            parseDiagCount,
                        })

                        updateModulesDts()

                        // Clear current embedded content
                        if (!result.mapping.length) {
                            throw new Error('[cssts] transform returned empty mapping')
                        }
                        embeddedFile.content.length = 0

                        // Enable all language features
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

                            if (genStart > lastGenEnd) {
                                const gapText = tsCode.slice(lastGenEnd, genStart)
                                if (gapText) {
                                    embeddedFile.content.push(gapText)
                                }
                            }

                            const code = tsCode.slice(genStart, genEnd)
                            if (code) {
                                embeddedFile.content.push([code, scriptBlock.name, srcStart, features])
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

                        Glog.info(
                            `[cssts] Created ${embeddedFile.content.length} segments; ` +
                            `mappedSegments=${mappedSegments}, mode=precise-multi-segment, ` +
                            `coverage=${(mappingCoverage * 100).toFixed(1)}%`
                        )
                    } catch (e: any) {
                        const message = e?.message || String(e)
                        Glog.error(`[cssts] Transform error: ${message}`)
                        if (e?.stack) {
                            Glog.error(`[cssts] Transform stack: ${e.stack}`)
                        }
                        const failedCodeIndex = extractErrorCodeIndex(message)
                        if (failedCodeIndex !== null) {
                            Glog.warn(
                                `[cssts] Transform failed around codeIndex=${failedCodeIndex}, ` +
                                `snippet="${getSnippetAround(scriptBlock.content, failedCodeIndex)}"`
                            )
                        }
                        if (/UnaryExpression CST(?:不完整|incomplete)/i.test(message)) {
                            const standalonePlus = findStandalonePlusIndexes(scriptBlock.content)
                            if (standalonePlus.length) {
                                const top = standalonePlus.slice(0, 3).map((idx, i) => {
                                    const lc = toLineCol(scriptBlock.content, idx)
                                    return `#${i + 1}@${idx}(L${lc.line}:C${lc.column}) "${getSnippetAround(scriptBlock.content, idx, 18)}"`
                                })
                                Glog.warn(
                                    `[cssts] UnaryExpression debug: standalone '+' candidates(${standalonePlus.length}) -> ${top.join(' | ')}`
                                )
                            } else {
                                Glog.warn('[cssts] UnaryExpression debug: no standalone "+" candidate found in current source')
                            }
                        }
                        throw e
                    }
                }
            }
        },
    }
}

export default plugin
