/**
 * 测试泛型版本的四层类型约束
 * Property → NumberType → Category → Unit
 */

import type { 
  CssCategoryConfigMapPrecise,
  CssNumberTypeConfigMapPrecise,
  CssPropertyConfigMapPrecise,
} from './types/cssPropertyConfig';

// ==================== 测试 1：Category → Unit 约束 ====================

// ✅ 正确：pixel 下只能配置 px
const categoryConfig1: CssCategoryConfigMapPrecise = {
  pixel: {
    px: { step: 1 }
  }
};

// ✅ 正确：fontRelative 下可以配置 em, rem 等
const categoryConfig2: CssCategoryConfigMapPrecise = {
  fontRelative: {
    em: { step: 0.125 },
    rem: { step: 0.25 }
  }
};

// ❌ 错误：pixel 下不能配置 em
const categoryConfig3: CssCategoryConfigMapPrecise = {
  pixel: {
    // @ts-expect-error em 不属于 pixel 类别
    em: { step: 1 }
  }
};

// ==================== 测试 2：NumberType → Category 约束 ====================

// ✅ 正确：length 下可以配置 pixel, fontRelative 等
const numberTypeConfig1: CssNumberTypeConfigMapPrecise = {
  length: {
    pixel: {
      px: { step: 1 }
    }
  }
};

// ✅ 正确：angle 下可以配置 angle category
const numberTypeConfig2: CssNumberTypeConfigMapPrecise = {
  angle: {
    angle: {
      deg: { step: 1 }
    }
  }
};

// ❌ 错误：angle 下不能配置 pixel category
const numberTypeConfig3: CssNumberTypeConfigMapPrecise = {
  // @ts-expect-error pixel 不属于 angle 的 category
  angle: {
    pixel: {
      px: { step: 1 }
    }
  }
};

// ==================== 测试 3：Property → NumberType 约束 ====================

// ✅ 正确：fontSize 支持 length 和 percentage
const propertyConfig1: CssPropertyConfigMapPrecise = {
  fontSize: {
    length: {
      pixel: {
        px: { step: 1 }
      }
    }
  }
};

// ✅ 正确：width 支持 length 和 percentage
const propertyConfig2: CssPropertyConfigMapPrecise = {
  width: {
    percentage: {
      percentage: ['percent', 'vh', 'vw']
    }
  }
};

// ✅ 正确：display 只有 keywords，没有 numberTypes
const propertyConfig3: CssPropertyConfigMapPrecise = {
  display: {
    keywords: ['flex', 'block', 'inline']
  }
};

// ❌ 错误：fontSize 不支持 angle numberType
const propertyConfig4: CssPropertyConfigMapPrecise = {
  fontSize: {
    // @ts-expect-error angle 不是 fontSize 支持的 numberType
    angle: {
      angle: {
        deg: { step: 1 }
      }
    }
  }
};

console.log('四层泛型类型约束测试完成！');
