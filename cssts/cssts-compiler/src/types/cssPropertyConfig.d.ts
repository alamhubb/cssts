/**
 * CSS 属性配置类型定义（自动生成）
 * 使用泛型实现四层精准类型约束：Property → NumberType → NumberCategory → NumberUnit
 * 
 * 命名规范：Css + [Property|NumberType|NumberCategory|NumberUnit|Keyword|Color|PseudoClass|PseudoElement] + [Name|Value|Config|Item]
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type { ALL_UNITS, ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP, NUMBER_TYPE_CATEGORY_MAP } from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES, PROPERTY_NUMBER_TYPES_MAP } from '../data/cssPropertyNumber';
import type { PROPERTY_KEYWORDS_MAP } from '../data/cssPropertyKeywords';
import type { keywords, allKeywords } from '../data/cssKeywordsData';
import type { ALL_COLORS } from '../data/cssColorData';
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

// 数值类别值配置（泛型）
export type CssNumberCategoryValue<C extends CssNumberCategoryName> = 
  | CategoryUnits<C>[]
  | StrictUnitConfig<CategoryUnits<C>>;

// 数值类别配置 Map
export type CssNumberCategoryConfig = {
  [C in CssNumberCategoryName]?: CssNumberCategoryValue<C>;
};

// 数值类别配置项
export type CssNumberCategoryItem = CssNumberCategoryName | CssNumberCategoryConfig;

// ==================== NumberType 类型 ====================

// 数值类型名称
export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// 获取 NumberType 对应的 Category 类型
type NumberTypeCategories<NT extends CssNumberTypeName> = 
  NT extends keyof typeof NUMBER_TYPE_CATEGORY_MAP ? typeof NUMBER_TYPE_CATEGORY_MAP[NT][number] : never;

// 严格的 Category 配置（禁止额外属性）
type StrictCategoryConfig<T extends CssNumberCategoryName> = 
  { [K in T]?: CssNumberCategoryValue<K> } & { [K in Exclude<CssNumberCategoryName, T>]?: never };

// 数值类型值配置（泛型）
export type CssNumberTypeValue<NT extends CssNumberTypeName> = 
  | CssStepConfig
  | NumberTypeCategories<NT>[]
  | StrictCategoryConfig<NumberTypeCategories<NT>>
  | CssNumberUnitConfig;

// 数值类型配置 Map
export type CssNumberTypeConfig = {
  [NT in CssNumberTypeName]?: CssNumberTypeValue<NT>;
};

// 数值类型配置项
export type CssNumberTypeItem = CssNumberTypeName | CssNumberTypeConfig;

// ==================== Keyword 类型 ====================

// 关键字名称
export type CssKeywordName = typeof keywords[number];

// 颜色名称
export type CssColorName = typeof ALL_COLORS[number];

// 所有关键字名称（包含颜色）
export type CssAllKeywordName = typeof allKeywords[number];

// ==================== Property 类型 ====================

// 属性名称
export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// 获取属性支持的 Keywords
type PropertyKeywords<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_KEYWORDS_MAP ? typeof PROPERTY_KEYWORDS_MAP[P][number] : never;

// 获取属性支持的 NumberTypes
type PropertyNumberTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_NUMBER_TYPES_MAP ? typeof PROPERTY_NUMBER_TYPES_MAP[P][number] : never;

// 严格的 NumberType 配置（禁止额外属性）
type StrictNumberTypeConfig<T extends CssNumberTypeName> = 
  { [K in T]?: CssNumberTypeValue<K> } & { [K in Exclude<CssNumberTypeName, T>]?: never };

// 属性值配置（泛型）
export type CssPropertyValue<P extends CssPropertyName> = {
  keywords?: PropertyKeywords<P>[];
  numberTypes?: PropertyNumberTypes<P>[];
} & (PropertyNumberTypes<P> extends never ? {} : 
  (StrictNumberTypeConfig<PropertyNumberTypes<P>> | CssNumberCategoryConfig | CssNumberUnitConfig | {}));

// 属性配置 Map
export type CssPropertyConfig = {
  [P in CssPropertyName]?: CssPropertyValue<P>;
};

// 属性配置项
export type CssPropertyItem = CssPropertyName | CssPropertyConfig;

// ==================== Pseudo 类型 ====================

// 伪类名称
export type CssPseudoClassName = typeof PSEUDO_CLASS_NAME_MAP[keyof typeof PSEUDO_CLASS_NAME_MAP];

// 伪元素名称
export type CssPseudoElementName = typeof PSEUDO_ELEMENT_NAME_MAP[keyof typeof PSEUDO_ELEMENT_NAME_MAP];

// 伪类/伪元素值（属性样式配置）
export type CssPseudoValue = {
  [P in keyof typeof PROPERTY_KEYWORDS_MAP]?: typeof PROPERTY_KEYWORDS_MAP[P][number] | string;
};

// 伪类配置
export type CssPseudoClassConfig = {
  [P in keyof typeof PSEUDO_CLASS_NAME_MAP]?: CssPseudoValue;
};

// 伪元素配置
export type CssPseudoElementConfig = {
  [P in keyof typeof PSEUDO_ELEMENT_NAME_MAP]?: CssPseudoValue;
};
