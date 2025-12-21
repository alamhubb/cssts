/**
 * CSSTS 配置类型定义（自动生成）
 */

import type {
  CssProgressiveRange,
  CssCustomPropertyValue,
  CssNumberUnitName,
  CssNumberUnitItem,
  CssNumberCategoryItem,
  CssNumberCategoryExcludeItem,
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
