/**
 * DTS 生成器
 * 
 * 根据配置生成 CSS 原子类的 TypeScript 类型定义
 * 
 * @see dts-generator.md 详细文档
 */

import { csstsDefaultConfig } from '../config/CsstsDefaultConfig';
import { PROPERTY_CATEGORIES_MAP } from '../data/cssPropertyNumber';
import { CATEGORY_UNITS_MAP, ALL_NUMBER_CATEGORIES } from '../data/cssNumberData';
import { PROPERTY_KEYWORDS_MAP } from '../data/cssPropertyKeywords';
import { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import { PROPERTY_PARENT_MAP } from '../data/cssPropertyInheritance';
import { PROPERTY_COLOR_TYPES_MAP } from '../data/cssPropertyColorTypes';
import { COLOR_TYPE_COLORS_MAP, ALL_COLOR_TYPES } from '../data/cssColorData';
import type { CsstsConfig } from '../types/csstsConfig';
import type { CssStepConfig, CssProgressiveRange, CssNumberCategoryName, CssPropertyName, CssColorTypeName } from '../types/cssPropertyConfig';

// 所有 CSS 属性名列表
const ALL_PROPERTY_NAMES = Object.values(CSS_PROPERTY_NAME_MAP) as CssPropertyName[];

// 构建 unit → category 的反向映射
const UNIT_TO_CATEGORY_MAP: Record<string, string> = {};
for (const [category, units] of Object.entries(CATEGORY_UNITS_MAP)) {
  for (const unit of units) {
    UNIT_TO_CATEGORY_MAP[unit] = category;
  }
}

// ==================== 类型定义 ====================

/** 生成的原子类定义 */
export interface AtomDefinition {
  /** 原子类名称 (camelCase) */
  name: string;
  /** CSS 属性名 (kebab-case) */
  property: string;
  /** CSS 值 */
  value: string;
  /** 单位 (可选) */
  unit?: string;
  /** 数值 (可选) */
  number?: number;
}

/** 生成器选项 */
export interface GeneratorOptions {
  /** 用户配置 (可选，默认使用 csstsDefaultConfig) */
  config?: Partial<CsstsConfig>;
}

// ==================== 工具函数 ====================

/** camelCase 转 kebab-case */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** 合并配置 */
function mergeConfig(userConfig?: Partial<CsstsConfig>): CsstsConfig {
  if (!userConfig) return csstsDefaultConfig;
  
  return {
    ...csstsDefaultConfig,
    ...userConfig,
    // 数组类型的配置需要特殊处理
    properties: userConfig.properties ?? csstsDefaultConfig.properties,
    excludeProperties: userConfig.excludeProperties ?? csstsDefaultConfig.excludeProperties,
    numberCategories: userConfig.numberCategories ?? csstsDefaultConfig.numberCategories,
    excludeNumberCategories: userConfig.excludeNumberCategories ?? csstsDefaultConfig.excludeNumberCategories,
    numberCategoriesConfig: userConfig.numberCategoriesConfig ?? csstsDefaultConfig.numberCategoriesConfig,
    propertiesConfig: userConfig.propertiesConfig ?? csstsDefaultConfig.propertiesConfig,
    progressiveRanges: userConfig.progressiveRanges ?? csstsDefaultConfig.progressiveRanges,
  };
}

/** 获取有效的属性列表 */
function getEffectiveProperties(config: CsstsConfig): CssPropertyName[] {
  const properties = config.properties;
  const excludeProperties = config.excludeProperties ?? [];
  
  // 1. 有 properties → 直接使用 properties
  if (properties && properties.length > 0) {
    return properties;
  }
  
  // 2. 没有 properties，有 excludeProperties → 所有属性 - excludeProperties
  if (excludeProperties.length > 0) {
    return ALL_PROPERTY_NAMES.filter(p => !excludeProperties.includes(p));
  }
  
  // 3. 都没有 → 使用所有属性
  return ALL_PROPERTY_NAMES;
}

/** 获取有效的数值类别列表 */
function getEffectiveCategories(config: CsstsConfig): CssNumberCategoryName[] {
  const categories = config.numberCategories ?? [...ALL_NUMBER_CATEGORIES];
  const excludeCategories = config.excludeNumberCategories ?? [];
  
  return categories.filter(c => !excludeCategories.includes(c)) as CssNumberCategoryName[];
}

/** 获取有效的颜色列表 */
function getEffectiveColors(config: CsstsConfig, propertyColorTypes: readonly string[]): string[] {
  // 1. 如果配置了 colors，直接使用
  if (config.colors && config.colors.length > 0) {
    const excludeColors = config.excludeColors ?? [];
    return config.colors.filter(c => !excludeColors.includes(c));
  }
  
  const colors = new Set<string>();
  const excludeColorTypes = config.excludeColorTypes ?? [];
  
  // 2. 如果没有配置 colorTypes，使用所有颜色类型
  if (!config.colorTypes || config.colorTypes.length === 0) {
    for (const colorType of ALL_COLOR_TYPES) {
      if (excludeColorTypes.includes(colorType)) continue;
      if (!propertyColorTypes.includes(colorType)) continue;
      
      const typeColors = COLOR_TYPE_COLORS_MAP[colorType as keyof typeof COLOR_TYPE_COLORS_MAP];
      if (typeColors) {
        for (const color of typeColors) {
          colors.add(color);
        }
      }
    }
  } else {
    // 3. 根据 colorTypes 配置获取颜色（支持混合格式）
    for (const item of config.colorTypes) {
      if (typeof item === 'string') {
        // 字符串格式：使用该类型的所有颜色
        const colorType = item as CssColorTypeName;
        if (excludeColorTypes.includes(colorType)) continue;
        if (!propertyColorTypes.includes(colorType)) continue;
        
        const typeColors = COLOR_TYPE_COLORS_MAP[colorType as keyof typeof COLOR_TYPE_COLORS_MAP];
        if (typeColors) {
          for (const color of typeColors) {
            colors.add(color);
          }
        }
      } else {
        // 对象格式：{ namedColor: ['red', 'green'] }
        for (const [colorType, colorList] of Object.entries(item)) {
          if (excludeColorTypes.includes(colorType as CssColorTypeName)) continue;
          if (!propertyColorTypes.includes(colorType)) continue;
          
          if (Array.isArray(colorList)) {
            for (const color of colorList) {
              colors.add(color);
            }
          }
        }
      }
    }
  }
  
  // 排除指定颜色
  const excludeColors = config.excludeColors ?? [];
  return Array.from(colors).filter(c => !excludeColors.includes(c as any));
}

/** 从配置数组中查找特定项的配置 */
function findConfigInArray<T extends Record<string, any>>(
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

/** 从属性配置中查找 category 或 unit 级别的配置 */
function findCategoryOrUnitConfig(
  propertyConfig: any,
  categoryName: string
): CssStepConfig | undefined {
  if (!propertyConfig) return undefined;
  
  // 1. 先查找该 category 下的 unit 名称（unit 优先级更高）
  const categoryUnits = CATEGORY_UNITS_MAP[categoryName as keyof typeof CATEGORY_UNITS_MAP];
  if (categoryUnits) {
    for (const unit of categoryUnits) {
      if (unit in propertyConfig) {
        return propertyConfig[unit];
      }
    }
  }
  
  // 2. 再查找 category 名称
  if (categoryName in propertyConfig) {
    return propertyConfig[categoryName];
  }
  
  return undefined;
}

/** 获取属性的 category 配置 */
function getPropertyCategoryConfig(
  config: CsstsConfig,
  propertyName: string,
  categoryName: string
): CssStepConfig | undefined {
  // 1. 先查找属性级别的配置（支持 category 或 unit 名称）
  const propertyConfig = findConfigInArray(config.propertiesConfig, propertyName);
  const propResult = findCategoryOrUnitConfig(propertyConfig, categoryName);
  if (propResult) return propResult;
  
  // 2. 查找父属性的配置（属性继承）
  const parentProperty = PROPERTY_PARENT_MAP[propertyName];
  if (parentProperty) {
    const parentConfig = findConfigInArray(config.propertiesConfig, parentProperty);
    const parentResult = findCategoryOrUnitConfig(parentConfig, categoryName);
    if (parentResult) return parentResult;
  }
  
  // 3. 再查找全局 category 配置
  return findConfigInArray(config.numberCategoriesConfig, categoryName);
}

/** 根据步长配置生成数值列表 */
function generateNumbers(stepConfig: CssStepConfig, progressiveRanges?: CssProgressiveRange[]): number[] {
  const { min = 0, max = 100, step, presets = [] } = stepConfig;
  const numbers = new Set<number>();
  
  // 添加预设值
  presets.forEach(p => {
    if (p >= min && p <= max) {
      numbers.add(p);
    }
  });
  
  // 根据 step 类型生成数值
  if (step === undefined) {
    // 使用全局 progressiveRanges
    if (progressiveRanges) {
      generateFromProgressiveRanges(numbers, min, max, progressiveRanges);
    } else {
      // 默认步长 1
      generateFromStep(numbers, min, max, 1);
    }
  } else if (typeof step === 'number') {
    // 单一步长
    generateFromStep(numbers, min, max, step);
  } else if (Array.isArray(step)) {
    if (step.length > 0 && typeof step[0] === 'number') {
      // 多个步长值
      generateFromMultipleSteps(numbers, min, max, step as number[]);
    } else {
      // 渐进步长范围
      generateFromProgressiveRanges(numbers, min, max, step as CssProgressiveRange[]);
    }
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
}

/** 从单一步长生成数值 */
function generateFromStep(numbers: Set<number>, min: number, max: number, step: number): void {
  // 从 0 开始向两边扩展
  if (min <= 0 && max >= 0) {
    numbers.add(0);
  }
  
  // 正数部分
  for (let i = step; i <= max; i += step) {
    if (i >= min) {
      numbers.add(roundNumber(i, step));
    }
  }
  
  // 负数部分
  for (let i = -step; i >= min; i -= step) {
    if (i <= max) {
      numbers.add(roundNumber(i, step));
    }
  }
}

/** 从多个步长值生成数值 */
function generateFromMultipleSteps(numbers: Set<number>, min: number, max: number, steps: number[]): void {
  // 0 的处理
  if (min <= 0 && max >= 0) {
    numbers.add(0);
  }
  
  // 生成能被任意步长整除的数
  const minStep = Math.min(...steps);
  
  for (let i = minStep; i <= max; i += minStep) {
    if (i >= min && steps.some(s => i % s === 0 || Math.abs(i % s) < 0.0001)) {
      numbers.add(roundNumber(i, minStep));
    }
  }
  
  for (let i = -minStep; i >= min; i -= minStep) {
    if (i <= max && steps.some(s => Math.abs(i) % s === 0 || Math.abs(Math.abs(i) % s) < 0.0001)) {
      numbers.add(roundNumber(i, minStep));
    }
  }
}

/** 从渐进步长范围生成数值 */
function generateFromProgressiveRanges(
  numbers: Set<number>,
  min: number,
  max: number,
  ranges: CssProgressiveRange[]
): void {
  // 0 的处理
  if (min <= 0 && max >= 0) {
    numbers.add(0);
  }
  
  // 正数部分
  let current = 1;
  for (const range of ranges) {
    const rangeMax = Math.min(range.max, max);
    while (current <= rangeMax && current >= min) {
      if (range.divisors.some(d => current % d === 0)) {
        numbers.add(current);
      }
      current++;
    }
    if (current > max) break;
  }
  
  // 负数部分
  current = -1;
  for (const range of ranges) {
    const rangeMin = Math.max(-range.max, min);
    while (current >= rangeMin && current <= max) {
      if (range.divisors.some(d => Math.abs(current) % d === 0)) {
        numbers.add(current);
      }
      current--;
    }
    if (current < min) break;
  }
}

/** 四舍五入到指定精度 */
function roundNumber(num: number, step: number): number {
  const precision = getPrecision(step);
  return Number(num.toFixed(precision));
}

/** 获取数字的小数位数 */
function getPrecision(num: number): number {
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
}

/** 格式化数值为类名部分 */
function formatNumberForClassName(num: number): string {
  // 负数用 N 前缀
  if (num < 0) {
    return `N${formatPositiveNumber(Math.abs(num))}`;
  }
  return formatPositiveNumber(num);
}

/** 格式化正数为类名部分 */
function formatPositiveNumber(num: number): string {
  // 小数点用 p 替换
  return num.toString().replace('.', 'p');
}

/** 格式化单位为类名部分 */
function formatUnitForClassName(unit: string): string {
  if (unit === 'unitless' || unit === '') return '';
  // 百分比用 pct
  if (unit === 'percent') return 'pct';
  return unit;
}

/** 格式化 keyword 为类名部分 (kebab-case → PascalCase) */
function formatKeywordForClassName(keyword: string): string {
  // 处理以 - 开头的情况（如 -moz-box, -webkit-flex）
  // 去掉开头的 -，然后转换为 PascalCase
  const normalized = keyword.startsWith('-') ? keyword.slice(1) : keyword;
  
  // kebab-case 转 PascalCase
  return normalized
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** 格式化颜色名为类名部分 */
function formatColorForClassName(color: string): string {
  // kebab-case 转 PascalCase
  return color
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// ==================== 主生成函数 ====================

/** 为单个属性生成原子类定义 */
function generateAtomsForProperty(
  propertyName: CssPropertyName,
  config: CsstsConfig,
  effectiveCategories: CssNumberCategoryName[]
): AtomDefinition[] {
  const atoms: AtomDefinition[] = [];
  const seenNames = new Set<string>();  // 用于去重（特别是 0 值）
  const kebabProperty = camelToKebab(propertyName);
  const excludeKeywords = config.excludeKeywords ?? [];
  
  // 1. 生成 keyword 原子类（无论如何都生成，如果有的话）
  const keywords = PROPERTY_KEYWORDS_MAP[propertyName as keyof typeof PROPERTY_KEYWORDS_MAP];
  if (keywords) {
    for (const keyword of keywords) {
      // 检查是否被排除（keyword 是 kebab-case，excludeKeywords 是 camelCase）
      const camelKeyword = formatKeywordForClassName(keyword).charAt(0).toLowerCase() + formatKeywordForClassName(keyword).slice(1);
      if (excludeKeywords.includes(camelKeyword as any)) continue;
      
      const atomName = `${propertyName}${formatKeywordForClassName(keyword)}`;
      
      if (seenNames.has(atomName)) continue;
      seenNames.add(atomName);
      
      atoms.push({
        name: atomName,
        property: kebabProperty,
        value: keyword,
      });
    }
  }
  
  // 2. colors 和 numberTypes 互斥：有 colors 用 colors，没有才用 numberTypes
  const propertyColorTypes = PROPERTY_COLOR_TYPES_MAP[propertyName as keyof typeof PROPERTY_COLOR_TYPES_MAP];
  const hasColors = propertyColorTypes && propertyColorTypes.length > 0;
  
  if (hasColors) {
    // 获取有效的颜色列表
    const effectiveColors = getEffectiveColors(config, propertyColorTypes);
    
    // 生成颜色原子类
    for (const colorName of effectiveColors) {
      const atomName = `${propertyName}${formatColorForClassName(colorName)}`;
      
      if (seenNames.has(atomName)) continue;
      seenNames.add(atomName);
      
      atoms.push({
        name: atomName,
        property: kebabProperty,
        value: colorName,
      });
    }
  } else {
    // 生成数值原子类
    const propertyCategories = PROPERTY_CATEGORIES_MAP[propertyName as keyof typeof PROPERTY_CATEGORIES_MAP];
    if (propertyCategories) {
      // 过滤出有效的 categories
      const validCategories = propertyCategories.filter(c => 
        effectiveCategories.includes(c as CssNumberCategoryName)
      );
      
      // 为每个 category 生成原子类
      for (const category of validCategories) {
        const categoryConfig = getPropertyCategoryConfig(config, propertyName, category);
        const stepConfig: CssStepConfig = categoryConfig ?? { min: 0, max: 100 };
        
        // 获取该 category 的单位
        let units = CATEGORY_UNITS_MAP[category as keyof typeof CATEGORY_UNITS_MAP];
        if (!units) continue;
        
        // 如果配置了 units，则过滤单位
        if (stepConfig.units && stepConfig.units.length > 0) {
          const filteredUnits = units.filter(u => stepConfig.units!.includes(u as any));
          if (filteredUnits.length === 0) continue;
          units = filteredUnits as unknown as typeof units;
        }
        
        // 生成数值列表
        const numbers = generateNumbers(stepConfig, config.progressiveRanges);
        
        // 为每个单位和数值组合生成原子类
        for (const unit of units) {
          for (const num of numbers) {
            const numStr = formatNumberForClassName(num);
            
            // 0 值不需要单位，生成 top0 而不是 top0px
            let atomName: string;
            let cssValue: string;
            
            if (num === 0) {
              atomName = `${propertyName}0`;
              cssValue = '0';
            } else {
              const unitSuffix = formatUnitForClassName(unit);
              atomName = `${propertyName}${numStr}${unitSuffix}`;
              
              if (unit === 'unitless') {
                cssValue = num.toString();
              } else if (unit === 'percent') {
                cssValue = `${num}%`;
              } else {
                cssValue = `${num}${unit}`;
              }
            }
            
            // 跳过已生成的（去重，特别是 0 值）
            if (seenNames.has(atomName)) continue;
            seenNames.add(atomName);
            
            atoms.push({
              name: atomName,
              property: kebabProperty,
              value: cssValue,
              unit: num === 0 ? undefined : (unit === 'unitless' ? undefined : unit),
              number: num,
            });
          }
        }
      }
    }
  }
  
  return atoms;
}

/** 生成所有原子类定义 */
export function generateAtoms(options?: GeneratorOptions): AtomDefinition[] {
  const config = mergeConfig(options?.config);
  const effectiveProperties = getEffectiveProperties(config);
  const effectiveCategories = getEffectiveCategories(config);
  
  const allAtoms: AtomDefinition[] = [];
  
  for (const property of effectiveProperties) {
    const atoms = generateAtomsForProperty(property, config, effectiveCategories);
    allAtoms.push(...atoms);
  }
  
  return allAtoms;
}

/** 生成 CSS 类名（property_value 格式） */
function generateCssClassName(atom: AtomDefinition): string {
  // property 已经是 kebab-case，value 需要处理特殊字符
  // 例如：height + 1em → height_1em
  return `${atom.property}_${atom.value}`;
}

/** 生成 DTS 内容 */
export function generateDts(options?: GeneratorOptions): string {
  const atoms = generateAtoms(options);
  return generatePropertyDts('cssts', atoms);
}

/** 生成统计信息 */
export function generateStats(options?: GeneratorOptions): {
  totalAtoms: number;
  byProperty: Record<string, number>;
  byCategory: Record<string, number>;
} {
  const atoms = generateAtoms(options);
  
  const byProperty: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  
  for (const atom of atoms) {
    // 按属性统计
    byProperty[atom.property] = (byProperty[atom.property] || 0) + 1;
    
    // 按单位/类别统计
    const category = atom.unit || 'keyword';
    byCategory[category] = (byCategory[category] || 0) + 1;
  }
  
  return {
    totalAtoms: atoms.length,
    byProperty,
    byCategory,
  };
}

/** 按属性分组的原子类 */
export interface AtomsByProperty {
  [propertyName: string]: AtomDefinition[];
}

/** 生成按属性分组的原子类 */
export function generateAtomsByProperty(options?: GeneratorOptions): AtomsByProperty {
  const config = mergeConfig(options?.config);
  const effectiveProperties = getEffectiveProperties(config);
  const effectiveCategories = getEffectiveCategories(config);
  
  const result: AtomsByProperty = {};
  
  for (const property of effectiveProperties) {
    const atoms = generateAtomsForProperty(property, config, effectiveCategories);
    if (atoms.length > 0) {
      result[property] = atoms;
    }
  }
  
  return result;
}

/** 生成单个属性的 DTS 内容（在不同属性/单位之间添加空行） */
export function generatePropertyDts(propertyName: string, atoms: AtomDefinition[]): string {
  const lines: string[] = [
    '/**',
    ` * ${propertyName} 原子类类型定义（自动生成）`,
    ' */',
    '',
    `export interface ${propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}Atoms {`,
  ];
  
  let lastProperty: string | undefined;
  let lastUnit: string | undefined;
  
  for (const atom of atoms) {
    const cssClassName = generateCssClassName(atom);
    
    // 检查是否需要添加空行
    // 1. 不同属性之间添加空行（用于 colors.d.ts, keywords.d.ts）
    // 2. 同一属性不同单位之间添加空行（用于数值属性文件）
    if (lastProperty !== undefined) {
      if (atom.property !== lastProperty) {
        // 不同属性，添加空行
        lines.push('');
      } else if (atom.unit !== lastUnit && atom.unit !== undefined && lastUnit !== undefined) {
        // 同一属性，不同单位，添加空行
        lines.push('');
      }
    }
    
    lines.push(`  ${atom.name}: '${cssClassName}';`);
    lastProperty = atom.property;
    lastUnit = atom.unit;
  }
  
  lines.push('}', '');
  
  return lines.join('\n');
}

/** 生成聚合索引文件内容 */
export function generateIndexDts(propertyNames: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类类型定义索引（自动生成）',
    ' */',
    '',
  ];
  
  // 导入所有属性类型
  for (const prop of propertyNames) {
    const typeName = prop.charAt(0).toUpperCase() + prop.slice(1) + 'Atoms';
    lines.push(`export { ${typeName} } from './${prop}';`);
  }
  
  lines.push('');
  
  // 生成聚合类型
  lines.push('/** 所有原子类类型 */');
  lines.push('export interface CsstsAtoms extends');
  
  const typeNames = propertyNames.map(p => p.charAt(0).toUpperCase() + p.slice(1) + 'Atoms');
  for (let i = 0; i < typeNames.length; i++) {
    const isLast = i === typeNames.length - 1;
    lines.push(`  ${typeNames[i]}${isLast ? ' {}' : ','}`);
  }
  
  lines.push('');
  
  return lines.join('\n');
}
