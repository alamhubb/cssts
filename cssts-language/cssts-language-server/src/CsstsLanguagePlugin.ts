import type {
  LanguagePlugin,
  VirtualCode,
  CodeMapping,
} from '@volar/language-core'
import type { TypeScriptExtraServiceScript } from '@volar/typescript'
import type { IScriptSnapshot } from 'typescript'
import { URI } from 'vscode-uri'
import { logToFile } from './logutil'
import { transformCssTsWithMapping } from 'cssts-compiler'

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
    let mappingData: Array<{ source: { start: number; length: number }; generated: { start: number; length: number } }> = []

    logToFile('=== CSSTS Transform Start ===')
    logToFile('Input code length: ' + sourceCode.length)

    try {
      // 使用 cssts-compiler 的 transformCssTsWithMapping
      const result = transformCssTsWithMapping(sourceCode)
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
      sourceOffsets: mappingData.map(m => m.source.start),
      generatedOffsets: mappingData.map(m => m.generated.start),
      lengths: mappingData.map(m => m.source.length),
      generatedLengths: mappingData.map(m => m.generated.length),
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
