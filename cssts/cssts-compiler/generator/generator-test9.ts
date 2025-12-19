/**
 * 伪类和伪元素生成脚本
 *
 * 基于 pseudo-standards.json 生成：
 * - pseudoClasses.ts: 伪类数据
 * - pseudoElements.ts: 伪元素数据
 *
 * 运行方式：npx tsx generator/generator-test9.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const dataDir = path.join(__dirname, '../src/data');

// 确保输出目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// ==================== 读取 JSON 数据 ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const jsonPath = path.join(__dirname, 'datajson/pseudo-standards.json');
  const content = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(content);
}

// ==================== 生成 pseudoClasses.ts ====================

function generatePseudoClassesFile(pseudoClasses: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类数据（自动生成）',
    ' *',
    ' * 从 pseudo-standards.json 提取的所有伪类',
    ' */',
    '',
    'export const pseudoClasses = [',
  ];

  for (const pseudoClass of pseudoClasses) {
    lines.push(`  '${pseudoClass}',`);
  }

  lines.push('] as const;', '');

  return lines.join('\n');
}

// ==================== 生成 pseudoElements.ts ====================

function generatePseudoElementsFile(pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪元素数据（自动生成）',
    ' *',
    ' * 从 pseudo-standards.json 提取的所有伪元素',
    ' */',
    '',
    'export const pseudoElements = [',
  ];

  for (const pseudoElement of pseudoElements) {
    lines.push(`  '${pseudoElement}',`);
  }

  lines.push('] as const;', '');

  return lines.join('\n');
}

// ==================== 生成 cssPseudoClassElement.d.ts ====================

function generateCSSPseudoClassElementTypeFile(): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类和伪元素类型定义（自动生成）',
    ' *',
    ' * 包含所有伪类和伪元素的名称类型',
    ' */',
    '',
    "import type { pseudoClasses } from '../data/pseudoClasses';",
    "import type { pseudoElements } from '../data/pseudoElements';",
    '',
    '// ==================== 伪类名称 ====================',
    '',
    'export type PseudoClassName = typeof pseudoClasses[number];',
    '',
    '// ==================== 伪元素名称 ====================',
    '',
    'export type PseudoElementName = typeof pseudoElements[number];',
    '',
  ];

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成伪类和伪元素文件...\n');

  const { pseudoClasses, pseudoElements } = loadPseudoStandards();

  const pseudoClassesCode = generatePseudoClassesFile(pseudoClasses);
  fs.writeFileSync(path.join(dataDir, 'pseudoClasses.ts'), pseudoClassesCode);
  console.log('✅ src/data/pseudoClasses.ts');

  const pseudoElementsCode = generatePseudoElementsFile(pseudoElements);
  fs.writeFileSync(path.join(dataDir, 'pseudoElements.ts'), pseudoElementsCode);
  console.log('✅ src/data/pseudoElements.ts');

  const typesDir = path.join(__dirname, '../src/types');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  const cssTypeCode = generateCSSPseudoClassElementTypeFile();
  fs.writeFileSync(path.join(typesDir, 'cssPseudoClassElement.d.ts'), cssTypeCode);
  console.log('✅ src/types/cssPseudoClassElement.d.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   伪类数: ${pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoElements.length}`);
  console.log('\n✨ 伪类和伪元素生成完成!');
}

main();
