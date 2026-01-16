import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTsWithMapping, CsstsInit } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { findUpSync } from 'find-up'

// 日志文件路径
const LOG_FILE = path.join(process.cwd(), 'cssts-plugin-debug.log')
const LOG_PREFIX = '[language-plugin-cssts]'

function log(...args: any[]) {
	const message = `${new Date().toISOString()} ${LOG_PREFIX} ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
	try {
		fs.appendFileSync(LOG_FILE, message)
	} catch (e: any) {
		console.error(`${LOG_PREFIX} Failed to write log:`, e?.message || e)
	}
	console.log(LOG_PREFIX, ...args)
}

function logError(...args: any[]) {
	const message = `${new Date().toISOString()} ${LOG_PREFIX} ERROR: ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
	try {
		fs.appendFileSync(LOG_FILE, message)
	} catch (e: any) {
		console.error(`${LOG_PREFIX} Failed to write error log:`, e?.message || e)
	}
	console.error(LOG_PREFIX, ...args)
}

// 初始化日志文件
try {
	fs.writeFileSync(LOG_FILE, `=== CSSTS Plugin Log Started at ${new Date().toISOString()} ===\n`)
	fs.appendFileSync(LOG_FILE, `Working directory: ${process.cwd()}\n`)
} catch (e: any) {
	console.error(`${LOG_PREFIX} Failed to initialize log file:`, e?.message || e)
}

/**
 * 从指定路径向上查找最近的 node_modules 目录
 * 使用 find-up 库，支持 monorepo 中 node_modules 被 hoist 到根目录的情况
 */
function findNearestNodeModules(startPath: string): string | null {
	const result = findUpSync('node_modules', {
		cwd: path.dirname(startPath),
		type: 'directory'
	})
	return result || null
}

/**
 * CSSTS Vue Language Plugin
 *
 * 核心思路：在 resolveEmbeddedCode 中修改 Volar 已有的脚本块内容
 */
let initialized = false

/**
 * 初始化 CsstsInit（延迟到第一次处理文件时调用）
 */
function initCssts(fileName: string): void {
	if (initialized) return

	const nodeModulesDir = findNearestNodeModules(fileName)
	if (!nodeModulesDir) {
		throw new Error(`Cannot find node_modules from path: ${fileName}`)
	}

	const dtsOutputDir = path.join(nodeModulesDir, '@types', 'cssts-ts')
	log('📁 Found node_modules:', nodeModulesDir)
	log('📁 DTS output dir:', dtsOutputDir)

	CsstsInit.init({ dtsOutputDir })
	log('✅ CsstsInit initialized')
	initialized = true
}

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
						// 延迟初始化：在第一次处理文件时使用 fileName 来查找 node_modules
						initCssts(fileName)

						// 转换 cssts 为 TypeScript
						const result = transformCssTsWithMapping(scriptBlock.content)
						const tsCode = result.code
						const offsets = SlimeMappingConverter.convertMappings(result.mapping)
						log('   ✅ Transform success, tsCode length:', tsCode.length, 'mappings:', offsets.length)

						// 清空现有内容
						embeddedFile.content.length = 0

						// 功能配置
						const features = {
							verification: true,
							completion: true,
							semantic: true,
							navigation: true,
							structure: true,
							format: true,
						}

						if (offsets.length > 0) {
							// 按 mapping 拆分代码为多个 Segments
							// 注意：需要包含映射之间的间隙代码
							let lastGenEnd = 0
							for (const m of offsets) {
								// 1. 输出上一个 mapping 结束到当前 mapping 开始之间的代码（无映射）
								if (m.generated.offset > lastGenEnd) {
									const gapText = tsCode.slice(lastGenEnd, m.generated.offset)
									embeddedFile.content.push(gapText)  // 纯字符串，无映射
								}
								// 2. 输出当前 mapping 对应的代码（有映射）
								const text = tsCode.slice(m.generated.offset, m.generated.offset + m.generated.length)
								embeddedFile.content.push([text, scriptBlock.name, m.original.offset, features])
								lastGenEnd = m.generated.offset + m.generated.length
							}
							// 3. 输出剩余代码（无映射）
							if (lastGenEnd < tsCode.length) {
								const remainingText = tsCode.slice(lastGenEnd)
								embeddedFile.content.push(remainingText)
							}
							log('   ✅ Created segments with mapping, last offset:', lastGenEnd)
						} else {
							// 没有 mapping 时，整体作为一个 segment
							embeddedFile.content.push([tsCode, scriptBlock.name, 0, features])
							log('   ⚠️ No mappings, using whole code as single segment')
						}
						log('   ✅ Replaced embeddedFile content')
					} catch (e: any) {
						logError('Transform error:', e?.message || String(e))
						if (e?.stack) {
							logError('Stack:', e.stack)
						}
					}
				}
			}
		},
	}
}

export default plugin
