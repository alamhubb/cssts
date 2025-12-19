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

  const sortedKeywords = Array.from(keywords).sort();

  lines.push('// ==================== 所有 Keywords ====================', '');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
    lines.push(`export const KEYWORD_${constName} = '${keyword}' as const;`);
  }

  lines.push('');
  lines.push('// ==================== Keywords 映射 ====================', '');
  lines.push('export const KEYWORD_MAP: Record<string, string> = {');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
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

  const sortedKeywords = Array.from(keywords).sort();
  const constNames = sortedKeywords.map(k => `KEYWORD_${keywordToConstName(k)}`);
  lines.push(`import { ${constNames.join(', ')}, KEYWORD_MAP } from './keywordConstants';`, '');

  lines.push('export const keywords = [');
  
  for (const keyword of sortedKeywords) {
    const constName = keywordToConstName(keyword);
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

  console.log(`\n📊 统计信息:`);
  console.log(`   Keywords 数: ${keywords.size}`);
  console.log(`   伪类数: ${pseudoClasses.length}`);
  console.log(`   伪元素数: ${pseudoElements.length}`);
  console.log('\n✨ 所有文件生成完成!');
}

main();
