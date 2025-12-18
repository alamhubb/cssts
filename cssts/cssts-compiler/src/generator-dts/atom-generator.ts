/**
 * 原子类生成器
 * 
 * 根据 CsstsConfig 和 CssPropertyConfigMap 生成原子类定义
 * 
 * 数值生成基于 UnitCategory 配置，同一分类下的单位共享相同的数值范围
 */

import {
  CsstsConfig,
  DEFAULT_UNIT_CATEGORY_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  type UnitCategoryConfig,
  type ProgressiveRange,
} from '../cssts-config.js';
import {
  normalizeUnitCategoriesConfig,
  shouldInclude,
  extractUnitConfigsFromArray,
  extractUnitCategoryConfigsFromArray,
  extractNumberTypeConfigsFromArray,
  extractStringsFromArray,
  extractStringsFromNumberTypeExcludeArray,
  extractStringsFromUnitCategoryExcludeArray,
  extractStringsFromUnitExcludeArray,
} from '../utils/config-utils.js';
import {
  cssPropertyNameMap,
  type CssPropertyCamelName,
} from '../config/property-config.js';
import { NUMBER_TYPE_UNITS, CATEGORY_BY_UNIT } from '../config/units.js';
import type { UnitCategoryName } from '../custom/unit-categories.js';

// ==================== 原子类定义 ====================

export interface AtomDefinition {
  name: string;        // TS 变量名 (camelCase)
  className: string;   // CSS 类名 (property_value)
  property: string;    // CSS 属性 (kebab-case)
  value: string;       // CSS 值
}

// ==================== 命名转换 ====================

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

const symbolToAlias: Record<string, string> = {
  '.': 'p',
  '%': 'Pct',
  '/': 's',
};

const symbolToEscape: Record<string, string> = {
  '.': '\\.',
  '%': '\\%',
  '/': '\\/',
};

function formatForTsIdentifier(value: string | number): string {
  let str = String(value);
  if (str.startsWith('-')) {
    str = 'N' + str.slice(1);
  }
  for (const [symbol, alias] of Object.entries(symbolToAlias)) {
    str = str.split(symbol).join(alias);
  }
  str = str.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase());
  str = str.replace(/-/g, '');
  return str;
}

function formatForClassName(value: string | number): string {
  let str = String(value);
  for (const [symbol, escaped] of Object.entries(symbolToEscape)) {
    str = str.split(symbol).join(escaped);
  }
  return str;
}

function generateAtomName(property: string, value: string): string {
  const propCamel = kebabToCamel(property);
  const valueFormatted = formatForTsIdentifier(value);
  if (/^[0-9N]/.test(valueFormatted)) {
    return propCamel + valueFormatted.charAt(0).toUpperCase() + valueFormatted.slice(1);
  }
  const valuePascal = kebabToPascal(valueFormatted);
  return propCamel + valuePascal;
}

function generateClassName(property: string, value: string): string {
  const valueFormatted = formatForClassName(value);
  return `${property}_${valueFormatted}`;
}

// ==================== 数值生成 ====================

function isDivisibleByAny(value: number, divisors: number | number[]): boolean {
  const divisorArr = Array.isArray(divisors) ? divisors : [divisors];
  return divisorArr.some(d => {
    // 处理小数除法的精度问题
    const result = value / d;
    return Math.abs(result - Math.round(result)) < 0.0001;
  });
}

function generateProgressiveValues(
  min: number,
  max: number,
  negative: boolean,
  ranges: ProgressiveRange[]
): number[] {
  const values: number[] = [];
  
  // 检测最小步长（用于小数支持）
  let minStep = 1;
  for (const range of ranges) {
    const divisors = Array.isArray(range.divisors) ? range.divisors : [range.divisors];
    for (const d of divisors) {
      if (d < minStep && d > 0) minStep = d;
    }
  }
  
  // 使用最小步长迭代
  const precision = minStep < 1 ? Math.ceil(-Math.log10(minStep)) : 0;
  const multiplier = Math.pow(10, precision);

  for (let i = Math.round(min * multiplier); i <= Math.round(max * multiplier); i += Math.round(minStep * multiplier)) {
    const current = i / multiplier;
    let shouldInclude = false;
    let prevMax = min;

    for (const range of ranges) {
      const rangeMax = range.max ?? max;
      if (current <= rangeMax && current >= prevMax) {
        shouldInclude = isDivisibleByAny(current, range.divisors);
        break;
      }
      prevMax = rangeMax;
    }

    if (shouldInclude) {
      values.push(current);
      if (negative && current > 0) {
        values.push(-current);
      }
    }
  }

  if (!values.includes(max) && max > 0) {
    values.push(max);
    if (negative) {
      values.push(-max);
    }
  }

  return values;
}

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

  if (!values.includes(max)) {
    values.push(max);
    if (negative && max > 0) {
      values.push(-max);
    }
  }

  return values;
}

/**
 * 根据单位生成数值列表
 * 
 * 基于 UnitCategory 配置：
 * 1. 根据单位查找所属分类（如 px → pixel）
 * 2. 使用该分类的配置生成数值
 * 3. 用户可通过 config.unitCategories 覆盖默认配置
 */
function generateValuesForUnit(
  unit: string,
  config: CsstsConfig
): number[] {
  // 1. 查找单位所属的分类
  const category = CATEGORY_BY_UNIT[unit] as UnitCategoryName | undefined;
  
  // 2. 获取分类的默认配置
  const categoryConfig = category ? DEFAULT_UNIT_CATEGORY_CONFIGS[category] : undefined;
  const defaultConfig = categoryConfig || { presets: [0, 1, 2, 3, 4, 5, 10, 20, 50, 100] };
  
  // 3. 获取用户自定义的分类配置（从 includeUnitCategories 中提取）
  const categoryConfigs = extractUnitCategoryConfigsFromArray(config.includeUnitCategories);
  const userConfig = category ? (categoryConfigs[category]?.[unit] || {}) : {};

  // 4. 合并配置
  const finalConfig: UnitCategoryConfig = {
    min: userConfig.min ?? defaultConfig.min ?? 0,
    max: userConfig.max ?? defaultConfig.max ?? 100,
    step: userConfig.step ?? defaultConfig.step,
    presets: userConfig.presets ?? defaultConfig.presets ?? [],
    negative: userConfig.negative ?? defaultConfig.negative ?? false,
  };

  const { min, max, step, negative, presets } = finalConfig;
  const defaultRanges = config.progressiveRanges || DEFAULT_PROGRESSIVE_RANGES;

  let values: number[] = [];

  // 如果有 presets 且没有 step，只使用 presets（Tailwind 风格）
  if (presets && presets.length > 0 && step === undefined) {
    for (const preset of presets) {
      values.push(preset);
      if (negative && preset > 0) {
        values.push(-preset);
      }
    }
  } else {
    // 使用 step 或默认渐进策略生成值
    if (step !== undefined) {
      if (typeof step === 'number') {
        values = generateStepValues(min!, max!, step, negative!);
      } else if (Array.isArray(step)) {
        values = generateProgressiveValues(min!, max!, negative!, step);
      } else {
        values = generateProgressiveValues(min!, max!, negative!, [step]);
      }
    } else {
      values = generateProgressiveValues(min!, max!, negative!, defaultRanges);
    }

    // 如果同时有 presets，追加到生成的值中
    if (presets && presets.length > 0) {
      for (const preset of presets) {
        values.push(preset);
        if (negative && preset > 0) {
          values.push(-preset);
        }
      }
    }
  }

  return [...new Set(values)].sort((a, b) => a - b);
}

// ==================== 原子类生成 ====================

function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return String(num);
  }
  return num.toFixed(2).replace(/\.?0+$/, '');
}

export function generateAtoms(config: CsstsConfig = new CsstsConfig(), debug = false): AtomDefinition[] {
  const atoms: AtomDefinition[] = [];
  const seenNames = new Set<string>();

  const allPropNames = Object.keys(cssPropertyNameMap) as CssPropertyCamelName[];

  // 调试统计
  const stats = {
    totalProps: allPropNames.length,
    propsWithConfig: 0,
    keywordAtoms: 0,
    numberAtoms: 0,
    unitStats: {} as Record<string, { values: number; atoms: number }>,
    propStats: {} as Record<string, { keywords: number; numbers: number }>,
  };

  for (const camelName of allPropNames) {
    // 使用 shouldInclude 处理属性过滤（白名单优先）
    if (!shouldInclude(camelName, config.includeProperties, config.excludeProperties)) continue;

    const kebabName = cssPropertyNameMap[camelName];
    const propConfig = config.properties[camelName];

    if (!propConfig) continue;
    stats.propsWithConfig++;
    stats.propStats[camelName] = { keywords: 0, numbers: 0 };

    // 1. 生成关键词原子类
    if ('keywords' in propConfig && Array.isArray(propConfig.keywords)) {
      for (const keyword of propConfig.keywords) {
        // 使用 shouldInclude 处理关键字和颜色过滤
        if (!shouldInclude(keyword, config.includeKeywords, config.excludeKeywords)) continue;
        if (!shouldInclude(keyword, config.includeColors, config.excludeColors)) continue;

        const name = generateAtomName(kebabName, keyword);
        if (seenNames.has(name)) continue;
        seenNames.add(name);

        atoms.push({
          name,
          className: generateClassName(kebabName, keyword),
          property: kebabName,
          value: keyword,
        });
        stats.keywordAtoms++;
        stats.propStats[camelName].keywords++;
      }
    }

    // 2. 生成数值原子类
    if ('numberTypes' in propConfig && Array.isArray(propConfig.numberTypes)) {
      const supportedUnits = new Set<string>();
      const includeNumberTypesList = extractStringsFromArray(config.includeNumberTypes);
      const excludeNumberTypesList = extractStringsFromNumberTypeExcludeArray(config.excludeNumberTypes);
      
      for (const nt of propConfig.numberTypes as string[]) {
        // 使用 shouldInclude 处理数值类型过滤
        if (!shouldInclude(nt, includeNumberTypesList.length > 0 ? includeNumberTypesList : undefined, excludeNumberTypesList)) continue;
        
        const typeUnits = NUMBER_TYPE_UNITS[nt as keyof typeof NUMBER_TYPE_UNITS];
        if (typeUnits) {
          for (const u of typeUnits) {
            supportedUnits.add(u);
          }
        }
      }

      const includeUnitsList = extractStringsFromArray(config.includeUnits);
      const excludeUnitsList = extractStringsFromUnitExcludeArray(config.excludeUnits);
      const includeUnitCategoriesList = extractStringsFromArray(config.includeUnitCategories);
      const excludeUnitCategoriesList = extractStringsFromUnitCategoryExcludeArray(config.excludeUnitCategories);
      
      for (const unit of supportedUnits) {
        // 使用 shouldInclude 处理单位过滤
        if (!shouldInclude(unit, includeUnitsList.length > 0 ? includeUnitsList : undefined, excludeUnitsList)) continue;
        
        // 使用 shouldInclude 处理单位分类过滤
        const category = CATEGORY_BY_UNIT[unit] as UnitCategoryName | undefined;
        if (category && !shouldInclude(category, includeUnitCategoriesList.length > 0 ? includeUnitCategoriesList : undefined, excludeUnitCategoriesList)) continue;

        const values = generateValuesForUnit(unit, config);
        
        if (!stats.unitStats[unit]) {
          stats.unitStats[unit] = { values: values.length, atoms: 0 };
        }

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
          stats.numberAtoms++;
          stats.unitStats[unit].atoms++;
          stats.propStats[camelName].numbers++;
        }
      }
    }
  }

  if (debug) {
    console.log('\n📊 Generation Statistics:');
    console.log(`   Total properties: ${stats.totalProps}`);
    console.log(`   Properties with config: ${stats.propsWithConfig}`);
    console.log(`   Keyword atoms: ${stats.keywordAtoms}`);
    console.log(`   Number atoms: ${stats.numberAtoms}`);
    
    console.log('\n📏 Unit Statistics:');
    const sortedUnits = Object.entries(stats.unitStats).sort((a, b) => b[1].atoms - a[1].atoms);
    for (const [unit, data] of sortedUnits) {
      console.log(`   ${unit}: ${data.values} values × props = ${data.atoms} atoms`);
    }
    
    console.log('\n🏠 Top 20 Properties by atom count:');
    const sortedProps = Object.entries(stats.propStats)
      .map(([name, data]) => ({ name, total: data.keywords + data.numbers, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 20);
    for (const prop of sortedProps) {
      console.log(`   ${prop.name}: ${prop.total} (keywords: ${prop.keywords}, numbers: ${prop.numbers})`);
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
