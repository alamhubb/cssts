/**
 * Typography Atomic Styles
 * 
 * Font size, font weight, and text related atomic classes
 */

export const typographyAtoms = {
  // ==================== Font Size ====================
  
  textXs: { 'cu-text-xs': true },      // 12px
  textSm: { 'cu-text-sm': true },      // 13px
  textBase: { 'cu-text-base': true },  // 14px
  textMd: { 'cu-text-md': true },      // 16px
  textLg: { 'cu-text-lg': true },      // 18px
  textXl: { 'cu-text-xl': true },      // 20px
  
  // ==================== Font Weight ====================
  
  fontNormal: { 'cu-font-normal': true },   // 400
  fontMedium: { 'cu-font-medium': true },   // 500
  fontSemibold: { 'cu-font-semibold': true }, // 600
  fontBold: { 'cu-font-bold': true },       // 700
  
  // ==================== Font Style ====================
  
  italic: { 'cu-italic': true },
  notItalic: { 'cu-not-italic': true },
  
  // ==================== Text Decoration ====================
  
  underline: { 'cu-underline': true },
  lineThrough: { 'cu-line-through': true },
  noUnderline: { 'cu-no-underline': true },
  
  // ==================== Text Transform ====================
  
  uppercase: { 'cu-uppercase': true },
  lowercase: { 'cu-lowercase': true },
  capitalize: { 'cu-capitalize': true },
  normalCase: { 'cu-normal-case': true },
  
  // ==================== Text Overflow ====================
  
  truncate: { 'cu-truncate': true },
  textEllipsis: { 'cu-text-ellipsis': true },
  textClip: { 'cu-text-clip': true },
  
  // ==================== Whitespace ====================
  
  whitespaceNormal: { 'cu-whitespace-normal': true },
  whitespaceNowrap: { 'cu-whitespace-nowrap': true },
  whitespacePre: { 'cu-whitespace-pre': true },
  whitespacePreLine: { 'cu-whitespace-pre-line': true },
  whitespacePreWrap: { 'cu-whitespace-pre-wrap': true },
  
  // ==================== Word Break ====================
  
  breakNormal: { 'cu-break-normal': true },
  breakWords: { 'cu-break-words': true },
  breakAll: { 'cu-break-all': true },
  
  // ==================== Letter Spacing ====================
  
  trackingTighter: { 'cu-tracking-tighter': true },
  trackingTight: { 'cu-tracking-tight': true },
  trackingNormal: { 'cu-tracking-normal': true },
  trackingWide: { 'cu-tracking-wide': true },
  trackingWider: { 'cu-tracking-wider': true },
} as const

export type TypographyAtomKey = keyof typeof typographyAtoms
