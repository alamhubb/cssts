/**
 * CSS 颜色配置（自动生成）
 * 
 * 组合 data/ 中的命名颜色和 custom/ 中的系统颜色。
 */

import { NAMED_COLORS, type NamedColorValue } from '../data/colors';
import { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';

// Re-export
export { NAMED_COLORS, type NamedColorValue } from '../data/colors';
export { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';

/** 所有颜色（命名颜色 + 系统颜色） */
export const ALL_COLORS = [...NAMED_COLORS, ...SYSTEM_COLORS] as const;
export type AllColorValue = NamedColorValue | SystemColorValue;
