/**
 * 生成 .d.ts 文件
 * 
 * 提供方法供 vite 插件调用
 * 
 * @example
 * import { generateDtsFiles } from 'cssts-compiler';
 * generateDtsFiles({ outputDir: '/path/to/output' });
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  generateDts,
  generateStats,
  generateAtomsByProperty,
  generatePropertyDts,
  generateIndexDts,
  type GeneratorOptions,
} from './atomcss-generator.ts';

// ==================== 类型定义 ====================

/** 生成选项 */
export interface DtsGenerateOptions extends GeneratorOptions {
  /** 输出目录（绝对路径），默认为 node_modules/cssts-ts/@types */
  outputDir?: string;
  /** 是否生成分文件版本，默认 true */
  splitFiles?: boolean;
  /** 是否打印日志，默认 false */
  verbose?: boolean;
}

/** 生成结果 */
export interface DtsGenerateResult {
  /** 生成的文件列表 */
  files: string[];
  /** 统计信息 */
  stats: {
    totalAtoms: number;
    propertyCount: number;
    categoryCount: number;
  };
}

// ==================== 核心方法 ====================

/**
 * 获取默认输出目录
 * 用户项目中：node_modules/cssts-ts/@types
 */
function getDefaultOutputDir(): string {
  return path.resolve(process.cwd(), 'node_modules/cssts-ts/@types');
}

/**
 * 生成 DTS 文件到指定目录
 * 
 * @example
 * // 使用默认目录（node_modules/cssts-ts/@types）
 * generateDtsFiles();
 * 
 * // 指定输出目录
 * generateDtsFiles({
 *   outputDir: path.resolve(process.cwd(), 'types'),
 *   config: userConfig,
 * });
 */
export function generateDtsFiles(options?: DtsGenerateOptions): DtsGenerateResult {
  const {
    outputDir = getDefaultOutputDir(),
    splitFiles = true,
    verbose = false,
    config,
  } = options ?? {};
  const generatorOptions = config ? { config } : undefined;
  
  const files: string[] = [];
  const log = verbose ? console.log : () => {};
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  log('🚀 开始生成 .d.ts 文件...\n');
  
  // 生成统计信息
  const stats = generateStats(generatorOptions);
  log(`📊 统计信息:`);
  log(`   总原子类数: ${stats.totalAtoms}`);
  log(`   属性数: ${Object.keys(stats.byProperty).length}`);
  log(`   单位类型数: ${Object.keys(stats.byCategory).length}`);
  
  if (splitFiles) {
    // 分文件版本
    const cssTypeDir = path.join(outputDir, 'cssType');
    if (!fs.existsSync(cssTypeDir)) {
      fs.mkdirSync(cssTypeDir, { recursive: true });
    }
    
    log('\n📁 生成分文件版本 (cssType/)...');
    
    const atomsByProperty = generateAtomsByProperty(generatorOptions);
    const propertyNames = Object.keys(atomsByProperty).sort();
    
    // 为每个属性生成单独的文件
    for (const [propName, atoms] of Object.entries(atomsByProperty)) {
      const propDts = generatePropertyDts(propName, atoms);
      const propPath = path.join(cssTypeDir, `${propName}.d.ts`);
      fs.writeFileSync(propPath, propDts, 'utf-8');
      files.push(propPath);
    }
    log(`   ✅ 生成 ${propertyNames.length} 个属性文件`);
    
    // 生成索引文件
    const indexDts = generateIndexDts(propertyNames);
    const indexPath = path.join(cssTypeDir, 'index.d.ts');
    fs.writeFileSync(indexPath, indexDts, 'utf-8');
    files.push(indexPath);
    log(`   ✅ 生成索引文件: index.d.ts`);
  } else {
    // 单文件版本
    const dtsContent = generateDts(generatorOptions);
    const singleFilePath = path.join(outputDir, 'CsstsAtoms.d.ts');
    fs.writeFileSync(singleFilePath, dtsContent, 'utf-8');
    files.push(singleFilePath);
    log(`✅ 单文件版本: ${singleFilePath}`);
  }
  
  log('\n🎉 生成完成!');
  
  return {
    files,
    stats: {
      totalAtoms: stats.totalAtoms,
      propertyCount: Object.keys(stats.byProperty).length,
      categoryCount: Object.keys(stats.byCategory).length,
    },
  };
}


