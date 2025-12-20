/**
 * 统一生成脚本
 *
 * 生成所有 CSS 类型相关的数据和类型定义文件
 * 包括：keywords、colors、number types、伪类、伪元素等
 *
 * 运行方式：npx tsx generator/generator-all.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');
const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
[dataDir, typesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ==================== 工具函数 ====================

function keywordToConstName(keyword: string): string {
  return keyword
    .replace(/-/g, '_')
    .replace(/[^A-Z0-9_]/gi, '')
    .toUpperCase();
}

/**
 * 构建 keyword 到唯一常量名的映射
 * 重名时加 _1, _2 后缀
 */
function buildConstNameMap(keywords: Set<string>): Map<string, string> {
  const sortedKeywords = Array.from(keywords).sort();
  const constNameCount = new Map<string, number>();
  const keywordToConst = new Map<string, string>();

  for (const keyword of sortedKeywords) {
    let constName = keywordToConstName(keyword);
    const count = constNameCount.get(constName) || 0;
    
    if (count > 0) {
      constName = `${constName}_${count}`;
    }
    
    constNameCount.set(keywordToConstName(keyword), count + 1);
    keywordToConst.set(keyword, constName);
  }

  return keywordToConst;
}

// ==================== Keywords 生成 ====================

function extractKeywordsFromCsstree(): Set<string> {
  const lexer = (csstree as any).lexer;
  const keywords = new Set<string>();

  function extractFromSyntaxNode(
    node: any,
    visited: Set<string> = new Set(),
    visitedProperties: Set<string> = new Set()
  ): void {
    if (!node) return;

    switch (node.type) {
      case 'Keyword':
        keywords.add(node.name);
        break;

      case 'Type':
        const typeName = node.name;
        if (!visited.has(typeName)) {
          visited.add(typeName);
          const typeDef = lexer.types[typeName];
          if (typeDef?.syntax) {
            extractFromSyntaxNode(typeDef.syntax, visited, visitedProperties);
          }
        }
        break;

      case 'Property':
        const propName = node.name;
        if (!visitedProperties.has(propName)) {
          visitedProperties.add(propName);
          const propDef = lexer.properties[propName];
          if (propDef?.syntax) {
            extractFromSyntaxNode(propDef.syntax, visited, visitedProperties);
          }
        }
        break;

      case 'Group':
      case 'Multiplier':
        if (node.term) {
          extractFromSyntaxNode(node.term, visited, visitedProperties);
        }
        if (node.terms) {
          node.terms.forEach((t: any) => extractFromSyntaxNode(t, visited, visitedProperties));
        }
        break;

      case 'Combination':
        if (node.terms) {
          node.terms.forEach((t: any) => extractFromSyntaxNode(t, visited, visitedProperties));
        }
        break;
    }
  }

  const properties = lexer.properties as Record<string, any>;
  for (const [propName, propDef] of Object.entries(properties)) {
    if (propName.startsWith('-')) continue;
    if (propDef && propDef.syntax) {
      extractFromSyntaxNode(propDef.syntax);
    }
  }

  return keywords;
}

function generateKeywordConstants(keywords: Set<string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 常量（自动生成）',
    ' *',
    ' * 每个 keyword 的常量定义',
    ' */',
    '',
  ];

  const constNameMap = buildConstNameMap(keywords);
  const sortedKeywords = Array.from(keywords).sort();

  lines.push('// ==================== 所有 Keywords ====================', '');
  
  for (const keyword of sortedKeywords) {
    const constName = constNameMap.get(keyword)!;
    lines.push(`export const KEYWORD_${constName} = '${keyword}' as const;`);
  }

  lines.push('');
  lines.push('// ==================== Keywords 映射 ====================', '');
  lines.push('export const KEYWORD_MAP: Record<string, string> = {');
  
  for (const keyword of sortedKeywords) {
    const constName = constNameMap.get(keyword)!;
    lines.push(`  '${keyword}': KEYWORD_${constName},`);
  }
  
  lines.push('};', '');

  return lines.join('\n');
}

function generateKeywords(keywords: Set<string>): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 数组（自动生成）',
    ' *',
    ' * 从 csstree 提取的所有 keywords',
    ' */',
    '',
  ];

  const constNameMap = buildConstNameMap(keywords);
  const sortedKeywords = Array.from(keywords).sort();
  const constNames = sortedKeywords.map(k => `KEYWORD_${constNameMap.get(k)!}`);
  lines.push(`import { ${constNames.join(', ')}, KEYWORD_MAP } from './keywordConstants';`, '');

  lines.push('export const keywords = [');
  
  for (const keyword of sortedKeywords) {
    const constName = constNameMap.get(keyword)!;
    lines.push(`  KEYWORD_${constName},`);
  }
  
  lines.push('] as const;', '');
  lines.push('export { KEYWORD_MAP };', '');

  return lines.join('\n');
}

function generateAllKeywords(): string {
  const lines: string[] = [
    '/**',
    ' * 所有 CSS Keywords 和 Colors（自动生成）',
    ' *',
    ' * 组合 keywords 和 colors',
    ' */',
    '',
    "import { keywords } from './keywords';",
    "import { ALL_COLORS } from './color';",
    '',
    '// ==================== 所有 Keywords 和 Colors ====================',
    '',
    'export const allKeywords = [...keywords, ...ALL_COLORS] as const;',
    '',
    "export { keywords, ALL_COLORS };",
    '',
  ];

  return lines.join('\n');
}

function generateCssKeywordsType(): string {
  const lines: string[] = [
    '/**',
    ' * CSS Keywords 类型定义（自动生成）',
    ' *',
    ' * 包含所有 keywords 和 colors 的类型定义',
    ' */',
    '',
    "import type { keywords } from '../data/keywords';",
    "import type { allKeywords } from '../data/allKeywords';",
    "import type { ALL_COLORS } from '../data/color';",
    '',
    '// ==================== Keywords 类型 ====================',
    '',
    'export type CssKeywordName = typeof keywords[number];',
    '',
    '// ==================== Colors 类型 ====================',
    '',
    'export type CssColorName = typeof ALL_COLORS[number];',
    '',
    '// ==================== 所有 Keywords 和 Colors 类型 ====================',
    '',
    'export type CssAllKeywordName = typeof allKeywords[number];',
    '',
  ];

  return lines.join('\n');
}

// ==================== Number Types 生成 ====================

function generateNumberTypesType(): string {
  const lines: string[] = [
    '/**',
    ' * NumberTypes 类型定义（自动生成）',
    ' *',
    ' * 包含所有 CSS 数值类型的名称、category 和 units',
    ' */',
    '',
    "import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';",
    "import type { ALL_NUMBER_CATEGORIES, ALL_UNITS } from '../data/numberTypeCategory';",
    '',
    '// ==================== NumberTypes 名称 ====================',
    '',
    'export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];',
    '',
    '// ==================== Number Categories ====================',
    '',
    'export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];',
    '',
    '// ==================== Units ====================',
    '',
    'export type CssNumberUnitName = typeof ALL_UNITS[number];',
    '',
  ];

  return lines.join('\n');
}

// ==================== 伪类和伪元素生成 ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const jsonPath = path.join(__dirname, 'datajson/pseudo-standards.json');
  const content = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(content);
}

function generatePseudoClasses(pseudoClasses: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类数据（自动生成）',
    ' *',
    ' * 从 pseudo-standards.json 提取的所有伪类',
    ' */',
    '',
    'export const pseudoClasses = [',
  ];

  for (const pseudoClass of pseudoClasses) {
    lines.push(`  '${pseudoClass}',`);
  }

  lines.push('] as const;', '');

  return lines.join('\n');
}

function generatePseudoElements(pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪元素数据（自动生成）',
    ' *',
    ' * 从 pseudo-standards.json 提取的所有伪元素',
    ' */',
    '',
    'export const pseudoElements = [',
  ];

  for (const pseudoElement of pseudoElements) {
    lines.push(`  '${pseudoElement}',`);
  }

  lines.push('] as const;', '');

  return lines.join('\n');
}

function generateCssPseudoClassElementType(): string {
  const lines: string[] = [
    '/**',
    ' * CSS 伪类和伪元素类型定义（自动生成）',
    ' *',
    ' * 包含所有伪类和伪元素的名称类型',
    ' */',
    '',
    "import type { pseudoClasses } from '../data/pseudoClasses';",
    "import type { pseudoElements } from '../data/pseudoElements';",
    '',
    '// ==================== 伪类名称 ====================',
    '',
    'export type CssPseudoClassName = typeof pseudoClasses[number];',
    '',
    '// ==================== 伪元素名称 ====================',
    '',
    'export type CssPseudoElementName = typeof pseudoElements[number];',
    '',
  ];

  return lines.join('\n');
}

function generatePseudoStylesType(pseudoClasses: string[], pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * 伪类/伪元素样式类型定义（自动生成）',
    ' *',
    ' * 基于生成的 pseudoClasses.ts 和 pseudoElements.ts',
    ' * 为伪类和伪元素提供类型安全的样式配置',
    ' */',
    '',
    "import type { CSSPropertiesValueType } from './cssPropertiesValue';",
    '',
    '// ==================== 伪类样式类型 ====================',
    '',
    '/**',
    ' * 伪类样式配置类型',
    ' * 每个伪类可以配置 CSS 属性值',
    ' */',
    'export interface CssPseudoClassConfig {',
  ];

  // Group pseudo-classes by category
  const categories: Record<string, string[]> = {
    'user-action': ['hover', 'active', 'focus', 'focusVisible', 'focusWithin'],
    'link': ['link', 'visited', 'anyLink', 'localLink', 'target', 'targetWithin'],
    'form': ['enabled', 'disabled', 'readOnly', 'readWrite', 'placeholderShown', 'default', 'checked', 'indeterminate', 'valid', 'invalid', 'inRange', 'outOfRange', 'required', 'optional', 'userValid', 'userInvalid', 'autofill'],
    'structural': ['root', 'empty', 'firstChild', 'lastChild', 'onlyChild', 'firstOfType', 'lastOfType', 'onlyOfType', 'nthChild', 'nthLastChild', 'nthOfType', 'nthLastOfType'],
    'logical': ['not', 'is', 'where', 'has'],
    'linguistic': ['lang', 'dir'],
    'display': ['fullscreen', 'modal', 'pictureInPicture'],
    'media': ['playing', 'paused', 'seeking', 'buffering', 'stalled', 'muted', 'volumeLocked'],
    'web-components': ['defined', 'host', 'hostContext', 'scope'],
    'other': ['blank'],
  };

  for (const [category, props] of Object.entries(categories)) {
    lines.push(`  // ${category} 伪类`);
    for (const prop of props) {
      lines.push(`  ${prop}?: CSSPropertiesValueType;`);
    }
    lines.push('');
  }

  lines.push('}', '');
  lines.push('// ==================== 伪元素样式类型 ====================', '');
  lines.push('/**', ' * 伪元素样式配置类型', ' * 每个伪元素可以配置 CSS 属性值', ' */', 'export interface CssPseudoElementConfig {');

  for (const pseudoElement of pseudoElements) {
    const camelCase = pseudoElement
      .split('-')
      .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    lines.push(`  ${camelCase}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');

  return lines.join('\n');
}

// ==================== CSS 属性配置类型生成 ====================

function generateCssPropertyConfigType(): string {
  const lines: string[] = [
    '/**',
    ' * CSS 属性配置类型定义（自动生成）',
    ' *',
    ' * 包含 CssPropertyName 和联合类型 CssProperty',
    ' */',
    '',
    "import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';",
    "import type { CSSPropertiesType } from './cssProperties';",
    '',
    '// ==================== 属性名类型 ====================',
    '',
    'export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;',
    '',
    '// ==================== 联合类型 ====================',
    '',
    '// 单个属性或属性集合',
    'export type CssProperty = CssPropertyName | CSSPropertiesType;',
    '',
    '// 单个或多个属性',
    'export type CssProperties = CssProperty | CssProperty[];',
    '',
  ];

  return lines.join('\n');
}

// ==================== CSSTS 配置类型生成 ====================

function generateCsstsConfigType(): string {
  return `/**
 * CSSTS 配置类型定义（自动生成）
 *
 * 包含 CsstsConfig 接口及相关类型
 */

import type {CssPropertyName} from './cssPropertyConfig';
import type {CssNumberTypeName, CssNumberCategoryName, CssNumberUnitName} from './numberTypes';
import type {CssKeywordName, CssColorName} from './cssKeywords';
import type {CssPseudoClassName, CssPseudoElementName} from './cssPseudoClassElement';
import type {CssPseudoClassConfig, CssPseudoElementConfig} from './pseudoStyles';

// ==================== 值配置类型 ====================

/** 渐进步长范围配置 */
export interface ProgressiveRange {
    max: number;
    divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
    step?: number | ProgressiveRange[];  // 步长生成的数值
    min?: number;                         // 步长的最小值
    max?: number;                         // 步长的最大值
    negative?: boolean;                   // 是否生成负值
    presets?: number[];                   // 额外的预设值（与 step 生成的合并）
}

// ==================== 层级配置类型（从下到上依赖） ====================

/**
 * 单位配置映射（对象模式）
 * 示例：{ px: { min: 0 }, rem: { presets: [0, 0.5, 1] } }
 */
export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 单位配置项（最底层）
 * 可以是字符串（简单启用）或对象（带配置，可配置多个单位）
 * - 'px' - 简单启用
 * - { px: { min: 0 }, vw: { min: 100 } } - 配置多个单位
 */
export type CssUnitConfigItem =
    | CssNumberUnitName
    | CssUnitConfigMap;

/**
 * 单位配置（支持数组模式和对象模式）
 * - 数组模式：['px', { rem: { min: 0 } }]
 * - 对象模式：{ px: { min: 0 }, rem: { presets: [0, 0.5, 1] } }
 */
export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

/**
 * 分类值配置（依赖 CssUnitConfigItem）
 * 支持多种格式：
 * - CsstsStepConfig - 直接配置整个分类
 * - CssNumberUnitName[] - 指定支持的单位列表
 * - Partial<Record<CssNumberUnitName, CsstsStepConfig>> - 配置具体单位
 */
export type CssCategoryValueConfig =
    | CsstsStepConfig
    | CssNumberUnitName[]
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 单位分类配置映射（对象模式）
 * 示例：{ pixel: { px: { min: 0 } }, percentage: ['percent'] }
 */
export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;

/**
 * 单位分类配置项（依赖 CssCategoryValueConfig）
 * 字符串只支持当前层级（category），对象支持跨级
 * - 'pixel' - 简单启用 category
 * - { pixel: { px: { min: 0 } } } - 完整路径
 * - { pixel: ['px', 'rem'] } - 指定支持的单位列表
 * - { px: { min: 100 } } - 跨级：直接配置 unit
 */
export type CssCategoryConfigItem =
    | CssNumberCategoryName
    | CssCategoryConfigMap
    | CssUnitConfigMap;  // 跨级：直接配置 unit

/**
 * 单位分类配置（支持数组模式和对象模式）
 */
export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMap;

/**
 * 数值类型值配置（依赖 CssCategoryValueConfig）
 * 支持多种格式：
 * - CsstsStepConfig - 直接配置整个数值类型
 * - CssNumberCategoryName[] - 指定支持的分类列表
 * - Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>> - 配置多个分类
 * - Partial<Record<CssNumberUnitName, CsstsStepConfig>> - 跨级配置单位
 */
export type CssNumberTypeValueConfig =
    | CsstsStepConfig
    | CssNumberCategoryName[]
    | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

/**
 * 数值类型配置映射（对象模式）
 * 示例：{ length: { pixel: { px: { min: 0 } } }, angle: ['deg'] }
 */
export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;

/**
 * 数值类型配置项（依赖 CssNumberTypeValueConfig, CssCategoryValueConfig）
 * 字符串只支持当前层级（numberType），对象支持跨级
 * - 'length' - 简单启用 numberType
 * - { length: { pixel: { px: { min: 0 } } } } - 完整路径
 * - { length: { px: { min: 0 } } } - 跨过 category 直接配置 unit
 * - { length: ['pixel', 'percentage'] } - 指定支持的分类列表
 * - { pixel: { px: { min: 0 } } } - 跨级：从 category 开始
 * - { px: { min: 0 } } - 跨级：直接配置 unit
 */
export type CssNumberTypeConfigItem =
    | CssNumberTypeName
    | CssNumberTypeConfigMap
    | CssCategoryConfigMap  // 跨级：从 category 开始
    | CssUnitConfigMap;         // 跨级：直接配置 unit

/**
 * 数值类型配置（支持数组模式和对象模式）
 */
export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMap;

// ==================== 排除配置类型（从下到上依赖，与白名单结构对称） ====================

/**
 * 单位排除项（最底层）
 * 只支持字符串形式（不需要 CsstsStepConfig）
 */
export type CssUnitExcludeItem = CssNumberUnitName;

/**
 * 单位排除映射（对象模式）
 * 与白名单 CssUnitConfigMap 对应，但值为空对象（不需要配置）
 * 示例：{ px: {}, rem: {} }
 */
export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

/**
 * 分类排除值配置（依赖 CssUnitExcludeItem）
 * 与白名单 CssCategoryValueConfig 对应，但不支持 CsstsStepConfig
 * - CssNumberUnitName[] - 排除指定的单位列表
 * - CssUnitExcludeMap - 对象模式排除单位
 */
export type CssCategoryExcludeValueConfig =
    | CssNumberUnitName[]
    | CssUnitExcludeMap;

/**
 * 单位分类排除映射（对象模式）
 * 与白名单 CssCategoryConfigMap 对应
 * 示例：{ pixel: ['px', 'rem'], percentage: { percent: {} } }
 */
export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

/**
 * 单位分类排除项（依赖 CssCategoryExcludeValueConfig）
 * 与白名单 CssCategoryConfigItem 对应
 * - 'pixel' - 简单排除 category
 * - { pixel: ['px', 'rem'] } - 排除分类下的单位
 * - { px: {} } - 跨级：直接排除 unit
 */
export type CssCategoryExcludeItem =
    | CssNumberCategoryName
    | CssCategoryExcludeMap
    | CssUnitExcludeMap;  // 跨级：直接排除 unit

/**
 * 单位分类排除配置（支持数组模式和对象模式）
 * 与白名单 CssCategoryConfig 对应
 */
export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMap;

/**
 * 数值类型排除值配置（依赖 CssCategoryExcludeValueConfig）
 * 与白名单 CssNumberTypeValueConfig 对应，但不支持 CsstsStepConfig
 * - CssNumberCategoryName[] - 排除指定的分类列表
 * - CssCategoryExcludeMap - 排除分类下的单位
 * - CssUnitExcludeMap - 跨级排除单位
 */
export type CssNumberTypeExcludeValueConfig =
    | CssNumberCategoryName[]
    | CssCategoryExcludeMap
    | CssUnitExcludeMap;

/**
 * 数值类型排除映射（对象模式）
 * 与白名单 CssNumberTypeConfigMap 对应
 * 示例：{ length: ['pixel'], angle: { deg: ['deg'] } }
 */
export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;

/**
 * 数值类型排除项（依赖 CssNumberTypeExcludeValueConfig, CssCategoryExcludeMap）
 * 与白名单 CssNumberTypeConfigItem 对应
 * - 'length' - 简单排除 numberType
 * - { length: ['pixel'] } - 排除 numberType 下的分类
 * - { length: { pixel: ['px'] } } - 完整路径
 * - { pixel: ['px'] } - 跨级：从 category 开始
 * - { px: {} } - 跨级：直接排除 unit
 */
export type CssNumberTypeExcludeItem =
    | CssNumberTypeName
    | CssNumberTypeExcludeMap
    | CssCategoryExcludeMap  // 跨级：从 category 开始
    | CssUnitExcludeMap;         // 跨级：直接排除 unit

/**
 * 数值类型排除配置（支持数组模式和对象模式）
 * 与白名单 CssNumberTypeConfig 对应
 */
export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;

/**
 * 属性排除值配置
 * 与白名单 CssPropertyValueConfig 对应，但不支持 CsstsStepConfig
 * 支持多种配置方式：
 * - { numberTypes: ['length'] } - 排除数值类型
 * - { keywords: ['auto'] } - 排除关键字
 * - { colors: ['red'] } - 排除颜色
 * - { pixel: ['px'] } - 排除分类下的单位
 * - { length: { pixel: ['px'] } } - 完整路径
 */
export type CssPropertyExcludeValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
    | (CssPropertyBaseConfig & CssCategoryExcludeMap)
    | (CssPropertyBaseConfig & CssUnitExcludeMap);

/**
 * 属性排除映射（对象模式）
 * 与白名单 CssPropertyConfigMap 对应
 * 示例：{ width: { numberTypes: ['length'] }, height: [{ pixel: ['px'] }] }
 */
export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

/**
 * 属性排除项（依赖 CssPropertyExcludeMap, CssNumberTypeExcludeItem）
 * 与白名单 CssPropertyConfigItem 对应
 * - 'width' - 简单排除属性
 * - { width: { numberTypes: ['length'] } } - 排除属性下的数值类型
 * - { width: [{ pixel: ['px'] }] } - 数组格式配置
 */
export type CssPropertyExcludeItem =
    | CssPropertyName
    | CssPropertyExcludeMap;

/**
 * 属性排除配置（支持数组模式和对象模式）
 * 与白名单 CssPropertyConfig 对应
 */
export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;

// ==================== 属性配置类型 ====================

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

/**
 * 属性基础配置
 */
export interface CssPropertyBaseConfig {
    numberTypes?: CssNumberTypeName[];
    keywords?: CssKeywordName[];
    colors?: CssColorName[];
}

/**
 * 属性值配置
 * 支持多种配置方式：
 * - { numberTypes: ['length'] } - 指定数值类型
 * - { keywords: ['auto'] } - 指定关键字
 * - { colors: ['red'] } - 指定颜色
 * - { px: { min: 0 } } - 直接配置单位（跨级）
 * - { pixel: { px: { min: 0 } } } - 配置分类和单位
 * - { length: { pixel: { px: {} } } } - 完整路径
 * - 以上可以混合使用
 */
export type CssPropertyValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
    | (CssPropertyBaseConfig & CssCategoryConfigMap)
    | (CssPropertyBaseConfig & CssUnitConfigMap);

/**
 * 属性配置映射（对象模式）
 * 一次性配置多个属性
 * 示例：
 * {
 *   width: { length: { pixel: { px: { min: 0 } } } },
 *   height: { length: { unitless: {} } }
 * }
 */
export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

/**
 * 属性配置项
 * 可以是字符串（简单启用）或对象（带配置）
 * key 必须是 CSS 属性名称，不支持用 category 或 unit 名称作为 key
 * - 'width' - 简单启用属性
 * - { width: { px: { min: 0 } } } - 属性下直接配置单位
 * - { width: [...] } - 属性下的数值类型配置数组
 */
export type CssPropertyConfigItem =
    | CssPropertyName
    | CssPropertyConfigMap;

/**
 * 属性配置（支持数组模式和对象模式）
 * - 数组模式：CssPropertyConfigItem[]
 * - 对象模式：CssPropertyConfigMap
 */
export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== CSSTS 配置接口 ====================

/**
 * CSSTS 配置接口
 *
 * 定义所有配置项的结构
 */
export interface CsstsConfig {
    // ==================== 属性配置 ====================

    /**
     * 支持的属性列表（白名单）
     * 支持两种模式：
     * - 数组模式：['width', 'height', { margin: { px: { min: 0 } } }]
     * - 对象模式：{ width: { length: { pixel: {} } }, height: { length: {} } }
     */
    properties?: CssPropertyConfig;

    /**
     * 排除的属性列表（黑名单）
     * 仅当 properties 为空时生效
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeProperties?: CssPropertyExcludeConfig;

    // ==================== 数值类型配置 ====================

    /**
     * 支持的数值类型列表（白名单）
     * 支持数组模式和对象模式
     */
    numberTypes?: CssNumberTypeConfig;

    /**
     * 排除的数值类型列表（黑名单）
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeNumberTypes?: CssNumberTypeExcludeConfig;

    // ==================== 单位分类配置 ====================

    /**
     * 支持的单位分类列表（白名单）
     * 支持数组模式和对象模式
     */
    unitCategories?: CssCategoryConfig;

    /**
     * 排除的单位分类列表（黑名单）
     * 支持与白名单相同的结构（不支持 CsstsStepConfig）
     */
    excludeUnitCategories?: CssCategoryExcludeConfig;

    // ==================== 单位配置 ====================

    /**
     * 支持的单位列表（白名单）
     * 支持数组模式和对象模式
     */
    units?: CssUnitConfig;

    /**
     * 排除的单位列表（黑名单）
     */
    excludeUnits?: CssUnitExcludeItem[];

    // ==================== 关键字/颜色配置 ====================

    /**
     * 支持的关键字列表（白名单）
     */
    keywords?: CssKeywordName[];

    /**
     * 排除的关键字列表（黑名单）
     */
    excludeKeywords?: CssKeywordName[];

    /**
     * 支持的颜色列表（白名单）
     */
    colors?: CssColorName[];

    /**
     * 排除的颜色列表（黑名单）
     */
    excludeColors?: CssColorName[];

    // ==================== 其他配置 ====================

    /** 自定义属性 */
    customProperties?: Record<string, CustomPropertyValue>;

    /** 渐进步长策略 */
    progressiveRanges?: ProgressiveRange[];

    // ==================== 伪类/伪元素配置 ====================

    /**
     * 支持的伪类列表（白名单）
     */
    pseudoClasses?: CssPseudoClassName[];

    /**
     * 排除的伪类列表（黑名单）
     */
    excludePseudoClasses?: CssPseudoClassName[];

    /**
     * 支持的伪元素列表（白名单）
     */
    pseudoElements?: CssPseudoElementName[];

    /**
     * 排除的伪元素列表（黑名单）
     */
    excludePseudoElements?: CssPseudoElementName[];

    // ==================== 伪类/伪元素样式配置 ====================

    /** 伪类样式配置 */
    pseudoClassesConfig?: CssPseudoClassConfig;

    /** 伪元素样式配置 */
    pseudoElementsConfig?: CssPseudoElementConfig;
}

// ==================== 完整配置类型 ====================

/**
 * 完整的 CSSTS 配置类型
 * 所有字段都有值（由 createConfig 函数返回）
 */
export type CsstsConfigRequired = Required<CsstsConfig>;
`;
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 类型和数据文件...\n');

  // Keywords
  const keywords = extractKeywordsFromCsstree();
  
  fs.writeFileSync(path.join(dataDir, 'keywordConstants.ts'), generateKeywordConstants(keywords));
  console.log('✅ src/data/keywordConstants.ts');

  fs.writeFileSync(path.join(dataDir, 'keywords.ts'), generateKeywords(keywords));
  console.log('✅ src/data/keywords.ts');

  fs.writeFileSync(path.join(dataDir, 'allKeywords.ts'), generateAllKeywords());
  console.log('✅ src/data/allKeywords.ts');

  fs.writeFileSync(path.join(typesDir, 'cssKeywords.d.ts'), generateCssKeywordsType());
  console.log('✅ src/types/cssKeywords.d.ts');

  // Number Types
  fs.writeFileSync(path.join(typesDir, 'numberTypes.d.ts'), generateNumberTypesType());
  console.log('✅ src/types/numberTypes.d.ts');

  // Pseudo Classes and Elements
  const { pseudoClasses, pseudoElements } = loadPseudoStandards();

  fs.writeFileSync(path.join(dataDir, 'pseudoClasses.ts'), generatePseudoClasses(pseudoClasses));
  console.log('✅ src/data/pseudoClasses.ts');

  fs.writeFileSync(path.join(dataDir, 'pseudoElements.ts'), generatePseudoElements(pseudoElements));
  console.log('✅ src/data/pseudoElements.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPseudoClassElement.d.ts'), generateCssPseudoClassElementType());
  console.log('✅ src/types/cssPseudoClassElement.d.ts');

  fs.writeFileSync(path.join(typesDir, 'pseudoStyles.d.ts'), generatePseudoStylesType(pseudoClasses, pseudoElements));
  console.log('✅ src/types/pseudoStyles.d.ts');

  // CSS Property Config
  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  // CSSTS Config
  fs.writeFileSync(path.join(typesDir, 'csstsConfig.d.ts'), generateCsstsConfigType());
  console.log('✅ src/types/csstsConfig.d.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   Keywords 数: ${keywords.size}`);
  console.log(`   伪类数: ${pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoElements.length}`);
  console.log('\n✨ 所有文件生成完成!');
}

main();
