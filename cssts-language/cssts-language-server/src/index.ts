import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from '@volar/language-server/node'
import { DiagnosticSeverity } from 'vscode-languageserver'
import type { DidChangeTextDocumentParams, DidOpenTextDocumentParams } from 'vscode-languageserver'
import { create as createTypeScriptServices } from 'volar-service-typescript'
import { CsstsLanguagePlugin, formatCsstsTransformErrorMessage } from './CsstsLanguagePlugin'
import { logToFile } from './logutil'
import { transformCssTs } from 'cssts-compiler'

logToFile('=== CSSTS Language Server Starting ===')
logToFile('Process ID: ' + process.pid)
logToFile('Node version: ' + process.version)
logToFile('Current directory: ' + process.cwd())

const connection = createConnection()
logToFile('Connection created')

const server = createServer(connection)
logToFile('Server created')

const openDocuments = new Map<string, string>()

function positionToOffset(text: string, line: number, character: number): number {
  let currentLine = 0
  let offset = 0
  while (currentLine < line && offset < text.length) {
    const next = text.indexOf('\n', offset)
    if (next < 0) {
      return text.length
    }
    offset = next + 1
    currentLine++
  }
  return Math.min(offset + character, text.length)
}

function applyDocumentChanges(text: string, params: DidChangeTextDocumentParams): string {
  let nextText = text
  for (const change of params.contentChanges) {
    if (!('range' in change) || !change.range) {
      nextText = change.text
      continue
    }
    const start = positionToOffset(nextText, change.range.start.line, change.range.start.character)
    const end = positionToOffset(nextText, change.range.end.line, change.range.end.character)
    nextText = nextText.slice(0, start) + change.text + nextText.slice(end)
  }
  return nextText
}

function shouldValidateCsstsDocument(uri: string, languageId?: string): boolean {
  return languageId === 'cssts' || uri.toLowerCase().endsWith('.cssts')
}

function validateCsstsDocument(uri: string, text: string): void {
  logToFile('=== CSSTS LSP Diagnostics Start ===')
  logToFile('Document URI: ' + uri)
  try {
    transformCssTs(text)
    connection.sendDiagnostics({ uri, diagnostics: [] })
    logToFile('CSSTS transform diagnostics count: 0')
  } catch (error: unknown) {
    const message = formatCsstsTransformErrorMessage(error)
    connection.sendDiagnostics({
      uri,
      diagnostics: [{
        range: {
          start: { line: 0, character: 0 },
          end: { line: Math.max(text.split(/\r\n|\r|\n/).length - 1, 0), character: 0 },
        },
        severity: DiagnosticSeverity.Error,
        source: 'cssts',
        message,
      }],
    })
    logToFile('CSSTS transform diagnostics count: 1')
    logToFile('Diagnostic message: ' + message)
  }
}

connection.listen()
logToFile('Connection listening...')

connection.onInitialize((params) => {
  logToFile('=== onInitialize ===')
  logToFile('Client info: ' + JSON.stringify(params.clientInfo))
  logToFile('Root URI: ' + params.rootUri)
  logToFile('Workspace folders: ' + JSON.stringify(params.workspaceFolders))
  logToFile('Initialization options: ' + JSON.stringify(params.initializationOptions))

  try {
    // 从客户端传递的 initializationOptions 获取 TypeScript SDK 路径
    const tsdkPath = params.initializationOptions?.typescript?.tsdk ?? process.env.QIN_LSP_TYPESCRIPT_TSDK
    logToFile('TSDK path from client: ' + tsdkPath)

    if (!tsdkPath) {
      throw new Error('CSSTS language server requires initializationOptions.typescript.tsdk or QIN_LSP_TYPESCRIPT_TSDK')
    }

    logToFile('Loading TSDK...')
    const tsdk = loadTsdkByPath(tsdkPath, params.locale)
    logToFile('TSDK loaded, TypeScript version: ' + tsdk.typescript.version)

    const languagePlugins = [CsstsLanguagePlugin]
    logToFile('Language plugins created: ' + languagePlugins.length)

    const languageServicePlugins = [...createTypeScriptServices(tsdk.typescript)]
    logToFile('Language service plugins created: ' + languageServicePlugins.length)

    const tsProject = createTypeScriptProject(
      tsdk.typescript,
      tsdk.diagnosticMessages,
      () => ({
        languagePlugins: languagePlugins,
      })
    )
    logToFile('TypeScript project created')

    const res = server.initialize(
      params,
      tsProject,
      [...languageServicePlugins],
    )

    logToFile('=== Server Initialized Successfully ===')
    logToFile('Capabilities: ' + JSON.stringify(res.capabilities))
    return res
  } catch (e) {
    logToFile('=== ERROR during initialization ===')
    logToFile('Error type: ' + (e as Error).constructor?.name)
    logToFile('Error message: ' + (e as Error).message)
    logToFile('Error stack: ' + (e as Error).stack)
    throw e
  }
})

connection.onInitialized(() => {
  logToFile('=== onInitialized - Client confirmed initialization ===')
  server.initialized()
})

connection.onDidOpenTextDocument((params: DidOpenTextDocumentParams) => {
  const { uri, languageId, text } = params.textDocument
  openDocuments.set(uri, text)
  if (shouldValidateCsstsDocument(uri, languageId)) {
    validateCsstsDocument(uri, text)
  }
})

connection.onDidChangeTextDocument((params: DidChangeTextDocumentParams) => {
  const uri = params.textDocument.uri
  const previousText = openDocuments.get(uri) ?? ''
  const nextText = applyDocumentChanges(previousText, params)
  openDocuments.set(uri, nextText)
  if (shouldValidateCsstsDocument(uri)) {
    validateCsstsDocument(uri, nextText)
  }
})

connection.onDidCloseTextDocument((params) => {
  const uri = params.textDocument.uri
  openDocuments.delete(uri)
  if (shouldValidateCsstsDocument(uri)) {
    connection.sendDiagnostics({ uri, diagnostics: [] })
  }
})

connection.onShutdown(() => {
  logToFile('=== onShutdown ===')
  server.shutdown()
})

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  logToFile('=== Uncaught Exception ===')
  logToFile('Error: ' + error.message)
  logToFile('Stack: ' + error.stack)
})

process.on('unhandledRejection', (reason, promise) => {
  logToFile('=== Unhandled Rejection ===')
  logToFile('Reason: ' + String(reason))
})

