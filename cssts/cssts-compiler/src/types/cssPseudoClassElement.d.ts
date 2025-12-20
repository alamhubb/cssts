/**
 * CSS 伪类和伪元素类型定义（自动生成）
 */

import type { pseudoClasses } from '../data/pseudoClasses';
import type { pseudoElements } from '../data/pseudoElements';

import type { CssPseudoValueType } from './cssPseudoValue';

export type CssPseudoClassName = typeof pseudoClasses[number];

export type CssPseudoElementName = typeof pseudoElements[number];

// ==================== 伪类/伪元素样式配置 ====================

export interface CssPseudoClassConfig {
  hover?: CssPseudoValueType;
  active?: CssPseudoValueType;
  focus?: CssPseudoValueType;
  focusVisible?: CssPseudoValueType;
  focusWithin?: CssPseudoValueType;
  link?: CssPseudoValueType;
  visited?: CssPseudoValueType;
  anyLink?: CssPseudoValueType;
  localLink?: CssPseudoValueType;
  target?: CssPseudoValueType;
  targetWithin?: CssPseudoValueType;
  enabled?: CssPseudoValueType;
  disabled?: CssPseudoValueType;
  readOnly?: CssPseudoValueType;
  readWrite?: CssPseudoValueType;
  placeholderShown?: CssPseudoValueType;
  default?: CssPseudoValueType;
  checked?: CssPseudoValueType;
  indeterminate?: CssPseudoValueType;
  valid?: CssPseudoValueType;
  invalid?: CssPseudoValueType;
  inRange?: CssPseudoValueType;
  outOfRange?: CssPseudoValueType;
  required?: CssPseudoValueType;
  optional?: CssPseudoValueType;
  userValid?: CssPseudoValueType;
  userInvalid?: CssPseudoValueType;
  autofill?: CssPseudoValueType;
  root?: CssPseudoValueType;
  empty?: CssPseudoValueType;
  firstChild?: CssPseudoValueType;
  lastChild?: CssPseudoValueType;
  onlyChild?: CssPseudoValueType;
  firstOfType?: CssPseudoValueType;
  lastOfType?: CssPseudoValueType;
  onlyOfType?: CssPseudoValueType;
  nthChild?: CssPseudoValueType;
  nthLastChild?: CssPseudoValueType;
  nthOfType?: CssPseudoValueType;
  nthLastOfType?: CssPseudoValueType;
  not?: CssPseudoValueType;
  is?: CssPseudoValueType;
  where?: CssPseudoValueType;
  has?: CssPseudoValueType;
  lang?: CssPseudoValueType;
  dir?: CssPseudoValueType;
  fullscreen?: CssPseudoValueType;
  modal?: CssPseudoValueType;
  pictureInPicture?: CssPseudoValueType;
  playing?: CssPseudoValueType;
  paused?: CssPseudoValueType;
  seeking?: CssPseudoValueType;
  buffering?: CssPseudoValueType;
  stalled?: CssPseudoValueType;
  muted?: CssPseudoValueType;
  volumeLocked?: CssPseudoValueType;
  defined?: CssPseudoValueType;
  host?: CssPseudoValueType;
  hostContext?: CssPseudoValueType;
  scope?: CssPseudoValueType;
  blank?: CssPseudoValueType;
}

export interface CssPseudoElementConfig {
  before?: CssPseudoValueType;
  after?: CssPseudoValueType;
  firstLine?: CssPseudoValueType;
  firstLetter?: CssPseudoValueType;
  marker?: CssPseudoValueType;
  selection?: CssPseudoValueType;
  placeholder?: CssPseudoValueType;
  backdrop?: CssPseudoValueType;
  fileSelectorButton?: CssPseudoValueType;
  cue?: CssPseudoValueType;
  cueRegion?: CssPseudoValueType;
  part?: CssPseudoValueType;
  slotted?: CssPseudoValueType;
}
