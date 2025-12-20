/**
 * CSSTS 配置
 *
 * 此文件为手动维护，不由脚本自动生成
 * 提供用户配置接口和创建函数
 */
import {CssProgressiveRange} from "../types/cssPropertyConfig";

// ==================== 合并所有核心属性 ====================
export const cssDefaultProperties: string[] = [
    'top',
];

// ==================== 系统级别默认配置 ====================

/** 默认渐进步长策略 */
export const DEFAULT_PROGRESSIVE_RANGES: CssProgressiveRange[] = [
    { max: 100, divisors: [1] },         // 0-100: 每个整数
    { max: 200, divisors: [2, 5] },      // 100-200: 能被 2 或 5 整除
    { max: 500, divisors: [5] },         // 200-500: 能被 5 整除
    { max: 1000, divisors: [10] },       // 500-1000: 能被 10 整除
    { max: 2000, divisors: [20, 50] },   // 1000-2000: 能被 20 或 50 整除
    { max: 5000, divisors: [50] },       // 2000-5000: 能被 50 整除
    { max: 10000, divisors: [100] },     // 5000-10000: 能被 100 整除
    { max: Infinity, divisors: [1000] }, // 10000+: 能被 1000 整除
];

/**
 * 默认单位分类配置（Tailwind 风格）
 *
 * 基于分类配置数值，同一分类下的所有单位共享相同的数值范围
 * 使用 presets 模式可以精确控制生成的数值
 */
export const DEFAULT_UNIT_CATEGORY_CONFIGS: Record<string, UnitCategoryDefaultConfig> = {
    // pixel 单位分类 - Tailwind spacing scale
    pixel: {
        negative: true,
        presets: [
            0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48,
            56, 64, 80, 96, 128, 160, 192, 224, 256, 320, 384,
        ],
    },

    // 百分比类 (%, vw, vh, vmin, vmax, etc.)
    percentage: {
        negative: false,
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
