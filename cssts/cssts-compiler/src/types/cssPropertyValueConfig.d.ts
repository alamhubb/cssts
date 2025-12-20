/**
 * Property 配置类型定义（自动生成）
 */

import type { CssPropertyName } from './cssPropertyConfig';
import type { CssKeywordName, CssColorName } from './cssKeywords';
import type { CssNumberUnitName, CssUnitConfigMap, CssUnitExcludeMap } from './cssNumberUnitConfig';
import type { CssCategoryConfigMap, CssCategoryExcludeMap } from './cssNumberCategoryConfig';
import type { CssNumberTypeName, CssNumberTypeConfigMap, CssNumberTypeConfigItem, CssNumberTypeExcludeMap, CssNumberTypeExcludeItem } from './cssNumberTypeConfig';

// ==================== Property 基础配置 ====================

export interface CssPropertyBaseConfig {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}

// ==================== Property 配置 ====================

export type CssPropertyValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
  | (CssPropertyBaseConfig & CssCategoryConfigMap)
  | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMap;

export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMap;

// ==================== Property 排除配置 ====================

export type CssPropertyExcludeValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
  | (CssPropertyBaseConfig & CssCategoryExcludeMap)
  | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMap;

export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMap;
