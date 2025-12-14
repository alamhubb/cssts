/**
 * Effects Atomic Styles
 * 
 * Shadow, transition, cursor, and visual effect atomic classes
 */

export const effectsAtoms = {
  // ==================== Box Shadow ====================
  
  shadowNone: { 'cu-shadow-none': true },
  shadow: { 'cu-shadow': true },
  shadowLight: { 'cu-shadow-light': true },
  shadowLighter: { 'cu-shadow-lighter': true },
  shadowDark: { 'cu-shadow-dark': true },
  
  // ==================== Border ====================
  
  border: { 'cu-border': true },
  borderNone: { 'cu-border-none': true },
  border0: { 'cu-border-0': true },
  borderT: { 'cu-border-t': true },
  borderR: { 'cu-border-r': true },
  borderB: { 'cu-border-b': true },
  borderL: { 'cu-border-l': true },
  
  // ==================== Border Radius ====================
  
  roundedNone: { 'cu-rounded-none': true },
  roundedSm: { 'cu-rounded-sm': true },
  rounded: { 'cu-rounded': true },
  roundedMd: { 'cu-rounded-md': true },
  roundedLg: { 'cu-rounded-lg': true },
  roundedRound: { 'cu-rounded-round': true },
  roundedFull: { 'cu-rounded-full': true },
  roundedCircle: { 'cu-rounded-circle': true },
  
  // ==================== Transition ====================
  
  transitionNone: { 'cu-transition-none': true },
  transition: { 'cu-transition': true },
  transitionFast: { 'cu-transition-fast': true },
  transitionSlow: { 'cu-transition-slow': true },
  transitionAll: { 'cu-transition-all': true },
  transitionColors: { 'cu-transition-colors': true },
  transitionOpacity: { 'cu-transition-opacity': true },
  transitionShadow: { 'cu-transition-shadow': true },
  transitionTransform: { 'cu-transition-transform': true },
  
  // ==================== Cursor ====================
  
  cursorAuto: { 'cu-cursor-auto': true },
  cursorDefault: { 'cu-cursor-default': true },
  cursorPointer: { 'cu-cursor-pointer': true },
  cursorWait: { 'cu-cursor-wait': true },
  cursorText: { 'cu-cursor-text': true },
  cursorMove: { 'cu-cursor-move': true },
  cursorNotAllowed: { 'cu-cursor-not-allowed': true },
  cursorNone: { 'cu-cursor-none': true },
  
  // ==================== Pointer Events ====================
  
  pointerEventsNone: { 'cu-pointer-events-none': true },
  pointerEventsAuto: { 'cu-pointer-events-auto': true },
  
  // ==================== User Select ====================
  
  selectNone: { 'cu-select-none': true },
  selectText: { 'cu-select-text': true },
  selectAll: { 'cu-select-all': true },
  selectAuto: { 'cu-select-auto': true },
  
  // ==================== Opacity ====================
  
  opacity0: { 'cu-opacity-0': true },
  opacity25: { 'cu-opacity-25': true },
  opacity50: { 'cu-opacity-50': true },
  opacity75: { 'cu-opacity-75': true },
  opacity100: { 'cu-opacity-100': true },
  
  // ==================== Outline ====================
  
  outlineNone: { 'cu-outline-none': true },
  outline: { 'cu-outline': true },
  outlinePrimary: { 'cu-outline-primary': true },
  
  // ==================== Appearance ====================
  
  appearanceNone: { 'cu-appearance-none': true },
  
  // ==================== Resize ====================
  
  resizeNone: { 'cu-resize-none': true },
  resize: { 'cu-resize': true },
  resizeX: { 'cu-resize-x': true },
  resizeY: { 'cu-resize-y': true },
} as const

export type EffectsAtomKey = keyof typeof effectsAtoms
