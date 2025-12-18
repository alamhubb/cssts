/**
 * 配置类型提示生成脚本
 *
 * 从 src/data/property.ts 生成用户配置时的类型提示文件
 * 生成 src/config/ 下的所有类型定义文件
 *
 * 运行方式：npx tsx generator/generator-config-type.ts
 * 
 * 前置条件：必须先运行 generator-data.ts 生成 src/data/property.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const configDir = path.join(__dirname, '../src/config');
const dataDir = path.join(__dirname, '../src/data');

// 确保输出目录存在
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// ==================== 读取数据 ====================

interface PropertyInfo {
  name: string;
  keywords?: string[];
  numberTypes?: string[];
}

interface PropertyData {
  name: string;
  keywords: string[];
  numberTypes: string[];
}

// 从 src/data/property.ts 读取数据
function loadPropertyData(): PropertyData[] {
  const propertyFilePath = path.join(dataDir, 'property.ts');
  
  if (!fs.existsSync(propertyFilePath)) {
    throw new Error(`Property data file not found: ${propertyFilePath}\nPlease run 'npx tsx generator/generator-data.ts' first.`);
  }

  // 动态导入数据
  const moduleUrl = `file://${propertyFilePath}`;
  const module = require(propertyFilePath);
  
  const properties: PropertyData[] = module.PROPERTY_DATA.map((prop: PropertyInfo) => ({
    name: prop.name,
    keywords: prop.keywords || [],
    numberTypes: prop.numberTypes || [],
  }));

  return properties;
}

// ==================== 工具函数 ====================

const toPascalCase = (str: string) => str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
const toCamelCase = (str: string) => str.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('');
const toConstName = (str: string) => str.toUpperCase().replace(/-/g, '_');

// ==================== 静态数据 ====================

const NAMED_COLORS = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
  'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
  'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
  'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred',
  'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
  'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
  'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
  'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew',
  'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
  'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon',
  'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
  'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
  'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
  'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
  'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown',
  'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
  'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
  'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet',
  'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
];
const colorSet = new Set(NAMED_COLORS);

const UNIT_TO_CATEGORY: Record<string, string> = {
  '%': 'percentage', 'vw': 'percentage', 'vh': 'percentage', 'vmin': 'percentage', 'vmax': 'percentage',
  'svw': 'percentage', 'svh': 'percentage', 'lvw': 'percentage', 'lvh': 'percentage',
  'dvw': 'percentage', 'dvh': 'percentage', 'vi': 'percentage', 'vb': 'percentage',
  'px': 'pixel', 'em': 'fontRelative', 'rem': 'fontRelative',
  'ch': 'fontRelative', 'ex': 'fontRelative', 'cap': 'fontRelative', 'ic': 'fontRelative',
  'lh': 'fontRelative', 'rlh': 'fontRelative',
  'cm': 'physical', 'mm': 'physical', 'in': 'physical', 'pt': 'physical', 'pc': 'physical', 'Q': 'physical',
  'deg': 'angle', 'grad': 'angle', 'rad': 'angle', 'turn': 'angle',
  's': 'time', 'ms': 'time', 'Hz': 'frequency', 'kHz': 'frequency',
  'dpi': 'resolution', 'dpcm': 'resolution', 'dppx': 'resolution', 'x': 'resolution',
  'fr': 'flex', 'unitless': 'unitless',
};

const NUMBER_TYPE_UNITS: Record<string, string[]> = {
  length: ['Q', 'cap', 'ch', 'cm', 'dvh', 'dvw', 'em', 'ex', 'ic', 'in', 'lh', 'lvh', 'lvw', 'mm', 'pc', 'pt', 'px', 'rem', 'rlh', 'svh', 'svw', 'vb', 'vh', 'vi', 'vmax', 'vmin', 'vw'],
  angle: ['deg', 'grad', 'rad', 'turn'], time: ['ms', 's'], frequency: ['Hz', 'kHz'],
  percentage: ['%'], number: ['unitless'], integer: ['unitless'],
  resolution: ['dpcm', 'dpi', 'dppx', 'x'], flex: ['fr'],
};

const computePropertyUnits = (numberTypes: string[]) => {
  const units = new Set<string>();
  numberTypes.forEach(nt => NUMBER_TYPE_UNITS[nt]?.forEach(u => units.add(u)));
  return Array.from(units).sort();
};

const computeUnitCategories = (units: string[]) => {
  const categories = new Set<string>();
  units.forEach(u => UNIT_TO_CATEGORY[u] && categories.add(UNIT_TO_CATEGORY[u]));
  return Array.from(categories).sort();
};

// ==================== 生成函数 ====================

function generateColorsFile(): string {
  return `/**
 * CSS 颜色配置（自动生成）
 * 
 * 组合 data/ 中的命名颜色和 custom/ 中的系统颜色。
 */

import { NAMED_COLORS, type NamedColorValue } from '../data/colors';
import { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';

// Re-export
export { NAMED_COLORS, type NamedColorValue } from '../data/colors';
export { SYSTEM_COLORS, type SystemColorValue } from '../custom/system-colors';

/** 所有颜色（命名颜色 + 系统颜色） */
export const ALL_COLORS = [...NAMED_COLORS, ...SYSTEM_COLORS] as const;
export type AllColorValue = NamedColorValue | SystemColorValue;
`;
}

function generateUnitsFile(): string {
  return `/**
 * CSS 单位配置（自动生成）
 * 
 * 组合 data/ 中的单位列表和 custom/ 中的分类映射。
 */

import { unitsByCategory, type UnitCategoryName } from '../custom/unit-categories';

// Re-export from data
export { ALL_UNITS, type UnitType } from '../data/units';

// Re-export from custom
export * from '../custom/unit-categories';
export * from '../custom/number-type-mapping';

// Re-export from descriptions
export { UNIT_CATEGORY_DESCRIPTIONS } from '../descriptions/units';
export { NUMBER_TYPE_DESCRIPTIONS } from '../descriptions/number-types';

/** NumberType 到 Units 的映射 */
export const NUMBER_TYPE_UNITS = {
${Object.entries(NUMBER_TYPE_UNITS).map(([nt, units]) => `  ${nt}: [${units.map(u => `'${u}'`).join(', ')}],`).join('\n')}
} as const;

/**
 * 单位到分类的反向映射（从 unitsByCategory 自动生成）
 * 
 * 用途：根据单位（如 'px'）快速查找其所属分类（如 'pixel'），
 * 从而获取该分类的步长策略和数值范围配置。
 * 
 * @example
 * CATEGORY_BY_UNIT['px']  // => 'pixel'
 * CATEGORY_BY_UNIT['em']  // => 'fontRelative'
 * CATEGORY_BY_UNIT['deg'] // => 'angle'
 */
export const CATEGORY_BY_UNIT: Record<string, UnitCategoryName> = Object.entries(unitsByCategory)
  .reduce((acc, [category, units]) => {
    (units as readonly string[]).forEach(unit => { acc[unit] = category as UnitCategoryName; });
    return acc;
  }, {} as Record<string, UnitCategoryName>);
`;
}

function generatePseudoFile(): string {
  return `/**
 * CSS 伪类/伪元素配置（自动生成）
 * 
 * 组合 data/ 中的伪类列表和 descriptions/ 中的描述。
 */

// Re-export from data
export { PSEUDO_CLASSES, PSEUDO_ELEMENTS, type PseudoClassName, type PseudoElementName } from '../data/pseudo';

// Re-export from descriptions
export {
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  PSEUDO_CLASS_CATEGORIES,
  PSEUDO_CLASS_CATEGORY_DESCRIPTIONS,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  type PseudoClassCategory,
} from '../descriptions/pseudo';
`;
}

function generateKeywordsFile(
  keywordProperties: PropertyData[],
  propKeywordsMap: Map<string, string[]>,
  sortedPropertyNames: string[],
  colorSupportingProps: string[]
): string {
  const lines: string[] = [
    '/**',
    ' * CSS 关键词配置（自动生成）',
    ' */',
    '',
    "import type { AllColorValue } from './colors';",
    ''
  ];

  // 关键词数组
  for (const prop of keywordProperties) {
    const constName = `${toConstName(prop.name)}_KEYWORDS`;
    const keywords = propKeywordsMap.get(prop.name) || [];
    lines.push(`export const ${constName} = [`);
    keywords.forEach(k => lines.push(`  '${k}',`));
    lines.push(`] as const;`, '');
  }

  // 类型定义
  lines.push('// ==================== 关键词类型 ====================', '');
  for (const prop of keywordProperties) {
    const hasColors = colorSupportingProps.includes(prop.name);
    const typeStr = hasColors 
      ? `typeof ${toConstName(prop.name)}_KEYWORDS[number] | AllColorValue`
      : `typeof ${toConstName(prop.name)}_KEYWORDS[number]`;
    lines.push(`export type ${toPascalCase(prop.name)}Keyword = ${typeStr};`);
  }
  lines.push('');

  // 联合类型
  lines.push(`export type KeywordValue = ${keywordProperties.map(p => `${toPascalCase(p.name)}Keyword`).join(' | ')};`, '');

  // CssPropertyValueMap
  lines.push('// ==================== CSS 属性值映射 ====================', '');
  lines.push('export interface CssPropertyValueMap {');
  for (const propName of sortedPropertyNames) {
    const camelName = toCamelCase(propName);
    const keywords = propKeywordsMap.get(propName) || [];
    if (keywords.length > 0) {
      lines.push(`  ${camelName}?: ${toPascalCase(propName)}Keyword | string;`);
    } else {
      lines.push(`  ${camelName}?: string;`);
    }
  }
  lines.push('}', '');

  return lines.join('\n');
}

function generatePropertyConfigFile(
  keywordProperties: PropertyData[],
  numericProperties: PropertyData[],
  propKeywordsMap: Map<string, string[]>,
  propNumberTypesMap: Map<string, string[]>,
  colorSupportingProps: string[],
  sortedPropertyNames: string[]
): string {
  const lines: string[] = ['/**', ' * CSS 属性配置（自动生成）', ' */', ''];

  // 导入
  lines.push(`import { type AllColorValue } from './colors';`);
  lines.push(`import type { NumberTypeName } from './units';`);
  lines.push(`import {`);
  keywordProperties.forEach(p => lines.push(`  ${toConstName(p.name)}_KEYWORDS,`));
  lines.push(`} from './keywords';`);
  lines.push(`import type {`);
  keywordProperties.forEach(p => lines.push(`  ${toPascalCase(p.name)}Keyword,`));
  lines.push(`} from './keywords';`, '');

  // 数值类型常量
  lines.push('// ==================== 数值类型常量 ====================', '');
  for (const prop of numericProperties) {
    lines.push(`export const ${toConstName(prop.name)}_NUMBER_TYPES = [${prop.numberTypes.map(t => `'${t}'`).join(', ')}] as const;`);
  }
  lines.push('');

  // 属性单位类型
  lines.push('// ==================== 属性单位类型 ====================', '');
  for (const prop of numericProperties) {
    const units = computePropertyUnits(prop.numberTypes);
    const cats = computeUnitCategories(units);
    lines.push(`export type ${toPascalCase(prop.name)}Unit = ${units.map(u => `'${u}'`).join(' | ')};`);
    lines.push(`export type ${toPascalCase(prop.name)}UnitCategory = ${cats.map(c => `'${c}'`).join(' | ')};`);
  }
  lines.push('');

  // 属性配置类
  lines.push('// ==================== 属性配置类 ====================', '');
  for (const propName of sortedPropertyNames) {
    const pascalName = toPascalCase(propName);
    const keywords = propKeywordsMap.get(propName) || [];
    const numberTypes = propNumberTypesMap.get(propName) || [];

    lines.push(`export class ${pascalName}Config {`);
    // 存储默认值的常量
    if (keywords.length > 0) {
      lines.push(`  static readonly DEFAULT_KEYWORDS = [...${toConstName(propName)}_KEYWORDS];`);
    }
    if (numberTypes.length > 0) {
      lines.push(`  static readonly DEFAULT_NUMBER_TYPES = [...${toConstName(propName)}_NUMBER_TYPES];`);
    }
    lines.push(`  keywords: string[] | null = null;`);
    lines.push(`  numberTypes: NumberTypeName[] | null = null;`);
    lines.push(`}`, '');
  }

  // 属性名映射
  lines.push('// ==================== 属性名映射 ====================', '');
  lines.push(`export const cssPropertyNameMap = {`);
  sortedPropertyNames.forEach(p => lines.push(`  ${toCamelCase(p)}: '${p}',`));
  lines.push(`} as const;`, '');
  lines.push(`export type CssPropertyCamelName = keyof typeof cssPropertyNameMap;`);
  lines.push(`export type CssPropertyKebabName = typeof cssPropertyNameMap[CssPropertyCamelName];`, '');

  // CssPropertyConfigMap
  lines.push('// ==================== 属性配置映射 ====================', '');
  lines.push(`export class CssPropertyConfigMap {`);
  sortedPropertyNames.forEach(p => lines.push(`  ${toCamelCase(p)} = new ${toPascalCase(p)}Config();`));
  lines.push(`}`, '');

  return lines.join('\n');
}

function generateConfigIndex(): string {
  return `/**
 * Config 模块导出（自动生成）
 */

export * from './colors';
export * from './units';
export * from './keywords';
export * from './pseudo';
export * from './property-config';
`;
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating config type hints from property data...\n');

  // 读取属性数据
  const allProperties = loadPropertyData();

  const propKeywordsMap = new Map<string, string[]>();
  const propNumberTypesMap = new Map<string, string[]>();
  const colorSupportingProps: string[] = [];

  for (const prop of allProperties) {
    propKeywordsMap.set(prop.name, prop.keywords);
    propNumberTypesMap.set(prop.name, prop.numberTypes);
    if (prop.keywords.some(k => colorSet.has(k))) colorSupportingProps.push(prop.name);
  }

  const sortedPropertyNames = allProperties.map(p => p.name);
  const keywordProperties = allProperties.filter(p => p.keywords.length > 0);
  const numericProperties = allProperties.filter(p => p.numberTypes.length > 0);

  // 生成配置文件
  console.log('📝 Generating config type files...');
  
  fs.writeFileSync(path.join(configDir, 'colors.ts'), generateColorsFile());
  console.log('✅ src/config/colors.ts');

  fs.writeFileSync(path.join(configDir, 'units.ts'), generateUnitsFile());
  console.log('✅ src/config/units.ts');

  fs.writeFileSync(path.join(configDir, 'keywords.ts'), generateKeywordsFile(keywordProperties, propKeywordsMap, sortedPropertyNames, colorSupportingProps));
  console.log('✅ src/config/keywords.ts');

  fs.writeFileSync(path.join(configDir, 'pseudo.ts'), generatePseudoFile());
  console.log('✅ src/config/pseudo.ts');

  fs.writeFileSync(path.join(configDir, 'property-config.ts'), generatePropertyConfigFile(
    keywordProperties, numericProperties, propKeywordsMap, propNumberTypesMap, colorSupportingProps, sortedPropertyNames
  ));
  console.log('✅ src/config/property-config.ts');

  fs.writeFileSync(path.join(configDir, 'index.ts'), generateConfigIndex());
  console.log('✅ src/config/index.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${sortedPropertyNames.length}`);
  console.log(`   Properties with keywords: ${keywordProperties.length}`);
  console.log(`   Properties with numberTypes: ${numericProperties.length}`);
  console.log('\n✨ Config type generation completed!');
}

main();
