/**
 * CSS 属性配置类型定义（自动生成）
 * 包含基础配置、属性名称、Unit/Category/NumberType、Property 配置类型
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type { ALL_UNITS, ALL_NUMBER_CATEGORIES } from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES } from '../data/cssPropertyNumber';
import type { keywords, allKeywords } from '../data/cssKeywordsData';
import type { ALL_COLORS } from '../data/cssColorData';

import type { CSSPropertiesType } from './cssProperties';

// ==================== 基础配置类型 ====================

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

export type CssProperty = CssPropertyName | CSSPropertiesType;

export type CssProperties = CssProperty | CssProperty[];

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
