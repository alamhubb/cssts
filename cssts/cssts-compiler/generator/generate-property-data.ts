/**
 * 从 csstree 生成属性数据脚本
 * 
 * 提取每个 CSS 属性的 keywords 和 numberTypes
 * 如果没有 keywords 就不生成该属性
 * 如果没有 numberTypes 就不生成该属性
 * 
 * 运行方式：npx tsx generator/generate-property-data.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出到 src/data/property.ts
const outputPath = path.join(__dirname, '../src/data/property.ts');

// ==================== 从 csstree 提取数据 ====================

interface PropertyInfo {
  name: string;
  keywords?: string[];
  numberTypes?: string[];
}

const BASE_NUMBER_TYPES = [
  'length', 'angle', 'time', 'frequency', 'percentage',
  'number', 'integer', 'resolution', 'flex'
];

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
    // 跳过私有属性
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
      if (BASE_NUMBER_TYPES.includes(typeName)) {
        numberTypes.add(typeName);
      } else if (UNION_TYPE_MAP[typeName]) {
        UNION_TYPE_MAP[typeName].forEach(t => numberTypes.add(t));
      } else if (!visited.has(typeName)) {
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

// ==================== 生成代码 ====================

function generatePropertyFile(properties: PropertyInfo[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性数据（自动生成）',
    ' *',
    ' * 包含每个属性的 keywords 和 numberTypes',
    ' * 如果属性没有 keywords，则不包含该字段',
    ' * 如果属性没有 numberTypes，则不包含该字段',
    ' */',
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

  lines.push('];');
  lines.push('');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('Generating property data from csstree...\n');

  const properties = extractPropertiesFromCsstree();
  const code = generatePropertyFile(properties);

  fs.writeFileSync(outputPath, code);

  console.log(`✅ Generated: ${outputPath}`);
  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${properties.length}`);
  console.log(`   Properties with keywords: ${properties.filter(p => p.keywords).length}`);
  console.log(`   Properties with numberTypes: ${properties.filter(p => p.numberTypes).length}`);
  console.log(`   Properties with both: ${properties.filter(p => p.keywords && p.numberTypes).length}`);
}

main();
