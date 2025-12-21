/**
 * 数值分类描述（手动维护）
 * 
 * 提供数值分类的中英文描述，用于文档和智能提示。
 */

import type { CategoryName } from '../custom/number-type-mapping';

/** 数值分类描述 */
export const CATEGORY_DESCRIPTIONS: Record<CategoryName, { en: string; zh: string }> = {
  angle: { en: 'Angle units (deg, grad, rad, turn)', zh: '角度单位（deg、grad、rad、turn）' },
  flex: { en: 'Flexible length in fr units', zh: '弹性长度（fr 单位）' },
  fontRelative: { en: 'Font-relative units (em, rem, ch, ex, etc.)', zh: '字体相对单位（em、rem、ch、ex 等）' },
  frequency: { en: 'Frequency units (Hz, kHz)', zh: '频率单位（Hz、kHz）' },
  percentage: { en: 'Percentage and viewport units (%, vw, vh, etc.)', zh: '百分比和视口单位（%、vw、vh 等）' },
  physical: { en: 'Physical units (cm, mm, in, pt, pc)', zh: '物理单位（cm、mm、in、pt、pc）' },
  pixel: { en: 'Pixel unit (px)', zh: '像素单位（px）' },
  resolution: { en: 'Resolution units (dpi, dpcm, dppx, x)', zh: '分辨率单位（dpi、dpcm、dppx、x）' },
  time: { en: 'Time units (s, ms)', zh: '时间单位（s、ms）' },
  unitless: { en: 'Unitless numbers', zh: '无单位数值' },
};
