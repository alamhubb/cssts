/**
 * CSS 鍗曚綅鍒嗙被瀹氫箟锛堟墜鍔ㄧ淮鎶わ級
 * 
 * 灏?CSS 鍗曚綅鎸夌収鏁板€艰寖鍥村拰姝ラ暱鐗规€у垎缁勶紝
 * 渚夸簬鐢熸垚鍚堥€傜殑鏁板€煎簭鍒椼€?
 */

// ==================== 姣忎釜鍒嗙被鐨勫崟浣嶆暟鎹?====================

/** 鐧惧垎姣旂被鍗曚綅 (0-100, 姝ラ暱 1) */
export const PERCENTAGE_UNITS = ['%', 'vw', 'vh', 'vmin', 'vmax', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh', 'vi', 'vb'] as const;
export type PercentageUnit = typeof PERCENTAGE_UNITS[number];

/** px 鍗曚綅 */
export const PX_UNITS = ['px'] as const;
export type PxUnit = typeof PX_UNITS[number];

/** 鐩稿瀛椾綋绫诲崟浣?(0-10, 姝ラ暱 0.1-0.25) */
export const FONT_RELATIVE_UNITS = ['em', 'rem', 'ch', 'ex', 'cap', 'ic', 'lh', 'rlh'] as const;
export type FontRelativeUnit = typeof FONT_RELATIVE_UNITS[number];

/** 鐗╃悊闀垮害绫诲崟浣?(0-50, 姝ラ暱 0.5-1) */
export const PHYSICAL_UNITS = ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] as const;
export type PhysicalUnit = typeof PHYSICAL_UNITS[number];

/** 瑙掑害绫诲崟浣?*/
export const ANGLE_UNITS = ['deg', 'grad', 'rad', 'turn'] as const;
export type AngleUnit = typeof ANGLE_UNITS[number];

/** 鏃堕棿绫诲崟浣?*/
export const TIME_UNITS = ['s', 'ms'] as const;
export type TimeUnit = typeof TIME_UNITS[number];

/** 棰戠巼绫诲崟浣?(20-20000, 姝ラ暱 100) */
export const FREQUENCY_UNITS = ['Hz', 'kHz'] as const;
export type FrequencyUnit = typeof FREQUENCY_UNITS[number];

/** 鍒嗚鲸鐜囩被鍗曚綅 (72-300, 姝ラ暱 1) */
export const RESOLUTION_UNITS = ['dpi', 'dpcm', 'dppx', 'x'] as const;
export type ResolutionUnit = typeof RESOLUTION_UNITS[number];

/** 寮规€х被鍗曚綅 (0-12, 姝ラ暱 1) */
export const FLEX_UNITS = ['fr'] as const;
export type FlexUnit = typeof FLEX_UNITS[number];

/** 鏃犲崟浣嶆暟鍊?(0-100, 娓愯繘姝ラ暱) */
export const UNITLESS_UNITS = ['unitless'] as const;
export type UnitlessUnit = typeof UNITLESS_UNITS[number];

// ==================== 绫诲瀷瀹氫箟 ====================

/** 鍗曚綅鍒嗙被鍚嶇О */
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
] as const;

export type UnitCategoryName = typeof UNIT_CATEGORY_NAMES[number];

// ==================== 鍒嗙被鍒板崟浣嶇殑鏄犲皠绫?====================

/** 鍒嗙被鍒板崟浣嶇殑鏄犲皠绫?*/
class UnitsByCategoryMapping {
  readonly percentage: readonly PercentageUnit[] = PERCENTAGE_UNITS;
  readonly pixel: readonly PxUnit[] = PX_UNITS;
  readonly fontRelative: readonly FontRelativeUnit[] = FONT_RELATIVE_UNITS;
  readonly physical: readonly PhysicalUnit[] = PHYSICAL_UNITS;
  readonly angle: readonly AngleUnit[] = ANGLE_UNITS;
  readonly time: readonly TimeUnit[] = TIME_UNITS;
  readonly frequency: readonly FrequencyUnit[] = FREQUENCY_UNITS;
  readonly resolution: readonly ResolutionUnit[] = RESOLUTION_UNITS;
  readonly flex: readonly FlexUnit[] = FLEX_UNITS;
  readonly unitless: readonly UnitlessUnit[] = UNITLESS_UNITS;
}

export const unitsByCategory = new UnitsByCategoryMapping();

/** 绫诲瀷锛氬垎绫诲埌鍗曚綅鐨勬槧灏?*/
export type UnitsByCategory = UnitsByCategoryMapping;
