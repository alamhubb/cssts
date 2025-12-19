/**
 * 伪类/伪元素样式类型定义（自动生成）
 *
 * 基于生成的 propertyKeywords.ts 和 propertyNumberTypes.ts
 * 为伪类和伪元素提供类型安全的样式配置
 */

import type { CSSPropertiesValueType } from './cssPropertiesValue';

// ==================== 伪类样式类型 ====================

/**
 * 伪类样式配置类型
 * 每个伪类可以配置 CSS 属性值
 */
export interface PseudoClassStylesConfig {

  // user-action 伪类
  hover?: CSSPropertiesValueType;
  active?: CSSPropertiesValueType;
  focus?: CSSPropertiesValueType;
  focusVisible?: CSSPropertiesValueType;
  focusWithin?: CSSPropertiesValueType;

  // link 伪类
  link?: CSSPropertiesValueType;
  visited?: CSSPropertiesValueType;
  anyLink?: CSSPropertiesValueType;
  localLink?: CSSPropertiesValueType;
  target?: CSSPropertiesValueType;
  targetWithin?: CSSPropertiesValueType;

  // form 伪类
  enabled?: CSSPropertiesValueType;
  disabled?: CSSPropertiesValueType;
  readOnly?: CSSPropertiesValueType;
  readWrite?: CSSPropertiesValueType;
  placeholderShown?: CSSPropertiesValueType;
  default?: CSSPropertiesValueType;
  checked?: CSSPropertiesValueType;
  indeterminate?: CSSPropertiesValueType;
  valid?: CSSPropertiesValueType;
  invalid?: CSSPropertiesValueType;
  inRange?: CSSPropertiesValueType;
  outOfRange?: CSSPropertiesValueType;
  required?: CSSPropertiesValueType;
  optional?: CSSPropertiesValueType;
  userValid?: CSSPropertiesValueType;
  userInvalid?: CSSPropertiesValueType;
  autofill?: CSSPropertiesValueType;

  // structural 伪类
  root?: CSSPropertiesValueType;
  empty?: CSSPropertiesValueType;
  firstChild?: CSSPropertiesValueType;
  lastChild?: CSSPropertiesValueType;
  onlyChild?: CSSPropertiesValueType;
  firstOfType?: CSSPropertiesValueType;
  lastOfType?: CSSPropertiesValueType;
  onlyOfType?: CSSPropertiesValueType;
  nthChild?: CSSPropertiesValueType;
  nthLastChild?: CSSPropertiesValueType;
  nthOfType?: CSSPropertiesValueType;
  nthLastOfType?: CSSPropertiesValueType;

  // logical 伪类
  not?: CSSPropertiesValueType;
  is?: CSSPropertiesValueType;
  where?: CSSPropertiesValueType;
  has?: CSSPropertiesValueType;

  // linguistic 伪类
  lang?: CSSPropertiesValueType;
  dir?: CSSPropertiesValueType;

  // display 伪类
  fullscreen?: CSSPropertiesValueType;
  modal?: CSSPropertiesValueType;
  pictureInPicture?: CSSPropertiesValueType;

  // media 伪类
  playing?: CSSPropertiesValueType;
  paused?: CSSPropertiesValueType;
  seeking?: CSSPropertiesValueType;
  buffering?: CSSPropertiesValueType;
  stalled?: CSSPropertiesValueType;
  muted?: CSSPropertiesValueType;
  volumeLocked?: CSSPropertiesValueType;

  // web-components 伪类
  defined?: CSSPropertiesValueType;
  host?: CSSPropertiesValueType;
  hostContext?: CSSPropertiesValueType;
  scope?: CSSPropertiesValueType;

  // other 伪类
  blank?: CSSPropertiesValueType;
}

// ==================== 伪元素样式类型 ====================

/**
 * 伪元素样式配置类型
 * 每个伪元素可以配置 CSS 属性值
 */
export interface PseudoElementStylesConfig {
  before?: CSSPropertiesValueType;
  after?: CSSPropertiesValueType;
  firstLine?: CSSPropertiesValueType;
  firstLetter?: CSSPropertiesValueType;
  marker?: CSSPropertiesValueType;
  selection?: CSSPropertiesValueType;
  placeholder?: CSSPropertiesValueType;
  backdrop?: CSSPropertiesValueType;
  fileSelectorButton?: CSSPropertiesValueType;
  cue?: CSSPropertiesValueType;
  cueRegion?: CSSPropertiesValueType;
  part?: CSSPropertiesValueType;
  slotted?: CSSPropertiesValueType;
}

// ==================== 完整伪类/伪元素样式配置 ====================

/**
 * 完整的伪类和伪元素样式配置
 */
export interface PseudoStylesConfig extends PseudoClassStylesConfig, PseudoElementStylesConfig {}
