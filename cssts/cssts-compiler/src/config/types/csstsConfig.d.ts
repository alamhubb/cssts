/**
 * CSSTS 配置类型定义（自动生成）
 */

import type {
  CssProgressiveRange,
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
  GroupConfig
} from './cssPropertyConfig';

export interface CsstsConfig {
  /** 
   * 支持的 CSS 属性列表（属性名数组）
   * 用于指定生成哪些属性的原子类
   * @example ['width', 'height', 'margin', 'padding']
   */
  properties?: CssPropertyName[];

  /** 
   * 排除的 CSS 属性列表（属性名数组）
   * 从 properties 中排除指定的属性
   * @example ['display', 'position']
   */
  excludeProperties?: CssPropertyName[];

  /**
   * 特定属性的详细配置
   * 用于覆盖特定属性的数值范围、步长、预设值等
   * @example [{ zIndex: { unitless: { max: 9999, presets: [-1, 999] } } }]
   */
  propertiesConfig?: CssPropertyConfig[];

  /**
   * 支持的数值类别列表（类别名数组）
   * @example ['pixel', 'fontRelative', 'percentage']
   */
  numberCategories?: CssNumberCategoryName[];

  /**
   * 排除的数值类别列表（类别名数组）
   * @example ['physical', 'frequency', 'resolution']
   */
  excludeNumberCategories?: CssNumberCategoryName[];

  /**
   * 数值类别的详细配置
   * 用于配置特定类别的数值范围、步长、预设值等
   * @example [{ pixel: { min: 0, max: 1000, step: 1 } }]
   */
  numberCategoriesConfig?: CssNumberCategoryConfig[];

  /**
   * 支持的数值单位列表（单位名数组）
   * @example ['px', 'em', 'rem', 'vw', 'vh']
   */
  numberUnits?: CssNumberUnitName[];

  /**
   * 排除的数值单位列表（单位名数组）
   * @example ['cm', 'mm', 'in', 'pt', 'pc']
   */
  excludeUnits?: CssNumberUnitName[];

  /**
   * 数值单位的详细配置
   * 用于配置特定单位的数值范围、步长、预设值等
   * @example [{ px: { min: 0, max: 1000, step: 1 } }]
   */
  numberUnitsConfig?: CssNumberUnitConfig[];

  /** 关键字 */
  keywords?: CssKeywordName[];

  /** 排除的关键字 */
  excludeKeywords?: CssKeywordName[];

  /**
   * 支持的颜色类型列表（类型名数组）
   * @example ['namedColor', 'systemColor']
   */
  colorTypes?: CssColorTypeName[];

  /**
   * 排除的颜色类型列表（类型名数组）
   * @example ['deprecatedSystemColor', 'nonStandardColor']
   */
  excludeColorTypes?: CssColorTypeName[];

  /**
   * 颜色类型的详细配置
   * 用于配置特定颜色类型包含哪些颜色
   * @example [{ namedColor: ['red', 'blue', 'green'] }]
   */
  colorTypesConfig?: CssColorTypeConfig[];

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

  /**
   * 组合原子类配置
   * 类名生成规则：prefix + name + [自动生成] + suffix
   * 支持三种类型：
   * 1. numberProperties: 数值组合
   * 2. keywordProperties: 固定关键字组合
   * 3. keywordIterations: 遍历关键字生成多个原子类
   * @example
   * groups: [
   *   { name: 'marginX', numberProperties: ['marginLeft', 'marginRight'] },
   *   { name: 'flexRowCenter', keywordProperties: { display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
   *   { prefix: 'flex', keywordIterations: { flexDirection: ['row', 'column'] } }
   * ]
   */
  groups?: GroupConfig[];

  // ==================== 构建配置 ====================

  /**
   * CSS 类名前缀
   * @example 'my-' => .my-display-flex
   */
  classPrefix?: string;

  /**
   * 是否生成类型声明文件
   * @default true
   */
  dts?: boolean;

  /**
   * 类型声明文件输出目录
   * @default 'node_modules/@types/cssts'
   */
  dtsOutputDir?: string;
}

export type CsstsConfigRequired = Required<CsstsConfig>;
