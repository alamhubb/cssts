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
  // 主配置类和默认实例
  CsstsConfig,
  csstsDefaultConfig,
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

export {
  CORE_PROPERTIES,
  LAYOUT_PROPERTIES,
  FLEXBOX_PROPERTIES,
  GRID_PROPERTIES,
  SIZING_PROPERTIES,
  SPACING_PROPERTIES,
  BACKGROUND_PROPERTIES,
  TEXT_PROPERTIES,
  BORDER_PROPERTIES,
  SHADOW_PROPERTIES,
  TRANSFORM_PROPERTIES,
  TRANSITION_PROPERTIES,
  OTHER_PROPERTIES,
  CORE_PROPERTIES_STATS,
  EXPECTED_ATOMS_COUNT,
} from './custom/core-properties.ts'

export type {
  UnitType,
  NumberTypeName,
  UnitCategoryName,
} from './config/units.js'

export type {
  // 从 csstsConfig.d.ts 导出配置类型
  ProgressiveRange,
  CsstsStepConfig,
  CssUnitConfigMap,
  CssUnitConfigItem,
  CssUnitConfig,
  CssCategoryValueConfig,
  CssCategoryConfigMap,
  CssCategoryConfigItem,
  CssCategoryConfig,
  CssNumberTypeValueConfig,
  CssNumberTypeConfigMap,
  CssNumberTypeConfigItem,
  CssNumberTypeConfig,
  CssUnitExcludeItem,
  CssUnitExcludeMap,
  CssCategoryExcludeValueConfig,
  CssCategoryExcludeMap,
  CssCategoryExcludeItem,
  CssCategoryExcludeConfig,
  CssNumberTypeExcludeValueConfig,
  CssNumberTypeExcludeMap,
  CssNumberTypeExcludeItem,
  CssNumberTypeExcludeConfig,
  CssPropertyExcludeValueConfig,
  CssPropertyExcludeMap,
  CssPropertyExcludeItem,
  CssPropertyExcludeConfig,
  CustomPropertyValue,
  CssPropertyBaseConfig,
  CssPropertyValueConfig,
  CssPropertyConfigMap,
  CssPropertyConfigItem,
  CssPropertyConfig,
  CsstsConfig as CsstsConfigType,
  CsstsConfigRequired,
} from './types/csstsConfig.js'
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
