import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTs, CsstsInit, RuntimeStore, writeAtomUsedDts } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { createRequire } from 'node:module'
import Glog from 'glogjs'



// 版本号
const PLUGIN_VERSION = '2.2.1-test'

// 初始化 Glog（只设置 debug 级别以便调试）
Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-cssts v${PLUGIN_VERSION}] initialized`)
const require = createRequire(import.meta.url)


/**
 * 从指定路径向上查找最近的 node_modules 目录
 */
function findNearestNodeModules(startPath: string): string | null {
    let currentDir = path.dirname(startPath)
    while (true) {
        const nodeModulesPath = path.join(currentDir, 'node_modules')
        if (fs.existsSync(nodeModulesPath) && fs.statSync(nodeModulesPath).isDirectory()) {
            return nodeModulesPath
        }
        const parentDir = path.dirname(currentDir)
        if (parentDir === currentDir) {
            return null
        }
        currentDir = parentDir
    }
}

/**
 * CSSTS Vue Language Plugin
 * 核心思路：在 resolveEmbeddedCode 中修改 Volar 已有的脚本块内容
 */
let initialized = false

/**
 * 初始化 CsstsInit（延迟到第一次处理文件时调用）
 */
let dtsOutputDir: string | null = null

type OffsetMapping = {
    original: { offset: number, length: number }
    generated: { offset: number, length: number }
}

type TypeScriptLike = {
    ScriptTarget?: { Latest?: number }
    createSourceFile?: (fileName: string, sourceText: string, languageVersion: number, setParentNodes?: boolean) => { parseDiagnostics?: any[] }
    flattenDiagnosticMessageText?: (messageText: any, newLine: string) => string
}

function formatUnknownForLog(value: unknown): string {
    if (value instanceof Error) {
        return `name=${value.name}, message=${value.message}, stack=${value.stack ?? '(no stack)'}`
    }
    if (typeof value === 'string') {
        return value
    }
    try {
        return JSON.stringify(value)
    } catch {
        return String(value)
    }
}

function formatErrorForLog(error: unknown): string {
    if (error instanceof Error) {
        const cause = (error as Error & { cause?: unknown }).cause
        const causeText = cause === undefined ? '' : `\ncause=${formatUnknownForLog(cause)}`
        return `name=${error.name}\nmessage=${error.message}\nstack=${error.stack ?? '(no stack)'}${causeText}`
    }
    return `non-error thrown: ${formatUnknownForLog(error)}`
}

function findPackageJsonPath(entryFilePath: string): string | null {
    let current = path.dirname(entryFilePath)
    while (true) {
        const candidate = path.join(current, 'package.json')
        if (fs.existsSync(candidate)) {
            return candidate
        }
        const parent = path.dirname(current)
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
        const pkgText = fs.readFileSync(packageJsonPath, 'utf8')
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

function summarizeEmbeddedContent(content: any[]): string {
    let textSegments = 0
    let mappedSegments = 0
    let anchorSegments = 0
    let textChars = 0
    let mappedChars = 0

    for (const seg of content || []) {
        if (typeof seg === 'string') {
            textSegments++
            textChars += seg.length
            continue
        }
        if (Array.isArray(seg)) {
            const text = typeof seg[0] === 'string' ? seg[0] : ''
            if (text.length === 0) {
                anchorSegments++
            } else {
                mappedSegments++
                mappedChars += text.length
            }
        }
    }
    return `segments(total=${content.length}, mapped=${mappedSegments}, anchors=${anchorSegments}, text=${textSegments}, mappedChars=${mappedChars}, textChars=${textChars})`
}

function countTokensIgnoringWhitespaceAndComments(code: string): number {
    const noComments = code
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/\/\/[^\r\n]*/g, ' ')
    const tokens = noComments.match(
        /[A-Za-z_$][A-Za-z0-9_$]*|0[xX][0-9A-Fa-f]+|\d+(?:\.\d+)?|=>|===|!==|==|!=|<=|>=|&&|\|\||[()[\]{}.,;:+\-*/%=&|!<>?:]/g
    )
    return tokens?.length ?? 0
}

function checkTokenStatsConsistency(sourceCode: string, generatedCode: string, rawMappingCount: number, offsetMappingCount: number): void {
    const sourceTokenCount = countTokensIgnoringWhitespaceAndComments(sourceCode)
    const generatedTokenCount = countTokensIgnoringWhitespaceAndComments(generatedCode)

    if (generatedTokenCount < sourceTokenCount) {
        Glog.warn(
            `[token-check] generated token count is smaller than source (ignoring whitespace/comments): `
            + `sourceTokens=${sourceTokenCount}, generatedTokens=${generatedTokenCount}`
        )
    }

    if (offsetMappingCount < rawMappingCount) {
        Glog.error(
            `[token-check] mapping count decreased after conversion: raw=${rawMappingCount}, converted=${offsetMappingCount}`
        )
    } else if (offsetMappingCount > rawMappingCount) {
        Glog.warn(
            `[token-check] mapping count increased after conversion: raw=${rawMappingCount}, converted=${offsetMappingCount}`
        )
    }

    if (sourceTokenCount > 0 && rawMappingCount === 0) {
        Glog.error(
            `[token-check] source has tokens but no mappings: sourceTokens=${sourceTokenCount}, rawMappings=${rawMappingCount}`
        )
    }
}

function previewText(text: string, maxLength: number = 40): string {
    return text
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .slice(0, maxLength)
}

function collectUnmappedNonWhitespaceSpans(text: string, coveredOffsets: Set<number>, maxSpans: number = 12): Array<{ start: number, end: number, text: string }> {
    const spans: Array<{ start: number, end: number, text: string }> = []
    let i = 0
    while (i < text.length && spans.length < maxSpans) {
        if (coveredOffsets.has(i)) {
            i++
            continue
        }
        const start = i
        while (i < text.length && !coveredOffsets.has(i)) {
            i++
        }
        const end = i
        const raw = text.slice(start, end)
        if (raw.trim().length > 0) {
            spans.push({ start, end, text: previewText(raw) })
        }
    }
    return spans
}

function findFirstCoveringMapping(mappings: OffsetMapping[], sourceOffset: number): OffsetMapping | undefined {
    return mappings.find(m =>
        sourceOffset >= m.original.offset
        && sourceOffset < m.original.offset + m.original.length
    )
}

function findNearestSourceMapping(
    mappings: OffsetMapping[],
    sourceOffset: number
): { mapping: OffsetMapping, distance: number } | undefined {
    let best: { mapping: OffsetMapping, distance: number } | undefined
    for (const mapping of mappings) {
        const start = mapping.original.offset
        const end = mapping.original.offset + mapping.original.length
        const distance = sourceOffset < start
            ? start - sourceOffset
            : sourceOffset > end
                ? sourceOffset - end
                : 0
        if (!best || distance < best.distance) {
            best = { mapping, distance }
        }
    }
    return best
}

function toLineColumn(text: string, offset: number): { line: number, column: number } {
    const safeOffset = Math.max(0, Math.min(offset, text.length))
    let line = 1
    let column = 1
    for (let i = 0; i < safeOffset; i++) {
        if (text[i] === '\n') {
            line++
            column = 1
        } else {
            column++
        }
    }
    return { line, column }
}

function snippetAround(text: string, start: number, end: number, radius: number = 16): string {
    const left = Math.max(0, start - radius)
    const right = Math.min(text.length, end + radius)
    return previewText(text.slice(left, right), 200)
}

function collectProbeIndexes(sourceCode: string, probe: string, maxCount: number = 6): number[] {
    const indexes: number[] = []
    let from = 0
    while (indexes.length < maxCount) {
        const index = sourceCode.indexOf(probe, from)
        if (index < 0) break
        indexes.push(index)
        from = index + 1
    }
    return indexes
}

function logCompletionProbeMappings(sourceCode: string, generatedCode: string, mappings: OffsetMapping[]): void {
    const probes = ['con', 'cons', 'conso', 'console']
    for (const probe of probes) {
        const indexes = collectProbeIndexes(sourceCode, probe)
        if (indexes.length === 0) continue
        Glog.debug(`[completion-probe] "${probe}" occurrences=${indexes.length}`)

        for (const index of indexes) {
            const start = index
            const end = index + probe.length
            const points = [
                { label: 'start', sourceOffset: start },
                { label: 'end-1', sourceOffset: Math.max(start, end - 1) },
                { label: 'end', sourceOffset: end },
            ]
            const sourceLineCol = toLineColumn(sourceCode, start)
            Glog.debug(
                `[completion-probe-detail] "${probe}" @src ${start} (L${sourceLineCol.line}:C${sourceLineCol.column}) `
                + `sourceSnippet="${snippetAround(sourceCode, start, end)}"`
            )

            for (const point of points) {
                const mapping = findFirstCoveringMapping(mappings, point.sourceOffset)
                if (!mapping) {
                    const nearest = findNearestSourceMapping(mappings, point.sourceOffset)
                    if (!nearest) {
                        Glog.warn(
                            `[completion-probe-gap] "${probe}" ${point.label} @src ${point.sourceOffset} has no mapping and no nearest segment`
                        )
                        continue
                    }
                    Glog.warn(
                        `[completion-probe-gap] "${probe}" ${point.label} @src ${point.sourceOffset} is unmapped; `
                        + `nearest src[${nearest.mapping.original.offset},${nearest.mapping.original.offset + nearest.mapping.original.length}) `
                        + `distance=${nearest.distance}`
                    )
                    continue
                }

                const srcText = sourceCode.slice(mapping.original.offset, mapping.original.offset + mapping.original.length)
                const genStart = mapping.generated.offset
                const genEnd = mapping.generated.offset + mapping.generated.length
                const genText = generatedCode.slice(genStart, genEnd)
                const after = generatedCode.slice(genEnd, Math.min(generatedCode.length, genEnd + 12))
                Glog.debug(
                    `[completion-probe-map] "${probe}" ${point.label} @src ${point.sourceOffset} `
                    + `-> src[${mapping.original.offset},${mapping.original.offset + mapping.original.length})="${previewText(srcText)}", `
                    + `gen[${genStart},${genEnd})="${previewText(genText)}", next="${previewText(after)}"`
                )
            }
        }
    }
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

function logSuspiciousGeneratedPatterns(generatedCode: string): void {
    const plusSemicolon = /\+\s*;/g
    let match: RegExpExecArray | null
    let count = 0
    while ((match = plusSemicolon.exec(generatedCode)) && count < 12) {
        const start = match.index
        const end = match.index + match[0].length
        const lc = toLineColumn(generatedCode, start)
        Glog.warn(
            `[generated-pattern] suspicious "+ ;" at gen[${start},${end}) `
            + `(L${lc.line}:C${lc.column}) snippet="${snippetAround(generatedCode, start, end)}"`
        )
        count++
    }
    if (count > 0) {
        Glog.warn(`[generated-pattern] total suspicious "+ ;" occurrences=${count}`)
    }
}

function logGeneratedParseDiagnostics(ts: TypeScriptLike, fileName: string, generatedCode: string): void {
    const createSourceFile = ts?.createSourceFile
    const latest = ts?.ScriptTarget?.Latest
    if (typeof createSourceFile !== 'function' || typeof latest !== 'number') {
        Glog.warn('[generated-parse] TypeScript parser API unavailable, skip parse diagnostics')
        return
    }

    const virtualFileName = `${path.basename(fileName)}.__generated.ts`
    const sourceFile = createSourceFile(virtualFileName, generatedCode, latest, true)
    const diagnostics = sourceFile.parseDiagnostics ?? []
    if (diagnostics.length === 0) {
        Glog.debug(`[generated-parse] OK: no parse diagnostics for ${virtualFileName}`)
        return
    }

    Glog.error(`[generated-parse] parse diagnostics=${diagnostics.length} for ${virtualFileName}`)
    diagnostics.slice(0, 12).forEach((diag, index) => {
        const start = typeof diag.start === 'number' ? diag.start : 0
        const length = typeof diag.length === 'number' && diag.length > 0 ? diag.length : 1
        const end = Math.min(generatedCode.length, start + length)
        const lc = toLineColumn(generatedCode, start)
        const message = flattenDiagnosticMessage(ts, diag.messageText)
        Glog.error(
            `[generated-parse][${index}] code=${diag.code ?? 'unknown'} `
            + `at gen[${start},${end}) (L${lc.line}:C${lc.column}) message="${previewText(message, 160)}" `
            + `snippet="${snippetAround(generatedCode, start, end)}"`
        )
    })
}

function initCssts(fileName: string): void {
    if (initialized) return

    const nodeModulesDir = findNearestNodeModules(fileName)
    if (!nodeModulesDir) {
        throw new Error(`Cannot find node_modules from path: ${fileName} `)
    }

    dtsOutputDir = path.join(nodeModulesDir, '@types', 'cssts-ts')
    Glog.debug(`Found node_modules: ${nodeModulesDir} `)
    Glog.debug(`DTS output dir: ${dtsOutputDir} `)

    CsstsInit.init({ dtsOutputDir })
    Glog.debug('CsstsInit initialized')
    initialized = true
}

/**
 * 更新 atomUsedCssts.d.ts（每次处理 Vue 文件后调用）
 */
function updateModulesDts(): void {
    if (!dtsOutputDir) return

    const usedStyles = RuntimeStore.getUsedStyles()
    if (usedStyles.size === 0) {
        Glog.debug(`[updateModulesDts] 没有使用的样式类，跳过生成`)
        return
    }

    Glog.debug(`[updateModulesDts] 开始生成 atomUsedCssts.d.ts...`)
    try {
        writeAtomUsedDts(dtsOutputDir)
        Glog.info(`[updateModulesDts] ✅ 已更新 atomUsedCssts.d.ts，共 ${usedStyles.size} 个样式类`)
    } catch (e: unknown) {
        Glog.error(`[updateModulesDts] writeAtomUsedDts failed\n${formatErrorForLog(e)}`)
    }
}


const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript

    Glog.info(`[language-plugin-cssts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
    Glog.info(
        `[language-plugin-cssts] Runtime deps: `
        + `${formatPackageMeta('cssts-compiler')}, `
        + `${formatPackageMeta('slime-generator')}, `
        + `${formatPackageMeta('slime-parser')}`
    )

    return {
        name: 'language-plugin-cssts',
        version: 2.2,

        getEmbeddedCodes(fileName, sfc) {
            // 动态更新 filePath，让日志输出到正确的项目
            Glog.filePath = fileName
            Glog.debug(`getEmbeddedCodes: ${fileName}`)

            // 检查是否有 cssts 脚本
            const scriptBlock = sfc.scriptSetup || sfc.script
            if (scriptBlock) {
                Glog.debug(`[getEmbeddedCodes] Script lang: "${scriptBlock.lang}", content preview: ${scriptBlock.content.substring(0, 100)}...`)
            } else {
                Glog.debug(`[getEmbeddedCodes] No script block found`)
            }
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            Glog.debug(`resolveEmbeddedCode: embeddedFile.id="${embeddedFile.id}"`)

            // 打印所有可能的 embeddedFile ID，帮助调试
            Glog.debug(`[resolveEmbeddedCode] embeddedFile details: id=${embeddedFile.id}, lang=${(embeddedFile as any).lang || 'N/A'}`)

            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script
                Glog.debug(`[resolveEmbeddedCode] scriptBlock.lang="${scriptBlock?.lang}", checking for cssts...`)
                Glog.debug(`[compare] before resolve ${embeddedFile.id}: ${summarizeEmbeddedContent(embeddedFile.content as any[])}`)

                if (scriptBlock && scriptBlock.lang === 'cssts') {
                    Glog.info(`✅ Found cssts script block! content length: ${scriptBlock.content.length}`)

                    try {
                        initCssts(fileName)

                        const result = transformCssTs(scriptBlock.content)
                        const tsCode = result.code
                        const rawMappings = result.mapping
                        const offsets = SlimeMappingConverter.convertMappings(rawMappings)

                        // 详细 token 统计
                        Glog.debug(`=== Token 统计 === `)
                        Glog.debug(`源码长度: ${scriptBlock.content.length}, 生成码长度: ${tsCode.length} `)
                        Glog.debug(`原始 mapping 数量: ${rawMappings.length} `)
                        Glog.debug(`转换后 mapping 数量: ${offsets.length} `)
                        checkTokenStatsConsistency(scriptBlock.content, tsCode, rawMappings.length, offsets.length)
                        logSuspiciousGeneratedPatterns(tsCode)
                        logGeneratedParseDiagnostics(ts as TypeScriptLike, fileName, tsCode)

                        // 显示每个 token 的对应关系
                        Glog.debug(`=== Token 对应关系（共 ${offsets.length} 个）=== `)
                        offsets.forEach((m, i) => {
                            const srcText = scriptBlock.content.substring(m.original.offset, m.original.offset + m.original.length)
                            const genText = tsCode.substring(m.generated.offset, m.generated.offset + m.generated.length)
                            Glog.debug(`[${i}] src @${m.original.offset}: "${srcText}" -> gen@${m.generated.offset}: "${genText}"`)
                        })

                        // 检查映射覆盖
                        const srcCoverage = new Set<number>()
                        const genCoverage = new Set<number>()
                        offsets.forEach(m => {
                            for (let i = m.original.offset; i < m.original.offset + m.original.length; i++) {
                                srcCoverage.add(i)
                            }
                            for (let i = m.generated.offset; i < m.generated.offset + m.generated.length; i++) {
                                genCoverage.add(i)
                            }
                        })
                        Glog.debug(`源码覆盖字符数: ${srcCoverage.size}/${scriptBlock.content.length}`)
                        Glog.debug(`生成码覆盖字符数: ${genCoverage.size}/${tsCode.length}`)
                        Glog.debug(`=== Token 统计结束 ===`)

                        const unmappedSourceSpans = collectUnmappedNonWhitespaceSpans(scriptBlock.content, srcCoverage)
                        const unmappedGeneratedSpans = collectUnmappedNonWhitespaceSpans(tsCode, genCoverage)
                        if (unmappedSourceSpans.length > 0) {
                            Glog.warn(`[mapping-gap] unmapped source non-whitespace spans: ${unmappedSourceSpans.length}`)
                            unmappedSourceSpans.forEach((span, i) => {
                                Glog.warn(`[mapping-gap][src][${i}] [${span.start},${span.end}) "${span.text}"`)
                            })
                        }
                        if (unmappedGeneratedSpans.length > 0) {
                            Glog.warn(`[mapping-gap] unmapped generated non-whitespace spans: ${unmappedGeneratedSpans.length}`)
                            unmappedGeneratedSpans.forEach((span, i) => {
                                Glog.warn(`[mapping-gap][gen][${i}] [${span.start},${span.end}) "${span.text}"`)
                            })
                        }
                        logCompletionProbeMappings(scriptBlock.content, tsCode, offsets as OffsetMapping[])

                        embeddedFile.content.length = 0

                        const features = {
                            verification: true,
                            completion: true,
                            semantic: true,
                            navigation: true,
                            structure: true,
                            format: true,
                        }

                        if (offsets.length > 0) {
                            let lastGenEnd = 0
                            let gapCount = 0
                            let gapChars = 0
                            for (const m of offsets) {
                                if (m.generated.offset > lastGenEnd) {
                                    const gapText = tsCode.slice(lastGenEnd, m.generated.offset)
                                    gapCount++
                                    gapChars += gapText.length
                                    Glog.debug(
                                        `[segment-gap] gen[${lastGenEnd},${m.generated.offset}) len=${gapText.length} text="${previewText(gapText)}"`
                                    )
                                    embeddedFile.content.push(gapText)
                                }
                                const text = tsCode.slice(m.generated.offset, m.generated.offset + m.generated.length)
                                Glog.debug(
                                    `[segment-map] src[${m.original.offset},${m.original.offset + m.original.length})`
                                    + ` -> gen[${m.generated.offset},${m.generated.offset + m.generated.length}) text="${previewText(text)}"`
                                )
                                embeddedFile.content.push([text, scriptBlock.name, m.original.offset, features])
                                // Anchor the cursor-at-end position of each mapped token for completion/navigation.
                                embeddedFile.content.push(['', scriptBlock.name, m.original.offset + m.original.length, features])
                                lastGenEnd = m.generated.offset + m.generated.length
                            }
                            if (lastGenEnd < tsCode.length) {
                                const tailGap = tsCode.slice(lastGenEnd)
                                gapCount++
                                gapChars += tailGap.length
                                Glog.debug(
                                    `[segment-gap] gen[${lastGenEnd},${tsCode.length}) len=${tailGap.length} text="${previewText(tailGap)}"`
                                )
                                embeddedFile.content.push(tailGap)
                            }
                            Glog.debug(`[segment-summary] mapped=${offsets.length}, gaps=${gapCount}, gapChars=${gapChars}`)
                            Glog.debug(`Created ${offsets.length} segments`)
                            Glog.debug(`[compare] after transform(mapped): ${summarizeEmbeddedContent(embeddedFile.content as any[])}`)
                        } else {
                            embeddedFile.content.push([tsCode, scriptBlock.name, 0, features])
                            embeddedFile.content.push(['', scriptBlock.name, scriptBlock.content.length, features])
                            Glog.warn('No mappings, using whole code')
                            Glog.debug(`[compare] after transform(no-mapping): ${summarizeEmbeddedContent(embeddedFile.content as any[])}`)
                        }

                        // 更新 modules.d.ts（累加使用的原子类）
                        updateModulesDts()
                    } catch (e: unknown) {
                        Glog.error(`[resolveEmbeddedCode] transformCssTs failed for ${fileName}\n${formatErrorForLog(e)}`)
                        // Keep language service alive even if CSSTS transform fails.
                        const fallbackFeatures = {
                            verification: true,
                            completion: true,
                            semantic: true,
                            navigation: true,
                            structure: true,
                            format: true,
                        }
                        embeddedFile.content.length = 0
                        embeddedFile.content.push([scriptBlock.content, scriptBlock.name, 0, fallbackFeatures])
                        embeddedFile.content.push(['', scriptBlock.name, scriptBlock.content.length, fallbackFeatures])
                        Glog.warn(`[resolveEmbeddedCode] fallback to raw cssts source for language service: length=${scriptBlock.content.length}`)
                        Glog.debug(`[compare] after fallback: ${summarizeEmbeddedContent(embeddedFile.content as any[])}`)
                    }
                } else {
                    Glog.debug(
                        `[compare] skip transform for non-cssts lang="${scriptBlock?.lang ?? 'N/A'}", `
                        + `${summarizeEmbeddedContent(embeddedFile.content as any[])}`
                    )
                }
            }
        },
    }
}

export default plugin
