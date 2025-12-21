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
  type GeneratorOptions,
  type AtomDefinition,
} from './atomcss-generator.ts';
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
 * 用户项目中：node_modules/cssts-ts/@types
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
  
  // 导入数值属性类型
  for (const prop of numberProperties.sort()) {
    const typeName = prop.charAt(0).toUpperCase() + prop.slice(1) + 'Atoms';
    lines.push(`export { ${typeName} } from './${prop}';`);
  }
  
  // 导入 colors 类型
  if (hasColors) {
    lines.push(`export { ColorsAtoms } from './colors';`);
  }
  
  // 导入 keywords 类型
  if (hasKeywords) {
    lines.push(`export { KeywordsAtoms } from './keywords';`);
  }
  
  lines.push('');
  
  // 生成聚合类型
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
    
    // 分类：number > color > keywords
    const numberProperties: string[] = [];
    const colorAtoms: AtomDefinition[] = [];
    const keywordAtoms: AtomDefinition[] = [];
    
    for (const [propName, atoms] of Object.entries(atomsByProperty)) {
      // 1. 检查是否有 number 数据
      const hasNumber = atoms.some(atom => atom.number !== undefined);
      
      if (hasNumber) {
        // 有 number 数据 → 单独文件
        numberProperties.push(propName);
        const propDts = generatePropertyDts(propName, atoms);
        const propPath = path.join(cssTypeDir, `${propName}.d.ts`);
        fs.writeFileSync(propPath, propDts, 'utf-8');
        files.push(propPath);
      } else {
        // 2. 检查是否是颜色属性（在 PROPERTY_COLOR_TYPES_MAP 中存在）
        const isColorProperty = propName in PROPERTY_COLOR_TYPES_MAP;
        
        if (isColorProperty) {
          // 颜色属性 → colors.d.ts
          colorAtoms.push(...atoms);
        } else {
          // 其他 → keywords.d.ts
          keywordAtoms.push(...atoms);
        }
      }
    }
    
    log(`   ✅ 生成 ${numberProperties.length} 个数值属性文件`);
    
    // 生成 colors.d.ts
    if (colorAtoms.length > 0) {
      const colorsDts = generatePropertyDts('colors', colorAtoms);
      const colorsPath = path.join(cssTypeDir, 'colors.d.ts');
      fs.writeFileSync(colorsPath, colorsDts, 'utf-8');
      files.push(colorsPath);
      log(`   ✅ 生成 colors.d.ts (${colorAtoms.length} 个原子类)`);
    }
    
    // 生成 keywords.d.ts
    if (keywordAtoms.length > 0) {
      const keywordsDts = generatePropertyDts('keywords', keywordAtoms);
      const keywordsPath = path.join(cssTypeDir, 'keywords.d.ts');
      fs.writeFileSync(keywordsPath, keywordsDts, 'utf-8');
      files.push(keywordsPath);
      log(`   ✅ 生成 keywords.d.ts (${keywordAtoms.length} 个原子类)`);
    }
    
    // 生成索引文件
    const indexDts = generateIndexDtsWithCategories(
      numberProperties,
      keywordAtoms.length > 0,
      colorAtoms.length > 0
    );
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


