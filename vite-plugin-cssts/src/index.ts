import type { Plugin } from 'vite'
import { 
  transformCssTs,
  generateStylesCss,
  generateCsstsAtomModule
} from 'cssts-compiler/src/transform/index.js'
import { type PseudoUtilsConfig } from 'cssts-compiler/src/generator/config.ts'

// ==================== 插件配置 ====================

export interface CssTsPluginOptions {
  classPrefix?: string
  pseudoUtils?: PseudoUtilsConfig
  /** 外部传入的共享样式集合，不传则内部创建 */
  globalStyles?: Set<string>
  /** 
   * 需要处理的文件扩展名（默认只处理 .cssts）
   * 可以添加 '.js', '.vue' 等
   */
  include?: string[]
}

// 用于存储预处理后的 .vue 文件内容
const vuePreprocessedCache = new Map<string, string>()

// ==================== 虚拟模块 ====================

const VIRTUAL_CSS_ID = 'virtual:cssts.css'
const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID
const VIRTUAL_ATOM_ID = 'virtual:csstsAtom'
const RESOLVED_VIRTUAL_ATOM_ID = '\0' + VIRTUAL_ATOM_ID

// ==================== 工具函数 ====================

/**
 * 检查代码是否包含 css {} 语法
 */
function hasCssSyntax(code: string): boolean {
  // 匹配 css { ... } 语法（简单检测）
  return /\bcss\s*\{/.test(code)
}

/**
 * 从 .vue 文件中提取 <script> 内容
 */
function extractVueScript(code: string): { script: string; start: number; end: number; isSetup: boolean } | null {
  // 匹配 <script> 或 <script setup>（不带 lang="ts"）
  const scriptMatch = code.match(/<script(\s+setup)?(?:\s+[^>]*)?>[\s\S]*?<\/script>/)
  if (!scriptMatch) return null
  
  const fullMatch = scriptMatch[0]
  const start = code.indexOf(fullMatch)
  const end = start + fullMatch.length
  
  // 提取 script 标签内的内容
  const contentMatch = fullMatch.match(/<script[^>]*>([\s\S]*?)<\/script>/)
  if (!contentMatch) return null
  
  const isSetup = scriptMatch[1] !== undefined
  return { script: contentMatch[1], start, end, isSetup }
}

/**
 * 重建 .vue 文件，替换 script 内容
 */
function rebuildVueFile(
  originalCode: string, 
  scriptInfo: { start: number; end: number; isSetup: boolean },
  newScriptContent: string
): string {
  const before = originalCode.slice(0, scriptInfo.start)
  const after = originalCode.slice(scriptInfo.end)
  const scriptTag = scriptInfo.isSetup ? '<script setup>' : '<script>'
  return `${before}${scriptTag}\n${newScriptContent}\n</script>${after}`
}

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  let server: any = null
  const prefix = options.classPrefix || ''
  const pseudoUtils = options.pseudoUtils
  // 外部传入就用外部的，否则内部创建
  const globalStyles = options.globalStyles || new Set<string>()
  // 默认只处理 .cssts，可以通过 include 添加 .js, .vue 等
  const includeExts = options.include || ['.cssts']

  /**
   * 检查文件是否需要处理
   */
  function shouldTransform(id: string, code: string): boolean {
    // 排除 node_modules
    if (id.includes('node_modules')) return false
    
    // 检查扩展名
    const matchedExt = includeExts.some(ext => id.endsWith(ext))
    if (!matchedExt) return false
    
    // 对于 .cssts 文件，总是处理
    if (id.endsWith('.cssts')) return true
    
    // 对于其他文件（.js, .vue），只有包含 css {} 语法才处理
    return hasCssSyntax(code)
  }

  /**
   * 使 HMR 模块失效
   */
  function invalidateModules() {
    if (!server) return
    const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
    if (cssMod) server.moduleGraph.invalidateModule(cssMod)
    const atomMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ATOM_ID)
    if (atomMod) server.moduleGraph.invalidateModule(atomMod)
  }

  return {
    name: 'vite-plugin-cssts',
    enforce: 'pre',

    configureServer(_server) { 
      server = _server 
    },

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) return RESOLVED_VIRTUAL_CSS_ID
      if (id === VIRTUAL_ATOM_ID) return RESOLVED_VIRTUAL_ATOM_ID
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_CSS_ID) {
        return generateStylesCss(globalStyles, pseudoUtils, prefix)
      }
      if (id === RESOLVED_VIRTUAL_ATOM_ID) {
        return generateCsstsAtomModule(globalStyles, prefix)
      }
    },

    transform(code, id) {
      if (!shouldTransform(id, code)) return null

      try {
        let codeToTransform = code
        let isVueFile = id.endsWith('.vue')
        let vueScriptInfo: ReturnType<typeof extractVueScript> = null

        // 对于 .vue 文件，提取 <script> 内容
        if (isVueFile) {
          vueScriptInfo = extractVueScript(code)
          if (!vueScriptInfo || !hasCssSyntax(vueScriptInfo.script)) {
            return null // 没有 script 或没有 css {} 语法
          }
          codeToTransform = vueScriptInfo.script
        }

        // 调用 compiler 进行转换
        const result = transformCssTs(codeToTransform, { styles: globalStyles })

        let transformedCode = result.code
        
        // 注入虚拟 CSS 导入
        if (result.hasStyles && !transformedCode.includes(VIRTUAL_CSS_ID)) {
          transformedCode = `import '${VIRTUAL_CSS_ID}'\n` + transformedCode
        }

        // 对于 .vue 文件，重建完整文件
        if (isVueFile && vueScriptInfo) {
          transformedCode = rebuildVueFile(code, vueScriptInfo, transformedCode)
        }

        // HMR：使虚拟模块失效
        if (result.hasStyles) {
          invalidateModules()
        }

        return { code: transformedCode, map: null }
      } catch (e: any) {
        console.error(`[cssts] Error transforming ${id}:`, e.message)
        throw e
      }
    },

    handleHotUpdate({ file }) {
      const matchedExt = includeExts.some(ext => file.endsWith(ext))
      if (matchedExt) {
        invalidateModules()
      }
    },
  }
}

/**
 * Vue 文件预处理插件
 * 
 * 这个插件必须在 vue 插件之前运行，用于处理 .vue 文件中的 css {} 语法
 * 使用 load 钩子直接读取并转换文件内容
 */
export function cssTsVuePreprocessPlugin(options: CssTsPluginOptions = {}): Plugin {
  const globalStyles = options.globalStyles || new Set<string>()
  const pseudoUtils = options.pseudoUtils
  const prefix = options.classPrefix || ''
  let server: any = null
  
  return {
    name: 'vite-plugin-cssts-vue-preprocess',
    enforce: 'pre',
    
    configureServer(_server) {
      server = _server
    },
    
    // 虚拟模块解析
    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) return RESOLVED_VIRTUAL_CSS_ID
      if (id === VIRTUAL_ATOM_ID) return RESOLVED_VIRTUAL_ATOM_ID
    },
    
    // 使用 load 钩子处理 .vue 文件和虚拟模块
    async load(id) {
      // 虚拟模块加载
      if (id === RESOLVED_VIRTUAL_CSS_ID) {
        return generateStylesCss(globalStyles, pseudoUtils, prefix)
      }
      if (id === RESOLVED_VIRTUAL_ATOM_ID) {
        return generateCsstsAtomModule(globalStyles, prefix)
      }
      
      // .vue 文件处理
      if (!id.endsWith('.vue')) return null
      if (id.includes('node_modules')) return null
      
      // 检查缓存
      if (vuePreprocessedCache.has(id)) {
        return vuePreprocessedCache.get(id)
      }
      
      try {
        // 动态导入 fs 模块
        const fs = await import('node:fs')
        const code = fs.readFileSync(id, 'utf-8')
        
        if (!hasCssSyntax(code)) return null
        
        // 提取并转换 script 内容
        const scriptInfo = extractVueScript(code)
        if (!scriptInfo || !hasCssSyntax(scriptInfo.script)) return null
        
        // 转换 css {} 语法
        const result = transformCssTs(scriptInfo.script, { styles: globalStyles })
        
        let transformedScript = result.code
        
        // 注入虚拟 CSS 导入
        if (result.hasStyles && !transformedScript.includes(VIRTUAL_CSS_ID)) {
          transformedScript = `import '${VIRTUAL_CSS_ID}'\n` + transformedScript
        }
        
        // 重建 .vue 文件
        const transformedCode = rebuildVueFile(code, scriptInfo, transformedScript)
        
        // 缓存转换后的内容
        vuePreprocessedCache.set(id, transformedCode)
        
        // HMR：使虚拟模块失效
        if (server && result.hasStyles) {
          const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
          if (cssMod) server.moduleGraph.invalidateModule(cssMod)
        }
        
        return transformedCode
      } catch (e) {
        // 如果出错，返回 null 让其他插件处理
        return null
      }
    },
    
    // HMR 时清除缓存
    handleHotUpdate({ file }) {
      if (file.endsWith('.vue')) {
        vuePreprocessedCache.delete(file)
      }
    }
  }
}

export { VIRTUAL_CSS_ID, VIRTUAL_ATOM_ID }
