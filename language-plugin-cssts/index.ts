import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTs, CsstsInit, RuntimeStore } from 'cssts-compiler'
import { generateModulesDts } from 'cssts-compiler'
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
    const dtsContent = generateModulesDts() // 从 RuntimeStore 自动获取
    const modulesPath = path.join(dtsOutputDir, 'atomUsedCssts.d.ts')

    try {
        fs.writeFileSync(modulesPath, dtsContent, 'utf-8')
        Glog.info(`[updateModulesDts] ✅ 已更新 atomUsedCssts.d.ts，共 ${usedStyles.size} 个样式类`)
    } catch (e: any) {
        Glog.error(`[updateModulesDts] ❌ 写入失败: ${e?.message}`)
    }
}

const plugin: VueLanguagePlugin = ({ modules }) => {
    const ts = modules.typescript

    return {
        name: 'language-plugin-cssts',
        version: 2.2,

        getEmbeddedCodes(fileName, sfc) {
            // 动态更新 filePath，让日志输出到正确的项目
            Glog.filePath = fileName
            Glog.debug(`getEmbeddedCodes: ${fileName} `)
            return []
        },

        resolveEmbeddedCode(fileName, sfc, embeddedFile) {
            Glog.debug(`resolveEmbeddedCode: ${embeddedFile.id} `)

            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script
                if (scriptBlock && scriptBlock.lang === 'cssts') {
                    Glog.debug(`Found cssts script, content length: ${scriptBlock.content.length} `)

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
                            for (const m of offsets) {
                                if (m.generated.offset > lastGenEnd) {
                                    const gapText = tsCode.slice(lastGenEnd, m.generated.offset)
                                    embeddedFile.content.push(gapText)
                                }
                                const text = tsCode.slice(m.generated.offset, m.generated.offset + m.generated.length)
                                embeddedFile.content.push([text, scriptBlock.name, m.original.offset, features])
                                lastGenEnd = m.generated.offset + m.generated.length
                            }
                            if (lastGenEnd < tsCode.length) {
                                embeddedFile.content.push(tsCode.slice(lastGenEnd))
                            }
                            Glog.debug(`Created ${offsets.length} segments`)
                        } else {
                            embeddedFile.content.push([tsCode, scriptBlock.name, 0, features])
                            Glog.warn('No mappings, using whole code')
                        }

                        // 更新 modules.d.ts（累加使用的原子类）
                        updateModulesDts()
                    } catch (e: any) {
                        Glog.error(`Transform error: ${e?.message || String(e)}`)
                    }
                }
            }
        },
    }
}

export default plugin
