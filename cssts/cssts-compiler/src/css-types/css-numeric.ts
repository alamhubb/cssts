/**
 * CSS 数值类型定义
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-17T18:07:28.904Z
 *
 * 类型层级：
 * 层级1: 单位类型 (PxUnitType = 'px')
 * 层级2: 数值类型 = 单位类型联合 (LengthNumberType = PxUnitType | EmUnitType | ...)
 * 层级3: 属性数值类型 = 数值类型联合 (WidthPropertyNumberType = LengthNumberType | ...)
 */

// ==================== 数值类型名称（13种） ====================
// 每个数值类型名称都有常量和对应的类型

/** 角度值，以度 (deg)、百分度 (grad)、弧度 (rad) 或圈数 (turn) 表示。 */
export const ANGLE_NUMBER_TYPE_NAME = 'angle' as const;
export type AngleNumberTypeName = typeof ANGLE_NUMBER_TYPE_NAME;

/** 可以是 <angle> 或 <percentage> 的值。 */
export const ANGLE_PERCENTAGE_NUMBER_TYPE_NAME = 'angle-percentage' as const;
export type AnglePercentageNumberTypeName = typeof ANGLE_PERCENTAGE_NUMBER_TYPE_NAME;

/** 弹性长度，以 fr 为单位，表示网格容器中剩余空间的分数。 */
export const FLEX_NUMBER_TYPE_NAME = 'flex' as const;
export type FlexNumberTypeName = typeof FLEX_NUMBER_TYPE_NAME;

/** 频率值，以赫兹 (Hz) 或千赫兹 (kHz) 表示。 */
export const FREQUENCY_NUMBER_TYPE_NAME = 'frequency' as const;
export type FrequencyNumberTypeName = typeof FREQUENCY_NUMBER_TYPE_NAME;

/** 可以是 <frequency> 或 <percentage> 的值。 */
export const FREQUENCY_PERCENTAGE_NUMBER_TYPE_NAME = 'frequency-percentage' as const;
export type FrequencyPercentageNumberTypeName = typeof FREQUENCY_PERCENTAGE_NUMBER_TYPE_NAME;

/** 整数，正数或负数。 */
export const INTEGER_NUMBER_TYPE_NAME = 'integer' as const;
export type IntegerNumberTypeName = typeof INTEGER_NUMBER_TYPE_NAME;

/** 距离度量。表示长度值，如 px、em、rem、vh、vw 等。 */
export const LENGTH_NUMBER_TYPE_NAME = 'length' as const;
export type LengthNumberTypeName = typeof LENGTH_NUMBER_TYPE_NAME;

/** 可以是 <length> 或 <percentage> 的值。 */
export const LENGTH_PERCENTAGE_NUMBER_TYPE_NAME = 'length-percentage' as const;
export type LengthPercentageNumberTypeName = typeof LENGTH_PERCENTAGE_NUMBER_TYPE_NAME;

/** 实数，可能带有小数部分。 */
export const NUMBER_NUMBER_TYPE_NAME = 'number' as const;
export type NumberNumberTypeName = typeof NUMBER_NUMBER_TYPE_NAME;

/** 百分比值。表示某个其他值的分数。 */
export const PERCENTAGE_NUMBER_TYPE_NAME = 'percentage' as const;
export type PercentageNumberTypeName = typeof PERCENTAGE_NUMBER_TYPE_NAME;

/** 分辨率值，用于描述输出设备的像素密度 (dpi、dpcm、dppx)。 */
export const RESOLUTION_NUMBER_TYPE_NAME = 'resolution' as const;
export type ResolutionNumberTypeName = typeof RESOLUTION_NUMBER_TYPE_NAME;

/** 时间值，以秒 (s) 或毫秒 (ms) 表示。 */
export const TIME_NUMBER_TYPE_NAME = 'time' as const;
export type TimeNumberTypeName = typeof TIME_NUMBER_TYPE_NAME;

/** 可以是 <time> 或 <percentage> 的值。 */
export const TIME_PERCENTAGE_NUMBER_TYPE_NAME = 'time-percentage' as const;
export type TimePercentageNumberTypeName = typeof TIME_PERCENTAGE_NUMBER_TYPE_NAME;

/** 所有数值类型名称 */
export const NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  FLEX_NUMBER_TYPE_NAME,
  FREQUENCY_NUMBER_TYPE_NAME,
  FREQUENCY_PERCENTAGE_NUMBER_TYPE_NAME,
  INTEGER_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
  TIME_NUMBER_TYPE_NAME,
  TIME_PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** 数值类型名称联合 */
export type NumberTypeName = typeof NUMBER_TYPES[number];

// ==================== 层级1: 单位类型 ====================
// 每个单位都是独立的字面量类型

/** 所有单位 */
export const ALL_UNITS = [
  '%',
  '<number>',
  'Hz',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'grad',
  'ic',
  'in',
  'kHz',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'ms',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  's',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

export type PercentUnitType = '%';
export type UnitlessUnitType = '<number>';
export type HzUnitType = 'Hz';
export type QUnitType = 'Q';
export type CapUnitType = 'cap';
export type ChUnitType = 'ch';
export type CmUnitType = 'cm';
export type DegUnitType = 'deg';
export type DpcmUnitType = 'dpcm';
export type DpiUnitType = 'dpi';
export type DppxUnitType = 'dppx';
export type DvhUnitType = 'dvh';
export type DvwUnitType = 'dvw';
export type EmUnitType = 'em';
export type ExUnitType = 'ex';
export type FrUnitType = 'fr';
export type GradUnitType = 'grad';
export type IcUnitType = 'ic';
export type InUnitType = 'in';
export type KHzUnitType = 'kHz';
export type LhUnitType = 'lh';
export type LvhUnitType = 'lvh';
export type LvwUnitType = 'lvw';
export type MmUnitType = 'mm';
export type MsUnitType = 'ms';
export type PcUnitType = 'pc';
export type PtUnitType = 'pt';
export type PxUnitType = 'px';
export type RadUnitType = 'rad';
export type RemUnitType = 'rem';
export type RlhUnitType = 'rlh';
export type SUnitType = 's';
export type SvhUnitType = 'svh';
export type SvwUnitType = 'svw';
export type TurnUnitType = 'turn';
export type VbUnitType = 'vb';
export type VhUnitType = 'vh';
export type ViUnitType = 'vi';
export type VmaxUnitType = 'vmax';
export type VminUnitType = 'vmin';
export type VwUnitType = 'vw';
export type XUnitType = 'x';

// ==================== 层级2: 数值类型 = 单位类型联合 ====================

/** 角度值，以度 (deg)、百分度 (grad)、弧度 (rad) 或圈数 (turn) 表示。 */
export type AngleNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 可以是 <angle> 或 <percentage> 的值。 */
export type AnglePercentageNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 弹性长度，以 fr 为单位，表示网格容器中剩余空间的分数。 */
export type FlexNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | FrUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType;
/** 频率值，以赫兹 (Hz) 或千赫兹 (kHz) 表示。 */
export type FrequencyNumberType = PercentUnitType | HzUnitType | KHzUnitType;
/** 可以是 <frequency> 或 <percentage> 的值。 */
export type FrequencyPercentageNumberType = never;
/** 整数，正数或负数。 */
export type IntegerNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | FrUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | MsUnitType | PcUnitType | PtUnitType | PxUnitType | RemUnitType | RlhUnitType | SUnitType | SvhUnitType | SvwUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType;
/** 距离度量。表示长度值，如 px、em、rem、vh、vw 等。 */
export type LengthNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | FrUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 可以是 <length> 或 <percentage> 的值。 */
export type LengthPercentageNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | FrUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 实数，可能带有小数部分。 */
export type NumberNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | MsUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 百分比值。表示某个其他值的分数。 */
export type PercentageNumberType = PercentUnitType | UnitlessUnitType | HzUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | FrUnitType | GradUnitType | IcUnitType | InUnitType | KHzUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 分辨率值，用于描述输出设备的像素密度 (dpi、dpcm、dppx)。 */
export type ResolutionNumberType = PercentUnitType | UnitlessUnitType | QUnitType | CapUnitType | ChUnitType | CmUnitType | DegUnitType | DpcmUnitType | DpiUnitType | DppxUnitType | DvhUnitType | DvwUnitType | EmUnitType | ExUnitType | GradUnitType | IcUnitType | InUnitType | LhUnitType | LvhUnitType | LvwUnitType | MmUnitType | PcUnitType | PtUnitType | PxUnitType | RadUnitType | RemUnitType | RlhUnitType | SvhUnitType | SvwUnitType | TurnUnitType | VbUnitType | VhUnitType | ViUnitType | VmaxUnitType | VminUnitType | VwUnitType | XUnitType;
/** 时间值，以秒 (s) 或毫秒 (ms) 表示。 */
export type TimeNumberType = UnitlessUnitType | MsUnitType | SUnitType;
/** 可以是 <time> 或 <percentage> 的值。 */
export type TimePercentageNumberType = never;

// ==================== 数值类型到单位的运行时映射 ====================

/** angle 支持的单位 */
export const ANGLE_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** angle-percentage 支持的单位 */
export const ANGLE_PERCENTAGE_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** flex 支持的单位 */
export const FLEX_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rem',
  'rlh',
  'svh',
  'svw',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
] as const;

/** frequency 支持的单位 */
export const FREQUENCY_UNITS = [
  '%',
  'Hz',
  'kHz',
] as const;

/** frequency-percentage 支持的单位 */
export const FREQUENCY_PERCENTAGE_UNITS = [
] as const;

/** integer 支持的单位 */
export const INTEGER_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'ms',
  'pc',
  'pt',
  'px',
  'rem',
  'rlh',
  's',
  'svh',
  'svw',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
] as const;

/** length 支持的单位 */
export const LENGTH_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** length-percentage 支持的单位 */
export const LENGTH_PERCENTAGE_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** number 支持的单位 */
export const NUMBER_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'ms',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  's',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** percentage 支持的单位 */
export const PERCENTAGE_UNITS = [
  '%',
  '<number>',
  'Hz',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'fr',
  'grad',
  'ic',
  'in',
  'kHz',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** resolution 支持的单位 */
export const RESOLUTION_UNITS = [
  '%',
  '<number>',
  'Q',
  'cap',
  'ch',
  'cm',
  'deg',
  'dpcm',
  'dpi',
  'dppx',
  'dvh',
  'dvw',
  'em',
  'ex',
  'grad',
  'ic',
  'in',
  'lh',
  'lvh',
  'lvw',
  'mm',
  'pc',
  'pt',
  'px',
  'rad',
  'rem',
  'rlh',
  'svh',
  'svw',
  'turn',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'x',
] as const;

/** time 支持的单位 */
export const TIME_UNITS = [
  '<number>',
  'ms',
  's',
] as const;

/** time-percentage 支持的单位 */
export const TIME_PERCENTAGE_UNITS = [
] as const;

/** 数值类型到单位的映射 */
export const NUMBER_TYPE_UNITS = {
  'angle': ANGLE_UNITS,
  'angle-percentage': ANGLE_PERCENTAGE_UNITS,
  'flex': FLEX_UNITS,
  'frequency': FREQUENCY_UNITS,
  'frequency-percentage': FREQUENCY_PERCENTAGE_UNITS,
  'integer': INTEGER_UNITS,
  'length': LENGTH_UNITS,
  'length-percentage': LENGTH_PERCENTAGE_UNITS,
  'number': NUMBER_UNITS,
  'percentage': PERCENTAGE_UNITS,
  'resolution': RESOLUTION_UNITS,
  'time': TIME_UNITS,
  'time-percentage': TIME_PERCENTAGE_UNITS,
} as const;

// ==================== 层级3: 属性数值类型 = 单位类型联合 ====================
// 这是属性支持的所有单位的联合类型

/** accent-color 属性支持的单位类型 */
export type AccentColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** animation 属性支持的单位类型 */
export type AnimationPropertyUnitType = IntegerNumberType | NumberNumberType;
/** animation-delay 属性支持的单位类型 */
export type AnimationDelayPropertyUnitType = TimeNumberType;
/** animation-duration 属性支持的单位类型 */
export type AnimationDurationPropertyUnitType = TimeNumberType;
/** animation-iteration-count 属性支持的单位类型 */
export type AnimationIterationCountPropertyUnitType = NumberNumberType;
/** animation-range-end 属性支持的单位类型 */
export type AnimationRangeEndPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** animation-range-start 属性支持的单位类型 */
export type AnimationRangeStartPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** animation-timing-function 属性支持的单位类型 */
export type AnimationTimingFunctionPropertyUnitType = IntegerNumberType | NumberNumberType;
/** aspect-ratio 属性支持的单位类型 */
export type AspectRatioPropertyUnitType = NumberNumberType;
/** azimuth 属性支持的单位类型 */
export type AzimuthPropertyUnitType = AngleNumberType;
/** backdrop-filter 属性支持的单位类型 */
export type BackdropFilterPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** background 属性支持的单位类型 */
export type BackgroundPropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** background-color 属性支持的单位类型 */
export type BackgroundColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** background-image 属性支持的单位类型 */
export type BackgroundImagePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** background-position 属性支持的单位类型 */
export type BackgroundPositionPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-position-x 属性支持的单位类型 */
export type BackgroundPositionXPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-position-y 属性支持的单位类型 */
export type BackgroundPositionYPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-size 属性支持的单位类型 */
export type BackgroundSizePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** baseline-shift 属性支持的单位类型 */
export type BaselineShiftPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** border 属性支持的单位类型 */
export type BorderPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-block 属性支持的单位类型 */
export type BorderBlockPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-block-end 属性支持的单位类型 */
export type BorderBlockEndPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-block-start 属性支持的单位类型 */
export type BorderBlockStartPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-bottom 属性支持的单位类型 */
export type BorderBottomPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-bottom-left-radius 属性支持的单位类型 */
export type BorderBottomLeftRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-bottom-right-radius 属性支持的单位类型 */
export type BorderBottomRightRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-bottom-width 属性支持的单位类型 */
export type BorderBottomWidthPropertyUnitType = LengthNumberType;
/** border-color 属性支持的单位类型 */
export type BorderColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-end-end-radius 属性支持的单位类型 */
export type BorderEndEndRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-end-start-radius 属性支持的单位类型 */
export type BorderEndStartRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-image-outset 属性支持的单位类型 */
export type BorderImageOutsetPropertyUnitType = LengthNumberType | NumberNumberType;
/** border-image-slice 属性支持的单位类型 */
export type BorderImageSlicePropertyUnitType = NumberNumberType | PercentageNumberType;
/** border-image-source 属性支持的单位类型 */
export type BorderImageSourcePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** border-image-width 属性支持的单位类型 */
export type BorderImageWidthPropertyUnitType = LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** border-inline 属性支持的单位类型 */
export type BorderInlinePropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-inline-end 属性支持的单位类型 */
export type BorderInlineEndPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-inline-start 属性支持的单位类型 */
export type BorderInlineStartPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-left 属性支持的单位类型 */
export type BorderLeftPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-left-color 属性支持的单位类型 */
export type BorderLeftColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-left-width 属性支持的单位类型 */
export type BorderLeftWidthPropertyUnitType = LengthNumberType;
/** border-radius 属性支持的单位类型 */
export type BorderRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-right 属性支持的单位类型 */
export type BorderRightPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-right-color 属性支持的单位类型 */
export type BorderRightColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-right-width 属性支持的单位类型 */
export type BorderRightWidthPropertyUnitType = LengthNumberType;
/** border-spacing 属性支持的单位类型 */
export type BorderSpacingPropertyUnitType = LengthNumberType;
/** border-start-end-radius 属性支持的单位类型 */
export type BorderStartEndRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-start-start-radius 属性支持的单位类型 */
export type BorderStartStartRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top 属性支持的单位类型 */
export type BorderTopPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-top-color 属性支持的单位类型 */
export type BorderTopColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-top-left-radius 属性支持的单位类型 */
export type BorderTopLeftRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top-right-radius 属性支持的单位类型 */
export type BorderTopRightRadiusPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top-width 属性支持的单位类型 */
export type BorderTopWidthPropertyUnitType = LengthNumberType;
/** border-width 属性支持的单位类型 */
export type BorderWidthPropertyUnitType = LengthNumberType;
/** bottom 属性支持的单位类型 */
export type BottomPropertyUnitType = LengthNumberType | PercentageNumberType;
/** box-flex 属性支持的单位类型 */
export type BoxFlexPropertyUnitType = NumberNumberType;
/** box-flex-group 属性支持的单位类型 */
export type BoxFlexGroupPropertyUnitType = IntegerNumberType;
/** box-ordinal-group 属性支持的单位类型 */
export type BoxOrdinalGroupPropertyUnitType = IntegerNumberType;
/** box-shadow 属性支持的单位类型 */
export type BoxShadowPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** caret-color 属性支持的单位类型 */
export type CaretColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** clip 属性支持的单位类型 */
export type ClipPropertyUnitType = LengthNumberType;
/** clip-path 属性支持的单位类型 */
export type ClipPathPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** color 属性支持的单位类型 */
export type ColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** column-count 属性支持的单位类型 */
export type ColumnCountPropertyUnitType = IntegerNumberType;
/** column-gap 属性支持的单位类型 */
export type ColumnGapPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** column-rule-color 属性支持的单位类型 */
export type ColumnRuleColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** column-width 属性支持的单位类型 */
export type ColumnWidthPropertyUnitType = LengthNumberType;
/** contain-intrinsic-block-size 属性支持的单位类型 */
export type ContainIntrinsicBlockSizePropertyUnitType = LengthNumberType;
/** contain-intrinsic-height 属性支持的单位类型 */
export type ContainIntrinsicHeightPropertyUnitType = LengthNumberType;
/** contain-intrinsic-inline-size 属性支持的单位类型 */
export type ContainIntrinsicInlineSizePropertyUnitType = LengthNumberType;
/** contain-intrinsic-size 属性支持的单位类型 */
export type ContainIntrinsicSizePropertyUnitType = LengthNumberType;
/** contain-intrinsic-width 属性支持的单位类型 */
export type ContainIntrinsicWidthPropertyUnitType = LengthNumberType;
/** content 属性支持的单位类型 */
export type ContentPropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** counter-increment 属性支持的单位类型 */
export type CounterIncrementPropertyUnitType = IntegerNumberType;
/** counter-reset 属性支持的单位类型 */
export type CounterResetPropertyUnitType = IntegerNumberType;
/** counter-set 属性支持的单位类型 */
export type CounterSetPropertyUnitType = IntegerNumberType;
/** cursor 属性支持的单位类型 */
export type CursorPropertyUnitType = NumberNumberType;
/** cx 属性支持的单位类型 */
export type CxPropertyUnitType = LengthNumberType | PercentageNumberType;
/** cy 属性支持的单位类型 */
export type CyPropertyUnitType = LengthNumberType | PercentageNumberType;
/** fill 属性支持的单位类型 */
export type FillPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** fill-opacity 属性支持的单位类型 */
export type FillOpacityPropertyUnitType = NumberNumberType;
/** filter 属性支持的单位类型 */
export type FilterPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** flex-grow 属性支持的单位类型 */
export type FlexGrowPropertyUnitType = NumberNumberType;
/** flex-shrink 属性支持的单位类型 */
export type FlexShrinkPropertyUnitType = NumberNumberType;
/** font-feature-settings 属性支持的单位类型 */
export type FontFeatureSettingsPropertyUnitType = IntegerNumberType;
/** font-size 属性支持的单位类型 */
export type FontSizePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** font-size-adjust 属性支持的单位类型 */
export type FontSizeAdjustPropertyUnitType = NumberNumberType;
/** font-smooth 属性支持的单位类型 */
export type FontSmoothPropertyUnitType = LengthNumberType;
/** font-stretch 属性支持的单位类型 */
export type FontStretchPropertyUnitType = PercentageNumberType;
/** font-style 属性支持的单位类型 */
export type FontStylePropertyUnitType = AngleNumberType;
/** font-variation-settings 属性支持的单位类型 */
export type FontVariationSettingsPropertyUnitType = NumberNumberType;
/** font-weight 属性支持的单位类型 */
export type FontWeightPropertyUnitType = NumberNumberType;
/** glyph-orientation-horizontal 属性支持的单位类型 */
export type GlyphOrientationHorizontalPropertyUnitType = AngleNumberType;
/** glyph-orientation-vertical 属性支持的单位类型 */
export type GlyphOrientationVerticalPropertyUnitType = AngleNumberType;
/** grid-area 属性支持的单位类型 */
export type GridAreaPropertyUnitType = IntegerNumberType;
/** grid-auto-columns 属性支持的单位类型 */
export type GridAutoColumnsPropertyUnitType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-auto-rows 属性支持的单位类型 */
export type GridAutoRowsPropertyUnitType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-column 属性支持的单位类型 */
export type GridColumnPropertyUnitType = IntegerNumberType;
/** grid-column-end 属性支持的单位类型 */
export type GridColumnEndPropertyUnitType = IntegerNumberType;
/** grid-column-gap 属性支持的单位类型 */
export type GridColumnGapPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-column-start 属性支持的单位类型 */
export type GridColumnStartPropertyUnitType = IntegerNumberType;
/** grid-row 属性支持的单位类型 */
export type GridRowPropertyUnitType = IntegerNumberType;
/** grid-row-end 属性支持的单位类型 */
export type GridRowEndPropertyUnitType = IntegerNumberType;
/** grid-row-gap 属性支持的单位类型 */
export type GridRowGapPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-row-start 属性支持的单位类型 */
export type GridRowStartPropertyUnitType = IntegerNumberType;
/** grid-template 属性支持的单位类型 */
export type GridTemplatePropertyUnitType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-template-columns 属性支持的单位类型 */
export type GridTemplateColumnsPropertyUnitType = FlexNumberType | IntegerNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-template-rows 属性支持的单位类型 */
export type GridTemplateRowsPropertyUnitType = FlexNumberType | IntegerNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** height 属性支持的单位类型 */
export type HeightPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** hyphenate-limit-chars 属性支持的单位类型 */
export type HyphenateLimitCharsPropertyUnitType = IntegerNumberType;
/** image-orientation 属性支持的单位类型 */
export type ImageOrientationPropertyUnitType = AngleNumberType;
/** image-resolution 属性支持的单位类型 */
export type ImageResolutionPropertyUnitType = ResolutionNumberType;
/** initial-letter 属性支持的单位类型 */
export type InitialLetterPropertyUnitType = IntegerNumberType | NumberNumberType;
/** kerning 属性支持的单位类型 */
export type KerningPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** left 属性支持的单位类型 */
export type LeftPropertyUnitType = LengthNumberType | PercentageNumberType;
/** letter-spacing 属性支持的单位类型 */
export type LetterSpacingPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** line-clamp 属性支持的单位类型 */
export type LineClampPropertyUnitType = IntegerNumberType;
/** line-height 属性支持的单位类型 */
export type LineHeightPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** line-height-step 属性支持的单位类型 */
export type LineHeightStepPropertyUnitType = LengthNumberType;
/** list-style-image 属性支持的单位类型 */
export type ListStyleImagePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** margin 属性支持的单位类型 */
export type MarginPropertyUnitType = LengthNumberType | PercentageNumberType;
/** margin-bottom 属性支持的单位类型 */
export type MarginBottomPropertyUnitType = LengthNumberType | PercentageNumberType;
/** margin-left 属性支持的单位类型 */
export type MarginLeftPropertyUnitType = LengthNumberType | PercentageNumberType;
/** margin-right 属性支持的单位类型 */
export type MarginRightPropertyUnitType = LengthNumberType | PercentageNumberType;
/** margin-top 属性支持的单位类型 */
export type MarginTopPropertyUnitType = LengthNumberType | PercentageNumberType;
/** mask 属性支持的单位类型 */
export type MaskPropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-border-outset 属性支持的单位类型 */
export type MaskBorderOutsetPropertyUnitType = LengthNumberType | NumberNumberType;
/** mask-border-slice 属性支持的单位类型 */
export type MaskBorderSlicePropertyUnitType = NumberNumberType | PercentageNumberType;
/** mask-border-source 属性支持的单位类型 */
export type MaskBorderSourcePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-border-width 属性支持的单位类型 */
export type MaskBorderWidthPropertyUnitType = LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** mask-image 属性支持的单位类型 */
export type MaskImagePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-position 属性支持的单位类型 */
export type MaskPositionPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** mask-size 属性支持的单位类型 */
export type MaskSizePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** math-depth 属性支持的单位类型 */
export type MathDepthPropertyUnitType = IntegerNumberType;
/** max-height 属性支持的单位类型 */
export type MaxHeightPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** max-lines 属性支持的单位类型 */
export type MaxLinesPropertyUnitType = IntegerNumberType;
/** max-width 属性支持的单位类型 */
export type MaxWidthPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** min-height 属性支持的单位类型 */
export type MinHeightPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** min-width 属性支持的单位类型 */
export type MinWidthPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** object-position 属性支持的单位类型 */
export type ObjectPositionPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-anchor 属性支持的单位类型 */
export type OffsetAnchorPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-distance 属性支持的单位类型 */
export type OffsetDistancePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-path 属性支持的单位类型 */
export type OffsetPathPropertyUnitType = AngleNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-position 属性支持的单位类型 */
export type OffsetPositionPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-rotate 属性支持的单位类型 */
export type OffsetRotatePropertyUnitType = AngleNumberType;
/** opacity 属性支持的单位类型 */
export type OpacityPropertyUnitType = NumberNumberType | PercentageNumberType;
/** order 属性支持的单位类型 */
export type OrderPropertyUnitType = IntegerNumberType;
/** orphans 属性支持的单位类型 */
export type OrphansPropertyUnitType = IntegerNumberType;
/** outline-color 属性支持的单位类型 */
export type OutlineColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** outline-offset 属性支持的单位类型 */
export type OutlineOffsetPropertyUnitType = LengthNumberType;
/** outline-width 属性支持的单位类型 */
export type OutlineWidthPropertyUnitType = LengthNumberType;
/** overflow-clip-margin 属性支持的单位类型 */
export type OverflowClipMarginPropertyUnitType = LengthNumberType;
/** padding 属性支持的单位类型 */
export type PaddingPropertyUnitType = LengthNumberType | PercentageNumberType;
/** padding-bottom 属性支持的单位类型 */
export type PaddingBottomPropertyUnitType = LengthNumberType | PercentageNumberType;
/** padding-left 属性支持的单位类型 */
export type PaddingLeftPropertyUnitType = LengthNumberType | PercentageNumberType;
/** padding-right 属性支持的单位类型 */
export type PaddingRightPropertyUnitType = LengthNumberType | PercentageNumberType;
/** padding-top 属性支持的单位类型 */
export type PaddingTopPropertyUnitType = LengthNumberType | PercentageNumberType;
/** pause-after 属性支持的单位类型 */
export type PauseAfterPropertyUnitType = TimeNumberType;
/** pause-before 属性支持的单位类型 */
export type PauseBeforePropertyUnitType = TimeNumberType;
/** perspective 属性支持的单位类型 */
export type PerspectivePropertyUnitType = LengthNumberType;
/** perspective-origin 属性支持的单位类型 */
export type PerspectiveOriginPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** r 属性支持的单位类型 */
export type RPropertyUnitType = LengthNumberType | PercentageNumberType;
/** rest-after 属性支持的单位类型 */
export type RestAfterPropertyUnitType = TimeNumberType;
/** rest-before 属性支持的单位类型 */
export type RestBeforePropertyUnitType = TimeNumberType;
/** right 属性支持的单位类型 */
export type RightPropertyUnitType = LengthNumberType | PercentageNumberType;
/** rotate 属性支持的单位类型 */
export type RotatePropertyUnitType = AngleNumberType | NumberNumberType;
/** row-gap 属性支持的单位类型 */
export type RowGapPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** rx 属性支持的单位类型 */
export type RxPropertyUnitType = LengthNumberType | PercentageNumberType;
/** ry 属性支持的单位类型 */
export type RyPropertyUnitType = LengthNumberType | PercentageNumberType;
/** scale 属性支持的单位类型 */
export type ScalePropertyUnitType = NumberNumberType | PercentageNumberType;
/** scroll-margin 属性支持的单位类型 */
export type ScrollMarginPropertyUnitType = LengthNumberType;
/** scroll-margin-block 属性支持的单位类型 */
export type ScrollMarginBlockPropertyUnitType = LengthNumberType;
/** scroll-margin-block-end 属性支持的单位类型 */
export type ScrollMarginBlockEndPropertyUnitType = LengthNumberType;
/** scroll-margin-block-start 属性支持的单位类型 */
export type ScrollMarginBlockStartPropertyUnitType = LengthNumberType;
/** scroll-margin-bottom 属性支持的单位类型 */
export type ScrollMarginBottomPropertyUnitType = LengthNumberType;
/** scroll-margin-inline 属性支持的单位类型 */
export type ScrollMarginInlinePropertyUnitType = LengthNumberType;
/** scroll-margin-inline-end 属性支持的单位类型 */
export type ScrollMarginInlineEndPropertyUnitType = LengthNumberType;
/** scroll-margin-inline-start 属性支持的单位类型 */
export type ScrollMarginInlineStartPropertyUnitType = LengthNumberType;
/** scroll-margin-left 属性支持的单位类型 */
export type ScrollMarginLeftPropertyUnitType = LengthNumberType;
/** scroll-margin-right 属性支持的单位类型 */
export type ScrollMarginRightPropertyUnitType = LengthNumberType;
/** scroll-margin-top 属性支持的单位类型 */
export type ScrollMarginTopPropertyUnitType = LengthNumberType;
/** scroll-padding 属性支持的单位类型 */
export type ScrollPaddingPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block 属性支持的单位类型 */
export type ScrollPaddingBlockPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block-end 属性支持的单位类型 */
export type ScrollPaddingBlockEndPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block-start 属性支持的单位类型 */
export type ScrollPaddingBlockStartPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-bottom 属性支持的单位类型 */
export type ScrollPaddingBottomPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline 属性支持的单位类型 */
export type ScrollPaddingInlinePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline-end 属性支持的单位类型 */
export type ScrollPaddingInlineEndPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline-start 属性支持的单位类型 */
export type ScrollPaddingInlineStartPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-left 属性支持的单位类型 */
export type ScrollPaddingLeftPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-right 属性支持的单位类型 */
export type ScrollPaddingRightPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-top 属性支持的单位类型 */
export type ScrollPaddingTopPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-coordinate 属性支持的单位类型 */
export type ScrollSnapCoordinatePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-destination 属性支持的单位类型 */
export type ScrollSnapDestinationPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-points-x 属性支持的单位类型 */
export type ScrollSnapPointsXPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-points-y 属性支持的单位类型 */
export type ScrollSnapPointsYPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scrollbar-color 属性支持的单位类型 */
export type ScrollbarColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** shape-image-threshold 属性支持的单位类型 */
export type ShapeImageThresholdPropertyUnitType = NumberNumberType | PercentageNumberType;
/** shape-margin 属性支持的单位类型 */
export type ShapeMarginPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** shape-outside 属性支持的单位类型 */
export type ShapeOutsidePropertyUnitType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** stroke 属性支持的单位类型 */
export type StrokePropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** stroke-dasharray 属性支持的单位类型 */
export type StrokeDasharrayPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** stroke-dashoffset 属性支持的单位类型 */
export type StrokeDashoffsetPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** stroke-miterlimit 属性支持的单位类型 */
export type StrokeMiterlimitPropertyUnitType = NumberNumberType;
/** stroke-width 属性支持的单位类型 */
export type StrokeWidthPropertyUnitType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** tab-size 属性支持的单位类型 */
export type TabSizePropertyUnitType = IntegerNumberType | LengthNumberType;
/** text-combine-upright 属性支持的单位类型 */
export type TextCombineUprightPropertyUnitType = IntegerNumberType;
/** text-decoration-color 属性支持的单位类型 */
export type TextDecorationColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** text-decoration-thickness 属性支持的单位类型 */
export type TextDecorationThicknessPropertyUnitType = LengthNumberType | PercentageNumberType;
/** text-emphasis-color 属性支持的单位类型 */
export type TextEmphasisColorPropertyUnitType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** text-indent 属性支持的单位类型 */
export type TextIndentPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** text-shadow 属性支持的单位类型 */
export type TextShadowPropertyUnitType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** text-size-adjust 属性支持的单位类型 */
export type TextSizeAdjustPropertyUnitType = PercentageNumberType;
/** text-underline-offset 属性支持的单位类型 */
export type TextUnderlineOffsetPropertyUnitType = LengthNumberType | PercentageNumberType;
/** top 属性支持的单位类型 */
export type TopPropertyUnitType = LengthNumberType | PercentageNumberType;
/** transform 属性支持的单位类型 */
export type TransformPropertyUnitType = AngleNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** transform-origin 属性支持的单位类型 */
export type TransformOriginPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** transition 属性支持的单位类型 */
export type TransitionPropertyUnitType = IntegerNumberType | NumberNumberType | TimeNumberType;
/** transition-delay 属性支持的单位类型 */
export type TransitionDelayPropertyUnitType = TimeNumberType;
/** transition-duration 属性支持的单位类型 */
export type TransitionDurationPropertyUnitType = TimeNumberType;
/** transition-timing-function 属性支持的单位类型 */
export type TransitionTimingFunctionPropertyUnitType = IntegerNumberType | NumberNumberType;
/** translate 属性支持的单位类型 */
export type TranslatePropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** vertical-align 属性支持的单位类型 */
export type VerticalAlignPropertyUnitType = LengthNumberType | PercentageNumberType;
/** view-timeline-inset 属性支持的单位类型 */
export type ViewTimelineInsetPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** voice-balance 属性支持的单位类型 */
export type VoiceBalancePropertyUnitType = NumberNumberType;
/** voice-duration 属性支持的单位类型 */
export type VoiceDurationPropertyUnitType = TimeNumberType;
/** voice-family 属性支持的单位类型 */
export type VoiceFamilyPropertyUnitType = IntegerNumberType;
/** voice-pitch 属性支持的单位类型 */
export type VoicePitchPropertyUnitType = FrequencyNumberType | PercentageNumberType;
/** voice-range 属性支持的单位类型 */
export type VoiceRangePropertyUnitType = FrequencyNumberType | PercentageNumberType;
/** voice-rate 属性支持的单位类型 */
export type VoiceRatePropertyUnitType = PercentageNumberType;
/** widows 属性支持的单位类型 */
export type WidowsPropertyUnitType = IntegerNumberType;
/** width 属性支持的单位类型 */
export type WidthPropertyUnitType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** word-spacing 属性支持的单位类型 */
export type WordSpacingPropertyUnitType = LengthNumberType;
/** x 属性支持的单位类型 */
export type XPropertyUnitType = LengthNumberType | PercentageNumberType;
/** y 属性支持的单位类型 */
export type YPropertyUnitType = LengthNumberType | PercentageNumberType;
/** z-index 属性支持的单位类型 */
export type ZIndexPropertyUnitType = IntegerNumberType;
/** zoom 属性支持的单位类型 */
export type ZoomPropertyUnitType = NumberNumberType | PercentageNumberType;

// ==================== 属性数值类型常量（运行时数据） ====================

/** accent-color 属性支持的数值类型 */
export const ACCENT_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** animation 属性支持的数值类型 */
export const ANIMATION_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** animation-delay 属性支持的数值类型 */
export const ANIMATION_DELAY_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** animation-duration 属性支持的数值类型 */
export const ANIMATION_DURATION_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** animation-iteration-count 属性支持的数值类型 */
export const ANIMATION_ITERATION_COUNT_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** animation-range-end 属性支持的数值类型 */
export const ANIMATION_RANGE_END_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** animation-range-start 属性支持的数值类型 */
export const ANIMATION_RANGE_START_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** animation-timing-function 属性支持的数值类型 */
export const ANIMATION_TIMING_FUNCTION_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** aspect-ratio 属性支持的数值类型 */
export const ASPECT_RATIO_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** azimuth 属性支持的数值类型 */
export const AZIMUTH_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** backdrop-filter 属性支持的数值类型 */
export const BACKDROP_FILTER_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** background 属性支持的数值类型 */
export const BACKGROUND_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** background-color 属性支持的数值类型 */
export const BACKGROUND_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** background-image 属性支持的数值类型 */
export const BACKGROUND_IMAGE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** background-position 属性支持的数值类型 */
export const BACKGROUND_POSITION_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** background-position-x 属性支持的数值类型 */
export const BACKGROUND_POSITION_X_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** background-position-y 属性支持的数值类型 */
export const BACKGROUND_POSITION_Y_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** background-size 属性支持的数值类型 */
export const BACKGROUND_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** baseline-shift 属性支持的数值类型 */
export const BASELINE_SHIFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border 属性支持的数值类型 */
export const BORDER_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-block 属性支持的数值类型 */
export const BORDER_BLOCK_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-block-end 属性支持的数值类型 */
export const BORDER_BLOCK_END_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-block-start 属性支持的数值类型 */
export const BORDER_BLOCK_START_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-bottom 属性支持的数值类型 */
export const BORDER_BOTTOM_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-bottom-left-radius 属性支持的数值类型 */
export const BORDER_BOTTOM_LEFT_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-bottom-right-radius 属性支持的数值类型 */
export const BORDER_BOTTOM_RIGHT_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-bottom-width 属性支持的数值类型 */
export const BORDER_BOTTOM_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** border-color 属性支持的数值类型 */
export const BORDER_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-end-end-radius 属性支持的数值类型 */
export const BORDER_END_END_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-end-start-radius 属性支持的数值类型 */
export const BORDER_END_START_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-image-outset 属性支持的数值类型 */
export const BORDER_IMAGE_OUTSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** border-image-slice 属性支持的数值类型 */
export const BORDER_IMAGE_SLICE_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-image-source 属性支持的数值类型 */
export const BORDER_IMAGE_SOURCE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** border-image-width 属性支持的数值类型 */
export const BORDER_IMAGE_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-inline 属性支持的数值类型 */
export const BORDER_INLINE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-inline-end 属性支持的数值类型 */
export const BORDER_INLINE_END_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-inline-start 属性支持的数值类型 */
export const BORDER_INLINE_START_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-left 属性支持的数值类型 */
export const BORDER_LEFT_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-left-color 属性支持的数值类型 */
export const BORDER_LEFT_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-left-width 属性支持的数值类型 */
export const BORDER_LEFT_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** border-radius 属性支持的数值类型 */
export const BORDER_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-right 属性支持的数值类型 */
export const BORDER_RIGHT_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-right-color 属性支持的数值类型 */
export const BORDER_RIGHT_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-right-width 属性支持的数值类型 */
export const BORDER_RIGHT_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** border-spacing 属性支持的数值类型 */
export const BORDER_SPACING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** border-start-end-radius 属性支持的数值类型 */
export const BORDER_START_END_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-start-start-radius 属性支持的数值类型 */
export const BORDER_START_START_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-top 属性支持的数值类型 */
export const BORDER_TOP_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-top-color 属性支持的数值类型 */
export const BORDER_TOP_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-top-left-radius 属性支持的数值类型 */
export const BORDER_TOP_LEFT_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-top-right-radius 属性支持的数值类型 */
export const BORDER_TOP_RIGHT_RADIUS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** border-top-width 属性支持的数值类型 */
export const BORDER_TOP_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** border-width 属性支持的数值类型 */
export const BORDER_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** bottom 属性支持的数值类型 */
export const BOTTOM_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** box-flex 属性支持的数值类型 */
export const BOX_FLEX_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** box-flex-group 属性支持的数值类型 */
export const BOX_FLEX_GROUP_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** box-ordinal-group 属性支持的数值类型 */
export const BOX_ORDINAL_GROUP_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** box-shadow 属性支持的数值类型 */
export const BOX_SHADOW_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** caret-color 属性支持的数值类型 */
export const CARET_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** clip 属性支持的数值类型 */
export const CLIP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** clip-path 属性支持的数值类型 */
export const CLIP_PATH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** color 属性支持的数值类型 */
export const COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** column-count 属性支持的数值类型 */
export const COLUMN_COUNT_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** column-gap 属性支持的数值类型 */
export const COLUMN_GAP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** column-rule-color 属性支持的数值类型 */
export const COLUMN_RULE_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** column-width 属性支持的数值类型 */
export const COLUMN_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** contain-intrinsic-block-size 属性支持的数值类型 */
export const CONTAIN_INTRINSIC_BLOCK_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** contain-intrinsic-height 属性支持的数值类型 */
export const CONTAIN_INTRINSIC_HEIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** contain-intrinsic-inline-size 属性支持的数值类型 */
export const CONTAIN_INTRINSIC_INLINE_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** contain-intrinsic-size 属性支持的数值类型 */
export const CONTAIN_INTRINSIC_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** contain-intrinsic-width 属性支持的数值类型 */
export const CONTAIN_INTRINSIC_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** content 属性支持的数值类型 */
export const CONTENT_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** counter-increment 属性支持的数值类型 */
export const COUNTER_INCREMENT_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** counter-reset 属性支持的数值类型 */
export const COUNTER_RESET_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** counter-set 属性支持的数值类型 */
export const COUNTER_SET_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** cursor 属性支持的数值类型 */
export const CURSOR_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** cx 属性支持的数值类型 */
export const CX_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** cy 属性支持的数值类型 */
export const CY_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** fill 属性支持的数值类型 */
export const FILL_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** fill-opacity 属性支持的数值类型 */
export const FILL_OPACITY_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** filter 属性支持的数值类型 */
export const FILTER_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** flex-grow 属性支持的数值类型 */
export const FLEX_GROW_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** flex-shrink 属性支持的数值类型 */
export const FLEX_SHRINK_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** font-feature-settings 属性支持的数值类型 */
export const FONT_FEATURE_SETTINGS_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** font-size 属性支持的数值类型 */
export const FONT_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** font-size-adjust 属性支持的数值类型 */
export const FONT_SIZE_ADJUST_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** font-smooth 属性支持的数值类型 */
export const FONT_SMOOTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** font-stretch 属性支持的数值类型 */
export const FONT_STRETCH_NUMBER_TYPES = [
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** font-style 属性支持的数值类型 */
export const FONT_STYLE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** font-variation-settings 属性支持的数值类型 */
export const FONT_VARIATION_SETTINGS_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** font-weight 属性支持的数值类型 */
export const FONT_WEIGHT_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** glyph-orientation-horizontal 属性支持的数值类型 */
export const GLYPH_ORIENTATION_HORIZONTAL_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** glyph-orientation-vertical 属性支持的数值类型 */
export const GLYPH_ORIENTATION_VERTICAL_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** grid-area 属性支持的数值类型 */
export const GRID_AREA_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-auto-columns 属性支持的数值类型 */
export const GRID_AUTO_COLUMNS_NUMBER_TYPES = [
  FLEX_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-auto-rows 属性支持的数值类型 */
export const GRID_AUTO_ROWS_NUMBER_TYPES = [
  FLEX_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-column 属性支持的数值类型 */
export const GRID_COLUMN_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-column-end 属性支持的数值类型 */
export const GRID_COLUMN_END_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-column-gap 属性支持的数值类型 */
export const GRID_COLUMN_GAP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-column-start 属性支持的数值类型 */
export const GRID_COLUMN_START_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-row 属性支持的数值类型 */
export const GRID_ROW_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-row-end 属性支持的数值类型 */
export const GRID_ROW_END_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-row-gap 属性支持的数值类型 */
export const GRID_ROW_GAP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-row-start 属性支持的数值类型 */
export const GRID_ROW_START_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** grid-template 属性支持的数值类型 */
export const GRID_TEMPLATE_NUMBER_TYPES = [
  FLEX_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-template-columns 属性支持的数值类型 */
export const GRID_TEMPLATE_COLUMNS_NUMBER_TYPES = [
  FLEX_NUMBER_TYPE_NAME,
  INTEGER_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** grid-template-rows 属性支持的数值类型 */
export const GRID_TEMPLATE_ROWS_NUMBER_TYPES = [
  FLEX_NUMBER_TYPE_NAME,
  INTEGER_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** height 属性支持的数值类型 */
export const HEIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** hyphenate-limit-chars 属性支持的数值类型 */
export const HYPHENATE_LIMIT_CHARS_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** image-orientation 属性支持的数值类型 */
export const IMAGE_ORIENTATION_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** image-resolution 属性支持的数值类型 */
export const IMAGE_RESOLUTION_NUMBER_TYPES = [
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** initial-letter 属性支持的数值类型 */
export const INITIAL_LETTER_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** kerning 属性支持的数值类型 */
export const KERNING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** left 属性支持的数值类型 */
export const LEFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** letter-spacing 属性支持的数值类型 */
export const LETTER_SPACING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** line-clamp 属性支持的数值类型 */
export const LINE_CLAMP_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** line-height 属性支持的数值类型 */
export const LINE_HEIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** line-height-step 属性支持的数值类型 */
export const LINE_HEIGHT_STEP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** list-style-image 属性支持的数值类型 */
export const LIST_STYLE_IMAGE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** margin 属性支持的数值类型 */
export const MARGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** margin-bottom 属性支持的数值类型 */
export const MARGIN_BOTTOM_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** margin-left 属性支持的数值类型 */
export const MARGIN_LEFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** margin-right 属性支持的数值类型 */
export const MARGIN_RIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** margin-top 属性支持的数值类型 */
export const MARGIN_TOP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** mask 属性支持的数值类型 */
export const MASK_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** mask-border-outset 属性支持的数值类型 */
export const MASK_BORDER_OUTSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** mask-border-slice 属性支持的数值类型 */
export const MASK_BORDER_SLICE_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** mask-border-source 属性支持的数值类型 */
export const MASK_BORDER_SOURCE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** mask-border-width 属性支持的数值类型 */
export const MASK_BORDER_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** mask-image 属性支持的数值类型 */
export const MASK_IMAGE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** mask-position 属性支持的数值类型 */
export const MASK_POSITION_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** mask-size 属性支持的数值类型 */
export const MASK_SIZE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** math-depth 属性支持的数值类型 */
export const MATH_DEPTH_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** max-height 属性支持的数值类型 */
export const MAX_HEIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** max-lines 属性支持的数值类型 */
export const MAX_LINES_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** max-width 属性支持的数值类型 */
export const MAX_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** min-height 属性支持的数值类型 */
export const MIN_HEIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** min-width 属性支持的数值类型 */
export const MIN_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** object-position 属性支持的数值类型 */
export const OBJECT_POSITION_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** offset-anchor 属性支持的数值类型 */
export const OFFSET_ANCHOR_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** offset-distance 属性支持的数值类型 */
export const OFFSET_DISTANCE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** offset-path 属性支持的数值类型 */
export const OFFSET_PATH_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** offset-position 属性支持的数值类型 */
export const OFFSET_POSITION_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** offset-rotate 属性支持的数值类型 */
export const OFFSET_ROTATE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
] as const;

/** opacity 属性支持的数值类型 */
export const OPACITY_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** order 属性支持的数值类型 */
export const ORDER_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** orphans 属性支持的数值类型 */
export const ORPHANS_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** outline-color 属性支持的数值类型 */
export const OUTLINE_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** outline-offset 属性支持的数值类型 */
export const OUTLINE_OFFSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** outline-width 属性支持的数值类型 */
export const OUTLINE_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** overflow-clip-margin 属性支持的数值类型 */
export const OVERFLOW_CLIP_MARGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** padding 属性支持的数值类型 */
export const PADDING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** padding-bottom 属性支持的数值类型 */
export const PADDING_BOTTOM_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** padding-left 属性支持的数值类型 */
export const PADDING_LEFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** padding-right 属性支持的数值类型 */
export const PADDING_RIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** padding-top 属性支持的数值类型 */
export const PADDING_TOP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** pause-after 属性支持的数值类型 */
export const PAUSE_AFTER_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** pause-before 属性支持的数值类型 */
export const PAUSE_BEFORE_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** perspective 属性支持的数值类型 */
export const PERSPECTIVE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** perspective-origin 属性支持的数值类型 */
export const PERSPECTIVE_ORIGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** r 属性支持的数值类型 */
export const R_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** rest-after 属性支持的数值类型 */
export const REST_AFTER_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** rest-before 属性支持的数值类型 */
export const REST_BEFORE_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** right 属性支持的数值类型 */
export const RIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** rotate 属性支持的数值类型 */
export const ROTATE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** row-gap 属性支持的数值类型 */
export const ROW_GAP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** rx 属性支持的数值类型 */
export const RX_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** ry 属性支持的数值类型 */
export const RY_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scale 属性支持的数值类型 */
export const SCALE_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin 属性支持的数值类型 */
export const SCROLL_MARGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-block 属性支持的数值类型 */
export const SCROLL_MARGIN_BLOCK_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-block-end 属性支持的数值类型 */
export const SCROLL_MARGIN_BLOCK_END_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-block-start 属性支持的数值类型 */
export const SCROLL_MARGIN_BLOCK_START_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-bottom 属性支持的数值类型 */
export const SCROLL_MARGIN_BOTTOM_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-inline 属性支持的数值类型 */
export const SCROLL_MARGIN_INLINE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-inline-end 属性支持的数值类型 */
export const SCROLL_MARGIN_INLINE_END_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-inline-start 属性支持的数值类型 */
export const SCROLL_MARGIN_INLINE_START_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-left 属性支持的数值类型 */
export const SCROLL_MARGIN_LEFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-right 属性支持的数值类型 */
export const SCROLL_MARGIN_RIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-margin-top 属性支持的数值类型 */
export const SCROLL_MARGIN_TOP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding 属性支持的数值类型 */
export const SCROLL_PADDING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-block 属性支持的数值类型 */
export const SCROLL_PADDING_BLOCK_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-block-end 属性支持的数值类型 */
export const SCROLL_PADDING_BLOCK_END_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-block-start 属性支持的数值类型 */
export const SCROLL_PADDING_BLOCK_START_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-bottom 属性支持的数值类型 */
export const SCROLL_PADDING_BOTTOM_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-inline 属性支持的数值类型 */
export const SCROLL_PADDING_INLINE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-inline-end 属性支持的数值类型 */
export const SCROLL_PADDING_INLINE_END_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-inline-start 属性支持的数值类型 */
export const SCROLL_PADDING_INLINE_START_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-left 属性支持的数值类型 */
export const SCROLL_PADDING_LEFT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-right 属性支持的数值类型 */
export const SCROLL_PADDING_RIGHT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-padding-top 属性支持的数值类型 */
export const SCROLL_PADDING_TOP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-snap-coordinate 属性支持的数值类型 */
export const SCROLL_SNAP_COORDINATE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-snap-destination 属性支持的数值类型 */
export const SCROLL_SNAP_DESTINATION_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-snap-points-x 属性支持的数值类型 */
export const SCROLL_SNAP_POINTS_X_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scroll-snap-points-y 属性支持的数值类型 */
export const SCROLL_SNAP_POINTS_Y_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** scrollbar-color 属性支持的数值类型 */
export const SCROLLBAR_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** shape-image-threshold 属性支持的数值类型 */
export const SHAPE_IMAGE_THRESHOLD_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** shape-margin 属性支持的数值类型 */
export const SHAPE_MARGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** shape-outside 属性支持的数值类型 */
export const SHAPE_OUTSIDE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  ANGLE_PERCENTAGE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
  RESOLUTION_NUMBER_TYPE_NAME,
] as const;

/** stroke 属性支持的数值类型 */
export const STROKE_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** stroke-dasharray 属性支持的数值类型 */
export const STROKE_DASHARRAY_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** stroke-dashoffset 属性支持的数值类型 */
export const STROKE_DASHOFFSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** stroke-miterlimit 属性支持的数值类型 */
export const STROKE_MITERLIMIT_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** stroke-width 属性支持的数值类型 */
export const STROKE_WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** tab-size 属性支持的数值类型 */
export const TAB_SIZE_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** text-combine-upright 属性支持的数值类型 */
export const TEXT_COMBINE_UPRIGHT_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** text-decoration-color 属性支持的数值类型 */
export const TEXT_DECORATION_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-decoration-thickness 属性支持的数值类型 */
export const TEXT_DECORATION_THICKNESS_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-emphasis-color 属性支持的数值类型 */
export const TEXT_EMPHASIS_COLOR_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-indent 属性支持的数值类型 */
export const TEXT_INDENT_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-shadow 属性支持的数值类型 */
export const TEXT_SHADOW_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-size-adjust 属性支持的数值类型 */
export const TEXT_SIZE_ADJUST_NUMBER_TYPES = [
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** text-underline-offset 属性支持的数值类型 */
export const TEXT_UNDERLINE_OFFSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** top 属性支持的数值类型 */
export const TOP_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** transform 属性支持的数值类型 */
export const TRANSFORM_NUMBER_TYPES = [
  ANGLE_NUMBER_TYPE_NAME,
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** transform-origin 属性支持的数值类型 */
export const TRANSFORM_ORIGIN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** transition 属性支持的数值类型 */
export const TRANSITION_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
  TIME_NUMBER_TYPE_NAME,
] as const;

/** transition-delay 属性支持的数值类型 */
export const TRANSITION_DELAY_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** transition-duration 属性支持的数值类型 */
export const TRANSITION_DURATION_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** transition-timing-function 属性支持的数值类型 */
export const TRANSITION_TIMING_FUNCTION_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** translate 属性支持的数值类型 */
export const TRANSLATE_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** vertical-align 属性支持的数值类型 */
export const VERTICAL_ALIGN_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** view-timeline-inset 属性支持的数值类型 */
export const VIEW_TIMELINE_INSET_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** voice-balance 属性支持的数值类型 */
export const VOICE_BALANCE_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
] as const;

/** voice-duration 属性支持的数值类型 */
export const VOICE_DURATION_NUMBER_TYPES = [
  TIME_NUMBER_TYPE_NAME,
] as const;

/** voice-family 属性支持的数值类型 */
export const VOICE_FAMILY_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** voice-pitch 属性支持的数值类型 */
export const VOICE_PITCH_NUMBER_TYPES = [
  FREQUENCY_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** voice-range 属性支持的数值类型 */
export const VOICE_RANGE_NUMBER_TYPES = [
  FREQUENCY_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** voice-rate 属性支持的数值类型 */
export const VOICE_RATE_NUMBER_TYPES = [
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** widows 属性支持的数值类型 */
export const WIDOWS_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** width 属性支持的数值类型 */
export const WIDTH_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  LENGTH_PERCENTAGE_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** word-spacing 属性支持的数值类型 */
export const WORD_SPACING_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
] as const;

/** x 属性支持的数值类型 */
export const X_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** y 属性支持的数值类型 */
export const Y_NUMBER_TYPES = [
  LENGTH_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** z-index 属性支持的数值类型 */
export const Z_INDEX_NUMBER_TYPES = [
  INTEGER_NUMBER_TYPE_NAME,
] as const;

/** zoom 属性支持的数值类型 */
export const ZOOM_NUMBER_TYPES = [
  NUMBER_NUMBER_TYPE_NAME,
  PERCENTAGE_NUMBER_TYPE_NAME,
] as const;

/** 数值属性名列表 */
export const NUMERIC_PROPERTIES = [
  'accent-color',
  'animation',
  'animation-delay',
  'animation-duration',
  'animation-iteration-count',
  'animation-range-end',
  'animation-range-start',
  'animation-timing-function',
  'aspect-ratio',
  'azimuth',
  'backdrop-filter',
  'background',
  'background-color',
  'background-image',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-size',
  'baseline-shift',
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-width',
  'border-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-image-outset',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-left-color',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-width',
  'border-spacing',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-width',
  'border-width',
  'bottom',
  'box-flex',
  'box-flex-group',
  'box-ordinal-group',
  'box-shadow',
  'caret-color',
  'clip',
  'clip-path',
  'color',
  'column-count',
  'column-gap',
  'column-rule-color',
  'column-width',
  'contain-intrinsic-block-size',
  'contain-intrinsic-height',
  'contain-intrinsic-inline-size',
  'contain-intrinsic-size',
  'contain-intrinsic-width',
  'content',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cursor',
  'cx',
  'cy',
  'fill',
  'fill-opacity',
  'filter',
  'flex-grow',
  'flex-shrink',
  'font-feature-settings',
  'font-size',
  'font-size-adjust',
  'font-smooth',
  'font-stretch',
  'font-style',
  'font-variation-settings',
  'font-weight',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-gap',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-gap',
  'grid-row-start',
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'height',
  'hyphenate-limit-chars',
  'image-orientation',
  'image-resolution',
  'initial-letter',
  'kerning',
  'left',
  'letter-spacing',
  'line-clamp',
  'line-height',
  'line-height-step',
  'list-style-image',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'mask',
  'mask-border-outset',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-image',
  'mask-position',
  'mask-size',
  'math-depth',
  'max-height',
  'max-lines',
  'max-width',
  'min-height',
  'min-width',
  'object-position',
  'offset-anchor',
  'offset-distance',
  'offset-path',
  'offset-position',
  'offset-rotate',
  'opacity',
  'order',
  'orphans',
  'outline-color',
  'outline-offset',
  'outline-width',
  'overflow-clip-margin',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'pause-after',
  'pause-before',
  'perspective',
  'perspective-origin',
  'r',
  'rest-after',
  'rest-before',
  'right',
  'rotate',
  'row-gap',
  'rx',
  'ry',
  'scale',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-coordinate',
  'scroll-snap-destination',
  'scroll-snap-points-x',
  'scroll-snap-points-y',
  'scrollbar-color',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-miterlimit',
  'stroke-width',
  'tab-size',
  'text-combine-upright',
  'text-decoration-color',
  'text-decoration-thickness',
  'text-emphasis-color',
  'text-indent',
  'text-shadow',
  'text-size-adjust',
  'text-underline-offset',
  'top',
  'transform',
  'transform-origin',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-timing-function',
  'translate',
  'vertical-align',
  'view-timeline-inset',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'widows',
  'width',
  'word-spacing',
  'x',
  'y',
  'z-index',
  'zoom',
] as const;

/** 数值属性名类型 */
export type NumericPropertyName = typeof NUMERIC_PROPERTIES[number];

/** 属性到数值类型名称的映射 */
export const PROPERTY_NUMBER_TYPES = {
  'accent-color': ACCENT_COLOR_NUMBER_TYPES,
  'animation': ANIMATION_NUMBER_TYPES,
  'animation-delay': ANIMATION_DELAY_NUMBER_TYPES,
  'animation-duration': ANIMATION_DURATION_NUMBER_TYPES,
  'animation-iteration-count': ANIMATION_ITERATION_COUNT_NUMBER_TYPES,
  'animation-range-end': ANIMATION_RANGE_END_NUMBER_TYPES,
  'animation-range-start': ANIMATION_RANGE_START_NUMBER_TYPES,
  'animation-timing-function': ANIMATION_TIMING_FUNCTION_NUMBER_TYPES,
  'aspect-ratio': ASPECT_RATIO_NUMBER_TYPES,
  'azimuth': AZIMUTH_NUMBER_TYPES,
  'backdrop-filter': BACKDROP_FILTER_NUMBER_TYPES,
  'background': BACKGROUND_NUMBER_TYPES,
  'background-color': BACKGROUND_COLOR_NUMBER_TYPES,
  'background-image': BACKGROUND_IMAGE_NUMBER_TYPES,
  'background-position': BACKGROUND_POSITION_NUMBER_TYPES,
  'background-position-x': BACKGROUND_POSITION_X_NUMBER_TYPES,
  'background-position-y': BACKGROUND_POSITION_Y_NUMBER_TYPES,
  'background-size': BACKGROUND_SIZE_NUMBER_TYPES,
  'baseline-shift': BASELINE_SHIFT_NUMBER_TYPES,
  'border': BORDER_NUMBER_TYPES,
  'border-block': BORDER_BLOCK_NUMBER_TYPES,
  'border-block-end': BORDER_BLOCK_END_NUMBER_TYPES,
  'border-block-start': BORDER_BLOCK_START_NUMBER_TYPES,
  'border-bottom': BORDER_BOTTOM_NUMBER_TYPES,
  'border-bottom-left-radius': BORDER_BOTTOM_LEFT_RADIUS_NUMBER_TYPES,
  'border-bottom-right-radius': BORDER_BOTTOM_RIGHT_RADIUS_NUMBER_TYPES,
  'border-bottom-width': BORDER_BOTTOM_WIDTH_NUMBER_TYPES,
  'border-color': BORDER_COLOR_NUMBER_TYPES,
  'border-end-end-radius': BORDER_END_END_RADIUS_NUMBER_TYPES,
  'border-end-start-radius': BORDER_END_START_RADIUS_NUMBER_TYPES,
  'border-image-outset': BORDER_IMAGE_OUTSET_NUMBER_TYPES,
  'border-image-slice': BORDER_IMAGE_SLICE_NUMBER_TYPES,
  'border-image-source': BORDER_IMAGE_SOURCE_NUMBER_TYPES,
  'border-image-width': BORDER_IMAGE_WIDTH_NUMBER_TYPES,
  'border-inline': BORDER_INLINE_NUMBER_TYPES,
  'border-inline-end': BORDER_INLINE_END_NUMBER_TYPES,
  'border-inline-start': BORDER_INLINE_START_NUMBER_TYPES,
  'border-left': BORDER_LEFT_NUMBER_TYPES,
  'border-left-color': BORDER_LEFT_COLOR_NUMBER_TYPES,
  'border-left-width': BORDER_LEFT_WIDTH_NUMBER_TYPES,
  'border-radius': BORDER_RADIUS_NUMBER_TYPES,
  'border-right': BORDER_RIGHT_NUMBER_TYPES,
  'border-right-color': BORDER_RIGHT_COLOR_NUMBER_TYPES,
  'border-right-width': BORDER_RIGHT_WIDTH_NUMBER_TYPES,
  'border-spacing': BORDER_SPACING_NUMBER_TYPES,
  'border-start-end-radius': BORDER_START_END_RADIUS_NUMBER_TYPES,
  'border-start-start-radius': BORDER_START_START_RADIUS_NUMBER_TYPES,
  'border-top': BORDER_TOP_NUMBER_TYPES,
  'border-top-color': BORDER_TOP_COLOR_NUMBER_TYPES,
  'border-top-left-radius': BORDER_TOP_LEFT_RADIUS_NUMBER_TYPES,
  'border-top-right-radius': BORDER_TOP_RIGHT_RADIUS_NUMBER_TYPES,
  'border-top-width': BORDER_TOP_WIDTH_NUMBER_TYPES,
  'border-width': BORDER_WIDTH_NUMBER_TYPES,
  'bottom': BOTTOM_NUMBER_TYPES,
  'box-flex': BOX_FLEX_NUMBER_TYPES,
  'box-flex-group': BOX_FLEX_GROUP_NUMBER_TYPES,
  'box-ordinal-group': BOX_ORDINAL_GROUP_NUMBER_TYPES,
  'box-shadow': BOX_SHADOW_NUMBER_TYPES,
  'caret-color': CARET_COLOR_NUMBER_TYPES,
  'clip': CLIP_NUMBER_TYPES,
  'clip-path': CLIP_PATH_NUMBER_TYPES,
  'color': COLOR_NUMBER_TYPES,
  'column-count': COLUMN_COUNT_NUMBER_TYPES,
  'column-gap': COLUMN_GAP_NUMBER_TYPES,
  'column-rule-color': COLUMN_RULE_COLOR_NUMBER_TYPES,
  'column-width': COLUMN_WIDTH_NUMBER_TYPES,
  'contain-intrinsic-block-size': CONTAIN_INTRINSIC_BLOCK_SIZE_NUMBER_TYPES,
  'contain-intrinsic-height': CONTAIN_INTRINSIC_HEIGHT_NUMBER_TYPES,
  'contain-intrinsic-inline-size': CONTAIN_INTRINSIC_INLINE_SIZE_NUMBER_TYPES,
  'contain-intrinsic-size': CONTAIN_INTRINSIC_SIZE_NUMBER_TYPES,
  'contain-intrinsic-width': CONTAIN_INTRINSIC_WIDTH_NUMBER_TYPES,
  'content': CONTENT_NUMBER_TYPES,
  'counter-increment': COUNTER_INCREMENT_NUMBER_TYPES,
  'counter-reset': COUNTER_RESET_NUMBER_TYPES,
  'counter-set': COUNTER_SET_NUMBER_TYPES,
  'cursor': CURSOR_NUMBER_TYPES,
  'cx': CX_NUMBER_TYPES,
  'cy': CY_NUMBER_TYPES,
  'fill': FILL_NUMBER_TYPES,
  'fill-opacity': FILL_OPACITY_NUMBER_TYPES,
  'filter': FILTER_NUMBER_TYPES,
  'flex-grow': FLEX_GROW_NUMBER_TYPES,
  'flex-shrink': FLEX_SHRINK_NUMBER_TYPES,
  'font-feature-settings': FONT_FEATURE_SETTINGS_NUMBER_TYPES,
  'font-size': FONT_SIZE_NUMBER_TYPES,
  'font-size-adjust': FONT_SIZE_ADJUST_NUMBER_TYPES,
  'font-smooth': FONT_SMOOTH_NUMBER_TYPES,
  'font-stretch': FONT_STRETCH_NUMBER_TYPES,
  'font-style': FONT_STYLE_NUMBER_TYPES,
  'font-variation-settings': FONT_VARIATION_SETTINGS_NUMBER_TYPES,
  'font-weight': FONT_WEIGHT_NUMBER_TYPES,
  'glyph-orientation-horizontal': GLYPH_ORIENTATION_HORIZONTAL_NUMBER_TYPES,
  'glyph-orientation-vertical': GLYPH_ORIENTATION_VERTICAL_NUMBER_TYPES,
  'grid-area': GRID_AREA_NUMBER_TYPES,
  'grid-auto-columns': GRID_AUTO_COLUMNS_NUMBER_TYPES,
  'grid-auto-rows': GRID_AUTO_ROWS_NUMBER_TYPES,
  'grid-column': GRID_COLUMN_NUMBER_TYPES,
  'grid-column-end': GRID_COLUMN_END_NUMBER_TYPES,
  'grid-column-gap': GRID_COLUMN_GAP_NUMBER_TYPES,
  'grid-column-start': GRID_COLUMN_START_NUMBER_TYPES,
  'grid-row': GRID_ROW_NUMBER_TYPES,
  'grid-row-end': GRID_ROW_END_NUMBER_TYPES,
  'grid-row-gap': GRID_ROW_GAP_NUMBER_TYPES,
  'grid-row-start': GRID_ROW_START_NUMBER_TYPES,
  'grid-template': GRID_TEMPLATE_NUMBER_TYPES,
  'grid-template-columns': GRID_TEMPLATE_COLUMNS_NUMBER_TYPES,
  'grid-template-rows': GRID_TEMPLATE_ROWS_NUMBER_TYPES,
  'height': HEIGHT_NUMBER_TYPES,
  'hyphenate-limit-chars': HYPHENATE_LIMIT_CHARS_NUMBER_TYPES,
  'image-orientation': IMAGE_ORIENTATION_NUMBER_TYPES,
  'image-resolution': IMAGE_RESOLUTION_NUMBER_TYPES,
  'initial-letter': INITIAL_LETTER_NUMBER_TYPES,
  'kerning': KERNING_NUMBER_TYPES,
  'left': LEFT_NUMBER_TYPES,
  'letter-spacing': LETTER_SPACING_NUMBER_TYPES,
  'line-clamp': LINE_CLAMP_NUMBER_TYPES,
  'line-height': LINE_HEIGHT_NUMBER_TYPES,
  'line-height-step': LINE_HEIGHT_STEP_NUMBER_TYPES,
  'list-style-image': LIST_STYLE_IMAGE_NUMBER_TYPES,
  'margin': MARGIN_NUMBER_TYPES,
  'margin-bottom': MARGIN_BOTTOM_NUMBER_TYPES,
  'margin-left': MARGIN_LEFT_NUMBER_TYPES,
  'margin-right': MARGIN_RIGHT_NUMBER_TYPES,
  'margin-top': MARGIN_TOP_NUMBER_TYPES,
  'mask': MASK_NUMBER_TYPES,
  'mask-border-outset': MASK_BORDER_OUTSET_NUMBER_TYPES,
  'mask-border-slice': MASK_BORDER_SLICE_NUMBER_TYPES,
  'mask-border-source': MASK_BORDER_SOURCE_NUMBER_TYPES,
  'mask-border-width': MASK_BORDER_WIDTH_NUMBER_TYPES,
  'mask-image': MASK_IMAGE_NUMBER_TYPES,
  'mask-position': MASK_POSITION_NUMBER_TYPES,
  'mask-size': MASK_SIZE_NUMBER_TYPES,
  'math-depth': MATH_DEPTH_NUMBER_TYPES,
  'max-height': MAX_HEIGHT_NUMBER_TYPES,
  'max-lines': MAX_LINES_NUMBER_TYPES,
  'max-width': MAX_WIDTH_NUMBER_TYPES,
  'min-height': MIN_HEIGHT_NUMBER_TYPES,
  'min-width': MIN_WIDTH_NUMBER_TYPES,
  'object-position': OBJECT_POSITION_NUMBER_TYPES,
  'offset-anchor': OFFSET_ANCHOR_NUMBER_TYPES,
  'offset-distance': OFFSET_DISTANCE_NUMBER_TYPES,
  'offset-path': OFFSET_PATH_NUMBER_TYPES,
  'offset-position': OFFSET_POSITION_NUMBER_TYPES,
  'offset-rotate': OFFSET_ROTATE_NUMBER_TYPES,
  'opacity': OPACITY_NUMBER_TYPES,
  'order': ORDER_NUMBER_TYPES,
  'orphans': ORPHANS_NUMBER_TYPES,
  'outline-color': OUTLINE_COLOR_NUMBER_TYPES,
  'outline-offset': OUTLINE_OFFSET_NUMBER_TYPES,
  'outline-width': OUTLINE_WIDTH_NUMBER_TYPES,
  'overflow-clip-margin': OVERFLOW_CLIP_MARGIN_NUMBER_TYPES,
  'padding': PADDING_NUMBER_TYPES,
  'padding-bottom': PADDING_BOTTOM_NUMBER_TYPES,
  'padding-left': PADDING_LEFT_NUMBER_TYPES,
  'padding-right': PADDING_RIGHT_NUMBER_TYPES,
  'padding-top': PADDING_TOP_NUMBER_TYPES,
  'pause-after': PAUSE_AFTER_NUMBER_TYPES,
  'pause-before': PAUSE_BEFORE_NUMBER_TYPES,
  'perspective': PERSPECTIVE_NUMBER_TYPES,
  'perspective-origin': PERSPECTIVE_ORIGIN_NUMBER_TYPES,
  'r': R_NUMBER_TYPES,
  'rest-after': REST_AFTER_NUMBER_TYPES,
  'rest-before': REST_BEFORE_NUMBER_TYPES,
  'right': RIGHT_NUMBER_TYPES,
  'rotate': ROTATE_NUMBER_TYPES,
  'row-gap': ROW_GAP_NUMBER_TYPES,
  'rx': RX_NUMBER_TYPES,
  'ry': RY_NUMBER_TYPES,
  'scale': SCALE_NUMBER_TYPES,
  'scroll-margin': SCROLL_MARGIN_NUMBER_TYPES,
  'scroll-margin-block': SCROLL_MARGIN_BLOCK_NUMBER_TYPES,
  'scroll-margin-block-end': SCROLL_MARGIN_BLOCK_END_NUMBER_TYPES,
  'scroll-margin-block-start': SCROLL_MARGIN_BLOCK_START_NUMBER_TYPES,
  'scroll-margin-bottom': SCROLL_MARGIN_BOTTOM_NUMBER_TYPES,
  'scroll-margin-inline': SCROLL_MARGIN_INLINE_NUMBER_TYPES,
  'scroll-margin-inline-end': SCROLL_MARGIN_INLINE_END_NUMBER_TYPES,
  'scroll-margin-inline-start': SCROLL_MARGIN_INLINE_START_NUMBER_TYPES,
  'scroll-margin-left': SCROLL_MARGIN_LEFT_NUMBER_TYPES,
  'scroll-margin-right': SCROLL_MARGIN_RIGHT_NUMBER_TYPES,
  'scroll-margin-top': SCROLL_MARGIN_TOP_NUMBER_TYPES,
  'scroll-padding': SCROLL_PADDING_NUMBER_TYPES,
  'scroll-padding-block': SCROLL_PADDING_BLOCK_NUMBER_TYPES,
  'scroll-padding-block-end': SCROLL_PADDING_BLOCK_END_NUMBER_TYPES,
  'scroll-padding-block-start': SCROLL_PADDING_BLOCK_START_NUMBER_TYPES,
  'scroll-padding-bottom': SCROLL_PADDING_BOTTOM_NUMBER_TYPES,
  'scroll-padding-inline': SCROLL_PADDING_INLINE_NUMBER_TYPES,
  'scroll-padding-inline-end': SCROLL_PADDING_INLINE_END_NUMBER_TYPES,
  'scroll-padding-inline-start': SCROLL_PADDING_INLINE_START_NUMBER_TYPES,
  'scroll-padding-left': SCROLL_PADDING_LEFT_NUMBER_TYPES,
  'scroll-padding-right': SCROLL_PADDING_RIGHT_NUMBER_TYPES,
  'scroll-padding-top': SCROLL_PADDING_TOP_NUMBER_TYPES,
  'scroll-snap-coordinate': SCROLL_SNAP_COORDINATE_NUMBER_TYPES,
  'scroll-snap-destination': SCROLL_SNAP_DESTINATION_NUMBER_TYPES,
  'scroll-snap-points-x': SCROLL_SNAP_POINTS_X_NUMBER_TYPES,
  'scroll-snap-points-y': SCROLL_SNAP_POINTS_Y_NUMBER_TYPES,
  'scrollbar-color': SCROLLBAR_COLOR_NUMBER_TYPES,
  'shape-image-threshold': SHAPE_IMAGE_THRESHOLD_NUMBER_TYPES,
  'shape-margin': SHAPE_MARGIN_NUMBER_TYPES,
  'shape-outside': SHAPE_OUTSIDE_NUMBER_TYPES,
  'stroke': STROKE_NUMBER_TYPES,
  'stroke-dasharray': STROKE_DASHARRAY_NUMBER_TYPES,
  'stroke-dashoffset': STROKE_DASHOFFSET_NUMBER_TYPES,
  'stroke-miterlimit': STROKE_MITERLIMIT_NUMBER_TYPES,
  'stroke-width': STROKE_WIDTH_NUMBER_TYPES,
  'tab-size': TAB_SIZE_NUMBER_TYPES,
  'text-combine-upright': TEXT_COMBINE_UPRIGHT_NUMBER_TYPES,
  'text-decoration-color': TEXT_DECORATION_COLOR_NUMBER_TYPES,
  'text-decoration-thickness': TEXT_DECORATION_THICKNESS_NUMBER_TYPES,
  'text-emphasis-color': TEXT_EMPHASIS_COLOR_NUMBER_TYPES,
  'text-indent': TEXT_INDENT_NUMBER_TYPES,
  'text-shadow': TEXT_SHADOW_NUMBER_TYPES,
  'text-size-adjust': TEXT_SIZE_ADJUST_NUMBER_TYPES,
  'text-underline-offset': TEXT_UNDERLINE_OFFSET_NUMBER_TYPES,
  'top': TOP_NUMBER_TYPES,
  'transform': TRANSFORM_NUMBER_TYPES,
  'transform-origin': TRANSFORM_ORIGIN_NUMBER_TYPES,
  'transition': TRANSITION_NUMBER_TYPES,
  'transition-delay': TRANSITION_DELAY_NUMBER_TYPES,
  'transition-duration': TRANSITION_DURATION_NUMBER_TYPES,
  'transition-timing-function': TRANSITION_TIMING_FUNCTION_NUMBER_TYPES,
  'translate': TRANSLATE_NUMBER_TYPES,
  'vertical-align': VERTICAL_ALIGN_NUMBER_TYPES,
  'view-timeline-inset': VIEW_TIMELINE_INSET_NUMBER_TYPES,
  'voice-balance': VOICE_BALANCE_NUMBER_TYPES,
  'voice-duration': VOICE_DURATION_NUMBER_TYPES,
  'voice-family': VOICE_FAMILY_NUMBER_TYPES,
  'voice-pitch': VOICE_PITCH_NUMBER_TYPES,
  'voice-range': VOICE_RANGE_NUMBER_TYPES,
  'voice-rate': VOICE_RATE_NUMBER_TYPES,
  'widows': WIDOWS_NUMBER_TYPES,
  'width': WIDTH_NUMBER_TYPES,
  'word-spacing': WORD_SPACING_NUMBER_TYPES,
  'x': X_NUMBER_TYPES,
  'y': Y_NUMBER_TYPES,
  'z-index': Z_INDEX_NUMBER_TYPES,
  'zoom': ZOOM_NUMBER_TYPES,
} as const;
