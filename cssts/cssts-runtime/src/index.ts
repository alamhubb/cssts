/**
 * CssTs 运行时
 *
 * 零依赖，只做对象操作
 * - merge(): 合并样式对象
 * - replace(): 属性冲突检测 + 替换
 *
 * 关键设计：
 * - 类名格式: `属性名_值`，如 `color_red`、`padding-top_16px`
 * - 通过 split(CSSTS_SEPARATOR) 从类名提取属性名
 * - 动态 atom 代理可使用 getCssClassName() 做公开命名转换
 */

// ==================== 分隔符配置 ====================

/**
 * CSSTS 分隔符配置
 * 
 * 全局统一配置，compiler 和 runtime 共用
 */
export const CSSTS_CONFIG = {
  /**
   * CSS 类名分隔符
   * 类名格式: {property}_{value}
   * 例如: color_red, padding-top_16px
   */
  SEPARATOR: '_',

  /**
   * 伪类分隔符（双美元符号）
   * 变量名格式: {className}$${pseudo1}$${pseudo2}
   * 例如: primary$$hover$$active
   */
  PSEUDO_SEPARATOR: '$$',
} as const

// ==================== 原子类命名转换 ====================

const CSS_PROPERTY_NAME_MAP = {
  'accentColor': 'accent-color',
  'alignContent': 'align-content',
  'alignItems': 'align-items',
  'alignSelf': 'align-self',
  'alignTracks': 'align-tracks',
  'alignmentBaseline': 'alignment-baseline',
  'all': 'all',
  'anchorName': 'anchor-name',
  'anchorScope': 'anchor-scope',
  'animation': 'animation',
  'animationComposition': 'animation-composition',
  'animationDelay': 'animation-delay',
  'animationDirection': 'animation-direction',
  'animationDuration': 'animation-duration',
  'animationFillMode': 'animation-fill-mode',
  'animationIterationCount': 'animation-iteration-count',
  'animationName': 'animation-name',
  'animationPlayState': 'animation-play-state',
  'animationRange': 'animation-range',
  'animationRangeEnd': 'animation-range-end',
  'animationRangeStart': 'animation-range-start',
  'animationTimeline': 'animation-timeline',
  'animationTimingFunction': 'animation-timing-function',
  'appearance': 'appearance',
  'aspectRatio': 'aspect-ratio',
  'azimuth': 'azimuth',
  'backdropFilter': 'backdrop-filter',
  'backfaceVisibility': 'backface-visibility',
  'background': 'background',
  'backgroundAttachment': 'background-attachment',
  'backgroundBlendMode': 'background-blend-mode',
  'backgroundClip': 'background-clip',
  'backgroundColor': 'background-color',
  'backgroundImage': 'background-image',
  'backgroundOrigin': 'background-origin',
  'backgroundPosition': 'background-position',
  'backgroundPositionX': 'background-position-x',
  'backgroundPositionY': 'background-position-y',
  'backgroundRepeat': 'background-repeat',
  'backgroundSize': 'background-size',
  'baselineShift': 'baseline-shift',
  'behavior': 'behavior',
  'blockSize': 'block-size',
  'border': 'border',
  'borderBlock': 'border-block',
  'borderBlockColor': 'border-block-color',
  'borderBlockEnd': 'border-block-end',
  'borderBlockEndColor': 'border-block-end-color',
  'borderBlockEndStyle': 'border-block-end-style',
  'borderBlockEndWidth': 'border-block-end-width',
  'borderBlockStart': 'border-block-start',
  'borderBlockStartColor': 'border-block-start-color',
  'borderBlockStartStyle': 'border-block-start-style',
  'borderBlockStartWidth': 'border-block-start-width',
  'borderBlockStyle': 'border-block-style',
  'borderBlockWidth': 'border-block-width',
  'borderBottom': 'border-bottom',
  'borderBottomColor': 'border-bottom-color',
  'borderBottomLeftRadius': 'border-bottom-left-radius',
  'borderBottomRightRadius': 'border-bottom-right-radius',
  'borderBottomStyle': 'border-bottom-style',
  'borderBottomWidth': 'border-bottom-width',
  'borderCollapse': 'border-collapse',
  'borderColor': 'border-color',
  'borderEndEndRadius': 'border-end-end-radius',
  'borderEndStartRadius': 'border-end-start-radius',
  'borderImage': 'border-image',
  'borderImageOutset': 'border-image-outset',
  'borderImageRepeat': 'border-image-repeat',
  'borderImageSlice': 'border-image-slice',
  'borderImageSource': 'border-image-source',
  'borderImageWidth': 'border-image-width',
  'borderInline': 'border-inline',
  'borderInlineColor': 'border-inline-color',
  'borderInlineEnd': 'border-inline-end',
  'borderInlineEndColor': 'border-inline-end-color',
  'borderInlineEndStyle': 'border-inline-end-style',
  'borderInlineEndWidth': 'border-inline-end-width',
  'borderInlineStart': 'border-inline-start',
  'borderInlineStartColor': 'border-inline-start-color',
  'borderInlineStartStyle': 'border-inline-start-style',
  'borderInlineStartWidth': 'border-inline-start-width',
  'borderInlineStyle': 'border-inline-style',
  'borderInlineWidth': 'border-inline-width',
  'borderLeft': 'border-left',
  'borderLeftColor': 'border-left-color',
  'borderLeftStyle': 'border-left-style',
  'borderLeftWidth': 'border-left-width',
  'borderRadius': 'border-radius',
  'borderRight': 'border-right',
  'borderRightColor': 'border-right-color',
  'borderRightStyle': 'border-right-style',
  'borderRightWidth': 'border-right-width',
  'borderSpacing': 'border-spacing',
  'borderStartEndRadius': 'border-start-end-radius',
  'borderStartStartRadius': 'border-start-start-radius',
  'borderStyle': 'border-style',
  'borderTop': 'border-top',
  'borderTopColor': 'border-top-color',
  'borderTopLeftRadius': 'border-top-left-radius',
  'borderTopRightRadius': 'border-top-right-radius',
  'borderTopStyle': 'border-top-style',
  'borderTopWidth': 'border-top-width',
  'borderWidth': 'border-width',
  'bottom': 'bottom',
  'boxAlign': 'box-align',
  'boxDecorationBreak': 'box-decoration-break',
  'boxDirection': 'box-direction',
  'boxFlex': 'box-flex',
  'boxFlexGroup': 'box-flex-group',
  'boxLines': 'box-lines',
  'boxOrdinalGroup': 'box-ordinal-group',
  'boxOrient': 'box-orient',
  'boxPack': 'box-pack',
  'boxShadow': 'box-shadow',
  'boxSizing': 'box-sizing',
  'breakAfter': 'break-after',
  'breakBefore': 'break-before',
  'breakInside': 'break-inside',
  'captionSide': 'caption-side',
  'caret': 'caret',
  'caretColor': 'caret-color',
  'caretShape': 'caret-shape',
  'clear': 'clear',
  'clip': 'clip',
  'clipPath': 'clip-path',
  'clipRule': 'clip-rule',
  'color': 'color',
  'colorInterpolationFilters': 'color-interpolation-filters',
  'colorScheme': 'color-scheme',
  'columnCount': 'column-count',
  'columnFill': 'column-fill',
  'columnGap': 'column-gap',
  'columnRule': 'column-rule',
  'columnRuleColor': 'column-rule-color',
  'columnRuleStyle': 'column-rule-style',
  'columnRuleWidth': 'column-rule-width',
  'columnSpan': 'column-span',
  'columnWidth': 'column-width',
  'columns': 'columns',
  'contain': 'contain',
  'containIntrinsicBlockSize': 'contain-intrinsic-block-size',
  'containIntrinsicHeight': 'contain-intrinsic-height',
  'containIntrinsicInlineSize': 'contain-intrinsic-inline-size',
  'containIntrinsicSize': 'contain-intrinsic-size',
  'containIntrinsicWidth': 'contain-intrinsic-width',
  'container': 'container',
  'containerName': 'container-name',
  'containerType': 'container-type',
  'content': 'content',
  'contentVisibility': 'content-visibility',
  'counterIncrement': 'counter-increment',
  'counterReset': 'counter-reset',
  'counterSet': 'counter-set',
  'cue': 'cue',
  'cueAfter': 'cue-after',
  'cueBefore': 'cue-before',
  'cursor': 'cursor',
  'cx': 'cx',
  'cy': 'cy',
  'd': 'd',
  'direction': 'direction',
  'display': 'display',
  'dominantBaseline': 'dominant-baseline',
  'emptyCells': 'empty-cells',
  'fieldSizing': 'field-sizing',
  'fill': 'fill',
  'fillOpacity': 'fill-opacity',
  'fillRule': 'fill-rule',
  'filter': 'filter',
  'flex': 'flex',
  'flexBasis': 'flex-basis',
  'flexDirection': 'flex-direction',
  'flexFlow': 'flex-flow',
  'flexGrow': 'flex-grow',
  'flexShrink': 'flex-shrink',
  'flexWrap': 'flex-wrap',
  'float': 'float',
  'font': 'font',
  'fontFamily': 'font-family',
  'fontFeatureSettings': 'font-feature-settings',
  'fontKerning': 'font-kerning',
  'fontLanguageOverride': 'font-language-override',
  'fontOpticalSizing': 'font-optical-sizing',
  'fontPalette': 'font-palette',
  'fontSize': 'font-size',
  'fontSizeAdjust': 'font-size-adjust',
  'fontSmooth': 'font-smooth',
  'fontStretch': 'font-stretch',
  'fontStyle': 'font-style',
  'fontSynthesis': 'font-synthesis',
  'fontSynthesisPosition': 'font-synthesis-position',
  'fontSynthesisSmallCaps': 'font-synthesis-small-caps',
  'fontSynthesisStyle': 'font-synthesis-style',
  'fontSynthesisWeight': 'font-synthesis-weight',
  'fontVariant': 'font-variant',
  'fontVariantAlternates': 'font-variant-alternates',
  'fontVariantCaps': 'font-variant-caps',
  'fontVariantEastAsian': 'font-variant-east-asian',
  'fontVariantEmoji': 'font-variant-emoji',
  'fontVariantLigatures': 'font-variant-ligatures',
  'fontVariantNumeric': 'font-variant-numeric',
  'fontVariantPosition': 'font-variant-position',
  'fontVariationSettings': 'font-variation-settings',
  'fontWeight': 'font-weight',
  'forcedColorAdjust': 'forced-color-adjust',
  'gap': 'gap',
  'glyphOrientationHorizontal': 'glyph-orientation-horizontal',
  'glyphOrientationVertical': 'glyph-orientation-vertical',
  'grid': 'grid',
  'gridArea': 'grid-area',
  'gridAutoColumns': 'grid-auto-columns',
  'gridAutoFlow': 'grid-auto-flow',
  'gridAutoRows': 'grid-auto-rows',
  'gridColumn': 'grid-column',
  'gridColumnEnd': 'grid-column-end',
  'gridColumnGap': 'grid-column-gap',
  'gridColumnStart': 'grid-column-start',
  'gridGap': 'grid-gap',
  'gridRow': 'grid-row',
  'gridRowEnd': 'grid-row-end',
  'gridRowGap': 'grid-row-gap',
  'gridRowStart': 'grid-row-start',
  'gridTemplate': 'grid-template',
  'gridTemplateAreas': 'grid-template-areas',
  'gridTemplateColumns': 'grid-template-columns',
  'gridTemplateRows': 'grid-template-rows',
  'hangingPunctuation': 'hanging-punctuation',
  'height': 'height',
  'hyphenateCharacter': 'hyphenate-character',
  'hyphenateLimitChars': 'hyphenate-limit-chars',
  'hyphens': 'hyphens',
  'imageOrientation': 'image-orientation',
  'imageRendering': 'image-rendering',
  'imageResolution': 'image-resolution',
  'imeMode': 'ime-mode',
  'initialLetter': 'initial-letter',
  'initialLetterAlign': 'initial-letter-align',
  'inlineSize': 'inline-size',
  'inputSecurity': 'input-security',
  'inset': 'inset',
  'insetBlock': 'inset-block',
  'insetBlockEnd': 'inset-block-end',
  'insetBlockStart': 'inset-block-start',
  'insetInline': 'inset-inline',
  'insetInlineEnd': 'inset-inline-end',
  'insetInlineStart': 'inset-inline-start',
  'interpolateSize': 'interpolate-size',
  'isolation': 'isolation',
  'justifyContent': 'justify-content',
  'justifyItems': 'justify-items',
  'justifySelf': 'justify-self',
  'justifyTracks': 'justify-tracks',
  'kerning': 'kerning',
  'left': 'left',
  'letterSpacing': 'letter-spacing',
  'lineBreak': 'line-break',
  'lineClamp': 'line-clamp',
  'lineHeight': 'line-height',
  'lineHeightStep': 'line-height-step',
  'listStyle': 'list-style',
  'listStyleImage': 'list-style-image',
  'listStylePosition': 'list-style-position',
  'listStyleType': 'list-style-type',
  'margin': 'margin',
  'marginBlock': 'margin-block',
  'marginBlockEnd': 'margin-block-end',
  'marginBlockStart': 'margin-block-start',
  'marginBottom': 'margin-bottom',
  'marginInline': 'margin-inline',
  'marginInlineEnd': 'margin-inline-end',
  'marginInlineStart': 'margin-inline-start',
  'marginLeft': 'margin-left',
  'marginRight': 'margin-right',
  'marginTop': 'margin-top',
  'marginTrim': 'margin-trim',
  'marker': 'marker',
  'markerEnd': 'marker-end',
  'markerMid': 'marker-mid',
  'markerStart': 'marker-start',
  'mask': 'mask',
  'maskBorder': 'mask-border',
  'maskBorderMode': 'mask-border-mode',
  'maskBorderOutset': 'mask-border-outset',
  'maskBorderRepeat': 'mask-border-repeat',
  'maskBorderSlice': 'mask-border-slice',
  'maskBorderSource': 'mask-border-source',
  'maskBorderWidth': 'mask-border-width',
  'maskClip': 'mask-clip',
  'maskComposite': 'mask-composite',
  'maskImage': 'mask-image',
  'maskMode': 'mask-mode',
  'maskOrigin': 'mask-origin',
  'maskPosition': 'mask-position',
  'maskRepeat': 'mask-repeat',
  'maskSize': 'mask-size',
  'maskType': 'mask-type',
  'masonryAutoFlow': 'masonry-auto-flow',
  'mathDepth': 'math-depth',
  'mathShift': 'math-shift',
  'mathStyle': 'math-style',
  'maxBlockSize': 'max-block-size',
  'maxHeight': 'max-height',
  'maxInlineSize': 'max-inline-size',
  'maxLines': 'max-lines',
  'maxWidth': 'max-width',
  'minBlockSize': 'min-block-size',
  'minHeight': 'min-height',
  'minInlineSize': 'min-inline-size',
  'minWidth': 'min-width',
  'mixBlendMode': 'mix-blend-mode',
  'objectFit': 'object-fit',
  'objectPosition': 'object-position',
  'offset': 'offset',
  'offsetAnchor': 'offset-anchor',
  'offsetDistance': 'offset-distance',
  'offsetPath': 'offset-path',
  'offsetPosition': 'offset-position',
  'offsetRotate': 'offset-rotate',
  'opacity': 'opacity',
  'order': 'order',
  'orphans': 'orphans',
  'outline': 'outline',
  'outlineColor': 'outline-color',
  'outlineOffset': 'outline-offset',
  'outlineStyle': 'outline-style',
  'outlineWidth': 'outline-width',
  'overflow': 'overflow',
  'overflowAnchor': 'overflow-anchor',
  'overflowBlock': 'overflow-block',
  'overflowClipBox': 'overflow-clip-box',
  'overflowClipMargin': 'overflow-clip-margin',
  'overflowInline': 'overflow-inline',
  'overflowWrap': 'overflow-wrap',
  'overflowX': 'overflow-x',
  'overflowY': 'overflow-y',
  'overlay': 'overlay',
  'overscrollBehavior': 'overscroll-behavior',
  'overscrollBehaviorBlock': 'overscroll-behavior-block',
  'overscrollBehaviorInline': 'overscroll-behavior-inline',
  'overscrollBehaviorX': 'overscroll-behavior-x',
  'overscrollBehaviorY': 'overscroll-behavior-y',
  'padding': 'padding',
  'paddingBlock': 'padding-block',
  'paddingBlockEnd': 'padding-block-end',
  'paddingBlockStart': 'padding-block-start',
  'paddingBottom': 'padding-bottom',
  'paddingInline': 'padding-inline',
  'paddingInlineEnd': 'padding-inline-end',
  'paddingInlineStart': 'padding-inline-start',
  'paddingLeft': 'padding-left',
  'paddingRight': 'padding-right',
  'paddingTop': 'padding-top',
  'page': 'page',
  'pageBreakAfter': 'page-break-after',
  'pageBreakBefore': 'page-break-before',
  'pageBreakInside': 'page-break-inside',
  'paintOrder': 'paint-order',
  'pause': 'pause',
  'pauseAfter': 'pause-after',
  'pauseBefore': 'pause-before',
  'perspective': 'perspective',
  'perspectiveOrigin': 'perspective-origin',
  'placeContent': 'place-content',
  'placeItems': 'place-items',
  'placeSelf': 'place-self',
  'pointerEvents': 'pointer-events',
  'position': 'position',
  'positionAnchor': 'position-anchor',
  'positionArea': 'position-area',
  'positionTry': 'position-try',
  'positionTryFallbacks': 'position-try-fallbacks',
  'positionTryOrder': 'position-try-order',
  'positionVisibility': 'position-visibility',
  'printColorAdjust': 'print-color-adjust',
  'quotes': 'quotes',
  'r': 'r',
  'resize': 'resize',
  'rest': 'rest',
  'restAfter': 'rest-after',
  'restBefore': 'rest-before',
  'right': 'right',
  'rotate': 'rotate',
  'rowGap': 'row-gap',
  'rubyAlign': 'ruby-align',
  'rubyMerge': 'ruby-merge',
  'rubyPosition': 'ruby-position',
  'rx': 'rx',
  'ry': 'ry',
  'scale': 'scale',
  'scrollBehavior': 'scroll-behavior',
  'scrollMargin': 'scroll-margin',
  'scrollMarginBlock': 'scroll-margin-block',
  'scrollMarginBlockEnd': 'scroll-margin-block-end',
  'scrollMarginBlockStart': 'scroll-margin-block-start',
  'scrollMarginBottom': 'scroll-margin-bottom',
  'scrollMarginInline': 'scroll-margin-inline',
  'scrollMarginInlineEnd': 'scroll-margin-inline-end',
  'scrollMarginInlineStart': 'scroll-margin-inline-start',
  'scrollMarginLeft': 'scroll-margin-left',
  'scrollMarginRight': 'scroll-margin-right',
  'scrollMarginTop': 'scroll-margin-top',
  'scrollPadding': 'scroll-padding',
  'scrollPaddingBlock': 'scroll-padding-block',
  'scrollPaddingBlockEnd': 'scroll-padding-block-end',
  'scrollPaddingBlockStart': 'scroll-padding-block-start',
  'scrollPaddingBottom': 'scroll-padding-bottom',
  'scrollPaddingInline': 'scroll-padding-inline',
  'scrollPaddingInlineEnd': 'scroll-padding-inline-end',
  'scrollPaddingInlineStart': 'scroll-padding-inline-start',
  'scrollPaddingLeft': 'scroll-padding-left',
  'scrollPaddingRight': 'scroll-padding-right',
  'scrollPaddingTop': 'scroll-padding-top',
  'scrollSnapAlign': 'scroll-snap-align',
  'scrollSnapCoordinate': 'scroll-snap-coordinate',
  'scrollSnapDestination': 'scroll-snap-destination',
  'scrollSnapPointsX': 'scroll-snap-points-x',
  'scrollSnapPointsY': 'scroll-snap-points-y',
  'scrollSnapStop': 'scroll-snap-stop',
  'scrollSnapType': 'scroll-snap-type',
  'scrollSnapTypeX': 'scroll-snap-type-x',
  'scrollSnapTypeY': 'scroll-snap-type-y',
  'scrollTimeline': 'scroll-timeline',
  'scrollTimelineAxis': 'scroll-timeline-axis',
  'scrollTimelineName': 'scroll-timeline-name',
  'scrollbarColor': 'scrollbar-color',
  'scrollbarGutter': 'scrollbar-gutter',
  'scrollbarWidth': 'scrollbar-width',
  'shapeImageThreshold': 'shape-image-threshold',
  'shapeMargin': 'shape-margin',
  'shapeOutside': 'shape-outside',
  'shapeRendering': 'shape-rendering',
  'speak': 'speak',
  'speakAs': 'speak-as',
  'src': 'src',
  'stroke': 'stroke',
  'strokeDasharray': 'stroke-dasharray',
  'strokeDashoffset': 'stroke-dashoffset',
  'strokeLinecap': 'stroke-linecap',
  'strokeLinejoin': 'stroke-linejoin',
  'strokeMiterlimit': 'stroke-miterlimit',
  'strokeOpacity': 'stroke-opacity',
  'strokeWidth': 'stroke-width',
  'tabSize': 'tab-size',
  'tableLayout': 'table-layout',
  'textAlign': 'text-align',
  'textAlignLast': 'text-align-last',
  'textAnchor': 'text-anchor',
  'textCombineUpright': 'text-combine-upright',
  'textDecoration': 'text-decoration',
  'textDecorationColor': 'text-decoration-color',
  'textDecorationLine': 'text-decoration-line',
  'textDecorationSkip': 'text-decoration-skip',
  'textDecorationSkipInk': 'text-decoration-skip-ink',
  'textDecorationStyle': 'text-decoration-style',
  'textDecorationThickness': 'text-decoration-thickness',
  'textEmphasis': 'text-emphasis',
  'textEmphasisColor': 'text-emphasis-color',
  'textEmphasisPosition': 'text-emphasis-position',
  'textEmphasisStyle': 'text-emphasis-style',
  'textIndent': 'text-indent',
  'textJustify': 'text-justify',
  'textOrientation': 'text-orientation',
  'textOverflow': 'text-overflow',
  'textRendering': 'text-rendering',
  'textShadow': 'text-shadow',
  'textSizeAdjust': 'text-size-adjust',
  'textSpacingTrim': 'text-spacing-trim',
  'textTransform': 'text-transform',
  'textUnderlineOffset': 'text-underline-offset',
  'textUnderlinePosition': 'text-underline-position',
  'textWrap': 'text-wrap',
  'textWrapMode': 'text-wrap-mode',
  'textWrapStyle': 'text-wrap-style',
  'timelineScope': 'timeline-scope',
  'top': 'top',
  'touchAction': 'touch-action',
  'transform': 'transform',
  'transformBox': 'transform-box',
  'transformOrigin': 'transform-origin',
  'transformStyle': 'transform-style',
  'transition': 'transition',
  'transitionBehavior': 'transition-behavior',
  'transitionDelay': 'transition-delay',
  'transitionDuration': 'transition-duration',
  'transitionProperty': 'transition-property',
  'transitionTimingFunction': 'transition-timing-function',
  'translate': 'translate',
  'unicodeBidi': 'unicode-bidi',
  'unicodeRange': 'unicode-range',
  'userSelect': 'user-select',
  'vectorEffect': 'vector-effect',
  'verticalAlign': 'vertical-align',
  'viewTimeline': 'view-timeline',
  'viewTimelineAxis': 'view-timeline-axis',
  'viewTimelineInset': 'view-timeline-inset',
  'viewTimelineName': 'view-timeline-name',
  'viewTransitionName': 'view-transition-name',
  'visibility': 'visibility',
  'voiceBalance': 'voice-balance',
  'voiceDuration': 'voice-duration',
  'voiceFamily': 'voice-family',
  'voicePitch': 'voice-pitch',
  'voiceRange': 'voice-range',
  'voiceRate': 'voice-rate',
  'voiceStress': 'voice-stress',
  'voiceVolume': 'voice-volume',
  'whiteSpace': 'white-space',
  'whiteSpaceCollapse': 'white-space-collapse',
  'whiteSpaceTrim': 'white-space-trim',
  'widows': 'widows',
  'width': 'width',
  'willChange': 'will-change',
  'wordBreak': 'word-break',
  'wordSpacing': 'word-spacing',
  'wordWrap': 'word-wrap',
  'writingMode': 'writing-mode',
  'x': 'x',
  'y': 'y',
  'zIndex': 'z-index',
  'zoom': 'zoom',
} as const

export type CssPropertyAtomName = keyof typeof CSS_PROPERTY_NAME_MAP

export type ParsedCssAtomName = {
  property: string
  value: string
}

const sortedCssPropertyAtomNames = Object.keys(CSS_PROPERTY_NAME_MAP)
  .sort((a, b) => b.length - a.length) as CssPropertyAtomName[]

const cssClassValueEscapes: Record<string, string> = {
  '.': '\\.',
  '%': '\\%',
  '/': '\\/',
}

export function camelToKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase()
}

function normalizeAtomValue(tsValue: string): string {
  let value = tsValue
  if (value.startsWith('N') && value.length > 1 && /[0-9]/.test(value[1]!)) {
    value = '-' + value.slice(1)
  }
  value = value.replace(/pct/g, '%')
  value = value.replace(/(\d)p(\d)/g, '$1.$2')
  value = value.replace(/(\d)s(\d)/g, '$1/$2')
  return camelToKebab(value)
}

function isAtomValueStart(valuePart: string): boolean {
  return /^[A-Z0-9]/.test(valuePart) || /^N[0-9]/.test(valuePart)
}

export function parseTsAtomName(atomName: string): ParsedCssAtomName {
  for (const propertyAtomName of sortedCssPropertyAtomNames) {
    if (!atomName.startsWith(propertyAtomName) || atomName.length <= propertyAtomName.length) {
      continue
    }
    const valuePart = atomName.slice(propertyAtomName.length)
    if (isAtomValueStart(valuePart)) {
      return {
        property: CSS_PROPERTY_NAME_MAP[propertyAtomName],
        value: normalizeAtomValue(valuePart),
      }
    }
  }
  throw new Error(`Unknown CSSTS atom name: ${atomName}`)
}

export function getCssProperty(atomName: string): string {
  return parseTsAtomName(atomName).property
}

export function getCssValue(atomName: string): string {
  return parseTsAtomName(atomName).value
}

export function getCssClassName(atomName: string): string {
  const parsed = parseTsAtomName(atomName)
  let escapedValue = parsed.value
  for (const [symbol, escaped] of Object.entries(cssClassValueEscapes)) {
    escapedValue = escapedValue.split(symbol).join(escaped)
  }
  return `${parsed.property}${CSSTS_CONFIG.SEPARATOR}${escapedValue}`
}

// ==================== 类型定义 ====================

/**
 * CSS 类名记录对象
 * 
 * key: CSS 类名
 * value: 
 *   - undefined: 跳过
 *   - null: 无属性
 *   - string: 属性名
 *   - boolean: true 保留，false 跳过
 *   - number: 非0 保留，0 跳过
 */
export type CssClassRecord = {
  [key: string]: undefined | null | string | boolean | number
}

/**
 * CSS 类名输入
 * 
 * 支持的类型：
 * - string: 单个类名
 * - string[]: 类名数组
 * - CssClassRecord: 类名对象
 * - undefined/null: 会被跳过
 * - CssClassInput[]: 支持嵌套数组
 * 
 * 注意：如需传入其他类型，请使用类型断言 `as any`
 */
export type CssClassInput =
  | CssClassRecord
  | string
  | string[]
  | CssClassInput[]
  | undefined
  | null

interface ClassObject {
  [key: string]: string | true  // null 改为 true，兼容 Vue :class
}


// ==================== 样式合并 ====================

/**
 * 合并多个 CSS 类名输入
 * 
 * 核心规则：
 * - 有属性的类名（value 是 string）：同属性只保留最后一个
 * - 无属性的类名（value 是 null/true）：全部保留
 * - 字符串输入：视为无属性（value = true）
 * - 按原顺序输出
 * 
 * @example
 * merge(
 *   { 'display_flex': 'display' },
 *   { 'color_red': 'color' },
 *   { 'color_blue': 'color' }  // 同属性，会替换 color_red
 * )
 * // => { 'display_flex': true, 'color_blue': 'color' }
 */
export function merge(...args: CssClassInput[]): ClassObject {
  const map = new Map<string, { className: string; property: string | null }>()

  // 处理所有参数（边解包边去重）
  for (const arg of args) {
    processToMap(arg, map)
  }

  // 转换为 ClassObject（null → true，兼容 Vue :class）
  const result: ClassObject = {}
  for (const { className, property } of map.values()) {
    result[className] = property !== null ? property : true
  }

  return result
}

/**
 * 将 CssClassInput 处理到 Map 中（边解包边去重）
 * 
 * @param value - 输入值
 * @param map - 目标 Map（可选，默认创建新的）
 * @returns 处理后的 Map
 */
function processToMap(
  value: CssClassInput,
  map = new Map<string, { className: string; property: string | null }>()
): Map<string, { className: string; property: string | null }> {
  if (!value) return map

  if (typeof value === 'string') {
    // 字符串：无属性，用类名做 key
    map.set(value, { className: value, property: null })
  } else if (Array.isArray(value)) {
    // 数组：递归处理每一项
    for (const item of value) {
      processToMap(item, map)
    }
  } else if (typeof value === 'object') {
    // 对象：遍历键值对
    for (const [className, val] of Object.entries(value)) {
      const property = normalizeValue(val)

      if (property === undefined) {
        continue  // 跳过
      }

      // 保留
      const key = property !== null ? property : className
      map.set(key, { className, property })
    }
  }

  return map
}

/**
 * 规范化值类型
 * 
 * @param val - 输入值
 * @returns 
 *   - undefined → 跳过此条目
 *   - null → 保留，property 为 null（无属性）
 *   - string → 保留，property 为该字符串（属性名）
 */
function normalizeValue(val: any): undefined | null | string {
  if (val === undefined) return undefined  // 跳过
  if (val === null) return null            // 无属性
  if (typeof val === 'string') return val  // 有属性

  if (typeof val === 'boolean') {
    return val ? null : undefined          // true → 保留，false → 跳过
  }

  if (typeof val === 'number') {
    return val !== 0 ? null : undefined    // 非0 → 保留，0 → 跳过
  }

  return undefined  // 其他类型 → 跳过
}

// ==================== 导出 ====================

export const cssts = {
  merge,
  getCssClassName,
  getCssProperty,
  getCssValue,
  parseTsAtomName,
  CSSTS_CONFIG,
  version: '0.3.0',
}

export default cssts
