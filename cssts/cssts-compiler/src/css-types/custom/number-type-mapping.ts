/**
 * NumberType → UnitCategory 映射（手动维护）
 * 
 * 这是核心映射文件，定义了 CSS 数值类型到单位分类的映射。
 * 
 * 映射链：属性 → numberTypes → unitCategories → units → 数值
 * 
 * 注意：此文件只包含数据定义，工具函数在 utils.ts 中
 */

// ==================== 数值类型定义 ====================

/** 数值类型名称 */
export const NUMBER_TYPE_NAMES = [
  'angle',
  'flex',
  'frequency',
  'integer',
  'length',
  'number',
  'percentage',
  'resolution',
  'time',
] as const;

export type NumberTypeName = typeof NUMBER_TYPE_NAMES[number];

/** 数值类型描述 */
export const NUMBER_TYPE_DESCRIPTIONS: Record<NumberTypeName, { en: string; zh: string }> = {
  angle: { en: 'An angle value (deg, grad, rad, turn)', zh: '角度值（deg、grad、rad、turn）' },
  flex: { en: 'A flexible length in fr units', zh: '弹性长度（fr 单位）' },
  frequency: { en: 'A frequency value (Hz, kHz)', zh: '频率值（Hz、kHz）' },
  integer: { en: 'A whole number, positive or negative', zh: '整数，正数或负数' },
  length: { en: 'A distance measurement (px, em, rem, vh, vw, etc.)', zh: '距离度量（px、em、rem、vh、vw 等）' },
  number: { en: 'A real number, possibly with a fractional component', zh: '实数，可能带有小数部分' },
  percentage: { en: 'A percentage value (%)', zh: '百分比值（%）' },
  resolution: { en: 'A resolution value (dpi, dpcm, dppx, x)', zh: '分辨率值（dpi、dpcm、dppx、x）' },
  time: { en: 'A time value (s, ms)', zh: '时间值（s、ms）' },
};

// ==================== 每个 NumberType 对应的 Category 数据 ====================

/** length 类型对应的单位分类 */
export const LENGTH_CATEGORIES = ['pixel', 'fontRelative', 'physical', 'percentage'] as const;
export type LengthCategory = typeof LENGTH_CATEGORIES[number];

/** angle 类型对应的单位分类 */
export const ANGLE_CATEGORIES = ['angle'] as const;
export type AngleCategory = typeof ANGLE_CATEGORIES[number];

/** time 类型对应的单位分类 */
export const TIME_CATEGORIES = ['time'] as const;
export type TimeCategory = typeof TIME_CATEGORIES[number];

/** frequency 类型对应的单位分类 */
export const FREQUENCY_CATEGORIES = ['frequency'] as const;
export type FrequencyCategory = typeof FREQUENCY_CATEGORIES[number];

/** percentage 类型对应的单位分类 */
export const PERCENTAGE_CATEGORIES = ['percentage'] as const;
export type PercentageCategory = typeof PERCENTAGE_CATEGORIES[number];

/** number/integer 类型对应的单位分类 */
export const UNITLESS_CATEGORIES = ['unitless'] as const;
export type UnitlessCategory = typeof UNITLESS_CATEGORIES[number];

/** resolution 类型对应的单位分类 */
export const RESOLUTION_CATEGORIES = ['resolution'] as const;
export type ResolutionCategory = typeof RESOLUTION_CATEGORIES[number];

/** flex 类型对应的单位分类 */
export const FLEX_CATEGORIES = ['flex'] as const;
export type FlexCategory = typeof FLEX_CATEGORIES[number];

// ==================== NumberType 到 UnitCategory 映射 ====================

/**
 * NumberType 到 UnitCategory 的映射
 * 
 * 这是手动维护的核心配置：
 * - length 包含多个 unitCategory（因为 length 单位有不同的步长范围）
 * - 其他 numberType 基本一一对应
 * 
 * 注意：`zero` 分类不在此映射中，因为：
 * - `0` 是特殊值，所有支持数值的属性都可以使用 `0`（无单位）
 * - 它不属于任何特定的 numberType，而是通用的
 */
export const NUMBER_TYPE_TO_CATEGORIES = {
  length: LENGTH_CATEGORIES,
  angle: ANGLE_CATEGORIES,
  time: TIME_CATEGORIES,
  frequency: FREQUENCY_CATEGORIES,
  percentage: PERCENTAGE_CATEGORIES,
  number: UNITLESS_CATEGORIES,
  integer: UNITLESS_CATEGORIES,
  resolution: RESOLUTION_CATEGORIES,
  flex: FLEX_CATEGORIES,
} as const;

/**
 * 特殊分类：zero
 * 
 * `zero` 是一个特殊的单位分类，表示值为 0 时可以省略单位。
 * 在 CSS 中，`0` 对于任何长度/角度/时间等都是有效的，无需单位。
 * 
 * 使用场景：
 * - margin: 0;  (不需要 0px)
 * - padding: 0;
 * - transform: rotate(0);  (不需要 0deg)
 */
export const ZERO_CATEGORY = 'zero' as const;
