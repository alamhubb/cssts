/**
 * 数值类型映射（兼容层）
 * 从新的数据文件重新导出
 * 
 * 注意：NumberType 层级已移除，现在直接使用 Category
 */

import { ALL_NUMBER_CATEGORIES, CATEGORY_UNITS_MAP } from '../data/cssNumberData';
import { PROPERTY_CATEGORIES_MAP } from '../data/cssPropertyNumber';

// 分类到单位的映射
export const CATEGORY_TO_UNITS = CATEGORY_UNITS_MAP;

// 所有数值分类
export const ALL_CATEGORIES_LIST = ALL_NUMBER_CATEGORIES;

// 属性到分类的映射
export const PROPERTY_TO_CATEGORIES = PROPERTY_CATEGORIES_MAP;

// 类型导出
export type CategoryName = typeof ALL_NUMBER_CATEGORIES[number];
