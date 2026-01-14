import type { Plugin, ResolvedConfig } from 'vite'
import * as path from 'node:path'
import {
  transformCssTs,
  generateStylesCss,
  generateCsstsAtomModule,
  generateDtsFiles,
  type CsstsCompilerConfig,
} from 'cssts-compiler'

// ==================== 插件配置 ====================

/**
 * CSSTS Vite 插件配置
 * 
 * 继承 CsstsCompilerConfig，所有编译器配置都可以直接在顶层使用
 * 
 * @example
 * ```ts
 * // 使用默认配置
 * cssTsPlugin()
 * 
 * // 自定义配置
 * cssTsPlugin({
 *   classPrefix: 'my-',
 *   dts: true,
 *   dtsOutputDir: 'node_modules/@types/cssts-ts',
 *   properties: ['width', 'height', 'margin'],
 *   colors: ['red', 'blue', 'green'],
 *   pseudoClassConfig: { hover: { opacity: '0.9' } }
 * })
 * ```
 */
export interface CssTsPluginOptions extends Partial<CsstsCompilerConfig> {
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

// ==================== Vue SFC 解析（使用官方 @vue/compiler-sfc） ====================

import { parse as parseSfc, type SFCDescriptor, type SFCScriptBlock } from '@vue/compiler-sfc'

/**
 * 解析 Vue SFC 文件，提取 script 信息
 */
function parseVueSfc(code: string, filename: string): SFCDescriptor {
  const { descriptor } = parseSfc(code, { filename })
  return descriptor
}

/**
 * 检查 Vue 文件是否有 <script lang="cssts"> 标签
 */
function hasScriptLangCssts(code: string, filename: string = 'component.vue'): boolean {
  const descriptor = parseVueSfc(code, filename)
  return descriptor.script?.lang === 'cssts' || descriptor.scriptSetup?.lang === 'cssts'
}

/**
 * 从 Vue SFC 中获取 lang="cssts" 的 script 块
 */
function getCsstsScriptBlock(descriptor: SFCDescriptor): SFCScriptBlock | null {
  if (descriptor.scriptSetup?.lang === 'cssts') return descriptor.scriptSetup
  if (descriptor.script?.lang === 'cssts') return descriptor.script
  return null
}

/**
 * 从 .vue 文件中提取 <script lang="cssts"> 内容
 */
function extractVueCsstsScript(code: string, filename: string = 'component.vue'): {
  script: string
  start: number
  end: number
  isSetup: boolean
  attrs: Record<string, string | boolean>
} | null {
  const descriptor = parseVueSfc(code, filename)
  const scriptBlock = getCsstsScriptBlock(descriptor)

  if (!scriptBlock) return null

  return {
    script: scriptBlock.content,
    start: scriptBlock.loc.start.offset,
    end: scriptBlock.loc.end.offset,
    isSetup: scriptBlock === descriptor.scriptSetup,
    attrs: scriptBlock.attrs
  }
}

/**
 * 重建 .vue 文件，将 lang="cssts" 改为 lang="ts" 并替换 script 内容
 * 
 * 使用位置信息精确替换：
 * 1. 获取原始标签的属性（除了 lang），保留其他自定义属性
 * 2. 构建新的 script 标签
 * 3. 替换整个 script 块
 */
function rebuildVueFile(
  originalCode: string,
  scriptInfo: { start: number; end: number; isSetup: boolean; attrs: Record<string, string | boolean> },
  newScriptContent: string
): string {
  // 获取原始标签的属性（除了 lang 和 setup），保留其他自定义属性
  const attrsStr = Object.entries(scriptInfo.attrs)
    .filter(([key]) => key !== 'lang' && key !== 'setup')
    .map(([key, value]) => value === true ? key : `${key}="${value}"`)
    .join(' ')

  // 构建新的 script 标签
  const setupAttr = scriptInfo.isSetup ? ' setup' : ''
  const otherAttrs = attrsStr ? ' ' + attrsStr : ''
  const newTag = `<script${setupAttr}${otherAttrs} lang="ts">\n${newScriptContent}\n</script>`

  // 找到原始 <script> 标签的开始位置
  const beforeContent = originalCode.slice(0, scriptInfo.start)
  const scriptTagStart = beforeContent.lastIndexOf('<script')

  // </script> 紧跟在 content 之后
  const scriptEndOffset = scriptInfo.end + '</script>'.length

  // 替换整个 script 块
  const before = originalCode.slice(0, scriptTagStart)
  const after = originalCode.slice(scriptEndOffset)

  return before + newTag + after
}

/**
 * 简单替换 css { ... } 语法为 {}
 * 用于 esbuild 依赖扫描阶段，让 esbuild 能解析 import 语句
 */
function stripCssSyntax(code: string): string {
  return code.replace(/\bcss\s*\{[^}]*\}/g, '{}')
}

/**
 * 创建 esbuild 插件，用于 Vite 依赖扫描阶段
 * 
 * 为什么需要这个插件？
 * Vite 在开发模式启动时，会使用 esbuild 扫描所有源码文件以发现依赖关系。
 * esbuild 不认识 css { } 这种自定义语法，会导致扫描失败。
 * 
 * 这个插件在 esbuild 扫描阶段做简单替换（css { ... } → {}），
 * 让 esbuild 能正常解析 import 语句。
 * 
 * 注意：这里只做简单替换让 esbuild 能解析，不做完整转换。
 * 完整的 cssts 转换由 Vite 的 transform 钩子处理。
 */
function createEsbuildPlugin() {
  return {
    name: 'cssts-esbuild',
    setup(build: any) {
      // 处理 .cssts 文件
      build.onLoad({ filter: /\.cssts$/ }, async (args: any) => {
        const fs = await import('node:fs')
        const code = fs.readFileSync(args.path, 'utf-8')
        const transformed = stripCssSyntax(code)
        return { contents: transformed, loader: 'ts' }
      })

      // 处理 .vue 文件中的 <script lang="cssts">
      build.onLoad({ filter: /\.vue$/ }, async (args: any) => {
        const fs = await import('node:fs')
        const code = fs.readFileSync(args.path, 'utf-8')

        // 检查是否有 <script lang="cssts">
        if (!hasScriptLangCssts(code, args.path)) {
          return null // 不是 cssts，让 Vue 插件处理
        }

        // 提取 script 内容
        const scriptInfo = extractVueCsstsScript(code, args.path)
        if (!scriptInfo) return null

        const newContent = stripCssSyntax(scriptInfo.script)
        const transformed = rebuildVueFile(code, scriptInfo, newContent)

        return { contents: transformed, loader: 'text' }
      })
    }
  }
}

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  const globalStyles = options.globalStyles ?? new Set<string>()
  let server: any = null

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

    // 注入 esbuild 插件，处理依赖扫描阶段的 cssts 语法
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [createEsbuildPlugin()]
          }
        }
      }
    },

    configResolved(_resolvedConfig) {
      if (options.dts !== false) {
        generateDtsFiles(options)
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
        return generateStylesCss(globalStyles, options.classPrefix)
      }
      if (id === RESOLVED_VIRTUAL_ATOM_ID) {
        return generateCsstsAtomModule(globalStyles, options.classPrefix)
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
          if (!vueScriptInfo) return null
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
