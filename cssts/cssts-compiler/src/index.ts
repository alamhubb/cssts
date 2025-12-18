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

// Generator (从 cssts-types 移入)
export {
  // 配置类型
  CsstsConfig as LegacyCsstsConfig,
  type PropertyConfig,
  type UnitValueConfig as UnitConfig,
  type UnitType,
  defaultConfig,
  defaultProperties,
  systemDefaults,
  // 原子类生成
  type AtomDefinition,
  generateAtoms,
  generatePropertiesJson,
  // 类型定义生成
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
  // 生成器
  type GeneratorOptions,
  generateDtsAsync,
} from './generator/index.js'

// CSS Types - 新的配置系统
export {
  // 主配置类
  CsstsConfig,
  type CsstsConfigOptions,
  // 配置工具函数
  shouldInclude,
  getEffectiveList,
  normalizeUnitsConfig,
  normalizeUnitCategoriesConfig,
  // 单位配置类型
  type UnitValueConfig,
  type UnitCategoryConfig,
  type UnitsConfigValue,
  type ProgressiveRange,
  type StepConfig,
  // 默认配置
  DEFAULT_UNIT_CATEGORY_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  // 伪类/伪元素样式配置
  PseudoClassStylesConfig,
  PseudoElementStylesConfig,
  type PseudoStyleValue,
  type CustomPropertyValue,
} from './css-types/cssts-config.js'
