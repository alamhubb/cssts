/**
 * 测试 Category → Unit 的精准类型约束
 */

import type { CssCategoryConfigMapPrecise } from './types/cssPropertyConfig';

// ✅ 正确用法：pixel 下只能配置 px
const config1: CssCategoryConfigMapPrecise = {
  pixel: {
    px: { step: 1 }  // ✅ px 是 pixel 的唯一 unit
  }
};

// ✅ 正确用法：fontRelative 下可以配置 em, rem 等
const config2: CssCategoryConfigMapPrecise = {
  fontRelative: {
    em: { step: 0.125 },
    rem: { step: 0.25 },
    ch: { step: 1 }
  }
};

// ✅ 正确用法：time 下可以配置 s, ms
const config3: CssCategoryConfigMapPrecise = {
  time: {
    s: { step: 0.1 },
    ms: { step: 100 }
  }
};

// 测试错误配置：

// ❌ 错误：pixel 下不能配置 em
const wrongConfig1: CssCategoryConfigMapPrecise = {
  pixel: {
    // @ts-expect-error em 不属于 pixel 类别
    em: { step: 1 }
  }
};

// ❌ 错误：time 下不能配置 px
const wrongConfig2: CssCategoryConfigMapPrecise = {
  time: {
    // @ts-expect-error px 不属于 time 类别
    px: { step: 1 }
  }
};

console.log('Category → Unit 精准约束已生效！');
