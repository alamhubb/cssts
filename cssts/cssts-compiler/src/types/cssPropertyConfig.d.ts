/**
 * CSS 属性配置类型定义（自动生成）
 * 使用泛型实现四层精准类型约束：Property → NumberType → Category → Unit
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/cssPropertyNameMapping';
import type {
  ALL_UNITS,
  ALL_NUMBER_CATEGORIES,
  CATEGORY_UNITS_MAP,
  NUMBER_TYPE_CATEGORY_MAP,
} from '../data/cssNumberData';
import type { ALL_NUMBER_TYPES, PROPERTY_NUMBER_TYPES_MAP } from '../data/cssPropertyNumber';
import type { PROPERTY_KEYWORDS_MAP } from '../data/cssPropertyKeywords';
import type { keywords, allKeywords } from '../data/cssKeywordsData';
import type { ALL_COLORS } from '../data/cssColorData';

// ==================== 基础配置类型 ====================

/** 渐进步长范围配置 */
export interface CssProgressiveRange {
  max: number;
  divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
  step?: number | CssProgressiveRange[];
  min?: number;
  max?: number;
  negative?: boolean;
  presets?: number[];
}

export type CssCustomPropertyValue = string | Record<string, string>;

// ==================== 属性名称类型 ====================

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// ==================== Unit 类型 ====================

export type CssNumberUnitName = typeof ALL_UNITS[number];

export type CssUnitConfigMap = Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssUnitConfigItem = CssNumberUnitName | CssUnitConfigMap;

export type CssUnitConfig = CssUnitConfigItem[] | CssUnitConfigMap;

export type CssUnitExcludeItem = CssNumberUnitName;

export type CssUnitExcludeMap = Partial<Record<CssNumberUnitName, Record<string, never>>>;

// ==================== Category 类型（泛型版本） ====================

export type CssNumberCategoryName = typeof ALL_NUMBER_CATEGORIES[number];

// 从 CATEGORY_UNITS_MAP 获取 Category 对应的 Unit 类型
type CategoryUnits<C extends CssNumberCategoryName> = typeof CATEGORY_UNITS_MAP[C][number];

// 严格的 Unit 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictUnitConfigMap<T extends CssNumberUnitName> = {
  [K in T]?: CsstsStepConfig;
} & {
  [K in Exclude<CssNumberUnitName, T>]?: never;
};

// Category 的精准 Unit 配置 Map（泛型版本）
export type CssCategoryUnitConfigMap<C extends CssNumberCategoryName> = StrictUnitConfigMap<CategoryUnits<C>>;

// Category 的精准配置类型（泛型版本）
export type CssCategoryValueConfigPrecise<C extends CssNumberCategoryName> = 
  | CategoryUnits<C>[]
  | CssCategoryUnitConfigMap<C>;

// 精准的 Category 配置 Map（使用映射类型自动生成）
export type CssCategoryConfigMapPrecise = {
  [C in CssNumberCategoryName]?: CssCategoryValueConfigPrecise<C>;
};

// 辅助函数类型，用于严格类型检查
export type DefineCategoryConfig = <T extends CssCategoryConfigMapPrecise>(config: T) => T;

// 兼容旧版的宽松类型
export type CssCategoryValueConfig =
  | CsstsStepConfig
  | CssNumberUnitName[]
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssCategoryConfigMap = Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>;

export type CssCategoryConfigItem =
  | CssNumberCategoryName
  | CssCategoryConfigMapPrecise;

export type CssCategoryConfig = CssCategoryConfigItem[] | CssCategoryConfigMapPrecise;

// 精准的 Category 排除值配置（泛型版本）
export type CssCategoryExcludeValueConfigPrecise<C extends CssNumberCategoryName> =
  | CategoryUnits<C>[]
  | Partial<Record<CategoryUnits<C>, Record<string, never>>>;

// 精准的 Category 排除 Map
export type CssCategoryExcludeMapPrecise = {
  [C in CssNumberCategoryName]?: CssCategoryExcludeValueConfigPrecise<C>;
};

// 兼容旧版的宽松类型
export type CssCategoryExcludeValueConfig = CssNumberUnitName[] | CssUnitExcludeMap;

export type CssCategoryExcludeMap = Partial<Record<CssNumberCategoryName, CssCategoryExcludeValueConfig>>;

export type CssCategoryExcludeItem =
  | CssNumberCategoryName
  | CssCategoryExcludeMapPrecise;

export type CssCategoryExcludeConfig = CssCategoryExcludeItem[] | CssCategoryExcludeMapPrecise;

// ==================== NumberType 类型（泛型版本） ====================

export type CssNumberTypeName = typeof ALL_NUMBER_TYPES[number];

// 从 NUMBER_TYPE_CATEGORY_MAP 获取 NumberType 对应的 Category 类型
type NumberTypeCategories<NT extends CssNumberTypeName> = 
  NT extends keyof typeof NUMBER_TYPE_CATEGORY_MAP 
    ? typeof NUMBER_TYPE_CATEGORY_MAP[NT][number] 
    : never;

// 严格的 Category 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictCategoryConfigMap<T extends CssNumberCategoryName> = {
  [K in T]?: CssCategoryValueConfigPrecise<K>;
} & {
  [K in Exclude<CssNumberCategoryName, T>]?: never;
};

// NumberType 的精准 Category 配置 Map（泛型版本）
export type CssNumberTypeCategoryConfigMap<NT extends CssNumberTypeName> = StrictCategoryConfigMap<NumberTypeCategories<NT>>;

// NumberType 的精准配置类型（泛型版本）
export type CssNumberTypeValueConfigPrecise<NT extends CssNumberTypeName> = 
  | CsstsStepConfig
  | NumberTypeCategories<NT>[]
  | CssNumberTypeCategoryConfigMap<NT>
  | CssUnitConfigMap;

// 精准的 NumberType 配置 Map（使用映射类型自动生成）
export type CssNumberTypeConfigMapPrecise = {
  [NT in CssNumberTypeName]?: CssNumberTypeValueConfigPrecise<NT>;
};

// 兼容旧版的宽松类型
export type CssNumberTypeValueConfig =
  | CsstsStepConfig
  | CssNumberCategoryName[]
  | Partial<Record<CssNumberCategoryName, CssCategoryValueConfig>>
  | Partial<Record<CssNumberUnitName, CsstsStepConfig>>;

export type CssNumberTypeConfigMap = Partial<Record<CssNumberTypeName, CssNumberTypeValueConfig>>;

export type CssNumberTypeConfigItem =
  | CssNumberTypeName
  | CssNumberTypeConfigMapPrecise;

export type CssNumberTypeConfig = CssNumberTypeConfigItem[] | CssNumberTypeConfigMapPrecise;

export type CssNumberTypeExcludeValueConfig =
  | CssNumberCategoryName[]
  | CssCategoryExcludeMap
  | CssUnitExcludeMap;

export type CssNumberTypeExcludeMap = Partial<Record<CssNumberTypeName, CssNumberTypeExcludeValueConfig>>;

export type CssNumberTypeExcludeItem =
  | CssNumberTypeName
  | CssNumberTypeExcludeMap;

export type CssNumberTypeExcludeConfig = CssNumberTypeExcludeItem[] | CssNumberTypeExcludeMap;

// ==================== Keywords 类型 ====================

export type CssKeywordName = typeof keywords[number];

export type CssColorName = typeof ALL_COLORS[number];

export type CssAllKeywordName = typeof allKeywords[number];

// ==================== Property 类型（泛型版本） ====================

// 从 PROPERTY_KEYWORDS_MAP 获取属性支持的 Keywords
type PropertyKeywords<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_KEYWORDS_MAP 
    ? typeof PROPERTY_KEYWORDS_MAP[P][number] 
    : never;

// 从 PROPERTY_NUMBER_TYPES_MAP 获取属性支持的 NumberTypes
type PropertyNumberTypes<P extends CssPropertyName> = 
  P extends keyof typeof PROPERTY_NUMBER_TYPES_MAP 
    ? typeof PROPERTY_NUMBER_TYPES_MAP[P][number] 
    : never;

// 严格的 NumberType 配置 Map（方案 B：交叉类型，禁止额外属性）
type StrictNumberTypeConfigMap<T extends CssNumberTypeName> = {
  [K in T]?: CssNumberTypeValueConfigPrecise<K>;
} & {
  [K in Exclude<CssNumberTypeName, T>]?: never;
};

// Property 的精准 NumberType 配置 Map（泛型版本）
export type CssPropertyNumberTypeConfigMap<P extends CssPropertyName> = StrictNumberTypeConfigMap<PropertyNumberTypes<P>>;

// Property 的精准配置类型（泛型版本）
export type CssPropertyValueConfigPrecise<P extends CssPropertyName> = {
  /** 属性支持的 keywords */
  keywords?: PropertyKeywords<P>[];
  /** 属性支持的 numberTypes */
  numberTypes?: PropertyNumberTypes<P>[];
} & (
  // 如果属性有 numberTypes，可以配置 numberType/category/unit
  PropertyNumberTypes<P> extends never 
    ? {} 
    : (CssPropertyNumberTypeConfigMap<P> | CssCategoryConfigMapPrecise | CssUnitConfigMap | {})
);

// 精准的 Property 配置 Map（使用映射类型自动生成）
export type CssPropertyConfigMapPrecise = {
  [P in CssPropertyName]?: CssPropertyValueConfigPrecise<P>;
};

// 兼容旧版的宽松类型
export interface CssPropertyBaseConfig {
  numberTypes?: CssNumberTypeName[];
  keywords?: CssKeywordName[];
  colors?: CssColorName[];
}

export type CssPropertyValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeConfigMap)
  | (CssPropertyBaseConfig & CssCategoryConfigMap)
  | (CssPropertyBaseConfig & CssUnitConfigMap);

export type CssPropertyConfigMap = Partial<Record<CssPropertyName, CssPropertyValueConfig | CssNumberTypeConfigItem[]>>;

export type CssPropertyConfigItem = CssPropertyName | CssPropertyConfigMapPrecise;

export type CssPropertyConfig = CssPropertyConfigItem[] | CssPropertyConfigMapPrecise;

// ==================== Property 排除配置 ====================

export type CssPropertyExcludeValueConfig =
  | CssPropertyBaseConfig
  | (CssPropertyBaseConfig & CssNumberTypeExcludeMap)
  | (CssPropertyBaseConfig & CssCategoryExcludeMap)
  | (CssPropertyBaseConfig & CssUnitExcludeMap);

export type CssPropertyExcludeMapPrecise = { [K in CssPropertyName]?: CssPropertyExcludeValueConfig };

export type CssPropertyExcludeMap = Partial<Record<CssPropertyName, CssPropertyExcludeValueConfig | CssNumberTypeExcludeItem[]>>;

export type CssPropertyExcludeItem = CssPropertyName | CssPropertyExcludeMapPrecise;

export type CssPropertyExcludeConfig = CssPropertyExcludeItem[] | CssPropertyExcludeMapPrecise;
