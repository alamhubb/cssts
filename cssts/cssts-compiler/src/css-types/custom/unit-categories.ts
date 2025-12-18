/**
 * CSS 单位分类定义（手动维护）
 * 
 * 将 CSS 单位按照数值范围和步长特性分组，
 * 便于生成合适的数值序列。
 */

// ==================== 类型定义 ====================

/** 单位分类名称 */
export const UNIT_CATEGORY_NAMES = [
  'percentage',
  'pixel',
  'fontRelative',
  'physical',
  'angle',
  'time',
  'frequency',
  'resolution',
  'flex',
  'unitless',
  'zero',
] as const;

export type UnitCategoryName = typeof UNIT_CATEGORY_NAMES[number];

// ==================== 分类到单位的映射 ====================

/** 分类到单位的映射（核心数据） */
export const UNITS_BY_CATEGORY: Record<UnitCategoryName, readonly string[]> = {
  /** 百分比类单位 (0-100, 步长 1) */
  percentage: ['%', 'vw', 'vh', 'vmin', 'vmax', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh', 'vi', 'vb'],
  
  /** 像素类单位 (0-2000+, 渐进步长) */
  pixel: ['px'],
  
  /** 相对字体类单位 (0-10, 步长 0.1-0.25) */
  fontRelative: ['em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh'],
  
  /** 物理长度类单位 (0-50, 步长 0.5-1) */
  physical: ['cm', 'mm', 'in', 'pt', 'pc', 'Q'],
  
  /** 角度类单位 */
  angle: ['deg', 'grad', 'rad', 'turn'],
  
  /** 时间类单位 */
  time: ['s', 'ms'],
  
  /** 频率类单位 (20-20000, 步长 100) */
  frequency: ['Hz', 'kHz'],
  
  /** 分辨率类单位 (72-300, 步长 1) */
  resolution: ['dpi', 'dpcm', 'dppx', 'x'],
  
  /** 弹性类单位 (0-12, 步长 1) */
  flex: ['fr'],
  
  /** 无单位数值 (0-100, 渐进步长) */
  unitless: ['unitless'],
  
  /** 零值（只有 0，无单位） */
  zero: ['zero'],
};

// ==================== 分类描述 ====================

/** 分类描述 */
export const UNIT_CATEGORY_DESCRIPTIONS: Record<UnitCategoryName, { en: string; zh: string }> = {
  percentage: { en: 'Percentage and viewport units (0-100)', zh: '百分比和视口单位 (0-100)' },
  pixel: { en: 'Pixel units (0-2000+, progressive)', zh: '像素单位 (0-2000+, 渐进步长)' },
  fontRelative: { en: 'Font-relative units (0-10)', zh: '相对字体单位 (0-10)' },
  physical: { en: 'Physical length units (0-50)', zh: '物理长度单位 (0-50)' },
  angle: { en: 'Angle units (deg, grad, rad, turn)', zh: '角度单位 (deg, grad, rad, turn)' },
  time: { en: 'Time units (s, ms)', zh: '时间单位 (s, ms)' },
  frequency: { en: 'Frequency units (Hz, kHz)', zh: '频率单位 (Hz, kHz)' },
  resolution: { en: 'Resolution units (dpi, dpcm, dppx)', zh: '分辨率单位 (dpi, dpcm, dppx)' },
  flex: { en: 'Flex units for CSS Grid (fr)', zh: 'Grid 弹性单位 (fr)' },
  unitless: { en: 'Unitless numbers (opacity, z-index, etc.)', zh: '无单位数值 (opacity, z-index 等)' },
  zero: { en: 'Zero value only (0)', zh: '仅零值 (0)' },
};
