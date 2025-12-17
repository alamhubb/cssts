/**
 * 数值生成器
 *
 * 此文件为兼容层，从 css-types/ 重新导出
 * 新代码请直接使用 css-types/config-utils
 */

// 从 css-types 重新导出
export { generateValuesForUnit as generateValues } from '../css-types/config-utils.js';

// ==================== 兼容旧 API ====================

import type { UnitValueConfig } from '../css-types/cssts-config.js';
import { DEFAULT_UNIT_CONFIGS } from '../css-types/cssts-config.js';

/**
 * 获取最终的单位配置（字段级 fallback）
 *
 * @deprecated 使用 generateValuesForUnit from css-types/config-utils
 */
export function resolveUnitConfig(
  propertyConfig: UnitValueConfig | undefined,
  defaultConfig: UnitValueConfig | undefined,
  unitType: string
): UnitValueConfig {
  const system = DEFAULT_UNIT_CONFIGS[unitType] || { min: 0, max: 100 };

  return {
    min: propertyConfig?.min ?? defaultConfig?.min ?? system.min,
    max: propertyConfig?.max ?? defaultConfig?.max ?? system.max,
    step: propertyConfig?.step ?? defaultConfig?.step ?? system.step,
    presets: propertyConfig?.presets ?? defaultConfig?.presets ?? system.presets,
    negative: propertyConfig?.negative ?? defaultConfig?.negative ?? system.negative,
  };
}
