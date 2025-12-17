import type {
  LanguagePlugin,
  VirtualCode,
  CodeMapping,
} from '@volar/language-core'
import type { TypeScriptExtraServiceScript } from '@volar/typescript'
import type { IScriptSnapshot } from 'typescript'
import { URI } from 'vscode-uri'
import { logToFile } from './logutil'

// TypeScript ScriptKind 枚举值
const ScriptKind = {
  Deferred: 0,
  JS: 1,
  TS: 3,
} as const

// 定义 CSSTS 文件的语言 ID
const CSSTS_LANGUAGE_ID = 'cssts'

// 创建 CSSTS 语言插件
export const CsstsLanguagePlugin: LanguagePlugin<URI> = {
  getLanguageId(uri) {
    if (uri.path.endsWith('.cssts')) {
      return CSSTS_LANGUAGE_ID
    }
    return undefined
  },

  createVirtualCode(_uri, languageId, snapshot) {
    if (languageId === CSSTS_LANGUAGE_ID) {
      return new CsstsVirtualCode(snapshot)
    }
    return undefined
  },

  typescript: {
    extraFileExtensions: [
      {
        extension: 'cssts',
        isMixedContent: true,
        scriptKind: ScriptKind.Deferred,
      },
    ],
    getServiceScript() {
      return undefined
    },
    getExtraServiceScripts(fileName, root) {
      const scripts: TypeScriptExtraServiceScript[] = []
      
      function collectScripts(code: VirtualCode) {
        if (code.languageId === 'typescript') {
          scripts.push({
            fileName: fileName + '.' + code.id + '.ts',
            code,
            extension: '.ts',
            scriptKind: ScriptKind.TS,
          })
        }
        if (code.embeddedCodes) {
          for (const embedded of code.embeddedCodes) {
            collectScripts(embedded)
          }
        }
      }
      
      collectScripts(root)
      return scripts
    },
  },
}

/**
 * 简化版 CSSTS 转换
 * 将 css { displayFlex, colorRed } 转换为 cssts.$cls(csstsAtom.displayFlex, csstsAtom.colorRed)
 * 
 * 映射策略：
 * - 非 css {} 块的代码：1:1 映射
 * - css 关键字：映射到 cssts.$cls
 * - 每个属性名：精确映射 displayFlex -> csstsAtom.displayFlex 中的 displayFlex 部分
 */
function transformCsstsSimple(code: string): { code: string; mapping: Array<{ srcStart: number; srcEnd: number; genStart: number; genEnd: number }> } {
  const mapping: Array<{ srcStart: number; srcEnd: number; genStart: number; genEnd: number }> = []
  let result = ''
  let genIndex = 0
  
  // 首先收集所有使用的属性名
  const usedAtoms = new Set<string>()
  const cssRegexForScan = /css\s*\{([^}]*)\}/g
  let scanMatch
  while ((scanMatch = cssRegexForScan.exec(code)) !== null) {
    const inner = scanMatch[1]
    const itemRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)/g
    let itemMatch
    while ((itemMatch = itemRegex.exec(inner)) !== null) {
      usedAtoms.add(itemMatch[1])
    }
  }

  // 生成 csstsAtom 的类型声明
  // 注意：在实际项目中，csstsAtom 会从生成的 CsstsAtom.ts 文件导入
  // 这里生成内联类型声明作为 fallback，确保 IDE 能提供类型提示
  const atomTypeDecl = usedAtoms.size > 0
    ? `declare const csstsAtom: {\n${Array.from(usedAtoms).map(name => `  readonly ${name}: { readonly '${name}': true }`).join('\n')}\n  readonly [key: string]: { readonly [className: string]: true }\n}\n\n`
    : `declare const csstsAtom: { readonly [key: string]: { readonly [className: string]: true } }\n\n`

  // 添加导入声明和类型声明（不映射到源码）
  // 尝试从项目中导入 csstsAtom，如果不存在则使用上面的 declare
  const imports = `import 'virtual:cssts.css'
import { cssts } from 'cssts'
// 尝试从项目导入 csstsAtom（如果存在）
// import { csstsAtom } from './cssts/CsstsAtom'
${atomTypeDecl}`
  result += imports
  genIndex += imports.length
  
  // 正则匹配 css { ... }
  const cssRegex = /css\s*\{([^}]*)\}/g
  let lastIndex = 0
  let match
  
  while ((match = cssRegex.exec(code)) !== null) {
    // 添加 css { 之前的代码（1:1 映射）
    const beforeMatch = code.slice(lastIndex, match.index)
    if (beforeMatch.length > 0) {
      result += beforeMatch
      mapping.push({
        srcStart: lastIndex,
        srcEnd: match.index,
        genStart: genIndex,
        genEnd: genIndex + beforeMatch.length,
      })
      genIndex += beforeMatch.length
    }
    
    // 找到 css 关键字在源码中的位置
    const cssKeywordStart = match.index
    const cssKeywordEnd = cssKeywordStart + 3 // "css" 长度为 3
    
    // 生成 cssts.$cls( 部分
    const clsPrefix = 'cssts.$cls('
    result += clsPrefix
    
    // 映射 css -> cssts.$cls (只映射 css 关键字)
    mapping.push({
      srcStart: cssKeywordStart,
      srcEnd: cssKeywordEnd,
      genStart: genIndex,
      genEnd: genIndex + 'cssts'.length, // 只映射到 cssts
    })
    genIndex += clsPrefix.length
    
    // 解析 css { } 内容，找到每个属性的精确位置
    const inner = match[1]
    const braceStart = match.index + match[0].indexOf('{')
    
    // 解析每个属性及其在源码中的位置
    const itemRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)/g
    const items: Array<{ name: string; srcStart: number; srcEnd: number }> = []
    let itemMatch
    
    while ((itemMatch = itemRegex.exec(inner)) !== null) {
      const name = itemMatch[1]
      // 属性在源码中的绝对位置 = braceStart + 1 (跳过 '{') + itemMatch.index
      const srcStart = braceStart + 1 + itemMatch.index
      const srcEnd = srcStart + name.length
      items.push({ name, srcStart, srcEnd })
    }
    
    // 生成每个 csstsAtom.xxx 并创建精确映射
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      // 生成 csstsAtom.
      const atomPrefix = 'csstsAtom.'
      result += atomPrefix
      genIndex += atomPrefix.length
      
      // 生成属性名并映射
      result += item.name
      mapping.push({
        srcStart: item.srcStart,
        srcEnd: item.srcEnd,
        genStart: genIndex,
        genEnd: genIndex + item.name.length,
      })
      genIndex += item.name.length
      
      // 添加逗号分隔符（最后一个不加）
      if (i < items.length - 1) {
        result += ', '
        genIndex += 2
      }
    }
    
    // 生成闭合括号
    result += ')'
    genIndex += 1
    
    lastIndex = match.index + match[0].length
  }
  
  // 添加剩余代码（1:1 映射）
  const remaining = code.slice(lastIndex)
  if (remaining.length > 0) {
    result += remaining
    mapping.push({
      srcStart: lastIndex,
      srcEnd: code.length,
      genStart: genIndex,
      genEnd: genIndex + remaining.length,
    })
  }
  
  return { code: result, mapping }
}

// CSSTS 虚拟代码类
export class CsstsVirtualCode implements VirtualCode {
  id = 'root'
  languageId = 'cssts'
  mappings: CodeMapping[]
  embeddedCodes: VirtualCode[] = []

  constructor(public snapshot: IScriptSnapshot) {
    this.mappings = [{
      sourceOffsets: [0],
      generatedOffsets: [0],
      lengths: [snapshot.getLength()],
      data: {
        completion: true,
        format: true,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    }]

    const sourceCode = snapshot.getText(0, snapshot.getLength())
    let generatedCode = sourceCode
    let mappingData: Array<{ srcStart: number; srcEnd: number; genStart: number; genEnd: number }> = []

    logToFile('=== CSSTS Transform Start ===')
    logToFile('Input code length: ' + sourceCode.length)

    try {
      const result = transformCsstsSimple(sourceCode)
      generatedCode = result.code
      mappingData = result.mapping
      
      logToFile('=== CSSTS Transform Success ===')
      logToFile('Output code length: ' + generatedCode.length)
      logToFile('Mapping count: ' + mappingData.length)
      logToFile('Generated code preview: ' + generatedCode.substring(0, 300))
    } catch (e: unknown) {
      logToFile('=== CSSTS Transform Error ===')
      if (e instanceof Error) {
        logToFile('Error: ' + e.message)
      }
      generatedCode = sourceCode
      mappingData = []
    }

    // 创建嵌入的 TypeScript 虚拟代码
    const tsMappings: CodeMapping[] = mappingData.length > 0 ? [{
      sourceOffsets: mappingData.map(m => m.srcStart),
      generatedOffsets: mappingData.map(m => m.genStart),
      lengths: mappingData.map(m => m.srcEnd - m.srcStart),
      generatedLengths: mappingData.map(m => m.genEnd - m.genStart),
      data: {
        completion: true,
        format: true,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    }] : [{
      sourceOffsets: [0],
      generatedOffsets: [0],
      lengths: [Math.min(sourceCode.length, generatedCode.length)],
      data: {
        completion: true,
        format: true,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    }]

    this.embeddedCodes = [{
      id: 'ts',
      languageId: 'typescript',
      snapshot: {
        getText: (start, end) => generatedCode.substring(start, end),
        getLength: () => generatedCode.length,
        getChangeRange: () => undefined,
      },
      mappings: tsMappings,
      embeddedCodes: [],
    }]
  }
}
