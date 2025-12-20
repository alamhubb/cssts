/**
 * CSS 数值数据（自动生成）
 * 包含单位、NumberType 和 Category 映射
 */

export const ALL_UNITS = ['Hz', 'Q', 'cap', 'ch', 'cm', 'deg', 'dpcm', 'dpi', 'dppx', 'dvh', 'dvw', 'em', 'ex', 'fr', 'grad', 'ic', 'in', 'kHz', 'lh', 'lvh', 'lvw', 'mm', 'ms', 'pc', 'percent', 'pt', 'px', 'rad', 'rem', 'rlh', 's', 'svh', 'svw', 'turn', 'unitless', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw', 'x'] as const;

export const UNIT_ALIAS_MAP: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

export const NUMBER_TYPE_CATEGORY_MAP = {
  length: ['pixel', 'fontRelative', 'physical', 'percentage'] as const,
  angle: ['angle'] as const,
  time: ['time'] as const,
  frequency: ['frequency'] as const,
  percentage: ['percentage'] as const,
  number: ['unitless'] as const,
  integer: ['unitless'] as const,
  resolution: ['resolution'] as const,
  flex: ['flex'] as const,
  ratio: ['unitless'] as const,
  decibel: ['unitless'] as const,
  semitones: ['unitless'] as const,
} as const;

export const ALL_NUMBER_CATEGORIES = ['angle', 'flex', 'fontRelative', 'frequency', 'percentage', 'physical', 'pixel', 'resolution', 'time', 'unitless'] as const;

export const CATEGORY_UNITS_MAP = {
  percentage: ['percent', 'vw', 'vh', 'vmin', 'vmax', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh', 'vi', 'vb'] as const,
  pixel: ['px'] as const,
  fontRelative: ['em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh'] as const,
  physical: ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] as const,
  angle: ['deg', 'grad', 'rad', 'turn'] as const,
  time: ['s', 'ms'] as const,
  frequency: ['Hz', 'kHz'] as const,
  resolution: ['dpi', 'dpcm', 'dppx', 'x'] as const,
  flex: ['fr'] as const,
  unitless: ['unitless'] as const,
} as const;
