/**
 * CssTs Generator
 *
 * 提供类型定义生成功能
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// ==================== 从 css-types 导出 ====================

// 配置类型
export {
  CsstsConfig,
  DEFAULT_UNIT_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
  type UnitValueConfig,
  type CustomPropertyValue,
  type PseudoStyleItem,
  type PseudoStyleValue,
  type ProgressiveRange,
} from '../css-types/cssts-config.js';

export {
  CssPropertyConfigMap,
  cssPropertyNameMap,
  type CssPropertyCamelName,
  type CssPropertyKebabName,
} from '../css-types/property-config.js';

export {
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  type PseudoClassName,
  type PseudoElementName,
} from '../css-types/pseudo.js';

export type { UnitType, NumberTypeName } from '../css-types/units.js';
export type { KeywordValue } from '../css-types/keywords.js';
export type { AllColorValue, ColorValue, SystemColorValue } from '../css-types/colors.js';

// 配置工具
export {
  generateValuesForUnit,
  getActiveProperties,
  getActiveKeywords,
  getActiveNumberTypes,
  calculateAtomStats,
} from '../css-types/config-utils.js';

// ==================== 兼容旧 API ====================

// 旧配置类型（兼容层）
export {
  unitToSuffix,
  systemDefaults,
  defaultProperties,
  defaultPseudoUtils,
  defaultConfig,
  type PropertyConfig,
} from './config.js';

// 旧数值生成（兼容层）
export { generateValues, resolveUnitConfig } from './value-generator.js';

// ==================== 原子类生成 ====================

// 导出原子类生成
export type { AtomDefinition } from './atom-generator.js';
export { generateAtoms, generatePropertiesJson } from './atom-generator.js';

// 导出类型定义生成
export {
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
} from './dts-generator.js';

// ==================== 生成器选项 ====================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_OUT_DIR = path.resolve(__dirname, '../../types');

export interface GeneratorOptions {
  /** 输出目录，默认为 cssts-compiler/types/ */
  outDir?: string;
  /** 配置 */
  config?: any; // 兼容旧 CsstsConfig
}

// ==================== 异步生成 .d.ts ====================

import { generateAtoms } from './atom-generator.js';
import {
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
} from './dts-generator.js';
import { CsstsConfig } from '../css-types/cssts-config.js';

/**
 * 异步生成 .d.ts 文件
 */
export async function generateDtsAsync(options: GeneratorOptions = {}): Promise<string[]> {
  const outDir = options.outDir ?? DEFAULT_OUT_DIR;
  const config = options.config ?? new CsstsConfig();
  const atoms = generateAtoms(config);

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
