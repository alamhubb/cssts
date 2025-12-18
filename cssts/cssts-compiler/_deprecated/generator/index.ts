/**
 * CssTs Generator
 *
 * 此文件为兼容层，从 css-types/scripts/generator-dts/ 重新导出
 * 新代码请直接使用 css-types/scripts/generator-dts/
 */

// ==================== 从 css-types 导出 ====================

// 配置类型
export {
  CsstsConfig,
  DEFAULT_UNIT_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  type UnitValueConfig,
  type CustomPropertyValue,
  type PseudoStyleValue,
  type ProgressiveRange,
} from '../css-types/cssts-config.js';

export {
  CssPropertyConfigMap,
  cssPropertyNameMap,
  type CssPropertyCamelName,
  type CssPropertyKebabName,
} from '../css-types/config/property-config.js';

export {
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  type PseudoClassName,
  type PseudoElementName,
} from '../css-types/config/pseudo.js';

export type { UnitType, NumberTypeName } from '../css-types/config/units.js';
export type { KeywordValue } from '../css-types/config/keywords.js';
export type { AllColorValue, SystemColorValue } from '../css-types/config/colors.js';

// 配置工具
export {
  generateValuesForUnit,
  getActiveProperties,
  getActiveKeywords,
  getActiveNumberTypes,
  calculateAtomStats,
} from '../css-types/config-utils.js';

// ==================== 兼容旧 API ====================

export {
  unitToSuffix,
  systemDefaults,
  defaultProperties,
  defaultPseudoUtils,
  defaultConfig,
  type PropertyConfig,
} from './config.js';

export { generateValues, resolveUnitConfig } from './value-generator.js';

// ==================== 从 generator-dts 导出 ====================

export {
  generateDtsAsync,
  generateAtoms,
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
  type AtomDefinition,
  type GeneratorOptions,
} from '../css-types/scripts/generator-dts/index.js';

export { generatePropertiesJson } from '../css-types/scripts/generator-dts/atom-generator.js';
