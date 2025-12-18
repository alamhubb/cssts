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

/** 默认单位分类配置 */
export const DEFAULT_UNIT_CATEGORY_CONFIGS: Record<UnitCategoryName, UnitCategoryConfig> = {
    // 百分比类 (%, vw, vh, vmin, vmax, etc.)
    percentage: {
        min: 0,
        max: 100,
        negative: false,
    },

    // 像素类 (px)
    pixel: {
        min: 0,
        max: 2000,
        negative: true,
        step: [
            {max: 100, divisors: [1]},
            {max: 200, divisors: [2, 5]},
            {max: 500, divisors: [5]},
            {max: 1000, divisors: [10]},
            {max: 2000, divisors: [20, 50]},
        ],
    },

    // 相对字体类 (em, rem, ch, ex, etc.)
    fontRelative: {
        min: 0,
        max: 10,
        step: 0.25,
        negative: false,
    },

    // 物理长度类 (cm, mm, in, pt, pc, Q)
    physical: {
        min: 0,
        max: 50,
        step: 1,
        negative: false,
    },

    // 角度类 (deg, grad, rad, turn)
    angle: {
        min: 0,
        max: 360,
        negative: true,
        step: [
            {max: 90, divisors: [5, 15]},
            {max: 180, divisors: [15, 30]},
            {max: 360, divisors: [30, 45]},
        ],
    },

    // 时间类 (s, ms)
    time: {
        min: 0,
        max: 5000,
        negative: false,
        step: [
            {max: 500, divisors: [50]},
            {max: 1000, divisors: [100]},
            {max: 5000, divisors: [250, 500]},
        ],
    },

    // 频率类 (Hz, kHz)
    frequency: {
        min: 20,
        max: 20000,
        step: 100,
        negative: false,
    },

    // 分辨率类 (dpi, dpcm, dppx, x)
    resolution: {
        min: 72,
        max: 300,
        step: 1,
        negative: false,
    },

    // 弹性类 (fr)
    flex: {
        min: 1,
        max: 12,
        step: 1,
        negative: false,
    },

    // 无单位数值
    unitless: {
        min: 0,
        max: 100,
        negative: true,
    },

    // 零值（只有 0）
    zero: {
        min: 0,
        max: 0,
        negative: false,
    },
};

/** 默认单位配置 */
export const DEFAULT_UNIT_CONFIGS: Record<string, UnitValueConfig> = {
    // 百分比
    '%': {min: 1, max: 100},

    // 无单位数值
    unitless: {min: 0, max: 100},

    // 频率
    Hz: {min: 0, max: 20000, step: 100},
    kHz: {min: 0, max: 20, step: 1},

    // 长度 - 绝对单位
    px: {min: 1, max: 10000},
    cm: {min: 0, max: 100, step: 1},
    mm: {min: 0, max: 1000, step: 1},
    Q: {min: 0, max: 400, step: 1},      // 1/4 毫米
    in: {min: 0, max: 40, step: 1},      // 英寸
    pc: {min: 0, max: 100, step: 1},     // pica (1pc = 12pt)
    pt: {min: 0, max: 1000, step: 1},    // point (1pt = 1/72 in)

    // 长度 - 相对单位（字体）
    em: {min: 0, max: 100, step: 0.25},
    rem: {min: 0, max: 100, step: 0.25},
    ex: {min: 0, max: 100, step: 1},     // x-height
    ch: {min: 0, max: 100, step: 1},     // 字符宽度
    ic: {min: 0, max: 100, step: 1},     // CJK 字符宽度
    cap: {min: 0, max: 100, step: 1},    // 大写字母高度
    lh: {min: 0, max: 10, step: 0.25},   // 行高
    rlh: {min: 0, max: 10, step: 0.25},  // 根元素行高

    // 长度 - 视口单位
    vw: {min: 0, max: 100},
    vh: {min: 0, max: 100},
    vmin: {min: 0, max: 100},
    vmax: {min: 0, max: 100},
    vi: {min: 0, max: 100},              // 内联方向
    vb: {min: 0, max: 100},              // 块方向

    // 长度 - 动态视口单位
    dvw: {min: 0, max: 100},
    dvh: {min: 0, max: 100},
    lvw: {min: 0, max: 100},             // 大视口
    lvh: {min: 0, max: 100},
    svw: {min: 0, max: 100},             // 小视口
    svh: {min: 0, max: 100},

    // 角度
    deg: {min: 0, max: 360},
    grad: {min: 0, max: 400},            // 百分度 (400grad = 360deg)
    rad: {min: 0, max: 6.28, step: 0.01}, // 弧度 (2π ≈ 6.28)
    turn: {min: 0, max: 1, step: 0.01},  // 圈数

    // 时间
    ms: {min: 0, max: 10000, step: 50},
    s: {min: 0, max: 60, step: 0.1},

    // 分辨率
    dpi: {min: 72, max: 300, step: 1},
    dpcm: {min: 28, max: 118, step: 1},
    dppx: {min: 1, max: 4, step: 0.5},
    x: {min: 1, max: 4, step: 0.5},      // dppx 的别名

    // 弹性
    fr: {min: 1, max: 12, step: 1},
};

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

// ==================== CSSTS 配置类 ====================

/** CSSTS 配置 */
export class CsstsConfig {
    /** 排除的属性 */
    excludeProperties: CssPropertyCamelName[] = [];

    /** 排除的关键字 */
    excludeKeywords: KeywordValue[] = [];

    /** 排除的颜色 */
    excludeColors: AllColorValue[] = [];

    /** 排除的数值类型 */
    excludeNumberTypes: NumberTypeName[] = [];

    /** 排除的单位 */
    excludeUnits: UnitType[] = [];

    /** 自定义属性 */
    customProperties: Record<string, CustomPropertyValue> = {};

    /** 渐进步长策略（不设置则使用默认策略） */
    progressiveRanges: ProgressiveRange[] = DEFAULT_PROGRESSIVE_RANGES;

    /** 单位配置（覆盖 DEFAULT_UNIT_CONFIGS，优先级最高） */
    units: UnitsConfigValue<UnitType> = {};

    /** 单位分类配置（覆盖 DEFAULT_UNIT_CATEGORY_CONFIGS） */
    unitCategories: UnitsConfigValue<UnitCategoryName> = {};

    /** 属性级别配置 */
    properties = new CssPropertyConfigMap();

    // ==================== 伪类/伪元素配置 ====================

    /** 排除的伪类 */
    excludePseudoClasses: PseudoClassName[] = [];

    /** 排除的伪元素 */
    excludePseudoElements: PseudoElementName[] = [];

    /** 伪类样式配置（当变量名包含伪类后缀时自动添加的样式） */
    pseudoClassStyles = new PseudoClassStylesConfig();

    /** 伪元素样式配置 */
    pseudoElementStyles = new PseudoElementStylesConfig();
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
