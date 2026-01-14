/**
 * 配置查找器
 * 
 * 保持用户配置和默认配置两份，使用时按需查找：
 * - 顶级配置：用户有就用用户的，没有就用默认的
 * - 嵌套配置（numberCategoriesConfig, propertiesConfig）：按名称查找，先用户后默认
 */

import type { CsstsConfig } from './types/csstsConfig';
import type {
    CssPropertyName,
    CssNumberCategoryName,
    CssColorName,
    CssProgressiveRange,
    GroupConfig,
    CssStepConfig,
} from './types/cssPropertyConfig';
import { csstsDefaultConfig } from './CsstsDefaultConfig';

/**
 * 从配置数组中查找指定 key 的配置
 * @param configArray 配置数组，如 [{ pixel: {...} }, { fontRelative: {...} }]
 * @param key 要查找的 key，如 'pixel'
 * @returns 找到的配置值，如 { min: 0, max: 1000 }
 */
function findInConfigArray<T extends Record<string, any>>(
    configArray: T[] | undefined,
    key: string
): any | undefined {
    if (!configArray) return undefined;

    for (const item of configArray) {
        if (key in item) {
            return item[key];
        }
    }
    return undefined;
}

/**
 * 配置查找器
 * 
 * 使用时按需查找配置：
 * - 顶级覆盖：用户有就用用户的，没有就用默认的
 * - 按名称覆盖：先从用户配置查找，找不到再从默认配置查找
 */
export class ConfigLookup {
    constructor(
        private readonly userConfig?: Partial<CsstsConfig>,
        private readonly defaultConfig: CsstsConfig = csstsDefaultConfig
    ) { }

    // ==================== 顶级覆盖 ====================

    /** 支持的属性列表 */
    get properties(): CssPropertyName[] | undefined {
        return this.userConfig?.properties ?? this.defaultConfig.properties;
    }

    /** 排除的属性列表 */
    get excludeProperties(): CssPropertyName[] | undefined {
        return this.userConfig?.excludeProperties ?? this.defaultConfig.excludeProperties;
    }

    /** 支持的颜色列表 */
    get colors(): CssColorName[] | undefined {
        return this.userConfig?.colors ?? this.defaultConfig.colors;
    }

    /** 排除的颜色列表 */
    get excludeColors(): CssColorName[] | undefined {
        return this.userConfig?.excludeColors ?? this.defaultConfig.excludeColors;
    }

    /** 渐进步长范围 */
    get progressiveRanges(): CssProgressiveRange[] | undefined {
        return this.userConfig?.progressiveRanges ?? this.defaultConfig.progressiveRanges;
    }

    /** 组合原子类配置 */
    get groups(): GroupConfig[] | undefined {
        return this.userConfig?.groups ?? this.defaultConfig.groups;
    }

    /** 数值类别列表 */
    get numberCategories(): CssNumberCategoryName[] | undefined {
        return this.userConfig?.numberCategories ?? this.defaultConfig.numberCategories;
    }

    /** 排除的数值类别 */
    get excludeNumberCategories(): CssNumberCategoryName[] | undefined {
        return this.userConfig?.excludeNumberCategories ?? this.defaultConfig.excludeNumberCategories;
    }

    /** 类名前缀 */
    get classPrefix(): string | undefined {
        return this.userConfig?.classPrefix ?? this.defaultConfig.classPrefix;
    }

    /** 排除的关键字 */
    get excludeKeywords() {
        return this.userConfig?.excludeKeywords ?? this.defaultConfig.excludeKeywords;
    }

    // ==================== 按名称覆盖（细粒度） ====================

    /**
     * 获取数值类别配置（先用户后默认）
     * @param categoryName 类别名，如 'pixel', 'fontRelative'
     * @returns 配置值，如 { min: 0, max: 1000 }
     */
    getCategoryConfig(categoryName: string): CssStepConfig | undefined {
        // 1. 先从用户配置查找
        const userResult = findInConfigArray(
            this.userConfig?.numberCategoriesConfig,
            categoryName
        );
        if (userResult !== undefined) return userResult;

        // 2. 用户没有，从默认配置查找
        return findInConfigArray(
            this.defaultConfig.numberCategoriesConfig,
            categoryName
        );
    }

    /**
     * 获取属性配置（先用户后默认）
     * @param propertyName 属性名，如 'width', 'height'
     * @returns 配置值，如 { px: { min: 0, max: 10000 } }
     */
    getPropertyConfig(propertyName: string): Record<string, CssStepConfig> | undefined {
        // 1. 先从用户配置查找
        const userResult = findInConfigArray(
            this.userConfig?.propertiesConfig,
            propertyName
        );
        if (userResult !== undefined) return userResult;

        // 2. 用户没有，从默认配置查找
        return findInConfigArray(
            this.defaultConfig.propertiesConfig,
            propertyName
        );
    }
}
