/**
 * CSS 数据生成脚本
 *
 * 从 csstree 提取 CSS 数据：
 * - 属性的 keywords 和 numberTypes
 * - 命名颜色列表
 * - CSS 单位列表
 * - 伪类/伪元素列表
 *
 * 生成文件：
 * - src/data/property.ts
 * - src/data/colors.ts
 * - src/data/units.ts
 * - src/data/pseudo.ts
 *
 * 运行方式：npx tsx generator/generator-data.ts
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

// ==================== 从 csstree 提取数据 ====================

interface PropertyInfo {
  name: string;
  keywords?: string[];
  numberTypes?: string[];
}

// 定义被认可的数值类型
// 包括：单位类型 + 纯数值类型
const ACCEPTED_NUMBER_TYPES = new Set([
  // 从 units 中来的
  'angle',
  'decibel',
  'flex',
  'frequency',
  'length',
  'resolution',
  'semitones',
  'time',
  // 纯数值类型
  'number',
  'integer',
  'percentage',
  'ratio',
  'dimension',
  'zero',
]);

const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
};

function extractPropertiesFromCsstree(): PropertyInfo[] {
  const lexer = (csstree as any).lexer;
  const properties: PropertyInfo[] = [];

  for (const [propName, propDef] of Object.entries(lexer.properties as Record<string, any>)) {
    if (propName.startsWith('-')) continue;

    const keywords = new Set<string>();
    const numberTypes = new Set<string>();

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    const propInfo: PropertyInfo = {
      name: propName,
    };

    // 只有当有 keywords 时才添加
    if (keywords.size > 0) {
      propInfo.keywords = Array.from(keywords).sort();
    }

    // 只有当有 numberTypes 时才添加
    if (numberTypes.size > 0) {
      propInfo.numberTypes = Array.from(numberTypes).sort();
    }

    properties.push(propInfo);
  }

  return properties.sort((a, b) => a.name.localeCompare(b.name));
}

function extractFromSyntaxNode(
  node: any,
  keywords: Set<string>,
  numberTypes: Set<string>,
  lexer: any,
  visited: Set<string> = new Set()
): void {
  if (!node) return;

  switch (node.type) {
    case 'Keyword':
      keywords.add(node.name);
      break;

    case 'Type':
      const typeName = node.name;
      // 只保留被认可的数值类型
      if (ACCEPTED_NUMBER_TYPES.has(typeName)) {
        numberTypes.add(typeName);
      } else if (UNION_TYPE_MAP[typeName]) {
        // 联合类型，展开并只保留被认可的
        UNION_TYPE_MAP[typeName].forEach(t => {
          if (ACCEPTED_NUMBER_TYPES.has(t)) {
            numberTypes.add(t);
          }
        });
      } else if (!visited.has(typeName)) {
        // 递归查看这个类型的定义
        visited.add(typeName);
        const typeDef = lexer.types[typeName];
        if (typeDef?.syntax) {
          extractFromSyntaxNode(typeDef.syntax, keywords, numberTypes, lexer, visited);
        }
      }
      break;

    case 'Group':
    case 'Multiplier':
      if (node.term) {
        extractFromSyntaxNode(node.term, keywords, numberTypes, lexer, visited);
      }
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited));
      }
      break;

    case 'Combination':
      if (node.terms) {
        node.terms.forEach((t: any) => extractFromSyntaxNode(t, keywords, numberTypes, lexer, visited));
      }
      break;
  }
}

// ==================== 从 csstree 提取颜色 ====================

function extractColorsFromCsstree(): string[] {
  const lexer = (csstree as any).lexer;
  const colors = new Set<string>();

  // 从 csstree 的 types 中查找 color 类型定义
  const colorType = lexer.types['color'];
  if (colorType && colorType.syntax) {
    extractColorKeywordsFromSyntax(colorType.syntax, colors, lexer);
  }

  return Array.from(colors).sort();
}

function extractColorKeywordsFromSyntax(node: any, colors: Set<string>, lexer: any, visited: Set<string> = new Set()): void {
  if (!node) return;

  switch (node.type) {
    case 'Keyword':
      colors.add(node.name);
      break;

    case 'Type':
      if (!visited.has(node.name)) {
        visited.add(node.name);
        const typeDef = lexer.types[node.name];
        if (typeDef?.syntax) {
          extractColorKeywordsFromSyntax(typeDef.syntax, colors, lexer, visited);
        }
      }
      break;

    case 'Group':
    case 'Multiplier':
      if (node.term) {
        extractColorKeywordsFromSyntax(node.term, colors, lexer, visited);
      }
      if (node.terms) {
        node.terms.forEach((t: any) => extractColorKeywordsFromSyntax(t, colors, lexer, visited));
      }
      break;

    case 'Combination':
      if (node.terms) {
        node.terms.forEach((t: any) => extractColorKeywordsFromSyntax(t, colors, lexer, visited));
      }
      break;
  }
}

// ==================== 从 csstree 提取单位 ====================

function extractUnitsFromCsstree(): string[] {
  const lexer = (csstree as any).lexer;
  const units = new Set<string>();

  // 从 csstree 的 units 对象中提取所有单位
  // units 是一个对象，键是单位类型（如 'length', 'angle'），值是该类型的单位数组
  const unitsObj = lexer.units as Record<string, string[]>;
  
  for (const unitList of Object.values(unitsObj)) {
    if (Array.isArray(unitList)) {
      unitList.forEach(unit => units.add(unit));
    }
  }

  // 添加百分比单位
  units.add('%');

  return Array.from(units).sort();
}

// ==================== 从配置文件读取伪类/伪元素标准 ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const standardsPath = path.join(__dirname, 'pseudo-standards.json');
  const standardsContent = fs.readFileSync(standardsPath, 'utf-8');
  const standards = JSON.parse(standardsContent);
  
  return {
    pseudoClasses: standards.pseudoClasses,
    pseudoElements: standards.pseudoElements
  };
}



// ==================== 生成代码 ====================

// ==================== 生成合并文件 ====================

function generateCsstsDataFile(
  properties: PropertyInfo[],
  colors: string[],
  units: string[],
  pseudoClasses: string[],
  pseudoElements: string[]
): string {
  const lines: string[] = [
    '/**',
    ' * CSSTS 数据（自动生成）',
    ' *',
    ' * 包含从 csstree 提取的所有 CSS 数据：',
    ' * - 属性的 keywords 和 numberTypes',
    ' * - 命名颜色列表',
    ' * - CSS 单位列表',
    ' * - 伪类/伪元素列表',
    ' */',
    '',
    '// ==================== 属性数据 ====================',
    '',
    'export interface PropertyInfo {',
    '  name: string;',
    '  keywords?: string[];',
    '  numberTypes?: string[];',
    '}',
    '',
    'export const PROPERTY_DATA: PropertyInfo[] = [',
  ];

  for (const prop of properties) {
    lines.push('  {');
    lines.push(`    name: '${prop.name}',`);

    if (prop.keywords) {
      lines.push(`    keywords: [${prop.keywords.map(k => `'${k}'`).join(', ')}],`);
    }

    if (prop.numberTypes) {
      lines.push(`    numberTypes: [${prop.numberTypes.map(t => `'${t}'`).join(', ')}],`);
    }

    lines.push('  },');
  }

  lines.push('];', '');

  // 属性查询 Map（用于快速查询）
  lines.push('// ==================== 属性查询 Map ====================', '');
  lines.push('export const PROPERTY_MAP = new Map<string, PropertyInfo>([');
  for (const prop of properties) {
    lines.push(`  ['${prop.name}', ${JSON.stringify(prop)}],`);
  }
  lines.push(']);', '');

  // 颜色数据
  lines.push('// ==================== 颜色数据 ====================', '');
  lines.push('export const NAMED_COLORS = [');
  colors.forEach(color => {
    lines.push(`  '${color}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type NamedColorValue = typeof NAMED_COLORS[number];', '');

  // 单位数据
  lines.push('// ==================== 单位数据 ====================', '');
  lines.push('export const ALL_UNITS = [');
  units.forEach(unit => {
    lines.push(`  '${unit}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type UnitType = typeof ALL_UNITS[number];', '');

  // 伪类/伪元素数据
  lines.push('// ==================== 伪类/伪元素数据 ====================', '');
  lines.push('export const PSEUDO_CLASSES = [');
  pseudoClasses.forEach(pc => {
    lines.push(`  '${pc}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type PseudoClassName = typeof PSEUDO_CLASSES[number];', '');
  lines.push('');
  lines.push('export const PSEUDO_ELEMENTS = [');
  pseudoElements.forEach(pe => {
    lines.push(`  '${pe}',`);
  });
  lines.push('] as const;', '');
  lines.push('export type PseudoElementName = typeof PSEUDO_ELEMENTS[number];', '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating CSSTS data from csstree...\n');

  const properties = extractPropertiesFromCsstree();
  const colors = extractColorsFromCsstree();
  const units = extractUnitsFromCsstree();
  const { pseudoClasses, pseudoElements } = loadPseudoStandards();

  const code = generateCsstsDataFile(properties, colors, units, pseudoClasses, pseudoElements);

  fs.writeFileSync(path.join(dataDir, 'cssts-data.ts'), code);
  console.log('✅ src/data/cssts-data.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${properties.length}`);
  console.log(`   Properties with keywords: ${properties.filter(p => p.keywords).length}`);
  console.log(`   Properties with numberTypes: ${properties.filter(p => p.numberTypes).length}`);
  console.log(`   Properties with both: ${properties.filter(p => p.keywords && p.numberTypes).length}`);
  console.log(`   Named colors: ${colors.length}`);
  console.log(`   CSS units: ${units.length}`);
  console.log(`   Pseudo classes: ${pseudoClasses.length}`);
  console.log(`   Pseudo elements: ${pseudoElements.length}`);
  console.log('\n✨ Data generation completed!');
}

main();
