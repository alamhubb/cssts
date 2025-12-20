/**
 * 配置工厂函数
 * 
 * 提供创建配置实例的便捷方法
 */

import { createConfig, type CsstsConfig, type CsstsConfigRequired } from '../cssts-config';

/**
 * 创建 CSSTS 配置实例
 * 
 * 系统级别默认排除低频单位分类，用户可通过 includeUnitCategories 显式启用
 * 
 * @param options 用户配置，会与系统默认配置合并
 * @returns CsstsConfigRequired 实例
 * 
 * @example
 * // 使用系统默认配置
 * const config = createCsstsConfig();
 * 
 * @example
 * // 显式启用分辨率单位
 * const config = createCsstsConfig({
 *   includeUnitCategories: ['resolution']
 * });
 */
export function createCsstsConfig(options?: CsstsConfig): CsstsConfigRequired {
    return createConfig(options);
}
