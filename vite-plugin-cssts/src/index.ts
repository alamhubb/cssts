import type { Plugin } from 'vite'
import { CssTsParser } from 'cssts-compiler/src/parser/index.ts'
import { CssTsCstToAst, type CssStyleInfo } from 'cssts-compiler/src/factory/index.ts'
import { generateCssClsInterface, generateCssClsStyles } from 'cssts-compiler/src/utils/cssUtils.ts'
import { type PseudoUtilsConfig } from 'cssts-compiler/src/generator/config.ts'
import { generatePropertiesJsonSync, generateAtoms, generatePropertiesJson } from 'cssts-compiler/src/generator/index.ts'
import SlimeGenerator from 'slime-generator/src/SlimeGenerator.ts'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { CSSTS_SEPARATOR, CSSTS_PSEUDO_SEPARATOR } from 'cssts/src/index.ts'

// ==================== 属性映射表（从生成器获取）====================

// 生成 properties 映射
const atoms = generateAtoms()
const properties: Record<string, string> = generatePropertiesJson(atoms)
const sortedPropertyNames = Object.keys(properties).sort((a, b) => b.length - a.length)

// ==================== 工具函数 ====================

function parseTsAtomName(tsName: string): { property: string; value: string } | null {
  for (const propName of sortedPropertyNames) {
    if (tsName.startsWith(propName) && tsName.length > propName.length) {
      const valuePart = tsName.slice(propName.length)
      if (/^[A-Z0-9]/.test(valuePart) || /^N[0-9]/.test(valuePart)) {
        return { property: properties[propName], value: tsValueToCSS(valuePart) }
      }
    }
  }
  return null
}

function tsValueToCSS(tsValue: string): string {
  let result = tsValue
  if (result.startsWith('N') && result.length > 1 && /[0-9]/.test(result[1])) {
    result = '-' + result.slice(1)
  }
  result = result.replace(/pct/g, '%')
  result = result.replace(/(\d)p(\d)/g, '$1.$2')
  result = result.replace(/(\d)s(\d)/g, '$1/$2')
  return camelToKebab(result)
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([a-zA-Z])(\d)/g, '$1-$2').toLowerCase()
}

const symbolToEscape: Record<string, string> = { '.': '\\.', '%': '\\%', '/': '\\/' }

function getCssClassName(atomName: string): string {
  const parsed = parseTsAtomName(atomName)
  if (parsed) {
    let escapedValue = parsed.value
    for (const [symbol, escaped] of Object.entries(symbolToEscape)) {
      escapedValue = escapedValue.split(symbol).join(escaped)
    }
    return `${parsed.property}${CSSTS_SEPARATOR}${escapedValue}`
  }
  return camelToKebab(atomName)
}

function getCssProperty(atomName: string): string | undefined {
  return parseTsAtomName(atomName)?.property
}

function getCssValue(atomName: string): string | undefined {
  const className = getCssClassName(atomName)
  const idx = className.indexOf('_')
  if (idx > 0) {
    return className.slice(idx + 1).replace(/\\\./g, '.').replace(/\\%/g, '%').replace(/\\\//g, '/')
  }
  return undefined
}

// ==================== 插件配置 ====================

export interface CssTsPluginOptions {
  dtsOutput?: string
  stylesOutput?: string
  autoGenerate?: boolean
  transformClass?: boolean
  runtimeImport?: string
  classPrefix?: string
  usedAtoms?: Set<string>
  pseudoUtils?: PseudoUtilsConfig
}

// ==================== 虚拟模块 ====================

const VIRTUAL_CSS_ID = 'virtual:cssts.css'
const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID
const VIRTUAL_ATOM_ID = 'virtual:csstsAtom'
const RESOLVED_VIRTUAL_ATOM_ID = '\0' + VIRTUAL_ATOM_ID

const globalStyles = new Map<string, CssStyleInfo>()
const globalUsedAtoms = new Set<string>()

// 存储带伪类的样式：varName -> { className, pseudos, atoms }
interface PseudoStyleInfo {
  className: string
  pseudos: string[]
  atoms: string[]
}
const globalPseudoStyles = new Map<string, PseudoStyleInfo>()

// ==================== $$ 伪类语法（简单实现）====================

/**
 * 解析变量名中的 $$ 伪类标记（双美元符号）
 * 
 * 示例：
 * - 'clickable$$hover' -> { className: 'clickable', pseudos: ['hover'] }
 * - 'btn$$hover$$active' -> { className: 'btn', pseudos: ['hover', 'active'] }
 */
export function parsePseudoFromVarName(varName: string): { className: string; pseudos: string[] } {
  const parts = varName.split(CSSTS_PSEUDO_SEPARATOR)
  return { className: parts[0], pseudos: parts.slice(1) }
}

// ==================== CSS 生成 ====================

function generateAtomCssRule(atomName: string, prefix: string = ''): string | null {
  const className = getCssClassName(atomName)
  const property = getCssProperty(atomName)
  const value = getCssValue(atomName)
  if (!property || !value) return null
  const fullClassName = prefix ? `${prefix}${className}` : className
  return `.${fullClassName} { ${property}: ${value}; }`
}

/**
 * 生成伪类 CSS 规则
 * 
 * @param className - 基础类名（如 'clickable'）
 * @param pseudo - 伪类名（如 'hover'）
 * @param pseudoConfig - 伪类配置（如 { opacity: '0.9' } 或 [{ opacity: '0.5' }, { cursor: 'not-allowed' }]）
 * @param prefix - 类名前缀
 */
function generatePseudoCssRule(
  className: string,
  pseudo: string,
  pseudoConfig: Record<string, string> | Record<string, string>[],
  prefix: string = ''
): string {
  const fullClassName = prefix ? `${prefix}${className}` : className
  
  // 处理数组格式（多个属性）
  const configs = Array.isArray(pseudoConfig) ? pseudoConfig : [pseudoConfig]
  const props = configs
    .flatMap(config => Object.entries(config))
    .map(([prop, val]) => `${prop}: ${val}`)
    .join('; ')
  
  return `.${fullClassName}:${pseudo} { ${props}; }`
}

/**
 * 生成所有 CSS（原子类 + 伪类样式）
 */
function generateUsedAtomsCss(
  usedAtoms: Set<string>,
  pseudoStyles: Map<string, PseudoStyleInfo>,
  pseudoUtils: PseudoUtilsConfig | undefined,
  prefix: string = ''
): string {
  const lines: string[] = ['/* Auto-generated by vite-plugin-cssts */', '']
  
  // 1. 生成原子类 CSS
  const grouped = new Map<string, string[]>()
  for (const atomName of usedAtoms) {
    const rule = generateAtomCssRule(atomName, prefix)
    if (rule) {
      const property = getCssProperty(atomName) || 'other'
      if (!grouped.has(property)) grouped.set(property, [])
      grouped.get(property)!.push(rule)
    }
  }
  
  for (const property of [...grouped.keys()].sort()) {
    lines.push(`/* ${property} */`)
    lines.push(...grouped.get(property)!.sort())
    lines.push('')
  }
  
  // 2. 生成伪类 CSS（如果有配置）
  if (pseudoUtils && pseudoStyles.size > 0) {
    lines.push('/* $$ Pseudo-class styles */')
    
    for (const [_varName, info] of pseudoStyles) {
      const { className, pseudos } = info
      
      for (const pseudo of pseudos) {
        const pseudoConfig = pseudoUtils[pseudo]
        if (pseudoConfig) {
          const rule = generatePseudoCssRule(className, pseudo, pseudoConfig, prefix)
          lines.push(rule)
        }
      }
    }
    lines.push('')
  }
  
  return lines.join('\n')
}

function generateCsstsAtomModule(
  usedAtoms: Set<string>,
  pseudoStyles: Map<string, PseudoStyleInfo>,
  prefix: string = ''
): string {
  const lines: string[] = [
    '// Auto-generated by vite-plugin-cssts',
    '',
    'export const csstsAtom = {',
  ]
  const allAtoms = new Map<string, string>()
  for (const atomName of usedAtoms) {
    const className = getCssClassName(atomName)
    allAtoms.set(atomName, prefix ? `${prefix}${className}` : className)
  }
  const sortedAtoms = [...allAtoms.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  
  const entries: string[] = []
  
  // 添加原子类
  for (const [atomName, className] of sortedAtoms) {
    entries.push(`  ${atomName}: { '${className}': true }`)
  }
  
  // 添加伪类样式（包含基础类名）
  for (const [varName, info] of pseudoStyles) {
    const fullClassName = prefix ? `${prefix}${info.className}` : info.className
    entries.push(`  '${varName}': { '${fullClassName}': true }`)
  }
  
  lines.push(entries.join(',\n'))
  lines.push('}', '', 'export default csstsAtom', '')
  return lines.join('\n')
}

// ==================== 文件转换 ====================

function transformCssTs(code: string, _id: string): { 
  code: string
  styles: Map<string, CssStyleInfo>
  usedAtoms: Set<string>
  pseudoStyles: Map<string, PseudoStyleInfo>
} {
  const parser = new CssTsParser(code)
  const cst = parser.Program()
  const transformer = new CssTsCstToAst(getCssClassName)
  const ast = transformer.toProgram(cst)
  const styles = transformer.getCssStyles()
  const usedAtoms = transformer.getUsedAtoms()
  const tokens = parser.parsedTokens
  const result = SlimeGenerator.generator(ast, tokens)
  
  // 从源代码中直接提取带 $$ 伪类的变量声明
  const pseudoStyles = extractPseudoStylesFromCode(code)
  
  return { code: result.code, styles, usedAtoms, pseudoStyles }
}

/**
 * 从源代码中提取带 $$ 伪类的变量声明
 * 
 * 匹配模式：const varName$$pseudo1$$pseudo2 = css { ... }
 */
function extractPseudoStylesFromCode(code: string): Map<string, PseudoStyleInfo> {
  const pseudoStyles = new Map<string, PseudoStyleInfo>()
  
  // 匹配 const/let/var xxx$$yyy = css { ... } 模式
  const regex = /(?:const|let|var)\s+(\w+(?:\$\$\w+)+)\s*=/g
  let match
  
  while ((match = regex.exec(code)) !== null) {
    const varName = match[1]
    const { className, pseudos } = parsePseudoFromVarName(varName)
    
    if (pseudos.length > 0) {
      pseudoStyles.set(varName, {
        className: camelToKebab(className),
        pseudos,
        atoms: [] // 原子类信息不需要，伪类 CSS 来自配置
      })
    }
  }
  
  return pseudoStyles
}

function generateOutputFiles(styles: Map<string, CssStyleInfo>, usedAtoms: Set<string>, root: string, options: CssTsPluginOptions) {
  const dtsPath = path.resolve(root, options.dtsOutput || 'src/cssts/CssCls.d.ts')
  const stylesPath = path.resolve(root, options.stylesOutput || 'src/cssts/CssCls.styles.ts')
  const prefix = options.classPrefix || ''
  const dtsDir = path.dirname(dtsPath)
  const stylesDir = path.dirname(stylesPath)
  if (!fs.existsSync(dtsDir)) fs.mkdirSync(dtsDir, { recursive: true })
  if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true })
  fs.writeFileSync(dtsPath, generateCssClsInterface(styles, prefix), 'utf-8')
  fs.writeFileSync(stylesPath, generateCssClsStyles(styles, prefix), 'utf-8')
  console.log(`[cssts] Generated ${dtsPath}`)
  console.log(`[cssts] Generated ${stylesPath}`)
}

// ==================== Vue Template 转换 ====================

function transformVueTemplate(code: string, runtimeImport: string): { code: string; transformed: boolean } {
  let transformed = false
  const classBindingRegex = /(:class|v-bind:class)="([^"]+)"/g
  let newCode = code.replace(classBindingRegex, (match, attr, expr) => {
    if (expr.includes('cssts.$cls')) return match
    const trimmedExpr = expr.trim()
    if (trimmedExpr.startsWith('{') || trimmedExpr.startsWith('[')) return match
    if (hasTopLevelComma(expr)) {
      transformed = true
      return `${attr}="cssts.$cls(${expr})"`
    }
    return match
  })
  if (transformed) newCode = injectCsstsImport(newCode, runtimeImport)
  return { code: newCode, transformed }
}

function hasTopLevelComma(expr: string): boolean {
  let depth = 0, inString = false, stringChar = ''
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i], prevChar = i > 0 ? expr[i - 1] : ''
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) { inString = true; stringChar = char }
      else if (char === stringChar) inString = false
      continue
    }
    if (inString) continue
    if (char === '(' || char === '[' || char === '{') depth++
    else if (char === ')' || char === ']' || char === '}') depth--
    else if (char === ',' && depth === 0) return true
  }
  return false
}

function injectCsstsImport(code: string, runtimeImport: string): string {
  if (code.includes(`from '${runtimeImport}'`) || code.includes(`from "${runtimeImport}"`)) return code
  const scriptSetupMatch = code.match(/<script\s+setup[^>]*>/i)
  if (scriptSetupMatch) {
    const insertPos = scriptSetupMatch.index! + scriptSetupMatch[0].length
    return code.slice(0, insertPos) + `\nimport { cssts } from '${runtimeImport}'` + code.slice(insertPos)
  }
  const scriptMatch = code.match(/<script[^>]*>/i)
  if (scriptMatch) {
    const insertPos = scriptMatch.index! + scriptMatch[0].length
    return code.slice(0, insertPos) + `\nimport { cssts } from '${runtimeImport}'` + code.slice(insertPos)
  }
  return code
}

// ==================== Vite Plugin ====================

export default function cssTsPlugin(options: CssTsPluginOptions = {}): Plugin {
  let root = '', isDev = false, server: any = null
  const runtimeImport = options.runtimeImport || 'cssts'
  const prefix = options.classPrefix || ''
  const pseudoUtils = options.pseudoUtils

  return {
    name: 'vite-plugin-cssts',
    enforce: 'pre',

    configResolved(config) {
      root = config.root
      isDev = config.command === 'serve'
    },

    configureServer(_server) { server = _server },

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) return RESOLVED_VIRTUAL_CSS_ID
      if (id === VIRTUAL_ATOM_ID) return RESOLVED_VIRTUAL_ATOM_ID
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_CSS_ID) {
        return generateUsedAtomsCss(globalUsedAtoms, globalPseudoStyles, pseudoUtils, prefix)
      }
      if (id === RESOLVED_VIRTUAL_ATOM_ID) {
        return generateCsstsAtomModule(globalUsedAtoms, globalPseudoStyles, prefix)
      }
    },

    transform(code, id) {
      if (id.endsWith('.vue') && options.transformClass !== false) {
        const result = transformVueTemplate(code, runtimeImport)
        if (result.transformed) return { code: result.code, map: null }
      }

      if (id.endsWith('.cssts')) {
        try {
          const result = transformCssTs(code, id)
          
          // 更新全局状态
          for (const [name, info] of result.styles) globalStyles.set(name, info)
          for (const atom of result.usedAtoms) globalUsedAtoms.add(atom)
          for (const [name, info] of result.pseudoStyles) globalPseudoStyles.set(name, info)

          let transformedCode = result.code
          if (result.usedAtoms.size > 0 && !transformedCode.includes(VIRTUAL_CSS_ID)) {
            transformedCode = `import '${VIRTUAL_CSS_ID}'\n` + transformedCode
          }

          if (isDev && options.autoGenerate !== false) {
            generateOutputFiles(globalStyles, globalUsedAtoms, root, options)
          }

          if (isDev && server && result.usedAtoms.size > 0) {
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
      }
      return null
    },

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.cssts')) {
        const mods = []
        const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
        if (cssMod) { server.moduleGraph.invalidateModule(cssMod); mods.push(cssMod) }
        const atomMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ATOM_ID)
        if (atomMod) { server.moduleGraph.invalidateModule(atomMod); mods.push(atomMod) }
        return mods.length > 0 ? mods : undefined
      }
    },

    buildEnd() {
      if (globalStyles.size > 0 || globalUsedAtoms.size > 0) {
        generateOutputFiles(globalStyles, globalUsedAtoms, root, options)
      }
    },
  }
}

export { transformCssTs, transformVueTemplate, generateOutputFiles, globalStyles, globalUsedAtoms, globalPseudoStyles, VIRTUAL_CSS_ID }
