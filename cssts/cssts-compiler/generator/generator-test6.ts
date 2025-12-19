/**
 * NumberTypes 类型定义生成脚本
 *
 * 生成 .d.ts 文件，包含所有 numberType 的名称类型
 * 
 * 生成文件：src/types/numberTypes.d.ts
 *
 * 运行方式：npx tsx generator/generator-test6.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// ==================== 生成类型定义 ====================

function generateNumberTypesFile(): string {
  const lines: string[] = [
    '/**',
    ' * NumberTypes 类型定义（自动生成）',
    ' *',
    ' * 包含所有 CSS 数值类型的名称、category 和 units',
    ' */',
    '',
    "import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';",
    "import type { ALL_NUMBER_CATEGORIES, ALL_UNITS } from '../data/numberTypeCategory';",
    '',
    '// ==================== NumberTypes 名称 ====================',
    '',
    'export type CSSNumberTypeName = typeof ALL_NUMBER_TYPES[number];',
    '',
    '// ==================== Number Categories ====================',
    '',
    'export type CSSNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];',
    '',
    '// ==================== Units ====================',
    '',
    'export type CSSNumberUnitName = typeof ALL_UNITS[number];',
    '',
  ];

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating NumberTypes type definitions...\n');

  const code = generateNumberTypesFile();

  fs.writeFileSync(path.join(typesDir, 'numberTypes.d.ts'), code);
  console.log('✅ src/types/numberTypes.d.ts');

  console.log('\n✨ NumberTypes type definition generation completed!');
}

main();
