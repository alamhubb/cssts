/**
 * Unit 配置类型定义（自动生成）
 */

import type { CssNumberUnitName } from './numberTypes';
import type { CsstsStepConfig } from './csstsStepConfig';

// ==================== Unit 配置 ====================

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;
export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;
export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

// ==================== Unit 排除配置 ====================

export type CssUnitExcludeItem = CssNumberUnitName;
export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;
