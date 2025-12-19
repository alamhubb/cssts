/**
 * CSS Keywords 类型定义（自动生成）
 *
 * 包含所有 keywords 和 colors 的类型定义
 */

import type { keywords } from '../data/keywords';
import type { allKeywords } from '../data/allKeywords';
import type { ALL_COLORS } from '../data/color';

// ==================== Keywords 类型 ====================

export type CssKeywordName = typeof keywords[number];

// ==================== Colors 类型 ====================

export type CssColorName = typeof ALL_COLORS[number];

// ==================== 所有 Keywords 和 Colors 类型 ====================

export type CssAllKeywordName = typeof allKeywords[number];
