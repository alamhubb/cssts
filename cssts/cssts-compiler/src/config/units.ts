/**
 * CSS 单位配置（自动生成）
 * 
 * 组合 data/ 中的单位列表和 custom/ 中的分类映射。
 */

import { unitsByCategory, type UnitCategoryName } from '../custom/unit-categories';

// Re-export from data
export { ALL_UNITS, type UnitType } from '../data/units';

// Re-export from custom
export * from '../custom/unit-categories';
export * from '../custom/number-type-mapping';

// Re-export from descriptions
export { UNIT_CATEGORY_DESCRIPTIONS } from '../descriptions/units';
export { NUMBER_TYPE_DESCRIPTIONS } from '../descriptions/number-types';

/** NumberType 到 Units 的映射 */
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
 * 单位到分类的反向映射（从 unitsByCategory 自动生成）
 * 
 * 用途：根据单位（如 'px'）快速查找其所属分类（如 'px'），
 * 从而获取该分类的步长策略和数值范围配置。
 * 
 * @example
 * CATEGORY_BY_UNIT['px']  // => 'px'
 * CATEGORY_BY_UNIT['em']  // => 'fontRelative'
 * CATEGORY_BY_UNIT['deg'] // => 'angle'
 */
export const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = Object.entries(unitsByCategory)
  .reduce((acc, [category, units]) => {
    (units as readonly string[]).forEach(unit => { acc[unit] = category as UnitCategoryName; });
    return acc;
  }, {} as Record<string, UnitCategoryName>);
