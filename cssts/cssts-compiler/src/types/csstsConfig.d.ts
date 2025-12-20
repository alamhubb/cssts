/**
 * CSSTS 配置类型定义（自动生成）
 */

import type { CSSPropertiesValueType } from './cssPropertiesValue';
import type { CssPseudoClassConfig, CssPseudoElementConfig } from './pseudoStyles';

export interface CsstsStyleConfig extends CSSPropertiesValueType {
  pseudoClasses?: CssPseudoClassConfig;
  pseudoElements?: CssPseudoElementConfig;
}

export interface CsstsConfig {
  [selector: string]: CsstsStyleConfig;
}
