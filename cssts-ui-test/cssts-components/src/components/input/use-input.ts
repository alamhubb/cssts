/**
 * Input Composable
 * 
 * Provides input logic and computed properties.
 * Reference: Element UI use-input.ts (simplified version)
 */

import { computed, ref, watch, nextTick } from 'vue'
import type { SetupContext, Ref } from 'vue'
import type { InputProps, InputEmits, InputSize } from './input'
import { $cls } from '../../styles/CssCls'
import { CssClsInput, getInputSizeClass } from '../../styles/components/input'

/**
 * Input composable return type
 */
export interface UseInputReturn {
  /** Input element ref */
  inputRef: Ref<HTMLInputElement | undefined>
  /** Textarea element ref */
  textareaRef: Ref<HTMLTextAreaElement | undefined>
  /** Computed disabled state */
  isDisabled: Ref<boolean>
  /** Computed focus state */
  isFocused: Ref<boolean>
  /** Computed input size */
  inputSize: Ref<InputSize>
  /** Computed input classes */
  inputClasses: Ref<Record<string, boolean>>
  /** Computed wrapper classes */
  wrapperClasses: Ref<Record<string, boolean>>
  /** Whether to show clear button */
  showClear: Ref<boolean>
  /** Whether to show password toggle */
  showPwdVisible: Ref<boolean>
  /** Password visible state */
  passwordVisible: Ref<boolean>
  /** Whether to show word limit */
  isWordLimitVisible: Ref<boolean>
  /** Current text length */
  textLength: Ref<number>
  /** Native input value */
  nativeInputValue: Ref<string>
  /** Focus handler */
  handleFocus: (evt: FocusEvent) => void
  /** Blur handler */
  handleBlur: (evt: FocusEvent) => void
  /** Input handler */
  handleInput: (evt: Event) => void
  /** Change handler */
  handleChange: (evt: Event) => void
  /** Clear handler */
  handleClear: () => void
  /** Password toggle handler */
  handlePasswordVisible: () => void
  /** Focus the input */
  focus: () => void
  /** Blur the input */
  blur: () => void
  /** Select the input content */
  select: () => void
}

/**
 * Use input composable
 */
export function useInput(
  props: InputProps,
  emit: SetupContext<InputEmits>['emit']
): UseInputReturn {
  const inputRef = ref<HTMLInputElement>()
  const textareaRef = ref<HTMLTextAreaElement>()
  const isFocused = ref(false)
  const passwordVisible = ref(false)
  
  // Computed disabled state
  const isDisabled = computed(() => props.disabled)
  
  // Computed input size
  const inputSize = computed<InputSize>(() => props.size || 'default')
  
  // Native input value
  const nativeInputValue = computed(() => {
    const value = props.modelValue
    return value === null || value === undefined ? '' : String(value)
  })
  
  // Text length for word limit
  const textLength = computed(() => nativeInputValue.value.length)
  
  // Whether to show clear button
  const showClear = computed(() => {
    return (
      props.clearable &&
      !isDisabled.value &&
      !props.readonly &&
      nativeInputValue.value.length > 0 &&
      isFocused.value
    )
  })
  
  // Whether to show password toggle
  const showPwdVisible = computed(() => {
    return (
      props.showPassword &&
      !isDisabled.value &&
      !props.readonly &&
      nativeInputValue.value.length > 0
    )
  })
  
  // Whether to show word limit
  const isWordLimitVisible = computed(() => {
    return (
      props.showWordLimit &&
      props.maxlength &&
      props.type === 'text' &&
      !isDisabled.value &&
      !props.readonly &&
      !props.showPassword
    )
  })
  
  // Computed input classes
  const inputClasses = computed(() => {
    return $cls(
      CssClsInput.wrapper,
      getInputSizeClass(inputSize.value),
      isDisabled.value && CssClsInput.disabled
    )
  })
  
  // Computed wrapper classes
  const wrapperClasses = computed(() => {
    return $cls(
      CssClsInput.innerWrapper,
      isFocused.value && CssClsInput.focus
    )
  })
  
  // Set native input value
  const setNativeInputValue = () => {
    const input = inputRef.value || textareaRef.value
    if (!input || input.value === nativeInputValue.value) return
    input.value = nativeInputValue.value
  }
  
  // Watch model value changes
  watch(nativeInputValue, () => {
    setNativeInputValue()
  })
  
  // Focus handler
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    emit('focus', evt)
  }
  
  // Blur handler
  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    emit('blur', evt)
  }
  
  // Input handler
  const handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    const value = target.value
    emit('update:modelValue', value)
    emit('input', value)
    nextTick(setNativeInputValue)
  }
  
  // Change handler
  const handleChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    emit('change', target.value)
  }
  
  // Clear handler
  const handleClear = () => {
    emit('update:modelValue', '')
    emit('change', '')
    emit('clear')
    emit('input', '')
  }
  
  // Password toggle handler
  const handlePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
    focus()
  }
  
  // Focus the input
  const focus = () => {
    const input = inputRef.value || textareaRef.value
    input?.focus()
  }
  
  // Blur the input
  const blur = () => {
    const input = inputRef.value || textareaRef.value
    input?.blur()
  }
  
  // Select the input content
  const select = () => {
    const input = inputRef.value || textareaRef.value
    input?.select()
  }
  
  return {
    inputRef,
    textareaRef,
    isDisabled,
    isFocused,
    inputSize,
    inputClasses,
    wrapperClasses,
    showClear,
    showPwdVisible,
    passwordVisible,
    isWordLimitVisible,
    textLength,
    nativeInputValue,
    handleFocus,
    handleBlur,
    handleInput,
    handleChange,
    handleClear,
    handlePasswordVisible,
    focus,
    blur,
    select,
  }
}

export default useInput
