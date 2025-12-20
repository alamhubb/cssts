/**
 * 验证类型提示
 * 
 * 在 IDE 中测试：
 * 1. 在 percentage: { } 内部输入时，应该只提示 vh, vw, percent 等
 * 2. 在 pixel: { } 内部输入时，应该只提示 px
 */

import type { CssCategoryConfigMapPrecise, DefineCategoryConfig } from './types/cssPropertyConfig';

// 辅助函数实现
const defineCategoryConfig: DefineCategoryConfig = (config) => config;

// 方式1：直接类型注解（智能提示有效，但错误检查宽松）
const config1: CssCategoryConfigMapPrecise = {
  percentage: {
    // 在这里输入，IDE 应该只提示: percent, vh, vw, vmin, vmax, svh, svw, lvh, lvw, dvh, dvw, vi, vb
    vh: { min: 1, max: 100 },
  },
  pixel: {
    // 在这里输入，IDE 应该只提示: px
    px: { step: 1 },
  },
};

// 方式2：使用辅助函数（智能提示有效，错误检查更严格）
const config2 = defineCategoryConfig({
  percentage: {
    vh: { min: 1, max: 100 },
    // px: { step: 1 },  // 取消注释会报错
  },
  angle: {
    deg: { step: 1 },
  },
});

// 方式3：使用 satisfies（TypeScript 4.9+，最严格）
const config3 = {
  percentage: {
    vh: { min: 1, max: 100 },
  },
} satisfies CssCategoryConfigMapPrecise;

