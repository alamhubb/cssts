/**
 * Icon Component Types
 * 
 * Props definitions for the Icon component.
 * Reference: Element UI icon.ts
 */

import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Icon props definition
 */
export const iconProps = {
  /**
   * Icon size (width and height)
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  
  /**
   * Icon color
   */
  color: {
    type: String,
    default: undefined,
  },
} as const

/**
 * Icon props type
 */
export type IconProps = ExtractPropTypes<typeof iconProps>

/**
 * Icon instance type
 */
export interface IconInstance {
  /** Icon element ref */
  $el: HTMLElement | undefined
}
