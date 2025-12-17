/**
 * 配置类生成脚本
 * 
 * 从 JSON 数据生成：
 * 1. CsstsConfig 类 - 配置管理类
 * 2. cssts-config.d.ts - 类型定义文件
 * 
 * 配置优先级规则：支持 > 不支持（冲突时以支持为准）
 * 
 * 运行方式：npx tsx scripts/generate-config-class.ts
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 加载 JSON 数据 ====================

const dataDir = path.join(__dirname, '../src/data')

interface KeywordsData {
  properties: { name: string; keywords: string[] }[]
}

interface NumberTypesData {
  properties: { name: string; numberTypes: string[]; units: string[] }[]
  typeDescriptions: Record<string, { en: string; zh: string }>
}

interface UnitsData {
  allUnits: string[]
  unitsByType: Record<string, { units: string[]; description: { en: string; zh: string } }>
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

const unitsData: UnitsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'css-units.json'), 'utf-8')
)

const colorsData: ColorsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, 'css-colors.json'), 'utf-8')
)

// ==================== 提取数据 ====================

// 所有属性名
const allProperties = [...new Set([
  ...keywordsData.properties.map(p => p.name),
  ...numberTypesData.properties.map(p => p.name)
])].sort()

// 支持数值的属性
const numericProperties = numberTypesData.properties.map(p => p.name).sort()

// 数值类型（从 css-number-types.json 的 typeDescriptions 获取）
const numberTypes = Object.keys(numberTypesData.typeDescriptions || {}).sort()

// 所有单位
const allUnits = unitsData.allUnits

// 所有颜色
const allColors = colorsData.colors

// ==================== 生成类型定义 ====================

function generateTypeDefinitions(): string {
  const lines: string[] = []
  
  lines.push(`/**`)
  lines.push(` * CSSTS 配置类型定义`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` * 生成时间: ${new Date().toISOString()}`)
  lines.push(` * `)
  lines.push(` * 使用 "as const" 模式：数据既可作为运行时值，也可作为类型`)
  lines.push(` */`)
  lines.push(``)
  
  // ==================== 数据常量（运行时 + 类型） ====================
  lines.push(`// ==================== 数据常量（运行时可用） ====================`)
  lines.push(``)
  
  // CSS 属性名数据
  const standardProps = allProperties.filter(p => !p.startsWith('-'))
  lines.push(`/** 所有标准 CSS 属性名（运行时数据） */`)
  lines.push(`export const CSS_PROPERTIES = [`)
  standardProps.forEach(prop => {
    lines.push(`  '${prop}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  
  // 数值类型数据
  lines.push(`/** 所有数值类型（运行时数据） */`)
  lines.push(`export const NUMBER_TYPES = [`)
  numberTypes.forEach(t => {
    lines.push(`  '${t}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  
  // 单位数据
  lines.push(`/** 所有单位值（运行时数据） */`)
  lines.push(`export const UNITS = [`)
  allUnits.forEach(u => {
    lines.push(`  '${u}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  
  // 颜色数据
  lines.push(`/** 所有颜色关键字（运行时数据） */`)
  lines.push(`export const COLORS = [`)
  allColors.forEach(c => {
    lines.push(`  '${c}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  
  // ==================== 类型定义（从数据推导） ====================
  lines.push(`// ==================== 类型定义（从数据推导） ====================`)
  lines.push(``)
  
  // CSS 属性名类型
  lines.push(`/** CSS 属性名类型 */`)
  lines.push(`export type CssPropertyName = typeof CSS_PROPERTIES[number];`)
  lines.push(``)
  
  // 数值类型
  lines.push(`/** 数值类型（CSS Value Types） */`)
  lines.push(`export type NumberType = typeof NUMBER_TYPES[number];`)
  lines.push(``)
  
  // 单位值类型
  lines.push(`/** 单位值类型 */`)
  lines.push(`export type UnitValue = typeof UNITS[number];`)
  lines.push(``)
  
  // 颜色关键字类型
  lines.push(`/** 颜色关键字类型 */`)
  lines.push(`export type ColorKeyword = typeof COLORS[number];`)
  lines.push(``)
  
  // 属性级别配置
  lines.push(`/** 属性级别配置 */`)
  lines.push(`export interface PropertyConfig {`)
  lines.push(`  /** 支持的关键字值 */`)
  lines.push(`  includeKeywords?: string[];`)
  lines.push(`  /** 不支持的关键字值 */`)
  lines.push(`  excludeKeywords?: string[];`)
  lines.push(`  /** 支持的颜色值 */`)
  lines.push(`  includeColors?: string[];`)
  lines.push(`  /** 不支持的颜色值 */`)
  lines.push(`  excludeColors?: string[];`)
  lines.push(`  /** 支持的数值类型 */`)
  lines.push(`  includeNumberTypes?: NumberType[];`)
  lines.push(`  /** 不支持的数值类型 */`)
  lines.push(`  excludeNumberTypes?: NumberType[];`)
  lines.push(`  /** 支持的单位值 */`)
  lines.push(`  includeUnits?: string[];`)
  lines.push(`  /** 不支持的单位值 */`)
  lines.push(`  excludeUnits?: string[];`)
  lines.push(`}`)
  lines.push(``)
  
  // 用户配置接口
  lines.push(`/** 用户配置选项 */`)
  lines.push(`export interface CsstsUserConfig {`)
  lines.push(`  // ==================== 属性级别 ====================`)
  lines.push(`  /** 支持的属性列表（默认：所有标准属性） */`)
  lines.push(`  includeProperties?: CssPropertyName[];`)
  lines.push(`  /** 不支持的属性列表（默认：空） */`)
  lines.push(`  excludeProperties?: CssPropertyName[];`)
  lines.push(``)
  lines.push(`  // ==================== 数值属性 ====================`)
  lines.push(`  /** 支持数值的属性列表 */`)
  lines.push(`  includeNumericProperties?: CssPropertyName[];`)
  lines.push(`  /** 不支持数值的属性列表 */`)
  lines.push(`  excludeNumericProperties?: CssPropertyName[];`)
  lines.push(``)
  lines.push(`  // ==================== 全局关键字值 ====================`)
  lines.push(`  /** 全局支持的关键字值 */`)
  lines.push(`  includeKeywords?: string[];`)
  lines.push(`  /** 全局不支持的关键字值 */`)
  lines.push(`  excludeKeywords?: string[];`)
  lines.push(``)
  lines.push(`  // ==================== 全局颜色 ====================`)
  lines.push(`  /** 全局支持的颜色值 */`)
  lines.push(`  includeColors?: string[];`)
  lines.push(`  /** 全局不支持的颜色值 */`)
  lines.push(`  excludeColors?: string[];`)
  lines.push(``)
  lines.push(`  // ==================== 全局数值类型 ====================`)
  lines.push(`  /** 全局支持的数值类型（如 length, percentage, number 等） */`)
  lines.push(`  includeNumberTypes?: NumberType[];`)
  lines.push(`  /** 全局不支持的数值类型 */`)
  lines.push(`  excludeNumberTypes?: NumberType[];`)
  lines.push(``)
  lines.push(`  // ==================== 全局单位值 ====================`)
  lines.push(`  /** 全局支持的单位值 */`)
  lines.push(`  includeUnits?: string[];`)
  lines.push(`  /** 全局不支持的单位值 */`)
  lines.push(`  excludeUnits?: string[];`)
  lines.push(``)
  lines.push(`  // ==================== 属性级别配置 ====================`)
  lines.push(`  /** 属性级别的详细配置 */`)
  lines.push(`  properties?: Partial<Record<CssPropertyName, PropertyConfig>>;`)
  lines.push(`}`)
  lines.push(``)
  
  return lines.join('\n')
}

// ==================== 生成配置类 ====================

function generateConfigClass(): string {
  const lines: string[] = []
  
  lines.push(`/**`)
  lines.push(` * CSSTS 配置管理类`)
  lines.push(` * 自动生成，请勿手动修改`)
  lines.push(` * 生成时间: ${new Date().toISOString()}`)
  lines.push(` */`)
  lines.push(``)
  lines.push(`import type { CsstsUserConfig, CssPropertyName, PropertyConfig } from './cssts-config.d';`)
  lines.push(`import { CSS_PROPERTIES, NUMBER_TYPES, UNITS, COLORS } from './cssts-config.d';`)
  lines.push(``)
  lines.push(`// 导入 JSON 数据`)
  lines.push(`import keywordsData from './data/css-keywords.json';`)
  lines.push(`import numberTypesData from './data/css-number-types.json';`)
  lines.push(``)
  
  // 支持数值的属性（这个需要单独生成，因为不在 .d.ts 中）
  lines.push(`// ==================== 额外数据 ====================`)
  lines.push(``)
  lines.push(`/** 支持数值的属性 */`)
  lines.push(`export const NUMERIC_PROPERTIES = [`)
  const standardNumericProps = numericProperties.filter(p => !p.startsWith('-'))
  standardNumericProps.forEach(prop => {
    lines.push(`  '${prop}',`)
  })
  lines.push(`] as const;`)
  lines.push(``)
  
  // 配置类
  lines.push(`// ==================== 配置类 ====================`)
  lines.push(``)
  lines.push(`export class CsstsConfig {`)
  lines.push(`  private userConfig: CsstsUserConfig;`)
  lines.push(``)
  lines.push(`  // 缓存`)
  lines.push(`  private _properties: Set<string> | null = null;`)
  lines.push(`  private _numericProperties: Set<string> | null = null;`)
  lines.push(`  private _keywords: Set<string> | null = null;`)
  lines.push(`  private _colors: Set<string> | null = null;`)
  lines.push(`  private _numberTypes: Set<string> | null = null;`)
  lines.push(`  private _units: Set<string> | null = null;`)
  lines.push(`  private _propertyKeywords: Map<string, Set<string>> = new Map();`)
  lines.push(`  private _propertyColors: Map<string, Set<string>> = new Map();`)
  lines.push(`  private _propertyUnits: Map<string, Set<string>> = new Map();`)
  lines.push(``)
  lines.push(`  constructor(config: CsstsUserConfig = {}) {`)
  lines.push(`    this.userConfig = config;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 辅助方法：合并支持/不支持列表（支持优先）
  lines.push(`  /**`)
  lines.push(`   * 合并支持/不支持列表`)
  lines.push(`   * 规则：支持优先，冲突时以支持为准`)
  lines.push(`   */`)
  lines.push(`  private mergeIncludeExclude<T>(`)
  lines.push(`    defaults: readonly T[],`)
  lines.push(`    include?: T[],`)
  lines.push(`    exclude?: T[]`)
  lines.push(`  ): Set<T> {`)
  lines.push(`    // 从默认值开始`)
  lines.push(`    const result = new Set<T>(defaults);`)
  lines.push(``)
  lines.push(`    // 移除不支持的（如果没有在支持列表中）`)
  lines.push(`    if (exclude) {`)
  lines.push(`      const includeSet = new Set(include || []);`)
  lines.push(`      for (const item of exclude) {`)
  lines.push(`        // 支持优先：如果在支持列表中，不移除`)
  lines.push(`        if (!includeSet.has(item)) {`)
  lines.push(`          result.delete(item);`)
  lines.push(`        }`)
  lines.push(`      }`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    // 添加支持的`)
  lines.push(`    if (include) {`)
  lines.push(`      for (const item of include) {`)
  lines.push(`        result.add(item);`)
  lines.push(`      }`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    return result;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取支持的属性
  lines.push(`  /** 获取支持的属性集合 */`)
  lines.push(`  get properties(): Set<string> {`)
  lines.push(`    if (!this._properties) {`)
  lines.push(`      this._properties = this.mergeIncludeExclude(`)
  lines.push(`        CSS_PROPERTIES,`)
  lines.push(`        this.userConfig.includeProperties,`)
  lines.push(`        this.userConfig.excludeProperties`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(`    return this._properties;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取支持数值的属性
  lines.push(`  /** 获取支持数值的属性集合 */`)
  lines.push(`  get numericProperties(): Set<string> {`)
  lines.push(`    if (!this._numericProperties) {`)
  lines.push(`      this._numericProperties = this.mergeIncludeExclude(`)
  lines.push(`        NUMERIC_PROPERTIES,`)
  lines.push(`        this.userConfig.includeNumericProperties,`)
  lines.push(`        this.userConfig.excludeNumericProperties`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(`    return this._numericProperties;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取全局颜色
  lines.push(`  /** 获取全局支持的颜色集合 */`)
  lines.push(`  get colors(): Set<string> {`)
  lines.push(`    if (!this._colors) {`)
  lines.push(`      this._colors = this.mergeIncludeExclude(`)
  lines.push(`        COLORS,`)
  lines.push(`        this.userConfig.includeColors,`)
  lines.push(`        this.userConfig.excludeColors`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(`    return this._colors;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取全局数值类型
  lines.push(`  /** 获取全局支持的数值类型集合 */`)
  lines.push(`  get numberTypes(): Set<string> {`)
  lines.push(`    if (!this._numberTypes) {`)
  lines.push(`      this._numberTypes = this.mergeIncludeExclude(`)
  lines.push(`        NUMBER_TYPES,`)
  lines.push(`        this.userConfig.includeNumberTypes,`)
  lines.push(`        this.userConfig.excludeNumberTypes`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(`    return this._numberTypes;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取全局单位
  lines.push(`  /** 获取全局支持的单位集合 */`)
  lines.push(`  get units(): Set<string> {`)
  lines.push(`    if (!this._units) {`)
  lines.push(`      this._units = this.mergeIncludeExclude(`)
  lines.push(`        UNITS,`)
  lines.push(`        this.userConfig.includeUnits,`)
  lines.push(`        this.userConfig.excludeUnits`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(`    return this._units;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 检查方法
  lines.push(`  // ==================== 检查方法 ====================`)
  lines.push(``)
  lines.push(`  /** 检查属性是否支持 */`)
  lines.push(`  isPropertySupported(property: string): boolean {`)
  lines.push(`    return this.properties.has(property);`)
  lines.push(`  }`)
  lines.push(``)
  lines.push(`  /** 检查属性是否支持数值 */`)
  lines.push(`  isNumericProperty(property: string): boolean {`)
  lines.push(`    return this.numericProperties.has(property);`)
  lines.push(`  }`)
  lines.push(``)
  lines.push(`  /** 检查颜色是否支持（全局 + 属性级别） */`)
  lines.push(`  isColorSupported(color: string, property?: string): boolean {`)
  lines.push(`    // 先检查全局`)
  lines.push(`    if (!this.colors.has(color)) {`)
  lines.push(`      // 检查属性级别是否明确支持`)
  lines.push(`      if (property) {`)
  lines.push(`        const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`        if (propConfig?.includeColors?.includes(color)) {`)
  lines.push(`          return true;`)
  lines.push(`        }`)
  lines.push(`      }`)
  lines.push(`      return false;`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    // 检查属性级别是否排除（但支持优先）`)
  lines.push(`    if (property) {`)
  lines.push(`      const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`      if (propConfig?.excludeColors?.includes(color)) {`)
  lines.push(`        // 支持优先：如果属性级别明确支持，则不排除`)
  lines.push(`        return propConfig.includeColors?.includes(color) ?? false;`)
  lines.push(`      }`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    return true;`)
  lines.push(`  }`)
  lines.push(``)
  lines.push(`  /** 检查单位是否支持（全局 + 属性级别） */`)
  lines.push(`  isUnitSupported(unit: string, property?: string): boolean {`)
  lines.push(`    // 先检查全局`)
  lines.push(`    if (!this.units.has(unit)) {`)
  lines.push(`      // 检查属性级别是否明确支持`)
  lines.push(`      if (property) {`)
  lines.push(`        const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`        if (propConfig?.includeUnits?.includes(unit)) {`)
  lines.push(`          return true;`)
  lines.push(`        }`)
  lines.push(`      }`)
  lines.push(`      return false;`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    // 检查属性级别是否排除（但支持优先）`)
  lines.push(`    if (property) {`)
  lines.push(`      const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`      if (propConfig?.excludeUnits?.includes(unit)) {`)
  lines.push(`        return propConfig.includeUnits?.includes(unit) ?? false;`)
  lines.push(`      }`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    return true;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取属性的关键字
  lines.push(`  /** 获取属性支持的关键字 */`)
  lines.push(`  getPropertyKeywords(property: string): Set<string> {`)
  lines.push(`    if (this._propertyKeywords.has(property)) {`)
  lines.push(`      return this._propertyKeywords.get(property)!;`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    // 从 JSON 数据获取默认关键字`)
  lines.push(`    const propData = keywordsData.properties.find(p => p.name === property);`)
  lines.push(`    const defaultKeywords = propData?.keywords || [];`)
  lines.push(``)
  lines.push(`    // 合并全局配置`)
  lines.push(`    let keywords = this.mergeIncludeExclude(`)
  lines.push(`      defaultKeywords,`)
  lines.push(`      this.userConfig.includeKeywords,`)
  lines.push(`      this.userConfig.excludeKeywords`)
  lines.push(`    );`)
  lines.push(``)
  lines.push(`    // 合并属性级别配置`)
  lines.push(`    const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`    if (propConfig) {`)
  lines.push(`      keywords = this.mergeIncludeExclude(`)
  lines.push(`        [...keywords],`)
  lines.push(`        propConfig.includeKeywords,`)
  lines.push(`        propConfig.excludeKeywords`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    this._propertyKeywords.set(property, keywords);`)
  lines.push(`    return keywords;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 获取属性的单位
  lines.push(`  /** 获取属性支持的单位 */`)
  lines.push(`  getPropertyUnits(property: string): Set<string> {`)
  lines.push(`    if (this._propertyUnits.has(property)) {`)
  lines.push(`      return this._propertyUnits.get(property)!;`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    // 从 JSON 数据获取默认单位`)
  lines.push(`    const propData = numberTypesData.properties.find(p => p.name === property);`)
  lines.push(`    const defaultUnits = propData?.units || [];`)
  lines.push(``)
  lines.push(`    // 合并全局配置`)
  lines.push(`    let units = this.mergeIncludeExclude(`)
  lines.push(`      defaultUnits,`)
  lines.push(`      this.userConfig.includeUnits,`)
  lines.push(`      this.userConfig.excludeUnits`)
  lines.push(`    );`)
  lines.push(``)
  lines.push(`    // 合并属性级别配置`)
  lines.push(`    const propConfig = this.userConfig.properties?.[property as CssPropertyName];`)
  lines.push(`    if (propConfig) {`)
  lines.push(`      units = this.mergeIncludeExclude(`)
  lines.push(`        [...units],`)
  lines.push(`        propConfig.includeUnits,`)
  lines.push(`        propConfig.excludeUnits`)
  lines.push(`      );`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    this._propertyUnits.set(property, units);`)
  lines.push(`    return units;`)
  lines.push(`  }`)
  lines.push(``)
  
  // 清除缓存
  lines.push(`  /** 清除缓存（配置更新后调用） */`)
  lines.push(`  clearCache(): void {`)
  lines.push(`    this._properties = null;`)
  lines.push(`    this._numericProperties = null;`)
  lines.push(`    this._keywords = null;`)
  lines.push(`    this._colors = null;`)
  lines.push(`    this._numberTypes = null;`)
  lines.push(`    this._units = null;`)
  lines.push(`    this._propertyKeywords.clear();`)
  lines.push(`    this._propertyColors.clear();`)
  lines.push(`    this._propertyUnits.clear();`)
  lines.push(`  }`)
  lines.push(``)
  
  // 更新配置
  lines.push(`  /** 更新配置 */`)
  lines.push(`  updateConfig(config: Partial<CsstsUserConfig>): void {`)
  lines.push(`    this.userConfig = { ...this.userConfig, ...config };`)
  lines.push(`    this.clearCache();`)
  lines.push(`  }`)
  lines.push(`}`)
  lines.push(``)
  
  // 默认实例
  lines.push(`/** 默认配置实例 */`)
  lines.push(`export const defaultConfig = new CsstsConfig();`)
  lines.push(``)
  
  return lines.join('\n')
}

// ==================== 主函数 ====================

function main() {
  console.log('Generating config class and type definitions...\n')
  
  const outputDir = path.join(__dirname, '../src')
  
  // 1. 生成类型定义
  console.log('1. Generating type definitions...')
  const typeDefs = generateTypeDefinitions()
  fs.writeFileSync(path.join(outputDir, 'cssts-config.d.ts'), typeDefs)
  console.log('   Created: cssts-config.d.ts')
  
  // 2. 生成配置类
  console.log('2. Generating config class...')
  const configClass = generateConfigClass()
  fs.writeFileSync(path.join(outputDir, 'cssts-config.ts'), configClass)
  console.log('   Created: cssts-config.ts')
  
  console.log('\n✅ Generation complete!')
  console.log(`\nStatistics:`)
  console.log(`  - Properties: ${allProperties.length} (standard: ${allProperties.filter(p => !p.startsWith('-')).length})`)
  console.log(`  - Numeric properties: ${numericProperties.length}`)
  console.log(`  - Number types: ${numberTypes.length}`)
  console.log(`  - Units: ${allUnits.length}`)
  console.log(`  - Colors: ${allColors.length}`)
}

main()
