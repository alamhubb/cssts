/**
 * Input Component Types
 * 
 * Props and emits definitions for the Input component.
 * Reference: Element UI input.ts
 */

import type { Component, ExtractPropTypes, PropType, StyleValue } from 'vue'

/**
 * Input type variants
 */
export const inputTypes = ['text', 'password', 'textarea', 'number', 'email', 'tel', 'url'] as const

export type InputType = (typeof inputTypes)[number]

/**
 * Input size variants
 */
export const inputSizes = ['large', 'default', 'small'] as const

export type InputSize = (typeof inputSizes)[number]

/**
 * Input autosize configuration
 */
export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean

/**
 * Input props definition
 */
export const inputProps = {
  /**
   * Native input id
   */
  id: {
    type: String,
    default: undefined,
  },
  
  /**
   * Binding value (v-model)
   */
  modelValue: {
    type: [String, Number] as PropType<string | number | null | undefined>,
    default: '',
  },
  
  /**
   * Input type
   */
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  
  /**
   * Input size
   */
  size: {
    type: String as PropType<InputSize>,
    default: 'default',
  },
  
  /**
   * Placeholder text
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  
  /**
   * Disable the input
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Readonly mode
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Show clear button
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Show password toggle
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Show word count
   */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Max length
   */
  maxlength: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  
  /**
   * Min length
   */
  minlength: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  
  /**
   * Prefix icon
   */
  prefixIcon: {
    type: [Object, String] as PropType<Component | string>,
    default: undefined,
  },
  
  /**
   * Suffix icon
   */
  suffixIcon: {
    type: [Object, String] as PropType<Component | string>,
    default: undefined,
  },
  
  /**
   * Textarea rows
   */
  rows: {
    type: Number,
    default: 2,
  },
  
  /**
   * Textarea autosize
   */
  autosize: {
    type: [Boolean, Object] as PropType<InputAutoSize>,
    default: false,
  },
  
  /**
   * Native autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off',
  },
  
  /**
   * Native autofocus
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  
  /**
   * Native tabindex
   */
  tabindex: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
  
  /**
   * Input element style
   */
  inputStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => ({}),
  },
  
  /**
   * Aria label
   */
  ariaLabel: {
    type: String,
    default: undefined,
  },
} as const

/**
 * Input emits definition
 */
export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  input: (value: string | number) => true,
  change: (value: string | number) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
}

/**
 * Input props type
 */
export type InputProps = ExtractPropTypes<typeof inputProps>

/**
 * Input emits type
 */
export type InputEmits = typeof inputEmits

/**
 * Input instance type
 */
export interface InputInstance {
  /** Input element ref */
  input: HTMLInputElement | HTMLTextAreaElement | undefined
  /** Textarea element ref */
  textarea: HTMLTextAreaElement | undefined
  /** Focus the input */
  focus: () => void
  /** Blur the input */
  blur: () => void
  /** Select the input content */
  select: () => void
  /** Clear the input */
  clear: () => void
}
