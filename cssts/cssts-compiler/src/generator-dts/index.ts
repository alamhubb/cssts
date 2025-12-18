/**
 * .d.ts 生成器入口
 * 
 * 根据 config/ 中的配置生成用户使用的类型定义文件
 * 
 * 运行: npx tsx src/generator-dts/index.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CsstsConfig } from '../cssts-config.js';
import { generateAtoms } from './atom-generator.js';
import {
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
} from './dts-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 默认输出到 cssts-compiler/types/
const DEFAULT_OUT_DIR = path.resolve(__dirname, '../../types');

export interface GeneratorOptions {
  /** 输出目录，默认为 cssts-compiler/types/ */
  outDir?: string;
  /** 配置 */
  config?: CsstsConfig;
  /** 是否输出调试信息 */
  debug?: boolean;
}

/**
 * 异步生成 .d.ts 文件
 */
export async function generateDtsAsync(options: GeneratorOptions = {}): Promise<string[]> {
  const outDir = options.outDir ?? DEFAULT_OUT_DIR;
  const config = options.config ?? new CsstsConfig();
  const debug = options.debug ?? false;
  const atoms = generateAtoms(config, debug);
  
  if (debug) {
    console.log(`\n📦 Total atoms generated: ${atoms.length}`);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files: string[] = [];

  const atomsDtsPath = path.join(outDir, 'CsstsAtoms.d.ts');
  await fs.promises.writeFile(atomsDtsPath, generateCsstsAtomsDts(atoms));
  files.push(atomsDtsPath);

  const globalDtsPath = path.join(outDir, 'global.d.ts');
  await fs.promises.writeFile(globalDtsPath, generateGlobalDts(atoms));
  files.push(globalDtsPath);

  const runtimeDtsPath = path.join(outDir, 'runtime.d.ts');
  await fs.promises.writeFile(runtimeDtsPath, generateRuntimeDts());
  files.push(runtimeDtsPath);

  const indexDtsPath = path.join(outDir, 'index.d.ts');
  await fs.promises.writeFile(indexDtsPath, generateIndexDts());
  files.push(indexDtsPath);

  return files;
}

// 导出生成器函数
export { generateAtoms, generatePropertiesJson } from './atom-generator.js';
export type { AtomDefinition } from './atom-generator.js';
export {
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
} from './dts-generator.js';

// 直接运行时执行生成
async function main() {
  console.log('Generating .d.ts files...');
  const dtsFiles = await generateDtsAsync({ debug: true });
  for (const file of dtsFiles) {
    console.log(`✅ Generated: ${file}`);
  }
  console.log('\nDone!');
}

main().catch(console.error);
