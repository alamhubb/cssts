/**
 * CSS 类型生成脚本
 *
 * 从 csstree + custom 生成 config/ 目录下的文件：
 * - config/colors.ts - 颜色配置（csstree colors + custom system-colors）
 * - config/keywords.ts - 属性关键字（csstree 生成）
 * - config/units.ts - 单位配置（csstree units + custom categories）
 * - config/pseudo.ts - 伪类/伪元素（列表 + custom descriptions）
 * - config/property-config.ts - 属性配置（csstree + custom units）
 *
 * 运行方式：npx tsx src/css-types/scripts/generate-config.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as csstree from 'css-tree'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 输出到 ../config/
const configDir = path.join(__dirname, '../config')

// 确保输出目录存在
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true })
}

// ==================== 从 csstree 提取数据 ====================

interface PropertyData {
  name: string
  keywords: string[]
  numberTypes: string[]
}

const BASE_NUMBER_TYPES = [
  'length', 'angle', 'time', 'frequency', 'percentage',
  'number', 'integer', 'resolution', 'flex'
]

const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
}


function extractPropertiesFromCsstree(): PropertyData[] {
  const lexer = (csstree as any).lexer
  const properties: PropertyData[] = []

  for (const [propName, propDef] of Object.entries(lexer.properties as Record<string, any>)) {
    if (propName.startsWith('-')) continue

    const keywords = new Set<string>()
    const numberTypes = new Set<string>()

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer)
    }

    properties.push({
      name: propName,
      keywords: Array.from(keywords).sort(),
      numberTypes: Array.from(numberTypes).sort(),
    })
  }

  return properties.sort((a, b) => a.name.localeCompare(b.name))
}

function extractFromSyntaxNode(
  node: any, keywords: Set<string>, numberTypes: Set<string>,
  lexer: any, visited: Set<string> = new Set()
): void {
  if (!node) return

  switch (node.type) {
    case 'Keyword':
      keywords.add(node.name)
      break
    case 'Type':
      const typeName = node.name
      if (BASE_NUMBER_TYPES.includes(typeName)) {
        numberTypes.add(typeName)
      } else if (UNION_TYPE_MAP[typeName]) {
        UNION_TYPE_MAP[typeName].forEach(t => numberTypes.add(t))
      } else if (!visited.has(typeName)) {
        visited.add(typeName)
        const typeDef = lexer.types[typeName]
        if (typeDef?.syntax) extractFromSyntaxNode(typeDef.syntax, keywords, numberTypes, lexer, visited)
      }
      break
    case 'Group':
    case 'Multiplier':
      if (node.term) extractFromSyntaxNode(node.term, keywords, numberTypes, lexer, visited)
      if (node.terms) node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited))
      break
    default:
      if (node.terms) node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited))
  }
}

// ==================== 工具函数 ====================

const toPascalCase = (str: string) => str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
const toCamelCase = (str: string) => str.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('')
const toConstName = (str: string) => str.toUpperCase().replace(/-/g, '_')

// ==================== 静态数据 ====================

const NAMED_COLORS = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
  'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
  'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
  'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred',
  'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
  'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
  'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
  'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew',
  'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
  'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon',
  'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
  'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
  'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
  'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
  'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown',
  'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
  'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
  'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet',
  'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
]
const colorSet = new Set(NAMED_COLORS)

const UNIT_TO_CATEGORY: Record<string, string> = {
  '%': 'percentage', 'vw': 'percentage', 'vh': 'percentage', 'vmin': 'percentage', 'vmax': 'percentage',
  'svw': 'percentage', 'svh': 'percentage', 'lvw': 'percentage', 'lvh': 'percentage',
  'dvw': 'percentage', 'dvh': 'percentage', 'vi': 'percentage', 'vb': 'percentage',
  'px': 'pixel', 'em': 'fontRelative', 'rem': 'fontRelative',
  'ch': 'fontRelative', 'ex': 'fontRelative', 'cap': 'fontRelative', 'ic': 'fontRelative',
  'lh': 'fontRelative', 'rlh': 'fontRelative',
  'cm': 'physical', 'mm': 'physical', 'in': 'physical', 'pt': 'physical', 'pc': 'physical', 'Q': 'physical',
  'deg': 'angle', 'grad': 'angle', 'rad': 'angle', 'turn': 'angle',
  's': 'time', 'ms': 'time', 'Hz': 'frequency', 'kHz': 'frequency',
  'dpi': 'resolution', 'dpcm': 'resolution', 'dppx': 'resolution', 'x': 'resolution',
  'fr': 'flex', 'unitless': 'unitless',
}

const NUMBER_TYPE_UNITS: Record<string, string[]> = {
  length: ['Q', 'cap', 'ch', 'cm', 'dvh', 'dvw', 'em', 'ex', 'ic', 'in', 'lh', 'lvh', 'lvw', 'mm', 'pc', 'pt', 'px', 'rem', 'rlh', 'svh', 'svw', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw'],
  angle: ['deg', 'grad', 'rad', 'turn'], time: ['ms', 's'], frequency: ['Hz', 'kHz'],
  percentage: ['%'], number: ['unitless'], integer: ['unitless'],
  resolution: ['dpcm', 'dpi', 'dppx', 'x'], flex: ['fr'],
}

const computePropertyUnits = (numberTypes: string[]) => {
  const units = new Set<string>()
  numberTypes.forEach(nt => NUMBER_TYPE_UNITS[nt]?.forEach(u => units.add(u)))
  return Array.from(units).sort()
}

const computeUnitCategories = (units: string[]) => {
  const categories = new Set<string>()
  units.forEach(u => UNIT_TO_CATEGORY[u] && categories.add(UNIT_TO_CATEGORY[u]))
  return Array.from(categories).sort()
}


// ==================== 主逻辑 ====================

console.log('Generating CSS types to config/...\n')

const properties = extractPropertiesFromCsstree()
const propKeywordsMap = new Map<string, string[]>()
const propNumberTypesMap = new Map<string, string[]>()
const colorSupportingProps: string[] = []

for (const prop of properties) {
  const nonColorKeywords = prop.keywords.filter(k => !colorSet.has(k))
  propKeywordsMap.set(prop.name, nonColorKeywords)
  propNumberTypesMap.set(prop.name, prop.numberTypes)
  if (prop.keywords.some(k => colorSet.has(k))) colorSupportingProps.push(prop.name)
}

const sortedPropertyNames = properties.map(p => p.name)
const keywordProperties = properties.filter(p => p.keywords.length > 0)
const numericProperties = properties.filter(p => p.numberTypes.length > 0)

// ==================== 生成函数 ====================

function generateColorsFile(): string {
  return `/**
 * CSS 颜色配置（自动生成）
 */

import { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';

export const NAMED_COLORS = [
${NAMED_COLORS.map(c => `  '${c}',`).join('\n')}
] as const;

export type NamedColorValue = typeof NAMED_COLORS[number];
export const ALL_COLORS = [...NAMED_COLORS, ...SYSTEM_COLORS] as const;
export type AllColorValue = NamedColorValue | SystemColorValue;
export { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';
`
}

function generateUnitsFile(): string {
  const allUnits = new Set<string>()
  Object.values(NUMBER_TYPE_UNITS).forEach(units => units.forEach(u => allUnits.add(u)))
  
  // 生成反向映射：unit → category
  const categoryByUnitEntries: string[] = []
  for (const [category, units] of Object.entries(UNIT_TO_CATEGORY)) {
    // UNIT_TO_CATEGORY 已经是 unit → category 格式
  }
  
  return `/**
 * CSS 单位配置（自动生成）
 */

import { UNITS_BY_CATEGORY, type UnitCategoryName } from '../custom/unit-categories';

// Re-export from custom
export * from '../custom/unit-categories';
export * from '../custom/number-type-mapping';

export const ALL_UNITS = [
${Array.from(allUnits).sort().map(u => `  '${u}',`).join('\n')}
] as const;

export type UnitType = typeof ALL_UNITS[number];

export const NUMBER_TYPE_UNITS = {
${Object.entries(NUMBER_TYPE_UNITS).map(([nt, units]) => `  ${nt}: [${units.map(u => `'${u}'`).join(', ')}],`).join('\n')}
} as const;

/**
 * 单位到分类的反向映射（从 UNITS_BY_CATEGORY 自动生成）
 * 
 * 用途：根据单位（如 'px'）快速查找其所属分类（如 'pixel'），
 * 从而获取该分类的步长策略和数值范围配置。
 * 
 * @example
 * CATEGORY_BY_UNIT['px']  // => 'pixel'
 * CATEGORY_BY_UNIT['em']  // => 'fontRelative'
 * CATEGORY_BY_UNIT['deg'] // => 'angle'
 */
export const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = Object.entries(UNITS_BY_CATEGORY)
  .reduce((acc, [category, units]) => {
    units.forEach(unit => { acc[unit] = category as UnitCategoryName; });
    return acc;
  }, {} as Record<string, UnitCategoryName>);
`
}

function generatePseudoFile(): string {
  const pseudoClasses = [
    'hover', 'active', 'focus', 'focus-visible', 'focus-within',
    'link', 'visited', 'any-link', 'local-link', 'target', 'target-within',
    'enabled', 'disabled', 'read-only', 'read-write', 'placeholder-shown',
    'default', 'checked', 'indeterminate', 'valid', 'invalid',
    'in-range', 'out-of-range', 'required', 'optional', 'user-valid', 'user-invalid', 'autofill',
    'root', 'empty', 'first-child', 'last-child', 'only-child',
    'first-of-type', 'last-of-type', 'only-of-type',
    'nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type',
    'not', 'is', 'where', 'has', 'lang', 'dir',
    'fullscreen', 'modal', 'picture-in-picture',
    'playing', 'paused', 'seeking', 'buffering', 'stalled', 'muted', 'volume-locked',
    'defined', 'host', 'host-context', 'scope',
  ]
  const pseudoElements = [
    'before', 'after', 'first-line', 'first-letter', 'marker',
    'selection', 'placeholder', 'backdrop', 'file-selector-button',
    'cue', 'cue-region', 'part', 'slotted',
  ]
  return `/**
 * CSS 伪类/伪元素配置（自动生成）
 */

import {
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  PSEUDO_CLASS_CATEGORIES,
  type PseudoClassCategory,
} from '../custom/pseudo-descriptions';

export const PSEUDO_CLASSES = [
${pseudoClasses.map(p => `  '${p}',`).join('\n')}
] as const;

export type PseudoClassName = typeof PSEUDO_CLASSES[number];

export const PSEUDO_ELEMENTS = [
${pseudoElements.map(p => `  '${p}',`).join('\n')}
] as const;

export type PseudoElementName = typeof PSEUDO_ELEMENTS[number];

export {
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  PSEUDO_CLASS_CATEGORIES,
  type PseudoClassCategory,
} from '../custom/pseudo-descriptions';
`
}


function generateKeywordsFile(): string {
  const lines: string[] = ['/**', ' * CSS 关键词配置（自动生成）', ' */', '']

  // 关键词数组
  for (const prop of keywordProperties) {
    const constName = `${toConstName(prop.name)}_KEYWORDS`
    const keywords = propKeywordsMap.get(prop.name) || []
    lines.push(`export const ${constName} = [`)
    keywords.forEach(k => lines.push(`  '${k}',`))
    lines.push(`] as const;`, '')
  }

  // 类型定义
  lines.push('// ==================== 关键词类型 ====================', '')
  for (const prop of keywordProperties) {
    lines.push(`export type ${toPascalCase(prop.name)}Keyword = typeof ${toConstName(prop.name)}_KEYWORDS[number];`)
  }
  lines.push('')

  // 联合类型
  lines.push(`export type KeywordValue = ${keywordProperties.map(p => `${toPascalCase(p.name)}Keyword`).join(' | ')};`, '')

  // CssPropertyValueMap
  lines.push('// ==================== CSS 属性值映射 ====================', '')
  lines.push('export interface CssPropertyValueMap {')
  for (const propName of sortedPropertyNames) {
    const camelName = toCamelCase(propName)
    const keywords = propKeywordsMap.get(propName) || []
    if (keywords.length > 0) {
      lines.push(`  ${camelName}?: ${toPascalCase(propName)}Keyword | string;`)
    } else {
      lines.push(`  ${camelName}?: string;`)
    }
  }
  lines.push('}', '')

  return lines.join('\n')
}

function generatePropertyConfigFile(): string {
  const lines: string[] = ['/**', ' * CSS 属性配置（自动生成）', ' */', '']

  // 导入
  lines.push(`import { ALL_COLORS, type AllColorValue } from './colors';`)
  lines.push(`import type { NumberTypeName, UnitCategoryName } from './units';`)
  lines.push(`import {`)
  keywordProperties.forEach(p => lines.push(`  ${toConstName(p.name)}_KEYWORDS,`))
  lines.push(`} from './keywords';`)
  lines.push(`import type {`)
  keywordProperties.forEach(p => lines.push(`  ${toPascalCase(p.name)}Keyword,`))
  lines.push(`} from './keywords';`, '')

  // 数值类型常量
  lines.push('// ==================== 数值类型常量 ====================', '')
  for (const prop of numericProperties) {
    lines.push(`export const ${toConstName(prop.name)}_NUMBER_TYPES = [${prop.numberTypes.map(t => `'${t}'`).join(', ')}] as const;`)
  }
  lines.push('')

  // 属性单位类型
  lines.push('// ==================== 属性单位类型 ====================', '')
  for (const prop of numericProperties) {
    const units = computePropertyUnits(prop.numberTypes)
    const cats = computeUnitCategories(units)
    lines.push(`export type ${toPascalCase(prop.name)}Unit = ${units.map(u => `'${u}'`).join(' | ')};`)
    lines.push(`export type ${toPascalCase(prop.name)}UnitCategory = ${cats.map(c => `'${c}'`).join(' | ')};`)
  }
  lines.push('')

  // 属性配置类
  lines.push('// ==================== 属性配置类 ====================', '')
  for (const propName of sortedPropertyNames) {
    const pascalName = toPascalCase(propName)
    const keywords = propKeywordsMap.get(propName) || []
    const numberTypes = propNumberTypesMap.get(propName) || []
    const hasColors = colorSupportingProps.includes(propName)

    lines.push(`export class ${pascalName}Config {`)
    if (keywords.length > 0) {
      const kwType = hasColors ? `(${pascalName}Keyword | AllColorValue)[]` : `${pascalName}Keyword[]`
      const kwInit = hasColors ? `[...${toConstName(propName)}_KEYWORDS, ...ALL_COLORS]` : `[...${toConstName(propName)}_KEYWORDS]`
      lines.push(`  keywords: ${kwType} = ${kwInit};`)
    }
    if (numberTypes.length > 0) {
      lines.push(`  numberTypes: NumberTypeName[] = [...${toConstName(propName)}_NUMBER_TYPES];`)
    }
    lines.push(`}`, '')
  }

  // 属性名映射
  lines.push('// ==================== 属性名映射 ====================', '')
  lines.push(`export const cssPropertyNameMap = {`)
  sortedPropertyNames.forEach(p => lines.push(`  ${toCamelCase(p)}: '${p}',`))
  lines.push(`} as const;`, '')
  lines.push(`export type CssPropertyCamelName = keyof typeof cssPropertyNameMap;`)
  lines.push(`export type CssPropertyKebabName = typeof cssPropertyNameMap[CssPropertyCamelName];`, '')

  // CssPropertyConfigMap
  lines.push('// ==================== 属性配置映射 ====================', '')
  lines.push(`export class CssPropertyConfigMap {`)
  sortedPropertyNames.forEach(p => lines.push(`  ${toCamelCase(p)} = new ${toPascalCase(p)}Config();`))
  lines.push(`}`, '')

  return lines.join('\n')
}

function generateConfigIndex(): string {
  return `/**
 * Config 模块导出（自动生成）
 */

export * from './colors';
export * from './units';
export * from './keywords';
export * from './pseudo';
export * from './property-config';
`
}

// ==================== 写入文件 ====================

fs.writeFileSync(path.join(configDir, 'colors.ts'), generateColorsFile())
console.log('✅ config/colors.ts')

fs.writeFileSync(path.join(configDir, 'units.ts'), generateUnitsFile())
console.log('✅ config/units.ts')

fs.writeFileSync(path.join(configDir, 'keywords.ts'), generateKeywordsFile())
console.log('✅ config/keywords.ts')

fs.writeFileSync(path.join(configDir, 'pseudo.ts'), generatePseudoFile())
console.log('✅ config/pseudo.ts')

fs.writeFileSync(path.join(configDir, 'property-config.ts'), generatePropertyConfigFile())
console.log('✅ config/property-config.ts')

fs.writeFileSync(path.join(configDir, 'index.ts'), generateConfigIndex())
console.log('✅ config/index.ts')

console.log(`\n📊 Statistics:`)
console.log(`   Keywords: ${keywordProperties.length} | Numbers: ${numericProperties.length} | Total: ${sortedPropertyNames.length}`)
