import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from '@volar/language-server/node'
import { create as createTypeScriptServices } from 'volar-service-typescript'
import { CsstsLanguagePlugin } from './CsstsLanguagePlugin'
import { logToFile } from './logutil'

const connection = createConnection()
const server = createServer(connection)

connection.listen()

connection.onInitialize((params) => {
  logToFile('onInitialize called')
  logToFile(`params: ${JSON.stringify(params, null, 2)}`)

  const tsdk = loadTsdkByPath(
    params.initializationOptions.typescript.tsdk,
    params.locale
  )

  logToFile(`tsdk loaded: ${JSON.stringify(tsdk, null, 2)}`)

  return server.initialize(
    params,
    createTypeScriptProject(
      tsdk.typescript,
      tsdk.diagnosticMessages,
      () => ({
        languagePlugins: [CsstsLanguagePlugin],
      })
    ),
    [
      ...createTypeScriptServices(tsdk.typescript),
    ]
  )
})

connection.onInitialized(server.initialized)
connection.onShutdown(server.shutdown)
