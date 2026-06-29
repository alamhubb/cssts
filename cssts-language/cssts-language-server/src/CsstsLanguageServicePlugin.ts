import type { LanguageServicePlugin } from '@volar/language-service'
import { DiagnosticSeverity } from 'vscode-languageserver-protocol'
import type { TextDocument } from 'vscode-languageserver-textdocument'
import { transformCssTs } from 'cssts-compiler'
import { formatCsstsTransformErrorMessage } from './CsstsLanguagePlugin'
import { provideSourceDocumentSymbols } from './SourceDocumentSymbols'

function isCsstsDocument(document: TextDocument): boolean {
  return document.languageId === 'cssts' || document.uri.toLowerCase().endsWith('.cssts')
}

export const CsstsLanguageServicePlugin: LanguageServicePlugin = {
  name: 'cssts-transform-diagnostics',
  capabilities: {
    diagnosticProvider: {
      interFileDependencies: false,
      workspaceDiagnostics: false,
    },
    documentSymbolProvider: true,
  },
  create() {
    return {
      provideDocumentSymbols(document: TextDocument) {
        if (!isCsstsDocument(document)) {
          return
        }
        return provideSourceDocumentSymbols(document)
      },
      provideDiagnostics(document: TextDocument) {
        if (!isCsstsDocument(document)) {
          return []
        }
        try {
          transformCssTs(document.getText())
          return []
        } catch (error: unknown) {
          const lineCount = Math.max(document.getText().split(/\r\n|\r|\n/).length - 1, 0)
          return [{
            range: {
              start: { line: 0, character: 0 },
              end: { line: lineCount, character: 0 },
            },
            severity: DiagnosticSeverity.Error,
            source: 'cssts',
            message: formatCsstsTransformErrorMessage(error),
          }]
        }
      },
    }
  },
}
