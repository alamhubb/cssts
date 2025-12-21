/**
 * 生成 .d.ts 文件脚本
 * 
 * 运行: npx tsx src/generator/generate-dts.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateDts, generateStats } from './dts-generator';

// ES module 兼容
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const OUTPUT_DIR = path.resolve(__dirname, '../../types');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🚀 开始生成 .d.ts 文件...\n');

// 生成统计信息
const stats = generateStats();
console.log(`📊 统计信息:`);
console.log(`   总原子类数: ${stats.totalAtoms}`);
console.log(`   属性数: ${Object.keys(stats.byProperty).length}`);
console.log(`   单位类型数: ${Object.keys(stats.byCategory).length}`);
console.log('');

// 生成 DTS 内容
const dtsContent = generateDts();

// 写入文件
const outputPath = path.join(OUTPUT_DIR, 'CsstsAtoms.d.ts');
fs.writeFileSync(outputPath, dtsContent, 'utf-8');

console.log(`✅ 已生成: ${outputPath}`);
console.log(`   文件大小: ${(dtsContent.length / 1024).toFixed(2)} KB`);
console.log(`   总行数: ${dtsContent.split('\n').length}`);
console.log('');

// 显示前 10 个属性的原子类数量
console.log('📋 各属性原子类数量 (前 10):');
const sortedProperties = Object.entries(stats.byProperty)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

for (const [prop, count] of sortedProperties) {
  console.log(`   ${prop}: ${count}`);
}

console.log('\n🎉 生成完成!');
