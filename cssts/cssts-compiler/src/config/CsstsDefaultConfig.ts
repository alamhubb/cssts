import type {CsstsConfig} from "../types/csstsConfig";

/**
 * CSSTS 默认配置
 *
 * 所有字段都为空或 undefined
 */
export const csstsDefaultConfig: CsstsConfig = {
    // 属性配置
    properties: null,
    excludeProperties: [],

    // 数值类型配置
    numberTypes: undefined,
    excludeNumberTypes: [],

    // 单位分类配置
    unitCategories: undefined,
    excludeUnitCategories: [],

    // 单位配置
    units: undefined,
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