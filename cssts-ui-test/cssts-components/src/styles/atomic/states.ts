/**
 * State Atomic Styles
 * 
 * Component state related atomic classes (disabled, loading, active, etc.)
 */

export const stateAtoms = {
  // ==================== Disabled State ====================
  
  isDisabled: { 'is-disabled': true },
  
  // ==================== Loading State ====================
  
  isLoading: { 'is-loading': true },
  
  // ==================== Active State ====================
  
  isActive: { 'is-active': true },
  
  // ==================== Focus State ====================
  
  isFocus: { 'is-focus': true },
  isFocused: { 'is-focused': true },
  
  // ==================== Hover State ====================
  
  isHover: { 'is-hover': true },
  
  // ==================== Selected State ====================
  
  isSelected: { 'is-selected': true },
  isChecked: { 'is-checked': true },
  
  // ==================== Expanded State ====================
  
  isExpanded: { 'is-expanded': true },
  isCollapsed: { 'is-collapsed': true },
  
  // ==================== Visible State ====================
  
  isVisible: { 'is-visible': true },
  isHidden: { 'is-hidden': true },
  
  // ==================== Error State ====================
  
  isError: { 'is-error': true },
  hasError: { 'has-error': true },
  
  // ==================== Success State ====================
  
  isSuccess: { 'is-success': true },
  
  // ==================== Warning State ====================
  
  isWarning: { 'is-warning': true },
  
  // ==================== Button Specific States ====================
  
  isPlain: { 'is-plain': true },
  isRound: { 'is-round': true },
  isCircle: { 'is-circle': true },
  isText: { 'is-text': true },
  isLink: { 'is-link': true },
  hasBg: { 'is-has-bg': true },
  
  // ==================== Input Specific States ====================
  
  isClearable: { 'is-clearable': true },
  hasPrefix: { 'has-prefix': true },
  hasSuffix: { 'has-suffix': true },
  
  // ==================== Empty State ====================
  
  isEmpty: { 'is-empty': true },
  
  // ==================== Readonly State ====================
  
  isReadonly: { 'is-readonly': true },
} as const

export type StateAtomKey = keyof typeof stateAtoms
