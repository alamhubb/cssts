/**
 * CSS 数值数据（自动生成）
 * 包含单位常量、别名、NumberType 和 Category 映射
 */

// ==================== Units 常量 ====================

export const UNIT_HZ = 'Hz' as const;
export const UNIT_Q = 'Q' as const;
export const UNIT_CAP = 'cap' as const;
export const UNIT_CH = 'ch' as const;
export const UNIT_CM = 'cm' as const;
export const UNIT_DEG = 'deg' as const;
export const UNIT_DPCM = 'dpcm' as const;
export const UNIT_DPI = 'dpi' as const;
export const UNIT_DPPX = 'dppx' as const;
export const UNIT_DVH = 'dvh' as const;
export const UNIT_DVW = 'dvw' as const;
export const UNIT_EM = 'em' as const;
export const UNIT_EX = 'ex' as const;
export const UNIT_FR = 'fr' as const;
export const UNIT_GRAD = 'grad' as const;
export const UNIT_IC = 'ic' as const;
export const UNIT_IN = 'in' as const;
export const UNIT_KHZ = 'kHz' as const;
export const UNIT_LH = 'lh' as const;
export const UNIT_LVH = 'lvh' as const;
export const UNIT_LVW = 'lvw' as const;
export const UNIT_MM = 'mm' as const;
export const UNIT_MS = 'ms' as const;
export const UNIT_PC = 'pc' as const;
export const UNIT_PERCENT = 'percent' as const;
export const UNIT_PT = 'pt' as const;
export const UNIT_PX = 'px' as const;
export const UNIT_RAD = 'rad' as const;
export const UNIT_REM = 'rem' as const;
export const UNIT_RLH = 'rlh' as const;
export const UNIT_S = 's' as const;
export const UNIT_SVH = 'svh' as const;
export const UNIT_SVW = 'svw' as const;
export const UNIT_TURN = 'turn' as const;
export const UNIT_UNITLESS = 'unitless' as const;
export const UNIT_VB = 'vb' as const;
export const UNIT_VH = 'vh' as const;
export const UNIT_VI = 'vi' as const;
export const UNIT_VMAX = 'vmax' as const;
export const UNIT_VMIN = 'vmin' as const;
export const UNIT_VW = 'vw' as const;
export const UNIT_X = 'x' as const;

export const ALL_UNITS = [UNIT_HZ, UNIT_Q, UNIT_CAP, UNIT_CH, UNIT_CM, UNIT_DEG, UNIT_DPCM, UNIT_DPI, UNIT_DPPX, UNIT_DVH, UNIT_DVW, UNIT_EM, UNIT_EX, UNIT_FR, UNIT_GRAD, UNIT_IC, UNIT_IN, UNIT_KHZ, UNIT_LH, UNIT_LVH, UNIT_LVW, UNIT_MM, UNIT_MS, UNIT_PC, UNIT_PERCENT, UNIT_PT, UNIT_PX, UNIT_RAD, UNIT_REM, UNIT_RLH, UNIT_S, UNIT_SVH, UNIT_SVW, UNIT_TURN, UNIT_UNITLESS, UNIT_VB, UNIT_VH, UNIT_VI, UNIT_VMAX, UNIT_VMIN, UNIT_VW, UNIT_X] as const;

export const UNIT_ALIAS_MAP: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

export function resolveUnitAlias(alias: string): string {
  return UNIT_ALIAS_MAP[alias] ?? alias;
}

// ==================== NumberType 到 Category 映射 ====================

export const LENGTH_CATEGORIES = ['pixel', 'fontRelative', 'physical', 'percentage'] as const;
export const ANGLE_CATEGORIES = ['angle'] as const;
export const TIME_CATEGORIES = ['time'] as const;
export const FREQUENCY_CATEGORIES = ['frequency'] as const;
export const PERCENTAGE_CATEGORIES = ['percentage'] as const;
export const NUMBER_CATEGORIES = ['unitless'] as const;
export const INTEGER_CATEGORIES = ['unitless'] as const;
export const RESOLUTION_CATEGORIES = ['resolution'] as const;
export const FLEX_CATEGORIES = ['flex'] as const;
export const RATIO_CATEGORIES = ['unitless'] as const;
export const DECIBEL_CATEGORIES = ['unitless'] as const;
export const SEMITONES_CATEGORIES = ['unitless'] as const;

// ==================== NumberType Category 类型 ====================

export type CssLengthCategoryName = typeof LENGTH_CATEGORIES[number];
export type CssAngleCategoryName = typeof ANGLE_CATEGORIES[number];
export type CssTimeCategoryName = typeof TIME_CATEGORIES[number];
export type CssFrequencyCategoryName = typeof FREQUENCY_CATEGORIES[number];
export type CssPercentageCategoryName = typeof PERCENTAGE_CATEGORIES[number];
export type CssNumberCategoryName = typeof NUMBER_CATEGORIES[number];
export type CssIntegerCategoryName = typeof INTEGER_CATEGORIES[number];
export type CssResolutionCategoryName = typeof RESOLUTION_CATEGORIES[number];
export type CssFlexCategoryName = typeof FLEX_CATEGORIES[number];
export type CssRatioCategoryName = typeof RATIO_CATEGORIES[number];
export type CssDecibelCategoryName = typeof DECIBEL_CATEGORIES[number];
export type CssSemitonesCategoryName = typeof SEMITONES_CATEGORIES[number];

export const NUMBER_TYPE_CATEGORY_MAP: Record<string, readonly string[]> = {
  'length': LENGTH_CATEGORIES,
  'angle': ANGLE_CATEGORIES,
  'time': TIME_CATEGORIES,
  'frequency': FREQUENCY_CATEGORIES,
  'percentage': PERCENTAGE_CATEGORIES,
  'number': NUMBER_CATEGORIES,
  'integer': INTEGER_CATEGORIES,
  'resolution': RESOLUTION_CATEGORIES,
  'flex': FLEX_CATEGORIES,
  'ratio': RATIO_CATEGORIES,
  'decibel': DECIBEL_CATEGORIES,
  'semitones': SEMITONES_CATEGORIES,
};

export const ALL_NUMBER_CATEGORIES = [
  'angle',
  'flex',
  'fontRelative',
  'frequency',
  'percentage',
  'physical',
  'pixel',
  'resolution',
  'time',
  'unitless',
] as const;

// ==================== Category 到 Units 映射 ====================

export const PERCENTAGE_UNITS = [UNIT_PERCENT, UNIT_VW, UNIT_VH, UNIT_VMIN, UNIT_VMAX, UNIT_SVW, UNIT_SVH, UNIT_LVW, UNIT_LVH, UNIT_DVW, UNIT_DVH, UNIT_VI, UNIT_VB] as const;
export const PIXEL_UNITS = [UNIT_PX] as const;
export const FONTRELATIVE_UNITS = [UNIT_EM, UNIT_REM, UNIT_CH, UNIT_EX, UNIT_CAP, UNIT_IC, UNIT_LH, UNIT_RLH] as const;
export const PHYSICAL_UNITS = [UNIT_CM, UNIT_MM, UNIT_IN, UNIT_PT, UNIT_PC, UNIT_Q] as const;
export const ANGLE_UNITS = [UNIT_DEG, UNIT_GRAD, UNIT_RAD, UNIT_TURN] as const;
export const TIME_UNITS = [UNIT_S, UNIT_MS] as const;
export const FREQUENCY_UNITS = [UNIT_HZ, UNIT_KHZ] as const;
export const RESOLUTION_UNITS = [UNIT_DPI, UNIT_DPCM, UNIT_DPPX, UNIT_X] as const;
export const FLEX_UNITS = [UNIT_FR] as const;
export const UNITLESS_UNITS = [UNIT_UNITLESS] as const;

// ==================== Category Unit 类型 ====================

export type CssPercentageUnitName = typeof PERCENTAGE_UNITS[number];
export type CssPixelUnitName = typeof PIXEL_UNITS[number];
export type CssFontRelativeUnitName = typeof FONTRELATIVE_UNITS[number];
export type CssPhysicalUnitName = typeof PHYSICAL_UNITS[number];
export type CssAngleUnitName = typeof ANGLE_UNITS[number];
export type CssTimeUnitName = typeof TIME_UNITS[number];
export type CssFrequencyUnitName = typeof FREQUENCY_UNITS[number];
export type CssResolutionUnitName = typeof RESOLUTION_UNITS[number];
export type CssFlexUnitName = typeof FLEX_UNITS[number];
export type CssUnitlessUnitName = typeof UNITLESS_UNITS[number];

export const CATEGORY_UNITS_MAP = {
  'percentage': PERCENTAGE_UNITS,
  'pixel': PIXEL_UNITS,
  'fontRelative': FONTRELATIVE_UNITS,
  'physical': PHYSICAL_UNITS,
  'angle': ANGLE_UNITS,
  'time': TIME_UNITS,
  'frequency': FREQUENCY_UNITS,
  'resolution': RESOLUTION_UNITS,
  'flex': FLEX_UNITS,
  'unitless': UNITLESS_UNITS,
} as const;
