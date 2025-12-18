/**
 * CsstsConfig 配置测试脚本
 * 运行: npx tsx scripts/test-config.ts
 */

import {
  CsstsConfig,
  DEFAULT_PROGRESSIVE_RANGES,
  DEFAULT_UNIT_CONFIGS,
} from '../src/css-types/cssts-config';
import {
  CssPropertyConfigMap,
  cssPropertyNameMap,
} from '../src/css-types/property-config';
import {
  generateValuesForUnit,
  getActiveProperties,
  getActiveKeywords,
  getActiveNumberTypes,
  calculateAtomStats,
} from '../src/css-types/config-utils';

// 简单断言函数
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`❌ FAILED: ${message}`);
  }
  console.log(`✅ PASSED: ${message}`);
}

function assertContains<T>(arr: T[], item: T, message: string) {
  assert(arr.includes(item), `${message} (expected to contain ${item})`);
}

function assertNotContains<T>(arr: T[], item: T, message: string) {
  assert(!arr.includes(item), `${message} (expected NOT to contain ${item})`);
}

console.log('\n========== CsstsConfig 测试 ==========\n');

// 测试 1: 默认配置
console.log('--- 测试 1: 默认配置 ---');
const config = new CsstsConfig();
assert(config.excludeProperties.length === 0, '默认 excludeProperties 为空');
assert(config.excludeKeywords.length === 0, '默认 excludeKeywords 为空');
assert(config.properties instanceof CssPropertyConfigMap, 'properties 是 CssPropertyConfigMap 实例');

// 测试 2: 属性配置
console.log('\n--- 测试 2: 属性配置 ---');
assert(config.properties.width !== undefined, 'width 属性存在');
assert(config.properties.display !== undefined, 'display 属性存在');
assert(config.properties.color !== undefined, 'color 属性存在');
assert(config.properties.backgroundColor !== undefined, 'backgroundColor 属性存在');

// 测试 3: display 关键词
console.log('\n--- 测试 3: display 关键词 ---');
const displayConfig = config.properties.display;
assertContains(displayConfig.keywords, 'flex', 'display 包含 flex');
assertContains(displayConfig.keywords, 'block', 'display 包含 block');
assertContains(displayConfig.keywords, 'inline', 'display 包含 inline');
assertContains(displayConfig.keywords, 'none', 'display 包含 none');
assertContains(displayConfig.keywords, 'grid', 'display 包含 grid');

// 测试 4: color 关键词（包含颜色）
console.log('\n--- 测试 4: color 关键词 ---');
const colorConfig = config.properties.color;
assertContains(colorConfig.keywords, 'red', 'color 包含 red');
assertContains(colorConfig.keywords, 'blue', 'color 包含 blue');
assertContains(colorConfig.keywords, 'transparent', 'color 包含 transparent');
assertContains(colorConfig.keywords, 'currentColor', 'color 包含 currentColor');

// 测试 5: width 数值类型
console.log('\n--- 测试 5: width 数值类型 ---');
const widthConfig = config.properties.width;
assert(widthConfig.numberTypes !== undefined, 'width 有 numberTypes');
assert(widthConfig.numberTypes.length > 0, 'width numberTypes 不为空');
console.log(`  width numberTypes: ${widthConfig.numberTypes.join(', ')}`);

// 测试 6: 生成 px 数值
console.log('\n--- 测试 6: 生成 px 数值 ---');
const pxValues = generateValuesForUnit('px', config);
assertContains(pxValues, 1, 'px 包含 1');
assertContains(pxValues, 50, 'px 包含 50');
assertContains(pxValues, 100, 'px 包含 100');
assertContains(pxValues, 200, 'px 包含 200');
assertContains(pxValues, 500, 'px 包含 500');
assertContains(pxValues, 1000, 'px 包含 1000');
console.log(`  px 值数量: ${pxValues.length}`);
console.log(`  px 前20个值: ${pxValues.slice(0, 20).join(', ')}`);

// 测试 7: 生成 rem 数值（固定步长）
console.log('\n--- 测试 7: 生成 rem 数值 ---');
const remValues = generateValuesForUnit('rem', config);
assertContains(remValues, 1, 'rem 包含 1');
assertContains(remValues, 50, 'rem 包含 50');
assertContains(remValues, 100, 'rem 包含 100');
console.log(`  rem 值数量: ${remValues.length}`);

// 测试 8: 自定义单位配置
console.log('\n--- 测试 8: 自定义单位配置 ---');
const customConfig = new CsstsConfig();
customConfig.unitConfigs['px'] = { min: 10, max: 50, step: 10 };
const customPxValues = generateValuesForUnit('px', customConfig);
assert(customPxValues.length === 5, '自定义 px 有 5 个值');
assert(JSON.stringify(customPxValues) === JSON.stringify([10, 20, 30, 40, 50]), '自定义 px 值正确');

// 测试 9: 负数支持
console.log('\n--- 测试 9: 负数支持 ---');
const negConfig = new CsstsConfig();
negConfig.unitConfigs['px'] = { min: 1, max: 10, step: 5, negative: true };
const negValues = generateValuesForUnit('px', negConfig);
console.log(`  负数 px 值: ${negValues.join(', ')}`);
assertContains(negValues, 1, '负数 px 包含 1');
assertContains(negValues, 6, '负数 px 包含 6');
assertContains(negValues, 10, '负数 px 包含 10');
// 检查是否有负数
const hasNegative = negValues.some(v => v < 0);
assert(hasNegative, '负数 px 包含负数值');

// 测试 10: 排除属性
console.log('\n--- 测试 10: 排除属性 ---');
const excludeConfig = new CsstsConfig();
excludeConfig.excludeProperties = ['width', 'height'];
const activeProps = getActiveProperties(excludeConfig);
assertNotContains(activeProps, 'width', '排除后不包含 width');
assertNotContains(activeProps, 'height', '排除后不包含 height');
assertContains(activeProps, 'color', '排除后仍包含 color');

// 测试 11: 排除关键词
console.log('\n--- 测试 11: 排除关键词 ---');
const excludeKwConfig = new CsstsConfig();
excludeKwConfig.excludeKeywords = ['flex', 'grid'];
const activeKeywords = getActiveKeywords('display', excludeKwConfig);
assertNotContains(activeKeywords, 'flex', '排除后不包含 flex');
assertNotContains(activeKeywords, 'grid', '排除后不包含 grid');
assertContains(activeKeywords, 'block', '排除后仍包含 block');

// 测试 12: 排除颜色
console.log('\n--- 测试 12: 排除颜色 ---');
const excludeColorConfig = new CsstsConfig();
excludeColorConfig.excludeColors = ['red', 'blue'];
const activeColors = getActiveKeywords('color', excludeColorConfig);
assertNotContains(activeColors, 'red', '排除后不包含 red');
assertNotContains(activeColors, 'blue', '排除后不包含 blue');
assertContains(activeColors, 'green', '排除后仍包含 green');

// 测试 13: 统计
console.log('\n--- 测试 13: 统计 ---');
const stats = calculateAtomStats(config);
console.log(`  总属性数: ${stats.totalProperties}`);
console.log(`  活跃属性数: ${stats.activeProperties}`);
console.log(`  关键词原子类: ${stats.keywordAtoms}`);
console.log(`  数值原子类(估算): ${stats.numericAtoms}`);
console.log(`  自定义原子类: ${stats.customAtoms}`);
console.log(`  总原子类(估算): ${stats.totalAtoms}`);

// 测试 14: 属性名映射
console.log('\n--- 测试 14: 属性名映射 ---');
assert(cssPropertyNameMap.backgroundColor === 'background-color', 'backgroundColor -> background-color');
assert(cssPropertyNameMap.fontSize === 'font-size', 'fontSize -> font-size');
assert(cssPropertyNameMap.borderRadius === 'border-radius', 'borderRadius -> border-radius');
assert(cssPropertyNameMap.width === 'width', 'width -> width');

console.log('\n========== 所有测试通过! ==========\n');
