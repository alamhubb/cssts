/**
 * NumberType 配置类型定义（自动生成）
 */

import type { ALL_NUMBER_TYPES } from '../data/propertyNumberTypes';
import type { CsstsStepConfig } from './csstsStepConfig';
import type { CssNumberUnitName, CssUnitConfigMap, CssUnitExcludeMap } from './cssNumberUnitConfig';
import type { CssNumberCategoryName, CssCategoryValueConfig, CssCategoryConfigMap, CssCategoryExcludeMap } from './cssNumberCategoryConfig';

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

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
