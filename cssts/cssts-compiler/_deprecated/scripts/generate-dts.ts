/**
 * 生成 .d.ts 文件
 * 运行: npx tsx scripts/generate-dts.ts
 * 
 * 注意：properties.json 在 src/data/ 目录下，由 extract-css-data.ts 生成
 */

import { generateDtsAsync } from '../src/generator/index.js';

async function main() {
  console.log('Generating .d.ts files...');
  const dtsFiles = await generateDtsAsync();
  for (const file of dtsFiles) {
    console.log(`✅ Generated: ${file}`);
  }

  console.log('\nDone!');
}

main().catch(console.error);
