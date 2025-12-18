/**
 * CSS 单位分类（按步长/范围分组）
 * 手动维护
 */

import type { NumberTypeName } from './unit-types';

// ==================== 单位分类定义 ====================

/** 百分比类单位 (0-100, 步长 1) */
export const PERCENTAGE_CATEGORY_UNITS = [
  '%',
  'vw', 'vh', 'vmin', 'vmax',
  'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh',
  'vi', 'vb',
] as const;

/** 像素类单位 (0-2000+, 渐进步长) */
export const PIXEL_CATEGORY_UNITS = ['px'] as const;

/** 相对字体类单位 (0-10, 步长 0.1-0.25) */
export const FONT_RELATIVE_CATEGORY_UNITS = [
  'em', 'rem',
  'ch', 'ex', 'cap', 'ic',
  'lh', 'rlh',
] as const;

/** 物理长度类单位 (0-50, 步长 0.5-1) */
export const PHYSICAL_CATEGORY_UNITS = ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] as const;

/** 角度类单位 */
export const ANGLE_CATEGORY_UNITS = ['deg', 'grad', 'rad', 'turn'] as const;

/** 时间类单位 */
export const TIME_CATEGORY_UNITS = ['s', 'ms'] as const;

/** 频率类单位 (20-20000, 步长 100) */
export const FREQUENCY_CATEGORY_UNITS = ['Hz', 'kHz'] as const;

/** 分辨率类单位 (72-300, 步长 1) */
export const RESOLUTION_CATEGORY_UNITS = ['dpi', 'dpcm', 'dppx', 'x'] as const;

/** 弹性类单位 (0-12, 步长 1) */
export const FLEX_CATEGORY_UNITS = ['fr'] as const;

/** 无单位数值 (0-100, 渐进步长) */
export const UNITLESS_CATEGORY_UNITS = ['unitless'] as const;

/** 零值（只有 0，无单位） */
export const ZERO_CATEGORY_UNITS = ['zero'] as const;

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
  'zero',
] as const;

export type UnitCategoryName = typeof UNIT_CATEGORY_NAMES[number];

// ==================== 分类映射 ====================

/** 分类到单位的映射 */
export const UNITS_BY_CATEGORY: Record<UnitCategoryName, readonly string[]> = {
  percentage: PERCENTAGE_CATEGORY_UNITS,
  pixel: PIXEL_CATEGORY_UNITS,
  fontRelative: FONT_RELATIVE_CATEGORY_UNITS,
  physical: PHYSICAL_CATEGORY_UNITS,
  angle: ANGLE_CATEGORY_UNITS,
  time: TIME_CATEGORY_UNITS,
  frequency: FREQUENCY_CATEGORY_UNITS,
  resolution: RESOLUTION_CATEGORY_UNITS,
  flex: FLEX_CATEGORY_UNITS,
  unitless: UNITLESS_CATEGORY_UNITS,
  zero: ZERO_CATEGORY_UNITS,
};

/** 单位到分类的映射 */
export const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = {
  // percentage
  '%': 'percentage',
  'vw': 'percentage', 'vh': 'percentage', 'vmin': 'percentage', 'vmax': 'percentage',
  'svw': 'percentage', 'svh': 'percentage', 'lvw': 'percentage', 'lvh': 'percentage',
  'dvw': 'percentage', 'dvh': 'percentage', 'vi': 'percentage', 'vb': 'percentage',
  // pixel
  'px': 'pixel',
  // fontRelative
  'em': 'fontRelative', 'rem': 'fontRelative',
  'ch': 'fontRelative', 'ex': 'fontRelative', 'cap': 'fontRelative', 'ic': 'fontRelative',
  'lh': 'fontRelative', 'rlh': 'fontRelative',
  // physical
  'cm': 'physical', 'mm': 'physical', 'in': 'physical', 'pt': 'physical', 'pc': 'physical', 'Q': 'physical',
  // angle
  'deg': 'angle', 'grad': 'angle', 'rad': 'angle', 'turn': 'angle',
  // time
  's': 'time', 'ms': 'time',
  // frequency
  'Hz': 'frequency', 'kHz': 'frequency',
  // resolution
  'dpi': 'resolution', 'dpcm': 'resolution', 'dppx': 'resolution', 'x': 'resolution',
  // flex
  'fr': 'flex',
  // unitless
  'unitless': 'unitless',
  // zero
  'zero': 'zero',
};


// ==================== 分类描述 ====================

/** 分类描述 */
export const UNIT_CATEGORY_DESCRIPTIONS: Record<UnitCategoryName, { en: string; zh: string }> = {
  percentage: {
    en: 'Percentage and viewport units (0-100)',
    zh: '百分比和视口单位 (0-100)',
  },
  pixel: {
    en: 'Pixel units (0-2000+, progressive)',
    zh: '像素单位 (0-2000+, 渐进步长)',
  },
  fontRelative: {
    en: 'Font-relative units (0-10)',
    zh: '相对字体单位 (0-10)',
  },
  physical: {
    en: 'Physical length units (0-50)',
    zh: '物理长度单位 (0-50)',
  },
  angle: {
    en: 'Angle units (deg, grad, rad, turn)',
    zh: '角度单位 (deg, grad, rad, turn)',
  },
  time: {
    en: 'Time units (s, ms)',
    zh: '时间单位 (s, ms)',
  },
  frequency: {
    en: 'Frequency units (Hz, kHz)',
    zh: '频率单位 (Hz, kHz)',
  },
  resolution: {
    en: 'Resolution units (dpi, dpcm, dppx)',
    zh: '分辨率单位 (dpi, dpcm, dppx)',
  },
  flex: {
    en: 'Flex units for CSS Grid (fr)',
    zh: 'Grid 弹性单位 (fr)',
  },
  unitless: {
    en: 'Unitless numbers (opacity, z-index, etc.)',
    zh: '无单位数值 (opacity, z-index 等)',
  },
  zero: {
    en: 'Zero value only (0)',
    zh: '仅零值 (0)',
  },
};

// ==================== 工具函数 ====================

/**
 * 获取单位所属分类
 */
export function getUnitCategory(unit: string): UnitCategoryName | undefined {
  return CATEGORY_BY_UNIT[unit];
}

/**
 * 获取分类下的所有单位
 */
export function getUnitsInCategory(category: UnitCategoryName): readonly string[] {
  return UNITS_BY_CATEGORY[category];
}

/**
 * 判断单位是否属于某分类
 */
export function isUnitInCategory(unit: string, category: UnitCategoryName): boolean {
  return CATEGORY_BY_UNIT[unit] === category;
}
