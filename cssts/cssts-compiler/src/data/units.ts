/**
 * CSS 单位常量（自动生成）
 *
 * 包含：
 * - 所有 CSS 单位的常量定义
 * - ALL_UNITS 数组
 * - 单位别名映射（用于运行时转换用户输入）
 */

// ==================== 所有 Units 常量 ====================

export const UNIT_HZ = 'Hz' as const;
export const UNIT_Q = 'Q' as const;
export const UNIT_CAP = 'cap' as const;
export const UNIT_CH = 'ch' as const;
export const UNIT_CM = 'cm' as const;
export const UNIT_DEG = 'deg' as const;
export const UNIT_DPCM = 'dpcm' as const;
export const UNIT_DPI = 'dpi' as const;
export const UNIT_DPPX = 'dppx' as const;
export const UNIT_DVH = 'dvh' as const;
export const UNIT_DVW = 'dvw' as const;
export const UNIT_EM = 'em' as const;
export const UNIT_EX = 'ex' as const;
export const UNIT_FR = 'fr' as const;
export const UNIT_GRAD = 'grad' as const;
export const UNIT_IC = 'ic' as const;
export const UNIT_IN = 'in' as const;
export const UNIT_KHZ = 'kHz' as const;
export const UNIT_LH = 'lh' as const;
export const UNIT_LVH = 'lvh' as const;
export const UNIT_LVW = 'lvw' as const;
export const UNIT_MM = 'mm' as const;
export const UNIT_MS = 'ms' as const;
export const UNIT_PC = 'pc' as const;
export const UNIT_PERCENT = 'percent' as const;
export const UNIT_PT = 'pt' as const;
export const UNIT_PX = 'px' as const;
export const UNIT_RAD = 'rad' as const;
export const UNIT_REM = 'rem' as const;
export const UNIT_RLH = 'rlh' as const;
export const UNIT_S = 's' as const;
export const UNIT_SVH = 'svh' as const;
export const UNIT_SVW = 'svw' as const;
export const UNIT_TURN = 'turn' as const;
export const UNIT_UNITLESS = 'unitless' as const;
export const UNIT_VB = 'vb' as const;
export const UNIT_VH = 'vh' as const;
export const UNIT_VI = 'vi' as const;
export const UNIT_VMAX = 'vmax' as const;
export const UNIT_VMIN = 'vmin' as const;
export const UNIT_VW = 'vw' as const;
export const UNIT_X = 'x' as const;

// ==================== 所有 Units 数组 ====================

export const ALL_UNITS = [UNIT_HZ, UNIT_Q, UNIT_CAP, UNIT_CH, UNIT_CM, UNIT_DEG, UNIT_DPCM, UNIT_DPI, UNIT_DPPX, UNIT_DVH, UNIT_DVW, UNIT_EM, UNIT_EX, UNIT_FR, UNIT_GRAD, UNIT_IC, UNIT_IN, UNIT_KHZ, UNIT_LH, UNIT_LVH, UNIT_LVW, UNIT_MM, UNIT_MS, UNIT_PC, UNIT_PERCENT, UNIT_PT, UNIT_PX, UNIT_RAD, UNIT_REM, UNIT_RLH, UNIT_S, UNIT_SVH, UNIT_SVW, UNIT_TURN, UNIT_UNITLESS, UNIT_VB, UNIT_VH, UNIT_VI, UNIT_VMAX, UNIT_VMIN, UNIT_VW, UNIT_X] as const;

// ==================== 单位别名映射 ====================

/**
 * 单位别名映射表
 * key: 用户输入的别名
 * value: 实际的单位名称
 */
export const UNIT_ALIAS_MAP: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

/**
 * 根据别名获取实际单位
 * @param alias 用户输入的别名
 * @returns 实际的单位名称，如果没有别名则返回原值
 */
export function resolveUnitAlias(alias: string): string {
  return UNIT_ALIAS_MAP[alias] ?? alias;
}
