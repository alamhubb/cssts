/**
 * CSSTS 值类型定义
 * 
 * 此文件为手动维护，不由脚本自动生成
 * 包含所有与单位值、步长策略相关的类型定义
 */

// ==================== 步长和数值配置类型 ====================

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
 * 单位分类配置
 */
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
