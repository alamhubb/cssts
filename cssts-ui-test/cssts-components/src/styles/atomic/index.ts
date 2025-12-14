/**
 * Atomic Styles Export
 * 
 * Exports all atomic style classes for use in components
 */

export { layoutAtoms, type LayoutAtomKey } from './layout'
export { sizingAtoms, type SizingAtomKey } from './sizing'
export { colorAtoms, type ColorAtomKey } from './colors'
export { typographyAtoms, type TypographyAtomKey } from './typography'
export { effectsAtoms, type EffectsAtomKey } from './effects'
export { stateAtoms, type StateAtomKey } from './states'

// Combined atomic styles object
import { layoutAtoms } from './layout'
import { sizingAtoms } from './sizing'
import { colorAtoms } from './colors'
import { typographyAtoms } from './typography'
import { effectsAtoms } from './effects'
import { stateAtoms } from './states'

/**
 * All atomic styles combined into a single object
 */
export const atomicStyles = {
  ...layoutAtoms,
  ...sizingAtoms,
  ...colorAtoms,
  ...typographyAtoms,
  ...effectsAtoms,
  ...stateAtoms,
} as const

export type AtomicStyleKey = keyof typeof atomicStyles
