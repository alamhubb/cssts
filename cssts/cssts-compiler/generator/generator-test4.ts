/**
 * 伪类/伪元素类型定义生成脚本
 *
 * 基于生成的 propertyKeywords.ts 和 propertyNumberTypes.ts
 * 生成伪类和伪元素的样式配置类型定义
 *
 * 生成文件：src/types/pseudoStyles.d.ts
 *
 * 运行方式：npx tsx generator/generator-test4.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出目录
const typesDir = path.join(__dirname, '../src/types');

// 确保输出目录存在
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// ==================== 工具函数 ====================

/**
 * 将 kebab-case 转换为 camelCase
 * 例如：focus-visible -> focusVisible
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

// ==================== 加载伪类/伪元素数据 ====================

function loadPseudoStandards(): { pseudoClasses: string[]; pseudoElements: string[] } {
  const standardsPath = path.join(__dirname, 'datajson', 'pseudo-standards.json');
  const standardsContent = fs.readFileSync(standardsPath, 'utf-8');
  const standards = JSON.parse(standardsContent);
  
  return {
    pseudoClasses: standards.pseudoClasses,
    pseudoElements: standards.pseudoElements
  };
}

// ==================== 生成伪类/伪元素类型定义 ====================

function generatePseudoStylesFile(pseudoClasses: string[], pseudoElements: string[]): string {
  const lines: string[] = [
    '/**',
    ' * 伪类/伪元素样式类型定义（自动生成）',
    ' *',
    ' * 基于生成的 propertyKeywords.ts 和 propertyNumberTypes.ts',
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
    'export interface PseudoClassStylesConfig {',
  ];

  // 按分类添加伪类
  const categories = {
    'user-action': ['hover', 'active', 'focus', 'focus-visible', 'focus-within'],
    'link': ['link', 'visited', 'any-link', 'local-link', 'target', 'target-within'],
    'form': ['enabled', 'disabled', 'read-only', 'read-write', 'placeholder-shown', 'default', 'checked', 'indeterminate', 'valid', 'invalid', 'in-range', 'out-of-range', 'required', 'optional', 'user-valid', 'user-invalid', 'autofill'],
    'structural': ['root', 'empty', 'first-child', 'last-child', 'only-child', 'first-of-type', 'last-of-type', 'only-of-type', 'nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type'],
    'logical': ['not', 'is', 'where', 'has'],
    'linguistic': ['lang', 'dir'],
    'display': ['fullscreen', 'modal', 'picture-in-picture'],
    'media': ['playing', 'paused', 'seeking', 'buffering', 'stalled', 'muted', 'volume-locked'],
    'web-components': ['defined', 'host', 'host-context', 'scope'],
    'other': ['blank']
  };

  for (const [categoryName, pseudoClasses_] of Object.entries(categories)) {
    lines.push('');
    lines.push(`  // ${categoryName} 伪类`);
    
    for (const pseudoClass of pseudoClasses_) {
      const camelName = kebabToCamel(pseudoClass);
      lines.push(`  ${camelName}?: CSSPropertiesValueType;`);
    }
  }

  lines.push('}', '');

  // 伪元素类型
  lines.push('// ==================== 伪元素样式类型 ====================', '');
  lines.push('/**', ' * 伪元素样式配置类型', ' * 每个伪元素可以配置 CSS 属性值', ' */', 'export interface PseudoElementStylesConfig {');

  for (const pseudoElement of pseudoElements) {
    const camelName = kebabToCamel(pseudoElement);
    lines.push(`  ${camelName}?: CSSPropertiesValueType;`);
  }

  lines.push('}', '');

  // 完整的伪类/伪元素样式配置
  lines.push('// ==================== 完整伪类/伪元素样式配置 ====================', '');
  lines.push('/**', ' * 完整的伪类和伪元素样式配置', ' */', 'export interface PseudoStylesConfig extends PseudoClassStylesConfig, PseudoElementStylesConfig {}', '');

  return lines.join('\n');
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 Generating pseudo-class/pseudo-element type definitions...\n');

  const { pseudoClasses, pseudoElements } = loadPseudoStandards();

  const code = generatePseudoStylesFile(pseudoClasses, pseudoElements);

  fs.writeFileSync(path.join(typesDir, 'pseudoStyles.d.ts'), code);
  console.log('✅ src/types/pseudoStyles.d.ts');

  console.log(`\n📊 Statistics:`);
  console.log(`   Pseudo classes: ${pseudoClasses.length}`);
  console.log(`   Pseudo elements: ${pseudoElements.length}`);
  console.log('\n✨ Type definition generation completed!');
}

main();
