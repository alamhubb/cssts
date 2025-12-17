/**
 * CSSTS 配置类
 * 自动生成，请勿手动修改
 */

import type { AllColorValue } from './colors';
import type { NumberTypeName, UnitType } from './units';
import type { KeywordValue } from './keywords';
import { CssPropertyConfigMap, type CssPropertyCamelName } from './property-config';

/** 自定义属性值类型 */
export type CustomPropertyValue = string | Record<string, string>;

/** CSSTS 配置 */
export class CsstsConfig {
  /** 排除的属性 */
  excludeProperties: CssPropertyCamelName[] = [];

  /** 排除的关键字 */
  excludeKeywords: KeywordValue[] = [];

  /** 排除的颜色 */
  excludeColors: AllColorValue[] = [];

  /** 排除的数值类型 */
  excludeNumberTypes: NumberTypeName[] = [];

  /** 排除的单位 */
  excludeUnits: UnitType[] = [];

  /** 自定义属性 */
  customProperties: Record<string, CustomPropertyValue> = {};

  /** 属性级别配置 */
  properties = new CssPropertyConfigMap();
}
