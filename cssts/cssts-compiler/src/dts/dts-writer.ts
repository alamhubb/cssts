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
  generateStats,
  generateAtomsByProperty,
  type GeneratorOptions,
  type AtomDefinition,
} from './atom-generator.ts';
import { PROPERTY_COLOR_TYPES_MAP } from '../data/cssPropertyColorTypes';

// ==================== 类型定义 ====================

/** 生成选项 */
export interface DtsGenerateOptions extends GeneratorOptions {
  /** 输出目录（绝对路径），默认为 node_modules/@types/cssts */
  outputDir?: string;
  /** 是否生成分文件版本，默认 false */
  splitFiles?: boolean;
  /** 是否打印日志，默认 false */
  verbose?: boolean;
}

/** 生成结果 */
export interface DtsGenerateResult {
  /** 生成的文件列表 */
  files: string[];
  /** 原子类数量 */
  atomCount: number;
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
 */
function getDefaultOutputDir(): string {
  return path.resolve(process.cwd(), 'node_modules/@types/cssts');
}

/** camelCase 转 kebab-case */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** 生成 CSS 类名（property_value 格式） */
function generateCssClassName(atom: AtomDefinition): string {
  return `${camelToKebab(atom.property)}_${atom.value}`;
}

/**
 * 生成单个属性的全局声明 DTS 内容
 */
function generatePropertyGlobalDts(propertyName: string, atoms: AtomDefinition[]): string {
  const lines: string[] = [
    '/**',
    ` * ${propertyName} 原子类全局常量声明（自动生成）`,
    ' */',
    '',
  ];
  
  for (const atom of atoms) {
    const cssClassName = generateCssClassName(atom);
    lines.push(`declare const ${atom.name}: { '${cssClassName}': true };`);
  }
  
  lines.push('');
  
  return lines.join('\n');
}

/**
 * 生成索引文件内容（使用 reference 引入所有分文件）
 */
function generateIndexDtsWithReferences(fileNames: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类全局常量声明索引（自动生成）',
    ' * ',
    ' * 通过 reference 引入所有分文件，实现全局常量提示',
    ' */',
    '',
  ];
  
  for (const fileName of fileNames.sort()) {
    lines.push(`/// <reference path="./${fileName}" />`);
  }
  
  lines.push('');
  
  return lines.join('\n');
}

/**
 * 生成 DTS 文件到指定目录
 * 
 * 支持两种模式：
 * 1. splitFiles=true（默认）：拆分为多个文件，每个属性一个文件，使用 declare const 全局声明
 * 2. splitFiles=false：单个 index.d.ts 文件
 * 
 * 分类优先级：number > color > keywords
 * - 有 number 数据 → 单独文件（如 width.d.ts）
 * - 无 number，有 colorTypes → colors.d.ts
 * - 无 number，无 colorTypes → keywords.d.ts
 */
export function generateDtsFiles(options?: DtsGenerateOptions): DtsGenerateResult {
  const {
    outputDir = getDefaultOutputDir(),
    splitFiles = false,
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
  
  const stats = generateStats(generatorOptions);
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
  
  if (splitFiles) {
    log('\n📁 生成分文件版本...');
    
    const atomsByProperty = generateAtomsByProperty(generatorOptions);
    
    const generatedFileNames: string[] = [];
    const numberProperties: string[] = [];
    const colorAtoms: AtomDefinition[] = [];
    const keywordAtoms: AtomDefinition[] = [];
    
    for (const [propName, propAtoms] of Object.entries(atomsByProperty)) {
      const hasNumber = propAtoms.some(atom => atom.number !== undefined);
      
      if (hasNumber) {
        numberProperties.push(propName);
        const propDts = generatePropertyGlobalDts(propName, propAtoms);
        const fileName = `${propName}.d.ts`;
        const propPath = path.join(outputDir, fileName);
        fs.writeFileSync(propPath, propDts, 'utf-8');
        files.push(propPath);
        generatedFileNames.push(fileName);
      } else {
        const isColorProperty = propName in PROPERTY_COLOR_TYPES_MAP;
        
        if (isColorProperty) {
          colorAtoms.push(...propAtoms);
        } else {
          keywordAtoms.push(...propAtoms);
        }
      }
    }
    
    log(`   ✅ 生成 ${numberProperties.length} 个数值属性文件`);
    
    if (colorAtoms.length > 0) {
      const colorsDts = generatePropertyGlobalDts('colors', colorAtoms);
      const fileName = 'colors.d.ts';
      const colorsPath = path.join(outputDir, fileName);
      fs.writeFileSync(colorsPath, colorsDts, 'utf-8');
      files.push(colorsPath);
      generatedFileNames.push(fileName);
      log(`   ✅ 生成 colors.d.ts (${colorAtoms.length} 个原子类)`);
    }
    
    if (keywordAtoms.length > 0) {
      const keywordsDts = generatePropertyGlobalDts('keywords', keywordAtoms);
      const fileName = 'keywords.d.ts';
      const keywordsPath = path.join(outputDir, fileName);
      fs.writeFileSync(keywordsPath, keywordsDts, 'utf-8');
      files.push(keywordsPath);
      generatedFileNames.push(fileName);
      log(`   ✅ 生成 keywords.d.ts (${keywordAtoms.length} 个原子类)`);
    }
    
    // 生成 index.d.ts（使用 reference 引入所有分文件）
    const indexDts = generateIndexDtsWithReferences(generatedFileNames);
    const indexPath = path.join(outputDir, 'index.d.ts');
    fs.writeFileSync(indexPath, indexDts, 'utf-8');
    files.push(indexPath);
    log(`   ✅ 生成索引文件: index.d.ts`);
  } else {
    // 单文件模式
    const dtsContent = generateDts(generatorOptions);
    const indexPath = path.join(outputDir, 'index.d.ts');
    fs.writeFileSync(indexPath, dtsContent, 'utf-8');
    files.push(indexPath);
    log(`✅ 单文件版本: ${indexPath}`);
  }
  
  log(`[cssts] 已生成类型定义 (${atoms.length} 个原子类)`);
  
  return {
    files,
    atomCount: atoms.length,
    stats: {
      totalAtoms: stats.totalAtoms,
      propertyCount: Object.keys(stats.byProperty).length,
      categoryCount: Object.keys(stats.byCategory).length,
    },
  };
}
