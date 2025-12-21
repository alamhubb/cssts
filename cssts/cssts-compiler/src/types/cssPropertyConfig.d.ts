/**
 * CSS 属性配置类型定义（自动生成）
 * 使用泛型实现三层精准类型约束：Property → NumberCategory → NumberUnit
 * 
 * 命名规范：Css + [Property|NumberCategory|NumberUnit|Keyword|Color|PseudoClass|PseudoElement] + [Name|Value|Config|Item]
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type { ALL_UNITS, ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP } from '../data/cssNumberData';
import type { PROPERTY_CATEGORIES_MAP } from '../data/cssPropertyNumber';
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

// 数值单位名称（提前定义，供 CssStepConfig 使用）
export type CssNumberUnitName = typeof ALL_UNITS[number];

// 步长配置
export interface CssStepConfig {
  /** 
   * 步长配置
   * - number: 单一步长值，如 step: 1
   * - number[]: 多个步长值，如 step: [1, 5, 10]
   * - CssProgressiveRange[]: 渐进步长范围
   */
  step?: number | number[] | CssProgressiveRange[];
  /** 最小值（可以为负数） */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 预设值（额外添加的特定值） */
  presets?: number[];
  /** 
   * 限制该 category 使用的单位
   * 如果不设置，使用该 category 的所有单位
   * 例如 fontRelative 默认包含 em, rem, ch, ex, cap, ic, lh, rlh
   * 设置 units: ['em', 'rem'] 则只生成这两个单位
   */
  units?: CssNumberUnitName[];
}

// 自定义属性值
export type CssCustomPropertyValue = string | Record<string, string>;

// ==================== NumberUnit 类型 ====================

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

// 属性名称（camelCase，Map 的 key）
export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// 获取属性支持的 Keywords
type PropertyKeywords<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_KEYWORDS_MAP ? typeof PROPERTY_KEYWORDS_MAP[P][number] : never;

// 获取属性支持的 NumberCategories
type PropertyCategories<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_CATEGORIES_MAP ? typeof PROPERTY_CATEGORIES_MAP[P][number] : never;

// 获取属性支持的 ColorTypes
type PropertyColorTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_COLOR_TYPES_MAP ? typeof PROPERTY_COLOR_TYPES_MAP[P][number] : never;

// 严格的 Category 配置（禁止额外属性）
type StrictCategoryConfig<T extends CssNumberCategoryName> = 
  { [K in T]?: CssNumberCategoryValue<K> } & { [K in Exclude<CssNumberCategoryName, T>]?: never };

// 严格的 ColorType 配置（禁止额外属性）
type StrictColorTypeConfig<T extends CssColorTypeName> = 
  { [K in T]?: CssColorTypeValue<K> } & { [K in Exclude<CssColorTypeName, T>]?: never };

// 属性值配置（泛型）
export type CssPropertyValue<P extends CssPropertyName> = {
  keywords?: PropertyKeywords<P>[];
  numberCategories?: PropertyCategories<P>[];
  colorTypes?: PropertyColorTypes<P>[];
  colors?: CssColorName[];
} & (PropertyCategories<P> extends never ? {} : 
  (StrictCategoryConfig<PropertyCategories<P>> | CssNumberUnitConfig | {}))
  & (PropertyColorTypes<P> extends never ? {} : 
  (StrictColorTypeConfig<PropertyColorTypes<P>> | {}));

// 严格的 Category 排除配置（禁止额外属性）
type StrictCategoryExcludeConfig<T extends CssNumberCategoryName> = 
  { [K in T]?: CssNumberCategoryExcludeValue<K> } & { [K in Exclude<CssNumberCategoryName, T>]?: never };

// 属性排除值配置（不含步长）
export type CssPropertyExcludeValue<P extends CssPropertyName> = {
  keywords?: PropertyKeywords<P>[];
  numberCategories?: PropertyCategories<P>[];
  colorTypes?: PropertyColorTypes<P>[];
  colors?: CssColorName[];
} & (PropertyCategories<P> extends never ? {} : 
  (StrictCategoryExcludeConfig<PropertyCategories<P>> | CssNumberUnitName[] | {}))
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

// 伪类名称（camelCase，Map 的 key）
export type CssPseudoClassName = keyof typeof PSEUDO_CLASS_NAME_MAP;

// 伪元素名称（camelCase，Map 的 key）
export type CssPseudoElementName = keyof typeof PSEUDO_ELEMENT_NAME_MAP;

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
