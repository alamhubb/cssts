/**
 * 统一生成脚本
 *
 * 生成所有 CSS 类型相关的数据和类型定义文件
 * 
 * 数据来源：
 * - data 文件：从已生成的 data 文件读取（propertyName, propertyKeywords, propertyNumberTypes, pseudoClasses, pseudoElements）
 * - datajson：numberMapping.json, pseudo-standards.json
 * - csstree：keywords, colors, property 数据
 *
 * 运行方式：npx tsx generator/generator-all2.ts
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

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function camelToUpperSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}


// ==================== 从 data 文件读取数据 ====================

function loadPropertyNames(): string[] {
  const filePath = path.join(dataDir, 'propertyName.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取所有 camelCase 属性名
  const regex = /^\s+(\w+):\s*'/gm;
  const names: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }
  return names.sort();
}

function loadPropertyKeywordsExports(): Set<string> {
  const filePath = path.join(dataDir, 'propertyKeywords.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取所有 export const XXX_KEYWORDS
  const regex = /export const (\w+_KEYWORDS)/g;
  const exports = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.add(match[1]);
  }
  return exports;
}

function loadPropertyNumberTypesExports(): Set<string> {
  const filePath = path.join(dataDir, 'propertyNumberTypes.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取所有 export const XXX_NUMBER_TYPES
  const regex = /export const (\w+_NUMBER_TYPES)/g;
  const exports = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.add(match[1]);
  }
  return exports;
}

function loadPseudoClasses(): string[] {
  const filePath = path.join(dataDir, 'pseudoClasses.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取数组中的字符串
  const regex = /'([^']+)'/g;
  const classes: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    classes.push(match[1]);
  }
  return classes;
}

function loadPseudoElements(): string[] {
  const filePath = path.join(dataDir, 'pseudoElements.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取数组中的字符串
  const regex = /'([^']+)'/g;
  const elements: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    elements.push(match[1]);
  }
  return elements;
}

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const jsonPath = path.join(__dirname, 'datajson/pseudo-standards.json');
  const content = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(content);
}


// ==================== Keywords 生成（从 csstree） ====================

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
  return `/**
 * 所有 CSS Keywords 和 Colors（自动生成）
 *
 * 组合 keywords 和 colors
 */

import { keywords } from './keywords';
import { ALL_COLORS } from './color';

// ==================== 所有 Keywords 和 Colors ====================

export const allKeywords = [...keywords, ...ALL_COLORS] as const;

export { keywords, ALL_COLORS };
`;
}


// ==================== Types 生成（从 data 文件） ====================

function generateCssKeywordsType(): string {
  return `/**
 * CSS Keywords 类型定义（自动生成）
 *
 * 包含所有 keywords 和 colors 的类型定义
 */

import type { keywords } from '../data/keywords';
import type { allKeywords } from '../data/allKeywords';
import type { ALL_COLORS } from '../data/color';

// ==================== Keywords 类型 ====================

export type CssKeywordName = typeof keywords[number];

// ==================== Colors 类型 ====================

export type CssColorName = typeof ALL_COLORS[number];

// ==================== 所有 Keywords 和 Colors 类型 ====================

export type CssAllKeywordName = typeof allKeywords[number];
`;
}

function generateNumberTypesType(): string {
  return `/**
 * NumberTypes 类型定义（自动生成）
 *
 * 包含所有 CSS 数值类型的名称、category 和 units
 */

import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';
import type { ALL_NUMBER_CATEGORIES, ALL_UNITS } from '../data/numberTypeCategory';

// ==================== NumberTypes 名称 ====================

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// ==================== Number Categories ====================

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

// ==================== Units ====================

export type CssNumberUnitName = typeof ALL_UNITS[number];
`;
}

function generateCssPseudoClassElementType(): string {
  return `/**
 * CSS 伪类和伪元素类型定义（自动生成）
 *
 * 包含所有伪类和伪元素的名称类型
 */

import type { pseudoClasses } from '../data/pseudoClasses';
import type { pseudoElements } from '../data/pseudoElements';

// ==================== 伪类名称 ====================

export type CssPseudoClassName = typeof pseudoClasses[number];

// ==================== 伪元素名称 ====================

export type CssPseudoElementName = typeof pseudoElements[number];
`;
}

function generateCssPropertyConfigType(): string {
  return `/**
 * CSS 属性配置类型定义（自动生成）
 *
 * 包含 CssPropertyName 和联合类型 CssProperty
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';
import type { CSSPropertiesType } from './cssProperties';

// ==================== 属性名类型 ====================

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// ==================== 联合类型 ====================

// 单个属性或属性集合
export type CssProperty = CssPropertyName | CSSPropertiesType;

// 单个或多个属性
export type CssProperties = CssProperty | CssProperty[];
`;
}


// ==================== cssProperties.d.ts 生成（从 data 文件） ====================

function generateCssPropertiesType(): string {
  const propertyNames = loadPropertyNames();
  const keywordsExports = loadPropertyKeywordsExports();
  const numberTypesExports = loadPropertyNumberTypesExports();

  const lines: string[] = [
    '/**',
    ' * CSS 属性类型定义（自动生成）',
    ' *',
    ' * 每个属性的 keywords 和 numberTypes 类型',
    ' */',
    '',
    "import type * as Keywords from '../data/propertyKeywords';",
    "import type * as NumberTypes from '../data/propertyNumberTypes';",
    '',
    '// ==================== 属性类型 ====================',
    '',
  ];

  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const keywordsConst = `${constName}_KEYWORDS`;
    const numberTypesConst = `${constName}_NUMBER_TYPES`;
    
    const hasKeywords = keywordsExports.has(keywordsConst);
    const hasNumberTypes = numberTypesExports.has(numberTypesConst);
    
    if (!hasKeywords && !hasNumberTypes) continue;

    lines.push(`export interface ${camelName}PropertyType {`);
    
    if (hasKeywords) {
      lines.push(`  keywords: typeof Keywords.${keywordsConst}[number][];`);
    }
    
    if (hasNumberTypes) {
      lines.push(`  numberTypes: typeof NumberTypes.${numberTypesConst}[number][];`);
    }
    
    lines.push('}');
    lines.push('');
  }

  // 生成属性映射类型
  lines.push('// ==================== 属性映射 ====================', '');
  lines.push('export interface CSSPropertiesType {');
  
  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const keywordsConst = `${constName}_KEYWORDS`;
    const numberTypesConst = `${constName}_NUMBER_TYPES`;
    
    const hasKeywords = keywordsExports.has(keywordsConst);
    const hasNumberTypes = numberTypesExports.has(numberTypesConst);
    
    if (hasKeywords || hasNumberTypes) {
      lines.push(`  ${camelName}?: ${camelName}PropertyType;`);
    }
  }
  
  lines.push('}', '');

  return lines.join('\n');
}

// ==================== cssPropertiesValue.d.ts 生成（从 data 文件） ====================

function generateCssPropertiesValueType(): string {
  const propertyNames = loadPropertyNames();
  const keywordsExports = loadPropertyKeywordsExports();

  const lines: string[] = [
    '/**',
    ' * CSS 属性值类型定义（自动生成）',
    ' *',
    ' * 每个属性的值类型为：关键字类型 | string',
    ' */',
    '',
    "import type * as Keywords from '../data/propertyKeywords';",
    '',
    '// ==================== 属性值映射 ====================',
    '',
    'export interface CSSPropertiesValueType {',
  ];

  for (const camelName of propertyNames) {
    const constName = camelToUpperSnake(camelName);
    const keywordsConst = `${constName}_KEYWORDS`;
    
    if (keywordsExports.has(keywordsConst)) {
      lines.push(`  ${camelName}?: typeof Keywords.${keywordsConst}[number] | string;`);
    }
  }
  
  lines.push('}', '');

  return lines.join('\n');
}


// ==================== pseudoStyles.d.ts 生成（从 data 文件） ====================

function generatePseudoStylesType(): string {
  const pseudoClasses = loadPseudoClasses();
  const pseudoElements = loadPseudoElements();

  const lines: string[] = [
    '/**',
    ' * 伪类/伪元素样式类型定义（自动生成）',
    ' *',
    ' * 基于 data/pseudoClasses.ts 和 data/pseudoElements.ts',
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

  for (const pseudoClass of pseudoClasses) {
    const camelName = kebabToCamel(pseudoClass);
    lines.push(`  ${camelName}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');
  lines.push('// ==================== 伪元素样式类型 ====================', '');
  lines.push('/**', ' * 伪元素样式配置类型', ' * 每个伪元素可以配置 CSS 属性值', ' */', 'export interface CssPseudoElementConfig {');

  for (const pseudoElement of pseudoElements) {
    const camelName = kebabToCamel(pseudoElement);
    lines.push(`  ${camelName}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');

  return lines.join('\n');
}

// ==================== data 文件生成（伪类/伪元素） ====================

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


// ==================== csstsConfig.d.ts 生成 ====================

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
    step?: number | ProgressiveRange[];
    min?: number;
    max?: number;
    negative?: boolean;
    presets?: number[];
}

// ==================== 层级配置类型（从下到上依赖） ====================

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;

export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

export type CssCategoryValueConfig =
    | CsstsStepConfig
    | CssNumberUnitName[]
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;

export type CssCategoryConfigItem =
    | CssNumberCategoryName
    | CssCategoryConfigMap
    | CssUnitConfigMap;

export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMap;

export type CssNumberTypeValueConfig =
    | CsstsStepConfig
    | CssNumberCategoryName[]
    | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
    | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;

export type CssNumberTypeConfigItem =
    | CssNumberTypeName
    | CssNumberTypeConfigMap
    | CssCategoryConfigMap
    | CssUnitConfigMap;

export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMap;

// ==================== 排除配置类型 ====================

export type CssUnitExcludeItem = CssNumberUnitName;

export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;

export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

export type CssCategoryExcludeItem =
    | CssNumberCategoryName
    | CssCategoryExcludeMap
    | CssUnitExcludeMap;

export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMap;

export type CssNumberTypeExcludeValueConfig =
    | CssNumberCategoryName[]
    | CssCategoryExcludeMap
    | CssUnitExcludeMap;

export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;

export type CssNumberTypeExcludeItem =
    | CssNumberTypeName
    | CssNumberTypeExcludeMap
    | CssCategoryExcludeMap
    | CssUnitExcludeMap;

export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;

export interface CssPropertyBaseConfig {
    numberTypes?: CssNumberTypeName[];
    keywords?: CssKeywordName[];
    colors?: CssColorName[];
}

export type CssPropertyExcludeValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
    | (CssPropertyBaseConfig & CssCategoryExcludeMap)
    | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMap;

export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;

// ==================== 属性配置类型 ====================

export type CustomPropertyValue = string | Record<string, string>;

export type CssPropertyValueConfig =
    | CssPropertyBaseConfig
    | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
    | (CssPropertyBaseConfig & CssCategoryConfigMap)
    | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMap;

export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== CSSTS 配置接口 ====================

export interface CsstsConfig {
    properties?: CssPropertyConfig;
    excludeProperties?: CssPropertyExcludeConfig;
    numberTypes?: CssNumberTypeConfig;
    excludeNumberTypes?: CssNumberTypeExcludeConfig;
    unitCategories?: CssCategoryConfig;
    excludeUnitCategories?: CssCategoryExcludeConfig;
    units?: CssUnitConfig;
    excludeUnits?: CssUnitExcludeItem[];
    keywords?: CssKeywordName[];
    excludeKeywords?: CssKeywordName[];
    colors?: CssColorName[];
    excludeColors?: CssColorName[];
    customProperties?: Record<string, CustomPropertyValue>;
    progressiveRanges?: ProgressiveRange[];
    pseudoClasses?: CssPseudoClassName[];
    excludePseudoClasses?: CssPseudoClassName[];
    pseudoElements?: CssPseudoElementName[];
    excludePseudoElements?: CssPseudoElementName[];
    pseudoClassesConfig?: CssPseudoClassConfig;
    pseudoElementsConfig?: CssPseudoElementConfig;
}

export type CsstsConfigRequired = Required<CsstsConfig>;
`;
}


// ==================== 主函数 ====================

function main() {
  console.log('🚀 生成所有 CSS 类型和数据文件...\n');

  // 1. Keywords（从 csstree）
  const keywords = extractKeywordsFromCsstree();
  
  fs.writeFileSync(path.join(dataDir, 'keywordConstants.ts'), generateKeywordConstants(keywords));
  console.log('✅ src/data/keywordConstants.ts');

  fs.writeFileSync(path.join(dataDir, 'keywords.ts'), generateKeywords(keywords));
  console.log('✅ src/data/keywords.ts');

  fs.writeFileSync(path.join(dataDir, 'allKeywords.ts'), generateAllKeywords());
  console.log('✅ src/data/allKeywords.ts');

  // 2. Pseudo Classes and Elements（从 datajson）
  const pseudoStandards = loadPseudoStandards();

  fs.writeFileSync(path.join(dataDir, 'pseudoClasses.ts'), generatePseudoClasses(pseudoStandards.pseudoClasses));
  console.log('✅ src/data/pseudoClasses.ts');

  fs.writeFileSync(path.join(dataDir, 'pseudoElements.ts'), generatePseudoElements(pseudoStandards.pseudoElements));
  console.log('✅ src/data/pseudoElements.ts');

  // 3. Types（从 data 文件）
  fs.writeFileSync(path.join(typesDir, 'cssKeywords.d.ts'), generateCssKeywordsType());
  console.log('✅ src/types/cssKeywords.d.ts');

  fs.writeFileSync(path.join(typesDir, 'numberTypes.d.ts'), generateNumberTypesType());
  console.log('✅ src/types/numberTypes.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPseudoClassElement.d.ts'), generateCssPseudoClassElementType());
  console.log('✅ src/types/cssPseudoClassElement.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertyConfig.d.ts'), generateCssPropertyConfigType());
  console.log('✅ src/types/cssPropertyConfig.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssProperties.d.ts'), generateCssPropertiesType());
  console.log('✅ src/types/cssProperties.d.ts');

  fs.writeFileSync(path.join(typesDir, 'cssPropertiesValue.d.ts'), generateCssPropertiesValueType());
  console.log('✅ src/types/cssPropertiesValue.d.ts');

  fs.writeFileSync(path.join(typesDir, 'pseudoStyles.d.ts'), generatePseudoStylesType());
  console.log('✅ src/types/pseudoStyles.d.ts');

  fs.writeFileSync(path.join(typesDir, 'csstsConfig.d.ts'), generateCsstsConfigType());
  console.log('✅ src/types/csstsConfig.d.ts');

  console.log(`\n📊 统计信息:`);
  console.log(`   Keywords 数: ${keywords.size}`);
  console.log(`   伪类数: ${pseudoStandards.pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoStandards.pseudoElements.length}`);
  console.log('\n✨ 所有文件生成完成!');
}

main();
