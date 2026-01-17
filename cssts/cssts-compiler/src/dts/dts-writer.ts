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
import { generateCsstsAtomEntries } from '../utils/csstsAtomCore';


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

/** DTS 写入上下文 */
interface DtsWriterContext {
  outputDir: string;
  files: string[];
  fileNames: string[];
  log: (msg: string) => void;
  singleFile: boolean;
}

/**
 * 写入文件或返回内容
 * - singleFile=true：返回内容，不写入文件
 * - singleFile=false：写入文件，返回空字符串
 */
function writeOrReturn(
  ctx: DtsWriterContext,
  fileName: string,
  content: string,
  label: string,
  count: number
): string {
  if (ctx.singleFile) {
    return content;
  }
  const filePath = path.join(ctx.outputDir, fileName);
  fs.writeFileSync(filePath, content, 'utf-8');
  ctx.files.push(filePath);
  ctx.fileNames.push(fileName);
  ctx.log(`   ✅ 生成 ${fileName} (${count} 个${label})`);
  return '';
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
 * 生成原子类声明列表（公共方法）
 * @param atoms - 原子类定义列表
 * @returns 声明语句数组
 */
function generateAtomDeclarations(atoms: AtomDefinition[]): string[] {
  const declarations: string[] = [];
  const prefix = ConfigLookup.classPrefix;

  for (const atom of atoms) {
    const cssClassName = generateCssClassName(atom, prefix);
    const kebabProperty = camelToKebab(atom.property);
    declarations.push(`declare const ${atom.name}: { '${cssClassName}': '${kebabProperty}' };`);
  }

  return declarations;
}

/**
 * 生成虚拟模块的类型声明文件内容
 * - 初始化时 RuntimeStore 为空 → 生成 csstsAtom: {}
 * - LSP 运行时 RuntimeStore 有数据 → 生成 csstsAtom: { displayFlex: {...}, ... }
 * 
 * @returns DTS 内容
 */
export function generateModulesDts(): string {
  const usedStyles = RuntimeStore.getUsedStyles();

  const lines: string[] = [
    '/**',
    ' * CSSTS 虚拟模块类型声明（自动生成）',
    ' */',
    '',
    "declare module 'virtual:cssts.css' {}",
    '',
    "declare module 'virtual:csstsAtom' {",
    '  export const csstsAtom: {',
  ];

  // 使用核心方法生成 entries（空 Set 会返回空数组，自动生成空对象）
  const entries = generateCsstsAtomEntries(usedStyles, '    ', ';');

  if (entries.length > 0) {
    lines.push(entries.join('\n'));
  }

  lines.push('  }');
  lines.push('  export default csstsAtom');
  lines.push('}');
  lines.push('');

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

  // 使用公共方法生成声明
  lines.push(...generateAtomDeclarations(atoms));
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

// ==================== 类型生成辅助方法 ====================

/** 生成颜色原子类 DTS */
function generateColorsDts(ctx: DtsWriterContext, atoms: AtomDefinition[]): string {
  if (atoms.length === 0) return '';
  const content = generatePropertyGlobalDts('colors', atoms);
  return writeOrReturn(ctx, 'colors.d.ts', content, '颜色原子类', atoms.length);
}

/** 生成关键字原子类 DTS */
function generateKeywordsDts(ctx: DtsWriterContext, atoms: AtomDefinition[]): string {
  if (atoms.length === 0) return '';
  const content = generatePropertyGlobalDts('keywords', atoms);
  return writeOrReturn(ctx, 'keywords.d.ts', content, '关键字原子类', atoms.length);
}

/** 生成伪类原子类 DTS */
function generatePseudosDts(ctx: DtsWriterContext, pseudos: PseudoAtomDefinition[]): string {
  if (pseudos.length === 0) return '';
  const content = generatePseudoDtsFromData(pseudos);
  return writeOrReturn(ctx, 'pseudo.d.ts', content, '伪类原子类', pseudos.length);
}

/** 生成类组合原子类 DTS */
function generateClassGroupsDts(ctx: DtsWriterContext, classGroups: ClassGroupAtomDefinition[]): string {
  if (classGroups.length === 0) return '';
  const content = generateClassGroupDtsFromData(classGroups);
  return writeOrReturn(ctx, 'classGroup.d.ts', content, '类组合原子类', classGroups.length);
}

/** 生成单个属性的 DTS（用于分文件模式的数值属性） */
function generatePropertyDts(ctx: DtsWriterContext, propName: string, atoms: AtomDefinition[]): string {
  if (atoms.length === 0) return '';
  const content = generatePropertyGlobalDts(propName, atoms);
  return writeOrReturn(ctx, `${propName}.d.ts`, content, '原子类', atoms.length);
}

/** 生成 Group 原子类 DTS */
function generateGroupsDts(ctx: DtsWriterContext, groups: GroupAtomDefinition[]): string {
  if (groups.length === 0) return '';

  // 分离数值类型和关键字类型
  const numberGroupAtoms = groups.filter(a => a.isNumber);
  const keywordGroupAtoms = groups.filter(a => !a.isNumber);

  let result = '';

  // 数值类型：按 groupName 分文件
  if (numberGroupAtoms.length > 0) {
    const numberGroupsByName: Record<string, GroupAtomDefinition[]> = {};
    for (const atom of numberGroupAtoms) {
      const match = atom.name.match(/^([a-zA-Z]+?)(?:N?\d|$)/);
      const groupName = match ? match[1] : atom.name.replace(/N?\d.*$/, '');
      if (!numberGroupsByName[groupName]) {
        numberGroupsByName[groupName] = [];
      }
      numberGroupsByName[groupName].push(atom);
    }

    for (const [groupName, atoms] of Object.entries(numberGroupsByName)) {
      const content = generateGroupAtomsDts(atoms);
      result += writeOrReturn(ctx, `${groupName}.d.ts`, content, '组合原子类', atoms.length);
    }
  }

  // 关键字类型：放一个文件
  if (keywordGroupAtoms.length > 0) {
    const content = generateGroupAtomsDts(keywordGroupAtoms);
    result += writeOrReturn(ctx, 'groups-keyword.d.ts', content, '组合原子类', keywordGroupAtoms.length);
  }

  return result;
}

/** 按属性分组原子类并生成分文件 DTS */
function generateAtomsByPropertyDts(
  ctx: DtsWriterContext,
  atoms: AtomDefinition[]
): { colorAtoms: AtomDefinition[]; keywordAtoms: AtomDefinition[] } {
  // 按属性分组
  const atomsByProperty: Record<string, AtomDefinition[]> = {};
  for (const atom of atoms) {
    if (!atomsByProperty[atom.property]) {
      atomsByProperty[atom.property] = [];
    }
    atomsByProperty[atom.property].push(atom);
  }

  const colorAtoms: AtomDefinition[] = [];
  const keywordAtoms: AtomDefinition[] = [];

  // 按属性生成分文件
  for (const [propName, propAtoms] of Object.entries(atomsByProperty)) {
    const hasNumber = propAtoms.some(atom => atom.number !== undefined);

    if (hasNumber) {
      // 数值属性：单独生成文件
      generatePropertyDts(ctx, propName, propAtoms);
    } else {
      // 非数值属性：分类到颜色或关键字
      const isColorProperty = propName in PROPERTY_COLOR_TYPES_MAP;
      if (isColorProperty) {
        colorAtoms.push(...propAtoms);
      } else {
        keywordAtoms.push(...propAtoms);
      }
    }
  }

  return { colorAtoms, keywordAtoms };
}

/**
 * 使用传入的数据生成单文件 DTS 内容
 */
function generateDtsFromData(
  atoms: AtomDefinition[],
  pseudos: PseudoAtomDefinition[],
  classGroups: ClassGroupAtomDefinition[]
): string {
  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类全局常量声明（自动生成）',
    ' * ',
    ' * 这些全局常量用于 css { } 语法中的 IDE 自动补全',
    ' */',
    '',
  ];

  // 使用公共方法生成原子类声明
  lines.push(...generateAtomDeclarations(atoms));

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

  // 非 Vite 环境：生成空的 atomUsedCssts.d.ts 占位
  // LSP 会在运行时更新这个文件的内容
  if (!RuntimeStore.isViteEnvironment()) {
    const emptyModulesDts = generateModulesDts();
    const atomUsedPath = path.join(outputDir, 'atomUsedCssts.d.ts');
    fs.writeFileSync(atomUsedPath, emptyModulesDts, 'utf-8');
    files.push(atomUsedPath);
    log(`✅ 生成 atomUsedCssts.d.ts（初始为空壳，LSP 会动态更新）`);
  }

  if (splitFiles) {
    log('\n📁 生成分文件版本...');

    // 创建上下文
    const generatedFileNames: string[] = [];
    const ctx: DtsWriterContext = { outputDir, files, fileNames: generatedFileNames, log, singleFile: false };

    // 按属性分组并生成分文件 DTS
    const { colorAtoms, keywordAtoms } = generateAtomsByPropertyDts(ctx, atoms);

    // 生成颜色、关键字、伪类、类组合、Group 的 DTS
    generateColorsDts(ctx, colorAtoms);
    generateKeywordsDts(ctx, keywordAtoms);
    generatePseudosDts(ctx, pseudos);
    generateClassGroupsDts(ctx, classGroups);
    generateGroupsDts(ctx, groups);

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

    // 生成 atomAllCssts.d.ts（所有原子类的全局声明）
    const atomAllPath = path.join(outputDir, 'atomAllCssts.d.ts');
    fs.writeFileSync(atomAllPath, dtsContent, 'utf-8');
    files.push(atomAllPath);
    log(`✅ 生成所有原子类声明: atomAllCssts.d.ts`);

    // 生成 index.d.ts（引用所有 DTS 文件）
    const indexContent = `/// <reference path="./atomAllCssts.d.ts" />
/// <reference path="./atomUsedCssts.d.ts" />
`;
    const indexPath = path.join(outputDir, 'index.d.ts');
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    files.push(indexPath);
    log(`✅ 生成索引文件: index.d.ts`);
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
