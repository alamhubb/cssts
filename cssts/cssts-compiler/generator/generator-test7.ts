/**
 * NumberType 和 Category 映射生成脚本
 *
 * 基于 numberMapping.json 生成：
 * - units.ts: 所有 unit 常量、ALL_UNITS 数组和单位别名映射
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

// ==================== 单位别名映射 ====================

// 用户输入的别名 -> 实际单位名称
const UNIT_ALIAS: Record<string, string> = {
  '': 'unitless',
  '%': 'percent',
};

// ==================== 读取 numberMapping.json ====================

function loadNumberMapping(): any {
  const mappingPath = path.join(__dirname, 'datajson', 'numberMapping.json');
  const content = fs.readFileSync(mappingPath, 'utf-8');
  return JSON.parse(content);
}

// ==================== 工具函数 ====================

/**
 * 将原始单位转换为规范化的单位名称
 * '' -> 'unitless', '%' -> 'percent'
 */
function normalizeUnit(unit: string): string {
  return UNIT_ALIAS[unit] ?? unit;
}

/**
 * 将单位转换为常量名称
 */
function unitToConstName(unit: string): string {
  const normalized = normalizeUnit(unit);
  return normalized.toUpperCase();
}

// ==================== 生成 units.ts ====================

function generateUnitsFile(categories: Record<string, string[]>): string {
  const lines: string[] = [
    '/**',
    ' * CSS 单位常量（自动生成）',
    ' *',
    ' * 包含：',
    ' * - 所有 CSS 单位的常量定义',
    ' * - ALL_UNITS 数组',
    ' * - 单位别名映射（用于运行时转换用户输入）',
    ' */',
    '',
  ];

  // 收集所有 units 并规范化
  const allUnits = new Set<string>();
  for (const units of Object.values(categories)) {
    (units as string[]).forEach(u => allUnits.add(normalizeUnit(u)));
  }
  const sortedUnits = Array.from(allUnits).sort();

  // 生成每个 unit 的常量
  lines.push('// ==================== 所有 Units 常量 ====================', '');
  for (const unit of sortedUnits) {
    const constName = unit.toUpperCase();
    lines.push(`export const UNIT_${constName} = '${unit}' as const;`);
  }
  lines.push('');

  // 所有 Units 数组（使用 unit 常量）
  lines.push('// ==================== 所有 Units 数组 ====================', '');
  const unitRefs = sortedUnits.map(u => `UNIT_${u.toUpperCase()}`).join(', ');
  lines.push(`export const ALL_UNITS = [${unitRefs}] as const;`, '');

  // 单位别名映射
  lines.push('// ==================== 单位别名映射 ====================', '');
  lines.push('/**');
  lines.push(' * 单位别名映射表');
  lines.push(' * key: 用户输入的别名');
  lines.push(' * value: 实际的单位名称');
  lines.push(' */');
  lines.push('export const UNIT_ALIAS_MAP: Record<string, string> = {');
  for (const [alias, unit] of Object.entries(UNIT_ALIAS)) {
    lines.push(`  '${alias}': '${unit}',`);
  }
  lines.push('};', '');

  // 工具函数
  lines.push('/**');
  lines.push(' * 根据别名获取实际单位');
  lines.push(' * @param alias 用户输入的别名');
  lines.push(' * @returns 实际的单位名称，如果没有别名则返回原值');
  lines.push(' */');
  lines.push('export function resolveUnitAlias(alias: string): string {');
  lines.push('  return UNIT_ALIAS_MAP[alias] ?? alias;');
  lines.push('}', '');

  return lines.join('\n');
}

// ==================== 生成 numberTypeCategory.ts ====================

function generateNumberTypeCategoryFile(mapping: any): string {
  const lines: string[] = [
    '/**',
    ' * NumberType 和 Category 映射（自动生成）',
    ' *',
    ' * 包含：',
    ' * - 每个 numberType 对应的 category 列表',
    ' * - 所有 category 的列表',
    ' * - category 到 units 的映射',
    ' */',
    '',
  ];

  const numberTypes = mapping.numberTypes as Record<string, string[]>;
  const categories = mapping.categories as Record<string, string[]>;
  const allCategories = Object.keys(categories).sort();

  // 收集所有 units 用于生成导入（规范化后）
  const allUnits = new Set<string>();
  for (const units of Object.values(categories)) {
    (units as string[]).forEach(u => allUnits.add(normalizeUnit(u)));
  }
  const sortedUnits = Array.from(allUnits).sort();

  // 生成导入语句
  const unitImports = sortedUnits.map(u => `UNIT_${u.toUpperCase()}`).join(', ');
  lines.push(`import { ${unitImports} } from './units';`, '');

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

  // Category 到 Units 的映射（使用 unit 常量，规范化后）
  lines.push('// ==================== Category 到 Units 映射 ====================', '');
  lines.push('export const CATEGORY_UNITS_MAP: Record<string, readonly string[]> = {');
  
  for (const [category, units] of Object.entries(categories)) {
    const unitRefs = (units as string[]).map(u => `UNIT_${normalizeUnit(u).toUpperCase()}`).join(', ');
    lines.push(`  '${category}': [${unitRefs}],`);
  }
  
  lines.push('};', '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成 NumberType 和 Category 映射文件...\n');

  const mapping = loadNumberMapping();

  // 生成 units.ts
  const unitsCode = generateUnitsFile(mapping.categories);
  fs.writeFileSync(path.join(dataDir, 'units.ts'), unitsCode);
  console.log('✅ src/data/units.ts');

  // 生成 numberTypeCategory.ts
  const numberTypeCategoryCode = generateNumberTypeCategoryFile(mapping);
  fs.writeFileSync(path.join(dataDir, 'numberTypeCategory.ts'), numberTypeCategoryCode);
  console.log('✅ src/data/numberTypeCategory.ts');

  // 收集统计信息
  const allUnits = new Set<string>();
  for (const units of Object.values(mapping.categories)) {
    (units as string[]).forEach(u => allUnits.add(normalizeUnit(u)));
  }

  console.log(`\n📊 统计信息:`);
  console.log(`   Number Types: ${Object.keys(mapping.numberTypes).length}`);
  console.log(`   Categories: ${Object.keys(mapping.categories).length}`);
  console.log(`   Units: ${allUnits.size}`);
  console.log('\n✨ 生成完成!');
}

main();
