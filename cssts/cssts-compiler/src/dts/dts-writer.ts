/**
 * DTS 文件写入器
 * 
 * 将原子类定义写入 .d.ts 文件，供 vite 插件调用
 * 
 * @example
 * import { generateDtsFiles } from 'cssts-compiler';
 * generateDtsFiles({ outputDir: 'node_modules/@types/cssts' });
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  generateDts,
  generateAtoms,
  type GeneratorOptions,
} from './atom-generator.ts';

// ==================== 类型定义 ====================

/** 生成选项 */
export interface DtsGenerateOptions extends GeneratorOptions {
  /** 输出目录（绝对路径），默认为 node_modules/@types/cssts */
  outputDir?: string;
  /** 是否打印日志，默认 false */
  verbose?: boolean;
}

/** 生成结果 */
export interface DtsGenerateResult {
  /** 生成的文件列表 */
  files: string[];
  /** 原子类数量 */
  atomCount: number;
}

// ==================== 核心方法 ====================

/**
 * 获取默认输出目录
 */
function getDefaultOutputDir(): string {
  return path.resolve(process.cwd(), 'node_modules/@types/cssts');
}

/**
 * 生成 DTS 文件到指定目录
 * 
 * 生成单个 index.d.ts 文件，包含所有原子类的全局常量声明
 */
export function generateDtsFiles(options?: DtsGenerateOptions): DtsGenerateResult {
  const {
    outputDir = getDefaultOutputDir(),
    verbose = false,
    config,
  } = options ?? {};
  
  const generatorOptions = config ? { config } : undefined;
  const files: string[] = [];
  const log = verbose ? console.log : () => {};
  
  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  log('[cssts] 开始生成类型定义文件...');
  
  // 生成原子类
  const atoms = generateAtoms(generatorOptions);
  
  // 生成 package.json
  const packageJson = {
    name: '@types/cssts',
    version: '0.0.0',
    types: 'index.d.ts'
  };
  const packageJsonPath = path.join(outputDir, 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  files.push(packageJsonPath);
  
  // 生成 index.d.ts（全局常量声明）
  const dtsContent = generateDts(generatorOptions);
  const indexPath = path.join(outputDir, 'index.d.ts');
  fs.writeFileSync(indexPath, dtsContent, 'utf-8');
  files.push(indexPath);
  
  log(`[cssts] 已生成类型定义 (${atoms.length} 个原子类)`);
  
  return {
    files,
    atomCount: atoms.length,
  };
}
