/**
 * 使用自定义配置生成 .d.ts 文件示例
 */

import { CsstsConfig } from '../cssts-config.js';
import { generateAtoms } from '../scripts/generator-dts/atom-generator.js';

// 创建精简配置
const config = new CsstsConfig({
  // 只生成最常用的属性
  includeProperties: [
    'width', 'height', 'margin', 'padding',
    'display', 'flexDirection', 'justifyContent', 'alignItems',
    'color', 'backgroundColor',
  ],
  // 只使用 px 和百分比
  includeUnitCategories: ['px', 'percentage'],
  // 精简数值
  unitCategories: {
    px: { presets: [0, 4, 8, 16, 32, 64] },
    percentage: { presets: [0, 50, 100] },
  },
});

// 生成原子类
const atoms = generateAtoms(config, true);

console.log(`\n📊 使用自定义配置生成了 ${atoms.length} 个原子类`);
console.log('\n前 20 个原子类:');
atoms.slice(0, 20).forEach(atom => {
  console.log(`  ${atom.name}: ${atom.property}: ${atom.value}`);
});
