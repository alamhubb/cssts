/**
 * CSSTS 配置类型定义
 * 
 * 此文件为手动维护，不由脚本自动生成
 * 包含所有配置项相关的类型定义
 */

import type { UnitCategoryName } from '../config/units';
import type {
    ProgressiveRange,
    StepConfig,
    UnitValueConfig,
    UnitCategoryConfig,
    UnitsConfigValue,
} from './value';

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

// ==================== 重新导出值类型 ====================

export type {
    ProgressiveRange,
    StepConfig,
    UnitValueConfig,
    UnitCategoryConfig,
    UnitsConfigValue,
} from './value';
