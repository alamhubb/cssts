/**
 * CSS Types 工具函数
 * 
 * 基于 data/ 中的数据提供查询和转换功能
 */

import { ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP, NUMBER_TYPE_CATEGORY_MAP } from './data/cssNumberData';
import { ALL_NUMBER_TYPES } from './data/cssPropertyNumber';

// 类型定义
export type UnitCategoryName = typeof ALL_NUMBER_CATEGORIES[number];
export type NumberTypeName = typeof ALL_NUMBER_TYPES[number];

// 构建反向映射：单位 -> 分类
const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = {};
for (const [category, units] of Object.entries(CATEGORY_UNITS_MAP)) {
  for (const unit of units) {
    CATEGORY_BY_UNIT[unit] = category as UnitCategoryName;
  }
}

// ==================== 单位分类查询 ====================

/** 获取单位所属分类 */
export function getUnitCategory(unit: string): UnitCategoryName | undefined {
  return CATEGORY_BY_UNIT[unit];
}

/** 获取分类下的所有单位 */
export function getUnitsInCategory(category: UnitCategoryName): readonly string[] {
  return CATEGORY_UNITS_MAP[category] || [];
}

/** 判断单位是否属于某分类 */
export function isUnitInCategory(unit: string, category: UnitCategoryName): boolean {
  return CATEGORY_BY_UNIT[unit] === category;
}

// ==================== NumberType 链式查询 ====================

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
    const cats = NUMBER_TYPE_CATEGORY_MAP[nt as keyof typeof NUMBER_TYPE_CATEGORY_MAP];
    if (cats) cats.forEach(c => categories.add(c as UnitCategoryName));
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
    const catUnits = CATEGORY_UNITS_MAP[cat];
    if (catUnits) catUnits.forEach(u => units.add(u));
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

/** 获取单个 numberType 对应的 unitCategories */
export function getCategoriesForNumberType(numberType: NumberTypeName): UnitCategoryName[] {
  return [...(numberTypeToCategories[numberType] || [])];
}

/** 获取单个 numberType 对应的 units */
export function getUnitsForNumberType(numberType: NumberTypeName): string[] {
  const categories = getCategoriesForNumberType(numberType);
  return getUnitsFromCategories(categories);
}
