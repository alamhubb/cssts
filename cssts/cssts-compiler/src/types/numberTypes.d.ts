/**
 * NumberTypes 类型定义（自动生成）
 *
 * 包含所有 CSS 数值类型的名称、category 和 units
 */

import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';
import type { ALL_NUMBER_CATEGORIES, ALL_UNITS } from '../data/numberTypeCategory';

// ==================== NumberTypes 名称 ====================

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// ==================== Number Categories ====================

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

// ==================== Units ====================

export type CssNumberUnitName = typeof ALL_UNITS[number];
