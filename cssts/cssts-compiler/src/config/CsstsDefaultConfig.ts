import type {CsstsConfig} from "../types/csstsConfig";

/**
 * CSSTS 默认配置
 *
 * 所有字段都为空或 undefined
 */
export const csstsDefaultConfig: CsstsConfig = {
    // 属性配置
    properties: {
        width: {
            length: {
                unitless: {}
            }
        },
        height: {
            length: {
                unitless: {}
            }
        }
    },
    excludeProperties: [{
        width: {
            length: {
                unitless: {}
            }
        }
    }],

    // 数值类型配置
    numberTypes: [
        {length: ['pixel']},                                  // 字符串：简单启用 numberType
        {pixel: ['px', 'vw']},   // 完整路径
        {px: {min: 100}},                        // 直接配置 unit（完全跨级）
    ],
    excludeNumberTypes: [],

    // 单位分类配置
    unitCategories: ['unitless', {unitless: ['px', 'vw']}, {px: {min: 0}}],
    excludeUnitCategories: [],

    // 单位配置
    units: {
        px: {min: 100},
        vw: {min: 100}
    },
    excludeUnits: [],

    // 关键字/颜色配置
    keywords: undefined,
    excludeKeywords: [],
    colors: undefined,
    excludeColors: [],

    // 其他配置
    customProperties: {},
    progressiveRanges: undefined,

    // 伪类/伪元素配置
    pseudoClasses: undefined,
    excludePseudoClasses: [],
    pseudoElements: undefined,
    excludePseudoElements: [],

    // 伪类/伪元素样式配置
    pseudoClassesConfig: undefined,
    pseudoElementsConfig: undefined,
};