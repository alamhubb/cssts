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
  // 百分比
  '%': { min: 1, max: 100 },

  // 无单位数值
  unitless: { min: 0, max: 100 },

  // 频率
  Hz: { min: 0, max: 20000, step: 100 },
  kHz: { min: 0, max: 20, step: 1 },

  // 长度 - 绝对单位
  px: { min: 1, max: 10000 },
  cm: { min: 0, max: 100, step: 1 },
  mm: { min: 0, max: 1000, step: 1 },
  Q: { min: 0, max: 400, step: 1 },      // 1/4 毫米
  in: { min: 0, max: 40, step: 1 },      // 英寸
  pc: { min: 0, max: 100, step: 1 },     // pica (1pc = 12pt)
  pt: { min: 0, max: 1000, step: 1 },    // point (1pt = 1/72 in)

  // 长度 - 相对单位（字体）
  em: { min: 0, max: 100, step: 0.25 },
  rem: { min: 0, max: 100, step: 0.25 },
  ex: { min: 0, max: 100, step: 1 },     // x-height
  ch: { min: 0, max: 100, step: 1 },     // 字符宽度
  ic: { min: 0, max: 100, step: 1 },     // CJK 字符宽度
  cap: { min: 0, max: 100, step: 1 },    // 大写字母高度
  lh: { min: 0, max: 10, step: 0.25 },   // 行高
  rlh: { min: 0, max: 10, step: 0.25 },  // 根元素行高

  // 长度 - 视口单位
  vw: { min: 0, max: 100 },
  vh: { min: 0, max: 100 },
  vmin: { min: 0, max: 100 },
  vmax: { min: 0, max: 100 },
  vi: { min: 0, max: 100 },              // 内联方向
  vb: { min: 0, max: 100 },              // 块方向

  // 长度 - 动态视口单位
  dvw: { min: 0, max: 100 },
  dvh: { min: 0, max: 100 },
  lvw: { min: 0, max: 100 },             // 大视口
  lvh: { min: 0, max: 100 },
  svw: { min: 0, max: 100 },             // 小视口
  svh: { min: 0, max: 100 },

  // 角度
  deg: { min: 0, max: 360 },
  grad: { min: 0, max: 400 },            // 百分度 (400grad = 360deg)
  rad: { min: 0, max: 6.28, step: 0.01 }, // 弧度 (2π ≈ 6.28)
  turn: { min: 0, max: 1, step: 0.01 },  // 圈数

  // 时间
  ms: { min: 0, max: 10000, step: 50 },
  s: { min: 0, max: 60, step: 0.1 },

  // 分辨率
  dpi: { min: 72, max: 300, step: 1 },
  dpcm: { min: 28, max: 118, step: 1 },
  dppx: { min: 1, max: 4, step: 0.5 },
  x: { min: 1, max: 4, step: 0.5 },      // dppx 的别名

  // 弹性
  fr: { min: 1, max: 12, step: 1 },
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
