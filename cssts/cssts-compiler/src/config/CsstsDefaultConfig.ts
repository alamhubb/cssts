import type {CsstsConfig} from "../types/csstsConfig";

/**
 * CSSTS 默认配置
 *
 * 所有字段都为空或 undefined
 */
export const csstsDefaultConfig: CsstsConfig = {
    // 属性配置
    properties: [{
        width: {
            length: {}
        }
    }],
    excludeProperties: [{
        width: {
            length: {
                min: 100
            }
        }
    }],

    // 数值类型配置
    numberTypes: [
        {
            length:
                {
                    percentage: {min: 100},
                    pixel: ['px', 'vw'],
                    px: {min: 100}
                }
        },
    ],
    excludeNumberTypes: [{
        length:{
            min: 100
        }
    }],

    // 数值类别配置
    numberCategories: [{}],
    excludeNumberCategories: [],

    // 数值单位配置
    numberUnits: [{
        px: {min: 100},
        vw: {min: 100}
    }],
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