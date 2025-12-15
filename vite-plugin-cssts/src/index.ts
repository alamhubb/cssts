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
}

// ==================== 虚拟模块 ====================

const VIRTUAL_CSS_ID = 'virtual:cssts.css'
const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID
const VIRTUAL_ATOM_ID = 'virtual:csstsAtom'
const RESOLVED_VIRTUAL_ATOM_ID = '\0' + VIRTUAL_ATOM_ID

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  let server: any = null
  const prefix = options.classPrefix || ''
  const pseudoUtils = options.pseudoUtils
  // 外部传入就用外部的，否则内部创建
  const globalStyles = options.globalStyles || new Set<string>()

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
      if (!id.endsWith('.cssts')) return null

      try {
        // 调用 compiler 进行转换，直接写入全局状态
        const result = transformCssTs(code, { styles: globalStyles })

        let transformedCode = result.code
        
        // 注入虚拟 CSS 导入
        if (result.hasStyles && !transformedCode.includes(VIRTUAL_CSS_ID)) {
          transformedCode = `import '${VIRTUAL_CSS_ID}'\n` + transformedCode
        }

        // HMR：使虚拟模块失效
        if (server && result.hasStyles) {
          const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
          if (cssMod) server.moduleGraph.invalidateModule(cssMod)
          const atomMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ATOM_ID)
          if (atomMod) server.moduleGraph.invalidateModule(atomMod)
        }

        return { code: transformedCode, map: null }
      } catch (e: any) {
        console.error(`[cssts] Error transforming ${id}:`, e.message)
        throw e
      }
    },

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.cssts')) {
        const mods = []
        const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
        if (cssMod) { 
          server.moduleGraph.invalidateModule(cssMod)
          mods.push(cssMod) 
        }
        const atomMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ATOM_ID)
        if (atomMod) { 
          server.moduleGraph.invalidateModule(atomMod)
          mods.push(atomMod) 
        }
        return mods.length > 0 ? mods : undefined
      }
    },
  }
}

export { VIRTUAL_CSS_ID, VIRTUAL_ATOM_ID }
