/**
 * CSS 数据类型定义
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-17T16:08:53.316Z
 *
 * 数据来源：
 * - css-number-types.json: 数值类型（13种）和属性映射
 * - css-keywords.json: 属性关键词
 * - css-colors.json: 颜色关键字
 *
 * 注意：不使用 css-units.json 的 unitsByType 分组！
 * 单位信息直接从 css-number-types.json 的属性 units 字段聚合。
 *
 * 所有数据都支持：
 * - 运行时使用（遍历、检查等）
 * - 编译时类型校验（通过 as const + typeof）
 */

// ==================== 颜色值 ====================

/** 所有 CSS 颜色关键字（运行时数据 + 类型） */
export const COLORS = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'transparent',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
] as const;

/** 颜色值类型 */
export type ColorValue = typeof COLORS[number];

// ==================== 数值类型（13种，来自 css-number-types.json） ====================
// 基础类型：length, angle, time, frequency, resolution, flex
// 特殊类型：percentage（%）, number（无单位）, integer（无单位整数）
// 组合类型：length-percentage, angle-percentage, time-percentage, frequency-percentage

/** 所有数值类型（运行时数据 + 类型） */
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

/** 数值类型（联合类型） */
export type NumberType = typeof NUMBER_TYPES[number];

// 每个数值类型的常量值（用于运行时数据引用）
export const ANGLE_NUMBER_TYPE = 'angle' as const;
export const ANGLE_PERCENTAGE_NUMBER_TYPE = 'angle-percentage' as const;
export const FLEX_NUMBER_TYPE = 'flex' as const;
export const FREQUENCY_NUMBER_TYPE = 'frequency' as const;
export const FREQUENCY_PERCENTAGE_NUMBER_TYPE = 'frequency-percentage' as const;
export const INTEGER_NUMBER_TYPE = 'integer' as const;
export const LENGTH_NUMBER_TYPE = 'length' as const;
export const LENGTH_PERCENTAGE_NUMBER_TYPE = 'length-percentage' as const;
export const NUMBER_NUMBER_TYPE = 'number' as const;
export const PERCENTAGE_NUMBER_TYPE = 'percentage' as const;
export const RESOLUTION_NUMBER_TYPE = 'resolution' as const;
export const TIME_NUMBER_TYPE = 'time' as const;
export const TIME_PERCENTAGE_NUMBER_TYPE = 'time-percentage' as const;

// ==================== 单位类型（层级1：每个单位的独立类型） ====================
// 每个单位都是一个独立的字面量类型

/** 所有单位（运行时数据） */
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

// ==================== 数值类型的单位联合（层级2） ====================
// 每个数值类型 = 其支持的单位类型的联合
// 数据来源：css-number-types.json 的属性 units 字段聚合

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

/** angle 类型支持的单位（运行时数据） */
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

/** angle-percentage 类型支持的单位（运行时数据） */
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

/** flex 类型支持的单位（运行时数据） */
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

/** frequency 类型支持的单位（运行时数据） */
export const FREQUENCY_UNITS = [
  '%',
  'Hz',
  'kHz',
] as const;

/** frequency-percentage 类型支持的单位（运行时数据） */
export const FREQUENCY_PERCENTAGE_UNITS = [] as const;

/** integer 类型支持的单位（运行时数据） */
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

/** length 类型支持的单位（运行时数据） */
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

/** length-percentage 类型支持的单位（运行时数据） */
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

/** number 类型支持的单位（运行时数据） */
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

/** percentage 类型支持的单位（运行时数据） */
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

/** resolution 类型支持的单位（运行时数据） */
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

/** time 类型支持的单位（运行时数据） */
export const TIME_UNITS = [
  '<number>',
  'ms',
  's',
] as const;

/** time-percentage 类型支持的单位（运行时数据） */
export const TIME_PERCENTAGE_UNITS = [] as const;

/** 数值类型到单位的映射（运行时可用） */
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

// ==================== 关键词属性值 ====================
// 颜色关键字已分离到 COLORS，属性的 keywords 只包含非颜色关键字
// 支持颜色的属性，其完整值类型 = 非颜色关键字 | ColorValue

/** accent-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const ACCENT_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'auto',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** align-content 属性支持的关键词（不含颜色） */
export const ALIGN_CONTENT_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'normal',
  'safe',
  'space-around',
  'space-between',
  'space-evenly',
  'start',
  'stretch',
  'unsafe',
] as const;

/** align-items 属性支持的关键词（不含颜色） */
export const ALIGN_ITEMS_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'normal',
  'safe',
  'self-end',
  'self-start',
  'start',
  'stretch',
  'unsafe',
] as const;

/** align-self 属性支持的关键词（不含颜色） */
export const ALIGN_SELF_KEYWORDS = [
  'auto',
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'normal',
  'safe',
  'self-end',
  'self-start',
  'start',
  'stretch',
  'unsafe',
] as const;

/** align-tracks 属性支持的关键词（不含颜色） */
export const ALIGN_TRACKS_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'normal',
  'safe',
  'space-around',
  'space-between',
  'space-evenly',
  'start',
  'stretch',
  'unsafe',
] as const;

/** alignment-baseline 属性支持的关键词（不含颜色） */
export const ALIGNMENT_BASELINE_KEYWORDS = [
  'after-edge',
  'alphabetic',
  'auto',
  'baseline',
  'before-edge',
  'central',
  'hanging',
  'ideographic',
  'mathematical',
  'middle',
  'text-after-edge',
  'text-before-edge',
] as const;

/** all 属性支持的关键词（不含颜色） */
export const ALL_KEYWORDS = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
] as const;

/** anchor-name 属性支持的关键词（不含颜色） */
export const ANCHOR_NAME_KEYWORDS = [
  'none',
] as const;

/** anchor-scope 属性支持的关键词（不含颜色） */
export const ANCHOR_SCOPE_KEYWORDS = [
  'all',
  'none',
] as const;

/** animation 属性支持的关键词（不含颜色） */
export const ANIMATION_KEYWORDS = [
  'alternate',
  'alternate-reverse',
  'auto',
  'backwards',
  'block',
  'both',
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'end',
  'forwards',
  'infinite',
  'inline',
  'jump-both',
  'jump-end',
  'jump-none',
  'jump-start',
  'linear',
  'nearest',
  'none',
  'normal',
  'paused',
  'reverse',
  'root',
  'running',
  'self',
  'start',
  'step-end',
  'step-start',
  'x',
  'y',
] as const;

/** animation-composition 属性支持的关键词（不含颜色） */
export const ANIMATION_COMPOSITION_KEYWORDS = [
  'accumulate',
  'add',
  'replace',
] as const;

/** animation-direction 属性支持的关键词（不含颜色） */
export const ANIMATION_DIRECTION_KEYWORDS = [
  'alternate',
  'alternate-reverse',
  'normal',
  'reverse',
] as const;

/** animation-fill-mode 属性支持的关键词（不含颜色） */
export const ANIMATION_FILL_MODE_KEYWORDS = [
  'backwards',
  'both',
  'forwards',
  'none',
] as const;

/** animation-iteration-count 属性支持的关键词（不含颜色） */
export const ANIMATION_ITERATION_COUNT_KEYWORDS = [
  'infinite',
] as const;

/** animation-name 属性支持的关键词（不含颜色） */
export const ANIMATION_NAME_KEYWORDS = [
  'none',
] as const;

/** animation-play-state 属性支持的关键词（不含颜色） */
export const ANIMATION_PLAY_STATE_KEYWORDS = [
  'paused',
  'running',
] as const;

/** animation-range-end 属性支持的关键词（不含颜色） */
export const ANIMATION_RANGE_END_KEYWORDS = [
  'contain',
  'cover',
  'entry',
  'entry-crossing',
  'exit',
  'exit-crossing',
  'normal',
] as const;

/** animation-range-start 属性支持的关键词（不含颜色） */
export const ANIMATION_RANGE_START_KEYWORDS = [
  'contain',
  'cover',
  'entry',
  'entry-crossing',
  'exit',
  'exit-crossing',
  'normal',
] as const;

/** animation-timeline 属性支持的关键词（不含颜色） */
export const ANIMATION_TIMELINE_KEYWORDS = [
  'auto',
  'block',
  'inline',
  'nearest',
  'none',
  'root',
  'self',
  'x',
  'y',
] as const;

/** animation-timing-function 属性支持的关键词（不含颜色） */
export const ANIMATION_TIMING_FUNCTION_KEYWORDS = [
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'end',
  'jump-both',
  'jump-end',
  'jump-none',
  'jump-start',
  'linear',
  'start',
  'step-end',
  'step-start',
] as const;

/** appearance 属性支持的关键词（不含颜色） */
export const APPEARANCE_KEYWORDS = [
  'auto',
  'button',
  'checkbox',
  'listbox',
  'menulist',
  'menulist-button',
  'meter',
  'none',
  'progress-bar',
  'push-button',
  'radio',
  'searchfield',
  'slider-horizontal',
  'square-button',
  'textarea',
  'textfield',
] as const;

/** aspect-ratio 属性支持的关键词（不含颜色） */
export const ASPECT_RATIO_KEYWORDS = [
  'auto',
] as const;

/** azimuth 属性支持的关键词（不含颜色） */
export const AZIMUTH_KEYWORDS = [
  'behind',
  'center',
  'center-left',
  'center-right',
  'far-left',
  'far-right',
  'left',
  'left-side',
  'leftwards',
  'right',
  'right-side',
  'rightwards',
] as const;

/** backdrop-filter 属性支持的关键词（不含颜色） - 支持颜色 */
export const BACKDROP_FILTER_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** backface-visibility 属性支持的关键词（不含颜色） */
export const BACKFACE_VISIBILITY_KEYWORDS = [
  'hidden',
  'visible',
] as const;

/** background 属性支持的关键词（不含颜色） - 支持颜色 */
export const BACKGROUND_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'auto',
  'border-box',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'content-box',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'fixed',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'local',
  'longer',
  'ltr',
  'no-repeat',
  'none',
  'oklab',
  'oklch',
  'padding-box',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'repeat',
  'repeat-x',
  'repeat-y',
  'right',
  'round',
  'rtl',
  'scroll',
  'shorter',
  'space',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** background-attachment 属性支持的关键词（不含颜色） */
export const BACKGROUND_ATTACHMENT_KEYWORDS = [
  'fixed',
  'local',
  'scroll',
] as const;

/** background-blend-mode 属性支持的关键词（不含颜色） */
export const BACKGROUND_BLEND_MODE_KEYWORDS = [
  'color',
  'color-burn',
  'color-dodge',
  'darken',
  'difference',
  'exclusion',
  'hard-light',
  'hue',
  'lighten',
  'luminosity',
  'multiply',
  'normal',
  'overlay',
  'saturation',
  'screen',
  'soft-light',
] as const;

/** background-clip 属性支持的关键词（不含颜色） */
export const BACKGROUND_CLIP_KEYWORDS = [
  'border',
  'border-box',
  'content-box',
  'padding-box',
  'text',
] as const;

/** background-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const BACKGROUND_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** background-image 属性支持的关键词（不含颜色） - 支持颜色 */
export const BACKGROUND_IMAGE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** background-origin 属性支持的关键词（不含颜色） */
export const BACKGROUND_ORIGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'padding-box',
] as const;

/** background-position 属性支持的关键词（不含颜色） */
export const BACKGROUND_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** background-position-x 属性支持的关键词（不含颜色） */
export const BACKGROUND_POSITION_X_KEYWORDS = [
  'center',
  'left',
  'right',
  'x-end',
  'x-start',
] as const;

/** background-position-y 属性支持的关键词（不含颜色） */
export const BACKGROUND_POSITION_Y_KEYWORDS = [
  'bottom',
  'center',
  'top',
  'y-end',
  'y-start',
] as const;

/** background-repeat 属性支持的关键词（不含颜色） */
export const BACKGROUND_REPEAT_KEYWORDS = [
  'no-repeat',
  'repeat',
  'repeat-x',
  'repeat-y',
  'round',
  'space',
] as const;

/** background-size 属性支持的关键词（不含颜色） */
export const BACKGROUND_SIZE_KEYWORDS = [
  'auto',
  'contain',
  'cover',
] as const;

/** baseline-shift 属性支持的关键词（不含颜色） */
export const BASELINE_SHIFT_KEYWORDS = [
  'baseline',
  'sub',
  'super',
] as const;

/** border 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'dashed',
  'decreasing',
  'display-p3',
  'dotted',
  'double',
  'groove',
  'hidden',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'medium',
  'none',
  'oklab',
  'oklch',
  'outset',
  'prophoto-rgb',
  'rec2020',
  'ridge',
  'shorter',
  'solid',
  'srgb',
  'srgb-linear',
  'thick',
  'thin',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-block 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_BLOCK_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-block-end 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_BLOCK_END_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-block-start 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_BLOCK_START_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-bottom 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_BOTTOM_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'dashed',
  'decreasing',
  'display-p3',
  'dotted',
  'double',
  'groove',
  'hidden',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'medium',
  'none',
  'oklab',
  'oklch',
  'outset',
  'prophoto-rgb',
  'rec2020',
  'ridge',
  'shorter',
  'solid',
  'srgb',
  'srgb-linear',
  'thick',
  'thin',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-bottom-style 属性支持的关键词（不含颜色） */
export const BORDER_BOTTOM_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

/** border-bottom-width 属性支持的关键词（不含颜色） */
export const BORDER_BOTTOM_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-collapse 属性支持的关键词（不含颜色） */
export const BORDER_COLLAPSE_KEYWORDS = [
  'collapse',
  'separate',
] as const;

/** border-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-image-repeat 属性支持的关键词（不含颜色） */
export const BORDER_IMAGE_REPEAT_KEYWORDS = [
  'repeat',
  'round',
  'space',
  'stretch',
] as const;

/** border-image-slice 属性支持的关键词（不含颜色） */
export const BORDER_IMAGE_SLICE_KEYWORDS = [
  'fill',
] as const;

/** border-image-source 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_IMAGE_SOURCE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-image-width 属性支持的关键词（不含颜色） */
export const BORDER_IMAGE_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** border-inline 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_INLINE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-inline-end 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_INLINE_END_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-inline-start 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_INLINE_START_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-left 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_LEFT_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'dashed',
  'decreasing',
  'display-p3',
  'dotted',
  'double',
  'groove',
  'hidden',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'medium',
  'none',
  'oklab',
  'oklch',
  'outset',
  'prophoto-rgb',
  'rec2020',
  'ridge',
  'shorter',
  'solid',
  'srgb',
  'srgb-linear',
  'thick',
  'thin',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-left-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_LEFT_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-left-style 属性支持的关键词（不含颜色） */
export const BORDER_LEFT_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

/** border-left-width 属性支持的关键词（不含颜色） */
export const BORDER_LEFT_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-right 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_RIGHT_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'dashed',
  'decreasing',
  'display-p3',
  'dotted',
  'double',
  'groove',
  'hidden',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'medium',
  'none',
  'oklab',
  'oklch',
  'outset',
  'prophoto-rgb',
  'rec2020',
  'ridge',
  'shorter',
  'solid',
  'srgb',
  'srgb-linear',
  'thick',
  'thin',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-right-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_RIGHT_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-right-style 属性支持的关键词（不含颜色） */
export const BORDER_RIGHT_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

/** border-right-width 属性支持的关键词（不含颜色） */
export const BORDER_RIGHT_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-style 属性支持的关键词（不含颜色） */
export const BORDER_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

/** border-top 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_TOP_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'dashed',
  'decreasing',
  'display-p3',
  'dotted',
  'double',
  'groove',
  'hidden',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'medium',
  'none',
  'oklab',
  'oklch',
  'outset',
  'prophoto-rgb',
  'rec2020',
  'ridge',
  'shorter',
  'solid',
  'srgb',
  'srgb-linear',
  'thick',
  'thin',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-top-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const BORDER_TOP_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** border-top-style 属性支持的关键词（不含颜色） */
export const BORDER_TOP_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

/** border-top-width 属性支持的关键词（不含颜色） */
export const BORDER_TOP_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-width 属性支持的关键词（不含颜色） */
export const BORDER_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** bottom 属性支持的关键词（不含颜色） */
export const BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** box-align 属性支持的关键词（不含颜色） */
export const BOX_ALIGN_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'start',
  'stretch',
] as const;

/** box-decoration-break 属性支持的关键词（不含颜色） */
export const BOX_DECORATION_BREAK_KEYWORDS = [
  'clone',
  'slice',
] as const;

/** box-direction 属性支持的关键词（不含颜色） */
export const BOX_DIRECTION_KEYWORDS = [
  'inherit',
  'normal',
  'reverse',
] as const;

/** box-lines 属性支持的关键词（不含颜色） */
export const BOX_LINES_KEYWORDS = [
  'multiple',
  'single',
] as const;

/** box-orient 属性支持的关键词（不含颜色） */
export const BOX_ORIENT_KEYWORDS = [
  'block-axis',
  'horizontal',
  'inherit',
  'inline-axis',
  'vertical',
] as const;

/** box-pack 属性支持的关键词（不含颜色） */
export const BOX_PACK_KEYWORDS = [
  'center',
  'end',
  'justify',
  'start',
] as const;

/** box-shadow 属性支持的关键词（不含颜色） - 支持颜色 */
export const BOX_SHADOW_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'inset',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** box-sizing 属性支持的关键词（不含颜色） */
export const BOX_SIZING_KEYWORDS = [
  'border-box',
  'content-box',
] as const;

/** break-after 属性支持的关键词（不含颜色） */
export const BREAK_AFTER_KEYWORDS = [
  'all',
  'always',
  'auto',
  'avoid',
  'avoid-column',
  'avoid-page',
  'avoid-region',
  'column',
  'left',
  'page',
  'recto',
  'region',
  'right',
  'verso',
] as const;

/** break-before 属性支持的关键词（不含颜色） */
export const BREAK_BEFORE_KEYWORDS = [
  'all',
  'always',
  'auto',
  'avoid',
  'avoid-column',
  'avoid-page',
  'avoid-region',
  'column',
  'left',
  'page',
  'recto',
  'region',
  'right',
  'verso',
] as const;

/** break-inside 属性支持的关键词（不含颜色） */
export const BREAK_INSIDE_KEYWORDS = [
  'auto',
  'avoid',
  'avoid-column',
  'avoid-page',
  'avoid-region',
] as const;

/** caption-side 属性支持的关键词（不含颜色） */
export const CAPTION_SIDE_KEYWORDS = [
  'block-end',
  'block-start',
  'bottom',
  'inline-end',
  'inline-start',
  'top',
] as const;

/** caret-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const CARET_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'auto',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** caret-shape 属性支持的关键词（不含颜色） */
export const CARET_SHAPE_KEYWORDS = [
  'auto',
  'bar',
  'block',
  'underscore',
] as const;

/** clear 属性支持的关键词（不含颜色） */
export const CLEAR_KEYWORDS = [
  'both',
  'inline-end',
  'inline-start',
  'left',
  'none',
  'right',
] as const;

/** clip 属性支持的关键词（不含颜色） */
export const CLIP_KEYWORDS = [
  'auto',
] as const;

/** clip-path 属性支持的关键词（不含颜色） */
export const CLIP_PATH_KEYWORDS = [
  'at',
  'auto',
  'border-box',
  'bottom',
  'center',
  'closest-side',
  'content-box',
  'evenodd',
  'farthest-side',
  'fill-box',
  'left',
  'margin-box',
  'none',
  'nonzero',
  'padding-box',
  'right',
  'round',
  'stroke-box',
  'top',
  'view-box',
] as const;

/** clip-rule 属性支持的关键词（不含颜色） */
export const CLIP_RULE_KEYWORDS = [
  'evenodd',
  'nonzero',
] as const;

/** color 属性支持的关键词（不含颜色） - 支持颜色 */
export const COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** color-interpolation-filters 属性支持的关键词（不含颜色） */
export const COLOR_INTERPOLATION_FILTERS_KEYWORDS = [
  'auto',
  'linearRGB',
  'sRGB',
] as const;

/** color-scheme 属性支持的关键词（不含颜色） */
export const COLOR_SCHEME_KEYWORDS = [
  'dark',
  'light',
  'normal',
  'only',
] as const;

/** column-count 属性支持的关键词（不含颜色） */
export const COLUMN_COUNT_KEYWORDS = [
  'auto',
] as const;

/** column-fill 属性支持的关键词（不含颜色） */
export const COLUMN_FILL_KEYWORDS = [
  'auto',
  'balance',
] as const;

/** column-gap 属性支持的关键词（不含颜色） */
export const COLUMN_GAP_KEYWORDS = [
  'normal',
] as const;

/** column-rule-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const COLUMN_RULE_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** column-span 属性支持的关键词（不含颜色） */
export const COLUMN_SPAN_KEYWORDS = [
  'all',
  'none',
] as const;

/** column-width 属性支持的关键词（不含颜色） */
export const COLUMN_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** contain 属性支持的关键词（不含颜色） */
export const CONTAIN_KEYWORDS = [
  'content',
  'inline-size',
  'layout',
  'none',
  'paint',
  'size',
  'strict',
  'style',
] as const;

/** contain-intrinsic-block-size 属性支持的关键词（不含颜色） */
export const CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-height 属性支持的关键词（不含颜色） */
export const CONTAIN_INTRINSIC_HEIGHT_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-inline-size 属性支持的关键词（不含颜色） */
export const CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-size 属性支持的关键词（不含颜色） */
export const CONTAIN_INTRINSIC_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-width 属性支持的关键词（不含颜色） */
export const CONTAIN_INTRINSIC_WIDTH_KEYWORDS = [
  'auto',
  'none',
] as const;

/** container-name 属性支持的关键词（不含颜色） */
export const CONTAINER_NAME_KEYWORDS = [
  'none',
] as const;

/** container-type 属性支持的关键词（不含颜色） */
export const CONTAINER_TYPE_KEYWORDS = [
  'inline-size',
  'normal',
  'size',
] as const;

/** content 属性支持的关键词（不含颜色） - 支持颜色 */
export const CONTENT_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'Hz',
  'LinkText',
  'Mark',
  'MarkText',
  'Q',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'after',
  'angle',
  'at',
  'before',
  'bottom',
  'cap',
  'center',
  'ch',
  'circle',
  'close-quote',
  'closest-corner',
  'closest-side',
  'cm',
  'color',
  'contain',
  'content',
  'contents',
  'cover',
  'currentColor',
  'decreasing',
  'deg',
  'display-p3',
  'dotted',
  'ellipse',
  'em',
  'ex',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'first-letter',
  'frequency',
  'from',
  'grad',
  'hsl',
  'hue',
  'hwb',
  'ic',
  'in',
  'increasing',
  'integer',
  'kHz',
  'lab',
  'last',
  'lch',
  'left',
  'length',
  'lh',
  'linear',
  'longer',
  'ltr',
  'mm',
  'ms',
  'no-close-quote',
  'no-open-quote',
  'none',
  'normal',
  'number',
  'oklab',
  'oklch',
  'open-quote',
  'pc',
  'prophoto-rgb',
  'pt',
  'px',
  'rad',
  'radial',
  'rec2020',
  'rem',
  'right',
  'rlh',
  'rtl',
  's',
  'shorter',
  'solid',
  'space',
  'srgb',
  'srgb-linear',
  'start',
  'string',
  'time',
  'to',
  'top',
  'turn',
  'url',
  'vb',
  'vh',
  'vi',
  'vmax',
  'vmin',
  'vw',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** content-visibility 属性支持的关键词（不含颜色） */
export const CONTENT_VISIBILITY_KEYWORDS = [
  'auto',
  'hidden',
  'visible',
] as const;

/** counter-increment 属性支持的关键词（不含颜色） */
export const COUNTER_INCREMENT_KEYWORDS = [
  'none',
] as const;

/** counter-reset 属性支持的关键词（不含颜色） */
export const COUNTER_RESET_KEYWORDS = [
  'none',
] as const;

/** counter-set 属性支持的关键词（不含颜色） */
export const COUNTER_SET_KEYWORDS = [
  'none',
] as const;

/** cue-after 属性支持的关键词（不含颜色） */
export const CUE_AFTER_KEYWORDS = [
  'none',
] as const;

/** cue-before 属性支持的关键词（不含颜色） */
export const CUE_BEFORE_KEYWORDS = [
  'none',
] as const;

/** cursor 属性支持的关键词（不含颜色） */
export const CURSOR_KEYWORDS = [
  'alias',
  'all-scroll',
  'auto',
  'cell',
  'col-resize',
  'context-menu',
  'copy',
  'crosshair',
  'default',
  'e-resize',
  'ew-resize',
  'grab',
  'grabbing',
  'hand',
  'help',
  'move',
  'n-resize',
  'ne-resize',
  'nesw-resize',
  'no-drop',
  'none',
  'not-allowed',
  'ns-resize',
  'nw-resize',
  'nwse-resize',
  'pointer',
  'progress',
  'row-resize',
  's-resize',
  'se-resize',
  'sw-resize',
  'text',
  'vertical-text',
  'w-resize',
  'wait',
  'zoom-in',
  'zoom-out',
] as const;

/** d 属性支持的关键词（不含颜色） */
export const D_KEYWORDS = [
  'none',
] as const;

/** direction 属性支持的关键词（不含颜色） */
export const DIRECTION_KEYWORDS = [
  'ltr',
  'rtl',
] as const;

/** display 属性支持的关键词（不含颜色） */
export const DISPLAY_KEYWORDS = [
  'block',
  'contents',
  'flex',
  'flow',
  'flow-root',
  'grid',
  'inline',
  'inline-block',
  'inline-flex',
  'inline-grid',
  'inline-list-item',
  'inline-table',
  'list-item',
  'none',
  'ruby',
  'ruby-base',
  'ruby-base-container',
  'ruby-text',
  'ruby-text-container',
  'run-in',
  'table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row',
  'table-row-group',
] as const;

/** dominant-baseline 属性支持的关键词（不含颜色） */
export const DOMINANT_BASELINE_KEYWORDS = [
  'alphabetic',
  'auto',
  'central',
  'hanging',
  'ideographic',
  'mathematical',
  'middle',
  'no-change',
  'reset-size',
  'text-after-edge',
  'text-before-edge',
  'use-script',
] as const;

/** empty-cells 属性支持的关键词（不含颜色） */
export const EMPTY_CELLS_KEYWORDS = [
  'hide',
  'show',
] as const;

/** field-sizing 属性支持的关键词（不含颜色） */
export const FIELD_SIZING_KEYWORDS = [
  'content',
  'fixed',
] as const;

/** fill 属性支持的关键词（不含颜色） - 支持颜色 */
export const FILL_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'context-fill',
  'context-stroke',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** fill-rule 属性支持的关键词（不含颜色） */
export const FILL_RULE_KEYWORDS = [
  'evenodd',
  'nonzero',
] as const;

/** filter 属性支持的关键词（不含颜色） - 支持颜色 */
export const FILTER_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** flex 属性支持的关键词（不含颜色） */
export const FLEX_KEYWORDS = [
  'none',
] as const;

/** flex-basis 属性支持的关键词（不含颜色） */
export const FLEX_BASIS_KEYWORDS = [
  'content',
] as const;

/** flex-direction 属性支持的关键词（不含颜色） */
export const FLEX_DIRECTION_KEYWORDS = [
  'column',
  'column-reverse',
  'row',
  'row-reverse',
] as const;

/** flex-wrap 属性支持的关键词（不含颜色） */
export const FLEX_WRAP_KEYWORDS = [
  'nowrap',
  'wrap',
  'wrap-reverse',
] as const;

/** float 属性支持的关键词（不含颜色） */
export const FLOAT_KEYWORDS = [
  'inline-end',
  'inline-start',
  'left',
  'none',
  'right',
] as const;

/** font 属性支持的关键词（不含颜色） */
export const FONT_KEYWORDS = [
  'caption',
  'condensed',
  'expanded',
  'extra-condensed',
  'extra-expanded',
  'icon',
  'menu',
  'message-box',
  'normal',
  'semi-condensed',
  'semi-expanded',
  'small-caps',
  'small-caption',
  'status-bar',
  'ultra-condensed',
  'ultra-expanded',
] as const;

/** font-family 属性支持的关键词（不含颜色） */
export const FONT_FAMILY_KEYWORDS = [
  'BlinkMacSystemFont',
  'cursive',
  'fangsong',
  'fantasy',
  'kai',
  'math',
  'monospace',
  'nastaliq',
  'sans-serif',
  'serif',
  'system-ui',
  'ui-monospace',
  'ui-rounded',
  'ui-sans-serif',
  'ui-serif',
] as const;

/** font-feature-settings 属性支持的关键词（不含颜色） */
export const FONT_FEATURE_SETTINGS_KEYWORDS = [
  'normal',
  'off',
  'on',
] as const;

/** font-kerning 属性支持的关键词（不含颜色） */
export const FONT_KERNING_KEYWORDS = [
  'auto',
  'none',
  'normal',
] as const;

/** font-language-override 属性支持的关键词（不含颜色） */
export const FONT_LANGUAGE_OVERRIDE_KEYWORDS = [
  'normal',
] as const;

/** font-optical-sizing 属性支持的关键词（不含颜色） */
export const FONT_OPTICAL_SIZING_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-palette 属性支持的关键词（不含颜色） */
export const FONT_PALETTE_KEYWORDS = [
  'dark',
  'light',
  'normal',
] as const;

/** font-size 属性支持的关键词（不含颜色） */
export const FONT_SIZE_KEYWORDS = [
  'large',
  'larger',
  'medium',
  'small',
  'smaller',
  'x-large',
  'x-small',
  'xx-large',
  'xx-small',
  'xxx-large',
] as const;

/** font-size-adjust 属性支持的关键词（不含颜色） */
export const FONT_SIZE_ADJUST_KEYWORDS = [
  'cap-height',
  'ch-width',
  'ex-height',
  'from-font',
  'ic-height',
  'ic-width',
  'none',
] as const;

/** font-smooth 属性支持的关键词（不含颜色） */
export const FONT_SMOOTH_KEYWORDS = [
  'always',
  'auto',
  'large',
  'medium',
  'never',
  'small',
  'x-large',
  'x-small',
  'xx-large',
  'xx-small',
  'xxx-large',
] as const;

/** font-stretch 属性支持的关键词（不含颜色） */
export const FONT_STRETCH_KEYWORDS = [
  'condensed',
  'expanded',
  'extra-condensed',
  'extra-expanded',
  'normal',
  'semi-condensed',
  'semi-expanded',
  'ultra-condensed',
  'ultra-expanded',
] as const;

/** font-style 属性支持的关键词（不含颜色） */
export const FONT_STYLE_KEYWORDS = [
  'italic',
  'normal',
  'oblique',
] as const;

/** font-synthesis 属性支持的关键词（不含颜色） */
export const FONT_SYNTHESIS_KEYWORDS = [
  'none',
  'position',
  'small-caps',
  'style',
  'weight',
] as const;

/** font-synthesis-position 属性支持的关键词（不含颜色） */
export const FONT_SYNTHESIS_POSITION_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-small-caps 属性支持的关键词（不含颜色） */
export const FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-style 属性支持的关键词（不含颜色） */
export const FONT_SYNTHESIS_STYLE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-weight 属性支持的关键词（不含颜色） */
export const FONT_SYNTHESIS_WEIGHT_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-variant 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_KEYWORDS = [
  'all-petite-caps',
  'all-small-caps',
  'common-ligatures',
  'contextual',
  'diagonal-fractions',
  'discretionary-ligatures',
  'full-width',
  'historical-forms',
  'historical-ligatures',
  'jis04',
  'jis78',
  'jis83',
  'jis90',
  'lining-nums',
  'no-common-ligatures',
  'no-contextual',
  'no-discretionary-ligatures',
  'no-historical-ligatures',
  'none',
  'normal',
  'oldstyle-nums',
  'ordinal',
  'petite-caps',
  'proportional-nums',
  'proportional-width',
  'ruby',
  'simplified',
  'slashed-zero',
  'small-caps',
  'stacked-fractions',
  'tabular-nums',
  'titling-caps',
  'traditional',
  'unicase',
] as const;

/** font-variant-alternates 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_ALTERNATES_KEYWORDS = [
  'historical-forms',
  'normal',
] as const;

/** font-variant-caps 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_CAPS_KEYWORDS = [
  'all-petite-caps',
  'all-small-caps',
  'normal',
  'petite-caps',
  'small-caps',
  'titling-caps',
  'unicase',
] as const;

/** font-variant-east-asian 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_EAST_ASIAN_KEYWORDS = [
  'full-width',
  'jis04',
  'jis78',
  'jis83',
  'jis90',
  'normal',
  'proportional-width',
  'ruby',
  'simplified',
  'traditional',
] as const;

/** font-variant-emoji 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_EMOJI_KEYWORDS = [
  'emoji',
  'normal',
  'text',
  'unicode',
] as const;

/** font-variant-ligatures 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_LIGATURES_KEYWORDS = [
  'common-ligatures',
  'contextual',
  'discretionary-ligatures',
  'historical-ligatures',
  'no-common-ligatures',
  'no-contextual',
  'no-discretionary-ligatures',
  'no-historical-ligatures',
  'none',
  'normal',
] as const;

/** font-variant-numeric 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_NUMERIC_KEYWORDS = [
  'diagonal-fractions',
  'lining-nums',
  'normal',
  'oldstyle-nums',
  'ordinal',
  'proportional-nums',
  'slashed-zero',
  'stacked-fractions',
  'tabular-nums',
] as const;

/** font-variant-position 属性支持的关键词（不含颜色） */
export const FONT_VARIANT_POSITION_KEYWORDS = [
  'normal',
  'sub',
  'super',
] as const;

/** font-variation-settings 属性支持的关键词（不含颜色） */
export const FONT_VARIATION_SETTINGS_KEYWORDS = [
  'normal',
] as const;

/** font-weight 属性支持的关键词（不含颜色） */
export const FONT_WEIGHT_KEYWORDS = [
  'bold',
  'bolder',
  'lighter',
  'normal',
] as const;

/** forced-color-adjust 属性支持的关键词（不含颜色） */
export const FORCED_COLOR_ADJUST_KEYWORDS = [
  'auto',
  'none',
  'preserve-parent-color',
] as const;

/** grid 属性支持的关键词（不含颜色） */
export const GRID_KEYWORDS = [
  'auto-flow',
  'dense',
] as const;

/** grid-area 属性支持的关键词（不含颜色） */
export const GRID_AREA_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-auto-columns 属性支持的关键词（不含颜色） */
export const GRID_AUTO_COLUMNS_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
] as const;

/** grid-auto-flow 属性支持的关键词（不含颜色） */
export const GRID_AUTO_FLOW_KEYWORDS = [
  'column',
  'dense',
  'row',
] as const;

/** grid-auto-rows 属性支持的关键词（不含颜色） */
export const GRID_AUTO_ROWS_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
] as const;

/** grid-column 属性支持的关键词（不含颜色） */
export const GRID_COLUMN_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-column-end 属性支持的关键词（不含颜色） */
export const GRID_COLUMN_END_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-column-start 属性支持的关键词（不含颜色） */
export const GRID_COLUMN_START_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row 属性支持的关键词（不含颜色） */
export const GRID_ROW_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row-end 属性支持的关键词（不含颜色） */
export const GRID_ROW_END_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row-start 属性支持的关键词（不含颜色） */
export const GRID_ROW_START_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-template 属性支持的关键词（不含颜色） */
export const GRID_TEMPLATE_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
  'none',
] as const;

/** grid-template-areas 属性支持的关键词（不含颜色） */
export const GRID_TEMPLATE_AREAS_KEYWORDS = [
  'none',
] as const;

/** grid-template-columns 属性支持的关键词（不含颜色） */
export const GRID_TEMPLATE_COLUMNS_KEYWORDS = [
  'auto',
  'auto-fill',
  'auto-fit',
  'max-content',
  'min-content',
  'none',
  'subgrid',
] as const;

/** grid-template-rows 属性支持的关键词（不含颜色） */
export const GRID_TEMPLATE_ROWS_KEYWORDS = [
  'auto',
  'auto-fill',
  'auto-fit',
  'max-content',
  'min-content',
  'none',
  'subgrid',
] as const;

/** hanging-punctuation 属性支持的关键词（不含颜色） */
export const HANGING_PUNCTUATION_KEYWORDS = [
  'allow-end',
  'first',
  'force-end',
  'last',
  'none',
] as const;

/** height 属性支持的关键词（不含颜色） */
export const HEIGHT_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** hyphenate-character 属性支持的关键词（不含颜色） */
export const HYPHENATE_CHARACTER_KEYWORDS = [
  'auto',
] as const;

/** hyphenate-limit-chars 属性支持的关键词（不含颜色） */
export const HYPHENATE_LIMIT_CHARS_KEYWORDS = [
  'auto',
] as const;

/** hyphens 属性支持的关键词（不含颜色） */
export const HYPHENS_KEYWORDS = [
  'auto',
  'manual',
  'none',
] as const;

/** image-orientation 属性支持的关键词（不含颜色） */
export const IMAGE_ORIENTATION_KEYWORDS = [
  'flip',
  'from-image',
] as const;

/** image-rendering 属性支持的关键词（不含颜色） */
export const IMAGE_RENDERING_KEYWORDS = [
  'auto',
  'crisp-edges',
  'optimize-contrast',
  'optimizeQuality',
  'optimizeSpeed',
  'pixelated',
] as const;

/** image-resolution 属性支持的关键词（不含颜色） */
export const IMAGE_RESOLUTION_KEYWORDS = [
  'from-image',
  'snap',
] as const;

/** ime-mode 属性支持的关键词（不含颜色） */
export const IME_MODE_KEYWORDS = [
  'active',
  'auto',
  'disabled',
  'inactive',
  'normal',
] as const;

/** initial-letter 属性支持的关键词（不含颜色） */
export const INITIAL_LETTER_KEYWORDS = [
  'normal',
] as const;

/** initial-letter-align 属性支持的关键词（不含颜色） */
export const INITIAL_LETTER_ALIGN_KEYWORDS = [
  'alphabetic',
  'auto',
  'hanging',
  'ideographic',
] as const;

/** input-security 属性支持的关键词（不含颜色） */
export const INPUT_SECURITY_KEYWORDS = [
  'auto',
  'none',
] as const;

/** interpolate-size 属性支持的关键词（不含颜色） */
export const INTERPOLATE_SIZE_KEYWORDS = [
  'allow-keywords',
  'numeric-only',
] as const;

/** isolation 属性支持的关键词（不含颜色） */
export const ISOLATION_KEYWORDS = [
  'auto',
  'isolate',
] as const;

/** justify-content 属性支持的关键词（不含颜色） */
export const JUSTIFY_CONTENT_KEYWORDS = [
  'center',
  'end',
  'flex-end',
  'flex-start',
  'left',
  'normal',
  'right',
  'safe',
  'space-around',
  'space-between',
  'space-evenly',
  'start',
  'stretch',
  'unsafe',
] as const;

/** justify-items 属性支持的关键词（不含颜色） */
export const JUSTIFY_ITEMS_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'left',
  'legacy',
  'normal',
  'right',
  'safe',
  'self-end',
  'self-start',
  'start',
  'stretch',
  'unsafe',
] as const;

/** justify-self 属性支持的关键词（不含颜色） */
export const JUSTIFY_SELF_KEYWORDS = [
  'auto',
  'baseline',
  'center',
  'end',
  'first',
  'flex-end',
  'flex-start',
  'last',
  'left',
  'normal',
  'right',
  'safe',
  'self-end',
  'self-start',
  'start',
  'stretch',
  'unsafe',
] as const;

/** justify-tracks 属性支持的关键词（不含颜色） */
export const JUSTIFY_TRACKS_KEYWORDS = [
  'center',
  'end',
  'flex-end',
  'flex-start',
  'left',
  'normal',
  'right',
  'safe',
  'space-around',
  'space-between',
  'space-evenly',
  'start',
  'stretch',
  'unsafe',
] as const;

/** kerning 属性支持的关键词（不含颜色） */
export const KERNING_KEYWORDS = [
  'auto',
] as const;

/** left 属性支持的关键词（不含颜色） */
export const LEFT_KEYWORDS = [
  'auto',
] as const;

/** letter-spacing 属性支持的关键词（不含颜色） */
export const LETTER_SPACING_KEYWORDS = [
  'normal',
] as const;

/** line-break 属性支持的关键词（不含颜色） */
export const LINE_BREAK_KEYWORDS = [
  'anywhere',
  'auto',
  'loose',
  'normal',
  'strict',
] as const;

/** line-clamp 属性支持的关键词（不含颜色） */
export const LINE_CLAMP_KEYWORDS = [
  'none',
] as const;

/** line-height 属性支持的关键词（不含颜色） */
export const LINE_HEIGHT_KEYWORDS = [
  'normal',
] as const;

/** list-style-image 属性支持的关键词（不含颜色） - 支持颜色 */
export const LIST_STYLE_IMAGE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** list-style-position 属性支持的关键词（不含颜色） */
export const LIST_STYLE_POSITION_KEYWORDS = [
  'inside',
  'outside',
] as const;

/** list-style-type 属性支持的关键词（不含颜色） */
export const LIST_STYLE_TYPE_KEYWORDS = [
  'none',
] as const;

/** margin 属性支持的关键词（不含颜色） */
export const MARGIN_KEYWORDS = [
  'auto',
] as const;

/** margin-bottom 属性支持的关键词（不含颜色） */
export const MARGIN_BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** margin-left 属性支持的关键词（不含颜色） */
export const MARGIN_LEFT_KEYWORDS = [
  'auto',
] as const;

/** margin-right 属性支持的关键词（不含颜色） */
export const MARGIN_RIGHT_KEYWORDS = [
  'auto',
] as const;

/** margin-top 属性支持的关键词（不含颜色） */
export const MARGIN_TOP_KEYWORDS = [
  'auto',
] as const;

/** margin-trim 属性支持的关键词（不含颜色） */
export const MARGIN_TRIM_KEYWORDS = [
  'all',
  'in-flow',
  'none',
] as const;

/** marker 属性支持的关键词（不含颜色） */
export const MARKER_KEYWORDS = [
  'none',
] as const;

/** marker-end 属性支持的关键词（不含颜色） */
export const MARKER_END_KEYWORDS = [
  'none',
] as const;

/** marker-mid 属性支持的关键词（不含颜色） */
export const MARKER_MID_KEYWORDS = [
  'none',
] as const;

/** marker-start 属性支持的关键词（不含颜色） */
export const MARKER_START_KEYWORDS = [
  'none',
] as const;

/** mask 属性支持的关键词（不含颜色） - 支持颜色 */
export const MASK_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'add',
  'alpha',
  'at',
  'auto',
  'border-box',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'content-box',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'exclude',
  'farthest-corner',
  'farthest-side',
  'fill-box',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'intersect',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'luminance',
  'margin-box',
  'match-source',
  'no-clip',
  'no-repeat',
  'none',
  'oklab',
  'oklch',
  'padding-box',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'repeat',
  'repeat-x',
  'repeat-y',
  'right',
  'round',
  'rtl',
  'shorter',
  'space',
  'srgb',
  'srgb-linear',
  'start',
  'stroke-box',
  'subtract',
  'to',
  'top',
  'view-box',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** mask-border-mode 属性支持的关键词（不含颜色） */
export const MASK_BORDER_MODE_KEYWORDS = [
  'alpha',
  'luminance',
] as const;

/** mask-border-repeat 属性支持的关键词（不含颜色） */
export const MASK_BORDER_REPEAT_KEYWORDS = [
  'repeat',
  'round',
  'space',
  'stretch',
] as const;

/** mask-border-slice 属性支持的关键词（不含颜色） */
export const MASK_BORDER_SLICE_KEYWORDS = [
  'fill',
] as const;

/** mask-border-source 属性支持的关键词（不含颜色） - 支持颜色 */
export const MASK_BORDER_SOURCE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** mask-border-width 属性支持的关键词（不含颜色） */
export const MASK_BORDER_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** mask-clip 属性支持的关键词（不含颜色） */
export const MASK_CLIP_KEYWORDS = [
  'border-box',
  'content-box',
  'fill-box',
  'margin-box',
  'no-clip',
  'padding-box',
  'stroke-box',
  'view-box',
] as const;

/** mask-composite 属性支持的关键词（不含颜色） */
export const MASK_COMPOSITE_KEYWORDS = [
  'add',
  'exclude',
  'intersect',
  'subtract',
] as const;

/** mask-image 属性支持的关键词（不含颜色） - 支持颜色 */
export const MASK_IMAGE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** mask-mode 属性支持的关键词（不含颜色） */
export const MASK_MODE_KEYWORDS = [
  'alpha',
  'luminance',
  'match-source',
] as const;

/** mask-origin 属性支持的关键词（不含颜色） */
export const MASK_ORIGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'fill-box',
  'margin-box',
  'padding-box',
  'stroke-box',
  'view-box',
] as const;

/** mask-position 属性支持的关键词（不含颜色） */
export const MASK_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** mask-repeat 属性支持的关键词（不含颜色） */
export const MASK_REPEAT_KEYWORDS = [
  'no-repeat',
  'repeat',
  'repeat-x',
  'repeat-y',
  'round',
  'space',
] as const;

/** mask-size 属性支持的关键词（不含颜色） */
export const MASK_SIZE_KEYWORDS = [
  'auto',
  'contain',
  'cover',
] as const;

/** mask-type 属性支持的关键词（不含颜色） */
export const MASK_TYPE_KEYWORDS = [
  'alpha',
  'luminance',
] as const;

/** masonry-auto-flow 属性支持的关键词（不含颜色） */
export const MASONRY_AUTO_FLOW_KEYWORDS = [
  'definite-first',
  'next',
  'ordered',
  'pack',
] as const;

/** math-depth 属性支持的关键词（不含颜色） */
export const MATH_DEPTH_KEYWORDS = [
  'auto-add',
] as const;

/** math-shift 属性支持的关键词（不含颜色） */
export const MATH_SHIFT_KEYWORDS = [
  'compact',
  'normal',
] as const;

/** math-style 属性支持的关键词（不含颜色） */
export const MATH_STYLE_KEYWORDS = [
  'compact',
  'normal',
] as const;

/** max-height 属性支持的关键词（不含颜色） */
export const MAX_HEIGHT_KEYWORDS = [
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'none',
  'stretch',
] as const;

/** max-lines 属性支持的关键词（不含颜色） */
export const MAX_LINES_KEYWORDS = [
  'none',
] as const;

/** max-width 属性支持的关键词（不含颜色） */
export const MAX_WIDTH_KEYWORDS = [
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'none',
  'stretch',
] as const;

/** min-height 属性支持的关键词（不含颜色） */
export const MIN_HEIGHT_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** min-width 属性支持的关键词（不含颜色） */
export const MIN_WIDTH_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** mix-blend-mode 属性支持的关键词（不含颜色） */
export const MIX_BLEND_MODE_KEYWORDS = [
  'color',
  'color-burn',
  'color-dodge',
  'darken',
  'difference',
  'exclusion',
  'hard-light',
  'hue',
  'lighten',
  'luminosity',
  'multiply',
  'normal',
  'overlay',
  'plus-lighter',
  'saturation',
  'screen',
  'soft-light',
] as const;

/** object-fit 属性支持的关键词（不含颜色） */
export const OBJECT_FIT_KEYWORDS = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
] as const;

/** object-position 属性支持的关键词（不含颜色） */
export const OBJECT_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** offset-anchor 属性支持的关键词（不含颜色） */
export const OFFSET_ANCHOR_KEYWORDS = [
  'auto',
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** offset-path 属性支持的关键词（不含颜色） */
export const OFFSET_PATH_KEYWORDS = [
  'at',
  'auto',
  'border-box',
  'bottom',
  'center',
  'closest-corner',
  'closest-side',
  'contain',
  'content-box',
  'evenodd',
  'farthest-corner',
  'farthest-side',
  'fill-box',
  'left',
  'none',
  'nonzero',
  'padding-box',
  'right',
  'round',
  'sides',
  'stroke-box',
  'top',
  'view-box',
] as const;

/** offset-position 属性支持的关键词（不含颜色） */
export const OFFSET_POSITION_KEYWORDS = [
  'auto',
  'bottom',
  'center',
  'left',
  'normal',
  'right',
  'top',
] as const;

/** offset-rotate 属性支持的关键词（不含颜色） */
export const OFFSET_ROTATE_KEYWORDS = [
  'auto',
  'reverse',
] as const;

/** outline-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const OUTLINE_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'auto',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** outline-style 属性支持的关键词（不含颜色） */
export const OUTLINE_STYLE_KEYWORDS = [
  'auto',
] as const;

/** outline-width 属性支持的关键词（不含颜色） */
export const OUTLINE_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** overflow 属性支持的关键词（不含颜色） */
export const OVERFLOW_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'overlay',
  'scroll',
  'visible',
] as const;

/** overflow-anchor 属性支持的关键词（不含颜色） */
export const OVERFLOW_ANCHOR_KEYWORDS = [
  'auto',
  'none',
] as const;

/** overflow-block 属性支持的关键词（不含颜色） */
export const OVERFLOW_BLOCK_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-clip-box 属性支持的关键词（不含颜色） */
export const OVERFLOW_CLIP_BOX_KEYWORDS = [
  'content-box',
  'padding-box',
] as const;

/** overflow-clip-margin 属性支持的关键词（不含颜色） */
export const OVERFLOW_CLIP_MARGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'padding-box',
] as const;

/** overflow-inline 属性支持的关键词（不含颜色） */
export const OVERFLOW_INLINE_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-wrap 属性支持的关键词（不含颜色） */
export const OVERFLOW_WRAP_KEYWORDS = [
  'anywhere',
  'break-word',
  'normal',
] as const;

/** overflow-x 属性支持的关键词（不含颜色） */
export const OVERFLOW_X_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-y 属性支持的关键词（不含颜色） */
export const OVERFLOW_Y_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overlay 属性支持的关键词（不含颜色） */
export const OVERLAY_KEYWORDS = [
  'auto',
  'none',
] as const;

/** overscroll-behavior 属性支持的关键词（不含颜色） */
export const OVERSCROLL_BEHAVIOR_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-block 属性支持的关键词（不含颜色） */
export const OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-inline 属性支持的关键词（不含颜色） */
export const OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-x 属性支持的关键词（不含颜色） */
export const OVERSCROLL_BEHAVIOR_X_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-y 属性支持的关键词（不含颜色） */
export const OVERSCROLL_BEHAVIOR_Y_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** page 属性支持的关键词（不含颜色） */
export const PAGE_KEYWORDS = [
  'auto',
] as const;

/** page-break-after 属性支持的关键词（不含颜色） */
export const PAGE_BREAK_AFTER_KEYWORDS = [
  'always',
  'auto',
  'avoid',
  'left',
  'recto',
  'right',
  'verso',
] as const;

/** page-break-before 属性支持的关键词（不含颜色） */
export const PAGE_BREAK_BEFORE_KEYWORDS = [
  'always',
  'auto',
  'avoid',
  'left',
  'recto',
  'right',
  'verso',
] as const;

/** page-break-inside 属性支持的关键词（不含颜色） */
export const PAGE_BREAK_INSIDE_KEYWORDS = [
  'auto',
  'avoid',
] as const;

/** paint-order 属性支持的关键词（不含颜色） */
export const PAINT_ORDER_KEYWORDS = [
  'fill',
  'markers',
  'normal',
  'stroke',
] as const;

/** pause-after 属性支持的关键词（不含颜色） */
export const PAUSE_AFTER_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** pause-before 属性支持的关键词（不含颜色） */
export const PAUSE_BEFORE_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** perspective 属性支持的关键词（不含颜色） */
export const PERSPECTIVE_KEYWORDS = [
  'none',
] as const;

/** perspective-origin 属性支持的关键词（不含颜色） */
export const PERSPECTIVE_ORIGIN_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** pointer-events 属性支持的关键词（不含颜色） */
export const POINTER_EVENTS_KEYWORDS = [
  'all',
  'auto',
  'fill',
  'inherit',
  'none',
  'painted',
  'stroke',
  'visible',
  'visibleFill',
  'visiblePainted',
  'visibleStroke',
] as const;

/** position 属性支持的关键词（不含颜色） */
export const POSITION_KEYWORDS = [
  'absolute',
  'fixed',
  'relative',
  'static',
  'sticky',
] as const;

/** position-anchor 属性支持的关键词（不含颜色） */
export const POSITION_ANCHOR_KEYWORDS = [
  'auto',
] as const;

/** position-area 属性支持的关键词（不含颜色） */
export const POSITION_AREA_KEYWORDS = [
  'block-end',
  'block-start',
  'bottom',
  'center',
  'end',
  'inline-end',
  'inline-start',
  'left',
  'none',
  'right',
  'self-block-end',
  'self-block-start',
  'self-end',
  'self-inline-end',
  'self-inline-start',
  'self-start',
  'span-all',
  'span-block-end',
  'span-block-start',
  'span-bottom',
  'span-end',
  'span-inline-end',
  'span-inline-start',
  'span-left',
  'span-right',
  'span-self-block-end',
  'span-self-block-start',
  'span-self-end',
  'span-self-inline-end',
  'span-self-inline-start',
  'span-self-start',
  'span-start',
  'span-top',
  'span-x-end',
  'span-x-self-end',
  'span-x-self-start',
  'span-x-start',
  'span-y-end',
  'span-y-self-end',
  'span-y-self-start',
  'span-y-start',
  'start',
  'top',
  'x-end',
  'x-self-end',
  'x-self-start',
  'x-start',
  'y-end',
  'y-self-end',
  'y-self-start',
  'y-start',
] as const;

/** position-try-fallbacks 属性支持的关键词（不含颜色） */
export const POSITION_TRY_FALLBACKS_KEYWORDS = [
  'flip-block',
  'flip-inline',
  'flip-start',
  'none',
] as const;

/** position-try-order 属性支持的关键词（不含颜色） */
export const POSITION_TRY_ORDER_KEYWORDS = [
  'most-block-size',
  'most-height',
  'most-inline-size',
  'most-width',
  'normal',
] as const;

/** position-visibility 属性支持的关键词（不含颜色） */
export const POSITION_VISIBILITY_KEYWORDS = [
  'always',
  'anchors-valid',
  'anchors-visible',
  'no-overflow',
] as const;

/** print-color-adjust 属性支持的关键词（不含颜色） */
export const PRINT_COLOR_ADJUST_KEYWORDS = [
  'economy',
  'exact',
] as const;

/** quotes 属性支持的关键词（不含颜色） */
export const QUOTES_KEYWORDS = [
  'auto',
  'none',
] as const;

/** resize 属性支持的关键词（不含颜色） */
export const RESIZE_KEYWORDS = [
  'block',
  'both',
  'horizontal',
  'inline',
  'none',
  'vertical',
] as const;

/** rest-after 属性支持的关键词（不含颜色） */
export const REST_AFTER_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** rest-before 属性支持的关键词（不含颜色） */
export const REST_BEFORE_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** right 属性支持的关键词（不含颜色） */
export const RIGHT_KEYWORDS = [
  'auto',
] as const;

/** rotate 属性支持的关键词（不含颜色） */
export const ROTATE_KEYWORDS = [
  'none',
  'x',
  'y',
  'z',
] as const;

/** row-gap 属性支持的关键词（不含颜色） */
export const ROW_GAP_KEYWORDS = [
  'normal',
] as const;

/** ruby-align 属性支持的关键词（不含颜色） */
export const RUBY_ALIGN_KEYWORDS = [
  'center',
  'space-around',
  'space-between',
  'start',
] as const;

/** ruby-merge 属性支持的关键词（不含颜色） */
export const RUBY_MERGE_KEYWORDS = [
  'auto',
  'collapse',
  'separate',
] as const;

/** ruby-position 属性支持的关键词（不含颜色） */
export const RUBY_POSITION_KEYWORDS = [
  'alternate',
  'inter-character',
  'over',
  'under',
] as const;

/** scale 属性支持的关键词（不含颜色） */
export const SCALE_KEYWORDS = [
  'none',
] as const;

/** scroll-behavior 属性支持的关键词（不含颜色） */
export const SCROLL_BEHAVIOR_KEYWORDS = [
  'auto',
  'smooth',
] as const;

/** scroll-padding 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_BLOCK_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block-end 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_BLOCK_END_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block-start 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_BLOCK_START_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-bottom 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_INLINE_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline-end 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_INLINE_END_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline-start 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_INLINE_START_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-left 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_LEFT_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-right 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_RIGHT_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-top 属性支持的关键词（不含颜色） */
export const SCROLL_PADDING_TOP_KEYWORDS = [
  'auto',
] as const;

/** scroll-snap-align 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_ALIGN_KEYWORDS = [
  'center',
  'end',
  'none',
  'start',
] as const;

/** scroll-snap-coordinate 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_COORDINATE_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'none',
  'right',
  'top',
] as const;

/** scroll-snap-destination 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_DESTINATION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** scroll-snap-points-x 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_POINTS_X_KEYWORDS = [
  'none',
] as const;

/** scroll-snap-points-y 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_POINTS_Y_KEYWORDS = [
  'none',
] as const;

/** scroll-snap-stop 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_STOP_KEYWORDS = [
  'always',
  'normal',
] as const;

/** scroll-snap-type 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_TYPE_KEYWORDS = [
  'block',
  'both',
  'inline',
  'mandatory',
  'none',
  'proximity',
  'x',
  'y',
] as const;

/** scroll-snap-type-x 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_TYPE_X_KEYWORDS = [
  'mandatory',
  'none',
  'proximity',
] as const;

/** scroll-snap-type-y 属性支持的关键词（不含颜色） */
export const SCROLL_SNAP_TYPE_Y_KEYWORDS = [
  'mandatory',
  'none',
  'proximity',
] as const;

/** scroll-timeline-axis 属性支持的关键词（不含颜色） */
export const SCROLL_TIMELINE_AXIS_KEYWORDS = [
  'block',
  'inline',
  'x',
  'y',
] as const;

/** scroll-timeline-name 属性支持的关键词（不含颜色） */
export const SCROLL_TIMELINE_NAME_KEYWORDS = [
  'none',
] as const;

/** scrollbar-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const SCROLLBAR_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'auto',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** scrollbar-gutter 属性支持的关键词（不含颜色） */
export const SCROLLBAR_GUTTER_KEYWORDS = [
  'auto',
  'both-edges',
  'stable',
] as const;

/** scrollbar-width 属性支持的关键词（不含颜色） */
export const SCROLLBAR_WIDTH_KEYWORDS = [
  'auto',
  'none',
  'thin',
] as const;

/** shape-outside 属性支持的关键词（不含颜色） - 支持颜色 */
export const SHAPE_OUTSIDE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'at',
  'auto',
  'border-box',
  'bottom',
  'center',
  'circle',
  'closest-corner',
  'closest-side',
  'contain',
  'content-box',
  'cover',
  'currentColor',
  'decreasing',
  'display-p3',
  'ellipse',
  'evenodd',
  'farthest-corner',
  'farthest-side',
  'first',
  'first-except',
  'from',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'last',
  'lch',
  'left',
  'linear',
  'longer',
  'ltr',
  'margin-box',
  'none',
  'nonzero',
  'oklab',
  'oklch',
  'padding-box',
  'prophoto-rgb',
  'radial',
  'rec2020',
  'right',
  'round',
  'rtl',
  'shorter',
  'srgb',
  'srgb-linear',
  'start',
  'to',
  'top',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** shape-rendering 属性支持的关键词（不含颜色） */
export const SHAPE_RENDERING_KEYWORDS = [
  'auto',
  'crispEdges',
  'geometricPrecision',
  'optimizeSpeed',
] as const;

/** speak 属性支持的关键词（不含颜色） */
export const SPEAK_KEYWORDS = [
  'always',
  'auto',
  'never',
] as const;

/** speak-as 属性支持的关键词（不含颜色） */
export const SPEAK_AS_KEYWORDS = [
  'digits',
  'literal-punctuation',
  'no-punctuation',
  'normal',
  'spell-out',
] as const;

/** stroke 属性支持的关键词（不含颜色） - 支持颜色 */
export const STROKE_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'context-fill',
  'context-stroke',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** stroke-dasharray 属性支持的关键词（不含颜色） */
export const STROKE_DASHARRAY_KEYWORDS = [
  'none',
] as const;

/** stroke-linecap 属性支持的关键词（不含颜色） */
export const STROKE_LINECAP_KEYWORDS = [
  'butt',
  'round',
  'square',
] as const;

/** stroke-linejoin 属性支持的关键词（不含颜色） */
export const STROKE_LINEJOIN_KEYWORDS = [
  'bevel',
  'miter',
  'round',
] as const;

/** table-layout 属性支持的关键词（不含颜色） */
export const TABLE_LAYOUT_KEYWORDS = [
  'auto',
  'fixed',
] as const;

/** text-align 属性支持的关键词（不含颜色） */
export const TEXT_ALIGN_KEYWORDS = [
  'center',
  'end',
  'justify',
  'left',
  'match-parent',
  'right',
  'start',
] as const;

/** text-align-last 属性支持的关键词（不含颜色） */
export const TEXT_ALIGN_LAST_KEYWORDS = [
  'auto',
  'center',
  'end',
  'justify',
  'left',
  'right',
  'start',
] as const;

/** text-anchor 属性支持的关键词（不含颜色） */
export const TEXT_ANCHOR_KEYWORDS = [
  'end',
  'middle',
  'start',
] as const;

/** text-combine-upright 属性支持的关键词（不含颜色） */
export const TEXT_COMBINE_UPRIGHT_KEYWORDS = [
  'all',
  'digits',
  'none',
] as const;

/** text-decoration-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const TEXT_DECORATION_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** text-decoration-line 属性支持的关键词（不含颜色） */
export const TEXT_DECORATION_LINE_KEYWORDS = [
  'blink',
  'grammar-error',
  'line-through',
  'none',
  'overline',
  'spelling-error',
  'underline',
] as const;

/** text-decoration-skip 属性支持的关键词（不含颜色） */
export const TEXT_DECORATION_SKIP_KEYWORDS = [
  'box-decoration',
  'edges',
  'leading-spaces',
  'none',
  'objects',
  'spaces',
  'trailing-spaces',
] as const;

/** text-decoration-skip-ink 属性支持的关键词（不含颜色） */
export const TEXT_DECORATION_SKIP_INK_KEYWORDS = [
  'all',
  'auto',
  'none',
] as const;

/** text-decoration-style 属性支持的关键词（不含颜色） */
export const TEXT_DECORATION_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'solid',
  'wavy',
] as const;

/** text-decoration-thickness 属性支持的关键词（不含颜色） */
export const TEXT_DECORATION_THICKNESS_KEYWORDS = [
  'auto',
  'from-font',
] as const;

/** text-emphasis-color 属性支持的关键词（不含颜色） - 支持颜色 */
export const TEXT_EMPHASIS_COLOR_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** text-emphasis-position 属性支持的关键词（不含颜色） */
export const TEXT_EMPHASIS_POSITION_KEYWORDS = [
  'auto',
  'left',
  'over',
  'right',
  'under',
] as const;

/** text-emphasis-style 属性支持的关键词（不含颜色） */
export const TEXT_EMPHASIS_STYLE_KEYWORDS = [
  'circle',
  'dot',
  'double-circle',
  'filled',
  'none',
  'open',
  'sesame',
  'triangle',
] as const;

/** text-indent 属性支持的关键词（不含颜色） */
export const TEXT_INDENT_KEYWORDS = [
  'each-line',
  'hanging',
] as const;

/** text-justify 属性支持的关键词（不含颜色） */
export const TEXT_JUSTIFY_KEYWORDS = [
  'auto',
  'inter-character',
  'inter-word',
  'none',
] as const;

/** text-orientation 属性支持的关键词（不含颜色） */
export const TEXT_ORIENTATION_KEYWORDS = [
  'mixed',
  'sideways',
  'upright',
] as const;

/** text-overflow 属性支持的关键词（不含颜色） */
export const TEXT_OVERFLOW_KEYWORDS = [
  'clip',
  'ellipsis',
] as const;

/** text-rendering 属性支持的关键词（不含颜色） */
export const TEXT_RENDERING_KEYWORDS = [
  'auto',
  'geometricPrecision',
  'optimizeLegibility',
  'optimizeSpeed',
] as const;

/** text-shadow 属性支持的关键词（不含颜色） - 支持颜色 */
export const TEXT_SHADOW_KEYWORDS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
  'a98-rgb',
  'currentColor',
  'decreasing',
  'display-p3',
  'hsl',
  'hue',
  'hwb',
  'in',
  'increasing',
  'lab',
  'lch',
  'longer',
  'none',
  'oklab',
  'oklch',
  'prophoto-rgb',
  'rec2020',
  'shorter',
  'srgb',
  'srgb-linear',
  'xyz',
  'xyz-d50',
  'xyz-d65',
] as const;

/** text-size-adjust 属性支持的关键词（不含颜色） */
export const TEXT_SIZE_ADJUST_KEYWORDS = [
  'auto',
  'none',
] as const;

/** text-spacing-trim 属性支持的关键词（不含颜色） */
export const TEXT_SPACING_TRIM_KEYWORDS = [
  'auto',
  'normal',
  'space-all',
  'space-first',
  'trim-all',
  'trim-both',
  'trim-start',
] as const;

/** text-transform 属性支持的关键词（不含颜色） */
export const TEXT_TRANSFORM_KEYWORDS = [
  'capitalize',
  'full-size-kana',
  'full-width',
  'lowercase',
  'none',
  'uppercase',
] as const;

/** text-underline-offset 属性支持的关键词（不含颜色） */
export const TEXT_UNDERLINE_OFFSET_KEYWORDS = [
  'auto',
] as const;

/** text-underline-position 属性支持的关键词（不含颜色） */
export const TEXT_UNDERLINE_POSITION_KEYWORDS = [
  'auto',
  'from-font',
  'left',
  'right',
  'under',
] as const;

/** text-wrap-mode 属性支持的关键词（不含颜色） */
export const TEXT_WRAP_MODE_KEYWORDS = [
  'auto',
  'nowrap',
  'wrap',
] as const;

/** text-wrap-style 属性支持的关键词（不含颜色） */
export const TEXT_WRAP_STYLE_KEYWORDS = [
  'auto',
  'balance',
  'pretty',
  'stable',
] as const;

/** timeline-scope 属性支持的关键词（不含颜色） */
export const TIMELINE_SCOPE_KEYWORDS = [
  'none',
] as const;

/** top 属性支持的关键词（不含颜色） */
export const TOP_KEYWORDS = [
  'auto',
] as const;

/** touch-action 属性支持的关键词（不含颜色） */
export const TOUCH_ACTION_KEYWORDS = [
  'auto',
  'manipulation',
  'none',
  'pan-down',
  'pan-left',
  'pan-right',
  'pan-up',
  'pan-x',
  'pan-y',
  'pinch-zoom',
] as const;

/** transform 属性支持的关键词（不含颜色） */
export const TRANSFORM_KEYWORDS = [
  'none',
] as const;

/** transform-box 属性支持的关键词（不含颜色） */
export const TRANSFORM_BOX_KEYWORDS = [
  'border-box',
  'content-box',
  'fill-box',
  'stroke-box',
  'view-box',
] as const;

/** transform-origin 属性支持的关键词（不含颜色） */
export const TRANSFORM_ORIGIN_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** transform-style 属性支持的关键词（不含颜色） */
export const TRANSFORM_STYLE_KEYWORDS = [
  'flat',
  'preserve-3d',
] as const;

/** transition 属性支持的关键词（不含颜色） */
export const TRANSITION_KEYWORDS = [
  'all',
  'allow-discrete',
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'end',
  'jump-both',
  'jump-end',
  'jump-none',
  'jump-start',
  'linear',
  'none',
  'normal',
  'start',
  'step-end',
  'step-start',
] as const;

/** transition-behavior 属性支持的关键词（不含颜色） */
export const TRANSITION_BEHAVIOR_KEYWORDS = [
  'allow-discrete',
  'normal',
] as const;

/** transition-property 属性支持的关键词（不含颜色） */
export const TRANSITION_PROPERTY_KEYWORDS = [
  'all',
  'none',
] as const;

/** transition-timing-function 属性支持的关键词（不含颜色） */
export const TRANSITION_TIMING_FUNCTION_KEYWORDS = [
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'end',
  'jump-both',
  'jump-end',
  'jump-none',
  'jump-start',
  'linear',
  'start',
  'step-end',
  'step-start',
] as const;

/** translate 属性支持的关键词（不含颜色） */
export const TRANSLATE_KEYWORDS = [
  'none',
] as const;

/** unicode-bidi 属性支持的关键词（不含颜色） */
export const UNICODE_BIDI_KEYWORDS = [
  'bidi-override',
  'embed',
  'isolate',
  'isolate-override',
  'normal',
  'plaintext',
] as const;

/** user-select 属性支持的关键词（不含颜色） */
export const USER_SELECT_KEYWORDS = [
  'all',
  'auto',
  'contain',
  'none',
  'text',
] as const;

/** vector-effect 属性支持的关键词（不含颜色） */
export const VECTOR_EFFECT_KEYWORDS = [
  'fixed-position',
  'non-rotation',
  'non-scaling-size',
  'non-scaling-stroke',
  'none',
] as const;

/** vertical-align 属性支持的关键词（不含颜色） */
export const VERTICAL_ALIGN_KEYWORDS = [
  'baseline',
  'bottom',
  'middle',
  'sub',
  'super',
  'text-bottom',
  'text-top',
  'top',
] as const;

/** view-timeline-axis 属性支持的关键词（不含颜色） */
export const VIEW_TIMELINE_AXIS_KEYWORDS = [
  'block',
  'inline',
  'x',
  'y',
] as const;

/** view-timeline-inset 属性支持的关键词（不含颜色） */
export const VIEW_TIMELINE_INSET_KEYWORDS = [
  'auto',
] as const;

/** view-timeline-name 属性支持的关键词（不含颜色） */
export const VIEW_TIMELINE_NAME_KEYWORDS = [
  'none',
] as const;

/** view-transition-name 属性支持的关键词（不含颜色） */
export const VIEW_TRANSITION_NAME_KEYWORDS = [
  'none',
] as const;

/** visibility 属性支持的关键词（不含颜色） */
export const VISIBILITY_KEYWORDS = [
  'collapse',
  'hidden',
  'visible',
] as const;

/** voice-balance 属性支持的关键词（不含颜色） */
export const VOICE_BALANCE_KEYWORDS = [
  'center',
  'left',
  'leftwards',
  'right',
  'rightwards',
] as const;

/** voice-duration 属性支持的关键词（不含颜色） */
export const VOICE_DURATION_KEYWORDS = [
  'auto',
] as const;

/** voice-family 属性支持的关键词（不含颜色） */
export const VOICE_FAMILY_KEYWORDS = [
  'child',
  'female',
  'male',
  'neutral',
  'old',
  'preserve',
  'young',
] as const;

/** voice-pitch 属性支持的关键词（不含颜色） */
export const VOICE_PITCH_KEYWORDS = [
  'absolute',
  'high',
  'low',
  'medium',
  'x-high',
  'x-low',
] as const;

/** voice-range 属性支持的关键词（不含颜色） */
export const VOICE_RANGE_KEYWORDS = [
  'absolute',
  'high',
  'low',
  'medium',
  'x-high',
  'x-low',
] as const;

/** voice-rate 属性支持的关键词（不含颜色） */
export const VOICE_RATE_KEYWORDS = [
  'fast',
  'medium',
  'normal',
  'slow',
  'x-fast',
  'x-slow',
] as const;

/** voice-stress 属性支持的关键词（不含颜色） */
export const VOICE_STRESS_KEYWORDS = [
  'moderate',
  'none',
  'normal',
  'reduced',
  'strong',
] as const;

/** voice-volume 属性支持的关键词（不含颜色） */
export const VOICE_VOLUME_KEYWORDS = [
  'loud',
  'medium',
  'silent',
  'soft',
  'x-loud',
  'x-soft',
] as const;

/** white-space 属性支持的关键词（不含颜色） */
export const WHITE_SPACE_KEYWORDS = [
  'break-spaces',
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
] as const;

/** white-space-collapse 属性支持的关键词（不含颜色） */
export const WHITE_SPACE_COLLAPSE_KEYWORDS = [
  'break-spaces',
  'collapse',
  'discard',
  'preserve',
  'preserve-breaks',
  'preserve-spaces',
] as const;

/** white-space-trim 属性支持的关键词（不含颜色） */
export const WHITE_SPACE_TRIM_KEYWORDS = [
  'discard-after',
  'discard-before',
  'discard-inner',
  'none',
] as const;

/** width 属性支持的关键词（不含颜色） */
export const WIDTH_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** will-change 属性支持的关键词（不含颜色） */
export const WILL_CHANGE_KEYWORDS = [
  'auto',
  'contents',
  'scroll-position',
] as const;

/** word-break 属性支持的关键词（不含颜色） */
export const WORD_BREAK_KEYWORDS = [
  'auto-phrase',
  'break-all',
  'break-word',
  'keep-all',
  'normal',
] as const;

/** word-spacing 属性支持的关键词（不含颜色） */
export const WORD_SPACING_KEYWORDS = [
  'normal',
] as const;

/** word-wrap 属性支持的关键词（不含颜色） */
export const WORD_WRAP_KEYWORDS = [
  'break-word',
  'normal',
] as const;

/** writing-mode 属性支持的关键词（不含颜色） */
export const WRITING_MODE_KEYWORDS = [
  'horizontal-tb',
  'lr',
  'lr-tb',
  'rl',
  'rl-tb',
  'sideways-lr',
  'sideways-rl',
  'tb',
  'tb-rl',
  'vertical-lr',
  'vertical-rl',
] as const;

/** z-index 属性支持的关键词（不含颜色） */
export const Z_INDEX_KEYWORDS = [
  'auto',
] as const;

/** zoom 属性支持的关键词（不含颜色） */
export const ZOOM_KEYWORDS = [
  'normal',
  'reset',
] as const;

/** 支持颜色值的属性列表 */
export const COLOR_SUPPORTING_PROPERTIES = [
  'accent-color',
  'backdrop-filter',
  'background',
  'background-color',
  'background-image',
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-color',
  'border-image-source',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-left-color',
  'border-right',
  'border-right-color',
  'border-top',
  'border-top-color',
  'box-shadow',
  'caret-color',
  'color',
  'column-rule-color',
  'content',
  'fill',
  'filter',
  'list-style-image',
  'mask',
  'mask-border-source',
  'mask-image',
  'outline-color',
  'scrollbar-color',
  'shape-outside',
  'stroke',
  'text-decoration-color',
  'text-emphasis-color',
  'text-shadow',
] as const;

/** 支持颜色值的属性名类型 */
export type ColorSupportingPropertyName = typeof COLOR_SUPPORTING_PROPERTIES[number];

// 关键词属性值类型（不含颜色）
export type AccentColorKeyword = typeof ACCENT_COLOR_KEYWORDS[number];
export type AlignContentKeyword = typeof ALIGN_CONTENT_KEYWORDS[number];
export type AlignItemsKeyword = typeof ALIGN_ITEMS_KEYWORDS[number];
export type AlignSelfKeyword = typeof ALIGN_SELF_KEYWORDS[number];
export type AlignTracksKeyword = typeof ALIGN_TRACKS_KEYWORDS[number];
export type AlignmentBaselineKeyword = typeof ALIGNMENT_BASELINE_KEYWORDS[number];
export type AllKeyword = typeof ALL_KEYWORDS[number];
export type AnchorNameKeyword = typeof ANCHOR_NAME_KEYWORDS[number];
export type AnchorScopeKeyword = typeof ANCHOR_SCOPE_KEYWORDS[number];
export type AnimationKeyword = typeof ANIMATION_KEYWORDS[number];
export type AnimationCompositionKeyword = typeof ANIMATION_COMPOSITION_KEYWORDS[number];
export type AnimationDirectionKeyword = typeof ANIMATION_DIRECTION_KEYWORDS[number];
export type AnimationFillModeKeyword = typeof ANIMATION_FILL_MODE_KEYWORDS[number];
export type AnimationIterationCountKeyword = typeof ANIMATION_ITERATION_COUNT_KEYWORDS[number];
export type AnimationNameKeyword = typeof ANIMATION_NAME_KEYWORDS[number];
export type AnimationPlayStateKeyword = typeof ANIMATION_PLAY_STATE_KEYWORDS[number];
export type AnimationRangeEndKeyword = typeof ANIMATION_RANGE_END_KEYWORDS[number];
export type AnimationRangeStartKeyword = typeof ANIMATION_RANGE_START_KEYWORDS[number];
export type AnimationTimelineKeyword = typeof ANIMATION_TIMELINE_KEYWORDS[number];
export type AnimationTimingFunctionKeyword = typeof ANIMATION_TIMING_FUNCTION_KEYWORDS[number];
export type AppearanceKeyword = typeof APPEARANCE_KEYWORDS[number];
export type AspectRatioKeyword = typeof ASPECT_RATIO_KEYWORDS[number];
export type AzimuthKeyword = typeof AZIMUTH_KEYWORDS[number];
export type BackdropFilterKeyword = typeof BACKDROP_FILTER_KEYWORDS[number];
export type BackfaceVisibilityKeyword = typeof BACKFACE_VISIBILITY_KEYWORDS[number];
export type BackgroundKeyword = typeof BACKGROUND_KEYWORDS[number];
export type BackgroundAttachmentKeyword = typeof BACKGROUND_ATTACHMENT_KEYWORDS[number];
export type BackgroundBlendModeKeyword = typeof BACKGROUND_BLEND_MODE_KEYWORDS[number];
export type BackgroundClipKeyword = typeof BACKGROUND_CLIP_KEYWORDS[number];
export type BackgroundColorKeyword = typeof BACKGROUND_COLOR_KEYWORDS[number];
export type BackgroundImageKeyword = typeof BACKGROUND_IMAGE_KEYWORDS[number];
export type BackgroundOriginKeyword = typeof BACKGROUND_ORIGIN_KEYWORDS[number];
export type BackgroundPositionKeyword = typeof BACKGROUND_POSITION_KEYWORDS[number];
export type BackgroundPositionXKeyword = typeof BACKGROUND_POSITION_X_KEYWORDS[number];
export type BackgroundPositionYKeyword = typeof BACKGROUND_POSITION_Y_KEYWORDS[number];
export type BackgroundRepeatKeyword = typeof BACKGROUND_REPEAT_KEYWORDS[number];
export type BackgroundSizeKeyword = typeof BACKGROUND_SIZE_KEYWORDS[number];
export type BaselineShiftKeyword = typeof BASELINE_SHIFT_KEYWORDS[number];
export type BorderKeyword = typeof BORDER_KEYWORDS[number];
export type BorderBlockKeyword = typeof BORDER_BLOCK_KEYWORDS[number];
export type BorderBlockEndKeyword = typeof BORDER_BLOCK_END_KEYWORDS[number];
export type BorderBlockStartKeyword = typeof BORDER_BLOCK_START_KEYWORDS[number];
export type BorderBottomKeyword = typeof BORDER_BOTTOM_KEYWORDS[number];
export type BorderBottomStyleKeyword = typeof BORDER_BOTTOM_STYLE_KEYWORDS[number];
export type BorderBottomWidthKeyword = typeof BORDER_BOTTOM_WIDTH_KEYWORDS[number];
export type BorderCollapseKeyword = typeof BORDER_COLLAPSE_KEYWORDS[number];
export type BorderColorKeyword = typeof BORDER_COLOR_KEYWORDS[number];
export type BorderImageRepeatKeyword = typeof BORDER_IMAGE_REPEAT_KEYWORDS[number];
export type BorderImageSliceKeyword = typeof BORDER_IMAGE_SLICE_KEYWORDS[number];
export type BorderImageSourceKeyword = typeof BORDER_IMAGE_SOURCE_KEYWORDS[number];
export type BorderImageWidthKeyword = typeof BORDER_IMAGE_WIDTH_KEYWORDS[number];
export type BorderInlineKeyword = typeof BORDER_INLINE_KEYWORDS[number];
export type BorderInlineEndKeyword = typeof BORDER_INLINE_END_KEYWORDS[number];
export type BorderInlineStartKeyword = typeof BORDER_INLINE_START_KEYWORDS[number];
export type BorderLeftKeyword = typeof BORDER_LEFT_KEYWORDS[number];
export type BorderLeftColorKeyword = typeof BORDER_LEFT_COLOR_KEYWORDS[number];
export type BorderLeftStyleKeyword = typeof BORDER_LEFT_STYLE_KEYWORDS[number];
export type BorderLeftWidthKeyword = typeof BORDER_LEFT_WIDTH_KEYWORDS[number];
export type BorderRightKeyword = typeof BORDER_RIGHT_KEYWORDS[number];
export type BorderRightColorKeyword = typeof BORDER_RIGHT_COLOR_KEYWORDS[number];
export type BorderRightStyleKeyword = typeof BORDER_RIGHT_STYLE_KEYWORDS[number];
export type BorderRightWidthKeyword = typeof BORDER_RIGHT_WIDTH_KEYWORDS[number];
export type BorderStyleKeyword = typeof BORDER_STYLE_KEYWORDS[number];
export type BorderTopKeyword = typeof BORDER_TOP_KEYWORDS[number];
export type BorderTopColorKeyword = typeof BORDER_TOP_COLOR_KEYWORDS[number];
export type BorderTopStyleKeyword = typeof BORDER_TOP_STYLE_KEYWORDS[number];
export type BorderTopWidthKeyword = typeof BORDER_TOP_WIDTH_KEYWORDS[number];
export type BorderWidthKeyword = typeof BORDER_WIDTH_KEYWORDS[number];
export type BottomKeyword = typeof BOTTOM_KEYWORDS[number];
export type BoxAlignKeyword = typeof BOX_ALIGN_KEYWORDS[number];
export type BoxDecorationBreakKeyword = typeof BOX_DECORATION_BREAK_KEYWORDS[number];
export type BoxDirectionKeyword = typeof BOX_DIRECTION_KEYWORDS[number];
export type BoxLinesKeyword = typeof BOX_LINES_KEYWORDS[number];
export type BoxOrientKeyword = typeof BOX_ORIENT_KEYWORDS[number];
export type BoxPackKeyword = typeof BOX_PACK_KEYWORDS[number];
export type BoxShadowKeyword = typeof BOX_SHADOW_KEYWORDS[number];
export type BoxSizingKeyword = typeof BOX_SIZING_KEYWORDS[number];
export type BreakAfterKeyword = typeof BREAK_AFTER_KEYWORDS[number];
export type BreakBeforeKeyword = typeof BREAK_BEFORE_KEYWORDS[number];
export type BreakInsideKeyword = typeof BREAK_INSIDE_KEYWORDS[number];
export type CaptionSideKeyword = typeof CAPTION_SIDE_KEYWORDS[number];
export type CaretColorKeyword = typeof CARET_COLOR_KEYWORDS[number];
export type CaretShapeKeyword = typeof CARET_SHAPE_KEYWORDS[number];
export type ClearKeyword = typeof CLEAR_KEYWORDS[number];
export type ClipKeyword = typeof CLIP_KEYWORDS[number];
export type ClipPathKeyword = typeof CLIP_PATH_KEYWORDS[number];
export type ClipRuleKeyword = typeof CLIP_RULE_KEYWORDS[number];
export type ColorKeyword = typeof COLOR_KEYWORDS[number];
export type ColorInterpolationFiltersKeyword = typeof COLOR_INTERPOLATION_FILTERS_KEYWORDS[number];
export type ColorSchemeKeyword = typeof COLOR_SCHEME_KEYWORDS[number];
export type ColumnCountKeyword = typeof COLUMN_COUNT_KEYWORDS[number];
export type ColumnFillKeyword = typeof COLUMN_FILL_KEYWORDS[number];
export type ColumnGapKeyword = typeof COLUMN_GAP_KEYWORDS[number];
export type ColumnRuleColorKeyword = typeof COLUMN_RULE_COLOR_KEYWORDS[number];
export type ColumnSpanKeyword = typeof COLUMN_SPAN_KEYWORDS[number];
export type ColumnWidthKeyword = typeof COLUMN_WIDTH_KEYWORDS[number];
export type ContainKeyword = typeof CONTAIN_KEYWORDS[number];
export type ContainIntrinsicBlockSizeKeyword = typeof CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS[number];
export type ContainIntrinsicHeightKeyword = typeof CONTAIN_INTRINSIC_HEIGHT_KEYWORDS[number];
export type ContainIntrinsicInlineSizeKeyword = typeof CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS[number];
export type ContainIntrinsicSizeKeyword = typeof CONTAIN_INTRINSIC_SIZE_KEYWORDS[number];
export type ContainIntrinsicWidthKeyword = typeof CONTAIN_INTRINSIC_WIDTH_KEYWORDS[number];
export type ContainerNameKeyword = typeof CONTAINER_NAME_KEYWORDS[number];
export type ContainerTypeKeyword = typeof CONTAINER_TYPE_KEYWORDS[number];
export type ContentKeyword = typeof CONTENT_KEYWORDS[number];
export type ContentVisibilityKeyword = typeof CONTENT_VISIBILITY_KEYWORDS[number];
export type CounterIncrementKeyword = typeof COUNTER_INCREMENT_KEYWORDS[number];
export type CounterResetKeyword = typeof COUNTER_RESET_KEYWORDS[number];
export type CounterSetKeyword = typeof COUNTER_SET_KEYWORDS[number];
export type CueAfterKeyword = typeof CUE_AFTER_KEYWORDS[number];
export type CueBeforeKeyword = typeof CUE_BEFORE_KEYWORDS[number];
export type CursorKeyword = typeof CURSOR_KEYWORDS[number];
export type DKeyword = typeof D_KEYWORDS[number];
export type DirectionKeyword = typeof DIRECTION_KEYWORDS[number];
export type DisplayKeyword = typeof DISPLAY_KEYWORDS[number];
export type DominantBaselineKeyword = typeof DOMINANT_BASELINE_KEYWORDS[number];
export type EmptyCellsKeyword = typeof EMPTY_CELLS_KEYWORDS[number];
export type FieldSizingKeyword = typeof FIELD_SIZING_KEYWORDS[number];
export type FillKeyword = typeof FILL_KEYWORDS[number];
export type FillRuleKeyword = typeof FILL_RULE_KEYWORDS[number];
export type FilterKeyword = typeof FILTER_KEYWORDS[number];
export type FlexKeyword = typeof FLEX_KEYWORDS[number];
export type FlexBasisKeyword = typeof FLEX_BASIS_KEYWORDS[number];
export type FlexDirectionKeyword = typeof FLEX_DIRECTION_KEYWORDS[number];
export type FlexWrapKeyword = typeof FLEX_WRAP_KEYWORDS[number];
export type FloatKeyword = typeof FLOAT_KEYWORDS[number];
export type FontKeyword = typeof FONT_KEYWORDS[number];
export type FontFamilyKeyword = typeof FONT_FAMILY_KEYWORDS[number];
export type FontFeatureSettingsKeyword = typeof FONT_FEATURE_SETTINGS_KEYWORDS[number];
export type FontKerningKeyword = typeof FONT_KERNING_KEYWORDS[number];
export type FontLanguageOverrideKeyword = typeof FONT_LANGUAGE_OVERRIDE_KEYWORDS[number];
export type FontOpticalSizingKeyword = typeof FONT_OPTICAL_SIZING_KEYWORDS[number];
export type FontPaletteKeyword = typeof FONT_PALETTE_KEYWORDS[number];
export type FontSizeKeyword = typeof FONT_SIZE_KEYWORDS[number];
export type FontSizeAdjustKeyword = typeof FONT_SIZE_ADJUST_KEYWORDS[number];
export type FontSmoothKeyword = typeof FONT_SMOOTH_KEYWORDS[number];
export type FontStretchKeyword = typeof FONT_STRETCH_KEYWORDS[number];
export type FontStyleKeyword = typeof FONT_STYLE_KEYWORDS[number];
export type FontSynthesisKeyword = typeof FONT_SYNTHESIS_KEYWORDS[number];
export type FontSynthesisPositionKeyword = typeof FONT_SYNTHESIS_POSITION_KEYWORDS[number];
export type FontSynthesisSmallCapsKeyword = typeof FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS[number];
export type FontSynthesisStyleKeyword = typeof FONT_SYNTHESIS_STYLE_KEYWORDS[number];
export type FontSynthesisWeightKeyword = typeof FONT_SYNTHESIS_WEIGHT_KEYWORDS[number];
export type FontVariantKeyword = typeof FONT_VARIANT_KEYWORDS[number];
export type FontVariantAlternatesKeyword = typeof FONT_VARIANT_ALTERNATES_KEYWORDS[number];
export type FontVariantCapsKeyword = typeof FONT_VARIANT_CAPS_KEYWORDS[number];
export type FontVariantEastAsianKeyword = typeof FONT_VARIANT_EAST_ASIAN_KEYWORDS[number];
export type FontVariantEmojiKeyword = typeof FONT_VARIANT_EMOJI_KEYWORDS[number];
export type FontVariantLigaturesKeyword = typeof FONT_VARIANT_LIGATURES_KEYWORDS[number];
export type FontVariantNumericKeyword = typeof FONT_VARIANT_NUMERIC_KEYWORDS[number];
export type FontVariantPositionKeyword = typeof FONT_VARIANT_POSITION_KEYWORDS[number];
export type FontVariationSettingsKeyword = typeof FONT_VARIATION_SETTINGS_KEYWORDS[number];
export type FontWeightKeyword = typeof FONT_WEIGHT_KEYWORDS[number];
export type ForcedColorAdjustKeyword = typeof FORCED_COLOR_ADJUST_KEYWORDS[number];
export type GridKeyword = typeof GRID_KEYWORDS[number];
export type GridAreaKeyword = typeof GRID_AREA_KEYWORDS[number];
export type GridAutoColumnsKeyword = typeof GRID_AUTO_COLUMNS_KEYWORDS[number];
export type GridAutoFlowKeyword = typeof GRID_AUTO_FLOW_KEYWORDS[number];
export type GridAutoRowsKeyword = typeof GRID_AUTO_ROWS_KEYWORDS[number];
export type GridColumnKeyword = typeof GRID_COLUMN_KEYWORDS[number];
export type GridColumnEndKeyword = typeof GRID_COLUMN_END_KEYWORDS[number];
export type GridColumnStartKeyword = typeof GRID_COLUMN_START_KEYWORDS[number];
export type GridRowKeyword = typeof GRID_ROW_KEYWORDS[number];
export type GridRowEndKeyword = typeof GRID_ROW_END_KEYWORDS[number];
export type GridRowStartKeyword = typeof GRID_ROW_START_KEYWORDS[number];
export type GridTemplateKeyword = typeof GRID_TEMPLATE_KEYWORDS[number];
export type GridTemplateAreasKeyword = typeof GRID_TEMPLATE_AREAS_KEYWORDS[number];
export type GridTemplateColumnsKeyword = typeof GRID_TEMPLATE_COLUMNS_KEYWORDS[number];
export type GridTemplateRowsKeyword = typeof GRID_TEMPLATE_ROWS_KEYWORDS[number];
export type HangingPunctuationKeyword = typeof HANGING_PUNCTUATION_KEYWORDS[number];
export type HeightKeyword = typeof HEIGHT_KEYWORDS[number];
export type HyphenateCharacterKeyword = typeof HYPHENATE_CHARACTER_KEYWORDS[number];
export type HyphenateLimitCharsKeyword = typeof HYPHENATE_LIMIT_CHARS_KEYWORDS[number];
export type HyphensKeyword = typeof HYPHENS_KEYWORDS[number];
export type ImageOrientationKeyword = typeof IMAGE_ORIENTATION_KEYWORDS[number];
export type ImageRenderingKeyword = typeof IMAGE_RENDERING_KEYWORDS[number];
export type ImageResolutionKeyword = typeof IMAGE_RESOLUTION_KEYWORDS[number];
export type ImeModeKeyword = typeof IME_MODE_KEYWORDS[number];
export type InitialLetterKeyword = typeof INITIAL_LETTER_KEYWORDS[number];
export type InitialLetterAlignKeyword = typeof INITIAL_LETTER_ALIGN_KEYWORDS[number];
export type InputSecurityKeyword = typeof INPUT_SECURITY_KEYWORDS[number];
export type InterpolateSizeKeyword = typeof INTERPOLATE_SIZE_KEYWORDS[number];
export type IsolationKeyword = typeof ISOLATION_KEYWORDS[number];
export type JustifyContentKeyword = typeof JUSTIFY_CONTENT_KEYWORDS[number];
export type JustifyItemsKeyword = typeof JUSTIFY_ITEMS_KEYWORDS[number];
export type JustifySelfKeyword = typeof JUSTIFY_SELF_KEYWORDS[number];
export type JustifyTracksKeyword = typeof JUSTIFY_TRACKS_KEYWORDS[number];
export type KerningKeyword = typeof KERNING_KEYWORDS[number];
export type LeftKeyword = typeof LEFT_KEYWORDS[number];
export type LetterSpacingKeyword = typeof LETTER_SPACING_KEYWORDS[number];
export type LineBreakKeyword = typeof LINE_BREAK_KEYWORDS[number];
export type LineClampKeyword = typeof LINE_CLAMP_KEYWORDS[number];
export type LineHeightKeyword = typeof LINE_HEIGHT_KEYWORDS[number];
export type ListStyleImageKeyword = typeof LIST_STYLE_IMAGE_KEYWORDS[number];
export type ListStylePositionKeyword = typeof LIST_STYLE_POSITION_KEYWORDS[number];
export type ListStyleTypeKeyword = typeof LIST_STYLE_TYPE_KEYWORDS[number];
export type MarginKeyword = typeof MARGIN_KEYWORDS[number];
export type MarginBottomKeyword = typeof MARGIN_BOTTOM_KEYWORDS[number];
export type MarginLeftKeyword = typeof MARGIN_LEFT_KEYWORDS[number];
export type MarginRightKeyword = typeof MARGIN_RIGHT_KEYWORDS[number];
export type MarginTopKeyword = typeof MARGIN_TOP_KEYWORDS[number];
export type MarginTrimKeyword = typeof MARGIN_TRIM_KEYWORDS[number];
export type MarkerKeyword = typeof MARKER_KEYWORDS[number];
export type MarkerEndKeyword = typeof MARKER_END_KEYWORDS[number];
export type MarkerMidKeyword = typeof MARKER_MID_KEYWORDS[number];
export type MarkerStartKeyword = typeof MARKER_START_KEYWORDS[number];
export type MaskKeyword = typeof MASK_KEYWORDS[number];
export type MaskBorderModeKeyword = typeof MASK_BORDER_MODE_KEYWORDS[number];
export type MaskBorderRepeatKeyword = typeof MASK_BORDER_REPEAT_KEYWORDS[number];
export type MaskBorderSliceKeyword = typeof MASK_BORDER_SLICE_KEYWORDS[number];
export type MaskBorderSourceKeyword = typeof MASK_BORDER_SOURCE_KEYWORDS[number];
export type MaskBorderWidthKeyword = typeof MASK_BORDER_WIDTH_KEYWORDS[number];
export type MaskClipKeyword = typeof MASK_CLIP_KEYWORDS[number];
export type MaskCompositeKeyword = typeof MASK_COMPOSITE_KEYWORDS[number];
export type MaskImageKeyword = typeof MASK_IMAGE_KEYWORDS[number];
export type MaskModeKeyword = typeof MASK_MODE_KEYWORDS[number];
export type MaskOriginKeyword = typeof MASK_ORIGIN_KEYWORDS[number];
export type MaskPositionKeyword = typeof MASK_POSITION_KEYWORDS[number];
export type MaskRepeatKeyword = typeof MASK_REPEAT_KEYWORDS[number];
export type MaskSizeKeyword = typeof MASK_SIZE_KEYWORDS[number];
export type MaskTypeKeyword = typeof MASK_TYPE_KEYWORDS[number];
export type MasonryAutoFlowKeyword = typeof MASONRY_AUTO_FLOW_KEYWORDS[number];
export type MathDepthKeyword = typeof MATH_DEPTH_KEYWORDS[number];
export type MathShiftKeyword = typeof MATH_SHIFT_KEYWORDS[number];
export type MathStyleKeyword = typeof MATH_STYLE_KEYWORDS[number];
export type MaxHeightKeyword = typeof MAX_HEIGHT_KEYWORDS[number];
export type MaxLinesKeyword = typeof MAX_LINES_KEYWORDS[number];
export type MaxWidthKeyword = typeof MAX_WIDTH_KEYWORDS[number];
export type MinHeightKeyword = typeof MIN_HEIGHT_KEYWORDS[number];
export type MinWidthKeyword = typeof MIN_WIDTH_KEYWORDS[number];
export type MixBlendModeKeyword = typeof MIX_BLEND_MODE_KEYWORDS[number];
export type ObjectFitKeyword = typeof OBJECT_FIT_KEYWORDS[number];
export type ObjectPositionKeyword = typeof OBJECT_POSITION_KEYWORDS[number];
export type OffsetAnchorKeyword = typeof OFFSET_ANCHOR_KEYWORDS[number];
export type OffsetPathKeyword = typeof OFFSET_PATH_KEYWORDS[number];
export type OffsetPositionKeyword = typeof OFFSET_POSITION_KEYWORDS[number];
export type OffsetRotateKeyword = typeof OFFSET_ROTATE_KEYWORDS[number];
export type OutlineColorKeyword = typeof OUTLINE_COLOR_KEYWORDS[number];
export type OutlineStyleKeyword = typeof OUTLINE_STYLE_KEYWORDS[number];
export type OutlineWidthKeyword = typeof OUTLINE_WIDTH_KEYWORDS[number];
export type OverflowKeyword = typeof OVERFLOW_KEYWORDS[number];
export type OverflowAnchorKeyword = typeof OVERFLOW_ANCHOR_KEYWORDS[number];
export type OverflowBlockKeyword = typeof OVERFLOW_BLOCK_KEYWORDS[number];
export type OverflowClipBoxKeyword = typeof OVERFLOW_CLIP_BOX_KEYWORDS[number];
export type OverflowClipMarginKeyword = typeof OVERFLOW_CLIP_MARGIN_KEYWORDS[number];
export type OverflowInlineKeyword = typeof OVERFLOW_INLINE_KEYWORDS[number];
export type OverflowWrapKeyword = typeof OVERFLOW_WRAP_KEYWORDS[number];
export type OverflowXKeyword = typeof OVERFLOW_X_KEYWORDS[number];
export type OverflowYKeyword = typeof OVERFLOW_Y_KEYWORDS[number];
export type OverlayKeyword = typeof OVERLAY_KEYWORDS[number];
export type OverscrollBehaviorKeyword = typeof OVERSCROLL_BEHAVIOR_KEYWORDS[number];
export type OverscrollBehaviorBlockKeyword = typeof OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS[number];
export type OverscrollBehaviorInlineKeyword = typeof OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS[number];
export type OverscrollBehaviorXKeyword = typeof OVERSCROLL_BEHAVIOR_X_KEYWORDS[number];
export type OverscrollBehaviorYKeyword = typeof OVERSCROLL_BEHAVIOR_Y_KEYWORDS[number];
export type PageKeyword = typeof PAGE_KEYWORDS[number];
export type PageBreakAfterKeyword = typeof PAGE_BREAK_AFTER_KEYWORDS[number];
export type PageBreakBeforeKeyword = typeof PAGE_BREAK_BEFORE_KEYWORDS[number];
export type PageBreakInsideKeyword = typeof PAGE_BREAK_INSIDE_KEYWORDS[number];
export type PaintOrderKeyword = typeof PAINT_ORDER_KEYWORDS[number];
export type PauseAfterKeyword = typeof PAUSE_AFTER_KEYWORDS[number];
export type PauseBeforeKeyword = typeof PAUSE_BEFORE_KEYWORDS[number];
export type PerspectiveKeyword = typeof PERSPECTIVE_KEYWORDS[number];
export type PerspectiveOriginKeyword = typeof PERSPECTIVE_ORIGIN_KEYWORDS[number];
export type PointerEventsKeyword = typeof POINTER_EVENTS_KEYWORDS[number];
export type PositionKeyword = typeof POSITION_KEYWORDS[number];
export type PositionAnchorKeyword = typeof POSITION_ANCHOR_KEYWORDS[number];
export type PositionAreaKeyword = typeof POSITION_AREA_KEYWORDS[number];
export type PositionTryFallbacksKeyword = typeof POSITION_TRY_FALLBACKS_KEYWORDS[number];
export type PositionTryOrderKeyword = typeof POSITION_TRY_ORDER_KEYWORDS[number];
export type PositionVisibilityKeyword = typeof POSITION_VISIBILITY_KEYWORDS[number];
export type PrintColorAdjustKeyword = typeof PRINT_COLOR_ADJUST_KEYWORDS[number];
export type QuotesKeyword = typeof QUOTES_KEYWORDS[number];
export type ResizeKeyword = typeof RESIZE_KEYWORDS[number];
export type RestAfterKeyword = typeof REST_AFTER_KEYWORDS[number];
export type RestBeforeKeyword = typeof REST_BEFORE_KEYWORDS[number];
export type RightKeyword = typeof RIGHT_KEYWORDS[number];
export type RotateKeyword = typeof ROTATE_KEYWORDS[number];
export type RowGapKeyword = typeof ROW_GAP_KEYWORDS[number];
export type RubyAlignKeyword = typeof RUBY_ALIGN_KEYWORDS[number];
export type RubyMergeKeyword = typeof RUBY_MERGE_KEYWORDS[number];
export type RubyPositionKeyword = typeof RUBY_POSITION_KEYWORDS[number];
export type ScaleKeyword = typeof SCALE_KEYWORDS[number];
export type ScrollBehaviorKeyword = typeof SCROLL_BEHAVIOR_KEYWORDS[number];
export type ScrollPaddingKeyword = typeof SCROLL_PADDING_KEYWORDS[number];
export type ScrollPaddingBlockKeyword = typeof SCROLL_PADDING_BLOCK_KEYWORDS[number];
export type ScrollPaddingBlockEndKeyword = typeof SCROLL_PADDING_BLOCK_END_KEYWORDS[number];
export type ScrollPaddingBlockStartKeyword = typeof SCROLL_PADDING_BLOCK_START_KEYWORDS[number];
export type ScrollPaddingBottomKeyword = typeof SCROLL_PADDING_BOTTOM_KEYWORDS[number];
export type ScrollPaddingInlineKeyword = typeof SCROLL_PADDING_INLINE_KEYWORDS[number];
export type ScrollPaddingInlineEndKeyword = typeof SCROLL_PADDING_INLINE_END_KEYWORDS[number];
export type ScrollPaddingInlineStartKeyword = typeof SCROLL_PADDING_INLINE_START_KEYWORDS[number];
export type ScrollPaddingLeftKeyword = typeof SCROLL_PADDING_LEFT_KEYWORDS[number];
export type ScrollPaddingRightKeyword = typeof SCROLL_PADDING_RIGHT_KEYWORDS[number];
export type ScrollPaddingTopKeyword = typeof SCROLL_PADDING_TOP_KEYWORDS[number];
export type ScrollSnapAlignKeyword = typeof SCROLL_SNAP_ALIGN_KEYWORDS[number];
export type ScrollSnapCoordinateKeyword = typeof SCROLL_SNAP_COORDINATE_KEYWORDS[number];
export type ScrollSnapDestinationKeyword = typeof SCROLL_SNAP_DESTINATION_KEYWORDS[number];
export type ScrollSnapPointsXKeyword = typeof SCROLL_SNAP_POINTS_X_KEYWORDS[number];
export type ScrollSnapPointsYKeyword = typeof SCROLL_SNAP_POINTS_Y_KEYWORDS[number];
export type ScrollSnapStopKeyword = typeof SCROLL_SNAP_STOP_KEYWORDS[number];
export type ScrollSnapTypeKeyword = typeof SCROLL_SNAP_TYPE_KEYWORDS[number];
export type ScrollSnapTypeXKeyword = typeof SCROLL_SNAP_TYPE_X_KEYWORDS[number];
export type ScrollSnapTypeYKeyword = typeof SCROLL_SNAP_TYPE_Y_KEYWORDS[number];
export type ScrollTimelineAxisKeyword = typeof SCROLL_TIMELINE_AXIS_KEYWORDS[number];
export type ScrollTimelineNameKeyword = typeof SCROLL_TIMELINE_NAME_KEYWORDS[number];
export type ScrollbarColorKeyword = typeof SCROLLBAR_COLOR_KEYWORDS[number];
export type ScrollbarGutterKeyword = typeof SCROLLBAR_GUTTER_KEYWORDS[number];
export type ScrollbarWidthKeyword = typeof SCROLLBAR_WIDTH_KEYWORDS[number];
export type ShapeOutsideKeyword = typeof SHAPE_OUTSIDE_KEYWORDS[number];
export type ShapeRenderingKeyword = typeof SHAPE_RENDERING_KEYWORDS[number];
export type SpeakKeyword = typeof SPEAK_KEYWORDS[number];
export type SpeakAsKeyword = typeof SPEAK_AS_KEYWORDS[number];
export type StrokeKeyword = typeof STROKE_KEYWORDS[number];
export type StrokeDasharrayKeyword = typeof STROKE_DASHARRAY_KEYWORDS[number];
export type StrokeLinecapKeyword = typeof STROKE_LINECAP_KEYWORDS[number];
export type StrokeLinejoinKeyword = typeof STROKE_LINEJOIN_KEYWORDS[number];
export type TableLayoutKeyword = typeof TABLE_LAYOUT_KEYWORDS[number];
export type TextAlignKeyword = typeof TEXT_ALIGN_KEYWORDS[number];
export type TextAlignLastKeyword = typeof TEXT_ALIGN_LAST_KEYWORDS[number];
export type TextAnchorKeyword = typeof TEXT_ANCHOR_KEYWORDS[number];
export type TextCombineUprightKeyword = typeof TEXT_COMBINE_UPRIGHT_KEYWORDS[number];
export type TextDecorationColorKeyword = typeof TEXT_DECORATION_COLOR_KEYWORDS[number];
export type TextDecorationLineKeyword = typeof TEXT_DECORATION_LINE_KEYWORDS[number];
export type TextDecorationSkipKeyword = typeof TEXT_DECORATION_SKIP_KEYWORDS[number];
export type TextDecorationSkipInkKeyword = typeof TEXT_DECORATION_SKIP_INK_KEYWORDS[number];
export type TextDecorationStyleKeyword = typeof TEXT_DECORATION_STYLE_KEYWORDS[number];
export type TextDecorationThicknessKeyword = typeof TEXT_DECORATION_THICKNESS_KEYWORDS[number];
export type TextEmphasisColorKeyword = typeof TEXT_EMPHASIS_COLOR_KEYWORDS[number];
export type TextEmphasisPositionKeyword = typeof TEXT_EMPHASIS_POSITION_KEYWORDS[number];
export type TextEmphasisStyleKeyword = typeof TEXT_EMPHASIS_STYLE_KEYWORDS[number];
export type TextIndentKeyword = typeof TEXT_INDENT_KEYWORDS[number];
export type TextJustifyKeyword = typeof TEXT_JUSTIFY_KEYWORDS[number];
export type TextOrientationKeyword = typeof TEXT_ORIENTATION_KEYWORDS[number];
export type TextOverflowKeyword = typeof TEXT_OVERFLOW_KEYWORDS[number];
export type TextRenderingKeyword = typeof TEXT_RENDERING_KEYWORDS[number];
export type TextShadowKeyword = typeof TEXT_SHADOW_KEYWORDS[number];
export type TextSizeAdjustKeyword = typeof TEXT_SIZE_ADJUST_KEYWORDS[number];
export type TextSpacingTrimKeyword = typeof TEXT_SPACING_TRIM_KEYWORDS[number];
export type TextTransformKeyword = typeof TEXT_TRANSFORM_KEYWORDS[number];
export type TextUnderlineOffsetKeyword = typeof TEXT_UNDERLINE_OFFSET_KEYWORDS[number];
export type TextUnderlinePositionKeyword = typeof TEXT_UNDERLINE_POSITION_KEYWORDS[number];
export type TextWrapModeKeyword = typeof TEXT_WRAP_MODE_KEYWORDS[number];
export type TextWrapStyleKeyword = typeof TEXT_WRAP_STYLE_KEYWORDS[number];
export type TimelineScopeKeyword = typeof TIMELINE_SCOPE_KEYWORDS[number];
export type TopKeyword = typeof TOP_KEYWORDS[number];
export type TouchActionKeyword = typeof TOUCH_ACTION_KEYWORDS[number];
export type TransformKeyword = typeof TRANSFORM_KEYWORDS[number];
export type TransformBoxKeyword = typeof TRANSFORM_BOX_KEYWORDS[number];
export type TransformOriginKeyword = typeof TRANSFORM_ORIGIN_KEYWORDS[number];
export type TransformStyleKeyword = typeof TRANSFORM_STYLE_KEYWORDS[number];
export type TransitionKeyword = typeof TRANSITION_KEYWORDS[number];
export type TransitionBehaviorKeyword = typeof TRANSITION_BEHAVIOR_KEYWORDS[number];
export type TransitionPropertyKeyword = typeof TRANSITION_PROPERTY_KEYWORDS[number];
export type TransitionTimingFunctionKeyword = typeof TRANSITION_TIMING_FUNCTION_KEYWORDS[number];
export type TranslateKeyword = typeof TRANSLATE_KEYWORDS[number];
export type UnicodeBidiKeyword = typeof UNICODE_BIDI_KEYWORDS[number];
export type UserSelectKeyword = typeof USER_SELECT_KEYWORDS[number];
export type VectorEffectKeyword = typeof VECTOR_EFFECT_KEYWORDS[number];
export type VerticalAlignKeyword = typeof VERTICAL_ALIGN_KEYWORDS[number];
export type ViewTimelineAxisKeyword = typeof VIEW_TIMELINE_AXIS_KEYWORDS[number];
export type ViewTimelineInsetKeyword = typeof VIEW_TIMELINE_INSET_KEYWORDS[number];
export type ViewTimelineNameKeyword = typeof VIEW_TIMELINE_NAME_KEYWORDS[number];
export type ViewTransitionNameKeyword = typeof VIEW_TRANSITION_NAME_KEYWORDS[number];
export type VisibilityKeyword = typeof VISIBILITY_KEYWORDS[number];
export type VoiceBalanceKeyword = typeof VOICE_BALANCE_KEYWORDS[number];
export type VoiceDurationKeyword = typeof VOICE_DURATION_KEYWORDS[number];
export type VoiceFamilyKeyword = typeof VOICE_FAMILY_KEYWORDS[number];
export type VoicePitchKeyword = typeof VOICE_PITCH_KEYWORDS[number];
export type VoiceRangeKeyword = typeof VOICE_RANGE_KEYWORDS[number];
export type VoiceRateKeyword = typeof VOICE_RATE_KEYWORDS[number];
export type VoiceStressKeyword = typeof VOICE_STRESS_KEYWORDS[number];
export type VoiceVolumeKeyword = typeof VOICE_VOLUME_KEYWORDS[number];
export type WhiteSpaceKeyword = typeof WHITE_SPACE_KEYWORDS[number];
export type WhiteSpaceCollapseKeyword = typeof WHITE_SPACE_COLLAPSE_KEYWORDS[number];
export type WhiteSpaceTrimKeyword = typeof WHITE_SPACE_TRIM_KEYWORDS[number];
export type WidthKeyword = typeof WIDTH_KEYWORDS[number];
export type WillChangeKeyword = typeof WILL_CHANGE_KEYWORDS[number];
export type WordBreakKeyword = typeof WORD_BREAK_KEYWORDS[number];
export type WordSpacingKeyword = typeof WORD_SPACING_KEYWORDS[number];
export type WordWrapKeyword = typeof WORD_WRAP_KEYWORDS[number];
export type WritingModeKeyword = typeof WRITING_MODE_KEYWORDS[number];
export type ZIndexKeyword = typeof Z_INDEX_KEYWORDS[number];
export type ZoomKeyword = typeof ZOOM_KEYWORDS[number];

// 关键词属性完整值类型（含颜色，如果支持）
export type AccentColorValue = AccentColorKeyword | ColorValue;
export type AlignContentValue = AlignContentKeyword;
export type AlignItemsValue = AlignItemsKeyword;
export type AlignSelfValue = AlignSelfKeyword;
export type AlignTracksValue = AlignTracksKeyword;
export type AlignmentBaselineValue = AlignmentBaselineKeyword;
export type AllValue = AllKeyword;
export type AnchorNameValue = AnchorNameKeyword;
export type AnchorScopeValue = AnchorScopeKeyword;
export type AnimationValue = AnimationKeyword;
export type AnimationCompositionValue = AnimationCompositionKeyword;
export type AnimationDirectionValue = AnimationDirectionKeyword;
export type AnimationFillModeValue = AnimationFillModeKeyword;
export type AnimationIterationCountValue = AnimationIterationCountKeyword;
export type AnimationNameValue = AnimationNameKeyword;
export type AnimationPlayStateValue = AnimationPlayStateKeyword;
export type AnimationRangeEndValue = AnimationRangeEndKeyword;
export type AnimationRangeStartValue = AnimationRangeStartKeyword;
export type AnimationTimelineValue = AnimationTimelineKeyword;
export type AnimationTimingFunctionValue = AnimationTimingFunctionKeyword;
export type AppearanceValue = AppearanceKeyword;
export type AspectRatioValue = AspectRatioKeyword;
export type AzimuthValue = AzimuthKeyword;
export type BackdropFilterValue = BackdropFilterKeyword | ColorValue;
export type BackfaceVisibilityValue = BackfaceVisibilityKeyword;
export type BackgroundValue = BackgroundKeyword | ColorValue;
export type BackgroundAttachmentValue = BackgroundAttachmentKeyword;
export type BackgroundBlendModeValue = BackgroundBlendModeKeyword;
export type BackgroundClipValue = BackgroundClipKeyword;
export type BackgroundColorValue = BackgroundColorKeyword | ColorValue;
export type BackgroundImageValue = BackgroundImageKeyword | ColorValue;
export type BackgroundOriginValue = BackgroundOriginKeyword;
export type BackgroundPositionValue = BackgroundPositionKeyword;
export type BackgroundPositionXValue = BackgroundPositionXKeyword;
export type BackgroundPositionYValue = BackgroundPositionYKeyword;
export type BackgroundRepeatValue = BackgroundRepeatKeyword;
export type BackgroundSizeValue = BackgroundSizeKeyword;
export type BaselineShiftValue = BaselineShiftKeyword;
export type BorderValue = BorderKeyword | ColorValue;
export type BorderBlockValue = BorderBlockKeyword | ColorValue;
export type BorderBlockEndValue = BorderBlockEndKeyword | ColorValue;
export type BorderBlockStartValue = BorderBlockStartKeyword | ColorValue;
export type BorderBottomValue = BorderBottomKeyword | ColorValue;
export type BorderBottomStyleValue = BorderBottomStyleKeyword;
export type BorderBottomWidthValue = BorderBottomWidthKeyword;
export type BorderCollapseValue = BorderCollapseKeyword;
export type BorderColorValue = BorderColorKeyword | ColorValue;
export type BorderImageRepeatValue = BorderImageRepeatKeyword;
export type BorderImageSliceValue = BorderImageSliceKeyword;
export type BorderImageSourceValue = BorderImageSourceKeyword | ColorValue;
export type BorderImageWidthValue = BorderImageWidthKeyword;
export type BorderInlineValue = BorderInlineKeyword | ColorValue;
export type BorderInlineEndValue = BorderInlineEndKeyword | ColorValue;
export type BorderInlineStartValue = BorderInlineStartKeyword | ColorValue;
export type BorderLeftValue = BorderLeftKeyword | ColorValue;
export type BorderLeftColorValue = BorderLeftColorKeyword | ColorValue;
export type BorderLeftStyleValue = BorderLeftStyleKeyword;
export type BorderLeftWidthValue = BorderLeftWidthKeyword;
export type BorderRightValue = BorderRightKeyword | ColorValue;
export type BorderRightColorValue = BorderRightColorKeyword | ColorValue;
export type BorderRightStyleValue = BorderRightStyleKeyword;
export type BorderRightWidthValue = BorderRightWidthKeyword;
export type BorderStyleValue = BorderStyleKeyword;
export type BorderTopValue = BorderTopKeyword | ColorValue;
export type BorderTopColorValue = BorderTopColorKeyword | ColorValue;
export type BorderTopStyleValue = BorderTopStyleKeyword;
export type BorderTopWidthValue = BorderTopWidthKeyword;
export type BorderWidthValue = BorderWidthKeyword;
export type BottomValue = BottomKeyword;
export type BoxAlignValue = BoxAlignKeyword;
export type BoxDecorationBreakValue = BoxDecorationBreakKeyword;
export type BoxDirectionValue = BoxDirectionKeyword;
export type BoxLinesValue = BoxLinesKeyword;
export type BoxOrientValue = BoxOrientKeyword;
export type BoxPackValue = BoxPackKeyword;
export type BoxShadowValue = BoxShadowKeyword | ColorValue;
export type BoxSizingValue = BoxSizingKeyword;
export type BreakAfterValue = BreakAfterKeyword;
export type BreakBeforeValue = BreakBeforeKeyword;
export type BreakInsideValue = BreakInsideKeyword;
export type CaptionSideValue = CaptionSideKeyword;
export type CaretColorValue = CaretColorKeyword | ColorValue;
export type CaretShapeValue = CaretShapeKeyword;
export type ClearValue = ClearKeyword;
export type ClipValue = ClipKeyword;
export type ClipPathValue = ClipPathKeyword;
export type ClipRuleValue = ClipRuleKeyword;
export type ColorValue = ColorKeyword | ColorValue;
export type ColorInterpolationFiltersValue = ColorInterpolationFiltersKeyword;
export type ColorSchemeValue = ColorSchemeKeyword;
export type ColumnCountValue = ColumnCountKeyword;
export type ColumnFillValue = ColumnFillKeyword;
export type ColumnGapValue = ColumnGapKeyword;
export type ColumnRuleColorValue = ColumnRuleColorKeyword | ColorValue;
export type ColumnSpanValue = ColumnSpanKeyword;
export type ColumnWidthValue = ColumnWidthKeyword;
export type ContainValue = ContainKeyword;
export type ContainIntrinsicBlockSizeValue = ContainIntrinsicBlockSizeKeyword;
export type ContainIntrinsicHeightValue = ContainIntrinsicHeightKeyword;
export type ContainIntrinsicInlineSizeValue = ContainIntrinsicInlineSizeKeyword;
export type ContainIntrinsicSizeValue = ContainIntrinsicSizeKeyword;
export type ContainIntrinsicWidthValue = ContainIntrinsicWidthKeyword;
export type ContainerNameValue = ContainerNameKeyword;
export type ContainerTypeValue = ContainerTypeKeyword;
export type ContentValue = ContentKeyword | ColorValue;
export type ContentVisibilityValue = ContentVisibilityKeyword;
export type CounterIncrementValue = CounterIncrementKeyword;
export type CounterResetValue = CounterResetKeyword;
export type CounterSetValue = CounterSetKeyword;
export type CueAfterValue = CueAfterKeyword;
export type CueBeforeValue = CueBeforeKeyword;
export type CursorValue = CursorKeyword;
export type DValue = DKeyword;
export type DirectionValue = DirectionKeyword;
export type DisplayValue = DisplayKeyword;
export type DominantBaselineValue = DominantBaselineKeyword;
export type EmptyCellsValue = EmptyCellsKeyword;
export type FieldSizingValue = FieldSizingKeyword;
export type FillValue = FillKeyword | ColorValue;
export type FillRuleValue = FillRuleKeyword;
export type FilterValue = FilterKeyword | ColorValue;
export type FlexValue = FlexKeyword;
export type FlexBasisValue = FlexBasisKeyword;
export type FlexDirectionValue = FlexDirectionKeyword;
export type FlexWrapValue = FlexWrapKeyword;
export type FloatValue = FloatKeyword;
export type FontValue = FontKeyword;
export type FontFamilyValue = FontFamilyKeyword;
export type FontFeatureSettingsValue = FontFeatureSettingsKeyword;
export type FontKerningValue = FontKerningKeyword;
export type FontLanguageOverrideValue = FontLanguageOverrideKeyword;
export type FontOpticalSizingValue = FontOpticalSizingKeyword;
export type FontPaletteValue = FontPaletteKeyword;
export type FontSizeValue = FontSizeKeyword;
export type FontSizeAdjustValue = FontSizeAdjustKeyword;
export type FontSmoothValue = FontSmoothKeyword;
export type FontStretchValue = FontStretchKeyword;
export type FontStyleValue = FontStyleKeyword;
export type FontSynthesisValue = FontSynthesisKeyword;
export type FontSynthesisPositionValue = FontSynthesisPositionKeyword;
export type FontSynthesisSmallCapsValue = FontSynthesisSmallCapsKeyword;
export type FontSynthesisStyleValue = FontSynthesisStyleKeyword;
export type FontSynthesisWeightValue = FontSynthesisWeightKeyword;
export type FontVariantValue = FontVariantKeyword;
export type FontVariantAlternatesValue = FontVariantAlternatesKeyword;
export type FontVariantCapsValue = FontVariantCapsKeyword;
export type FontVariantEastAsianValue = FontVariantEastAsianKeyword;
export type FontVariantEmojiValue = FontVariantEmojiKeyword;
export type FontVariantLigaturesValue = FontVariantLigaturesKeyword;
export type FontVariantNumericValue = FontVariantNumericKeyword;
export type FontVariantPositionValue = FontVariantPositionKeyword;
export type FontVariationSettingsValue = FontVariationSettingsKeyword;
export type FontWeightValue = FontWeightKeyword;
export type ForcedColorAdjustValue = ForcedColorAdjustKeyword;
export type GridValue = GridKeyword;
export type GridAreaValue = GridAreaKeyword;
export type GridAutoColumnsValue = GridAutoColumnsKeyword;
export type GridAutoFlowValue = GridAutoFlowKeyword;
export type GridAutoRowsValue = GridAutoRowsKeyword;
export type GridColumnValue = GridColumnKeyword;
export type GridColumnEndValue = GridColumnEndKeyword;
export type GridColumnStartValue = GridColumnStartKeyword;
export type GridRowValue = GridRowKeyword;
export type GridRowEndValue = GridRowEndKeyword;
export type GridRowStartValue = GridRowStartKeyword;
export type GridTemplateValue = GridTemplateKeyword;
export type GridTemplateAreasValue = GridTemplateAreasKeyword;
export type GridTemplateColumnsValue = GridTemplateColumnsKeyword;
export type GridTemplateRowsValue = GridTemplateRowsKeyword;
export type HangingPunctuationValue = HangingPunctuationKeyword;
export type HeightValue = HeightKeyword;
export type HyphenateCharacterValue = HyphenateCharacterKeyword;
export type HyphenateLimitCharsValue = HyphenateLimitCharsKeyword;
export type HyphensValue = HyphensKeyword;
export type ImageOrientationValue = ImageOrientationKeyword;
export type ImageRenderingValue = ImageRenderingKeyword;
export type ImageResolutionValue = ImageResolutionKeyword;
export type ImeModeValue = ImeModeKeyword;
export type InitialLetterValue = InitialLetterKeyword;
export type InitialLetterAlignValue = InitialLetterAlignKeyword;
export type InputSecurityValue = InputSecurityKeyword;
export type InterpolateSizeValue = InterpolateSizeKeyword;
export type IsolationValue = IsolationKeyword;
export type JustifyContentValue = JustifyContentKeyword;
export type JustifyItemsValue = JustifyItemsKeyword;
export type JustifySelfValue = JustifySelfKeyword;
export type JustifyTracksValue = JustifyTracksKeyword;
export type KerningValue = KerningKeyword;
export type LeftValue = LeftKeyword;
export type LetterSpacingValue = LetterSpacingKeyword;
export type LineBreakValue = LineBreakKeyword;
export type LineClampValue = LineClampKeyword;
export type LineHeightValue = LineHeightKeyword;
export type ListStyleImageValue = ListStyleImageKeyword | ColorValue;
export type ListStylePositionValue = ListStylePositionKeyword;
export type ListStyleTypeValue = ListStyleTypeKeyword;
export type MarginValue = MarginKeyword;
export type MarginBottomValue = MarginBottomKeyword;
export type MarginLeftValue = MarginLeftKeyword;
export type MarginRightValue = MarginRightKeyword;
export type MarginTopValue = MarginTopKeyword;
export type MarginTrimValue = MarginTrimKeyword;
export type MarkerValue = MarkerKeyword;
export type MarkerEndValue = MarkerEndKeyword;
export type MarkerMidValue = MarkerMidKeyword;
export type MarkerStartValue = MarkerStartKeyword;
export type MaskValue = MaskKeyword | ColorValue;
export type MaskBorderModeValue = MaskBorderModeKeyword;
export type MaskBorderRepeatValue = MaskBorderRepeatKeyword;
export type MaskBorderSliceValue = MaskBorderSliceKeyword;
export type MaskBorderSourceValue = MaskBorderSourceKeyword | ColorValue;
export type MaskBorderWidthValue = MaskBorderWidthKeyword;
export type MaskClipValue = MaskClipKeyword;
export type MaskCompositeValue = MaskCompositeKeyword;
export type MaskImageValue = MaskImageKeyword | ColorValue;
export type MaskModeValue = MaskModeKeyword;
export type MaskOriginValue = MaskOriginKeyword;
export type MaskPositionValue = MaskPositionKeyword;
export type MaskRepeatValue = MaskRepeatKeyword;
export type MaskSizeValue = MaskSizeKeyword;
export type MaskTypeValue = MaskTypeKeyword;
export type MasonryAutoFlowValue = MasonryAutoFlowKeyword;
export type MathDepthValue = MathDepthKeyword;
export type MathShiftValue = MathShiftKeyword;
export type MathStyleValue = MathStyleKeyword;
export type MaxHeightValue = MaxHeightKeyword;
export type MaxLinesValue = MaxLinesKeyword;
export type MaxWidthValue = MaxWidthKeyword;
export type MinHeightValue = MinHeightKeyword;
export type MinWidthValue = MinWidthKeyword;
export type MixBlendModeValue = MixBlendModeKeyword;
export type ObjectFitValue = ObjectFitKeyword;
export type ObjectPositionValue = ObjectPositionKeyword;
export type OffsetAnchorValue = OffsetAnchorKeyword;
export type OffsetPathValue = OffsetPathKeyword;
export type OffsetPositionValue = OffsetPositionKeyword;
export type OffsetRotateValue = OffsetRotateKeyword;
export type OutlineColorValue = OutlineColorKeyword | ColorValue;
export type OutlineStyleValue = OutlineStyleKeyword;
export type OutlineWidthValue = OutlineWidthKeyword;
export type OverflowValue = OverflowKeyword;
export type OverflowAnchorValue = OverflowAnchorKeyword;
export type OverflowBlockValue = OverflowBlockKeyword;
export type OverflowClipBoxValue = OverflowClipBoxKeyword;
export type OverflowClipMarginValue = OverflowClipMarginKeyword;
export type OverflowInlineValue = OverflowInlineKeyword;
export type OverflowWrapValue = OverflowWrapKeyword;
export type OverflowXValue = OverflowXKeyword;
export type OverflowYValue = OverflowYKeyword;
export type OverlayValue = OverlayKeyword;
export type OverscrollBehaviorValue = OverscrollBehaviorKeyword;
export type OverscrollBehaviorBlockValue = OverscrollBehaviorBlockKeyword;
export type OverscrollBehaviorInlineValue = OverscrollBehaviorInlineKeyword;
export type OverscrollBehaviorXValue = OverscrollBehaviorXKeyword;
export type OverscrollBehaviorYValue = OverscrollBehaviorYKeyword;
export type PageValue = PageKeyword;
export type PageBreakAfterValue = PageBreakAfterKeyword;
export type PageBreakBeforeValue = PageBreakBeforeKeyword;
export type PageBreakInsideValue = PageBreakInsideKeyword;
export type PaintOrderValue = PaintOrderKeyword;
export type PauseAfterValue = PauseAfterKeyword;
export type PauseBeforeValue = PauseBeforeKeyword;
export type PerspectiveValue = PerspectiveKeyword;
export type PerspectiveOriginValue = PerspectiveOriginKeyword;
export type PointerEventsValue = PointerEventsKeyword;
export type PositionValue = PositionKeyword;
export type PositionAnchorValue = PositionAnchorKeyword;
export type PositionAreaValue = PositionAreaKeyword;
export type PositionTryFallbacksValue = PositionTryFallbacksKeyword;
export type PositionTryOrderValue = PositionTryOrderKeyword;
export type PositionVisibilityValue = PositionVisibilityKeyword;
export type PrintColorAdjustValue = PrintColorAdjustKeyword;
export type QuotesValue = QuotesKeyword;
export type ResizeValue = ResizeKeyword;
export type RestAfterValue = RestAfterKeyword;
export type RestBeforeValue = RestBeforeKeyword;
export type RightValue = RightKeyword;
export type RotateValue = RotateKeyword;
export type RowGapValue = RowGapKeyword;
export type RubyAlignValue = RubyAlignKeyword;
export type RubyMergeValue = RubyMergeKeyword;
export type RubyPositionValue = RubyPositionKeyword;
export type ScaleValue = ScaleKeyword;
export type ScrollBehaviorValue = ScrollBehaviorKeyword;
export type ScrollPaddingValue = ScrollPaddingKeyword;
export type ScrollPaddingBlockValue = ScrollPaddingBlockKeyword;
export type ScrollPaddingBlockEndValue = ScrollPaddingBlockEndKeyword;
export type ScrollPaddingBlockStartValue = ScrollPaddingBlockStartKeyword;
export type ScrollPaddingBottomValue = ScrollPaddingBottomKeyword;
export type ScrollPaddingInlineValue = ScrollPaddingInlineKeyword;
export type ScrollPaddingInlineEndValue = ScrollPaddingInlineEndKeyword;
export type ScrollPaddingInlineStartValue = ScrollPaddingInlineStartKeyword;
export type ScrollPaddingLeftValue = ScrollPaddingLeftKeyword;
export type ScrollPaddingRightValue = ScrollPaddingRightKeyword;
export type ScrollPaddingTopValue = ScrollPaddingTopKeyword;
export type ScrollSnapAlignValue = ScrollSnapAlignKeyword;
export type ScrollSnapCoordinateValue = ScrollSnapCoordinateKeyword;
export type ScrollSnapDestinationValue = ScrollSnapDestinationKeyword;
export type ScrollSnapPointsXValue = ScrollSnapPointsXKeyword;
export type ScrollSnapPointsYValue = ScrollSnapPointsYKeyword;
export type ScrollSnapStopValue = ScrollSnapStopKeyword;
export type ScrollSnapTypeValue = ScrollSnapTypeKeyword;
export type ScrollSnapTypeXValue = ScrollSnapTypeXKeyword;
export type ScrollSnapTypeYValue = ScrollSnapTypeYKeyword;
export type ScrollTimelineAxisValue = ScrollTimelineAxisKeyword;
export type ScrollTimelineNameValue = ScrollTimelineNameKeyword;
export type ScrollbarColorValue = ScrollbarColorKeyword | ColorValue;
export type ScrollbarGutterValue = ScrollbarGutterKeyword;
export type ScrollbarWidthValue = ScrollbarWidthKeyword;
export type ShapeOutsideValue = ShapeOutsideKeyword | ColorValue;
export type ShapeRenderingValue = ShapeRenderingKeyword;
export type SpeakValue = SpeakKeyword;
export type SpeakAsValue = SpeakAsKeyword;
export type StrokeValue = StrokeKeyword | ColorValue;
export type StrokeDasharrayValue = StrokeDasharrayKeyword;
export type StrokeLinecapValue = StrokeLinecapKeyword;
export type StrokeLinejoinValue = StrokeLinejoinKeyword;
export type TableLayoutValue = TableLayoutKeyword;
export type TextAlignValue = TextAlignKeyword;
export type TextAlignLastValue = TextAlignLastKeyword;
export type TextAnchorValue = TextAnchorKeyword;
export type TextCombineUprightValue = TextCombineUprightKeyword;
export type TextDecorationColorValue = TextDecorationColorKeyword | ColorValue;
export type TextDecorationLineValue = TextDecorationLineKeyword;
export type TextDecorationSkipValue = TextDecorationSkipKeyword;
export type TextDecorationSkipInkValue = TextDecorationSkipInkKeyword;
export type TextDecorationStyleValue = TextDecorationStyleKeyword;
export type TextDecorationThicknessValue = TextDecorationThicknessKeyword;
export type TextEmphasisColorValue = TextEmphasisColorKeyword | ColorValue;
export type TextEmphasisPositionValue = TextEmphasisPositionKeyword;
export type TextEmphasisStyleValue = TextEmphasisStyleKeyword;
export type TextIndentValue = TextIndentKeyword;
export type TextJustifyValue = TextJustifyKeyword;
export type TextOrientationValue = TextOrientationKeyword;
export type TextOverflowValue = TextOverflowKeyword;
export type TextRenderingValue = TextRenderingKeyword;
export type TextShadowValue = TextShadowKeyword | ColorValue;
export type TextSizeAdjustValue = TextSizeAdjustKeyword;
export type TextSpacingTrimValue = TextSpacingTrimKeyword;
export type TextTransformValue = TextTransformKeyword;
export type TextUnderlineOffsetValue = TextUnderlineOffsetKeyword;
export type TextUnderlinePositionValue = TextUnderlinePositionKeyword;
export type TextWrapModeValue = TextWrapModeKeyword;
export type TextWrapStyleValue = TextWrapStyleKeyword;
export type TimelineScopeValue = TimelineScopeKeyword;
export type TopValue = TopKeyword;
export type TouchActionValue = TouchActionKeyword;
export type TransformValue = TransformKeyword;
export type TransformBoxValue = TransformBoxKeyword;
export type TransformOriginValue = TransformOriginKeyword;
export type TransformStyleValue = TransformStyleKeyword;
export type TransitionValue = TransitionKeyword;
export type TransitionBehaviorValue = TransitionBehaviorKeyword;
export type TransitionPropertyValue = TransitionPropertyKeyword;
export type TransitionTimingFunctionValue = TransitionTimingFunctionKeyword;
export type TranslateValue = TranslateKeyword;
export type UnicodeBidiValue = UnicodeBidiKeyword;
export type UserSelectValue = UserSelectKeyword;
export type VectorEffectValue = VectorEffectKeyword;
export type VerticalAlignValue = VerticalAlignKeyword;
export type ViewTimelineAxisValue = ViewTimelineAxisKeyword;
export type ViewTimelineInsetValue = ViewTimelineInsetKeyword;
export type ViewTimelineNameValue = ViewTimelineNameKeyword;
export type ViewTransitionNameValue = ViewTransitionNameKeyword;
export type VisibilityValue = VisibilityKeyword;
export type VoiceBalanceValue = VoiceBalanceKeyword;
export type VoiceDurationValue = VoiceDurationKeyword;
export type VoiceFamilyValue = VoiceFamilyKeyword;
export type VoicePitchValue = VoicePitchKeyword;
export type VoiceRangeValue = VoiceRangeKeyword;
export type VoiceRateValue = VoiceRateKeyword;
export type VoiceStressValue = VoiceStressKeyword;
export type VoiceVolumeValue = VoiceVolumeKeyword;
export type WhiteSpaceValue = WhiteSpaceKeyword;
export type WhiteSpaceCollapseValue = WhiteSpaceCollapseKeyword;
export type WhiteSpaceTrimValue = WhiteSpaceTrimKeyword;
export type WidthValue = WidthKeyword;
export type WillChangeValue = WillChangeKeyword;
export type WordBreakValue = WordBreakKeyword;
export type WordSpacingValue = WordSpacingKeyword;
export type WordWrapValue = WordWrapKeyword;
export type WritingModeValue = WritingModeKeyword;
export type ZIndexValue = ZIndexKeyword;
export type ZoomValue = ZoomKeyword;

// ==================== 关键词属性映射 ====================

/** 关键词属性名（运行时数据 + 类型） */
export const KEYWORD_PROPERTIES = [
  'accent-color',
  'align-content',
  'align-items',
  'align-self',
  'align-tracks',
  'alignment-baseline',
  'all',
  'anchor-name',
  'anchor-scope',
  'animation',
  'animation-composition',
  'animation-direction',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-range-end',
  'animation-range-start',
  'animation-timeline',
  'animation-timing-function',
  'appearance',
  'aspect-ratio',
  'azimuth',
  'backdrop-filter',
  'backface-visibility',
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-repeat',
  'background-size',
  'baseline-shift',
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-align',
  'box-decoration-break',
  'box-direction',
  'box-lines',
  'box-orient',
  'box-pack',
  'box-shadow',
  'box-sizing',
  'break-after',
  'break-before',
  'break-inside',
  'caption-side',
  'caret-color',
  'caret-shape',
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'color-interpolation-filters',
  'color-scheme',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule-color',
  'column-span',
  'column-width',
  'contain',
  'contain-intrinsic-block-size',
  'contain-intrinsic-height',
  'contain-intrinsic-inline-size',
  'contain-intrinsic-size',
  'contain-intrinsic-width',
  'container-name',
  'container-type',
  'content',
  'content-visibility',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cue-after',
  'cue-before',
  'cursor',
  'd',
  'direction',
  'display',
  'dominant-baseline',
  'empty-cells',
  'field-sizing',
  'fill',
  'fill-rule',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-wrap',
  'float',
  'font',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-language-override',
  'font-optical-sizing',
  'font-palette',
  'font-size',
  'font-size-adjust',
  'font-smooth',
  'font-stretch',
  'font-style',
  'font-synthesis',
  'font-synthesis-position',
  'font-synthesis-small-caps',
  'font-synthesis-style',
  'font-synthesis-weight',
  'font-variant',
  'font-variant-alternates',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-emoji',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-position',
  'font-variation-settings',
  'font-weight',
  'forced-color-adjust',
  'grid',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-start',
  'grid-template',
  'grid-template-areas',
  'grid-template-columns',
  'grid-template-rows',
  'hanging-punctuation',
  'height',
  'hyphenate-character',
  'hyphenate-limit-chars',
  'hyphens',
  'image-orientation',
  'image-rendering',
  'image-resolution',
  'ime-mode',
  'initial-letter',
  'initial-letter-align',
  'input-security',
  'interpolate-size',
  'isolation',
  'justify-content',
  'justify-items',
  'justify-self',
  'justify-tracks',
  'kerning',
  'left',
  'letter-spacing',
  'line-break',
  'line-clamp',
  'line-height',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-trim',
  'marker',
  'marker-end',
  'marker-mid',
  'marker-start',
  'mask',
  'mask-border-mode',
  'mask-border-repeat',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-mode',
  'mask-origin',
  'mask-position',
  'mask-repeat',
  'mask-size',
  'mask-type',
  'masonry-auto-flow',
  'math-depth',
  'math-shift',
  'math-style',
  'max-height',
  'max-lines',
  'max-width',
  'min-height',
  'min-width',
  'mix-blend-mode',
  'object-fit',
  'object-position',
  'offset-anchor',
  'offset-path',
  'offset-position',
  'offset-rotate',
  'outline-color',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-anchor',
  'overflow-block',
  'overflow-clip-box',
  'overflow-clip-margin',
  'overflow-inline',
  'overflow-wrap',
  'overflow-x',
  'overflow-y',
  'overlay',
  'overscroll-behavior',
  'overscroll-behavior-block',
  'overscroll-behavior-inline',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'page',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'paint-order',
  'pause-after',
  'pause-before',
  'perspective',
  'perspective-origin',
  'pointer-events',
  'position',
  'position-anchor',
  'position-area',
  'position-try-fallbacks',
  'position-try-order',
  'position-visibility',
  'print-color-adjust',
  'quotes',
  'resize',
  'rest-after',
  'rest-before',
  'right',
  'rotate',
  'row-gap',
  'ruby-align',
  'ruby-merge',
  'ruby-position',
  'scale',
  'scroll-behavior',
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
  'scroll-snap-align',
  'scroll-snap-coordinate',
  'scroll-snap-destination',
  'scroll-snap-points-x',
  'scroll-snap-points-y',
  'scroll-snap-stop',
  'scroll-snap-type',
  'scroll-snap-type-x',
  'scroll-snap-type-y',
  'scroll-timeline-axis',
  'scroll-timeline-name',
  'scrollbar-color',
  'scrollbar-gutter',
  'scrollbar-width',
  'shape-outside',
  'shape-rendering',
  'speak',
  'speak-as',
  'stroke',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'table-layout',
  'text-align',
  'text-align-last',
  'text-anchor',
  'text-combine-upright',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-skip',
  'text-decoration-skip-ink',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-indent',
  'text-justify',
  'text-orientation',
  'text-overflow',
  'text-rendering',
  'text-shadow',
  'text-size-adjust',
  'text-spacing-trim',
  'text-transform',
  'text-underline-offset',
  'text-underline-position',
  'text-wrap-mode',
  'text-wrap-style',
  'timeline-scope',
  'top',
  'touch-action',
  'transform',
  'transform-box',
  'transform-origin',
  'transform-style',
  'transition',
  'transition-behavior',
  'transition-property',
  'transition-timing-function',
  'translate',
  'unicode-bidi',
  'user-select',
  'vector-effect',
  'vertical-align',
  'view-timeline-axis',
  'view-timeline-inset',
  'view-timeline-name',
  'view-transition-name',
  'visibility',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'voice-stress',
  'voice-volume',
  'white-space',
  'white-space-collapse',
  'white-space-trim',
  'width',
  'will-change',
  'word-break',
  'word-spacing',
  'word-wrap',
  'writing-mode',
  'z-index',
  'zoom',
] as const;

/** 关键词属性名类型 */
export type KeywordPropertyName = typeof KEYWORD_PROPERTIES[number];

/** 属性到关键词的映射（运行时可用） */
export const PROPERTY_KEYWORDS = {
  'accent-color': ACCENT_COLOR_KEYWORDS,
  'align-content': ALIGN_CONTENT_KEYWORDS,
  'align-items': ALIGN_ITEMS_KEYWORDS,
  'align-self': ALIGN_SELF_KEYWORDS,
  'align-tracks': ALIGN_TRACKS_KEYWORDS,
  'alignment-baseline': ALIGNMENT_BASELINE_KEYWORDS,
  'all': ALL_KEYWORDS,
  'anchor-name': ANCHOR_NAME_KEYWORDS,
  'anchor-scope': ANCHOR_SCOPE_KEYWORDS,
  'animation': ANIMATION_KEYWORDS,
  'animation-composition': ANIMATION_COMPOSITION_KEYWORDS,
  'animation-direction': ANIMATION_DIRECTION_KEYWORDS,
  'animation-fill-mode': ANIMATION_FILL_MODE_KEYWORDS,
  'animation-iteration-count': ANIMATION_ITERATION_COUNT_KEYWORDS,
  'animation-name': ANIMATION_NAME_KEYWORDS,
  'animation-play-state': ANIMATION_PLAY_STATE_KEYWORDS,
  'animation-range-end': ANIMATION_RANGE_END_KEYWORDS,
  'animation-range-start': ANIMATION_RANGE_START_KEYWORDS,
  'animation-timeline': ANIMATION_TIMELINE_KEYWORDS,
  'animation-timing-function': ANIMATION_TIMING_FUNCTION_KEYWORDS,
  'appearance': APPEARANCE_KEYWORDS,
  'aspect-ratio': ASPECT_RATIO_KEYWORDS,
  'azimuth': AZIMUTH_KEYWORDS,
  'backdrop-filter': BACKDROP_FILTER_KEYWORDS,
  'backface-visibility': BACKFACE_VISIBILITY_KEYWORDS,
  'background': BACKGROUND_KEYWORDS,
  'background-attachment': BACKGROUND_ATTACHMENT_KEYWORDS,
  'background-blend-mode': BACKGROUND_BLEND_MODE_KEYWORDS,
  'background-clip': BACKGROUND_CLIP_KEYWORDS,
  'background-color': BACKGROUND_COLOR_KEYWORDS,
  'background-image': BACKGROUND_IMAGE_KEYWORDS,
  'background-origin': BACKGROUND_ORIGIN_KEYWORDS,
  'background-position': BACKGROUND_POSITION_KEYWORDS,
  'background-position-x': BACKGROUND_POSITION_X_KEYWORDS,
  'background-position-y': BACKGROUND_POSITION_Y_KEYWORDS,
  'background-repeat': BACKGROUND_REPEAT_KEYWORDS,
  'background-size': BACKGROUND_SIZE_KEYWORDS,
  'baseline-shift': BASELINE_SHIFT_KEYWORDS,
  'border': BORDER_KEYWORDS,
  'border-block': BORDER_BLOCK_KEYWORDS,
  'border-block-end': BORDER_BLOCK_END_KEYWORDS,
  'border-block-start': BORDER_BLOCK_START_KEYWORDS,
  'border-bottom': BORDER_BOTTOM_KEYWORDS,
  'border-bottom-style': BORDER_BOTTOM_STYLE_KEYWORDS,
  'border-bottom-width': BORDER_BOTTOM_WIDTH_KEYWORDS,
  'border-collapse': BORDER_COLLAPSE_KEYWORDS,
  'border-color': BORDER_COLOR_KEYWORDS,
  'border-image-repeat': BORDER_IMAGE_REPEAT_KEYWORDS,
  'border-image-slice': BORDER_IMAGE_SLICE_KEYWORDS,
  'border-image-source': BORDER_IMAGE_SOURCE_KEYWORDS,
  'border-image-width': BORDER_IMAGE_WIDTH_KEYWORDS,
  'border-inline': BORDER_INLINE_KEYWORDS,
  'border-inline-end': BORDER_INLINE_END_KEYWORDS,
  'border-inline-start': BORDER_INLINE_START_KEYWORDS,
  'border-left': BORDER_LEFT_KEYWORDS,
  'border-left-color': BORDER_LEFT_COLOR_KEYWORDS,
  'border-left-style': BORDER_LEFT_STYLE_KEYWORDS,
  'border-left-width': BORDER_LEFT_WIDTH_KEYWORDS,
  'border-right': BORDER_RIGHT_KEYWORDS,
  'border-right-color': BORDER_RIGHT_COLOR_KEYWORDS,
  'border-right-style': BORDER_RIGHT_STYLE_KEYWORDS,
  'border-right-width': BORDER_RIGHT_WIDTH_KEYWORDS,
  'border-style': BORDER_STYLE_KEYWORDS,
  'border-top': BORDER_TOP_KEYWORDS,
  'border-top-color': BORDER_TOP_COLOR_KEYWORDS,
  'border-top-style': BORDER_TOP_STYLE_KEYWORDS,
  'border-top-width': BORDER_TOP_WIDTH_KEYWORDS,
  'border-width': BORDER_WIDTH_KEYWORDS,
  'bottom': BOTTOM_KEYWORDS,
  'box-align': BOX_ALIGN_KEYWORDS,
  'box-decoration-break': BOX_DECORATION_BREAK_KEYWORDS,
  'box-direction': BOX_DIRECTION_KEYWORDS,
  'box-lines': BOX_LINES_KEYWORDS,
  'box-orient': BOX_ORIENT_KEYWORDS,
  'box-pack': BOX_PACK_KEYWORDS,
  'box-shadow': BOX_SHADOW_KEYWORDS,
  'box-sizing': BOX_SIZING_KEYWORDS,
  'break-after': BREAK_AFTER_KEYWORDS,
  'break-before': BREAK_BEFORE_KEYWORDS,
  'break-inside': BREAK_INSIDE_KEYWORDS,
  'caption-side': CAPTION_SIDE_KEYWORDS,
  'caret-color': CARET_COLOR_KEYWORDS,
  'caret-shape': CARET_SHAPE_KEYWORDS,
  'clear': CLEAR_KEYWORDS,
  'clip': CLIP_KEYWORDS,
  'clip-path': CLIP_PATH_KEYWORDS,
  'clip-rule': CLIP_RULE_KEYWORDS,
  'color': COLOR_KEYWORDS,
  'color-interpolation-filters': COLOR_INTERPOLATION_FILTERS_KEYWORDS,
  'color-scheme': COLOR_SCHEME_KEYWORDS,
  'column-count': COLUMN_COUNT_KEYWORDS,
  'column-fill': COLUMN_FILL_KEYWORDS,
  'column-gap': COLUMN_GAP_KEYWORDS,
  'column-rule-color': COLUMN_RULE_COLOR_KEYWORDS,
  'column-span': COLUMN_SPAN_KEYWORDS,
  'column-width': COLUMN_WIDTH_KEYWORDS,
  'contain': CONTAIN_KEYWORDS,
  'contain-intrinsic-block-size': CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS,
  'contain-intrinsic-height': CONTAIN_INTRINSIC_HEIGHT_KEYWORDS,
  'contain-intrinsic-inline-size': CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS,
  'contain-intrinsic-size': CONTAIN_INTRINSIC_SIZE_KEYWORDS,
  'contain-intrinsic-width': CONTAIN_INTRINSIC_WIDTH_KEYWORDS,
  'container-name': CONTAINER_NAME_KEYWORDS,
  'container-type': CONTAINER_TYPE_KEYWORDS,
  'content': CONTENT_KEYWORDS,
  'content-visibility': CONTENT_VISIBILITY_KEYWORDS,
  'counter-increment': COUNTER_INCREMENT_KEYWORDS,
  'counter-reset': COUNTER_RESET_KEYWORDS,
  'counter-set': COUNTER_SET_KEYWORDS,
  'cue-after': CUE_AFTER_KEYWORDS,
  'cue-before': CUE_BEFORE_KEYWORDS,
  'cursor': CURSOR_KEYWORDS,
  'd': D_KEYWORDS,
  'direction': DIRECTION_KEYWORDS,
  'display': DISPLAY_KEYWORDS,
  'dominant-baseline': DOMINANT_BASELINE_KEYWORDS,
  'empty-cells': EMPTY_CELLS_KEYWORDS,
  'field-sizing': FIELD_SIZING_KEYWORDS,
  'fill': FILL_KEYWORDS,
  'fill-rule': FILL_RULE_KEYWORDS,
  'filter': FILTER_KEYWORDS,
  'flex': FLEX_KEYWORDS,
  'flex-basis': FLEX_BASIS_KEYWORDS,
  'flex-direction': FLEX_DIRECTION_KEYWORDS,
  'flex-wrap': FLEX_WRAP_KEYWORDS,
  'float': FLOAT_KEYWORDS,
  'font': FONT_KEYWORDS,
  'font-family': FONT_FAMILY_KEYWORDS,
  'font-feature-settings': FONT_FEATURE_SETTINGS_KEYWORDS,
  'font-kerning': FONT_KERNING_KEYWORDS,
  'font-language-override': FONT_LANGUAGE_OVERRIDE_KEYWORDS,
  'font-optical-sizing': FONT_OPTICAL_SIZING_KEYWORDS,
  'font-palette': FONT_PALETTE_KEYWORDS,
  'font-size': FONT_SIZE_KEYWORDS,
  'font-size-adjust': FONT_SIZE_ADJUST_KEYWORDS,
  'font-smooth': FONT_SMOOTH_KEYWORDS,
  'font-stretch': FONT_STRETCH_KEYWORDS,
  'font-style': FONT_STYLE_KEYWORDS,
  'font-synthesis': FONT_SYNTHESIS_KEYWORDS,
  'font-synthesis-position': FONT_SYNTHESIS_POSITION_KEYWORDS,
  'font-synthesis-small-caps': FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS,
  'font-synthesis-style': FONT_SYNTHESIS_STYLE_KEYWORDS,
  'font-synthesis-weight': FONT_SYNTHESIS_WEIGHT_KEYWORDS,
  'font-variant': FONT_VARIANT_KEYWORDS,
  'font-variant-alternates': FONT_VARIANT_ALTERNATES_KEYWORDS,
  'font-variant-caps': FONT_VARIANT_CAPS_KEYWORDS,
  'font-variant-east-asian': FONT_VARIANT_EAST_ASIAN_KEYWORDS,
  'font-variant-emoji': FONT_VARIANT_EMOJI_KEYWORDS,
  'font-variant-ligatures': FONT_VARIANT_LIGATURES_KEYWORDS,
  'font-variant-numeric': FONT_VARIANT_NUMERIC_KEYWORDS,
  'font-variant-position': FONT_VARIANT_POSITION_KEYWORDS,
  'font-variation-settings': FONT_VARIATION_SETTINGS_KEYWORDS,
  'font-weight': FONT_WEIGHT_KEYWORDS,
  'forced-color-adjust': FORCED_COLOR_ADJUST_KEYWORDS,
  'grid': GRID_KEYWORDS,
  'grid-area': GRID_AREA_KEYWORDS,
  'grid-auto-columns': GRID_AUTO_COLUMNS_KEYWORDS,
  'grid-auto-flow': GRID_AUTO_FLOW_KEYWORDS,
  'grid-auto-rows': GRID_AUTO_ROWS_KEYWORDS,
  'grid-column': GRID_COLUMN_KEYWORDS,
  'grid-column-end': GRID_COLUMN_END_KEYWORDS,
  'grid-column-start': GRID_COLUMN_START_KEYWORDS,
  'grid-row': GRID_ROW_KEYWORDS,
  'grid-row-end': GRID_ROW_END_KEYWORDS,
  'grid-row-start': GRID_ROW_START_KEYWORDS,
  'grid-template': GRID_TEMPLATE_KEYWORDS,
  'grid-template-areas': GRID_TEMPLATE_AREAS_KEYWORDS,
  'grid-template-columns': GRID_TEMPLATE_COLUMNS_KEYWORDS,
  'grid-template-rows': GRID_TEMPLATE_ROWS_KEYWORDS,
  'hanging-punctuation': HANGING_PUNCTUATION_KEYWORDS,
  'height': HEIGHT_KEYWORDS,
  'hyphenate-character': HYPHENATE_CHARACTER_KEYWORDS,
  'hyphenate-limit-chars': HYPHENATE_LIMIT_CHARS_KEYWORDS,
  'hyphens': HYPHENS_KEYWORDS,
  'image-orientation': IMAGE_ORIENTATION_KEYWORDS,
  'image-rendering': IMAGE_RENDERING_KEYWORDS,
  'image-resolution': IMAGE_RESOLUTION_KEYWORDS,
  'ime-mode': IME_MODE_KEYWORDS,
  'initial-letter': INITIAL_LETTER_KEYWORDS,
  'initial-letter-align': INITIAL_LETTER_ALIGN_KEYWORDS,
  'input-security': INPUT_SECURITY_KEYWORDS,
  'interpolate-size': INTERPOLATE_SIZE_KEYWORDS,
  'isolation': ISOLATION_KEYWORDS,
  'justify-content': JUSTIFY_CONTENT_KEYWORDS,
  'justify-items': JUSTIFY_ITEMS_KEYWORDS,
  'justify-self': JUSTIFY_SELF_KEYWORDS,
  'justify-tracks': JUSTIFY_TRACKS_KEYWORDS,
  'kerning': KERNING_KEYWORDS,
  'left': LEFT_KEYWORDS,
  'letter-spacing': LETTER_SPACING_KEYWORDS,
  'line-break': LINE_BREAK_KEYWORDS,
  'line-clamp': LINE_CLAMP_KEYWORDS,
  'line-height': LINE_HEIGHT_KEYWORDS,
  'list-style-image': LIST_STYLE_IMAGE_KEYWORDS,
  'list-style-position': LIST_STYLE_POSITION_KEYWORDS,
  'list-style-type': LIST_STYLE_TYPE_KEYWORDS,
  'margin': MARGIN_KEYWORDS,
  'margin-bottom': MARGIN_BOTTOM_KEYWORDS,
  'margin-left': MARGIN_LEFT_KEYWORDS,
  'margin-right': MARGIN_RIGHT_KEYWORDS,
  'margin-top': MARGIN_TOP_KEYWORDS,
  'margin-trim': MARGIN_TRIM_KEYWORDS,
  'marker': MARKER_KEYWORDS,
  'marker-end': MARKER_END_KEYWORDS,
  'marker-mid': MARKER_MID_KEYWORDS,
  'marker-start': MARKER_START_KEYWORDS,
  'mask': MASK_KEYWORDS,
  'mask-border-mode': MASK_BORDER_MODE_KEYWORDS,
  'mask-border-repeat': MASK_BORDER_REPEAT_KEYWORDS,
  'mask-border-slice': MASK_BORDER_SLICE_KEYWORDS,
  'mask-border-source': MASK_BORDER_SOURCE_KEYWORDS,
  'mask-border-width': MASK_BORDER_WIDTH_KEYWORDS,
  'mask-clip': MASK_CLIP_KEYWORDS,
  'mask-composite': MASK_COMPOSITE_KEYWORDS,
  'mask-image': MASK_IMAGE_KEYWORDS,
  'mask-mode': MASK_MODE_KEYWORDS,
  'mask-origin': MASK_ORIGIN_KEYWORDS,
  'mask-position': MASK_POSITION_KEYWORDS,
  'mask-repeat': MASK_REPEAT_KEYWORDS,
  'mask-size': MASK_SIZE_KEYWORDS,
  'mask-type': MASK_TYPE_KEYWORDS,
  'masonry-auto-flow': MASONRY_AUTO_FLOW_KEYWORDS,
  'math-depth': MATH_DEPTH_KEYWORDS,
  'math-shift': MATH_SHIFT_KEYWORDS,
  'math-style': MATH_STYLE_KEYWORDS,
  'max-height': MAX_HEIGHT_KEYWORDS,
  'max-lines': MAX_LINES_KEYWORDS,
  'max-width': MAX_WIDTH_KEYWORDS,
  'min-height': MIN_HEIGHT_KEYWORDS,
  'min-width': MIN_WIDTH_KEYWORDS,
  'mix-blend-mode': MIX_BLEND_MODE_KEYWORDS,
  'object-fit': OBJECT_FIT_KEYWORDS,
  'object-position': OBJECT_POSITION_KEYWORDS,
  'offset-anchor': OFFSET_ANCHOR_KEYWORDS,
  'offset-path': OFFSET_PATH_KEYWORDS,
  'offset-position': OFFSET_POSITION_KEYWORDS,
  'offset-rotate': OFFSET_ROTATE_KEYWORDS,
  'outline-color': OUTLINE_COLOR_KEYWORDS,
  'outline-style': OUTLINE_STYLE_KEYWORDS,
  'outline-width': OUTLINE_WIDTH_KEYWORDS,
  'overflow': OVERFLOW_KEYWORDS,
  'overflow-anchor': OVERFLOW_ANCHOR_KEYWORDS,
  'overflow-block': OVERFLOW_BLOCK_KEYWORDS,
  'overflow-clip-box': OVERFLOW_CLIP_BOX_KEYWORDS,
  'overflow-clip-margin': OVERFLOW_CLIP_MARGIN_KEYWORDS,
  'overflow-inline': OVERFLOW_INLINE_KEYWORDS,
  'overflow-wrap': OVERFLOW_WRAP_KEYWORDS,
  'overflow-x': OVERFLOW_X_KEYWORDS,
  'overflow-y': OVERFLOW_Y_KEYWORDS,
  'overlay': OVERLAY_KEYWORDS,
  'overscroll-behavior': OVERSCROLL_BEHAVIOR_KEYWORDS,
  'overscroll-behavior-block': OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS,
  'overscroll-behavior-inline': OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS,
  'overscroll-behavior-x': OVERSCROLL_BEHAVIOR_X_KEYWORDS,
  'overscroll-behavior-y': OVERSCROLL_BEHAVIOR_Y_KEYWORDS,
  'page': PAGE_KEYWORDS,
  'page-break-after': PAGE_BREAK_AFTER_KEYWORDS,
  'page-break-before': PAGE_BREAK_BEFORE_KEYWORDS,
  'page-break-inside': PAGE_BREAK_INSIDE_KEYWORDS,
  'paint-order': PAINT_ORDER_KEYWORDS,
  'pause-after': PAUSE_AFTER_KEYWORDS,
  'pause-before': PAUSE_BEFORE_KEYWORDS,
  'perspective': PERSPECTIVE_KEYWORDS,
  'perspective-origin': PERSPECTIVE_ORIGIN_KEYWORDS,
  'pointer-events': POINTER_EVENTS_KEYWORDS,
  'position': POSITION_KEYWORDS,
  'position-anchor': POSITION_ANCHOR_KEYWORDS,
  'position-area': POSITION_AREA_KEYWORDS,
  'position-try-fallbacks': POSITION_TRY_FALLBACKS_KEYWORDS,
  'position-try-order': POSITION_TRY_ORDER_KEYWORDS,
  'position-visibility': POSITION_VISIBILITY_KEYWORDS,
  'print-color-adjust': PRINT_COLOR_ADJUST_KEYWORDS,
  'quotes': QUOTES_KEYWORDS,
  'resize': RESIZE_KEYWORDS,
  'rest-after': REST_AFTER_KEYWORDS,
  'rest-before': REST_BEFORE_KEYWORDS,
  'right': RIGHT_KEYWORDS,
  'rotate': ROTATE_KEYWORDS,
  'row-gap': ROW_GAP_KEYWORDS,
  'ruby-align': RUBY_ALIGN_KEYWORDS,
  'ruby-merge': RUBY_MERGE_KEYWORDS,
  'ruby-position': RUBY_POSITION_KEYWORDS,
  'scale': SCALE_KEYWORDS,
  'scroll-behavior': SCROLL_BEHAVIOR_KEYWORDS,
  'scroll-padding': SCROLL_PADDING_KEYWORDS,
  'scroll-padding-block': SCROLL_PADDING_BLOCK_KEYWORDS,
  'scroll-padding-block-end': SCROLL_PADDING_BLOCK_END_KEYWORDS,
  'scroll-padding-block-start': SCROLL_PADDING_BLOCK_START_KEYWORDS,
  'scroll-padding-bottom': SCROLL_PADDING_BOTTOM_KEYWORDS,
  'scroll-padding-inline': SCROLL_PADDING_INLINE_KEYWORDS,
  'scroll-padding-inline-end': SCROLL_PADDING_INLINE_END_KEYWORDS,
  'scroll-padding-inline-start': SCROLL_PADDING_INLINE_START_KEYWORDS,
  'scroll-padding-left': SCROLL_PADDING_LEFT_KEYWORDS,
  'scroll-padding-right': SCROLL_PADDING_RIGHT_KEYWORDS,
  'scroll-padding-top': SCROLL_PADDING_TOP_KEYWORDS,
  'scroll-snap-align': SCROLL_SNAP_ALIGN_KEYWORDS,
  'scroll-snap-coordinate': SCROLL_SNAP_COORDINATE_KEYWORDS,
  'scroll-snap-destination': SCROLL_SNAP_DESTINATION_KEYWORDS,
  'scroll-snap-points-x': SCROLL_SNAP_POINTS_X_KEYWORDS,
  'scroll-snap-points-y': SCROLL_SNAP_POINTS_Y_KEYWORDS,
  'scroll-snap-stop': SCROLL_SNAP_STOP_KEYWORDS,
  'scroll-snap-type': SCROLL_SNAP_TYPE_KEYWORDS,
  'scroll-snap-type-x': SCROLL_SNAP_TYPE_X_KEYWORDS,
  'scroll-snap-type-y': SCROLL_SNAP_TYPE_Y_KEYWORDS,
  'scroll-timeline-axis': SCROLL_TIMELINE_AXIS_KEYWORDS,
  'scroll-timeline-name': SCROLL_TIMELINE_NAME_KEYWORDS,
  'scrollbar-color': SCROLLBAR_COLOR_KEYWORDS,
  'scrollbar-gutter': SCROLLBAR_GUTTER_KEYWORDS,
  'scrollbar-width': SCROLLBAR_WIDTH_KEYWORDS,
  'shape-outside': SHAPE_OUTSIDE_KEYWORDS,
  'shape-rendering': SHAPE_RENDERING_KEYWORDS,
  'speak': SPEAK_KEYWORDS,
  'speak-as': SPEAK_AS_KEYWORDS,
  'stroke': STROKE_KEYWORDS,
  'stroke-dasharray': STROKE_DASHARRAY_KEYWORDS,
  'stroke-linecap': STROKE_LINECAP_KEYWORDS,
  'stroke-linejoin': STROKE_LINEJOIN_KEYWORDS,
  'table-layout': TABLE_LAYOUT_KEYWORDS,
  'text-align': TEXT_ALIGN_KEYWORDS,
  'text-align-last': TEXT_ALIGN_LAST_KEYWORDS,
  'text-anchor': TEXT_ANCHOR_KEYWORDS,
  'text-combine-upright': TEXT_COMBINE_UPRIGHT_KEYWORDS,
  'text-decoration-color': TEXT_DECORATION_COLOR_KEYWORDS,
  'text-decoration-line': TEXT_DECORATION_LINE_KEYWORDS,
  'text-decoration-skip': TEXT_DECORATION_SKIP_KEYWORDS,
  'text-decoration-skip-ink': TEXT_DECORATION_SKIP_INK_KEYWORDS,
  'text-decoration-style': TEXT_DECORATION_STYLE_KEYWORDS,
  'text-decoration-thickness': TEXT_DECORATION_THICKNESS_KEYWORDS,
  'text-emphasis-color': TEXT_EMPHASIS_COLOR_KEYWORDS,
  'text-emphasis-position': TEXT_EMPHASIS_POSITION_KEYWORDS,
  'text-emphasis-style': TEXT_EMPHASIS_STYLE_KEYWORDS,
  'text-indent': TEXT_INDENT_KEYWORDS,
  'text-justify': TEXT_JUSTIFY_KEYWORDS,
  'text-orientation': TEXT_ORIENTATION_KEYWORDS,
  'text-overflow': TEXT_OVERFLOW_KEYWORDS,
  'text-rendering': TEXT_RENDERING_KEYWORDS,
  'text-shadow': TEXT_SHADOW_KEYWORDS,
  'text-size-adjust': TEXT_SIZE_ADJUST_KEYWORDS,
  'text-spacing-trim': TEXT_SPACING_TRIM_KEYWORDS,
  'text-transform': TEXT_TRANSFORM_KEYWORDS,
  'text-underline-offset': TEXT_UNDERLINE_OFFSET_KEYWORDS,
  'text-underline-position': TEXT_UNDERLINE_POSITION_KEYWORDS,
  'text-wrap-mode': TEXT_WRAP_MODE_KEYWORDS,
  'text-wrap-style': TEXT_WRAP_STYLE_KEYWORDS,
  'timeline-scope': TIMELINE_SCOPE_KEYWORDS,
  'top': TOP_KEYWORDS,
  'touch-action': TOUCH_ACTION_KEYWORDS,
  'transform': TRANSFORM_KEYWORDS,
  'transform-box': TRANSFORM_BOX_KEYWORDS,
  'transform-origin': TRANSFORM_ORIGIN_KEYWORDS,
  'transform-style': TRANSFORM_STYLE_KEYWORDS,
  'transition': TRANSITION_KEYWORDS,
  'transition-behavior': TRANSITION_BEHAVIOR_KEYWORDS,
  'transition-property': TRANSITION_PROPERTY_KEYWORDS,
  'transition-timing-function': TRANSITION_TIMING_FUNCTION_KEYWORDS,
  'translate': TRANSLATE_KEYWORDS,
  'unicode-bidi': UNICODE_BIDI_KEYWORDS,
  'user-select': USER_SELECT_KEYWORDS,
  'vector-effect': VECTOR_EFFECT_KEYWORDS,
  'vertical-align': VERTICAL_ALIGN_KEYWORDS,
  'view-timeline-axis': VIEW_TIMELINE_AXIS_KEYWORDS,
  'view-timeline-inset': VIEW_TIMELINE_INSET_KEYWORDS,
  'view-timeline-name': VIEW_TIMELINE_NAME_KEYWORDS,
  'view-transition-name': VIEW_TRANSITION_NAME_KEYWORDS,
  'visibility': VISIBILITY_KEYWORDS,
  'voice-balance': VOICE_BALANCE_KEYWORDS,
  'voice-duration': VOICE_DURATION_KEYWORDS,
  'voice-family': VOICE_FAMILY_KEYWORDS,
  'voice-pitch': VOICE_PITCH_KEYWORDS,
  'voice-range': VOICE_RANGE_KEYWORDS,
  'voice-rate': VOICE_RATE_KEYWORDS,
  'voice-stress': VOICE_STRESS_KEYWORDS,
  'voice-volume': VOICE_VOLUME_KEYWORDS,
  'white-space': WHITE_SPACE_KEYWORDS,
  'white-space-collapse': WHITE_SPACE_COLLAPSE_KEYWORDS,
  'white-space-trim': WHITE_SPACE_TRIM_KEYWORDS,
  'width': WIDTH_KEYWORDS,
  'will-change': WILL_CHANGE_KEYWORDS,
  'word-break': WORD_BREAK_KEYWORDS,
  'word-spacing': WORD_SPACING_KEYWORDS,
  'word-wrap': WORD_WRAP_KEYWORDS,
  'writing-mode': WRITING_MODE_KEYWORDS,
  'z-index': Z_INDEX_KEYWORDS,
  'zoom': ZOOM_KEYWORDS,
} as const;

/** 属性关键词映射类型 */
export type PropertyKeywordsMap = {
  'accent-color': typeof ACCENT_COLOR_KEYWORDS[number];
  'align-content': typeof ALIGN_CONTENT_KEYWORDS[number];
  'align-items': typeof ALIGN_ITEMS_KEYWORDS[number];
  'align-self': typeof ALIGN_SELF_KEYWORDS[number];
  'align-tracks': typeof ALIGN_TRACKS_KEYWORDS[number];
  'alignment-baseline': typeof ALIGNMENT_BASELINE_KEYWORDS[number];
  'all': typeof ALL_KEYWORDS[number];
  'anchor-name': typeof ANCHOR_NAME_KEYWORDS[number];
  'anchor-scope': typeof ANCHOR_SCOPE_KEYWORDS[number];
  'animation': typeof ANIMATION_KEYWORDS[number];
  'animation-composition': typeof ANIMATION_COMPOSITION_KEYWORDS[number];
  'animation-direction': typeof ANIMATION_DIRECTION_KEYWORDS[number];
  'animation-fill-mode': typeof ANIMATION_FILL_MODE_KEYWORDS[number];
  'animation-iteration-count': typeof ANIMATION_ITERATION_COUNT_KEYWORDS[number];
  'animation-name': typeof ANIMATION_NAME_KEYWORDS[number];
  'animation-play-state': typeof ANIMATION_PLAY_STATE_KEYWORDS[number];
  'animation-range-end': typeof ANIMATION_RANGE_END_KEYWORDS[number];
  'animation-range-start': typeof ANIMATION_RANGE_START_KEYWORDS[number];
  'animation-timeline': typeof ANIMATION_TIMELINE_KEYWORDS[number];
  'animation-timing-function': typeof ANIMATION_TIMING_FUNCTION_KEYWORDS[number];
  'appearance': typeof APPEARANCE_KEYWORDS[number];
  'aspect-ratio': typeof ASPECT_RATIO_KEYWORDS[number];
  'azimuth': typeof AZIMUTH_KEYWORDS[number];
  'backdrop-filter': typeof BACKDROP_FILTER_KEYWORDS[number];
  'backface-visibility': typeof BACKFACE_VISIBILITY_KEYWORDS[number];
  'background': typeof BACKGROUND_KEYWORDS[number];
  'background-attachment': typeof BACKGROUND_ATTACHMENT_KEYWORDS[number];
  'background-blend-mode': typeof BACKGROUND_BLEND_MODE_KEYWORDS[number];
  'background-clip': typeof BACKGROUND_CLIP_KEYWORDS[number];
  'background-color': typeof BACKGROUND_COLOR_KEYWORDS[number];
  'background-image': typeof BACKGROUND_IMAGE_KEYWORDS[number];
  'background-origin': typeof BACKGROUND_ORIGIN_KEYWORDS[number];
  'background-position': typeof BACKGROUND_POSITION_KEYWORDS[number];
  'background-position-x': typeof BACKGROUND_POSITION_X_KEYWORDS[number];
  'background-position-y': typeof BACKGROUND_POSITION_Y_KEYWORDS[number];
  'background-repeat': typeof BACKGROUND_REPEAT_KEYWORDS[number];
  'background-size': typeof BACKGROUND_SIZE_KEYWORDS[number];
  'baseline-shift': typeof BASELINE_SHIFT_KEYWORDS[number];
  'border': typeof BORDER_KEYWORDS[number];
  'border-block': typeof BORDER_BLOCK_KEYWORDS[number];
  'border-block-end': typeof BORDER_BLOCK_END_KEYWORDS[number];
  'border-block-start': typeof BORDER_BLOCK_START_KEYWORDS[number];
  'border-bottom': typeof BORDER_BOTTOM_KEYWORDS[number];
  'border-bottom-style': typeof BORDER_BOTTOM_STYLE_KEYWORDS[number];
  'border-bottom-width': typeof BORDER_BOTTOM_WIDTH_KEYWORDS[number];
  'border-collapse': typeof BORDER_COLLAPSE_KEYWORDS[number];
  'border-color': typeof BORDER_COLOR_KEYWORDS[number];
  'border-image-repeat': typeof BORDER_IMAGE_REPEAT_KEYWORDS[number];
  'border-image-slice': typeof BORDER_IMAGE_SLICE_KEYWORDS[number];
  'border-image-source': typeof BORDER_IMAGE_SOURCE_KEYWORDS[number];
  'border-image-width': typeof BORDER_IMAGE_WIDTH_KEYWORDS[number];
  'border-inline': typeof BORDER_INLINE_KEYWORDS[number];
  'border-inline-end': typeof BORDER_INLINE_END_KEYWORDS[number];
  'border-inline-start': typeof BORDER_INLINE_START_KEYWORDS[number];
  'border-left': typeof BORDER_LEFT_KEYWORDS[number];
  'border-left-color': typeof BORDER_LEFT_COLOR_KEYWORDS[number];
  'border-left-style': typeof BORDER_LEFT_STYLE_KEYWORDS[number];
  'border-left-width': typeof BORDER_LEFT_WIDTH_KEYWORDS[number];
  'border-right': typeof BORDER_RIGHT_KEYWORDS[number];
  'border-right-color': typeof BORDER_RIGHT_COLOR_KEYWORDS[number];
  'border-right-style': typeof BORDER_RIGHT_STYLE_KEYWORDS[number];
  'border-right-width': typeof BORDER_RIGHT_WIDTH_KEYWORDS[number];
  'border-style': typeof BORDER_STYLE_KEYWORDS[number];
  'border-top': typeof BORDER_TOP_KEYWORDS[number];
  'border-top-color': typeof BORDER_TOP_COLOR_KEYWORDS[number];
  'border-top-style': typeof BORDER_TOP_STYLE_KEYWORDS[number];
  'border-top-width': typeof BORDER_TOP_WIDTH_KEYWORDS[number];
  'border-width': typeof BORDER_WIDTH_KEYWORDS[number];
  'bottom': typeof BOTTOM_KEYWORDS[number];
  'box-align': typeof BOX_ALIGN_KEYWORDS[number];
  'box-decoration-break': typeof BOX_DECORATION_BREAK_KEYWORDS[number];
  'box-direction': typeof BOX_DIRECTION_KEYWORDS[number];
  'box-lines': typeof BOX_LINES_KEYWORDS[number];
  'box-orient': typeof BOX_ORIENT_KEYWORDS[number];
  'box-pack': typeof BOX_PACK_KEYWORDS[number];
  'box-shadow': typeof BOX_SHADOW_KEYWORDS[number];
  'box-sizing': typeof BOX_SIZING_KEYWORDS[number];
  'break-after': typeof BREAK_AFTER_KEYWORDS[number];
  'break-before': typeof BREAK_BEFORE_KEYWORDS[number];
  'break-inside': typeof BREAK_INSIDE_KEYWORDS[number];
  'caption-side': typeof CAPTION_SIDE_KEYWORDS[number];
  'caret-color': typeof CARET_COLOR_KEYWORDS[number];
  'caret-shape': typeof CARET_SHAPE_KEYWORDS[number];
  'clear': typeof CLEAR_KEYWORDS[number];
  'clip': typeof CLIP_KEYWORDS[number];
  'clip-path': typeof CLIP_PATH_KEYWORDS[number];
  'clip-rule': typeof CLIP_RULE_KEYWORDS[number];
  'color': typeof COLOR_KEYWORDS[number];
  'color-interpolation-filters': typeof COLOR_INTERPOLATION_FILTERS_KEYWORDS[number];
  'color-scheme': typeof COLOR_SCHEME_KEYWORDS[number];
  'column-count': typeof COLUMN_COUNT_KEYWORDS[number];
  'column-fill': typeof COLUMN_FILL_KEYWORDS[number];
  'column-gap': typeof COLUMN_GAP_KEYWORDS[number];
  'column-rule-color': typeof COLUMN_RULE_COLOR_KEYWORDS[number];
  'column-span': typeof COLUMN_SPAN_KEYWORDS[number];
  'column-width': typeof COLUMN_WIDTH_KEYWORDS[number];
  'contain': typeof CONTAIN_KEYWORDS[number];
  'contain-intrinsic-block-size': typeof CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS[number];
  'contain-intrinsic-height': typeof CONTAIN_INTRINSIC_HEIGHT_KEYWORDS[number];
  'contain-intrinsic-inline-size': typeof CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS[number];
  'contain-intrinsic-size': typeof CONTAIN_INTRINSIC_SIZE_KEYWORDS[number];
  'contain-intrinsic-width': typeof CONTAIN_INTRINSIC_WIDTH_KEYWORDS[number];
  'container-name': typeof CONTAINER_NAME_KEYWORDS[number];
  'container-type': typeof CONTAINER_TYPE_KEYWORDS[number];
  'content': typeof CONTENT_KEYWORDS[number];
  'content-visibility': typeof CONTENT_VISIBILITY_KEYWORDS[number];
  'counter-increment': typeof COUNTER_INCREMENT_KEYWORDS[number];
  'counter-reset': typeof COUNTER_RESET_KEYWORDS[number];
  'counter-set': typeof COUNTER_SET_KEYWORDS[number];
  'cue-after': typeof CUE_AFTER_KEYWORDS[number];
  'cue-before': typeof CUE_BEFORE_KEYWORDS[number];
  'cursor': typeof CURSOR_KEYWORDS[number];
  'd': typeof D_KEYWORDS[number];
  'direction': typeof DIRECTION_KEYWORDS[number];
  'display': typeof DISPLAY_KEYWORDS[number];
  'dominant-baseline': typeof DOMINANT_BASELINE_KEYWORDS[number];
  'empty-cells': typeof EMPTY_CELLS_KEYWORDS[number];
  'field-sizing': typeof FIELD_SIZING_KEYWORDS[number];
  'fill': typeof FILL_KEYWORDS[number];
  'fill-rule': typeof FILL_RULE_KEYWORDS[number];
  'filter': typeof FILTER_KEYWORDS[number];
  'flex': typeof FLEX_KEYWORDS[number];
  'flex-basis': typeof FLEX_BASIS_KEYWORDS[number];
  'flex-direction': typeof FLEX_DIRECTION_KEYWORDS[number];
  'flex-wrap': typeof FLEX_WRAP_KEYWORDS[number];
  'float': typeof FLOAT_KEYWORDS[number];
  'font': typeof FONT_KEYWORDS[number];
  'font-family': typeof FONT_FAMILY_KEYWORDS[number];
  'font-feature-settings': typeof FONT_FEATURE_SETTINGS_KEYWORDS[number];
  'font-kerning': typeof FONT_KERNING_KEYWORDS[number];
  'font-language-override': typeof FONT_LANGUAGE_OVERRIDE_KEYWORDS[number];
  'font-optical-sizing': typeof FONT_OPTICAL_SIZING_KEYWORDS[number];
  'font-palette': typeof FONT_PALETTE_KEYWORDS[number];
  'font-size': typeof FONT_SIZE_KEYWORDS[number];
  'font-size-adjust': typeof FONT_SIZE_ADJUST_KEYWORDS[number];
  'font-smooth': typeof FONT_SMOOTH_KEYWORDS[number];
  'font-stretch': typeof FONT_STRETCH_KEYWORDS[number];
  'font-style': typeof FONT_STYLE_KEYWORDS[number];
  'font-synthesis': typeof FONT_SYNTHESIS_KEYWORDS[number];
  'font-synthesis-position': typeof FONT_SYNTHESIS_POSITION_KEYWORDS[number];
  'font-synthesis-small-caps': typeof FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS[number];
  'font-synthesis-style': typeof FONT_SYNTHESIS_STYLE_KEYWORDS[number];
  'font-synthesis-weight': typeof FONT_SYNTHESIS_WEIGHT_KEYWORDS[number];
  'font-variant': typeof FONT_VARIANT_KEYWORDS[number];
  'font-variant-alternates': typeof FONT_VARIANT_ALTERNATES_KEYWORDS[number];
  'font-variant-caps': typeof FONT_VARIANT_CAPS_KEYWORDS[number];
  'font-variant-east-asian': typeof FONT_VARIANT_EAST_ASIAN_KEYWORDS[number];
  'font-variant-emoji': typeof FONT_VARIANT_EMOJI_KEYWORDS[number];
  'font-variant-ligatures': typeof FONT_VARIANT_LIGATURES_KEYWORDS[number];
  'font-variant-numeric': typeof FONT_VARIANT_NUMERIC_KEYWORDS[number];
  'font-variant-position': typeof FONT_VARIANT_POSITION_KEYWORDS[number];
  'font-variation-settings': typeof FONT_VARIATION_SETTINGS_KEYWORDS[number];
  'font-weight': typeof FONT_WEIGHT_KEYWORDS[number];
  'forced-color-adjust': typeof FORCED_COLOR_ADJUST_KEYWORDS[number];
  'grid': typeof GRID_KEYWORDS[number];
  'grid-area': typeof GRID_AREA_KEYWORDS[number];
  'grid-auto-columns': typeof GRID_AUTO_COLUMNS_KEYWORDS[number];
  'grid-auto-flow': typeof GRID_AUTO_FLOW_KEYWORDS[number];
  'grid-auto-rows': typeof GRID_AUTO_ROWS_KEYWORDS[number];
  'grid-column': typeof GRID_COLUMN_KEYWORDS[number];
  'grid-column-end': typeof GRID_COLUMN_END_KEYWORDS[number];
  'grid-column-start': typeof GRID_COLUMN_START_KEYWORDS[number];
  'grid-row': typeof GRID_ROW_KEYWORDS[number];
  'grid-row-end': typeof GRID_ROW_END_KEYWORDS[number];
  'grid-row-start': typeof GRID_ROW_START_KEYWORDS[number];
  'grid-template': typeof GRID_TEMPLATE_KEYWORDS[number];
  'grid-template-areas': typeof GRID_TEMPLATE_AREAS_KEYWORDS[number];
  'grid-template-columns': typeof GRID_TEMPLATE_COLUMNS_KEYWORDS[number];
  'grid-template-rows': typeof GRID_TEMPLATE_ROWS_KEYWORDS[number];
  'hanging-punctuation': typeof HANGING_PUNCTUATION_KEYWORDS[number];
  'height': typeof HEIGHT_KEYWORDS[number];
  'hyphenate-character': typeof HYPHENATE_CHARACTER_KEYWORDS[number];
  'hyphenate-limit-chars': typeof HYPHENATE_LIMIT_CHARS_KEYWORDS[number];
  'hyphens': typeof HYPHENS_KEYWORDS[number];
  'image-orientation': typeof IMAGE_ORIENTATION_KEYWORDS[number];
  'image-rendering': typeof IMAGE_RENDERING_KEYWORDS[number];
  'image-resolution': typeof IMAGE_RESOLUTION_KEYWORDS[number];
  'ime-mode': typeof IME_MODE_KEYWORDS[number];
  'initial-letter': typeof INITIAL_LETTER_KEYWORDS[number];
  'initial-letter-align': typeof INITIAL_LETTER_ALIGN_KEYWORDS[number];
  'input-security': typeof INPUT_SECURITY_KEYWORDS[number];
  'interpolate-size': typeof INTERPOLATE_SIZE_KEYWORDS[number];
  'isolation': typeof ISOLATION_KEYWORDS[number];
  'justify-content': typeof JUSTIFY_CONTENT_KEYWORDS[number];
  'justify-items': typeof JUSTIFY_ITEMS_KEYWORDS[number];
  'justify-self': typeof JUSTIFY_SELF_KEYWORDS[number];
  'justify-tracks': typeof JUSTIFY_TRACKS_KEYWORDS[number];
  'kerning': typeof KERNING_KEYWORDS[number];
  'left': typeof LEFT_KEYWORDS[number];
  'letter-spacing': typeof LETTER_SPACING_KEYWORDS[number];
  'line-break': typeof LINE_BREAK_KEYWORDS[number];
  'line-clamp': typeof LINE_CLAMP_KEYWORDS[number];
  'line-height': typeof LINE_HEIGHT_KEYWORDS[number];
  'list-style-image': typeof LIST_STYLE_IMAGE_KEYWORDS[number];
  'list-style-position': typeof LIST_STYLE_POSITION_KEYWORDS[number];
  'list-style-type': typeof LIST_STYLE_TYPE_KEYWORDS[number];
  'margin': typeof MARGIN_KEYWORDS[number];
  'margin-bottom': typeof MARGIN_BOTTOM_KEYWORDS[number];
  'margin-left': typeof MARGIN_LEFT_KEYWORDS[number];
  'margin-right': typeof MARGIN_RIGHT_KEYWORDS[number];
  'margin-top': typeof MARGIN_TOP_KEYWORDS[number];
  'margin-trim': typeof MARGIN_TRIM_KEYWORDS[number];
  'marker': typeof MARKER_KEYWORDS[number];
  'marker-end': typeof MARKER_END_KEYWORDS[number];
  'marker-mid': typeof MARKER_MID_KEYWORDS[number];
  'marker-start': typeof MARKER_START_KEYWORDS[number];
  'mask': typeof MASK_KEYWORDS[number];
  'mask-border-mode': typeof MASK_BORDER_MODE_KEYWORDS[number];
  'mask-border-repeat': typeof MASK_BORDER_REPEAT_KEYWORDS[number];
  'mask-border-slice': typeof MASK_BORDER_SLICE_KEYWORDS[number];
  'mask-border-source': typeof MASK_BORDER_SOURCE_KEYWORDS[number];
  'mask-border-width': typeof MASK_BORDER_WIDTH_KEYWORDS[number];
  'mask-clip': typeof MASK_CLIP_KEYWORDS[number];
  'mask-composite': typeof MASK_COMPOSITE_KEYWORDS[number];
  'mask-image': typeof MASK_IMAGE_KEYWORDS[number];
  'mask-mode': typeof MASK_MODE_KEYWORDS[number];
  'mask-origin': typeof MASK_ORIGIN_KEYWORDS[number];
  'mask-position': typeof MASK_POSITION_KEYWORDS[number];
  'mask-repeat': typeof MASK_REPEAT_KEYWORDS[number];
  'mask-size': typeof MASK_SIZE_KEYWORDS[number];
  'mask-type': typeof MASK_TYPE_KEYWORDS[number];
  'masonry-auto-flow': typeof MASONRY_AUTO_FLOW_KEYWORDS[number];
  'math-depth': typeof MATH_DEPTH_KEYWORDS[number];
  'math-shift': typeof MATH_SHIFT_KEYWORDS[number];
  'math-style': typeof MATH_STYLE_KEYWORDS[number];
  'max-height': typeof MAX_HEIGHT_KEYWORDS[number];
  'max-lines': typeof MAX_LINES_KEYWORDS[number];
  'max-width': typeof MAX_WIDTH_KEYWORDS[number];
  'min-height': typeof MIN_HEIGHT_KEYWORDS[number];
  'min-width': typeof MIN_WIDTH_KEYWORDS[number];
  'mix-blend-mode': typeof MIX_BLEND_MODE_KEYWORDS[number];
  'object-fit': typeof OBJECT_FIT_KEYWORDS[number];
  'object-position': typeof OBJECT_POSITION_KEYWORDS[number];
  'offset-anchor': typeof OFFSET_ANCHOR_KEYWORDS[number];
  'offset-path': typeof OFFSET_PATH_KEYWORDS[number];
  'offset-position': typeof OFFSET_POSITION_KEYWORDS[number];
  'offset-rotate': typeof OFFSET_ROTATE_KEYWORDS[number];
  'outline-color': typeof OUTLINE_COLOR_KEYWORDS[number];
  'outline-style': typeof OUTLINE_STYLE_KEYWORDS[number];
  'outline-width': typeof OUTLINE_WIDTH_KEYWORDS[number];
  'overflow': typeof OVERFLOW_KEYWORDS[number];
  'overflow-anchor': typeof OVERFLOW_ANCHOR_KEYWORDS[number];
  'overflow-block': typeof OVERFLOW_BLOCK_KEYWORDS[number];
  'overflow-clip-box': typeof OVERFLOW_CLIP_BOX_KEYWORDS[number];
  'overflow-clip-margin': typeof OVERFLOW_CLIP_MARGIN_KEYWORDS[number];
  'overflow-inline': typeof OVERFLOW_INLINE_KEYWORDS[number];
  'overflow-wrap': typeof OVERFLOW_WRAP_KEYWORDS[number];
  'overflow-x': typeof OVERFLOW_X_KEYWORDS[number];
  'overflow-y': typeof OVERFLOW_Y_KEYWORDS[number];
  'overlay': typeof OVERLAY_KEYWORDS[number];
  'overscroll-behavior': typeof OVERSCROLL_BEHAVIOR_KEYWORDS[number];
  'overscroll-behavior-block': typeof OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS[number];
  'overscroll-behavior-inline': typeof OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS[number];
  'overscroll-behavior-x': typeof OVERSCROLL_BEHAVIOR_X_KEYWORDS[number];
  'overscroll-behavior-y': typeof OVERSCROLL_BEHAVIOR_Y_KEYWORDS[number];
  'page': typeof PAGE_KEYWORDS[number];
  'page-break-after': typeof PAGE_BREAK_AFTER_KEYWORDS[number];
  'page-break-before': typeof PAGE_BREAK_BEFORE_KEYWORDS[number];
  'page-break-inside': typeof PAGE_BREAK_INSIDE_KEYWORDS[number];
  'paint-order': typeof PAINT_ORDER_KEYWORDS[number];
  'pause-after': typeof PAUSE_AFTER_KEYWORDS[number];
  'pause-before': typeof PAUSE_BEFORE_KEYWORDS[number];
  'perspective': typeof PERSPECTIVE_KEYWORDS[number];
  'perspective-origin': typeof PERSPECTIVE_ORIGIN_KEYWORDS[number];
  'pointer-events': typeof POINTER_EVENTS_KEYWORDS[number];
  'position': typeof POSITION_KEYWORDS[number];
  'position-anchor': typeof POSITION_ANCHOR_KEYWORDS[number];
  'position-area': typeof POSITION_AREA_KEYWORDS[number];
  'position-try-fallbacks': typeof POSITION_TRY_FALLBACKS_KEYWORDS[number];
  'position-try-order': typeof POSITION_TRY_ORDER_KEYWORDS[number];
  'position-visibility': typeof POSITION_VISIBILITY_KEYWORDS[number];
  'print-color-adjust': typeof PRINT_COLOR_ADJUST_KEYWORDS[number];
  'quotes': typeof QUOTES_KEYWORDS[number];
  'resize': typeof RESIZE_KEYWORDS[number];
  'rest-after': typeof REST_AFTER_KEYWORDS[number];
  'rest-before': typeof REST_BEFORE_KEYWORDS[number];
  'right': typeof RIGHT_KEYWORDS[number];
  'rotate': typeof ROTATE_KEYWORDS[number];
  'row-gap': typeof ROW_GAP_KEYWORDS[number];
  'ruby-align': typeof RUBY_ALIGN_KEYWORDS[number];
  'ruby-merge': typeof RUBY_MERGE_KEYWORDS[number];
  'ruby-position': typeof RUBY_POSITION_KEYWORDS[number];
  'scale': typeof SCALE_KEYWORDS[number];
  'scroll-behavior': typeof SCROLL_BEHAVIOR_KEYWORDS[number];
  'scroll-padding': typeof SCROLL_PADDING_KEYWORDS[number];
  'scroll-padding-block': typeof SCROLL_PADDING_BLOCK_KEYWORDS[number];
  'scroll-padding-block-end': typeof SCROLL_PADDING_BLOCK_END_KEYWORDS[number];
  'scroll-padding-block-start': typeof SCROLL_PADDING_BLOCK_START_KEYWORDS[number];
  'scroll-padding-bottom': typeof SCROLL_PADDING_BOTTOM_KEYWORDS[number];
  'scroll-padding-inline': typeof SCROLL_PADDING_INLINE_KEYWORDS[number];
  'scroll-padding-inline-end': typeof SCROLL_PADDING_INLINE_END_KEYWORDS[number];
  'scroll-padding-inline-start': typeof SCROLL_PADDING_INLINE_START_KEYWORDS[number];
  'scroll-padding-left': typeof SCROLL_PADDING_LEFT_KEYWORDS[number];
  'scroll-padding-right': typeof SCROLL_PADDING_RIGHT_KEYWORDS[number];
  'scroll-padding-top': typeof SCROLL_PADDING_TOP_KEYWORDS[number];
  'scroll-snap-align': typeof SCROLL_SNAP_ALIGN_KEYWORDS[number];
  'scroll-snap-coordinate': typeof SCROLL_SNAP_COORDINATE_KEYWORDS[number];
  'scroll-snap-destination': typeof SCROLL_SNAP_DESTINATION_KEYWORDS[number];
  'scroll-snap-points-x': typeof SCROLL_SNAP_POINTS_X_KEYWORDS[number];
  'scroll-snap-points-y': typeof SCROLL_SNAP_POINTS_Y_KEYWORDS[number];
  'scroll-snap-stop': typeof SCROLL_SNAP_STOP_KEYWORDS[number];
  'scroll-snap-type': typeof SCROLL_SNAP_TYPE_KEYWORDS[number];
  'scroll-snap-type-x': typeof SCROLL_SNAP_TYPE_X_KEYWORDS[number];
  'scroll-snap-type-y': typeof SCROLL_SNAP_TYPE_Y_KEYWORDS[number];
  'scroll-timeline-axis': typeof SCROLL_TIMELINE_AXIS_KEYWORDS[number];
  'scroll-timeline-name': typeof SCROLL_TIMELINE_NAME_KEYWORDS[number];
  'scrollbar-color': typeof SCROLLBAR_COLOR_KEYWORDS[number];
  'scrollbar-gutter': typeof SCROLLBAR_GUTTER_KEYWORDS[number];
  'scrollbar-width': typeof SCROLLBAR_WIDTH_KEYWORDS[number];
  'shape-outside': typeof SHAPE_OUTSIDE_KEYWORDS[number];
  'shape-rendering': typeof SHAPE_RENDERING_KEYWORDS[number];
  'speak': typeof SPEAK_KEYWORDS[number];
  'speak-as': typeof SPEAK_AS_KEYWORDS[number];
  'stroke': typeof STROKE_KEYWORDS[number];
  'stroke-dasharray': typeof STROKE_DASHARRAY_KEYWORDS[number];
  'stroke-linecap': typeof STROKE_LINECAP_KEYWORDS[number];
  'stroke-linejoin': typeof STROKE_LINEJOIN_KEYWORDS[number];
  'table-layout': typeof TABLE_LAYOUT_KEYWORDS[number];
  'text-align': typeof TEXT_ALIGN_KEYWORDS[number];
  'text-align-last': typeof TEXT_ALIGN_LAST_KEYWORDS[number];
  'text-anchor': typeof TEXT_ANCHOR_KEYWORDS[number];
  'text-combine-upright': typeof TEXT_COMBINE_UPRIGHT_KEYWORDS[number];
  'text-decoration-color': typeof TEXT_DECORATION_COLOR_KEYWORDS[number];
  'text-decoration-line': typeof TEXT_DECORATION_LINE_KEYWORDS[number];
  'text-decoration-skip': typeof TEXT_DECORATION_SKIP_KEYWORDS[number];
  'text-decoration-skip-ink': typeof TEXT_DECORATION_SKIP_INK_KEYWORDS[number];
  'text-decoration-style': typeof TEXT_DECORATION_STYLE_KEYWORDS[number];
  'text-decoration-thickness': typeof TEXT_DECORATION_THICKNESS_KEYWORDS[number];
  'text-emphasis-color': typeof TEXT_EMPHASIS_COLOR_KEYWORDS[number];
  'text-emphasis-position': typeof TEXT_EMPHASIS_POSITION_KEYWORDS[number];
  'text-emphasis-style': typeof TEXT_EMPHASIS_STYLE_KEYWORDS[number];
  'text-indent': typeof TEXT_INDENT_KEYWORDS[number];
  'text-justify': typeof TEXT_JUSTIFY_KEYWORDS[number];
  'text-orientation': typeof TEXT_ORIENTATION_KEYWORDS[number];
  'text-overflow': typeof TEXT_OVERFLOW_KEYWORDS[number];
  'text-rendering': typeof TEXT_RENDERING_KEYWORDS[number];
  'text-shadow': typeof TEXT_SHADOW_KEYWORDS[number];
  'text-size-adjust': typeof TEXT_SIZE_ADJUST_KEYWORDS[number];
  'text-spacing-trim': typeof TEXT_SPACING_TRIM_KEYWORDS[number];
  'text-transform': typeof TEXT_TRANSFORM_KEYWORDS[number];
  'text-underline-offset': typeof TEXT_UNDERLINE_OFFSET_KEYWORDS[number];
  'text-underline-position': typeof TEXT_UNDERLINE_POSITION_KEYWORDS[number];
  'text-wrap-mode': typeof TEXT_WRAP_MODE_KEYWORDS[number];
  'text-wrap-style': typeof TEXT_WRAP_STYLE_KEYWORDS[number];
  'timeline-scope': typeof TIMELINE_SCOPE_KEYWORDS[number];
  'top': typeof TOP_KEYWORDS[number];
  'touch-action': typeof TOUCH_ACTION_KEYWORDS[number];
  'transform': typeof TRANSFORM_KEYWORDS[number];
  'transform-box': typeof TRANSFORM_BOX_KEYWORDS[number];
  'transform-origin': typeof TRANSFORM_ORIGIN_KEYWORDS[number];
  'transform-style': typeof TRANSFORM_STYLE_KEYWORDS[number];
  'transition': typeof TRANSITION_KEYWORDS[number];
  'transition-behavior': typeof TRANSITION_BEHAVIOR_KEYWORDS[number];
  'transition-property': typeof TRANSITION_PROPERTY_KEYWORDS[number];
  'transition-timing-function': typeof TRANSITION_TIMING_FUNCTION_KEYWORDS[number];
  'translate': typeof TRANSLATE_KEYWORDS[number];
  'unicode-bidi': typeof UNICODE_BIDI_KEYWORDS[number];
  'user-select': typeof USER_SELECT_KEYWORDS[number];
  'vector-effect': typeof VECTOR_EFFECT_KEYWORDS[number];
  'vertical-align': typeof VERTICAL_ALIGN_KEYWORDS[number];
  'view-timeline-axis': typeof VIEW_TIMELINE_AXIS_KEYWORDS[number];
  'view-timeline-inset': typeof VIEW_TIMELINE_INSET_KEYWORDS[number];
  'view-timeline-name': typeof VIEW_TIMELINE_NAME_KEYWORDS[number];
  'view-transition-name': typeof VIEW_TRANSITION_NAME_KEYWORDS[number];
  'visibility': typeof VISIBILITY_KEYWORDS[number];
  'voice-balance': typeof VOICE_BALANCE_KEYWORDS[number];
  'voice-duration': typeof VOICE_DURATION_KEYWORDS[number];
  'voice-family': typeof VOICE_FAMILY_KEYWORDS[number];
  'voice-pitch': typeof VOICE_PITCH_KEYWORDS[number];
  'voice-range': typeof VOICE_RANGE_KEYWORDS[number];
  'voice-rate': typeof VOICE_RATE_KEYWORDS[number];
  'voice-stress': typeof VOICE_STRESS_KEYWORDS[number];
  'voice-volume': typeof VOICE_VOLUME_KEYWORDS[number];
  'white-space': typeof WHITE_SPACE_KEYWORDS[number];
  'white-space-collapse': typeof WHITE_SPACE_COLLAPSE_KEYWORDS[number];
  'white-space-trim': typeof WHITE_SPACE_TRIM_KEYWORDS[number];
  'width': typeof WIDTH_KEYWORDS[number];
  'will-change': typeof WILL_CHANGE_KEYWORDS[number];
  'word-break': typeof WORD_BREAK_KEYWORDS[number];
  'word-spacing': typeof WORD_SPACING_KEYWORDS[number];
  'word-wrap': typeof WORD_WRAP_KEYWORDS[number];
  'writing-mode': typeof WRITING_MODE_KEYWORDS[number];
  'z-index': typeof Z_INDEX_KEYWORDS[number];
  'zoom': typeof ZOOM_KEYWORDS[number];
};

// ==================== 数值属性映射 ====================

/** 数值属性名（运行时数据 + 类型） */
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

/** 属性到数值类型的映射（运行时可用） */
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

// ==================== 属性数值类型联合（层级3） ====================
// 每个属性的数值类型 = 其支持的数值类型的联合
// 类型名格式：{PascalCasePropertyName}PropertyNumberType

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

/** 属性数值类型映射类型 */
export type PropertyNumberTypesMap = {
  'accent-color': AccentColorPropertyNumberType;
  'animation': AnimationPropertyNumberType;
  'animation-delay': AnimationDelayPropertyNumberType;
  'animation-duration': AnimationDurationPropertyNumberType;
  'animation-iteration-count': AnimationIterationCountPropertyNumberType;
  'animation-range-end': AnimationRangeEndPropertyNumberType;
  'animation-range-start': AnimationRangeStartPropertyNumberType;
  'animation-timing-function': AnimationTimingFunctionPropertyNumberType;
  'aspect-ratio': AspectRatioPropertyNumberType;
  'azimuth': AzimuthPropertyNumberType;
  'backdrop-filter': BackdropFilterPropertyNumberType;
  'background': BackgroundPropertyNumberType;
  'background-color': BackgroundColorPropertyNumberType;
  'background-image': BackgroundImagePropertyNumberType;
  'background-position': BackgroundPositionPropertyNumberType;
  'background-position-x': BackgroundPositionXPropertyNumberType;
  'background-position-y': BackgroundPositionYPropertyNumberType;
  'background-size': BackgroundSizePropertyNumberType;
  'baseline-shift': BaselineShiftPropertyNumberType;
  'border': BorderPropertyNumberType;
  'border-block': BorderBlockPropertyNumberType;
  'border-block-end': BorderBlockEndPropertyNumberType;
  'border-block-start': BorderBlockStartPropertyNumberType;
  'border-bottom': BorderBottomPropertyNumberType;
  'border-bottom-left-radius': BorderBottomLeftRadiusPropertyNumberType;
  'border-bottom-right-radius': BorderBottomRightRadiusPropertyNumberType;
  'border-bottom-width': BorderBottomWidthPropertyNumberType;
  'border-color': BorderColorPropertyNumberType;
  'border-end-end-radius': BorderEndEndRadiusPropertyNumberType;
  'border-end-start-radius': BorderEndStartRadiusPropertyNumberType;
  'border-image-outset': BorderImageOutsetPropertyNumberType;
  'border-image-slice': BorderImageSlicePropertyNumberType;
  'border-image-source': BorderImageSourcePropertyNumberType;
  'border-image-width': BorderImageWidthPropertyNumberType;
  'border-inline': BorderInlinePropertyNumberType;
  'border-inline-end': BorderInlineEndPropertyNumberType;
  'border-inline-start': BorderInlineStartPropertyNumberType;
  'border-left': BorderLeftPropertyNumberType;
  'border-left-color': BorderLeftColorPropertyNumberType;
  'border-left-width': BorderLeftWidthPropertyNumberType;
  'border-radius': BorderRadiusPropertyNumberType;
  'border-right': BorderRightPropertyNumberType;
  'border-right-color': BorderRightColorPropertyNumberType;
  'border-right-width': BorderRightWidthPropertyNumberType;
  'border-spacing': BorderSpacingPropertyNumberType;
  'border-start-end-radius': BorderStartEndRadiusPropertyNumberType;
  'border-start-start-radius': BorderStartStartRadiusPropertyNumberType;
  'border-top': BorderTopPropertyNumberType;
  'border-top-color': BorderTopColorPropertyNumberType;
  'border-top-left-radius': BorderTopLeftRadiusPropertyNumberType;
  'border-top-right-radius': BorderTopRightRadiusPropertyNumberType;
  'border-top-width': BorderTopWidthPropertyNumberType;
  'border-width': BorderWidthPropertyNumberType;
  'bottom': BottomPropertyNumberType;
  'box-flex': BoxFlexPropertyNumberType;
  'box-flex-group': BoxFlexGroupPropertyNumberType;
  'box-ordinal-group': BoxOrdinalGroupPropertyNumberType;
  'box-shadow': BoxShadowPropertyNumberType;
  'caret-color': CaretColorPropertyNumberType;
  'clip': ClipPropertyNumberType;
  'clip-path': ClipPathPropertyNumberType;
  'color': ColorPropertyNumberType;
  'column-count': ColumnCountPropertyNumberType;
  'column-gap': ColumnGapPropertyNumberType;
  'column-rule-color': ColumnRuleColorPropertyNumberType;
  'column-width': ColumnWidthPropertyNumberType;
  'contain-intrinsic-block-size': ContainIntrinsicBlockSizePropertyNumberType;
  'contain-intrinsic-height': ContainIntrinsicHeightPropertyNumberType;
  'contain-intrinsic-inline-size': ContainIntrinsicInlineSizePropertyNumberType;
  'contain-intrinsic-size': ContainIntrinsicSizePropertyNumberType;
  'contain-intrinsic-width': ContainIntrinsicWidthPropertyNumberType;
  'content': ContentPropertyNumberType;
  'counter-increment': CounterIncrementPropertyNumberType;
  'counter-reset': CounterResetPropertyNumberType;
  'counter-set': CounterSetPropertyNumberType;
  'cursor': CursorPropertyNumberType;
  'cx': CxPropertyNumberType;
  'cy': CyPropertyNumberType;
  'fill': FillPropertyNumberType;
  'fill-opacity': FillOpacityPropertyNumberType;
  'filter': FilterPropertyNumberType;
  'flex-grow': FlexGrowPropertyNumberType;
  'flex-shrink': FlexShrinkPropertyNumberType;
  'font-feature-settings': FontFeatureSettingsPropertyNumberType;
  'font-size': FontSizePropertyNumberType;
  'font-size-adjust': FontSizeAdjustPropertyNumberType;
  'font-smooth': FontSmoothPropertyNumberType;
  'font-stretch': FontStretchPropertyNumberType;
  'font-style': FontStylePropertyNumberType;
  'font-variation-settings': FontVariationSettingsPropertyNumberType;
  'font-weight': FontWeightPropertyNumberType;
  'glyph-orientation-horizontal': GlyphOrientationHorizontalPropertyNumberType;
  'glyph-orientation-vertical': GlyphOrientationVerticalPropertyNumberType;
  'grid-area': GridAreaPropertyNumberType;
  'grid-auto-columns': GridAutoColumnsPropertyNumberType;
  'grid-auto-rows': GridAutoRowsPropertyNumberType;
  'grid-column': GridColumnPropertyNumberType;
  'grid-column-end': GridColumnEndPropertyNumberType;
  'grid-column-gap': GridColumnGapPropertyNumberType;
  'grid-column-start': GridColumnStartPropertyNumberType;
  'grid-row': GridRowPropertyNumberType;
  'grid-row-end': GridRowEndPropertyNumberType;
  'grid-row-gap': GridRowGapPropertyNumberType;
  'grid-row-start': GridRowStartPropertyNumberType;
  'grid-template': GridTemplatePropertyNumberType;
  'grid-template-columns': GridTemplateColumnsPropertyNumberType;
  'grid-template-rows': GridTemplateRowsPropertyNumberType;
  'height': HeightPropertyNumberType;
  'hyphenate-limit-chars': HyphenateLimitCharsPropertyNumberType;
  'image-orientation': ImageOrientationPropertyNumberType;
  'image-resolution': ImageResolutionPropertyNumberType;
  'initial-letter': InitialLetterPropertyNumberType;
  'kerning': KerningPropertyNumberType;
  'left': LeftPropertyNumberType;
  'letter-spacing': LetterSpacingPropertyNumberType;
  'line-clamp': LineClampPropertyNumberType;
  'line-height': LineHeightPropertyNumberType;
  'line-height-step': LineHeightStepPropertyNumberType;
  'list-style-image': ListStyleImagePropertyNumberType;
  'margin': MarginPropertyNumberType;
  'margin-bottom': MarginBottomPropertyNumberType;
  'margin-left': MarginLeftPropertyNumberType;
  'margin-right': MarginRightPropertyNumberType;
  'margin-top': MarginTopPropertyNumberType;
  'mask': MaskPropertyNumberType;
  'mask-border-outset': MaskBorderOutsetPropertyNumberType;
  'mask-border-slice': MaskBorderSlicePropertyNumberType;
  'mask-border-source': MaskBorderSourcePropertyNumberType;
  'mask-border-width': MaskBorderWidthPropertyNumberType;
  'mask-image': MaskImagePropertyNumberType;
  'mask-position': MaskPositionPropertyNumberType;
  'mask-size': MaskSizePropertyNumberType;
  'math-depth': MathDepthPropertyNumberType;
  'max-height': MaxHeightPropertyNumberType;
  'max-lines': MaxLinesPropertyNumberType;
  'max-width': MaxWidthPropertyNumberType;
  'min-height': MinHeightPropertyNumberType;
  'min-width': MinWidthPropertyNumberType;
  'object-position': ObjectPositionPropertyNumberType;
  'offset-anchor': OffsetAnchorPropertyNumberType;
  'offset-distance': OffsetDistancePropertyNumberType;
  'offset-path': OffsetPathPropertyNumberType;
  'offset-position': OffsetPositionPropertyNumberType;
  'offset-rotate': OffsetRotatePropertyNumberType;
  'opacity': OpacityPropertyNumberType;
  'order': OrderPropertyNumberType;
  'orphans': OrphansPropertyNumberType;
  'outline-color': OutlineColorPropertyNumberType;
  'outline-offset': OutlineOffsetPropertyNumberType;
  'outline-width': OutlineWidthPropertyNumberType;
  'overflow-clip-margin': OverflowClipMarginPropertyNumberType;
  'padding': PaddingPropertyNumberType;
  'padding-bottom': PaddingBottomPropertyNumberType;
  'padding-left': PaddingLeftPropertyNumberType;
  'padding-right': PaddingRightPropertyNumberType;
  'padding-top': PaddingTopPropertyNumberType;
  'pause-after': PauseAfterPropertyNumberType;
  'pause-before': PauseBeforePropertyNumberType;
  'perspective': PerspectivePropertyNumberType;
  'perspective-origin': PerspectiveOriginPropertyNumberType;
  'r': RPropertyNumberType;
  'rest-after': RestAfterPropertyNumberType;
  'rest-before': RestBeforePropertyNumberType;
  'right': RightPropertyNumberType;
  'rotate': RotatePropertyNumberType;
  'row-gap': RowGapPropertyNumberType;
  'rx': RxPropertyNumberType;
  'ry': RyPropertyNumberType;
  'scale': ScalePropertyNumberType;
  'scroll-margin': ScrollMarginPropertyNumberType;
  'scroll-margin-block': ScrollMarginBlockPropertyNumberType;
  'scroll-margin-block-end': ScrollMarginBlockEndPropertyNumberType;
  'scroll-margin-block-start': ScrollMarginBlockStartPropertyNumberType;
  'scroll-margin-bottom': ScrollMarginBottomPropertyNumberType;
  'scroll-margin-inline': ScrollMarginInlinePropertyNumberType;
  'scroll-margin-inline-end': ScrollMarginInlineEndPropertyNumberType;
  'scroll-margin-inline-start': ScrollMarginInlineStartPropertyNumberType;
  'scroll-margin-left': ScrollMarginLeftPropertyNumberType;
  'scroll-margin-right': ScrollMarginRightPropertyNumberType;
  'scroll-margin-top': ScrollMarginTopPropertyNumberType;
  'scroll-padding': ScrollPaddingPropertyNumberType;
  'scroll-padding-block': ScrollPaddingBlockPropertyNumberType;
  'scroll-padding-block-end': ScrollPaddingBlockEndPropertyNumberType;
  'scroll-padding-block-start': ScrollPaddingBlockStartPropertyNumberType;
  'scroll-padding-bottom': ScrollPaddingBottomPropertyNumberType;
  'scroll-padding-inline': ScrollPaddingInlinePropertyNumberType;
  'scroll-padding-inline-end': ScrollPaddingInlineEndPropertyNumberType;
  'scroll-padding-inline-start': ScrollPaddingInlineStartPropertyNumberType;
  'scroll-padding-left': ScrollPaddingLeftPropertyNumberType;
  'scroll-padding-right': ScrollPaddingRightPropertyNumberType;
  'scroll-padding-top': ScrollPaddingTopPropertyNumberType;
  'scroll-snap-coordinate': ScrollSnapCoordinatePropertyNumberType;
  'scroll-snap-destination': ScrollSnapDestinationPropertyNumberType;
  'scroll-snap-points-x': ScrollSnapPointsXPropertyNumberType;
  'scroll-snap-points-y': ScrollSnapPointsYPropertyNumberType;
  'scrollbar-color': ScrollbarColorPropertyNumberType;
  'shape-image-threshold': ShapeImageThresholdPropertyNumberType;
  'shape-margin': ShapeMarginPropertyNumberType;
  'shape-outside': ShapeOutsidePropertyNumberType;
  'stroke': StrokePropertyNumberType;
  'stroke-dasharray': StrokeDasharrayPropertyNumberType;
  'stroke-dashoffset': StrokeDashoffsetPropertyNumberType;
  'stroke-miterlimit': StrokeMiterlimitPropertyNumberType;
  'stroke-width': StrokeWidthPropertyNumberType;
  'tab-size': TabSizePropertyNumberType;
  'text-combine-upright': TextCombineUprightPropertyNumberType;
  'text-decoration-color': TextDecorationColorPropertyNumberType;
  'text-decoration-thickness': TextDecorationThicknessPropertyNumberType;
  'text-emphasis-color': TextEmphasisColorPropertyNumberType;
  'text-indent': TextIndentPropertyNumberType;
  'text-shadow': TextShadowPropertyNumberType;
  'text-size-adjust': TextSizeAdjustPropertyNumberType;
  'text-underline-offset': TextUnderlineOffsetPropertyNumberType;
  'top': TopPropertyNumberType;
  'transform': TransformPropertyNumberType;
  'transform-origin': TransformOriginPropertyNumberType;
  'transition': TransitionPropertyNumberType;
  'transition-delay': TransitionDelayPropertyNumberType;
  'transition-duration': TransitionDurationPropertyNumberType;
  'transition-timing-function': TransitionTimingFunctionPropertyNumberType;
  'translate': TranslatePropertyNumberType;
  'vertical-align': VerticalAlignPropertyNumberType;
  'view-timeline-inset': ViewTimelineInsetPropertyNumberType;
  'voice-balance': VoiceBalancePropertyNumberType;
  'voice-duration': VoiceDurationPropertyNumberType;
  'voice-family': VoiceFamilyPropertyNumberType;
  'voice-pitch': VoicePitchPropertyNumberType;
  'voice-range': VoiceRangePropertyNumberType;
  'voice-rate': VoiceRatePropertyNumberType;
  'widows': WidowsPropertyNumberType;
  'width': WidthPropertyNumberType;
  'word-spacing': WordSpacingPropertyNumberType;
  'x': XPropertyNumberType;
  'y': YPropertyNumberType;
  'z-index': ZIndexPropertyNumberType;
  'zoom': ZoomPropertyNumberType;
};

/** 属性单位类型映射（类型层面，用于泛型约束） */
export type PropertyUnitTypeMap = {
  'accent-color': AccentColorPropertyNumberType;
  'animation': AnimationPropertyNumberType;
  'animation-delay': AnimationDelayPropertyNumberType;
  'animation-duration': AnimationDurationPropertyNumberType;
  'animation-iteration-count': AnimationIterationCountPropertyNumberType;
  'animation-range-end': AnimationRangeEndPropertyNumberType;
  'animation-range-start': AnimationRangeStartPropertyNumberType;
  'animation-timing-function': AnimationTimingFunctionPropertyNumberType;
  'aspect-ratio': AspectRatioPropertyNumberType;
  'azimuth': AzimuthPropertyNumberType;
  'backdrop-filter': BackdropFilterPropertyNumberType;
  'background': BackgroundPropertyNumberType;
  'background-color': BackgroundColorPropertyNumberType;
  'background-image': BackgroundImagePropertyNumberType;
  'background-position': BackgroundPositionPropertyNumberType;
  'background-position-x': BackgroundPositionXPropertyNumberType;
  'background-position-y': BackgroundPositionYPropertyNumberType;
  'background-size': BackgroundSizePropertyNumberType;
  'baseline-shift': BaselineShiftPropertyNumberType;
  'border': BorderPropertyNumberType;
  'border-block': BorderBlockPropertyNumberType;
  'border-block-end': BorderBlockEndPropertyNumberType;
  'border-block-start': BorderBlockStartPropertyNumberType;
  'border-bottom': BorderBottomPropertyNumberType;
  'border-bottom-left-radius': BorderBottomLeftRadiusPropertyNumberType;
  'border-bottom-right-radius': BorderBottomRightRadiusPropertyNumberType;
  'border-bottom-width': BorderBottomWidthPropertyNumberType;
  'border-color': BorderColorPropertyNumberType;
  'border-end-end-radius': BorderEndEndRadiusPropertyNumberType;
  'border-end-start-radius': BorderEndStartRadiusPropertyNumberType;
  'border-image-outset': BorderImageOutsetPropertyNumberType;
  'border-image-slice': BorderImageSlicePropertyNumberType;
  'border-image-source': BorderImageSourcePropertyNumberType;
  'border-image-width': BorderImageWidthPropertyNumberType;
  'border-inline': BorderInlinePropertyNumberType;
  'border-inline-end': BorderInlineEndPropertyNumberType;
  'border-inline-start': BorderInlineStartPropertyNumberType;
  'border-left': BorderLeftPropertyNumberType;
  'border-left-color': BorderLeftColorPropertyNumberType;
  'border-left-width': BorderLeftWidthPropertyNumberType;
  'border-radius': BorderRadiusPropertyNumberType;
  'border-right': BorderRightPropertyNumberType;
  'border-right-color': BorderRightColorPropertyNumberType;
  'border-right-width': BorderRightWidthPropertyNumberType;
  'border-spacing': BorderSpacingPropertyNumberType;
  'border-start-end-radius': BorderStartEndRadiusPropertyNumberType;
  'border-start-start-radius': BorderStartStartRadiusPropertyNumberType;
  'border-top': BorderTopPropertyNumberType;
  'border-top-color': BorderTopColorPropertyNumberType;
  'border-top-left-radius': BorderTopLeftRadiusPropertyNumberType;
  'border-top-right-radius': BorderTopRightRadiusPropertyNumberType;
  'border-top-width': BorderTopWidthPropertyNumberType;
  'border-width': BorderWidthPropertyNumberType;
  'bottom': BottomPropertyNumberType;
  'box-flex': BoxFlexPropertyNumberType;
  'box-flex-group': BoxFlexGroupPropertyNumberType;
  'box-ordinal-group': BoxOrdinalGroupPropertyNumberType;
  'box-shadow': BoxShadowPropertyNumberType;
  'caret-color': CaretColorPropertyNumberType;
  'clip': ClipPropertyNumberType;
  'clip-path': ClipPathPropertyNumberType;
  'color': ColorPropertyNumberType;
  'column-count': ColumnCountPropertyNumberType;
  'column-gap': ColumnGapPropertyNumberType;
  'column-rule-color': ColumnRuleColorPropertyNumberType;
  'column-width': ColumnWidthPropertyNumberType;
  'contain-intrinsic-block-size': ContainIntrinsicBlockSizePropertyNumberType;
  'contain-intrinsic-height': ContainIntrinsicHeightPropertyNumberType;
  'contain-intrinsic-inline-size': ContainIntrinsicInlineSizePropertyNumberType;
  'contain-intrinsic-size': ContainIntrinsicSizePropertyNumberType;
  'contain-intrinsic-width': ContainIntrinsicWidthPropertyNumberType;
  'content': ContentPropertyNumberType;
  'counter-increment': CounterIncrementPropertyNumberType;
  'counter-reset': CounterResetPropertyNumberType;
  'counter-set': CounterSetPropertyNumberType;
  'cursor': CursorPropertyNumberType;
  'cx': CxPropertyNumberType;
  'cy': CyPropertyNumberType;
  'fill': FillPropertyNumberType;
  'fill-opacity': FillOpacityPropertyNumberType;
  'filter': FilterPropertyNumberType;
  'flex-grow': FlexGrowPropertyNumberType;
  'flex-shrink': FlexShrinkPropertyNumberType;
  'font-feature-settings': FontFeatureSettingsPropertyNumberType;
  'font-size': FontSizePropertyNumberType;
  'font-size-adjust': FontSizeAdjustPropertyNumberType;
  'font-smooth': FontSmoothPropertyNumberType;
  'font-stretch': FontStretchPropertyNumberType;
  'font-style': FontStylePropertyNumberType;
  'font-variation-settings': FontVariationSettingsPropertyNumberType;
  'font-weight': FontWeightPropertyNumberType;
  'glyph-orientation-horizontal': GlyphOrientationHorizontalPropertyNumberType;
  'glyph-orientation-vertical': GlyphOrientationVerticalPropertyNumberType;
  'grid-area': GridAreaPropertyNumberType;
  'grid-auto-columns': GridAutoColumnsPropertyNumberType;
  'grid-auto-rows': GridAutoRowsPropertyNumberType;
  'grid-column': GridColumnPropertyNumberType;
  'grid-column-end': GridColumnEndPropertyNumberType;
  'grid-column-gap': GridColumnGapPropertyNumberType;
  'grid-column-start': GridColumnStartPropertyNumberType;
  'grid-row': GridRowPropertyNumberType;
  'grid-row-end': GridRowEndPropertyNumberType;
  'grid-row-gap': GridRowGapPropertyNumberType;
  'grid-row-start': GridRowStartPropertyNumberType;
  'grid-template': GridTemplatePropertyNumberType;
  'grid-template-columns': GridTemplateColumnsPropertyNumberType;
  'grid-template-rows': GridTemplateRowsPropertyNumberType;
  'height': HeightPropertyNumberType;
  'hyphenate-limit-chars': HyphenateLimitCharsPropertyNumberType;
  'image-orientation': ImageOrientationPropertyNumberType;
  'image-resolution': ImageResolutionPropertyNumberType;
  'initial-letter': InitialLetterPropertyNumberType;
  'kerning': KerningPropertyNumberType;
  'left': LeftPropertyNumberType;
  'letter-spacing': LetterSpacingPropertyNumberType;
  'line-clamp': LineClampPropertyNumberType;
  'line-height': LineHeightPropertyNumberType;
  'line-height-step': LineHeightStepPropertyNumberType;
  'list-style-image': ListStyleImagePropertyNumberType;
  'margin': MarginPropertyNumberType;
  'margin-bottom': MarginBottomPropertyNumberType;
  'margin-left': MarginLeftPropertyNumberType;
  'margin-right': MarginRightPropertyNumberType;
  'margin-top': MarginTopPropertyNumberType;
  'mask': MaskPropertyNumberType;
  'mask-border-outset': MaskBorderOutsetPropertyNumberType;
  'mask-border-slice': MaskBorderSlicePropertyNumberType;
  'mask-border-source': MaskBorderSourcePropertyNumberType;
  'mask-border-width': MaskBorderWidthPropertyNumberType;
  'mask-image': MaskImagePropertyNumberType;
  'mask-position': MaskPositionPropertyNumberType;
  'mask-size': MaskSizePropertyNumberType;
  'math-depth': MathDepthPropertyNumberType;
  'max-height': MaxHeightPropertyNumberType;
  'max-lines': MaxLinesPropertyNumberType;
  'max-width': MaxWidthPropertyNumberType;
  'min-height': MinHeightPropertyNumberType;
  'min-width': MinWidthPropertyNumberType;
  'object-position': ObjectPositionPropertyNumberType;
  'offset-anchor': OffsetAnchorPropertyNumberType;
  'offset-distance': OffsetDistancePropertyNumberType;
  'offset-path': OffsetPathPropertyNumberType;
  'offset-position': OffsetPositionPropertyNumberType;
  'offset-rotate': OffsetRotatePropertyNumberType;
  'opacity': OpacityPropertyNumberType;
  'order': OrderPropertyNumberType;
  'orphans': OrphansPropertyNumberType;
  'outline-color': OutlineColorPropertyNumberType;
  'outline-offset': OutlineOffsetPropertyNumberType;
  'outline-width': OutlineWidthPropertyNumberType;
  'overflow-clip-margin': OverflowClipMarginPropertyNumberType;
  'padding': PaddingPropertyNumberType;
  'padding-bottom': PaddingBottomPropertyNumberType;
  'padding-left': PaddingLeftPropertyNumberType;
  'padding-right': PaddingRightPropertyNumberType;
  'padding-top': PaddingTopPropertyNumberType;
  'pause-after': PauseAfterPropertyNumberType;
  'pause-before': PauseBeforePropertyNumberType;
  'perspective': PerspectivePropertyNumberType;
  'perspective-origin': PerspectiveOriginPropertyNumberType;
  'r': RPropertyNumberType;
  'rest-after': RestAfterPropertyNumberType;
  'rest-before': RestBeforePropertyNumberType;
  'right': RightPropertyNumberType;
  'rotate': RotatePropertyNumberType;
  'row-gap': RowGapPropertyNumberType;
  'rx': RxPropertyNumberType;
  'ry': RyPropertyNumberType;
  'scale': ScalePropertyNumberType;
  'scroll-margin': ScrollMarginPropertyNumberType;
  'scroll-margin-block': ScrollMarginBlockPropertyNumberType;
  'scroll-margin-block-end': ScrollMarginBlockEndPropertyNumberType;
  'scroll-margin-block-start': ScrollMarginBlockStartPropertyNumberType;
  'scroll-margin-bottom': ScrollMarginBottomPropertyNumberType;
  'scroll-margin-inline': ScrollMarginInlinePropertyNumberType;
  'scroll-margin-inline-end': ScrollMarginInlineEndPropertyNumberType;
  'scroll-margin-inline-start': ScrollMarginInlineStartPropertyNumberType;
  'scroll-margin-left': ScrollMarginLeftPropertyNumberType;
  'scroll-margin-right': ScrollMarginRightPropertyNumberType;
  'scroll-margin-top': ScrollMarginTopPropertyNumberType;
  'scroll-padding': ScrollPaddingPropertyNumberType;
  'scroll-padding-block': ScrollPaddingBlockPropertyNumberType;
  'scroll-padding-block-end': ScrollPaddingBlockEndPropertyNumberType;
  'scroll-padding-block-start': ScrollPaddingBlockStartPropertyNumberType;
  'scroll-padding-bottom': ScrollPaddingBottomPropertyNumberType;
  'scroll-padding-inline': ScrollPaddingInlinePropertyNumberType;
  'scroll-padding-inline-end': ScrollPaddingInlineEndPropertyNumberType;
  'scroll-padding-inline-start': ScrollPaddingInlineStartPropertyNumberType;
  'scroll-padding-left': ScrollPaddingLeftPropertyNumberType;
  'scroll-padding-right': ScrollPaddingRightPropertyNumberType;
  'scroll-padding-top': ScrollPaddingTopPropertyNumberType;
  'scroll-snap-coordinate': ScrollSnapCoordinatePropertyNumberType;
  'scroll-snap-destination': ScrollSnapDestinationPropertyNumberType;
  'scroll-snap-points-x': ScrollSnapPointsXPropertyNumberType;
  'scroll-snap-points-y': ScrollSnapPointsYPropertyNumberType;
  'scrollbar-color': ScrollbarColorPropertyNumberType;
  'shape-image-threshold': ShapeImageThresholdPropertyNumberType;
  'shape-margin': ShapeMarginPropertyNumberType;
  'shape-outside': ShapeOutsidePropertyNumberType;
  'stroke': StrokePropertyNumberType;
  'stroke-dasharray': StrokeDasharrayPropertyNumberType;
  'stroke-dashoffset': StrokeDashoffsetPropertyNumberType;
  'stroke-miterlimit': StrokeMiterlimitPropertyNumberType;
  'stroke-width': StrokeWidthPropertyNumberType;
  'tab-size': TabSizePropertyNumberType;
  'text-combine-upright': TextCombineUprightPropertyNumberType;
  'text-decoration-color': TextDecorationColorPropertyNumberType;
  'text-decoration-thickness': TextDecorationThicknessPropertyNumberType;
  'text-emphasis-color': TextEmphasisColorPropertyNumberType;
  'text-indent': TextIndentPropertyNumberType;
  'text-shadow': TextShadowPropertyNumberType;
  'text-size-adjust': TextSizeAdjustPropertyNumberType;
  'text-underline-offset': TextUnderlineOffsetPropertyNumberType;
  'top': TopPropertyNumberType;
  'transform': TransformPropertyNumberType;
  'transform-origin': TransformOriginPropertyNumberType;
  'transition': TransitionPropertyNumberType;
  'transition-delay': TransitionDelayPropertyNumberType;
  'transition-duration': TransitionDurationPropertyNumberType;
  'transition-timing-function': TransitionTimingFunctionPropertyNumberType;
  'translate': TranslatePropertyNumberType;
  'vertical-align': VerticalAlignPropertyNumberType;
  'view-timeline-inset': ViewTimelineInsetPropertyNumberType;
  'voice-balance': VoiceBalancePropertyNumberType;
  'voice-duration': VoiceDurationPropertyNumberType;
  'voice-family': VoiceFamilyPropertyNumberType;
  'voice-pitch': VoicePitchPropertyNumberType;
  'voice-range': VoiceRangePropertyNumberType;
  'voice-rate': VoiceRatePropertyNumberType;
  'widows': WidowsPropertyNumberType;
  'width': WidthPropertyNumberType;
  'word-spacing': WordSpacingPropertyNumberType;
  'x': XPropertyNumberType;
  'y': YPropertyNumberType;
  'z-index': ZIndexPropertyNumberType;
  'zoom': ZoomPropertyNumberType;
};

// ==================== 属性完整配置类型 ====================
// 每个属性的配置包含：keywords（关键词数组）和 numberTypes（数值类型数组）

/** 属性完整配置类型 */
export type CssPropertyConfigMap = {
  'accent-color': {
    keywords: (AccentColorKeyword | ColorValue)[];
    numberTypes: AccentColorPropertyNumberType[];
  };
  'align-content': {
    keywords: AlignContentKeyword[];
    numberTypes: never[];
  };
  'align-items': {
    keywords: AlignItemsKeyword[];
    numberTypes: never[];
  };
  'align-self': {
    keywords: AlignSelfKeyword[];
    numberTypes: never[];
  };
  'align-tracks': {
    keywords: AlignTracksKeyword[];
    numberTypes: never[];
  };
  'alignment-baseline': {
    keywords: AlignmentBaselineKeyword[];
    numberTypes: never[];
  };
  'all': {
    keywords: AllKeyword[];
    numberTypes: never[];
  };
  'anchor-name': {
    keywords: AnchorNameKeyword[];
    numberTypes: never[];
  };
  'anchor-scope': {
    keywords: AnchorScopeKeyword[];
    numberTypes: never[];
  };
  'animation': {
    keywords: AnimationKeyword[];
    numberTypes: AnimationPropertyNumberType[];
  };
  'animation-composition': {
    keywords: AnimationCompositionKeyword[];
    numberTypes: never[];
  };
  'animation-delay': {
    keywords: never[];
    numberTypes: AnimationDelayPropertyNumberType[];
  };
  'animation-direction': {
    keywords: AnimationDirectionKeyword[];
    numberTypes: never[];
  };
  'animation-duration': {
    keywords: never[];
    numberTypes: AnimationDurationPropertyNumberType[];
  };
  'animation-fill-mode': {
    keywords: AnimationFillModeKeyword[];
    numberTypes: never[];
  };
  'animation-iteration-count': {
    keywords: AnimationIterationCountKeyword[];
    numberTypes: AnimationIterationCountPropertyNumberType[];
  };
  'animation-name': {
    keywords: AnimationNameKeyword[];
    numberTypes: never[];
  };
  'animation-play-state': {
    keywords: AnimationPlayStateKeyword[];
    numberTypes: never[];
  };
  'animation-range-end': {
    keywords: AnimationRangeEndKeyword[];
    numberTypes: AnimationRangeEndPropertyNumberType[];
  };
  'animation-range-start': {
    keywords: AnimationRangeStartKeyword[];
    numberTypes: AnimationRangeStartPropertyNumberType[];
  };
  'animation-timeline': {
    keywords: AnimationTimelineKeyword[];
    numberTypes: never[];
  };
  'animation-timing-function': {
    keywords: AnimationTimingFunctionKeyword[];
    numberTypes: AnimationTimingFunctionPropertyNumberType[];
  };
  'appearance': {
    keywords: AppearanceKeyword[];
    numberTypes: never[];
  };
  'aspect-ratio': {
    keywords: AspectRatioKeyword[];
    numberTypes: AspectRatioPropertyNumberType[];
  };
  'azimuth': {
    keywords: AzimuthKeyword[];
    numberTypes: AzimuthPropertyNumberType[];
  };
  'backdrop-filter': {
    keywords: (BackdropFilterKeyword | ColorValue)[];
    numberTypes: BackdropFilterPropertyNumberType[];
  };
  'backface-visibility': {
    keywords: BackfaceVisibilityKeyword[];
    numberTypes: never[];
  };
  'background': {
    keywords: (BackgroundKeyword | ColorValue)[];
    numberTypes: BackgroundPropertyNumberType[];
  };
  'background-attachment': {
    keywords: BackgroundAttachmentKeyword[];
    numberTypes: never[];
  };
  'background-blend-mode': {
    keywords: BackgroundBlendModeKeyword[];
    numberTypes: never[];
  };
  'background-clip': {
    keywords: BackgroundClipKeyword[];
    numberTypes: never[];
  };
  'background-color': {
    keywords: (BackgroundColorKeyword | ColorValue)[];
    numberTypes: BackgroundColorPropertyNumberType[];
  };
  'background-image': {
    keywords: (BackgroundImageKeyword | ColorValue)[];
    numberTypes: BackgroundImagePropertyNumberType[];
  };
  'background-origin': {
    keywords: BackgroundOriginKeyword[];
    numberTypes: never[];
  };
  'background-position': {
    keywords: BackgroundPositionKeyword[];
    numberTypes: BackgroundPositionPropertyNumberType[];
  };
  'background-position-x': {
    keywords: BackgroundPositionXKeyword[];
    numberTypes: BackgroundPositionXPropertyNumberType[];
  };
  'background-position-y': {
    keywords: BackgroundPositionYKeyword[];
    numberTypes: BackgroundPositionYPropertyNumberType[];
  };
  'background-repeat': {
    keywords: BackgroundRepeatKeyword[];
    numberTypes: never[];
  };
  'background-size': {
    keywords: BackgroundSizeKeyword[];
    numberTypes: BackgroundSizePropertyNumberType[];
  };
  'baseline-shift': {
    keywords: BaselineShiftKeyword[];
    numberTypes: BaselineShiftPropertyNumberType[];
  };
  'border': {
    keywords: (BorderKeyword | ColorValue)[];
    numberTypes: BorderPropertyNumberType[];
  };
  'border-block': {
    keywords: (BorderBlockKeyword | ColorValue)[];
    numberTypes: BorderBlockPropertyNumberType[];
  };
  'border-block-end': {
    keywords: (BorderBlockEndKeyword | ColorValue)[];
    numberTypes: BorderBlockEndPropertyNumberType[];
  };
  'border-block-start': {
    keywords: (BorderBlockStartKeyword | ColorValue)[];
    numberTypes: BorderBlockStartPropertyNumberType[];
  };
  'border-bottom': {
    keywords: (BorderBottomKeyword | ColorValue)[];
    numberTypes: BorderBottomPropertyNumberType[];
  };
  'border-bottom-left-radius': {
    keywords: never[];
    numberTypes: BorderBottomLeftRadiusPropertyNumberType[];
  };
  'border-bottom-right-radius': {
    keywords: never[];
    numberTypes: BorderBottomRightRadiusPropertyNumberType[];
  };
  'border-bottom-style': {
    keywords: BorderBottomStyleKeyword[];
    numberTypes: never[];
  };
  'border-bottom-width': {
    keywords: BorderBottomWidthKeyword[];
    numberTypes: BorderBottomWidthPropertyNumberType[];
  };
  'border-collapse': {
    keywords: BorderCollapseKeyword[];
    numberTypes: never[];
  };
  'border-color': {
    keywords: (BorderColorKeyword | ColorValue)[];
    numberTypes: BorderColorPropertyNumberType[];
  };
  'border-end-end-radius': {
    keywords: never[];
    numberTypes: BorderEndEndRadiusPropertyNumberType[];
  };
  'border-end-start-radius': {
    keywords: never[];
    numberTypes: BorderEndStartRadiusPropertyNumberType[];
  };
  'border-image-outset': {
    keywords: never[];
    numberTypes: BorderImageOutsetPropertyNumberType[];
  };
  'border-image-repeat': {
    keywords: BorderImageRepeatKeyword[];
    numberTypes: never[];
  };
  'border-image-slice': {
    keywords: BorderImageSliceKeyword[];
    numberTypes: BorderImageSlicePropertyNumberType[];
  };
  'border-image-source': {
    keywords: (BorderImageSourceKeyword | ColorValue)[];
    numberTypes: BorderImageSourcePropertyNumberType[];
  };
  'border-image-width': {
    keywords: BorderImageWidthKeyword[];
    numberTypes: BorderImageWidthPropertyNumberType[];
  };
  'border-inline': {
    keywords: (BorderInlineKeyword | ColorValue)[];
    numberTypes: BorderInlinePropertyNumberType[];
  };
  'border-inline-end': {
    keywords: (BorderInlineEndKeyword | ColorValue)[];
    numberTypes: BorderInlineEndPropertyNumberType[];
  };
  'border-inline-start': {
    keywords: (BorderInlineStartKeyword | ColorValue)[];
    numberTypes: BorderInlineStartPropertyNumberType[];
  };
  'border-left': {
    keywords: (BorderLeftKeyword | ColorValue)[];
    numberTypes: BorderLeftPropertyNumberType[];
  };
  'border-left-color': {
    keywords: (BorderLeftColorKeyword | ColorValue)[];
    numberTypes: BorderLeftColorPropertyNumberType[];
  };
  'border-left-style': {
    keywords: BorderLeftStyleKeyword[];
    numberTypes: never[];
  };
  'border-left-width': {
    keywords: BorderLeftWidthKeyword[];
    numberTypes: BorderLeftWidthPropertyNumberType[];
  };
  'border-radius': {
    keywords: never[];
    numberTypes: BorderRadiusPropertyNumberType[];
  };
  'border-right': {
    keywords: (BorderRightKeyword | ColorValue)[];
    numberTypes: BorderRightPropertyNumberType[];
  };
  'border-right-color': {
    keywords: (BorderRightColorKeyword | ColorValue)[];
    numberTypes: BorderRightColorPropertyNumberType[];
  };
  'border-right-style': {
    keywords: BorderRightStyleKeyword[];
    numberTypes: never[];
  };
  'border-right-width': {
    keywords: BorderRightWidthKeyword[];
    numberTypes: BorderRightWidthPropertyNumberType[];
  };
  'border-spacing': {
    keywords: never[];
    numberTypes: BorderSpacingPropertyNumberType[];
  };
  'border-start-end-radius': {
    keywords: never[];
    numberTypes: BorderStartEndRadiusPropertyNumberType[];
  };
  'border-start-start-radius': {
    keywords: never[];
    numberTypes: BorderStartStartRadiusPropertyNumberType[];
  };
  'border-style': {
    keywords: BorderStyleKeyword[];
    numberTypes: never[];
  };
  'border-top': {
    keywords: (BorderTopKeyword | ColorValue)[];
    numberTypes: BorderTopPropertyNumberType[];
  };
  'border-top-color': {
    keywords: (BorderTopColorKeyword | ColorValue)[];
    numberTypes: BorderTopColorPropertyNumberType[];
  };
  'border-top-left-radius': {
    keywords: never[];
    numberTypes: BorderTopLeftRadiusPropertyNumberType[];
  };
  'border-top-right-radius': {
    keywords: never[];
    numberTypes: BorderTopRightRadiusPropertyNumberType[];
  };
  'border-top-style': {
    keywords: BorderTopStyleKeyword[];
    numberTypes: never[];
  };
  'border-top-width': {
    keywords: BorderTopWidthKeyword[];
    numberTypes: BorderTopWidthPropertyNumberType[];
  };
  'border-width': {
    keywords: BorderWidthKeyword[];
    numberTypes: BorderWidthPropertyNumberType[];
  };
  'bottom': {
    keywords: BottomKeyword[];
    numberTypes: BottomPropertyNumberType[];
  };
  'box-align': {
    keywords: BoxAlignKeyword[];
    numberTypes: never[];
  };
  'box-decoration-break': {
    keywords: BoxDecorationBreakKeyword[];
    numberTypes: never[];
  };
  'box-direction': {
    keywords: BoxDirectionKeyword[];
    numberTypes: never[];
  };
  'box-flex': {
    keywords: never[];
    numberTypes: BoxFlexPropertyNumberType[];
  };
  'box-flex-group': {
    keywords: never[];
    numberTypes: BoxFlexGroupPropertyNumberType[];
  };
  'box-lines': {
    keywords: BoxLinesKeyword[];
    numberTypes: never[];
  };
  'box-ordinal-group': {
    keywords: never[];
    numberTypes: BoxOrdinalGroupPropertyNumberType[];
  };
  'box-orient': {
    keywords: BoxOrientKeyword[];
    numberTypes: never[];
  };
  'box-pack': {
    keywords: BoxPackKeyword[];
    numberTypes: never[];
  };
  'box-shadow': {
    keywords: (BoxShadowKeyword | ColorValue)[];
    numberTypes: BoxShadowPropertyNumberType[];
  };
  'box-sizing': {
    keywords: BoxSizingKeyword[];
    numberTypes: never[];
  };
  'break-after': {
    keywords: BreakAfterKeyword[];
    numberTypes: never[];
  };
  'break-before': {
    keywords: BreakBeforeKeyword[];
    numberTypes: never[];
  };
  'break-inside': {
    keywords: BreakInsideKeyword[];
    numberTypes: never[];
  };
  'caption-side': {
    keywords: CaptionSideKeyword[];
    numberTypes: never[];
  };
  'caret-color': {
    keywords: (CaretColorKeyword | ColorValue)[];
    numberTypes: CaretColorPropertyNumberType[];
  };
  'caret-shape': {
    keywords: CaretShapeKeyword[];
    numberTypes: never[];
  };
  'clear': {
    keywords: ClearKeyword[];
    numberTypes: never[];
  };
  'clip': {
    keywords: ClipKeyword[];
    numberTypes: ClipPropertyNumberType[];
  };
  'clip-path': {
    keywords: ClipPathKeyword[];
    numberTypes: ClipPathPropertyNumberType[];
  };
  'clip-rule': {
    keywords: ClipRuleKeyword[];
    numberTypes: never[];
  };
  'color': {
    keywords: (ColorKeyword | ColorValue)[];
    numberTypes: ColorPropertyNumberType[];
  };
  'color-interpolation-filters': {
    keywords: ColorInterpolationFiltersKeyword[];
    numberTypes: never[];
  };
  'color-scheme': {
    keywords: ColorSchemeKeyword[];
    numberTypes: never[];
  };
  'column-count': {
    keywords: ColumnCountKeyword[];
    numberTypes: ColumnCountPropertyNumberType[];
  };
  'column-fill': {
    keywords: ColumnFillKeyword[];
    numberTypes: never[];
  };
  'column-gap': {
    keywords: ColumnGapKeyword[];
    numberTypes: ColumnGapPropertyNumberType[];
  };
  'column-rule-color': {
    keywords: (ColumnRuleColorKeyword | ColorValue)[];
    numberTypes: ColumnRuleColorPropertyNumberType[];
  };
  'column-span': {
    keywords: ColumnSpanKeyword[];
    numberTypes: never[];
  };
  'column-width': {
    keywords: ColumnWidthKeyword[];
    numberTypes: ColumnWidthPropertyNumberType[];
  };
  'contain': {
    keywords: ContainKeyword[];
    numberTypes: never[];
  };
  'contain-intrinsic-block-size': {
    keywords: ContainIntrinsicBlockSizeKeyword[];
    numberTypes: ContainIntrinsicBlockSizePropertyNumberType[];
  };
  'contain-intrinsic-height': {
    keywords: ContainIntrinsicHeightKeyword[];
    numberTypes: ContainIntrinsicHeightPropertyNumberType[];
  };
  'contain-intrinsic-inline-size': {
    keywords: ContainIntrinsicInlineSizeKeyword[];
    numberTypes: ContainIntrinsicInlineSizePropertyNumberType[];
  };
  'contain-intrinsic-size': {
    keywords: ContainIntrinsicSizeKeyword[];
    numberTypes: ContainIntrinsicSizePropertyNumberType[];
  };
  'contain-intrinsic-width': {
    keywords: ContainIntrinsicWidthKeyword[];
    numberTypes: ContainIntrinsicWidthPropertyNumberType[];
  };
  'container-name': {
    keywords: ContainerNameKeyword[];
    numberTypes: never[];
  };
  'container-type': {
    keywords: ContainerTypeKeyword[];
    numberTypes: never[];
  };
  'content': {
    keywords: (ContentKeyword | ColorValue)[];
    numberTypes: ContentPropertyNumberType[];
  };
  'content-visibility': {
    keywords: ContentVisibilityKeyword[];
    numberTypes: never[];
  };
  'counter-increment': {
    keywords: CounterIncrementKeyword[];
    numberTypes: CounterIncrementPropertyNumberType[];
  };
  'counter-reset': {
    keywords: CounterResetKeyword[];
    numberTypes: CounterResetPropertyNumberType[];
  };
  'counter-set': {
    keywords: CounterSetKeyword[];
    numberTypes: CounterSetPropertyNumberType[];
  };
  'cue-after': {
    keywords: CueAfterKeyword[];
    numberTypes: never[];
  };
  'cue-before': {
    keywords: CueBeforeKeyword[];
    numberTypes: never[];
  };
  'cursor': {
    keywords: CursorKeyword[];
    numberTypes: CursorPropertyNumberType[];
  };
  'cx': {
    keywords: never[];
    numberTypes: CxPropertyNumberType[];
  };
  'cy': {
    keywords: never[];
    numberTypes: CyPropertyNumberType[];
  };
  'd': {
    keywords: DKeyword[];
    numberTypes: never[];
  };
  'direction': {
    keywords: DirectionKeyword[];
    numberTypes: never[];
  };
  'display': {
    keywords: DisplayKeyword[];
    numberTypes: never[];
  };
  'dominant-baseline': {
    keywords: DominantBaselineKeyword[];
    numberTypes: never[];
  };
  'empty-cells': {
    keywords: EmptyCellsKeyword[];
    numberTypes: never[];
  };
  'field-sizing': {
    keywords: FieldSizingKeyword[];
    numberTypes: never[];
  };
  'fill': {
    keywords: (FillKeyword | ColorValue)[];
    numberTypes: FillPropertyNumberType[];
  };
  'fill-opacity': {
    keywords: never[];
    numberTypes: FillOpacityPropertyNumberType[];
  };
  'fill-rule': {
    keywords: FillRuleKeyword[];
    numberTypes: never[];
  };
  'filter': {
    keywords: (FilterKeyword | ColorValue)[];
    numberTypes: FilterPropertyNumberType[];
  };
  'flex': {
    keywords: FlexKeyword[];
    numberTypes: never[];
  };
  'flex-basis': {
    keywords: FlexBasisKeyword[];
    numberTypes: never[];
  };
  'flex-direction': {
    keywords: FlexDirectionKeyword[];
    numberTypes: never[];
  };
  'flex-grow': {
    keywords: never[];
    numberTypes: FlexGrowPropertyNumberType[];
  };
  'flex-shrink': {
    keywords: never[];
    numberTypes: FlexShrinkPropertyNumberType[];
  };
  'flex-wrap': {
    keywords: FlexWrapKeyword[];
    numberTypes: never[];
  };
  'float': {
    keywords: FloatKeyword[];
    numberTypes: never[];
  };
  'font': {
    keywords: FontKeyword[];
    numberTypes: never[];
  };
  'font-family': {
    keywords: FontFamilyKeyword[];
    numberTypes: never[];
  };
  'font-feature-settings': {
    keywords: FontFeatureSettingsKeyword[];
    numberTypes: FontFeatureSettingsPropertyNumberType[];
  };
  'font-kerning': {
    keywords: FontKerningKeyword[];
    numberTypes: never[];
  };
  'font-language-override': {
    keywords: FontLanguageOverrideKeyword[];
    numberTypes: never[];
  };
  'font-optical-sizing': {
    keywords: FontOpticalSizingKeyword[];
    numberTypes: never[];
  };
  'font-palette': {
    keywords: FontPaletteKeyword[];
    numberTypes: never[];
  };
  'font-size': {
    keywords: FontSizeKeyword[];
    numberTypes: FontSizePropertyNumberType[];
  };
  'font-size-adjust': {
    keywords: FontSizeAdjustKeyword[];
    numberTypes: FontSizeAdjustPropertyNumberType[];
  };
  'font-smooth': {
    keywords: FontSmoothKeyword[];
    numberTypes: FontSmoothPropertyNumberType[];
  };
  'font-stretch': {
    keywords: FontStretchKeyword[];
    numberTypes: FontStretchPropertyNumberType[];
  };
  'font-style': {
    keywords: FontStyleKeyword[];
    numberTypes: FontStylePropertyNumberType[];
  };
  'font-synthesis': {
    keywords: FontSynthesisKeyword[];
    numberTypes: never[];
  };
  'font-synthesis-position': {
    keywords: FontSynthesisPositionKeyword[];
    numberTypes: never[];
  };
  'font-synthesis-small-caps': {
    keywords: FontSynthesisSmallCapsKeyword[];
    numberTypes: never[];
  };
  'font-synthesis-style': {
    keywords: FontSynthesisStyleKeyword[];
    numberTypes: never[];
  };
  'font-synthesis-weight': {
    keywords: FontSynthesisWeightKeyword[];
    numberTypes: never[];
  };
  'font-variant': {
    keywords: FontVariantKeyword[];
    numberTypes: never[];
  };
  'font-variant-alternates': {
    keywords: FontVariantAlternatesKeyword[];
    numberTypes: never[];
  };
  'font-variant-caps': {
    keywords: FontVariantCapsKeyword[];
    numberTypes: never[];
  };
  'font-variant-east-asian': {
    keywords: FontVariantEastAsianKeyword[];
    numberTypes: never[];
  };
  'font-variant-emoji': {
    keywords: FontVariantEmojiKeyword[];
    numberTypes: never[];
  };
  'font-variant-ligatures': {
    keywords: FontVariantLigaturesKeyword[];
    numberTypes: never[];
  };
  'font-variant-numeric': {
    keywords: FontVariantNumericKeyword[];
    numberTypes: never[];
  };
  'font-variant-position': {
    keywords: FontVariantPositionKeyword[];
    numberTypes: never[];
  };
  'font-variation-settings': {
    keywords: FontVariationSettingsKeyword[];
    numberTypes: FontVariationSettingsPropertyNumberType[];
  };
  'font-weight': {
    keywords: FontWeightKeyword[];
    numberTypes: FontWeightPropertyNumberType[];
  };
  'forced-color-adjust': {
    keywords: ForcedColorAdjustKeyword[];
    numberTypes: never[];
  };
  'glyph-orientation-horizontal': {
    keywords: never[];
    numberTypes: GlyphOrientationHorizontalPropertyNumberType[];
  };
  'glyph-orientation-vertical': {
    keywords: never[];
    numberTypes: GlyphOrientationVerticalPropertyNumberType[];
  };
  'grid': {
    keywords: GridKeyword[];
    numberTypes: never[];
  };
  'grid-area': {
    keywords: GridAreaKeyword[];
    numberTypes: GridAreaPropertyNumberType[];
  };
  'grid-auto-columns': {
    keywords: GridAutoColumnsKeyword[];
    numberTypes: GridAutoColumnsPropertyNumberType[];
  };
  'grid-auto-flow': {
    keywords: GridAutoFlowKeyword[];
    numberTypes: never[];
  };
  'grid-auto-rows': {
    keywords: GridAutoRowsKeyword[];
    numberTypes: GridAutoRowsPropertyNumberType[];
  };
  'grid-column': {
    keywords: GridColumnKeyword[];
    numberTypes: GridColumnPropertyNumberType[];
  };
  'grid-column-end': {
    keywords: GridColumnEndKeyword[];
    numberTypes: GridColumnEndPropertyNumberType[];
  };
  'grid-column-gap': {
    keywords: never[];
    numberTypes: GridColumnGapPropertyNumberType[];
  };
  'grid-column-start': {
    keywords: GridColumnStartKeyword[];
    numberTypes: GridColumnStartPropertyNumberType[];
  };
  'grid-row': {
    keywords: GridRowKeyword[];
    numberTypes: GridRowPropertyNumberType[];
  };
  'grid-row-end': {
    keywords: GridRowEndKeyword[];
    numberTypes: GridRowEndPropertyNumberType[];
  };
  'grid-row-gap': {
    keywords: never[];
    numberTypes: GridRowGapPropertyNumberType[];
  };
  'grid-row-start': {
    keywords: GridRowStartKeyword[];
    numberTypes: GridRowStartPropertyNumberType[];
  };
  'grid-template': {
    keywords: GridTemplateKeyword[];
    numberTypes: GridTemplatePropertyNumberType[];
  };
  'grid-template-areas': {
    keywords: GridTemplateAreasKeyword[];
    numberTypes: never[];
  };
  'grid-template-columns': {
    keywords: GridTemplateColumnsKeyword[];
    numberTypes: GridTemplateColumnsPropertyNumberType[];
  };
  'grid-template-rows': {
    keywords: GridTemplateRowsKeyword[];
    numberTypes: GridTemplateRowsPropertyNumberType[];
  };
  'hanging-punctuation': {
    keywords: HangingPunctuationKeyword[];
    numberTypes: never[];
  };
  'height': {
    keywords: HeightKeyword[];
    numberTypes: HeightPropertyNumberType[];
  };
  'hyphenate-character': {
    keywords: HyphenateCharacterKeyword[];
    numberTypes: never[];
  };
  'hyphenate-limit-chars': {
    keywords: HyphenateLimitCharsKeyword[];
    numberTypes: HyphenateLimitCharsPropertyNumberType[];
  };
  'hyphens': {
    keywords: HyphensKeyword[];
    numberTypes: never[];
  };
  'image-orientation': {
    keywords: ImageOrientationKeyword[];
    numberTypes: ImageOrientationPropertyNumberType[];
  };
  'image-rendering': {
    keywords: ImageRenderingKeyword[];
    numberTypes: never[];
  };
  'image-resolution': {
    keywords: ImageResolutionKeyword[];
    numberTypes: ImageResolutionPropertyNumberType[];
  };
  'ime-mode': {
    keywords: ImeModeKeyword[];
    numberTypes: never[];
  };
  'initial-letter': {
    keywords: InitialLetterKeyword[];
    numberTypes: InitialLetterPropertyNumberType[];
  };
  'initial-letter-align': {
    keywords: InitialLetterAlignKeyword[];
    numberTypes: never[];
  };
  'input-security': {
    keywords: InputSecurityKeyword[];
    numberTypes: never[];
  };
  'interpolate-size': {
    keywords: InterpolateSizeKeyword[];
    numberTypes: never[];
  };
  'isolation': {
    keywords: IsolationKeyword[];
    numberTypes: never[];
  };
  'justify-content': {
    keywords: JustifyContentKeyword[];
    numberTypes: never[];
  };
  'justify-items': {
    keywords: JustifyItemsKeyword[];
    numberTypes: never[];
  };
  'justify-self': {
    keywords: JustifySelfKeyword[];
    numberTypes: never[];
  };
  'justify-tracks': {
    keywords: JustifyTracksKeyword[];
    numberTypes: never[];
  };
  'kerning': {
    keywords: KerningKeyword[];
    numberTypes: KerningPropertyNumberType[];
  };
  'left': {
    keywords: LeftKeyword[];
    numberTypes: LeftPropertyNumberType[];
  };
  'letter-spacing': {
    keywords: LetterSpacingKeyword[];
    numberTypes: LetterSpacingPropertyNumberType[];
  };
  'line-break': {
    keywords: LineBreakKeyword[];
    numberTypes: never[];
  };
  'line-clamp': {
    keywords: LineClampKeyword[];
    numberTypes: LineClampPropertyNumberType[];
  };
  'line-height': {
    keywords: LineHeightKeyword[];
    numberTypes: LineHeightPropertyNumberType[];
  };
  'line-height-step': {
    keywords: never[];
    numberTypes: LineHeightStepPropertyNumberType[];
  };
  'list-style-image': {
    keywords: (ListStyleImageKeyword | ColorValue)[];
    numberTypes: ListStyleImagePropertyNumberType[];
  };
  'list-style-position': {
    keywords: ListStylePositionKeyword[];
    numberTypes: never[];
  };
  'list-style-type': {
    keywords: ListStyleTypeKeyword[];
    numberTypes: never[];
  };
  'margin': {
    keywords: MarginKeyword[];
    numberTypes: MarginPropertyNumberType[];
  };
  'margin-bottom': {
    keywords: MarginBottomKeyword[];
    numberTypes: MarginBottomPropertyNumberType[];
  };
  'margin-left': {
    keywords: MarginLeftKeyword[];
    numberTypes: MarginLeftPropertyNumberType[];
  };
  'margin-right': {
    keywords: MarginRightKeyword[];
    numberTypes: MarginRightPropertyNumberType[];
  };
  'margin-top': {
    keywords: MarginTopKeyword[];
    numberTypes: MarginTopPropertyNumberType[];
  };
  'margin-trim': {
    keywords: MarginTrimKeyword[];
    numberTypes: never[];
  };
  'marker': {
    keywords: MarkerKeyword[];
    numberTypes: never[];
  };
  'marker-end': {
    keywords: MarkerEndKeyword[];
    numberTypes: never[];
  };
  'marker-mid': {
    keywords: MarkerMidKeyword[];
    numberTypes: never[];
  };
  'marker-start': {
    keywords: MarkerStartKeyword[];
    numberTypes: never[];
  };
  'mask': {
    keywords: (MaskKeyword | ColorValue)[];
    numberTypes: MaskPropertyNumberType[];
  };
  'mask-border-mode': {
    keywords: MaskBorderModeKeyword[];
    numberTypes: never[];
  };
  'mask-border-outset': {
    keywords: never[];
    numberTypes: MaskBorderOutsetPropertyNumberType[];
  };
  'mask-border-repeat': {
    keywords: MaskBorderRepeatKeyword[];
    numberTypes: never[];
  };
  'mask-border-slice': {
    keywords: MaskBorderSliceKeyword[];
    numberTypes: MaskBorderSlicePropertyNumberType[];
  };
  'mask-border-source': {
    keywords: (MaskBorderSourceKeyword | ColorValue)[];
    numberTypes: MaskBorderSourcePropertyNumberType[];
  };
  'mask-border-width': {
    keywords: MaskBorderWidthKeyword[];
    numberTypes: MaskBorderWidthPropertyNumberType[];
  };
  'mask-clip': {
    keywords: MaskClipKeyword[];
    numberTypes: never[];
  };
  'mask-composite': {
    keywords: MaskCompositeKeyword[];
    numberTypes: never[];
  };
  'mask-image': {
    keywords: (MaskImageKeyword | ColorValue)[];
    numberTypes: MaskImagePropertyNumberType[];
  };
  'mask-mode': {
    keywords: MaskModeKeyword[];
    numberTypes: never[];
  };
  'mask-origin': {
    keywords: MaskOriginKeyword[];
    numberTypes: never[];
  };
  'mask-position': {
    keywords: MaskPositionKeyword[];
    numberTypes: MaskPositionPropertyNumberType[];
  };
  'mask-repeat': {
    keywords: MaskRepeatKeyword[];
    numberTypes: never[];
  };
  'mask-size': {
    keywords: MaskSizeKeyword[];
    numberTypes: MaskSizePropertyNumberType[];
  };
  'mask-type': {
    keywords: MaskTypeKeyword[];
    numberTypes: never[];
  };
  'masonry-auto-flow': {
    keywords: MasonryAutoFlowKeyword[];
    numberTypes: never[];
  };
  'math-depth': {
    keywords: MathDepthKeyword[];
    numberTypes: MathDepthPropertyNumberType[];
  };
  'math-shift': {
    keywords: MathShiftKeyword[];
    numberTypes: never[];
  };
  'math-style': {
    keywords: MathStyleKeyword[];
    numberTypes: never[];
  };
  'max-height': {
    keywords: MaxHeightKeyword[];
    numberTypes: MaxHeightPropertyNumberType[];
  };
  'max-lines': {
    keywords: MaxLinesKeyword[];
    numberTypes: MaxLinesPropertyNumberType[];
  };
  'max-width': {
    keywords: MaxWidthKeyword[];
    numberTypes: MaxWidthPropertyNumberType[];
  };
  'min-height': {
    keywords: MinHeightKeyword[];
    numberTypes: MinHeightPropertyNumberType[];
  };
  'min-width': {
    keywords: MinWidthKeyword[];
    numberTypes: MinWidthPropertyNumberType[];
  };
  'mix-blend-mode': {
    keywords: MixBlendModeKeyword[];
    numberTypes: never[];
  };
  'object-fit': {
    keywords: ObjectFitKeyword[];
    numberTypes: never[];
  };
  'object-position': {
    keywords: ObjectPositionKeyword[];
    numberTypes: ObjectPositionPropertyNumberType[];
  };
  'offset-anchor': {
    keywords: OffsetAnchorKeyword[];
    numberTypes: OffsetAnchorPropertyNumberType[];
  };
  'offset-distance': {
    keywords: never[];
    numberTypes: OffsetDistancePropertyNumberType[];
  };
  'offset-path': {
    keywords: OffsetPathKeyword[];
    numberTypes: OffsetPathPropertyNumberType[];
  };
  'offset-position': {
    keywords: OffsetPositionKeyword[];
    numberTypes: OffsetPositionPropertyNumberType[];
  };
  'offset-rotate': {
    keywords: OffsetRotateKeyword[];
    numberTypes: OffsetRotatePropertyNumberType[];
  };
  'opacity': {
    keywords: never[];
    numberTypes: OpacityPropertyNumberType[];
  };
  'order': {
    keywords: never[];
    numberTypes: OrderPropertyNumberType[];
  };
  'orphans': {
    keywords: never[];
    numberTypes: OrphansPropertyNumberType[];
  };
  'outline-color': {
    keywords: (OutlineColorKeyword | ColorValue)[];
    numberTypes: OutlineColorPropertyNumberType[];
  };
  'outline-offset': {
    keywords: never[];
    numberTypes: OutlineOffsetPropertyNumberType[];
  };
  'outline-style': {
    keywords: OutlineStyleKeyword[];
    numberTypes: never[];
  };
  'outline-width': {
    keywords: OutlineWidthKeyword[];
    numberTypes: OutlineWidthPropertyNumberType[];
  };
  'overflow': {
    keywords: OverflowKeyword[];
    numberTypes: never[];
  };
  'overflow-anchor': {
    keywords: OverflowAnchorKeyword[];
    numberTypes: never[];
  };
  'overflow-block': {
    keywords: OverflowBlockKeyword[];
    numberTypes: never[];
  };
  'overflow-clip-box': {
    keywords: OverflowClipBoxKeyword[];
    numberTypes: never[];
  };
  'overflow-clip-margin': {
    keywords: OverflowClipMarginKeyword[];
    numberTypes: OverflowClipMarginPropertyNumberType[];
  };
  'overflow-inline': {
    keywords: OverflowInlineKeyword[];
    numberTypes: never[];
  };
  'overflow-wrap': {
    keywords: OverflowWrapKeyword[];
    numberTypes: never[];
  };
  'overflow-x': {
    keywords: OverflowXKeyword[];
    numberTypes: never[];
  };
  'overflow-y': {
    keywords: OverflowYKeyword[];
    numberTypes: never[];
  };
  'overlay': {
    keywords: OverlayKeyword[];
    numberTypes: never[];
  };
  'overscroll-behavior': {
    keywords: OverscrollBehaviorKeyword[];
    numberTypes: never[];
  };
  'overscroll-behavior-block': {
    keywords: OverscrollBehaviorBlockKeyword[];
    numberTypes: never[];
  };
  'overscroll-behavior-inline': {
    keywords: OverscrollBehaviorInlineKeyword[];
    numberTypes: never[];
  };
  'overscroll-behavior-x': {
    keywords: OverscrollBehaviorXKeyword[];
    numberTypes: never[];
  };
  'overscroll-behavior-y': {
    keywords: OverscrollBehaviorYKeyword[];
    numberTypes: never[];
  };
  'padding': {
    keywords: never[];
    numberTypes: PaddingPropertyNumberType[];
  };
  'padding-bottom': {
    keywords: never[];
    numberTypes: PaddingBottomPropertyNumberType[];
  };
  'padding-left': {
    keywords: never[];
    numberTypes: PaddingLeftPropertyNumberType[];
  };
  'padding-right': {
    keywords: never[];
    numberTypes: PaddingRightPropertyNumberType[];
  };
  'padding-top': {
    keywords: never[];
    numberTypes: PaddingTopPropertyNumberType[];
  };
  'page': {
    keywords: PageKeyword[];
    numberTypes: never[];
  };
  'page-break-after': {
    keywords: PageBreakAfterKeyword[];
    numberTypes: never[];
  };
  'page-break-before': {
    keywords: PageBreakBeforeKeyword[];
    numberTypes: never[];
  };
  'page-break-inside': {
    keywords: PageBreakInsideKeyword[];
    numberTypes: never[];
  };
  'paint-order': {
    keywords: PaintOrderKeyword[];
    numberTypes: never[];
  };
  'pause-after': {
    keywords: PauseAfterKeyword[];
    numberTypes: PauseAfterPropertyNumberType[];
  };
  'pause-before': {
    keywords: PauseBeforeKeyword[];
    numberTypes: PauseBeforePropertyNumberType[];
  };
  'perspective': {
    keywords: PerspectiveKeyword[];
    numberTypes: PerspectivePropertyNumberType[];
  };
  'perspective-origin': {
    keywords: PerspectiveOriginKeyword[];
    numberTypes: PerspectiveOriginPropertyNumberType[];
  };
  'pointer-events': {
    keywords: PointerEventsKeyword[];
    numberTypes: never[];
  };
  'position': {
    keywords: PositionKeyword[];
    numberTypes: never[];
  };
  'position-anchor': {
    keywords: PositionAnchorKeyword[];
    numberTypes: never[];
  };
  'position-area': {
    keywords: PositionAreaKeyword[];
    numberTypes: never[];
  };
  'position-try-fallbacks': {
    keywords: PositionTryFallbacksKeyword[];
    numberTypes: never[];
  };
  'position-try-order': {
    keywords: PositionTryOrderKeyword[];
    numberTypes: never[];
  };
  'position-visibility': {
    keywords: PositionVisibilityKeyword[];
    numberTypes: never[];
  };
  'print-color-adjust': {
    keywords: PrintColorAdjustKeyword[];
    numberTypes: never[];
  };
  'quotes': {
    keywords: QuotesKeyword[];
    numberTypes: never[];
  };
  'r': {
    keywords: never[];
    numberTypes: RPropertyNumberType[];
  };
  'resize': {
    keywords: ResizeKeyword[];
    numberTypes: never[];
  };
  'rest-after': {
    keywords: RestAfterKeyword[];
    numberTypes: RestAfterPropertyNumberType[];
  };
  'rest-before': {
    keywords: RestBeforeKeyword[];
    numberTypes: RestBeforePropertyNumberType[];
  };
  'right': {
    keywords: RightKeyword[];
    numberTypes: RightPropertyNumberType[];
  };
  'rotate': {
    keywords: RotateKeyword[];
    numberTypes: RotatePropertyNumberType[];
  };
  'row-gap': {
    keywords: RowGapKeyword[];
    numberTypes: RowGapPropertyNumberType[];
  };
  'ruby-align': {
    keywords: RubyAlignKeyword[];
    numberTypes: never[];
  };
  'ruby-merge': {
    keywords: RubyMergeKeyword[];
    numberTypes: never[];
  };
  'ruby-position': {
    keywords: RubyPositionKeyword[];
    numberTypes: never[];
  };
  'rx': {
    keywords: never[];
    numberTypes: RxPropertyNumberType[];
  };
  'ry': {
    keywords: never[];
    numberTypes: RyPropertyNumberType[];
  };
  'scale': {
    keywords: ScaleKeyword[];
    numberTypes: ScalePropertyNumberType[];
  };
  'scroll-behavior': {
    keywords: ScrollBehaviorKeyword[];
    numberTypes: never[];
  };
  'scroll-margin': {
    keywords: never[];
    numberTypes: ScrollMarginPropertyNumberType[];
  };
  'scroll-margin-block': {
    keywords: never[];
    numberTypes: ScrollMarginBlockPropertyNumberType[];
  };
  'scroll-margin-block-end': {
    keywords: never[];
    numberTypes: ScrollMarginBlockEndPropertyNumberType[];
  };
  'scroll-margin-block-start': {
    keywords: never[];
    numberTypes: ScrollMarginBlockStartPropertyNumberType[];
  };
  'scroll-margin-bottom': {
    keywords: never[];
    numberTypes: ScrollMarginBottomPropertyNumberType[];
  };
  'scroll-margin-inline': {
    keywords: never[];
    numberTypes: ScrollMarginInlinePropertyNumberType[];
  };
  'scroll-margin-inline-end': {
    keywords: never[];
    numberTypes: ScrollMarginInlineEndPropertyNumberType[];
  };
  'scroll-margin-inline-start': {
    keywords: never[];
    numberTypes: ScrollMarginInlineStartPropertyNumberType[];
  };
  'scroll-margin-left': {
    keywords: never[];
    numberTypes: ScrollMarginLeftPropertyNumberType[];
  };
  'scroll-margin-right': {
    keywords: never[];
    numberTypes: ScrollMarginRightPropertyNumberType[];
  };
  'scroll-margin-top': {
    keywords: never[];
    numberTypes: ScrollMarginTopPropertyNumberType[];
  };
  'scroll-padding': {
    keywords: ScrollPaddingKeyword[];
    numberTypes: ScrollPaddingPropertyNumberType[];
  };
  'scroll-padding-block': {
    keywords: ScrollPaddingBlockKeyword[];
    numberTypes: ScrollPaddingBlockPropertyNumberType[];
  };
  'scroll-padding-block-end': {
    keywords: ScrollPaddingBlockEndKeyword[];
    numberTypes: ScrollPaddingBlockEndPropertyNumberType[];
  };
  'scroll-padding-block-start': {
    keywords: ScrollPaddingBlockStartKeyword[];
    numberTypes: ScrollPaddingBlockStartPropertyNumberType[];
  };
  'scroll-padding-bottom': {
    keywords: ScrollPaddingBottomKeyword[];
    numberTypes: ScrollPaddingBottomPropertyNumberType[];
  };
  'scroll-padding-inline': {
    keywords: ScrollPaddingInlineKeyword[];
    numberTypes: ScrollPaddingInlinePropertyNumberType[];
  };
  'scroll-padding-inline-end': {
    keywords: ScrollPaddingInlineEndKeyword[];
    numberTypes: ScrollPaddingInlineEndPropertyNumberType[];
  };
  'scroll-padding-inline-start': {
    keywords: ScrollPaddingInlineStartKeyword[];
    numberTypes: ScrollPaddingInlineStartPropertyNumberType[];
  };
  'scroll-padding-left': {
    keywords: ScrollPaddingLeftKeyword[];
    numberTypes: ScrollPaddingLeftPropertyNumberType[];
  };
  'scroll-padding-right': {
    keywords: ScrollPaddingRightKeyword[];
    numberTypes: ScrollPaddingRightPropertyNumberType[];
  };
  'scroll-padding-top': {
    keywords: ScrollPaddingTopKeyword[];
    numberTypes: ScrollPaddingTopPropertyNumberType[];
  };
  'scroll-snap-align': {
    keywords: ScrollSnapAlignKeyword[];
    numberTypes: never[];
  };
  'scroll-snap-coordinate': {
    keywords: ScrollSnapCoordinateKeyword[];
    numberTypes: ScrollSnapCoordinatePropertyNumberType[];
  };
  'scroll-snap-destination': {
    keywords: ScrollSnapDestinationKeyword[];
    numberTypes: ScrollSnapDestinationPropertyNumberType[];
  };
  'scroll-snap-points-x': {
    keywords: ScrollSnapPointsXKeyword[];
    numberTypes: ScrollSnapPointsXPropertyNumberType[];
  };
  'scroll-snap-points-y': {
    keywords: ScrollSnapPointsYKeyword[];
    numberTypes: ScrollSnapPointsYPropertyNumberType[];
  };
  'scroll-snap-stop': {
    keywords: ScrollSnapStopKeyword[];
    numberTypes: never[];
  };
  'scroll-snap-type': {
    keywords: ScrollSnapTypeKeyword[];
    numberTypes: never[];
  };
  'scroll-snap-type-x': {
    keywords: ScrollSnapTypeXKeyword[];
    numberTypes: never[];
  };
  'scroll-snap-type-y': {
    keywords: ScrollSnapTypeYKeyword[];
    numberTypes: never[];
  };
  'scroll-timeline-axis': {
    keywords: ScrollTimelineAxisKeyword[];
    numberTypes: never[];
  };
  'scroll-timeline-name': {
    keywords: ScrollTimelineNameKeyword[];
    numberTypes: never[];
  };
  'scrollbar-color': {
    keywords: (ScrollbarColorKeyword | ColorValue)[];
    numberTypes: ScrollbarColorPropertyNumberType[];
  };
  'scrollbar-gutter': {
    keywords: ScrollbarGutterKeyword[];
    numberTypes: never[];
  };
  'scrollbar-width': {
    keywords: ScrollbarWidthKeyword[];
    numberTypes: never[];
  };
  'shape-image-threshold': {
    keywords: never[];
    numberTypes: ShapeImageThresholdPropertyNumberType[];
  };
  'shape-margin': {
    keywords: never[];
    numberTypes: ShapeMarginPropertyNumberType[];
  };
  'shape-outside': {
    keywords: (ShapeOutsideKeyword | ColorValue)[];
    numberTypes: ShapeOutsidePropertyNumberType[];
  };
  'shape-rendering': {
    keywords: ShapeRenderingKeyword[];
    numberTypes: never[];
  };
  'speak': {
    keywords: SpeakKeyword[];
    numberTypes: never[];
  };
  'speak-as': {
    keywords: SpeakAsKeyword[];
    numberTypes: never[];
  };
  'stroke': {
    keywords: (StrokeKeyword | ColorValue)[];
    numberTypes: StrokePropertyNumberType[];
  };
  'stroke-dasharray': {
    keywords: StrokeDasharrayKeyword[];
    numberTypes: StrokeDasharrayPropertyNumberType[];
  };
  'stroke-dashoffset': {
    keywords: never[];
    numberTypes: StrokeDashoffsetPropertyNumberType[];
  };
  'stroke-linecap': {
    keywords: StrokeLinecapKeyword[];
    numberTypes: never[];
  };
  'stroke-linejoin': {
    keywords: StrokeLinejoinKeyword[];
    numberTypes: never[];
  };
  'stroke-miterlimit': {
    keywords: never[];
    numberTypes: StrokeMiterlimitPropertyNumberType[];
  };
  'stroke-width': {
    keywords: never[];
    numberTypes: StrokeWidthPropertyNumberType[];
  };
  'tab-size': {
    keywords: never[];
    numberTypes: TabSizePropertyNumberType[];
  };
  'table-layout': {
    keywords: TableLayoutKeyword[];
    numberTypes: never[];
  };
  'text-align': {
    keywords: TextAlignKeyword[];
    numberTypes: never[];
  };
  'text-align-last': {
    keywords: TextAlignLastKeyword[];
    numberTypes: never[];
  };
  'text-anchor': {
    keywords: TextAnchorKeyword[];
    numberTypes: never[];
  };
  'text-combine-upright': {
    keywords: TextCombineUprightKeyword[];
    numberTypes: TextCombineUprightPropertyNumberType[];
  };
  'text-decoration-color': {
    keywords: (TextDecorationColorKeyword | ColorValue)[];
    numberTypes: TextDecorationColorPropertyNumberType[];
  };
  'text-decoration-line': {
    keywords: TextDecorationLineKeyword[];
    numberTypes: never[];
  };
  'text-decoration-skip': {
    keywords: TextDecorationSkipKeyword[];
    numberTypes: never[];
  };
  'text-decoration-skip-ink': {
    keywords: TextDecorationSkipInkKeyword[];
    numberTypes: never[];
  };
  'text-decoration-style': {
    keywords: TextDecorationStyleKeyword[];
    numberTypes: never[];
  };
  'text-decoration-thickness': {
    keywords: TextDecorationThicknessKeyword[];
    numberTypes: TextDecorationThicknessPropertyNumberType[];
  };
  'text-emphasis-color': {
    keywords: (TextEmphasisColorKeyword | ColorValue)[];
    numberTypes: TextEmphasisColorPropertyNumberType[];
  };
  'text-emphasis-position': {
    keywords: TextEmphasisPositionKeyword[];
    numberTypes: never[];
  };
  'text-emphasis-style': {
    keywords: TextEmphasisStyleKeyword[];
    numberTypes: never[];
  };
  'text-indent': {
    keywords: TextIndentKeyword[];
    numberTypes: TextIndentPropertyNumberType[];
  };
  'text-justify': {
    keywords: TextJustifyKeyword[];
    numberTypes: never[];
  };
  'text-orientation': {
    keywords: TextOrientationKeyword[];
    numberTypes: never[];
  };
  'text-overflow': {
    keywords: TextOverflowKeyword[];
    numberTypes: never[];
  };
  'text-rendering': {
    keywords: TextRenderingKeyword[];
    numberTypes: never[];
  };
  'text-shadow': {
    keywords: (TextShadowKeyword | ColorValue)[];
    numberTypes: TextShadowPropertyNumberType[];
  };
  'text-size-adjust': {
    keywords: TextSizeAdjustKeyword[];
    numberTypes: TextSizeAdjustPropertyNumberType[];
  };
  'text-spacing-trim': {
    keywords: TextSpacingTrimKeyword[];
    numberTypes: never[];
  };
  'text-transform': {
    keywords: TextTransformKeyword[];
    numberTypes: never[];
  };
  'text-underline-offset': {
    keywords: TextUnderlineOffsetKeyword[];
    numberTypes: TextUnderlineOffsetPropertyNumberType[];
  };
  'text-underline-position': {
    keywords: TextUnderlinePositionKeyword[];
    numberTypes: never[];
  };
  'text-wrap-mode': {
    keywords: TextWrapModeKeyword[];
    numberTypes: never[];
  };
  'text-wrap-style': {
    keywords: TextWrapStyleKeyword[];
    numberTypes: never[];
  };
  'timeline-scope': {
    keywords: TimelineScopeKeyword[];
    numberTypes: never[];
  };
  'top': {
    keywords: TopKeyword[];
    numberTypes: TopPropertyNumberType[];
  };
  'touch-action': {
    keywords: TouchActionKeyword[];
    numberTypes: never[];
  };
  'transform': {
    keywords: TransformKeyword[];
    numberTypes: TransformPropertyNumberType[];
  };
  'transform-box': {
    keywords: TransformBoxKeyword[];
    numberTypes: never[];
  };
  'transform-origin': {
    keywords: TransformOriginKeyword[];
    numberTypes: TransformOriginPropertyNumberType[];
  };
  'transform-style': {
    keywords: TransformStyleKeyword[];
    numberTypes: never[];
  };
  'transition': {
    keywords: TransitionKeyword[];
    numberTypes: TransitionPropertyNumberType[];
  };
  'transition-behavior': {
    keywords: TransitionBehaviorKeyword[];
    numberTypes: never[];
  };
  'transition-delay': {
    keywords: never[];
    numberTypes: TransitionDelayPropertyNumberType[];
  };
  'transition-duration': {
    keywords: never[];
    numberTypes: TransitionDurationPropertyNumberType[];
  };
  'transition-property': {
    keywords: TransitionPropertyKeyword[];
    numberTypes: never[];
  };
  'transition-timing-function': {
    keywords: TransitionTimingFunctionKeyword[];
    numberTypes: TransitionTimingFunctionPropertyNumberType[];
  };
  'translate': {
    keywords: TranslateKeyword[];
    numberTypes: TranslatePropertyNumberType[];
  };
  'unicode-bidi': {
    keywords: UnicodeBidiKeyword[];
    numberTypes: never[];
  };
  'user-select': {
    keywords: UserSelectKeyword[];
    numberTypes: never[];
  };
  'vector-effect': {
    keywords: VectorEffectKeyword[];
    numberTypes: never[];
  };
  'vertical-align': {
    keywords: VerticalAlignKeyword[];
    numberTypes: VerticalAlignPropertyNumberType[];
  };
  'view-timeline-axis': {
    keywords: ViewTimelineAxisKeyword[];
    numberTypes: never[];
  };
  'view-timeline-inset': {
    keywords: ViewTimelineInsetKeyword[];
    numberTypes: ViewTimelineInsetPropertyNumberType[];
  };
  'view-timeline-name': {
    keywords: ViewTimelineNameKeyword[];
    numberTypes: never[];
  };
  'view-transition-name': {
    keywords: ViewTransitionNameKeyword[];
    numberTypes: never[];
  };
  'visibility': {
    keywords: VisibilityKeyword[];
    numberTypes: never[];
  };
  'voice-balance': {
    keywords: VoiceBalanceKeyword[];
    numberTypes: VoiceBalancePropertyNumberType[];
  };
  'voice-duration': {
    keywords: VoiceDurationKeyword[];
    numberTypes: VoiceDurationPropertyNumberType[];
  };
  'voice-family': {
    keywords: VoiceFamilyKeyword[];
    numberTypes: VoiceFamilyPropertyNumberType[];
  };
  'voice-pitch': {
    keywords: VoicePitchKeyword[];
    numberTypes: VoicePitchPropertyNumberType[];
  };
  'voice-range': {
    keywords: VoiceRangeKeyword[];
    numberTypes: VoiceRangePropertyNumberType[];
  };
  'voice-rate': {
    keywords: VoiceRateKeyword[];
    numberTypes: VoiceRatePropertyNumberType[];
  };
  'voice-stress': {
    keywords: VoiceStressKeyword[];
    numberTypes: never[];
  };
  'voice-volume': {
    keywords: VoiceVolumeKeyword[];
    numberTypes: never[];
  };
  'white-space': {
    keywords: WhiteSpaceKeyword[];
    numberTypes: never[];
  };
  'white-space-collapse': {
    keywords: WhiteSpaceCollapseKeyword[];
    numberTypes: never[];
  };
  'white-space-trim': {
    keywords: WhiteSpaceTrimKeyword[];
    numberTypes: never[];
  };
  'widows': {
    keywords: never[];
    numberTypes: WidowsPropertyNumberType[];
  };
  'width': {
    keywords: WidthKeyword[];
    numberTypes: WidthPropertyNumberType[];
  };
  'will-change': {
    keywords: WillChangeKeyword[];
    numberTypes: never[];
  };
  'word-break': {
    keywords: WordBreakKeyword[];
    numberTypes: never[];
  };
  'word-spacing': {
    keywords: WordSpacingKeyword[];
    numberTypes: WordSpacingPropertyNumberType[];
  };
  'word-wrap': {
    keywords: WordWrapKeyword[];
    numberTypes: never[];
  };
  'writing-mode': {
    keywords: WritingModeKeyword[];
    numberTypes: never[];
  };
  'x': {
    keywords: never[];
    numberTypes: XPropertyNumberType[];
  };
  'y': {
    keywords: never[];
    numberTypes: YPropertyNumberType[];
  };
  'z-index': {
    keywords: ZIndexKeyword[];
    numberTypes: ZIndexPropertyNumberType[];
  };
  'zoom': {
    keywords: ZoomKeyword[];
    numberTypes: ZoomPropertyNumberType[];
  };
};

/** 属性完整配置数据（运行时可用） */
export const CSS_PROPERTY_CONFIG = {
  'accent-color': {
    keywords: [...ACCENT_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'align-content': {
    keywords: ALIGN_CONTENT_KEYWORDS,
    numberTypes: [] as const,
  },
  'align-items': {
    keywords: ALIGN_ITEMS_KEYWORDS,
    numberTypes: [] as const,
  },
  'align-self': {
    keywords: ALIGN_SELF_KEYWORDS,
    numberTypes: [] as const,
  },
  'align-tracks': {
    keywords: ALIGN_TRACKS_KEYWORDS,
    numberTypes: [] as const,
  },
  'alignment-baseline': {
    keywords: ALIGNMENT_BASELINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'all': {
    keywords: ALL_KEYWORDS,
    numberTypes: [] as const,
  },
  'anchor-name': {
    keywords: ANCHOR_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'anchor-scope': {
    keywords: ANCHOR_SCOPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation': {
    keywords: ANIMATION_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'animation-composition': {
    keywords: ANIMATION_COMPOSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-delay': {
    keywords: [] as const,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'animation-direction': {
    keywords: ANIMATION_DIRECTION_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-duration': {
    keywords: [] as const,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'animation-fill-mode': {
    keywords: ANIMATION_FILL_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-iteration-count': {
    keywords: ANIMATION_ITERATION_COUNT_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'animation-name': {
    keywords: ANIMATION_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-play-state': {
    keywords: ANIMATION_PLAY_STATE_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-range-end': {
    keywords: ANIMATION_RANGE_END_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'animation-range-start': {
    keywords: ANIMATION_RANGE_START_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'animation-timeline': {
    keywords: ANIMATION_TIMELINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'animation-timing-function': {
    keywords: ANIMATION_TIMING_FUNCTION_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'appearance': {
    keywords: APPEARANCE_KEYWORDS,
    numberTypes: [] as const,
  },
  'aspect-ratio': {
    keywords: ASPECT_RATIO_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'azimuth': {
    keywords: AZIMUTH_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'backdrop-filter': {
    keywords: [...BACKDROP_FILTER_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'backface-visibility': {
    keywords: BACKFACE_VISIBILITY_KEYWORDS,
    numberTypes: [] as const,
  },
  'background': {
    keywords: [...BACKGROUND_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'background-attachment': {
    keywords: BACKGROUND_ATTACHMENT_KEYWORDS,
    numberTypes: [] as const,
  },
  'background-blend-mode': {
    keywords: BACKGROUND_BLEND_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'background-clip': {
    keywords: BACKGROUND_CLIP_KEYWORDS,
    numberTypes: [] as const,
  },
  'background-color': {
    keywords: [...BACKGROUND_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'background-image': {
    keywords: [...BACKGROUND_IMAGE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'background-origin': {
    keywords: BACKGROUND_ORIGIN_KEYWORDS,
    numberTypes: [] as const,
  },
  'background-position': {
    keywords: BACKGROUND_POSITION_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'background-position-x': {
    keywords: BACKGROUND_POSITION_X_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'background-position-y': {
    keywords: BACKGROUND_POSITION_Y_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'background-repeat': {
    keywords: BACKGROUND_REPEAT_KEYWORDS,
    numberTypes: [] as const,
  },
  'background-size': {
    keywords: BACKGROUND_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'baseline-shift': {
    keywords: BASELINE_SHIFT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border': {
    keywords: [...BORDER_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-block': {
    keywords: [...BORDER_BLOCK_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-block-end': {
    keywords: [...BORDER_BLOCK_END_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-block-start': {
    keywords: [...BORDER_BLOCK_START_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-bottom': {
    keywords: [...BORDER_BOTTOM_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-bottom-left-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-bottom-right-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-bottom-style': {
    keywords: BORDER_BOTTOM_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-bottom-width': {
    keywords: BORDER_BOTTOM_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'border-collapse': {
    keywords: BORDER_COLLAPSE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-color': {
    keywords: [...BORDER_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-end-end-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-end-start-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-image-outset': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'border-image-repeat': {
    keywords: BORDER_IMAGE_REPEAT_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-image-slice': {
    keywords: BORDER_IMAGE_SLICE_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-image-source': {
    keywords: [...BORDER_IMAGE_SOURCE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'border-image-width': {
    keywords: BORDER_IMAGE_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-inline': {
    keywords: [...BORDER_INLINE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-inline-end': {
    keywords: [...BORDER_INLINE_END_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-inline-start': {
    keywords: [...BORDER_INLINE_START_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-left': {
    keywords: [...BORDER_LEFT_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-left-color': {
    keywords: [...BORDER_LEFT_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-left-style': {
    keywords: BORDER_LEFT_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-left-width': {
    keywords: BORDER_LEFT_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'border-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-right': {
    keywords: [...BORDER_RIGHT_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-right-color': {
    keywords: [...BORDER_RIGHT_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-right-style': {
    keywords: BORDER_RIGHT_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-right-width': {
    keywords: BORDER_RIGHT_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'border-spacing': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'border-start-end-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-start-start-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-style': {
    keywords: BORDER_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-top': {
    keywords: [...BORDER_TOP_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-top-color': {
    keywords: [...BORDER_TOP_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-top-left-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-top-right-radius': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'border-top-style': {
    keywords: BORDER_TOP_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'border-top-width': {
    keywords: BORDER_TOP_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'border-width': {
    keywords: BORDER_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'bottom': {
    keywords: BOTTOM_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'box-align': {
    keywords: BOX_ALIGN_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-decoration-break': {
    keywords: BOX_DECORATION_BREAK_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-direction': {
    keywords: BOX_DIRECTION_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-flex': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'box-flex-group': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'box-lines': {
    keywords: BOX_LINES_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-ordinal-group': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'box-orient': {
    keywords: BOX_ORIENT_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-pack': {
    keywords: BOX_PACK_KEYWORDS,
    numberTypes: [] as const,
  },
  'box-shadow': {
    keywords: [...BOX_SHADOW_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'box-sizing': {
    keywords: BOX_SIZING_KEYWORDS,
    numberTypes: [] as const,
  },
  'break-after': {
    keywords: BREAK_AFTER_KEYWORDS,
    numberTypes: [] as const,
  },
  'break-before': {
    keywords: BREAK_BEFORE_KEYWORDS,
    numberTypes: [] as const,
  },
  'break-inside': {
    keywords: BREAK_INSIDE_KEYWORDS,
    numberTypes: [] as const,
  },
  'caption-side': {
    keywords: CAPTION_SIDE_KEYWORDS,
    numberTypes: [] as const,
  },
  'caret-color': {
    keywords: [...CARET_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'caret-shape': {
    keywords: CARET_SHAPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'clear': {
    keywords: CLEAR_KEYWORDS,
    numberTypes: [] as const,
  },
  'clip': {
    keywords: CLIP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'clip-path': {
    keywords: CLIP_PATH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'clip-rule': {
    keywords: CLIP_RULE_KEYWORDS,
    numberTypes: [] as const,
  },
  'color': {
    keywords: [...COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'color-interpolation-filters': {
    keywords: COLOR_INTERPOLATION_FILTERS_KEYWORDS,
    numberTypes: [] as const,
  },
  'color-scheme': {
    keywords: COLOR_SCHEME_KEYWORDS,
    numberTypes: [] as const,
  },
  'column-count': {
    keywords: COLUMN_COUNT_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'column-fill': {
    keywords: COLUMN_FILL_KEYWORDS,
    numberTypes: [] as const,
  },
  'column-gap': {
    keywords: COLUMN_GAP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'column-rule-color': {
    keywords: [...COLUMN_RULE_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'column-span': {
    keywords: COLUMN_SPAN_KEYWORDS,
    numberTypes: [] as const,
  },
  'column-width': {
    keywords: COLUMN_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'contain': {
    keywords: CONTAIN_KEYWORDS,
    numberTypes: [] as const,
  },
  'contain-intrinsic-block-size': {
    keywords: CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'contain-intrinsic-height': {
    keywords: CONTAIN_INTRINSIC_HEIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'contain-intrinsic-inline-size': {
    keywords: CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'contain-intrinsic-size': {
    keywords: CONTAIN_INTRINSIC_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'contain-intrinsic-width': {
    keywords: CONTAIN_INTRINSIC_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'container-name': {
    keywords: CONTAINER_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'container-type': {
    keywords: CONTAINER_TYPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'content': {
    keywords: [...CONTENT_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'content-visibility': {
    keywords: CONTENT_VISIBILITY_KEYWORDS,
    numberTypes: [] as const,
  },
  'counter-increment': {
    keywords: COUNTER_INCREMENT_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'counter-reset': {
    keywords: COUNTER_RESET_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'counter-set': {
    keywords: COUNTER_SET_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'cue-after': {
    keywords: CUE_AFTER_KEYWORDS,
    numberTypes: [] as const,
  },
  'cue-before': {
    keywords: CUE_BEFORE_KEYWORDS,
    numberTypes: [] as const,
  },
  'cursor': {
    keywords: CURSOR_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'cx': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'cy': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'd': {
    keywords: D_KEYWORDS,
    numberTypes: [] as const,
  },
  'direction': {
    keywords: DIRECTION_KEYWORDS,
    numberTypes: [] as const,
  },
  'display': {
    keywords: DISPLAY_KEYWORDS,
    numberTypes: [] as const,
  },
  'dominant-baseline': {
    keywords: DOMINANT_BASELINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'empty-cells': {
    keywords: EMPTY_CELLS_KEYWORDS,
    numberTypes: [] as const,
  },
  'field-sizing': {
    keywords: FIELD_SIZING_KEYWORDS,
    numberTypes: [] as const,
  },
  'fill': {
    keywords: [...FILL_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'fill-opacity': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'fill-rule': {
    keywords: FILL_RULE_KEYWORDS,
    numberTypes: [] as const,
  },
  'filter': {
    keywords: [...FILTER_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'flex': {
    keywords: FLEX_KEYWORDS,
    numberTypes: [] as const,
  },
  'flex-basis': {
    keywords: FLEX_BASIS_KEYWORDS,
    numberTypes: [] as const,
  },
  'flex-direction': {
    keywords: FLEX_DIRECTION_KEYWORDS,
    numberTypes: [] as const,
  },
  'flex-grow': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'flex-shrink': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'flex-wrap': {
    keywords: FLEX_WRAP_KEYWORDS,
    numberTypes: [] as const,
  },
  'float': {
    keywords: FLOAT_KEYWORDS,
    numberTypes: [] as const,
  },
  'font': {
    keywords: FONT_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-family': {
    keywords: FONT_FAMILY_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-feature-settings': {
    keywords: FONT_FEATURE_SETTINGS_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'font-kerning': {
    keywords: FONT_KERNING_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-language-override': {
    keywords: FONT_LANGUAGE_OVERRIDE_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-optical-sizing': {
    keywords: FONT_OPTICAL_SIZING_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-palette': {
    keywords: FONT_PALETTE_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-size': {
    keywords: FONT_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'font-size-adjust': {
    keywords: FONT_SIZE_ADJUST_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'font-smooth': {
    keywords: FONT_SMOOTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'font-stretch': {
    keywords: FONT_STRETCH_KEYWORDS,
    numberTypes: [PERCENTAGE_NUMBER_TYPE] as const,
  },
  'font-style': {
    keywords: FONT_STYLE_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'font-synthesis': {
    keywords: FONT_SYNTHESIS_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-synthesis-position': {
    keywords: FONT_SYNTHESIS_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-synthesis-small-caps': {
    keywords: FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-synthesis-style': {
    keywords: FONT_SYNTHESIS_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-synthesis-weight': {
    keywords: FONT_SYNTHESIS_WEIGHT_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant': {
    keywords: FONT_VARIANT_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-alternates': {
    keywords: FONT_VARIANT_ALTERNATES_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-caps': {
    keywords: FONT_VARIANT_CAPS_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-east-asian': {
    keywords: FONT_VARIANT_EAST_ASIAN_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-emoji': {
    keywords: FONT_VARIANT_EMOJI_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-ligatures': {
    keywords: FONT_VARIANT_LIGATURES_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-numeric': {
    keywords: FONT_VARIANT_NUMERIC_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variant-position': {
    keywords: FONT_VARIANT_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'font-variation-settings': {
    keywords: FONT_VARIATION_SETTINGS_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'font-weight': {
    keywords: FONT_WEIGHT_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'forced-color-adjust': {
    keywords: FORCED_COLOR_ADJUST_KEYWORDS,
    numberTypes: [] as const,
  },
  'glyph-orientation-horizontal': {
    keywords: [] as const,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'glyph-orientation-vertical': {
    keywords: [] as const,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'grid': {
    keywords: GRID_KEYWORDS,
    numberTypes: [] as const,
  },
  'grid-area': {
    keywords: GRID_AREA_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-auto-columns': {
    keywords: GRID_AUTO_COLUMNS_KEYWORDS,
    numberTypes: [FLEX_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-auto-flow': {
    keywords: GRID_AUTO_FLOW_KEYWORDS,
    numberTypes: [] as const,
  },
  'grid-auto-rows': {
    keywords: GRID_AUTO_ROWS_KEYWORDS,
    numberTypes: [FLEX_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-column': {
    keywords: GRID_COLUMN_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-column-end': {
    keywords: GRID_COLUMN_END_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-column-gap': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-column-start': {
    keywords: GRID_COLUMN_START_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-row': {
    keywords: GRID_ROW_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-row-end': {
    keywords: GRID_ROW_END_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-row-gap': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-row-start': {
    keywords: GRID_ROW_START_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'grid-template': {
    keywords: GRID_TEMPLATE_KEYWORDS,
    numberTypes: [FLEX_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-template-areas': {
    keywords: GRID_TEMPLATE_AREAS_KEYWORDS,
    numberTypes: [] as const,
  },
  'grid-template-columns': {
    keywords: GRID_TEMPLATE_COLUMNS_KEYWORDS,
    numberTypes: [FLEX_NUMBER_TYPE, INTEGER_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'grid-template-rows': {
    keywords: GRID_TEMPLATE_ROWS_KEYWORDS,
    numberTypes: [FLEX_NUMBER_TYPE, INTEGER_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'hanging-punctuation': {
    keywords: HANGING_PUNCTUATION_KEYWORDS,
    numberTypes: [] as const,
  },
  'height': {
    keywords: HEIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'hyphenate-character': {
    keywords: HYPHENATE_CHARACTER_KEYWORDS,
    numberTypes: [] as const,
  },
  'hyphenate-limit-chars': {
    keywords: HYPHENATE_LIMIT_CHARS_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'hyphens': {
    keywords: HYPHENS_KEYWORDS,
    numberTypes: [] as const,
  },
  'image-orientation': {
    keywords: IMAGE_ORIENTATION_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'image-rendering': {
    keywords: IMAGE_RENDERING_KEYWORDS,
    numberTypes: [] as const,
  },
  'image-resolution': {
    keywords: IMAGE_RESOLUTION_KEYWORDS,
    numberTypes: [RESOLUTION_NUMBER_TYPE] as const,
  },
  'ime-mode': {
    keywords: IME_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'initial-letter': {
    keywords: INITIAL_LETTER_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'initial-letter-align': {
    keywords: INITIAL_LETTER_ALIGN_KEYWORDS,
    numberTypes: [] as const,
  },
  'input-security': {
    keywords: INPUT_SECURITY_KEYWORDS,
    numberTypes: [] as const,
  },
  'interpolate-size': {
    keywords: INTERPOLATE_SIZE_KEYWORDS,
    numberTypes: [] as const,
  },
  'isolation': {
    keywords: ISOLATION_KEYWORDS,
    numberTypes: [] as const,
  },
  'justify-content': {
    keywords: JUSTIFY_CONTENT_KEYWORDS,
    numberTypes: [] as const,
  },
  'justify-items': {
    keywords: JUSTIFY_ITEMS_KEYWORDS,
    numberTypes: [] as const,
  },
  'justify-self': {
    keywords: JUSTIFY_SELF_KEYWORDS,
    numberTypes: [] as const,
  },
  'justify-tracks': {
    keywords: JUSTIFY_TRACKS_KEYWORDS,
    numberTypes: [] as const,
  },
  'kerning': {
    keywords: KERNING_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'left': {
    keywords: LEFT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'letter-spacing': {
    keywords: LETTER_SPACING_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'line-break': {
    keywords: LINE_BREAK_KEYWORDS,
    numberTypes: [] as const,
  },
  'line-clamp': {
    keywords: LINE_CLAMP_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'line-height': {
    keywords: LINE_HEIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'line-height-step': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'list-style-image': {
    keywords: [...LIST_STYLE_IMAGE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'list-style-position': {
    keywords: LIST_STYLE_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'list-style-type': {
    keywords: LIST_STYLE_TYPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'margin': {
    keywords: MARGIN_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'margin-bottom': {
    keywords: MARGIN_BOTTOM_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'margin-left': {
    keywords: MARGIN_LEFT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'margin-right': {
    keywords: MARGIN_RIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'margin-top': {
    keywords: MARGIN_TOP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'margin-trim': {
    keywords: MARGIN_TRIM_KEYWORDS,
    numberTypes: [] as const,
  },
  'marker': {
    keywords: MARKER_KEYWORDS,
    numberTypes: [] as const,
  },
  'marker-end': {
    keywords: MARKER_END_KEYWORDS,
    numberTypes: [] as const,
  },
  'marker-mid': {
    keywords: MARKER_MID_KEYWORDS,
    numberTypes: [] as const,
  },
  'marker-start': {
    keywords: MARKER_START_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask': {
    keywords: [...MASK_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'mask-border-mode': {
    keywords: MASK_BORDER_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-border-outset': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'mask-border-repeat': {
    keywords: MASK_BORDER_REPEAT_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-border-slice': {
    keywords: MASK_BORDER_SLICE_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'mask-border-source': {
    keywords: [...MASK_BORDER_SOURCE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'mask-border-width': {
    keywords: MASK_BORDER_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'mask-clip': {
    keywords: MASK_CLIP_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-composite': {
    keywords: MASK_COMPOSITE_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-image': {
    keywords: [...MASK_IMAGE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'mask-mode': {
    keywords: MASK_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-origin': {
    keywords: MASK_ORIGIN_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-position': {
    keywords: MASK_POSITION_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'mask-repeat': {
    keywords: MASK_REPEAT_KEYWORDS,
    numberTypes: [] as const,
  },
  'mask-size': {
    keywords: MASK_SIZE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'mask-type': {
    keywords: MASK_TYPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'masonry-auto-flow': {
    keywords: MASONRY_AUTO_FLOW_KEYWORDS,
    numberTypes: [] as const,
  },
  'math-depth': {
    keywords: MATH_DEPTH_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'math-shift': {
    keywords: MATH_SHIFT_KEYWORDS,
    numberTypes: [] as const,
  },
  'math-style': {
    keywords: MATH_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'max-height': {
    keywords: MAX_HEIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'max-lines': {
    keywords: MAX_LINES_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'max-width': {
    keywords: MAX_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'min-height': {
    keywords: MIN_HEIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'min-width': {
    keywords: MIN_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'mix-blend-mode': {
    keywords: MIX_BLEND_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'object-fit': {
    keywords: OBJECT_FIT_KEYWORDS,
    numberTypes: [] as const,
  },
  'object-position': {
    keywords: OBJECT_POSITION_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'offset-anchor': {
    keywords: OFFSET_ANCHOR_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'offset-distance': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'offset-path': {
    keywords: OFFSET_PATH_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'offset-position': {
    keywords: OFFSET_POSITION_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'offset-rotate': {
    keywords: OFFSET_ROTATE_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE] as const,
  },
  'opacity': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'order': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'orphans': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'outline-color': {
    keywords: [...OUTLINE_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'outline-offset': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'outline-style': {
    keywords: OUTLINE_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'outline-width': {
    keywords: OUTLINE_WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'overflow': {
    keywords: OVERFLOW_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-anchor': {
    keywords: OVERFLOW_ANCHOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-block': {
    keywords: OVERFLOW_BLOCK_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-clip-box': {
    keywords: OVERFLOW_CLIP_BOX_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-clip-margin': {
    keywords: OVERFLOW_CLIP_MARGIN_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'overflow-inline': {
    keywords: OVERFLOW_INLINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-wrap': {
    keywords: OVERFLOW_WRAP_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-x': {
    keywords: OVERFLOW_X_KEYWORDS,
    numberTypes: [] as const,
  },
  'overflow-y': {
    keywords: OVERFLOW_Y_KEYWORDS,
    numberTypes: [] as const,
  },
  'overlay': {
    keywords: OVERLAY_KEYWORDS,
    numberTypes: [] as const,
  },
  'overscroll-behavior': {
    keywords: OVERSCROLL_BEHAVIOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'overscroll-behavior-block': {
    keywords: OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS,
    numberTypes: [] as const,
  },
  'overscroll-behavior-inline': {
    keywords: OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'overscroll-behavior-x': {
    keywords: OVERSCROLL_BEHAVIOR_X_KEYWORDS,
    numberTypes: [] as const,
  },
  'overscroll-behavior-y': {
    keywords: OVERSCROLL_BEHAVIOR_Y_KEYWORDS,
    numberTypes: [] as const,
  },
  'padding': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'padding-bottom': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'padding-left': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'padding-right': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'padding-top': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'page': {
    keywords: PAGE_KEYWORDS,
    numberTypes: [] as const,
  },
  'page-break-after': {
    keywords: PAGE_BREAK_AFTER_KEYWORDS,
    numberTypes: [] as const,
  },
  'page-break-before': {
    keywords: PAGE_BREAK_BEFORE_KEYWORDS,
    numberTypes: [] as const,
  },
  'page-break-inside': {
    keywords: PAGE_BREAK_INSIDE_KEYWORDS,
    numberTypes: [] as const,
  },
  'paint-order': {
    keywords: PAINT_ORDER_KEYWORDS,
    numberTypes: [] as const,
  },
  'pause-after': {
    keywords: PAUSE_AFTER_KEYWORDS,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'pause-before': {
    keywords: PAUSE_BEFORE_KEYWORDS,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'perspective': {
    keywords: PERSPECTIVE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'perspective-origin': {
    keywords: PERSPECTIVE_ORIGIN_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'pointer-events': {
    keywords: POINTER_EVENTS_KEYWORDS,
    numberTypes: [] as const,
  },
  'position': {
    keywords: POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'position-anchor': {
    keywords: POSITION_ANCHOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'position-area': {
    keywords: POSITION_AREA_KEYWORDS,
    numberTypes: [] as const,
  },
  'position-try-fallbacks': {
    keywords: POSITION_TRY_FALLBACKS_KEYWORDS,
    numberTypes: [] as const,
  },
  'position-try-order': {
    keywords: POSITION_TRY_ORDER_KEYWORDS,
    numberTypes: [] as const,
  },
  'position-visibility': {
    keywords: POSITION_VISIBILITY_KEYWORDS,
    numberTypes: [] as const,
  },
  'print-color-adjust': {
    keywords: PRINT_COLOR_ADJUST_KEYWORDS,
    numberTypes: [] as const,
  },
  'quotes': {
    keywords: QUOTES_KEYWORDS,
    numberTypes: [] as const,
  },
  'r': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'resize': {
    keywords: RESIZE_KEYWORDS,
    numberTypes: [] as const,
  },
  'rest-after': {
    keywords: REST_AFTER_KEYWORDS,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'rest-before': {
    keywords: REST_BEFORE_KEYWORDS,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'right': {
    keywords: RIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'rotate': {
    keywords: ROTATE_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'row-gap': {
    keywords: ROW_GAP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'ruby-align': {
    keywords: RUBY_ALIGN_KEYWORDS,
    numberTypes: [] as const,
  },
  'ruby-merge': {
    keywords: RUBY_MERGE_KEYWORDS,
    numberTypes: [] as const,
  },
  'ruby-position': {
    keywords: RUBY_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'rx': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'ry': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scale': {
    keywords: SCALE_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-behavior': {
    keywords: SCROLL_BEHAVIOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-margin': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-block': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-block-end': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-block-start': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-bottom': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-inline': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-inline-end': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-inline-start': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-left': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-right': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-margin-top': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'scroll-padding': {
    keywords: SCROLL_PADDING_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-block': {
    keywords: SCROLL_PADDING_BLOCK_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-block-end': {
    keywords: SCROLL_PADDING_BLOCK_END_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-block-start': {
    keywords: SCROLL_PADDING_BLOCK_START_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-bottom': {
    keywords: SCROLL_PADDING_BOTTOM_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-inline': {
    keywords: SCROLL_PADDING_INLINE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-inline-end': {
    keywords: SCROLL_PADDING_INLINE_END_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-inline-start': {
    keywords: SCROLL_PADDING_INLINE_START_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-left': {
    keywords: SCROLL_PADDING_LEFT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-right': {
    keywords: SCROLL_PADDING_RIGHT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-padding-top': {
    keywords: SCROLL_PADDING_TOP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-snap-align': {
    keywords: SCROLL_SNAP_ALIGN_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-snap-coordinate': {
    keywords: SCROLL_SNAP_COORDINATE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-snap-destination': {
    keywords: SCROLL_SNAP_DESTINATION_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-snap-points-x': {
    keywords: SCROLL_SNAP_POINTS_X_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-snap-points-y': {
    keywords: SCROLL_SNAP_POINTS_Y_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scroll-snap-stop': {
    keywords: SCROLL_SNAP_STOP_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-snap-type': {
    keywords: SCROLL_SNAP_TYPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-snap-type-x': {
    keywords: SCROLL_SNAP_TYPE_X_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-snap-type-y': {
    keywords: SCROLL_SNAP_TYPE_Y_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-timeline-axis': {
    keywords: SCROLL_TIMELINE_AXIS_KEYWORDS,
    numberTypes: [] as const,
  },
  'scroll-timeline-name': {
    keywords: SCROLL_TIMELINE_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'scrollbar-color': {
    keywords: [...SCROLLBAR_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'scrollbar-gutter': {
    keywords: SCROLLBAR_GUTTER_KEYWORDS,
    numberTypes: [] as const,
  },
  'scrollbar-width': {
    keywords: SCROLLBAR_WIDTH_KEYWORDS,
    numberTypes: [] as const,
  },
  'shape-image-threshold': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'shape-margin': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'shape-outside': {
    keywords: [...SHAPE_OUTSIDE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, ANGLE_PERCENTAGE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE, RESOLUTION_NUMBER_TYPE] as const,
  },
  'shape-rendering': {
    keywords: SHAPE_RENDERING_KEYWORDS,
    numberTypes: [] as const,
  },
  'speak': {
    keywords: SPEAK_KEYWORDS,
    numberTypes: [] as const,
  },
  'speak-as': {
    keywords: SPEAK_AS_KEYWORDS,
    numberTypes: [] as const,
  },
  'stroke': {
    keywords: [...STROKE_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'stroke-dasharray': {
    keywords: STROKE_DASHARRAY_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'stroke-dashoffset': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'stroke-linecap': {
    keywords: STROKE_LINECAP_KEYWORDS,
    numberTypes: [] as const,
  },
  'stroke-linejoin': {
    keywords: STROKE_LINEJOIN_KEYWORDS,
    numberTypes: [] as const,
  },
  'stroke-miterlimit': {
    keywords: [] as const,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'stroke-width': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'tab-size': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE, LENGTH_NUMBER_TYPE] as const,
  },
  'table-layout': {
    keywords: TABLE_LAYOUT_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-align': {
    keywords: TEXT_ALIGN_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-align-last': {
    keywords: TEXT_ALIGN_LAST_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-anchor': {
    keywords: TEXT_ANCHOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-combine-upright': {
    keywords: TEXT_COMBINE_UPRIGHT_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'text-decoration-color': {
    keywords: [...TEXT_DECORATION_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-decoration-line': {
    keywords: TEXT_DECORATION_LINE_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-decoration-skip': {
    keywords: TEXT_DECORATION_SKIP_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-decoration-skip-ink': {
    keywords: TEXT_DECORATION_SKIP_INK_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-decoration-style': {
    keywords: TEXT_DECORATION_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-decoration-thickness': {
    keywords: TEXT_DECORATION_THICKNESS_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-emphasis-color': {
    keywords: [...TEXT_EMPHASIS_COLOR_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-emphasis-position': {
    keywords: TEXT_EMPHASIS_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-emphasis-style': {
    keywords: TEXT_EMPHASIS_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-indent': {
    keywords: TEXT_INDENT_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-justify': {
    keywords: TEXT_JUSTIFY_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-orientation': {
    keywords: TEXT_ORIENTATION_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-overflow': {
    keywords: TEXT_OVERFLOW_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-rendering': {
    keywords: TEXT_RENDERING_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-shadow': {
    keywords: [...TEXT_SHADOW_KEYWORDS, ...COLORS] as const,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-size-adjust': {
    keywords: TEXT_SIZE_ADJUST_KEYWORDS,
    numberTypes: [PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-spacing-trim': {
    keywords: TEXT_SPACING_TRIM_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-transform': {
    keywords: TEXT_TRANSFORM_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-underline-offset': {
    keywords: TEXT_UNDERLINE_OFFSET_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'text-underline-position': {
    keywords: TEXT_UNDERLINE_POSITION_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-wrap-mode': {
    keywords: TEXT_WRAP_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'text-wrap-style': {
    keywords: TEXT_WRAP_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'timeline-scope': {
    keywords: TIMELINE_SCOPE_KEYWORDS,
    numberTypes: [] as const,
  },
  'top': {
    keywords: TOP_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'touch-action': {
    keywords: TOUCH_ACTION_KEYWORDS,
    numberTypes: [] as const,
  },
  'transform': {
    keywords: TRANSFORM_KEYWORDS,
    numberTypes: [ANGLE_NUMBER_TYPE, LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'transform-box': {
    keywords: TRANSFORM_BOX_KEYWORDS,
    numberTypes: [] as const,
  },
  'transform-origin': {
    keywords: TRANSFORM_ORIGIN_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'transform-style': {
    keywords: TRANSFORM_STYLE_KEYWORDS,
    numberTypes: [] as const,
  },
  'transition': {
    keywords: TRANSITION_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE, NUMBER_NUMBER_TYPE, TIME_NUMBER_TYPE] as const,
  },
  'transition-behavior': {
    keywords: TRANSITION_BEHAVIOR_KEYWORDS,
    numberTypes: [] as const,
  },
  'transition-delay': {
    keywords: [] as const,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'transition-duration': {
    keywords: [] as const,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'transition-property': {
    keywords: TRANSITION_PROPERTY_KEYWORDS,
    numberTypes: [] as const,
  },
  'transition-timing-function': {
    keywords: TRANSITION_TIMING_FUNCTION_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE, NUMBER_NUMBER_TYPE] as const,
  },
  'translate': {
    keywords: TRANSLATE_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'unicode-bidi': {
    keywords: UNICODE_BIDI_KEYWORDS,
    numberTypes: [] as const,
  },
  'user-select': {
    keywords: USER_SELECT_KEYWORDS,
    numberTypes: [] as const,
  },
  'vector-effect': {
    keywords: VECTOR_EFFECT_KEYWORDS,
    numberTypes: [] as const,
  },
  'vertical-align': {
    keywords: VERTICAL_ALIGN_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'view-timeline-axis': {
    keywords: VIEW_TIMELINE_AXIS_KEYWORDS,
    numberTypes: [] as const,
  },
  'view-timeline-inset': {
    keywords: VIEW_TIMELINE_INSET_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'view-timeline-name': {
    keywords: VIEW_TIMELINE_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'view-transition-name': {
    keywords: VIEW_TRANSITION_NAME_KEYWORDS,
    numberTypes: [] as const,
  },
  'visibility': {
    keywords: VISIBILITY_KEYWORDS,
    numberTypes: [] as const,
  },
  'voice-balance': {
    keywords: VOICE_BALANCE_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE] as const,
  },
  'voice-duration': {
    keywords: VOICE_DURATION_KEYWORDS,
    numberTypes: [TIME_NUMBER_TYPE] as const,
  },
  'voice-family': {
    keywords: VOICE_FAMILY_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'voice-pitch': {
    keywords: VOICE_PITCH_KEYWORDS,
    numberTypes: [FREQUENCY_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'voice-range': {
    keywords: VOICE_RANGE_KEYWORDS,
    numberTypes: [FREQUENCY_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'voice-rate': {
    keywords: VOICE_RATE_KEYWORDS,
    numberTypes: [PERCENTAGE_NUMBER_TYPE] as const,
  },
  'voice-stress': {
    keywords: VOICE_STRESS_KEYWORDS,
    numberTypes: [] as const,
  },
  'voice-volume': {
    keywords: VOICE_VOLUME_KEYWORDS,
    numberTypes: [] as const,
  },
  'white-space': {
    keywords: WHITE_SPACE_KEYWORDS,
    numberTypes: [] as const,
  },
  'white-space-collapse': {
    keywords: WHITE_SPACE_COLLAPSE_KEYWORDS,
    numberTypes: [] as const,
  },
  'white-space-trim': {
    keywords: WHITE_SPACE_TRIM_KEYWORDS,
    numberTypes: [] as const,
  },
  'widows': {
    keywords: [] as const,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'width': {
    keywords: WIDTH_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE, LENGTH_PERCENTAGE_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'will-change': {
    keywords: WILL_CHANGE_KEYWORDS,
    numberTypes: [] as const,
  },
  'word-break': {
    keywords: WORD_BREAK_KEYWORDS,
    numberTypes: [] as const,
  },
  'word-spacing': {
    keywords: WORD_SPACING_KEYWORDS,
    numberTypes: [LENGTH_NUMBER_TYPE] as const,
  },
  'word-wrap': {
    keywords: WORD_WRAP_KEYWORDS,
    numberTypes: [] as const,
  },
  'writing-mode': {
    keywords: WRITING_MODE_KEYWORDS,
    numberTypes: [] as const,
  },
  'x': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'y': {
    keywords: [] as const,
    numberTypes: [LENGTH_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
  'z-index': {
    keywords: Z_INDEX_KEYWORDS,
    numberTypes: [INTEGER_NUMBER_TYPE] as const,
  },
  'zoom': {
    keywords: ZOOM_KEYWORDS,
    numberTypes: [NUMBER_NUMBER_TYPE, PERCENTAGE_NUMBER_TYPE] as const,
  },
} as const;

// ==================== 辅助函数 ====================

/** 获取属性支持的关键词 */
export function getPropertyKeywords<T extends KeywordPropertyName>(property: T): readonly PropertyKeywordsMap[T][] {
  return PROPERTY_KEYWORDS[property] as any;
}

/** 获取属性支持的数值类型 */
export function getPropertyNumberTypes<T extends NumericPropertyName>(property: T): readonly PropertyNumberTypesMap[T][] {
  return PROPERTY_NUMBER_TYPES[property] as any;
}

/** 获取数值类型支持的单位 */
export function getNumberTypeUnits<T extends NumberType>(numberType: T): readonly string[] {
  return NUMBER_TYPE_UNITS[numberType] as any;
}

/**
 * 获取属性支持的单位（运行时）
 * 通过属性的数值类型，聚合所有支持的单位
 */
export function getPropertyUnits<T extends NumericPropertyName>(property: T): readonly string[] {
  const numberTypes = PROPERTY_NUMBER_TYPES[property];
  const units = new Set<string>();
  for (const nt of numberTypes) {
    const ntUnits = NUMBER_TYPE_UNITS[nt as NumberType];
    if (ntUnits) {
      for (const u of ntUnits) {
        units.add(u);
      }
    }
  }
  return Array.from(units);
}

/** 检查值是否是有效颜色 */
export function isValidColor(value: string): value is ColorValue {
  return (COLORS as readonly string[]).includes(value);
}

/** 检查值是否是有效数值类型 */
export function isValidNumberType(value: string): value is NumberType {
  return (NUMBER_TYPES as readonly string[]).includes(value);
}
