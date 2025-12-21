import type {CsstsConfig} from "../types/csstsConfig";
import {CssProgressiveRange, CssPropertyName} from "../types/cssPropertyConfig";

const atomicCssProperties: CssPropertyName[] = [
    // ==================== 布局 (Layout) ====================
    'display',
    'visibility',
    'position',
    'zIndex',
    'isolation',

    // 坐标 (Coordinates)
    'inset', // [加回] 同时设四个方向
    'top',
    'right',
    'bottom',
    'left',

    // 溢出 (Overflow)
    'overflow', // [加回] 同时设XY
    'overflowX',
    'overflowY',

    // ==================== Flexbox & Grid ====================
    // 容器
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'alignItems',
    'alignContent',
    'justifyItems',

    // 间距
    'gap',      // [加回] 同时设行列
    'rowGap',
    'columnGap',

    // Grid 结构
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridAutoFlow',
    'gridAutoColumns',
    'gridAutoRows',

    // 子元素
    'order',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'alignSelf',
    'justifySelf',

    // Grid 位置
    'gridColumnStart',
    'gridColumnEnd',
    'gridRowStart',
    'gridRowEnd',

    // ==================== 尺寸 (Sizing) ====================
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'aspectRatio',
    'boxSizing',

    // ==================== 间距 (Spacing) ====================
    // Margin
    'margin',       // [加回] 极高频
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',

    // Padding
    'padding',      // [加回] 极高频
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',

    // ==================== 排版 (Typography) ====================
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontStyle',

    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'textAlign',
    'color',
    'textIndent',
    'textTransform',
    'verticalAlign',
    'whiteSpace',
    'wordBreak',
    'overflowWrap',
    'caretColor',

    // 装饰
    'textDecorationLine',
    'textDecorationStyle',
    'textDecorationColor',
    'textDecorationThickness',
    'textUnderlineOffset',

    // ==================== 背景 (Background) ====================
    // 注意：background 依旧建议剔除，因为它不是“单值”的逻辑，它太复杂
    'backgroundColor',
    'backgroundImage',
    'backgroundPositionX',
    'backgroundPositionY',
    'backgroundSize',
    'backgroundRepeat',
    'backgroundAttachment',
    'backgroundClip',
    'backgroundOrigin',
    'backgroundBlendMode',

    // ==================== 边框 (Border) ====================
    // 统一设置 (四个方向) [全部加回]
    'borderWidth',
    'borderStyle',
    'borderColor',
    'borderRadius',

    // 单独方向设置 (拆解)
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',

    'borderTopStyle',
    'borderRightStyle',
    'borderBottomStyle',
    'borderLeftStyle',

    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',

    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',

    // 轮廓 (Outline)
    'outlineWidth', // outline 是个特例，通常这几个分开支持更好，或者仅支持 outline-width/color
    'outlineStyle',
    'outlineColor',
    'outlineOffset',

    // ==================== 视觉效果 (Effects) ====================
    'opacity',
    'boxShadow',
    'mixBlendMode',
    'filter',
    'backdropFilter',

    // ==================== 变换 (Transforms) ====================
    'scale',
    'rotate',
    'translate',
    'perspective',
    'transformOrigin',

    // ==================== 过渡 (Transition) ====================
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'transitionDelay',

    // ==================== 动画 (Animation) ====================
    'animationName',
    'animationDuration',
    'animationTimingFunction',
    'animationDelay',
    'animationIterationCount',
    'animationDirection',
    'animationFillMode',
    'animationPlayState',

    // ==================== 交互与其他 (Misc) ====================
    'cursor',
    'userSelect',
    'pointerEvents',
    'resize',
    'objectFit',
    'objectPosition',
    'willChange',
    'appearance',
    'scrollBehavior',
    'touchAction',
    'clipPath'
];

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
    properties: atomicCssProperties,

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