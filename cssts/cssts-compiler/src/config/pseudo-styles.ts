/**
 * 伪类/伪元素样式配置
 * 
 * 定义伪类和伪元素的默认样式
 */

import type { CssPropertyValueMap } from './keywords';

// ==================== 伪类/伪元素样式类型 ====================
/** 伪类样式配置类 */
export class PseudoClassStylesConfig {
    // user-action 伪类
    hover?: CssPropertyValueMap = { opacity: '0.9' };
    active?: CssPropertyValueMap = { opacity: '0.6' };
    focus?: CssPropertyValueMap = { opacity: '0.9' };
    focusVisible?: CssPropertyValueMap;
    focusWithin?: CssPropertyValueMap;

    // link 伪类
    link?: CssPropertyValueMap;
    visited?: CssPropertyValueMap;
    anyLink?: CssPropertyValueMap;
    localLink?: CssPropertyValueMap;
    target?: CssPropertyValueMap;
    targetWithin?: CssPropertyValueMap;

    // form 伪类
    enabled?: CssPropertyValueMap;
    disabled?: CssPropertyValueMap = { opacity: '0.5', cursor: 'not-allowed' };
    readOnly?: CssPropertyValueMap;
    readWrite?: CssPropertyValueMap;
    placeholderShown?: CssPropertyValueMap;
    default?: CssPropertyValueMap;
    checked?: CssPropertyValueMap;
    indeterminate?: CssPropertyValueMap;
    valid?: CssPropertyValueMap;
    invalid?: CssPropertyValueMap;
    inRange?: CssPropertyValueMap;
    outOfRange?: CssPropertyValueMap;
    required?: CssPropertyValueMap;
    optional?: CssPropertyValueMap;
    userValid?: CssPropertyValueMap;
    userInvalid?: CssPropertyValueMap;
    autofill?: CssPropertyValueMap;

    // structural 伪类
    root?: CssPropertyValueMap;
    empty?: CssPropertyValueMap;
    firstChild?: CssPropertyValueMap;
    lastChild?: CssPropertyValueMap;
    onlyChild?: CssPropertyValueMap;
    firstOfType?: CssPropertyValueMap;
    lastOfType?: CssPropertyValueMap;
    onlyOfType?: CssPropertyValueMap;
    nthChild?: CssPropertyValueMap;
    nthLastChild?: CssPropertyValueMap;
    nthOfType?: CssPropertyValueMap;
    nthLastOfType?: CssPropertyValueMap;

    // logical 伪类
    not?: CssPropertyValueMap;
    is?: CssPropertyValueMap;
    where?: CssPropertyValueMap;
    has?: CssPropertyValueMap;

    // linguistic 伪类
    lang?: CssPropertyValueMap;
    dir?: CssPropertyValueMap;

    // display 伪类
    fullscreen?: CssPropertyValueMap;
    modal?: CssPropertyValueMap;
    pictureInPicture?: CssPropertyValueMap;

    // media 伪类
    playing?: CssPropertyValueMap;
    paused?: CssPropertyValueMap;
    seeking?: CssPropertyValueMap;
    buffering?: CssPropertyValueMap;
    stalled?: CssPropertyValueMap;
    muted?: CssPropertyValueMap;
    volumeLocked?: CssPropertyValueMap;

    // web-components 伪类
    defined?: CssPropertyValueMap;
    host?: CssPropertyValueMap;
    hostContext?: CssPropertyValueMap;
    scope?: CssPropertyValueMap;

    constructor(options?: PseudoClassStylesConfig) {
        if (options) {
            Object.assign(this, options);
        }
    }
}

/** 伪元素样式配置类 */
export class PseudoElementStylesConfig {
    before?: CssPropertyValueMap;
    after?: CssPropertyValueMap;
    firstLine?: CssPropertyValueMap;
    firstLetter?: CssPropertyValueMap;
    marker?: CssPropertyValueMap;
    selection?: CssPropertyValueMap;
    placeholder?: CssPropertyValueMap;
    backdrop?: CssPropertyValueMap;
    fileSelectorButton?: CssPropertyValueMap;
    cue?: CssPropertyValueMap;
    cueRegion?: CssPropertyValueMap;
    part?: CssPropertyValueMap;
    slotted?: CssPropertyValueMap;

    constructor(options?: PseudoElementStylesConfig) {
        if (options) {
            Object.assign(this, options);
        }
    }
}
