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

/** CSS 属性值映射类型 */
export type CssPropertyValueMap = Record<string, string | undefined>

/** 伪类工具配置类型 */
export type PseudoUtilsConfig = Record<string, CssPropertyValueMap>

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

// ==================== 配置 ====================
export { csstsDefaultConfig, csstsDefaultConfig as defaultConfig } from './config/CsstsDefaultConfig.ts'

// ==================== 配置工具函数 ====================
export {
  shouldInclude,
  getEffectiveList,
  normalizeUnitsConfig,
  normalizeUnitCategoriesConfig,
} from './utils/config-utils.js'

// ==================== DTS 生成器 ====================
export {
  generateAtoms,
  generateDts,
  generateStats,
  generateAtomsByProperty,
  generatePropertyDts,
  generateIndexDts,
  type AtomDefinition,
  type AtomsByProperty,
  type GeneratorOptions,
} from './dts/atom-generator.ts'

export {
  generateDtsFiles,
  type DtsGenerateOptions,
  type DtsGenerateResult,
} from './dts/dts-writer.ts'

// ==================== 类型导出 ====================
export type {
  CsstsConfig,
  CsstsConfigRequired,
} from './config/types/csstsConfig'

export type {
  CssProgressiveRange,
  CssStepConfig,
  CssCustomPropertyValue,
  CssNumberUnitName,
  CssNumberUnitConfig,
  CssNumberCategoryName,
  CssNumberCategoryConfig,
  CssKeywordName,
  CssColorTypeName,
  CssColorTypeConfig,
  CssColorName,
  CssPropertyName,
  CssPropertyConfig,
  CssPseudoClassName,
  CssPseudoElementName,
  CssPseudoClassConfig,
  CssPseudoElementConfig,
} from './config/types/cssPropertyConfig'

// ==================== 数据导出 ====================
export { CSS_PROPERTY_NAME_MAP } from './data/cssPropertyNameMapping'
export { KEYWORD_NAME_MAP, CSS_GLOBAL_KEYWORDS } from './data/cssKeywordsData'
export { COLOR_NAME_MAP, COLOR_TYPE_COLORS_MAP, ALL_COLOR_TYPES } from './data/cssColorData'
export { PSEUDO_CLASS_NAME_MAP, PSEUDO_ELEMENT_NAME_MAP } from './data/cssPseudoData'
export { ALL_UNITS, ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP } from './data/cssNumberData'
export { PROPERTY_CATEGORIES_MAP } from './data/cssPropertyNumber'
export { PROPERTY_KEYWORDS_MAP } from './data/cssPropertyKeywords'
export { PROPERTY_COLOR_TYPES_MAP } from './data/cssPropertyColorTypes'
export { PROPERTY_PARENT_MAP } from './data/cssPropertyInheritance'

// ==================== 工具函数 ====================
export {
  getUnitCategory,
  getUnitsInCategory,
  isUnitInCategory,
  getUnitsFromCategories,
  getPropertyCategories,
  getPropertyUnits,
} from './utils/unitCategory.js'
