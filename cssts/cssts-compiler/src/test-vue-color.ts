/**
 * 测试 Vue 场景下的 colorTypes
 */

import type { CsstsConfig } from './types/csstsConfig';

// Vue 场景：混合格式
const config: CsstsConfig = {
  colorTypes: [
    'namedColor',
    { systemColor: ['Canvas', 'CanvasText'] }
  ]
};

// 只用字符串
const config2: CsstsConfig = {
  colorTypes: ['namedColor', 'systemColor']
};

// 只用对象
const config3: CsstsConfig = {
  colorTypes: [
    { namedColor: ['red', 'green', 'blue'] }
  ]
};

export { config, config2, config3 };
