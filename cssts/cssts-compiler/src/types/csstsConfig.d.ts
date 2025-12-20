/**
 * CSSTS 配置类型定义（自动生成）
 */

import type { CssPseudoClassName, CssPseudoElementName, CssPseudoClassConfig, CssPseudoElementConfig } from './cssPseudoClassElement';
import type { CssProgressiveRange, CssCustomPropertyValue } from './csstsStepConfig';
import type {
  CssUnitConfig,
  CssUnitExcludeItem,
  CssCategoryConfig,
  CssCategoryExcludeConfig,
  CssNumberTypeConfig,
  CssNumberTypeExcludeConfig
} from './cssNumberConfig';
import type { CssKeywordName, CssColorName, CssPropertyConfig, CssPropertyExcludeConfig } from './cssPropertyValueConfig';

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
