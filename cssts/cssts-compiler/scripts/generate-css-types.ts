/**
 * CSS 类型生成脚本
 *
 * 生成文件到 src/css-types/ 目录：
 * 1. colors.ts - 颜色相关（命名颜色、系统颜色）
 * 2. units.ts - 单位和数值类型
 * 3. keywords.ts - 关键词常量和类型
 * 4. property-config.ts - 属性配置类
 * 5. cssts-config.ts - CSSTS 配置类
 * 6. index.ts - 统一导出
 *
 * 数据来源：
 * - css-number-types.json: 数值类型（13种）和属性映射
 * - css-keywords.json: 属性关键词
 * - css-colors.json: 颜色关键字
 *
 * 运行方式：npx tsx scripts/generate-css-types.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 加载 JSON 数据 ====================

const dataDir = path.join(__dirname, '../src/data')
const outputDir = path.join(__dirname, '../src/css-types')

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

// 单位名称转换：<number> -> unitless
function normalizeUnitName(unit: string): string {
  if (unit === '<number>') return 'unitless'
  return unit
}

// 聚合每个数值类型支持的单位
function buildNumberTypeUnitsMap(): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()
  for (const typeName of Object.keys(numberTypesData.typeDescriptions)) {
    map.set(typeName, new Set())
  }
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

const numberTypeUnitsMap = buildNumberTypeUnitsMap()
const colorSet = new Set(colorsData.colors)
const numberTypes = Object.keys(numberTypesData.typeDescriptions).sort()

/** CSS 系统颜色（来自 CSS Color Module Level 4 规范） */
const systemColors = [
  'AccentColor', 'AccentColorText', 'ActiveText', 'ButtonBorder', 'ButtonFace',
  'ButtonText', 'Canvas', 'CanvasText', 'Field', 'FieldText', 'GrayText',
  'Highlight', 'HighlightText', 'LinkText', 'Mark', 'MarkText',
  'SelectedItem', 'SelectedItemText', 'VisitedText',
]
const systemColorSet = new Set(systemColors)

// 过滤掉 vendor prefix 属性
const keywordProperties = keywordsData.properties.filter(p => !p.name.startsWith('-'))
const numericProperties = numberTypesData.properties.filter(p => !p.name.startsWith('-'))

// 记录哪些属性支持颜色
const colorSupportingProps: string[] = []
for (const prop of keywordProperties) {
  if (prop.keywords.some(k => colorSet.has(k) || systemColorSet.has(k))) {
    colorSupportingProps.push(prop.name)
  }
}

// 获取所有属性名
const allPropertyNames = new Set<string>()
keywordProperties.forEach(p => allPropertyNames.add(p.name))
numericProperties.forEach(p => allPropertyNames.add(p.name))
const sortedPropertyNames = Array.from(allPropertyNames).sort()

// 创建属性映射
const propKeywordsMap = new Map<string, string[]>()
keywordProperties.forEach(p => {
  const nonColorKeywords = p.keywords.filter(k => !colorSet.has(k) && !systemColorSet.has(k))
  propKeywordsMap.set(p.name, nonColorKeywords)
})

const propNumberTypesMap = new Map<string, string[]>()
numericProperties.forEach(p => {
  propNumberTypesMap.set(p.name, p.numberTypes)
})


// ==================== 生成 colors.ts ====================

function generateColorsFile(): string {
  const lines: string[] = []

  lines.push(`/**`)
  lines.push(` * CSS 颜色定义`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` */`)
  lines.push(``)

  // 命名颜色
  lines.push(`/** CSS 命名颜色关键字（${colorsData.colors.length}个） */`)
  lines.push(`export const COLORS = [`)
  colorsData.colors.forEach(c => lines.push(`  '${c}',`))
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 颜色值类型 */`)
  lines.push(`export type ColorValue = typeof COLORS[number];`)
  lines.push(``)

  // 系统颜色
  lines.push(`/** CSS 系统颜色关键字（CSS Color Module Level 4） */`)
  lines.push(`export const SYSTEM_COLORS = [`)
  systemColors.forEach(c => lines.push(`  '${c}',`))
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 系统颜色值类型 */`)
  lines.push(`export type SystemColorValue = typeof SYSTEM_COLORS[number];`)
  lines.push(``)

  // 所有颜色
  lines.push(`/** 所有颜色值（命名颜色 + 系统颜色） */`)
  lines.push(`export const ALL_COLORS = [...COLORS, ...SYSTEM_COLORS] as const;`)
  lines.push(``)
  lines.push(`/** 所有颜色值类型 */`)
  lines.push(`export type AllColorValue = ColorValue | SystemColorValue;`)
  lines.push(``)

  return lines.join('\n')
}

// ==================== 生成 units.ts ====================

function generateUnitsFile(): string {
  const lines: string[] = []

  lines.push(`/**`)
  lines.push(` * CSS 单位和数值类型定义`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` */`)
  lines.push(``)

  // 数值类型名称
  lines.push(`// ==================== 数值类型名称 ====================`)
  lines.push(``)
  for (const typeName of numberTypes) {
    const constName = `${toConstName(typeName)}_NUMBER_TYPE_NAME`
    const desc = numberTypesData.typeDescriptions[typeName]
    lines.push(`/** ${desc?.zh || typeName} */`)
    lines.push(`export const ${constName} = '${typeName}' as const;`)
  }
  lines.push(``)

  lines.push(`/** 所有数值类型名称 */`)
  lines.push(`export const NUMBER_TYPES = [`)
  numberTypes.forEach(t => lines.push(`  ${toConstName(t)}_NUMBER_TYPE_NAME,`))
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 数值类型名称联合 */`)
  lines.push(`export type NumberTypeName = typeof NUMBER_TYPES[number];`)
  lines.push(``)

  // 单位
  const allUnits = new Set<string>()
  for (const typeName of numberTypes) {
    const units = numberTypeUnitsMap.get(typeName) || new Set()
    units.forEach(u => allUnits.add(u))
  }
  const sortedUnits = Array.from(allUnits).sort()

  lines.push(`// ==================== 单位 ====================`)
  lines.push(``)
  lines.push(`/** 所有单位 */`)
  lines.push(`export const ALL_UNITS = [`)
  sortedUnits.forEach(u => lines.push(`  '${normalizeUnitName(u)}',`))
  lines.push(`] as const;`)
  lines.push(``)
  lines.push(`/** 单位类型 */`)
  lines.push(`export type UnitType = typeof ALL_UNITS[number];`)
  lines.push(``)

  // 数值类型到单位的映射
  lines.push(`// ==================== 数值类型到单位映射 ====================`)
  lines.push(``)
  for (const typeName of numberTypes) {
    const units = Array.from(numberTypeUnitsMap.get(typeName) || []).sort()
    const constName = `${toConstName(typeName)}_UNITS`
    lines.push(`export const ${constName} = [`)
    units.forEach(u => lines.push(`  '${normalizeUnitName(u)}',`))
    lines.push(`] as const;`)
  }
  lines.push(``)

  lines.push(`/** 数值类型到单位的映射 */`)
  lines.push(`export const NUMBER_TYPE_UNITS = {`)
  for (const typeName of numberTypes) {
    lines.push(`  '${typeName}': ${toConstName(typeName)}_UNITS,`)
  }
  lines.push(`} as const;`)
  lines.push(``)

  // 属性数值类型常量
  lines.push(`// ==================== 属性数值类型 ====================`)
  lines.push(``)
  for (const prop of numericProperties) {
    const constName = `${toConstName(prop.name)}_NUMBER_TYPES`
    lines.push(`export const ${constName} = [`)
    prop.numberTypes.forEach(t => lines.push(`  ${toConstName(t)}_NUMBER_TYPE_NAME,`))
    lines.push(`] as const;`)
  }
  lines.push(``)

  return lines.join('\n')
}


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
    const nonColorKeywords = prop.keywords.filter(k => !colorSet.has(k) && !systemColorSet.has(k))
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

  // 导入
  lines.push(`import { ALL_COLORS, type AllColorValue } from './colors';`)
  lines.push(`import {`)
  for (const prop of numericProperties) {
    if (prop.numberTypes.length > 0) {
      lines.push(`  ${toConstName(prop.name)}_NUMBER_TYPES,`)
    }
  }
  lines.push(`  type NumberTypeName,`)
  lines.push(`} from './units';`)
  lines.push(`import {`)
  keywordProperties.forEach(p => {
    lines.push(`  ${toConstName(p.name)}_KEYWORDS,`)
  })
  keywordProperties.forEach(p => {
    lines.push(`  type ${toPascalCase(p.name)}Keyword,`)
  })
  lines.push(`} from './keywords';`)
  lines.push(``)

  // 为每个属性生成配置类
  lines.push(`// ==================== 属性配置类 ====================`)
  lines.push(``)

  for (const propName of sortedPropertyNames) {
    const pascalName = toPascalCase(propName)
    const hasKeywords = propKeywordsMap.has(propName)
    const numberTypes = propNumberTypesMap.get(propName) || []
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
      lines.push(`  numberTypes: NumberTypeName[] = [...${constNumberTypesName}];`)
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


// 注意：cssts-config.ts 是手动维护的文件，不在此脚本中生成

// ==================== 生成 index.ts ====================

function generateIndexFile(): string {
  const lines: string[] = []

  lines.push(`/**`)
  lines.push(` * CSS 类型定义导出`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` */`)
  lines.push(``)
  lines.push(`export * from './colors';`)
  lines.push(`export * from './units';`)
  lines.push(`export * from './keywords';`)
  lines.push(`export * from './property-config';`)
  lines.push(`export * from './cssts-config';`)
  lines.push(`export * from './config-utils';`)
  lines.push(``)

  return lines.join('\n')
}

// ==================== 主函数 ====================

function main() {
  console.log('Generating CSS types...\n')

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 删除旧文件
  const oldFiles = ['css-keywords.ts', 'css-numeric.ts', 'css-property-keywords.ts', 
                    'css-property-number-types.ts', 'css-property-types.ts', 'css-property-config.ts']
  for (const file of oldFiles) {
    const filePath = path.join(outputDir, file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`🗑️  Deleted: ${file}`)
    }
  }

  // 生成新文件
  fs.writeFileSync(path.join(outputDir, 'colors.ts'), generateColorsFile())
  console.log('✅ Created: colors.ts')

  fs.writeFileSync(path.join(outputDir, 'units.ts'), generateUnitsFile())
  console.log('✅ Created: units.ts')

  fs.writeFileSync(path.join(outputDir, 'keywords.ts'), generateKeywordsFile())
  console.log('✅ Created: keywords.ts')

  fs.writeFileSync(path.join(outputDir, 'property-config.ts'), generatePropertyConfigFile())
  console.log('✅ Created: property-config.ts')

  // cssts-config.ts 是手动维护的，不自动生成
  console.log('ℹ️  Skipped: cssts-config.ts (手动维护)')

  fs.writeFileSync(path.join(outputDir, 'index.ts'), generateIndexFile())
  console.log('✅ Created: index.ts')

  console.log(`\nStatistics:`)
  console.log(`  - Colors: ${colorsData.colors.length}`)
  console.log(`  - System colors: ${systemColors.length}`)
  console.log(`  - Number types: ${numberTypes.length}`)
  console.log(`  - Properties: ${sortedPropertyNames.length}`)
}

main()
