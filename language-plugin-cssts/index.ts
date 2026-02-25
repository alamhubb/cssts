import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTs, CsstsInit, RuntimeStore, writeAtomUsedDts } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import * as fs from 'node:fs'
import * as path from 'node:path'
import Glog from 'glogjs'



// 版本号
const PLUGIN_VERSION = '2.2.1-test'

// 初始化 Glog（只设置 debug 级别以便调试）
Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-cssts v${PLUGIN_VERSION}] initialized`)


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

function logCompletionProbeMappings(sourceCode: string, generatedCode: string, mappings: OffsetMapping[]): void {
    const probes = ['con', 'cons', 'conso', 'console']
    for (const probe of probes) {
        const index = sourceCode.indexOf(probe)
        if (index < 0) continue

        const mapping = findFirstCoveringMapping(mappings, index)
        if (!mapping) {
            Glog.warn(`[completion-probe] "${probe}" @src ${index} has no covering mapping`)
            continue
        }

        const srcText = sourceCode.slice(mapping.original.offset, mapping.original.offset + mapping.original.length)
        const genText = generatedCode.slice(mapping.generated.offset, mapping.generated.offset + mapping.generated.length)
        const genEnd = mapping.generated.offset + mapping.generated.length
        const after = generatedCode.slice(genEnd, Math.min(generatedCode.length, genEnd + 8))
        Glog.debug(
            `[completion-probe] "${probe}" @src ${index} -> src[${mapping.original.offset},${mapping.original.offset + mapping.original.length})="${previewText(srcText)}", `
            + `gen[${mapping.generated.offset},${genEnd})="${previewText(genText)}", next="${previewText(after)}"`
        )
    }
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
                        } else {
                            embeddedFile.content.push([tsCode, scriptBlock.name, 0, features])
                            embeddedFile.content.push(['', scriptBlock.name, scriptBlock.content.length, features])
                            Glog.warn('No mappings, using whole code')
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
                    }
                }
            }
        },
    }
}

export default plugin
