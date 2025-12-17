/**
 * CSS 数值类型定义
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-17T16:20:10.307Z
 *
 * 类型层级：
 * 层级1: 单位类型 (PxUnitType = 'px')
 * 层级2: 数值类型 = 单位类型联合 (LengthNumberType = PxUnitType | EmUnitType | ...)
 * 层级3: 属性数值类型 = 数值类型联合 (WidthPropertyNumberType = LengthNumberType | ...)
 */

// ==================== 数值类型（13种） ====================

/** 所有数值类型名称 */
export const NUMBER_TYPES = [
  'angle', // 角度值，以度 (deg)、百分度 (grad)、弧度 (rad) 或圈数 (turn) 表示。
  'angle-percentage', // 可以是 <angle> 或 <percentage> 的值。
  'flex', // 弹性长度，以 fr 为单位，表示网格容器中剩余空间的分数。
  'frequency', // 频率值，以赫兹 (Hz) 或千赫兹 (kHz) 表示。
  'frequency-percentage', // 可以是 <frequency> 或 <percentage> 的值。
  'integer', // 整数，正数或负数。
  'length', // 距离度量。表示长度值，如 px、em、rem、vh、vw 等。
  'length-percentage', // 可以是 <length> 或 <percentage> 的值。
  'number', // 实数，可能带有小数部分。
  'percentage', // 百分比值。表示某个其他值的分数。
  'resolution', // 分辨率值，用于描述输出设备的像素密度 (dpi、dpcm、dppx)。
  'time', // 时间值，以秒 (s) 或毫秒 (ms) 表示。
  'time-percentage', // 可以是 <time> 或 <percentage> 的值。
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

// ==================== 层级3: 属性数值类型 = 数值类型联合 ====================

/** accent-color 属性支持的数值类型 */
export type AccentColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** animation 属性支持的数值类型 */
export type AnimationPropertyNumberType = IntegerNumberType | NumberNumberType;
/** animation-delay 属性支持的数值类型 */
export type AnimationDelayPropertyNumberType = TimeNumberType;
/** animation-duration 属性支持的数值类型 */
export type AnimationDurationPropertyNumberType = TimeNumberType;
/** animation-iteration-count 属性支持的数值类型 */
export type AnimationIterationCountPropertyNumberType = NumberNumberType;
/** animation-range-end 属性支持的数值类型 */
export type AnimationRangeEndPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** animation-range-start 属性支持的数值类型 */
export type AnimationRangeStartPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** animation-timing-function 属性支持的数值类型 */
export type AnimationTimingFunctionPropertyNumberType = IntegerNumberType | NumberNumberType;
/** aspect-ratio 属性支持的数值类型 */
export type AspectRatioPropertyNumberType = NumberNumberType;
/** azimuth 属性支持的数值类型 */
export type AzimuthPropertyNumberType = AngleNumberType;
/** backdrop-filter 属性支持的数值类型 */
export type BackdropFilterPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** background 属性支持的数值类型 */
export type BackgroundPropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** background-color 属性支持的数值类型 */
export type BackgroundColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** background-image 属性支持的数值类型 */
export type BackgroundImagePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** background-position 属性支持的数值类型 */
export type BackgroundPositionPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-position-x 属性支持的数值类型 */
export type BackgroundPositionXPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-position-y 属性支持的数值类型 */
export type BackgroundPositionYPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** background-size 属性支持的数值类型 */
export type BackgroundSizePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** baseline-shift 属性支持的数值类型 */
export type BaselineShiftPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** border 属性支持的数值类型 */
export type BorderPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-block 属性支持的数值类型 */
export type BorderBlockPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-block-end 属性支持的数值类型 */
export type BorderBlockEndPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-block-start 属性支持的数值类型 */
export type BorderBlockStartPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-bottom 属性支持的数值类型 */
export type BorderBottomPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-bottom-left-radius 属性支持的数值类型 */
export type BorderBottomLeftRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-bottom-right-radius 属性支持的数值类型 */
export type BorderBottomRightRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-bottom-width 属性支持的数值类型 */
export type BorderBottomWidthPropertyNumberType = LengthNumberType;
/** border-color 属性支持的数值类型 */
export type BorderColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-end-end-radius 属性支持的数值类型 */
export type BorderEndEndRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-end-start-radius 属性支持的数值类型 */
export type BorderEndStartRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-image-outset 属性支持的数值类型 */
export type BorderImageOutsetPropertyNumberType = LengthNumberType | NumberNumberType;
/** border-image-slice 属性支持的数值类型 */
export type BorderImageSlicePropertyNumberType = NumberNumberType | PercentageNumberType;
/** border-image-source 属性支持的数值类型 */
export type BorderImageSourcePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** border-image-width 属性支持的数值类型 */
export type BorderImageWidthPropertyNumberType = LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** border-inline 属性支持的数值类型 */
export type BorderInlinePropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-inline-end 属性支持的数值类型 */
export type BorderInlineEndPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-inline-start 属性支持的数值类型 */
export type BorderInlineStartPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-left 属性支持的数值类型 */
export type BorderLeftPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-left-color 属性支持的数值类型 */
export type BorderLeftColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-left-width 属性支持的数值类型 */
export type BorderLeftWidthPropertyNumberType = LengthNumberType;
/** border-radius 属性支持的数值类型 */
export type BorderRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-right 属性支持的数值类型 */
export type BorderRightPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-right-color 属性支持的数值类型 */
export type BorderRightColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-right-width 属性支持的数值类型 */
export type BorderRightWidthPropertyNumberType = LengthNumberType;
/** border-spacing 属性支持的数值类型 */
export type BorderSpacingPropertyNumberType = LengthNumberType;
/** border-start-end-radius 属性支持的数值类型 */
export type BorderStartEndRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-start-start-radius 属性支持的数值类型 */
export type BorderStartStartRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top 属性支持的数值类型 */
export type BorderTopPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** border-top-color 属性支持的数值类型 */
export type BorderTopColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** border-top-left-radius 属性支持的数值类型 */
export type BorderTopLeftRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top-right-radius 属性支持的数值类型 */
export type BorderTopRightRadiusPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** border-top-width 属性支持的数值类型 */
export type BorderTopWidthPropertyNumberType = LengthNumberType;
/** border-width 属性支持的数值类型 */
export type BorderWidthPropertyNumberType = LengthNumberType;
/** bottom 属性支持的数值类型 */
export type BottomPropertyNumberType = LengthNumberType | PercentageNumberType;
/** box-flex 属性支持的数值类型 */
export type BoxFlexPropertyNumberType = NumberNumberType;
/** box-flex-group 属性支持的数值类型 */
export type BoxFlexGroupPropertyNumberType = IntegerNumberType;
/** box-ordinal-group 属性支持的数值类型 */
export type BoxOrdinalGroupPropertyNumberType = IntegerNumberType;
/** box-shadow 属性支持的数值类型 */
export type BoxShadowPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** caret-color 属性支持的数值类型 */
export type CaretColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** clip 属性支持的数值类型 */
export type ClipPropertyNumberType = LengthNumberType;
/** clip-path 属性支持的数值类型 */
export type ClipPathPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** color 属性支持的数值类型 */
export type ColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** column-count 属性支持的数值类型 */
export type ColumnCountPropertyNumberType = IntegerNumberType;
/** column-gap 属性支持的数值类型 */
export type ColumnGapPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** column-rule-color 属性支持的数值类型 */
export type ColumnRuleColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** column-width 属性支持的数值类型 */
export type ColumnWidthPropertyNumberType = LengthNumberType;
/** contain-intrinsic-block-size 属性支持的数值类型 */
export type ContainIntrinsicBlockSizePropertyNumberType = LengthNumberType;
/** contain-intrinsic-height 属性支持的数值类型 */
export type ContainIntrinsicHeightPropertyNumberType = LengthNumberType;
/** contain-intrinsic-inline-size 属性支持的数值类型 */
export type ContainIntrinsicInlineSizePropertyNumberType = LengthNumberType;
/** contain-intrinsic-size 属性支持的数值类型 */
export type ContainIntrinsicSizePropertyNumberType = LengthNumberType;
/** contain-intrinsic-width 属性支持的数值类型 */
export type ContainIntrinsicWidthPropertyNumberType = LengthNumberType;
/** content 属性支持的数值类型 */
export type ContentPropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** counter-increment 属性支持的数值类型 */
export type CounterIncrementPropertyNumberType = IntegerNumberType;
/** counter-reset 属性支持的数值类型 */
export type CounterResetPropertyNumberType = IntegerNumberType;
/** counter-set 属性支持的数值类型 */
export type CounterSetPropertyNumberType = IntegerNumberType;
/** cursor 属性支持的数值类型 */
export type CursorPropertyNumberType = NumberNumberType;
/** cx 属性支持的数值类型 */
export type CxPropertyNumberType = LengthNumberType | PercentageNumberType;
/** cy 属性支持的数值类型 */
export type CyPropertyNumberType = LengthNumberType | PercentageNumberType;
/** fill 属性支持的数值类型 */
export type FillPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** fill-opacity 属性支持的数值类型 */
export type FillOpacityPropertyNumberType = NumberNumberType;
/** filter 属性支持的数值类型 */
export type FilterPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** flex-grow 属性支持的数值类型 */
export type FlexGrowPropertyNumberType = NumberNumberType;
/** flex-shrink 属性支持的数值类型 */
export type FlexShrinkPropertyNumberType = NumberNumberType;
/** font-feature-settings 属性支持的数值类型 */
export type FontFeatureSettingsPropertyNumberType = IntegerNumberType;
/** font-size 属性支持的数值类型 */
export type FontSizePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** font-size-adjust 属性支持的数值类型 */
export type FontSizeAdjustPropertyNumberType = NumberNumberType;
/** font-smooth 属性支持的数值类型 */
export type FontSmoothPropertyNumberType = LengthNumberType;
/** font-stretch 属性支持的数值类型 */
export type FontStretchPropertyNumberType = PercentageNumberType;
/** font-style 属性支持的数值类型 */
export type FontStylePropertyNumberType = AngleNumberType;
/** font-variation-settings 属性支持的数值类型 */
export type FontVariationSettingsPropertyNumberType = NumberNumberType;
/** font-weight 属性支持的数值类型 */
export type FontWeightPropertyNumberType = NumberNumberType;
/** glyph-orientation-horizontal 属性支持的数值类型 */
export type GlyphOrientationHorizontalPropertyNumberType = AngleNumberType;
/** glyph-orientation-vertical 属性支持的数值类型 */
export type GlyphOrientationVerticalPropertyNumberType = AngleNumberType;
/** grid-area 属性支持的数值类型 */
export type GridAreaPropertyNumberType = IntegerNumberType;
/** grid-auto-columns 属性支持的数值类型 */
export type GridAutoColumnsPropertyNumberType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-auto-rows 属性支持的数值类型 */
export type GridAutoRowsPropertyNumberType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-column 属性支持的数值类型 */
export type GridColumnPropertyNumberType = IntegerNumberType;
/** grid-column-end 属性支持的数值类型 */
export type GridColumnEndPropertyNumberType = IntegerNumberType;
/** grid-column-gap 属性支持的数值类型 */
export type GridColumnGapPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-column-start 属性支持的数值类型 */
export type GridColumnStartPropertyNumberType = IntegerNumberType;
/** grid-row 属性支持的数值类型 */
export type GridRowPropertyNumberType = IntegerNumberType;
/** grid-row-end 属性支持的数值类型 */
export type GridRowEndPropertyNumberType = IntegerNumberType;
/** grid-row-gap 属性支持的数值类型 */
export type GridRowGapPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-row-start 属性支持的数值类型 */
export type GridRowStartPropertyNumberType = IntegerNumberType;
/** grid-template 属性支持的数值类型 */
export type GridTemplatePropertyNumberType = FlexNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-template-columns 属性支持的数值类型 */
export type GridTemplateColumnsPropertyNumberType = FlexNumberType | IntegerNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** grid-template-rows 属性支持的数值类型 */
export type GridTemplateRowsPropertyNumberType = FlexNumberType | IntegerNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** height 属性支持的数值类型 */
export type HeightPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** hyphenate-limit-chars 属性支持的数值类型 */
export type HyphenateLimitCharsPropertyNumberType = IntegerNumberType;
/** image-orientation 属性支持的数值类型 */
export type ImageOrientationPropertyNumberType = AngleNumberType;
/** image-resolution 属性支持的数值类型 */
export type ImageResolutionPropertyNumberType = ResolutionNumberType;
/** initial-letter 属性支持的数值类型 */
export type InitialLetterPropertyNumberType = IntegerNumberType | NumberNumberType;
/** kerning 属性支持的数值类型 */
export type KerningPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** left 属性支持的数值类型 */
export type LeftPropertyNumberType = LengthNumberType | PercentageNumberType;
/** letter-spacing 属性支持的数值类型 */
export type LetterSpacingPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** line-clamp 属性支持的数值类型 */
export type LineClampPropertyNumberType = IntegerNumberType;
/** line-height 属性支持的数值类型 */
export type LineHeightPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** line-height-step 属性支持的数值类型 */
export type LineHeightStepPropertyNumberType = LengthNumberType;
/** list-style-image 属性支持的数值类型 */
export type ListStyleImagePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** margin 属性支持的数值类型 */
export type MarginPropertyNumberType = LengthNumberType | PercentageNumberType;
/** margin-bottom 属性支持的数值类型 */
export type MarginBottomPropertyNumberType = LengthNumberType | PercentageNumberType;
/** margin-left 属性支持的数值类型 */
export type MarginLeftPropertyNumberType = LengthNumberType | PercentageNumberType;
/** margin-right 属性支持的数值类型 */
export type MarginRightPropertyNumberType = LengthNumberType | PercentageNumberType;
/** margin-top 属性支持的数值类型 */
export type MarginTopPropertyNumberType = LengthNumberType | PercentageNumberType;
/** mask 属性支持的数值类型 */
export type MaskPropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-border-outset 属性支持的数值类型 */
export type MaskBorderOutsetPropertyNumberType = LengthNumberType | NumberNumberType;
/** mask-border-slice 属性支持的数值类型 */
export type MaskBorderSlicePropertyNumberType = NumberNumberType | PercentageNumberType;
/** mask-border-source 属性支持的数值类型 */
export type MaskBorderSourcePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-border-width 属性支持的数值类型 */
export type MaskBorderWidthPropertyNumberType = LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** mask-image 属性支持的数值类型 */
export type MaskImagePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** mask-position 属性支持的数值类型 */
export type MaskPositionPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** mask-size 属性支持的数值类型 */
export type MaskSizePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** math-depth 属性支持的数值类型 */
export type MathDepthPropertyNumberType = IntegerNumberType;
/** max-height 属性支持的数值类型 */
export type MaxHeightPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** max-lines 属性支持的数值类型 */
export type MaxLinesPropertyNumberType = IntegerNumberType;
/** max-width 属性支持的数值类型 */
export type MaxWidthPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** min-height 属性支持的数值类型 */
export type MinHeightPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** min-width 属性支持的数值类型 */
export type MinWidthPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** object-position 属性支持的数值类型 */
export type ObjectPositionPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-anchor 属性支持的数值类型 */
export type OffsetAnchorPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-distance 属性支持的数值类型 */
export type OffsetDistancePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-path 属性支持的数值类型 */
export type OffsetPathPropertyNumberType = AngleNumberType | LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-position 属性支持的数值类型 */
export type OffsetPositionPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** offset-rotate 属性支持的数值类型 */
export type OffsetRotatePropertyNumberType = AngleNumberType;
/** opacity 属性支持的数值类型 */
export type OpacityPropertyNumberType = NumberNumberType | PercentageNumberType;
/** order 属性支持的数值类型 */
export type OrderPropertyNumberType = IntegerNumberType;
/** orphans 属性支持的数值类型 */
export type OrphansPropertyNumberType = IntegerNumberType;
/** outline-color 属性支持的数值类型 */
export type OutlineColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** outline-offset 属性支持的数值类型 */
export type OutlineOffsetPropertyNumberType = LengthNumberType;
/** outline-width 属性支持的数值类型 */
export type OutlineWidthPropertyNumberType = LengthNumberType;
/** overflow-clip-margin 属性支持的数值类型 */
export type OverflowClipMarginPropertyNumberType = LengthNumberType;
/** padding 属性支持的数值类型 */
export type PaddingPropertyNumberType = LengthNumberType | PercentageNumberType;
/** padding-bottom 属性支持的数值类型 */
export type PaddingBottomPropertyNumberType = LengthNumberType | PercentageNumberType;
/** padding-left 属性支持的数值类型 */
export type PaddingLeftPropertyNumberType = LengthNumberType | PercentageNumberType;
/** padding-right 属性支持的数值类型 */
export type PaddingRightPropertyNumberType = LengthNumberType | PercentageNumberType;
/** padding-top 属性支持的数值类型 */
export type PaddingTopPropertyNumberType = LengthNumberType | PercentageNumberType;
/** pause-after 属性支持的数值类型 */
export type PauseAfterPropertyNumberType = TimeNumberType;
/** pause-before 属性支持的数值类型 */
export type PauseBeforePropertyNumberType = TimeNumberType;
/** perspective 属性支持的数值类型 */
export type PerspectivePropertyNumberType = LengthNumberType;
/** perspective-origin 属性支持的数值类型 */
export type PerspectiveOriginPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** r 属性支持的数值类型 */
export type RPropertyNumberType = LengthNumberType | PercentageNumberType;
/** rest-after 属性支持的数值类型 */
export type RestAfterPropertyNumberType = TimeNumberType;
/** rest-before 属性支持的数值类型 */
export type RestBeforePropertyNumberType = TimeNumberType;
/** right 属性支持的数值类型 */
export type RightPropertyNumberType = LengthNumberType | PercentageNumberType;
/** rotate 属性支持的数值类型 */
export type RotatePropertyNumberType = AngleNumberType | NumberNumberType;
/** row-gap 属性支持的数值类型 */
export type RowGapPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** rx 属性支持的数值类型 */
export type RxPropertyNumberType = LengthNumberType | PercentageNumberType;
/** ry 属性支持的数值类型 */
export type RyPropertyNumberType = LengthNumberType | PercentageNumberType;
/** scale 属性支持的数值类型 */
export type ScalePropertyNumberType = NumberNumberType | PercentageNumberType;
/** scroll-margin 属性支持的数值类型 */
export type ScrollMarginPropertyNumberType = LengthNumberType;
/** scroll-margin-block 属性支持的数值类型 */
export type ScrollMarginBlockPropertyNumberType = LengthNumberType;
/** scroll-margin-block-end 属性支持的数值类型 */
export type ScrollMarginBlockEndPropertyNumberType = LengthNumberType;
/** scroll-margin-block-start 属性支持的数值类型 */
export type ScrollMarginBlockStartPropertyNumberType = LengthNumberType;
/** scroll-margin-bottom 属性支持的数值类型 */
export type ScrollMarginBottomPropertyNumberType = LengthNumberType;
/** scroll-margin-inline 属性支持的数值类型 */
export type ScrollMarginInlinePropertyNumberType = LengthNumberType;
/** scroll-margin-inline-end 属性支持的数值类型 */
export type ScrollMarginInlineEndPropertyNumberType = LengthNumberType;
/** scroll-margin-inline-start 属性支持的数值类型 */
export type ScrollMarginInlineStartPropertyNumberType = LengthNumberType;
/** scroll-margin-left 属性支持的数值类型 */
export type ScrollMarginLeftPropertyNumberType = LengthNumberType;
/** scroll-margin-right 属性支持的数值类型 */
export type ScrollMarginRightPropertyNumberType = LengthNumberType;
/** scroll-margin-top 属性支持的数值类型 */
export type ScrollMarginTopPropertyNumberType = LengthNumberType;
/** scroll-padding 属性支持的数值类型 */
export type ScrollPaddingPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block 属性支持的数值类型 */
export type ScrollPaddingBlockPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block-end 属性支持的数值类型 */
export type ScrollPaddingBlockEndPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-block-start 属性支持的数值类型 */
export type ScrollPaddingBlockStartPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-bottom 属性支持的数值类型 */
export type ScrollPaddingBottomPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline 属性支持的数值类型 */
export type ScrollPaddingInlinePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline-end 属性支持的数值类型 */
export type ScrollPaddingInlineEndPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-inline-start 属性支持的数值类型 */
export type ScrollPaddingInlineStartPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-left 属性支持的数值类型 */
export type ScrollPaddingLeftPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-right 属性支持的数值类型 */
export type ScrollPaddingRightPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-padding-top 属性支持的数值类型 */
export type ScrollPaddingTopPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-coordinate 属性支持的数值类型 */
export type ScrollSnapCoordinatePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-destination 属性支持的数值类型 */
export type ScrollSnapDestinationPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-points-x 属性支持的数值类型 */
export type ScrollSnapPointsXPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scroll-snap-points-y 属性支持的数值类型 */
export type ScrollSnapPointsYPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** scrollbar-color 属性支持的数值类型 */
export type ScrollbarColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** shape-image-threshold 属性支持的数值类型 */
export type ShapeImageThresholdPropertyNumberType = NumberNumberType | PercentageNumberType;
/** shape-margin 属性支持的数值类型 */
export type ShapeMarginPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** shape-outside 属性支持的数值类型 */
export type ShapeOutsidePropertyNumberType = AngleNumberType | AnglePercentageNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType | ResolutionNumberType;
/** stroke 属性支持的数值类型 */
export type StrokePropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** stroke-dasharray 属性支持的数值类型 */
export type StrokeDasharrayPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** stroke-dashoffset 属性支持的数值类型 */
export type StrokeDashoffsetPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** stroke-miterlimit 属性支持的数值类型 */
export type StrokeMiterlimitPropertyNumberType = NumberNumberType;
/** stroke-width 属性支持的数值类型 */
export type StrokeWidthPropertyNumberType = LengthNumberType | NumberNumberType | PercentageNumberType;
/** tab-size 属性支持的数值类型 */
export type TabSizePropertyNumberType = IntegerNumberType | LengthNumberType;
/** text-combine-upright 属性支持的数值类型 */
export type TextCombineUprightPropertyNumberType = IntegerNumberType;
/** text-decoration-color 属性支持的数值类型 */
export type TextDecorationColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** text-decoration-thickness 属性支持的数值类型 */
export type TextDecorationThicknessPropertyNumberType = LengthNumberType | PercentageNumberType;
/** text-emphasis-color 属性支持的数值类型 */
export type TextEmphasisColorPropertyNumberType = AngleNumberType | NumberNumberType | PercentageNumberType;
/** text-indent 属性支持的数值类型 */
export type TextIndentPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** text-shadow 属性支持的数值类型 */
export type TextShadowPropertyNumberType = AngleNumberType | LengthNumberType | NumberNumberType | PercentageNumberType;
/** text-size-adjust 属性支持的数值类型 */
export type TextSizeAdjustPropertyNumberType = PercentageNumberType;
/** text-underline-offset 属性支持的数值类型 */
export type TextUnderlineOffsetPropertyNumberType = LengthNumberType | PercentageNumberType;
/** top 属性支持的数值类型 */
export type TopPropertyNumberType = LengthNumberType | PercentageNumberType;
/** transform 属性支持的数值类型 */
export type TransformPropertyNumberType = AngleNumberType | LengthNumberType | LengthPercentageNumberType | NumberNumberType | PercentageNumberType;
/** transform-origin 属性支持的数值类型 */
export type TransformOriginPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** transition 属性支持的数值类型 */
export type TransitionPropertyNumberType = IntegerNumberType | NumberNumberType | TimeNumberType;
/** transition-delay 属性支持的数值类型 */
export type TransitionDelayPropertyNumberType = TimeNumberType;
/** transition-duration 属性支持的数值类型 */
export type TransitionDurationPropertyNumberType = TimeNumberType;
/** transition-timing-function 属性支持的数值类型 */
export type TransitionTimingFunctionPropertyNumberType = IntegerNumberType | NumberNumberType;
/** translate 属性支持的数值类型 */
export type TranslatePropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** vertical-align 属性支持的数值类型 */
export type VerticalAlignPropertyNumberType = LengthNumberType | PercentageNumberType;
/** view-timeline-inset 属性支持的数值类型 */
export type ViewTimelineInsetPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** voice-balance 属性支持的数值类型 */
export type VoiceBalancePropertyNumberType = NumberNumberType;
/** voice-duration 属性支持的数值类型 */
export type VoiceDurationPropertyNumberType = TimeNumberType;
/** voice-family 属性支持的数值类型 */
export type VoiceFamilyPropertyNumberType = IntegerNumberType;
/** voice-pitch 属性支持的数值类型 */
export type VoicePitchPropertyNumberType = FrequencyNumberType | PercentageNumberType;
/** voice-range 属性支持的数值类型 */
export type VoiceRangePropertyNumberType = FrequencyNumberType | PercentageNumberType;
/** voice-rate 属性支持的数值类型 */
export type VoiceRatePropertyNumberType = PercentageNumberType;
/** widows 属性支持的数值类型 */
export type WidowsPropertyNumberType = IntegerNumberType;
/** width 属性支持的数值类型 */
export type WidthPropertyNumberType = LengthNumberType | LengthPercentageNumberType | PercentageNumberType;
/** word-spacing 属性支持的数值类型 */
export type WordSpacingPropertyNumberType = LengthNumberType;
/** x 属性支持的数值类型 */
export type XPropertyNumberType = LengthNumberType | PercentageNumberType;
/** y 属性支持的数值类型 */
export type YPropertyNumberType = LengthNumberType | PercentageNumberType;
/** z-index 属性支持的数值类型 */
export type ZIndexPropertyNumberType = IntegerNumberType;
/** zoom 属性支持的数值类型 */
export type ZoomPropertyNumberType = NumberNumberType | PercentageNumberType;

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
  'accent-color': ['angle', 'number', 'percentage'] as const,
  'animation': ['integer', 'number'] as const,
  'animation-delay': ['time'] as const,
  'animation-duration': ['time'] as const,
  'animation-iteration-count': ['number'] as const,
  'animation-range-end': ['length', 'length-percentage', 'percentage'] as const,
  'animation-range-start': ['length', 'length-percentage', 'percentage'] as const,
  'animation-timing-function': ['integer', 'number'] as const,
  'aspect-ratio': ['number'] as const,
  'azimuth': ['angle'] as const,
  'backdrop-filter': ['angle', 'length', 'number', 'percentage'] as const,
  'background': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'background-color': ['angle', 'number', 'percentage'] as const,
  'background-image': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'background-position': ['length', 'length-percentage', 'percentage'] as const,
  'background-position-x': ['length', 'length-percentage', 'percentage'] as const,
  'background-position-y': ['length', 'length-percentage', 'percentage'] as const,
  'background-size': ['length', 'length-percentage', 'percentage'] as const,
  'baseline-shift': ['length', 'number', 'percentage'] as const,
  'border': ['angle', 'length', 'number', 'percentage'] as const,
  'border-block': ['angle', 'number', 'percentage'] as const,
  'border-block-end': ['angle', 'number', 'percentage'] as const,
  'border-block-start': ['angle', 'number', 'percentage'] as const,
  'border-bottom': ['angle', 'length', 'number', 'percentage'] as const,
  'border-bottom-left-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-bottom-right-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-bottom-width': ['length'] as const,
  'border-color': ['angle', 'number', 'percentage'] as const,
  'border-end-end-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-end-start-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-image-outset': ['length', 'number'] as const,
  'border-image-slice': ['number', 'percentage'] as const,
  'border-image-source': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'border-image-width': ['length', 'length-percentage', 'number', 'percentage'] as const,
  'border-inline': ['angle', 'number', 'percentage'] as const,
  'border-inline-end': ['angle', 'number', 'percentage'] as const,
  'border-inline-start': ['angle', 'number', 'percentage'] as const,
  'border-left': ['angle', 'length', 'number', 'percentage'] as const,
  'border-left-color': ['angle', 'number', 'percentage'] as const,
  'border-left-width': ['length'] as const,
  'border-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-right': ['angle', 'length', 'number', 'percentage'] as const,
  'border-right-color': ['angle', 'number', 'percentage'] as const,
  'border-right-width': ['length'] as const,
  'border-spacing': ['length'] as const,
  'border-start-end-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-start-start-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-top': ['angle', 'length', 'number', 'percentage'] as const,
  'border-top-color': ['angle', 'number', 'percentage'] as const,
  'border-top-left-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-top-right-radius': ['length', 'length-percentage', 'percentage'] as const,
  'border-top-width': ['length'] as const,
  'border-width': ['length'] as const,
  'bottom': ['length', 'percentage'] as const,
  'box-flex': ['number'] as const,
  'box-flex-group': ['integer'] as const,
  'box-ordinal-group': ['integer'] as const,
  'box-shadow': ['angle', 'length', 'number', 'percentage'] as const,
  'caret-color': ['angle', 'number', 'percentage'] as const,
  'clip': ['length'] as const,
  'clip-path': ['length', 'length-percentage', 'percentage'] as const,
  'color': ['angle', 'number', 'percentage'] as const,
  'column-count': ['integer'] as const,
  'column-gap': ['length', 'length-percentage', 'percentage'] as const,
  'column-rule-color': ['angle', 'number', 'percentage'] as const,
  'column-width': ['length'] as const,
  'contain-intrinsic-block-size': ['length'] as const,
  'contain-intrinsic-height': ['length'] as const,
  'contain-intrinsic-inline-size': ['length'] as const,
  'contain-intrinsic-size': ['length'] as const,
  'contain-intrinsic-width': ['length'] as const,
  'content': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'counter-increment': ['integer'] as const,
  'counter-reset': ['integer'] as const,
  'counter-set': ['integer'] as const,
  'cursor': ['number'] as const,
  'cx': ['length', 'percentage'] as const,
  'cy': ['length', 'percentage'] as const,
  'fill': ['angle', 'number', 'percentage'] as const,
  'fill-opacity': ['number'] as const,
  'filter': ['angle', 'length', 'number', 'percentage'] as const,
  'flex-grow': ['number'] as const,
  'flex-shrink': ['number'] as const,
  'font-feature-settings': ['integer'] as const,
  'font-size': ['length', 'length-percentage', 'percentage'] as const,
  'font-size-adjust': ['number'] as const,
  'font-smooth': ['length'] as const,
  'font-stretch': ['percentage'] as const,
  'font-style': ['angle'] as const,
  'font-variation-settings': ['number'] as const,
  'font-weight': ['number'] as const,
  'glyph-orientation-horizontal': ['angle'] as const,
  'glyph-orientation-vertical': ['angle'] as const,
  'grid-area': ['integer'] as const,
  'grid-auto-columns': ['flex', 'length', 'length-percentage', 'percentage'] as const,
  'grid-auto-rows': ['flex', 'length', 'length-percentage', 'percentage'] as const,
  'grid-column': ['integer'] as const,
  'grid-column-end': ['integer'] as const,
  'grid-column-gap': ['length', 'length-percentage', 'percentage'] as const,
  'grid-column-start': ['integer'] as const,
  'grid-row': ['integer'] as const,
  'grid-row-end': ['integer'] as const,
  'grid-row-gap': ['length', 'length-percentage', 'percentage'] as const,
  'grid-row-start': ['integer'] as const,
  'grid-template': ['flex', 'length', 'length-percentage', 'percentage'] as const,
  'grid-template-columns': ['flex', 'integer', 'length', 'length-percentage', 'percentage'] as const,
  'grid-template-rows': ['flex', 'integer', 'length', 'length-percentage', 'percentage'] as const,
  'height': ['length', 'length-percentage', 'percentage'] as const,
  'hyphenate-limit-chars': ['integer'] as const,
  'image-orientation': ['angle'] as const,
  'image-resolution': ['resolution'] as const,
  'initial-letter': ['integer', 'number'] as const,
  'kerning': ['length', 'number', 'percentage'] as const,
  'left': ['length', 'percentage'] as const,
  'letter-spacing': ['length', 'length-percentage', 'percentage'] as const,
  'line-clamp': ['integer'] as const,
  'line-height': ['length', 'number', 'percentage'] as const,
  'line-height-step': ['length'] as const,
  'list-style-image': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'margin': ['length', 'percentage'] as const,
  'margin-bottom': ['length', 'percentage'] as const,
  'margin-left': ['length', 'percentage'] as const,
  'margin-right': ['length', 'percentage'] as const,
  'margin-top': ['length', 'percentage'] as const,
  'mask': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'mask-border-outset': ['length', 'number'] as const,
  'mask-border-slice': ['number', 'percentage'] as const,
  'mask-border-source': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'mask-border-width': ['length', 'length-percentage', 'number', 'percentage'] as const,
  'mask-image': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'mask-position': ['length', 'length-percentage', 'percentage'] as const,
  'mask-size': ['length', 'length-percentage', 'percentage'] as const,
  'math-depth': ['integer'] as const,
  'max-height': ['length', 'length-percentage', 'percentage'] as const,
  'max-lines': ['integer'] as const,
  'max-width': ['length', 'length-percentage', 'percentage'] as const,
  'min-height': ['length', 'length-percentage', 'percentage'] as const,
  'min-width': ['length', 'length-percentage', 'percentage'] as const,
  'object-position': ['length', 'length-percentage', 'percentage'] as const,
  'offset-anchor': ['length', 'length-percentage', 'percentage'] as const,
  'offset-distance': ['length', 'length-percentage', 'percentage'] as const,
  'offset-path': ['angle', 'length', 'length-percentage', 'percentage'] as const,
  'offset-position': ['length', 'length-percentage', 'percentage'] as const,
  'offset-rotate': ['angle'] as const,
  'opacity': ['number', 'percentage'] as const,
  'order': ['integer'] as const,
  'orphans': ['integer'] as const,
  'outline-color': ['angle', 'number', 'percentage'] as const,
  'outline-offset': ['length'] as const,
  'outline-width': ['length'] as const,
  'overflow-clip-margin': ['length'] as const,
  'padding': ['length', 'percentage'] as const,
  'padding-bottom': ['length', 'percentage'] as const,
  'padding-left': ['length', 'percentage'] as const,
  'padding-right': ['length', 'percentage'] as const,
  'padding-top': ['length', 'percentage'] as const,
  'pause-after': ['time'] as const,
  'pause-before': ['time'] as const,
  'perspective': ['length'] as const,
  'perspective-origin': ['length', 'length-percentage', 'percentage'] as const,
  'r': ['length', 'percentage'] as const,
  'rest-after': ['time'] as const,
  'rest-before': ['time'] as const,
  'right': ['length', 'percentage'] as const,
  'rotate': ['angle', 'number'] as const,
  'row-gap': ['length', 'length-percentage', 'percentage'] as const,
  'rx': ['length', 'percentage'] as const,
  'ry': ['length', 'percentage'] as const,
  'scale': ['number', 'percentage'] as const,
  'scroll-margin': ['length'] as const,
  'scroll-margin-block': ['length'] as const,
  'scroll-margin-block-end': ['length'] as const,
  'scroll-margin-block-start': ['length'] as const,
  'scroll-margin-bottom': ['length'] as const,
  'scroll-margin-inline': ['length'] as const,
  'scroll-margin-inline-end': ['length'] as const,
  'scroll-margin-inline-start': ['length'] as const,
  'scroll-margin-left': ['length'] as const,
  'scroll-margin-right': ['length'] as const,
  'scroll-margin-top': ['length'] as const,
  'scroll-padding': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-block': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-block-end': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-block-start': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-bottom': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-inline': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-inline-end': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-inline-start': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-left': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-right': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-padding-top': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-snap-coordinate': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-snap-destination': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-snap-points-x': ['length', 'length-percentage', 'percentage'] as const,
  'scroll-snap-points-y': ['length', 'length-percentage', 'percentage'] as const,
  'scrollbar-color': ['angle', 'number', 'percentage'] as const,
  'shape-image-threshold': ['number', 'percentage'] as const,
  'shape-margin': ['length', 'length-percentage', 'percentage'] as const,
  'shape-outside': ['angle', 'angle-percentage', 'length', 'length-percentage', 'number', 'percentage', 'resolution'] as const,
  'stroke': ['angle', 'number', 'percentage'] as const,
  'stroke-dasharray': ['length', 'number', 'percentage'] as const,
  'stroke-dashoffset': ['length', 'number', 'percentage'] as const,
  'stroke-miterlimit': ['number'] as const,
  'stroke-width': ['length', 'number', 'percentage'] as const,
  'tab-size': ['integer', 'length'] as const,
  'text-combine-upright': ['integer'] as const,
  'text-decoration-color': ['angle', 'number', 'percentage'] as const,
  'text-decoration-thickness': ['length', 'percentage'] as const,
  'text-emphasis-color': ['angle', 'number', 'percentage'] as const,
  'text-indent': ['length', 'length-percentage', 'percentage'] as const,
  'text-shadow': ['angle', 'length', 'number', 'percentage'] as const,
  'text-size-adjust': ['percentage'] as const,
  'text-underline-offset': ['length', 'percentage'] as const,
  'top': ['length', 'percentage'] as const,
  'transform': ['angle', 'length', 'length-percentage', 'number', 'percentage'] as const,
  'transform-origin': ['length', 'length-percentage', 'percentage'] as const,
  'transition': ['integer', 'number', 'time'] as const,
  'transition-delay': ['time'] as const,
  'transition-duration': ['time'] as const,
  'transition-timing-function': ['integer', 'number'] as const,
  'translate': ['length', 'length-percentage', 'percentage'] as const,
  'vertical-align': ['length', 'percentage'] as const,
  'view-timeline-inset': ['length', 'length-percentage', 'percentage'] as const,
  'voice-balance': ['number'] as const,
  'voice-duration': ['time'] as const,
  'voice-family': ['integer'] as const,
  'voice-pitch': ['frequency', 'percentage'] as const,
  'voice-range': ['frequency', 'percentage'] as const,
  'voice-rate': ['percentage'] as const,
  'widows': ['integer'] as const,
  'width': ['length', 'length-percentage', 'percentage'] as const,
  'word-spacing': ['length'] as const,
  'x': ['length', 'percentage'] as const,
  'y': ['length', 'percentage'] as const,
  'z-index': ['integer'] as const,
  'zoom': ['number', 'percentage'] as const,
} as const;
