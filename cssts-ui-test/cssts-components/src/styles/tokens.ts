/**
 * CssTs-UI Design Tokens
 * 
 * Reference: Element UI var.scss
 * These tokens define the foundational design variables for the component library.
 */

// ==================== Color Tokens ====================

export const colors = {
  // Brand colors
  white: '#ffffff',
  black: '#000000',
  
  // Primary colors
  primary: '#409eff',
  primaryLight3: '#79bbff',
  primaryLight5: '#a0cfff',
  primaryLight7: '#c6e2ff',
  primaryLight8: '#d9ecff',
  primaryLight9: '#ecf5ff',
  primaryDark2: '#337ecc',
  
  // Success colors
  success: '#67c23a',
  successLight3: '#95d475',
  successLight5: '#b3e19d',
  successLight7: '#d1edc4',
  successLight8: '#e1f3d8',
  successLight9: '#f0f9eb',
  successDark2: '#529b2e',
  
  // Warning colors
  warning: '#e6a23c',
  warningLight3: '#eebe77',
  warningLight5: '#f3d19e',
  warningLight7: '#f8e3c5',
  warningLight8: '#faecd8',
  warningLight9: '#fdf6ec',
  warningDark2: '#b88230',
  
  // Danger colors
  danger: '#f56c6c',
  dangerLight3: '#f89898',
  dangerLight5: '#fab6b6',
  dangerLight7: '#fcd3d3',
  dangerLight8: '#fde2e2',
  dangerLight9: '#fef0f0',
  dangerDark2: '#c45656',
  
  // Info colors
  info: '#909399',
  infoLight3: '#b1b3b8',
  infoLight5: '#c8c9cc',
  infoLight7: '#dedfe0',
  infoLight8: '#e9e9eb',
  infoLight9: '#f4f4f5',
  infoDark2: '#73767a',
} as const

// Text colors
export const textColors = {
  primary: '#303133',
  regular: '#606266',
  secondary: '#909399',
  placeholder: '#a8abb2',
  disabled: '#c0c4cc',
} as const

// Border colors
export const borderColors = {
  base: '#dcdfe6',
  light: '#e4e7ed',
  lighter: '#ebeef5',
  extraLight: '#f2f6fc',
  dark: '#d4d7de',
  darker: '#cdd0d6',
} as const

// Fill colors
export const fillColors = {
  base: '#f0f2f5',
  light: '#f5f7fa',
  lighter: '#fafafa',
  extraLight: '#fafcff',
  dark: '#ebedf0',
  darker: '#e6e8eb',
  blank: '#ffffff',
} as const

// Background colors
export const bgColors = {
  base: '#ffffff',
  page: '#f2f3f5',
  overlay: '#ffffff',
} as const

// ==================== Size Tokens ====================

export const componentSizes = {
  large: '40px',
  default: '32px',
  small: '24px',
} as const

export const fontSizes = {
  extraLarge: '20px',
  large: '18px',
  medium: '16px',
  base: '14px',
  small: '13px',
  extraSmall: '12px',
} as const

// ==================== Spacing Tokens ====================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
} as const

// Button specific spacing
export const buttonPaddingVertical = {
  large: '13px',
  default: '9px',
  small: '6px',
} as const

export const buttonPaddingHorizontal = {
  large: '20px',
  default: '16px',
  small: '12px',
} as const

// Input specific spacing
export const inputPaddingHorizontal = {
  large: '16px',
  default: '12px',
  small: '8px',
} as const

// ==================== Border Tokens ====================

export const borderWidth = '1px' as const

export const borderRadius = {
  base: '4px',
  small: '2px',
  round: '20px',
  circle: '50%',
} as const

// ==================== Shadow Tokens ====================

export const boxShadow = {
  base: '0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08)',
  light: '0px 0px 12px rgba(0, 0, 0, 0.12)',
  lighter: '0px 0px 6px rgba(0, 0, 0, 0.12)',
  dark: '0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16)',
} as const

// ==================== Transition Tokens ====================

export const transition = {
  duration: '0.1s',
  durationFast: '0.05s',
  durationSlow: '0.3s',
} as const

// ==================== Z-Index Tokens ====================

export const zIndex = {
  normal: 1,
  top: 1000,
  popper: 2000,
} as const

// ==================== Font Tokens ====================

export const fontWeight = {
  primary: 500,
  normal: 400,
  bold: 600,
} as const

export const fontFamily = "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif" as const

// ==================== Type Definitions ====================

export type ColorType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type SizeType = 'large' | 'default' | 'small'
