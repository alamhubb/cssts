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

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassObject
  | ClassValue[]

interface ClassObject {
  [key: string]: boolean | undefined | null
}


// ==================== 样式合并 ====================

/**
 * 合并多个样式对象（旧实现）
 *
 * @example
 * const style = mergeOld(csstsAtom.displayFlex, csstsAtom.colorRed)
 * // 返回: { 'display_flex': true, 'color_red': true }
 */
export function mergeOld(...args: ClassValue[]): ClassObject {
  const result: ClassObject = {}
  for (const arg of args) {
    processValue(arg, result)
  }
  return result
}

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

// ==================== 公用方法 ====================

/**
 * 收集所有类名到数组中（递归展开）
 */
function collectClassNames(value: ClassValue, result: string[]): void {
  if (!value) return

  if (typeof value === 'string') {
    result.push(value)
  } else if (typeof value === 'number') {
    result.push(String(value))
  } else if (Array.isArray(value)) {
    for (const item of value) {
      collectClassNames(item, result)
    }
  } else if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      if (val) {
        if (typeof val === 'object' && val !== null) {
          collectClassNames(val as ClassValue, result)
        } else {
          result.push(key)
        }
      }
    }
  }
}

/**
 * 对象去重方法（根据 CSS 属性）
 * 
 * 当对象中有多个相同 CSS 属性的类名时，只保留最后一个
 * 
 * @example
 * deduplicateByProperty({ 
 *   'color_red': true, 
 *   'color_blue': true,
 *   'font-size_14px': true 
 * })
 * // => { 'color_blue': true, 'font-size_14px': true }
 * //    color_red 被移除（和 color_blue 属性相同）
 */
function deduplicateByProperty(obj: ClassObject): ClassObject {
  const propertyMap = new Map<string, string>()

  // 遍历对象的所有类名
  for (const className of Object.keys(obj)) {
    const property = getPropertyFromClassName(className)
    if (property) {
      // 有 CSS 属性：用属性作 key（后面的会覆盖前面的）
      propertyMap.set(property, className)
    } else {
      // 无 CSS 属性：用类名本身作 key
      propertyMap.set(className, className)
    }
  }

  // 生成去重后的对象
  const result: ClassObject = {}
  for (const className of propertyMap.values()) {
    result[className] = true
  }

  return result
}

/**
 * 合并多个样式对象（新实现）
 * 
 * 自动处理属性冲突：后面的样式覆盖前面的（相同 CSS 属性）
 * 
 * @example
 * merge(csstsAtom.colorRed, csstsAtom.colorBlue)
 * // => { 'color_blue': true }  // colorRed 被自动替换
 * 
 * merge(csstsAtom.colorRed, csstsAtom.fontSize14px)
 * // => { 'color_red': true, 'font-size_14px': true }  // 不同属性共存
 */
export function merge(...args: ClassValue[]): ClassObject {
  // 使用 Map 自动去重：key = CSS属性，value = 类名
  const propertyMap = new Map<string, string>()

  // 1. 收集所有类名
  const allClassNames: string[] = []
  for (const arg of args) {
    collectClassNames(arg, allClassNames)
  }

  // 2. 遍历类名，放入 Map（后面的会覆盖前面的）
  for (const className of allClassNames) {
    const property = getPropertyFromClassName(className)
    if (property) {
      // 有 CSS 属性的类名：用属性作为 key，相同属性会自动覆盖
      propertyMap.set(property, className)
    } else {
      // 无 CSS 属性的类名（如自定义类）：用类名本身作为 key
      propertyMap.set(className, className)
    }
  }

  // 3. 遍历 Map 生成最终对象
  const result: ClassObject = {}
  for (const className of propertyMap.values()) {
    result[className] = true
  }

  return result
}

// ==================== 属性提取 ====================

/**
 * 从类名提取 CSS 属性名
 *
 * 类名格式：{property}_{value} 如 color_red
 * 
 * 注意：伪类样式由 $$ 语法在编译时处理，runtime 不需要解析伪类
 *
 * @example
 * getPropertyFromClassName('color_red') // 'color'
 * getPropertyFromClassName('padding-top_16px') // 'padding-top'
 */
function getPropertyFromClassName(className: string): string | null {
  const firstUnderscoreIndex = className.indexOf(CSSTS_CONFIG.SEPARATOR)
  if (firstUnderscoreIndex <= 0) {
    return null
  }
  return className.slice(0, firstUnderscoreIndex)
}

// ==================== 样式替换 ====================

/**
 * 替换样式（基于属性冲突检测）
 *
 * 替换规则：属性相同才替换
 * - color_red + color_blue → 替换
 * - color_red + font-size_16px → 不替换（属性不同）
 *
 * 注意：伪类样式由 $$ 语法在编译时处理，生成独立的 CSS 规则
 * runtime 只处理普通的属性冲突
 *
 * @example
 * const style = { 'color_red': true, 'font-size_14px': true }
 * const newStyle = replace(style, csstsAtom.colorBlue)
 * // 返回: { 'color_blue': true, 'font-size_14px': true }
 */
export function replace(
  style: string | ClassObject,
  newAtom: ClassObject | string,
): string | ClassObject {
  // 获取新样式的类名和属性
  let newClassName: string
  if (typeof newAtom === 'string') {
    newClassName = newAtom
  } else {
    const keys = Object.keys(newAtom)
    if (keys.length === 0) return style
    newClassName = keys[0]
  }

  const newProperty = getPropertyFromClassName(newClassName)

  // 处理字符串格式
  if (typeof style === 'string') {
    const classes = style.split(' ').filter(Boolean)

    if (newProperty) {
      // 移除相同属性的类
      const result = classes.filter((cls) => {
        const clsProperty = getPropertyFromClassName(cls)
        return clsProperty !== newProperty
      })
      result.push(newClassName)
      return result.join(' ')
    }

    // 无法提取属性，直接添加
    return [...classes, newClassName].join(' ')
  }

  // 处理对象格式
  const result: ClassObject = {}

  for (const [cls, val] of Object.entries(style)) {
    if (!val) continue

    const clsProperty = getPropertyFromClassName(cls)

    // 属性相同才跳过（会被新样式替换）
    if (newProperty && clsProperty === newProperty) {
      continue
    }

    result[cls] = true
  }

  // 添加新样式
  result[newClassName] = true
  return result
}

/**
 * 批量替换样式
 *
 * @example
 * const style = { 'color_red': true, 'font-size_14px': true }
 * const newStyle = replaceAll(style, [csstsAtom.colorBlue, csstsAtom.fontSize16px])
 */
export function replaceAll(
  style: string | ClassObject,
  newAtoms: (ClassObject | string)[],
): string | ClassObject {
  let result = style
  for (const newAtom of newAtoms) {
    result = replace(result, newAtom)
  }
  return result
}

// ==================== 导出 ====================

export const cssts = {
  merge,
  mergeOld,
  replace,
  replaceAll,
  CSSTS_CONFIG,
  version: '0.2.0',
}

export default cssts
