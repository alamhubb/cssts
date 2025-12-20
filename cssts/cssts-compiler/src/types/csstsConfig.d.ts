/**
 * CSSTS 配置类型定义（自动生成）
 *
 * 包含 CsstsConfig 接口及相关类型
 */

import type {CssPropertyName} from './cssPropertyConfig';
import type {CssNumberTypeName, CssNumberCategoryName, CssNumberUnitName} from './numberTypes';
import type {CssKeywordName, CssColorName} from './cssKeywords';
import type {CssPseudoClassName, CssPseudoElementName} from './cssPseudoClassElement';
import type {CssPseudoClassConfig, CssPseudoElementConfig} from './pseudoStyles';

// ==================== 值配置类型 ====================

/** 渐进步长范围配置 */
export interface ProgressiveRange {
    max: number;
    divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
    step?: number | ProgressiveRange[];  // 步长生成的数值
    min?: number;                         // 步长的最小值
    max?: number;                         // 步长的最大值
    negative?: boolean;                   // 是否生成负值
    presets?: number[];                   // 额外的预设值（与 step 生成的合并）
}

// ==================== 层级配置类型（从下到上依赖） ====================

/**
 * 单位配置映射（对象模式）
 * 示例：{ px: { min: 0 }, rem: { presets: [0, 0.5, 1] } }
 */
export type UnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 单位配置项（最底层）
 * 可以是字符串（简单启用）或对象（带配置，可配置多个单位）
 * - 'px' - 简单启用
 * - { px: { min: 0 }, vw: { min: 100 } } - 配置多个单位
 */
export type UnitConfigItem =
    | CssNumberUnitName
    | UnitConfigMap;

/**
 * 单位配置（支持数组模式和对象模式）
 * - 数组模式：['px', { rem: { min: 0 } }]
 * - 对象模式：{ px: { min: 0 }, rem: { presets: [0, 0.5, 1] } }
 */
export type UnitConfig = UnitConfigItem[] | UnitConfigMap;

/**
 * 分类值配置（依赖 UnitConfigItem）
 * 支持多种格式：
 * - CsstsStepConfig - 直接配置整个分类
 * - CssNumberUnitName[] - 指定支持的单位列表
 * - Partial<Record<CssNumberUnitName, CsstsStepConfig>> - 配置具体单位
 */
export type CategoryValueConfig =
    | CsstsStepConfig
    | CssNumberUnitName[]
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 单位分类配置映射（对象模式）
 * 示例：{ pixel: { px: { min: 0 } }, percentage: ['percent'] }
 */
export type UnitCategoryConfigMap = Partial<Record<CssNumberCategoryName, CategoryValueConfig>>;

/**
 * 单位分类配置项（依赖 CategoryValueConfig）
 * 字符串只支持当前层级（category），对象支持跨级
 * - 'pixel' - 简单启用 category
 * - { pixel: { px: { min: 0 } } } - 完整路径
 * - { pixel: ['px', 'rem'] } - 指定支持的单位列表
 * - { px: { min: 100 } } - 跨级：直接配置 unit
 */
export type UnitCategoryConfigItem =
    | CssNumberCategoryName
    | UnitCategoryConfigMap
    | UnitConfigMap;  // 跨级：直接配置 unit

/**
 * 单位分类配置（支持数组模式和对象模式）
 */
export type UnitCategoryConfig = UnitCategoryConfigItem[] | UnitCategoryConfigMap;

/**
 * 数值类型值配置（依赖 CategoryValueConfig）
 * 支持多种格式：
 * - CsstsStepConfig - 直接配置整个数值类型
 * - CssNumberCategoryName[] - 指定支持的分类列表
 * - Partial<Record<CssNumberCategoryName, CategoryValueConfig>> - 配置多个分类
 * - Partial<Record<CssNumberUnitName, CsstsStepConfig>> - 跨级配置单位
 */
export type NumberTypeValueConfig =
    | CsstsStepConfig
    | CssNumberCategoryName[]
    | Partial<Record<CssNumberCategoryName, CategoryValueConfig>>
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 数值类型配置映射（对象模式）
 * 示例：{ length: { pixel: { px: { min: 0 } } }, angle: ['deg'] }
 */
export type NumberTypeConfigMap = Partial<Record<CssNumberTypeName, NumberTypeValueConfig>>;

/**
 * 数值类型配置项（依赖 NumberTypeValueConfig, CategoryValueConfig）
 * 字符串只支持当前层级（numberType），对象支持跨级
 * - 'length' - 简单启用 numberType
 * - { length: { pixel: { px: { min: 0 } } } } - 完整路径
 * - { length: { px: { min: 0 } } } - 跨过 category 直接配置 unit
 * - { length: ['pixel', 'percentage'] } - 指定支持的分类列表
 * - { pixel: { px: { min: 0 } } } - 跨级：从 category 开始
 * - { px: { min: 0 } } - 跨级：直接配置 unit
 */
export type NumberTypeConfigItem =
    | CssNumberTypeName
    | NumberTypeConfigMap
    | UnitCategoryConfigMap  // 跨级：从 category 开始
    | UnitConfigMap;         // 跨级：直接配置 unit

/**
 * 数值类型配置（支持数组模式和对象模式）
 */
export type NumberTypeConfig = NumberTypeConfigItem[] | NumberTypeConfigMap;

// ==================== 排除配置类型（从下到上依赖，与白名单结构对称） ====================

/**
 * 单位排除项（最底层）
 * 只支持字符串形式（不需要 CsstsStepConfig）
 */
export type UnitExcludeItem = CssNumberUnitName;

/**
 * 单位排除映射（对象模式）
 * 与白名单 UnitConfigMap 对应，但值为空对象（不需要配置）
 * 示例：{ px: {}, rem: {} }
 */
export type UnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

/**
 * 分类排除值配置（依赖 UnitExcludeItem）
 * 与白名单 CategoryValueConfig 对应，但不支持 CsstsStepConfig
 * - CssNumberUnitName[] - 排除指定的单位列表
 * - UnitExcludeMap - 对象模式排除单位
 */
export type CategoryExcludeValueConfig =
    | CssNumberUnitName[]
    | UnitExcludeMap;

/**
 * 单位分类排除映射（对象模式）
 * 与白名单 UnitCategoryConfigMap 对应
 * 示例：{ pixel: ['px', 'rem'], percentage: { percent: {} } }
 */
export type UnitCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CategoryExcludeValueConfig>>;

/**
 * 单位分类排除项（依赖 CategoryExcludeValueConfig）
 * 与白名单 UnitCategoryConfigItem 对应
 * - 'pixel' - 简单排除 category
 * - { pixel: ['px', 'rem'] } - 排除分类下的单位
 * - { px: {} } - 跨级：直接排除 unit
 */
export type UnitCategoryExcludeItem =
    | CssNumberCategoryName
    | UnitCategoryExcludeMap
    | UnitExcludeMap;  // 跨级：直接排除 unit

/**
 * 单位分类排除配置（支持数组模式和对象模式）
 * 与白名单 UnitCategoryConfig 对应
 */
export type UnitCategoryExcludeConfig = UnitCategoryExcludeItem[] | UnitCategoryExcludeMap;

/**
 * 数值类型排除值配置（依赖 CategoryExcludeValueConfig）
 * 与白名单 NumberTypeValueConfig 对应，但不支持 CsstsStepConfig
 * - CssNumberCategoryName[] - 排除指定的分类列表
 * - UnitCategoryExcludeMap - 排除分类下的单位
 * - UnitExcludeMap - 跨级排除单位
 */
export type NumberTypeExcludeValueConfig =
    | CssNumberCategoryName[]
    | UnitCategoryExcludeMap
    | UnitExcludeMap;

/**
 * 数值类型排除映射（对象模式）
 * 与白名单 NumberTypeConfigMap 对应
 * 示例：{ length: ['pixel'], angle: { deg: ['deg'] } }
 */
export type NumberTypeExcludeMap = Partial<Record<CssNumberTypeName, NumberTypeExcludeValueConfig>>;

/**
 * 数值类型排除项（依赖 NumberTypeExcludeValueConfig, UnitCategoryExcludeMap）
 * 与白名单 NumberTypeConfigItem 对应
 * - 'length' - 简单排除 numberType
 * - { length: ['pixel'] } - 排除 numberType 下的分类
 * - { length: { pixel: ['px'] } } - 完整路径
 * - { pixel: ['px'] } - 跨级：从 category 开始
 * - { px: {} } - 跨级：直接排除 unit
 */
export type NumberTypeExcludeItem =
    | CssNumberTypeName
    | NumberTypeExcludeMap
    | UnitCategoryExcludeMap  // 跨级：从 category 开始
    | UnitExcludeMap;         // 跨级：直接排除 unit

/**
 * 数值类型排除配置（支持数组模式和对象模式）
 * 与白名单 NumberTypeConfig 对应
 */
export type NumberTypeExcludeConfig = NumberTypeExcludeItem[] | NumberTypeExcludeMap;

/**
 * 属性排除值配置
 * 与白名单 CssPropertyValueConfig 对应，但不支持 CsstsStepConfig
 * 支持多种配置方式：
 * - { numberTypes: ['length'] } - 排除数值类型
 * - { keywords: ['auto'] } - 排除关键字
 * - { colors: ['red'] } - 排除颜色
 * - { pixel: ['px'] } - 排除分类下的单位
 * - { length: { pixel: ['px'] } } - 完整路径
 */
export type CssPropertyExcludeValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & NumberTypeExcludeMap)
    | (CssPropertyBaseConfig & UnitCategoryExcludeMap)
    | (CssPropertyBaseConfig & UnitExcludeMap);

/**
 * 属性排除映射（对象模式）
 * 与白名单 CssPropertyConfigMap 对应
 * 示例：{ width: { numberTypes: ['length'] }, height: [{ pixel: ['px'] }] }
 */
export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | NumberTypeExcludeItem[]>>;

/**
 * 属性排除项（依赖 CssPropertyExcludeMap, NumberTypeExcludeItem）
 * 与白名单 CssPropertyConfigItem 对应
 * - 'width' - 简单排除属性
 * - { width: { numberTypes: ['length'] } } - 排除属性下的数值类型
 * - { width: [{ pixel: ['px'] }] } - 数组格式配置
 */
export type CssPropertyExcludeItem =
    | CssPropertyName
    | CssPropertyExcludeMap;

/**
 * 属性排除配置（支持数组模式和对象模式）
 * 与白名单 CssPropertyConfig 对应
 */
export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;

// ==================== 属性配置类型 ====================

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

/**
 * 属性基础配置
 */
export interface CssPropertyBaseConfig {
    numberTypes?: CssNumberTypeName[];
    keywords?: CssKeywordName[];
    colors?: CssColorName[];
}

/**
 * 属性值配置
 * 支持多种配置方式：
 * - { numberTypes: ['length'] } - 指定数值类型
 * - { keywords: ['auto'] } - 指定关键字
 * - { colors: ['red'] } - 指定颜色
 * - { px: { min: 0 } } - 直接配置单位（跨级）
 * - { pixel: { px: { min: 0 } } } - 配置分类和单位
 * - { length: { pixel: { px: {} } } } - 完整路径
 * - 以上可以混合使用
 */
export type CssPropertyValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & NumberTypeConfigMap)
    | (CssPropertyBaseConfig & UnitCategoryConfigMap)
    | (CssPropertyBaseConfig & UnitConfigMap);

/**
 * 属性配置映射（对象模式）
 * 一次性配置多个属性
 * 示例：
 * {
 *   width: { length: { pixel: { px: { min: 0 } } } },
 *   height: { length: { unitless: {} } }
 * }
 */
export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | NumberTypeConfigItem[]>>;

/**
 * 属性配置项
 * 可以是字符串（简单启用）或对象（带配置）
 * key 必须是 CSS 属性名称，不支持用 category 或 unit 名称作为 key
 * - 'width' - 简单启用属性
 * - { width: { px: { min: 0 } } } - 属性下直接配置单位
 * - { width: [...] } - 属性下的数值类型配置数组
 */
export type CssPropertyConfigItem =
    | CssPropertyName
    | CssPropertyConfigMap;

/**
 * 属性配置（支持数组模式和对象模式）
 * - 数组模式：CssPropertyConfigItem[]
 * - 对象模式：CssPropertyConfigMap
 */
export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== CSSTS 配置接口 ====================

/**
 * CSSTS 配置接口
 *
 * 定义所有配置项的结构
 */
export interface CsstsConfig {
    // ==================== 属性配置 ====================

    /**
     * 支持的属性列表（白名单）
     * 支持两种模式：
     * - 数组模式：['width', 'height', { margin: { px: { min: 0 } } }]
     * - 对象模式：{ width: { length: { pixel: {} } }, height: { length: {} } }
     */
    properties?: CssPropertyConfig;

    /**
     * 排除的属性列表（黑名单）
     * 仅当 properties 为空时生效
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeProperties?: CssPropertyExcludeConfig;

    // ==================== 数值类型配置 ====================

    /**
     * 支持的数值类型列表（白名单）
     * 支持数组模式和对象模式
     */
    numberTypes?: NumberTypeConfig;

    /**
     * 排除的数值类型列表（黑名单）
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeNumberTypes?: NumberTypeExcludeConfig;

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 支持数组模式和对象模式
     */
    unitCategories?: UnitCategoryConfig;

    /**
     * 排除的单位分类列表（黑名单）
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeUnitCategories?: UnitCategoryExcludeConfig;

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 支持数组模式和对象模式
     */
    units?: UnitConfig;

    /**
     * 排除的单位列表（黑名单）
     */
    excludeUnits?: UnitExcludeItem[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     */
    keywords?: CssKeywordName[];

    /**
     * 排除的关键字列表（黑名单）
     */
    excludeKeywords?: CssKeywordName[];

    /**
     * 支持的颜色列表（白名单）
     */
    colors?: CssColorName[];

    /**
     * 排除的颜色列表（黑名单）
     */
    excludeColors?: CssColorName[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties?: Record<string, CustomPropertyValue>;

    /** 渐进步长策略 */
    progressiveRanges?: ProgressiveRange[];

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     */
    pseudoClasses?: CssPseudoClassName[];

    /**
     * 排除的伪类列表（黑名单）
     */
    excludePseudoClasses?: CssPseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     */
    pseudoElements?: CssPseudoElementName[];

    /**
     * 排除的伪元素列表（黑名单）
     */
    excludePseudoElements?: CssPseudoElementName[];

    // ==================== 伪类/伪元素样式配置 ====================

    /** 伪类样式配置 */
    pseudoClassesConfig?: CssPseudoClassConfig;

    /** 伪元素样式配置 */
    pseudoElementsConfig?: CssPseudoElementConfig;
}

// ==================== 完整配置类型 ====================

/**
 * 完整的 CSSTS 配置类型
 * 所有字段都有值（由 createConfig 函数返回）
 */
export type CsstsConfigRequired = Required<CsstsConfig>;
