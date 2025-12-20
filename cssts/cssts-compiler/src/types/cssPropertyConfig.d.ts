/**
 * CSS 属性配置类型定义（自动生成）
 * 包含基础配置、属性名称、Unit/Category/NumberType、Property 配置类型
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type {
  ALL_UNITS,
  ALL_NUMBER_CATEGORIES,
  CATEGORY_UNITS_MAP,
  CssPercentageUnitName,
  CssPixelUnitName,
  CssFontRelativeUnitName,
  CssPhysicalUnitName,
  CssAngleUnitName,
  CssTimeUnitName,
  CssFrequencyUnitName,
  CssResolutionUnitName,
  CssFlexUnitName,
  CssUnitlessUnitName,
} from '../data/cssNumberData';
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

// Category 到 Unit 类型映射
export interface CssCategoryUnitMap {
  percentage: CssPercentageUnitName;
  pixel: CssPixelUnitName;
  fontRelative: CssFontRelativeUnitName;
  physical: CssPhysicalUnitName;
  angle: CssAngleUnitName;
  time: CssTimeUnitName;
  frequency: CssFrequencyUnitName;
  resolution: CssResolutionUnitName;
  flex: CssFlexUnitName;
  unitless: CssUnitlessUnitName;
}

// 每个 Category 的精准 Unit 配置 Map（只包含有效 key）
export type CssPercentageUnitConfigMap = { [K in CssPercentageUnitName]?: CsstsStepConfig };
export type CssPixelUnitConfigMap = { [K in CssPixelUnitName]?: CsstsStepConfig };
export type CssFontRelativeUnitConfigMap = { [K in CssFontRelativeUnitName]?: CsstsStepConfig };
export type CssPhysicalUnitConfigMap = { [K in CssPhysicalUnitName]?: CsstsStepConfig };
export type CssAngleUnitConfigMap = { [K in CssAngleUnitName]?: CsstsStepConfig };
export type CssTimeUnitConfigMap = { [K in CssTimeUnitName]?: CsstsStepConfig };
export type CssFrequencyUnitConfigMap = { [K in CssFrequencyUnitName]?: CsstsStepConfig };
export type CssResolutionUnitConfigMap = { [K in CssResolutionUnitName]?: CsstsStepConfig };
export type CssFlexUnitConfigMap = { [K in CssFlexUnitName]?: CsstsStepConfig };
export type CssUnitlessUnitConfigMap = { [K in CssUnitlessUnitName]?: CsstsStepConfig };

// 每个 Category 的精准配置类型
export type CssPercentageValueConfig = CsstsStepConfig | CssPercentageUnitName[] | CssPercentageUnitConfigMap;
export type CssPixelValueConfig = CsstsStepConfig | CssPixelUnitName[] | CssPixelUnitConfigMap;
export type CssFontRelativeValueConfig = CsstsStepConfig | CssFontRelativeUnitName[] | CssFontRelativeUnitConfigMap;
export type CssPhysicalValueConfig = CsstsStepConfig | CssPhysicalUnitName[] | CssPhysicalUnitConfigMap;
export type CssAngleValueConfig = CsstsStepConfig | CssAngleUnitName[] | CssAngleUnitConfigMap;
export type CssTimeValueConfig = CsstsStepConfig | CssTimeUnitName[] | CssTimeUnitConfigMap;
export type CssFrequencyValueConfig = CsstsStepConfig | CssFrequencyUnitName[] | CssFrequencyUnitConfigMap;
export type CssResolutionValueConfig = CsstsStepConfig | CssResolutionUnitName[] | CssResolutionUnitConfigMap;
export type CssFlexValueConfig = CsstsStepConfig | CssFlexUnitName[] | CssFlexUnitConfigMap;
export type CssUnitlessValueConfig = CsstsStepConfig | CssUnitlessUnitName[] | CssUnitlessUnitConfigMap;

// 精准的 Category 配置 Map（每个 category 只接受对应的 unit）
export interface CssCategoryConfigMapPrecise {
  percentage?: CssPercentageValueConfig;
  pixel?: CssPixelValueConfig;
  fontRelative?: CssFontRelativeValueConfig;
  physical?: CssPhysicalValueConfig;
  angle?: CssAngleValueConfig;
  time?: CssTimeValueConfig;
  frequency?: CssFrequencyValueConfig;
  resolution?: CssResolutionValueConfig;
  flex?: CssFlexValueConfig;
  unitless?: CssUnitlessValueConfig;
}

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
  | CssCategoryConfigMapPrecise
  | CssUnitConfigMap;

export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMapPrecise;

// 精准的 Category 排除值配置
export type CssCategoryExcludeValueConfigPrecise<C extends CssNumberCategoryName> =
  | CssCategoryUnitMap[C][]
  | Partial<Record<CssCategoryUnitMap[C], Record<string, never>>>;

// 精准的 Category 排除 Map
export type CssCategoryExcludeMapPrecise = {
  [C in CssNumberCategoryName]?: CssCategoryExcludeValueConfigPrecise<C>;
};

// 兼容旧版的宽松类型
export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;

export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMapPrecise
  | CssUnitExcludeMap;

export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMapPrecise;

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
