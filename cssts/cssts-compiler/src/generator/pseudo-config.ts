/**
 * 伪类配置类
 * 
 * 使用 class 定义配置，用户可以直接查看默认值和所有支持的伪类
 */

import cssData from '../data/css-data.json' with { type: 'json' }

// ==================== 类型定义 ====================

/**
 * 伪类样式项
 * 每个对象只能有一个 CSS 属性（原子类设计原则）
 */
export type PseudoStyleItem = { [cssProperty: string]: string }

/**
 * 伪类样式配置
 * 可以是单个样式对象，或多个样式对象的数组
 */
export type PseudoStyleValue = PseudoStyleItem | PseudoStyleItem[]

// ==================== 所有 CSS 伪类 ====================

/**
 * 所有支持的 CSS 伪类
 * 数据来源：css-tree + MDN 标准
 */
export const ALL_PSEUDO_CLASSES = cssData.pseudoClasses as readonly string[]

/**
 * 常用伪类（用于快速配置）
 */
export const COMMON_PSEUDO_CLASSES = [
  'hover',
  'active', 
  'focus',
  'focus-visible',
  'focus-within',
  'disabled',
  'enabled',
  'checked',
  'valid',
  'invalid',
  'required',
  'optional',
  'read-only',
  'read-write',
  'first-child',
  'last-child',
  'empty',
] as const

export type CommonPseudoClass = typeof COMMON_PSEUDO_CLASSES[number]

// ==================== 伪类配置类 ====================

/**
 * 伪类工具配置类
 * 
 * 定义当变量名包含伪类后缀时（如 `btn$$hover`），自动添加的 CSS 样式
 * 
 * @example
 * ```ts
 * // 使用默认配置
 * const config = new PseudoUtilsConfig()
 * 
 * // 自定义配置
 * const config = new PseudoUtilsConfig({
 *   hover: { opacity: '0.8' },
 *   active: [{ opacity: '0.6' }, { transform: 'scale(0.98)' }]
 * })
 * ```
 */
export class PseudoUtilsConfig {
  /**
   * hover 伪类样式
   * @default { opacity: '0.9' }
   */
  hover: PseudoStyleValue = { opacity: '0.9' }

  /**
   * active 伪类样式
   * @default { opacity: '0.6' }
   */
  active: PseudoStyleValue = { opacity: '0.6' }

  /**
   * focus 伪类样式
   * @default { opacity: '0.9' }
   */
  focus: PseudoStyleValue = { opacity: '0.9' }

  /**
   * focus-visible 伪类样式
   * @default undefined
   */
  'focus-visible'?: PseudoStyleValue = undefined

  /**
   * focus-within 伪类样式
   * @default undefined
   */
  'focus-within'?: PseudoStyleValue = undefined

  /**
   * disabled 伪类样式
   * @default [{ opacity: '0.5' }, { cursor: 'not-allowed' }]
   */
  disabled: PseudoStyleValue = [
    { opacity: '0.5' },
    { cursor: 'not-allowed' }
  ]

  /**
   * enabled 伪类样式
   * @default undefined
   */
  enabled?: PseudoStyleValue = undefined

  /**
   * checked 伪类样式
   * @default undefined
   */
  checked?: PseudoStyleValue = undefined

  /**
   * valid 伪类样式
   * @default undefined
   */
  valid?: PseudoStyleValue = undefined

  /**
   * invalid 伪类样式
   * @default undefined
   */
  invalid?: PseudoStyleValue = undefined

  /**
   * required 伪类样式
   * @default undefined
   */
  required?: PseudoStyleValue = undefined

  /**
   * optional 伪类样式
   * @default undefined
   */
  optional?: PseudoStyleValue = undefined

  /**
   * read-only 伪类样式
   * @default undefined
   */
  'read-only'?: PseudoStyleValue = undefined

  /**
   * read-write 伪类样式
   * @default undefined
   */
  'read-write'?: PseudoStyleValue = undefined

  /** 其他自定义伪类配置（通过 custom 属性访问） */
  custom: Record<string, PseudoStyleValue> = {}

  constructor(options: Partial<Omit<PseudoUtilsConfig, 'custom'>> & { custom?: Record<string, PseudoStyleValue> } = {}) {
    // 用户传入的配置覆盖默认值
    Object.assign(this, options)
  }

  /**
   * 获取指定伪类的样式配置
   */
  getStyle(pseudoClass: string): PseudoStyleValue | undefined {
    // 先检查标准属性
    const standardProps = ['hover', 'active', 'focus', 'focus-visible', 'focus-within', 
      'disabled', 'enabled', 'checked', 'valid', 'invalid', 'required', 'optional', 
      'read-only', 'read-write'] as const
    
    if (standardProps.includes(pseudoClass as any)) {
      return (this as any)[pseudoClass]
    }
    // 检查自定义配置
    return this.custom[pseudoClass]
  }

  /**
   * 获取所有已配置的伪类
   */
  getConfiguredPseudos(): string[] {
    const result: string[] = []
    const standardProps = ['hover', 'active', 'focus', 'focus-visible', 'focus-within', 
      'disabled', 'enabled', 'checked', 'valid', 'invalid', 'required', 'optional', 
      'read-only', 'read-write'] as const
    
    for (const key of standardProps) {
      if ((this as any)[key] !== undefined) {
        result.push(key)
      }
    }
    // 添加自定义配置
    result.push(...Object.keys(this.custom))
    return result
  }

  /**
   * 转换为普通对象（用于序列化）
   */
  toObject(): Record<string, PseudoStyleValue> {
    const result: Record<string, PseudoStyleValue> = {}
    for (const key of this.getConfiguredPseudos()) {
      const value = this.getStyle(key)
      if (value !== undefined) {
        result[key] = value
      }
    }
    return result
  }
}

/**
 * 默认伪类配置实例
 */
export const defaultPseudoUtilsConfig = new PseudoUtilsConfig()
