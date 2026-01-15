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
 *   - undefined: 跳过
 *   - null: 无属性
 *   - string: 属性名
 *   - boolean: true 保留，false 跳过
 *   - number: 非0 保留，0 跳过
 */
export type CssClassRecord = {
  [key: string]: undefined | null | string | boolean | number
}

/**
 * CSS 类名输入
 * 
 * 支持的类型：
 * - string: 单个类名
 * - string[]: 类名数组
 * - CssClassRecord: 类名对象
 * - undefined/null: 会被跳过
 * - CssClassInput[]: 支持嵌套数组
 * 
 * 注意：如需传入其他类型，请使用类型断言 `as any`
 */
export type CssClassInput =
  | CssClassRecord
  | string
  | string[]
  | CssClassInput[]
  | undefined
  | null

interface ClassObject {
  [key: string]: string | true  // null 改为 true，兼容 Vue :class
}


// ==================== 样式合并 ====================

/**
 * 合并多个 CSS 类名输入
 * 
 * 核心规则：
 * - 有属性的类名（value 是 string）：同属性只保留最后一个
 * - 无属性的类名（value 是 null/true）：全部保留
 * - 字符串输入：视为无属性（value = true）
 * - 按原顺序输出
 * 
 * @example
 * merge(
 *   { 'display_flex': 'display' },
 *   { 'color_red': 'color' },
 *   { 'color_blue': 'color' }  // 同属性，会替换 color_red
 * )
 * // => { 'display_flex': true, 'color_blue': 'color' }
 */
export function merge(...args: CssClassInput[]): ClassObject {
  const map = new Map<string, { className: string; property: string | null }>()

  // 处理所有参数（边解包边去重）
  for (const arg of args) {
    processToMap(arg, map)
  }

  // 转换为 ClassObject（null → true，兼容 Vue :class）
  const result: ClassObject = {}
  for (const { className, property } of map.values()) {
    result[className] = property !== null ? property : true
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
      const property = normalizeValue(val)

      if (property === undefined) {
        continue  // 跳过
      }

      // 保留
      const key = property !== null ? property : className
      map.set(key, { className, property })
    }
  }

  return map
}

/**
 * 规范化值类型
 * 
 * @param val - 输入值
 * @returns 
 *   - undefined → 跳过此条目
 *   - null → 保留，property 为 null（无属性）
 *   - string → 保留，property 为该字符串（属性名）
 */
function normalizeValue(val: any): undefined | null | string {
  if (val === undefined) return undefined  // 跳过
  if (val === null) return null            // 无属性
  if (typeof val === 'string') return val  // 有属性

  if (typeof val === 'boolean') {
    return val ? null : undefined          // true → 保留，false → 跳过
  }

  if (typeof val === 'number') {
    return val !== 0 ? null : undefined    // 非0 → 保留，0 → 跳过
  }

  return undefined  // 其他类型 → 跳过
}

// ==================== 导出 ====================

export const cssts = {
  merge,
  CSSTS_CONFIG,
  version: '0.3.0',
}

export default cssts
