import type { Plugin, ResolvedConfig } from 'vite'
import * as path from 'node:path'
import {
  transformCssTs,
  generateStylesCss,
  generateCsstsAtomModule,
  generateDtsFiles,
  type CsstsConfig,
} from 'cssts-compiler'

// ==================== 插件配置 ====================

/**
 * CSSTS Vite 插件配置
 * 
 * 基于 CsstsConfig 扩展，添加插件特有的配置
 * 
 * @example
 * ```ts
 * // 使用默认配置
 * cssTsPlugin()
 * 
 * // 自定义配置
 * cssTsPlugin({ 
 *   classPrefix: 'my-', 
 *   dts: false,
 *   pseudoClassesConfig: { hover: { filter: 'brightness(1.15)' } }
 * })
 * 
 * // 与其他插件共享样式状态
 * const sharedStyles = new Set<string>()
 * cssTsPlugin({ globalStyles: sharedStyles })
 * ```
 */
export interface CssTsPluginOptions extends Partial<CsstsConfig> {
  /**
   * 外部传入的共享样式集合
   * 用于多个插件共享样式状态（如 vite-plugin-ovs）
   * 不传则内部创建
   */
  globalStyles?: Set<string>
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

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  // 从 CsstsConfig 读取配置
  const prefix = options.classPrefix ?? ''
  const pseudoUtils = options.pseudoClassesConfig
  const enableDts = options.dts ?? true
  const dtsOutputDir = options.dtsOutputDir

  // 样式状态：外部传入或内部创建
  const globalStyles = options.globalStyles ?? new Set<string>()

  let server: any = null
  let config: ResolvedConfig

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
      // 自动生成类型文件
      if (enableDts) {
        const outputDir = dtsOutputDir ?? path.join(config.root, 'node_modules/@types/cssts-ts')
        generateDtsFiles({ outputDir })
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
