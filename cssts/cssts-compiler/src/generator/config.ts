/**
 * CssTs 配置类型定义
 *
 * 此文件为兼容层，从 css-types/ 重新导出
 * 新代码请直接使用 css-types/
 */

// 从 css-types 重新导出
export {
  CsstsConfig,
  UnitValueConfig as UnitConfig,
  DEFAULT_UNIT_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  type CustomPropertyValue,
  type PseudoStyleItem,
  type PseudoStyleValue,
  type ProgressiveRange,
} from '../css-types/cssts-config.js';

export {
  CssPropertyConfigMap,
  cssPropertyNameMap,
  type CssPropertyCamelName,
  type CssPropertyKebabName,
} from '../css-types/property-config.js';

export {
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  type PseudoClassName,
  type PseudoElementName,
} from '../css-types/pseudo.js';

export type { UnitType } from '../css-types/units.js';

// ==================== 兼容旧 API ====================

/**
 * @deprecated 使用 CssPropertyConfigMap
 */
export interface PropertyConfig {
  zero?: boolean;
  px?: UnitConfig;
  rem?: UnitConfig;
  ratio?: UnitConfig;
  unitless?: UnitConfig;
  deg?: UnitConfig;
  ms?: UnitConfig;
  fr?: UnitConfig;
}

import type { UnitValueConfig as UnitConfig } from '../css-types/cssts-config.js';

/**
 * 单位到 CSS 后缀的映射
 */
export const unitToSuffix: Record<string, string | string[]> = {
  px: 'px',
  rem: 'rem',
  ratio: ['%', 'vw', 'vh'],
  deg: 'deg',
  ms: 'ms',
  fr: 'fr',
  unitless: '',
};

/**
 * 系统内置默认值
 * @deprecated 使用 DEFAULT_UNIT_CONFIGS
 */
export const systemDefaults: PropertyConfig = {
  px: { min: 1, max: 10000 },
  rem: { min: 1, max: 100, step: 1 },
  ratio: { min: 1, max: 100 },
  unitless: { min: 0, max: 100 },
  deg: { min: 0, max: 360 },
  ms: { min: 0, max: 10000, step: 100 },
  fr: { min: 1, max: 12 },
};

/**
 * 默认属性配置
 * @deprecated 使用 CssPropertyConfigMap
 */
export const defaultProperties: Record<string, PropertyConfig> = {
  width: { zero: true, px: { max: 10000 }, rem: {}, ratio: {} },
  height: { zero: true, px: { max: 10000 }, rem: {}, ratio: {} },
};

/**
 * 默认伪类工具配置
 * @deprecated 使用 CsstsConfig.pseudoStyles
 */
export const defaultPseudoUtils = {
  hover: { opacity: '0.9' },
  active: { opacity: '0.6' },
  focus: { opacity: '0.9' },
  disabled: [{ opacity: '0.5' }, { cursor: 'not-allowed' }],
};

/**
 * 默认配置
 * @deprecated 使用 new CsstsConfig()
 */
export const defaultConfig = {
  defaults: systemDefaults,
  properties: defaultProperties,
  pseudoUtils: defaultPseudoUtils,
};
