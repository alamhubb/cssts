/**
 * CsstsAtoms 接口 - 原子类类型定义
 *
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-18T16:56:39.831Z
 */

export interface CsstsAtoms {
  // ==================== state ====================
  readonly isDisabled: { 'is-disabled': true }
  readonly isLoading: { 'is-loading': true }
  readonly isActive: { 'is-active': true }
  readonly isFocus: { 'is-focus': true }
  readonly isHover: { 'is-hover': true }
  readonly isSelected: { 'is-selected': true }
  readonly isError: { 'is-error': true }
  readonly isSuccess: { 'is-success': true }
  readonly isWarning: { 'is-warning': true }

  // 允许任意其他原子类
  readonly [key: string]: { [className: string]: true }
}