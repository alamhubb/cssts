/**
 * CSS 类型生成脚本
 *
 * 生成文件到 src/css-types/ 目录：
 * 1. keywords.ts - 关键词常量和类型（从 csstree 提取）
 * 2. property-config.ts - 属性配置类
 *
 * 数据来源：
 * - csstree 库：属性关键词和数值类型
 * - data/ 目录：颜色、伪类、伪元素（已迁移为 TypeScript）
 *
 * 运行方式：npx tsx scripts/generate-css-types.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as csstree from 'css-tree'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputDir = path.join(__dirname, '../src/css-types')

// ==================== 从 csstree 提取数据 ====================

interface PropertyData {
  name: string
  keywords: string[]
  numberTypes: string[]
}

// 基础数值类型
const BASE_NUMBER_TYPES = [
  'length', 'angle', 'time', 'frequency', 'percentage',
  'number', 'integer', 'resolution', 'flex'
]

// 联合类型映射
const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
}

/**
 * 从 csstree 提取属性数据
 */
function extractPropertiesFromCsstree(): PropertyData[] {
  const lexer = csstree.lexer
  const properties: PropertyData[] = []

  for (const [propName, propDef] of Object.entries(lexer.properties)) {
    // 跳过 vendor prefix
    if (propName.startsWith('-')) continue

    const keywords = new Set<string>()
    const numberTypes = new Set<string>()

    // 解析语法
    if (propDef && typeof propDef === 'object' && 'syntax' in propDef) {
      const syntax = (propDef as any).syntax
      if (syntax) {
        try {
          const ast = csstree.definitionSyntax.parse(syntax)
          extractFromSyntaxNode(ast, keywords, numberTypes, lexer)
        } catch (e) {
          // 忽略解析错误
        }
      }
    }

    properties.push({
      name: propName,
      keywords: Array.from(keywords).sort(),
      numberTypes: Array.from(numberTypes).sort(),
    })
  }

  return properties.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * 递归提取语法节点中的关键词和数值类型
 */
function extractFromSyntaxNode(
  node: any,
  keywords: Set<string>,
  numberTypes: Set<string>,
  lexer: any
): void {
  if (!node) return

  switch (node.type) {
    case 'Keyword':
      keywords.add(node.name)
      break

    case 'Type':
      const typeName = node.name
      // 检查是否是基础数值类型
      if (BASE_NUMBER_TYPES.includes(typeName)) {
        numberTypes.add(typeName)
      }
      // 检查是否是联合类型
      else if (UNION_TYPE_MAP[typeName]) {
        UNION_TYPE_MAP[typeName].forEach(t => numberTypes.add(t))
      }
      // 递归展开类型定义
      else {
        const typeDef = lexer.types[typeName]
        if (typeDef && typeof typeDef === 'object' && 'syntax' in typeDef) {
          try {
            const typeAst = csstree.definitionSyntax.parse((typeDef as any).syntax)
            extractFromSyntaxNode(typeAst, keywords, numberTypes, lexer)
          } catch (e) {
            // 忽略
          }
        }
      }
      break

    case 'Group':
    case 'Multiplier':
      if (node.term) {
        extractFromSyntaxNode(node.term, keywords, numberTypes, lexer)
      }
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer))
      }
      break

    default:
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer))
      }
      break
  }
}

// ==================== 工具函数 ====================

function toPascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

function toCamelCase(str: string): string {
  return str.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

function toConstName(str: string): string {
  return str.toUpperCase().replace(/-/g, '_')
}

// ==================== 颜色数据（从 data/colors.ts 导入） ====================

// 直接定义颜色列表（与 data/colors.ts 保持同步）
const COLORS = [
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

const SYSTEM_COLORS = [
  'AccentColor', 'AccentColorText', 'ActiveText', 'ButtonBorder', 'ButtonFace',
  'ButtonText', 'Canvas', 'CanvasText', 'Field', 'FieldText', 'GrayText',
  'Highlight', 'HighlightText', 'LinkText', 'Mark', 'MarkText',
  'SelectedItem', 'SelectedItemText', 'VisitedText',
]

const colorSet = new Set([...COLORS, ...SYSTEM_COLORS])

// ==================== 单位映射 ====================

// 单位到分类的映射
const UNIT_TO_CATEGORY: Record<string, string> = {
  '%': 'percentage',
  'vw': 'percentage', 'vh': 'percentage', 'vmin': 'percentage', 'vmax': 'percentage',
  'svw': 'percentage', 'svh': 'percentage', 'lvw': 'percentage', 'lvh': 'percentage',
  'dvw': 'percentage', 'dvh': 'percentage', 'vi': 'percentage', 'vb': 'percentage',
  'px': 'pixel',
  'em': 'fontRelative', 'rem': 'fontRelative',
  'ch': 'fontRelative', 'ex': 'fontRelative', 'cap': 'fontRelative', 'ic': 'fontRelative',
  'lh': 'fontRelative', 'rlh': 'fontRelative',
  'cm': 'physical', 'mm': 'physical', 'in': 'physical', 'pt': 'physical', 'pc': 'physical', 'Q': 'physical',
  'deg': 'angle', 'grad': 'angle', 'rad': 'angle', 'turn': 'angle',
  's': 'time', 'ms': 'time',
  'Hz': 'frequency', 'kHz': 'frequency',
  'dpi': 'resolution', 'dpcm': 'resolution', 'dppx': 'resolution', 'x': 'resolution',
  'fr': 'flex',
  'unitless': 'unitless',
}

// 数值类型到单位的映射
const NUMBER_TYPE_UNITS: Record<string, string[]> = {
  length: ['Q', 'cap', 'ch', 'cm', 'dvh', 'dvw', 'em', 'ex', 'ic', 'in', 'lh', 'lvh', 'lvw', 'mm', 'pc', 'pt', 'px', 'rem', 'rlh', 'svh', 'svw', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw'],
  angle: ['deg', 'grad', 'rad', 'turn'],
  time: ['ms', 's'],
  frequency: ['Hz', 'kHz'],
  percentage: ['%'],
  number: ['unitless'],
  integer: ['unitless'],
  resolution: ['dpcm', 'dpi', 'dppx', 'x'],
  flex: ['fr'],
}

/**
 * 根据 numberTypes 计算属性的 units
 */
function computePropertyUnits(numberTypes: string[]): string[] {
  const units = new Set<string>()
  for (const nt of numberTypes) {
    const typeUnits = NUMBER_TYPE_UNITS[nt]
    if (typeUnits) {
      typeUnits.forEach(u => units.add(u))
    }
  }
  return Array.from(units).sort()
}

/**
 * 从单位列表计算单位分类列表
 */
function computeUnitCategories(units: string[]): string[] {
  const categories = new Set<string>()
  for (const unit of units) {
    const category = UNIT_TO_CATEGORY[unit]
    if (category) {
      categories.add(category)
    }
  }
  return Array.from(categories).sort()
}

// ==================== 主逻辑 ====================

console.log('Generating CSS types...\n')

// 从 csstree 提取数据
const properties = extractPropertiesFromCsstree()

// 过滤掉颜色关键词
const propKeywordsMap = new Map<string, string[]>()
const propNumberTypesMap = new Map<string, string[]>()
const colorSupportingProps: string[] = []

for (const prop of properties) {
  const nonColorKeywords = prop.keywords.filter(k => !colorSet.has(k))
  propKeywordsMap.set(prop.name, nonColorKeywords)
  propNumberTypesMap.set(prop.name, prop.numberTypes)
  
  if (prop.keywords.some(k => colorSet.has(k))) {
    colorSupportingProps.push(prop.name)
  }
}

const sortedPropertyNames = properties.map(p => p.name)
const keywordProperties = properties.filter(p => p.keywords.length > 0)
const numericProperties = properties.filter(p => p.numberTypes.length > 0)


// ==================== 生成 keywords.ts ====================

function generateKeywordsFile(): string {
  const lines: string[] = []

  lines.push(`/**`)
  lines.push(` * CSS 关键词定义`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` */`)
  lines.push(``)

  // 为每个属性生成关键词数组
  for (const prop of keywordProperties) {
    const constName = `${toConstName(prop.name)}_KEYWORDS`
    const nonColorKeywords = propKeywordsMap.get(prop.name) || []
    lines.push(`/** ${prop.name} 属性关键词 */`)
    lines.push(`export const ${constName} = [`)
    nonColorKeywords.forEach(k => lines.push(`  '${k}',`))
    lines.push(`] as const;`)
    lines.push(``)
  }

  // 为每个属性生成关键词类型
  lines.push(`// ==================== 关键词类型 ====================`)
  lines.push(``)
  for (const prop of keywordProperties) {
    const constName = `${toConstName(prop.name)}_KEYWORDS`
    const typeName = `${toPascalCase(prop.name)}Keyword`
    lines.push(`export type ${typeName} = typeof ${constName}[number];`)
  }
  lines.push(``)

  // 所有关键词值联合类型
  lines.push(`/** 所有 CSS 关键词值 */`)
  const keywordTypeNames = keywordProperties.map(p => `${toPascalCase(p.name)}Keyword`)
  lines.push(`export type KeywordValue = ${keywordTypeNames.join(' | ')};`)
  lines.push(``)

  // CSS 属性值映射类型（用于智能提示）
  lines.push(`// ==================== CSS 属性值映射 ====================`)
  lines.push(``)
  lines.push(`/** CSS 属性到值类型的映射（用于智能提示） */`)
  lines.push(`export interface CssPropertyValueMap {`)
  
  for (const propName of sortedPropertyNames) {
    const camelName = toCamelCase(propName)
    const keywords = propKeywordsMap.get(propName) || []
    const hasKeywords = keywords.length > 0
    
    if (hasKeywords) {
      const keywordTypeName = `${toPascalCase(propName)}Keyword`
      lines.push(`  ${camelName}?: ${keywordTypeName} | string;`)
    } else {
      lines.push(`  ${camelName}?: string;`)
    }
  }
  lines.push(`}`)
  lines.push(``)

  return lines.join('\n')
}

// ==================== 生成 property-config.ts ====================

function generatePropertyConfigFile(): string {
  const lines: string[] = []

  lines.push(`/**`)
  lines.push(` * CSS 属性配置类`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` */`)
  lines.push(``)

  // 导入（使用新的目录结构）
  lines.push(`import { ALL_COLORS, type AllColorValue } from './data/colors';`)
  lines.push(`import type { NumberTypeName } from './units/unit-types';`)
  lines.push(`import type { UnitCategoryName } from './units/unit-categories';`)
  lines.push(`import type { UnitValueConfig, UnitsConfigValue } from './cssts-config';`)
  lines.push(`import {`)
  keywordProperties.forEach(p => {
    lines.push(`  ${toConstName(p.name)}_KEYWORDS,`)
  })
  keywordProperties.forEach(p => {
    lines.push(`  type ${toPascalCase(p.name)}Keyword,`)
  })
  lines.push(`} from './keywords';`)
  lines.push(``)

  // 数值类型常量
  lines.push(`// ==================== 数值类型常量 ====================`)
  lines.push(``)
  for (const prop of numericProperties) {
    const constName = `${toConstName(prop.name)}_NUMBER_TYPES`
    lines.push(`export const ${constName} = [`)
    prop.numberTypes.forEach(t => lines.push(`  '${t}',`))
    lines.push(`] as const;`)
  }
  lines.push(``)

  // 为支持数值的属性生成 Unit 和 UnitCategory 类型
  lines.push(`// ==================== 属性单位类型 ====================`)
  lines.push(``)
  
  for (const prop of numericProperties) {
    const pascalName = toPascalCase(prop.name)
    const units = computePropertyUnits(prop.numberTypes)
    const unitCategories = computeUnitCategories(units)
    
    lines.push(`/** ${prop.name} 支持的单位 */`)
    lines.push(`export type ${pascalName}Unit = ${units.map(u => `'${u}'`).join(' | ')};`)
    lines.push(`/** ${prop.name} 支持的单位分类 */`)
    lines.push(`export type ${pascalName}UnitCategory = ${unitCategories.map(c => `'${c}'`).join(' | ')};`)
    lines.push(``)
  }

  // 为每个属性生成配置类
  lines.push(`// ==================== 属性配置类 ====================`)
  lines.push(``)

  for (const propName of sortedPropertyNames) {
    const pascalName = toPascalCase(propName)
    const keywords = propKeywordsMap.get(propName) || []
    const numberTypes = propNumberTypesMap.get(propName) || []
    const hasKeywords = keywords.length > 0
    const hasColors = colorSupportingProps.includes(propName)
    const hasNumberTypes = numberTypes.length > 0

    lines.push(`/** ${propName} 属性配置 */`)
    lines.push(`export class ${pascalName}Config {`)

    if (hasKeywords) {
      const keywordTypeName = `${pascalName}Keyword`
      const constKeywordsName = `${toConstName(propName)}_KEYWORDS`
      if (hasColors) {
        lines.push(`  keywords: (${keywordTypeName} | AllColorValue)[] = [...${constKeywordsName}, ...ALL_COLORS];`)
      } else {
        lines.push(`  keywords: ${keywordTypeName}[] = [...${constKeywordsName}];`)
      }
    }

    if (hasNumberTypes) {
      const constNumberTypesName = `${toConstName(propName)}_NUMBER_TYPES`
      const unitTypeName = `${pascalName}Unit`
      const unitCategoryTypeName = `${pascalName}UnitCategory`
      lines.push(`  numberTypes: NumberTypeName[] = [...${constNumberTypesName}];`)
      lines.push(`  units: UnitsConfigValue<${unitTypeName}> = {};`)
      lines.push(`  unitCategories: UnitsConfigValue<${unitCategoryTypeName}> = {};`)
    }

    lines.push(`}`)
    lines.push(``)
  }

  // 属性名映射
  lines.push(`// ==================== 属性名映射 ====================`)
  lines.push(``)
  lines.push(`/** camelCase 属性名到 kebab-case 的映射 */`)
  lines.push(`export const cssPropertyNameMap = {`)
  for (const propName of sortedPropertyNames) {
    lines.push(`  ${toCamelCase(propName)}: '${propName}',`)
  }
  lines.push(`} as const;`)
  lines.push(``)
  lines.push(`/** camelCase 属性名类型 */`)
  lines.push(`export type CssPropertyCamelName = keyof typeof cssPropertyNameMap;`)
  lines.push(``)
  lines.push(`/** kebab-case 属性名类型 */`)
  lines.push(`export type CssPropertyKebabName = typeof cssPropertyNameMap[CssPropertyCamelName];`)
  lines.push(``)

  // CssPropertyConfigMap
  lines.push(`// ==================== 属性配置映射 ====================`)
  lines.push(``)
  lines.push(`/** CSS 属性配置映射 */`)
  lines.push(`export class CssPropertyConfigMap {`)
  for (const propName of sortedPropertyNames) {
    const pascalName = toPascalCase(propName)
    const camelName = toCamelCase(propName)
    lines.push(`  ${camelName} = new ${pascalName}Config();`)
  }
  lines.push(`}`)
  lines.push(``)

  return lines.join('\n')
}

// ==================== 写入文件 ====================

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(path.join(outputDir, 'keywords.ts'), generateKeywordsFile())
console.log('✅ Created: keywords.ts')

fs.writeFileSync(path.join(outputDir, 'property-config.ts'), generatePropertyConfigFile())
console.log('✅ Created: property-config.ts')

console.log(`\nStatistics:`)
console.log(`  - Properties with keywords: ${keywordProperties.length}`)
console.log(`  - Properties with number types: ${numericProperties.length}`)
console.log(`  - Total properties: ${sortedPropertyNames.length}`)
