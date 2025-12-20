/**
 * 测试 Category → Unit 精准类型提示
 */

// 从 data 导入 category 对应的 units 数组
import {
  PERCENTAGE_UNITS,
  PIXEL_UNITS,
  FONTRELATIVE_UNITS,
  ANGLE_UNITS,
} from './data/cssNumberData';

// ==================== 方式1：直接从数据推导类型 ====================

// 每个 category 的 unit 类型
type PercentageUnit = typeof PERCENTAGE_UNITS[number];  // 'percent' | 'vw' | 'vh' | ...
type PixelUnit = typeof PIXEL_UNITS[number];            // 'px'
type FontRelativeUnit = typeof FONTRELATIVE_UNITS[number]; // 'em' | 'rem' | ...
type AngleUnit = typeof ANGLE_UNITS[number];            // 'deg' | 'grad' | 'rad' | 'turn'

// 配置值类型
interface StepConfig {
  step?: number;
  min?: number;
  max?: number;
}

// 每个 category 的配置类型（key 只能是对应的 unit）
type PercentageConfig = { [K in PercentageUnit]?: StepConfig };
type PixelConfig = { [K in PixelUnit]?: StepConfig };
type FontRelativeConfig = { [K in FontRelativeUnit]?: StepConfig };
type AngleConfig = { [K in AngleUnit]?: StepConfig };

// 完整的 Category 配置
interface CategoryConfig {
  percentage?: PercentageConfig;
  pixel?: PixelConfig;
  fontRelative?: FontRelativeConfig;
  angle?: AngleConfig;
}

// ==================== 测试 ====================

// ✅ 正确：pixel 下只有 px
const config1: CategoryConfig = {
  pixel: {
    px: { step: 1 },
  },
};

// ✅ 正确：percentage 下有 vh, vw 等
const config2: CategoryConfig = {
  percentage: {
    vh: { min: 0, max: 100 },
    vw: { step: 1 },
  },
};

// ✅ 正确：angle 下有 deg, rad 等
const config3: CategoryConfig = {
  angle: {
    deg: { step: 1 },
    rad: { step: 0.1 },
  },
};

// ❌ 测试：在 pixel 下输入，IDE 应该只提示 px
const testPixel: CategoryConfig = {
  pixel: {

    // 在这里按 Ctrl+Space，应该只看到 px
  },
};

// ❌ 测试：在 angle 下输入，IDE 应该只提示 deg, grad, rad, turn
const testAngle: CategoryConfig = {
  angle: {
    // 在这里按 Ctrl+Space，应该只看到 deg, grad, rad, turn
  },
};
