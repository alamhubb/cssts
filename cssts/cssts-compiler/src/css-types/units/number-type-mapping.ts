/**
 * NumberType → UnitCategory → Units 映射
 * 
 * 这是核心映射文件，定义了：
 * - numberType 到 unitCategory 的映射
 * - 提供链式查询函数
 */

import type { NumberTypeName } from './unit-types';
import { UNITS_BY_CATEGORY, type UnitCategoryName } from './unit-categories';

// ==================== NumberType 到 UnitCategory 映射 ====================

/**
 * NumberType 到 UnitCategory 的映射
 * 
 * 映射关系：
 * - length 包含多个 unitCategory: pixel, fontRelative, physical, percentage (viewport units)
 * - 其他 numberType 基本一一对应
 */
export const NUMBER_TYPE_TO_CATEGORIES: Record<NumberTypeName, UnitCategoryName[]> = {
  length: ['pixel', 'fontRelative', 'physical', 'percentage'],  // length 包含多种单位分类
  angle: ['angle'],
  time: ['time'],
  frequency: ['frequency'],
  percentage: ['percentage'],
  number: ['unitless'],
  integer: ['unitless'],
  resolution: ['resolution'],
  flex: ['flex'],
};

// ==================== 链式查询函数 ====================

/**
 * 根据 numberTypes 获取对应的 unitCategories
 * 
 * @example
 * getUnitCategoriesFromNumberTypes(['length', 'percentage'])
 * // => ['pixel', 'fontRelative', 'physical', 'percentage']
 */
export function getUnitCategoriesFromNumberTypes(numberTypes: NumberTypeName[]): UnitCategoryName[] {
  const categories = new Set<UnitCategoryName>();
  for (const nt of numberTypes) {
    const cats = NUMBER_TYPE_TO_CATEGORIES[nt];
    if (cats) {
      cats.forEach(c => categories.add(c));
    }
  }
  return Array.from(categories);
}

/**
 * 根据 unitCategories 获取对应的 units
 * 
 * @example
 * getUnitsFromCategories(['pixel', 'fontRelative'])
 * // => ['px', 'em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh']
 */
export function getUnitsFromCategories(categories: UnitCategoryName[]): string[] {
  const units = new Set<string>();
  for (const cat of categories) {
    const catUnits = UNITS_BY_CATEGORY[cat];
    if (catUnits) {
      catUnits.forEach(u => units.add(u));
    }
  }
  return Array.from(units);
}

/**
 * 根据 numberTypes 直接获取 units（链式查询）
 * 
 * @example
 * getUnitsFromNumberTypes(['length', 'percentage'])
 * // => ['px', 'em', 'rem', '%', 'vw', 'vh', ...]
 */
export function getUnitsFromNumberTypes(numberTypes: NumberTypeName[]): string[] {
  const categories = getUnitCategoriesFromNumberTypes(numberTypes);
  return getUnitsFromCategories(categories);
}

/**
 * 获取单个 numberType 对应的 unitCategories
 */
export function getCategoriesForNumberType(numberType: NumberTypeName): UnitCategoryName[] {
  return NUMBER_TYPE_TO_CATEGORIES[numberType] || [];
}

/**
 * 获取单个 numberType 对应的 units
 */
export function getUnitsForNumberType(numberType: NumberTypeName): string[] {
  const categories = getCategoriesForNumberType(numberType);
  return getUnitsFromCategories(categories);
}
