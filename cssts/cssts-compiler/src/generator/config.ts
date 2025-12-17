/**
 * CssTs 配置类型定义
 *
 * 结构：属性 → 单位 → 配置
 */

// ==================== 单位配置 ====================

/**
 * 单位配置
 */
export interface UnitConfig {
    min?: number          // 最小值
    max?: number          // 最大值
    step?: number         // 步长（不设置则用渐进步长）
    presets?: number[]    // 额外预设值
    negative?: boolean    // 是否支持负数
}

/**
 * 属性配置：每个属性支持的单位及其配置
 */
export interface PropertyConfig {
    zero?: boolean           // 是否生成 0 值
    px?: UnitConfig          // 像素
    rem?: UnitConfig         // rem
    ratio?: UnitConfig       // 百分比
    unitless?: UnitConfig    // 无单位数值
    deg?: UnitConfig         // 角度
    ms?: UnitConfig          // 时间
    fr?: UnitConfig          // grid fr
}

/**
 * 伪类工具配置项
 * 每个对象只能有一个属性（原子类设计原则）
 * @deprecated 使用 PseudoStyleItem from './pseudo-config.js'
 */
export type PseudoUtilItem = { [property: string]: string }

/**
 * 伪类工具配置
 * key: 伪类名（hover、active、focus、disabled）
 * value: 单个对象或数组（支持两种格式）
 *
 * @deprecated 使用 PseudoUtilsConfig class from './pseudo-config.js'
 *
 * @example
 * // 单个属性 - 用对象
 * hover: { opacity: '0.9' }
 *
 * // 多个属性 - 用数组
 * disabled: [{ opacity: '0.5' }, { cursor: 'not-allowed' }]
 */
export type PseudoUtilsConfig = Record<string, PseudoUtilItem | PseudoUtilItem[]>

/**
 * 完整配置
 */
export interface CsstsConfig {
    /** 全局默认配置（字段级 fallback） */
    defaults?: {
        px?: UnitConfig
        rem?: UnitConfig
        ratio?: UnitConfig
        unitless?: UnitConfig
        deg?: UnitConfig
        ms?: UnitConfig
        fr?: UnitConfig
    }
    /** 属性配置（生成 Atom） */
    properties: Record<string, PropertyConfig>
    /** 伪类工具配置（生成 SingleUtil） */
    pseudoUtils?: PseudoUtilsConfig
}

// ==================== 单位类型 ====================

export type UnitType = 'zero' | 'px' | 'rem' | 'ratio' | 'deg' | 'ms' | 'fr' | 'unitless'

/**
 * 单位到 CSS 后缀的映射
 */
export const unitToSuffix: Record<Exclude<UnitType, 'zero'>, string | string[]> = {
    px: 'px',
    rem: 'rem',
    ratio: ['%', 'vw', 'vh'],
    deg: 'deg',
    ms: 'ms',
    fr: 'fr',
    unitless: '',
}

// ==================== 系统内置默认值 ====================

/**
 * 系统内置默认值（当 defaults 和属性配置都没有时使用）
 */
export const systemDefaults: PropertyConfig = {
    px: {min: 1, max: 10000},
    rem: {min: 1, max: 100, step: 1},
    ratio: {min: 1, max: 100},
    unitless: {min: 0, max: 100},
    deg: {min: 0, max: 360},
    ms: {min: 0, max: 10000, step: 100},
    fr: {min: 1, max: 12},
}

// ==================== 默认属性配置 ====================

/**
 * 默认属性配置
 */
export const defaultProperties: Record<string, PropertyConfig> = {
    // ==================== Sizing ====================
    width: {zero: true, px: {max: 10000}, rem: {}, ratio: {}},
    height: {zero: true, px: {max: 10000}, rem: {}, ratio: {}}
}

/**
 * 默认伪类工具配置
 * 支持对象（单个）或数组（多个）格式
 */
export const defaultPseudoUtils: PseudoUtilsConfig = {
    // 单个属性 - 用对象
    hover: {opacity: '0.9'},
    active: {opacity: '0.6'},
    focus: {opacity: '0.9'},
    // 多个属性 - 用数组
    disabled: [
        {opacity: '0.5'},
        {cursor: 'not-allowed'}
    ]
}

/**
 * 默认配置
 */
export const defaultConfig: CsstsConfig = {
    defaults: systemDefaults,
    properties: defaultProperties,
    pseudoUtils: defaultPseudoUtils,
}
