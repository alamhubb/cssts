/**
 * 鍗曚綅鍒嗙被鎻忚堪锛堟墜鍔ㄧ淮鎶わ級
 * 
 * 鎻愪緵鍗曚綅鍒嗙被鐨勪腑鑻辨枃鎻忚堪锛岀敤浜庢枃妗ｅ拰鏅鸿兘鎻愮ず銆?
 */

import type { UnitCategoryName } from '../custom/unit-categories';

/** 鍗曚綅鍒嗙被鎻忚堪 */
export const UNIT_CATEGORY_DESCRIPTIONS: Record<UnitCategoryName, { en: string; zh: string }> = {
  percentage: { en: 'Percentage and viewport units (0-100)', zh: '鐧惧垎姣斿拰瑙嗗彛鍗曚綅 (0-100)' },
  pixel: { en: 'Pixel units', zh: '鍍忕礌鍗曚綅' },
  fontRelative: { en: 'Font-relative units (0-10)', zh: '鐩稿瀛椾綋鍗曚綅 (0-10)' },
  physical: { en: 'Physical length units (0-50)', zh: '鐗╃悊闀垮害鍗曚綅 (0-50)' },
  angle: { en: 'Angle units (deg, grad, rad, turn)', zh: '瑙掑害鍗曚綅 (deg, grad, rad, turn)' },
  time: { en: 'Time units (s, ms)', zh: '鏃堕棿鍗曚綅 (s, ms)' },
  frequency: { en: 'Frequency units (Hz, kHz)', zh: '棰戠巼鍗曚綅 (Hz, kHz)' },
  resolution: { en: 'Resolution units (dpi, dpcm, dppx)', zh: '鍒嗚鲸鐜囧崟浣?(dpi, dpcm, dppx)' },
  flex: { en: 'Flex units for CSS Grid (fr)', zh: 'Grid 寮规€у崟浣?(fr)' },
  unitless: { en: 'Unitless numbers (opacity, z-index, etc.)', zh: '鏃犲崟浣嶆暟鍊?(opacity, z-index 绛?' },
};
