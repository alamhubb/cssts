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

// ==================== NumberType 到 UnitCategory 映射类 ====================

/**
 * NumberType 到 UnitCategory 的映射类
 * 
 * 这是手动维护的核心配置：
 * - length 包含多个 unitCategory（因为 length 单位有不同的步长范围）
 * - 其他 numberType 基本一一对应
 * 
 * 注意：`0` 值由系统自动处理（通过 allowZero 配置），不作为单独的分类
 */
class NumberTypeToCategoriesMapping {
  readonly length: readonly LengthCategory[] = LENGTH_CATEGORIES;
  readonly angle: readonly AngleCategory[] = ANGLE_CATEGORIES;
  readonly time: readonly TimeCategory[] = TIME_CATEGORIES;
  readonly frequency: readonly FrequencyCategory[] = FREQUENCY_CATEGORIES;
  readonly percentage: readonly PercentageCategory[] = PERCENTAGE_CATEGORIES;
  readonly number: readonly UnitlessCategory[] = UNITLESS_CATEGORIES;
  readonly integer: readonly UnitlessCategory[] = UNITLESS_CATEGORIES;
  readonly resolution: readonly ResolutionCategory[] = RESOLUTION_CATEGORIES;
  readonly flex: readonly FlexCategory[] = FLEX_CATEGORIES;
}

export const numberTypeToCategories = new NumberTypeToCategoriesMapping();

/** 类型：NumberType 到 UnitCategory 的映射 */
export type NumberTypeToCategories = NumberTypeToCategoriesMapping;
