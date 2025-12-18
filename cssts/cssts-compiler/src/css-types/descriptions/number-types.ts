/**
 * 数值类型描述（手动维护）
 * 
 * 提供数值类型的中英文描述，用于文档和智能提示。
 */

import type { NumberTypeName } from '../custom/number-type-mapping';

/** 数值类型描述 */
export const NUMBER_TYPE_DESCRIPTIONS: Record<NumberTypeName, { en: string; zh: string }> = {
  angle: { en: 'An angle value (deg, grad, rad, turn)', zh: '角度值（deg、grad、rad、turn）' },
  flex: { en: 'A flexible length in fr units', zh: '弹性长度（fr 单位）' },
  frequency: { en: 'A frequency value (Hz, kHz)', zh: '频率值（Hz、kHz）' },
  integer: { en: 'A whole number, positive or negative', zh: '整数，正数或负数' },
  length: { en: 'A distance measurement (px, em, rem, vh, vw, etc.)', zh: '距离度量（px、em、rem、vh、vw 等）' },
  number: { en: 'A real number, possibly with a fractional component', zh: '实数，可能带有小数部分' },
  percentage: { en: 'A percentage value (%)', zh: '百分比值（%）' },
  resolution: { en: 'A resolution value (dpi, dpcm, dppx, x)', zh: '分辨率值（dpi、dpcm、dppx、x）' },
  time: { en: 'A time value (s, ms)', zh: '时间值（s、ms）' },
};
