/**
 * 测试类型提示是否正常工作
 * 
 * 预期效果：
 * - percentage 配置时，只提示 percentage 类别的单位（percent, vh, vw, vmin, vmax, svh, svw, lvh, lvw, dvh, dvw, vi, vb）
 * - pixel 配置时，只提示 px
 * - 配置 px 在 percentage 下应该报错
 */

import type { CssCategoryConfigMapPrecise, CsstsStepConfig } from './types/cssPropertyConfig';

// ✅ 正确：percentage 下配置 vh, vw 等
const config1: CssCategoryConfigMapPrecise = {
  percentage: {
    vh: { min: 1, max: 100 },
    vw: { step: 1 },
    percent: { min: 0, max: 100 },
  },
};

// ✅ 正确：percentage 下使用数组
const config2: CssCategoryConfigMapPrecise = {
  percentage: ['vh', 'vw', 'svh', 'percent'],
};

// ✅ 正确：pixel 下配置 px
const config3: CssCategoryConfigMapPrecise = {
  pixel: {
    px: { step: 1, min: 0, max: 1000 },
  },
};

// ✅ 正确：angle 下配置 deg, rad
const config4: CssCategoryConfigMapPrecise = {
  angle: {
    deg: { step: 1 },
    rad: { step: 0.1 },
  },
};

// ❌ 错误：percentage 下配置 px（应该报错）
const config5: CssCategoryConfigMapPrecise = {
  percentage: {
    // @ts-expect-error px 不属于 percentage 类别
    px: { step: 1 },
  },
};

// ❌ 错误：pixel 下配置 vh（应该报错）
const config6: CssCategoryConfigMapPrecise = {
  pixel: {
    // @ts-expect-error vh 不属于 pixel 类别
    vh: { step: 1 },
  },
};

// ❌ 错误：percentage 数组中包含 px（应该报错）
const config7: CssCategoryConfigMapPrecise = {
  // @ts-expect-error px 不属于 percentage 类别
  percentage: ['vh', 'px'],
};

console.log('类型测试通过！');
