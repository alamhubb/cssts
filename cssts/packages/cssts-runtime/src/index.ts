/**
 * CssTs 运行时
 *
 * 零依赖，只做对象操作
 * - $cls(): 合并样式对象
 * - replace(): 属性冲突检测 + 替换
 *
 * 关键设计：
 * - 类名格式: `属性名_值`，如 `color_red`、`padding-top_16px`
 * - 通过 split(CSSTS_SEPARATOR) 从类名提取属性名
 * - 不需要 properties.json，不需要 getCssClassName()
 */

// ==================== 分隔符常量 ====================

/**
 * CSS 类名分隔符
 *
 * 类名格式: `{property}_{value}`
 * 例如: `color_red`, `padding-top_16px`
 *
 * 编译时 (cssts-compiler) 也导入此常量，保证一致性
 */
export const CSSTS_SEPARATOR = '_'

/**
 * 伪类分隔符（双美元符号）
 *
 * 变量名格式: `{className}$${pseudo1}$${pseudo2}`
 * 例如: `primary$$hover$$active`
 *
 * ⚠️ 重要：使用 $$ 双美元符号，不是单个 $！
 * 
 * 编译时 (cssts-compiler, vite-plugin-cssts) 导入此常量，保证一致性
 */
export const CSSTS_PSEUDO_SEPARATOR = '$$'

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
 * 合并多个样式对象
 *
 * @example
 * const style = $cls(csstsAtom.displayFlex, csstsAtom.colorRed)
 * // 返回: { 'display_flex': true, 'color_red': true }
 */
export function $cls(...args: ClassValue[]): ClassObject {
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

// ==================== 属性提取 ====================

/**
 * 从类名提取 CSS 属性名
 *
 * 类名格式：`{property}_{value}` 如 `color_red`
 * 
 * 注意：伪类样式由 $$ 语法在编译时处理，runtime 不需要解析伪类
 *
 * @example
 * getPropertyFromClassName('color_red') // 'color'
 * getPropertyFromClassName('padding-top_16px') // 'padding-top'
 */
function getPropertyFromClassName(className: string): string | null {
  const firstUnderscoreIndex = className.indexOf(CSSTS_SEPARATOR)
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

// ==================== 兼容性导出（已废弃） ====================

/**
 * @deprecated 不再需要，类名已在 csstsAtom 中
 */
export function getCssClassName(atomName: string): string {
  console.warn('[cssts] getCssClassName is deprecated. Class names are already in csstsAtom.')
  return atomName
}

/**
 * @deprecated 不再需要，使用 split('_') 从类名提取属性
 */
export function getCssProperty(atomName: string): string | undefined {
  console.warn('[cssts] getCssProperty is deprecated. Use split("_") to extract property from class name.')
  return getPropertyFromClassName(atomName) || undefined
}

/**
 * @deprecated 不再需要 properties.json
 */
export function initProperties(_data: Record<string, string>): void {
  console.warn('[cssts] initProperties is deprecated. No longer needed.')
}

// ==================== 导出 ====================

export const cssts = {
  $cls,
  replace,
  replaceAll,
  CSSTS_SEPARATOR,
  CSSTS_PSEUDO_SEPARATOR,
  // 兼容性导出
  getCssProperty,
  getCssClassName,
  initProperties,
  version: '0.2.0',
}

export default cssts
