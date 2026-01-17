import type { VueLanguagePlugin } from '@vue/language-core'
import { transformCssTsWithMapping, CsstsInit } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'
import * as fs from 'node:fs'
import * as path from 'node:path'
// find-up removed, using native implementation

// 版本号 - 递增确保使用最新版
const PLUGIN_VERSION = '2.1.11'
const LOG_PREFIX = '[language-plugin-cssts]'

// 向上查找文件
function findUp(filename: string, startDir: string): string | null {
	let currentDir = startDir
	while (true) {
		const filePath = path.join(currentDir, filename)
		if (fs.existsSync(filePath)) {
			return filePath
		}
		const parentDir = path.dirname(currentDir)
		if (parentDir === currentDir) {
			return null // 已到根目录
		}
		currentDir = parentDir
	}
}

// 获取 UTC+8 时间
function getUTC8Time(): string {
	const now = new Date()
	const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000)
	return utc8.toISOString().replace('Z', '+08:00')
}

// Logger 静态类
class Logger {
	private static logFile: string | null = null

	private static ensureInit(fileName?: string) {
		if (this.logFile) return
		if (!fileName) return

		try {
			const projectRoot = findUp('package.json', path.dirname(fileName))
			const logDir = projectRoot ? path.dirname(projectRoot) : process.cwd()
			this.logFile = path.join(logDir, 'cssts-plugin-debug.log')

			fs.writeFileSync(this.logFile, `=== CSSTS Plugin v${PLUGIN_VERSION} - 100% Mapping Coverage ===\n`)
			fs.appendFileSync(this.logFile, `Started at ${getUTC8Time()}\n`)
			fs.appendFileSync(this.logFile, `Project root: ${logDir}\n`)
			console.log(`${LOG_PREFIX} v${PLUGIN_VERSION} - Log file: ${this.logFile}`)
		} catch (e: any) {
			console.error(`${LOG_PREFIX} Failed to init log:`, e?.message || e)
		}
	}

	static log(fileName: string | null, ...args: any[]) {
		if (fileName) this.ensureInit(fileName)
		if (!this.logFile) return

		const message = `${getUTC8Time()} ${LOG_PREFIX} ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
		try {
			fs.appendFileSync(this.logFile, message)
		} catch { }
		console.log(LOG_PREFIX, ...args)
	}

	static error(fileName: string | null, ...args: any[]) {
		if (fileName) this.ensureInit(fileName)
		if (!this.logFile) return

		const message = `${getUTC8Time()} ${LOG_PREFIX} ERROR: ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}\n`
		try {
			fs.appendFileSync(this.logFile, message)
		} catch { }
		console.error(LOG_PREFIX, ...args)
	}
}

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
	Logger.log(fileName, '📁 Found node_modules:', nodeModulesDir)
	Logger.log(fileName, '📁 DTS output dir:', dtsOutputDir)

	CsstsInit.init({ dtsOutputDir })
	Logger.log(fileName, '✅ CsstsInit initialized')
	initialized = true
}

const plugin: VueLanguagePlugin = ({ modules }) => {
	const ts = modules.typescript

	return {
		name: 'language-plugin-cssts',
		version: 2.2,

		/**
		 * 不添加新的嵌入代码，而是拦截现有的
		 */
		getEmbeddedCodes(fileName, sfc) {
			Logger.log(fileName, '📂 getEmbeddedCodes called, fileName:', fileName)
			Logger.log(null, '   script lang:', sfc.script?.lang, 'scriptSetup lang:', sfc.scriptSetup?.lang)

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
			Logger.log(fileName, '🔧 resolveEmbeddedCode called')
			Logger.log(null, '   fileName:', fileName)
			Logger.log(null, '   embeddedFile.id:', embeddedFile.id)
			Logger.log(null, '   embeddedFile.lang:', embeddedFile.lang)

			// 检查是否是脚本相关的嵌入代码
			// Volar 默认为 script setup 生成的嵌入代码 id 可能是 'script_ts' 或类似的
			if (embeddedFile.id === 'script_ts' || embeddedFile.id === 'scriptsetup_raw') {
				Logger.log(null, '   🔍 Detected script embedded code')

				// 检查源文件是否有 cssts 脚本
				const scriptBlock = sfc.scriptSetup || sfc.script
				if (scriptBlock && scriptBlock.lang === 'cssts') {
					Logger.log(null, '   ✅ Found cssts script, need to transform')
					Logger.log(null, '   Script content length:', scriptBlock.content.length)

					try {
						// 延迟初始化：在第一次处理文件时使用 fileName 来查找 node_modules
						initCssts(fileName)

						// 转换 cssts 为 TypeScript
						const result = transformCssTsWithMapping(scriptBlock.content)
						const tsCode = result.code
						const offsets = SlimeMappingConverter.convertMappings(result.mapping)
						Logger.log(null, '   ✅ Transform success, tsCode length:', tsCode.length, 'mappings:', offsets.length)

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
							Logger.log(null, '   ✅ Created segments with mapping, last offset:', lastGenEnd)
						} else {
							// 没有 mapping 时，整体作为一个 segment
							embeddedFile.content.push([tsCode, scriptBlock.name, 0, features])
							Logger.log(null, '   ⚠️ No mappings, using whole code as single segment')
						}
						Logger.log(null, '   ✅ Replaced embeddedFile content')
					} catch (e: any) {
						Logger.error(null, 'Transform error:', e?.message || String(e))
						if (e?.stack) {
							Logger.error(null, 'Stack:', e.stack)
						}
					}
				}
			}
		},
	}
}

export default plugin
