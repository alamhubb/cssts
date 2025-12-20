/**
 * CSSTS 配置类型定义（自动生成）
 * 
 * 从 cssPropertyConfig.d.ts 重新导出类型，并提供兼容别名
 */

// ==================== 从 cssPropertyConfig.d.ts 重新导出 ====================

export type {
  // 基础配置
  CssProgressiveRange,
  CssStepConfig,
  CssCustomPropertyValue,
  
  // NumberUnit
  CssNumberUnitName,
  CssNumberUnitConfig,
  CssNumberUnitItem,
  
  // NumberCategory
  CssNumberCategoryName,
  CssNumberCategoryValue,
  CssNumberCategoryConfig,
  CssNumberCategoryItem,
  
  // NumberType
  CssNumberTypeName,
  CssNumberTypeValue,
  CssNumberTypeConfig,
  CssNumberTypeItem,
  
  // Keyword & Color
  CssKeywordName,
  CssColorName,
  CssAllKeywordName,
  
  // Property
  CssPropertyName,
  CssPropertyValue,
  CssPropertyConfig,
  CssPropertyItem,
  
  // Pseudo
  CssPseudoClassName,
  CssPseudoElementName,
  CssPseudoValue,
  CssPseudoClassConfig,
  CssPseudoElementConfig,
} from './cssPropertyConfig';

// ==================== 兼容别名（旧代码使用） ====================

import type {
  CssProgressiveRange,
  CssStepConfig,
  CssCustomPropertyValue,
  CssNumberUnitName,
  CssNumberUnitConfig,
  CssNumberUnitItem,
  CssNumberCategoryName,
  CssNumberCategoryValue,
  CssNumberCategoryConfig,
  CssNumberCategoryItem,
  CssNumberTypeName,
  CssNumberTypeValue,
  CssNumberTypeConfig,
  CssNumberTypeItem,
  CssKeywordName,
  CssColorName,
  CssPropertyName,
  CssPropertyValue,
  CssPropertyConfig,
  CssPropertyItem,
  CssPseudoClassName,
  CssPseudoElementName,
  CssPseudoClassConfig,
  CssPseudoElementConfig,
} from './cssPropertyConfig';

// 旧命名兼容
export type ProgressiveRange = CssProgressiveRange;
export type CsstsStepConfig = CssStepConfig;
export type CustomPropertyValue = CssCustomPropertyValue;

// Unit 相关兼容
export type CssUnitConfigMap = CssNumberUnitConfig;
export type CssUnitConfigItem = CssNumberUnitItem;
export type CssUnitConfig = CssNumberUnitItem[];
export type CssUnitExcludeItem = CssNumberUnitName;
export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, boolean>>;

// Category 相关兼容
export type CssCategoryValueConfig<C extends CssNumberCategoryName = CssNumberCategoryName> = CssNumberCategoryValue<C>;
export type CssCategoryConfigMap = CssNumberCategoryConfig;
export type CssCategoryConfigItem = CssNumberCategoryItem;
export type CssCategoryConfig = CssNumberCategoryItem[];
export type CssCategoryExcludeValueConfig = CssNumberCategoryName[];
export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, boolean>>;
export type CssCategoryExcludeItem = CssNumberCategoryName;
export type CssCategoryExcludeConfig = CssNumberCategoryName[];

// NumberType 相关兼容
export type CssNumberTypeValueConfig<NT extends CssNumberTypeName = CssNumberTypeName> = CssNumberTypeValue<NT>;
export type CssNumberTypeConfigMap = CssNumberTypeConfig;
export type CssNumberTypeConfigItem = CssNumberTypeItem;
export type CssNumberTypeExcludeValueConfig = CssNumberTypeName[];
export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, boolean>>;
export type CssNumberTypeExcludeItem = CssNumberTypeName;
export type CssNumberTypeExcludeConfig = CssNumberTypeName[];

// Property 相关兼容
export type CssPropertyBaseConfig = CssStepConfig;
export type CssPropertyValueConfig<P extends CssPropertyName = CssPropertyName> = CssPropertyValue<P>;
export type CssPropertyConfigMap = CssPropertyConfig;
export type CssPropertyConfigItem = CssPropertyItem;
export type CssPropertyExcludeValueConfig = CssPropertyName[];
export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, boolean>>;
export type CssPropertyExcludeItem = CssPropertyName;
export type CssPropertyExcludeConfig = CssPropertyName[];

// ==================== 主配置接口 ====================

export interface CsstsConfig {
  // 属性配置
  properties?: CssPropertyItem[];
  excludeProperties?: CssPropertyName[];

  // 数值类型配置
  numberTypes?: CssNumberTypeItem[];
  excludeNumberTypes?: CssNumberTypeName[];

  // 数值类别配置
  numberCategories?: CssNumberCategoryItem[];
  unitCategories?: CssNumberCategoryItem[];  // 兼容别名
  excludeUnitCategories?: CssNumberCategoryName[];

  // 数值单位配置
  numberUnits?: CssNumberUnitItem[];
  units?: CssNumberUnitItem[];  // 兼容别名
  excludeUnits?: CssNumberUnitName[];

  // 关键字配置
  keywords?: CssKeywordName[];
  excludeKeywords?: CssKeywordName[];

  // 颜色配置
  colors?: CssColorName[];
  excludeColors?: CssColorName[];

  // 自定义属性
  customProperties?: Record<string, CssCustomPropertyValue>;

  // 渐进步长范围
  progressiveRanges?: CssProgressiveRange[];

  // 伪类配置
  pseudoClasses?: CssPseudoClassName[];
  excludePseudoClasses?: CssPseudoClassName[];

  // 伪元素配置
  pseudoElements?: CssPseudoElementName[];
  excludePseudoElements?: CssPseudoElementName[];

  // 伪类/伪元素样式配置
  pseudoClassesConfig?: CssPseudoClassConfig;
  pseudoElementsConfig?: CssPseudoElementConfig;
}

export type CsstsConfigRequired = Required<CsstsConfig>;
