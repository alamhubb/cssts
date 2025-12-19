/**
 * 所有 CSS Keywords 和 Colors（自动生成）
 *
 * 组合 keywords 和 colors
 */

import { keywords } from './keywords';
import { ALL_COLORS } from './color';

// ==================== 所有 Keywords 和 Colors ====================

export const allKeywords = [...keywords, ...ALL_COLORS] as const;

export { keywords, ALL_COLORS };
