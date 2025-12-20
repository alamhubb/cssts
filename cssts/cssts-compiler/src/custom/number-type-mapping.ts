/**
 * 数值类型映射（兼容层）
 * 从新的数据文件重新导出
 */

import { NUMBER_TYPE_CATEGORY_MAP, CATEGORY_UNITS_MAP } from '../data/cssNumberData';
import { ALL_NUMBER_TYPES, PROPERTY_NUMBER_TYPES_MAP } from '../data/cssPropertyNumber';

// 数值类型到分类的映射
export const NUMBER_TYPE_TO_CATEGORIES = NUMBER_TYPE_CATEGORY_MAP;

// 分类到单位的映射
export const CATEGORY_TO_UNITS = CATEGORY_UNITS_MAP;

// 所有数值类型
export const ALL_NUMBER_TYPES_LIST = ALL_NUMBER_TYPES;

// 属性到数值类型的映射
export const PROPERTY_TO_NUMBER_TYPES = PROPERTY_NUMBER_TYPES_MAP;

// 类型导出
export type NumberTypeName = typeof ALL_NUMBER_TYPES[number];
