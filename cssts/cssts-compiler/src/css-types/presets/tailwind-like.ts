/**
 * Tailwind-like 预设配置
 * 
 * 基于 Tailwind CSS 的设计理念，只保留最常用的属性和数值
 * 可以大幅减少生成的原子类数量
 */

import type { CssPropertyCamelName } from '../config/property-config';

// ==================== 核心属性（Tailwind 内置支持的） ====================

/**
 * 核心属性列表 - 约 100 个最常用的属性
 * 这些是 Tailwind CSS 内置支持的属性
 */
export const CORE_PROPERTIES: CssPropertyCamelName[] = [
  // 布局 - Layout
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'zIndex',
  'float',
  'clear',
  'visibility',
  'overflow',
  'overflowX',
  'overflowY',
  
  // Flexbox
  'flex',
  'flexDirection',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'alignContent',
  'order',
  'gap',
  'rowGap',
  'columnGap',
  
  // Grid
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridColumn',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRow',
  'gridRowStart',
  'gridRowEnd',
  'gridAutoFlow',
  'gridAutoColumns',
  'gridAutoRows',
  
  // 间距 - Spacing
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  
  // 尺寸 - Sizing
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  
  // 字体 - Typography
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'textDecoration',
  'textTransform',
  'textOverflow',
  'whiteSpace',
  'wordBreak',
  
  // 颜色 - Colors
  'color',
  'backgroundColor',
  'borderColor',
  'outlineColor',
  
  // 边框 - Borders
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'borderRadius',
  
  // 效果 - Effects
  'opacity',
  'boxShadow',
  'filter',
  'backdropFilter',
  'mixBlendMode',
  
  // 过渡/动画 - Transitions & Animation
  'transition',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'animation',
  'animationDuration',
  'animationTimingFunction',
  'animationDelay',
  'animationIterationCount',
  'animationDirection',
  'animationFillMode',
  'animationPlayState',
  
  // 变换 - Transforms
  'transform',
  'transformOrigin',
  'scale',
  'rotate',
  'translate',
  
  // 交互 - Interactivity
  'cursor',
  'pointerEvents',
  'userSelect',
  'resize',
  'touchAction',
  
  // 其他常用
  'objectFit',
  'objectPosition',
  'aspectRatio',
  'boxSizing',
  'listStyleType',
  'listStylePosition',
  'outline',
  'outlineWidth',
  'outlineStyle',
  'outlineOffset',
  'appearance',
  'accentColor',
  'caretColor',
  'scrollBehavior',
  'willChange',
  'contain',
  'isolation',
];

// ==================== 冷门属性（98% 用不到的） ====================

/**
 * 冷门属性列表 - 建议默认排除
 * 这些属性在实际项目中很少使用
 */
export const RARE_PROPERTIES: CssPropertyCamelName[] = [
  // Mask 系列（复杂，很少用）
  'mask',
  'maskImage',
  'maskMode',
  'maskRepeat',
  'maskPosition',
  'maskClip',
  'maskOrigin',
  'maskSize',
  'maskComposite',
  'maskBorderMode',
  'maskBorderOutset',
  'maskBorderRepeat',
  'maskBorderSlice',
  'maskBorderSource',
  'maskBorderWidth',
  'maskType',
  
  // Shape 系列
  'shapeOutside',
  'shapeMargin',
  'shapeImageThreshold',
  
  // Offset/Motion Path 系列
  'offset',
  'offsetPath',
  'offsetDistance',
  'offsetRotate',
  'offsetAnchor',
  'offsetPosition',
  
  // Column 系列（多列布局，很少用）
  'columns',
  'columnCount',
  'columnWidth',
  'columnGap',
  'columnRule',
  'columnRuleColor',
  'columnRuleStyle',
  'columnRuleWidth',
  'columnSpan',
  'columnFill',
  
  // Border Image 系列
  'borderImage',
  'borderImageSource',
  'borderImageSlice',
  'borderImageWidth',
  'borderImageOutset',
  'borderImageRepeat',
  
  // 打印相关
  'pageBreakBefore',
  'pageBreakAfter',
  'pageBreakInside',
  'breakBefore',
  'breakAfter',
  'breakInside',
  'orphans',
  'widows',
  
  // 语音/无障碍（浏览器支持差）
  'azimuth',
  'cueAfter',
  'cueBefore',
  'pauseAfter',
  'pauseBefore',
  'restAfter',
  'restBefore',
  'speak',
  'speakAs',
  'voiceBalance',
  'voiceDuration',
  'voiceFamily',
  'voicePitch',
  'voiceRange',
  'voiceRate',
  'voiceStress',
  'voiceVolume',
  
  // SVG 相关（应该用 SVG 属性而不是 CSS）
  'fill',
  'fillOpacity',
  'fillRule',
  'stroke',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'marker',
  'markerEnd',
  'markerMid',
  'markerStart',
  'clipRule',
  'colorInterpolationFilters',
  'dominantBaseline',
  'alignmentBaseline',
  'baselineShift',
  'textAnchor',
  'shapeRendering',
  'vectorEffect',
  'd',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  
  // 实验性/非标准
  'imeMode',
  'zoom',
  'imageOrientation',
  'imageResolution',
  'imageRendering',
  'initialLetter',
  'initialLetterAlign',
  'hangingPunctuation',
  'hyphenateCharacter',
  'hyphenateLimitChars',
  'hyphens',
  'lineClamp',
  'maxLines',
  'rubyAlign',
  'rubyMerge',
  'rubyPosition',
  'textCombineUpright',
  'textEmphasis',
  'textEmphasisColor',
  'textEmphasisPosition',
  'textEmphasisStyle',
  'textOrientation',
  'textUnderlineOffset',
  'textUnderlinePosition',
  'writingMode',
  
  // 旧版 Flexbox（已废弃）
  'boxAlign',
  'boxDirection',
  'boxFlex',
  'boxFlexGroup',
  'boxLines',
  'boxOrdinalGroup',
  'boxOrient',
  'boxPack',
  
  // 旧版 Grid
  'gridColumnGap',
  'gridRowGap',
  'gridGap',
  
  // 滚动相关（部分）
  'scrollSnapCoordinate',
  'scrollSnapDestination',
  'scrollSnapPointsX',
  'scrollSnapPointsY',
  'scrollSnapTypeX',
  'scrollSnapTypeY',
  'scrollTimeline',
  'scrollTimelineAxis',
  'scrollTimelineName',
  'viewTimeline',
  'viewTimelineAxis',
  'viewTimelineInset',
  'viewTimelineName',
  'timelineScope',
  
  // 其他冷门
  'all',
  'clip',
  'content',
  'counterIncrement',
  'counterReset',
  'counterSet',
  'emptyCells',
  'fontFeatureSettings',
  'fontKerning',
  'fontLanguageOverride',
  'fontOpticalSizing',
  'fontPalette',
  'fontSizeAdjust',
  'fontSmooth',
  'fontStretch',
  'fontSynthesis',
  'fontSynthesisPosition',
  'fontSynthesisSmallCaps',
  'fontSynthesisStyle',
  'fontSynthesisWeight',
  'fontVariant',
  'fontVariantAlternates',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantEmoji',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariantPosition',
  'fontVariationSettings',
  'forcedColorAdjust',
  'kerning',
  'mathDepth',
  'mathShift',
  'mathStyle',
  'overflowAnchor',
  'overflowBlock',
  'overflowClipBox',
  'overflowClipMargin',
  'overflowInline',
  'overflowWrap',
  'overlay',
  'overscrollBehavior',
  'overscrollBehaviorBlock',
  'overscrollBehaviorInline',
  'overscrollBehaviorX',
  'overscrollBehaviorY',
  'page',
  'paintOrder',
  'perspective',
  'perspectiveOrigin',
  'printColorAdjust',
  'quotes',
  'tableLayout',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationSkip',
  'textDecorationSkipInk',
  'textDecorationStyle',
  'textDecorationThickness',
  'textIndent',
  'textJustify',
  'textRendering',
  'textShadow',
  'textSizeAdjust',
  'textSpacingTrim',
  'textWrapMode',
  'textWrapStyle',
  'transformBox',
  'transformStyle',
  'transitionBehavior',
  'unicodeBidi',
  'verticalAlign',
  'viewTransitionName',
  'wordSpacing',
  'wordWrap',
  'backfaceVisibility',
  'captionSide',
  'caretShape',
  'colorScheme',
  'contain',
  'containIntrinsicBlockSize',
  'containIntrinsicHeight',
  'containIntrinsicInlineSize',
  'containIntrinsicSize',
  'containIntrinsicWidth',
  'container',
  'containerName',
  'containerType',
  'contentVisibility',
  'direction',
  'fieldSizing',
  'inputSecurity',
  'interpolateSize',
  'lineBreak',
  'masonryAutoFlow',
  'positionAnchor',
  'positionArea',
  'positionTryFallbacks',
  'positionTryOrder',
  'positionVisibility',
  'scrollbarColor',
  'scrollbarGutter',
  'scrollbarWidth',
  'anchorName',
  'anchorScope',
  'alignTracks',
  'justifyTracks',
  'boxDecorationBreak',
  'glyphOrientationHorizontal',
  'glyphOrientationVertical',
  'lineHeightStep',
  'listStyleImage',
];

// ==================== Tailwind 风格的数值系统 ====================

/**
 * Tailwind 风格的间距比例（基于 4px）
 * 生成约 40 个值而不是数百个
 */
export const TAILWIND_SPACING_SCALE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
  52, 56, 60, 64, 72, 80, 96,
] as const;

/** 转换为实际 px 值（乘以 4） */
export const TAILWIND_SPACING_PX = TAILWIND_SPACING_SCALE.map(n => n * 4);

/**
 * Tailwind 风格的百分比值
 */
export const TAILWIND_PERCENTAGES = [
  0, 5, 10, 15, 20, 25, 30, 33.333333, 35, 40, 45, 50,
  55, 60, 65, 66.666667, 70, 75, 80, 85, 90, 95, 100,
] as const;

/**
 * Tailwind 风格的 rem 值
 */
export const TAILWIND_REM_VALUES = [
  0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1,
  1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4,
  5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  18, 20, 24,
] as const;

/**
 * Tailwind 风格的 opacity 值
 */
export const TAILWIND_OPACITY_VALUES = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
  55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
] as const;

/**
 * Tailwind 风格的 z-index 值
 */
export const TAILWIND_ZINDEX_VALUES = [
  0, 10, 20, 30, 40, 50,
] as const;

/**
 * Tailwind 风格的 border-radius 值 (px)
 */
export const TAILWIND_BORDER_RADIUS = [
  0, 2, 4, 6, 8, 12, 16, 24,
] as const;

/**
 * Tailwind 风格的 font-size 值 (rem)
 */
export const TAILWIND_FONT_SIZES = [
  0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3, 3.75, 4.5, 6, 8,
] as const;

/**
 * Tailwind 风格的 font-weight 值
 */
export const TAILWIND_FONT_WEIGHTS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

/**
 * Tailwind 风格的 line-height 值
 */
export const TAILWIND_LINE_HEIGHTS = [
  1, 1.25, 1.375, 1.5, 1.625, 1.75, 2,
] as const;

/**
 * Tailwind 风格的 letter-spacing 值 (em)
 */
export const TAILWIND_LETTER_SPACINGS = [
  -0.05, -0.025, 0, 0.025, 0.05, 0.1,
] as const;

// ==================== 导出预设配置 ====================

export const TAILWIND_LIKE_PRESET = {
  /** 核心属性 */
  coreProperties: CORE_PROPERTIES,
  /** 冷门属性（建议排除） */
  rareProperties: RARE_PROPERTIES,
  /** 间距比例 */
  spacingScale: TAILWIND_SPACING_SCALE,
  /** 百分比值 */
  percentages: TAILWIND_PERCENTAGES,
  /** rem 值 */
  remValues: TAILWIND_REM_VALUES,
  /** opacity 值 */
  opacityValues: TAILWIND_OPACITY_VALUES,
  /** z-index 值 */
  zIndexValues: TAILWIND_ZINDEX_VALUES,
  /** border-radius 值 */
  borderRadiusValues: TAILWIND_BORDER_RADIUS,
  /** font-size 值 */
  fontSizes: TAILWIND_FONT_SIZES,
  /** font-weight 值 */
  fontWeights: TAILWIND_FONT_WEIGHTS,
  /** line-height 值 */
  lineHeights: TAILWIND_LINE_HEIGHTS,
  /** letter-spacing 值 */
  letterSpacings: TAILWIND_LETTER_SPACINGS,
};

export default TAILWIND_LIKE_PRESET;
