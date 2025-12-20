/**
 * CSS 类型定义生成脚本
 *
 * 数据来源：src/data/ 目录下的数据文件
 *
 * 生成文件（src/types/）：
 * - cssPropertyConfig.d.ts: 所有 CSS 配置类型（泛型版本）
 * - csstsConfig.d.ts: CSSTS 配置类型
 *
 * 运行方式：npx tsx generator/generator-type.ts
 * 
 * 前置条件：必须先运行 generator-data.ts 生成 data 文件
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CSS_PROPERTY_NAME_MAP } from '../src/data/cssPropertyNameMapping';
import { PSEUDO_CLASS_NAME_MAP, PSEUDO_ELEMENT_NAME_MAP } from '../src/data/cssPseudoData';
import { ALL_COLOR_TYPES, COLOR_NAME_MAP } from '../src/data/cssColorData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// ==================== Types 生成 ====================

// generateCssPseudoClassElementType 已合并到 generateCssPropertyConfigType

function generateCssPropertyConfigType(): string {
  return `/**
 * CSS 属性配置类型定义（自动生成）
 * 使用泛型实现四层精准类型约束：Property → NumberType → NumberCategory → NumberUnit
 * 
 * 命名规范：Css + [Property|NumberType|NumberCategory|NumberUnit|Keyword|Color|PseudoClass|PseudoElement] + [Name|Value|Config|Item]
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type { ALL_UNITS, ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP, NUMBER_TYPE_CATEGORY_MAP } from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES, PROPERTY_NUMBER_TYPES_MAP } from '../data/cssPropertyNumber';
import type { PROPERTY_COLOR_TYPES_MAP } from '../data/cssPropertyColorTypes';
import type { PROPERTY_KEYWORDS_MAP } from '../data/cssPropertyKeywords';
import type { KEYWORD_NAME_MAP } from '../data/cssKeywordsData';
import type { ALL_COLOR_TYPES, COLOR_TYPE_COLORS_MAP, COLOR_NAME_MAP } from '../data/cssColorData';
import type { PSEUDO_CLASS_NAME_MAP, PSEUDO_ELEMENT_NAME_MAP } from '../data/cssPseudoData';

// ==================== 基础配置类型 ====================

// 渐进步长范围
export interface CssProgressiveRange {
  max: number;
  divisors: number[];
}

// 步长配置
export interface CssStepConfig {
  step?: number | CssProgressiveRange[];
  min?: number;
  max?: number;
  negative?: boolean;
  presets?: number[];
}

// 自定义属性值
export type CssCustomPropertyValue = string | Record<string, string>;

// ==================== NumberUnit 类型 ====================

// 数值单位名称
export type CssNumberUnitName = typeof ALL_UNITS[number];

// 数值单位配置 Map
export type CssNumberUnitConfig = Partial<Record<CssNumberUnitName, CssStepConfig>>;

// 数值单位配置项
export type CssNumberUnitItem = CssNumberUnitName | CssNumberUnitConfig;

// ==================== NumberCategory 类型 ====================

// 数值类别名称
export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

// 获取 Category 对应的 Unit 类型
type CategoryUnits<C extends CssNumberCategoryName> = typeof CATEGORY_UNITS_MAP[C][number];

// 严格的 Unit 配置（禁止额外属性）
type StrictUnitConfig<T extends CssNumberUnitName> = 
  { [K in T]?: CssStepConfig } & { [K in Exclude<CssNumberUnitName, T>]?: never };

// 数值类别值配置（泛型）- 允许配置任意单位
export type CssNumberCategoryValue<C extends CssNumberCategoryName> = 
  | CssStepConfig
  | CssNumberUnitName[]
  | CssNumberUnitConfig;

// 数值类别排除值配置（不含步长）
export type CssNumberCategoryExcludeValue<C extends CssNumberCategoryName> = 
  | CssNumberUnitName[];

// 数值类别配置 Map
export type CssNumberCategoryConfig = {
  [C in CssNumberCategoryName]?: CssNumberCategoryValue<C>;
};

// 数值类别排除配置 Map
export type CssNumberCategoryExcludeConfig = {
  [C in CssNumberCategoryName]?: CssNumberCategoryExcludeValue<C>;
};

// 数值类别配置项
export type CssNumberCategoryItem = CssNumberCategoryName | CssNumberCategoryConfig;

// 数值类别排除配置项
export type CssNumberCategoryExcludeItem = CssNumberCategoryName | CssNumberCategoryExcludeConfig;

// ==================== NumberType 类型 ====================

// 数值类型名称
export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// 获取 NumberType 对应的 Category 类型
type NumberTypeCategories<NT extends CssNumberTypeName> = 
  NT extends keyof typeof NUMBER_TYPE_CATEGORY_MAP ? typeof NUMBER_TYPE_CATEGORY_MAP[NT][number] : never;

// 严格的 Category 配置（禁止额外属性）
type StrictCategoryConfig<T extends CssNumberCategoryName> = 
  { [K in T]?: CssNumberCategoryValue<K> } & { [K in Exclude<CssNumberCategoryName, T>]?: never };

// 严格的 Category 排除配置（禁止额外属性）
type StrictCategoryExcludeConfig<T extends CssNumberCategoryName> = 
  { [K in T]?: CssNumberCategoryExcludeValue<K> } & { [K in Exclude<CssNumberCategoryName, T>]?: never };

// 数值类型值配置（泛型）
export type CssNumberTypeValue<NT extends CssNumberTypeName> = 
  | CssStepConfig
  | NumberTypeCategories<NT>[]
  | StrictCategoryConfig<NumberTypeCategories<NT>>
  | CssNumberUnitConfig;

// 数值类型排除值配置（不含步长）
export type CssNumberTypeExcludeValue<NT extends CssNumberTypeName> = 
  | NumberTypeCategories<NT>[]
  | StrictCategoryExcludeConfig<NumberTypeCategories<NT>>
  | CssNumberUnitName[];

// 数值类型配置 Map
export type CssNumberTypeConfig = {
  [NT in CssNumberTypeName]?: CssNumberTypeValue<NT>;
};

// 数值类型排除配置 Map
export type CssNumberTypeExcludeConfig = {
  [NT in CssNumberTypeName]?: CssNumberTypeExcludeValue<NT>;
};

// 数值类型配置项
export type CssNumberTypeItem = CssNumberTypeName | CssNumberTypeConfig;

// 数值类型排除配置项
export type CssNumberTypeExcludeItem = CssNumberTypeName | CssNumberTypeExcludeConfig;

// ==================== Keyword 类型 ====================

// 关键字名称（camelCase）
export type CssKeywordName = keyof typeof KEYWORD_NAME_MAP;

// ==================== Color 类型 ====================

// 颜色类型名称
export type CssColorTypeName = typeof ALL_COLOR_TYPES[number];

// 获取 ColorType 对应的 Color 类型
type ColorTypeColors<CT extends CssColorTypeName> = typeof COLOR_TYPE_COLORS_MAP[CT][number];

// 颜色名称（kebab-case key）
export type CssColorName = keyof typeof COLOR_NAME_MAP;

// 颜色类型值配置（泛型）- 允许配置任意颜色
export type CssColorTypeValue<CT extends CssColorTypeName> = 
  | CssColorName[];

// 颜色类型配置 Map
export type CssColorTypeConfig = {
  [CT in CssColorTypeName]?: CssColorTypeValue<CT>;
};

// 颜色类型配置项
export type CssColorTypeItem = CssColorTypeName | CssColorTypeConfig;

// ==================== Property 类型 ====================

// 属性名称（camelCase，从 kebab-case 映射的值）
export type CssPropertyName = typeof CSS_PROPERTY_NAME_MAP[keyof typeof CSS_PROPERTY_NAME_MAP];

// 获取属性支持的 Keywords
type PropertyKeywords<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_KEYWORDS_MAP ? typeof PROPERTY_KEYWORDS_MAP[P][number] : never;

// 获取属性支持的 NumberTypes
type PropertyNumberTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_NUMBER_TYPES_MAP ? typeof PROPERTY_NUMBER_TYPES_MAP[P][number] : never;

// 获取属性支持的 ColorTypes
type PropertyColorTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_COLOR_TYPES_MAP ? typeof PROPERTY_COLOR_TYPES_MAP[P][number] : never;

// 严格的 NumberType 配置（禁止额外属性）
type StrictNumberTypeConfig<T extends CssNumberTypeName> = 
  { [K in T]?: CssNumberTypeValue<K> } & { [K in Exclude<CssNumberTypeName, T>]?: never };

// 严格的 ColorType 配置（禁止额外属性）
type StrictColorTypeConfig<T extends CssColorTypeName> = 
  { [K in T]?: CssColorTypeValue<K> } & { [K in Exclude<CssColorTypeName, T>]?: never };

// 属性值配置（泛型）
export type CssPropertyValue<P extends CssPropertyName> = {
  keywords?: PropertyKeywords<P>[];
  numberTypes?: PropertyNumberTypes<P>[];
  colorTypes?: PropertyColorTypes<P>[];
  colors?: CssColorName[];
} & (PropertyNumberTypes<P> extends never ? {} : 
  (StrictNumberTypeConfig<PropertyNumberTypes<P>> | CssNumberCategoryConfig | CssNumberUnitConfig | {}))
  & (PropertyColorTypes<P> extends never ? {} : 
  (StrictColorTypeConfig<PropertyColorTypes<P>> | {}));

// 严格的 NumberType 排除配置（禁止额外属性）
type StrictNumberTypeExcludeConfig<T extends CssNumberTypeName> = 
  { [K in T]?: CssNumberTypeExcludeValue<K> } & { [K in Exclude<CssNumberTypeName, T>]?: never };

// 属性排除值配置（不含步长）
export type CssPropertyExcludeValue<P extends CssPropertyName> = {
  keywords?: PropertyKeywords<P>[];
  numberTypes?: PropertyNumberTypes<P>[];
  colorTypes?: PropertyColorTypes<P>[];
  colors?: CssColorName[];
} & (PropertyNumberTypes<P> extends never ? {} : 
  (StrictNumberTypeExcludeConfig<PropertyNumberTypes<P>> | CssNumberCategoryExcludeConfig | CssNumberUnitName[] | {}))
  & (PropertyColorTypes<P> extends never ? {} : 
  (StrictColorTypeConfig<PropertyColorTypes<P>> | {}));

// 属性配置 Map
export type CssPropertyConfig = {
  [P in CssPropertyName]?: CssPropertyValue<P>;
};

// 属性排除配置 Map
export type CssPropertyExcludeConfig = {
  [P in CssPropertyName]?: CssPropertyExcludeValue<P>;
};

// 属性配置项
export type CssPropertyItem = CssPropertyName | CssPropertyConfig;

// 属性排除配置项
export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeConfig;

// ==================== Pseudo 类型 ====================

// 伪类名称（camelCase，从 kebab-case 映射的值）
export type CssPseudoClassName = typeof PSEUDO_CLASS_NAME_MAP[keyof typeof PSEUDO_CLASS_NAME_MAP];

// 伪元素名称（camelCase，从 kebab-case 映射的值）
export type CssPseudoElementName = typeof PSEUDO_ELEMENT_NAME_MAP[keyof typeof PSEUDO_ELEMENT_NAME_MAP];

// 伪类/伪元素值（属性样式配置）
export type CssPseudoValue = {
  [P in keyof typeof PROPERTY_KEYWORDS_MAP]?: typeof PROPERTY_KEYWORDS_MAP[P][number] | string;
};

// 伪类配置（使用 camelCase 键）
export type CssPseudoClassConfig = {
  [P in CssPseudoClassName]?: CssPseudoValue;
};

// 伪元素配置（使用 camelCase 键）
export type CssPseudoElementConfig = {
  [P in CssPseudoElementName]?: CssPseudoValue;
};
`;
}

// generateCssPseudoValueType 已合并到 generateCssPropertyConfigType



// ==================== CSSTS 配置类型 ====================

function generateCsstsConfigType(): string {
  return `/**
 * CSSTS 配置类型定义（自动生成）
 */

import type {
  CssProgressiveRange,
  CssCustomPropertyValue,
  CssNumberUnitName,
  CssNumberUnitItem,
  CssNumberCategoryItem,
  CssNumberCategoryExcludeItem,
  CssNumberTypeItem,
  CssNumberTypeExcludeItem,
  CssKeywordName,
  CssColorTypeName,
  CssColorTypeItem,
  CssColorName,
  CssPropertyItem,
  CssPropertyExcludeItem,
  CssPseudoClassName,
  CssPseudoElementName,
  CssPseudoClassConfig,
  CssPseudoElementConfig
} from './cssPropertyConfig';

export interface CsstsConfig {
  /** CSS 属性配置 */
  properties?: CssPropertyItem[];

  /** 排除的属性配置 */
  excludeProperties?: CssPropertyExcludeItem[];

  /** 数值类型配置 */
  numberTypes?: CssNumberTypeItem[];

  /** 排除的数值类型 */
  excludeNumberTypes?: CssNumberTypeExcludeItem[];

  /** 数值类别配置 */
  numberCategories?: CssNumberCategoryItem[];

  /** 排除的数值类别 */
  excludeNumberCategories?: CssNumberCategoryExcludeItem[];

  /** 数值单位配置 */
  numberUnits?: CssNumberUnitItem[];

  /** 排除的单位 */
  excludeUnits?: CssNumberUnitName[];

  /** 关键字 */
  keywords?: CssKeywordName[];

  /** 排除的关键字 */
  excludeKeywords?: CssKeywordName[];

  /** 颜色类型配置 */
  colorTypes?: CssColorTypeItem[];

  /** 排除的颜色类型 */
  excludeColorTypes?: CssColorTypeName[];

  /** 颜色 */
  colors?: CssColorName[];

  /** 排除的颜色 */
  excludeColors?: CssColorName[];

  /** 自定义属性 */
  customProperties?: Record<string, CssCustomPropertyValue>;

  /** 渐进步长范围 */
  progressiveRanges?: CssProgressiveRange[];

  /** 伪类 */
  pseudoClasses?: CssPseudoClassName[];

  /** 排除的伪类 */
  excludePseudoClasses?: CssPseudoClassName[];

  /** 伪元素 */
  pseudoElements?: CssPseudoElementName[];

  /** 排除的伪元素 */
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
  console.log('🚀 生成 CSS 类型文件...\n');

  // 配置类型文件
  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'csstsConfig.d.ts'), generateCsstsConfigType());
  console.log('✅ src/types/csstsConfig.d.ts');

  // 统计
  const propertyCount = Object.keys(CSS_PROPERTY_NAME_MAP).length;
  const pseudoClassCount = Object.keys(PSEUDO_CLASS_NAME_MAP).length;
  const pseudoElementCount = Object.keys(PSEUDO_ELEMENT_NAME_MAP).length;
  const colorTypeCount = ALL_COLOR_TYPES.length;
  const colorCount = Object.keys(COLOR_NAME_MAP).length;
  
  console.log(`\n📊 统计: 属性 ${propertyCount} | 颜色类型 ${colorTypeCount} | 颜色 ${colorCount} | 伪类 ${pseudoClassCount} | 伪元素 ${pseudoElementCount}`);
  console.log('\n✨ 类型文件生成完成!');
}

main();
