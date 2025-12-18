/**
 * CSS 单位分类定义（手动维护）
 * 
 * 将 CSS 单位按照数值范围和步长特性分组，
 * 便于生成合适的数值序列。
 */

// ==================== 每个分类的单位数据 ====================

/** 百分比类单位 (0-100, 步长 1) */
export const PERCENTAGE_UNITS = ['%', 'vw', 'vh', 'vmin', 'vmax', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh', 'vi', 'vb'] as const;
export type PercentageUnit = typeof PERCENTAGE_UNITS[number];

/** 像素类单位 (0-2000+, 渐进步长) */
export const PIXEL_UNITS = ['px'] as const;
export type PixelUnit = typeof PIXEL_UNITS[number];

/** 相对字体类单位 (0-10, 步长 0.1-0.25) */
export const FONT_RELATIVE_UNITS = ['em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh'] as const;
export type FontRelativeUnit = typeof FONT_RELATIVE_UNITS[number];

/** 物理长度类单位 (0-50, 步长 0.5-1) */
export const PHYSICAL_UNITS = ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] as const;
export type PhysicalUnit = typeof PHYSICAL_UNITS[number];

/** 角度类单位 */
export const ANGLE_UNITS = ['deg', 'grad', 'rad', 'turn'] as const;
export type AngleUnit = typeof ANGLE_UNITS[number];

/** 时间类单位 */
export const TIME_UNITS = ['s', 'ms'] as const;
export type TimeUnit = typeof TIME_UNITS[number];

/** 频率类单位 (20-20000, 步长 100) */
export const FREQUENCY_UNITS = ['Hz', 'kHz'] as const;
export type FrequencyUnit = typeof FREQUENCY_UNITS[number];

/** 分辨率类单位 (72-300, 步长 1) */
export const RESOLUTION_UNITS = ['dpi', 'dpcm', 'dppx', 'x'] as const;
export type ResolutionUnit = typeof RESOLUTION_UNITS[number];

/** 弹性类单位 (0-12, 步长 1) */
export const FLEX_UNITS = ['fr'] as const;
export type FlexUnit = typeof FLEX_UNITS[number];

/** 无单位数值 (0-100, 渐进步长) */
export const UNITLESS_UNITS = ['unitless'] as const;
export type UnitlessUnit = typeof UNITLESS_UNITS[number];

// ==================== 类型定义 ====================

/** 单位分类名称 */
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

// ==================== 分类到单位的映射类 ====================

/** 分类到单位的映射类 */
class UnitsByCategoryMapping {
  readonly percentage: readonly PercentageUnit[] = PERCENTAGE_UNITS;
  readonly pixel: readonly PixelUnit[] = PIXEL_UNITS;
  readonly fontRelative: readonly FontRelativeUnit[] = FONT_RELATIVE_UNITS;
  readonly physical: readonly PhysicalUnit[] = PHYSICAL_UNITS;
  readonly angle: readonly AngleUnit[] = ANGLE_UNITS;
  readonly time: readonly TimeUnit[] = TIME_UNITS;
  readonly frequency: readonly FrequencyUnit[] = FREQUENCY_UNITS;
  readonly resolution: readonly ResolutionUnit[] = RESOLUTION_UNITS;
  readonly flex: readonly FlexUnit[] = FLEX_UNITS;
  readonly unitless: readonly UnitlessUnit[] = UNITLESS_UNITS;
}

export const unitsByCategory = new UnitsByCategoryMapping();

/** 类型：分类到单位的映射 */
export type UnitsByCategory = UnitsByCategoryMapping;

// ==================== 分类描述 ====================

/** 分类描述 */
export const UNIT_CATEGORY_DESCRIPTIONS: Record<UnitCategoryName, { en: string; zh: string }> = {
  percentage: { en: 'Percentage and viewport units (0-100)', zh: '百分比和视口单位 (0-100)' },
  pixel: { en: 'Pixel units (0-2000+, progressive)', zh: '像素单位 (0-2000+, 渐进步长)' },
  fontRelative: { en: 'Font-relative units (0-10)', zh: '相对字体单位 (0-10)' },
  physical: { en: 'Physical length units (0-50)', zh: '物理长度单位 (0-50)' },
  angle: { en: 'Angle units (deg, grad, rad, turn)', zh: '角度单位 (deg, grad, rad, turn)' },
  time: { en: 'Time units (s, ms)', zh: '时间单位 (s, ms)' },
  frequency: { en: 'Frequency units (Hz, kHz)', zh: '频率单位 (Hz, kHz)' },
  resolution: { en: 'Resolution units (dpi, dpcm, dppx)', zh: '分辨率单位 (dpi, dpcm, dppx)' },
  flex: { en: 'Flex units for CSS Grid (fr)', zh: 'Grid 弹性单位 (fr)' },
  unitless: { en: 'Unitless numbers (opacity, z-index, etc.)', zh: '无单位数值 (opacity, z-index 等)' },
};
