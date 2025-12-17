import type { Plugin, ResolvedConfig } from 'vite'
import * as fs from 'node:fs'
import * as path from 'node:path'
// 在 monorepo 中直接引用源码，发布时需要改为包名
import { 
  transformCssTs,
  generateStylesCss,
  generateCsstsAtomModule
} from '../../cssts/packages/cssts-compiler/src/transform/index.js'
import { type PseudoUtilsConfig } from '../../cssts/packages/cssts-compiler/src/generator/config.js'

// ==================== 插件配置 ====================

export interface CssTsPluginOptions {
  classPrefix?: string
  pseudoUtils?: PseudoUtilsConfig
  /** 外部传入的共享样式集合，不传则内部创建 */
  globalStyles?: Set<string>
  /** 
   * 需要处理的文件扩展名
   * 默认: ['.cssts', '.vue']
   */
  include?: string[]
  /**
   * 是否自动生成类型声明文件
   * 默认: true
   */
  dts?: boolean
}

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
  return /\bcss\s*\{/.test(code)
}

/**
 * 从 .vue 文件中提取 <script> 内容
 */
function extractVueScript(code: string): { script: string; start: number; end: number; isSetup: boolean; openTag: string } | null {
  // 匹配 <script> 或 <script setup>（保留完整的开始标签）
  const scriptMatch = code.match(/<script(\s+setup)?([^>]*)>([\s\S]*?)<\/script>/)
  if (!scriptMatch) return null
  
  const fullMatch = scriptMatch[0]
  const start = code.indexOf(fullMatch)
  const end = start + fullMatch.length
  const isSetup = scriptMatch[1] !== undefined
  const attrs = scriptMatch[2] || ''
  const script = scriptMatch[3]
  
  // 保留原始的 script 标签属性
  const openTag = `<script${scriptMatch[1] || ''}${attrs}>`
  
  return { script, start, end, isSetup, openTag }
}

/**
 * 重建 .vue 文件，替换 script 内容
 */
function rebuildVueFile(
  originalCode: string, 
  scriptInfo: { start: number; end: number; openTag: string },
  newScriptContent: string
): string {
  const before = originalCode.slice(0, scriptInfo.start)
  const after = originalCode.slice(scriptInfo.end)
  return `${before}${scriptInfo.openTag}\n${newScriptContent}\n</script>${after}`
}

/**
 * 创建 esbuild 插件，用于依赖扫描阶段处理 css {} 语法
 */
function createEsbuildPlugin() {
  return {
    name: 'cssts-esbuild',
    setup(build: any) {
      // 处理 .vue 文件
      build.onLoad({ filter: /\.vue$/ }, async (args: any) => {
        const fs = await import('node:fs')
        const code = fs.readFileSync(args.path, 'utf-8')
        
        // 检查是否包含 css {} 语法
        if (!hasCssSyntax(code)) {
          return null // 让其他 loader 处理
        }
        
        // 将 css { ... } 替换为 {}，让 esbuild 能解析
        const transformed = code.replace(
          /(<script[^>]*>)([\s\S]*?)(<\/script>)/,
          (match, open, content, close) => {
            const newContent = content.replace(/\bcss\s*\{[^}]*\}/g, '{}')
            return open + newContent + close
          }
        )
        
        return { contents: transformed, loader: 'text' }
      })
      
      // 处理 .cssts.js 文件
      build.onLoad({ filter: /\.cssts\.js$/ }, () => ({
        contents: 'export default {}',
        loader: 'js'
      }))
    }
  }
}

// ==================== 自动生成类型文件 ====================

import { 
  generateAtoms,
  generateCsstsAtomsDts,
  type CsstsConfig,
  defaultConfig
} from '../../cssts/packages/cssts-compiler/src/generator/index.js'

/**
 * 生成类型文件到 node_modules/@types/cssts/
 * TypeScript 会自动从 @types 目录发现类型
 */
function generateDtsFiles(root: string, userConfig?: CsstsConfig): void {
  const typesDir = path.join(root, 'node_modules', '@types', 'cssts')
  
  // 确保目录存在
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }

  // 使用用户配置或默认配置生成原子类
  const config = userConfig || defaultConfig
  const atoms = generateAtoms(config)

  // 生成 package.json
  const packageJson = {
    name: '@types/cssts',
    version: '0.0.0',
    types: 'index.d.ts'
  }
  fs.writeFileSync(
    path.join(typesDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )

  // 生成 CsstsAtoms.d.ts
  const atomsDts = generateCsstsAtomsDts(atoms)
  fs.writeFileSync(path.join(typesDir, 'CsstsAtoms.d.ts'), atomsDts)

  // 生成 index.d.ts
  const indexDts = `/**
 * CSSTS 类型声明 - 自动生成
 * 由 vite-plugin-cssts 在启动时生成
 */

import type { CsstsAtoms } from './CsstsAtoms'

export type { CsstsAtoms }

export type StyleObject = Record<string, boolean>

export interface CsstsRuntime {
  $cls(...styles: (StyleObject | false | null | undefined)[]): StyleObject
  replace(target: string | StyleObject, newAtom: StyleObject | string): string | StyleObject
  replaceAll(target: string | StyleObject, newAtoms: (StyleObject | string)[]): string | StyleObject
}

declare module 'cssts' {
  export const cssts: CsstsRuntime
  export const $cls: CsstsRuntime['$cls']
  export const replace: CsstsRuntime['replace']
  export const replaceAll: CsstsRuntime['replaceAll']
  export default cssts
}

declare module 'virtual:cssts.css' {}

declare module 'virtual:csstsAtom' {
  export const csstsAtom: CsstsAtoms
  export default csstsAtom
}

declare global {
  const csstsAtom: CsstsAtoms
}
`
  fs.writeFileSync(path.join(typesDir, 'index.d.ts'), indexDts)

  console.log(`[cssts] 已生成类型定义 (${atoms.length} 个原子类)`)
}

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  let server: any = null
  let config: ResolvedConfig
  const prefix = options.classPrefix || ''
  const pseudoUtils = options.pseudoUtils
  const globalStyles = options.globalStyles || new Set<string>()
  const includeExts = options.include || ['.cssts', '.vue']
  const enableDts = options.dts !== false

  /**
   * 检查文件是否需要处理
   */
  function shouldTransform(id: string, code: string): boolean {
    if (id.includes('node_modules')) return false
    
    const matchedExt = includeExts.some(ext => id.endsWith(ext))
    if (!matchedExt) return false
    
    // .cssts 文件总是处理
    if (id.endsWith('.cssts')) return true
    
    // 其他文件只有包含 css {} 语法才处理
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

    // 注入 esbuild 插件，处理依赖扫描阶段
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [createEsbuildPlugin()]
          }
        }
      }
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig
      // 自动生成类型文件到 node_modules/@types/cssts/
      if (enableDts) {
        generateDtsFiles(config.root)
      }
    },

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
            return null
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

        // HMR
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

export { VIRTUAL_CSS_ID, VIRTUAL_ATOM_ID }
