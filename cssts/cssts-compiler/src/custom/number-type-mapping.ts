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
