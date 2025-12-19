/**
 * CSS 属性值类型定义生成脚本
 *
 * 生成 .d.ts 文件，包含 CSSPropertiesValueType interface
 * 每个属性的值类型为：关键字类型 | string
 * 
 * 生成文件：src/types/cssPropertiesValue.d.ts
 *
 * 运行方式：npx tsx generator/generator-test3.ts
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
 * 将 camelCase 转换为 PascalCase
 */
function camelToPascal(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== 提取数据 ====================

const ACCEPTED_NUMBER_TYPES = new Set([
  'angle', 'decibel', 'flex', 'frequency', 'length', 'resolution', 'semitones', 'time',
  'number', 'integer', 'percentage', 'ratio', 'dimension', 'zero',
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

interface PropertyValueInfo {
  camelName: string;
  pascalName: string;
  hasKeywords: boolean;
  hasNumberTypes: boolean;
}

function extractPropertyValues(): PropertyValueInfo[] {
  const lexer = (csstree as any).lexer;
  const propertyValues: PropertyValueInfo[] = [];

  const properties = lexer.properties as Record<string, any>;
  
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;

    const keywords = new Set<string>();
    const numberTypes = new Set<string>();

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax, keywords, numberTypes, lexer);
    }

    const camelName = kebabToCamel(propName);
    const pascalName = camelToPascal(camelName);
    
    propertyValues.push({
      camelName,
      pascalName,
      hasKeywords: keywords.size > 0,
      hasNumberTypes: numberTypes.size > 0,
    });
  }

  return propertyValues.sort((a, b) => a.camelName.localeCompare(b.camelName));
}

// ==================== 生成类型定义 ====================

function generatePropertyValueTypesFile(propertyValues: PropertyValueInfo[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性值类型定义（自动生成）',
    ' *',
    ' * 每个属性的值类型为：关键字类型 | string',
    ' */',
    '',
    "import type * as Keywords from '../data/propertyKeywords';",
    '',
    '// ==================== 属性值映射 ====================',
    '',
  ];

  // 构建 camelName 到 const 名称的映射
  const camelToConstName: Record<string, { keywords?: string }> = {};
  
  for (const prop of propertyValues) {
    // camelName 转换为 kebab-case，然后转换为 UPPER_SNAKE_CASE
    const kebabName = prop.camelName.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
    const constName = kebabName.replace(/-/g, '_').toUpperCase();
    
    camelToConstName[prop.camelName] = {};
    
    if (prop.hasKeywords) {
      camelToConstName[prop.camelName].keywords = `${constName}_KEYWORDS`;
    }
  }

  lines.push('export interface CSSPropertiesValueType {');
  
  for (const prop of propertyValues) {
    const constNames = camelToConstName[prop.camelName];
    
    // 只包含有 keywords 的属性
    if (constNames.keywords) {
      const typeUnion = `typeof Keywords.${constNames.keywords}[number] | string`;
      lines.push(`  ${prop.camelName}?: ${typeUnion};`);
    }
  }
  
  lines.push('}', '');

  return lines.join('\n');
}

// ==================== 生成 cssPropertyConfig.d.ts ====================

function generatePropertyConfigFile(): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性配置类型定义（自动生成）',
    ' *',
    ' * 包含 CSSPropertyName 和联合类型 CSSProperty',
    ' */',
    '',
    "import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';",
    "import type { CSSPropertiesType } from './cssProperties';",
    '',
    '// ==================== 属性名类型 ====================',
    '',
    'export type CSSPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;',
    '',
    '// ==================== 联合类型 ====================',
    '',
    '// 单个属性或属性集合',
    'export type CSSProperty = CSSPropertyName | CSSPropertiesType;',
    '',
    '// 单个或多个属性',
    'export type CSSProperties = CSSProperty | CSSProperty[];',
    '',
  ];

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating CSS property type definitions...\n');

  const propertyValues = extractPropertyValues();
  const valueTypesCode = generatePropertyValueTypesFile(propertyValues);
  const configCode = generatePropertyConfigFile();

  fs.writeFileSync(path.join(typesDir, 'cssPropertiesValue.d.ts'), valueTypesCode);
  console.log('✅ src/types/cssPropertiesValue.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), configCode);
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Total properties: ${propertyValues.length}`);
  console.log(`   Properties with keywords: ${propertyValues.filter(p => p.hasKeywords).length}`);
  console.log(`   Properties with numberTypes: ${propertyValues.filter(p => p.hasNumberTypes).length}`);
  console.log(`   Properties with both: ${propertyValues.filter(p => p.hasKeywords && p.hasNumberTypes).length}`);
  console.log('\n✨ Property type definition generation completed!');
}

main();
