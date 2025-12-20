/**
 * CSS 类型定义生成脚本
 *
 * 数据来源：src/data/ 目录下的数据文件
 *
 * 生成文件（src/types/）：
 * - cssKeywords.d.ts: Keywords 类型
 * - numberTypes.d.ts: NumberTypes 类型
 * - cssPseudoClassElement.d.ts: 伪类/伪元素类型
 * - cssPropertyConfig.d.ts: 属性配置类型
 * - cssProperties.d.ts: 属性类型
 * - cssPropertiesValue.d.ts: 属性值类型
 * - pseudoStyles.d.ts: 伪类/伪元素样式类型
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
  const filePath = path.join(dataDir, 'propertyName.ts');
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
  const filePath = path.join(dataDir, 'propertyKeywords.ts');
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
  const filePath = path.join(dataDir, 'propertyNumberTypes.ts');
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
  const filePath = path.join(dataDir, 'pseudoClasses.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /'([^']+)'/g;
  const classes: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    classes.push(match[1]);
  }
  return classes;
}

function loadPseudoElements(): string[] {
  const filePath = path.join(dataDir, 'pseudoElements.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /'([^']+)'/g;
  const elements: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    elements.push(match[1]);
  }
  return elements;
}


// ==================== Types 生成 ====================

function generateCssKeywordsType(): string {
  return `/**
 * CSS Keywords 类型定义（自动生成）
 */

import type { keywords } from '../data/keywords';
import type { allKeywords } from '../data/allKeywords';
import type { ALL_COLORS } from '../data/color';

export type CssKeywordName = typeof keywords[number];

export type CssColorName = typeof ALL_COLORS[number];

export type CssAllKeywordName = typeof allKeywords[number];
`;
}

function generateNumberTypesType(): string {
  return `/**
 * NumberTypes 类型定义（自动生成）
 */

import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';
import type { ALL_NUMBER_CATEGORIES, ALL_UNITS } from '../data/numberTypeCategory';

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

export type CssNumberUnitName = typeof ALL_UNITS[number];
`;
}

function generateCssPseudoClassElementType(): string {
  return `/**
 * CSS 伪类和伪元素类型定义（自动生成）
 */

import type { pseudoClasses } from '../data/pseudoClasses';
import type { pseudoElements } from '../data/pseudoElements';

export type CssPseudoClassName = typeof pseudoClasses[number];

export type CssPseudoElementName = typeof pseudoElements[number];
`;
}

function generateCssPropertyConfigType(): string {
  return `/**
 * CSS 属性配置类型定义（自动生成）
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';
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
    "import type * as Keywords from '../data/propertyKeywords';",
    "import type * as NumberTypes from '../data/propertyNumberTypes';",
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

function generateCssPropertiesValueType(): string {
  const propertyNames = loadPropertyNames();
  const keywordsExports = loadPropertyKeywordsExports();

  const lines: string[] = [
    '/**',
    ' * CSS 属性值类型定义（自动生成）',
    ' */',
    '',
    "import type * as Keywords from '../data/propertyKeywords';",
    '',
    'export interface CSSPropertiesValueType {',
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

function generatePseudoStylesType(): string {
  const pseudoClasses = loadPseudoClasses();
  const pseudoElements = loadPseudoElements();

  const lines: string[] = [
    '/**',
    ' * 伪类/伪元素样式类型定义（自动生成）',
    ' */',
    '',
    "import type { CSSPropertiesValueType } from './cssPropertiesValue';",
    '',
    'export interface CssPseudoClassConfig {',
  ];

  for (const pseudoClass of pseudoClasses) {
    lines.push(`  ${kebabToCamel(pseudoClass)}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');
  lines.push('export interface CssPseudoElementConfig {');

  for (const pseudoElement of pseudoElements) {
    lines.push(`  ${kebabToCamel(pseudoElement)}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');
  return lines.join('\n');
}


function generateCsstsConfigType(): string {
  return `/**
 * CSSTS 配置类型定义（自动生成）
 */

import type { CssPropertyName } from './cssPropertyConfig';
import type { CssNumberTypeName, CssNumberCategoryName, CssNumberUnitName } from './numberTypes';
import type { CssKeywordName, CssColorName } from './cssKeywords';
import type { CssPseudoClassName, CssPseudoElementName } from './cssPseudoClassElement';
import type { CssPseudoClassConfig, CssPseudoElementConfig } from './pseudoStyles';
import type { CSSPropertiesValueType } from './cssPropertiesValue';

// ==================== 值配置类型 ====================

/** 渐进步长范围配置 */
export interface ProgressiveRange {
  max: number;
  divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
  step?: number | ProgressiveRange[];
  min?: number;
  max?: number;
  negative?: boolean;
  presets?: number[];
}

export interface CsstsStyleConfig extends CSSPropertiesValueType {
  pseudoClasses?: CssPseudoClassConfig;
  pseudoElements?: CssPseudoElementConfig;
}

// ==================== 层级配置类型（从下到上依赖） ====================

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;
export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;
export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

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

// ==================== 排除配置类型 ====================

export type CssUnitExcludeItem = CssNumberUnitName;
export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;
export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;
export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;
export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMap;

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

export interface CssPropertyBaseConfig {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}

export type CssPropertyExcludeValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
  | (CssPropertyBaseConfig & CssCategoryExcludeMap)
  | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;
export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMap;
export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;

// ==================== 属性配置类型 ====================

export type CustomPropertyValue = string | Record<string, string>;

export type CssPropertyValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
  | (CssPropertyBaseConfig & CssCategoryConfigMap)
  | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;
export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMap;
export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== CSSTS 配置接口 ====================

export interface CsstsConfig {
  properties?: CssPropertyConfig;
  excludeProperties?: CssPropertyExcludeConfig;
  numberTypes?: CssNumberTypeConfig;
  excludeNumberTypes?: CssNumberTypeExcludeConfig;
  unitCategories?: CssCategoryConfig;
  excludeUnitCategories?: CssCategoryExcludeConfig;
  units?: CssUnitConfig;
  excludeUnits?: CssUnitExcludeItem[];
  keywords?: CssKeywordName[];
  excludeKeywords?: CssKeywordName[];
  colors?: CssColorName[];
  excludeColors?: CssColorName[];
  customProperties?: Record<string, CustomPropertyValue>;
  progressiveRanges?: ProgressiveRange[];
  pseudoClasses?: CssPseudoClassName[];
  excludePseudoClasses?: CssPseudoClassName[];
  pseudoElements?: CssPseudoElementName[];
  excludePseudoElements?: CssPseudoElementName[];
  pseudoClassesConfig?: CssPseudoClassConfig;
  pseudoElementsConfig?: CssPseudoElementConfig;
}

export type CsstsConfigRequired = Required<CsstsConfig>;
`;
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 类型文件...\n');

  // 生成类型文件
  fs.writeFileSync(path.join(typesDir, 'cssKeywords.d.ts'), generateCssKeywordsType());
  console.log('✅ src/types/cssKeywords.d.ts');

  fs.writeFileSync(path.join(typesDir, 'numberTypes.d.ts'), generateNumberTypesType());
  console.log('✅ src/types/numberTypes.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPseudoClassElement.d.ts'), generateCssPseudoClassElementType());
  console.log('✅ src/types/cssPseudoClassElement.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssProperties.d.ts'), generateCssPropertiesType());
  console.log('✅ src/types/cssProperties.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertiesValue.d.ts'), generateCssPropertiesValueType());
  console.log('✅ src/types/cssPropertiesValue.d.ts');

  fs.writeFileSync(path.join(typesDir, 'pseudoStyles.d.ts'), generatePseudoStylesType());
  console.log('✅ src/types/pseudoStyles.d.ts');

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
