/**
 * 数值生成配置
 * 
 * 包含单位配置、步长策略、单位分类配置等
 */

import type { UnitCategoryName } from './units';

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
 * 使用 DEFAULT_UNIT_CATEGORY_CONFIGS 代替
 * 保留此导出以兼容旧代码
 */
export const DEFAULT_UNIT_CONFIGS: Record<string, UnitValueConfig> = {};

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;
