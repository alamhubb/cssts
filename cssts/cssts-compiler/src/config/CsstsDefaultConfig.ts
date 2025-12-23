import type {CsstsConfig} from "./types/csstsConfig";
import {CssPropertyName} from "./types/cssPropertyConfig";
import {PROPERTY_CATEGORIES_MAP} from "../data/cssPropertyNumber.ts";

const atomicCssProperties: CssPropertyName[] = [
    // ==================== 布局 (Layout) ====================
    'display',
    'visibility',
    'position',
    'zIndex',

    // 坐标 (Coordinates)
    'inset',
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

    // 子元素
    'flex',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'alignSelf',
    'justifySelf',

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
    'fontSize',
    'fontWeight',
    'fontStyle',        // [新增] italic, normal
    'fontFamily',       // [新增] 字体族

    'lineHeight',
    'letterSpacing',    // [新增] 字间距
    'textAlign',        // [新增] left, center, right, justify
    'textDecoration',   // [新增] none, underline, line-through
    'textTransform',    // [新增] uppercase, lowercase, capitalize
    'textOverflow',     // [新增] ellipsis, clip
    'whiteSpace',       // [新增] nowrap, pre, pre-wrap
    'wordBreak',        // [新增] break-all, keep-all
    'wordWrap',         // [新增] break-word, normal (overflow-wrap 别名)
    'verticalAlign',    // [新增] top, middle, bottom, baseline
    'color',

    // ==================== 背景 (Background) ====================
    // 注意：background 依旧建议剔除，因为它不是“单值”的逻辑，它太复杂
    'backgroundColor',
    'backgroundSize',
    'backgroundRepeat',

    // ==================== 边框 (Border) ====================
    // 简写属性
    'border',       // [新增] 支持 border: none 等
    'borderStyle',  // [新增] 支持 borderStyleNone, borderStyleSolid 等
    
    // 统一设置 (四个方向) [全部加回]
    'borderWidth',
    'borderColor',
    'borderRadius',

    // 单独方向设置 (拆解)
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',

    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',

    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',

    // ==================== 视觉效果 (Effects) ====================
    'opacity',
    'boxShadow',
    'outline',          // [新增] none, auto 等
    'outlineStyle',     // [新增] solid, dashed, dotted
    'outlineWidth',     // [新增] 轮廓宽度
    'outlineColor',     // [新增] 轮廓颜色
    'outlineOffset',    // [新增] 轮廓偏移

    // ==================== 交互与其他 (Misc) ====================
    'cursor',
    'userSelect',
    'resize',
    'pointerEvents',    // [新增] none, auto
    'objectFit',        // [新增] cover, contain, fill, none
    'objectPosition',   // [新增] center, top, bottom
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

    colors: [
        'transparent',
        'black',
        'white',
        'red',
        'green',
        'blue',
        'yellow',
        'gray',
        'grey',
        'cyan',
        'magenta',
        'orange',
        'silver',
        'purple',
        'pink',
        'brown',
        'lime',
        'navy',
        'teal',
        'olive',
        'skyblue',
        'lightgray',
        'darkgray',
        'gold',
        'salmon',
        'tomato',
        'violet'
    ],

    excludeKeywords: [
        'a98Rgb',
        'decreasing',
        'displayP3',
        'hsl',
        'hue',
        'hwb',
        'in',
        'increasing',
        'lab',
        'lch',
        'longer',
        'oklab',
        'oklch',
        'prophotoRgb',
        'rec2020',
        'shorter',
        'srgb',
        'srgbLinear',
        'xyz',
        'xyzD50',
        'xyzD65',
        'initial',
        'unset',
        'revert',
        'revertLayer',
    ],

    // 默认支持的属性列表
    properties: atomicCssProperties,

    // 排除不常用的数值类别
    excludeNumberCategories: [
        'physical',    // cm, mm, in, pt, pc - 仅用于打印
        'frequency',   // Hz, kHz - 音频相关，Web 几乎不用
        'resolution',  // dpi, dpcm, dppx - 主要用于媒体查询
    ],

    // 数值类别详细配置
    numberCategoriesConfig: [
        {
            // 像素单位 - 最常用，支持负值
            pixel: {
                min: 0,
                max: 1000,
            },
        },
        {
            // 字体相对单位 - 只使用 em 和 rem
            fontRelative: {
                min: 0,
                max: 20,
                step: 1,
                units: ['em', 'rem'],  // 只生成 em 和 rem，排除 ch, ex, cap, ic, lh, rlh
            },
        },
        {
            // 百分比类 (%, vw, vh, vmin, vmax, etc.)
            percentage: {
                min: 0,
                max: 100,
                step: 1,
                presets: [33.33, 66.67],
                units: ['percent', 'vw', 'vh'],
            },
        },
        {
            // 角度单位 (deg, rad, turn, grad)
            angle: {
                min: -360,
                max: 360,
                step: [10, 15]
            },
        },
        {
            // 时间单位 (s, ms)
            time: {
                min: 0,
                max: 60
            },
        },
        {
            // 无单位数值 - opacity, z-index, line-height, flex-grow 等
            unitless: {
                min: -100,
                max: 100,
                step: 1,
            },
        },
        {
            // Flex 单位 (fr) - Grid 布局常用
            flex: {
                min: 0,
                max: 12,
                step: 1
            },
        }
    ],

    // ==================== 特殊属性配置 ====================
    propertiesConfig: [
        {
            margin: {
                px: {
                    min: -10000,
                    max: 10000
                }
            }
        },
        // z-index: 通常使用特定层级
        {
            zIndex: {
                unitless: {
                    min: -1,
                    max: 10000,
                }
            }
        },

        // opacity: 0-1 范围，步长 0.1
        {
            opacity: {
                unitless: {
                    min: 0,
                    max: 1,
                    step: 0.1,
                }
            }
        },

        // flex-grow / flex-shrink: 0-10 范围
        {
            flexGrow: {
                unitless: {
                    min: 0,
                    max: 10,
                    step: 1
                }
            }
        },
        {
            flexShrink: {
                unitless: {
                    min: 0,
                    max: 10,
                    step: 1
                }
            }
        },

        // order: 通常 -10 到 10
        {
            order: {
                unitless: {
                    min: -10,
                    max: 10,
                    step: 1,
                }
            }
        },

        // line-height: 无单位时通常 1-3
        {
            lineHeight: {
                unitless: {
                    min: 0,
                    max: 3,
                    step: 0.25,
                }
            }
        },

        // font-weight: 100-900，步长 100
        {
            fontWeight: {
                unitless: {
                    min: 100,
                    max: 900,
                    step: 100,
                }
            }
        },

        // border-width: 通常 0-10px
        {
            borderWidth: {
                pixel: {
                    min: 0,
                    max: 10,
                    step: 1
                }
            }
        },

        // border-radius: 通常 0-50px 或百分比
        {
            borderRadius: {
                pixel: {
                    min: 0,
                    max: 100,
                    step: 1
                },
                percentage: {
                    min: 0,
                    max: 50,
                    step: 5
                }
            }
        },

        // scale: 通常 0-2 范围
        {
            scale: {
                unitless: {
                    min: 0,
                    max: 2,
                    step: 0.1
                }
            }
        },

        // aspect-ratio: 常见比例
        {
            aspectRatio: {
                unitless: {
                    min: 0,
                    max: 3,
                    step: 0.1,
                }
            }
        },

        // grid-column/row-start/end: 通常 1-12
        {
            gridColumnStart: {
                unitless: {
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridColumnEnd: {
                unitless: {
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridRowStart: {
                unitless: {
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridRowEnd: {
                unitless: {
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
    ],
};