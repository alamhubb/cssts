/**
 * Icon Component Styles
 * 
 * CssTs style definitions for the Icon component.
 * Reference: Element Plus icon styles
 * 
 * 使用 cssts 的 css {} 语法定义样式
 */

// ==================== Base Styles ====================

/**
 * 图标基础样式
 */
export const iconBase = css {
  inlineFlex,
  flexAlignCenter,
  flexJustifyCenter,
}

// ==================== State Variants ====================

/**
 * 加载状态（旋转动画）
 */
export const iconLoading = css {
  loading,
}

// ==================== Position Variants ====================

/**
 * 左侧图标（右边距）
 */
export const iconLeft = css {
  marginSm,
}

/**
 * 右侧图标（左边距）
 */
export const iconRight = css {
  marginSm,
}

// ==================== Size Variants ====================

/**
 * 小尺寸图标
 */
export const iconSmall = css {
  fontSize12,
}

/**
 * 默认尺寸图标
 */
export const iconDefault = css {
  fontSize14,
}

/**
 * 大尺寸图标
 */
export const iconLarge = css {
  fontSize16,
}

// ==================== Helper Functions ====================

/**
 * 根据 size 获取图标样式
 */
export function getIconSizeStyle(size?: string) {
  switch (size) {
    case 'large':
      return iconLarge
    case 'small':
      return iconSmall
    default:
      return iconDefault
  }
}
