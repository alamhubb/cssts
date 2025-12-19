/**
 * CSS 属性类型定义生成脚本
 *
 * 生成 .d.ts 文件，包含每个属性的 keywords 和 numberTypes 类型定义
 * 
 * 生成文件：src/types/cssProperties.d.ts
 *
 * 运行方式：npx tsx generator/generator-test2.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// ==================== 工具函数 ====================

/**
 * 将 kebab-case 转换为 camelCase
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

/**
 * 将 kebab-case 转换为 UPPER_SNAKE_CASE
 */
function kebabToUpperSnake(str: string): string {
  return str.replace(/-/g, '_').toUpperCase();
}

// ==================== 提取数据 ====================

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

interface PropertyTypeInfo {
  camelName: string;
  keywords: string[];
  numberTypes: string[];
}

function extractPropertyTypes(): PropertyTypeInfo[] {
  const lexer = (csstree as any).lexer;
  const propertyTypes: PropertyTypeInfo[] = [];

  const properties = lexer.properties as Record<string, any>;
  
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;

    const keywords = new Set<string>();
    const numberTypes = new Set<string>();

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    const camelName = kebabToCamel(propName);
    
    propertyTypes.push({
      camelName,
      keywords: Array.from(keywords).sort(),
      numberTypes: Array.from(numberTypes).sort(),
    });
  }

  return propertyTypes.sort((a, b) => a.camelName.localeCompare(b.camelName));
}

// ==================== 生成类型定义 ====================

function generatePropertyTypesFile(propertyTypes: PropertyTypeInfo[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性类型定义（自动生成）',
    ' *',
    ' * 每个属性的 keywords 和 numberTypes 类型',
    ' */',
    '',
    "import type * as Keywords from '../data/propertyKeywords';",
    "import type * as NumberTypes from '../data/propertyNumberTypes';",
    '',
    '// ==================== 属性类型 ====================',
    '',
  ];

  // 构建 camelName 到 const 名称的映射
  const camelToConstName: Record<string, { keywords?: string; numberTypes?: string }> = {};
  
  for (const prop of propertyTypes) {
    // 从 camelCase 转回 kebab-case，然后转 UPPER_SNAKE_CASE
    const kebabName = prop.camelName.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
    const constName = kebabName.replace(/-/g, '_').toUpperCase();
    
    camelToConstName[prop.camelName] = {};
    
    if (prop.keywords.length > 0) {
      camelToConstName[prop.camelName].keywords = `${constName}_KEYWORDS`;
    }
    if (prop.numberTypes.length > 0) {
      camelToConstName[prop.camelName].numberTypes = `${constName}_NUMBER_TYPES`;
    }
  }

  for (const prop of propertyTypes) {
    const constNames = camelToConstName[prop.camelName];
    
    // 如果既没有 keywords 也没有 numberTypes，跳过
    if (!constNames.keywords && !constNames.numberTypes) {
      continue;
    }

    lines.push(`export interface ${prop.camelName}PropertyType {`);
    
    if (constNames.keywords) {
      lines.push(`  keywords: typeof Keywords.${constNames.keywords}[number][];`);
    }
    
    if (constNames.numberTypes) {
      lines.push(`  numberTypes: typeof NumberTypes.${constNames.numberTypes}[number][];`);
    }
    
    lines.push(`}`);
    lines.push('');
  }

  // 生成属性映射类型
  lines.push('// ==================== 属性映射 ====================', '');
  lines.push('export interface CSSPropertiesType {');
  
  for (const prop of propertyTypes) {
    const constNames = camelToConstName[prop.camelName];
    
    // 只包含有数据的属性，都设为可选
    if (constNames.keywords || constNames.numberTypes) {
      lines.push(`  ${prop.camelName}?: ${prop.camelName}PropertyType;`);
    }
  }
  
  lines.push('}', '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating CSS property type definitions...\n');

  const propertyTypes = extractPropertyTypes();
  const code = generatePropertyTypesFile(propertyTypes);

  fs.writeFileSync(path.join(typesDir, 'cssProperties.d.ts'), code);
  console.log('✅ src/types/cssProperties.d.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${propertyTypes.length}`);
  console.log(`   Properties with keywords: ${propertyTypes.filter(p => p.keywords.length > 0).length}`);
  console.log(`   Properties with numberTypes: ${propertyTypes.filter(p => p.numberTypes.length > 0).length}`);
  console.log('\n✨ Type definition generation completed!');
}

main();
