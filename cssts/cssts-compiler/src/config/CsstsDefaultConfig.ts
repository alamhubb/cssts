import type {CsstsConfig} from "../types/csstsConfig";
import {CssPropertyName} from "../types/cssPropertyConfig";

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

    // 默认支持的属性列表
    // properties: atomicCssProperties,
    properties: ['top'],

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
                negative: true,
                min: 0,
                max: 1000,
            },
        },
        {
            // 字体相对单位 (em, rem, ch, etc.)
            fontRelative: {
                negative: true,
                min: 0,
                max: 20,
                step: 0.125
            },
        },
        {
            // 百分比类 (%, vw, vh, vmin, vmax, etc.)
            percentage: {
                negative: false,
                min: 0,
                max: 100,
                step: 1,
                presets: [33.33, 66.67],
            },
        },
        {
            // 角度单位 (deg, rad, turn, grad)
            angle: {
                negative: true,
                min: 0,
                max: 360,
                step: 1
            },
        },
        {
            // 时间单位 (s, ms)
            time: {
                negative: false,
                min: 0,
                max: 60
            },
        },
        {
            // 无单位数值 - opacity, z-index, line-height, flex-grow 等
            unitless: {
                negative: true,
                min: 0,
                max: 100,
                step: 1,
            },
        },
        {
            // Flex 单位 (fr) - Grid 布局常用
            flex: {
                negative: false,
                min: 0,
                max: 12,
                step: 1
            },
        }
    ],

    // ==================== 特殊属性配置 ====================
    propertiesConfig: [
        // z-index: 通常使用特定层级
        {
            zIndex: {
                unitless: {
                    negative: true,
                    max: 10000,
                    presets: [-1, 999, 9999],
                }
            }
        },

        // opacity: 0-1 范围，步长 0.1
        {
            opacity: {
                unitless: {
                    negative: false,
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
                    negative: false,
                    min: 0,
                    max: 10,
                    step: 1
                }
            }
        },
        {
            flexShrink: {
                unitless: {
                    negative: false,
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
                    negative: true,
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
                    negative: false,
                    min: 0,
                    max: 3,
                    step: 0.125,
                }
            }
        },

        // font-weight: 100-900，步长 100
        {
            fontWeight: {
                unitless: {
                    negative: false,
                    min: 100,
                    max: 900,
                    step: 100,
                }
            }
        },

        // letter-spacing / word-spacing: 通常较小值
        {
            letterSpacing: {
                pixel: {
                    negative: true,
                    min: -5,
                    max: 20,
                    step: 0.5
                },
                fontRelative: {
                    negative: true,
                    min: -0.5,
                    max: 1,
                    step: 0.1
                }
            }
        },

        // border-width: 通常 0-10px
        {
            borderWidth: {
                pixel: {
                    negative: false,
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
                    negative: false,
                    min: 0,
                    max: 100,
                    step: 1
                },
                percentage: {
                    negative: false,
                    min: 0,
                    max: 50,
                    step: 5
                }
            }
        },

        // outline-offset: 通常较小值
        {
            outlineOffset: {
                pixel: {
                    negative: true,
                    min: -10,
                    max: 20,
                    step: 1
                }
            }
        },

        // scale: 通常 0-2 范围
        {
            scale: {
                unitless: {
                    negative: false,
                    min: 0,
                    max: 2,
                    step: 0.1
                }
            }
        },

        // rotate: 角度
        {
            rotate: {
                angle: {
                    negative: true,
                    min: -360,
                    max: 360,
                    step: [10, 15]
                }
            }
        },

        // aspect-ratio: 常见比例
        {
            aspectRatio: {
                unitless: {
                    negative: false,
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
                    negative: false,
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridColumnEnd: {
                unitless: {
                    negative: false,
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridRowStart: {
                unitless: {
                    negative: false,
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
        {
            gridRowEnd: {
                unitless: {
                    negative: false,
                    min: 1,
                    max: 13,
                    step: 1,
                }
            }
        },
    ],
};