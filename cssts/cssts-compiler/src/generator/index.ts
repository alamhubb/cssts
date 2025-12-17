/**
 * CssTs Generator
 *
 * 提供类型定义和 properties.json 的生成功能
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// ==================== 从 css-types 导出 ====================

// 配置类型
export {
  CsstsConfig,
  UnitValueConfig,
  DEFAULT_UNIT_CONFIGS,
  DEFAULT_PROGRESSIVE_RANGES,
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

// 导出 CSS 数据
export { default as cssData } from '../data/css-data.json' with { type: 'json' };

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
  /** 是否生成 .d.ts 文件（开发环境需要，生产环境不需要） */
  generateDts?: boolean;
}

// ==================== 同步生成 properties.json ====================

import { generateAtoms, generatePropertiesJson } from './atom-generator.js';
import {
  generateCsstsAtomsDts,
  generateGlobalDts,
  generateRuntimeDts,
  generateIndexDts,
} from './dts-generator.js';
import { defaultConfig } from './config.js';

/**
 * 同步生成 properties.json
 */
export function generatePropertiesJsonSync(options: GeneratorOptions = {}): string {
  const outDir = options.outDir ?? DEFAULT_OUT_DIR;
  const config = options.config ?? defaultConfig;
  const atoms = generateAtoms(config);
  const properties = generatePropertiesJson(atoms);
  const content = JSON.stringify(properties, null, 2);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const filePath = path.join(outDir, 'properties.json');
  fs.writeFileSync(filePath, content);

  return filePath;
}

// ==================== 异步生成 .d.ts ====================

/**
 * 异步生成 .d.ts 文件
 */
export async function generateDtsAsync(options: GeneratorOptions = {}): Promise<string[]> {
  const outDir = options.outDir ?? DEFAULT_OUT_DIR;
  const config = options.config ?? defaultConfig;
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

// ==================== 完整生成 ====================

/**
 * 完整生成（同步 properties.json + 异步 .d.ts）
 */
export async function generate(
  options: GeneratorOptions = {}
): Promise<{
  propertiesJson: string;
  dtsFiles: string[];
}> {
  const propertiesJson = generatePropertiesJsonSync(options);

  let dtsFiles: string[] = [];
  if (options.generateDts !== false) {
    dtsFiles = await generateDtsAsync(options);
  }

  return { propertiesJson, dtsFiles };
}

// ==================== 配置合并工具 ====================

/**
 * 深度合并配置
 * @deprecated 直接修改 CsstsConfig 实例
 */
export function mergeConfig(base: any, override: any): any {
  const result = {
    defaults: { ...base.defaults },
    properties: { ...base.properties },
  };

  if (override.defaults) {
    for (const [unit, config] of Object.entries(override.defaults)) {
      if (config && typeof config === 'object') {
        (result.defaults as any)[unit] = {
          ...((result.defaults as any)?.[unit] || {}),
          ...config,
        };
      }
    }
  }

  if (override.properties) {
    for (const [prop, config] of Object.entries(override.properties)) {
      if (config && typeof config === 'object') {
        result.properties[prop] = {
          ...(result.properties[prop] || {}),
          ...(config as object),
        };
      }
    }
  }

  return result;
}

/**
 * 创建配置（基于默认配置合并）
 * @deprecated 使用 new CsstsConfig()
 */
export function createConfig(override: any): any {
  return mergeConfig(defaultConfig, override);
}
