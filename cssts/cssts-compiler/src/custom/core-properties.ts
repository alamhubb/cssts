/**
 * 核心属性列表 - 基于 Tailwind 风格的精简属性集
 * 
 * 只包含最常用的属性，可以大幅减少生成的原子类数量
 * 从 53,000+ 个降到约 1,500 个
 */

import type { CssPropertyCamelName } from '../config/property-config.ts';

// ==================== 布局属性 ====================
// 约 10 个属性，每个 5-10 个值 = 70 个原子类

export const LAYOUT_PROPERTIES: CssPropertyCamelName[] = [
  'display',           // block, inline, flex, grid, none 等
  'position',          // static, relative, absolute, fixed, sticky
  'top',               // 数值
  'right',             // 数值
  'bottom',            // 数值
  'left',              // 数值
  'inset',             // 数值（top/right/bottom/left 简写）
  'zIndex',            // 数值
  'float',             // left, right, none
  'clear',             // left, right, both, none
];

// ==================== Flexbox 属性 ====================
// 约 5 个属性，每个 5-10 个值 = 40 个原子类

export const FLEXBOX_PROPERTIES: CssPropertyCamelName[] = [
  'flex',              // 0, 1, auto, none 等
  'flexDirection',     // row, column, row-reverse, column-reverse
  'justifyContent',    // flex-start, center, space-between 等
  'alignItems',        // flex-start, center, stretch 等
  'gap',               // 数值
];

// ==================== Grid 属性 ====================
// 约 3 个属性，每个 10-20 个值 = 50 个原子类

export const GRID_PROPERTIES: CssPropertyCamelName[] = [
  'gridTemplateColumns',  // repeat, auto-fit, minmax 等
  'gridTemplateRows',     // repeat, auto-fit, minmax 等
  'gap',                  // 数值（与 Flexbox 共用）
];

// ==================== 尺寸属性 ====================
// 约 6 个属性，每个 24 个值（spacing）= 144 个原子类

export const SIZING_PROPERTIES: CssPropertyCamelName[] = [
  'width',             // 数值 + 百分比
  'height',            // 数值 + 百分比
  'minWidth',          // 数值
  'maxWidth',          // 数值
  'minHeight',         // 数值
  'maxHeight',         // 数值
];

// ==================== 间距属性 ====================
// 约 2 个属性，每个 24 个值（spacing）= 48 个原子类

export const SPACING_PROPERTIES: CssPropertyCamelName[] = [
  'margin',            // 数值
  'padding',           // 数值
];

// ==================== 背景属性 ====================
// 约 3 个属性，每个 50-500 个值（颜色）= 300 个原子类

export const BACKGROUND_PROPERTIES: CssPropertyCamelName[] = [
  'backgroundColor',   // 颜色值
  'backgroundSize',    // cover, contain, auto 等
];

// ==================== 文本属性 ====================
// 约 5 个属性，每个 10-50 个值 = 150 个原子类

export const TEXT_PROPERTIES: CssPropertyCamelName[] = [
  'color',             // 颜色值
  'fontSize',          // xs, sm, base, lg, xl 等
  'fontWeight',        // 100, 200, 300, 400, 500, 600, 700, 800, 900
  'lineHeight',        // 1, 1.25, 1.5, 1.75, 2 等
  'textAlign',         // left, center, right, justify
];

// ==================== 边框属性 ====================
// 约 4 个属性，每个 10-50 个值 = 100 个原子类

export const BORDER_PROPERTIES: CssPropertyCamelName[] = [
  'border',            // 宽度 + 样式 + 颜色
  'borderColor',       // 颜色值
  'borderRadius',      // 数值
  'borderWidth',       // 数值
];

// ==================== 阴影属性 ====================
// 约 2 个属性，每个 5-10 个值 = 15 个原子类

export const SHADOW_PROPERTIES: CssPropertyCamelName[] = [
  'boxShadow',         // none, sm, md, lg, xl 等
  'textShadow',        // none, sm, md, lg 等
];

// ==================== 变换属性 ====================
// 约 4 个属性，每个 10-20 个值 = 60 个原子类

export const TRANSFORM_PROPERTIES: CssPropertyCamelName[] = [
  'transform',         // none, rotate, scale, translate 等
  'rotate',            // 角度值
  'scale',             // 数值
  'translate',         // 数值
];

// ==================== 过渡属性 ====================
// 约 2 个属性，每个 5-10 个值 = 15 个原子类

export const TRANSITION_PROPERTIES: CssPropertyCamelName[] = [
  'transition',        // all, colors, opacity 等
  'animation',         // animation-name, animation-duration 等
];

// ==================== 其他属性 ====================
// 约 3 个属性，每个 20-50 个值 = 100 个原子类

export const OTHER_PROPERTIES: CssPropertyCamelName[] = [
  'opacity',           // 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
  'cursor',            // pointer, default, text, move 等
  'overflow',          // visible, hidden, scroll, auto
];

// ==================== 合并所有核心属性 ====================

export const CORE_PROPERTIES: CssPropertyCamelName[] = [
  ...LAYOUT_PROPERTIES,
  ...FLEXBOX_PROPERTIES,
  ...GRID_PROPERTIES,
  ...SIZING_PROPERTIES,
  ...SPACING_PROPERTIES,
  ...BACKGROUND_PROPERTIES,
  ...TEXT_PROPERTIES,
  ...BORDER_PROPERTIES,
  ...SHADOW_PROPERTIES,
  ...TRANSFORM_PROPERTIES,
  ...TRANSITION_PROPERTIES,
  ...OTHER_PROPERTIES,
];
