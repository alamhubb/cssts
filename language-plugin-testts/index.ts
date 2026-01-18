import type { VueLanguagePlugin } from '@vue/language-core'
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
import Glog from 'glogjs'

// 版本号
const PLUGIN_VERSION = '1.0.6-multi-segment'

// 初始化 Glog
Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

/**
 * 使用 slime-parser 和 slime-generator 转换代码
 * 模拟 cssts 的 transformCssTs() 流程
 */
function transformTestTs(code: string) {
    // 1. 使用 SlimeParser 解析代码
    const parser = new SlimeParser(code)
    const cst = parser.Program()

    // 2. CST 转换为 AST（使用 toProgram 方法）
    const ast = SlimeCstToAstUtils.toProgram(cst)

    // 3. 获取解析后的 tokens
    const tokens = parser.parsedTokens

    // 4. 使用 SlimeGenerator 生成代码
    const result = SlimeGenerator.generator(ast, tokens)

    // 5. 过滤无效的 mapping
    const mapping = result.mapping.filter(
        (m: any) => m.source && m.generate && m.source.length > 0
    )

    return {
        code: result.code,
        mapping
    }
}

/**
 * 测试用 Vue Language Plugin
 * 使用 slime-parser + slime-generator 解析和生成代码
 * 单个 segment 输出
 */
const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript

    Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)

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

            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script

                if (scriptBlock && scriptBlock.lang === 'testts') {
                    Glog.info(`[testts] ✅ Found testts script block! length: ${scriptBlock.content.length}`)

                    try {
                        const sourceCode = scriptBlock.content

                        // 使用 slime-parser + slime-generator 转换代码
                        const result = transformTestTs(sourceCode)
                        const tsCode = result.code
                        const offsets = SlimeMappingConverter.convertMappings(result.mapping)

                        Glog.debug(`[testts] 源码长度: ${sourceCode.length}, 生成码长度: ${tsCode.length}`)
                        Glog.debug(`[testts] 长度差异: ${sourceCode.length - tsCode.length}`)
                        Glog.debug(`[testts] mapping 数量: ${offsets.length}`)
                        Glog.debug(`[testts] 源码 === 生成码: ${sourceCode === tsCode}`)

                        // 打印前5个 mapping 详细信息
                        Glog.debug(`[testts] === Mapping 详情 (前5个) ===`)
                        for (let i = 0; i < Math.min(5, result.mapping.length); i++) {
                            const m = result.mapping[i]
                            Glog.debug(`[testts] mapping[${i}]: source=[${m.source?.index}, len=${m.source?.length}] -> generate=[${m.generate?.index}, len=${m.generate?.length}]`)
                        }

                        // 打印源码和生成码对比（前100字符）
                        Glog.debug(`[testts] 源码前100: ${JSON.stringify(sourceCode.substring(0, 100))}`)
                        Glog.debug(`[testts] 生成前100: ${JSON.stringify(tsCode.substring(0, 100))}`)

                        // 清空现有内容
                        embeddedFile.content.length = 0

                        // 启用所有语言功能
                        const features = {
                            verification: true,
                            completion: true,
                            semantic: true,
                            navigation: true,
                            structure: true,
                            format: true,
                        }

                        // 使用多个 segments，每个 mapping 对应一个 segment
                        // 按 generate.index 排序，确保顺序正确
                        const sortedMappings = [...result.mapping].sort((a, b) =>
                            (a.generate?.index || 0) - (b.generate?.index || 0)
                        )

                        let lastGenEnd = 0
                        for (const m of sortedMappings) {
                            if (!m.source || !m.generate) continue

                            const genStart = m.generate.index
                            const genLen = m.generate.length
                            const srcStart = m.source.index

                            // 如果有间隙（未映射的代码），添加为纯字符串
                            if (genStart > lastGenEnd) {
                                const gap = tsCode.substring(lastGenEnd, genStart)
                                if (gap) {
                                    embeddedFile.content.push(gap)
                                }
                            }

                            // 添加映射的 segment
                            const code = tsCode.substring(genStart, genStart + genLen)
                            if (code) {
                                embeddedFile.content.push([
                                    code,
                                    scriptBlock.name,
                                    srcStart,  // 源码的真实偏移量
                                    features
                                ])
                            }

                            lastGenEnd = genStart + genLen
                        }

                        // 处理末尾未映射的代码
                        if (lastGenEnd < tsCode.length) {
                            const tail = tsCode.substring(lastGenEnd)
                            if (tail) {
                                embeddedFile.content.push(tail)
                            }
                        }

                        Glog.info(`[testts] ✅ Created ${embeddedFile.content.length} segments (multi-segment mode)`)
                    } catch (e: any) {
                        Glog.error(`[testts] Transform error: ${e?.message || String(e)}`)
                    }
                }
            }
        },
    }
}

export default plugin
