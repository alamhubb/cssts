/**
 * CSSTS 配置类
 * 
 * 此文件为手动维护，不由脚本自动生成
 * 聚合了自动生成的类型，提供用户配置接口
 */

import type { AllColorValue } from './colors';
import type { NumberTypeName, UnitType } from './units';
import type { KeywordValue } from './keywords';
import { CssPropertyConfigMap, type CssPropertyCamelName } from './property-config';

// ==================== 数值生成配置 ====================

/** 单位配置 */
export interface UnitValueConfig {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长（不设置则用渐进步长策略） */
  step?: number;
  /** 额外预设值 */
  presets?: number[];
  /** 是否支持负数 */
  negative?: boolean;
}

/** 渐进步长区间 */
export interface ProgressiveRange {
  /** 区间最大值 */
  max: number;
  /** 能被整除的除数 */
  divisors: number[];
}

/** 默认渐进步长策略 */
export const DEFAULT_PROGRESSIVE_RANGES: ProgressiveRange[] = [
  { max: 100, divisors: [1] },        // 1-100: 每个整数
  { max: 200, divisors: [2, 5] },     // 100-200: 能被 2 或 5 整除
  { max: 500, divisors: [5] },        // 200-500: 能被 5 整除
  { max: 1000, divisors: [10] },      // 500-1000: 能被 10 整除
  { max: 2000, divisors: [20, 50] },  // 1000-2000: 能被 20 或 50 整除
  { max: 5000, divisors: [50] },      // 2000-5000: 能被 50 整除
  { max: 10000, divisors: [100] },    // 5000-10000: 能被 100 整除
  { max: Infinity, divisors: [1000] }, // 10000+: 能被 1000 整除
];

/** 默认单位配置 */
export const DEFAULT_UNIT_CONFIGS: Record<string, UnitValueConfig> = {
  px: { min: 1, max: 10000 },
  rem: { min: 1, max: 100, step: 1 },
  em: { min: 1, max: 100, step: 1 },
  '%': { min: 1, max: 100 },
  vw: { min: 1, max: 100 },
  vh: { min: 1, max: 100 },
  deg: { min: 0, max: 360 },
  ms: { min: 0, max: 10000, step: 100 },
  s: { min: 0, max: 60, step: 1 },
  fr: { min: 1, max: 12 },
  '<number>': { min: 0, max: 100 },
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

  /** 单位默认配置（覆盖 DEFAULT_UNIT_CONFIGS） */
  unitConfigs: Record<string, UnitValueConfig> = {};

  /** 属性级别配置 */
  properties = new CssPropertyConfigMap();
}
