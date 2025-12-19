/**
 * 数值类型和单位分类的映射关系
 * 
 * 定义了：
 * - numberType 对应的 category
 * - category 对应的 unit
 */

// ==================== 单位分类名称 ====================

export const UNIT_CATEGORY_NAMES = [
  'percentage',
  'pixel',
  'fontRelative',
  'physical',
  'angle',
  'time',
  'frequency',
  'resolution',
  'flex',
  'unitless',
] as const;

export type UnitCategoryName = typeof UNIT_CATEGORY_NAMES[number];

// ==================== Length 类型 ====================

/** length 类型对应的单位分类 */
export const LENGTH_CATEGORIES = ['pixel', 'fontRelative', 'physical', 'percentage'] as const;
export type LengthCategory = typeof LENGTH_CATEGORIES[number];

// ==================== Angle 类型 ====================

/** angle 类型对应的单位分类 */
export const ANGLE_CATEGORIES = ['angle'] as const;
export type AngleCategory = typeof ANGLE_CATEGORIES[number];

// ==================== Time 类型 ====================

/** time 类型对应的单位分类 */
export const TIME_CATEGORIES = ['time'] as const;
export type TimeCategory = typeof TIME_CATEGORIES[number];

// ==================== Frequency 类型 ====================

/** frequency 类型对应的单位分类 */
export const FREQUENCY_CATEGORIES = ['frequency'] as const;
export type FrequencyCategory = typeof FREQUENCY_CATEGORIES[number];

// ==================== Percentage 类型 ====================

/** percentage 类型对应的单位分类 */
export const PERCENTAGE_CATEGORIES = ['percentage'] as const;
export type PercentageCategory = typeof PERCENTAGE_CATEGORIES[number];

// ==================== Number/Integer 类型 ====================

/** number/integer 类型对应的单位分类 */
export const UNITLESS_CATEGORIES = ['unitless'] as const;
export type UnitlessCategory = typeof UNITLESS_CATEGORIES[number];

// ==================== Resolution 类型 ====================

/** resolution 类型对应的单位分类 */
export const RESOLUTION_CATEGORIES = ['resolution'] as const;
export type ResolutionCategory = typeof RESOLUTION_CATEGORIES[number];

// ==================== Flex 类型 ====================

/** flex 类型对应的单位分类 */
export const FLEX_CATEGORIES = ['flex'] as const;
export type FlexCategory = typeof FLEX_CATEGORIES[number];

// ==================== 百分比类单位 ====================

/** 百分比类单位 (0-100, 步长 1) */
export const PERCENTAGE_UNITS = ['%', 'vw', 'vh', 'vmin', 'vmax', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh', 'vi', 'vb'] as const;
export type PercentageUnit = typeof PERCENTAGE_UNITS[number];

// ==================== 像素类单位 ====================

/** px 单位 */
export const PX_UNITS = ['px'] as const;
export type PxUnit = typeof PX_UNITS[number];

// ==================== 相对字体类单位 ====================

/** 相对字体类单位 (0-10, 步长 0.1-0.25) */
export const FONT_RELATIVE_UNITS = ['em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh'] as const;
export type FontRelativeUnit = typeof FONT_RELATIVE_UNITS[number];

// ==================== 物理长度类单位 ====================

/** 物理长度类单位 (0-50, 步长 0.5-1) */
export const PHYSICAL_UNITS = ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] as const;
export type PhysicalUnit = typeof PHYSICAL_UNITS[number];

// ==================== 角度类单位 ====================

/** 角度类单位 */
export const ANGLE_UNITS = ['deg', 'grad', 'rad', 'turn'] as const;
export type AngleUnit = typeof ANGLE_UNITS[number];

// ==================== 时间类单位 ====================

/** 时间类单位 */
export const TIME_UNITS = ['s', 'ms'] as const;
export type TimeUnit = typeof TIME_UNITS[number];

// ==================== 频率类单位 ====================

/** 频率类单位 (20-20000, 步长 100) */
export const FREQUENCY_UNITS = ['Hz', 'kHz'] as const;
export type FrequencyUnit = typeof FREQUENCY_UNITS[number];

// ==================== 分辨率类单位 ====================

/** 分辨率类单位 (72-300, 步长 1) */
export const RESOLUTION_UNITS = ['dpi', 'dpcm', 'dppx', 'x'] as const;
export type ResolutionUnit = typeof RESOLUTION_UNITS[number];

// ==================== 弹性类单位 ====================

/** 弹性类单位 (0-12, 步长 1) */
export const FLEX_UNITS = ['fr'] as const;
export type FlexUnit = typeof FLEX_UNITS[number];

// ==================== 无单位数值 ====================

/** 无单位数值 (0-100, 渐进步长) */
export const UNITLESS_UNITS = [] as const;
export type UnitlessUnit = typeof UNITLESS_UNITS[number];

// ==================== 映射表 ====================

/** numberType 到 category 的映射 */
export const NUMBER_TYPE_TO_CATEGORIES: Record<string, readonly UnitCategoryName[]> = {
  'length': LENGTH_CATEGORIES,
  'angle': ANGLE_CATEGORIES,
  'time': TIME_CATEGORIES,
  'frequency': FREQUENCY_CATEGORIES,
  'percentage': PERCENTAGE_CATEGORIES,
  'number': UNITLESS_CATEGORIES,
  'integer': UNITLESS_CATEGORIES,
  'resolution': RESOLUTION_CATEGORIES,
  'flex': FLEX_CATEGORIES,
  'zero': UNITLESS_CATEGORIES,
  'ratio': UNITLESS_CATEGORIES,
  'decibel': UNITLESS_CATEGORIES,
  'semitones': UNITLESS_CATEGORIES,
  'dimension': ['pixel', 'fontRelative', 'physical', 'angle', 'time', 'frequency', 'resolution', 'flex', 'percentage'],
};

/** category 到 unit 的映射 */
export const CATEGORY_TO_UNITS: Record<UnitCategoryName, readonly string[]> = {
  'percentage': PERCENTAGE_UNITS,
  'pixel': PX_UNITS,
  'fontRelative': FONT_RELATIVE_UNITS,
  'physical': PHYSICAL_UNITS,
  'angle': ANGLE_UNITS,
  'time': TIME_UNITS,
  'frequency': FREQUENCY_UNITS,
  'resolution': RESOLUTION_UNITS,
  'flex': FLEX_UNITS,
  'unitless': UNITLESS_UNITS,
};
