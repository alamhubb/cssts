/**
 * 核心 CSS 属性分组
 * 用于默认配置和统计
 */

// 核心属性
export const CORE_PROPERTIES = [
  'display', 'position', 'top', 'right', 'bottom', 'left',
  'width', 'height', 'margin', 'padding', 'color', 'backgroundColor',
] as const;

// 布局属性
export const LAYOUT_PROPERTIES = [
  'display', 'position', 'float', 'clear', 'overflow', 'visibility', 'zIndex',
] as const;

// Flexbox 属性
export const FLEXBOX_PROPERTIES = [
  'flex', 'flexDirection', 'flexWrap', 'flexFlow', 'flexGrow', 'flexShrink', 'flexBasis',
  'justifyContent', 'alignItems', 'alignContent', 'alignSelf', 'order', 'gap',
] as const;

// Grid 属性
export const GRID_PROPERTIES = [
  'grid', 'gridTemplate', 'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
  'gridColumn', 'gridRow', 'gridArea', 'gridAutoFlow', 'gridAutoColumns', 'gridAutoRows',
  'gridGap', 'gridColumnGap', 'gridRowGap', 'justifyItems', 'placeItems', 'placeContent',
] as const;

// 尺寸属性
export const SIZING_PROPERTIES = [
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'inlineSize', 'blockSize', 'minInlineSize', 'minBlockSize', 'maxInlineSize', 'maxBlockSize',
] as const;

// 间距属性
export const SPACING_PROPERTIES = [
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginBlock', 'marginBlockStart', 'marginBlockEnd', 'marginInline', 'marginInlineStart', 'marginInlineEnd',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd',
] as const;

// 背景属性
export const BACKGROUND_PROPERTIES = [
  'background', 'backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundSize',
  'backgroundRepeat', 'backgroundAttachment', 'backgroundClip', 'backgroundOrigin',
] as const;

// 文本属性
export const TEXT_PROPERTIES = [
  'color', 'font', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
  'lineHeight', 'letterSpacing', 'textAlign', 'textDecoration', 'textTransform',
  'whiteSpace', 'wordBreak', 'wordSpacing', 'textOverflow', 'textIndent',
] as const;

// 边框属性
export const BORDER_PROPERTIES = [
  'border', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius',
  'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
] as const;

// 阴影属性
export const SHADOW_PROPERTIES = [
  'boxShadow', 'textShadow',
] as const;

// 变换属性
export const TRANSFORM_PROPERTIES = [
  'transform', 'transformOrigin', 'transformStyle', 'perspective', 'perspectiveOrigin',
  'translate', 'rotate', 'scale',
] as const;

// 过渡属性
export const TRANSITION_PROPERTIES = [
  'transition', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transitionDelay',
  'animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay',
  'animationIterationCount', 'animationDirection', 'animationFillMode', 'animationPlayState',
] as const;

// 其他属性
export const OTHER_PROPERTIES = [
  'opacity', 'cursor', 'pointerEvents', 'userSelect', 'outline', 'outlineWidth', 'outlineStyle', 'outlineColor',
] as const;

// 统计信息
export const CORE_PROPERTIES_STATS = {
  core: CORE_PROPERTIES.length,
  layout: LAYOUT_PROPERTIES.length,
  flexbox: FLEXBOX_PROPERTIES.length,
  grid: GRID_PROPERTIES.length,
  sizing: SIZING_PROPERTIES.length,
  spacing: SPACING_PROPERTIES.length,
  background: BACKGROUND_PROPERTIES.length,
  text: TEXT_PROPERTIES.length,
  border: BORDER_PROPERTIES.length,
  shadow: SHADOW_PROPERTIES.length,
  transform: TRANSFORM_PROPERTIES.length,
  transition: TRANSITION_PROPERTIES.length,
  other: OTHER_PROPERTIES.length,
} as const;

// 预期原子数量（估算）
export const EXPECTED_ATOMS_COUNT = 10000;
