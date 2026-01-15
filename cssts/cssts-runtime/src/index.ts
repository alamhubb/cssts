/**
 * CssTs 运行时
 *
 * 零依赖，只做对象操作
 * - merge(): 合并样式对象
 * - replace(): 属性冲突检测 + 替换
 *
 * 关键设计：
 * - 类名格式: `属性名_值`，如 `color_red`、`padding-top_16px`
 * - 通过 split(CSSTS_SEPARATOR) 从类名提取属性名
 * - 不需要 properties.json，不需要 getCssClassName()
 */

// ==================== 分隔符配置 ====================

/**
 * CSSTS 分隔符配置
 * 
 * 全局统一配置，compiler 和 runtime 共用
 */
export const CSSTS_CONFIG = {
  /**
   * CSS 类名分隔符
   * 类名格式: {property}_{value}
   * 例如: color_red, padding-top_16px
   */
  SEPARATOR: '_',

  /**
   * 伪类分隔符（双美元符号）
   * 变量名格式: {className}$${pseudo1}$${pseudo2}
   * 例如: primary$$hover$$active
   */
  PSEUDO_SEPARATOR: '$$',
} as const

// ==================== 类型定义 ====================

/**
 * CSS 类名记录对象
 * 
 * key: CSS 类名
 * value: 
 *   - true/false: 启用/禁用该类名
 *   - string: 类名的别名或动态值
 *   - null: 显式禁用
 */
export type CssClassRecord = { [key: string]: null | string | boolean }

/**
 * CSS 类名输入
 * 
 * 可以是：
 * - CssClassValue: 单个值（string 或 CssClassRecord）
 * - CssClassValue[]: 值数组
 */
export type CssClassInput = CssClassRecord | string | string[]

interface ClassObject {
  [key: string]: string | null
}


// ==================== 样式合并 ====================

/**
 * 合并多个样式对象（带属性去重）
 *
 * 去重规则：
 * - 有属性的类名（value 是 string）：同属性只保留最后一个
 * - 无属性的类名（value 是 null）：全部保留
 * - 字符串输入：视为无属性（value = null）
 * - 按原顺序输出
 * 
 * @example
 * merge(
 *   { 'display_flex': 'display' },
 *   { 'color_red': 'color' },
 *   { 'color_blue': 'color' }  // 同属性，会替换 color_red
 * )
 * // => { 'display_flex': 'display', 'color_blue': 'color' }
 */
export function merge(...args: CssClassInput[]): ClassObject {
  const map = new Map<string, { className: string; property: string | null }>()

  // 处理所有参数（边解包边去重）
  for (const arg of args) {
    processToMap(arg, map)
  }

  // 转换为 ClassObject
  const result: ClassObject = {}
  for (const { className, property } of map.values()) {
    result[className] = property
  }

  return result
}

/**
 * 将 CssClassInput 处理到 Map 中（边解包边去重）
 * 
 * @param value - 输入值
 * @param map - 目标 Map（可选，默认创建新的）
 * @returns 处理后的 Map
 */
function processToMap(
  value: CssClassInput,
  map = new Map<string, { className: string; property: string | null }>()
): Map<string, { className: string; property: string | null }> {
  if (!value) return map

  if (typeof value === 'string') {
    // 字符串：无属性，用类名做 key
    map.set(value, { className: value, property: null })
  } else if (Array.isArray(value)) {
    // 数组：递归处理每一项
    for (const item of value) {
      processToMap(item, map)
    }
  } else if (typeof value === 'object') {
    // 对象：遍历键值对
    for (const [className, val] of Object.entries(value)) {
      if (typeof val === 'boolean') {
        // boolean 值：true → 保留，false → 跳过
        if (val) {
          map.set(className, { className, property: null })
        }
      } else {
        // string | null：根据是否有属性决定 key
        const key = val !== null ? val : className
        map.set(key, { className, property: val })
      }
    }
  }

  return map
}

// ==================== 导出 ====================

export const cssts = {
  merge,
  CSSTS_CONFIG,
  version: '0.3.0',
}

export default cssts
