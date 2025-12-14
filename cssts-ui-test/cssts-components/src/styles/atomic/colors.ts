/**
 * Color Atomic Styles
 * 
 * Background, text, and border color atomic classes
 */

export const colorAtoms = {
  // ==================== Background Colors ====================
  
  // Brand backgrounds
  bgWhite: { 'cu-bg-white': true },
  bgBlack: { 'cu-bg-black': true },
  bgTransparent: { 'cu-bg-transparent': true },
  
  // Primary backgrounds
  bgPrimary: { 'cu-bg-primary': true },
  bgPrimaryLight3: { 'cu-bg-primary-light-3': true },
  bgPrimaryLight5: { 'cu-bg-primary-light-5': true },
  bgPrimaryLight7: { 'cu-bg-primary-light-7': true },
  bgPrimaryLight8: { 'cu-bg-primary-light-8': true },
  bgPrimaryLight9: { 'cu-bg-primary-light-9': true },
  bgPrimaryDark2: { 'cu-bg-primary-dark-2': true },
  
  // Success backgrounds
  bgSuccess: { 'cu-bg-success': true },
  bgSuccessLight3: { 'cu-bg-success-light-3': true },
  bgSuccessLight5: { 'cu-bg-success-light-5': true },
  bgSuccessLight9: { 'cu-bg-success-light-9': true },
  bgSuccessDark2: { 'cu-bg-success-dark-2': true },
  
  // Warning backgrounds
  bgWarning: { 'cu-bg-warning': true },
  bgWarningLight3: { 'cu-bg-warning-light-3': true },
  bgWarningLight5: { 'cu-bg-warning-light-5': true },
  bgWarningLight9: { 'cu-bg-warning-light-9': true },
  bgWarningDark2: { 'cu-bg-warning-dark-2': true },
  
  // Danger backgrounds
  bgDanger: { 'cu-bg-danger': true },
  bgDangerLight3: { 'cu-bg-danger-light-3': true },
  bgDangerLight5: { 'cu-bg-danger-light-5': true },
  bgDangerLight9: { 'cu-bg-danger-light-9': true },
  bgDangerDark2: { 'cu-bg-danger-dark-2': true },
  
  // Info backgrounds
  bgInfo: { 'cu-bg-info': true },
  bgInfoLight3: { 'cu-bg-info-light-3': true },
  bgInfoLight5: { 'cu-bg-info-light-5': true },
  bgInfoLight9: { 'cu-bg-info-light-9': true },
  bgInfoDark2: { 'cu-bg-info-dark-2': true },
  
  // Fill backgrounds
  bgFill: { 'cu-bg-fill': true },
  bgFillLight: { 'cu-bg-fill-light': true },
  bgFillLighter: { 'cu-bg-fill-lighter': true },
  bgFillBlank: { 'cu-bg-fill-blank': true },
  bgFillDark: { 'cu-bg-fill-dark': true },
  
  // Page backgrounds
  bgPage: { 'cu-bg-page': true },
  bgOverlay: { 'cu-bg-overlay': true },
  
  // ==================== Text Colors ====================
  
  // Brand text
  textWhite: { 'cu-text-white': true },
  textBlack: { 'cu-text-black': true },
  
  // Primary text
  textPrimary: { 'cu-text-primary': true },
  textPrimaryLight3: { 'cu-text-primary-light-3': true },
  textPrimaryDark2: { 'cu-text-primary-dark-2': true },
  
  // Success text
  textSuccess: { 'cu-text-success': true },
  textSuccessDark2: { 'cu-text-success-dark-2': true },
  
  // Warning text
  textWarning: { 'cu-text-warning': true },
  textWarningDark2: { 'cu-text-warning-dark-2': true },
  
  // Danger text
  textDanger: { 'cu-text-danger': true },
  textDangerDark2: { 'cu-text-danger-dark-2': true },
  
  // Info text
  textInfo: { 'cu-text-info': true },
  textInfoDark2: { 'cu-text-info-dark-2': true },
  
  // Semantic text colors
  textColorPrimary: { 'cu-text-color-primary': true },
  textColorRegular: { 'cu-text-color-regular': true },
  textColorSecondary: { 'cu-text-color-secondary': true },
  textColorPlaceholder: { 'cu-text-color-placeholder': true },
  textColorDisabled: { 'cu-text-color-disabled': true },
  
  // ==================== Border Colors ====================
  
  // Brand borders
  borderTransparent: { 'cu-border-transparent': true },
  
  // Primary borders
  borderPrimary: { 'cu-border-primary': true },
  borderPrimaryLight7: { 'cu-border-primary-light-7': true },
  borderPrimaryDark2: { 'cu-border-primary-dark-2': true },
  
  // Success borders
  borderSuccess: { 'cu-border-success': true },
  borderSuccessDark2: { 'cu-border-success-dark-2': true },
  
  // Warning borders
  borderWarning: { 'cu-border-warning': true },
  borderWarningDark2: { 'cu-border-warning-dark-2': true },
  
  // Danger borders
  borderDanger: { 'cu-border-danger': true },
  borderDangerDark2: { 'cu-border-danger-dark-2': true },
  
  // Info borders
  borderInfo: { 'cu-border-info': true },
  borderInfoDark2: { 'cu-border-info-dark-2': true },
  
  // Semantic border colors
  borderBase: { 'cu-border-base': true },
  borderLight: { 'cu-border-light': true },
  borderLighter: { 'cu-border-lighter': true },
  borderExtraLight: { 'cu-border-extra-light': true },
  borderDark: { 'cu-border-dark': true },
  borderDarker: { 'cu-border-darker': true },
} as const

export type ColorAtomKey = keyof typeof colorAtoms
