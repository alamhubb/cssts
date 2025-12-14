/**
 * CssTs Style System
 * 
 * 提供样式合并函数和组件样式导出
 * 使用 cssts 的 css {} 语法
 */

import { atomicStyles } from './atomic'
import * as buttonStyles from './components/button'
import * as iconStyles from './components/icon'
import * as inputStyles from './components/input'

// ==================== Type Definitions ====================

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassObject
  | ClassValue[]

export interface ClassObject {
  [key: string]: boolean | undefined | null
}

// ==================== CssTs Runtime ====================

/**
 * 配置：类名前缀
 */
export const config = {
  prefix: ''  // 默认无前缀，可改为 'el-' 等
}

/**
 * 驼峰转 kebab-case
 * bgPrimary → bg-primary
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 生成带前缀的类名
 * cls('bgPrimary', 'colorWhite') → 'bg-primary color-white'
 * cls('bgPrimary', 'colorWhite') with prefix 'el-' → 'el-bg-primary el-color-white'
 */
export function cls(...atoms: string[]): string {
  return atoms
    .map(atom => config.prefix + camelToKebab(atom))
    .join(' ')
}

/**
 * 设置类名前缀
 */
export function setPrefix(prefix: string) {
  config.prefix = prefix
}

// ==================== Style Merge Function ====================

/**
 * 合并多个样式对象为一个 Vue :class 兼容的对象
 * 
 * @example
 * // 基础用法
 * mergeStyles(buttonBase, buttonPrimary)
 * 
 * // 条件样式
 * mergeStyles(buttonBase, props.disabled && buttonDisabled)
 */
export function mergeStyles(...args: ClassValue[]): ClassObject {
  const result: ClassObject = {}

  for (const arg of args) {
    processValue(arg, result)
  }

  return result
}

/**
 * 递归处理单个值并添加到结果
 */
function processValue(value: ClassValue, result: ClassObject): void {
  if (!value) return

  if (typeof value === 'string') {
    result[value] = true
  } else if (typeof value === 'number') {
    result[String(value)] = true
  } else if (Array.isArray(value)) {
    for (const item of value) {
      processValue(item, result)
    }
  } else if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      if (val) {
        if (typeof val === 'object' && val !== null) {
          processValue(val as ClassValue, result)
        } else {
          result[key] = true
        }
      }
    }
  }
}

// ==================== Exports ====================

// 导出样式合并函数（保留旧名称以兼容）
export const $cls = mergeStyles

// 导出组件样式
export { buttonStyles, iconStyles, inputStyles }

// 导出原子样式
export { atomicStyles }

// 默认导出
export default {
  ...atomicStyles,
  button: buttonStyles,
  icon: iconStyles,
  input: inputStyles,
  mergeStyles,
  $cls,
  cls,
  setPrefix,
  config,
}
