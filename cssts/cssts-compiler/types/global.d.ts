/**
 * CssTs Global Type Declarations
 *
 * 自动生成，请勿手动修改
 * 生成时间: 2025-12-18T16:56:39.833Z
 */

import type { CsstsAtoms } from './CsstsAtoms'
import type { CsstsRuntime } from './runtime'

declare global {
  /** CssTs runtime */
  const cssts: CsstsRuntime

  // ==================== state ====================
  const isDisabled: CsstsAtoms['isDisabled']
  const isLoading: CsstsAtoms['isLoading']
  const isActive: CsstsAtoms['isActive']
  const isFocus: CsstsAtoms['isFocus']
  const isHover: CsstsAtoms['isHover']
  const isSelected: CsstsAtoms['isSelected']
  const isError: CsstsAtoms['isError']
  const isSuccess: CsstsAtoms['isSuccess']
  const isWarning: CsstsAtoms['isWarning']

}

export {}