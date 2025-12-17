/**
 * CSS 数据提取脚本 v2
 * 
 * 生成两个独立的数据文件：
 * 1. css-keywords-data.json - 关键字类型属性
 * 2. css-number-data.json - 数值类型属性
 * 
 * 运行方式：npx tsx scripts/extract-css-data-v2.ts
 */

import * as csstree from 'css-tree'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 类型定义 ====================

interface KeywordPropertyData {
  name: string
  keywords: string[]
}

interface NumberPropertyData {
  name: string
  numberTypes: string[]  // 支持的数值类型：length, percentage, number, angle, time, etc.
}

interface CssKeywordsData {
  generatedAt: string
  csstreeVersion: string
  properties: KeywordPropertyData[]
  pseudoClasses: string[]
  pseudoElements: string[]
}

interface NumberTypeDescription {
  en: string
  zh: string
}

interface CssNumberData {
  generatedAt: string
  csstreeVersion: string
  properties: NumberPropertyData[]
  /** 数值类型说明（中英文） */
  numberTypeDescriptions: Record<string, NumberTypeDescription>
}

// ==================== 数值类型映射 ====================

/**
 * CSS 数值类型到我们的单位类型的映射
 */
const NUMBER_TYPE_MAP: Record<string, string> = {
  // 长度类型
  'length': 'length',
  'length-percentage': 'length-percentage',
  
  // 百分比
  'percentage': 'percentage',
  
  // 纯数字
  'number': 'number',
  'integer': 'integer',
  'positive-integer': 'integer',
  
  // 角度
  'angle': 'angle',
  'angle-percentage': 'angle-percentage',
  
  // 时间
  'time': 'time',
  'time-percentage': 'time-percentage',
  
  // Flex
  'flex': 'flex',
  
  // 分辨率
  'resolution': 'resolution',
  
  // 频率
  'frequency': 'frequency',
  'frequency-percentage': 'frequency-percentage',
}

/**
 * 数值类型说明（中英文）
 * 英文来源：MDN Web Docs / W3C CSS Values and Units Module
 */
const NUMBER_TYPE_DESCRIPTIONS: Record<string, { en: string; zh: string }> = {
  'length': {
    en: 'A distance measurement. Represents a length value such as px, em, rem, vh, vw, etc.',
    zh: '距离度量。表示长度值，如 px、em、rem、vh、vw 等。'
  },
  'length-percentage': {
    en: 'A value that can be either a <length> or a <percentage>.',
    zh: '可以是 <length> 或 <percentage> 的值。'
  },
  'percentage': {
    en: 'A percentage value. Represents a fraction of some other value, always relative to another quantity.',
    zh: '百分比值。表示某个其他值的分数，始终相对于另一个量。'
  },
  'number': {
    en: 'A real number, possibly with a fractional component.',
    zh: '实数，可能带有小数部分。'
  },
  'integer': {
    en: 'A whole number, positive or negative.',
    zh: '整数，正数或负数。'
  },
  'angle': {
    en: 'An angle value expressed in degrees (deg), gradians (grad), radians (rad), or turns (turn).',
    zh: '角度值，以度 (deg)、百分度 (grad)、弧度 (rad) 或圈数 (turn) 表示。'
  },
  'angle-percentage': {
    en: 'A value that can be either an <angle> or a <percentage>.',
    zh: '可以是 <angle> 或 <percentage> 的值。'
  },
  'time': {
    en: 'A time value expressed in seconds (s) or milliseconds (ms).',
    zh: '时间值，以秒 (s) 或毫秒 (ms) 表示。'
  },
  'time-percentage': {
    en: 'A value that can be either a <time> or a <percentage>.',
    zh: '可以是 <time> 或 <percentage> 的值。'
  },
  'flex': {
    en: 'A flexible length in fr units, representing a fraction of the leftover space in the grid container.',
    zh: '弹性长度，以 fr 为单位，表示网格容器中剩余空间的分数。'
  },
  'resolution': {
    en: 'A resolution value for describing the pixel density of an output device (dpi, dpcm, dppx).',
    zh: '分辨率值，用于描述输出设备的像素密度 (dpi、dpcm、dppx)。'
  },
  'frequency': {
    en: 'A frequency value expressed in hertz (Hz) or kilohertz (kHz).',
    zh: '频率值，以赫兹 (Hz) 或千赫兹 (kHz) 表示。'
  },
  'frequency-percentage': {
    en: 'A value that can be either a <frequency> or a <percentage>.',
    zh: '可以是 <frequency> 或 <percentage> 的值。'
  },
}

// ==================== 关键字提取 ====================

function extractKeywords(syntax: any, visited: Set<string> = new Set()): string[] {
  const keywords: string[] = []
  if (!syntax) return keywords

  const lexer = (csstree as any).lexer

  if (syntax.type === 'Keyword') {
    keywords.push(syntax.name)
  } else if (syntax.type === 'Group' && syntax.terms) {
    for (const term of syntax.terms) {
      keywords.push(...extractKeywords(term, visited))
    }
  } else if (syntax.type === 'Type' && syntax.name) {
    if (!visited.has(syntax.name)) {
      visited.add(syntax.name)
      const typeData = lexer.types[syntax.name]
      if (typeData && typeData.syntax) {
        keywords.push(...extractKeywords(typeData.syntax, visited))
      }
    }
  } else if (syntax.type === 'Multiplier' && syntax.term) {
    keywords.push(...extractKeywords(syntax.term, visited))
  }

  return keywords
}

function getPropertyKeywords(property: string): string[] {
  const lexer = (csstree as any).lexer
  const propData = lexer.properties[property]

  if (!propData || !propData.syntax) {
    return []
  }

  const keywords = extractKeywords(propData.syntax)

  return [...new Set(keywords)]
    .filter(k => !k.startsWith('-') && !k.startsWith('webkit') && k.length > 0)
    .sort()
}

// ==================== 数值类型提取 ====================

function extractNumberTypes(syntax: any, visited: Set<string> = new Set()): Set<string> {
  const types = new Set<string>()
  if (!syntax) return types

  const lexer = (csstree as any).lexer

  if (syntax.type === 'Type' && syntax.name) {
    // 检查是否是数值类型
    if (NUMBER_TYPE_MAP[syntax.name]) {
      types.add(NUMBER_TYPE_MAP[syntax.name])
    }
    
    // 递归检查类型定义
    if (!visited.has(syntax.name)) {
      visited.add(syntax.name)
      const typeData = lexer.types[syntax.name]
      if (typeData && typeData.syntax) {
        for (const t of extractNumberTypes(typeData.syntax, visited)) {
          types.add(t)
        }
      }
    }
  } else if (syntax.type === 'Group' && syntax.terms) {
    for (const term of syntax.terms) {
      for (const t of extractNumberTypes(term, visited)) {
        types.add(t)
      }
    }
  } else if (syntax.type === 'Multiplier' && syntax.term) {
    for (const t of extractNumberTypes(syntax.term, visited)) {
      types.add(t)
    }
  }

  return types
}

function getPropertyNumberTypes(property: string): string[] {
  const lexer = (csstree as any).lexer
  const propData = lexer.properties[property]

  if (!propData || !propData.syntax) {
    return []
  }

  const types = extractNumberTypes(propData.syntax)
  return [...types].sort()
}

// ==================== 主函数 ====================

function extractCssData() {
  const lexer = (csstree as any).lexer
  const allProperties = Object.keys(lexer.properties as Record<string, any>).sort()
  
  const keywordProperties: KeywordPropertyData[] = []
  const numberProperties: NumberPropertyData[] = []

  for (const name of allProperties) {
    const keywords = getPropertyKeywords(name)
    const numberTypes = getPropertyNumberTypes(name)

    // 有关键字的属性
    if (keywords.length > 0) {
      keywordProperties.push({ name, keywords })
    }

    // 有数值类型的属性
    if (numberTypes.length > 0) {
      numberProperties.push({ name, numberTypes })
    }
  }

  // CSS 伪类列表
  const pseudoClasses = [
    'hover', 'active', 'focus', 'focus-visible', 'focus-within',
    'link', 'visited', 'any-link', 'local-link', 'target', 'target-within',
    'enabled', 'disabled', 'read-only', 'read-write', 'placeholder-shown',
    'default', 'checked', 'indeterminate', 'valid', 'invalid',
    'in-range', 'out-of-range', 'required', 'optional',
    'user-valid', 'user-invalid',
    'root', 'empty', 'first-child', 'last-child', 'only-child',
    'first-of-type', 'last-of-type', 'only-of-type',
    'nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type',
    'not', 'is', 'where', 'has', 'lang', 'dir',
    'fullscreen', 'modal', 'picture-in-picture',
    'autofill', 'playing', 'paused', 'seeking', 'buffering', 'stalled', 'muted', 'volume-locked',
    'defined', 'host', 'host-context', 'scope',
  ].sort()

  // CSS 伪元素列表
  const pseudoElements = [
    'before', 'after', 'first-line', 'first-letter',
    'marker', 'selection', 'placeholder', 'backdrop',
    'file-selector-button', 'cue', 'cue-region',
    'part', 'slotted',
  ].sort()

  const timestamp = new Date().toISOString()
  const version = (csstree as any).version || 'unknown'

  const keywordsData: CssKeywordsData = {
    generatedAt: timestamp,
    csstreeVersion: version,
    properties: keywordProperties,
    pseudoClasses,
    pseudoElements,
  }

  const numberData: CssNumberData = {
    generatedAt: timestamp,
    csstreeVersion: version,
    properties: numberProperties,
    numberTypeDescriptions: NUMBER_TYPE_DESCRIPTIONS,
  }

  return { keywordsData, numberData }
}

// ==================== 生成文件 ====================

function main() {
  console.log('Extracting CSS data from css-tree...')
  
  const { keywordsData, numberData } = extractCssData()
  
  // 统计信息
  console.log(`\nKeywords Data:`)
  console.log(`  Properties with keywords: ${keywordsData.properties.length}`)
  const totalKeywords = keywordsData.properties.reduce((sum, p) => sum + p.keywords.length, 0)
  console.log(`  Total keywords: ${totalKeywords}`)
  console.log(`  Pseudo-classes: ${keywordsData.pseudoClasses.length}`)
  console.log(`  Pseudo-elements: ${keywordsData.pseudoElements.length}`)

  console.log(`\nNumber Data:`)
  console.log(`  Properties with number types: ${numberData.properties.length}`)
  const numberTypeStats = new Map<string, number>()
  for (const p of numberData.properties) {
    for (const t of p.numberTypes) {
      numberTypeStats.set(t, (numberTypeStats.get(t) || 0) + 1)
    }
  }
  console.log(`  Number type distribution:`)
  for (const [type, count] of [...numberTypeStats.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${type}: ${count} properties`)
  }

  // 确保目录存在
  const outputDir = path.join(__dirname, '../src/data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 生成 css-keywords-data.json
  const keywordsPath = path.join(outputDir, 'css-keywords-data.json')
  fs.writeFileSync(keywordsPath, JSON.stringify(keywordsData, null, 2))
  console.log(`\nGenerated: ${keywordsPath}`)

  // 生成 css-number-data.json
  const numberPath = path.join(outputDir, 'css-number-data.json')
  fs.writeFileSync(numberPath, JSON.stringify(numberData, null, 2))
  console.log(`Generated: ${numberPath}`)

  // 生成类型定义文件
  const dtsContent = `/**
 * CSS 数据类型定义 - 自动生成
 * 生成时间: ${keywordsData.generatedAt}
 */

// ==================== Keywords Data ====================

export interface KeywordPropertyData {
  name: string
  keywords: string[]
}

export interface CssKeywordsData {
  generatedAt: string
  csstreeVersion: string
  properties: KeywordPropertyData[]
  pseudoClasses: string[]
  pseudoElements: string[]
}

// ==================== Number Data ====================

export interface NumberPropertyData {
  name: string
  numberTypes: string[]
}

export interface CssNumberData {
  generatedAt: string
  csstreeVersion: string
  properties: NumberPropertyData[]
  numberTypeDescriptions: Record<string, string>
}

// ==================== Type Unions ====================

/** CSS 数值类型 */
export type CssNumberType = ${[...numberTypeStats.keys()].map(t => `'${t}'`).join(' | ')}

/** 所有 CSS 伪类 */
export type CssPseudoClass = ${keywordsData.pseudoClasses.map(p => `'${p}'`).join(' | ')}

/** 所有 CSS 伪元素 */
export type CssPseudoElement = ${keywordsData.pseudoElements.map(p => `'${p}'`).join(' | ')}
`
  
  const dtsPath = path.join(outputDir, 'css-data-types.d.ts')
  fs.writeFileSync(dtsPath, dtsContent)
  console.log(`Generated: ${dtsPath}`)
}

main()
