/**
 * NumberType 配置类型定义（自动生成）
 */

import type { CssNumberTypeName, CssNumberCategoryName, CssNumberUnitName } from './numberTypes';
import type { CsstsStepConfig } from './baseConfig';
import type { CssUnitConfigMap, CssUnitExcludeMap } from './unitConfig';
import type { CssCategoryValueConfig, CssCategoryConfigMap, CssCategoryExcludeMap } from './categoryConfig';

// ==================== NumberType 配置 ====================

export type CssNumberTypeValueConfig =
  | CsstsStepConfig
  | CssNumberCategoryName[]
  | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;
export type CssNumberTypeConfigItem =
  | CssNumberTypeName
  | CssNumberTypeConfigMap
  | CssCategoryConfigMap
  | CssUnitConfigMap;
export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMap;

// ==================== NumberType 排除配置 ====================

export type CssNumberTypeExcludeValueConfig =
  | CssNumberCategoryName[]
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;
export type CssNumberTypeExcludeItem =
  | CssNumberTypeName
  | CssNumberTypeExcludeMap
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;
export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;
