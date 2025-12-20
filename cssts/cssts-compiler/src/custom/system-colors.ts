/**
 * 系统颜色（兼容层）
 * 从新的数据文件重新导出
 */

import { ALL_COLORS } from '../data/cssColorData';

// 系统颜色（大写开头的颜色）
export const SYSTEM_COLORS = ALL_COLORS.filter(c => /^[A-Z]/.test(c));

// 类型导出
export type SystemColorName = typeof SYSTEM_COLORS[number];
