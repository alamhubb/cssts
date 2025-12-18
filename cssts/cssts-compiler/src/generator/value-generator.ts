/**
 * 数值生成器
 *
 * 此文件为兼容层，保持旧 API 兼容
 * 新代码请直接使用 css-types/config-utils
 */

import type { UnitValueConfig } from '../css-types/cssts-config.js';
import { DEFAULT_UNIT_CONFIGS, DEFAULT_PROGRESSIVE_RANGES } from '../css-types/cssts-config.js';

// ==================== 渐进步长策略 ====================

/**
 * 判断值是否能被任一除数整除
 */
function isDivisibleByAny(value: number, divisors: number | number[]): boolean {
  const divisorArr = Array.isArray(divisors) ? divisors : [divisors];
  return divisorArr.some(d => value % d === 0);
}

/**
 * 渐进步长策略生成数值
 */
function generateProgressiveValues(min: number, max: number, negative: boolean): number[] {
  const values: number[] = [];

  for (let current = min; current <= max; current++) {
    let shouldInclude = false;
    let prevMax = 0;

    for (const range of DEFAULT_PROGRESSIVE_RANGES) {
      if (current <= range.max && current > prevMax) {
        shouldInclude = isDivisibleByAny(current, range.divisors);
        break;
      }
      prevMax = range.max;
    }

    if (shouldInclude) {
      values.push(current);
      if (negative && current > 0) {
        values.push(-current);
      }
    }
  }

  // 确保包含 max
  if (!values.includes(max) && max > 0) {
    values.push(max);
    if (negative) {
      values.push(-max);
    }
  }

  return values;
}

/**
 * 固定步长生成数值
 */
function generateStepValues(min: number, max: number, step: number, negative: boolean): number[] {
  const values: number[] = [];

  for (let v = min; v <= max; v += step) {
    const rounded = Math.round(v * 1000) / 1000;
    values.push(rounded);
    if (negative && rounded > 0) {
      values.push(-rounded);
    }
  }

  // 确保包含 max
  if (!values.includes(max)) {
    values.push(max);
    if (negative && max > 0) {
      values.push(-max);
    }
  }

  return values;
}

// ==================== 配置合并 ====================

/**
 * 获取最终的单位配置（字段级 fallback）
 *
 * 优先级：属性配置 > defaults > systemDefaults
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

// ==================== 数值生成 ====================

/**
 * 根据配置生成数值预设
 */
export function generateValues(config: UnitValueConfig): number[] {
  const min = config.min ?? 1;
  const max = config.max ?? 100;
  const step = config.step;
  const negative = config.negative ?? false;
  const presets = config.presets ?? [];

  let values: number[];

  if (step !== undefined) {
    // step 可以是 number | ProgressiveRange | ProgressiveRange[]
    if (typeof step === 'number') {
      values = generateStepValues(min, max, step, negative);
    } else {
      // ProgressiveRange 或 ProgressiveRange[] - 使用渐进步长
      values = generateProgressiveValues(min, max, negative);
    }
  } else {
    // 无 step → 渐进步长
    values = generateProgressiveValues(min, max, negative);
  }

  // 合并预设值
  if (presets.length > 0) {
    for (const preset of presets) {
      values.push(preset);
      if (negative && preset > 0) {
        values.push(-preset);
      }
    }
  }

  // 去重、排序
  const merged = [...new Set(values)];
  return merged.sort((a, b) => a - b);
}
