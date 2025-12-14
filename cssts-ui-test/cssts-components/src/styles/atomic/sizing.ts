/**
 * Sizing Atomic Styles
 * 
 * Width, height, padding, margin related atomic classes
 */

export const sizingAtoms = {
  // Width
  wFull: { 'cu-w-full': true },
  wAuto: { 'cu-w-auto': true },
  wScreen: { 'cu-w-screen': true },
  wMin: { 'cu-w-min': true },
  wMax: { 'cu-w-max': true },
  wFit: { 'cu-w-fit': true },
  
  // Height
  hFull: { 'cu-h-full': true },
  hAuto: { 'cu-h-auto': true },
  hScreen: { 'cu-h-screen': true },
  hMin: { 'cu-h-min': true },
  hMax: { 'cu-h-max': true },
  hFit: { 'cu-h-fit': true },
  
  // Component sizes
  sizeLarge: { 'cu-size-large': true },
  sizeDefault: { 'cu-size-default': true },
  sizeSmall: { 'cu-size-small': true },
  
  // Padding - all sides
  p0: { 'cu-p-0': true },
  pXs: { 'cu-p-xs': true },
  pSm: { 'cu-p-sm': true },
  pMd: { 'cu-p-md': true },
  pLg: { 'cu-p-lg': true },
  pXl: { 'cu-p-xl': true },
  
  // Padding - horizontal
  px0: { 'cu-px-0': true },
  pxXs: { 'cu-px-xs': true },
  pxSm: { 'cu-px-sm': true },
  pxMd: { 'cu-px-md': true },
  pxLg: { 'cu-px-lg': true },
  pxXl: { 'cu-px-xl': true },
  
  // Padding - vertical
  py0: { 'cu-py-0': true },
  pyXs: { 'cu-py-xs': true },
  pySm: { 'cu-py-sm': true },
  pyMd: { 'cu-py-md': true },
  pyLg: { 'cu-py-lg': true },
  pyXl: { 'cu-py-xl': true },
  
  // Padding - individual sides
  pt0: { 'cu-pt-0': true },
  pr0: { 'cu-pr-0': true },
  pb0: { 'cu-pb-0': true },
  pl0: { 'cu-pl-0': true },
  
  // Margin - all sides
  m0: { 'cu-m-0': true },
  mXs: { 'cu-m-xs': true },
  mSm: { 'cu-m-sm': true },
  mMd: { 'cu-m-md': true },
  mLg: { 'cu-m-lg': true },
  mXl: { 'cu-m-xl': true },
  mAuto: { 'cu-m-auto': true },
  
  // Margin - horizontal
  mx0: { 'cu-mx-0': true },
  mxXs: { 'cu-mx-xs': true },
  mxSm: { 'cu-mx-sm': true },
  mxMd: { 'cu-mx-md': true },
  mxLg: { 'cu-mx-lg': true },
  mxXl: { 'cu-mx-xl': true },
  mxAuto: { 'cu-mx-auto': true },
  
  // Margin - vertical
  my0: { 'cu-my-0': true },
  myXs: { 'cu-my-xs': true },
  mySm: { 'cu-my-sm': true },
  myMd: { 'cu-my-md': true },
  myLg: { 'cu-my-lg': true },
  myXl: { 'cu-my-xl': true },
  myAuto: { 'cu-my-auto': true },
  
  // Margin - individual sides
  mt0: { 'cu-mt-0': true },
  mr0: { 'cu-mr-0': true },
  mb0: { 'cu-mb-0': true },
  ml0: { 'cu-ml-0': true },
  mlSm: { 'cu-ml-sm': true },
  mlMd: { 'cu-ml-md': true },
  
  // Gap (for flex/grid)
  gap0: { 'cu-gap-0': true },
  gapXs: { 'cu-gap-xs': true },
  gapSm: { 'cu-gap-sm': true },
  gapMd: { 'cu-gap-md': true },
  gapLg: { 'cu-gap-lg': true },
  gapXl: { 'cu-gap-xl': true },
  
  // Box sizing
  boxBorder: { 'cu-box-border': true },
  boxContent: { 'cu-box-content': true },
  
  // Line height
  leading1: { 'cu-leading-1': true },
  leadingNormal: { 'cu-leading-normal': true },
  leadingRelaxed: { 'cu-leading-relaxed': true },
} as const

export type SizingAtomKey = keyof typeof sizingAtoms
