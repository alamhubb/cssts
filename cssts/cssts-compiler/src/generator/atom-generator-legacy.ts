/**
 * 原子类生成器 (Legacy 版本)
 * 
 * 使用 css-tree 动态获取 CSS 属性和关键字
 * 
 * @deprecated 请使用 atom-generator.ts（使用预生成数据）
 */

import * as csstree from 'css-tree'
import type { CsstsConfig, PropertyConfig, UnitType } from './config.js'
import { defaultConfig, unitToSuffix } from './config.js'
import { generateValues, resolveUnitConfig } from './value-generator.js'

// ==================== 原子类定义 ====================

export interface AtomDefinition {
  name: string
  className: string
  property: string
  value: string
}

// ==================== 命名转换 ====================

function kebabToCamel(str: string): string {
  let result = str.replace(/^-+/, '')
  result = result.replace(/-([a-z0-9])/gi, (_, c) => {
    if (/[0-9]/.test(c)) {
      return '_' + c
    }
    return c.toUpperCase()
  })
  return result
}

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .filter(part => part.length > 0)
    .map(part => {
      if (/^[0-9]/.test(part)) {
        return '_' + part
      }
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join('')
}

const symbolToAlias: Record<string, string> = {
  '.': 'p',
  '%': 'pct',
  '/': 's',
}

const symbolToEscape: Record<string, string> = {
  '.': '\\.',
  '%': '\\%',
  '/': '\\/',
}

function formatForTsIdentifier(value: string | number): string {
  let str = String(value)
  if (str.startsWith('-')) {
    str = 'n' + str.slice(1)
  }
  for (const [symbol, alias] of Object.entries(symbolToAlias)) {
    str = str.split(symbol).join(alias)
  }
  str = str.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase())
  str = str.replace(/-/g, '')
  return str
}

function formatForClassName(value: string | number): string {
  let str = String(value)
  for (const [symbol, escaped] of Object.entries(symbolToEscape)) {
    str = str.split(symbol).join(escaped)
  }
  return str
}

function generateAtomName(property: string, value: string): string {
  const propCamel = kebabToCamel(property)
  const valueFormatted = formatForTsIdentifier(value)
  if (/^[0-9n]/.test(valueFormatted)) {
    return propCamel + valueFormatted.charAt(0).toUpperCase() + valueFormatted.slice(1)
  }
  const valuePascal = kebabToPascal(valueFormatted)
  return propCamel + valuePascal
}

function generateClassName(property: string, value: string): string {
  const valueFormatted = formatForClassName(value)
  return `${property}_${valueFormatted}`
}

// ==================== CSS-TREE 关键字提取 ====================

function extractKeywords(syntax: any, visited: Set<string> = new Set()): string[] {
  const keywords: string[] = []
  if (!syntax) return keywords

  const lexer = (csstree as any).lexer

  if (syntax.type === 'Keyword') {
    keywords.push(syntax.name)
  } else if (syntax.type === 'Group' && syntax.terms) {
    for (const term of syntax.terms) {
      keywords.push(...extractKeywords(term, visited))
    }
  } else if (syntax.type === 'Type' && syntax.name) {
    if (!visited.has(syntax.name)) {
      visited.add(syntax.name)
      const typeData = lexer.types[syntax.name]
      if (typeData && typeData.syntax) {
        keywords.push(...extractKeywords(typeData.syntax, visited))
      }
    }
  } else if (syntax.type === 'Multiplier' && syntax.term) {
    keywords.push(...extractKeywords(syntax.term, visited))
  }

  return keywords
}

function getPropertyKeywords(property: string): string[] {
  const lexer = (csstree as any).lexer
  const propData = lexer.properties[property]

  if (!propData || !propData.syntax) {
    return []
  }

  const keywords = extractKeywords(propData.syntax)

  return [...new Set(keywords)]
    .filter(k => !k.startsWith('-') && !k.startsWith('webkit') && k.length > 0)
    .sort()
}

// ==================== 原子类生成 ====================

function generateNumericAtomsForProperty(
  property: string,
  propertyConfig: PropertyConfig,
  defaults: CsstsConfig['defaults']
): AtomDefinition[] {
  const atoms: AtomDefinition[] = []
  const unitTypes: Array<Exclude<UnitType, 'zero'>> = ['px', 'rem', 'ratio', 'unitless', 'deg', 'ms', 'fr']

  if (propertyConfig.zero) {
    atoms.push({
      name: generateAtomName(property, '0'),
      className: generateClassName(property, '0'),
      property,
      value: '0',
    })
  }

  for (const unitType of unitTypes) {
    const unitConfig = propertyConfig[unitType]
    if (unitConfig === undefined) continue

    const resolvedConfig = resolveUnitConfig(unitConfig, defaults?.[unitType], unitType)
    const values = generateValues(resolvedConfig)
    const suffix = unitToSuffix[unitType]

    for (const num of values) {
      const numStr = Number.isInteger(num) ? String(num) : num.toFixed(2).replace(/\.?0+$/, '')
      const valueWithUnit = suffix ? `${numStr}${suffix}` : numStr

      atoms.push({
        name: generateAtomName(property, valueWithUnit),
        className: generateClassName(property, valueWithUnit),
        property,
        value: valueWithUnit,
      })
    }
  }

  return atoms
}

/**
 * 生成所有原子类 (Legacy - 使用 css-tree)
 * @deprecated 请使用 generateAtoms from './atom-generator.js'
 */
export function generateAtomsLegacy(config: CsstsConfig = defaultConfig): AtomDefinition[] {
  const atoms: AtomDefinition[] = []
  const seenNames = new Set<string>()

  // 从 css-tree 获取所有 CSS 属性
  const lexer = (csstree as any).lexer
  const allCssProperties = Object.keys(lexer.properties as Record<string, any>)

  const allProperties = new Set<string>([
    ...allCssProperties,
    ...Object.keys(config.properties),
  ])

  for (const property of allProperties) {
    const keywords = getPropertyKeywords(property)
    for (const keyword of keywords) {
      const name = generateAtomName(property, keyword)
      if (seenNames.has(name)) continue
      seenNames.add(name)

      atoms.push({
        name,
        className: generateClassName(property, keyword),
        property,
        value: keyword,
      })
    }

    const propertyConfig = config.properties[property]
    if (propertyConfig) {
      const numericAtoms = generateNumericAtomsForProperty(property, propertyConfig, config.defaults)
      for (const atom of numericAtoms) {
        if (seenNames.has(atom.name)) continue
        seenNames.add(atom.name)
        atoms.push(atom)
      }
    }
  }

  const stateAtoms: AtomDefinition[] = [
    { name: 'isDisabled', className: 'is-disabled', property: 'state', value: 'disabled' },
    { name: 'isLoading', className: 'is-loading', property: 'state', value: 'loading' },
    { name: 'isActive', className: 'is-active', property: 'state', value: 'active' },
    { name: 'isFocus', className: 'is-focus', property: 'state', value: 'focus' },
    { name: 'isHover', className: 'is-hover', property: 'state', value: 'hover' },
    { name: 'isSelected', className: 'is-selected', property: 'state', value: 'selected' },
    { name: 'isError', className: 'is-error', property: 'state', value: 'error' },
    { name: 'isSuccess', className: 'is-success', property: 'state', value: 'success' },
    { name: 'isWarning', className: 'is-warning', property: 'state', value: 'warning' },
  ]

  for (const state of stateAtoms) {
    if (!seenNames.has(state.name)) {
      seenNames.add(state.name)
      atoms.push(state)
    }
  }

  return atoms
}

export function generatePropertiesJsonLegacy(atoms: AtomDefinition[]): Record<string, string> {
  const properties = new Set<string>()
  for (const atom of atoms) {
    properties.add(atom.property)
  }
  const result: Record<string, string> = {}
  for (const prop of [...properties].sort()) {
    const camelName = kebabToCamel(prop)
    result[camelName] = prop
  }
  return result
}
