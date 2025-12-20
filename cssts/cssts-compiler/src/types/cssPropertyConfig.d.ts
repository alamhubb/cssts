/**
 * CSS 属性配置类型定义（自动生成）
 */

import type { CSS_PROPERTY_NAME_MAP } from '../data/propertyName';
import type { CSSPropertiesType } from './cssProperties';

export type CssPropertyName = keyof typeof CSS_PROPERTY_NAME_MAP;

export type CssProperty = CssPropertyName | CSSPropertiesType;

export type CssProperties = CssProperty | CssProperty[];
