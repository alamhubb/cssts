/**
 * CSSTS 配置类
 *
 * 此文件为手动维护，不由脚本自动生成
 * 提供用户配置接口
 */

import type { AllColorValue } from './config/colors';
import type { NumberTypeName, UnitType, UnitCategoryName } from './config/units';
import type { KeywordValue } from './config/keywords';
import { CssPropertyConfigMap, type CssPropertyCamelName } from './config/property-config';
import type { PseudoClassName } from './config/pseudo';
import type { PseudoElementName } from './config/pseudo';
import { RARE_PROPERTIES } from './presets/tailwind-like';
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

/** CsstsConfig 构造函数参数类型 */
export interface CsstsConfigOptions {
    // 属性配置
    includeProperties?: CssPropertyCamelName[];
    excludeProperties?: CssPropertyCamelName[];
    
    // 数值类型配置
    includeNumberTypes?: NumberTypeName[];
    excludeNumberTypes?: NumberTypeName[];
    
    // 单位分类配置
    includeUnitCategories?: UnitCategoryName[];
    excludeUnitCategories?: UnitCategoryName[];
    
    // 单位配置
    includeUnits?: UnitType[];
    excludeUnits?: UnitType[];
    
    // 关键字/颜色配置
    includeKeywords?: KeywordValue[];
    excludeKeywords?: KeywordValue[];
    includeColors?: AllColorValue[];
    excludeColors?: AllColorValue[];
    
    // 伪类/伪元素配置
    includePseudoClasses?: PseudoClassName[];
    excludePseudoClasses?: PseudoClassName[];
    includePseudoElements?: PseudoElementName[];
    excludePseudoElements?: PseudoElementName[];
    
    // 其他配置
    customProperties?: Record<string, CustomPropertyValue>;
    progressiveRanges?: ProgressiveRange[];
    unitCategories?: UnitsConfigValue<UnitCategoryName>;
    pseudoClassStyles?: Partial<PseudoClassStylesConfig>;
    pseudoElementStyles?: Partial<PseudoElementStylesConfig>;
}

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
     * 如果配置了此项，则只生成这些数值类型，忽略 excludeNumberTypes
     * 为空或 undefined 时使用 excludeNumberTypes 逻辑
     */
    includeNumberTypes?: NumberTypeName[];

    /** 
     * 排除的数值类型列表（黑名单）
     * 仅当 includeNumberTypes 为空时生效
     */
    excludeNumberTypes: NumberTypeName[];

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 如果配置了此项，则只生成这些分类的单位，忽略 excludeUnitCategories
     * 为空或 undefined 时使用 excludeUnitCategories 逻辑
     */
    includeUnitCategories?: UnitCategoryName[];

    /**
     * 排除的单位分类列表（黑名单）
     * 仅当 includeUnitCategories 为空时生效
     */
    excludeUnitCategories: UnitCategoryName[];

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 如果配置了此项，则只生成这些单位，忽略 excludeUnits
     * 为空或 undefined 时使用 excludeUnits 逻辑
     */
    includeUnits?: UnitType[];

    /** 
     * 排除的单位列表（黑名单）
     * 仅当 includeUnits 为空时生效
     */
    excludeUnits: UnitType[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     * 如果配置了此项，则只生成这些关键字，忽略 excludeKeywords
     */
    includeKeywords?: KeywordValue[];

    /** 排除的关键字列表（黑名单） */
    excludeKeywords: KeywordValue[];

    /**
     * 支持的颜色列表（白名单）
     * 如果配置了此项，则只生成这些颜色，忽略 excludeColors
     */
    includeColors?: AllColorValue[];

    /** 排除的颜色列表（黑名单） */
    excludeColors: AllColorValue[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties: Record<string, CustomPropertyValue>;

    /** 渐进步长策略（不设置则使用默认策略） */
    progressiveRanges: ProgressiveRange[];

    /** 单位分类配置（覆盖 DEFAULT_UNIT_CATEGORY_CONFIGS） */
    unitCategories: UnitsConfigValue<UnitCategoryName>;

    /** 属性级别配置 */
    properties: CssPropertyConfigMap;

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     * 如果配置了此项，则只生成这些伪类，忽略 excludePseudoClasses
     */
    includePseudoClasses?: PseudoClassName[];

    /** 排除的伪类列表（黑名单） */
    excludePseudoClasses: PseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     * 如果配置了此项，则只生成这些伪元素，忽略 excludePseudoElements
     */
    includePseudoElements?: PseudoElementName[];

    /** 排除的伪元素列表（黑名单） */
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
     * // 只使用 px 和百分比单位
     * const config = new CsstsConfig({
     *   includeUnitCategories: ['px', 'percentage'],
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
    constructor(options: CsstsConfigOptions = {}) {
        // 属性配置
        this.includeProperties = options.includeProperties;
        this.excludeProperties = options.excludeProperties ?? [...RARE_PROPERTIES];
        
        // 数值类型配置
        this.includeNumberTypes = options.includeNumberTypes;
        this.excludeNumberTypes = options.excludeNumberTypes ?? [];
        
        // 单位分类配置 - 合并系统级别默认排除
        this.includeUnitCategories = options.includeUnitCategories;
        this.excludeUnitCategories = options.excludeUnitCategories
            ? [...SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES, ...options.excludeUnitCategories]
            : [...SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES];
        
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
        this.unitCategories = options.unitCategories ?? {};
        this.properties = new CssPropertyConfigMap();
        
        // 伪类/伪元素样式配置
        this.pseudoClassStyles = options.pseudoClassStyles ?? new PseudoClassStylesConfig();
        this.pseudoElementStyles = options.pseudoElementStyles ?? new PseudoElementStylesConfig();
    }

    /**
     * 创建配置实例的静态工厂方法
     * 
     * @param options 可选的配置对象
     * @returns CsstsConfig 实例
     */
    static create(options: CsstsConfigOptions = {}): CsstsConfig {
        return new CsstsConfig(options);
    }
}


