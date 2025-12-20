/**
 * Category 配置类型定义（自动生成）
 */

import type { CssNumberUnitName, CssNumberCategoryName } from './numberTypes';
import type { CsstsStepConfig } from './csstsStepConfig';
import type { CssUnitConfigMap, CssUnitExcludeMap } from './cssNumberUnitConfig';

// ==================== Category 配置 ====================

export type CssCategoryValueConfig =
  | CsstsStepConfig
  | CssNumberUnitName[]
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;
export type CssCategoryConfigItem =
  | CssNumberCategoryName
  | CssCategoryConfigMap
  | CssUnitConfigMap;
export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMap;

// ==================== Category 排除配置 ====================

export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;
export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;
export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;
export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMap;
