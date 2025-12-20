/**
 * NumberType 和 Category 映射（自动生成）
 */

import { UNIT_HZ, UNIT_Q, UNIT_CAP, UNIT_CH, UNIT_CM, UNIT_DEG, UNIT_DPCM, UNIT_DPI, UNIT_DPPX, UNIT_DVH, UNIT_DVW, UNIT_EM, UNIT_EX, UNIT_FR, UNIT_GRAD, UNIT_IC, UNIT_IN, UNIT_KHZ, UNIT_LH, UNIT_LVH, UNIT_LVW, UNIT_MM, UNIT_MS, UNIT_PC, UNIT_PERCENT, UNIT_PT, UNIT_PX, UNIT_RAD, UNIT_REM, UNIT_RLH, UNIT_S, UNIT_SVH, UNIT_SVW, UNIT_TURN, UNIT_UNITLESS, UNIT_VB, UNIT_VH, UNIT_VI, UNIT_VMAX, UNIT_VMIN, UNIT_VW, UNIT_X } from './units';

// ==================== NumberType 到 Category 映射 ====================

export const LENGTH_CATEGORIES = ['pixel', 'fontRelative', 'physical', 'percentage'] as const;
export const ANGLE_CATEGORIES = ['angle'] as const;
export const TIME_CATEGORIES = ['time'] as const;
export const FREQUENCY_CATEGORIES = ['frequency'] as const;
export const PERCENTAGE_CATEGORIES = ['percentage'] as const;
export const NUMBER_CATEGORIES = ['unitless'] as const;
export const INTEGER_CATEGORIES = ['unitless'] as const;
export const RESOLUTION_CATEGORIES = ['resolution'] as const;
export const FLEX_CATEGORIES = ['flex'] as const;
export const RATIO_CATEGORIES = ['unitless'] as const;
export const DECIBEL_CATEGORIES = ['unitless'] as const;
export const SEMITONES_CATEGORIES = ['unitless'] as const;

export const NUMBER_TYPE_CATEGORY_MAP: Record<string, readonly string[]> = {
  'length': LENGTH_CATEGORIES,
  'angle': ANGLE_CATEGORIES,
  'time': TIME_CATEGORIES,
  'frequency': FREQUENCY_CATEGORIES,
  'percentage': PERCENTAGE_CATEGORIES,
  'number': NUMBER_CATEGORIES,
  'integer': INTEGER_CATEGORIES,
  'resolution': RESOLUTION_CATEGORIES,
  'flex': FLEX_CATEGORIES,
  'ratio': RATIO_CATEGORIES,
  'decibel': DECIBEL_CATEGORIES,
  'semitones': SEMITONES_CATEGORIES,
};

export const ALL_NUMBER_CATEGORIES = [
  'angle',
  'flex',
  'fontRelative',
  'frequency',
  'percentage',
  'physical',
  'pixel',
  'resolution',
  'time',
  'unitless',
] as const;

export const CATEGORY_UNITS_MAP: Record<string, readonly string[]> = {
  'percentage': [UNIT_PERCENT, UNIT_VW, UNIT_VH, UNIT_VMIN, UNIT_VMAX, UNIT_SVW, UNIT_SVH, UNIT_LVW, UNIT_LVH, UNIT_DVW, UNIT_DVH, UNIT_VI, UNIT_VB],
  'pixel': [UNIT_PX],
  'fontRelative': [UNIT_EM, UNIT_REM, UNIT_CH, UNIT_EX, UNIT_CAP, UNIT_IC, UNIT_LH, UNIT_RLH],
  'physical': [UNIT_CM, UNIT_MM, UNIT_IN, UNIT_PT, UNIT_PC, UNIT_Q],
  'angle': [UNIT_DEG, UNIT_GRAD, UNIT_RAD, UNIT_TURN],
  'time': [UNIT_S, UNIT_MS],
  'frequency': [UNIT_HZ, UNIT_KHZ],
  'resolution': [UNIT_DPI, UNIT_DPCM, UNIT_DPPX, UNIT_X],
  'flex': [UNIT_FR],
  'unitless': [UNIT_UNITLESS],
};
