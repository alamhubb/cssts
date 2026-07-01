/**
 * CssTs 转换模块
 * 
 * 提供 .cssts 文件的完整转换功能
 */

import { CssTsParser } from '../parser/index.ts'
import { CssTsCstToAstUtils } from '../factory/index.ts'
import { registerSlimeCstToAstUtil } from '@qin/generated-qin-parser-ts/SlimeCstToAstBridge'
import { SlimeGenerator } from 'slime-generator'
import Glog from 'glogjs'
import { ConfigLookup } from '../config/ConfigLookup'
import { RuntimeStore } from '../store/RuntimeStore'
import { CsstsInit } from '../init/CsstsInit'
import {
  camelToKebab,
  generateAtomCssRule,
  CSSTS_CONFIG
} from '../utils/cssClassName.ts'
import { generatePseudoAtoms, generateClassGroupAtoms } from '../dts/atom-generator.ts'
import { normalizeGeneratedAst, normalizeGeneratedCst } from '../parser/generated-runtime-adapter.ts'

// 从核心文件重新导出
export { generateCsstsAtomModule } from '../utils/csstsAtomCore'

/** CSS 属性值映射类型 */
type CssPropertyValueMap = Record<string, string | undefined>

// ==================== 类型定义 ====================

/**
 * 解析后的样式信息
 */
export interface ParsedStyleInfo {
  baseName: string    // 基础名称（原子类名或伪类基础类名）
  pseudos: string[]   // 伪类列表（普通原子类为空数组）
}

/**
 * 转换上下文（用于多文件聚合）
 */
export interface TransformContext {
  styles: Set<string>  // 存储所有样式名（原子类 + 伪类样式）
}

/**
 * 转换结果
 */
export interface TransformResult {
  code: string
  hasStyles: boolean
}

/**
 * 带 mapping 的转换结果（用于 LSP）
 */
export interface TransformResultWithMapping {
  code: string
  mapping: any[]
  hasStyles: boolean
}

// ==================== 样式名解析 ====================

/**
 * 解析样式名
 * 
 * @example
 * parseStyleName('displayFlex')              // { baseName: 'displayFlex', pseudos: [] }
 * parseStyleName('clickable$$hover$$active') // { baseName: 'clickable', pseudos: ['hover', 'active'] }
 */
export function parseStyleName(name: string): ParsedStyleInfo {
  const parts = name.split(CSSTS_CONFIG.PSEUDO_SEPARATOR)
  return {
    baseName: parts[0],
    pseudos: parts.slice(1)
  }
}

/**
 * 判断是否是伪类样式
 */
export function hasPseudos(name: string): boolean {
  return name.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)
}

/**
 * 递归展开类组合
 * 
 * @param items 要展开的项目列表
 * @param classGroup 类组合配置
 * @param visited 已访问的组合名（防止循环引用）
 */
export function expandClassGroup(
  items: string[],
  classGroup: Record<string, string[]>,
  visited: Set<string> = new Set()
): string[] {
  const result: string[] = []

  for (const item of items) {
    // 检查是否是类组合（且未访问过）
    if (item in classGroup && !visited.has(item)) {
      visited.add(item)
      // 递归展开
      result.push(...expandClassGroup(classGroup[item], classGroup, visited))
    } else {
      // 普通项目或伪类
      result.push(item)
    }
  }

  return result
}

// ==================== 核心转换 ====================

/**
 * 转换 .cssts 文件
 * 
 * @param code - 源代码
 * @returns 转换结果（包含 code、mapping 和 hasStyles）
 */
// 版本号
const TRANSFORM_VERSION = '2.6.0-token-lcs-mapping'
let _transformLoggedVersion = false

function readTokenValue(token: any): string {
  const value = token?.tokenValue ?? token?.__qin_field_tokenValue
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`CSSTS token mapping requires a non-empty token value: ${JSON.stringify(token)}`)
  }
  return value
}

function readTokenIndex(token: any): number {
  const index = token?.index ?? token?.codeIndex ?? token?.__qin_field_index
  if (typeof index !== 'number' || index < 0) {
    throw new Error(`CSSTS token mapping requires a source index: ${JSON.stringify(token)}`)
  }
  return index
}

function readTokenLine(token: any): number {
  const line = token?.rowNum ?? token?.line ?? token?.__qin_field_rowNum
  return typeof line === 'number' ? line - 1 : 0
}

function readTokenColumn(token: any): number {
  const column = token?.columnStartNum ?? token?.column ?? token?.__qin_field_columnStartNum
  return typeof column === 'number' ? column - 1 : 0
}

function generatedPositionAt(code: string, index: number) {
  let line = 0
  let lineStart = 0
  for (let i = 0; i < index; i++) {
    if (code.charCodeAt(i) === 10) {
      line++
      lineStart = i + 1
    }
  }
  return { line, column: index - lineStart }
}

function tokenizeGeneratedCode(generatedCode: string, sourceValues: Set<string>) {
  const values = [...sourceValues].sort((left, right) => right.length - left.length)
  const tokens: any[] = []
  let index = 0
  while (index < generatedCode.length) {
    const matched = values.find(value => generatedCode.startsWith(value, index))
    if (!matched) {
      index++
      continue
    }
    const position = generatedPositionAt(generatedCode, index)
    tokens.push({
      value: matched,
      index,
      line: position.line,
      column: position.column,
      length: matched.length,
    })
    index += matched.length
  }
  return tokens
}

function lcsTokenPairs(sourceTokens: any[], generatedTokens: any[]) {
  const rows = sourceTokens.length + 1
  const cols = generatedTokens.length + 1
  const table = Array.from({ length: rows }, () => new Uint16Array(cols))
  for (let i = sourceTokens.length - 1; i >= 0; i--) {
    const sourceValue = sourceTokens[i].value
    for (let j = generatedTokens.length - 1; j >= 0; j--) {
      if (sourceValue === generatedTokens[j].value) {
        table[i][j] = table[i + 1][j + 1] + 1
      } else {
        table[i][j] = Math.max(table[i + 1][j], table[i][j + 1])
      }
    }
  }

  const pairs: Array<[number, number]> = []
  let i = 0
  let j = 0
  while (i < sourceTokens.length && j < generatedTokens.length) {
    if (sourceTokens[i].value === generatedTokens[j].value) {
      pairs.push([i, j])
      i++
      j++
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i++
    } else {
      j++
    }
  }
  return pairs
}

function buildTokenMappings(tokens: any[], generatedCode: string): any[] {
  const mappings: any[] = []
  const sourceTokens = tokens.map(token => ({
    token,
    value: readTokenValue(token),
    sourceIndex: readTokenIndex(token),
    tokenName: token?.tokenName ?? token?.__qin_field_tokenName ?? '',
  }))
  const generatedTokens = tokenizeGeneratedCode(generatedCode, new Set(sourceTokens.map(token => token.value)))

  for (const [sourceTokenIndex, generatedTokenIndex] of lcsTokenPairs(sourceTokens, generatedTokens)) {
    const sourceToken = sourceTokens[sourceTokenIndex]
    const generatedToken = generatedTokens[generatedTokenIndex]
    const token = sourceToken.token
    const value = sourceToken.value
    mappings.push({
      source: {
        type: sourceToken.tokenName,
        value,
        line: readTokenLine(token),
        column: readTokenColumn(token),
        index: sourceToken.sourceIndex,
        length: value.length,
      },
      generate: {
        type: sourceToken.tokenName,
        value,
        line: generatedToken.line,
        column: generatedToken.column,
        index: generatedToken.index,
        length: value.length,
      },
    })
  }

  if (tokens.length > 0 && mappings.length === 0) {
    throw new Error('CSSTS token mapping produced no generated token mappings')
  }

  return mappings
}

function sourceMappingKey(mapping: any): string {
  return `${mapping.source.index}:${mapping.source.length}:${mapping.source.value ?? ''}`
}

function mergeTokenMappings(generatorMappings: any[], tokenMappings: any[]): any[] {
  const seen = new Set(generatorMappings.map(sourceMappingKey))
  const merged = [...generatorMappings]
  for (const mapping of tokenMappings) {
    const key = sourceMappingKey(mapping)
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(mapping)
    }
  }
  merged.sort((left, right) => left.source.index - right.source.index || left.generate.index - right.generate.index)
  return merged
}

export function transformCssTs(code: string): TransformResultWithMapping {
  // 版本日志（只打印一次）
  if (!_transformLoggedVersion) {
    Glog.debug(`[transformCssTs v${TRANSFORM_VERSION}] initialized`)
    _transformLoggedVersion = true
  }

  CsstsInit.init({ dts: false } as any)

  const parser = new CssTsParser(code)
  const cst = normalizeGeneratedCst(parser.Program())  // 使用默认的 module 模式
  // 使用单例，避免重复注册覆盖子类（如 OvsCstToSlimeAst）
  const ast = normalizeGeneratedAst(CssTsCstToAstUtils.toFileAst(cst))

  const localUsedAtoms = CssTsCstToAstUtils.getUsedAtoms()

  // 将使用的原子类累加到全局 RuntimeStore.usedStyles
  RuntimeStore.addUsedStyles(localUsedAtoms)

  // 生成代码
  const tokens = parser.parsedTokens
  const result = SlimeGenerator.generator(ast, tokens)

  // 过滤无效的 mapping
  // 只检查 source 和 generate 存在，以及 source.length > 0
  // 不再要求 source.value，因为新创建的节点可能没有 value
  const mapping = result.mapping.filter(
    (m: any) => m.source && m.generate && m.source.length > 0
  )
  const tokenMappings = buildTokenMappings(tokens, result.code)
  const lspMapping = mergeTokenMappings(mapping, tokenMappings)

  return {
    code: result.code,
    mapping: lspMapping,
    hasStyles: localUsedAtoms.size > 0
  }
}

// ==================== CSS 生成 ====================

function generatePseudoCssRule(
  className: string,
  pseudo: string,
  pseudoConfig: CssPropertyValueMap,
  prefix: string
): string {
  const fullClassName = `${prefix}${className}`
  const props = Object.entries(pseudoConfig)
    .filter(([, val]) => val !== undefined)
    .map(([prop, val]) => `${camelToKebab(prop)}: ${val}`)
    .join('; ')
  return `.${fullClassName}:${pseudo} { ${props}; }`
}

/**
 * 生成所有 CSS（原子类 + 伪类样式）
 */
export function generateStylesCss(): string {
  const styles = RuntimeStore.getUsedStyles();
  const prefix = ConfigLookup.classPrefix
  const lines: string[] = ['/* Auto-generated by cssts-compiler */', '']

  // 分离原子类和伪类样式
  const atomStyles: string[] = []
  const pseudoStyles: Array<{ baseName: string; pseudos: string[] }> = []

  for (const name of styles) {
    const parsed = parseStyleName(name)
    if (parsed.pseudos.length > 0) {
      pseudoStyles.push(parsed)
    } else {
      atomStyles.push(name)
    }
  }

  // 1. 生成原子类 CSS（按属性分组）
  const grouped = new Map<string, string[]>()
  for (const atomName of atomStyles) {
    const rule = generateAtomCssRule(atomName, prefix)
    if (rule) {
      const data = RuntimeStore.getRuntimeData(atomName)
      const property = (data && data.group === 'atom') ? data.property : 'other'
      if (!grouped.has(property)) grouped.set(property, [])
      grouped.get(property)!.push(rule)
    }
  }

  for (const property of [...grouped.keys()].sort()) {
    lines.push(`/* ${property} */`)
    lines.push(...grouped.get(property)!.sort())
    lines.push('')
  }

  // 2. 生成伪类 CSS（从 ConfigLookup 获取配置）
  const pseudoUtils = ConfigLookup.pseudoClassConfig
  if (pseudoUtils && pseudoStyles.length > 0) {
    lines.push('/* $$ Pseudo-class styles */')
    for (const { baseName, pseudos } of pseudoStyles) {
      const className = camelToKebab(baseName)
      for (const pseudo of pseudos) {
        const pseudoConfig = (pseudoUtils as Record<string, CssPropertyValueMap | undefined>)[pseudo]
        if (pseudoConfig) {
          const rule = generatePseudoCssRule(className, pseudo, pseudoConfig, prefix)
          lines.push(rule)
        }
      }
    }
    lines.push('')
  }

  // 3. 生成伪类原子类 CSS（始终生成）
  // 如 hover → .hover:hover { filter: brightness(1.15) }
  const pseudoAtoms = generatePseudoAtoms()
  if (pseudoAtoms.length > 0) {
    lines.push('/* CSSTS Pseudo-class atoms */')
    for (const atom of pseudoAtoms) {
      const fullClassName = `${prefix}${atom.className}`
      const styleEntries = Object.entries(atom.styles)
        .map(([prop, val]) => `${camelToKebab(prop)}: ${val}`)
        .join('; ')
      lines.push(`.${fullClassName}:${atom.pseudo} { ${styleEntries}; }`)
    }
    lines.push('')
  }

  // 4. 生成类组合 CSS（展开组合内容）
  const classGroupAtoms = generateClassGroupAtoms()
  const pseudoConfig = ConfigLookup.pseudoClassConfig

  if (classGroupAtoms.length > 0) {
    lines.push('/* CSSTS Class Group atoms */')
    for (const group of classGroupAtoms) {
      const fullClassName = `${prefix}${group.className}`
      const normalProps: string[] = []

      // 展开组合内容
      const expandedItems = expandClassGroup(group.items, ConfigLookup.classGroup || {})

      for (const item of expandedItems) {
        // 检查是否是伪类
        if (pseudoConfig && item in pseudoConfig) {
          const pseudoStyles = (pseudoConfig as Record<string, CssPropertyValueMap>)[item]
          const styleEntries = Object.entries(pseudoStyles)
            .map(([prop, val]) => `${camelToKebab(prop)}: ${val}`)
            .join('; ')
          lines.push(`.${fullClassName}:${item} { ${styleEntries}; }`)
        }
        // 检查是否是普通原子类（使用 RuntimeStore 而不是 generateAtomPropertyMap）
        else if (RuntimeStore.isValidAtomName(item)) {
          const data = RuntimeStore.getRuntimeData(item)
          if (data && data.group === 'atom') {
            normalProps.push(`${data.property}: ${data.value}`)
          }
        }
      }

      // 生成普通样式规则
      if (normalProps.length > 0) {
        lines.push(`.${fullClassName} { ${normalProps.join('; ')}; }`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

