/**
 * DTS 文件写入器
 * 
 * 将原子类定义写入 .d.ts 文件，供 vite 插件调用
 * 
 * @example
 * import { generateDtsFiles } from 'cssts-compiler';
 * generateDtsFiles({ outputDir: 'node_modules/@types/cssts-ts' });
 */

import * as fs from 'fs';
import * as path from 'path';
import { ConfigLookup } from '../config/ConfigLookup';
import {
  generateDts,
  generateAtoms,
  generateStats,
  generateAtomsByProperty,
  generateGroupAtoms,
  generateGroupAtomsDts,
  generatePseudoAtoms,
  generatePseudoDts,
  generateClassGroupAtoms,
  generateClassGroupDts,
  generateCssClassName,
  type AtomDefinition,
  type GroupAtomDefinition,
  type PseudoAtomDefinition,
  type ClassGroupAtomDefinition,
} from './atom-generator.ts';
import { PROPERTY_COLOR_TYPES_MAP } from '../data/cssPropertyColorTypes';
import type { CsstsCompilerConfig } from '../config/types/csstsConfig';
import { RuntimeStore } from '../store/RuntimeStore';

// ==================== 类型定义 ====================

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
  return path.resolve(process.cwd(), 'node_modules/@types/cssts-ts');
}

/** camelCase 转 kebab-case */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 生成虚拟模块的类型声明文件内容
 * 
 * @param usedAtomNames - 使用的原子类名称集合（可选，如果不传则生成空壳）
 * @returns DTS 内容
 */
export function generateModulesDts(): string {
  // 初始化时生成空壳，实际内容由 LSP 在转换代码时动态更新

  // 生成空壳（初始化时使用）
  const lines: string[] = [
    '/**',
    ' * CSSTS 虚拟模块类型声明（自动生成）',
    ' */',
    '',
    "declare module 'virtual:cssts.css' {}",
    '',
    "declare module 'virtual:csstsAtom' {",
    '  export const csstsAtom: {}',
    '  export default csstsAtom',
    '}',
    '',
  ];

  return lines.join('\n');
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
    const cssClassName = generateCssClassName(atom, ConfigLookup.classPrefix);
    const kebabProperty = camelToKebab(atom.property);
    lines.push(`declare const ${atom.name}: { '${cssClassName}': '${kebabProperty}' };`);
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
 * 使用传入的数据生成伪类 DTS 内容
 */
function generatePseudoDtsFromData(pseudos: PseudoAtomDefinition[]): string {
  const prefix = ConfigLookup.classPrefix;
  const lines: string[] = [
    '',
    '// ==================== 伪类原子类 ====================',
    '// 用于 $$hover/$$active 等伪类语法',
    '',
  ];

  for (const atom of pseudos) {
    const fullClassName = `${prefix}${atom.className}`;
    lines.push(`declare const ${atom.name}: { '${fullClassName}': ':${atom.pseudo}' };`);
  }

  return lines.join('\n');
}

/**
 * 使用传入的数据生成类组合 DTS 内容
 */
function generateClassGroupDtsFromData(classGroups: ClassGroupAtomDefinition[]): string {
  const prefix = ConfigLookup.classPrefix;
  const lines: string[] = [
    '',
    '// ==================== 类组合原子类 ====================',
    '// 用于 classGroup 配置',
    '',
  ];

  for (const atom of classGroups) {
    const fullClassName = `${prefix}${atom.className}`;
    lines.push(`declare const ${atom.name}: { '${fullClassName}': true };`);
  }

  return lines.join('\n');
}

/**
 * 使用传入的数据生成单文件 DTS 内容
 */
function generateDtsFromData(
  atoms: AtomDefinition[],
  pseudos: PseudoAtomDefinition[],
  classGroups: ClassGroupAtomDefinition[]
): string {
  const prefix = ConfigLookup.classPrefix;

  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类全局常量声明（自动生成）',
    ' * ',
    ' * 这些全局常量用于 css { } 语法中的 IDE 自动补全',
    ' */',
    '',
  ];

  for (const atom of atoms) {
    const cssClassName = generateCssClassName(atom, prefix);
    const kebabProperty = camelToKebab(atom.property);
    lines.push(`declare const ${atom.name}: { '${cssClassName}': '${kebabProperty}' };`);
  }

  // 添加伪类
  if (pseudos.length > 0) {
    lines.push(generatePseudoDtsFromData(pseudos));
  }

  // 添加类组合
  if (classGroups.length > 0) {
    lines.push(generateClassGroupDtsFromData(classGroups));
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * DTS 生成工具函数
 * 
 * 职责：接收完整数据，生成 .d.ts 文件
 * 
 * @param params - 生成参数
 * @param params.config - 配置
 * @param params.atoms - 普通原子类完整定义
 * @param params.groups - Group 原子类完整定义
 * @param params.pseudos - 伪类原子类完整定义
 * @param params.classGroups - 类组合完整定义
 * @returns 生成结果
 */
export function generateDtsFiles(params: {
  config?: Partial<CsstsCompilerConfig>
  atoms: AtomDefinition[]
  groups: GroupAtomDefinition[]
  pseudos: PseudoAtomDefinition[]
  classGroups: ClassGroupAtomDefinition[]
}): DtsGenerateResult {
  const { config, atoms, groups, pseudos, classGroups } = params;

  // 从 config 中读取配置
  const outputDir = config?.dtsOutputDir ?? getDefaultOutputDir();
  const splitFiles = config?.dtsSplitFiles ?? false;
  const debug = config?.debug ?? false;

  const files: string[] = [];
  const log = debug ? console.log : () => { };

  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  log('[cssts] 开始生成类型定义文件...');

  // 使用传入的数据生成统计信息
  const stats = {
    totalAtoms: atoms.length,
    byProperty: {} as Record<string, number>,
    byCategory: {} as Record<string, number>
  };

  for (const atom of atoms) {
    stats.byProperty[atom.property] = (stats.byProperty[atom.property] || 0) + 1;
    const category = atom.unit || 'keyword';
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
  }
  // 生成 package.json
  const packageJson = {
    name: '@types/cssts-ts',
    version: '0.0.0',
    types: 'index.d.ts'
  };
  const packageJsonPath = path.join(outputDir, 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  files.push(packageJsonPath);

  // 非 Vite 环境：生成 modules.d.ts（虚拟模块类型声明，初始为空壳）
  // 实际内容由 LSP 在转换代码时动态更新
  if (!RuntimeStore.isViteEnvironment()) {
    const modulesDts = generateModulesDts();  // 不传参数，生成空壳
    const modulesPath = path.join(outputDir, 'modules.d.ts');
    fs.writeFileSync(modulesPath, modulesDts, 'utf-8');
    files.push(modulesPath);
    log('   ✅ 生成 modules.d.ts（虚拟模块类型声明，初始为空壳）');
  }

  if (splitFiles) {
    log('\n📁 生成分文件版本...');

    // 使用传入的 atoms 数据，按属性分组
    const atomsByProperty: Record<string, AtomDefinition[]> = {};
    for (const atom of atoms) {
      if (!atomsByProperty[atom.property]) {
        atomsByProperty[atom.property] = [];
      }
      atomsByProperty[atom.property].push(atom);
    }

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

    // 使用传入的 groups 数据
    if (groups.length > 0) {
      // 分离数值类型和关键字类型的 group atoms
      const numberGroupAtoms = groups.filter(a => a.isNumber);
      const keywordGroupAtoms = groups.filter(a => !a.isNumber);

      // 数值类型 group：按 groupName 分文件
      if (numberGroupAtoms.length > 0) {
        // 按 groupName 分组（从 atom.name 提取，去掉数值后缀）
        const numberGroupsByName: Record<string, GroupAtomDefinition[]> = {};
        for (const atom of numberGroupAtoms) {
          // 从 atom.name 提取 groupName（去掉数值和单位后缀，包括负数前缀 N）
          // marginX10px → marginX, marginXN10px → marginX
          const match = atom.name.match(/^([a-zA-Z]+?)(?:N?\d|$)/);
          const groupName = match ? match[1] : atom.name.replace(/N?\d.*$/, '');
          if (!numberGroupsByName[groupName]) {
            numberGroupsByName[groupName] = [];
          }
          numberGroupsByName[groupName].push(atom);
        }

        for (const [groupName, atoms] of Object.entries(numberGroupsByName)) {
          const groupDts = generateGroupAtomsDts(atoms);
          const fileName = `${groupName}.d.ts`;
          const groupPath = path.join(outputDir, fileName);
          fs.writeFileSync(groupPath, groupDts, 'utf-8');
          files.push(groupPath);
          generatedFileNames.push(fileName);
          log(`   ✅ 生成 ${fileName} (${atoms.length} 个组合原子类)`);
        }
      }

      // 关键字类型 group：放一个文件
      if (keywordGroupAtoms.length > 0) {
        const keywordGroupsDts = generateGroupAtomsDts(keywordGroupAtoms);
        const fileName = 'groups-keyword.d.ts';
        const groupsPath = path.join(outputDir, fileName);
        fs.writeFileSync(groupsPath, keywordGroupsDts, 'utf-8');
        files.push(groupsPath);
        generatedFileNames.push(fileName);
        log(`   ✅ 生成 groups-keyword.d.ts (${keywordGroupAtoms.length} 个组合原子类)`);
      }
    }

    // 使用传入的 pseudos 数据
    if (pseudos.length > 0) {
      const pseudoDts = generatePseudoDtsFromData(pseudos);
      const fileName = 'pseudo.d.ts';
      const pseudoPath = path.join(outputDir, fileName);
      fs.writeFileSync(pseudoPath, pseudoDts, 'utf-8');
      files.push(pseudoPath);
      generatedFileNames.push(fileName);
      log(`   ✅ 生成 pseudo.d.ts (${pseudos.length} 个伪类原子类)`);
    }

    // 使用传入的 classGroups 数据
    if (classGroups.length > 0) {
      const classGroupDts = generateClassGroupDtsFromData(classGroups);
      const fileName = 'classGroup.d.ts';
      const classGroupPath = path.join(outputDir, fileName);
      fs.writeFileSync(classGroupPath, classGroupDts, 'utf-8');
      files.push(classGroupPath);
      generatedFileNames.push(fileName);
      log(`   ✅ 生成 classGroup.d.ts (${classGroups.length} 个类组合原子类)`);
    }

    // 生成 index.d.ts（使用 reference 引入所有分文件）
    const indexDts = generateIndexDtsWithReferences(generatedFileNames);
    const indexPath = path.join(outputDir, 'index.d.ts');
    fs.writeFileSync(indexPath, indexDts, 'utf-8');
    files.push(indexPath);
    log(`   ✅ 生成索引文件: index.d.ts`);
  } else {
    // 单文件模式：使用传入的数据生成
    let dtsContent = generateDtsFromData(atoms, pseudos, classGroups);

    // 添加 group atoms
    if (groups.length > 0) {
      dtsContent += '\n' + generateGroupAtomsDts(groups);
    }

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
