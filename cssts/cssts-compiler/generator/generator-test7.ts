/**
 * NumberType 和 Category 映射生成脚本
 *
 * 基于 numberMapping.json 生成：
 * - numberTypeCategory.ts: numberType 和 category 的映射，以及所有 category 的列表
 *
 * 运行方式：npx tsx generator/generator-test7.ts
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

// ==================== 读取 numberMapping.json ====================

function loadNumberMapping(): any {
  const mappingPath = path.join(__dirname, 'datajson', 'numberMapping.json');
  const content = fs.readFileSync(mappingPath, 'utf-8');
  return JSON.parse(content);
}

// ==================== 生成 numberTypeCategory.ts ====================

function generateNumberTypeCategoryFile(mapping: any): string {
  const lines: string[] = [
    '/**',
    ' * NumberType 和 Category 映射（自动生成）',
    ' *',
    ' * 包含：',
    ' * - 每个 unit 的常量',
    ' * - 每个 numberType 对应的 category 列表',
    ' * - 所有 category 的列表',
    ' * - category 到 units 的映射',
    ' */',
    '',
  ];

  const numberTypes = mapping.numberTypes as Record<string, string[]>;
  const categories = mapping.categories as Record<string, string[]>;
  const allCategories = Object.keys(categories).sort();

  // 收集所有 units
  const allUnits = new Set<string>();
  for (const units of Object.values(categories)) {
    (units as string[]).forEach(u => allUnits.add(u));
  }
  const sortedUnits = Array.from(allUnits).sort();

  // 生成每个 unit 的常量
  lines.push('// ==================== 所有 Units ====================', '');
  for (const unit of sortedUnits) {
    let constName: string;
    if (unit === '') {
      constName = 'UNITLESS';
    } else if (unit === '%') {
      constName = 'PERCENT';
    } else {
      constName = unit.toUpperCase();
    }
    lines.push(`export const UNIT_${constName} = '${unit}' as const;`);
  }
  lines.push('');

  // NumberType 到 Category 的映射
  lines.push('// ==================== NumberType 到 Category 映射 ====================', '');
  for (const [numberType, cats] of Object.entries(numberTypes)) {
    const constName = numberType.toUpperCase();
    const categoriesStr = (cats as string[]).map(c => `'${c}'`).join(', ');
    lines.push(`export const ${constName}_CATEGORIES = [${categoriesStr}] as const;`);
  }

  lines.push('');
  lines.push('export const NUMBER_TYPE_CATEGORY_MAP: Record<string, readonly string[]> = {');
  
  for (const [numberType, cats] of Object.entries(numberTypes)) {
    const constName = numberType.toUpperCase();
    lines.push(`  '${numberType}': ${constName}_CATEGORIES,`);
  }
  
  lines.push('};', '');

  // 所有 Category
  lines.push('// ==================== 所有 Number Categories ====================', '');
  lines.push('export const ALL_NUMBER_CATEGORIES = [');
  allCategories.forEach(category => {
    lines.push(`  '${category}',`);
  });
  lines.push('] as const;', '');

  // Category 到 Units 的映射（使用 unit 常量）
  lines.push('// ==================== Category 到 Units 映射 ====================', '');
  lines.push('export const CATEGORY_UNITS_MAP: Record<string, readonly string[]> = {');
  
  for (const [category, units] of Object.entries(categories)) {
    const unitRefs = (units as string[]).map(u => {
      let constName: string;
      if (u === '') {
        constName = 'UNITLESS';
      } else if (u === '%') {
        constName = 'PERCENT';
      } else {
        constName = u.toUpperCase();
      }
      return `UNIT_${constName}`;
    }).join(', ');
    lines.push(`  '${category}': [${unitRefs}],`);
  }
  
  lines.push('};', '');

  // 所有 Units 数组（使用 unit 常量）
  lines.push('// ==================== 所有 Units 数组 ====================', '');
  const unitRefs = sortedUnits.map(u => {
    let constName: string;
    if (u === '') {
      constName = 'UNITLESS';
    } else if (u === '%') {
      constName = 'PERCENT';
    } else {
      constName = u.toUpperCase();
    }
    return `UNIT_${constName}`;
  }).join(', ');
  lines.push(`export const ALL_UNITS = [${unitRefs}] as const;`, '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating NumberType and Category mapping file...\n');

  const mapping = loadNumberMapping();

  const numberTypeCategoryCode = generateNumberTypeCategoryFile(mapping);
  fs.writeFileSync(path.join(dataDir, 'numberTypeCategory.ts'), numberTypeCategoryCode);
  console.log('✅ src/data/numberTypeCategory.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Number Types: ${Object.keys(mapping.numberTypes).length}`);
  console.log(`   Categories: ${Object.keys(mapping.categories).length}`);
  console.log('\n✨ NumberType and Category mapping generation completed!');
}

main();
