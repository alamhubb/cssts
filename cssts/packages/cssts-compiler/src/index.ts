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
  CSSTS_SEPARATOR,
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
  type CsstsConfig,
  type PropertyConfig,
  type UnitConfig,
  type UnitType,
  defaultConfig,
  defaultProperties,
  systemDefaults,
  createConfig,
  mergeConfig,
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
  generatePropertiesJsonSync,
  generateDtsAsync,
  generate,
} from './generator/index.js'
