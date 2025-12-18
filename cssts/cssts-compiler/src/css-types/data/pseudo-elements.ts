/**
 * CSS 伪元素数据
 * 自动生成，请勿手动修改
 */

/** 所有 CSS 伪元素 */
export const PSEUDO_ELEMENTS = [
  'before',
  'after',
  'first-line',
  'first-letter',
  'marker',
  'selection',
  'placeholder',
  'backdrop',
  'file-selector-button',
  'cue',
  'cue-region',
  'part',
  'slotted',
] as const;

/** 伪元素名称类型 */
export type PseudoElementName = typeof PSEUDO_ELEMENTS[number];

/** 常用伪元素 */
export const COMMON_PSEUDO_ELEMENTS = [
  'before',
  'after',
  'placeholder',
  'selection',
  'first-line',
  'first-letter',
] as const;

export type CommonPseudoElement = typeof COMMON_PSEUDO_ELEMENTS[number];

/** 伪元素描述 */
export const PSEUDO_ELEMENT_DESCRIPTIONS: Record<PseudoElementName, { en: string; zh: string }> = {
  'before': { en: 'Insert content before element', zh: '在元素前插入内容' },
  'after': { en: 'Insert content after element', zh: '在元素后插入内容' },
  'first-line': { en: 'First line of text', zh: '文本的第一行' },
  'first-letter': { en: 'First letter of text', zh: '文本的第一个字母' },
  'marker': { en: 'List item marker', zh: '列表项标记' },
  'selection': { en: 'Selected text', zh: '选中的文本' },
  'placeholder': { en: 'Input placeholder text', zh: '输入框占位符文本' },
  'backdrop': { en: 'Backdrop behind element', zh: '元素后面的背景' },
  'file-selector-button': { en: 'File input button', zh: '文件输入按钮' },
  'cue': { en: 'WebVTT cue', zh: 'WebVTT 提示' },
  'cue-region': { en: 'WebVTT cue region', zh: 'WebVTT 提示区域' },
  'part': { en: 'Shadow DOM part', zh: 'Shadow DOM 部件' },
  'slotted': { en: 'Slotted content', zh: '插槽内容' },
};
