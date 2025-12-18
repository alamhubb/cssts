/**
 * 单位分类描述（手动维护）
 * 
 * 提供单位分类的中英文描述，用于文档和智能提示。
 */

import type { UnitCategoryName } from '../custom/unit-categories';

/** 单位分类描述 */
export const UNIT_CATEGORY_DESCRIPTIONS: Record<UnitCategoryName, { en: string; zh: string }> = {
  percentage: { en: 'Percentage and viewport units (0-100)', zh: '百分比和视口单位 (0-100)' },
  px: { en: 'Pixel units', zh: '像素单位' },
  fontRelative: { en: 'Font-relative units (0-10)', zh: '相对字体单位 (0-10)' },
  physical: { en: 'Physical length units (0-50)', zh: '物理长度单位 (0-50)' },
  angle: { en: 'Angle units (deg, grad, rad, turn)', zh: '角度单位 (deg, grad, rad, turn)' },
  time: { en: 'Time units (s, ms)', zh: '时间单位 (s, ms)' },
  frequency: { en: 'Frequency units (Hz, kHz)', zh: '频率单位 (Hz, kHz)' },
  resolution: { en: 'Resolution units (dpi, dpcm, dppx)', zh: '分辨率单位 (dpi, dpcm, dppx)' },
  flex: { en: 'Flex units for CSS Grid (fr)', zh: 'Grid 弹性单位 (fr)' },
  unitless: { en: 'Unitless numbers (opacity, z-index, etc.)', zh: '无单位数值 (opacity, z-index 等)' },
};
