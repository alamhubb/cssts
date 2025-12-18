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

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

// ==================== 层级配置类型 ====================

/**
 * 数值类型配置项
 * 可以是字符串（简单启用）或对象
 * 对象支持两种格式：
 * 1. { numberType: { unitCategory: { unit: { step: 4 } } } } - 完整三层
 * 2. { numberType: { unit: { step: 4 } } } - 跨越 unitCategory 层级
 */
export type NumberTypeConfigItem<T extends string = string> =
  | T
  | Record<T, Record<string, Record<string, UnitValueConfig> | UnitValueConfig>>;

/**
 * 单位分类配置项
 * 可以是字符串（简单启用）或对象
 * 对象支持两种格式：
 * 1. { unitCategory: { unit: { step: 4 } } } - 完整两层
 * 2. { unitCategory: { step: 4 } } - 直接配置（应用到该分类下所有单位）
 */
export type UnitCategoryConfigItem<T extends string = string> =
  | T
  | Record<T, Record<string, UnitValueConfig> | UnitValueConfig>;

/**
 * 单位配置项
 * 可以是字符串（简单启用）或对象（带配置）
 */
export type UnitConfigItem<T extends string = string> =
  | T
  | Record<T, UnitValueConfig>;

// ==================== 排除配置类型 ====================

/**
 * 数值类型排除项
 * 可以是字符串（排除整个数值类型）或对象（排除特定层级的项）
 * 对象支持两种格式：
 * 1. { numberType: unitNames[] } - 排除该数值类型下的特定单位
 * 2. { numberType: { unitCategory: unitNames[] } } - 排除特定分类下的单位
 * 
 * @example
 * ['angle', { time: ['ms', 's'] }, { length: { pixel: ['px'] } }]
 */
export type NumberTypeExcludeItem<T extends string = string> =
  | T
  | Record<T, string[] | Record<string, string[]>>;

/**
 * 单位分类排除项
 * 可以是字符串（排除整个分类）或对象（排除特定单位）
 * 对象格式：{ unitCategory: unitNames[] } - 排除该分类下的特定单位
 * 
 * @example
 * ['resolution', { pixel: ['px'] }]  // 排除 resolution，以及 pixel 分类下的 px
 */
export type UnitCategoryExcludeItem<T extends string = string> =
  | T
  | Record<T, string[]>;

/**
 * 单位排除项
 * 可以是字符串（排除单位）或对象（为了保持一致性）
 */
export type UnitExcludeItem<T extends string = string> =
  | T
  | Record<T, {}>;
