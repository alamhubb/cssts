/**
 * 基础配置类型定义（自动生成）
 */

/** 渐进步长范围配置 */
export interface ProgressiveRange {
  max: number;
  divisors: number[];
}

/** 单位值配置 */
export interface CsstsStepConfig {
  step?: number | ProgressiveRange[];
  min?: number;
  max?: number;
  negative?: boolean;
  presets?: number[];
}

export type CustomPropertyValue = string | Record<string, string>;
