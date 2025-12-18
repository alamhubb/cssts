/**
 * CsstsConfig 使用示例
 * 
 * 展示如何通过构造函数传入配置对象来自定义生成行为
 */

import { CsstsConfig } from '../cssts-config.js';

// ==================== 示例 1: 默认配置 ====================
const defaultConfig = new CsstsConfig();
console.log('默认配置创建成功');

// ==================== 示例 2: 只生成指定属性 ====================
const minimalConfig = new CsstsConfig({
  includeProperties: ['width', 'height', 'margin', 'padding', 'display', 'flexDirection'],
});
console.log('最小属性配置:', minimalConfig.includeProperties);

// ==================== 示例 3: 只使用特定单位分类 ====================
const pxOnlyConfig = new CsstsConfig({
  includeUnitCategories: ['px', 'percentage'],
  excludeUnitCategories: [], // 会被 includeUnitCategories 覆盖
});
console.log('只使用 px 和百分比:', pxOnlyConfig.includeUnitCategories);

// ==================== 示例 4: 自定义单位分类的数值范围 ====================
const customPresetsConfig = new CsstsConfig({
  unitCategories: {
    px: { presets: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128] },
    percentage: { presets: [0, 25, 50, 75, 100] },
  },
});
console.log('自定义 presets 配置:', customPresetsConfig.unitCategories);

// ==================== 示例 5: 排除冷门属性 ====================
const excludeRareConfig = new CsstsConfig({
  excludeProperties: ['azimuth', 'elevation', 'richness', 'speakHeader'],
});
console.log('排除冷门属性数量:', excludeRareConfig.excludeProperties.length);

// ==================== 示例 6: 添加自定义属性 ====================
const customPropsConfig = new CsstsConfig({
  customProperties: {
    'theme-color': 'var(--primary)',
    'spacing': {
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
  },
});
console.log('自定义属性:', customPropsConfig.customProperties);

// ==================== 示例 7: 使用静态工厂方法 ====================
const factoryConfig = CsstsConfig.create({
  includeProperties: ['color', 'backgroundColor'],
  includeColors: ['red', 'blue', 'green'],
});
console.log('工厂方法创建:', factoryConfig.includeColors);

// ==================== 示例 8: 完整的生产配置 ====================
const productionConfig = new CsstsConfig({
  // 只生成常用属性
  includeProperties: [
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap',
    'position', 'top', 'right', 'bottom', 'left', 'zIndex',
    'color', 'backgroundColor', 'borderRadius', 'opacity',
    'fontSize', 'fontWeight', 'lineHeight', 'textAlign',
  ],
  // 只使用常用单位
  includeUnitCategories: ['px', 'percentage', 'fontRelative'],
  // 精简的数值预设
  unitCategories: {
    px: { presets: [0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96] },
    percentage: { presets: [0, 25, 33.333333, 50, 66.666667, 75, 100] },
    fontRelative: { presets: [0, 0.5, 0.75, 1, 1.25, 1.5, 2] },
  },
});
console.log('生产配置 - 属性数量:', productionConfig.includeProperties?.length);

console.log('\n✅ 所有示例运行成功！');
