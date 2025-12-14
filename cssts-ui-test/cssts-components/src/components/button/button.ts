/**
 * Button Component Types
 * 
 * Props and emits definitions for the Button component.
 * Reference: Element UI button.ts
 */

import type { Component, ExtractPropTypes, PropType } from 'vue'

/**
 * Button type variants
 */
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
] as const

export type ButtonType = (typeof buttonTypes)[number]

/**
 * Button native types
 */
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export type ButtonNativeType = (typeof buttonNativeTypes)[number]

/**
 * Button size variants
 */
export const buttonSizes = ['large', 'default', 'small'] as const

export type ButtonSize = (typeof buttonSizes)[number]

/**
 * Button props definition
 */
export const buttonProps = {
  /**
   * Button type (visual style)
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
    validator: (val: string) => buttonTypes.includes(val as ButtonType),
  },
  
  /**
   * Button size
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
    validator: (val: string) => buttonSizes.includes(val as ButtonSize),
  },
  
  /**
   * Native button type
   */
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
    validator: (val: string) => buttonNativeTypes.includes(val as ButtonNativeType),
  },
  
  /**
   * Disable the button
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Show loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Plain/outlined style
   */
  plain: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Text button style
   */
  text: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Link button style
   */
  link: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Text button with background
   */
  bg: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Round corners (pill shape)
   */
  round: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Circle shape
   */
  circle: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Icon component
   */
  icon: {
    type: [Object, String] as PropType<Component | string>,
    default: undefined,
  },
  
  /**
   * Loading icon component
   */
  loadingIcon: {
    type: [Object, String] as PropType<Component | string>,
    default: undefined,
  },
  
  /**
   * Native autofocus
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Custom element tag
   */
  tag: {
    type: [String, Object] as PropType<string | Component>,
    default: 'button',
  },
  
  /**
   * Custom button color
   */
  color: {
    type: String,
    default: undefined,
  },
  
  /**
   * Auto insert space between Chinese characters
   */
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
} as const

/**
 * Button emits definition
 */
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

/**
 * Button props type
 */
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

/**
 * Button emits type
 */
export type ButtonEmits = typeof buttonEmits

/**
 * Button instance type
 */
export interface ButtonInstance {
  /** Button element ref */
  ref: HTMLButtonElement | undefined
  /** Button size */
  size: ButtonSize
  /** Button type */
  type: ButtonType
  /** Button disabled state */
  disabled: boolean
  /** Expose button element */
  expose: () => void
}
