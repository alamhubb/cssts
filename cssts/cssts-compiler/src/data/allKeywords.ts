/**
 * 所有 CSS Keywords 和 Colors（自动生成）
 */

import { keywords } from './keywords';
import { ALL_COLORS } from './color';

export const allKeywords = [...keywords, ...ALL_COLORS] as const;

export { keywords, ALL_COLORS };
