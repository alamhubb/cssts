/**
 * CSS 属性配置类型定义（自动生成）
 *
 * 包含 CssPropertyName 和联合类型 CssProperty
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';
import type { CSSPropertiesType } from './cssProperties';

// ==================== 属性名类型 ====================

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

// ==================== 联合类型 ====================

// 单个属性或属性集合
export type CssProperty = CssPropertyName | CSSPropertiesType;

// 单个或多个属性
export type CssProperties = CssProperty | CssProperty[];
