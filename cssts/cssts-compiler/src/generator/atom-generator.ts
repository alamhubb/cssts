/**
 * 原子类生成器
 * 
 * 根据 CsstsConfig 和 CssPropertyConfigMap 生成原子类定义
 */

import {
  CsstsConfig,
  DEFAULT_UNIT_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  type UnitValueConfig,
  type ProgressiveRange,
} from '../css-types/cssts-config.js';
import {
  cssPropertyNameMap,
  type CssPropertyCamelName,
} from '../css-types/property-config.js';

// ==================== 原子类定义 ====================

export interface AtomDefinition {
  name: string;        // TS 变量名 (camelCase)
  className: string;   // CSS 类名 (property_value)
  property: string;    // CSS 属性 (kebab-case)
  value: string;       // CSS 值
}

// ==================== 命名转换 ====================

/**
 * kebab-case 转 camelCase
 */
function kebabToCamel(str: string): string {
  let result = str.replace(/^-+/, '');
  result = result.replace(/-([a-z0-9])/gi, (_, c) => {
    if (/[0-9]/.test(c)) {
      return '_' + c;
    }
    return c.toUpperCase();
  });
  return result;
}

/**
 * kebab-case 转 PascalCase
 */
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .filter(part => part.length > 0)
    .map(part => {
      if (/^[0-9]/.test(part)) {
        return '_' + part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
}

/** 符号到别名映射（用于 TS 标识符） */
const symbolToAlias: Record<string, string> = {
  '.': 'p',
  '%': 'Pct',
  '/': 's',
};

/** 符号到转义映射（用于 CSS 类名） */
const symbolToEscape: Record<string, string> = {
  '.': '\\.',
  '%': '\\%',
  '/': '\\/',
};

/**
 * 格式化值为合法 TS 标识符
 */
function formatForTsIdentifier(value: string | number): string {
  let str = String(value);

  // 负数前缀
  if (str.startsWith('-')) {
    str = 'N' + str.slice(1);
  }

  // 符号替换
  for (const [symbol, alias] of Object.entries(symbolToAlias)) {
    str = str.split(symbol).join(alias);
  }

  // 连字符转 camelCase
  str = str.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase());
  str = str.replace(/-/g, '');

  return str;
}

/**
 * 格式化值为 CSS 类名
 */
function formatForClassName(value: string | number): string {
  let str = String(value);

  for (const [symbol, escaped] of Object.entries(symbolToEscape)) {
    str = str.split(symbol).join(escaped);
  }

  return str;
}

/**
 * 生成 TS 变量名
 */
function generateAtomName(property: string, value: string): string {
  const propCamel = kebabToCamel(property);
  const valueFormatted = formatForTsIdentifier(value);

  if (/^[0-9N]/.test(valueFormatted)) {
    return propCamel + valueFormatted.charAt(0).toUpperCase() + valueFormatted.slice(1);
  }

  const valuePascal = kebabToPascal(valueFormatted);
  return propCamel + valuePascal;
}

/**
 * 生成 CSS 类名
 */
function generateClassName(property: string, value: string): string {
  const valueFormatted = formatForClassName(value);
  return `${property}_${valueFormatted}`;
}

// ==================== 数值生成 ====================

/**
 * 判断值是否能被任一除数整除
 */
function isDivisibleByAny(value: number, divisors: number[]): boolean {
  return divisors.some(d => value % d === 0);
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
function generateValuesForUnit(
  unit: string,
  config: CsstsConfig
): number[] {
  // 合并配置：用户配置 > 默认配置
  const defaultConfig = DEFAULT_UNIT_CONFIGS[unit] || { min: 0, max: 100 };
  const userConfig = config.unitConfigs[unit as keyof typeof config.unitConfigs] || {};

  const finalConfig: UnitValueConfig = {
    min: userConfig.min ?? defaultConfig.min ?? 0,
    max: userConfig.max ?? defaultConfig.max ?? 100,
    step: userConfig.step ?? defaultConfig.step,
    presets: userConfig.presets ?? defaultConfig.presets ?? [],
    negative: userConfig.negative ?? defaultConfig.negative ?? false,
  };

  const { min, max, step, negative, presets } = finalConfig;
  const ranges = config.progressiveRanges || DEFAULT_PROGRESSIVE_RANGES;

  let values: number[];

  if (step !== undefined) {
    values = generateStepValues(min!, max!, step, negative!);
  } else {
    values = generateProgressiveValues(min!, max!, negative!, ranges);
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

// ==================== 原子类生成 ====================

/**
 * 格式化数值为字符串
 */
function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return String(num);
  }
  return num.toFixed(2).replace(/\.?0+$/, '');
}

/**
 * 生成所有原子类
 */
export function generateAtoms(config: CsstsConfig = new CsstsConfig()): AtomDefinition[] {
  const atoms: AtomDefinition[] = [];
  const seenNames = new Set<string>();

  const excludePropsSet = new Set(config.excludeProperties);
  const excludeKeywordsSet = new Set(config.excludeKeywords as string[]);
  const excludeColorsSet = new Set(config.excludeColors as string[]);
  const excludeUnitsSet = new Set(config.excludeUnits as string[]);

  // 遍历所有属性
  const allPropNames = Object.keys(cssPropertyNameMap) as CssPropertyCamelName[];

  for (const camelName of allPropNames) {
    // 排除属性
    if (excludePropsSet.has(camelName)) continue;

    const kebabName = cssPropertyNameMap[camelName];
    const propConfig = config.properties[camelName];

    if (!propConfig) continue;

    // 1. 生成关键词原子类
    if ('keywords' in propConfig && Array.isArray(propConfig.keywords)) {
      for (const keyword of propConfig.keywords) {
        // 排除关键词和颜色
        if (excludeKeywordsSet.has(keyword) || excludeColorsSet.has(keyword)) continue;

        const name = generateAtomName(kebabName, keyword);
        if (seenNames.has(name)) continue;
        seenNames.add(name);

        atoms.push({
          name,
          className: generateClassName(kebabName, keyword),
          property: kebabName,
          value: keyword,
        });
      }
    }

    // 2. 生成数值原子类（直接使用属性的 units 字段）
    if ('units' in propConfig && Array.isArray(propConfig.units)) {
      for (const unit of propConfig.units as string[]) {
        // 排除单位
        if (excludeUnitsSet.has(unit)) continue;

        const values = generateValuesForUnit(unit, config);

        for (const num of values) {
          const numStr = formatNumber(num);
          const valueWithUnit = unit === 'unitless' ? numStr : `${numStr}${unit}`;

          const name = generateAtomName(kebabName, valueWithUnit);
          if (seenNames.has(name)) continue;
          seenNames.add(name);

          atoms.push({
            name,
            className: generateClassName(kebabName, valueWithUnit),
            property: kebabName,
            value: valueWithUnit,
          });
        }
      }
    }
  }

  // 添加自定义属性
  for (const [propName, propValue] of Object.entries(config.customProperties)) {
    if (typeof propValue === 'string') {
      const name = generateAtomName(propName, propValue);
      if (!seenNames.has(name)) {
        seenNames.add(name);
        atoms.push({
          name,
          className: generateClassName(propName, propValue),
          property: propName,
          value: propValue,
        });
      }
    } else {
      for (const [valueName, cssValue] of Object.entries(propValue)) {
        const name = generateAtomName(propName, valueName);
        if (!seenNames.has(name)) {
          seenNames.add(name);
          atoms.push({
            name,
            className: generateClassName(propName, valueName),
            property: propName,
            value: cssValue,
          });
        }
      }
    }
  }

  // 添加状态原子类
  const stateAtoms: AtomDefinition[] = [
    { name: 'isDisabled', className: 'is-disabled', property: 'state', value: 'disabled' },
    { name: 'isLoading', className: 'is-loading', property: 'state', value: 'loading' },
    { name: 'isActive', className: 'is-active', property: 'state', value: 'active' },
    { name: 'isFocus', className: 'is-focus', property: 'state', value: 'focus' },
    { name: 'isHover', className: 'is-hover', property: 'state', value: 'hover' },
    { name: 'isSelected', className: 'is-selected', property: 'state', value: 'selected' },
    { name: 'isError', className: 'is-error', property: 'state', value: 'error' },
    { name: 'isSuccess', className: 'is-success', property: 'state', value: 'success' },
    { name: 'isWarning', className: 'is-warning', property: 'state', value: 'warning' },
  ];

  for (const state of stateAtoms) {
    if (!seenNames.has(state.name)) {
      seenNames.add(state.name);
      atoms.push(state);
    }
  }

  return atoms;
}

/**
 * 生成 properties.json 数据
 */
export function generatePropertiesJson(atoms: AtomDefinition[]): Record<string, string> {
  const properties = new Set<string>();

  for (const atom of atoms) {
    properties.add(atom.property);
  }

  const result: Record<string, string> = {};
  for (const prop of [...properties].sort()) {
    const camelName = kebabToCamel(prop);
    result[camelName] = prop;
  }

  return result;
}
