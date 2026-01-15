import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from '@volar/language-server/node'
import { create as createTypeScriptServices } from 'volar-service-typescript'
import { CsstsLanguagePlugin } from './CsstsLanguagePlugin'
import { logToFile } from './logutil'

logToFile('=== CSSTS Language Server Starting ===')
logToFile('Process ID: ' + process.pid)
logToFile('Node version: ' + process.version)
logToFile('Current directory: ' + process.cwd())

const connection = createConnection()
logToFile('Connection created')

const server = createServer(connection)
logToFile('Server created')

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
    const tsdkPath = params.initializationOptions?.typescript?.tsdk
    logToFile('TSDK path from client: ' + tsdkPath)

    if (!tsdkPath) {
      logToFile('WARNING: No tsdk path provided, using fallback')
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

