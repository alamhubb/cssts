import type {CsstsConfig} from "../types/csstsConfig";
import type {CssProgressiveRange} from "../types/cssPropertyConfig";

// ==================== 系统级别默认配置 ====================

export const csstsDefaultConfig: CsstsConfig = {
    progressiveRanges: [
        {max: 100, divisors: [1]},         // 0-100: 每个整数
        {max: 200, divisors: [2, 5]},      // 100-200: 能被 2 或 5 整除
        {max: 500, divisors: [5]},         // 200-500: 能被 5 整除
        {max: 1000, divisors: [10]},       // 500-1000: 能被 10 整除
        {max: 2000, divisors: [20, 50]},   // 1000-2000: 能被 20 或 50 整除
        {max: 5000, divisors: [50]},       // 2000-5000: 能被 50 整除
        {max: 10000, divisors: [100]},     // 5000-10000: 能被 100 整除
        {max: Infinity, divisors: [1000]}, // 10000+: 能被 1000 整除
    ],

    // 默认支持的属性列表（覆盖 95% 使用场景，参考 Tailwind/UnoCSS）
    properties: [
        // ==================== 布局 (Layout) ====================
        // Display & Visibility
        'display',
        'visibility',
        'overflow',
        'overflowX',
        'overflowY',

        // Position
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'inset',
        'zIndex',

        // Flexbox
        'flex',
        'flexDirection',
        'flexWrap',
        'flexGrow',
        'flexShrink',
        'flexBasis',
        'justifyContent',
        'alignItems',
        'alignContent',
        'alignSelf',
        'order',

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
        'gap',
        'columnGap',
        'rowGap',
        'placeContent',
        'placeItems',
        'placeSelf',

        // ==================== 尺寸 (Sizing) ====================
        'width',
        'minWidth',
        'maxWidth',
        'height',
        'minHeight',
        'maxHeight',
        'aspectRatio',

        // ==================== 间距 (Spacing) ====================
        // Padding
        'padding',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'paddingInline',
        'paddingBlock',

        // Margin
        'margin',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'marginInline',
        'marginBlock',

        // ==================== 排版 (Typography) ====================
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'lineHeight',
        'letterSpacing',
        'textAlign',
        'textDecoration',
        'textDecorationLine',
        'textDecorationColor',
        'textDecorationStyle',
        'textDecorationThickness',
        'textTransform',
        'textOverflow',
        'textIndent',
        'verticalAlign',
        'whiteSpace',
        'wordBreak',
        'wordSpacing',
        'overflowWrap',
        'hyphens',
        'lineClamp',

        // ==================== 颜色 (Colors) ====================
        'color',
        'backgroundColor',
        'opacity',

        // ==================== 边框 (Borders) ====================
        'border',
        'borderWidth',
        'borderStyle',
        'borderColor',
        'borderTop',
        'borderTopWidth',
        'borderTopStyle',
        'borderTopColor',
        'borderRight',
        'borderRightWidth',
        'borderRightStyle',
        'borderRightColor',
        'borderBottom',
        'borderBottomWidth',
        'borderBottomStyle',
        'borderBottomColor',
        'borderLeft',
        'borderLeftWidth',
        'borderLeftStyle',
        'borderLeftColor',
        'borderRadius',
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
        'borderCollapse',

        // ==================== 背景 (Backgrounds) ====================
        'background',
        'backgroundImage',
        'backgroundSize',
        'backgroundPosition',
        'backgroundRepeat',
        'backgroundAttachment',
        'backgroundClip',
        'backgroundOrigin',

        // ==================== 效果 (Effects) ====================
        'boxShadow',
        'textShadow',
        'filter',
        'backdropFilter',
        'mixBlendMode',
        'backgroundBlendMode',

        // ==================== 变换 (Transforms) ====================
        'transform',
        'transformOrigin',
        'scale',
        'rotate',
        'translate',
        'perspective',
        'perspectiveOrigin',

        // ==================== 过渡与动画 (Transitions & Animations) ====================
        'transition',
        'transitionProperty',
        'transitionDuration',
        'transitionTimingFunction',
        'transitionDelay',
        'animation',
        'animationName',
        'animationDuration',
        'animationTimingFunction',
        'animationDelay',
        'animationIterationCount',
        'animationDirection',
        'animationFillMode',
        'animationPlayState',

        // ==================== 交互 (Interactivity) ====================
        'cursor',
        'userSelect',
        'pointerEvents',
        'resize',
        'touchAction',
        'scrollBehavior',
        'scrollSnapType',
        'scrollSnapAlign',

        // ==================== 表格 (Tables) ====================
        'tableLayout',
        'borderSpacing',
        'captionSide',
        'emptyCells',

        // ==================== 列表 (Lists) ====================
        'listStyle',
        'listStyleType',
        'listStylePosition',
        'listStyleImage',

        // ==================== 其他常用 (Miscellaneous) ====================
        'boxSizing',
        'float',
        'clear',
        'objectFit',
        'objectPosition',
        'outline',
        'outlineWidth',
        'outlineStyle',
        'outlineColor',
        'outlineOffset',
        'content',
        'appearance',
        'willChange',
        'contain',
        'isolation',
        'accentColor',
        'caretColor',
        'columns',
        'columnCount',
        'columnWidth',
        'columnRule',
        'columnRuleWidth',
        'columnRuleStyle',
        'columnRuleColor',
        'clipPath',
    ],

    numberCategories: [
        {
            pixel: {
                negative: true
            },

            // 百分比类 (%, vw, vh, vmin, vmax, etc.)
            percentage: {
                negative: false,
                presets: [33.33, 66.67],
            },

            // 无单位数值 - opacity, z-index, line-height 等
            unitless: {
                negative: false
            },
        }
    ]
};