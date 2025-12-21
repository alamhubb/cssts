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
  // 处理以 - 开头的情况（如 -moz-xxx, -webkit-xxx）
  const normalized = str.startsWith('-') ? str.slice(1) : str;
  // 将 -x 转为 X（只处理小写字母）
  return normalized.replace(/-([a-zA-Z])/g, (_, char) => char.toUpperCase());
}

const UNIT_ALIAS: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

function normalizeUnit(unit: string): string {
  return UNIT_ALIAS[unit] ?? unit;
}


// ==================== 从 csstree 提取数据 ====================

// 从 numberMapping.json 加载 NumberType 到 Category 的映射
function loadNumberTypeToCategoriesMapping(): Record<string, string[]> {
  const mappingPath = path.join(__dirname, 'datajson', 'numberMapping.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  return mapping.numberTypes as Record<string, string[]>;
}

const NUMBER_TYPE_TO_CATEGORIES = loadNumberTypeToCategoriesMapping();

const ACCEPTED_NUMBER_TYPES = new Set(Object.keys(NUMBER_TYPE_TO_CATEGORIES));

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
    ' * 格式：kebab-case -> camelCase',
    ' */',
    '',
    '// kebab-case 到 camelCase 映射',
    'export const CSS_PROPERTY_NAME_MAP = {',
  ];

  // 反转映射：kebab-case -> camelCase
  const sortedKebabNames = Object.values(propertyMap).sort();
  for (const kebabName of sortedKebabNames) {
    const camelName = kebabToCamel(kebabName);
    lines.push(`  '${kebabName}': '${camelName}',`);
  }

  lines.push('} as const;', '');
  return lines.join('\n');
}


// ==================== 颜色数据 ====================

// 颜色类型定义（从 csstree 提取）
const COLOR_TYPES = ['named-color', 'system-color', 'deprecated-system-color', '-non-standard-color'] as const;

interface ColorTypeData {
  colorTypes: Record<string, string[]>;  // colorType -> colors[]
  allColors: string[];
}

function extractColorData(): ColorTypeData {
  const lexer = (csstree as any).lexer;
  const colorTypes: Record<string, string[]> = {};
  const allColorsSet = new Set<string>();

  for (const colorType of COLOR_TYPES) {
    const typeDef = lexer.types[colorType];
    if (typeDef?.syntax) {
      const keywords = new Set<string>();
      const numberTypes = new Set<string>();
      extractFromSyntaxNode(typeDef.syntax, keywords, numberTypes, lexer);
      const colors = Array.from(keywords).sort();
      if (colors.length > 0) {
        // 转换 colorType 名称为 camelCase 作为 key
        const camelColorType = kebabToCamel(colorType);
        colorTypes[camelColorType] = colors;
        colors.forEach(c => allColorsSet.add(c));
      }
    }
  }

  return {
    colorTypes,
    allColors: Array.from(allColorsSet).sort(),
  };
}

function generateColorFile(colorData: ColorTypeData): string {
  const lines: string[] = [
    '/**',
    ' * CSS 颜色数据（自动生成）',
    ' * 包含颜色类型和颜色映射',
    ' */',
    '',
  ];

  // ==================== ALL_COLOR_TYPES ====================
  const colorTypeNames = Object.keys(colorData.colorTypes).sort();
  lines.push(`export const ALL_COLOR_TYPES = [${colorTypeNames.map(t => `'${t}'`).join(', ')}] as const;`, '');

  // ==================== COLOR_TYPE_COLORS_MAP ====================
  lines.push('// ColorType -> Colors 映射（使用 camelCase）');
  lines.push('export const COLOR_TYPE_COLORS_MAP = {');
  for (const [colorType, colors] of Object.entries(colorData.colorTypes)) {
    const camelColors = colors.map(c => kebabToCamel(c));
    lines.push(`  ${colorType}: [${camelColors.map(c => `'${c}'`).join(', ')}] as const,`);
  }
  lines.push('} as const;', '');

  // ==================== COLOR_NAME_MAP ====================
  lines.push('// kebab-case 到 camelCase 映射');
  lines.push('export const COLOR_NAME_MAP = {');
  colorData.allColors.forEach(c => lines.push(`  '${c}': '${kebabToCamel(c)}',`));
  lines.push('} as const;', '');

  return lines.join('\n');
}


// ==================== 属性 Keywords、NumberTypes 和 ColorTypes ====================

interface PropertyData {
  keywords: string[];
  numberCategories: string[];  // 直接存储 categories，不再有 numberTypes 中间层
  colorTypes: string[];
}

function extractPropertyData(allColors: Set<string>, colorTypeColorsMap: Record<string, string[]>): Record<string, PropertyData> {
  const lexer = (csstree as any).lexer;
  const propertyData: Record<string, PropertyData> = {};

  const properties = lexer.properties as Record<string, any>;
  
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;

    const keywords = new Set<string>();
    const numberTypes = new Set<string>();

    if (propDef?.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    // 分离颜色和非颜色 keywords
    const colorKeywords = Array.from(keywords).filter(k => allColors.has(k));
    const nonColorKeywords = Array.from(keywords).filter(k => !allColors.has(k));
    
    // 确定属性支持的 colorTypes
    const supportedColorTypes: string[] = [];
    if (colorKeywords.length > 0) {
      for (const [colorType, colors] of Object.entries(colorTypeColorsMap)) {
        // 如果属性的颜色 keywords 包含该 colorType 的任意颜色，则支持该 colorType
        if (colors.some(c => colorKeywords.includes(c))) {
          supportedColorTypes.push(colorType);
        }
      }
    }

    // 将 numberTypes 转换为 categories（去重）
    const categoriesSet = new Set<string>();
    for (const nt of numberTypes) {
      const cats = NUMBER_TYPE_TO_CATEGORIES[nt];
      if (cats) {
        cats.forEach(c => categoriesSet.add(c));
      }
    }

    propertyData[propName] = {
      keywords: nonColorKeywords.sort(),
      numberCategories: Array.from(categoriesSet).sort(),
      colorTypes: supportedColorTypes.sort(),
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
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(p => propertyData[p].keywords.length > 0)
    .sort();
  
  // 直接生成 PROPERTY_KEYWORDS_MAP，内联所有值
  lines.push('export const PROPERTY_KEYWORDS_MAP = {');
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const camelName = kebabToCamel(propName);
    lines.push(`  ${camelName}: [${data.keywords.map(k => `'${k}'`).join(', ')}] as const,`);
  }
  lines.push('} as const;', '');

  return lines.join('\n');
}

function generatePropertyNumberTypesFile(propertyData: Record<string, PropertyData>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性 NumberCategories（自动生成）',
    ' */',
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(p => propertyData[p].numberCategories.length > 0)
    .sort();

  const allCategories = new Set<string>();
  for (const propName of sortedProps) {
    propertyData[propName].numberCategories.forEach(c => allCategories.add(c));
  }

  // 直接生成 PROPERTY_CATEGORIES_MAP，内联所有值
  lines.push('export const PROPERTY_CATEGORIES_MAP = {');
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const camelName = kebabToCamel(propName);
    lines.push(`  ${camelName}: [${data.numberCategories.map(c => `'${c}'`).join(', ')}] as const,`);
  }
  lines.push('} as const;', '');

  return lines.join('\n');
}

function generatePropertyColorTypesFile(propertyData: Record<string, PropertyData>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性 ColorTypes（自动生成）',
    ' */',
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(p => propertyData[p].colorTypes.length > 0)
    .sort();

  // 直接生成 PROPERTY_COLOR_TYPES_MAP，内联所有值
  lines.push('export const PROPERTY_COLOR_TYPES_MAP = {');
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const camelName = kebabToCamel(propName);
    lines.push(`  ${camelName}: [${data.colorTypes.map(t => `'${t}'`).join(', ')}] as const,`);
  }
  lines.push('} as const;', '');

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
    ' * 包含单位和 Category 映射',
    ' */',
    '',
  ];

  const categories = mapping.categories as Record<string, string[]>;
  const allCategories = Object.keys(categories).sort();

  // 收集所有单位
  const allUnits = new Set<string>();
  for (const units of Object.values(categories)) {
    (units as string[]).forEach(u => allUnits.add(normalizeUnit(u)));
  }
  const sortedUnits = Array.from(allUnits).sort();

  // ==================== ALL_UNITS ====================
  lines.push(`export const ALL_UNITS = [${sortedUnits.map(u => `'${u}'`).join(', ')}] as const;`, '');

  // ==================== UNIT_ALIAS_MAP ====================
  lines.push('export const UNIT_ALIAS_MAP: Record<string, string> = {');
  for (const [alias, unit] of Object.entries(UNIT_ALIAS)) {
    lines.push(`  '${alias}': '${unit}',`);
  }
  lines.push('};', '');

  // ==================== ALL_NUMBER_CATEGORIES ====================
  lines.push(`export const ALL_NUMBER_CATEGORIES = [${allCategories.map(c => `'${c}'`).join(', ')}] as const;`, '');

  // ==================== CATEGORY_UNITS_MAP ====================
  lines.push('export const CATEGORY_UNITS_MAP = {');
  for (const [category, units] of Object.entries(categories)) {
    const normalizedUnits = (units as string[]).map(u => normalizeUnit(u));
    lines.push(`  ${category}: [${normalizedUnits.map(u => `'${u}'`).join(', ')}] as const,`);
  }
  lines.push('} as const;', '');

  return lines.join('\n');
}


// ==================== 伪类和伪元素（从 datajson） ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const jsonPath = path.join(__dirname, 'datajson/pseudo-standards.json');
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// ==================== 属性继承关系（从 datajson） ====================

function loadPropertyInheritance(): Record<string, string[]> {
  const jsonPath = path.join(__dirname, 'datajson/propertyInheritance.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  // 移除 $comment 字段
  delete data.$comment;
  return data;
}

function generatePropertyInheritanceFile(inheritance: Record<string, string[]>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性继承关系（自动生成）',
    ' * 子属性 → 父属性映射',
    ' * 当子属性没有配置时，自动继承父属性的配置',
    ' */',
    '',
    '// 子属性 → 父属性映射',
    'export const PROPERTY_PARENT_MAP: Record<string, string> = {',
  ];

  // 反转映射：从 parent → children 变为 child → parent，不同组之间加空行
  let isFirst = true;
  for (const [parent, children] of Object.entries(inheritance)) {
    if (!isFirst) {
      lines.push('');  // 组之间加空行
    }
    isFirst = false;
    for (const child of children) {
      lines.push(`  ${child}: '${parent}',`);
    }
  }

  lines.push('};', '');
  return lines.join('\n');
}

function generateCssPseudoDataFile(pseudoClasses: string[], pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类和伪元素数据（自动生成）',
    ' * 格式：kebab-case -> camelCase',
    ' */',
    '',
    '// ==================== 伪类 ====================',
    '',
    '// kebab-case 到 camelCase 映射',
    'export const PSEUDO_CLASS_NAME_MAP = {',
  ];
  // 反转映射：kebab-case -> camelCase
  pseudoClasses.forEach(p => lines.push(`  '${p}': '${kebabToCamel(p)}',`));
  lines.push('} as const;', '');

  lines.push('// ==================== 伪元素 ====================', '');
  
  // 反转映射：kebab-case -> camelCase
  lines.push('// kebab-case 到 camelCase 映射');
  lines.push('export const PSEUDO_ELEMENT_NAME_MAP = {');
  pseudoElements.forEach(p => lines.push(`  '${p}': '${kebabToCamel(p)}',`));
  lines.push('} as const;', '');

  return lines.join('\n');
}

// ==================== Keywords（从 csstree） ====================

function extractKeywordsFromCsstree(allColors: Set<string>): Set<string> {
  const lexer = (csstree as any).lexer;
  const keywords = new Set<string>();

  function extract(node: any, visited = new Set<string>(), visitedProps = new Set<string>()): void {
    if (!node) return;
    switch (node.type) {
      case 'Keyword':
        // 排除颜色
        if (!allColors.has(node.name)) {
          keywords.add(node.name);
        }
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
  const sortedKeywords = Array.from(keywords).sort();

  const lines: string[] = [
    '/**',
    ' * CSS Keywords 数据（自动生成）',
    ' * 格式：kebab-case -> camelCase',
    ' */',
    '',
    '// kebab-case 到 camelCase 映射',
    'export const KEYWORD_NAME_MAP = {',
  ];

  sortedKeywords.forEach(k => lines.push(`  '${k}': '${kebabToCamel(k)}',`));
  lines.push('} as const;', '');

  return lines.join('\n');
}


// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 数据文件...\n');

  // 从 csstree 提取
  const propertyMap = generatePropertyNameMap();
  const colorData = extractColorData();
  const allColorsSet = new Set(colorData.allColors);
  const propertyData = extractPropertyData(allColorsSet, colorData.colorTypes);
  const keywords = extractKeywordsFromCsstree(allColorsSet);

  // 从 datajson 读取
  const numberMapping = loadNumberMapping();
  const pseudoStandards = loadPseudoStandards();
  const propertyInheritance = loadPropertyInheritance();

  // 生成文件
  fs.writeFileSync(path.join(dataDir, 'cssPropertyNameMapping.ts'), generatePropertyNameFile(propertyMap));
  console.log('✅ src/data/cssPropertyNameMapping.ts');

  fs.writeFileSync(path.join(dataDir, 'cssColorData.ts'), generateColorFile(colorData));
  console.log('✅ src/data/cssColorData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyKeywords.ts'), generatePropertyKeywordsFile(propertyData));
  console.log('✅ src/data/cssPropertyKeywords.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyNumber.ts'), generatePropertyNumberTypesFile(propertyData));
  console.log('✅ src/data/cssPropertyNumber.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyColorTypes.ts'), generatePropertyColorTypesFile(propertyData));
  console.log('✅ src/data/cssPropertyColorTypes.ts');

  fs.writeFileSync(path.join(dataDir, 'cssNumberData.ts'), generateCssNumberDataFile(numberMapping));
  console.log('✅ src/data/cssNumberData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPseudoData.ts'), generateCssPseudoDataFile(pseudoStandards.pseudoClasses, pseudoStandards.pseudoElements));
  console.log('✅ src/data/cssPseudoData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssKeywordsData.ts'), generateCssKeywordsDataFile(keywords));
  console.log('✅ src/data/cssKeywordsData.ts');

  fs.writeFileSync(path.join(dataDir, 'cssPropertyInheritance.ts'), generatePropertyInheritanceFile(propertyInheritance));
  console.log('✅ src/data/cssPropertyInheritance.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   属性数: ${Object.keys(propertyMap).length}`);
  console.log(`   Keywords 数: ${keywords.size}`);
  console.log(`   颜色类型数: ${Object.keys(colorData.colorTypes).length}`);
  console.log(`   颜色数: ${colorData.allColors.length}`);
  console.log(`   伪类数: ${pseudoStandards.pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoStandards.pseudoElements.length}`);
  console.log(`   属性继承关系: ${Object.keys(propertyInheritance).length} 组`);
  console.log('\n✨ 数据文件生成完成!');
}

main();
