/**
 * CSS 伪类和伪元素定义
 * 自动生成，请勿手动修改
 */

/** 伪类分类 */
export const PSEUDO_CLASS_CATEGORIES = [
  'user-action',
  'link',
  'form',
  'structural',
  'logical',
  'linguistic',
  'display',
  'media',
  'web-components',
] as const;

export type PseudoClassCategory = typeof PSEUDO_CLASS_CATEGORIES[number];

/** user-action 伪类 */
export const USER_ACTION_PSEUDO_CLASSES = [
  'hover',
  'active',
  'focus',
  'focus-visible',
  'focus-within',
] as const;

/** link 伪类 */
export const LINK_PSEUDO_CLASSES = [
  'link',
  'visited',
  'any-link',
  'local-link',
  'target',
  'target-within',
] as const;

/** form 伪类 */
export const FORM_PSEUDO_CLASSES = [
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',
  'user-valid',
  'user-invalid',
  'autofill',
] as const;

/** structural 伪类 */
export const STRUCTURAL_PSEUDO_CLASSES = [
  'root',
  'empty',
  'first-child',
  'last-child',
  'only-child',
  'first-of-type',
  'last-of-type',
  'only-of-type',
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type',
] as const;

/** logical 伪类 */
export const LOGICAL_PSEUDO_CLASSES = [
  'not',
  'is',
  'where',
  'has',
] as const;

/** linguistic 伪类 */
export const LINGUISTIC_PSEUDO_CLASSES = [
  'lang',
  'dir',
] as const;

/** display 伪类 */
export const DISPLAY_PSEUDO_CLASSES = [
  'fullscreen',
  'modal',
  'picture-in-picture',
] as const;

/** media 伪类 */
export const MEDIA_PSEUDO_CLASSES = [
  'playing',
  'paused',
  'seeking',
  'buffering',
  'stalled',
  'muted',
  'volume-locked',
] as const;

/** web-components 伪类 */
export const WEB_COMPONENTS_PSEUDO_CLASSES = [
  'defined',
  'host',
  'host-context',
  'scope',
] as const;

/** 所有 CSS 伪类 */
export const PSEUDO_CLASSES = [
  'hover',
  'active',
  'focus',
  'focus-visible',
  'focus-within',
  'link',
  'visited',
  'any-link',
  'local-link',
  'target',
  'target-within',
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',
  'user-valid',
  'user-invalid',
  'autofill',
  'root',
  'empty',
  'first-child',
  'last-child',
  'only-child',
  'first-of-type',
  'last-of-type',
  'only-of-type',
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type',
  'not',
  'is',
  'where',
  'has',
  'lang',
  'dir',
  'fullscreen',
  'modal',
  'picture-in-picture',
  'playing',
  'paused',
  'seeking',
  'buffering',
  'stalled',
  'muted',
  'volume-locked',
  'defined',
  'host',
  'host-context',
  'scope',
] as const;

/** 伪类名称类型 */
export type PseudoClassName = typeof PSEUDO_CLASSES[number];

/** 常用伪类 */
export const COMMON_PSEUDO_CLASSES = [
  'hover',
  'active',
  'focus',
  'focus-visible',
  'focus-within',
  'disabled',
  'enabled',
  'checked',
  'valid',
  'invalid',
  'required',
  'optional',
  'read-only',
  'read-write',
  'first-child',
  'last-child',
  'empty',
] as const;

export type CommonPseudoClass = typeof COMMON_PSEUDO_CLASSES[number];

// ==================== 伪元素 ====================

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

// ==================== 描述映射 ====================

/** 伪类描述 */
export const PSEUDO_CLASS_DESCRIPTIONS: Record<PseudoClassName, { en: string; zh: string }> = {
  'hover': { en: 'Mouse over element', zh: '鼠标悬停在元素上' },
  'active': { en: 'Element being activated', zh: '元素被激活时' },
  'focus': { en: 'Element has focus', zh: '元素获得焦点' },
  'focus-visible': { en: 'Element has focus and focus should be visible', zh: '元素获得焦点且焦点应可见' },
  'focus-within': { en: 'Element or descendant has focus', zh: '元素或其后代获得焦点' },
  'link': { en: 'Unvisited link', zh: '未访问的链接' },
  'visited': { en: 'Visited link', zh: '已访问的链接' },
  'any-link': { en: 'Any link (visited or not)', zh: '任何链接（已访问或未访问）' },
  'local-link': { en: 'Link to same document', zh: '指向同一文档的链接' },
  'target': { en: 'Element targeted by URL fragment', zh: 'URL 片段指向的元素' },
  'target-within': { en: 'Element or descendant is target', zh: '元素或其后代是目标' },
  'enabled': { en: 'Enabled form element', zh: '启用的表单元素' },
  'disabled': { en: 'Disabled form element', zh: '禁用的表单元素' },
  'read-only': { en: 'Read-only element', zh: '只读元素' },
  'read-write': { en: 'Editable element', zh: '可编辑元素' },
  'placeholder-shown': { en: 'Input showing placeholder', zh: '显示占位符的输入框' },
  'default': { en: 'Default form element', zh: '默认表单元素' },
  'checked': { en: 'Checked checkbox/radio', zh: '选中的复选框/单选框' },
  'indeterminate': { en: 'Indeterminate state', zh: '不确定状态' },
  'valid': { en: 'Valid input', zh: '有效输入' },
  'invalid': { en: 'Invalid input', zh: '无效输入' },
  'in-range': { en: 'Value in range', zh: '值在范围内' },
  'out-of-range': { en: 'Value out of range', zh: '值超出范围' },
  'required': { en: 'Required field', zh: '必填字段' },
  'optional': { en: 'Optional field', zh: '可选字段' },
  'user-valid': { en: 'User-validated valid input', zh: '用户验证后的有效输入' },
  'user-invalid': { en: 'User-validated invalid input', zh: '用户验证后的无效输入' },
  'autofill': { en: 'Autofilled input', zh: '自动填充的输入' },
  'root': { en: 'Document root element', zh: '文档根元素' },
  'empty': { en: 'Element with no children', zh: '没有子元素的元素' },
  'first-child': { en: 'First child element', zh: '第一个子元素' },
  'last-child': { en: 'Last child element', zh: '最后一个子元素' },
  'only-child': { en: 'Only child element', zh: '唯一子元素' },
  'first-of-type': { en: 'First of its type', zh: '同类型中的第一个' },
  'last-of-type': { en: 'Last of its type', zh: '同类型中的最后一个' },
  'only-of-type': { en: 'Only one of its type', zh: '同类型中的唯一一个' },
  'nth-child': { en: 'Nth child element', zh: '第 N 个子元素' },
  'nth-last-child': { en: 'Nth child from end', zh: '倒数第 N 个子元素' },
  'nth-of-type': { en: 'Nth of its type', zh: '同类型中的第 N 个' },
  'nth-last-of-type': { en: 'Nth of type from end', zh: '同类型中倒数第 N 个' },
  'not': { en: 'Negation pseudo-class', zh: '否定伪类' },
  'is': { en: 'Matches any selector in list', zh: '匹配列表中的任何选择器' },
  'where': { en: 'Like :is() but zero specificity', zh: '类似 :is() 但优先级为零' },
  'has': { en: 'Parent selector', zh: '父选择器' },
  'lang': { en: 'Element language', zh: '元素语言' },
  'dir': { en: 'Text direction', zh: '文本方向' },
  'fullscreen': { en: 'Fullscreen element', zh: '全屏元素' },
  'modal': { en: 'Modal dialog', zh: '模态对话框' },
  'picture-in-picture': { en: 'Picture-in-picture mode', zh: '画中画模式' },
  'playing': { en: 'Media is playing', zh: '媒体正在播放' },
  'paused': { en: 'Media is paused', zh: '媒体已暂停' },
  'seeking': { en: 'Media is seeking', zh: '媒体正在定位' },
  'buffering': { en: 'Media is buffering', zh: '媒体正在缓冲' },
  'stalled': { en: 'Media stalled', zh: '媒体停滞' },
  'muted': { en: 'Media is muted', zh: '媒体已静音' },
  'volume-locked': { en: 'Volume is locked', zh: '音量已锁定' },
  'defined': { en: 'Custom element is defined', zh: '自定义元素已定义' },
  'host': { en: 'Shadow host', zh: 'Shadow 宿主' },
  'host-context': { en: 'Shadow host in context', zh: '上下文中的 Shadow 宿主' },
  'scope': { en: 'Scoped element', zh: '作用域元素' },
};

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

/** 伪类分类映射 */
export const PSEUDO_CLASS_CATEGORY_MAP: Record<PseudoClassName, PseudoClassCategory> = {
  'hover': 'user-action',
  'active': 'user-action',
  'focus': 'user-action',
  'focus-visible': 'user-action',
  'focus-within': 'user-action',
  'link': 'link',
  'visited': 'link',
  'any-link': 'link',
  'local-link': 'link',
  'target': 'link',
  'target-within': 'link',
  'enabled': 'form',
  'disabled': 'form',
  'read-only': 'form',
  'read-write': 'form',
  'placeholder-shown': 'form',
  'default': 'form',
  'checked': 'form',
  'indeterminate': 'form',
  'valid': 'form',
  'invalid': 'form',
  'in-range': 'form',
  'out-of-range': 'form',
  'required': 'form',
  'optional': 'form',
  'user-valid': 'form',
  'user-invalid': 'form',
  'autofill': 'form',
  'root': 'structural',
  'empty': 'structural',
  'first-child': 'structural',
  'last-child': 'structural',
  'only-child': 'structural',
  'first-of-type': 'structural',
  'last-of-type': 'structural',
  'only-of-type': 'structural',
  'nth-child': 'structural',
  'nth-last-child': 'structural',
  'nth-of-type': 'structural',
  'nth-last-of-type': 'structural',
  'not': 'logical',
  'is': 'logical',
  'where': 'logical',
  'has': 'logical',
  'lang': 'linguistic',
  'dir': 'linguistic',
  'fullscreen': 'display',
  'modal': 'display',
  'picture-in-picture': 'display',
  'playing': 'media',
  'paused': 'media',
  'seeking': 'media',
  'buffering': 'media',
  'stalled': 'media',
  'muted': 'media',
  'volume-locked': 'media',
  'defined': 'web-components',
  'host': 'web-components',
  'host-context': 'web-components',
  'scope': 'web-components',
};
