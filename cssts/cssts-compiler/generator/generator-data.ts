/**
 * CSS 数据生成脚本
 *
 * 数据来源：
 * - csstree：属性名、颜色、keywords、numberTypes
 * - datajson/numberMapping.json：单位和分类映射
 * - datajson/pseudo-standards.json：伪类和伪元素
 *
 * 生成文件（src/data/）：
 * - cssPropertyNameMapping.ts: CSS 属性名映射
 * - cssColorData.ts: 颜色数据
 * - cssPropertyKeywords.ts: 每个属性的 keywords
 * - cssPropertyNumber.ts: 每个属性的 numberTypes
 * - cssNumberData.ts: 单位常量、别名、numberType 和 category 映射
 * - cssPseudoData.ts: 伪类和伪元素数据
 * - cssKeywordsData.ts: keywords 常量、数组和 allKeywords
 *
 * 运行方式：npx tsx generator/generator-data.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');

// 确保输出目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// ==================== 工具函数 ====================

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function keywordToConstName(keyword: string): string {
  return keyword
    .replace(/-/g, '_')
    .replace(/[^A-Z0-9_]/gi, '')
    .toUpperCase();
}

function buildConstNameMap(keywords: Set<string>): Map<string, string> {
  const sortedKeywords = Array.from(keywords).sort();
  const constNameCount = new Map<string, number>();
  const keywordToConst = new Map<string, string>();

  for (const keyword of sortedKeywords) {
    let constName = keywordToConstName(keyword);
    const count = constNameCount.get(constName) || 0;
    if (count > 0) {
      constName = `${constName}_${count}`;
    }
    constNameCount.set(keywordToConstName(keyword), count + 1);
    keywordToConst.set(keyword, constName);
  }

  return keywordToConst;
}

const UNIT_ALIAS: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

function normalizeUnit(unit: string): string {
  return UNIT_ALIAS[unit] ?? unit;
}


// ==================== 从 csstree 提取数据 ====================

const ACCEPTED_NUMBER_TYPES = new Set([
  'angle', 'decibel', 'flex', 'frequency', 'length', 'resolution', 'semitones', 'time',
  'number', 'integer', 'percentage', 'ratio',
]);

const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
};

function extractFromSyntaxNode(
  node: any,
  keywords: Set<string>,
  numberTypes: Set<string>,
  lexer: any,
  visited: Set<string> = new Set(),
  visitedProperties: Set<string> = new Set()
): void {
  if (!node) return;

  switch (node.type) {
    case 'Keyword':
      keywords.add(node.name);
      break;

    case 'Type':
      const typeName = node.name;
      if (ACCEPTED_NUMBER_TYPES.has(typeName)) {
        numberTypes.add(typeName);
      } else if (UNION_TYPE_MAP[typeName]) {
        UNION_TYPE_MAP[typeName].forEach(t => {
          if (ACCEPTED_NUMBER_TYPES.has(t)) {
            numberTypes.add(t);
          }
        });
      } else if (!visited.has(typeName)) {
        visited.add(typeName);
        const typeDef = lexer.types[typeName];
        if (typeDef?.syntax) {
          extractFromSyntaxNode(typeDef.syntax, keywords, numberTypes, lexer, visited, visitedProperties);
        }
      }
      break;

    case 'Property':
      const propName = node.name;
      if (!visitedProperties.has(propName)) {
        visitedProperties.add(propName);
        const propDef = lexer.properties[propName];
        if (propDef?.syntax) {
          extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer, visited, visitedProperties);
        }
      }
      break;

    case 'Group':
    case 'Multiplier':
      if (node.term) {
        extractFromSyntaxNode(node.term, keywords, numberTypes, lexer, visited, visitedProperties);
      }
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited, visitedProperties));
      }
      break;

    case 'Combination':
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited, visitedProperties));
      }
      break;
  }
}

// ==================== 属性名映射 ====================

function generatePropertyNameMap(): Record<string, string> {
  const lexer = (csstree as any).lexer;
  const propertyMap: Record<string, string> = {};
  const properties = lexer.properties as Record<string, any>;
  
  for (const propName of Object.keys(properties)) {
    if (propName.startsWith('-')) continue;
    propertyMap[kebabToCamel(propName)] = propName;
  }

  return propertyMap;
}

function generatePropertyNameFile(propertyMap: Record<string, string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性名映射（自动生成）',
    ' */',
    '',
    'export const CSS_PROPERTY_NAME_MAP = {',
  ];

  const sortedKeys = Object.keys(propertyMap).sort();
  for (const camelName of sortedKeys) {
    lines.push(`  ${camelName}: '${propertyMap[camelName]}',`);
  }

  lines.push('} as const;', '');
  lines.push('export const CSS_PROPERTY_NAME_REVERSE_MAP: Record<string, keyof typeof CSS_PROPERTY_NAME_MAP> = {');
  
  for (const camelName of sortedKeys) {
    lines.push(`  '${propertyMap[camelName]}': '${camelName}',`);
  }
  
  lines.push('} as const;', '');
  return lines.join('\n');
}


// ==================== 颜色数据 ====================

interface ColorData {
  standardColors: string[];
  systemColors: string[];
  browserPrefixColors: string[];
  colorSpaces: string[];
  specialKeywords: string[];
}

function extractAllColors(): ColorData {
  const lexer = (csstree as any).lexer;
  
  const standardColors = new Set<string>();
  const systemColors = new Set<string>();
  const browserPrefixColors = new Set<string>();
  const colorSpaces = new Set<string>();
  const specialKeywords = new Set<string>();

  const namedColorType = lexer.types['named-color'];
  if (namedColorType?.syntax) {
    const keywords = new Set<string>();
    const numberTypes = new Set<string>();
    extractFromSyntaxNode(namedColorType.syntax, keywords, numberTypes, lexer);
    keywords.forEach(k => standardColors.add(k));
  }

  const colorType = lexer.types['color'];
  if (colorType?.syntax) {
    const keywords = new Set<string>();
    const numberTypes = new Set<string>();
    extractFromSyntaxNode(colorType.syntax, keywords, numberTypes, lexer);
    
    keywords.forEach(k => {
      if (standardColors.has(k)) return;
      if (k.startsWith('-moz-') || k.startsWith('-webkit-')) {
        browserPrefixColors.add(k);
      } else if (/^[A-Z]/.test(k)) {
        systemColors.add(k);
      } else if (['hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec2020', 'xyz', 'xyz-d50', 'xyz-d65'].includes(k)) {
        colorSpaces.add(k);
      } else if (['currentColor', 'none', 'transparent', 'hue', 'in', 'increasing', 'decreasing', 'longer', 'shorter'].includes(k)) {
        specialKeywords.add(k);
      }
    });
  }

  return {
    standardColors: Array.from(standardColors).sort(),
    systemColors: Array.from(systemColors).sort(),
    browserPrefixColors: Array.from(browserPrefixColors).sort(),
    colorSpaces: Array.from(colorSpaces).sort(),
    specialKeywords: Array.from(specialKeywords).sort(),
  };
}

function generateColorFile(colorData: ColorData): string {
  const lines: string[] = [
    '/**',
    ' * CSS 颜色数据（自动生成）',
    ' */',
    '',
    'export const STANDARD_COLORS = [',
  ];

  colorData.standardColors.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  lines.push('export const SYSTEM_COLORS = [');
  colorData.systemColors.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  lines.push('export const BROWSER_PREFIX_COLORS = [');
  colorData.browserPrefixColors.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  lines.push('export const COLOR_SPACES = [');
  colorData.colorSpaces.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  lines.push('export const SPECIAL_COLOR_KEYWORDS = [');
  colorData.specialKeywords.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  lines.push('export const ALL_COLORS = [');
  lines.push('  ...STANDARD_COLORS,');
  lines.push('  ...SYSTEM_COLORS,');
  lines.push('  ...BROWSER_PREFIX_COLORS,');
  lines.push('  ...COLOR_SPACES,');
  lines.push('  ...SPECIAL_COLOR_KEYWORDS,');
  lines.push('] as const;', '');

  return lines.join('\n');
}


// ==================== 属性 Keywords 和 NumberTypes ====================

interface PropertyData {
  keywords: string[];
  numberTypes: string[];
}

function extractPropertyData(): Record<string, PropertyData> {
  const lexer = (csstree as any).lexer;
  const propertyData: Record<string, PropertyData> = {};
  const colorData = extractAllColors();
  const allColors = new Set([
    ...colorData.standardColors,
    ...colorData.systemColors,
    ...colorData.browserPrefixColors,
    ...colorData.colorSpaces,
    ...colorData.specialKeywords,
  ]);

  const properties = lexer.properties as Record<string, any>;
  
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;

    const keywords = new Set<string>();
    const numberTypes = new Set<string>();

    if (propDef?.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    const hasColors = Array.from(keywords).some(k => allColors.has(k));
    if (hasColors) {
      keywords.clear();
      keywords.add('__COLORS__');
    }

    propertyData[propName] = {
      keywords: Array.from(keywords).sort(),
      numberTypes: Array.from(numberTypes).sort(),
    };
  }

  return propertyData;
}

function generatePropertyKeywordsFile(propertyData: Record<string, PropertyData>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性 Keywords（自动生成）',
    ' */',
    '',
    "import { ALL_COLORS } from './cssColorData';",
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(p => propertyData[p].keywords.length > 0)
    .sort();
  
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const constName = propName.replace(/-/g, '_').toUpperCase();
    
    if (data.keywords.length === 1 && data.keywords[0] === '__COLORS__') {
      lines.push(`export const ${constName}_KEYWORDS = ALL_COLORS;`);
    } else {
      lines.push(`export const ${constName}_KEYWORDS = [${data.keywords.map(k => `'${k}'`).join(', ')}] as const;`);
    }
  }

  lines.push('');
  lines.push('export const PROPERTY_KEYWORDS_MAP: Record<string, readonly string[]> = {');
  for (const propName of sortedProps) {
    const constName = propName.replace(/-/g, '_').toUpperCase();
    lines.push(`  '${propName}': ${constName}_KEYWORDS,`);
  }
  lines.push('};', '');

  return lines.join('\n');
}

function generatePropertyNumberTypesFile(propertyData: Record<string, PropertyData>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性 NumberTypes（自动生成）',
    ' */',
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(p => propertyData[p].numberTypes.length > 0)
    .sort();

  const allNumberTypes = new Set<string>();
  for (const propName of sortedProps) {
    propertyData[propName].numberTypes.forEach(nt => allNumberTypes.add(nt));
  }

  lines.push('// ==================== 所有 NumberTypes ====================', '');
  lines.push(`export const ALL_NUMBER_TYPES = [${Array.from(allNumberTypes).sort().map(t => `'${t}'`).join(', ')}] as const;`);
  lines.push('');
  
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const constName = propName.replace(/-/g, '_').toUpperCase();
    lines.push(`export const ${constName}_NUMBER_TYPES = [${data.numberTypes.map(t => `'${t}'`).join(', ')}] as const;`);
  }

  lines.push('');
  lines.push('export const PROPERTY_NUMBER_TYPES_MAP: Record<string, readonly string[]> = {');
  for (const propName of sortedProps) {
    const constName = propName.replace(/-/g, '_').toUpperCase();
    lines.push(`  '${propName}': ${constName}_NUMBER_TYPES,`);
  }
  lines.push('};', '');

  return lines.join('\n');
}


// ==================== Units 和 NumberTypeCategory（从 datajson） ====================

function loadNumberMapping(): any {
  const mappingPath = path.join(__dirname, 'datajson', 'numberMapping.json');
  return JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
}

function generateCssNumberDataFile(mapping: any): string {
  const lines: string[] = [
    '/**',
    ' * CSS 数值数据（自动生成）',
    ' * 包含单位常量、别名、NumberType 和 Category 映射',
    ' */',
    '',
  ];

  const numberTypes = mapping.numberTypes as Record<string, string[]>;
  const categories = mapping.categories as Record<string, string[]>;
  const allCategories = Object.keys(categories).sort();

  // 收集所有单位
  const allUnits = new Set<string>();
  for (const units of Object.values(categories)) {
    (units as string[]).forEach(u => allUnits.add(normalizeUnit(u)));
  }
  const sortedUnits = Array.from(allUnits).sort();

  // ==================== Units 常量 ====================
  lines.push('// ==================== Units 常量 ====================', '');
  for (const unit of sortedUnits) {
    lines.push(`export const UNIT_${unit.toUpperCase()} = '${unit}' as const;`);
  }
  lines.push('');

  const unitRefs = sortedUnits.map(u => `UNIT_${u.toUpperCase()}`).join(', ');
  lines.push(`export const ALL_UNITS = [${unitRefs}] as const;`, '');

  lines.push('export const UNIT_ALIAS_MAP: Record<string, string> = {');
  for (const [alias, unit] of Object.entries(UNIT_ALIAS)) {
    lines.push(`  '${alias}': '${unit}',`);
  }
  lines.push('};', '');

  lines.push('export function resolveUnitAlias(alias: string): string {');
  lines.push('  return UNIT_ALIAS_MAP[alias] ?? alias;');
  lines.push('}', '');

  // ==================== NumberType 到 Category 映射 ====================
  lines.push('// ==================== NumberType 到 Category 映射 ====================', '');
  for (const [numberType, cats] of Object.entries(numberTypes)) {
    const constName = numberType.toUpperCase();
    lines.push(`export const ${constName}_CATEGORIES = [${(cats as string[]).map(c => `'${c}'`).join(', ')}] as const;`);
  }

  lines.push('');
  lines.push('export const NUMBER_TYPE_CATEGORY_MAP: Record<string, readonly string[]> = {');
  for (const [numberType] of Object.entries(numberTypes)) {
    lines.push(`  '${numberType}': ${numberType.toUpperCase()}_CATEGORIES,`);
  }
  lines.push('};', '');

  lines.push('export const ALL_NUMBER_CATEGORIES = [');
  allCategories.forEach(c => lines.push(`  '${c}',`));
  lines.push('] as const;', '');

  // ==================== Category 到 Units 映射 ====================
  lines.push('// ==================== Category 到 Units 映射 ====================', '');
  
  // 为每个 category 生成对应的 units 数组常量
  for (const [category, units] of Object.entries(categories)) {
    const constName = category.toUpperCase().replace(/-/g, '_');
    const unitRefsList = (units as string[]).map(u => `UNIT_${normalizeUnit(u).toUpperCase()}`).join(', ');
    lines.push(`export const ${constName}_UNITS = [${unitRefsList}] as const;`);
  }
  lines.push('');

  // 为每个 category 生成对应的 unit name 类型
  lines.push('// ==================== Category Unit 类型 ====================', '');
  for (const [category] of Object.entries(categories)) {
    const constName = category.toUpperCase().replace(/-/g, '_');
    const typeName = category.split('-').map((s, i) => i === 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s.charAt(0).toUpperCase() + s.slice(1)).join('');
    lines.push(`export type Css${typeName}UnitName = typeof ${constName}_UNITS[number];`);
  }
  lines.push('');
  
  lines.push('export const CATEGORY_UNITS_MAP = {');
  for (const [category] of Object.entries(categories)) {
    const constName = category.toUpperCase().replace(/-/g, '_');
    lines.push(`  '${category}': ${constName}_UNITS,`);
  }
  lines.push('} as const;', '');

  return lines.join('\n');
}


// ==================== 伪类和伪元素（从 datajson） ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const jsonPath = path.join(__dirname, 'datajson/pseudo-standards.json');
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

function generateCssPseudoDataFile(pseudoClasses: string[], pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类和伪元素数据（自动生成）',
    ' */',
    '',
    '// ==================== 伪类 ====================',
    '',
    'export const pseudoClasses = [',
  ];
  pseudoClasses.forEach(p => lines.push(`  '${p}',`));
  lines.push('] as const;', '');

  lines.push('// ==================== 伪元素 ====================', '');
  lines.push('export const pseudoElements = [');
  pseudoElements.forEach(p => lines.push(`  '${p}',`));
  lines.push('] as const;', '');

  return lines.join('\n');
}

// ==================== Keywords（从 csstree） ====================

function extractKeywordsFromCsstree(): Set<string> {
  const lexer = (csstree as any).lexer;
  const keywords = new Set<string>();

  function extract(node: any, visited = new Set<string>(), visitedProps = new Set<string>()): void {
    if (!node) return;
    switch (node.type) {
      case 'Keyword':
        keywords.add(node.name);
        break;
      case 'Type':
        if (!visited.has(node.name)) {
          visited.add(node.name);
          const typeDef = lexer.types[node.name];
          if (typeDef?.syntax) extract(typeDef.syntax, visited, visitedProps);
        }
        break;
      case 'Property':
        if (!visitedProps.has(node.name)) {
          visitedProps.add(node.name);
          const propDef = lexer.properties[node.name];
          if (propDef?.syntax) extract(propDef.syntax, visited, visitedProps);
        }
        break;
      case 'Group':
      case 'Multiplier':
        if (node.term) extract(node.term, visited, visitedProps);
        if (node.terms) node.terms.forEach((t: any) => extract(t, visited, visitedProps));
        break;
      case 'Combination':
        if (node.terms) node.terms.forEach((t: any) => extract(t, visited, visitedProps));
        break;
    }
  }

  const properties = lexer.properties as Record<string, any>;
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;
    if (propDef?.syntax) extract(propDef.syntax);
  }

  return keywords;
}

function generateCssKeywordsDataFile(keywords: Set<string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 数据（自动生成）',
    ' * 包含 Keywords 常量、数组和 allKeywords',
    ' */',
    '',
    "import { ALL_COLORS } from './cssColorData';",
    '',
  ];

  const constNameMap = buildConstNameMap(keywords);
  const sortedKeywords = Array.from(keywords).sort();

  // ==================== Keywords 常量 ====================
  lines.push('// ==================== Keywords 常量 ====================', '');
  for (const keyword of sortedKeywords) {
    const constName = constNameMap.get(keyword)!;
    lines.push(`export const KEYWORD_${constName} = '${keyword}' as const;`);
  }
  lines.push('');

  lines.push('export const KEYWORD_MAP: Record<string, string> = {');
  for (const keyword of sortedKeywords) {
    const constName = constNameMap.get(keyword)!;
    lines.push(`  '${keyword}': KEYWORD_${constName},`);
  }
  lines.push('};', '');

  // ==================== Keywords 数组 ====================
  lines.push('// ==================== Keywords 数组 ====================', '');
  lines.push('export const keywords = [');
  for (const keyword of sortedKeywords) {
    lines.push(`  KEYWORD_${constNameMap.get(keyword)!},`);
  }
  lines.push('] as const;', '');

  // ==================== allKeywords ====================
  lines.push('// ==================== allKeywords ====================', '');
  lines.push('export const allKeywords = [...keywords, ...ALL_COLORS] as const;', '');

  return lines.join('\n');
}


// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 数据文件...\n');

  // 从 csstree 提取
  const propertyMap = generatePropertyNameMap();
  const colorData = extractAllColors();
  const propertyData = extractPropertyData();
  const keywords = extractKeywordsFromCsstree();

  // 从 datajson 读取
  const numberMapping = loadNumberMapping();
  const pseudoStandards = loadPseudoStandards();

  // 生成文件
  fs.writeFileSync(path.join(dataDir, 'cssPropertyNameMapping.ts'), generatePropertyNameFile(propertyMap));
  console.log('✅ src/data/cssPropertyNameMapping.ts');

  fs.writeFileSync(path.join(dataDir, 'cssColorData.ts'), generateColorFile(colorData));
  console.log('✅ src/data/cssColorData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyKeywords.ts'), generatePropertyKeywordsFile(propertyData));
  console.log('✅ src/data/cssPropertyKeywords.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyNumber.ts'), generatePropertyNumberTypesFile(propertyData));
  console.log('✅ src/data/cssPropertyNumber.ts');

  fs.writeFileSync(path.join(dataDir, 'cssNumberData.ts'), generateCssNumberDataFile(numberMapping));
  console.log('✅ src/data/cssNumberData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPseudoData.ts'), generateCssPseudoDataFile(pseudoStandards.pseudoClasses, pseudoStandards.pseudoElements));
  console.log('✅ src/data/cssPseudoData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssKeywordsData.ts'), generateCssKeywordsDataFile(keywords));
  console.log('✅ src/data/cssKeywordsData.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   属性数: ${Object.keys(propertyMap).length}`);
  console.log(`   Keywords 数: ${keywords.size}`);
  console.log(`   颜色数: ${colorData.standardColors.length + colorData.systemColors.length}`);
  console.log(`   伪类数: ${pseudoStandards.pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoStandards.pseudoElements.length}`);
  console.log('\n✨ 数据文件生成完成!');
}

main();
