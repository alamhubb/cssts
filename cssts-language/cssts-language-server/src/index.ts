import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from '@volar/language-server/node'
import { create as createTypeScriptServices } from 'volar-service-typescript'
import { CsstsLanguagePlugin } from './CsstsLanguagePlugin'
import { CsstsLanguageServicePlugin } from './CsstsLanguageServicePlugin'
import { logToFile } from './logutil'

logToFile('=== CSSTS Language Server Starting ===')
logToFile('Process ID: ' + process.pid)
logToFile('Node version: ' + process.version)
logToFile('Current directory: ' + process.cwd())

const connection = createConnection()
const server = createServer(connection)

connection.listen()

connection.onInitialize((params) => {
  logToFile('=== onInitialize ===')
  logToFile('Client info: ' + JSON.stringify(params.clientInfo))
  logToFile('Root URI: ' + params.rootUri)
  logToFile('Workspace folders: ' + JSON.stringify(params.workspaceFolders))
  logToFile('Initialization options: ' + JSON.stringify(params.initializationOptions))

  const tsdkPath = params.initializationOptions?.typescript?.tsdk ?? process.env.QIN_LSP_TYPESCRIPT_TSDK
  if (!tsdkPath) {
    throw new Error('CSSTS language server requires initializationOptions.typescript.tsdk or QIN_LSP_TYPESCRIPT_TSDK')
  }

  const tsdk = loadTsdkByPath(tsdkPath, params.locale)
  const languagePlugins = [CsstsLanguagePlugin]
  const languageServicePlugins = [
    CsstsLanguageServicePlugin,
    ...createTypeScriptServices(tsdk.typescript, {
      disableAutoImportCache: true,
      isValidationEnabled(document) {
        return document.languageId !== 'cssts' && !isCsstsDocumentUri(document.uri)
      },
    }),
  ]
  const tsProject = createTypeScriptProject(
    tsdk.typescript,
    tsdk.diagnosticMessages,
    () => ({
      languagePlugins,
    })
  )

  const result = server.initialize(params, tsProject, [...languageServicePlugins])
  logToFile('=== CSSTS Language Server Initialized ===')
  return result
})

connection.onInitialized(() => {
  server.initialized()
})

connection.onShutdown(() => {
  server.shutdown()
})

process.on('uncaughtException', (error) => {
  logToFile('Uncaught exception: ' + (error.stack || error.message))
})

process.on('unhandledRejection', (reason) => {
  logToFile('Unhandled rejection: ' + String(reason))
})

function isCsstsDocumentUri(uri: string): boolean {
  const lowerUri = uri.toLowerCase()
  return lowerUri.endsWith('.cssts')
    || lowerUri.includes('.cssts.')
    || lowerUri.includes('.cssts%')
    || lowerUri.includes('%2ecssts')
    || lowerUri.includes('%252ecssts')
}
