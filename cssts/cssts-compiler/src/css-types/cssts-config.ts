/**
 * CSSTS 配置类
 *
 * 此文件为手动维护，不由脚本自动生成
 * 聚合了自动生成的类型，提供用户配置接口
 */

import type { AllColorValue } from './config/colors';
import type { NumberTypeName, UnitType, UnitCategoryName } from './config/units';
import type { KeywordValue, CssPropertyValueMap } from './config/keywords';
import { CssPropertyConfigMap, type CssPropertyCamelName } from './config/property-config';
import type { PseudoClassName } from './config/pseudo';
import type { PseudoElementName } from './config/pseudo';
import { RARE_PROPERTIES } from './presets/tailwind-like';

// ==================== 数值生成配置 ====================

/** 渐进步长区间 */
export interface ProgressiveRange {
    /** 区间最小值（默认为上一个区间的 max，首个区间默认为 0） */
    min?: number;
    /** 区间最大值 */
    max?: number;
    /** 能被整除的除数 */
    divisors: number | number[];
}

/** 步长配置：固定步长或渐进步长策略 */
export type StepConfig = number | ProgressiveRange | ProgressiveRange[];

/** 单位配置 */
export interface UnitValueConfig {
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
    /** 步长：固定数值或渐进步长策略数组 */
    step?: StepConfig;
    /** 额外预设值 */
    presets?: number[];
    /** 是否支持负数 */
    negative?: boolean;
}

/**
 * 单位配置值类型
 * 支持三种格式：
 * - 字符串: 'px' - 单个单位，使用默认配置
 * - 字符串数组: ['px', 'em'] - 多个单位，使用默认配置
 * - Record: { px: { max: 500 }, em: { max: 10 } } - 带配置的单位
 */
export type UnitsConfigValue<T extends string = string> =
    | T                                    // 单个单位
    | T[]                                  // 单位数组
    | Partial<Record<T, UnitValueConfig>>; // Record 形式

/**
 * 标准化单位配置为 Record 形式
 */
export function normalizeUnitsConfig<T extends string>(
    config: UnitsConfigValue<T> | undefined
): Partial<Record<T, UnitValueConfig>> {
    if (!config) return {};

    // 字符串: 'px'
    if (typeof config === 'string') {
        return {[config]: {}} as Partial<Record<T, UnitValueConfig>>;
    }

    // 字符串数组: ['px', 'em']
    if (Array.isArray(config)) {
        const result: Partial<Record<T, UnitValueConfig>> = {};
        const seenUnits = new Set<string>();

        for (const unit of config) {
            if (seenUnits.has(unit)) {
                console.warn(`⚠️ 重复的单位配置: ${unit}`);
                continue;
            }
            seenUnits.add(unit);
            result[unit as T] = {};
        }
        return result;
    }

    // Record 形式: { px: { max: 500 } }
    return config;
}

/** 默认渐进步长策略 */
export const DEFAULT_PROGRESSIVE_RANGES: ProgressiveRange[] = [
    {max: 100, divisors: [1]},         // 0-100: 每个整数
    {max: 200, divisors: [2, 5]},      // 100-200: 能被 2 或 5 整除
    {max: 500, divisors: [5]},         // 200-500: 能被 5 整除
    {max: 1000, divisors: [10]},       // 500-1000: 能被 10 整除
    {max: 2000, divisors: [20, 50]},   // 1000-2000: 能被 20 或 50 整除
    {max: 5000, divisors: [50]},       // 2000-5000: 能被 50 整除
    {max: 10000, divisors: [100]},     // 5000-10000: 能被 100 整除
    {max: Infinity, divisors: [1000]}, // 10000+: 能被 1000 整除
];

/** 单位分类配置 */
export interface UnitCategoryConfig {
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
    /** 步长：固定数值或渐进步长策略数组 */
    step?: StepConfig;
    /** 是否支持负数 */
    negative?: boolean;
    /** 额外预设值 */
    presets?: number[];
}

/** 单位分类配置项（带分类名称） */
export interface UnitCategoryConfigItem extends UnitCategoryConfig {
    /** 分类名称 */
    category: string;
}

/**
 * 标准化单位分类配置为 Record 形式
 */
export function normalizeUnitCategoriesConfig<T extends string>(
    config: UnitsConfigValue<T> | undefined
): Partial<Record<T, UnitCategoryConfig>> {
    if (!config) return {};

    // 字符串: 'pixel'
    if (typeof config === 'string') {
        return { [config]: {} } as Partial<Record<T, UnitCategoryConfig>>;
    }

    // 字符串数组: ['pixel', 'fontRelative']
    if (Array.isArray(config)) {
        const result: Partial<Record<T, UnitCategoryConfig>> = {};
        const seenCategories = new Set<string>();

        for (const category of config) {
            if (seenCategories.has(category)) {
                console.warn(`⚠️ 重复的单位分类配置: ${category}`);
                continue;
            }
            seenCategories.add(category);
            result[category as T] = {};
        }
        return result;
    }

    // Record 形式: { pixel: { max: 500 } }
    return config;
}

/** 
 * 默认单位分类配置（Tailwind 风格）
 * 
 * 基于分类配置数值，同一分类下的所有单位共享相同的数值范围
 * 使用 presets 模式可以精确控制生成的数值
 */
export const DEFAULT_UNIT_CATEGORY_CONFIGS: Record<UnitCategoryName, UnitCategoryConfig> = {
    // px 单位 - Tailwind spacing scale
    px: {
        negative: true,
        // Tailwind 4px 基准间距系统（精简版）
        presets: [
            0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48,
            56, 64, 80, 96, 128, 160, 192, 224, 256, 320, 384,
        ],
    },

    // 百分比类 (%, vw, vh, vmin, vmax, etc.)
    percentage: {
        negative: false,
        // 常用百分比值
        presets: [0, 10, 20, 25, 30, 33.333333, 40, 50, 60, 66.666667, 70, 75, 80, 90, 100],
    },

    // 相对字体类 (em, rem, ch, ex, etc.)
    fontRelative: {
        negative: false,
        presets: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8],
    },

    // 物理长度类 (cm, mm, in, pt, pc, Q) - 很少使用，大幅精简
    physical: {
        negative: false,
        presets: [0, 1, 2, 4, 6, 8, 10, 12, 16, 20],
    },

    // 角度类 (deg, grad, rad, turn)
    angle: {
        negative: true,
        presets: [0, 45, 90, 135, 180, 225, 270, 315, 360],
    },

    // 时间类 (s, ms) - 动画/过渡常用值
    time: {
        negative: false,
        presets: [0, 100, 150, 200, 300, 500, 1000],
    },

    // 频率类 (Hz, kHz) - 很少使用
    frequency: {
        negative: false,
        presets: [100, 500, 1000, 5000],
    },

    // 分辨率类 (dpi, dpcm, dppx, x) - 媒体查询用
    resolution: {
        negative: false,
        presets: [1, 2, 3, 96, 300],
    },

    // 弹性类 (fr) - Grid 布局
    flex: {
        negative: false,
        presets: [1, 2, 3, 4, 5, 6],
    },

    // 无单位数值 - opacity, z-index, line-height 等
    unitless: {
        negative: false,
        presets: [0, 0.5, 1, 1.5, 2, 3, 4, 5, 10, 20, 50, 100],
    },
};

/**
 * @deprecated 使用 DEFAULT_UNIT_CATEGORY_CONFIGS 代替
 * 保留此导出以兼容旧代码
 */
export const DEFAULT_UNIT_CONFIGS: Record<string, UnitValueConfig> = {};

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

// ==================== CSSTS 配置类 ====================

/** CsstsConfig 构造函数参数类型 */
export interface CsstsConfigOptions {
    // 属性配置
    includeProperties?: CssPropertyCamelName[];
    excludeProperties?: CssPropertyCamelName[];
    
    // 数值类型配置
    includeNumberTypes?: NumberTypeName[];
    excludeNumberTypes?: NumberTypeName[];
    
    // 单位分类配置
    includeUnitCategories?: UnitCategoryName[];
    excludeUnitCategories?: UnitCategoryName[];
    
    // 单位配置
    includeUnits?: UnitType[];
    excludeUnits?: UnitType[];
    
    // 关键字/颜色配置
    includeKeywords?: KeywordValue[];
    excludeKeywords?: KeywordValue[];
    includeColors?: AllColorValue[];
    excludeColors?: AllColorValue[];
    
    // 伪类/伪元素配置
    includePseudoClasses?: PseudoClassName[];
    excludePseudoClasses?: PseudoClassName[];
    includePseudoElements?: PseudoElementName[];
    excludePseudoElements?: PseudoElementName[];
    
    // 其他配置
    customProperties?: Record<string, CustomPropertyValue>;
    progressiveRanges?: ProgressiveRange[];
    unitCategories?: UnitsConfigValue<UnitCategoryName>;
    pseudoClassStyles?: Partial<PseudoClassStylesConfig>;
    pseudoElementStyles?: Partial<PseudoElementStylesConfig>;
}

/** CSSTS 配置 */
export class CsstsConfig {
    // ==================== 属性配置 ====================
    
    /** 
     * 支持的属性列表（白名单）
     * 如果配置了此项，则只生成这些属性的原子类，忽略 excludeProperties
     * 为空或 undefined 时使用 excludeProperties 逻辑
     */
    includeProperties?: CssPropertyCamelName[];

    /** 
     * 排除的属性列表（黑名单）
     * 仅当 includeProperties 为空时生效
     * 默认排除冷门属性（基于 Tailwind 经验，98% 用不到的属性）
     */
    excludeProperties: CssPropertyCamelName[];

    // ==================== 数值类型配置 ====================

    /**
     * 支持的数值类型列表（白名单）
     * 如果配置了此项，则只生成这些数值类型，忽略 excludeNumberTypes
     * 为空或 undefined 时使用 excludeNumberTypes 逻辑
     */
    includeNumberTypes?: NumberTypeName[];

    /** 
     * 排除的数值类型列表（黑名单）
     * 仅当 includeNumberTypes 为空时生效
     */
    excludeNumberTypes: NumberTypeName[];

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 如果配置了此项，则只生成这些分类的单位，忽略 excludeUnitCategories
     * 为空或 undefined 时使用 excludeUnitCategories 逻辑
     */
    includeUnitCategories?: UnitCategoryName[];

    /**
     * 排除的单位分类列表（黑名单）
     * 仅当 includeUnitCategories 为空时生效
     */
    excludeUnitCategories: UnitCategoryName[];

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 如果配置了此项，则只生成这些单位，忽略 excludeUnits
     * 为空或 undefined 时使用 excludeUnits 逻辑
     */
    includeUnits?: UnitType[];

    /** 
     * 排除的单位列表（黑名单）
     * 仅当 includeUnits 为空时生效
     */
    excludeUnits: UnitType[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     * 如果配置了此项，则只生成这些关键字，忽略 excludeKeywords
     */
    includeKeywords?: KeywordValue[];

    /** 排除的关键字列表（黑名单） */
    excludeKeywords: KeywordValue[];

    /**
     * 支持的颜色列表（白名单）
     * 如果配置了此项，则只生成这些颜色，忽略 excludeColors
     */
    includeColors?: AllColorValue[];

    /** 排除的颜色列表（黑名单） */
    excludeColors: AllColorValue[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties: Record<string, CustomPropertyValue>;

    /** 渐进步长策略（不设置则使用默认策略） */
    progressiveRanges: ProgressiveRange[];

    /** 单位分类配置（覆盖 DEFAULT_UNIT_CATEGORY_CONFIGS） */
    unitCategories: UnitsConfigValue<UnitCategoryName>;

    /** 属性级别配置 */
    properties: CssPropertyConfigMap;

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     * 如果配置了此项，则只生成这些伪类，忽略 excludePseudoClasses
     */
    includePseudoClasses?: PseudoClassName[];

    /** 排除的伪类列表（黑名单） */
    excludePseudoClasses: PseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     * 如果配置了此项，则只生成这些伪元素，忽略 excludePseudoElements
     */
    includePseudoElements?: PseudoElementName[];

    /** 排除的伪元素列表（黑名单） */
    excludePseudoElements: PseudoElementName[];

    /** 伪类样式配置（当变量名包含伪类后缀时自动添加的样式） */
    pseudoClassStyles: PseudoClassStylesConfig;

    /** 伪元素样式配置 */
    pseudoElementStyles: PseudoElementStylesConfig;

    /**
     * 创建 CSSTS 配置实例
     * 
     * @param options 可选的配置对象，用于覆盖默认值
     * 
     * @example
     * // 使用默认配置
     * const config = new CsstsConfig();
     * 
     * @example
     * // 只生成指定属性
     * const config = new CsstsConfig({
     *   includeProperties: ['width', 'height', 'margin', 'padding'],
     * });
     * 
     * @example
     * // 只使用 px 和百分比单位
     * const config = new CsstsConfig({
     *   includeUnitCategories: ['px', 'percentage'],
     * });
     * 
     * @example
     * // 自定义单位分类配置
     * const config = new CsstsConfig({
     *   unitCategories: {
     *     px: { presets: [0, 4, 8, 16, 32, 64] },
     *     percentage: { presets: [0, 25, 50, 75, 100] },
     *   },
     * });
     */
    constructor(options: CsstsConfigOptions = {}) {
        // 属性配置
        this.includeProperties = options.includeProperties;
        this.excludeProperties = options.excludeProperties ?? [...RARE_PROPERTIES];
        
        // 数值类型配置
        this.includeNumberTypes = options.includeNumberTypes;
        this.excludeNumberTypes = options.excludeNumberTypes ?? [];
        
        // 单位分类配置
        this.includeUnitCategories = options.includeUnitCategories;
        this.excludeUnitCategories = options.excludeUnitCategories ?? [];
        
        // 单位配置
        this.includeUnits = options.includeUnits;
        this.excludeUnits = options.excludeUnits ?? [];
        
        // 关键字/颜色配置
        this.includeKeywords = options.includeKeywords;
        this.excludeKeywords = options.excludeKeywords ?? [];
        this.includeColors = options.includeColors;
        this.excludeColors = options.excludeColors ?? [];
        
        // 伪类/伪元素配置
        this.includePseudoClasses = options.includePseudoClasses;
        this.excludePseudoClasses = options.excludePseudoClasses ?? [];
        this.includePseudoElements = options.includePseudoElements;
        this.excludePseudoElements = options.excludePseudoElements ?? [];
        
        // 其他配置
        this.customProperties = options.customProperties ?? {};
        this.progressiveRanges = options.progressiveRanges ?? DEFAULT_PROGRESSIVE_RANGES;
        this.unitCategories = options.unitCategories ?? {};
        this.properties = new CssPropertyConfigMap();
        
        // 伪类/伪元素样式配置
        this.pseudoClassStyles = Object.assign(new PseudoClassStylesConfig(), options.pseudoClassStyles);
        this.pseudoElementStyles = Object.assign(new PseudoElementStylesConfig(), options.pseudoElementStyles);
    }

    /**
     * 创建配置实例的静态工厂方法
     * 
     * @param options 可选的配置对象
     * @returns CsstsConfig 实例
     */
    static create(options: CsstsConfigOptions = {}): CsstsConfig {
        return new CsstsConfig(options);
    }
}

// ==================== 伪类/伪元素样式类型 ====================

/** 伪类/伪元素样式值（使用 CssPropertyValueMap 提供智能提示） */
export type PseudoStyleValue = CssPropertyValueMap;

/** 伪类样式配置类 */
export class PseudoClassStylesConfig {
    // user-action 伪类
    hover?: PseudoStyleValue = { opacity: '0.9' };
    active?: PseudoStyleValue = { opacity: '0.6' };
    focus?: PseudoStyleValue = { opacity: '0.9' };
    focusVisible?: PseudoStyleValue;
    focusWithin?: PseudoStyleValue;

    // link 伪类
    link?: PseudoStyleValue;
    visited?: PseudoStyleValue;
    anyLink?: PseudoStyleValue;
    localLink?: PseudoStyleValue;
    target?: PseudoStyleValue;
    targetWithin?: PseudoStyleValue;

    // form 伪类
    enabled?: PseudoStyleValue;
    disabled?: PseudoStyleValue = { opacity: '0.5', cursor: 'not-allowed' };
    readOnly?: PseudoStyleValue;
    readWrite?: PseudoStyleValue;
    placeholderShown?: PseudoStyleValue;
    default?: PseudoStyleValue;
    checked?: PseudoStyleValue;
    indeterminate?: PseudoStyleValue;
    valid?: PseudoStyleValue;
    invalid?: PseudoStyleValue;
    inRange?: PseudoStyleValue;
    outOfRange?: PseudoStyleValue;
    required?: PseudoStyleValue;
    optional?: PseudoStyleValue;
    userValid?: PseudoStyleValue;
    userInvalid?: PseudoStyleValue;
    autofill?: PseudoStyleValue;

    // structural 伪类
    root?: PseudoStyleValue;
    empty?: PseudoStyleValue;
    firstChild?: PseudoStyleValue;
    lastChild?: PseudoStyleValue;
    onlyChild?: PseudoStyleValue;
    firstOfType?: PseudoStyleValue;
    lastOfType?: PseudoStyleValue;
    onlyOfType?: PseudoStyleValue;
    nthChild?: PseudoStyleValue;
    nthLastChild?: PseudoStyleValue;
    nthOfType?: PseudoStyleValue;
    nthLastOfType?: PseudoStyleValue;

    // logical 伪类
    not?: PseudoStyleValue;
    is?: PseudoStyleValue;
    where?: PseudoStyleValue;
    has?: PseudoStyleValue;

    // linguistic 伪类
    lang?: PseudoStyleValue;
    dir?: PseudoStyleValue;

    // display 伪类
    fullscreen?: PseudoStyleValue;
    modal?: PseudoStyleValue;
    pictureInPicture?: PseudoStyleValue;

    // media 伪类
    playing?: PseudoStyleValue;
    paused?: PseudoStyleValue;
    seeking?: PseudoStyleValue;
    buffering?: PseudoStyleValue;
    stalled?: PseudoStyleValue;
    muted?: PseudoStyleValue;
    volumeLocked?: PseudoStyleValue;

    // web-components 伪类
    defined?: PseudoStyleValue;
    host?: PseudoStyleValue;
    hostContext?: PseudoStyleValue;
    scope?: PseudoStyleValue;
}

/** 伪元素样式配置类 */
export class PseudoElementStylesConfig {
    before?: PseudoStyleValue;
    after?: PseudoStyleValue;
    firstLine?: PseudoStyleValue;
    firstLetter?: PseudoStyleValue;
    marker?: PseudoStyleValue;
    selection?: PseudoStyleValue;
    placeholder?: PseudoStyleValue;
    backdrop?: PseudoStyleValue;
    fileSelectorButton?: PseudoStyleValue;
    cue?: PseudoStyleValue;
    cueRegion?: PseudoStyleValue;
    part?: PseudoStyleValue;
    slotted?: PseudoStyleValue;
}

// ==================== 配置工具函数 ====================

/**
 * 判断一个值是否应该被包含
 * 
 * 优先级规则：
 * 1. 如果 includeList 有值（非空数组），则只包含 includeList 中的值
 * 2. 否则，排除 excludeList 中的值
 * 
 * @param value 要检查的值
 * @param includeList 白名单（可选）
 * @param excludeList 黑名单
 * @returns 是否应该包含该值
 */
export function shouldInclude<T>(
    value: T,
    includeList: T[] | undefined,
    excludeList: T[]
): boolean {
    // 如果配置了白名单，只使用白名单
    if (includeList && includeList.length > 0) {
        return includeList.includes(value);
    }
    // 否则使用黑名单
    return !excludeList.includes(value);
}

/**
 * 从配置中获取有效的列表
 * 
 * @param allItems 所有可能的值
 * @param includeList 白名单（可选）
 * @param excludeList 黑名单
 * @returns 过滤后的有效列表
 */
export function getEffectiveList<T>(
    allItems: readonly T[],
    includeList: T[] | undefined,
    excludeList: T[]
): T[] {
    // 如果配置了白名单，只使用白名单
    if (includeList && includeList.length > 0) {
        return includeList.filter(item => allItems.includes(item));
    }
    // 否则使用黑名单过滤
    return allItems.filter(item => !excludeList.includes(item));
}
