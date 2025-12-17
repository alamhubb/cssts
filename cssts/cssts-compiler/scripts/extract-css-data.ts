/**
 * CSS 数据提取脚本
 * 
 * 从 css-tree 提取所有 CSS 属性和关键字，生成静态数据文件
 * 
 * 运行方式：npx tsx scripts/extract-css-data.ts
 */

import * as csstree from 'css-tree'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 类型定义 ====================

interface PropertyData {
  /** CSS 属性名 (kebab-case) */
  name: string
  /** 属性支持的关键字值 */
  keywords: string[]
}

interface CssData {
  /** 生成时间 */
  generatedAt: string
  /** css-tree 版本 */
  csstreeVersion: string
  /** 所有 CSS 属性及其关键字 */
  properties: PropertyData[]
  /** 所有 CSS 伪类 */
  pseudoClasses: string[]
  /** 所有 CSS 伪元素 */
  pseudoElements: string[]
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

// ==================== 主函数 ====================

function extractCssData(): CssData {
  const lexer = (csstree as any).lexer
  
  // 提取所有属性（只保留有关键字的）
  const allProperties = Object.keys(lexer.properties as Record<string, any>).sort()
  
  const properties: PropertyData[] = allProperties
    .map(name => ({
      name,
      keywords: getPropertyKeywords(name)
    }))
    .filter(p => p.keywords.length > 0) // 只保留有关键字的属性

  // CSS 伪类列表（标准伪类）
  const pseudoClasses = [
    // 用户交互
    'hover', 'active', 'focus', 'focus-visible', 'focus-within',
    // 链接状态
    'link', 'visited', 'any-link', 'local-link', 'target', 'target-within',
    // 表单状态
    'enabled', 'disabled', 'read-only', 'read-write', 'placeholder-shown',
    'default', 'checked', 'indeterminate', 'valid', 'invalid',
    'in-range', 'out-of-range', 'required', 'optional',
    'user-valid', 'user-invalid',
    // 结构伪类
    'root', 'empty', 'first-child', 'last-child', 'only-child',
    'first-of-type', 'last-of-type', 'only-of-type',
    'nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type',
    // 其他
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

  return {
    generatedAt: new Date().toISOString(),
    csstreeVersion: (csstree as any).version || 'unknown',
    properties,
    pseudoClasses,
    pseudoElements,
  }
}

// ==================== 生成文件 ====================

function main() {
  console.log('Extracting CSS data from css-tree...')
  
  const data = extractCssData()
  
  // 统计信息
  console.log(`Found ${data.properties.length} CSS properties`)
  console.log(`Found ${data.pseudoClasses.length} pseudo-classes`)
  console.log(`Found ${data.pseudoElements.length} pseudo-elements`)
  
  const totalKeywords = data.properties.reduce((sum, p) => sum + p.keywords.length, 0)
  console.log(`Total keywords: ${totalKeywords}`)

  // 生成 JSON 文件
  const outputPath = path.join(__dirname, '../src/data/css-data.json')
  const outputDir = path.dirname(outputPath)
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  console.log(`\nGenerated: ${outputPath}`)

  // 生成 TypeScript 类型文件
  const dtsContent = `/**
 * CSS 数据类型定义 - 自动生成
 * 生成时间: ${data.generatedAt}
 */

export interface PropertyData {
  name: string
  keywords: string[]
}

export interface CssData {
  generatedAt: string
  csstreeVersion: string
  properties: PropertyData[]
  pseudoClasses: string[]
  pseudoElements: string[]
}

/** 所有 CSS 伪类 */
export type CssPseudoClass = ${data.pseudoClasses.map(p => `'${p}'`).join(' | ')}

/** 所有 CSS 伪元素 */
export type CssPseudoElement = ${data.pseudoElements.map(p => `'${p}'`).join(' | ')}
`
  
  const dtsPath = path.join(__dirname, '../src/data/css-data.d.ts')
  fs.writeFileSync(dtsPath, dtsContent)
  console.log(`Generated: ${dtsPath}`)
}

main()
