/**
 * 单位分类（兼容层）
 * 从新的数据文件重新导出
 */

import { ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP } from '../data/cssNumberData';

// 所有单位分类
export const UNIT_CATEGORIES = ALL_NUMBER_CATEGORIES;

// 分类到单位的映射
export const CATEGORY_UNITS = CATEGORY_UNITS_MAP;

// 类型导出
export type UnitCategoryName = typeof ALL_NUMBER_CATEGORIES[number];
