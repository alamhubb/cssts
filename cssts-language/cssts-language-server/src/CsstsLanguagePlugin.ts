import type {
  LanguagePlugin,
  VirtualCode,
  CodeMapping,
} from '@volar/language-core'
import type * as ts from 'typescript'
import { logToFile } from './logutil'

// 定义 CSSTS 文件的语言 ID
const CSSTS_LANGUAGE_ID = 'cssts'

// 创建 CSSTS 语言插件
export const CsstsLanguagePlugin: LanguagePlugin<string> = {
  getLanguageId(uri) {
    if (uri.endsWith('.cssts')) {
      return CSSTS_LANGUAGE_ID
    }
    return undefined
  },

  createVirtualCode(uri, languageId, snapshot) {
    if (languageId !== CSSTS_LANGUAGE_ID) {
      return undefined
    }

    const fileName = uri.split('/').pop() || 'unknown.cssts'
    const content = snapshot.getText(0, snapshot.getLength())

    logToFile(`Creating virtual code for: ${fileName}`)
    logToFile(`Content length: ${content.length}`)

    try {
      // CSSTS 文件本质上就是 TypeScript 文件
      // 直接将内容作为 TypeScript 处理
      const generatedCode = content

      // 创建虚拟代码
      const virtualCode: VirtualCode = {
        id: 'main',
        languageId: 'typescript',
        snapshot: {
          getText: (start, end) => generatedCode.substring(start, end),
          getLength: () => generatedCode.length,
          getChangeRange: () => undefined,
        },
        mappings: createMappings(content, generatedCode),
        embeddedCodes: [],
      }

      return virtualCode
    } catch (error) {
      logToFile(`Error creating virtual code: ${error}`)

      // 返回一个空的虚拟代码，避免崩溃
      const fallbackCode = `// Error parsing CSSTS file: ${error}\nexport {}`
      return {
        id: 'main',
        languageId: 'typescript',
        snapshot: {
          getText: (start, end) => fallbackCode.substring(start, end),
          getLength: () => fallbackCode.length,
          getChangeRange: () => undefined,
        },
        mappings: [],
        embeddedCodes: [],
      }
    }
  },

  typescript: {
    extraFileExtensions: [
      {
        extension: 'cssts',
        isMixedContent: true,
        scriptKind: 7 satisfies ts.ScriptKind.Deferred,
      },
    ],
    getServiceScript(root) {
      return {
        code: root,
        extension: '.ts',
        scriptKind: 3 satisfies ts.ScriptKind.TS,
      }
    },
  },
}

// 创建源码映射
function createMappings(
  sourceCode: string,
  generatedCode: string
): CodeMapping[] {
  const mappings: CodeMapping[] = []

  // 基础映射：整个文件 1:1 映射
  mappings.push({
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
  })

  return mappings
}

// 创建 CSSTS 语言服务
export function createCsstsLanguageService() {
  return {
    name: 'cssts',
    capabilities: {
      completionProvider: {
        triggerCharacters: ['.', ':', '-', '"', "'"],
      },
      hoverProvider: true,
      definitionProvider: true,
      referencesProvider: true,
      documentSymbolProvider: true,
      semanticTokensProvider: {
        full: true,
        range: true,
        legend: {
          tokenTypes: [
            'csstsProperty',
            'csstsValue',
            'csstsSelector',
            'csstsVariable',
          ],
          tokenModifiers: [],
        },
      },
    },
    create() {
      return {
        // 提供 CSSTS 特定的完成项
        provideCompletionItems(document: any, position: any) {
          // 这里可以添加 CSSTS 特定的完成项
          // 例如：CSS 属性名、CSS 值等
          return []
        },

        // 提供 CSSTS 特定的悬停信息
        provideHover(document: any, position: any) {
          // 这里可以添加 CSSTS 特定的悬停信息
          return null
        },
      }
    },
  }
}
