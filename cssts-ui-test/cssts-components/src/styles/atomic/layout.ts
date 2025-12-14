/**
 * Layout Atomic Styles
 * 
 * Flex, grid, and position related atomic classes
 */

export const layoutAtoms = {
  // Display
  block: { 'cu-block': true },
  inlineBlock: { 'cu-inline-block': true },
  inline: { 'cu-inline': true },
  flex: { 'cu-flex': true },
  inlineFlex: { 'cu-inline-flex': true },
  grid: { 'cu-grid': true },
  hidden: { 'cu-hidden': true },
  
  // Flex direction
  flexRow: { 'cu-flex-row': true },
  flexCol: { 'cu-flex-col': true },
  flexRowReverse: { 'cu-flex-row-reverse': true },
  flexColReverse: { 'cu-flex-col-reverse': true },
  
  // Flex wrap
  flexWrap: { 'cu-flex-wrap': true },
  flexNoWrap: { 'cu-flex-nowrap': true },
  
  // Justify content
  justifyStart: { 'cu-justify-start': true },
  justifyEnd: { 'cu-justify-end': true },
  justifyCenter: { 'cu-justify-center': true },
  justifyBetween: { 'cu-justify-between': true },
  justifyAround: { 'cu-justify-around': true },
  justifyEvenly: { 'cu-justify-evenly': true },
  
  // Align items
  itemsStart: { 'cu-items-start': true },
  itemsEnd: { 'cu-items-end': true },
  itemsCenter: { 'cu-items-center': true },
  itemsBaseline: { 'cu-items-baseline': true },
  itemsStretch: { 'cu-items-stretch': true },
  
  // Align self
  selfAuto: { 'cu-self-auto': true },
  selfStart: { 'cu-self-start': true },
  selfEnd: { 'cu-self-end': true },
  selfCenter: { 'cu-self-center': true },
  selfStretch: { 'cu-self-stretch': true },
  
  // Flex grow/shrink
  flexGrow: { 'cu-flex-grow': true },
  flexGrow0: { 'cu-flex-grow-0': true },
  flexShrink: { 'cu-flex-shrink': true },
  flexShrink0: { 'cu-flex-shrink-0': true },
  
  // Combined flex utilities
  flexCenter: { 'cu-flex': true, 'cu-justify-center': true, 'cu-items-center': true },
  inlineFlexCenter: { 'cu-inline-flex': true, 'cu-justify-center': true, 'cu-items-center': true },
  
  // Position
  relative: { 'cu-relative': true },
  absolute: { 'cu-absolute': true },
  fixed: { 'cu-fixed': true },
  sticky: { 'cu-sticky': true },
  static: { 'cu-static': true },
  
  // Position values
  inset0: { 'cu-inset-0': true },
  top0: { 'cu-top-0': true },
  right0: { 'cu-right-0': true },
  bottom0: { 'cu-bottom-0': true },
  left0: { 'cu-left-0': true },
  
  // Overflow
  overflowAuto: { 'cu-overflow-auto': true },
  overflowHidden: { 'cu-overflow-hidden': true },
  overflowVisible: { 'cu-overflow-visible': true },
  overflowScroll: { 'cu-overflow-scroll': true },
  
  // Text alignment
  textLeft: { 'cu-text-left': true },
  textCenter: { 'cu-text-center': true },
  textRight: { 'cu-text-right': true },
  
  // Vertical alignment
  alignTop: { 'cu-align-top': true },
  alignMiddle: { 'cu-align-middle': true },
  alignBottom: { 'cu-align-bottom': true },
} as const

export type LayoutAtomKey = keyof typeof layoutAtoms
