/**
 * CSS 单位配置（自动生成）
 */

import { UNITS_BY_CATEGORY, type UnitCategoryName } from '../custom/unit-categories';

// Re-export from custom
export * from '../custom/unit-categories';
export * from '../custom/number-type-mapping';

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

export type UnitType = typeof ALL_UNITS[number];

export const NUMBER_TYPE_UNITS = {
  length: ['Q', 'cap', 'ch', 'cm', 'dvh', 'dvw', 'em', 'ex', 'ic', 'in', 'lh', 'lvh', 'lvw', 'mm', 'pc', 'pt', 'px', 'rem', 'rlh', 'svh', 'svw', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw'],
  angle: ['deg', 'grad', 'rad', 'turn'],
  time: ['ms', 's'],
  frequency: ['Hz', 'kHz'],
  percentage: ['%'],
  number: ['unitless'],
  integer: ['unitless'],
  resolution: ['dpcm', 'dpi', 'dppx', 'x'],
  flex: ['fr'],
} as const;

/**
 * 单位到分类的反向映射（从 UNITS_BY_CATEGORY 自动生成）
 * 
 * 用途：根据单位（如 'px'）快速查找其所属分类（如 'pixel'），
 * 从而获取该分类的步长策略和数值范围配置。
 * 
 * @example
 * CATEGORY_BY_UNIT['px']  // => 'pixel'
 * CATEGORY_BY_UNIT['em']  // => 'fontRelative'
 * CATEGORY_BY_UNIT['deg'] // => 'angle'
 */
export const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = Object.entries(UNITS_BY_CATEGORY)
  .reduce((acc, [category, units]) => {
    units.forEach(unit => { acc[unit] = category as UnitCategoryName; });
    return acc;
  }, {} as Record<string, UnitCategoryName>);
