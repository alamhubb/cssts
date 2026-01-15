import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTsWithMapping, CsstsInit } from 'cssts-compiler'
import * as fs from 'node:fs'
import * as path from 'node:path'

// 日志文件路径
const LOG_FILE = path.join(process.cwd(), 'cssts-plugin-debug.log')
const LOG_PREFIX = '[language-plugin-cssts]'

function log(...args: any[]) {
	const message = `${new Date().toISOString()} ${LOG_PREFIX} ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
	try {
		fs.appendFileSync(LOG_FILE, message)
	} catch (e) {
		// 忽略写入错误
	}
	console.log(LOG_PREFIX, ...args)
}

function logError(...args: any[]) {
	const message = `${new Date().toISOString()} ${LOG_PREFIX} ERROR: ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
	try {
		fs.appendFileSync(LOG_FILE, message)
	} catch (e) {
		// 忽略写入错误
	}
	console.error(LOG_PREFIX, ...args)
}

// 初始化日志文件
try {
	fs.writeFileSync(LOG_FILE, `=== CSSTS Plugin Log Started at ${new Date().toISOString()} ===\n`)
	fs.appendFileSync(LOG_FILE, `Working directory: ${process.cwd()}\n`)
} catch (e) {
	// 忽略错误
}

// 初始化 CSSTS（使用默认配置，LSP 环境不生成 DTS）
try {
	CsstsInit.init({ dts: false })
	log('✅ CsstsInit initialized')
} catch (e) {
	logError('CsstsInit failed:', e)
}

/**
 * CSSTS Vue Language Plugin
 *
 * 核心思路：在 resolveEmbeddedCode 中修改 Volar 已有的脚本块内容
 */
const plugin: VueLanguagePlugin = ({ modules }) => {
	const ts = modules.typescript
	log('🚀 Plugin factory called - plugin is being loaded!')

	return {
		name: 'language-plugin-cssts',
		version: 2.2,

		/**
		 * 不添加新的嵌入代码，而是拦截现有的
		 */
		getEmbeddedCodes(fileName, sfc) {
			log('📂 getEmbeddedCodes called, fileName:', fileName)
			log('   script lang:', sfc.script?.lang, 'scriptSetup lang:', sfc.scriptSetup?.lang)

			// 不返回新的代码块，让 Volar 使用默认的
			// 但我们会在 resolveEmbeddedCode 中修改内容
			return []
		},

		/**
		 * 拦截所有嵌入代码块的解析
		 * 
		 * 当 Volar 处理默认的脚本块时，我们替换其内容为转换后的 TypeScript
		 */
		resolveEmbeddedCode(fileName, sfc, embeddedFile) {
			log('🔧 resolveEmbeddedCode called')
			log('   fileName:', fileName)
			log('   embeddedFile.id:', embeddedFile.id)
			log('   embeddedFile.lang:', embeddedFile.lang)

			// 检查是否是脚本相关的嵌入代码
			// Volar 默认为 script setup 生成的嵌入代码 id 可能是 'script_ts' 或类似的
			if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
				log('   🔍 Detected script embedded code')

				// 检查源文件是否有 cssts 脚本
				const scriptBlock = sfc.scriptSetup || sfc.script
				if (scriptBlock && scriptBlock.lang === 'cssts') {
					log('   ✅ Found cssts script, need to transform')
					log('   Script content length:', scriptBlock.content.length)

					try {
						// 转换 cssts 为 TypeScript
						const result = transformCssTsWithMapping(scriptBlock.content)
						const tsCode = result.code
						log('   ✅ Transform success, tsCode length:', tsCode.length)

						// 清空现有内容，替换为转换后的代码
						embeddedFile.content.length = 0
						embeddedFile.content.push([
							tsCode,
							scriptBlock.name,
							0,
							{
								verification: true,
								completion: true,
								semantic: true,
								navigation: true,
								structure: true,
								format: true,
							},
						])
						log('   ✅ Replaced embeddedFile content')
					} catch (e) {
						logError('Transform error:', e)
					}
				}
			}
		},
	}
}

export default plugin
