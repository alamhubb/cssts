/**
 * Input Component Styles
 * 
 * CssTs style definitions for the Input component.
 * Reference: Element Plus input styles
 * 
 * 使用 cssts 的 css {} 语法定义样式
 */

// ==================== Base Styles ====================

/**
 * Input 外层包装器样式
 */
export const inputWrapper = css {
  inlineFlex,
  flexAlignCenter,
}

/**
 * Input 内层包装器样式
 */
export const inputInnerWrapper = css {
  inlineFlex,
  flexAlignCenter,
  border,
  roundedBase,
  transition,
  paddingSm,
}

/**
 * Input 元素样式
 */
export const inputInner = css {
  fontSize14,
}

// ==================== Size Variants ====================

/**
 * 大尺寸输入框
 */
export const inputLarge = css {
  fontSize16,
  paddingMd,
}

/**
 * 小尺寸输入框
 */
export const inputSmall = css {
  fontSize12,
  paddingXs,
}

// ==================== State Variants ====================

/**
 * 禁用状态
 */
export const inputDisabled = css {
  disabled,
  cursorNotAllowed,
}

/**
 * 聚焦状态
 */
export const inputFocus = css {
  focus,
  borderPrimary,
}

// ==================== Slot Styles ====================

/**
 * 前缀插槽
 */
export const inputPrefix = css {
  inlineFlex,
  flexAlignCenter,
  marginSm,
}

/**
 * 后缀插槽
 */
export const inputSuffix = css {
  inlineFlex,
  flexAlignCenter,
  marginSm,
}

// ==================== Icon Styles ====================

/**
 * 清除图标
 */
export const inputClearIcon = css {
  cursorPointer,
  transition,
}

/**
 * 密码切换图标
 */
export const inputPasswordIcon = css {
  cursorPointer,
  transition,
}

// ==================== Helper Functions ====================

/**
 * 根据 size 获取输入框样式
 */
export function getInputSizeStyle(size?: string) {
  switch (size) {
    case 'large':
      return inputLarge
    case 'small':
      return inputSmall
    default:
      return {}
  }
}

// ==================== Textarea Styles ====================

/**
 * Textarea 包装器样式
 */
export const textareaWrapper = css {
  block,
}

/**
 * Textarea 元素样式
 */
export const textareaInner = css {
  border,
  roundedBase,
  transition,
  paddingSm,
  fontSize14,
}

/**
 * Textarea 禁用状态
 */
export const textareaDisabled = css {
  disabled,
  cursorNotAllowed,
}
