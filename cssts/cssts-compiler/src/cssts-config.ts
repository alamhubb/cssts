/**
 * CSSTS 配置类
 *
 * 此文件为手动维护，不由脚本自动生成
 * 提供用户配置接口
 */

// ==================== 重新导出配置相关类型和常量 ====================

// ==================== 类型定义 ====================

import {ProgressiveRange} from "./types/value.ts";

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;


// ==================== 系统级别默认配置 ====================

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

/** 默认数值类型列表 - 包含所有常用数值类型 */
export const DEFAULT_NUMBER_TYPES: NumberTypeName[] = [
    'length',
    'angle',
    'time',
    'frequency',
    'percentage',
    'number',
    'integer',
    'resolution',
    'flex',
];

/**
 * 默认单位分类配置（Tailwind 风格）
 *
 * 基于分类配置数值，同一分类下的所有单位共享相同的数值范围
 * 使用 presets 模式可以精确控制生成的数值
 */
export const DEFAULT_UNIT_CATEGORY_CONFIGS: Record<UnitCategoryName, UnitCategoryConfig> = {
    // pixel 单位分类 - Tailwind spacing scale
    pixel: {
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

// ==================== CSSTS 配置类 ====================

/** CSSTS 配置 */
export class CsstsConfig {
    // ==================== 属性配置 ====================

    /**
     * 支持的属性列表（白名单）
     * 可以是属性名数组或属性配置对象
     * 如果配置了此项，则只生成这些属性的原子类，忽略 excludeProperties
     * 为空或 undefined 时使用 excludeProperties 逻辑
     * 
     * @example
     * properties: ['width', 'height', 'margin']
     * 
     * @example
     * properties: {
     *   width: { numberTypes: ['length'] },
     *   height: { numberTypes: ['length'] }
     * }
     */
    properties?: CssPropertyCamelName[] | CssPropertyConfigMap;

    /**
     * 排除的属性列表（黑名单）
     * 仅当 properties 为空时生效
     * 默认排除冷门属性（基于 Tailwind 经验，98% 用不到的属性）
     */
    excludeProperties: CssPropertyCamelName[];

    // ==================== 数值类型配置 ====================

    /**
     * 支持的数值类型列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ numberType: { unitCategory: { unit: { step: 4 } } } }
     *
     * @example
     * numberTypes: [
     *   'length',
     *   { time: { px: { px: { step: 4 } } } }
     * ]
     */
    numberTypes?: NumberTypeConfigItem<NumberTypeName>[];

    /**
     * 排除的数值类型列表（黑名单）
     * 仅当 numberTypes 为空时生效
     * 支持混合数组格式，可以排除整个数值类型、特定单位或特定分类下的单位
     *
     * @example
     * excludeNumberTypes: [
     *   'angle',                           // 排除整个 angle 数值类型
     *   { time: ['ms', 's'] },             // 排除 time 类型下的 ms 和 s 单位
     *   { length: { pixel: ['px'] } }      // 排除 length 类型中 pixel 分类下的 px
     * ]
     */
    excludeNumberTypes: NumberTypeExcludeItem<NumberTypeName>[];

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ unitCategory: { unit: { step: 4 } } }
     *
     * 默认包含除了系统级别低频分类外的所有分类
     *
     * @example
     * unitCategories: [
     *   'pixel',
     *   { percentage: { '%': { presets: [0, 25, 50, 75, 100] } } }
     * ]
     */
    unitCategories: UnitCategoryConfigItem<UnitCategoryName>[];

    /**
     * 排除的单位分类列表（黑名单）
     * 仅当 unitCategories 为空时生效
     * 支持混合数组格式，可以排除整个分类或特定单位
     *
     * @example
     * excludeUnitCategories: [
     *   'resolution',               // 排除整个 resolution 分类
     *   { pixel: ['px'] }           // 排除 pixel 分类下的 px 单位
     * ]
     */
    excludeUnitCategories: UnitCategoryExcludeItem<UnitCategoryName>[];

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ unit: { step: 4, max: 500 } }
     *
     * @example
     * units: [
     *   'px',
     *   'em',
     *   { px: { step: 4, max: 500 } }  // px is the unit name, not category
     * ]
     */
    units?: UnitConfigItem<UnitType>[];

    /**
     * 排除的单位列表（黑名单）
     * 仅当 units 为空时生效
     * 支持混合数组格式（为了保持一致性）
     *
     * @example
     * excludeUnits: [
     *   'px',
     *   'em',
     *   { dpi: {} }
     * ]
     */
    excludeUnits: UnitExcludeItem<UnitType>[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     * 如果配置了此项，则只生成这些关键字，忽略 excludeKeywords
     */
    keywords?: KeywordValue[];

    /**
     * 排除的关键字列表（黑名单）
     * 仅当 keywords 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludeKeywords: KeywordValue[];

    /**
     * 支持的颜色列表（白名单）
     * 如果配置了此项，则只生成这些颜色，忽略 excludeColors
     */
    colors?: AllColorValue[];

    /**
     * 排除的颜色列表（黑名单）
     * 仅当 colors 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludeColors: AllColorValue[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties: Record<string, CustomPropertyValue>;

    /** 渐进步长策略（不设置则使用默认策略） */
    progressiveRanges: ProgressiveRange[];

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     * 如果配置了此项，则只生成这些伪类，忽略 excludePseudoClasses
     */
    pseudoClasses?: PseudoClassName[];

    /**
     * 排除的伪类列表（黑名单）
     * 仅当 pseudoClasses 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludePseudoClasses: PseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     * 如果配置了此项，则只生成这些伪元素，忽略 excludePseudoElements
     */
    pseudoElements?: PseudoElementName[];

    /**
     * 排除的伪元素列表（黑名单）
     * 仅当 pseudoElements 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludePseudoElements: PseudoElementName[];

    // ==================== 伪类/伪元素样式配置 ====================

    /** 伪类样式配置（当变量名包含伪类后缀时自动添加的样式） */
    pseudoClassesStyles: PseudoClassStylesConfig;

    /** 伪元素样式配置 */
    pseudoElementsStyles: PseudoElementStylesConfig;

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
     * // 只使用 pixel 和百分比单位
     * const config = new CsstsConfig({
     *   includeUnitCategories: ['pixel', 'percentage'],
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
    constructor(options = {} as CsstsConfig) {
        // 其他配置
        this.customProperties = options.customProperties ?? {};
        this.progressiveRanges = options.progressiveRanges ?? DEFAULT_PROGRESSIVE_RANGES;

        // ==================== 属性配置 ====================
        this.properties = options.properties ?? cssDefaultProperties
        this.excludeProperties = options.excludeProperties ?? [];

        // ==================== 数值类型配置 ====================
        this.numberTypes = options.numberTypes;
        this.excludeNumberTypes = options.excludeNumberTypes ?? [];

        // ==================== 单位分类配置 ====================
        this.unitCategories = options.unitCategories ?? [DEFAULT_UNIT_CATEGORY_CONFIGS];
        this.excludeUnitCategories = options.excludeUnitCategories ?? [];

        // ==================== 单位配置 ====================
        this.units = options.units;
        this.excludeUnits = options.excludeUnits ?? [];

        // ==================== 关键字/颜色配置 ====================
        this.keywords = options.keywords ?? [];
        this.excludeKeywords = options.excludeKeywords ?? [];
        this.colors = options.colors ?? [];
        this.excludeColors = options.excludeColors ?? [];

        // ==================== 伪类/伪元素配置 ====================
        this.pseudoClasses = options.pseudoClasses;
        this.excludePseudoClasses = options.excludePseudoClasses ?? [];
        this.pseudoElements = options.pseudoElements;
        this.excludePseudoElements = options.excludePseudoElements ?? [];

        // ==================== 伪类/伪元素样式配置 ====================
        this.pseudoClassesStyles = new PseudoClassStylesConfig(options.pseudoClassesStyles);
        this.pseudoElementsStyles = new PseudoElementStylesConfig(options.pseudoElementsStyles);
    }
}


export const csstsDefaultConfig = new CsstsConfig()