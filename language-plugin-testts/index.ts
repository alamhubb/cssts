import type { VueLanguagePlugin } from '@vue/language-core'
import Glog from 'glogjs'

// 版本号
const PLUGIN_VERSION = '1.0.0-test'

// 初始化 Glog
Glog.init({ level: 'debug' })
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

/**
 * 测试用 Vue Language Plugin
 * 使用纯 TypeScript 语法，不做任何转换，只做 1:1 映射
 * 用于验证 Volar 插件的基本功能是否正常
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

            // 只处理 lang="testts" 的脚本
            if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
                const scriptBlock = sfc.scriptSetup || sfc.script

                if (scriptBlock && scriptBlock.lang === 'testts') {
                    Glog.info(`[testts] ✅ Found testts script block! length: ${scriptBlock.content.length}`)

                    const sourceCode = scriptBlock.content

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

                    // 方案1: 最简单的 1:1 映射 - 整个代码作为一个 segment
                    // 源码 offset 0，长度 = 源码长度
                    embeddedFile.content.push([
                        sourceCode,           // 生成的代码（和源码一样）
                        scriptBlock.name,     // 源文件标识
                        0,                    // 源码起始偏移
                        features              // 启用的功能
                    ])

                    Glog.info(`[testts] ✅ Created 1:1 mapping, code length: ${sourceCode.length}`)
                    Glog.debug(`[testts] Code preview: ${sourceCode.substring(0, 100)}...`)
                }
            }
        },
    }
}

export default plugin
