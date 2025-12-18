// Parser
export { CssTsParser, CssTsTokenConsumer, cssTsTokens, CssTsContextualKeywordTypes } from './parser/index.js'

// AST Transformer
export { cssTsCstToAst, CssTsCstToAst } from './factory/index.js'

// Transform（核心转换功能）
export {
  type ParsedStyleInfo,
  type TransformContext,
  type TransformResult,
  type TransformResultWithMapping,
  parseStyleName,
  hasPseudos,
  transformCssTs,
  transformCssTsWithMapping,
  generateStylesCss,
  generateCsstsAtomModule,
} from './transform/index.js'

// CSS class name utilities
export {
  CSSTS_CONFIG,
  camelToKebab,
  parseTsAtomName,
  getCssProperty,
  getCssValue,
  getCssClassName,
  generateAtomCssRule,
} from './utils/cssClassName.js'

// ==================== 主配置系统 ====================
export {
  // 主配置类
  CsstsConfig,

  // 默认配置
  DEFAULT_UNIT_CATEGORY_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  // 伪类/伪元素样式配置
  PseudoClassStylesConfig,
  PseudoElementStylesConfig,
  type PseudoStyleValue,
  type CustomPropertyValue,
  // 系统级别默认配置
  SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES,
} from './cssts-config.js'

// ==================== 配置工具函数 ====================
export {
  // 配置工具函数
  shouldInclude,
  getEffectiveList,
  normalizeUnitsConfig,
  normalizeUnitCategoriesConfig,
} from './utils/config-utils.js'

// ==================== 配置工厂函数 ====================
export {
  createCsstsConfig,
} from './factory/config-factory.js'

// ==================== 生成器 ====================
export {
  generateDtsAsync,
  generateAtoms,
  generatePropertiesJson,
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
  type AtomDefinition,
  type GeneratorOptions,
} from './generator-dts/index.js'

// ==================== 配置数据 ====================
export {
  CssPropertyConfigMap,
  cssPropertyNameMap,
  type CssPropertyCamelName,
  type CssPropertyKebabName,
} from './config/property-config.js'

export {
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  type PseudoClassName,
  type PseudoElementName,
} from './config/pseudo.js'

export type {
  UnitType,
  NumberTypeName,
  UnitCategoryName,
  ProgressiveRange,
  StepConfig,
  UnitValueConfig,
  UnitCategoryConfig,
  UnitsConfigValue,
  NumberTypeConfigItem,
  UnitCategoryConfigItem,
  UnitConfigItem,
  NumberTypeExcludeItem,
  UnitCategoryExcludeItem,
  UnitExcludeItem,
} from './config/units.js'
export type { KeywordValue } from './config/keywords.js'
export type { AllColorValue, SystemColorValue } from './config/colors.js'

// ==================== 工具函数 ====================
export {
  getUnitCategory,
  getUnitsInCategory,
  isUnitInCategory,
  getUnitCategoriesFromNumberTypes,
  getUnitsFromCategories,
  getUnitsFromNumberTypes,
  getCategoriesForNumberType,
  getUnitsForNumberType,
} from './css-utils.js'
