/**
 * CSSTS 配置管理类
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-17T14:38:48.488Z
 */

import type { CsstsUserConfig, CssPropertyName, PropertyConfig } from './cssts-config.d';
import { CSS_PROPERTIES, NUMBER_TYPES, UNITS, COLORS } from './cssts-config.d';

// 导入 JSON 数据
import keywordsData from './data/css-keywords.json';
import numberTypesData from './data/css-number-types.json';

// ==================== 额外数据 ====================

/** 支持数值的属性 */
export const NUMERIC_PROPERTIES = [
  'accent-color',
  'animation',
  'animation-delay',
  'animation-duration',
  'animation-iteration-count',
  'animation-range-end',
  'animation-range-start',
  'animation-timing-function',
  'aspect-ratio',
  'azimuth',
  'backdrop-filter',
  'background',
  'background-color',
  'background-image',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-size',
  'baseline-shift',
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-width',
  'border-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-image-outset',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-left-color',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-width',
  'border-spacing',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-width',
  'border-width',
  'bottom',
  'box-flex',
  'box-flex-group',
  'box-ordinal-group',
  'box-shadow',
  'caret-color',
  'clip',
  'clip-path',
  'color',
  'column-count',
  'column-gap',
  'column-rule-color',
  'column-width',
  'contain-intrinsic-block-size',
  'contain-intrinsic-height',
  'contain-intrinsic-inline-size',
  'contain-intrinsic-size',
  'contain-intrinsic-width',
  'content',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cursor',
  'cx',
  'cy',
  'fill',
  'fill-opacity',
  'filter',
  'flex-grow',
  'flex-shrink',
  'font-feature-settings',
  'font-size',
  'font-size-adjust',
  'font-smooth',
  'font-stretch',
  'font-style',
  'font-variation-settings',
  'font-weight',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-gap',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-gap',
  'grid-row-start',
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'height',
  'hyphenate-limit-chars',
  'image-orientation',
  'image-resolution',
  'initial-letter',
  'kerning',
  'left',
  'letter-spacing',
  'line-clamp',
  'line-height',
  'line-height-step',
  'list-style-image',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'mask',
  'mask-border-outset',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-image',
  'mask-position',
  'mask-size',
  'math-depth',
  'max-height',
  'max-lines',
  'max-width',
  'min-height',
  'min-width',
  'object-position',
  'offset-anchor',
  'offset-distance',
  'offset-path',
  'offset-position',
  'offset-rotate',
  'opacity',
  'order',
  'orphans',
  'outline-color',
  'outline-offset',
  'outline-width',
  'overflow-clip-margin',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'pause-after',
  'pause-before',
  'perspective',
  'perspective-origin',
  'r',
  'rest-after',
  'rest-before',
  'right',
  'rotate',
  'row-gap',
  'rx',
  'ry',
  'scale',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-coordinate',
  'scroll-snap-destination',
  'scroll-snap-points-x',
  'scroll-snap-points-y',
  'scrollbar-color',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-miterlimit',
  'stroke-width',
  'tab-size',
  'text-combine-upright',
  'text-decoration-color',
  'text-decoration-thickness',
  'text-emphasis-color',
  'text-indent',
  'text-shadow',
  'text-size-adjust',
  'text-underline-offset',
  'top',
  'transform',
  'transform-origin',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-timing-function',
  'translate',
  'vertical-align',
  'view-timeline-inset',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'widows',
  'width',
  'word-spacing',
  'x',
  'y',
  'z-index',
  'zoom',
] as const;

// ==================== 配置类 ====================

export class CsstsConfig {
  private userConfig: CsstsUserConfig;

  // 缓存
  private _properties: Set<string> | null = null;
  private _numericProperties: Set<string> | null = null;
  private _keywords: Set<string> | null = null;
  private _colors: Set<string> | null = null;
  private _numberTypes: Set<string> | null = null;
  private _units: Set<string> | null = null;
  private _propertyKeywords: Map<string, Set<string>> = new Map();
  private _propertyColors: Map<string, Set<string>> = new Map();
  private _propertyUnits: Map<string, Set<string>> = new Map();

  constructor(config: CsstsUserConfig = {}) {
    this.userConfig = config;
  }

  /**
   * 合并支持/不支持列表
   * 规则：支持优先，冲突时以支持为准
   */
  private mergeIncludeExclude<T>(
    defaults: readonly T[],
    include?: T[],
    exclude?: T[]
  ): Set<T> {
    // 从默认值开始
    const result = new Set<T>(defaults);

    // 移除不支持的（如果没有在支持列表中）
    if (exclude) {
      const includeSet = new Set(include || []);
      for (const item of exclude) {
        // 支持优先：如果在支持列表中，不移除
        if (!includeSet.has(item)) {
          result.delete(item);
        }
      }
    }

    // 添加支持的
    if (include) {
      for (const item of include) {
        result.add(item);
      }
    }

    return result;
  }

  /** 获取支持的属性集合 */
  get properties(): Set<string> {
    if (!this._properties) {
      this._properties = this.mergeIncludeExclude(
        CSS_PROPERTIES,
        this.userConfig.includeProperties,
        this.userConfig.excludeProperties
      );
    }
    return this._properties;
  }

  /** 获取支持数值的属性集合 */
  get numericProperties(): Set<string> {
    if (!this._numericProperties) {
      this._numericProperties = this.mergeIncludeExclude(
        NUMERIC_PROPERTIES,
        this.userConfig.includeNumericProperties,
        this.userConfig.excludeNumericProperties
      );
    }
    return this._numericProperties;
  }

  /** 获取全局支持的颜色集合 */
  get colors(): Set<string> {
    if (!this._colors) {
      this._colors = this.mergeIncludeExclude(
        COLORS,
        this.userConfig.includeColors,
        this.userConfig.excludeColors
      );
    }
    return this._colors;
  }

  /** 获取全局支持的数值类型集合 */
  get numberTypes(): Set<string> {
    if (!this._numberTypes) {
      this._numberTypes = this.mergeIncludeExclude(
        NUMBER_TYPES,
        this.userConfig.includeNumberTypes,
        this.userConfig.excludeNumberTypes
      );
    }
    return this._numberTypes;
  }

  /** 获取全局支持的单位集合 */
  get units(): Set<string> {
    if (!this._units) {
      this._units = this.mergeIncludeExclude(
        UNITS,
        this.userConfig.includeUnits,
        this.userConfig.excludeUnits
      );
    }
    return this._units;
  }

  // ==================== 检查方法 ====================

  /** 检查属性是否支持 */
  isPropertySupported(property: string): boolean {
    return this.properties.has(property);
  }

  /** 检查属性是否支持数值 */
  isNumericProperty(property: string): boolean {
    return this.numericProperties.has(property);
  }

  /** 检查颜色是否支持（全局 + 属性级别） */
  isColorSupported(color: string, property?: string): boolean {
    // 先检查全局
    if (!this.colors.has(color)) {
      // 检查属性级别是否明确支持
      if (property) {
        const propConfig = this.userConfig.properties?.[property as CssPropertyName];
        if (propConfig?.includeColors?.includes(color)) {
          return true;
        }
      }
      return false;
    }

    // 检查属性级别是否排除（但支持优先）
    if (property) {
      const propConfig = this.userConfig.properties?.[property as CssPropertyName];
      if (propConfig?.excludeColors?.includes(color)) {
        // 支持优先：如果属性级别明确支持，则不排除
        return propConfig.includeColors?.includes(color) ?? false;
      }
    }

    return true;
  }

  /** 检查单位是否支持（全局 + 属性级别） */
  isUnitSupported(unit: string, property?: string): boolean {
    // 先检查全局
    if (!this.units.has(unit)) {
      // 检查属性级别是否明确支持
      if (property) {
        const propConfig = this.userConfig.properties?.[property as CssPropertyName];
        if (propConfig?.includeUnits?.includes(unit)) {
          return true;
        }
      }
      return false;
    }

    // 检查属性级别是否排除（但支持优先）
    if (property) {
      const propConfig = this.userConfig.properties?.[property as CssPropertyName];
      if (propConfig?.excludeUnits?.includes(unit)) {
        return propConfig.includeUnits?.includes(unit) ?? false;
      }
    }

    return true;
  }

  /** 获取属性支持的关键字 */
  getPropertyKeywords(property: string): Set<string> {
    if (this._propertyKeywords.has(property)) {
      return this._propertyKeywords.get(property)!;
    }

    // 从 JSON 数据获取默认关键字
    const propData = keywordsData.properties.find(p => p.name === property);
    const defaultKeywords = propData?.keywords || [];

    // 合并全局配置
    let keywords = this.mergeIncludeExclude(
      defaultKeywords,
      this.userConfig.includeKeywords,
      this.userConfig.excludeKeywords
    );

    // 合并属性级别配置
    const propConfig = this.userConfig.properties?.[property as CssPropertyName];
    if (propConfig) {
      keywords = this.mergeIncludeExclude(
        [...keywords],
        propConfig.includeKeywords,
        propConfig.excludeKeywords
      );
    }

    this._propertyKeywords.set(property, keywords);
    return keywords;
  }

  /** 获取属性支持的单位 */
  getPropertyUnits(property: string): Set<string> {
    if (this._propertyUnits.has(property)) {
      return this._propertyUnits.get(property)!;
    }

    // 从 JSON 数据获取默认单位
    const propData = numberTypesData.properties.find(p => p.name === property);
    const defaultUnits = propData?.units || [];

    // 合并全局配置
    let units = this.mergeIncludeExclude(
      defaultUnits,
      this.userConfig.includeUnits,
      this.userConfig.excludeUnits
    );

    // 合并属性级别配置
    const propConfig = this.userConfig.properties?.[property as CssPropertyName];
    if (propConfig) {
      units = this.mergeIncludeExclude(
        [...units],
        propConfig.includeUnits,
        propConfig.excludeUnits
      );
    }

    this._propertyUnits.set(property, units);
    return units;
  }

  /** 清除缓存（配置更新后调用） */
  clearCache(): void {
    this._properties = null;
    this._numericProperties = null;
    this._keywords = null;
    this._colors = null;
    this._numberTypes = null;
    this._units = null;
    this._propertyKeywords.clear();
    this._propertyColors.clear();
    this._propertyUnits.clear();
  }

  /** 更新配置 */
  updateConfig(config: Partial<CsstsUserConfig>): void {
    this.userConfig = { ...this.userConfig, ...config };
    this.clearCache();
  }
}

/** 默认配置实例 */
export const defaultConfig = new CsstsConfig();
