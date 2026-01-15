import {
  forEachEmbeddedCode,
  type LanguagePlugin,
  type VirtualCode,
  type CodeMapping,
} from '@volar/language-core'
import type { TypeScriptExtraServiceScript } from '@volar/typescript'
import type { IScriptSnapshot } from 'typescript'
import { URI } from 'vscode-uri'
import { logToFile } from './logutil'
import { transformCssTsWithMapping } from 'cssts-compiler'
import { SlimeCodeMapping } from 'slime-generator'

// 映射段信息
interface SegmentInfo {
  offset: number
  length: number
}

// 增强的映射格式
interface EnhancedMapping {
  generated: SegmentInfo
  original: SegmentInfo
}

// 映射转换器（参照 os-language）
export class MappingConverter {
  static convertMappings(mappings: SlimeCodeMapping[]): EnhancedMapping[] {
    return mappings
      .filter(mapping => mapping.source && mapping.generate)
      .map(mapping => ({
        original: {
          offset: mapping.source.index,
          length: mapping.source.length,
        },
        generated: {
          offset: mapping.generate.index,
          length: mapping.generate.length,
        },
      }))
  }
}

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
      // 使用 forEachEmbeddedCode 遍历所有嵌入代码（与 ovs-language 保持一致）
      for (const code of forEachEmbeddedCode(root)) {
        if (code.languageId === 'typescript') {
          scripts.push({
            fileName: fileName + '.' + code.id + '.ts',
            code,
            extension: '.ts',
            scriptKind: ScriptKind.TS,
          })
        } else if (code.languageId === 'js') {
          scripts.push({
            fileName: fileName + '.' + code.id + '.js',
            code,
            extension: '.js',
            scriptKind: ScriptKind.JS,
          })
        }
      }
      return scripts
    },
  },
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
    let mapping: any[] = []

    logToFile('=== CSSTS Transform Start ===')
    logToFile('Input code length: ' + sourceCode.length)

    try {
      // 使用 cssts-compiler 的 transformCssTsWithMapping
      const result = transformCssTsWithMapping(sourceCode)
      generatedCode = result.code
      mapping = result.mapping

      logToFile('=== CSSTS Transform Success ===')
      logToFile('Output code length: ' + generatedCode.length)
      logToFile('Mapping count: ' + mapping.length)
      logToFile('Generated code preview: ' + generatedCode.substring(0, 300))
    } catch (e: unknown) {
      logToFile('=== CSSTS Transform Error ===')
      if (e instanceof Error) {
        logToFile('Error type: ' + e.constructor.name)
        logToFile('Error message: ' + e.message)
        logToFile('Error stack: ' + e.stack)
      } else {
        logToFile('Unknown error: ' + String(e))
      }
      generatedCode = sourceCode
      mapping = []
    }

    // 使用 MappingConverter 转换映射（参照 os-language）
    const offsets = MappingConverter.convertMappings(mapping)

    logToFile('=== Mapping Debug ===')
    logToFile('Raw mapping count: ' + mapping.length)
    logToFile('Converted offsets count: ' + offsets.length)

    const tsMappings: CodeMapping[] = [{
      sourceOffsets: offsets.map(item => item.original.offset),
      generatedOffsets: offsets.map(item => item.generated.offset),
      lengths: offsets.map(item => item.original.length),
      generatedLengths: offsets.map(item => item.generated.length),
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
      id: 'cssts-script',
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
