/**
 * 伪类/伪元素描述（手动维护）
 * 
 * 提供伪类和伪元素的中英文描述，用于文档和智能提示。
 */

// ==================== 伪类分类 ====================

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

/** 伪类分类描述 */
export const PSEUDO_CLASS_CATEGORY_DESCRIPTIONS: Record<PseudoClassCategory, { en: string; zh: string }> = {
  'user-action': { en: 'User action pseudo-classes', zh: '用户操作伪类' },
  'link': { en: 'Link pseudo-classes', zh: '链接伪类' },
  'form': { en: 'Form pseudo-classes', zh: '表单伪类' },
  'structural': { en: 'Structural pseudo-classes', zh: '结构伪类' },
  'logical': { en: 'Logical pseudo-classes', zh: '逻辑伪类' },
  'linguistic': { en: 'Linguistic pseudo-classes', zh: '语言伪类' },
  'display': { en: 'Display state pseudo-classes', zh: '显示状态伪类' },
  'media': { en: 'Media pseudo-classes', zh: '媒体伪类' },
  'web-components': { en: 'Web components pseudo-classes', zh: 'Web 组件伪类' },
};

// ==================== 伪类描述 ====================

/** 伪类描述 */
export const PSEUDO_CLASS_DESCRIPTIONS: Record<string, { en: string; zh: string; category: PseudoClassCategory }> = {
  // user-action
  'hover': { en: 'Mouse over element', zh: '鼠标悬停在元素上', category: 'user-action' },
  'active': { en: 'Element being activated', zh: '元素被激活时', category: 'user-action' },
  'focus': { en: 'Element has focus', zh: '元素获得焦点', category: 'user-action' },
  'focus-visible': { en: 'Element has focus and focus should be visible', zh: '元素获得焦点且焦点应可见', category: 'user-action' },
  'focus-within': { en: 'Element or descendant has focus', zh: '元素或其后代获得焦点', category: 'user-action' },
  // link
  'link': { en: 'Unvisited link', zh: '未访问的链接', category: 'link' },
  'visited': { en: 'Visited link', zh: '已访问的链接', category: 'link' },
  'any-link': { en: 'Any link (visited or not)', zh: '任何链接（已访问或未访问）', category: 'link' },
  'local-link': { en: 'Link to same document', zh: '指向同一文档的链接', category: 'link' },
  'target': { en: 'Element targeted by URL fragment', zh: 'URL 片段指向的元素', category: 'link' },
  'target-within': { en: 'Element or descendant is target', zh: '元素或其后代是目标', category: 'link' },
  // form
  'enabled': { en: 'Enabled form element', zh: '启用的表单元素', category: 'form' },
  'disabled': { en: 'Disabled form element', zh: '禁用的表单元素', category: 'form' },
  'read-only': { en: 'Read-only element', zh: '只读元素', category: 'form' },
  'read-write': { en: 'Editable element', zh: '可编辑元素', category: 'form' },
  'placeholder-shown': { en: 'Input showing placeholder', zh: '显示占位符的输入框', category: 'form' },
  'default': { en: 'Default form element', zh: '默认表单元素', category: 'form' },
  'checked': { en: 'Checked checkbox/radio', zh: '选中的复选框/单选框', category: 'form' },
  'indeterminate': { en: 'Indeterminate state', zh: '不确定状态', category: 'form' },
  'valid': { en: 'Valid input', zh: '有效输入', category: 'form' },
  'invalid': { en: 'Invalid input', zh: '无效输入', category: 'form' },
  'in-range': { en: 'Value in range', zh: '值在范围内', category: 'form' },
  'out-of-range': { en: 'Value out of range', zh: '值超出范围', category: 'form' },
  'required': { en: 'Required field', zh: '必填字段', category: 'form' },
  'optional': { en: 'Optional field', zh: '可选字段', category: 'form' },
  'user-valid': { en: 'User-validated valid input', zh: '用户验证后的有效输入', category: 'form' },
  'user-invalid': { en: 'User-validated invalid input', zh: '用户验证后的无效输入', category: 'form' },
  'autofill': { en: 'Autofilled input', zh: '自动填充的输入', category: 'form' },
  // structural
  'root': { en: 'Document root element', zh: '文档根元素', category: 'structural' },
  'empty': { en: 'Element with no children', zh: '没有子元素的元素', category: 'structural' },
  'first-child': { en: 'First child element', zh: '第一个子元素', category: 'structural' },
  'last-child': { en: 'Last child element', zh: '最后一个子元素', category: 'structural' },
  'only-child': { en: 'Only child element', zh: '唯一子元素', category: 'structural' },
  'first-of-type': { en: 'First of its type', zh: '同类型中的第一个', category: 'structural' },
  'last-of-type': { en: 'Last of its type', zh: '同类型中的最后一个', category: 'structural' },
  'only-of-type': { en: 'Only one of its type', zh: '同类型中的唯一一个', category: 'structural' },
  'nth-child': { en: 'Nth child element', zh: '第 N 个子元素', category: 'structural' },
  'nth-last-child': { en: 'Nth child from end', zh: '倒数第 N 个子元素', category: 'structural' },
  'nth-of-type': { en: 'Nth of its type', zh: '同类型中的第 N 个', category: 'structural' },
  'nth-last-of-type': { en: 'Nth of type from end', zh: '同类型中倒数第 N 个', category: 'structural' },
  // logical
  'not': { en: 'Negation pseudo-class', zh: '否定伪类', category: 'logical' },
  'is': { en: 'Matches any selector in list', zh: '匹配列表中的任何选择器', category: 'logical' },
  'where': { en: 'Like :is() but zero specificity', zh: '类似 :is() 但优先级为零', category: 'logical' },
  'has': { en: 'Parent selector', zh: '父选择器', category: 'logical' },
  // linguistic
  'lang': { en: 'Element language', zh: '元素语言', category: 'linguistic' },
  'dir': { en: 'Text direction', zh: '文本方向', category: 'linguistic' },
  // display
  'fullscreen': { en: 'Fullscreen element', zh: '全屏元素', category: 'display' },
  'modal': { en: 'Modal dialog', zh: '模态对话框', category: 'display' },
  'picture-in-picture': { en: 'Picture-in-picture mode', zh: '画中画模式', category: 'display' },
  // media
  'playing': { en: 'Media is playing', zh: '媒体正在播放', category: 'media' },
  'paused': { en: 'Media is paused', zh: '媒体已暂停', category: 'media' },
  'seeking': { en: 'Media is seeking', zh: '媒体正在定位', category: 'media' },
  'buffering': { en: 'Media is buffering', zh: '媒体正在缓冲', category: 'media' },
  'stalled': { en: 'Media stalled', zh: '媒体停滞', category: 'media' },
  'muted': { en: 'Media is muted', zh: '媒体已静音', category: 'media' },
  'volume-locked': { en: 'Volume is locked', zh: '音量已锁定', category: 'media' },
  // web-components
  'defined': { en: 'Custom element is defined', zh: '自定义元素已定义', category: 'web-components' },
  'host': { en: 'Shadow host', zh: 'Shadow 宿主', category: 'web-components' },
  'host-context': { en: 'Shadow host in context', zh: '上下文中的 Shadow 宿主', category: 'web-components' },
  'scope': { en: 'Scoped element', zh: '作用域元素', category: 'web-components' },
};

// ==================== 伪元素描述 ====================

/** 伪元素描述 */
export const PSEUDO_ELEMENT_DESCRIPTIONS: Record<string, { en: string; zh: string }> = {
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

/** 常用伪类 */
export const COMMON_PSEUDO_CLASSES = [
  'hover', 'active', 'focus', 'focus-visible', 'focus-within',
  'disabled', 'enabled', 'checked', 'valid', 'invalid',
  'required', 'optional', 'read-only', 'read-write',
  'first-child', 'last-child', 'empty',
] as const;

/** 常用伪元素 */
export const COMMON_PSEUDO_ELEMENTS = [
  'before', 'after', 'placeholder', 'selection', 'first-line', 'first-letter',
] as const;
