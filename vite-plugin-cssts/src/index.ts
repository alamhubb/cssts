import type { Plugin, ResolvedConfig } from 'vite'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  transformCssTs,
  generateStylesCss,
  generateCsstsAtomModule,
  generateAtoms,
  generateCsstsAtomsDts,
  type CsstsConfig,
  type PseudoUtilsConfig,
  defaultConfig
} from 'cssts-compiler'

// ==================== 插件配置 ====================

export interface CssTsPluginOptions {
  classPrefix?: string
  pseudoUtils?: PseudoUtilsConfig
  /** 外部传入的共享样式集合，不传则内部创建 */
  globalStyles?: Set<string>
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
 * 检查 Vue 文件是否有 <script lang="cssts"> 标签
 * 注意：必须确保匹配的是真正的 script 标签，而不是注释中的文本
 */
function hasScriptLangCssts(code: string): boolean {
  // 先移除所有注释，避免匹配到注释中的 <script lang="cssts">
  const codeWithoutComments = code
    .replace(/\/\/.*$/gm, '') // 移除单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
  return /<script[^>]*\slang\s*=\s*["']cssts["'][^>]*>/.test(codeWithoutComments)
}

/**
 * 从 .vue 文件中提取 <script lang="cssts"> 内容
 */
function extractVueCsstsScript(code: string): {
  script: string
  start: number
  end: number
  isSetup: boolean
} | null {
  // 匹配 <script lang="cssts"> 或 <script setup lang="cssts">
  const scriptMatch = code.match(/<script(\s+setup)?[^>]*\slang\s*=\s*["']cssts["'][^>]*>([\s\S]*?)<\/script>/)
  if (!scriptMatch) return null

  const fullMatch = scriptMatch[0]
  const start = code.indexOf(fullMatch)
  const end = start + fullMatch.length
  const isSetup = scriptMatch[1] !== undefined
  const script = scriptMatch[2]

  return { script, start, end, isSetup }
}

/**
 * 重建 .vue 文件，将 lang="cssts" 改为 lang="ts" 并替换 script 内容
 */
function rebuildVueFile(
  originalCode: string,
  scriptInfo: { start: number; end: number; isSetup: boolean },
  newScriptContent: string
): string {
  const before = originalCode.slice(0, scriptInfo.start)
  const after = originalCode.slice(scriptInfo.end)
  
  // 构建新的 script 标签，将 lang="cssts" 改为 lang="ts"
  const setupAttr = scriptInfo.isSetup ? ' setup' : ''
  const newOpenTag = `<script${setupAttr} lang="ts">`
  
  return `${before}${newOpenTag}\n${newScriptContent}\n</script>${after}`
}

/**
 * 创建 esbuild 插件，用于依赖扫描阶段处理 cssts 语法
 */
function createEsbuildPlugin() {
  return {
    name: 'cssts-esbuild',
    setup(build: any) {
      // 处理 .cssts 文件
      build.onLoad({ filter: /\.cssts$/ }, async (args: any) => {
        const fs = await import('node:fs')
        const code = fs.readFileSync(args.path, 'utf-8')
        // 将 css { ... } 替换为 {}，让 esbuild 能解析
        const transformed = code.replace(/\bcss\s*\{[^}]*\}/g, '{}')
        return { contents: transformed, loader: 'ts' }
      })

      // 处理 .vue 文件中的 <script lang="cssts">
      build.onLoad({ filter: /\.vue$/ }, async (args: any) => {
        const fs = await import('node:fs')
        const code = fs.readFileSync(args.path, 'utf-8')

        // 只处理包含 <script lang="cssts"> 的文件
        if (!hasScriptLangCssts(code)) {
          return null // 让其他 loader 处理
        }

        // 将 css { ... } 替换为 {}，让 esbuild 能解析
        const transformed = code.replace(
          /(<script[^>]*lang\s*=\s*["']cssts["'][^>]*>)([\s\S]*?)(<\/script>)/,
          (match, open, content, close) => {
            const newContent = content.replace(/\bcss\s*\{[^}]*\}/g, '{}')
            // 将 lang="cssts" 改为 lang="ts"
            const newOpen = open.replace(/lang\s*=\s*["']cssts["']/, 'lang="ts"')
            return newOpen + newContent + close
          }
        )

        return { contents: transformed, loader: 'text' }
      })
    }
  }
}


// ==================== 自动生成类型文件 ====================

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

declare module 'cssts-ts' {
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
  const enableDts = options.dts !== false

  /**
   * 检查文件是否需要处理
   * 只处理 .cssts 文件和包含 <script lang="cssts"> 的 .vue 文件
   */
  function shouldTransform(id: string, code: string): boolean {
    if (id.includes('node_modules')) return false

    // 忽略 Vue 虚拟模块（带有 ? 查询参数的请求）
    // 这些是 @vitejs/plugin-vue 处理后的虚拟模块
    if (id.includes('?')) return false

    // .cssts 文件总是处理
    if (id.endsWith('.cssts')) return true

    // .vue 文件只有包含 <script lang="cssts"> 才处理
    if (id.endsWith('.vue')) {
      return hasScriptLangCssts(code)
    }

    return false
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
        let vueScriptInfo: ReturnType<typeof extractVueCsstsScript> = null

        // 对于 .vue 文件，提取 <script lang="cssts"> 内容
        if (isVueFile) {
          vueScriptInfo = extractVueCsstsScript(code)
          if (!vueScriptInfo) {
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
      if (file.endsWith('.cssts') || file.endsWith('.vue')) {
        invalidateModules()
      }
    },
  }
}

export { VIRTUAL_CSS_ID, VIRTUAL_ATOM_ID }
