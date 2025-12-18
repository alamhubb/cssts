/**
 * 配置工具函数
 * 
 * 提供配置相关的辅助函数
 */

import type { UnitCategoryName } from '../config/units';
import type { UnitValueConfig, UnitsConfigValue, UnitCategoryConfig } from '../config/value-config';

/**
 * 判断一个值是否应该被包含
 * 
 * 优先级规则：
 * 1. 如果 includeList 有值（非空数组），则只包含 includeList 中的值
 * 2. 否则，排除 excludeList 中的值
 * 
 * @param value 要检查的值
 * @param includeList 白名单（可选）
 * @param excludeList 黑名单
 * @returns 是否应该包含该值
 */
export function shouldInclude<T>(
    value: T,
    includeList: T[] | undefined,
    excludeList: T[]
): boolean {
    // 如果配置了白名单，只使用白名单
    if (includeList && includeList.length > 0) {
        return includeList.includes(value);
    }
    // 否则使用黑名单
    return !excludeList.includes(value);
}

/**
 * 从配置中获取有效的列表
 * 
 * @param allItems 所有可能的值
 * @param includeList 白名单（可选）
 * @param excludeList 黑名单
 * @returns 过滤后的有效列表
 */
export function getEffectiveList<T>(
    allItems: readonly T[],
    includeList: T[] | undefined,
    excludeList: T[]
): T[] {
    // 如果配置了白名单，只使用白名单
    if (includeList && includeList.length > 0) {
        return includeList.filter(item => allItems.includes(item));
    }
    // 否则使用黑名单过滤
    return allItems.filter(item => !excludeList.includes(item));
}

/**
 * 标准化单位配置为 Record 形式
 */
export function normalizeUnitsConfig<T extends string>(
    config: UnitsConfigValue<T> | undefined
): Partial<Record<T, UnitValueConfig>> {
    if (!config) return {};

    // 字符串: 'px'
    if (typeof config === 'string') {
        return {[config]: {}} as Partial<Record<T, UnitValueConfig>>;
    }

    // 字符串数组: ['px', 'em']
    if (Array.isArray(config)) {
        const result: Partial<Record<T, UnitValueConfig>> = {};
        const seenUnits = new Set<string>();

        for (const unit of config) {
            if (seenUnits.has(unit)) {
                console.warn(`⚠️ 重复的单位配置: ${unit}`);
                continue;
            }
            seenUnits.add(unit);
            result[unit as T] = {};
        }
        return result;
    }

    // Record 形式: { px: { max: 500 } }
    return config;
}

/**
 * 标准化单位分类配置为 Record 形式
 */
export function normalizeUnitCategoriesConfig<T extends string>(
    config: UnitsConfigValue<T> | undefined
): Partial<Record<T, UnitCategoryConfig>> {
    if (!config) return {};

    // 字符串: 'pixel'
    if (typeof config === 'string') {
        return { [config]: {} } as Partial<Record<T, UnitCategoryConfig>>;
    }

    // 字符串数组: ['pixel', 'fontRelative']
    if (Array.isArray(config)) {
        const result: Partial<Record<T, UnitCategoryConfig>> = {};
        const seenCategories = new Set<string>();

        for (const category of config) {
            if (seenCategories.has(category)) {
                console.warn(`⚠️ 重复的单位分类配置: ${category}`);
                continue;
            }
            seenCategories.add(category);
            result[category as T] = {};
        }
        return result;
    }

    // Record 形式: { pixel: { max: 500 } }
    return config;
}
