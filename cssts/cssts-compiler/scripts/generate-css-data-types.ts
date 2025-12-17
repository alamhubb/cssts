/**
 * CSS 数据类型生成脚本
 *
 * 数据来源：
 * - css-number-types.json: 数值类型定义（13种）和属性的数值类型映射
 * - css-keywords.json: 属性的关键词值
 * - css-colors.json: 颜色关键字
 *
 * 注意：不使用 css-units.json！
 * 原因：css-units.json 的 unitsByType 只有 6 种分组（length, angle, time, frequency, resolution, flex），
 * 而 css-number-types.json 的 typeDescriptions 有完整的 13 种数值类型，包括：
 * - 基础类型：length, angle, time, frequency, resolution, flex
 * - 特殊类型：percentage（%）, number（无单位）, integer（无单位整数）
 * - 组合类型：length-percentage, angle-percentage, time-percentage, frequency-percentage
 *
 * 每个属性支持的具体单位已经在 css-number-types.json 的 properties[].units 中定义，
 * 无需通过 unitsByType 间接获取。
 *
 * 生成内容：
 * 1. 每个关键词属性支持的值列表
 * 2. 每个数值类型支持的 unit（从属性的 units 聚合）
 * 3. 所有 colors 的值
 * 4. 所有数值类型（13种）
 * 5. 所有数值类型的属性（属性 -> 支持的数值类型）
 * 6. 所有关键词的属性（属性 -> 支持的关键词）
 *
 * 运行方式：npx tsx scripts/generate-css-data-types.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 加载 JSON 数据 ====================
// 注意：只加载 css-number-types.json, css-keywords.json, css-colors.json
// 不加载 css-units.json（其 unitsByType 分组不完整）

const dataDir = path.join(__dirname, '../src/data')

interface KeywordsData {
  properties: { name: string; keywords: string[] }[]
}

interface NumberTypesData {
  properties: { name: string; numberTypes: string[]; units: string[] }[]
  typeDescriptions: Record<string, { en: string; zh: string }>
}

interface ColorsData {
  colors: string[]
}

const keywordsData: KeywordsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'css-keywords.json'), 'utf-8')
)

const numberTypesData: NumberTypesData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'css-number-types.json'), 'utf-8')
)

const colorsData: ColorsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'css-colors.json'), 'utf-8')
)

// ==================== 从 numberTypesData 聚合每个数值类型支持的单位 ====================
// 遍历所有属性，根据其 numberTypes 和 units 建立映射

function buildNumberTypeUnitsMap(): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()

  // 初始化所有数值类型
  for (const typeName of Object.keys(numberTypesData.typeDescriptions)) {
    map.set(typeName, new Set())
  }

  // 遍历属性，聚合单位
  for (const prop of numberTypesData.properties) {
    for (const numberType of prop.numberTypes) {
      const units = map.get(numberType)
      if (units) {
        for (const unit of prop.units) {
          units.add(unit)
        }
      }
    }
  }

  return map
}

// ==================== 生成代码 ====================

function generate(): string {
  const lines: string[] = []
  const numberTypeUnitsMap = buildNumberTypeUnitsMap()

  // 文件头注释
  lines.push(`/**`)
  lines.push(` * CSS 数据类型定义`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` * 生成时间: ${new Date().toISOString()}`)
  lines.push(` *`)
  lines.push(` * 数据来源：`)
  lines.push(` * - css-number-types.json: 数值类型（13种）和属性映射`)
  lines.push(` * - css-keywords.json: 属性关键词`)
  lines.push(` * - css-colors.json: 颜色关键字`)
  lines.push(` *`)
  lines.push(` * 注意：不使用 css-units.json 的 unitsByType 分组！`)
  lines.push(` * 单位信息直接从 css-number-types.json 的属性 units 字段聚合。`)
  lines.push(` *`)
  lines.push(` * 所有数据都支持：`)
  lines.push(` * - 运行时使用（遍历、检查等）`)
  lines.push(` * - 编译时类型校验（通过 as const + typeof）`)
  lines.push(` */`)
  lines.push(``)

  // ==================== 3. 所有 colors ====================
  lines.push(`// ==================== 颜色值 ====================`)
  lines.push(``)
  lines.push(`/** 所有 CSS 颜色关键字（运行时数据 + 类型） */`)
  lines.push(`export const COLORS = [`)
  colorsData.colors.forEach(c => {
    lines.push(`  '${c}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 颜色值类型 */`)
  lines.push(`export type ColorValue = typeof COLORS[number];`)
  lines.push(``)

  // ==================== 4. 所有数值类型（13种） ====================
  const numberTypes = Object.keys(numberTypesData.typeDescriptions || {}).sort()

  lines.push(`// ==================== 数值类型（13种，来自 css-number-types.json） ====================`)
  lines.push(`// 基础类型：length, angle, time, frequency, resolution, flex`)
  lines.push(`// 特殊类型：percentage（%）, number（无单位）, integer（无单位整数）`)
  lines.push(`// 组合类型：length-percentage, angle-percentage, time-percentage, frequency-percentage`)
  lines.push(``)
  lines.push(`/** 所有数值类型（运行时数据 + 类型） */`)
  lines.push(`export const NUMBER_TYPES = [`)
  numberTypes.forEach(t => {
    const desc = numberTypesData.typeDescriptions[t]
    lines.push(`  '${t}', // ${desc?.zh || desc?.en || ''}`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 数值类型（联合类型） */`)
  lines.push(`export type NumberType = typeof NUMBER_TYPES[number];`)
  lines.push(``)

  // 为每个数值类型生成常量值（用于运行时引用）
  lines.push(`// 每个数值类型的常量值（用于运行时数据引用）`)
  for (const typeName of numberTypes) {
    const constName = `${typeName.toUpperCase().replace(/-/g, '_')}_NUMBER_TYPE`
    lines.push(`export const ${constName} = '${typeName}' as const;`)
  }
  lines.push(``)

  // ==================== 单位类型层级 ====================
  // 层级1: 每个单位都是独立类型 (PxUnitType = 'px')
  // 层级2: 每个数值类型是其单位的联合 (LengthNumberType = PxUnitType | EmUnitType | ...)
  // 层级3: 每个属性的数值类型是其支持的数值类型的联合

  // 收集所有唯一的单位
  const allUnits = new Set<string>()
  for (const typeName of numberTypes) {
    const units = numberTypeUnitsMap.get(typeName) || new Set()
    units.forEach(u => allUnits.add(u))
  }
  const sortedUnits = Array.from(allUnits).sort()

  // 层级1: 为每个单位生成独立类型
  lines.push(`// ==================== 单位类型（层级1：每个单位的独立类型） ====================`)
  lines.push(`// 每个单位都是一个独立的字面量类型`)
  lines.push(``)
  lines.push(`/** 所有单位（运行时数据） */`)
  lines.push(`export const ALL_UNITS = [`)
  sortedUnits.forEach(u => {
    lines.push(`  '${u}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)

  // 为每个单位生成类型
  for (const unit of sortedUnits) {
    // 处理特殊字符，生成合法的类型名
    let typeName: string
    if (unit === '%') {
      typeName = 'Percent'
    } else if (unit === '<number>') {
      typeName = 'Unitless'
    } else {
      // 首字母大写
      typeName = unit.charAt(0).toUpperCase() + unit.slice(1)
    }
    lines.push(`export type ${typeName}UnitType = '${unit}';`)
  }
  lines.push(``)

  // 层级2: 每个数值类型是其单位的联合
  lines.push(`// ==================== 数值类型的单位联合（层级2） ====================`)
  lines.push(`// 每个数值类型 = 其支持的单位类型的联合`)
  lines.push(`// 数据来源：css-number-types.json 的属性 units 字段聚合`)
  lines.push(``)

  // 辅助函数：单位名转类型名
  function unitToTypeName(unit: string): string {
    if (unit === '%') return 'PercentUnitType'
    if (unit === '<number>') return 'UnitlessUnitType'
    return unit.charAt(0).toUpperCase() + unit.slice(1) + 'UnitType'
  }

  for (const typeName of numberTypes) {
    const units = Array.from(numberTypeUnitsMap.get(typeName) || []).sort()
    const pascalName = typeName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    const desc = numberTypesData.typeDescriptions[typeName]

    lines.push(`/** ${desc?.zh || desc?.en || typeName} */`)
    if (units.length === 0) {
      lines.push(`export type ${pascalName}NumberType = never;`)
    } else {
      const unitTypes = units.map(u => unitToTypeName(u))
      lines.push(`export type ${pascalName}NumberType = ${unitTypes.join(' | ')};`)
    }
  }
  lines.push(``)

  // 保留运行时数据
  lines.push(`// ==================== 数值类型到单位的运行时映射 ====================`)
  lines.push(``)
  for (const typeName of numberTypes) {
    const units = Array.from(numberTypeUnitsMap.get(typeName) || []).sort()
    const constName = `${typeName.toUpperCase().replace(/-/g, '_')}_UNITS`

    lines.push(`/** ${typeName} 类型支持的单位（运行时数据） */`)
    if (units.length === 0) {
      lines.push(`export const ${constName} = [] as const;`)
    } else {
      lines.push(`export const ${constName} = [`)
      units.forEach(u => {
        lines.push(`  '${u}',`)
      })
      lines.push(`] as const;`)
    }
    lines.push(``)
  }

  // 生成数值类型到单位的映射对象
  lines.push(`/** 数值类型到单位的映射（运行时可用） */`)
  lines.push(`export const NUMBER_TYPE_UNITS = {`)
  for (const typeName of numberTypes) {
    const constName = `${typeName.toUpperCase().replace(/-/g, '_')}_UNITS`
    lines.push(`  '${typeName}': ${constName},`)
  }
  lines.push(`} as const;`)
  lines.push(``)

  // ==================== 1. 每个关键词属性支持的值 ====================
  // 颜色关键字从属性的 keywords 中分离出来，避免重复
  // 属性的完整值 = 非颜色关键字 + 颜色关键字（如果支持颜色）
  lines.push(`// ==================== 关键词属性值 ====================`)
  lines.push(`// 颜色关键字已分离到 COLORS，属性的 keywords 只包含非颜色关键字`)
  lines.push(`// 支持颜色的属性，其完整值类型 = 非颜色关键字 | ColorValue`)
  lines.push(``)

  // 过滤掉 vendor prefix 属性
  const keywordProperties = keywordsData.properties.filter(p => !p.name.startsWith('-'))
  const colorSet = new Set(colorsData.colors)

  // 记录哪些属性支持颜色
  const colorSupportingProps: string[] = []

  // 为每个属性生成关键词数组（排除颜色关键字）
  for (const prop of keywordProperties) {
    const constName = `${prop.name.toUpperCase().replace(/-/g, '_')}_KEYWORDS`
    
    // 分离颜色和非颜色关键字
    const nonColorKeywords = prop.keywords.filter(k => !colorSet.has(k))
    const hasColors = prop.keywords.some(k => colorSet.has(k))
    
    if (hasColors) {
      colorSupportingProps.push(prop.name)
    }

    lines.push(`/** ${prop.name} 属性支持的关键词（不含颜色）${hasColors ? ' - 支持颜色' : ''} */`)
    lines.push(`export const ${constName} = [`)
    nonColorKeywords.forEach(k => {
      lines.push(`  '${k}',`)
    })
    lines.push(`] as const;`)
    lines.push(``)
  }

  // 生成支持颜色的属性列表
  lines.push(`/** 支持颜色值的属性列表 */`)
  lines.push(`export const COLOR_SUPPORTING_PROPERTIES = [`)
  colorSupportingProps.forEach(p => {
    lines.push(`  '${p}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 支持颜色值的属性名类型 */`)
  lines.push(`export type ColorSupportingPropertyName = typeof COLOR_SUPPORTING_PROPERTIES[number];`)
  lines.push(``)

  // 生成每个属性的关键词类型（非颜色）
  lines.push(`// 关键词属性值类型（不含颜色）`)
  for (const prop of keywordProperties) {
    const constName = `${prop.name.toUpperCase().replace(/-/g, '_')}_KEYWORDS`
    const typeName = prop.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Keyword'
    lines.push(`export type ${typeName} = typeof ${constName}[number];`)
  }
  lines.push(``)

  // 生成每个属性的完整值类型（包含颜色，如果支持）
  lines.push(`// 关键词属性完整值类型（含颜色，如果支持）`)
  for (const prop of keywordProperties) {
    const typeName = prop.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    const keywordTypeName = `${typeName}Keyword`
    const hasColors = colorSupportingProps.includes(prop.name)
    
    if (hasColors) {
      lines.push(`export type ${typeName}Value = ${keywordTypeName} | ColorValue;`)
    } else {
      lines.push(`export type ${typeName}Value = ${keywordTypeName};`)
    }
  }
  lines.push(``)

  // ==================== 6. 所有关键词属性映射 ====================
  lines.push(`// ==================== 关键词属性映射 ====================`)
  lines.push(``)
  lines.push(`/** 关键词属性名（运行时数据 + 类型） */`)
  lines.push(`export const KEYWORD_PROPERTIES = [`)
  keywordProperties.forEach(p => {
    lines.push(`  '${p.name}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 关键词属性名类型 */`)
  lines.push(`export type KeywordPropertyName = typeof KEYWORD_PROPERTIES[number];`)
  lines.push(``)

  lines.push(`/** 属性到关键词的映射（运行时可用） */`)
  lines.push(`export const PROPERTY_KEYWORDS = {`)
  for (const prop of keywordProperties) {
    const constName = `${prop.name.toUpperCase().replace(/-/g, '_')}_KEYWORDS`
    lines.push(`  '${prop.name}': ${constName},`)
  }
  lines.push(`} as const;`)
  lines.push(``)

  // 生成属性关键词映射类型
  lines.push(`/** 属性关键词映射类型 */`)
  lines.push(`export type PropertyKeywordsMap = {`)
  for (const prop of keywordProperties) {
    const constName = `${prop.name.toUpperCase().replace(/-/g, '_')}_KEYWORDS`
    lines.push(`  '${prop.name}': typeof ${constName}[number];`)
  }
  lines.push(`};`)
  lines.push(``)

  // ==================== 5. 所有数值类型属性映射 ====================
  lines.push(`// ==================== 数值属性映射 ====================`)
  lines.push(``)

  // 过滤掉 vendor prefix 属性
  const numericProperties = numberTypesData.properties.filter(p => !p.name.startsWith('-'))

  lines.push(`/** 数值属性名（运行时数据 + 类型） */`)
  lines.push(`export const NUMERIC_PROPERTIES = [`)
  numericProperties.forEach(p => {
    lines.push(`  '${p.name}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 数值属性名类型 */`)
  lines.push(`export type NumericPropertyName = typeof NUMERIC_PROPERTIES[number];`)
  lines.push(``)

  lines.push(`/** 属性到数值类型的映射（运行时可用） */`)
  lines.push(`export const PROPERTY_NUMBER_TYPES = {`)
  for (const prop of numericProperties) {
    lines.push(`  '${prop.name}': [${prop.numberTypes.map(t => `'${t}'`).join(', ')}] as const,`)
  }
  lines.push(`} as const;`)
  lines.push(``)

  // 层级3: 每个属性的数值类型联合
  lines.push(`// ==================== 属性数值类型联合（层级3） ====================`)
  lines.push(`// 每个属性的数值类型 = 其支持的数值类型的联合`)
  lines.push(`// 类型名格式：{PascalCasePropertyName}PropertyNumberType`)
  lines.push(``)

  for (const prop of numericProperties) {
    const pascalName = prop.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    if (prop.numberTypes.length === 0) {
      lines.push(`/** ${prop.name} 属性支持的数值类型 */`)
      lines.push(`export type ${pascalName}PropertyNumberType = never;`)
    } else {
      // 使用 XxxNumberType 类型
      const numberTypeTypes = prop.numberTypes.map(t => {
        const pascal = t.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
        return `${pascal}NumberType`
      })
      const uniqueTypes = [...new Set(numberTypeTypes)]
      lines.push(`/** ${prop.name} 属性支持的数值类型 */`)
      lines.push(`export type ${pascalName}PropertyNumberType = ${uniqueTypes.join(' | ')};`)
    }
  }
  lines.push(``)

  // 生成属性数值类型映射类型（使用新的属性级别类型）
  lines.push(`/** 属性数值类型映射类型 */`)
  lines.push(`export type PropertyNumberTypesMap = {`)
  for (const prop of numericProperties) {
    const pascalName = prop.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    lines.push(`  '${prop.name}': ${pascalName}PropertyNumberType;`)
  }
  lines.push(`};`)
  lines.push(``)

  // 生成属性单位类型映射（类型层面）
  lines.push(`/** 属性单位类型映射（类型层面，用于泛型约束） */`)
  lines.push(`export type PropertyUnitTypeMap = {`)
  for (const prop of numericProperties) {
    const pascalName = prop.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    lines.push(`  '${prop.name}': ${pascalName}PropertyNumberType;`)
  }
  lines.push(`};`)
  lines.push(``)

  // ==================== 属性完整配置类型 ====================
  // 每个属性的完整配置：keywords 数组 + numberTypes 数组
  lines.push(`// ==================== 属性完整配置类型 ====================`)
  lines.push(`// 每个属性的配置包含：keywords（关键词数组）和 numberTypes（数值类型数组）`)
  lines.push(``)

  // 获取所有属性（合并关键词属性和数值属性）
  const allPropertyNames = new Set<string>()
  keywordProperties.forEach(p => allPropertyNames.add(p.name))
  numericProperties.forEach(p => allPropertyNames.add(p.name))
  const sortedPropertyNames = Array.from(allPropertyNames).sort()

  // 创建属性到关键词的映射
  const propKeywordsMap = new Map<string, string[]>()
  keywordProperties.forEach(p => {
    const nonColorKeywords = p.keywords.filter(k => !colorSet.has(k))
    propKeywordsMap.set(p.name, nonColorKeywords)
  })

  // 创建属性到数值类型的映射
  const propNumberTypesMap = new Map<string, string[]>()
  numericProperties.forEach(p => {
    propNumberTypesMap.set(p.name, p.numberTypes)
  })

  // 生成属性配置类型
  lines.push(`/** 属性完整配置类型 */`)
  lines.push(`export type CssPropertyConfigMap = {`)
  for (const propName of sortedPropertyNames) {
    const pascalName = propName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    const keywordTypeName = `${pascalName}Keyword`
    const numberTypes = propNumberTypesMap.get(propName) || []
    const hasKeywords = propKeywordsMap.has(propName)
    const hasColors = colorSupportingProps.includes(propName)

    // keywords 类型
    let keywordsType: string
    if (hasKeywords && hasColors) {
      keywordsType = `(${keywordTypeName} | ColorValue)[]`
    } else if (hasKeywords) {
      keywordsType = `${keywordTypeName}[]`
    } else {
      keywordsType = `never[]`
    }

    // numberTypes 类型 - 使用属性级别的数值类型
    // 类型是 XxxPropertyNumberType，它是该属性支持的数值类型的联合
    let numberTypesType: string
    if (numberTypes.length > 0) {
      numberTypesType = `${pascalName}PropertyNumberType[]`
    } else {
      numberTypesType = `never[]`
    }

    lines.push(`  '${propName}': {`)
    lines.push(`    keywords: ${keywordsType};`)
    lines.push(`    numberTypes: ${numberTypesType};`)
    lines.push(`  };`)
  }
  lines.push(`};`)
  lines.push(``)

  // 生成运行时数据
  lines.push(`/** 属性完整配置数据（运行时可用） */`)
  lines.push(`export const CSS_PROPERTY_CONFIG = {`)
  for (const propName of sortedPropertyNames) {
    const constKeywordsName = `${propName.toUpperCase().replace(/-/g, '_')}_KEYWORDS`
    const hasKeywords = propKeywordsMap.has(propName)
    const numberTypes = propNumberTypesMap.get(propName) || []
    const hasColors = colorSupportingProps.includes(propName)

    lines.push(`  '${propName}': {`)
    if (hasKeywords && hasColors) {
      lines.push(`    keywords: [...${constKeywordsName}, ...COLORS] as const,`)
    } else if (hasKeywords) {
      lines.push(`    keywords: ${constKeywordsName},`)
    } else {
      lines.push(`    keywords: [] as const,`)
    }
    if (numberTypes.length > 0) {
      // 使用常量引用而不是字符串字面量
      const numberTypeConsts = numberTypes.map(t => `${t.toUpperCase().replace(/-/g, '_')}_NUMBER_TYPE`)
      lines.push(`    numberTypes: [${numberTypeConsts.join(', ')}] as const,`)
    } else {
      lines.push(`    numberTypes: [] as const,`)
    }
    lines.push(`  },`)
  }
  lines.push(`} as const;`)
  lines.push(``)

  // ==================== 辅助函数 ====================
  lines.push(`// ==================== 辅助函数 ====================`)
  lines.push(``)
  lines.push(`/** 获取属性支持的关键词 */`)
  lines.push(`export function getPropertyKeywords<T extends KeywordPropertyName>(property: T): readonly PropertyKeywordsMap[T][] {`)
  lines.push(`  return PROPERTY_KEYWORDS[property] as any;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 获取属性支持的数值类型 */`)
  lines.push(`export function getPropertyNumberTypes<T extends NumericPropertyName>(property: T): readonly PropertyNumberTypesMap[T][] {`)
  lines.push(`  return PROPERTY_NUMBER_TYPES[property] as any;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 获取数值类型支持的单位 */`)
  lines.push(`export function getNumberTypeUnits<T extends NumberType>(numberType: T): readonly string[] {`)
  lines.push(`  return NUMBER_TYPE_UNITS[numberType] as any;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/**`)
  lines.push(` * 获取属性支持的单位（运行时）`)
  lines.push(` * 通过属性的数值类型，聚合所有支持的单位`)
  lines.push(` */`)
  lines.push(`export function getPropertyUnits<T extends NumericPropertyName>(property: T): readonly string[] {`)
  lines.push(`  const numberTypes = PROPERTY_NUMBER_TYPES[property];`)
  lines.push(`  const units = new Set<string>();`)
  lines.push(`  for (const nt of numberTypes) {`)
  lines.push(`    const ntUnits = NUMBER_TYPE_UNITS[nt as NumberType];`)
  lines.push(`    if (ntUnits) {`)
  lines.push(`      for (const u of ntUnits) {`)
  lines.push(`        units.add(u);`)
  lines.push(`      }`)
  lines.push(`    }`)
  lines.push(`  }`)
  lines.push(`  return Array.from(units);`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 检查值是否是有效颜色 */`)
  lines.push(`export function isValidColor(value: string): value is ColorValue {`)
  lines.push(`  return (COLORS as readonly string[]).includes(value);`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 检查值是否是有效数值类型 */`)
  lines.push(`export function isValidNumberType(value: string): value is NumberType {`)
  lines.push(`  return (NUMBER_TYPES as readonly string[]).includes(value);`)
  lines.push(`}`)
  lines.push(``)

  return lines.join('\n')
}

// ==================== 主函数 ====================

function main() {
  console.log('Generating CSS data types...\n')
  console.log('数据来源：')
  console.log('  - css-number-types.json (数值类型和属性映射)')
  console.log('  - css-keywords.json (属性关键词)')
  console.log('  - css-colors.json (颜色关键字)')
  console.log('  - 注意：不使用 css-units.json\n')

  const outputPath = path.join(__dirname, '../src/css-data-types.ts')
  const content = generate()
  fs.writeFileSync(outputPath, content)

  console.log('✅ Created: src/css-data-types.ts')
  console.log(`\nStatistics:`)
  console.log(`  - Colors: ${colorsData.colors.length}`)
  console.log(`  - Number types: ${Object.keys(numberTypesData.typeDescriptions || {}).length}`)
  console.log(`  - Keyword properties: ${keywordsData.properties.filter(p => !p.name.startsWith('-')).length}`)
  console.log(`  - Numeric properties: ${numberTypesData.properties.filter(p => !p.name.startsWith('-')).length}`)
}

main()
