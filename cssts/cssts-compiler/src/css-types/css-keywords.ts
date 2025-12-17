/**
 * CSS 关键词类型定义
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-17T16:20:10.302Z
 */

// ==================== 颜色值 ====================

/** 所有 CSS 颜色关键字 */
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

// ==================== 关键词属性 ====================

/** accent-color 属性支持的关键词（不含颜色） */
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

/** align-content 属性支持的关键词 */
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

/** align-items 属性支持的关键词 */
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

/** align-self 属性支持的关键词 */
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

/** align-tracks 属性支持的关键词 */
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

/** alignment-baseline 属性支持的关键词 */
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

/** all 属性支持的关键词 */
export const ALL_KEYWORDS = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
] as const;

/** anchor-name 属性支持的关键词 */
export const ANCHOR_NAME_KEYWORDS = [
  'none',
] as const;

/** anchor-scope 属性支持的关键词 */
export const ANCHOR_SCOPE_KEYWORDS = [
  'all',
  'none',
] as const;

/** animation 属性支持的关键词 */
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

/** animation-composition 属性支持的关键词 */
export const ANIMATION_COMPOSITION_KEYWORDS = [
  'accumulate',
  'add',
  'replace',
] as const;

/** animation-direction 属性支持的关键词 */
export const ANIMATION_DIRECTION_KEYWORDS = [
  'alternate',
  'alternate-reverse',
  'normal',
  'reverse',
] as const;

/** animation-fill-mode 属性支持的关键词 */
export const ANIMATION_FILL_MODE_KEYWORDS = [
  'backwards',
  'both',
  'forwards',
  'none',
] as const;

/** animation-iteration-count 属性支持的关键词 */
export const ANIMATION_ITERATION_COUNT_KEYWORDS = [
  'infinite',
] as const;

/** animation-name 属性支持的关键词 */
export const ANIMATION_NAME_KEYWORDS = [
  'none',
] as const;

/** animation-play-state 属性支持的关键词 */
export const ANIMATION_PLAY_STATE_KEYWORDS = [
  'paused',
  'running',
] as const;

/** animation-range-end 属性支持的关键词 */
export const ANIMATION_RANGE_END_KEYWORDS = [
  'contain',
  'cover',
  'entry',
  'entry-crossing',
  'exit',
  'exit-crossing',
  'normal',
] as const;

/** animation-range-start 属性支持的关键词 */
export const ANIMATION_RANGE_START_KEYWORDS = [
  'contain',
  'cover',
  'entry',
  'entry-crossing',
  'exit',
  'exit-crossing',
  'normal',
] as const;

/** animation-timeline 属性支持的关键词 */
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

/** animation-timing-function 属性支持的关键词 */
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

/** appearance 属性支持的关键词 */
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

/** aspect-ratio 属性支持的关键词 */
export const ASPECT_RATIO_KEYWORDS = [
  'auto',
] as const;

/** azimuth 属性支持的关键词 */
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

/** backdrop-filter 属性支持的关键词（不含颜色） */
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

/** backface-visibility 属性支持的关键词 */
export const BACKFACE_VISIBILITY_KEYWORDS = [
  'hidden',
  'visible',
] as const;

/** background 属性支持的关键词（不含颜色） */
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

/** background-attachment 属性支持的关键词 */
export const BACKGROUND_ATTACHMENT_KEYWORDS = [
  'fixed',
  'local',
  'scroll',
] as const;

/** background-blend-mode 属性支持的关键词 */
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

/** background-clip 属性支持的关键词 */
export const BACKGROUND_CLIP_KEYWORDS = [
  'border',
  'border-box',
  'content-box',
  'padding-box',
  'text',
] as const;

/** background-color 属性支持的关键词（不含颜色） */
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

/** background-image 属性支持的关键词（不含颜色） */
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

/** background-origin 属性支持的关键词 */
export const BACKGROUND_ORIGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'padding-box',
] as const;

/** background-position 属性支持的关键词 */
export const BACKGROUND_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** background-position-x 属性支持的关键词 */
export const BACKGROUND_POSITION_X_KEYWORDS = [
  'center',
  'left',
  'right',
  'x-end',
  'x-start',
] as const;

/** background-position-y 属性支持的关键词 */
export const BACKGROUND_POSITION_Y_KEYWORDS = [
  'bottom',
  'center',
  'top',
  'y-end',
  'y-start',
] as const;

/** background-repeat 属性支持的关键词 */
export const BACKGROUND_REPEAT_KEYWORDS = [
  'no-repeat',
  'repeat',
  'repeat-x',
  'repeat-y',
  'round',
  'space',
] as const;

/** background-size 属性支持的关键词 */
export const BACKGROUND_SIZE_KEYWORDS = [
  'auto',
  'contain',
  'cover',
] as const;

/** baseline-shift 属性支持的关键词 */
export const BASELINE_SHIFT_KEYWORDS = [
  'baseline',
  'sub',
  'super',
] as const;

/** border 属性支持的关键词（不含颜色） */
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

/** border-block 属性支持的关键词（不含颜色） */
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

/** border-block-end 属性支持的关键词（不含颜色） */
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

/** border-block-start 属性支持的关键词（不含颜色） */
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

/** border-bottom 属性支持的关键词（不含颜色） */
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

/** border-bottom-style 属性支持的关键词 */
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

/** border-bottom-width 属性支持的关键词 */
export const BORDER_BOTTOM_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-collapse 属性支持的关键词 */
export const BORDER_COLLAPSE_KEYWORDS = [
  'collapse',
  'separate',
] as const;

/** border-color 属性支持的关键词（不含颜色） */
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

/** border-image-repeat 属性支持的关键词 */
export const BORDER_IMAGE_REPEAT_KEYWORDS = [
  'repeat',
  'round',
  'space',
  'stretch',
] as const;

/** border-image-slice 属性支持的关键词 */
export const BORDER_IMAGE_SLICE_KEYWORDS = [
  'fill',
] as const;

/** border-image-source 属性支持的关键词（不含颜色） */
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

/** border-image-width 属性支持的关键词 */
export const BORDER_IMAGE_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** border-inline 属性支持的关键词（不含颜色） */
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

/** border-inline-end 属性支持的关键词（不含颜色） */
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

/** border-inline-start 属性支持的关键词（不含颜色） */
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

/** border-left 属性支持的关键词（不含颜色） */
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

/** border-left-color 属性支持的关键词（不含颜色） */
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

/** border-left-style 属性支持的关键词 */
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

/** border-left-width 属性支持的关键词 */
export const BORDER_LEFT_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-right 属性支持的关键词（不含颜色） */
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

/** border-right-color 属性支持的关键词（不含颜色） */
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

/** border-right-style 属性支持的关键词 */
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

/** border-right-width 属性支持的关键词 */
export const BORDER_RIGHT_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-style 属性支持的关键词 */
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

/** border-top 属性支持的关键词（不含颜色） */
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

/** border-top-color 属性支持的关键词（不含颜色） */
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

/** border-top-style 属性支持的关键词 */
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

/** border-top-width 属性支持的关键词 */
export const BORDER_TOP_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** border-width 属性支持的关键词 */
export const BORDER_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** bottom 属性支持的关键词 */
export const BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** box-align 属性支持的关键词 */
export const BOX_ALIGN_KEYWORDS = [
  'baseline',
  'center',
  'end',
  'start',
  'stretch',
] as const;

/** box-decoration-break 属性支持的关键词 */
export const BOX_DECORATION_BREAK_KEYWORDS = [
  'clone',
  'slice',
] as const;

/** box-direction 属性支持的关键词 */
export const BOX_DIRECTION_KEYWORDS = [
  'inherit',
  'normal',
  'reverse',
] as const;

/** box-lines 属性支持的关键词 */
export const BOX_LINES_KEYWORDS = [
  'multiple',
  'single',
] as const;

/** box-orient 属性支持的关键词 */
export const BOX_ORIENT_KEYWORDS = [
  'block-axis',
  'horizontal',
  'inherit',
  'inline-axis',
  'vertical',
] as const;

/** box-pack 属性支持的关键词 */
export const BOX_PACK_KEYWORDS = [
  'center',
  'end',
  'justify',
  'start',
] as const;

/** box-shadow 属性支持的关键词（不含颜色） */
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

/** box-sizing 属性支持的关键词 */
export const BOX_SIZING_KEYWORDS = [
  'border-box',
  'content-box',
] as const;

/** break-after 属性支持的关键词 */
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

/** break-before 属性支持的关键词 */
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

/** break-inside 属性支持的关键词 */
export const BREAK_INSIDE_KEYWORDS = [
  'auto',
  'avoid',
  'avoid-column',
  'avoid-page',
  'avoid-region',
] as const;

/** caption-side 属性支持的关键词 */
export const CAPTION_SIDE_KEYWORDS = [
  'block-end',
  'block-start',
  'bottom',
  'inline-end',
  'inline-start',
  'top',
] as const;

/** caret-color 属性支持的关键词（不含颜色） */
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

/** caret-shape 属性支持的关键词 */
export const CARET_SHAPE_KEYWORDS = [
  'auto',
  'bar',
  'block',
  'underscore',
] as const;

/** clear 属性支持的关键词 */
export const CLEAR_KEYWORDS = [
  'both',
  'inline-end',
  'inline-start',
  'left',
  'none',
  'right',
] as const;

/** clip 属性支持的关键词 */
export const CLIP_KEYWORDS = [
  'auto',
] as const;

/** clip-path 属性支持的关键词 */
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

/** clip-rule 属性支持的关键词 */
export const CLIP_RULE_KEYWORDS = [
  'evenodd',
  'nonzero',
] as const;

/** color 属性支持的关键词（不含颜色） */
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

/** color-interpolation-filters 属性支持的关键词 */
export const COLOR_INTERPOLATION_FILTERS_KEYWORDS = [
  'auto',
  'linearRGB',
  'sRGB',
] as const;

/** color-scheme 属性支持的关键词 */
export const COLOR_SCHEME_KEYWORDS = [
  'dark',
  'light',
  'normal',
  'only',
] as const;

/** column-count 属性支持的关键词 */
export const COLUMN_COUNT_KEYWORDS = [
  'auto',
] as const;

/** column-fill 属性支持的关键词 */
export const COLUMN_FILL_KEYWORDS = [
  'auto',
  'balance',
] as const;

/** column-gap 属性支持的关键词 */
export const COLUMN_GAP_KEYWORDS = [
  'normal',
] as const;

/** column-rule-color 属性支持的关键词（不含颜色） */
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

/** column-span 属性支持的关键词 */
export const COLUMN_SPAN_KEYWORDS = [
  'all',
  'none',
] as const;

/** column-width 属性支持的关键词 */
export const COLUMN_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** contain 属性支持的关键词 */
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

/** contain-intrinsic-block-size 属性支持的关键词 */
export const CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-height 属性支持的关键词 */
export const CONTAIN_INTRINSIC_HEIGHT_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-inline-size 属性支持的关键词 */
export const CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-size 属性支持的关键词 */
export const CONTAIN_INTRINSIC_SIZE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** contain-intrinsic-width 属性支持的关键词 */
export const CONTAIN_INTRINSIC_WIDTH_KEYWORDS = [
  'auto',
  'none',
] as const;

/** container-name 属性支持的关键词 */
export const CONTAINER_NAME_KEYWORDS = [
  'none',
] as const;

/** container-type 属性支持的关键词 */
export const CONTAINER_TYPE_KEYWORDS = [
  'inline-size',
  'normal',
  'size',
] as const;

/** content 属性支持的关键词（不含颜色） */
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

/** content-visibility 属性支持的关键词 */
export const CONTENT_VISIBILITY_KEYWORDS = [
  'auto',
  'hidden',
  'visible',
] as const;

/** counter-increment 属性支持的关键词 */
export const COUNTER_INCREMENT_KEYWORDS = [
  'none',
] as const;

/** counter-reset 属性支持的关键词 */
export const COUNTER_RESET_KEYWORDS = [
  'none',
] as const;

/** counter-set 属性支持的关键词 */
export const COUNTER_SET_KEYWORDS = [
  'none',
] as const;

/** cue-after 属性支持的关键词 */
export const CUE_AFTER_KEYWORDS = [
  'none',
] as const;

/** cue-before 属性支持的关键词 */
export const CUE_BEFORE_KEYWORDS = [
  'none',
] as const;

/** cursor 属性支持的关键词 */
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

/** d 属性支持的关键词 */
export const D_KEYWORDS = [
  'none',
] as const;

/** direction 属性支持的关键词 */
export const DIRECTION_KEYWORDS = [
  'ltr',
  'rtl',
] as const;

/** display 属性支持的关键词 */
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

/** dominant-baseline 属性支持的关键词 */
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

/** empty-cells 属性支持的关键词 */
export const EMPTY_CELLS_KEYWORDS = [
  'hide',
  'show',
] as const;

/** field-sizing 属性支持的关键词 */
export const FIELD_SIZING_KEYWORDS = [
  'content',
  'fixed',
] as const;

/** fill 属性支持的关键词（不含颜色） */
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

/** fill-rule 属性支持的关键词 */
export const FILL_RULE_KEYWORDS = [
  'evenodd',
  'nonzero',
] as const;

/** filter 属性支持的关键词（不含颜色） */
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

/** flex 属性支持的关键词 */
export const FLEX_KEYWORDS = [
  'none',
] as const;

/** flex-basis 属性支持的关键词 */
export const FLEX_BASIS_KEYWORDS = [
  'content',
] as const;

/** flex-direction 属性支持的关键词 */
export const FLEX_DIRECTION_KEYWORDS = [
  'column',
  'column-reverse',
  'row',
  'row-reverse',
] as const;

/** flex-wrap 属性支持的关键词 */
export const FLEX_WRAP_KEYWORDS = [
  'nowrap',
  'wrap',
  'wrap-reverse',
] as const;

/** float 属性支持的关键词 */
export const FLOAT_KEYWORDS = [
  'inline-end',
  'inline-start',
  'left',
  'none',
  'right',
] as const;

/** font 属性支持的关键词 */
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

/** font-family 属性支持的关键词 */
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

/** font-feature-settings 属性支持的关键词 */
export const FONT_FEATURE_SETTINGS_KEYWORDS = [
  'normal',
  'off',
  'on',
] as const;

/** font-kerning 属性支持的关键词 */
export const FONT_KERNING_KEYWORDS = [
  'auto',
  'none',
  'normal',
] as const;

/** font-language-override 属性支持的关键词 */
export const FONT_LANGUAGE_OVERRIDE_KEYWORDS = [
  'normal',
] as const;

/** font-optical-sizing 属性支持的关键词 */
export const FONT_OPTICAL_SIZING_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-palette 属性支持的关键词 */
export const FONT_PALETTE_KEYWORDS = [
  'dark',
  'light',
  'normal',
] as const;

/** font-size 属性支持的关键词 */
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

/** font-size-adjust 属性支持的关键词 */
export const FONT_SIZE_ADJUST_KEYWORDS = [
  'cap-height',
  'ch-width',
  'ex-height',
  'from-font',
  'ic-height',
  'ic-width',
  'none',
] as const;

/** font-smooth 属性支持的关键词 */
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

/** font-stretch 属性支持的关键词 */
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

/** font-style 属性支持的关键词 */
export const FONT_STYLE_KEYWORDS = [
  'italic',
  'normal',
  'oblique',
] as const;

/** font-synthesis 属性支持的关键词 */
export const FONT_SYNTHESIS_KEYWORDS = [
  'none',
  'position',
  'small-caps',
  'style',
  'weight',
] as const;

/** font-synthesis-position 属性支持的关键词 */
export const FONT_SYNTHESIS_POSITION_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-small-caps 属性支持的关键词 */
export const FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-style 属性支持的关键词 */
export const FONT_SYNTHESIS_STYLE_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-synthesis-weight 属性支持的关键词 */
export const FONT_SYNTHESIS_WEIGHT_KEYWORDS = [
  'auto',
  'none',
] as const;

/** font-variant 属性支持的关键词 */
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

/** font-variant-alternates 属性支持的关键词 */
export const FONT_VARIANT_ALTERNATES_KEYWORDS = [
  'historical-forms',
  'normal',
] as const;

/** font-variant-caps 属性支持的关键词 */
export const FONT_VARIANT_CAPS_KEYWORDS = [
  'all-petite-caps',
  'all-small-caps',
  'normal',
  'petite-caps',
  'small-caps',
  'titling-caps',
  'unicase',
] as const;

/** font-variant-east-asian 属性支持的关键词 */
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

/** font-variant-emoji 属性支持的关键词 */
export const FONT_VARIANT_EMOJI_KEYWORDS = [
  'emoji',
  'normal',
  'text',
  'unicode',
] as const;

/** font-variant-ligatures 属性支持的关键词 */
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

/** font-variant-numeric 属性支持的关键词 */
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

/** font-variant-position 属性支持的关键词 */
export const FONT_VARIANT_POSITION_KEYWORDS = [
  'normal',
  'sub',
  'super',
] as const;

/** font-variation-settings 属性支持的关键词 */
export const FONT_VARIATION_SETTINGS_KEYWORDS = [
  'normal',
] as const;

/** font-weight 属性支持的关键词 */
export const FONT_WEIGHT_KEYWORDS = [
  'bold',
  'bolder',
  'lighter',
  'normal',
] as const;

/** forced-color-adjust 属性支持的关键词 */
export const FORCED_COLOR_ADJUST_KEYWORDS = [
  'auto',
  'none',
  'preserve-parent-color',
] as const;

/** grid 属性支持的关键词 */
export const GRID_KEYWORDS = [
  'auto-flow',
  'dense',
] as const;

/** grid-area 属性支持的关键词 */
export const GRID_AREA_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-auto-columns 属性支持的关键词 */
export const GRID_AUTO_COLUMNS_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
] as const;

/** grid-auto-flow 属性支持的关键词 */
export const GRID_AUTO_FLOW_KEYWORDS = [
  'column',
  'dense',
  'row',
] as const;

/** grid-auto-rows 属性支持的关键词 */
export const GRID_AUTO_ROWS_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
] as const;

/** grid-column 属性支持的关键词 */
export const GRID_COLUMN_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-column-end 属性支持的关键词 */
export const GRID_COLUMN_END_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-column-start 属性支持的关键词 */
export const GRID_COLUMN_START_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row 属性支持的关键词 */
export const GRID_ROW_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row-end 属性支持的关键词 */
export const GRID_ROW_END_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-row-start 属性支持的关键词 */
export const GRID_ROW_START_KEYWORDS = [
  'auto',
  'span',
] as const;

/** grid-template 属性支持的关键词 */
export const GRID_TEMPLATE_KEYWORDS = [
  'auto',
  'max-content',
  'min-content',
  'none',
] as const;

/** grid-template-areas 属性支持的关键词 */
export const GRID_TEMPLATE_AREAS_KEYWORDS = [
  'none',
] as const;

/** grid-template-columns 属性支持的关键词 */
export const GRID_TEMPLATE_COLUMNS_KEYWORDS = [
  'auto',
  'auto-fill',
  'auto-fit',
  'max-content',
  'min-content',
  'none',
  'subgrid',
] as const;

/** grid-template-rows 属性支持的关键词 */
export const GRID_TEMPLATE_ROWS_KEYWORDS = [
  'auto',
  'auto-fill',
  'auto-fit',
  'max-content',
  'min-content',
  'none',
  'subgrid',
] as const;

/** hanging-punctuation 属性支持的关键词 */
export const HANGING_PUNCTUATION_KEYWORDS = [
  'allow-end',
  'first',
  'force-end',
  'last',
  'none',
] as const;

/** height 属性支持的关键词 */
export const HEIGHT_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** hyphenate-character 属性支持的关键词 */
export const HYPHENATE_CHARACTER_KEYWORDS = [
  'auto',
] as const;

/** hyphenate-limit-chars 属性支持的关键词 */
export const HYPHENATE_LIMIT_CHARS_KEYWORDS = [
  'auto',
] as const;

/** hyphens 属性支持的关键词 */
export const HYPHENS_KEYWORDS = [
  'auto',
  'manual',
  'none',
] as const;

/** image-orientation 属性支持的关键词 */
export const IMAGE_ORIENTATION_KEYWORDS = [
  'flip',
  'from-image',
] as const;

/** image-rendering 属性支持的关键词 */
export const IMAGE_RENDERING_KEYWORDS = [
  'auto',
  'crisp-edges',
  'optimize-contrast',
  'optimizeQuality',
  'optimizeSpeed',
  'pixelated',
] as const;

/** image-resolution 属性支持的关键词 */
export const IMAGE_RESOLUTION_KEYWORDS = [
  'from-image',
  'snap',
] as const;

/** ime-mode 属性支持的关键词 */
export const IME_MODE_KEYWORDS = [
  'active',
  'auto',
  'disabled',
  'inactive',
  'normal',
] as const;

/** initial-letter 属性支持的关键词 */
export const INITIAL_LETTER_KEYWORDS = [
  'normal',
] as const;

/** initial-letter-align 属性支持的关键词 */
export const INITIAL_LETTER_ALIGN_KEYWORDS = [
  'alphabetic',
  'auto',
  'hanging',
  'ideographic',
] as const;

/** input-security 属性支持的关键词 */
export const INPUT_SECURITY_KEYWORDS = [
  'auto',
  'none',
] as const;

/** interpolate-size 属性支持的关键词 */
export const INTERPOLATE_SIZE_KEYWORDS = [
  'allow-keywords',
  'numeric-only',
] as const;

/** isolation 属性支持的关键词 */
export const ISOLATION_KEYWORDS = [
  'auto',
  'isolate',
] as const;

/** justify-content 属性支持的关键词 */
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

/** justify-items 属性支持的关键词 */
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

/** justify-self 属性支持的关键词 */
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

/** justify-tracks 属性支持的关键词 */
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

/** kerning 属性支持的关键词 */
export const KERNING_KEYWORDS = [
  'auto',
] as const;

/** left 属性支持的关键词 */
export const LEFT_KEYWORDS = [
  'auto',
] as const;

/** letter-spacing 属性支持的关键词 */
export const LETTER_SPACING_KEYWORDS = [
  'normal',
] as const;

/** line-break 属性支持的关键词 */
export const LINE_BREAK_KEYWORDS = [
  'anywhere',
  'auto',
  'loose',
  'normal',
  'strict',
] as const;

/** line-clamp 属性支持的关键词 */
export const LINE_CLAMP_KEYWORDS = [
  'none',
] as const;

/** line-height 属性支持的关键词 */
export const LINE_HEIGHT_KEYWORDS = [
  'normal',
] as const;

/** list-style-image 属性支持的关键词（不含颜色） */
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

/** list-style-position 属性支持的关键词 */
export const LIST_STYLE_POSITION_KEYWORDS = [
  'inside',
  'outside',
] as const;

/** list-style-type 属性支持的关键词 */
export const LIST_STYLE_TYPE_KEYWORDS = [
  'none',
] as const;

/** margin 属性支持的关键词 */
export const MARGIN_KEYWORDS = [
  'auto',
] as const;

/** margin-bottom 属性支持的关键词 */
export const MARGIN_BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** margin-left 属性支持的关键词 */
export const MARGIN_LEFT_KEYWORDS = [
  'auto',
] as const;

/** margin-right 属性支持的关键词 */
export const MARGIN_RIGHT_KEYWORDS = [
  'auto',
] as const;

/** margin-top 属性支持的关键词 */
export const MARGIN_TOP_KEYWORDS = [
  'auto',
] as const;

/** margin-trim 属性支持的关键词 */
export const MARGIN_TRIM_KEYWORDS = [
  'all',
  'in-flow',
  'none',
] as const;

/** marker 属性支持的关键词 */
export const MARKER_KEYWORDS = [
  'none',
] as const;

/** marker-end 属性支持的关键词 */
export const MARKER_END_KEYWORDS = [
  'none',
] as const;

/** marker-mid 属性支持的关键词 */
export const MARKER_MID_KEYWORDS = [
  'none',
] as const;

/** marker-start 属性支持的关键词 */
export const MARKER_START_KEYWORDS = [
  'none',
] as const;

/** mask 属性支持的关键词（不含颜色） */
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

/** mask-border-mode 属性支持的关键词 */
export const MASK_BORDER_MODE_KEYWORDS = [
  'alpha',
  'luminance',
] as const;

/** mask-border-repeat 属性支持的关键词 */
export const MASK_BORDER_REPEAT_KEYWORDS = [
  'repeat',
  'round',
  'space',
  'stretch',
] as const;

/** mask-border-slice 属性支持的关键词 */
export const MASK_BORDER_SLICE_KEYWORDS = [
  'fill',
] as const;

/** mask-border-source 属性支持的关键词（不含颜色） */
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

/** mask-border-width 属性支持的关键词 */
export const MASK_BORDER_WIDTH_KEYWORDS = [
  'auto',
] as const;

/** mask-clip 属性支持的关键词 */
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

/** mask-composite 属性支持的关键词 */
export const MASK_COMPOSITE_KEYWORDS = [
  'add',
  'exclude',
  'intersect',
  'subtract',
] as const;

/** mask-image 属性支持的关键词（不含颜色） */
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

/** mask-mode 属性支持的关键词 */
export const MASK_MODE_KEYWORDS = [
  'alpha',
  'luminance',
  'match-source',
] as const;

/** mask-origin 属性支持的关键词 */
export const MASK_ORIGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'fill-box',
  'margin-box',
  'padding-box',
  'stroke-box',
  'view-box',
] as const;

/** mask-position 属性支持的关键词 */
export const MASK_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** mask-repeat 属性支持的关键词 */
export const MASK_REPEAT_KEYWORDS = [
  'no-repeat',
  'repeat',
  'repeat-x',
  'repeat-y',
  'round',
  'space',
] as const;

/** mask-size 属性支持的关键词 */
export const MASK_SIZE_KEYWORDS = [
  'auto',
  'contain',
  'cover',
] as const;

/** mask-type 属性支持的关键词 */
export const MASK_TYPE_KEYWORDS = [
  'alpha',
  'luminance',
] as const;

/** masonry-auto-flow 属性支持的关键词 */
export const MASONRY_AUTO_FLOW_KEYWORDS = [
  'definite-first',
  'next',
  'ordered',
  'pack',
] as const;

/** math-depth 属性支持的关键词 */
export const MATH_DEPTH_KEYWORDS = [
  'auto-add',
] as const;

/** math-shift 属性支持的关键词 */
export const MATH_SHIFT_KEYWORDS = [
  'compact',
  'normal',
] as const;

/** math-style 属性支持的关键词 */
export const MATH_STYLE_KEYWORDS = [
  'compact',
  'normal',
] as const;

/** max-height 属性支持的关键词 */
export const MAX_HEIGHT_KEYWORDS = [
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'none',
  'stretch',
] as const;

/** max-lines 属性支持的关键词 */
export const MAX_LINES_KEYWORDS = [
  'none',
] as const;

/** max-width 属性支持的关键词 */
export const MAX_WIDTH_KEYWORDS = [
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'none',
  'stretch',
] as const;

/** min-height 属性支持的关键词 */
export const MIN_HEIGHT_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** min-width 属性支持的关键词 */
export const MIN_WIDTH_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** mix-blend-mode 属性支持的关键词 */
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

/** object-fit 属性支持的关键词 */
export const OBJECT_FIT_KEYWORDS = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
] as const;

/** object-position 属性支持的关键词 */
export const OBJECT_POSITION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** offset-anchor 属性支持的关键词 */
export const OFFSET_ANCHOR_KEYWORDS = [
  'auto',
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** offset-path 属性支持的关键词 */
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

/** offset-position 属性支持的关键词 */
export const OFFSET_POSITION_KEYWORDS = [
  'auto',
  'bottom',
  'center',
  'left',
  'normal',
  'right',
  'top',
] as const;

/** offset-rotate 属性支持的关键词 */
export const OFFSET_ROTATE_KEYWORDS = [
  'auto',
  'reverse',
] as const;

/** outline-color 属性支持的关键词（不含颜色） */
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

/** outline-style 属性支持的关键词 */
export const OUTLINE_STYLE_KEYWORDS = [
  'auto',
] as const;

/** outline-width 属性支持的关键词 */
export const OUTLINE_WIDTH_KEYWORDS = [
  'medium',
  'thick',
  'thin',
] as const;

/** overflow 属性支持的关键词 */
export const OVERFLOW_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'overlay',
  'scroll',
  'visible',
] as const;

/** overflow-anchor 属性支持的关键词 */
export const OVERFLOW_ANCHOR_KEYWORDS = [
  'auto',
  'none',
] as const;

/** overflow-block 属性支持的关键词 */
export const OVERFLOW_BLOCK_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-clip-box 属性支持的关键词 */
export const OVERFLOW_CLIP_BOX_KEYWORDS = [
  'content-box',
  'padding-box',
] as const;

/** overflow-clip-margin 属性支持的关键词 */
export const OVERFLOW_CLIP_MARGIN_KEYWORDS = [
  'border-box',
  'content-box',
  'padding-box',
] as const;

/** overflow-inline 属性支持的关键词 */
export const OVERFLOW_INLINE_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-wrap 属性支持的关键词 */
export const OVERFLOW_WRAP_KEYWORDS = [
  'anywhere',
  'break-word',
  'normal',
] as const;

/** overflow-x 属性支持的关键词 */
export const OVERFLOW_X_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overflow-y 属性支持的关键词 */
export const OVERFLOW_Y_KEYWORDS = [
  'auto',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

/** overlay 属性支持的关键词 */
export const OVERLAY_KEYWORDS = [
  'auto',
  'none',
] as const;

/** overscroll-behavior 属性支持的关键词 */
export const OVERSCROLL_BEHAVIOR_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-block 属性支持的关键词 */
export const OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-inline 属性支持的关键词 */
export const OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-x 属性支持的关键词 */
export const OVERSCROLL_BEHAVIOR_X_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** overscroll-behavior-y 属性支持的关键词 */
export const OVERSCROLL_BEHAVIOR_Y_KEYWORDS = [
  'auto',
  'contain',
  'none',
] as const;

/** page 属性支持的关键词 */
export const PAGE_KEYWORDS = [
  'auto',
] as const;

/** page-break-after 属性支持的关键词 */
export const PAGE_BREAK_AFTER_KEYWORDS = [
  'always',
  'auto',
  'avoid',
  'left',
  'recto',
  'right',
  'verso',
] as const;

/** page-break-before 属性支持的关键词 */
export const PAGE_BREAK_BEFORE_KEYWORDS = [
  'always',
  'auto',
  'avoid',
  'left',
  'recto',
  'right',
  'verso',
] as const;

/** page-break-inside 属性支持的关键词 */
export const PAGE_BREAK_INSIDE_KEYWORDS = [
  'auto',
  'avoid',
] as const;

/** paint-order 属性支持的关键词 */
export const PAINT_ORDER_KEYWORDS = [
  'fill',
  'markers',
  'normal',
  'stroke',
] as const;

/** pause-after 属性支持的关键词 */
export const PAUSE_AFTER_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** pause-before 属性支持的关键词 */
export const PAUSE_BEFORE_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** perspective 属性支持的关键词 */
export const PERSPECTIVE_KEYWORDS = [
  'none',
] as const;

/** perspective-origin 属性支持的关键词 */
export const PERSPECTIVE_ORIGIN_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** pointer-events 属性支持的关键词 */
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

/** position 属性支持的关键词 */
export const POSITION_KEYWORDS = [
  'absolute',
  'fixed',
  'relative',
  'static',
  'sticky',
] as const;

/** position-anchor 属性支持的关键词 */
export const POSITION_ANCHOR_KEYWORDS = [
  'auto',
] as const;

/** position-area 属性支持的关键词 */
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

/** position-try-fallbacks 属性支持的关键词 */
export const POSITION_TRY_FALLBACKS_KEYWORDS = [
  'flip-block',
  'flip-inline',
  'flip-start',
  'none',
] as const;

/** position-try-order 属性支持的关键词 */
export const POSITION_TRY_ORDER_KEYWORDS = [
  'most-block-size',
  'most-height',
  'most-inline-size',
  'most-width',
  'normal',
] as const;

/** position-visibility 属性支持的关键词 */
export const POSITION_VISIBILITY_KEYWORDS = [
  'always',
  'anchors-valid',
  'anchors-visible',
  'no-overflow',
] as const;

/** print-color-adjust 属性支持的关键词 */
export const PRINT_COLOR_ADJUST_KEYWORDS = [
  'economy',
  'exact',
] as const;

/** quotes 属性支持的关键词 */
export const QUOTES_KEYWORDS = [
  'auto',
  'none',
] as const;

/** resize 属性支持的关键词 */
export const RESIZE_KEYWORDS = [
  'block',
  'both',
  'horizontal',
  'inline',
  'none',
  'vertical',
] as const;

/** rest-after 属性支持的关键词 */
export const REST_AFTER_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** rest-before 属性支持的关键词 */
export const REST_BEFORE_KEYWORDS = [
  'medium',
  'none',
  'strong',
  'weak',
  'x-strong',
  'x-weak',
] as const;

/** right 属性支持的关键词 */
export const RIGHT_KEYWORDS = [
  'auto',
] as const;

/** rotate 属性支持的关键词 */
export const ROTATE_KEYWORDS = [
  'none',
  'x',
  'y',
  'z',
] as const;

/** row-gap 属性支持的关键词 */
export const ROW_GAP_KEYWORDS = [
  'normal',
] as const;

/** ruby-align 属性支持的关键词 */
export const RUBY_ALIGN_KEYWORDS = [
  'center',
  'space-around',
  'space-between',
  'start',
] as const;

/** ruby-merge 属性支持的关键词 */
export const RUBY_MERGE_KEYWORDS = [
  'auto',
  'collapse',
  'separate',
] as const;

/** ruby-position 属性支持的关键词 */
export const RUBY_POSITION_KEYWORDS = [
  'alternate',
  'inter-character',
  'over',
  'under',
] as const;

/** scale 属性支持的关键词 */
export const SCALE_KEYWORDS = [
  'none',
] as const;

/** scroll-behavior 属性支持的关键词 */
export const SCROLL_BEHAVIOR_KEYWORDS = [
  'auto',
  'smooth',
] as const;

/** scroll-padding 属性支持的关键词 */
export const SCROLL_PADDING_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block 属性支持的关键词 */
export const SCROLL_PADDING_BLOCK_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block-end 属性支持的关键词 */
export const SCROLL_PADDING_BLOCK_END_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-block-start 属性支持的关键词 */
export const SCROLL_PADDING_BLOCK_START_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-bottom 属性支持的关键词 */
export const SCROLL_PADDING_BOTTOM_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline 属性支持的关键词 */
export const SCROLL_PADDING_INLINE_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline-end 属性支持的关键词 */
export const SCROLL_PADDING_INLINE_END_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-inline-start 属性支持的关键词 */
export const SCROLL_PADDING_INLINE_START_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-left 属性支持的关键词 */
export const SCROLL_PADDING_LEFT_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-right 属性支持的关键词 */
export const SCROLL_PADDING_RIGHT_KEYWORDS = [
  'auto',
] as const;

/** scroll-padding-top 属性支持的关键词 */
export const SCROLL_PADDING_TOP_KEYWORDS = [
  'auto',
] as const;

/** scroll-snap-align 属性支持的关键词 */
export const SCROLL_SNAP_ALIGN_KEYWORDS = [
  'center',
  'end',
  'none',
  'start',
] as const;

/** scroll-snap-coordinate 属性支持的关键词 */
export const SCROLL_SNAP_COORDINATE_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'none',
  'right',
  'top',
] as const;

/** scroll-snap-destination 属性支持的关键词 */
export const SCROLL_SNAP_DESTINATION_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** scroll-snap-points-x 属性支持的关键词 */
export const SCROLL_SNAP_POINTS_X_KEYWORDS = [
  'none',
] as const;

/** scroll-snap-points-y 属性支持的关键词 */
export const SCROLL_SNAP_POINTS_Y_KEYWORDS = [
  'none',
] as const;

/** scroll-snap-stop 属性支持的关键词 */
export const SCROLL_SNAP_STOP_KEYWORDS = [
  'always',
  'normal',
] as const;

/** scroll-snap-type 属性支持的关键词 */
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

/** scroll-snap-type-x 属性支持的关键词 */
export const SCROLL_SNAP_TYPE_X_KEYWORDS = [
  'mandatory',
  'none',
  'proximity',
] as const;

/** scroll-snap-type-y 属性支持的关键词 */
export const SCROLL_SNAP_TYPE_Y_KEYWORDS = [
  'mandatory',
  'none',
  'proximity',
] as const;

/** scroll-timeline-axis 属性支持的关键词 */
export const SCROLL_TIMELINE_AXIS_KEYWORDS = [
  'block',
  'inline',
  'x',
  'y',
] as const;

/** scroll-timeline-name 属性支持的关键词 */
export const SCROLL_TIMELINE_NAME_KEYWORDS = [
  'none',
] as const;

/** scrollbar-color 属性支持的关键词（不含颜色） */
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

/** scrollbar-gutter 属性支持的关键词 */
export const SCROLLBAR_GUTTER_KEYWORDS = [
  'auto',
  'both-edges',
  'stable',
] as const;

/** scrollbar-width 属性支持的关键词 */
export const SCROLLBAR_WIDTH_KEYWORDS = [
  'auto',
  'none',
  'thin',
] as const;

/** shape-outside 属性支持的关键词（不含颜色） */
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

/** shape-rendering 属性支持的关键词 */
export const SHAPE_RENDERING_KEYWORDS = [
  'auto',
  'crispEdges',
  'geometricPrecision',
  'optimizeSpeed',
] as const;

/** speak 属性支持的关键词 */
export const SPEAK_KEYWORDS = [
  'always',
  'auto',
  'never',
] as const;

/** speak-as 属性支持的关键词 */
export const SPEAK_AS_KEYWORDS = [
  'digits',
  'literal-punctuation',
  'no-punctuation',
  'normal',
  'spell-out',
] as const;

/** stroke 属性支持的关键词（不含颜色） */
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

/** stroke-dasharray 属性支持的关键词 */
export const STROKE_DASHARRAY_KEYWORDS = [
  'none',
] as const;

/** stroke-linecap 属性支持的关键词 */
export const STROKE_LINECAP_KEYWORDS = [
  'butt',
  'round',
  'square',
] as const;

/** stroke-linejoin 属性支持的关键词 */
export const STROKE_LINEJOIN_KEYWORDS = [
  'bevel',
  'miter',
  'round',
] as const;

/** table-layout 属性支持的关键词 */
export const TABLE_LAYOUT_KEYWORDS = [
  'auto',
  'fixed',
] as const;

/** text-align 属性支持的关键词 */
export const TEXT_ALIGN_KEYWORDS = [
  'center',
  'end',
  'justify',
  'left',
  'match-parent',
  'right',
  'start',
] as const;

/** text-align-last 属性支持的关键词 */
export const TEXT_ALIGN_LAST_KEYWORDS = [
  'auto',
  'center',
  'end',
  'justify',
  'left',
  'right',
  'start',
] as const;

/** text-anchor 属性支持的关键词 */
export const TEXT_ANCHOR_KEYWORDS = [
  'end',
  'middle',
  'start',
] as const;

/** text-combine-upright 属性支持的关键词 */
export const TEXT_COMBINE_UPRIGHT_KEYWORDS = [
  'all',
  'digits',
  'none',
] as const;

/** text-decoration-color 属性支持的关键词（不含颜色） */
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

/** text-decoration-line 属性支持的关键词 */
export const TEXT_DECORATION_LINE_KEYWORDS = [
  'blink',
  'grammar-error',
  'line-through',
  'none',
  'overline',
  'spelling-error',
  'underline',
] as const;

/** text-decoration-skip 属性支持的关键词 */
export const TEXT_DECORATION_SKIP_KEYWORDS = [
  'box-decoration',
  'edges',
  'leading-spaces',
  'none',
  'objects',
  'spaces',
  'trailing-spaces',
] as const;

/** text-decoration-skip-ink 属性支持的关键词 */
export const TEXT_DECORATION_SKIP_INK_KEYWORDS = [
  'all',
  'auto',
  'none',
] as const;

/** text-decoration-style 属性支持的关键词 */
export const TEXT_DECORATION_STYLE_KEYWORDS = [
  'dashed',
  'dotted',
  'double',
  'solid',
  'wavy',
] as const;

/** text-decoration-thickness 属性支持的关键词 */
export const TEXT_DECORATION_THICKNESS_KEYWORDS = [
  'auto',
  'from-font',
] as const;

/** text-emphasis-color 属性支持的关键词（不含颜色） */
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

/** text-emphasis-position 属性支持的关键词 */
export const TEXT_EMPHASIS_POSITION_KEYWORDS = [
  'auto',
  'left',
  'over',
  'right',
  'under',
] as const;

/** text-emphasis-style 属性支持的关键词 */
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

/** text-indent 属性支持的关键词 */
export const TEXT_INDENT_KEYWORDS = [
  'each-line',
  'hanging',
] as const;

/** text-justify 属性支持的关键词 */
export const TEXT_JUSTIFY_KEYWORDS = [
  'auto',
  'inter-character',
  'inter-word',
  'none',
] as const;

/** text-orientation 属性支持的关键词 */
export const TEXT_ORIENTATION_KEYWORDS = [
  'mixed',
  'sideways',
  'upright',
] as const;

/** text-overflow 属性支持的关键词 */
export const TEXT_OVERFLOW_KEYWORDS = [
  'clip',
  'ellipsis',
] as const;

/** text-rendering 属性支持的关键词 */
export const TEXT_RENDERING_KEYWORDS = [
  'auto',
  'geometricPrecision',
  'optimizeLegibility',
  'optimizeSpeed',
] as const;

/** text-shadow 属性支持的关键词（不含颜色） */
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

/** text-size-adjust 属性支持的关键词 */
export const TEXT_SIZE_ADJUST_KEYWORDS = [
  'auto',
  'none',
] as const;

/** text-spacing-trim 属性支持的关键词 */
export const TEXT_SPACING_TRIM_KEYWORDS = [
  'auto',
  'normal',
  'space-all',
  'space-first',
  'trim-all',
  'trim-both',
  'trim-start',
] as const;

/** text-transform 属性支持的关键词 */
export const TEXT_TRANSFORM_KEYWORDS = [
  'capitalize',
  'full-size-kana',
  'full-width',
  'lowercase',
  'none',
  'uppercase',
] as const;

/** text-underline-offset 属性支持的关键词 */
export const TEXT_UNDERLINE_OFFSET_KEYWORDS = [
  'auto',
] as const;

/** text-underline-position 属性支持的关键词 */
export const TEXT_UNDERLINE_POSITION_KEYWORDS = [
  'auto',
  'from-font',
  'left',
  'right',
  'under',
] as const;

/** text-wrap-mode 属性支持的关键词 */
export const TEXT_WRAP_MODE_KEYWORDS = [
  'auto',
  'nowrap',
  'wrap',
] as const;

/** text-wrap-style 属性支持的关键词 */
export const TEXT_WRAP_STYLE_KEYWORDS = [
  'auto',
  'balance',
  'pretty',
  'stable',
] as const;

/** timeline-scope 属性支持的关键词 */
export const TIMELINE_SCOPE_KEYWORDS = [
  'none',
] as const;

/** top 属性支持的关键词 */
export const TOP_KEYWORDS = [
  'auto',
] as const;

/** touch-action 属性支持的关键词 */
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

/** transform 属性支持的关键词 */
export const TRANSFORM_KEYWORDS = [
  'none',
] as const;

/** transform-box 属性支持的关键词 */
export const TRANSFORM_BOX_KEYWORDS = [
  'border-box',
  'content-box',
  'fill-box',
  'stroke-box',
  'view-box',
] as const;

/** transform-origin 属性支持的关键词 */
export const TRANSFORM_ORIGIN_KEYWORDS = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
] as const;

/** transform-style 属性支持的关键词 */
export const TRANSFORM_STYLE_KEYWORDS = [
  'flat',
  'preserve-3d',
] as const;

/** transition 属性支持的关键词 */
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

/** transition-behavior 属性支持的关键词 */
export const TRANSITION_BEHAVIOR_KEYWORDS = [
  'allow-discrete',
  'normal',
] as const;

/** transition-property 属性支持的关键词 */
export const TRANSITION_PROPERTY_KEYWORDS = [
  'all',
  'none',
] as const;

/** transition-timing-function 属性支持的关键词 */
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

/** translate 属性支持的关键词 */
export const TRANSLATE_KEYWORDS = [
  'none',
] as const;

/** unicode-bidi 属性支持的关键词 */
export const UNICODE_BIDI_KEYWORDS = [
  'bidi-override',
  'embed',
  'isolate',
  'isolate-override',
  'normal',
  'plaintext',
] as const;

/** user-select 属性支持的关键词 */
export const USER_SELECT_KEYWORDS = [
  'all',
  'auto',
  'contain',
  'none',
  'text',
] as const;

/** vector-effect 属性支持的关键词 */
export const VECTOR_EFFECT_KEYWORDS = [
  'fixed-position',
  'non-rotation',
  'non-scaling-size',
  'non-scaling-stroke',
  'none',
] as const;

/** vertical-align 属性支持的关键词 */
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

/** view-timeline-axis 属性支持的关键词 */
export const VIEW_TIMELINE_AXIS_KEYWORDS = [
  'block',
  'inline',
  'x',
  'y',
] as const;

/** view-timeline-inset 属性支持的关键词 */
export const VIEW_TIMELINE_INSET_KEYWORDS = [
  'auto',
] as const;

/** view-timeline-name 属性支持的关键词 */
export const VIEW_TIMELINE_NAME_KEYWORDS = [
  'none',
] as const;

/** view-transition-name 属性支持的关键词 */
export const VIEW_TRANSITION_NAME_KEYWORDS = [
  'none',
] as const;

/** visibility 属性支持的关键词 */
export const VISIBILITY_KEYWORDS = [
  'collapse',
  'hidden',
  'visible',
] as const;

/** voice-balance 属性支持的关键词 */
export const VOICE_BALANCE_KEYWORDS = [
  'center',
  'left',
  'leftwards',
  'right',
  'rightwards',
] as const;

/** voice-duration 属性支持的关键词 */
export const VOICE_DURATION_KEYWORDS = [
  'auto',
] as const;

/** voice-family 属性支持的关键词 */
export const VOICE_FAMILY_KEYWORDS = [
  'child',
  'female',
  'male',
  'neutral',
  'old',
  'preserve',
  'young',
] as const;

/** voice-pitch 属性支持的关键词 */
export const VOICE_PITCH_KEYWORDS = [
  'absolute',
  'high',
  'low',
  'medium',
  'x-high',
  'x-low',
] as const;

/** voice-range 属性支持的关键词 */
export const VOICE_RANGE_KEYWORDS = [
  'absolute',
  'high',
  'low',
  'medium',
  'x-high',
  'x-low',
] as const;

/** voice-rate 属性支持的关键词 */
export const VOICE_RATE_KEYWORDS = [
  'fast',
  'medium',
  'normal',
  'slow',
  'x-fast',
  'x-slow',
] as const;

/** voice-stress 属性支持的关键词 */
export const VOICE_STRESS_KEYWORDS = [
  'moderate',
  'none',
  'normal',
  'reduced',
  'strong',
] as const;

/** voice-volume 属性支持的关键词 */
export const VOICE_VOLUME_KEYWORDS = [
  'loud',
  'medium',
  'silent',
  'soft',
  'x-loud',
  'x-soft',
] as const;

/** white-space 属性支持的关键词 */
export const WHITE_SPACE_KEYWORDS = [
  'break-spaces',
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
] as const;

/** white-space-collapse 属性支持的关键词 */
export const WHITE_SPACE_COLLAPSE_KEYWORDS = [
  'break-spaces',
  'collapse',
  'discard',
  'preserve',
  'preserve-breaks',
  'preserve-spaces',
] as const;

/** white-space-trim 属性支持的关键词 */
export const WHITE_SPACE_TRIM_KEYWORDS = [
  'discard-after',
  'discard-before',
  'discard-inner',
  'none',
] as const;

/** width 属性支持的关键词 */
export const WIDTH_KEYWORDS = [
  'auto',
  'fit-content',
  'intrinsic',
  'max-content',
  'min-content',
  'min-intrinsic',
  'stretch',
] as const;

/** will-change 属性支持的关键词 */
export const WILL_CHANGE_KEYWORDS = [
  'auto',
  'contents',
  'scroll-position',
] as const;

/** word-break 属性支持的关键词 */
export const WORD_BREAK_KEYWORDS = [
  'auto-phrase',
  'break-all',
  'break-word',
  'keep-all',
  'normal',
] as const;

/** word-spacing 属性支持的关键词 */
export const WORD_SPACING_KEYWORDS = [
  'normal',
] as const;

/** word-wrap 属性支持的关键词 */
export const WORD_WRAP_KEYWORDS = [
  'break-word',
  'normal',
] as const;

/** writing-mode 属性支持的关键词 */
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

/** z-index 属性支持的关键词 */
export const Z_INDEX_KEYWORDS = [
  'auto',
] as const;

/** zoom 属性支持的关键词 */
export const ZOOM_KEYWORDS = [
  'normal',
  'reset',
] as const;

// ==================== 关键词类型 ====================

/** accent-color 关键词类型 */
export type AccentColorKeyword = typeof ACCENT_COLOR_KEYWORDS[number];
/** align-content 关键词类型 */
export type AlignContentKeyword = typeof ALIGN_CONTENT_KEYWORDS[number];
/** align-items 关键词类型 */
export type AlignItemsKeyword = typeof ALIGN_ITEMS_KEYWORDS[number];
/** align-self 关键词类型 */
export type AlignSelfKeyword = typeof ALIGN_SELF_KEYWORDS[number];
/** align-tracks 关键词类型 */
export type AlignTracksKeyword = typeof ALIGN_TRACKS_KEYWORDS[number];
/** alignment-baseline 关键词类型 */
export type AlignmentBaselineKeyword = typeof ALIGNMENT_BASELINE_KEYWORDS[number];
/** all 关键词类型 */
export type AllKeyword = typeof ALL_KEYWORDS[number];
/** anchor-name 关键词类型 */
export type AnchorNameKeyword = typeof ANCHOR_NAME_KEYWORDS[number];
/** anchor-scope 关键词类型 */
export type AnchorScopeKeyword = typeof ANCHOR_SCOPE_KEYWORDS[number];
/** animation 关键词类型 */
export type AnimationKeyword = typeof ANIMATION_KEYWORDS[number];
/** animation-composition 关键词类型 */
export type AnimationCompositionKeyword = typeof ANIMATION_COMPOSITION_KEYWORDS[number];
/** animation-direction 关键词类型 */
export type AnimationDirectionKeyword = typeof ANIMATION_DIRECTION_KEYWORDS[number];
/** animation-fill-mode 关键词类型 */
export type AnimationFillModeKeyword = typeof ANIMATION_FILL_MODE_KEYWORDS[number];
/** animation-iteration-count 关键词类型 */
export type AnimationIterationCountKeyword = typeof ANIMATION_ITERATION_COUNT_KEYWORDS[number];
/** animation-name 关键词类型 */
export type AnimationNameKeyword = typeof ANIMATION_NAME_KEYWORDS[number];
/** animation-play-state 关键词类型 */
export type AnimationPlayStateKeyword = typeof ANIMATION_PLAY_STATE_KEYWORDS[number];
/** animation-range-end 关键词类型 */
export type AnimationRangeEndKeyword = typeof ANIMATION_RANGE_END_KEYWORDS[number];
/** animation-range-start 关键词类型 */
export type AnimationRangeStartKeyword = typeof ANIMATION_RANGE_START_KEYWORDS[number];
/** animation-timeline 关键词类型 */
export type AnimationTimelineKeyword = typeof ANIMATION_TIMELINE_KEYWORDS[number];
/** animation-timing-function 关键词类型 */
export type AnimationTimingFunctionKeyword = typeof ANIMATION_TIMING_FUNCTION_KEYWORDS[number];
/** appearance 关键词类型 */
export type AppearanceKeyword = typeof APPEARANCE_KEYWORDS[number];
/** aspect-ratio 关键词类型 */
export type AspectRatioKeyword = typeof ASPECT_RATIO_KEYWORDS[number];
/** azimuth 关键词类型 */
export type AzimuthKeyword = typeof AZIMUTH_KEYWORDS[number];
/** backdrop-filter 关键词类型 */
export type BackdropFilterKeyword = typeof BACKDROP_FILTER_KEYWORDS[number];
/** backface-visibility 关键词类型 */
export type BackfaceVisibilityKeyword = typeof BACKFACE_VISIBILITY_KEYWORDS[number];
/** background 关键词类型 */
export type BackgroundKeyword = typeof BACKGROUND_KEYWORDS[number];
/** background-attachment 关键词类型 */
export type BackgroundAttachmentKeyword = typeof BACKGROUND_ATTACHMENT_KEYWORDS[number];
/** background-blend-mode 关键词类型 */
export type BackgroundBlendModeKeyword = typeof BACKGROUND_BLEND_MODE_KEYWORDS[number];
/** background-clip 关键词类型 */
export type BackgroundClipKeyword = typeof BACKGROUND_CLIP_KEYWORDS[number];
/** background-color 关键词类型 */
export type BackgroundColorKeyword = typeof BACKGROUND_COLOR_KEYWORDS[number];
/** background-image 关键词类型 */
export type BackgroundImageKeyword = typeof BACKGROUND_IMAGE_KEYWORDS[number];
/** background-origin 关键词类型 */
export type BackgroundOriginKeyword = typeof BACKGROUND_ORIGIN_KEYWORDS[number];
/** background-position 关键词类型 */
export type BackgroundPositionKeyword = typeof BACKGROUND_POSITION_KEYWORDS[number];
/** background-position-x 关键词类型 */
export type BackgroundPositionXKeyword = typeof BACKGROUND_POSITION_X_KEYWORDS[number];
/** background-position-y 关键词类型 */
export type BackgroundPositionYKeyword = typeof BACKGROUND_POSITION_Y_KEYWORDS[number];
/** background-repeat 关键词类型 */
export type BackgroundRepeatKeyword = typeof BACKGROUND_REPEAT_KEYWORDS[number];
/** background-size 关键词类型 */
export type BackgroundSizeKeyword = typeof BACKGROUND_SIZE_KEYWORDS[number];
/** baseline-shift 关键词类型 */
export type BaselineShiftKeyword = typeof BASELINE_SHIFT_KEYWORDS[number];
/** border 关键词类型 */
export type BorderKeyword = typeof BORDER_KEYWORDS[number];
/** border-block 关键词类型 */
export type BorderBlockKeyword = typeof BORDER_BLOCK_KEYWORDS[number];
/** border-block-end 关键词类型 */
export type BorderBlockEndKeyword = typeof BORDER_BLOCK_END_KEYWORDS[number];
/** border-block-start 关键词类型 */
export type BorderBlockStartKeyword = typeof BORDER_BLOCK_START_KEYWORDS[number];
/** border-bottom 关键词类型 */
export type BorderBottomKeyword = typeof BORDER_BOTTOM_KEYWORDS[number];
/** border-bottom-style 关键词类型 */
export type BorderBottomStyleKeyword = typeof BORDER_BOTTOM_STYLE_KEYWORDS[number];
/** border-bottom-width 关键词类型 */
export type BorderBottomWidthKeyword = typeof BORDER_BOTTOM_WIDTH_KEYWORDS[number];
/** border-collapse 关键词类型 */
export type BorderCollapseKeyword = typeof BORDER_COLLAPSE_KEYWORDS[number];
/** border-color 关键词类型 */
export type BorderColorKeyword = typeof BORDER_COLOR_KEYWORDS[number];
/** border-image-repeat 关键词类型 */
export type BorderImageRepeatKeyword = typeof BORDER_IMAGE_REPEAT_KEYWORDS[number];
/** border-image-slice 关键词类型 */
export type BorderImageSliceKeyword = typeof BORDER_IMAGE_SLICE_KEYWORDS[number];
/** border-image-source 关键词类型 */
export type BorderImageSourceKeyword = typeof BORDER_IMAGE_SOURCE_KEYWORDS[number];
/** border-image-width 关键词类型 */
export type BorderImageWidthKeyword = typeof BORDER_IMAGE_WIDTH_KEYWORDS[number];
/** border-inline 关键词类型 */
export type BorderInlineKeyword = typeof BORDER_INLINE_KEYWORDS[number];
/** border-inline-end 关键词类型 */
export type BorderInlineEndKeyword = typeof BORDER_INLINE_END_KEYWORDS[number];
/** border-inline-start 关键词类型 */
export type BorderInlineStartKeyword = typeof BORDER_INLINE_START_KEYWORDS[number];
/** border-left 关键词类型 */
export type BorderLeftKeyword = typeof BORDER_LEFT_KEYWORDS[number];
/** border-left-color 关键词类型 */
export type BorderLeftColorKeyword = typeof BORDER_LEFT_COLOR_KEYWORDS[number];
/** border-left-style 关键词类型 */
export type BorderLeftStyleKeyword = typeof BORDER_LEFT_STYLE_KEYWORDS[number];
/** border-left-width 关键词类型 */
export type BorderLeftWidthKeyword = typeof BORDER_LEFT_WIDTH_KEYWORDS[number];
/** border-right 关键词类型 */
export type BorderRightKeyword = typeof BORDER_RIGHT_KEYWORDS[number];
/** border-right-color 关键词类型 */
export type BorderRightColorKeyword = typeof BORDER_RIGHT_COLOR_KEYWORDS[number];
/** border-right-style 关键词类型 */
export type BorderRightStyleKeyword = typeof BORDER_RIGHT_STYLE_KEYWORDS[number];
/** border-right-width 关键词类型 */
export type BorderRightWidthKeyword = typeof BORDER_RIGHT_WIDTH_KEYWORDS[number];
/** border-style 关键词类型 */
export type BorderStyleKeyword = typeof BORDER_STYLE_KEYWORDS[number];
/** border-top 关键词类型 */
export type BorderTopKeyword = typeof BORDER_TOP_KEYWORDS[number];
/** border-top-color 关键词类型 */
export type BorderTopColorKeyword = typeof BORDER_TOP_COLOR_KEYWORDS[number];
/** border-top-style 关键词类型 */
export type BorderTopStyleKeyword = typeof BORDER_TOP_STYLE_KEYWORDS[number];
/** border-top-width 关键词类型 */
export type BorderTopWidthKeyword = typeof BORDER_TOP_WIDTH_KEYWORDS[number];
/** border-width 关键词类型 */
export type BorderWidthKeyword = typeof BORDER_WIDTH_KEYWORDS[number];
/** bottom 关键词类型 */
export type BottomKeyword = typeof BOTTOM_KEYWORDS[number];
/** box-align 关键词类型 */
export type BoxAlignKeyword = typeof BOX_ALIGN_KEYWORDS[number];
/** box-decoration-break 关键词类型 */
export type BoxDecorationBreakKeyword = typeof BOX_DECORATION_BREAK_KEYWORDS[number];
/** box-direction 关键词类型 */
export type BoxDirectionKeyword = typeof BOX_DIRECTION_KEYWORDS[number];
/** box-lines 关键词类型 */
export type BoxLinesKeyword = typeof BOX_LINES_KEYWORDS[number];
/** box-orient 关键词类型 */
export type BoxOrientKeyword = typeof BOX_ORIENT_KEYWORDS[number];
/** box-pack 关键词类型 */
export type BoxPackKeyword = typeof BOX_PACK_KEYWORDS[number];
/** box-shadow 关键词类型 */
export type BoxShadowKeyword = typeof BOX_SHADOW_KEYWORDS[number];
/** box-sizing 关键词类型 */
export type BoxSizingKeyword = typeof BOX_SIZING_KEYWORDS[number];
/** break-after 关键词类型 */
export type BreakAfterKeyword = typeof BREAK_AFTER_KEYWORDS[number];
/** break-before 关键词类型 */
export type BreakBeforeKeyword = typeof BREAK_BEFORE_KEYWORDS[number];
/** break-inside 关键词类型 */
export type BreakInsideKeyword = typeof BREAK_INSIDE_KEYWORDS[number];
/** caption-side 关键词类型 */
export type CaptionSideKeyword = typeof CAPTION_SIDE_KEYWORDS[number];
/** caret-color 关键词类型 */
export type CaretColorKeyword = typeof CARET_COLOR_KEYWORDS[number];
/** caret-shape 关键词类型 */
export type CaretShapeKeyword = typeof CARET_SHAPE_KEYWORDS[number];
/** clear 关键词类型 */
export type ClearKeyword = typeof CLEAR_KEYWORDS[number];
/** clip 关键词类型 */
export type ClipKeyword = typeof CLIP_KEYWORDS[number];
/** clip-path 关键词类型 */
export type ClipPathKeyword = typeof CLIP_PATH_KEYWORDS[number];
/** clip-rule 关键词类型 */
export type ClipRuleKeyword = typeof CLIP_RULE_KEYWORDS[number];
/** color 关键词类型 */
export type ColorKeyword = typeof COLOR_KEYWORDS[number];
/** color-interpolation-filters 关键词类型 */
export type ColorInterpolationFiltersKeyword = typeof COLOR_INTERPOLATION_FILTERS_KEYWORDS[number];
/** color-scheme 关键词类型 */
export type ColorSchemeKeyword = typeof COLOR_SCHEME_KEYWORDS[number];
/** column-count 关键词类型 */
export type ColumnCountKeyword = typeof COLUMN_COUNT_KEYWORDS[number];
/** column-fill 关键词类型 */
export type ColumnFillKeyword = typeof COLUMN_FILL_KEYWORDS[number];
/** column-gap 关键词类型 */
export type ColumnGapKeyword = typeof COLUMN_GAP_KEYWORDS[number];
/** column-rule-color 关键词类型 */
export type ColumnRuleColorKeyword = typeof COLUMN_RULE_COLOR_KEYWORDS[number];
/** column-span 关键词类型 */
export type ColumnSpanKeyword = typeof COLUMN_SPAN_KEYWORDS[number];
/** column-width 关键词类型 */
export type ColumnWidthKeyword = typeof COLUMN_WIDTH_KEYWORDS[number];
/** contain 关键词类型 */
export type ContainKeyword = typeof CONTAIN_KEYWORDS[number];
/** contain-intrinsic-block-size 关键词类型 */
export type ContainIntrinsicBlockSizeKeyword = typeof CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS[number];
/** contain-intrinsic-height 关键词类型 */
export type ContainIntrinsicHeightKeyword = typeof CONTAIN_INTRINSIC_HEIGHT_KEYWORDS[number];
/** contain-intrinsic-inline-size 关键词类型 */
export type ContainIntrinsicInlineSizeKeyword = typeof CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS[number];
/** contain-intrinsic-size 关键词类型 */
export type ContainIntrinsicSizeKeyword = typeof CONTAIN_INTRINSIC_SIZE_KEYWORDS[number];
/** contain-intrinsic-width 关键词类型 */
export type ContainIntrinsicWidthKeyword = typeof CONTAIN_INTRINSIC_WIDTH_KEYWORDS[number];
/** container-name 关键词类型 */
export type ContainerNameKeyword = typeof CONTAINER_NAME_KEYWORDS[number];
/** container-type 关键词类型 */
export type ContainerTypeKeyword = typeof CONTAINER_TYPE_KEYWORDS[number];
/** content 关键词类型 */
export type ContentKeyword = typeof CONTENT_KEYWORDS[number];
/** content-visibility 关键词类型 */
export type ContentVisibilityKeyword = typeof CONTENT_VISIBILITY_KEYWORDS[number];
/** counter-increment 关键词类型 */
export type CounterIncrementKeyword = typeof COUNTER_INCREMENT_KEYWORDS[number];
/** counter-reset 关键词类型 */
export type CounterResetKeyword = typeof COUNTER_RESET_KEYWORDS[number];
/** counter-set 关键词类型 */
export type CounterSetKeyword = typeof COUNTER_SET_KEYWORDS[number];
/** cue-after 关键词类型 */
export type CueAfterKeyword = typeof CUE_AFTER_KEYWORDS[number];
/** cue-before 关键词类型 */
export type CueBeforeKeyword = typeof CUE_BEFORE_KEYWORDS[number];
/** cursor 关键词类型 */
export type CursorKeyword = typeof CURSOR_KEYWORDS[number];
/** d 关键词类型 */
export type DKeyword = typeof D_KEYWORDS[number];
/** direction 关键词类型 */
export type DirectionKeyword = typeof DIRECTION_KEYWORDS[number];
/** display 关键词类型 */
export type DisplayKeyword = typeof DISPLAY_KEYWORDS[number];
/** dominant-baseline 关键词类型 */
export type DominantBaselineKeyword = typeof DOMINANT_BASELINE_KEYWORDS[number];
/** empty-cells 关键词类型 */
export type EmptyCellsKeyword = typeof EMPTY_CELLS_KEYWORDS[number];
/** field-sizing 关键词类型 */
export type FieldSizingKeyword = typeof FIELD_SIZING_KEYWORDS[number];
/** fill 关键词类型 */
export type FillKeyword = typeof FILL_KEYWORDS[number];
/** fill-rule 关键词类型 */
export type FillRuleKeyword = typeof FILL_RULE_KEYWORDS[number];
/** filter 关键词类型 */
export type FilterKeyword = typeof FILTER_KEYWORDS[number];
/** flex 关键词类型 */
export type FlexKeyword = typeof FLEX_KEYWORDS[number];
/** flex-basis 关键词类型 */
export type FlexBasisKeyword = typeof FLEX_BASIS_KEYWORDS[number];
/** flex-direction 关键词类型 */
export type FlexDirectionKeyword = typeof FLEX_DIRECTION_KEYWORDS[number];
/** flex-wrap 关键词类型 */
export type FlexWrapKeyword = typeof FLEX_WRAP_KEYWORDS[number];
/** float 关键词类型 */
export type FloatKeyword = typeof FLOAT_KEYWORDS[number];
/** font 关键词类型 */
export type FontKeyword = typeof FONT_KEYWORDS[number];
/** font-family 关键词类型 */
export type FontFamilyKeyword = typeof FONT_FAMILY_KEYWORDS[number];
/** font-feature-settings 关键词类型 */
export type FontFeatureSettingsKeyword = typeof FONT_FEATURE_SETTINGS_KEYWORDS[number];
/** font-kerning 关键词类型 */
export type FontKerningKeyword = typeof FONT_KERNING_KEYWORDS[number];
/** font-language-override 关键词类型 */
export type FontLanguageOverrideKeyword = typeof FONT_LANGUAGE_OVERRIDE_KEYWORDS[number];
/** font-optical-sizing 关键词类型 */
export type FontOpticalSizingKeyword = typeof FONT_OPTICAL_SIZING_KEYWORDS[number];
/** font-palette 关键词类型 */
export type FontPaletteKeyword = typeof FONT_PALETTE_KEYWORDS[number];
/** font-size 关键词类型 */
export type FontSizeKeyword = typeof FONT_SIZE_KEYWORDS[number];
/** font-size-adjust 关键词类型 */
export type FontSizeAdjustKeyword = typeof FONT_SIZE_ADJUST_KEYWORDS[number];
/** font-smooth 关键词类型 */
export type FontSmoothKeyword = typeof FONT_SMOOTH_KEYWORDS[number];
/** font-stretch 关键词类型 */
export type FontStretchKeyword = typeof FONT_STRETCH_KEYWORDS[number];
/** font-style 关键词类型 */
export type FontStyleKeyword = typeof FONT_STYLE_KEYWORDS[number];
/** font-synthesis 关键词类型 */
export type FontSynthesisKeyword = typeof FONT_SYNTHESIS_KEYWORDS[number];
/** font-synthesis-position 关键词类型 */
export type FontSynthesisPositionKeyword = typeof FONT_SYNTHESIS_POSITION_KEYWORDS[number];
/** font-synthesis-small-caps 关键词类型 */
export type FontSynthesisSmallCapsKeyword = typeof FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS[number];
/** font-synthesis-style 关键词类型 */
export type FontSynthesisStyleKeyword = typeof FONT_SYNTHESIS_STYLE_KEYWORDS[number];
/** font-synthesis-weight 关键词类型 */
export type FontSynthesisWeightKeyword = typeof FONT_SYNTHESIS_WEIGHT_KEYWORDS[number];
/** font-variant 关键词类型 */
export type FontVariantKeyword = typeof FONT_VARIANT_KEYWORDS[number];
/** font-variant-alternates 关键词类型 */
export type FontVariantAlternatesKeyword = typeof FONT_VARIANT_ALTERNATES_KEYWORDS[number];
/** font-variant-caps 关键词类型 */
export type FontVariantCapsKeyword = typeof FONT_VARIANT_CAPS_KEYWORDS[number];
/** font-variant-east-asian 关键词类型 */
export type FontVariantEastAsianKeyword = typeof FONT_VARIANT_EAST_ASIAN_KEYWORDS[number];
/** font-variant-emoji 关键词类型 */
export type FontVariantEmojiKeyword = typeof FONT_VARIANT_EMOJI_KEYWORDS[number];
/** font-variant-ligatures 关键词类型 */
export type FontVariantLigaturesKeyword = typeof FONT_VARIANT_LIGATURES_KEYWORDS[number];
/** font-variant-numeric 关键词类型 */
export type FontVariantNumericKeyword = typeof FONT_VARIANT_NUMERIC_KEYWORDS[number];
/** font-variant-position 关键词类型 */
export type FontVariantPositionKeyword = typeof FONT_VARIANT_POSITION_KEYWORDS[number];
/** font-variation-settings 关键词类型 */
export type FontVariationSettingsKeyword = typeof FONT_VARIATION_SETTINGS_KEYWORDS[number];
/** font-weight 关键词类型 */
export type FontWeightKeyword = typeof FONT_WEIGHT_KEYWORDS[number];
/** forced-color-adjust 关键词类型 */
export type ForcedColorAdjustKeyword = typeof FORCED_COLOR_ADJUST_KEYWORDS[number];
/** grid 关键词类型 */
export type GridKeyword = typeof GRID_KEYWORDS[number];
/** grid-area 关键词类型 */
export type GridAreaKeyword = typeof GRID_AREA_KEYWORDS[number];
/** grid-auto-columns 关键词类型 */
export type GridAutoColumnsKeyword = typeof GRID_AUTO_COLUMNS_KEYWORDS[number];
/** grid-auto-flow 关键词类型 */
export type GridAutoFlowKeyword = typeof GRID_AUTO_FLOW_KEYWORDS[number];
/** grid-auto-rows 关键词类型 */
export type GridAutoRowsKeyword = typeof GRID_AUTO_ROWS_KEYWORDS[number];
/** grid-column 关键词类型 */
export type GridColumnKeyword = typeof GRID_COLUMN_KEYWORDS[number];
/** grid-column-end 关键词类型 */
export type GridColumnEndKeyword = typeof GRID_COLUMN_END_KEYWORDS[number];
/** grid-column-start 关键词类型 */
export type GridColumnStartKeyword = typeof GRID_COLUMN_START_KEYWORDS[number];
/** grid-row 关键词类型 */
export type GridRowKeyword = typeof GRID_ROW_KEYWORDS[number];
/** grid-row-end 关键词类型 */
export type GridRowEndKeyword = typeof GRID_ROW_END_KEYWORDS[number];
/** grid-row-start 关键词类型 */
export type GridRowStartKeyword = typeof GRID_ROW_START_KEYWORDS[number];
/** grid-template 关键词类型 */
export type GridTemplateKeyword = typeof GRID_TEMPLATE_KEYWORDS[number];
/** grid-template-areas 关键词类型 */
export type GridTemplateAreasKeyword = typeof GRID_TEMPLATE_AREAS_KEYWORDS[number];
/** grid-template-columns 关键词类型 */
export type GridTemplateColumnsKeyword = typeof GRID_TEMPLATE_COLUMNS_KEYWORDS[number];
/** grid-template-rows 关键词类型 */
export type GridTemplateRowsKeyword = typeof GRID_TEMPLATE_ROWS_KEYWORDS[number];
/** hanging-punctuation 关键词类型 */
export type HangingPunctuationKeyword = typeof HANGING_PUNCTUATION_KEYWORDS[number];
/** height 关键词类型 */
export type HeightKeyword = typeof HEIGHT_KEYWORDS[number];
/** hyphenate-character 关键词类型 */
export type HyphenateCharacterKeyword = typeof HYPHENATE_CHARACTER_KEYWORDS[number];
/** hyphenate-limit-chars 关键词类型 */
export type HyphenateLimitCharsKeyword = typeof HYPHENATE_LIMIT_CHARS_KEYWORDS[number];
/** hyphens 关键词类型 */
export type HyphensKeyword = typeof HYPHENS_KEYWORDS[number];
/** image-orientation 关键词类型 */
export type ImageOrientationKeyword = typeof IMAGE_ORIENTATION_KEYWORDS[number];
/** image-rendering 关键词类型 */
export type ImageRenderingKeyword = typeof IMAGE_RENDERING_KEYWORDS[number];
/** image-resolution 关键词类型 */
export type ImageResolutionKeyword = typeof IMAGE_RESOLUTION_KEYWORDS[number];
/** ime-mode 关键词类型 */
export type ImeModeKeyword = typeof IME_MODE_KEYWORDS[number];
/** initial-letter 关键词类型 */
export type InitialLetterKeyword = typeof INITIAL_LETTER_KEYWORDS[number];
/** initial-letter-align 关键词类型 */
export type InitialLetterAlignKeyword = typeof INITIAL_LETTER_ALIGN_KEYWORDS[number];
/** input-security 关键词类型 */
export type InputSecurityKeyword = typeof INPUT_SECURITY_KEYWORDS[number];
/** interpolate-size 关键词类型 */
export type InterpolateSizeKeyword = typeof INTERPOLATE_SIZE_KEYWORDS[number];
/** isolation 关键词类型 */
export type IsolationKeyword = typeof ISOLATION_KEYWORDS[number];
/** justify-content 关键词类型 */
export type JustifyContentKeyword = typeof JUSTIFY_CONTENT_KEYWORDS[number];
/** justify-items 关键词类型 */
export type JustifyItemsKeyword = typeof JUSTIFY_ITEMS_KEYWORDS[number];
/** justify-self 关键词类型 */
export type JustifySelfKeyword = typeof JUSTIFY_SELF_KEYWORDS[number];
/** justify-tracks 关键词类型 */
export type JustifyTracksKeyword = typeof JUSTIFY_TRACKS_KEYWORDS[number];
/** kerning 关键词类型 */
export type KerningKeyword = typeof KERNING_KEYWORDS[number];
/** left 关键词类型 */
export type LeftKeyword = typeof LEFT_KEYWORDS[number];
/** letter-spacing 关键词类型 */
export type LetterSpacingKeyword = typeof LETTER_SPACING_KEYWORDS[number];
/** line-break 关键词类型 */
export type LineBreakKeyword = typeof LINE_BREAK_KEYWORDS[number];
/** line-clamp 关键词类型 */
export type LineClampKeyword = typeof LINE_CLAMP_KEYWORDS[number];
/** line-height 关键词类型 */
export type LineHeightKeyword = typeof LINE_HEIGHT_KEYWORDS[number];
/** list-style-image 关键词类型 */
export type ListStyleImageKeyword = typeof LIST_STYLE_IMAGE_KEYWORDS[number];
/** list-style-position 关键词类型 */
export type ListStylePositionKeyword = typeof LIST_STYLE_POSITION_KEYWORDS[number];
/** list-style-type 关键词类型 */
export type ListStyleTypeKeyword = typeof LIST_STYLE_TYPE_KEYWORDS[number];
/** margin 关键词类型 */
export type MarginKeyword = typeof MARGIN_KEYWORDS[number];
/** margin-bottom 关键词类型 */
export type MarginBottomKeyword = typeof MARGIN_BOTTOM_KEYWORDS[number];
/** margin-left 关键词类型 */
export type MarginLeftKeyword = typeof MARGIN_LEFT_KEYWORDS[number];
/** margin-right 关键词类型 */
export type MarginRightKeyword = typeof MARGIN_RIGHT_KEYWORDS[number];
/** margin-top 关键词类型 */
export type MarginTopKeyword = typeof MARGIN_TOP_KEYWORDS[number];
/** margin-trim 关键词类型 */
export type MarginTrimKeyword = typeof MARGIN_TRIM_KEYWORDS[number];
/** marker 关键词类型 */
export type MarkerKeyword = typeof MARKER_KEYWORDS[number];
/** marker-end 关键词类型 */
export type MarkerEndKeyword = typeof MARKER_END_KEYWORDS[number];
/** marker-mid 关键词类型 */
export type MarkerMidKeyword = typeof MARKER_MID_KEYWORDS[number];
/** marker-start 关键词类型 */
export type MarkerStartKeyword = typeof MARKER_START_KEYWORDS[number];
/** mask 关键词类型 */
export type MaskKeyword = typeof MASK_KEYWORDS[number];
/** mask-border-mode 关键词类型 */
export type MaskBorderModeKeyword = typeof MASK_BORDER_MODE_KEYWORDS[number];
/** mask-border-repeat 关键词类型 */
export type MaskBorderRepeatKeyword = typeof MASK_BORDER_REPEAT_KEYWORDS[number];
/** mask-border-slice 关键词类型 */
export type MaskBorderSliceKeyword = typeof MASK_BORDER_SLICE_KEYWORDS[number];
/** mask-border-source 关键词类型 */
export type MaskBorderSourceKeyword = typeof MASK_BORDER_SOURCE_KEYWORDS[number];
/** mask-border-width 关键词类型 */
export type MaskBorderWidthKeyword = typeof MASK_BORDER_WIDTH_KEYWORDS[number];
/** mask-clip 关键词类型 */
export type MaskClipKeyword = typeof MASK_CLIP_KEYWORDS[number];
/** mask-composite 关键词类型 */
export type MaskCompositeKeyword = typeof MASK_COMPOSITE_KEYWORDS[number];
/** mask-image 关键词类型 */
export type MaskImageKeyword = typeof MASK_IMAGE_KEYWORDS[number];
/** mask-mode 关键词类型 */
export type MaskModeKeyword = typeof MASK_MODE_KEYWORDS[number];
/** mask-origin 关键词类型 */
export type MaskOriginKeyword = typeof MASK_ORIGIN_KEYWORDS[number];
/** mask-position 关键词类型 */
export type MaskPositionKeyword = typeof MASK_POSITION_KEYWORDS[number];
/** mask-repeat 关键词类型 */
export type MaskRepeatKeyword = typeof MASK_REPEAT_KEYWORDS[number];
/** mask-size 关键词类型 */
export type MaskSizeKeyword = typeof MASK_SIZE_KEYWORDS[number];
/** mask-type 关键词类型 */
export type MaskTypeKeyword = typeof MASK_TYPE_KEYWORDS[number];
/** masonry-auto-flow 关键词类型 */
export type MasonryAutoFlowKeyword = typeof MASONRY_AUTO_FLOW_KEYWORDS[number];
/** math-depth 关键词类型 */
export type MathDepthKeyword = typeof MATH_DEPTH_KEYWORDS[number];
/** math-shift 关键词类型 */
export type MathShiftKeyword = typeof MATH_SHIFT_KEYWORDS[number];
/** math-style 关键词类型 */
export type MathStyleKeyword = typeof MATH_STYLE_KEYWORDS[number];
/** max-height 关键词类型 */
export type MaxHeightKeyword = typeof MAX_HEIGHT_KEYWORDS[number];
/** max-lines 关键词类型 */
export type MaxLinesKeyword = typeof MAX_LINES_KEYWORDS[number];
/** max-width 关键词类型 */
export type MaxWidthKeyword = typeof MAX_WIDTH_KEYWORDS[number];
/** min-height 关键词类型 */
export type MinHeightKeyword = typeof MIN_HEIGHT_KEYWORDS[number];
/** min-width 关键词类型 */
export type MinWidthKeyword = typeof MIN_WIDTH_KEYWORDS[number];
/** mix-blend-mode 关键词类型 */
export type MixBlendModeKeyword = typeof MIX_BLEND_MODE_KEYWORDS[number];
/** object-fit 关键词类型 */
export type ObjectFitKeyword = typeof OBJECT_FIT_KEYWORDS[number];
/** object-position 关键词类型 */
export type ObjectPositionKeyword = typeof OBJECT_POSITION_KEYWORDS[number];
/** offset-anchor 关键词类型 */
export type OffsetAnchorKeyword = typeof OFFSET_ANCHOR_KEYWORDS[number];
/** offset-path 关键词类型 */
export type OffsetPathKeyword = typeof OFFSET_PATH_KEYWORDS[number];
/** offset-position 关键词类型 */
export type OffsetPositionKeyword = typeof OFFSET_POSITION_KEYWORDS[number];
/** offset-rotate 关键词类型 */
export type OffsetRotateKeyword = typeof OFFSET_ROTATE_KEYWORDS[number];
/** outline-color 关键词类型 */
export type OutlineColorKeyword = typeof OUTLINE_COLOR_KEYWORDS[number];
/** outline-style 关键词类型 */
export type OutlineStyleKeyword = typeof OUTLINE_STYLE_KEYWORDS[number];
/** outline-width 关键词类型 */
export type OutlineWidthKeyword = typeof OUTLINE_WIDTH_KEYWORDS[number];
/** overflow 关键词类型 */
export type OverflowKeyword = typeof OVERFLOW_KEYWORDS[number];
/** overflow-anchor 关键词类型 */
export type OverflowAnchorKeyword = typeof OVERFLOW_ANCHOR_KEYWORDS[number];
/** overflow-block 关键词类型 */
export type OverflowBlockKeyword = typeof OVERFLOW_BLOCK_KEYWORDS[number];
/** overflow-clip-box 关键词类型 */
export type OverflowClipBoxKeyword = typeof OVERFLOW_CLIP_BOX_KEYWORDS[number];
/** overflow-clip-margin 关键词类型 */
export type OverflowClipMarginKeyword = typeof OVERFLOW_CLIP_MARGIN_KEYWORDS[number];
/** overflow-inline 关键词类型 */
export type OverflowInlineKeyword = typeof OVERFLOW_INLINE_KEYWORDS[number];
/** overflow-wrap 关键词类型 */
export type OverflowWrapKeyword = typeof OVERFLOW_WRAP_KEYWORDS[number];
/** overflow-x 关键词类型 */
export type OverflowXKeyword = typeof OVERFLOW_X_KEYWORDS[number];
/** overflow-y 关键词类型 */
export type OverflowYKeyword = typeof OVERFLOW_Y_KEYWORDS[number];
/** overlay 关键词类型 */
export type OverlayKeyword = typeof OVERLAY_KEYWORDS[number];
/** overscroll-behavior 关键词类型 */
export type OverscrollBehaviorKeyword = typeof OVERSCROLL_BEHAVIOR_KEYWORDS[number];
/** overscroll-behavior-block 关键词类型 */
export type OverscrollBehaviorBlockKeyword = typeof OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS[number];
/** overscroll-behavior-inline 关键词类型 */
export type OverscrollBehaviorInlineKeyword = typeof OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS[number];
/** overscroll-behavior-x 关键词类型 */
export type OverscrollBehaviorXKeyword = typeof OVERSCROLL_BEHAVIOR_X_KEYWORDS[number];
/** overscroll-behavior-y 关键词类型 */
export type OverscrollBehaviorYKeyword = typeof OVERSCROLL_BEHAVIOR_Y_KEYWORDS[number];
/** page 关键词类型 */
export type PageKeyword = typeof PAGE_KEYWORDS[number];
/** page-break-after 关键词类型 */
export type PageBreakAfterKeyword = typeof PAGE_BREAK_AFTER_KEYWORDS[number];
/** page-break-before 关键词类型 */
export type PageBreakBeforeKeyword = typeof PAGE_BREAK_BEFORE_KEYWORDS[number];
/** page-break-inside 关键词类型 */
export type PageBreakInsideKeyword = typeof PAGE_BREAK_INSIDE_KEYWORDS[number];
/** paint-order 关键词类型 */
export type PaintOrderKeyword = typeof PAINT_ORDER_KEYWORDS[number];
/** pause-after 关键词类型 */
export type PauseAfterKeyword = typeof PAUSE_AFTER_KEYWORDS[number];
/** pause-before 关键词类型 */
export type PauseBeforeKeyword = typeof PAUSE_BEFORE_KEYWORDS[number];
/** perspective 关键词类型 */
export type PerspectiveKeyword = typeof PERSPECTIVE_KEYWORDS[number];
/** perspective-origin 关键词类型 */
export type PerspectiveOriginKeyword = typeof PERSPECTIVE_ORIGIN_KEYWORDS[number];
/** pointer-events 关键词类型 */
export type PointerEventsKeyword = typeof POINTER_EVENTS_KEYWORDS[number];
/** position 关键词类型 */
export type PositionKeyword = typeof POSITION_KEYWORDS[number];
/** position-anchor 关键词类型 */
export type PositionAnchorKeyword = typeof POSITION_ANCHOR_KEYWORDS[number];
/** position-area 关键词类型 */
export type PositionAreaKeyword = typeof POSITION_AREA_KEYWORDS[number];
/** position-try-fallbacks 关键词类型 */
export type PositionTryFallbacksKeyword = typeof POSITION_TRY_FALLBACKS_KEYWORDS[number];
/** position-try-order 关键词类型 */
export type PositionTryOrderKeyword = typeof POSITION_TRY_ORDER_KEYWORDS[number];
/** position-visibility 关键词类型 */
export type PositionVisibilityKeyword = typeof POSITION_VISIBILITY_KEYWORDS[number];
/** print-color-adjust 关键词类型 */
export type PrintColorAdjustKeyword = typeof PRINT_COLOR_ADJUST_KEYWORDS[number];
/** quotes 关键词类型 */
export type QuotesKeyword = typeof QUOTES_KEYWORDS[number];
/** resize 关键词类型 */
export type ResizeKeyword = typeof RESIZE_KEYWORDS[number];
/** rest-after 关键词类型 */
export type RestAfterKeyword = typeof REST_AFTER_KEYWORDS[number];
/** rest-before 关键词类型 */
export type RestBeforeKeyword = typeof REST_BEFORE_KEYWORDS[number];
/** right 关键词类型 */
export type RightKeyword = typeof RIGHT_KEYWORDS[number];
/** rotate 关键词类型 */
export type RotateKeyword = typeof ROTATE_KEYWORDS[number];
/** row-gap 关键词类型 */
export type RowGapKeyword = typeof ROW_GAP_KEYWORDS[number];
/** ruby-align 关键词类型 */
export type RubyAlignKeyword = typeof RUBY_ALIGN_KEYWORDS[number];
/** ruby-merge 关键词类型 */
export type RubyMergeKeyword = typeof RUBY_MERGE_KEYWORDS[number];
/** ruby-position 关键词类型 */
export type RubyPositionKeyword = typeof RUBY_POSITION_KEYWORDS[number];
/** scale 关键词类型 */
export type ScaleKeyword = typeof SCALE_KEYWORDS[number];
/** scroll-behavior 关键词类型 */
export type ScrollBehaviorKeyword = typeof SCROLL_BEHAVIOR_KEYWORDS[number];
/** scroll-padding 关键词类型 */
export type ScrollPaddingKeyword = typeof SCROLL_PADDING_KEYWORDS[number];
/** scroll-padding-block 关键词类型 */
export type ScrollPaddingBlockKeyword = typeof SCROLL_PADDING_BLOCK_KEYWORDS[number];
/** scroll-padding-block-end 关键词类型 */
export type ScrollPaddingBlockEndKeyword = typeof SCROLL_PADDING_BLOCK_END_KEYWORDS[number];
/** scroll-padding-block-start 关键词类型 */
export type ScrollPaddingBlockStartKeyword = typeof SCROLL_PADDING_BLOCK_START_KEYWORDS[number];
/** scroll-padding-bottom 关键词类型 */
export type ScrollPaddingBottomKeyword = typeof SCROLL_PADDING_BOTTOM_KEYWORDS[number];
/** scroll-padding-inline 关键词类型 */
export type ScrollPaddingInlineKeyword = typeof SCROLL_PADDING_INLINE_KEYWORDS[number];
/** scroll-padding-inline-end 关键词类型 */
export type ScrollPaddingInlineEndKeyword = typeof SCROLL_PADDING_INLINE_END_KEYWORDS[number];
/** scroll-padding-inline-start 关键词类型 */
export type ScrollPaddingInlineStartKeyword = typeof SCROLL_PADDING_INLINE_START_KEYWORDS[number];
/** scroll-padding-left 关键词类型 */
export type ScrollPaddingLeftKeyword = typeof SCROLL_PADDING_LEFT_KEYWORDS[number];
/** scroll-padding-right 关键词类型 */
export type ScrollPaddingRightKeyword = typeof SCROLL_PADDING_RIGHT_KEYWORDS[number];
/** scroll-padding-top 关键词类型 */
export type ScrollPaddingTopKeyword = typeof SCROLL_PADDING_TOP_KEYWORDS[number];
/** scroll-snap-align 关键词类型 */
export type ScrollSnapAlignKeyword = typeof SCROLL_SNAP_ALIGN_KEYWORDS[number];
/** scroll-snap-coordinate 关键词类型 */
export type ScrollSnapCoordinateKeyword = typeof SCROLL_SNAP_COORDINATE_KEYWORDS[number];
/** scroll-snap-destination 关键词类型 */
export type ScrollSnapDestinationKeyword = typeof SCROLL_SNAP_DESTINATION_KEYWORDS[number];
/** scroll-snap-points-x 关键词类型 */
export type ScrollSnapPointsXKeyword = typeof SCROLL_SNAP_POINTS_X_KEYWORDS[number];
/** scroll-snap-points-y 关键词类型 */
export type ScrollSnapPointsYKeyword = typeof SCROLL_SNAP_POINTS_Y_KEYWORDS[number];
/** scroll-snap-stop 关键词类型 */
export type ScrollSnapStopKeyword = typeof SCROLL_SNAP_STOP_KEYWORDS[number];
/** scroll-snap-type 关键词类型 */
export type ScrollSnapTypeKeyword = typeof SCROLL_SNAP_TYPE_KEYWORDS[number];
/** scroll-snap-type-x 关键词类型 */
export type ScrollSnapTypeXKeyword = typeof SCROLL_SNAP_TYPE_X_KEYWORDS[number];
/** scroll-snap-type-y 关键词类型 */
export type ScrollSnapTypeYKeyword = typeof SCROLL_SNAP_TYPE_Y_KEYWORDS[number];
/** scroll-timeline-axis 关键词类型 */
export type ScrollTimelineAxisKeyword = typeof SCROLL_TIMELINE_AXIS_KEYWORDS[number];
/** scroll-timeline-name 关键词类型 */
export type ScrollTimelineNameKeyword = typeof SCROLL_TIMELINE_NAME_KEYWORDS[number];
/** scrollbar-color 关键词类型 */
export type ScrollbarColorKeyword = typeof SCROLLBAR_COLOR_KEYWORDS[number];
/** scrollbar-gutter 关键词类型 */
export type ScrollbarGutterKeyword = typeof SCROLLBAR_GUTTER_KEYWORDS[number];
/** scrollbar-width 关键词类型 */
export type ScrollbarWidthKeyword = typeof SCROLLBAR_WIDTH_KEYWORDS[number];
/** shape-outside 关键词类型 */
export type ShapeOutsideKeyword = typeof SHAPE_OUTSIDE_KEYWORDS[number];
/** shape-rendering 关键词类型 */
export type ShapeRenderingKeyword = typeof SHAPE_RENDERING_KEYWORDS[number];
/** speak 关键词类型 */
export type SpeakKeyword = typeof SPEAK_KEYWORDS[number];
/** speak-as 关键词类型 */
export type SpeakAsKeyword = typeof SPEAK_AS_KEYWORDS[number];
/** stroke 关键词类型 */
export type StrokeKeyword = typeof STROKE_KEYWORDS[number];
/** stroke-dasharray 关键词类型 */
export type StrokeDasharrayKeyword = typeof STROKE_DASHARRAY_KEYWORDS[number];
/** stroke-linecap 关键词类型 */
export type StrokeLinecapKeyword = typeof STROKE_LINECAP_KEYWORDS[number];
/** stroke-linejoin 关键词类型 */
export type StrokeLinejoinKeyword = typeof STROKE_LINEJOIN_KEYWORDS[number];
/** table-layout 关键词类型 */
export type TableLayoutKeyword = typeof TABLE_LAYOUT_KEYWORDS[number];
/** text-align 关键词类型 */
export type TextAlignKeyword = typeof TEXT_ALIGN_KEYWORDS[number];
/** text-align-last 关键词类型 */
export type TextAlignLastKeyword = typeof TEXT_ALIGN_LAST_KEYWORDS[number];
/** text-anchor 关键词类型 */
export type TextAnchorKeyword = typeof TEXT_ANCHOR_KEYWORDS[number];
/** text-combine-upright 关键词类型 */
export type TextCombineUprightKeyword = typeof TEXT_COMBINE_UPRIGHT_KEYWORDS[number];
/** text-decoration-color 关键词类型 */
export type TextDecorationColorKeyword = typeof TEXT_DECORATION_COLOR_KEYWORDS[number];
/** text-decoration-line 关键词类型 */
export type TextDecorationLineKeyword = typeof TEXT_DECORATION_LINE_KEYWORDS[number];
/** text-decoration-skip 关键词类型 */
export type TextDecorationSkipKeyword = typeof TEXT_DECORATION_SKIP_KEYWORDS[number];
/** text-decoration-skip-ink 关键词类型 */
export type TextDecorationSkipInkKeyword = typeof TEXT_DECORATION_SKIP_INK_KEYWORDS[number];
/** text-decoration-style 关键词类型 */
export type TextDecorationStyleKeyword = typeof TEXT_DECORATION_STYLE_KEYWORDS[number];
/** text-decoration-thickness 关键词类型 */
export type TextDecorationThicknessKeyword = typeof TEXT_DECORATION_THICKNESS_KEYWORDS[number];
/** text-emphasis-color 关键词类型 */
export type TextEmphasisColorKeyword = typeof TEXT_EMPHASIS_COLOR_KEYWORDS[number];
/** text-emphasis-position 关键词类型 */
export type TextEmphasisPositionKeyword = typeof TEXT_EMPHASIS_POSITION_KEYWORDS[number];
/** text-emphasis-style 关键词类型 */
export type TextEmphasisStyleKeyword = typeof TEXT_EMPHASIS_STYLE_KEYWORDS[number];
/** text-indent 关键词类型 */
export type TextIndentKeyword = typeof TEXT_INDENT_KEYWORDS[number];
/** text-justify 关键词类型 */
export type TextJustifyKeyword = typeof TEXT_JUSTIFY_KEYWORDS[number];
/** text-orientation 关键词类型 */
export type TextOrientationKeyword = typeof TEXT_ORIENTATION_KEYWORDS[number];
/** text-overflow 关键词类型 */
export type TextOverflowKeyword = typeof TEXT_OVERFLOW_KEYWORDS[number];
/** text-rendering 关键词类型 */
export type TextRenderingKeyword = typeof TEXT_RENDERING_KEYWORDS[number];
/** text-shadow 关键词类型 */
export type TextShadowKeyword = typeof TEXT_SHADOW_KEYWORDS[number];
/** text-size-adjust 关键词类型 */
export type TextSizeAdjustKeyword = typeof TEXT_SIZE_ADJUST_KEYWORDS[number];
/** text-spacing-trim 关键词类型 */
export type TextSpacingTrimKeyword = typeof TEXT_SPACING_TRIM_KEYWORDS[number];
/** text-transform 关键词类型 */
export type TextTransformKeyword = typeof TEXT_TRANSFORM_KEYWORDS[number];
/** text-underline-offset 关键词类型 */
export type TextUnderlineOffsetKeyword = typeof TEXT_UNDERLINE_OFFSET_KEYWORDS[number];
/** text-underline-position 关键词类型 */
export type TextUnderlinePositionKeyword = typeof TEXT_UNDERLINE_POSITION_KEYWORDS[number];
/** text-wrap-mode 关键词类型 */
export type TextWrapModeKeyword = typeof TEXT_WRAP_MODE_KEYWORDS[number];
/** text-wrap-style 关键词类型 */
export type TextWrapStyleKeyword = typeof TEXT_WRAP_STYLE_KEYWORDS[number];
/** timeline-scope 关键词类型 */
export type TimelineScopeKeyword = typeof TIMELINE_SCOPE_KEYWORDS[number];
/** top 关键词类型 */
export type TopKeyword = typeof TOP_KEYWORDS[number];
/** touch-action 关键词类型 */
export type TouchActionKeyword = typeof TOUCH_ACTION_KEYWORDS[number];
/** transform 关键词类型 */
export type TransformKeyword = typeof TRANSFORM_KEYWORDS[number];
/** transform-box 关键词类型 */
export type TransformBoxKeyword = typeof TRANSFORM_BOX_KEYWORDS[number];
/** transform-origin 关键词类型 */
export type TransformOriginKeyword = typeof TRANSFORM_ORIGIN_KEYWORDS[number];
/** transform-style 关键词类型 */
export type TransformStyleKeyword = typeof TRANSFORM_STYLE_KEYWORDS[number];
/** transition 关键词类型 */
export type TransitionKeyword = typeof TRANSITION_KEYWORDS[number];
/** transition-behavior 关键词类型 */
export type TransitionBehaviorKeyword = typeof TRANSITION_BEHAVIOR_KEYWORDS[number];
/** transition-property 关键词类型 */
export type TransitionPropertyKeyword = typeof TRANSITION_PROPERTY_KEYWORDS[number];
/** transition-timing-function 关键词类型 */
export type TransitionTimingFunctionKeyword = typeof TRANSITION_TIMING_FUNCTION_KEYWORDS[number];
/** translate 关键词类型 */
export type TranslateKeyword = typeof TRANSLATE_KEYWORDS[number];
/** unicode-bidi 关键词类型 */
export type UnicodeBidiKeyword = typeof UNICODE_BIDI_KEYWORDS[number];
/** user-select 关键词类型 */
export type UserSelectKeyword = typeof USER_SELECT_KEYWORDS[number];
/** vector-effect 关键词类型 */
export type VectorEffectKeyword = typeof VECTOR_EFFECT_KEYWORDS[number];
/** vertical-align 关键词类型 */
export type VerticalAlignKeyword = typeof VERTICAL_ALIGN_KEYWORDS[number];
/** view-timeline-axis 关键词类型 */
export type ViewTimelineAxisKeyword = typeof VIEW_TIMELINE_AXIS_KEYWORDS[number];
/** view-timeline-inset 关键词类型 */
export type ViewTimelineInsetKeyword = typeof VIEW_TIMELINE_INSET_KEYWORDS[number];
/** view-timeline-name 关键词类型 */
export type ViewTimelineNameKeyword = typeof VIEW_TIMELINE_NAME_KEYWORDS[number];
/** view-transition-name 关键词类型 */
export type ViewTransitionNameKeyword = typeof VIEW_TRANSITION_NAME_KEYWORDS[number];
/** visibility 关键词类型 */
export type VisibilityKeyword = typeof VISIBILITY_KEYWORDS[number];
/** voice-balance 关键词类型 */
export type VoiceBalanceKeyword = typeof VOICE_BALANCE_KEYWORDS[number];
/** voice-duration 关键词类型 */
export type VoiceDurationKeyword = typeof VOICE_DURATION_KEYWORDS[number];
/** voice-family 关键词类型 */
export type VoiceFamilyKeyword = typeof VOICE_FAMILY_KEYWORDS[number];
/** voice-pitch 关键词类型 */
export type VoicePitchKeyword = typeof VOICE_PITCH_KEYWORDS[number];
/** voice-range 关键词类型 */
export type VoiceRangeKeyword = typeof VOICE_RANGE_KEYWORDS[number];
/** voice-rate 关键词类型 */
export type VoiceRateKeyword = typeof VOICE_RATE_KEYWORDS[number];
/** voice-stress 关键词类型 */
export type VoiceStressKeyword = typeof VOICE_STRESS_KEYWORDS[number];
/** voice-volume 关键词类型 */
export type VoiceVolumeKeyword = typeof VOICE_VOLUME_KEYWORDS[number];
/** white-space 关键词类型 */
export type WhiteSpaceKeyword = typeof WHITE_SPACE_KEYWORDS[number];
/** white-space-collapse 关键词类型 */
export type WhiteSpaceCollapseKeyword = typeof WHITE_SPACE_COLLAPSE_KEYWORDS[number];
/** white-space-trim 关键词类型 */
export type WhiteSpaceTrimKeyword = typeof WHITE_SPACE_TRIM_KEYWORDS[number];
/** width 关键词类型 */
export type WidthKeyword = typeof WIDTH_KEYWORDS[number];
/** will-change 关键词类型 */
export type WillChangeKeyword = typeof WILL_CHANGE_KEYWORDS[number];
/** word-break 关键词类型 */
export type WordBreakKeyword = typeof WORD_BREAK_KEYWORDS[number];
/** word-spacing 关键词类型 */
export type WordSpacingKeyword = typeof WORD_SPACING_KEYWORDS[number];
/** word-wrap 关键词类型 */
export type WordWrapKeyword = typeof WORD_WRAP_KEYWORDS[number];
/** writing-mode 关键词类型 */
export type WritingModeKeyword = typeof WRITING_MODE_KEYWORDS[number];
/** z-index 关键词类型 */
export type ZIndexKeyword = typeof Z_INDEX_KEYWORDS[number];
/** zoom 关键词类型 */
export type ZoomKeyword = typeof ZOOM_KEYWORDS[number];

// ==================== 属性完整值类型（含颜色） ====================

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

/** 关键词属性名列表 */
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

/** 属性到关键词的映射 */
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
