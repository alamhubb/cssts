/**
 * 测试 colorTypes 类型约束
 */

import type { CsstsConfig } from './types/csstsConfig';
import type { CssColorTypeConfig } from './types/cssPropertyConfig';

// ✅ 正确：namedColor 使用 namedColor 里的颜色
const config1: CssColorTypeConfig = { namedColor: ['red', 'green', 'blue'] };

// ✅ 正确：deprecatedSystemColor 使用 deprecatedSystemColor 里的颜色
const config2: CssColorTypeConfig = { deprecatedSystemColor: ['ActiveBorder', 'Window'] };

// ❌ 错误：ActiveBorder 不属于 namedColor（应该报错）
const config3: CssColorTypeConfig = { namedColor: ['ActiveBorder', 'green'] };

// ❌ 错误：red 不属于 deprecatedSystemColor（应该报错）
const config4: CssColorTypeConfig = { deprecatedSystemColor: ['red'] };

// ❌ 错误：AccentColor 属于 systemColor，不属于 namedColor（应该报错）
const config5: CssColorTypeConfig = { namedColor: ['AccentColor', 'green'] };

// ✅ 完整配置示例
const fullConfig: CsstsConfig = {
  colorTypes: [
    'namedColor',
    { systemColor: ['Canvas', 'CanvasText'] }
  ]
};

export { config1, config2, config3, config4, config5, fullConfig };
