/**
 * CSS 类型定义生成脚本
 *
 * 数据来源：src/data/ 目录下的数据文件
 *
 * 生成文件（src/types/）：
 * - cssPseudoClassElement.d.ts: 伪类/伪元素类型和样式配置
 * - cssPropertyConfig.d.ts: 属性名称类型
 * - cssProperties.d.ts: 属性类型
 * - cssPseudoValue.d.ts: 伪类/伪元素属性值类型
 * - csstsStepConfig.d.ts: 基础配置类型
 * - cssNumberConfig.d.ts: Unit/Category/NumberType 配置类型
 * - cssPropertyValueConfig.d.ts: Property 配置类型和 Keywords 类型
 * - csstsConfig.d.ts: CSSTS 配置类型
 *
 * 运行方式：npx tsx generator/generator-type.ts
 * 
 * 前置条件：必须先运行 generator-data.ts 生成 data 文件
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');
const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// ==================== 工具函数 ====================

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function camelToUpperSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}

// ==================== 从 data 文件读取数据 ====================

function loadPropertyNames(): string[] {
  const filePath = path.join(dataDir, 'cssPropertyNameMapping.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /^\s+(\w+):\s*'/gm;
  const names: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }
  return names.sort();
}

function loadPropertyKeywordsExports(): Set<string> {
  const filePath = path.join(dataDir, 'cssPropertyKeywords.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /export const (\w+_KEYWORDS)/g;
  const exports = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.add(match[1]);
  }
  return exports;
}

function loadPropertyNumberTypesExports(): Set<string> {
  const filePath = path.join(dataDir, 'cssPropertyNumber.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /export const (\w+_NUMBER_TYPES)/g;
  const exports = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.add(match[1]);
  }
  return exports;
}

function loadPseudoClasses(): string[] {
  const filePath = path.join(dataDir, 'cssPseudoData.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  // 只匹配 pseudoClasses 数组中的内容
  const match = content.match(/export const pseudoClasses = \[([\s\S]*?)\] as const;/);
  if (!match) return [];
  const regex = /'([^']+)'/g;
  const classes: string[] = [];
  let m;
  while ((m = regex.exec(match[1])) !== null) {
    classes.push(m[1]);
  }
  return classes;
}

function loadPseudoElements(): string[] {
  const filePath = path.join(dataDir, 'cssPseudoData.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  // 只匹配 pseudoElements 数组中的内容
  const match = content.match(/export const pseudoElements = \[([\s\S]*?)\] as const;/);
  if (!match) return [];
  const regex = /'([^']+)'/g;
  const elements: string[] = [];
  let m;
  while ((m = regex.exec(match[1])) !== null) {
    elements.push(m[1]);
  }
  return elements;
}


// ==================== Types 生成 ====================

function generateCssPseudoClassElementType(): string {
  const pseudoClasses = loadPseudoClasses();
  const pseudoElements = loadPseudoElements();

  const lines: string[] = [
    '/**',
    ' * CSS 伪类和伪元素类型定义（自动生成）',
    ' */',
    '',
    "import type { pseudoClasses, pseudoElements } from '../data/cssPseudoData';",
    '',
    "import type { CssPseudoValueType } from './cssPseudoValue';",
    '',
    'export type CssPseudoClassName = typeof pseudoClasses[number];',
    '',
    'export type CssPseudoElementName = typeof pseudoElements[number];',
    '',
    '// ==================== 伪类/伪元素样式配置 ====================',
    '',
    'export interface CssPseudoClassConfig {',
  ];

  for (const pseudoClass of pseudoClasses) {
    lines.push(`  ${kebabToCamel(pseudoClass)}?: CssPseudoValueType;`);
  }

  lines.push('}', '');
  lines.push('export interface CssPseudoElementConfig {');

  for (const pseudoElement of pseudoElements) {
    lines.push(`  ${kebabToCamel(pseudoElement)}?: CssPseudoValueType;`);
  }

  lines.push('}', '');
  return lines.join('\n');
}

function generateCssPropertyConfigType(): string {
  return `/**
 * CSS 属性配置类型定义（自动生成）
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type { CSSPropertiesType } from './cssProperties';

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

export type CssProperty = CssPropertyName | CSSPropertiesType;

export type CssProperties = CssProperty | CssProperty[];
`;
}

function generateCssPropertiesType(): string {
  const propertyNames = loadPropertyNames();
  const keywordsExports = loadPropertyKeywordsExports();
  const numberTypesExports = loadPropertyNumberTypesExports();

  const lines: string[] = [
    '/**',
    ' * CSS 属性类型定义（自动生成）',
    ' */',
    '',
    "import type * as Keywords from '../data/cssPropertyKeywords';",
    "import type * as NumberTypes from '../data/cssPropertyNumber';",
    '',
  ];

  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const keywordsConst = `${constName}_KEYWORDS`;
    const numberTypesConst = `${constName}_NUMBER_TYPES`;
    
    const hasKeywords = keywordsExports.has(keywordsConst);
    const hasNumberTypes = numberTypesExports.has(numberTypesConst);
    
    if (!hasKeywords && !hasNumberTypes) continue;

    lines.push(`export interface ${camelName}PropertyType {`);
    if (hasKeywords) {
      lines.push(`  keywords: typeof Keywords.${keywordsConst}[number][];`);
    }
    if (hasNumberTypes) {
      lines.push(`  numberTypes: typeof NumberTypes.${numberTypesConst}[number][];`);
    }
    lines.push('}', '');
  }

  lines.push('export interface CSSPropertiesType {');
  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const hasKeywords = keywordsExports.has(`${constName}_KEYWORDS`);
    const hasNumberTypes = numberTypesExports.has(`${constName}_NUMBER_TYPES`);
    if (hasKeywords || hasNumberTypes) {
      lines.push(`  ${camelName}?: ${camelName}PropertyType;`);
    }
  }
  lines.push('}', '');

  return lines.join('\n');
}

function generateCssPseudoValueType(): string {
  const propertyNames = loadPropertyNames();
  const keywordsExports = loadPropertyKeywordsExports();

  const lines: string[] = [
    '/**',
    ' * CSS 伪类/伪元素属性值类型定义（自动生成）',
    ' */',
    '',
    "import type * as Keywords from '../data/cssPropertyKeywords';",
    '',
    'export interface CssPseudoValueType {',
  ];

  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const keywordsConst = `${constName}_KEYWORDS`;
    if (keywordsExports.has(keywordsConst)) {
      lines.push(`  ${camelName}?: typeof Keywords.${keywordsConst}[number] | string;`);
    }
  }
  
  lines.push('}', '');
  return lines.join('\n');
}



// ==================== 基础配置类型 ====================

function generateCsstsStepConfigType(): string {
  return `/**
 * 基础配置类型定义（自动生成）
 */

/** 渐进步长范围配置 */
export interface CssProgressiveRange {
  max: number;
  divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
  step?: number | CssProgressiveRange[];
  min?: number;
  max?: number;
  negative?: boolean;
  presets?: number[];
}

export type CssCustomPropertyValue = string | Record<string, string>;
`;
}

// ==================== Number 配置类型（合并 Unit/Category/NumberType） ====================

function generateNumberConfigType(): string {
  return `/**
 * CSS 数值配置类型定义（自动生成）
 * 包含 Unit、Category、NumberType 配置类型
 */

import type { ALL_UNITS, ALL_NUMBER_CATEGORIES } from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES } from '../data/cssPropertyNumber';

import type { CsstsStepConfig } from './csstsStepConfig';

// ==================== Unit 类型 ====================

export type CssNumberUnitName = typeof ALL_UNITS[number];

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;

export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

export type CssUnitExcludeItem = CssNumberUnitName;

export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

// ==================== Category 类型 ====================

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

export type CssCategoryValueConfig =
  | CsstsStepConfig
  | CssNumberUnitName[]
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;

export type CssCategoryConfigItem =
  | CssNumberCategoryName
  | CssCategoryConfigMap
  | CssUnitConfigMap;

export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMap;

export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;

export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMap;

// ==================== NumberType 类型 ====================

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

export type CssNumberTypeValueConfig =
  | CsstsStepConfig
  | CssNumberCategoryName[]
  | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;

export type CssNumberTypeConfigItem =
  | CssNumberTypeName
  | CssNumberTypeConfigMap
  | CssCategoryConfigMap
  | CssUnitConfigMap;

export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMap;

export type CssNumberTypeExcludeValueConfig =
  | CssNumberCategoryName[]
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;

export type CssNumberTypeExcludeItem =
  | CssNumberTypeName
  | CssNumberTypeExcludeMap
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;
`;
}

// ==================== Property 配置类型 ====================

function generatePropertyConfigType(): string {
  return `/**
 * Property 配置类型定义（自动生成）
 */

import type { keywords, allKeywords } from '../data/cssKeywordsData';
import type { ALL_COLORS } from '../data/color';

import type { CssPropertyName } from './cssPropertyConfig';
import type {
  CssNumberUnitName,
  CssUnitConfigMap,
  CssUnitExcludeMap,
  CssCategoryConfigMap,
  CssCategoryExcludeMap,
  CssNumberTypeName,
  CssNumberTypeConfigMap,
  CssNumberTypeConfigItem,
  CssNumberTypeExcludeMap,
  CssNumberTypeExcludeItem
} from './cssNumberConfig';

// ==================== Keywords 类型 ====================

export type CssKeywordName = typeof keywords[number];

export type CssColorName = typeof ALL_COLORS[number];

export type CssAllKeywordName = typeof allKeywords[number];

// ==================== Property 基础配置 ====================

export interface CssPropertyBaseConfig {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}

// ==================== Property 配置 ====================

export type CssPropertyValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
  | (CssPropertyBaseConfig & CssCategoryConfigMap)
  | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMap;

export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== Property 排除配置 ====================

export type CssPropertyExcludeValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
  | (CssPropertyBaseConfig & CssCategoryExcludeMap)
  | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMap;

export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;
`;
}

// ==================== CSSTS 配置类型 ====================

function generateCsstsConfigType(): string {
  return `/**
 * CSSTS 配置类型定义（自动生成）
 */

import type { CssPseudoClassName, CssPseudoElementName, CssPseudoClassConfig, CssPseudoElementConfig } from './cssPseudoClassElement';
import type { CssProgressiveRange, CssCustomPropertyValue } from './csstsStepConfig';
import type {
  CssUnitConfig,
  CssUnitExcludeItem,
  CssCategoryConfig,
  CssCategoryExcludeConfig,
  CssNumberTypeConfig,
  CssNumberTypeExcludeConfig
} from './cssNumberConfig';
import type { CssKeywordName, CssColorName, CssPropertyConfig, CssPropertyExcludeConfig } from './cssPropertyValueConfig';

export interface CsstsConfig {
  /** 包含的 CSS 属性配置，如 ['width', 'height'] 或 { width: { px: { step: 1 } } } */
  properties?: CssPropertyConfig;
  /** 排除的 CSS 属性，如 ['appearance', 'zoom'] */
  excludeProperties?: CssPropertyExcludeConfig;
  /** 包含的数值类型配置，如 ['length', 'angle'] 或 { length: { px: { step: 1 } } } */
  numberTypes?: CssNumberTypeConfig;
  /** 排除的数值类型，如 ['flex', 'resolution'] */
  excludeNumberTypes?: CssNumberTypeExcludeConfig;
  /** 包含的单位类别配置，如 ['absolute-length', 'angle'] */
  unitCategories?: CssCategoryConfig;
  /** 排除的单位类别，如 ['viewport-percentage-length'] */
  excludeUnitCategories?: CssCategoryExcludeConfig;
  /** 包含的单位配置，如 ['px', 'rem'] 或 { px: { step: 1, min: 0, max: 100 } } */
  units?: CssUnitConfig;
  /** 排除的单位，如 ['cm', 'mm', 'in'] */
  excludeUnits?: CssUnitExcludeItem[];
  /** 包含的关键字，如 ['auto', 'inherit', 'initial'] */
  keywords?: CssKeywordName[];
  /** 排除的关键字，如 ['unset', 'revert'] */
  excludeKeywords?: CssKeywordName[];
  /** 包含的颜色，如 ['red', 'blue', 'transparent'] */
  colors?: CssColorName[];
  /** 排除的颜色，如 ['rebeccapurple'] */
  excludeColors?: CssColorName[];
  /** 自定义属性，如 { '--primary': '#007bff' } 或 { '--size': { sm: '12px', lg: '24px' } } */
  customProperties?: Record<string, CssCustomPropertyValue>;
  /** 渐进步长范围，如 [{ max: 100, divisors: [1, 2, 4] }] */
  progressiveRanges?: CssProgressiveRange[];
  /** 包含的伪类，如 ['hover', 'focus', 'active'] */
  pseudoClasses?: CssPseudoClassName[];
  /** 排除的伪类，如 ['visited', 'link'] */
  excludePseudoClasses?: CssPseudoClassName[];
  /** 包含的伪元素，如 ['before', 'after'] */
  pseudoElements?: CssPseudoElementName[];
  /** 排除的伪元素，如 ['first-line', 'first-letter'] */
  excludePseudoElements?: CssPseudoElementName[];
  /** 伪类样式配置 */
  pseudoClassesConfig?: CssPseudoClassConfig;
  /** 伪元素样式配置 */
  pseudoElementsConfig?: CssPseudoElementConfig;
}

export type CsstsConfigRequired = Required<CsstsConfig>;
`;
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 类型文件...\n');

  // 基础类型文件
  fs.writeFileSync(path.join(typesDir, 'cssPseudoClassElement.d.ts'), generateCssPseudoClassElementType());
  console.log('✅ src/types/cssPseudoClassElement.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssProperties.d.ts'), generateCssPropertiesType());
  console.log('✅ src/types/cssProperties.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPseudoValue.d.ts'), generateCssPseudoValueType());
  console.log('✅ src/types/cssPseudoValue.d.ts');

  // 层级配置类型文件
  fs.writeFileSync(path.join(typesDir, 'csstsStepConfig.d.ts'), generateCsstsStepConfigType());
  console.log('✅ src/types/csstsStepConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssNumberConfig.d.ts'), generateNumberConfigType());
  console.log('✅ src/types/cssNumberConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertyValueConfig.d.ts'), generatePropertyConfigType());
  console.log('✅ src/types/cssPropertyValueConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'csstsConfig.d.ts'), generateCsstsConfigType());
  console.log('✅ src/types/csstsConfig.d.ts');

  // 统计
  const pseudoClasses = loadPseudoClasses();
  const pseudoElements = loadPseudoElements();
  const propertyNames = loadPropertyNames();

  console.log(`\n📊 统计信息:`);
  console.log(`   属性数: ${propertyNames.length}`);
  console.log(`   伪类数: ${pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoElements.length}`);
  console.log('\n✨ 类型文件生成完成!');
}

main();
