/**
 * CSS 数据类型定义 - 自动生成
 * 生成时间: 2025-12-17T12:39:37.138Z
 */

// ==================== Keywords Data ====================

export interface KeywordPropertyData {
  name: string
  keywords: string[]
}

export interface CssKeywordsData {
  generatedAt: string
  csstreeVersion: string
  properties: KeywordPropertyData[]
  pseudoClasses: string[]
  pseudoElements: string[]
}

// ==================== Number Data ====================

export interface NumberPropertyData {
  name: string
  numberTypes: string[]
}

export interface CssNumberData {
  generatedAt: string
  csstreeVersion: string
  properties: NumberPropertyData[]
  numberTypeDescriptions: Record<string, string>
}

// ==================== Type Unions ====================

/** CSS 数值类型 */
export type CssNumberType = 'angle' | 'number' | 'percentage' | 'length' | 'integer' | 'flex' | 'length-percentage' | 'angle-percentage' | 'resolution' | 'time' | 'frequency'

/** 所有 CSS 伪类 */
export type CssPseudoClass = 'active' | 'any-link' | 'autofill' | 'buffering' | 'checked' | 'default' | 'defined' | 'dir' | 'disabled' | 'empty' | 'enabled' | 'first-child' | 'first-of-type' | 'focus' | 'focus-visible' | 'focus-within' | 'fullscreen' | 'has' | 'host' | 'host-context' | 'hover' | 'in-range' | 'indeterminate' | 'invalid' | 'is' | 'lang' | 'last-child' | 'last-of-type' | 'link' | 'local-link' | 'modal' | 'muted' | 'not' | 'nth-child' | 'nth-last-child' | 'nth-last-of-type' | 'nth-of-type' | 'only-child' | 'only-of-type' | 'optional' | 'out-of-range' | 'paused' | 'picture-in-picture' | 'placeholder-shown' | 'playing' | 'read-only' | 'read-write' | 'required' | 'root' | 'scope' | 'seeking' | 'stalled' | 'target' | 'target-within' | 'user-invalid' | 'user-valid' | 'valid' | 'visited' | 'volume-locked' | 'where'

/** 所有 CSS 伪元素 */
export type CssPseudoElement = 'after' | 'backdrop' | 'before' | 'cue' | 'cue-region' | 'file-selector-button' | 'first-letter' | 'first-line' | 'marker' | 'part' | 'placeholder' | 'selection' | 'slotted'
