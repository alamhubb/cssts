/**
 * CSS 单位类型定义
 * 自动生成，请勿手动修改
 */

// ==================== 数值类型名称 ====================

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

/** 数值类型名称联合 */
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

// ==================== 单位定义 ====================

/** 所有单位 */
export const ALL_UNITS = [
  '%',
  'Hz',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'grad',
  'ic',
  'in',
  'kHz',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'ms',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  's',
  'svh',
  'svw',
  'turn',
  'unitless',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** 单位类型 */
export type UnitType = typeof ALL_UNITS[number];

// ==================== 数值类型到单位映射 ====================

/** 角度单位 */
export const ANGLE_UNITS = ['deg', 'grad', 'rad', 'turn'] as const;

/** 弹性单位 */
export const FLEX_UNITS = ['fr'] as const;

/** 频率单位 */
export const FREQUENCY_UNITS = ['Hz', 'kHz'] as const;

/** 整数单位（无单位） */
export const INTEGER_UNITS = ['unitless'] as const;

/** 长度单位 */
export const LENGTH_UNITS = [
  'Q', 'cap', 'ch', 'cm', 'dvh', 'dvw', 'em', 'ex', 'ic', 'in',
  'lh', 'lvh', 'lvw', 'mm', 'pc', 'pt', 'px', 'rem', 'rlh',
  'svh', 'svw', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw',
] as const;

/** 数值单位（无单位） */
export const NUMBER_UNITS = ['unitless'] as const;

/** 百分比单位 */
export const PERCENTAGE_UNITS = ['%'] as const;

/** 分辨率单位 */
export const RESOLUTION_UNITS = ['dpcm', 'dpi', 'dppx', 'x'] as const;

/** 时间单位 */
export const TIME_UNITS = ['ms', 's'] as const;

/** 数值类型到单位的映射 */
export const NUMBER_TYPE_UNITS: Record<NumberTypeName, readonly string[]> = {
  angle: ANGLE_UNITS,
  flex: FLEX_UNITS,
  frequency: FREQUENCY_UNITS,
  integer: INTEGER_UNITS,
  length: LENGTH_UNITS,
  number: NUMBER_UNITS,
  percentage: PERCENTAGE_UNITS,
  resolution: RESOLUTION_UNITS,
  time: TIME_UNITS,
};

/**
 * 根据数值类型获取支持的单位
 */
export function getUnitsForNumberType(numberType: NumberTypeName): readonly string[] {
  return NUMBER_TYPE_UNITS[numberType] || [];
}

/**
 * 根据多个数值类型获取所有支持的单位
 */
export function getUnitsForNumberTypes(numberTypes: NumberTypeName[]): string[] {
  const units = new Set<string>();
  for (const nt of numberTypes) {
    const ntUnits = NUMBER_TYPE_UNITS[nt];
    if (ntUnits) {
      ntUnits.forEach(u => units.add(u));
    }
  }
  return Array.from(units);
}
