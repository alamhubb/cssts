/**
 * 伪类/伪元素样式配置
 * 
 * 定义伪类和伪元素的默认样式
 */

import type { CssPropertyValueMap } from './keywords';

// ==================== 伪类/伪元素样式类型 ====================

/** 伪类/伪元素样式值（使用 CssPropertyValueMap 提供智能提示） */
export type PseudoStyleValue = CssPropertyValueMap;

/** 伪类样式配置类 */
export class PseudoClassStylesConfig {
    // user-action 伪类
    hover?: PseudoStyleValue = { opacity: '0.9' };
    active?: PseudoStyleValue = { opacity: '0.6' };
    focus?: PseudoStyleValue = { opacity: '0.9' };
    focusVisible?: PseudoStyleValue;
    focusWithin?: PseudoStyleValue;

    // link 伪类
    link?: PseudoStyleValue;
    visited?: PseudoStyleValue;
    anyLink?: PseudoStyleValue;
    localLink?: PseudoStyleValue;
    target?: PseudoStyleValue;
    targetWithin?: PseudoStyleValue;

    // form 伪类
    enabled?: PseudoStyleValue;
    disabled?: PseudoStyleValue = { opacity: '0.5', cursor: 'not-allowed' };
    readOnly?: PseudoStyleValue;
    readWrite?: PseudoStyleValue;
    placeholderShown?: PseudoStyleValue;
    default?: PseudoStyleValue;
    checked?: PseudoStyleValue;
    indeterminate?: PseudoStyleValue;
    valid?: PseudoStyleValue;
    invalid?: PseudoStyleValue;
    inRange?: PseudoStyleValue;
    outOfRange?: PseudoStyleValue;
    required?: PseudoStyleValue;
    optional?: PseudoStyleValue;
    userValid?: PseudoStyleValue;
    userInvalid?: PseudoStyleValue;
    autofill?: PseudoStyleValue;

    // structural 伪类
    root?: PseudoStyleValue;
    empty?: PseudoStyleValue;
    firstChild?: PseudoStyleValue;
    lastChild?: PseudoStyleValue;
    onlyChild?: PseudoStyleValue;
    firstOfType?: PseudoStyleValue;
    lastOfType?: PseudoStyleValue;
    onlyOfType?: PseudoStyleValue;
    nthChild?: PseudoStyleValue;
    nthLastChild?: PseudoStyleValue;
    nthOfType?: PseudoStyleValue;
    nthLastOfType?: PseudoStyleValue;

    // logical 伪类
    not?: PseudoStyleValue;
    is?: PseudoStyleValue;
    where?: PseudoStyleValue;
    has?: PseudoStyleValue;

    // linguistic 伪类
    lang?: PseudoStyleValue;
    dir?: PseudoStyleValue;

    // display 伪类
    fullscreen?: PseudoStyleValue;
    modal?: PseudoStyleValue;
    pictureInPicture?: PseudoStyleValue;

    // media 伪类
    playing?: PseudoStyleValue;
    paused?: PseudoStyleValue;
    seeking?: PseudoStyleValue;
    buffering?: PseudoStyleValue;
    stalled?: PseudoStyleValue;
    muted?: PseudoStyleValue;
    volumeLocked?: PseudoStyleValue;

    // web-components 伪类
    defined?: PseudoStyleValue;
    host?: PseudoStyleValue;
    hostContext?: PseudoStyleValue;
    scope?: PseudoStyleValue;
}

/** 伪元素样式配置类 */
export class PseudoElementStylesConfig {
    before?: PseudoStyleValue;
    after?: PseudoStyleValue;
    firstLine?: PseudoStyleValue;
    firstLetter?: PseudoStyleValue;
    marker?: PseudoStyleValue;
    selection?: PseudoStyleValue;
    placeholder?: PseudoStyleValue;
    backdrop?: PseudoStyleValue;
    fileSelectorButton?: PseudoStyleValue;
    cue?: PseudoStyleValue;
    cueRegion?: PseudoStyleValue;
    part?: PseudoStyleValue;
    slotted?: PseudoStyleValue;
}
