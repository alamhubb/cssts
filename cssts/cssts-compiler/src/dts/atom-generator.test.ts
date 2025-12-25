/**
 * Atom Generator 测试
 * 
 * 运行方式：tsx src/dts/atom-generator.test.ts
 */

import { generateAtoms, generateDts, generateStats } from './atom-generator.ts';

console.log('🧪 Atom Generator 测试\n');

// ==================== 测试 1：使用默认配置生成 ====================
console.log('==================== 测试 1：默认配置 ====================\n');

const stats = generateStats();
console.log(`📊 总原子类数: ${stats.totalAtoms}`);
console.log('\n按属性统计:');
Object.entries(stats.byProperty).forEach(([prop, count]) => {
  console.log(`  ${prop}: ${count}`);
});

console.log('\n按单位统计:');
Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

// ==================== 测试 2：检查 top 属性的原子类 ====================
console.log('\n==================== 测试 2：检查 top 属性原子类 ====================\n');

const atoms = generateAtoms();
const topAtoms = atoms.filter(a => a.property === 'top');
console.log(`top 原子类数: ${topAtoms.length}`);

// 按单位分组显示
const byUnit: Record<string, typeof atoms> = {};
topAtoms.forEach(atom => {
  const unit = atom.unit || 'keyword';
  if (!byUnit[unit]) byUnit[unit] = [];
  byUnit[unit].push(atom);
});

console.log('\n各单位的原子类数量:');
Object.entries(byUnit).forEach(([unit, unitAtoms]) => {
  console.log(`  ${unit}: ${unitAtoms.length}`);
});

// 显示 px 单位的前 20 个
console.log('\npx 单位前 20 个:');
byUnit['px']?.slice(0, 20).forEach(atom => {
  console.log(`  ${atom.name} → ${atom.value}`);
});

// 显示负数的 px
console.log('\npx 单位负数:');
byUnit['px']?.filter(a => a.number! < 0).slice(0, 10).forEach(atom => {
  console.log(`  ${atom.name} → ${atom.value}`);
});

// 显示 keyword
console.log('\nkeyword:');
byUnit['keyword']?.forEach(atom => {
  console.log(`  ${atom.name} → ${atom.value}`);
});

// ==================== 测试 3：DTS 内容预览 ====================
console.log('\n==================== 测试 3：DTS 内容预览 ====================\n');

const dts = generateDts();
const dtsLines = dts.split('\n');
console.log('DTS 文件前 20 行:');
dtsLines.slice(0, 20).forEach(line => console.log(line));
console.log('...');
console.log(`\n总行数: ${dtsLines.length}`);

console.log('\n✅ 测试完成!');
