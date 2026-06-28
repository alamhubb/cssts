import { spawn } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

interface LspMessage {
  jsonrpc: '2.0'
  id?: number
  method?: string
  params?: any
  result?: any
  error?: any
}

let messageId = 0

function createRequest(method: string, params: any): { id: number, packet: string } {
  const id = ++messageId
  const body = JSON.stringify({ jsonrpc: '2.0', id, method, params })
  return {
    id,
    packet: `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`,
  }
}

function createNotification(method: string, params: any): string {
  const body = JSON.stringify({ jsonrpc: '2.0', method, params })
  return `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
}

function createResponse(id: number, result: any): string {
  const body = JSON.stringify({ jsonrpc: '2.0', id, result })
  return `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
}

function extractMessages(raw: string): { messages: LspMessage[], rest: string } {
  const messages: LspMessage[] = []
  let rest = raw
  while (true) {
    const headerEnd = rest.indexOf('\r\n\r\n')
    if (headerEnd < 0) break
    const header = rest.slice(0, headerEnd)
    const lengthMatch = header.match(/Content-Length:\s*(\d+)/i)
    if (!lengthMatch) {
      throw new Error(`Malformed LSP header: ${header}`)
    }
    const bodyLength = Number(lengthMatch[1])
    const bodyStart = headerEnd + 4
    const packetEnd = bodyStart + bodyLength
    if (rest.length < packetEnd) break
    messages.push(JSON.parse(rest.slice(bodyStart, packetEnd)))
    rest = rest.slice(packetEnd)
  }
  return { messages, rest }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function toFileUri(filePath: string): string {
  const normalized = path.resolve(filePath).replace(/\\/g, '/')
  return /^[A-Za-z]:\//.test(normalized) ? `file:///${normalized}` : `file://${normalized.startsWith('/') ? '' : '/'}${normalized}`
}

function sameUri(left: string | undefined, right: string): boolean {
  if (!left) return false
  if (left.toLowerCase() === right.toLowerCase()) return true
  const leftName = decodeURIComponent(left).replace(/\\/g, '/').split('/').at(-1)
  const rightName = decodeURIComponent(right).replace(/\\/g, '/').split('/').at(-1)
  return leftName !== undefined && leftName.toLowerCase() === rightName?.toLowerCase()
}

function locationUri(item: any): string | undefined {
  return item?.uri ?? item?.targetUri
}

function rangeStartsAt(item: any, line: number, character?: number): boolean {
  const start = item?.range?.start ?? item?.targetSelectionRange?.start
  return Boolean(start && start.line === line && (character === undefined || start.character === character))
}

function rangeContains(item: any, line: number, character: number): boolean {
  const range = item?.range ?? item?.targetSelectionRange
  const start = range?.start
  const end = range?.end
  if (!start || !end || line < start.line || line > end.line) return false
  if (line === start.line && character < start.character) return false
  return !(line === end.line && character > end.character)
}

function collectSymbolNames(symbols: any[]): string[] {
  const names: string[] = []
  for (const symbol of symbols) {
    if (typeof symbol.name === 'string') names.push(symbol.name)
    if (Array.isArray(symbol.children)) names.push(...collectSymbolNames(symbol.children))
  }
  return names
}

async function waitFor(description: string, predicate: () => boolean, timeoutMs = 10000): Promise<void> {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    if (predicate()) return
    await sleep(50)
  }
  throw new Error(`Timed out waiting for ${description}`)
}

async function waitForResponse(id: number, messages: LspMessage[], description: string): Promise<LspMessage> {
  await waitFor(description, () => messages.some(message => message.id === id && !message.method))
  const message = messages.find(item => item.id === id && !item.method)
  if (!message) throw new Error(`Missing response after wait: ${description}`)
  if (message.error) throw new Error(`${description} returned error: ${JSON.stringify(message.error)}`)
  return message
}

function resolveServerPath(): string {
  const serverPath = path.join(__dirname, '..', 'dist', 'language-server.cjs')
  if (!fs.existsSync(serverPath)) {
    throw new Error(`CSSTS language server bundle not found: ${serverPath}`)
  }
  return serverPath
}

function resolveTsdkPath(): string {
  const candidates = [
    path.join(__dirname, '..', 'node_modules', 'typescript', 'lib'),
    path.join(__dirname, '..', '..', 'node_modules', 'typescript', 'lib'),
    path.join(__dirname, '..', '..', '..', 'node_modules', 'typescript', 'lib'),
    path.join(process.cwd(), 'node_modules', 'typescript', 'lib'),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'typescript.js')) || fs.existsSync(path.join(candidate, 'tsserverlibrary.js'))) {
      return candidate
    }
  }
  throw new Error(`TypeScript SDK not found. Checked: ${candidates.join(', ')}`)
}

function configurationForSection(section: string | undefined): any {
  if (section === 'typescript.suggest.enabled' || section === 'javascript.suggest.enabled') {
    return true
  }
  if (section === 'typescript.validate.enable' || section === 'javascript.validate.enable') {
    return true
  }
  if (section === 'typescript.suggest.completeFunctionCalls' || section === 'javascript.suggest.completeFunctionCalls') {
    return false
  }
  if (section === 'typescript' || section === 'javascript') {
    return {
      suggest: {
        autoImports: false,
        includeCompletionsForImportStatements: false,
      },
      preferences: {
        includePackageJsonAutoImports: 'off',
      },
    }
  }
  return {}
}

async function main() {
  const server = spawn('node', [resolveServerPath(), '--stdio'], {
    cwd: path.join(__dirname, '..'),
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  if (!server.stdin || !server.stdout || !server.stderr) {
    throw new Error('Failed to start CSSTS language server process')
  }

  let stdoutBuffer = ''
  let stderr = ''
  let exitCode: number | null = null
  const messages: LspMessage[] = []

  server.stdout.on('data', chunk => {
    stdoutBuffer += chunk.toString()
    const parsed = extractMessages(stdoutBuffer)
    stdoutBuffer = parsed.rest
    messages.push(...parsed.messages)
    for (const message of parsed.messages) {
      if (typeof message.id === 'number' && message.method === 'workspace/configuration') {
        const items = message.params?.items ?? []
        server.stdin.write(createResponse(message.id, items.map((item: any) => configurationForSection(item.section))))
      } else if (typeof message.id === 'number' && message.method === 'client/registerCapability') {
        server.stdin.write(createResponse(message.id, null))
      }
    }
  })

  server.stderr.on('data', chunk => {
    stderr += chunk.toString()
  })
  server.on('exit', code => {
    exitCode = code
  })

  const init = createRequest('initialize', {
    processId: process.pid,
    capabilities: {
      workspace: { configuration: true },
      textDocument: {
        completion: { completionItem: { snippetSupport: true, insertReplaceSupport: true } },
        hover: {},
        definition: {},
        references: {},
        documentSymbol: {},
        semanticTokens: { requests: { full: true } },
        publishDiagnostics: {},
      },
    },
    rootUri: toFileUri(path.join(__dirname, '..')),
    initializationOptions: {
      typescript: { tsdk: resolveTsdkPath() },
      qin: {
        languageServer: {
          sourceExtension: '.cssts',
          serviceExtension: '.ts',
          generatedParserTarget: '@qin/generated-qin-parser-ts',
          compilerPackage: 'cssts-compiler',
        },
      },
    },
  })
  server.stdin.write(init.packet)
  await waitFor('initialize response', () => messages.some(message => message.id === init.id) || exitCode !== null)
  if (!messages.find(message => message.id === init.id)?.result?.capabilities) {
    throw new Error(`CSSTS initialize failed. exitCode=${exitCode} stderr=${stderr} messages=${JSON.stringify(messages)}`)
  }
  server.stdin.write(createNotification('initialized', {}))

  const validUri = toFileUri(path.join(__dirname, 'valid.cssts'))
  server.stdin.write(createNotification('textDocument/didOpen', {
    textDocument: {
      uri: validUri,
      languageId: 'cssts',
      version: 1,
      text: "import { css } from 'cssts-ts'\nconst buttonStyle = css { displayFlex, alignItemsCenter }\n",
    },
  }))

  const invalidUri = toFileUri(path.join(__dirname, 'invalid.cssts'))
  server.stdin.write(createNotification('textDocument/didOpen', {
    textDocument: {
      uri: invalidUri,
      languageId: 'cssts',
      version: 1,
      text: "import { css } from 'cssts-ts'\nconst broken = css { displayFlex,\n",
    },
  }))

  const tsSubsetUri = toFileUri(path.join(__dirname, 'ts-subset.cssts'))
  server.stdin.write(createNotification('textDocument/didOpen', {
    textDocument: {
      uri: tsSubsetUri,
      languageId: 'cssts',
      version: 1,
      text: [
        'const alphaNumber = 41',
        'const alphaText = alphaNumber.toString()',
        'const finalValue = alphaText',
        'al',
        '',
      ].join('\n'),
    },
  }))

  const cssSyntaxUri = toFileUri(path.join(__dirname, 'css-syntax.cssts'))
  server.stdin.write(createNotification('textDocument/didOpen', {
    textDocument: {
      uri: cssSyntaxUri,
      languageId: 'cssts',
      version: 1,
      text: [
        'const baseStyle = css { colorRed, displayFlex }',
        'const derivedStyle = css { baseStyle, backgroundBlue }',
        'der',
        '',
      ].join('\n'),
    },
  }))

  await waitFor('CSSTS diagnostics for valid and invalid documents', () => {
    const diagnostics = messages.filter(message => message.method === 'textDocument/publishDiagnostics')
    return diagnostics.some(message => sameUri(message.params?.uri, validUri))
      && diagnostics.some(message => sameUri(message.params?.uri, invalidUri))
  }, 15000)

  const invalidDiagnosticRequest = createRequest('textDocument/diagnostic', {
    textDocument: { uri: invalidUri },
  })
  server.stdin.write(invalidDiagnosticRequest.packet)
  const invalidDiagnosticResponse = await waitForResponse(invalidDiagnosticRequest.id, messages, 'CSSTS invalid diagnostic response')

  const diagnostics = messages.filter(message => message.method === 'textDocument/publishDiagnostics')
  const validDiagnostics = diagnostics.filter(message => sameUri(message.params?.uri, validUri)).at(-1)?.params?.diagnostics ?? []
  const invalidDiagnostics = invalidDiagnosticResponse.result?.items
    ?? diagnostics.filter(message => sameUri(message.params?.uri, invalidUri)).at(-1)?.params?.diagnostics
    ?? []
  if (validDiagnostics.some((item: any) => String(item.message ?? '').includes('CSSTS transform failed'))) {
    throw new Error(`Valid CSSTS source produced transform diagnostics: ${JSON.stringify(validDiagnostics)}`)
  }
  if (!invalidDiagnostics.some((item: any) => String(item.message ?? '').includes('CSSTS transform failed'))) {
    throw new Error(`Invalid CSSTS source did not produce transform diagnostics: ${JSON.stringify(invalidDiagnostics)}`)
  }

  const hover = createRequest('textDocument/hover', {
    textDocument: { uri: tsSubsetUri },
    position: { line: 0, character: 8 },
  })
  server.stdin.write(hover.packet)
  const hoverResponse = await waitForResponse(hover.id, messages, 'CSSTS hover response')
  if (!JSON.stringify(hoverResponse.result ?? '').includes('alphaNumber')) {
    throw new Error(`CSSTS hover did not return TS content: ${JSON.stringify(hoverResponse.result)}`)
  }

  const completion = createRequest('textDocument/completion', {
    textDocument: { uri: tsSubsetUri },
    position: { line: 3, character: 2 },
    context: { triggerKind: 1 },
  })
  server.stdin.write(completion.packet)
  const completionResponse = await waitForResponse(completion.id, messages, 'CSSTS completion response')
  const completionItems = Array.isArray(completionResponse.result) ? completionResponse.result : completionResponse.result?.items ?? []
  const completionLabels = completionItems.map((item: any) => item.label)
  if (!completionLabels.includes('alphaNumber') || !completionLabels.includes('alphaText')) {
    throw new Error(`CSSTS completion did not include TS symbols: ${JSON.stringify(completionLabels.slice(0, 30))}`)
  }

  const definition = createRequest('textDocument/definition', {
    textDocument: { uri: tsSubsetUri },
    position: { line: 1, character: 20 },
  })
  server.stdin.write(definition.packet)
  const definitionResponse = await waitForResponse(definition.id, messages, 'CSSTS definition response')
  const definitions = Array.isArray(definitionResponse.result) ? definitionResponse.result : definitionResponse.result ? [definitionResponse.result] : []
  if (!definitions.some(item => sameUri(locationUri(item), tsSubsetUri) && rangeContains(item, 0, 6))) {
    throw new Error(`CSSTS definition did not resolve alphaNumber declaration: ${JSON.stringify(definitionResponse.result)}`)
  }

  const references = createRequest('textDocument/references', {
    textDocument: { uri: tsSubsetUri },
    position: { line: 0, character: 8 },
    context: { includeDeclaration: true },
  })
  server.stdin.write(references.packet)
  const referencesResponse = await waitForResponse(references.id, messages, 'CSSTS references response')
  const referenceItems = Array.isArray(referencesResponse.result) ? referencesResponse.result : []
  if (
    !referenceItems.some(item => sameUri(locationUri(item), tsSubsetUri) && rangeStartsAt(item, 0, 6))
    || !referenceItems.some(item => sameUri(locationUri(item), tsSubsetUri) && rangeStartsAt(item, 1, 18))
  ) {
    throw new Error(`CSSTS references did not include declaration and usage: ${JSON.stringify(referencesResponse.result)}`)
  }

  const symbols = createRequest('textDocument/documentSymbol', {
    textDocument: { uri: tsSubsetUri },
  })
  server.stdin.write(symbols.packet)
  const symbolsResponse = await waitForResponse(symbols.id, messages, 'CSSTS documentSymbol response')
  const symbolNames = collectSymbolNames(Array.isArray(symbolsResponse.result) ? symbolsResponse.result : [])
  if (!symbolNames.includes('alphaNumber') || !symbolNames.includes('alphaText')) {
    throw new Error(`CSSTS documentSymbol did not include TS symbols: ${JSON.stringify(symbolsResponse.result)}`)
  }

  const semanticTokens = createRequest('textDocument/semanticTokens/full', {
    textDocument: { uri: tsSubsetUri },
  })
  server.stdin.write(semanticTokens.packet)
  const semanticTokensResponse = await waitForResponse(semanticTokens.id, messages, 'CSSTS semanticTokens response')
  if (!Array.isArray(semanticTokensResponse.result?.data) || semanticTokensResponse.result.data.length === 0) {
    throw new Error(`CSSTS semanticTokens did not return token data: ${JSON.stringify(semanticTokensResponse.result)}`)
  }

  const cssCompletion = createRequest('textDocument/completion', {
    textDocument: { uri: cssSyntaxUri },
    position: { line: 2, character: 3 },
    context: { triggerKind: 1 },
  })
  server.stdin.write(cssCompletion.packet)
  const cssCompletionResponse = await waitForResponse(cssCompletion.id, messages, 'CSSTS css syntax completion response')
  const cssCompletionItems = Array.isArray(cssCompletionResponse.result) ? cssCompletionResponse.result : cssCompletionResponse.result?.items ?? []
  const cssCompletionLabels = cssCompletionItems.map((item: any) => item.label)
  if (!cssCompletionLabels.includes('derivedStyle')) {
    throw new Error(`CSSTS css syntax completion did not include derivedStyle: ${JSON.stringify(cssCompletionLabels.slice(0, 30))}`)
  }

  const cssDefinition = createRequest('textDocument/definition', {
    textDocument: { uri: cssSyntaxUri },
    position: { line: 1, character: 33 },
  })
  server.stdin.write(cssDefinition.packet)
  const cssDefinitionResponse = await waitForResponse(cssDefinition.id, messages, 'CSSTS css syntax definition response')
  const cssDefinitions = Array.isArray(cssDefinitionResponse.result) ? cssDefinitionResponse.result : cssDefinitionResponse.result ? [cssDefinitionResponse.result] : []
  if (!cssDefinitions.some(item => sameUri(locationUri(item), cssSyntaxUri) && rangeContains(item, 0, 6))) {
    throw new Error(`CSSTS css syntax definition did not resolve baseStyle declaration: ${JSON.stringify(cssDefinitionResponse.result)}`)
  }

  const cssReferences = createRequest('textDocument/references', {
    textDocument: { uri: cssSyntaxUri },
    position: { line: 1, character: 33 },
    context: { includeDeclaration: true },
  })
  server.stdin.write(cssReferences.packet)
  const cssReferencesResponse = await waitForResponse(cssReferences.id, messages, 'CSSTS css syntax references response')
  const cssReferenceItems = Array.isArray(cssReferencesResponse.result) ? cssReferencesResponse.result : []
  if (
    !cssReferenceItems.some(item => sameUri(locationUri(item), cssSyntaxUri) && rangeStartsAt(item, 0, 6))
    || !cssReferenceItems.some(item => sameUri(locationUri(item), cssSyntaxUri) && rangeStartsAt(item, 1, 26))
  ) {
    throw new Error(`CSSTS css syntax references did not include baseStyle declaration and css usage: ${JSON.stringify(cssReferencesResponse.result)}`)
  }

  const cssSymbols = createRequest('textDocument/documentSymbol', {
    textDocument: { uri: cssSyntaxUri },
  })
  server.stdin.write(cssSymbols.packet)
  const cssSymbolsResponse = await waitForResponse(cssSymbols.id, messages, 'CSSTS css syntax documentSymbol response')
  const cssSymbolNames = collectSymbolNames(Array.isArray(cssSymbolsResponse.result) ? cssSymbolsResponse.result : [])
  if (!cssSymbolNames.includes('baseStyle') || !cssSymbolNames.includes('derivedStyle')) {
    throw new Error(`CSSTS css syntax documentSymbol did not include style symbols: ${JSON.stringify(cssSymbolsResponse.result)}`)
  }

  const cssSemanticTokens = createRequest('textDocument/semanticTokens/full', {
    textDocument: { uri: cssSyntaxUri },
  })
  server.stdin.write(cssSemanticTokens.packet)
  const cssSemanticTokensResponse = await waitForResponse(cssSemanticTokens.id, messages, 'CSSTS css syntax semanticTokens response')
  if (!Array.isArray(cssSemanticTokensResponse.result?.data) || cssSemanticTokensResponse.result.data.length === 0) {
    throw new Error(`CSSTS css syntax semanticTokens did not return token data: ${JSON.stringify(cssSemanticTokensResponse.result)}`)
  }

  const shutdown = createRequest('shutdown', null)
  server.stdin.write(shutdown.packet)
  await waitForResponse(shutdown.id, messages, 'CSSTS shutdown response')
  await sleep(200)
  server.stdin.write(createNotification('exit', null))
  await sleep(200)

  console.log('CSSTS language server LSP smoke passed')
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack || error.message : String(error))
  process.exit(1)
})
