/**
 * Keywords 常量生成脚本
 *
 * 基于 propertyKeywords.ts 生成：
 * - keywordConstants.ts: 每个 keyword 的常量
 * - allKeywords.ts: 所有 keywords 的列表
 *
 * 运行方式：npx tsx generator/generator-test8.ts
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

// ==================== 从 csstree 提取所有 keywords ====================

function extractKeywordsFromCsstree(): Set<string> {
  const lexer = (csstree as any).lexer;
  const keywords = new Set<string>();

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
        if (!visited.has(typeName)) {
          visited.add(typeName);
          const typeDef = lexer.types[typeName];
          if (typeDef?.syntax) {
            extractFromSyntaxNode(typeDef.syntax, visited, visitedProperties);
          }
        }
        break;

      case 'Property':
        const propName = node.name;
        if (!visitedProperties.has(propName)) {
          visitedProperties.add(propName);
          const propDef = lexer.properties[propName];
          if (propDef?.syntax) {
            extractFromSyntaxNode(propDef.syntax, visited, visitedProperties);
          }
        }
        break;

      case 'Group':
      case 'Multiplier':
        if (node.term) {
          extractFromSyntaxNode(node.term, visited, visitedProperties);
        }
        if (node.terms) {
          node.terms.forEach((t: any) => extractFromSyntaxNode(t, visited, visitedProperties));
        }
        break;

      case 'Combination':
        if (node.terms) {
          node.terms.forEach((t: any) => extractFromSyntaxNode(t, visited, visitedProperties));
        }
        break;
    }
  }

  const properties = lexer.properties as Record<string, any>;
  
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;

    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax);
    }
  }

  return keywords;
}

// ==================== 生成 keywordConstants.ts ====================

function generateKeywordConstantsFile(keywords: Set<string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 常量（自动生成）',
    ' *',
    ' * 每个 keyword 的常量定义',
    ' */',
    '',
  ];

  const sortedKeywords = Array.from(keywords).sort();

  lines.push('// ==================== 所有 Keywords ====================', '');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
    lines.push(`export const KEYWORD_${constName} = '${keyword}' as const;`);
  }

  lines.push('');
  lines.push('// ==================== Keywords 映射 ====================', '');
  lines.push('export const KEYWORD_MAP: Record<string, string> = {');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
    lines.push(`  '${keyword}': KEYWORD_${constName},`);
  }
  
  lines.push('};', '');

  return lines.join('\n');
}

// ==================== 生成 keywords.ts ====================

function generateKeywordsFile(keywords: Set<string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 数组（自动生成）',
    ' *',
    ' * 从 csstree 提取的所有 keywords',
    ' */',
    '',
  ];

  const sortedKeywords = Array.from(keywords).sort();

  // 生成导入语句
  const constNames = sortedKeywords.map(k => `KEYWORD_${keywordToConstName(k)}`);
  lines.push(`import { ${constNames.join(', ')}, KEYWORD_MAP } from './keywordConstants';`, '');

  lines.push('');
  lines.push('export const keywords = [');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
    lines.push(`  KEYWORD_${constName},`);
  }
  
  lines.push('] as const;', '');
  lines.push('');
  lines.push('export { KEYWORD_MAP };', '');

  return lines.join('\n');
}

// ==================== 生成 allKeywords.ts ====================

function generateAllKeywordsFile(): string {
  const lines: string[] = [
    '/**',
    ' * 所有 CSS Keywords 和 Colors（自动生成）',
    ' *',
    ' * 组合 keywords 和 colors',
    ' */',
    '',
    "import { keywords } from './keywords';",
    "import { ALL_COLORS } from './color';",
    '',
    '// ==================== 所有 Keywords 和 Colors ====================',
    '',
    'export const allKeywords = [...keywords, ...ALL_COLORS] as const;',
    '',
    "export { keywords, ALL_COLORS };",
    '',
  ];

  return lines.join('\n');
}

// ==================== 生成 cssKeywords.d.ts ====================

function generateCSSKeywordsTypeFile(): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 类型定义（自动生成）',
    ' *',
    ' * 包含所有 keywords 和 colors 的类型定义',
    ' */',
    '',
    "import type { keywords } from '../data/keywords';",
    "import type { allKeywords } from '../data/allKeywords';",
    "import type { ALL_COLORS } from '../data/color';",
    '',
    '// ==================== Keywords 类型 ====================',
    '',
    'export type CSSKeywordName = typeof keywords[number];',
    '',
    '// ==================== Colors 类型 ====================',
    '',
    'export type CSSColorName = typeof ALL_COLORS[number];',
    '',
    '// ==================== 所有 Keywords 和 Colors 类型 ====================',
    '',
    'export type CSSAllKeywordName = typeof allKeywords[number];',
    '',
  ];

  return lines.join('\n');
}

// ==================== 工具函数 ====================

function keywordToConstName(keyword: string): string {
  // 将 keyword 转换为有效的常量名
  // 例如：'flex-end' -> 'FLEX_END', 'auto' -> 'AUTO'
  return keyword
    .replace(/-/g, '_')
    .replace(/[^A-Z0-9_]/gi, '')
    .toUpperCase();
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成 Keywords 常量文件...\n');

  const keywords = extractKeywordsFromCsstree();

  const keywordConstantsCode = generateKeywordConstantsFile(keywords);
  fs.writeFileSync(path.join(dataDir, 'keywordConstants.ts'), keywordConstantsCode);
  console.log('✅ src/data/keywordConstants.ts');

  const keywordsCode = generateKeywordsFile(keywords);
  fs.writeFileSync(path.join(dataDir, 'keywords.ts'), keywordsCode);
  console.log('✅ src/data/keywords.ts');

  const allKeywordsCode = generateAllKeywordsFile();
  fs.writeFileSync(path.join(dataDir, 'allKeywords.ts'), allKeywordsCode);
  console.log('✅ src/data/allKeywords.ts');

  const typesDir = path.join(__dirname, '../src/types');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  const cssKeywordsCode = generateCSSKeywordsTypeFile();
  fs.writeFileSync(path.join(typesDir, 'cssKeywords.d.ts'), cssKeywordsCode);
  console.log('✅ src/types/cssKeywords.d.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   总 Keywords 数: ${keywords.size}`);
  console.log('\n✨ Keywords 常量生成完成!');
}

main();
