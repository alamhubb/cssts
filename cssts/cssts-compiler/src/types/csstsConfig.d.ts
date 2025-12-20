/**
 * CSSTS 配置类型定义（自动生成）
 *
 * 包含 CsstsConfig 接口及相关类型
 */

import type { CssPropertyName } from './cssPropertyConfig';
import type { CssNumberTypeName, CssNumberCategoryName, CssNumberUnitName } from './numberTypes';
import type { CssKeywordName, CssColorName } from './cssKeywords';
import type { CssPseudoClassName, CssPseudoElementName } from './cssPseudoClassElement';
import type { CssPseudoClassConfig, CssPseudoElementConfig } from './pseudoStyles';

// ==================== 值配置类型 ====================

/** 渐进步长范围配置 */
export interface ProgressiveRange {
  max: number;
  divisors: number[];
}

/** 步长配置 */
export interface StepConfig {
  step?: number;
  min?: number;
  max?: number;
  negative?: boolean;
}

/** 预设值配置 */
export interface PresetConfig {
  presets?: number[];
  negative?: boolean;
}

/** 单位值配置 */
export type UnitValueConfig = StepConfig | PresetConfig;

/** 单位分类配置 */
export type UnitCategoryConfig = UnitValueConfig;

// ==================== 层级配置类型 ====================

/**
 * 数值类型配置项
 * 可以是字符串（简单启用）或对象
 */
export type NumberTypeConfigItem =
  | CssNumberTypeName
  | Record<CssNumberTypeName, Record<string, Record<string, UnitValueConfig> | UnitValueConfig>>;

/**
 * 单位分类配置项
 * 可以是字符串（简单启用）或对象
 */
export type UnitCategoryConfigItem =
  | CssNumberCategoryName
  | Record<CssNumberCategoryName, Record<string, UnitValueConfig> | UnitValueConfig>;

/**
 * 单位配置项
 * 可以是字符串（简单启用）或对象（带配置）
 */
export type UnitConfigItem =
  | CssNumberUnitName
  | Record<CssNumberUnitName, UnitValueConfig>;

// ==================== 排除配置类型 ====================

/**
 * 数值类型排除项
 */
export type NumberTypeExcludeItem =
  | CssNumberTypeName
  | Record<CssNumberTypeName, string[] | Record<string, string[]>>;

/**
 * 单位分类排除项
 */
export type UnitCategoryExcludeItem =
  | CssNumberCategoryName
  | Record<CssNumberCategoryName, string[]>;

/**
 * 单位排除项
 */
export type UnitExcludeItem =
  | CssNumberUnitName
  | Record<CssNumberUnitName, {}>;

// ==================== 属性配置类型 ====================

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

/** 属性配置映射 */
export type CssPropertyConfigMap = Record<CssPropertyName, {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}>;

// ==================== CSSTS 配置接口 ====================

/**
 * CSSTS 配置接口
 *
 * 定义所有配置项的结构
 */
export interface CsstsConfig {
  // ==================== 属性配置 ====================

  /**
   * 支持的属性列表（白名单）
   * 可以是属性名数组或属性配置对象
   */
  properties?: CssPropertyName[] | CssPropertyConfigMap;

  /**
   * 排除的属性列表（黑名单）
   * 仅当 properties 为空时生效
   */
  excludeProperties?: CssPropertyName[];

  // ==================== 数值类型配置 ====================

  /**
   * 支持的数值类型列表（白名单）
   */
  numberTypes?: NumberTypeConfigItem[];

  /**
   * 排除的数值类型列表（黑名单）
   */
  excludeNumberTypes?: NumberTypeExcludeItem[];

  // ==================== 单位分类配置 ====================

  /**
   * 支持的单位分类列表（白名单）
   */
  unitCategories?: UnitCategoryConfigItem[];

  /**
   * 排除的单位分类列表（黑名单）
   */
  excludeUnitCategories?: UnitCategoryExcludeItem[];

  // ==================== 单位配置 ====================

  /**
   * 支持的单位列表（白名单）
   */
  units?: UnitConfigItem[];

  /**
   * 排除的单位列表（黑名单）
   */
  excludeUnits?: UnitExcludeItem[];

  // ==================== 关键字/颜色配置 ====================

  /**
   * 支持的关键字列表（白名单）
   */
  keywords?: CssKeywordName[];

  /**
   * 排除的关键字列表（黑名单）
   */
  excludeKeywords?: CssKeywordName[];

  /**
   * 支持的颜色列表（白名单）
   */
  colors?: CssColorName[];

  /**
   * 排除的颜色列表（黑名单）
   */
  excludeColors?: CssColorName[];

  // ==================== 其他配置 ====================

  /** 自定义属性 */
  customProperties?: Record<string, CustomPropertyValue>;

  /** 渐进步长策略 */
  progressiveRanges?: ProgressiveRange[];

  // ==================== 伪类/伪元素配置 ====================

  /**
   * 支持的伪类列表（白名单）
   */
  pseudoClasses?: CssPseudoClassName[];

  /**
   * 排除的伪类列表（黑名单）
   */
  excludePseudoClasses?: CssPseudoClassName[];

  /**
   * 支持的伪元素列表（白名单）
   */
  pseudoElements?: CssPseudoElementName[];

  /**
   * 排除的伪元素列表（黑名单）
   */
  excludePseudoElements?: CssPseudoElementName[];

  // ==================== 伪类/伪元素样式配置 ====================

  /** 伪类样式配置 */
  pseudoClassesConfig?: CssPseudoClassConfig;

  /** 伪元素样式配置 */
  pseudoElementsConfig?: CssPseudoElementConfig;
}

// ==================== 完整配置类型 ====================

/**
 * 完整的 CSSTS 配置类型
 * 所有字段都有值（由 createConfig 函数返回）
 */
export type CsstsConfigRequired = Required<CsstsConfig>;
