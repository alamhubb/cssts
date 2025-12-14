/**
 * Button Composable
 * 
 * Provides button logic and computed properties.
 * Reference: Element UI use-button.ts (simplified version)
 */

import { computed, ref, useSlots, Text } from 'vue'
import type { SetupContext, Ref } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonType, ButtonSize } from './button'
import { $cls } from '../../styles/CssCls'
import { CssClsButton, getButtonTypeClass, getButtonSizeClass } from '../../styles/components/button'

/**
 * Button composable return type
 */
export interface UseButtonReturn {
  /** Button element ref */
  buttonRef: Ref<HTMLButtonElement | undefined>
  /** Computed disabled state */
  isDisabled: Ref<boolean>
  /** Computed button size */
  buttonSize: Ref<ButtonSize>
  /** Computed button type */
  buttonType: Ref<ButtonType>
  /** Computed button classes */
  buttonClasses: Ref<Record<string, boolean>>
  /** Native button props */
  buttonProps: Ref<Record<string, unknown>>
  /** Should add space between Chinese characters */
  shouldAddSpace: Ref<boolean>
  /** Click handler */
  handleClick: (evt: MouseEvent) => void
}

/**
 * Use button composable
 * 
 * @param props - Button props
 * @param emit - Button emit function
 * @returns Button composable return
 */
export function useButton(
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit']
): UseButtonReturn {
  const buttonRef = ref<HTMLButtonElement>()
  const slots = useSlots()
  
  // Computed disabled state (disabled or loading)
  const isDisabled = computed(() => props.disabled || props.loading)
  
  // Computed button size
  const buttonSize = computed<ButtonSize>(() => props.size || 'default')
  
  // Computed button type
  const buttonType = computed<ButtonType>(() => props.type || 'default')
  
  // Computed button classes
  const buttonClasses = computed(() => {
    return $cls(
      CssClsButton.base,
      getButtonTypeClass(buttonType.value),
      getButtonSizeClass(buttonSize.value),
      props.disabled && CssClsButton.disabled,
      props.loading && CssClsButton.loading,
      props.plain && CssClsButton.plain,
      props.round && CssClsButton.round,
      props.circle && CssClsButton.circle,
      props.text && CssClsButton.text,
      props.link && CssClsButton.link,
      props.bg && CssClsButton.hasBg
    )
  })
  
  // Native button props
  const buttonProps = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: isDisabled.value,
        disabled: isDisabled.value,
        autofocus: props.autofocus,
        type: props.nativeType,
      }
    }
    return {}
  })
  
  // Should add space between two Chinese characters
  const shouldAddSpace = computed(() => {
    if (props.autoInsertSpace === false) return false
    
    const defaultSlot = slots.default?.()
    if (defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if (slot?.type === Text) {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })
  
  // Click handler
  const handleClick = (evt: MouseEvent) => {
    if (isDisabled.value) {
      evt.stopPropagation()
      return
    }
    emit('click', evt)
  }
  
  return {
    buttonRef,
    isDisabled,
    buttonSize,
    buttonType,
    buttonClasses,
    buttonProps,
    shouldAddSpace,
    handleClick,
  }
}

export default useButton
