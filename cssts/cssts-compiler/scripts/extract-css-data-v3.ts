/**
 * CSS 数据提取脚本 v3
 * 
 * 从 css-tree 提取数据，生成独立的数据文件：
 * 1. css-keywords.json - 属性关键字
 * 2. css-number-types.json - 属性数值类型
 * 3. css-units.json - 单位列表（按类型分组）
 * 4. css-pseudo-classes.json - 伪类
 * 5. css-pseudo-elements.json - 伪元素
 * 6. css-colors.json - 颜色关键字
 * 
 * 运行方式：npx tsx scripts/extract-css-data-v3.ts
 */

import * as csstree from 'css-tree'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================== 数值类型映射 ====================

const NUMBER_TYPE_MAP: Record<string, string> = {
  'length': 'length',
  'length-percentage': 'length-percentage',
  'percentage': 'percentage',
  'number': 'number',
  'integer': 'integer',
  'positive-integer': 'integer',
  'angle': 'angle',
  'angle-percentage': 'angle-percentage',
  'time': 'time',
  'time-percentage': 'time-percentage',
  'flex': 'flex',
  'resolution': 'resolution',
  'frequency': 'frequency',
  'frequency-percentage': 'frequency-percentage',
}

/**
 * 数值类型说明（中英文）
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
    en: 'A percentage value. Represents a fraction of some other value.',
    zh: '百分比值。表示某个其他值的分数。'
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

// ==================== 单位定义 ====================

const UNITS_BY_TYPE: Record<string, { units: string[]; description: { en: string; zh: string } }> = {
  'length': {
    units: ['px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'ex', 'cap', 'ic', 'Q', 'lh', 'rlh', 'vi', 'vb', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh'],
    description: {
      en: 'Length units for measuring distances',
      zh: '用于测量距离的长度单位'
    }
  },
  'angle': {
    units: ['deg', 'grad', 'rad', 'turn'],
    description: {
      en: 'Angle units for rotations and directions',
      zh: '用于旋转和方向的角度单位'
    }
  },
  'time': {
    units: ['s', 'ms'],
    description: {
      en: 'Time units for durations',
      zh: '用于持续时间的时间单位'
    }
  },
  'frequency': {
    units: ['Hz', 'kHz'],
    description: {
      en: 'Frequency units for sound pitch',
      zh: '用于声音音调的频率单位'
    }
  },
  'resolution': {
    units: ['dpi', 'dpcm', 'dppx', 'x'],
    description: {
      en: 'Resolution units for pixel density',
      zh: '用于像素密度的分辨率单位'
    }
  },
  'flex': {
    units: ['fr'],
    description: {
      en: 'Flexible length units for CSS Grid',
      zh: '用于 CSS Grid 的弹性长度单位'
    }
  },
}

// ==================== 伪类定义 ====================

const PSEUDO_CLASSES = [
  // 用户交互状态
  { name: 'hover', category: 'user-action', description: { en: 'Mouse over element', zh: '鼠标悬停在元素上' } },
  { name: 'active', category: 'user-action', description: { en: 'Element being activated', zh: '元素被激活时' } },
  { name: 'focus', category: 'user-action', description: { en: 'Element has focus', zh: '元素获得焦点' } },
  { name: 'focus-visible', category: 'user-action', description: { en: 'Element has focus and focus should be visible', zh: '元素获得焦点且焦点应可见' } },
  { name: 'focus-within', category: 'user-action', description: { en: 'Element or descendant has focus', zh: '元素或其后代获得焦点' } },
  
  // 链接状态
  { name: 'link', category: 'link', description: { en: 'Unvisited link', zh: '未访问的链接' } },
  { name: 'visited', category: 'link', description: { en: 'Visited link', zh: '已访问的链接' } },
  { name: 'any-link', category: 'link', description: { en: 'Any link (visited or not)', zh: '任何链接（已访问或未访问）' } },
  { name: 'local-link', category: 'link', description: { en: 'Link to same document', zh: '指向同一文档的链接' } },
  { name: 'target', category: 'link', description: { en: 'Element targeted by URL fragment', zh: 'URL 片段指向的元素' } },
  { name: 'target-within', category: 'link', description: { en: 'Element or descendant is target', zh: '元素或其后代是目标' } },
  
  // 表单状态
  { name: 'enabled', category: 'form', description: { en: 'Enabled form element', zh: '启用的表单元素' } },
  { name: 'disabled', category: 'form', description: { en: 'Disabled form element', zh: '禁用的表单元素' } },
  { name: 'read-only', category: 'form', description: { en: 'Read-only element', zh: '只读元素' } },
  { name: 'read-write', category: 'form', description: { en: 'Editable element', zh: '可编辑元素' } },
  { name: 'placeholder-shown', category: 'form', description: { en: 'Input showing placeholder', zh: '显示占位符的输入框' } },
  { name: 'default', category: 'form', description: { en: 'Default form element', zh: '默认表单元素' } },
  { name: 'checked', category: 'form', description: { en: 'Checked checkbox/radio', zh: '选中的复选框/单选框' } },
  { name: 'indeterminate', category: 'form', description: { en: 'Indeterminate state', zh: '不确定状态' } },
  { name: 'valid', category: 'form', description: { en: 'Valid input', zh: '有效输入' } },
  { name: 'invalid', category: 'form', description: { en: 'Invalid input', zh: '无效输入' } },
  { name: 'in-range', category: 'form', description: { en: 'Value in range', zh: '值在范围内' } },
  { name: 'out-of-range', category: 'form', description: { en: 'Value out of range', zh: '值超出范围' } },
  { name: 'required', category: 'form', description: { en: 'Required field', zh: '必填字段' } },
  { name: 'optional', category: 'form', description: { en: 'Optional field', zh: '可选字段' } },
  { name: 'user-valid', category: 'form', description: { en: 'User-validated valid input', zh: '用户验证后的有效输入' } },
  { name: 'user-invalid', category: 'form', description: { en: 'User-validated invalid input', zh: '用户验证后的无效输入' } },
  { name: 'autofill', category: 'form', description: { en: 'Autofilled input', zh: '自动填充的输入' } },
  
  // 结构伪类
  { name: 'root', category: 'structural', description: { en: 'Document root element', zh: '文档根元素' } },
  { name: 'empty', category: 'structural', description: { en: 'Element with no children', zh: '没有子元素的元素' } },
  { name: 'first-child', category: 'structural', description: { en: 'First child element', zh: '第一个子元素' } },
  { name: 'last-child', category: 'structural', description: { en: 'Last child element', zh: '最后一个子元素' } },
  { name: 'only-child', category: 'structural', description: { en: 'Only child element', zh: '唯一子元素' } },
  { name: 'first-of-type', category: 'structural', description: { en: 'First of its type', zh: '同类型中的第一个' } },
  { name: 'last-of-type', category: 'structural', description: { en: 'Last of its type', zh: '同类型中的最后一个' } },
  { name: 'only-of-type', category: 'structural', description: { en: 'Only one of its type', zh: '同类型中的唯一一个' } },
  { name: 'nth-child', category: 'structural', description: { en: 'Nth child element', zh: '第 N 个子元素' } },
  { name: 'nth-last-child', category: 'structural', description: { en: 'Nth child from end', zh: '倒数第 N 个子元素' } },
  { name: 'nth-of-type', category: 'structural', description: { en: 'Nth of its type', zh: '同类型中的第 N 个' } },
  { name: 'nth-last-of-type', category: 'structural', description: { en: 'Nth of type from end', zh: '同类型中倒数第 N 个' } },
  
  // 逻辑伪类
  { name: 'not', category: 'logical', description: { en: 'Negation pseudo-class', zh: '否定伪类' } },
  { name: 'is', category: 'logical', description: { en: 'Matches any selector in list', zh: '匹配列表中的任何选择器' } },
  { name: 'where', category: 'logical', description: { en: 'Like :is() but zero specificity', zh: '类似 :is() 但优先级为零' } },
  { name: 'has', category: 'logical', description: { en: 'Parent selector', zh: '父选择器' } },
  
  // 语言和方向
  { name: 'lang', category: 'linguistic', description: { en: 'Element language', zh: '元素语言' } },
  { name: 'dir', category: 'linguistic', description: { en: 'Text direction', zh: '文本方向' } },
  
  // 全屏和模态
  { name: 'fullscreen', category: 'display', description: { en: 'Fullscreen element', zh: '全屏元素' } },
  { name: 'modal', category: 'display', description: { en: 'Modal dialog', zh: '模态对话框' } },
  { name: 'picture-in-picture', category: 'display', description: { en: 'Picture-in-picture mode', zh: '画中画模式' } },
  
  // 媒体状态
  { name: 'playing', category: 'media', description: { en: 'Media is playing', zh: '媒体正在播放' } },
  { name: 'paused', category: 'media', description: { en: 'Media is paused', zh: '媒体已暂停' } },
  { name: 'seeking', category: 'media', description: { en: 'Media is seeking', zh: '媒体正在定位' } },
  { name: 'buffering', category: 'media', description: { en: 'Media is buffering', zh: '媒体正在缓冲' } },
  { name: 'stalled', category: 'media', description: { en: 'Media stalled', zh: '媒体停滞' } },
  { name: 'muted', category: 'media', description: { en: 'Media is muted', zh: '媒体已静音' } },
  { name: 'volume-locked', category: 'media', description: { en: 'Volume is locked', zh: '音量已锁定' } },
  
  // Web Components
  { name: 'defined', category: 'web-components', description: { en: 'Custom element is defined', zh: '自定义元素已定义' } },
  { name: 'host', category: 'web-components', description: { en: 'Shadow host', zh: 'Shadow 宿主' } },
  { name: 'host-context', category: 'web-components', description: { en: 'Shadow host in context', zh: '上下文中的 Shadow 宿主' } },
  { name: 'scope', category: 'web-components', description: { en: 'Scoped element', zh: '作用域元素' } },
]

// ==================== 伪元素定义 ====================

const PSEUDO_ELEMENTS = [
  { name: 'before', description: { en: 'Insert content before element', zh: '在元素前插入内容' } },
  { name: 'after', description: { en: 'Insert content after element', zh: '在元素后插入内容' } },
  { name: 'first-line', description: { en: 'First line of text', zh: '文本的第一行' } },
  { name: 'first-letter', description: { en: 'First letter of text', zh: '文本的第一个字母' } },
  { name: 'marker', description: { en: 'List item marker', zh: '列表项标记' } },
  { name: 'selection', description: { en: 'Selected text', zh: '选中的文本' } },
  { name: 'placeholder', description: { en: 'Input placeholder text', zh: '输入框占位符文本' } },
  { name: 'backdrop', description: { en: 'Backdrop behind element', zh: '元素后面的背景' } },
  { name: 'file-selector-button', description: { en: 'File input button', zh: '文件输入按钮' } },
  { name: 'cue', description: { en: 'WebVTT cue', zh: 'WebVTT 提示' } },
  { name: 'cue-region', description: { en: 'WebVTT cue region', zh: 'WebVTT 提示区域' } },
  { name: 'part', description: { en: 'Shadow DOM part', zh: 'Shadow DOM 部件' } },
  { name: 'slotted', description: { en: 'Slotted content', zh: '插槽内容' } },
]

// ==================== 提取函数 ====================

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

function extractNumberTypes(syntax: any, visited: Set<string> = new Set()): Set<string> {
  const types = new Set<string>()
  if (!syntax) return types

  const lexer = (csstree as any).lexer

  if (syntax.type === 'Type' && syntax.name) {
    if (NUMBER_TYPE_MAP[syntax.name]) {
      types.add(NUMBER_TYPE_MAP[syntax.name])
    }
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

function getPropertyKeywords(property: string): string[] {
  const lexer = (csstree as any).lexer
  const propData = lexer.properties[property]
  if (!propData || !propData.syntax) return []

  const keywords = extractKeywords(propData.syntax)
  return [...new Set(keywords)]
    .filter(k => !k.startsWith('-') && !k.startsWith('webkit') && k.length > 0)
    .sort()
}

function getPropertyNumberTypes(property: string): string[] {
  const lexer = (csstree as any).lexer
  const propData = lexer.properties[property]
  if (!propData || !propData.syntax) return []

  const types = extractNumberTypes(propData.syntax)
  return [...types].sort()
}

// ==================== 颜色关键字提取 ====================

function extractColorKeywords(): string[] {
  const lexer = (csstree as any).lexer
  const colorType = lexer.types['named-color']
  if (!colorType || !colorType.syntax) return []
  
  const colors = extractKeywords(colorType.syntax)
  return [...new Set(colors)].sort()
}

// ==================== 主函数 ====================

function main() {
  console.log('Extracting CSS data from css-tree...\n')
  
  const lexer = (csstree as any).lexer
  const allProperties = Object.keys(lexer.properties as Record<string, any>).sort()
  const timestamp = new Date().toISOString()
  const version = (csstree as any).version || 'unknown'
  
  const outputDir = path.join(__dirname, '../src/data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 1. CSS Keywords
  console.log('1. Extracting keywords...')
  const keywordsData: { name: string; keywords: string[] }[] = []
  for (const name of allProperties) {
    const keywords = getPropertyKeywords(name)
    if (keywords.length > 0) {
      keywordsData.push({ name, keywords })
    }
  }
  const keywordsOutput = {
    generatedAt: timestamp,
    csstreeVersion: version,
    totalProperties: keywordsData.length,
    totalKeywords: keywordsData.reduce((sum, p) => sum + p.keywords.length, 0),
    properties: keywordsData,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-keywords.json'),
    JSON.stringify(keywordsOutput, null, 2)
  )
  console.log(`   Properties: ${keywordsData.length}, Keywords: ${keywordsOutput.totalKeywords}`)

  // 2. CSS Number Types (with resolved units)
  console.log('2. Extracting number types...')
  
  // 解析数值类型到具体单位的映射
  function resolveUnitsFromTypes(numberTypes: string[]): string[] {
    const units = new Set<string>()
    for (const type of numberTypes) {
      // 处理组合类型
      if (type === 'length-percentage') {
        UNITS_BY_TYPE['length']?.units.forEach(u => units.add(u))
        units.add('%')
      } else if (type === 'angle-percentage') {
        UNITS_BY_TYPE['angle']?.units.forEach(u => units.add(u))
        units.add('%')
      } else if (type === 'time-percentage') {
        UNITS_BY_TYPE['time']?.units.forEach(u => units.add(u))
        units.add('%')
      } else if (type === 'frequency-percentage') {
        UNITS_BY_TYPE['frequency']?.units.forEach(u => units.add(u))
        units.add('%')
      } else if (type === 'percentage') {
        units.add('%')
      } else if (type === 'number' || type === 'integer') {
        // 无单位数值，用特殊标记
        units.add('<number>')
      } else if (UNITS_BY_TYPE[type]) {
        UNITS_BY_TYPE[type].units.forEach(u => units.add(u))
      }
    }
    return [...units].sort()
  }
  
  const numberData: { name: string; numberTypes: string[]; units: string[] }[] = []
  for (const name of allProperties) {
    const numberTypes = getPropertyNumberTypes(name)
    if (numberTypes.length > 0) {
      const units = resolveUnitsFromTypes(numberTypes)
      numberData.push({ name, numberTypes, units })
    }
  }
  const numberOutput = {
    generatedAt: timestamp,
    csstreeVersion: version,
    totalProperties: numberData.length,
    typeDescriptions: NUMBER_TYPE_DESCRIPTIONS,
    properties: numberData,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-number-types.json'),
    JSON.stringify(numberOutput, null, 2)
  )
  console.log(`   Properties: ${numberData.length}`)

  // 3. CSS Units
  console.log('3. Generating units...')
  // 收集所有单位
  const allUnits = new Set<string>()
  for (const typeData of Object.values(UNITS_BY_TYPE)) {
    typeData.units.forEach(u => allUnits.add(u))
  }
  allUnits.add('%') // 百分比
  
  const unitsOutput = {
    generatedAt: timestamp,
    source: 'MDN Web Docs / W3C CSS Values and Units',
    totalUnits: allUnits.size,
    allUnits: [...allUnits].sort(),
    unitsByType: UNITS_BY_TYPE,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-units.json'),
    JSON.stringify(unitsOutput, null, 2)
  )
  console.log(`   Types: ${Object.keys(UNITS_BY_TYPE).length}, Total units: ${allUnits.size}`)

  // 4. CSS Pseudo Classes
  console.log('4. Generating pseudo classes...')
  const pseudoClassesOutput = {
    generatedAt: timestamp,
    source: 'MDN Web Docs / W3C Selectors',
    total: PSEUDO_CLASSES.length,
    categories: [...new Set(PSEUDO_CLASSES.map(p => p.category))],
    pseudoClasses: PSEUDO_CLASSES,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-pseudo-classes.json'),
    JSON.stringify(pseudoClassesOutput, null, 2)
  )
  console.log(`   Pseudo classes: ${PSEUDO_CLASSES.length}`)

  // 5. CSS Pseudo Elements
  console.log('5. Generating pseudo elements...')
  const pseudoElementsOutput = {
    generatedAt: timestamp,
    source: 'MDN Web Docs / W3C Selectors',
    total: PSEUDO_ELEMENTS.length,
    pseudoElements: PSEUDO_ELEMENTS,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-pseudo-elements.json'),
    JSON.stringify(pseudoElementsOutput, null, 2)
  )
  console.log(`   Pseudo elements: ${PSEUDO_ELEMENTS.length}`)

  // 6. CSS Colors
  console.log('6. Extracting color keywords...')
  const colors = extractColorKeywords()
  const colorsOutput = {
    generatedAt: timestamp,
    csstreeVersion: version,
    total: colors.length,
    colors: colors,
  }
  fs.writeFileSync(
    path.join(outputDir, 'css-colors.json'),
    JSON.stringify(colorsOutput, null, 2)
  )
  console.log(`   Colors: ${colors.length}`)

  console.log('\n✅ All files generated in:', outputDir)
  console.log('\nGenerated files:')
  console.log('  - css-keywords.json')
  console.log('  - css-number-types.json')
  console.log('  - css-units.json')
  console.log('  - css-pseudo-classes.json')
  console.log('  - css-pseudo-elements.json')
  console.log('  - css-colors.json')
}

main()
