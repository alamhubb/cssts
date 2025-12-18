/**
 * 配置工具函数
 * 用于根据 CsstsConfig 生成原子类
 */

import {
  CsstsConfig,
  DEFAULT_PROGRESSIVE_RANGES,
  DEFAULT_UNIT_CONFIGS,
  normalizeUnitsConfig,
  type UnitValueConfig,
  type ProgressiveRange,
  type StepConfig,
} from './cssts-config';
import { CssPropertyConfigMap, cssPropertyNameMap, type CssPropertyCamelName } from './property-config';

// ==================== 数值生成 ====================

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
function generateProgressiveValues(
  min: number,
  max: number,
  negative: boolean,
  ranges: ProgressiveRange[]
): number[] {
  const values: number[] = [];

  for (let current = min; current <= max; current++) {
    let shouldInclude = false;
    let prevMax = 0;

    for (const range of ranges) {
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
function generateStepValues(
  min: number,
  max: number,
  step: number,
  negative: boolean
): number[] {
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

/**
 * 根据单位配置生成数值
 */
export function generateValuesForUnit(
  unit: string,
  config: CsstsConfig
): number[] {
  // 合并配置：用户配置 > 默认配置
  const defaultConfig = DEFAULT_UNIT_CONFIGS[unit] || { min: 0, max: 100 };
  const normalizedUnits = normalizeUnitsConfig(config.units);
  const userConfig = normalizedUnits[unit] || {};
  
  const finalConfig: UnitValueConfig = {
    min: userConfig.min ?? defaultConfig.min ?? 0,
    max: userConfig.max ?? defaultConfig.max ?? 100,
    step: userConfig.step ?? defaultConfig.step,
    presets: userConfig.presets ?? defaultConfig.presets ?? [],
    negative: userConfig.negative ?? defaultConfig.negative ?? false,
  };

  const { min, max, step, negative, presets } = finalConfig;
  const defaultRanges = config.progressiveRanges || DEFAULT_PROGRESSIVE_RANGES;

  let values: number[];

  if (step !== undefined) {
    // step 可以是 number | ProgressiveRange | ProgressiveRange[]
    if (typeof step === 'number') {
      values = generateStepValues(min!, max!, step, negative!);
    } else if (Array.isArray(step)) {
      values = generateProgressiveValues(min!, max!, negative!, step);
    } else {
      // 单个 ProgressiveRange
      values = generateProgressiveValues(min!, max!, negative!, [step]);
    }
  } else {
    values = generateProgressiveValues(min!, max!, negative!, defaultRanges);
  }

  // 合并预设值
  if (presets && presets.length > 0) {
    for (const preset of presets) {
      values.push(preset);
      if (negative && preset > 0) {
        values.push(-preset);
      }
    }
  }

  // 去重、排序
  return [...new Set(values)].sort((a, b) => a - b);
}

// ==================== 属性过滤 ====================

/**
 * 获取有效的属性列表（排除 excludeProperties）
 */
export function getActiveProperties(config: CsstsConfig): CssPropertyCamelName[] {
  const allProps = Object.keys(cssPropertyNameMap) as CssPropertyCamelName[];
  const excludeSet = new Set(config.excludeProperties);
  return allProps.filter(p => !excludeSet.has(p));
}

/**
 * 获取属性的有效关键词（排除 excludeKeywords 和 excludeColors）
 */
export function getActiveKeywords(
  propName: CssPropertyCamelName,
  config: CsstsConfig
): string[] {
  const propConfig = config.properties[propName];
  if (!propConfig || !('keywords' in propConfig)) {
    return [];
  }

  const keywords = propConfig.keywords as string[];
  const excludeKeywords = new Set(config.excludeKeywords as string[]);
  const excludeColors = new Set(config.excludeColors as string[]);

  return keywords.filter(k => !excludeKeywords.has(k) && !excludeColors.has(k));
}

/**
 * 获取属性的有效数值类型（排除 excludeNumberTypes）
 */
export function getActiveNumberTypes(
  propName: CssPropertyCamelName,
  config: CsstsConfig
): string[] {
  const propConfig = config.properties[propName];
  if (!propConfig || !('numberTypes' in propConfig)) {
    return [];
  }

  const numberTypes = propConfig.numberTypes as string[];
  const excludeSet = new Set(config.excludeNumberTypes as string[]);

  return numberTypes.filter(t => !excludeSet.has(t));
}

// ==================== 原子类生成统计 ====================

export interface AtomStats {
  totalProperties: number;
  activeProperties: number;
  keywordAtoms: number;
  numericAtoms: number;
  customAtoms: number;
  totalAtoms: number;
}

/**
 * 统计将要生成的原子类数量
 */
export function calculateAtomStats(config: CsstsConfig): AtomStats {
  const activeProps = getActiveProperties(config);
  let keywordAtoms = 0;
  let numericAtoms = 0;

  for (const propName of activeProps) {
    // 关键词原子类
    const keywords = getActiveKeywords(propName, config);
    keywordAtoms += keywords.length;

    // 数值原子类（简化计算，实际需要根据单位生成）
    const numberTypes = getActiveNumberTypes(propName, config);
    // 这里只是估算，实际数量取决于每个单位的数值范围
    numericAtoms += numberTypes.length * 50; // 假设每个数值类型平均50个值
  }

  const customAtoms = Object.keys(config.customProperties).length;

  return {
    totalProperties: Object.keys(cssPropertyNameMap).length,
    activeProperties: activeProps.length,
    keywordAtoms,
    numericAtoms,
    customAtoms,
    totalAtoms: keywordAtoms + numericAtoms + customAtoms,
  };
}
