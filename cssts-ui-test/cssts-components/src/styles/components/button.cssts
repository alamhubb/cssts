/**
 * Button Component Styles
 * 
 * CssTs style definitions for the Button component.
 * Reference: Element Plus button styles
 * 
 * 使用 cssts 的 css {} 语法定义样式
 */

// ==================== Base Styles ====================

/**
 * 按钮基础样式
 */
export const buttonBase = css {
  inlineFlex,
  flexAlignCenter,
  flexJustifyCenter,
  border,
  roundedBase,
  cursorPointer,
  userSelectNone,
  transition,
  fontSize14,
  fontMedium,
  paddingSm,
}

// ==================== Type Variants ====================

/**
 * 默认按钮
 */
export const buttonDefault = css {
  bgWhite,
  colorBlack,
  borderBase,
}

/**
 * 主要按钮 - 蓝色主题
 */
export const buttonPrimary = css {
  bgPrimary,
  colorWhite,
  borderPrimary,
}

/**
 * 成功按钮 - 绿色主题
 */
export const buttonSuccess = css {
  bgSuccess,
  colorWhite,
}

/**
 * 警告按钮 - 橙色主题
 */
export const buttonWarning = css {
  bgWarning,
  colorWhite,
}

/**
 * 危险按钮 - 红色主题
 */
export const buttonDanger = css {
  bgDanger,
  colorWhite,
}

/**
 * 信息按钮 - 灰色主题
 */
export const buttonInfo = css {
  bgInfo,
  colorWhite,
}

// ==================== Size Variants ====================

/**
 * 大尺寸按钮
 */
export const buttonLarge = css {
  fontSize16,
  paddingMd,
}

/**
 * 小尺寸按钮
 */
export const buttonSmall = css {
  fontSize12,
  paddingXs,
}

// ==================== State Variants ====================

/**
 * 禁用状态
 */
export const buttonDisabled = css {
  disabled,
  cursorNotAllowed,
}

/**
 * 加载状态
 */
export const buttonLoading = css {
  loading,
  cursorNotAllowed,
}

/**
 * 圆角按钮
 */
export const buttonRound = css {
  roundedRound,
}

/**
 * 圆形按钮
 */
export const buttonCircle = css {
  roundedCircle,
}

// ==================== Helper Functions ====================

/**
 * 根据 type 获取按钮样式
 */
export function getButtonTypeStyle(type?: string) {
  switch (type) {
    case 'primary':
      return buttonPrimary
    case 'success':
      return buttonSuccess
    case 'warning':
      return buttonWarning
    case 'danger':
      return buttonDanger
    case 'info':
      return buttonInfo
    default:
      return buttonDefault
  }
}

/**
 * 根据 size 获取按钮样式
 */
export function getButtonSizeStyle(size?: string) {
  switch (size) {
    case 'large':
      return buttonLarge
    case 'small':
      return buttonSmall
    default:
      return {}
  }
}
