/**
 * CSS 类型定义生成脚本
 *
 * 数据来源：src/data/ 目录下的数据文件
 *
 * 生成文件（src/types/）：
 * - cssPseudoClassElement.d.ts: 伪类/伪元素类型和样式配置
 * - cssProperties.d.ts: 属性类型
 * - cssPseudoValue.d.ts: 伪类/伪元素属性值类型
 * - cssPropertyConfig.d.ts: 基础配置/属性名称/Number/Property 配置类型
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

// 读取每个属性的 numberTypes 值
function loadPropertyNumberTypesValues(): Map<string, string[]> {
  const filePath = path.join(dataDir, 'cssPropertyNumber.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  // 匹配 export const XXX_NUMBER_TYPES = ['type1', 'type2'] as const;
  const regex = /export const (\w+)_NUMBER_TYPES = \[([^\]]*)\] as const;/g;
  const result = new Map<string, string[]>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    const constName = match[1];
    const typesStr = match[2];
    // 提取引号中的值
    const types: string[] = [];
    const typeRegex = /'([^']+)'/g;
    let typeMatch;
    while ((typeMatch = typeRegex.exec(typesStr)) !== null) {
      types.push(typeMatch[1]);
    }
    result.set(constName, types);
  }
  return result;
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
  const lines: string[] = [];

  // 文件头部
  lines.push(`/**
 * CSS 属性配置类型定义（自动生成）
 * 使用泛型实现四层精准类型约束：Property → NumberType → Category → Unit
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type {
  ALL_UNITS,
  ALL_NUMBER_CATEGORIES,
  CATEGORY_UNITS_MAP,
  NUMBER_TYPE_CATEGORY_MAP,
} from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES, PROPERTY_NUMBER_TYPES_MAP } from '../data/cssPropertyNumber';
import type { PROPERTY_KEYWORDS_MAP } from '../data/cssPropertyKeywords';
import type { keywords, allKeywords } from '../data/cssKeywordsData';
import type { ALL_COLORS } from '../data/cssColorData';

// ==================== 基础配置类型 ====================`);

  lines.push(`
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

// ==================== 属性名称类型 ====================

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// ==================== Unit 类型 ====================

export type CssNumberUnitName = typeof ALL_UNITS[number];

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;

export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

export type CssUnitExcludeItem = CssNumberUnitName;

export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

// ==================== Category 类型（泛型版本） ====================

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

// 从 CATEGORY_UNITS_MAP 获取 Category 对应的 Unit 类型
type CategoryUnits<C extends CssNumberCategoryName> = typeof CATEGORY_UNITS_MAP[C][number];

// 严格的 Unit 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictUnitConfigMap<T extends CssNumberUnitName> = {
  [K in T]?: CsstsStepConfig;
} & {
  [K in Exclude<CssNumberUnitName, T>]?: never;
};

// Category 的精准 Unit 配置 Map（泛型版本）
export type CssCategoryUnitConfigMap<C extends CssNumberCategoryName> = StrictUnitConfigMap<CategoryUnits<C>>;

// Category 的精准配置类型（泛型版本）
export type CssCategoryValueConfigPrecise<C extends CssNumberCategoryName> = 
  | CategoryUnits<C>[]
  | CssCategoryUnitConfigMap<C>;

// 精准的 Category 配置 Map（使用映射类型自动生成）
export type CssCategoryConfigMapPrecise = {
  [C in CssNumberCategoryName]?: CssCategoryValueConfigPrecise<C>;
};

// 辅助函数类型，用于严格类型检查
export type DefineCategoryConfig = <T extends CssCategoryConfigMapPrecise>(config: T) => T;

// 兼容旧版的宽松类型
export type CssCategoryValueConfig =
  | CsstsStepConfig
  | CssNumberUnitName[]
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;

export type CssCategoryConfigItem =
  | CssNumberCategoryName
  | CssCategoryConfigMapPrecise;

export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMapPrecise;

// 精准的 Category 排除值配置（泛型版本）
export type CssCategoryExcludeValueConfigPrecise<C extends CssNumberCategoryName> =
  | CategoryUnits<C>[]
  | Partial<Record<CategoryUnits<C>, Record<string, never>>>;

// 精准的 Category 排除 Map
export type CssCategoryExcludeMapPrecise = {
  [C in CssNumberCategoryName]?: CssCategoryExcludeValueConfigPrecise<C>;
};

// 兼容旧版的宽松类型
export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;

export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMapPrecise;

export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMapPrecise;

// ==================== NumberType 类型（泛型版本） ====================

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// 从 NUMBER_TYPE_CATEGORY_MAP 获取 NumberType 对应的 Category 类型
type NumberTypeCategories<NT extends CssNumberTypeName> = 
  NT extends keyof typeof NUMBER_TYPE_CATEGORY_MAP 
    ? typeof NUMBER_TYPE_CATEGORY_MAP[NT][number] 
    : never;

// 严格的 Category 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictCategoryConfigMap<T extends CssNumberCategoryName> = {
  [K in T]?: CssCategoryValueConfigPrecise<K>;
} & {
  [K in Exclude<CssNumberCategoryName, T>]?: never;
};

// NumberType 的精准 Category 配置 Map（泛型版本）
export type CssNumberTypeCategoryConfigMap<NT extends CssNumberTypeName> = StrictCategoryConfigMap<NumberTypeCategories<NT>>;

// NumberType 的精准配置类型（泛型版本）
export type CssNumberTypeValueConfigPrecise<NT extends CssNumberTypeName> = 
  | CsstsStepConfig
  | NumberTypeCategories<NT>[]
  | CssNumberTypeCategoryConfigMap<NT>
  | CssUnitConfigMap;

// 精准的 NumberType 配置 Map（使用映射类型自动生成）
export type CssNumberTypeConfigMapPrecise = {
  [NT in CssNumberTypeName]?: CssNumberTypeValueConfigPrecise<NT>;
};

// 兼容旧版的宽松类型
export type CssNumberTypeValueConfig =
  | CsstsStepConfig
  | CssNumberCategoryName[]
  | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;

export type CssNumberTypeConfigItem =
  | CssNumberTypeName
  | CssNumberTypeConfigMapPrecise;

export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMapPrecise;

export type CssNumberTypeExcludeValueConfig =
  | CssNumberCategoryName[]
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;

export type CssNumberTypeExcludeItem =
  | CssNumberTypeName
  | CssNumberTypeExcludeMap;

export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;

// ==================== Keywords 类型 ====================

export type CssKeywordName = typeof keywords[number];

export type CssColorName = typeof ALL_COLORS[number];

export type CssAllKeywordName = typeof allKeywords[number];

// ==================== Property 类型（泛型版本） ====================

// 从 PROPERTY_KEYWORDS_MAP 获取属性支持的 Keywords
type PropertyKeywords<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_KEYWORDS_MAP 
    ? typeof PROPERTY_KEYWORDS_MAP[P][number] 
    : never;

// 从 PROPERTY_NUMBER_TYPES_MAP 获取属性支持的 NumberTypes
type PropertyNumberTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_NUMBER_TYPES_MAP 
    ? typeof PROPERTY_NUMBER_TYPES_MAP[P][number] 
    : never;

// 严格的 NumberType 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictNumberTypeConfigMap<T extends CssNumberTypeName> = {
  [K in T]?: CssNumberTypeValueConfigPrecise<K>;
} & {
  [K in Exclude<CssNumberTypeName, T>]?: never;
};

// Property 的精准 NumberType 配置 Map（泛型版本）
export type CssPropertyNumberTypeConfigMap<P extends CssPropertyName> = StrictNumberTypeConfigMap<PropertyNumberTypes<P>>;

// Property 的精准配置类型（泛型版本）
export type CssPropertyValueConfigPrecise<P extends CssPropertyName> = {
  /** 属性支持的 keywords */
  keywords?: PropertyKeywords<P>[];
  /** 属性支持的 numberTypes */
  numberTypes?: PropertyNumberTypes<P>[];
} & (
  // 如果属性有 numberTypes，可以配置 numberType/category/unit
  PropertyNumberTypes<P> extends never 
    ? {} 
    : (CssPropertyNumberTypeConfigMap<P> | CssCategoryConfigMapPrecise | CssUnitConfigMap | {})
);

// 精准的 Property 配置 Map（使用映射类型自动生成）
export type CssPropertyConfigMapPrecise = {
  [P in CssPropertyName]?: CssPropertyValueConfigPrecise<P>;
};

// 兼容旧版的宽松类型
export interface CssPropertyBaseConfig {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}

export type CssPropertyValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
  | (CssPropertyBaseConfig & CssCategoryConfigMap)
  | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMapPrecise;

export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMapPrecise;

// ==================== Property 排除配置 ====================

export type CssPropertyExcludeValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
  | (CssPropertyBaseConfig & CssCategoryExcludeMap)
  | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMapPrecise = { [K in CssPropertyName]?: CssPropertyExcludeValueConfig };

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMapPrecise;

export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMapPrecise;
`);

  return lines.join('\n');
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



// ==================== CSSTS 配置类型 ====================

function generateCsstsConfigType(): string {
  return `/**
 * CSSTS 配置类型定义（自动生成）
 */

import type { CssPseudoClassName, CssPseudoElementName, CssPseudoClassConfig, CssPseudoElementConfig } from './cssPseudoClassElement';
import type {
  CssProgressiveRange,
  CssCustomPropertyValue,
  CssUnitConfig,
  CssUnitExcludeItem,
  CssCategoryConfig,
  CssCategoryExcludeConfig,
  CssNumberTypeConfig,
  CssNumberTypeExcludeConfig,
  CssKeywordName,
  CssColorName,
  CssPropertyConfig,
  CssPropertyExcludeConfig
} from './cssPropertyConfig';

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

  fs.writeFileSync(path.join(typesDir, 'cssProperties.d.ts'), generateCssPropertiesType());
  console.log('✅ src/types/cssProperties.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPseudoValue.d.ts'), generateCssPseudoValueType());
  console.log('✅ src/types/cssPseudoValue.d.ts');

  // 配置类型文件
  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

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
