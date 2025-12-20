/**
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
