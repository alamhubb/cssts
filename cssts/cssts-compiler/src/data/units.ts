/**
 * CSS 单位列表（从 csstree 提取）
 * 
 * 这是 CSS 标准定义的单位列表。
 */

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
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

export type UnitType = typeof ALL_UNITS[number];
