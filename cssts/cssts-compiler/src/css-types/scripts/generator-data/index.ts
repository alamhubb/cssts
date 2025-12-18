/**
 * 数据生成器入口
 * 
 * 从 csstree 提取数据，生成 data/ 和 config/ 目录下的文件
 * 
 * 运行: npx tsx src/css-types/scripts/generator-data/index.ts
 */

export { generateAll } from './generate-config.js';

// 直接运行时执行生成
import { generateAll } from './generate-config.js';

generateAll();
