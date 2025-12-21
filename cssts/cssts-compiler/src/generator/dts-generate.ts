/**
 * 生成 .d.ts 文件脚本
 * 
 * 运行: npx tsx src/generator/dts-generate.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateDts, generateStats, generateAtomsByProperty, generatePropertyDts, generateIndexDts } from './atomcss-generator.ts';

// ES module 兼容
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const OUTPUT_DIR = path.resolve(__dirname, '../../types');
const CSS_TYPE_DIR = path.join(OUTPUT_DIR, 'cssType');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(CSS_TYPE_DIR)) {
  fs.mkdirSync(CSS_TYPE_DIR, { recursive: true });
}

console.log('🚀 开始生成 .d.ts 文件...\n');

// 生成统计信息
const stats = generateStats();
console.log(`📊 统计信息:`);
console.log(`   总原子类数: ${stats.totalAtoms}`);
console.log(`   属性数: ${Object.keys(stats.byProperty).length}`);
console.log(`   单位类型数: ${Object.keys(stats.byCategory).length}`);
console.log('');

// ==================== 生成单文件版本 ====================
const dtsContent = generateDts();
const singleFilePath = path.join(OUTPUT_DIR, 'CsstsAtoms.d.ts');
fs.writeFileSync(singleFilePath, dtsContent, 'utf-8');
console.log(`✅ 单文件版本: ${singleFilePath}`);

// ==================== 生成分文件版本 ====================
console.log('\n📁 生成分文件版本 (cssType/)...');

const atomsByProperty = generateAtomsByProperty();
const propertyNames = Object.keys(atomsByProperty).sort();

// 为每个属性生成单独的文件
for (const [propName, atoms] of Object.entries(atomsByProperty)) {
  const propDts = generatePropertyDts(propName, atoms);
  const propPath = path.join(CSS_TYPE_DIR, `${propName}.d.ts`);
  fs.writeFileSync(propPath, propDts, 'utf-8');
}
console.log(`   ✅ 生成 ${propertyNames.length} 个属性文件`);

// 生成索引文件
const indexDts = generateIndexDts(propertyNames);
const indexPath = path.join(CSS_TYPE_DIR, 'index.d.ts');
fs.writeFileSync(indexPath, indexDts, 'utf-8');
console.log(`   ✅ 生成索引文件: index.d.ts`);

// 显示前 10 个属性的原子类数量
console.log('\n📋 各属性原子类数量 (前 10):');
const sortedProperties = Object.entries(stats.byProperty)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

for (const [prop, count] of sortedProperties) {
  console.log(`   ${prop}: ${count}`);
}

console.log('\n🎉 生成完成!');

