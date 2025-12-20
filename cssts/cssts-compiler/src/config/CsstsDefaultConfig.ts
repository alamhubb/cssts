import type {CsstsConfig} from "../types/csstsConfig";
import type {CssProgressiveRange} from "../types/cssPropertyConfig";

// ==================== 系统级别默认配置 ====================

export const csstsDefaultConfig: CsstsConfig = {
    progressiveRanges: [
        {max: 100, divisors: [1]},         // 0-100: 每个整数
        {max: 200, divisors: [2, 5]},      // 100-200: 能被 2 或 5 整除
        {max: 500, divisors: [5]},         // 200-500: 能被 5 整除
        {max: 1000, divisors: [10]},       // 500-1000: 能被 10 整除
        {max: 2000, divisors: [20, 50]},   // 1000-2000: 能被 20 或 50 整除
        {max: 5000, divisors: [50]},       // 2000-5000: 能被 50 整除
        {max: 10000, divisors: [100]},     // 5000-10000: 能被 100 整除
        {max: Infinity, divisors: [1000]}, // 10000+: 能被 1000 整除
    ],

    numberCategories: [
        {
            pixel: {
                negative: true
            },

            // 百分比类 (%, vw, vh, vmin, vmax, etc.)
            percentage: {
                negative: false,
                presets: [33.33, 66.67],
            },

            // 无单位数值 - opacity, z-index, line-height 等
            unitless: {
                negative: false
            },
        }
    ]
};