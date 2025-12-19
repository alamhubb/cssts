/**
 * CSS 数据生成脚本（扩展版）
 *
 * 生成以下文件：
 * - propertyName.ts: CSS 属性名映射（驼峰 <-> kebab-case）
 * - color.ts: 按分类的颜色数组
 * - propertyKeywords.ts: 每个属性的 keywords
 * - propertyNumberTypes.ts: 每个属性的 numberTypes
 *
 * 运行方式：npx tsx generator/generator-test1.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const dataDir = path.join(__dirname, '../src/data');

// 确保输出目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// ==================== 工具函数 ====================

/**
 * 将 kebab-case 转换为 camelCase
 * 例如：accent-color -> accentColor
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

// ==================== 生成属性名映射 ====================

function generatePropertyNameMap(): Record<string, string> {
  const lexer = (csstree as any).lexer;
  const propertyMap: Record<string, string> = {};

  const properties = lexer.properties as Record<string, any>;
  
  for (const propName of Object.keys(properties)) {
    if (propName.startsWith('-')) continue;
    const camelName = kebabToCamel(propName);
    propertyMap[camelName] = propName;
  }

  return propertyMap;
}

// ==================== 生成颜色数据 ====================

interface ColorData {
  standardColors: string[];
  systemColors: string[];
  browserPrefixColors: string[];
  colorSpaces: string[];
  specialKeywords: string[];
}

function extractAllColors(): ColorData {
  const lexer = (csstree as any).lexer;
  const colorType = lexer.types['color'];
  
  const standardColors = new Set<string>();
  const systemColors = new Set<string>();
  const browserPrefixColors = new Set<string>();
  const colorSpaces = new Set<string>();
  const specialKeywords = new Set<string>();

  // 提取 named-color（标准颜色）
  const namedColorType = lexer.types['named-color'];
  if (namedColorType && namedColorType.syntax) {
    const keywords = new Set<string>();
    const numberTypes = new Set<string>();
    extractFromSyntaxNode(namedColorType.syntax, keywords, numberTypes, lexer);
    keywords.forEach(k => standardColors.add(k));
  }

  // 从完整的 color 类型中提取所有颜色
  if (colorType && colorType.syntax) {
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

// ==================== 提取属性的 keywords 和 numberTypes ====================

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

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    // 如果包含颜色关键字，用引用代替
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

// ==================== 生成代码文件 ====================

function generatePropertyNameFile(propertyMap: Record<string, string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性名映射（自动生成）',
    ' *',
    ' * 将驼峰命名的属性名映射到原始的 kebab-case 属性名',
    ' * 例如：accentColor -> accent-color',
    ' */',
    '',
    'export const CSS_PROPERTY_NAME_MAP = {',
  ];

  const sortedKeys = Object.keys(propertyMap).sort();
  
  for (const camelName of sortedKeys) {
    const kebabName = propertyMap[camelName];
    lines.push(`  ${camelName}: '${kebabName}',`);
  }

  lines.push('} as const;', '');
  
  lines.push('// ==================== 反向映射 ====================', '');
  lines.push('export const CSS_PROPERTY_NAME_REVERSE_MAP: Record<string, keyof typeof CSS_PROPERTY_NAME_MAP> = {');
  
  for (const camelName of sortedKeys) {
    const kebabName = propertyMap[camelName];
    lines.push(`  '${kebabName}': '${camelName}',`);
  }
  
  lines.push('} as const;', '');

  return lines.join('\n');
}

function generateColorFile(colorData: ColorData): string {
  const lines: string[] = [
    '/**',
    ' * CSS 颜色数据（自动生成）',
    ' *',
    ' * 按分类的颜色数组',
    ' */',
    '',
    '// ==================== 标准颜色 ====================',
    '',
    'export const STANDARD_COLORS = [',
  ];

  colorData.standardColors.forEach(color => {
    lines.push(`  '${color}',`);
  });

  lines.push('] as const;', '');
  lines.push('export type StandardColor = typeof STANDARD_COLORS[number];', '');

  lines.push('// ==================== 系统颜色 ====================', '');
  lines.push('export const SYSTEM_COLORS = [');
  colorData.systemColors.forEach(color => {
    lines.push(`  '${color}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type SystemColor = typeof SYSTEM_COLORS[number];', '');

  lines.push('// ==================== 浏览器前缀颜色 ====================', '');
  lines.push('export const BROWSER_PREFIX_COLORS = [');
  colorData.browserPrefixColors.forEach(color => {
    lines.push(`  '${color}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type BrowserPrefixColor = typeof BROWSER_PREFIX_COLORS[number];', '');

  lines.push('// ==================== 色彩空间 ====================', '');
  lines.push('export const COLOR_SPACES = [');
  colorData.colorSpaces.forEach(color => {
    lines.push(`  '${color}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type ColorSpace = typeof COLOR_SPACES[number];', '');

  lines.push('// ==================== 特殊关键字 ====================', '');
  lines.push('export const SPECIAL_COLOR_KEYWORDS = [');
  colorData.specialKeywords.forEach(color => {
    lines.push(`  '${color}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type SpecialColorKeyword = typeof SPECIAL_COLOR_KEYWORDS[number];', '');

  lines.push('// ==================== 所有颜色 ====================', '');
  lines.push('export const ALL_COLORS = [');
  lines.push('  ...STANDARD_COLORS,');
  lines.push('  ...SYSTEM_COLORS,');
  lines.push('  ...BROWSER_PREFIX_COLORS,');
  lines.push('  ...COLOR_SPACES,');
  lines.push('  ...SPECIAL_COLOR_KEYWORDS,');
  lines.push('] as const;', '');
  lines.push('export type CSSColor = typeof ALL_COLORS[number];', '');

  return lines.join('\n');
}

function generatePropertyKeywordsFile(propertyData: Record<string, PropertyData>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性 Keywords（自动生成）',
    ' *',
    ' * 每个属性的 keywords 数组',
    ' * 如果属性包含颜色，则使用 ALL_COLORS 引用',
    ' * 只包含有 keywords 的属性',
    ' */',
    '',
    "import { ALL_COLORS } from './color';",
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(propName => propertyData[propName].keywords.length > 0)
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
  lines.push('// ==================== 属性 Keywords 映射 ====================', '');
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
    ' *',
    ' * 每个属性的 numberTypes 数组',
    ' * 只包含有 numberTypes 的属性',
    ' */',
    '',
  ];

  const sortedProps = Object.keys(propertyData)
    .filter(propName => propertyData[propName].numberTypes.length > 0)
    .sort();

  // 收集所有唯一的 numberTypes
  const allNumberTypes = new Set<string>();
  for (const propName of sortedProps) {
    propertyData[propName].numberTypes.forEach(nt => allNumberTypes.add(nt));
  }

  // 生成 ALL_NUMBER_TYPES
  lines.push('// ==================== 所有 NumberTypes ====================', '');
  lines.push(`export const ALL_NUMBER_TYPES = [${Array.from(allNumberTypes).sort().map(t => `'${t}'`).join(', ')}] as const;`);
  lines.push('');
  
  for (const propName of sortedProps) {
    const data = propertyData[propName];
    const constName = propName.replace(/-/g, '_').toUpperCase();
    
    lines.push(`export const ${constName}_NUMBER_TYPES = [${data.numberTypes.map(t => `'${t}'`).join(', ')}] as const;`);
  }

  lines.push('');
  lines.push('// ==================== 属性 NumberTypes 映射 ====================', '');
  lines.push('export const PROPERTY_NUMBER_TYPES_MAP: Record<string, readonly string[]> = {');
  
  for (const propName of sortedProps) {
    const constName = propName.replace(/-/g, '_').toUpperCase();
    lines.push(`  '${propName}': ${constName}_NUMBER_TYPES,`);
  }
  
  lines.push('};', '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating CSS data files...\n');

  const propertyMap = generatePropertyNameMap();
  const colorData = extractAllColors();
  const propertyData = extractPropertyData();

  // 生成属性名文件
  fs.writeFileSync(path.join(dataDir, 'propertyName.ts'), generatePropertyNameFile(propertyMap));
  console.log('✅ src/data/propertyName.ts');

  // 生成颜色文件
  fs.writeFileSync(path.join(dataDir, 'color.ts'), generateColorFile(colorData));
  console.log('✅ src/data/color.ts');

  // 生成属性 keywords 文件
  fs.writeFileSync(path.join(dataDir, 'propertyKeywords.ts'), generatePropertyKeywordsFile(propertyData));
  console.log('✅ src/data/propertyKeywords.ts');

  // 生成属性 numberTypes 文件
  fs.writeFileSync(path.join(dataDir, 'propertyNumberTypes.ts'), generatePropertyNumberTypesFile(propertyData));
  console.log('✅ src/data/propertyNumberTypes.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${Object.keys(propertyMap).length}`);
  console.log(`   Standard colors: ${colorData.standardColors.length}`);
  console.log(`   System colors: ${colorData.systemColors.length}`);
  console.log(`   Browser prefix colors: ${colorData.browserPrefixColors.length}`);
  console.log(`   Color spaces: ${colorData.colorSpaces.length}`);
  console.log(`   Special keywords: ${colorData.specialKeywords.length}`);
  console.log('\n✨ Data generation completed!');
}

main();
