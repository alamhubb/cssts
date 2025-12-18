/**
 * CSSTS 配置类
 *
 * 此文件为手动维护，不由脚本自动生成
 * 提供用户配置接口
 */

import type {AllColorValue} from './config/colors';
import type {NumberTypeName, UnitType, UnitCategoryName} from './config/units';
import type {KeywordValue} from './config/keywords';
import {CssPropertyConfigMap, type CssPropertyCamelName} from './config/property-config';
import type {PseudoClassName} from './config/pseudo';
import type {PseudoElementName} from './config/pseudo';
import {RARE_PROPERTIES} from './presets/tailwind-like';
import {
    DEFAULT_PROGRESSIVE_RANGES,
    DEFAULT_UNIT_CATEGORY_CONFIGS,
    DEFAULT_UNIT_CONFIGS,
    type ProgressiveRange,
    type StepConfig,
    type UnitValueConfig,
    type UnitsConfigValue,
    type UnitCategoryConfig,
    type CustomPropertyValue,
    type NumberTypeConfigItem,
    type UnitCategoryConfigItem,
    type UnitConfigItem,
    type NumberTypeExcludeItem,
    type UnitCategoryExcludeItem,
    type UnitExcludeItem,
} from './config/value-config';
import {
    PseudoClassStylesConfig,
    PseudoElementStylesConfig,
    type PseudoStyleValue,
} from './config/pseudo-styles';

// ==================== 重新导出配置相关类型和常量 ====================

export type {
    ProgressiveRange,
    StepConfig,
    UnitValueConfig,
    UnitsConfigValue,
    UnitCategoryConfig,
    CustomPropertyValue,
    PseudoStyleValue,
    NumberTypeConfigItem,
    UnitCategoryConfigItem,
    UnitConfigItem,
    NumberTypeExcludeItem,
    UnitCategoryExcludeItem,
    UnitExcludeItem,
};

export {
    DEFAULT_PROGRESSIVE_RANGES,
    DEFAULT_UNIT_CATEGORY_CONFIGS,
    DEFAULT_UNIT_CONFIGS,
    PseudoClassStylesConfig,
    PseudoElementStylesConfig,
};

// ==================== 系统级别默认配置 ====================

/** 系统级别默认排除的单位分类（低频使用） */
export const SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES: UnitCategoryName[] = [
    'resolution',  // dpi, dpcm, dppx, x - 98% 用不到
    'physical',    // pt, pc, in, cm, mm, Q - 95% 用不到
    'flex',        // fr - Grid 用户较少
];

// ==================== CSSTS 配置类 ====================

/** CSSTS 配置 */
export class CsstsConfig {
    // ==================== 属性配置 ====================

    /**
     * 支持的属性列表（白名单）
     * 如果配置了此项，则只生成这些属性的原子类，忽略 excludeProperties
     * 为空或 undefined 时使用 excludeProperties 逻辑
     */
    includeProperties?: CssPropertyCamelName[];

    /**
     * 排除的属性列表（黑名单）
     * 仅当 includeProperties 为空时生效
     * 默认排除冷门属性（基于 Tailwind 经验，98% 用不到的属性）
     */
    excludeProperties: CssPropertyCamelName[];

    // ==================== 数值类型配置 ====================

    /**
     * 支持的数值类型列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ numberType: { unitCategory: { unit: { step: 4 } } } }
     * 
     * @example
     * includeNumberTypes: [
     *   'length',
     *   { time: { px: { px: { step: 4 } } } }
     * ]
     */
    includeNumberTypes?: NumberTypeConfigItem<NumberTypeName>[];

    /**
     * 排除的数值类型列表（黑名单）
     * 仅当 includeNumberTypes 为空时生效
     * 支持混合数组格式，可以排除整个数值类型、特定单位或特定分类下的单位
     * 
     * @example
     * excludeNumberTypes: [
     *   'angle',                           // 排除整个 angle 数值类型
     *   { time: ['ms', 's'] },             // 排除 time 类型下的 ms 和 s 单位
     *   { length: { pixel: ['px'] } }      // 排除 length 类型中 pixel 分类下的 px
     * ]
     */
    excludeNumberTypes: NumberTypeExcludeItem<NumberTypeName>[];

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ unitCategory: { unit: { step: 4 } } }
     * 
     * @example
     * includeUnitCategories: [
     *   'pixel',
     *   { percentage: { '%': { presets: [0, 25, 50, 75, 100] } } }
     * ]
     */
    includeUnitCategories?: UnitCategoryConfigItem<UnitCategoryName>[];

    /**
     * 排除的单位分类列表（黑名单）
     * 仅当 includeUnitCategories 为空时生效
     * 支持混合数组格式，可以排除整个分类或特定单位
     * 
     * @example
     * excludeUnitCategories: [
     *   'resolution',               // 排除整个 resolution 分类
     *   { pixel: ['px'] }           // 排除 pixel 分类下的 px 单位
     * ]
     */
    excludeUnitCategories: UnitCategoryExcludeItem<UnitCategoryName>[];

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 可以是字符串数组或混合数组（字符串 + 对象）
     * 对象格式：{ unit: { step: 4, max: 500 } }
     * 
     * @example
     * includeUnits: [
     *   'px',
     *   'em',
     *   { px: { step: 4, max: 500 } }  // px is the unit name, not category
     * ]
     */
    includeUnits?: UnitConfigItem<UnitType>[];

    /**
     * 排除的单位列表（黑名单）
     * 仅当 includeUnits 为空时生效
     * 支持混合数组格式（为了保持一致性）
     * 
     * @example
     * excludeUnits: [
     *   'px',
     *   'em',
     *   { dpi: {} }
     * ]
     */
    excludeUnits: UnitExcludeItem<UnitType>[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     * 如果配置了此项，则只生成这些关键字，忽略 excludeKeywords
     */
    includeKeywords?: KeywordValue[];

    /**
     * 排除的关键字列表（黑名单）
     * 仅当 includeKeywords 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludeKeywords: KeywordValue[];

    /**
     * 支持的颜色列表（白名单）
     * 如果配置了此项，则只生成这些颜色，忽略 excludeColors
     */
    includeColors?: AllColorValue[];

    /**
     * 排除的颜色列表（黑名单）
     * 仅当 includeColors 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludeColors: AllColorValue[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties: Record<string, CustomPropertyValue>;

    /** 渐进步长策略（不设置则使用默认策略） */
    progressiveRanges: ProgressiveRange[];

    /** 属性级别配置 */
    properties: CssPropertyConfigMap;

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     * 如果配置了此项，则只生成这些伪类，忽略 excludePseudoClasses
     */
    includePseudoClasses?: PseudoClassName[];

    /**
     * 排除的伪类列表（黑名单）
     * 仅当 includePseudoClasses 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludePseudoClasses: PseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     * 如果配置了此项，则只生成这些伪元素，忽略 excludePseudoElements
     */
    includePseudoElements?: PseudoElementName[];

    /**
     * 排除的伪元素列表（黑名单）
     * 仅当 includePseudoElements 为空时生效
     * 只需要名字列表，不支持配置
     */
    excludePseudoElements: PseudoElementName[];

    /** 伪类样式配置（当变量名包含伪类后缀时自动添加的样式） */
    pseudoClassStyles: PseudoClassStylesConfig;

    /** 伪元素样式配置 */
    pseudoElementStyles: PseudoElementStylesConfig;

    /**
     * 创建 CSSTS 配置实例
     *
     * @param options 可选的配置对象，用于覆盖默认值
     *
     * @example
     * // 使用默认配置
     * const config = new CsstsConfig();
     *
     * @example
     * // 只生成指定属性
     * const config = new CsstsConfig({
     *   includeProperties: ['width', 'height', 'margin', 'padding'],
     * });
     *
     * @example
     * // 只使用 pixel 和百分比单位
     * const config = new CsstsConfig({
     *   includeUnitCategories: ['pixel', 'percentage'],
     * });
     *
     * @example
     * // 自定义单位分类配置
     * const config = new CsstsConfig({
     *   unitCategories: {
     *     px: { presets: [0, 4, 8, 16, 32, 64] },
     *     percentage: { presets: [0, 25, 50, 75, 100] },
     *   },
     * });
     */
    constructor(options = {} as CsstsConfig) {
        // 属性配置
        this.includeProperties = options.includeProperties;
        this.excludeProperties = options.excludeProperties ?? [...RARE_PROPERTIES];

        // 数值类型配置
        this.includeNumberTypes = options.includeNumberTypes;
        this.excludeNumberTypes = options.excludeNumberTypes ?? [];

        // 单位分类配置 - 合并系统级别默认排除
        this.includeUnitCategories = options.includeUnitCategories;
        this.excludeUnitCategories = options.excludeUnitCategories ?? SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES

        // 单位配置
        this.includeUnits = options.includeUnits;
        this.excludeUnits = options.excludeUnits ?? [];

        // 关键字/颜色配置
        this.includeKeywords = options.includeKeywords;
        this.excludeKeywords = options.excludeKeywords ?? [];
        this.includeColors = options.includeColors;
        this.excludeColors = options.excludeColors ?? [];

        // 伪类/伪元素配置
        this.includePseudoClasses = options.includePseudoClasses;
        this.excludePseudoClasses = options.excludePseudoClasses ?? [];
        this.includePseudoElements = options.includePseudoElements;
        this.excludePseudoElements = options.excludePseudoElements ?? [];

        // 其他配置
        this.customProperties = options.customProperties ?? {};
        this.progressiveRanges = options.progressiveRanges ?? DEFAULT_PROGRESSIVE_RANGES;
        this.properties = new CssPropertyConfigMap(options.properties);

        // 伪类/伪元素样式配置
        this.pseudoClassStyles = new PseudoClassStylesConfig(options.pseudoClassStyles);
        this.pseudoElementStyles = new PseudoElementStylesConfig(options.pseudoElementStyles);
    }
}


export const csstsDefaultConfig = new CsstsConfig()