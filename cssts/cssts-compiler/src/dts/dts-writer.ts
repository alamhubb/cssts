/**
 * DTS 文件写入器
 * 
 * 将原子类定义写入 .d.ts 文件，供 vite 插件调用
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
  type GeneratorOptions,
  type AtomDefinition,
} from './atom-generator.ts';
import { PROPERTY_COLOR_TYPES_MAP } from '../data/cssPropertyColorTypes';

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
 */
function getDefaultOutputDir(): string {
  return path.resolve(process.cwd(), 'node_modules/cssts-ts/@types');
}

/**
 * 生成索引文件内容（支持 keywords 和 colors）
 */
function generateIndexDtsWithCategories(
  numberProperties: string[],
  hasKeywords: boolean,
  hasColors: boolean
): string {
  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类类型定义索引（自动生成）',
    ' */',
    '',
  ];
  
  for (const prop of numberProperties.sort()) {
    const typeName = prop.charAt(0).toUpperCase() + prop.slice(1) + 'Atoms';
    lines.push(`export { ${typeName} } from './${prop}';`);
  }
  
  if (hasColors) {
    lines.push(`export { ColorsAtoms } from './colors';`);
  }
  
  if (hasKeywords) {
    lines.push(`export { KeywordsAtoms } from './keywords';`);
  }
  
  lines.push('');
  lines.push('/** 所有原子类类型 */');
  lines.push('export interface CsstsAtoms extends');
  
  const typeNames = numberProperties.sort().map(p => p.charAt(0).toUpperCase() + p.slice(1) + 'Atoms');
  if (hasColors) {
    typeNames.push('ColorsAtoms');
  }
  if (hasKeywords) {
    typeNames.push('KeywordsAtoms');
  }
  
  for (let i = 0; i < typeNames.length; i++) {
    const isLast = i === typeNames.length - 1;
    lines.push(`  ${typeNames[i]}${isLast ? ' {}' : ','}`);
  }
  
  lines.push('');
  
  return lines.join('\n');
}

/**
 * 生成 DTS 文件到指定目录
 * 
 * 分类优先级：number > color > keywords
 * - 有 number 数据 → 单独文件（如 width.d.ts）
 * - 无 number，有 colorTypes → colors.d.ts
 * - 无 number，无 colorTypes → keywords.d.ts
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
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  log('🚀 开始生成 .d.ts 文件...\n');
  
  const stats = generateStats(generatorOptions);
  log(`📊 统计信息:`);
  log(`   总原子类数: ${stats.totalAtoms}`);
  log(`   属性数: ${Object.keys(stats.byProperty).length}`);
  log(`   单位类型数: ${Object.keys(stats.byCategory).length}`);
  
  if (splitFiles) {
    const csstsDtsDir = path.join(outputDir, 'cssts-dts');
    if (!fs.existsSync(csstsDtsDir)) {
      fs.mkdirSync(csstsDtsDir, { recursive: true });
    }
    
    log('\n📁 生成分文件版本 (cssts-dts/)...');
    
    const atomsByProperty = generateAtomsByProperty(generatorOptions);
    
    const numberProperties: string[] = [];
    const colorAtoms: AtomDefinition[] = [];
    const keywordAtoms: AtomDefinition[] = [];
    
    for (const [propName, atoms] of Object.entries(atomsByProperty)) {
      const hasNumber = atoms.some(atom => atom.number !== undefined);
      
      if (hasNumber) {
        numberProperties.push(propName);
        const propDts = generatePropertyDts(propName, atoms);
        const propPath = path.join(csstsDtsDir, `${propName}.d.ts`);
        fs.writeFileSync(propPath, propDts, 'utf-8');
        files.push(propPath);
      } else {
        const isColorProperty = propName in PROPERTY_COLOR_TYPES_MAP;
        
        if (isColorProperty) {
          colorAtoms.push(...atoms);
        } else {
          keywordAtoms.push(...atoms);
        }
      }
    }
    
    log(`   ✅ 生成 ${numberProperties.length} 个数值属性文件`);
    
    if (colorAtoms.length > 0) {
      const colorsDts = generatePropertyDts('colors', colorAtoms);
      const colorsPath = path.join(csstsDtsDir, 'colors.d.ts');
      fs.writeFileSync(colorsPath, colorsDts, 'utf-8');
      files.push(colorsPath);
      log(`   ✅ 生成 colors.d.ts (${colorAtoms.length} 个原子类)`);
    }
    
    if (keywordAtoms.length > 0) {
      const keywordsDts = generatePropertyDts('keywords', keywordAtoms);
      const keywordsPath = path.join(csstsDtsDir, 'keywords.d.ts');
      fs.writeFileSync(keywordsPath, keywordsDts, 'utf-8');
      files.push(keywordsPath);
      log(`   ✅ 生成 keywords.d.ts (${keywordAtoms.length} 个原子类)`);
    }
    
    const indexDts = generateIndexDtsWithCategories(
      numberProperties,
      keywordAtoms.length > 0,
      colorAtoms.length > 0
    );
    const indexPath = path.join(csstsDtsDir, 'index.d.ts');
    fs.writeFileSync(indexPath, indexDts, 'utf-8');
    files.push(indexPath);
    log(`   ✅ 生成索引文件: index.d.ts`);
  } else {
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
