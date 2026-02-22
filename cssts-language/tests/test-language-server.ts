/**
 * CSSTS Language Server smoke test.
 * Works with both mono and node.
 */

const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

let messageId = 0

function createRequest(method: string, params: any): string {
  const id = ++messageId
  const body = JSON.stringify({
    jsonrpc: '2.0',
    id,
    method,
    params,
  })
  return `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
}

function createNotification(method: string, params: any): string {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method,
    params,
  })
  return `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
}

function extractResponses(raw: string): { responses: any[]; rest: string } {
  const responses: any[] = []
  let rest = raw

  while (true) {
    const headerEnd = rest.indexOf('\r\n\r\n')
    if (headerEnd < 0) break

    const header = rest.slice(0, headerEnd)
    const lengthMatch = header.match(/Content-Length:\s*(\d+)/i)
    if (!lengthMatch) {
      rest = rest.slice(headerEnd + 4)
      continue
    }

    const bodyLength = Number(lengthMatch[1])
    const bodyStart = headerEnd + 4
    const packetEnd = bodyStart + bodyLength
    if (rest.length < packetEnd) break

    const body = rest.slice(bodyStart, packetEnd)
    try {
      responses.push(JSON.parse(body))
    } catch {
      // Ignore malformed packet and continue parsing.
    }
    rest = rest.slice(packetEnd)
  }

  return { responses, rest }
}

function resolveServerPath(): string {
  const cjsPath = path.join(__dirname, '..', 'dist', 'language-server.cjs')
  const jsPath = path.join(__dirname, '..', 'dist', 'language-server.js')
  if (fs.existsSync(cjsPath)) return cjsPath
  if (fs.existsSync(jsPath)) return jsPath
  return cjsPath
}

function resolveTsdkPath(): string {
  const candidates = [
    path.join(__dirname, '..', 'node_modules', 'typescript', 'lib'),
    path.join(__dirname, '..', '..', '..', 'node_modules', 'typescript', 'lib'),
    path.join(process.cwd(), 'node_modules', 'typescript', 'lib'),
  ]

  for (const candidate of candidates) {
    if (
      fs.existsSync(path.join(candidate, 'typescript.js')) ||
      fs.existsSync(path.join(candidate, 'tsserverlibrary.js'))
    ) {
      return candidate
    }
  }

  return candidates[0]
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  console.log('=== CSSTS Language Server Test ===')

  const serverPath = resolveServerPath()
  console.log(`Server path: ${serverPath}`)

  const server = spawn('node', [serverPath, '--stdio'], {
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  if (!server.stdin || !server.stdout || !server.stderr) {
    throw new Error('Failed to create language server process')
  }

  let buffer = ''
  const responses: any[] = []

  server.stdout.on('data', (chunk: Buffer) => {
    buffer += chunk.toString()
    const { responses: parsed, rest } = extractResponses(buffer)
    buffer = rest
    for (const response of parsed) {
      responses.push(response)
      console.log('Response:', JSON.stringify(response))
    }
  })

  server.stderr.on('data', (chunk: Buffer) => {
    console.error('Server stderr:', chunk.toString())
  })

  server.on('exit', (code: number) => {
    console.log(`Server exited with code ${code}`)
  })

  await sleep(1000)

  const tsdkPath = resolveTsdkPath()
  console.log(`TSDK path: ${tsdkPath}`)

  const initializeParams = {
    processId: process.pid,
    capabilities: {
      textDocument: {
        completion: { completionItem: { snippetSupport: true } },
        hover: {},
        definition: {},
        references: {},
      },
    },
    rootUri: `file:///${path.join(__dirname, '..').replace(/\\/g, '/')}`,
    initializationOptions: {
      typescript: { tsdk: tsdkPath },
    },
  }

  server.stdin.write(createRequest('initialize', initializeParams))
  await sleep(1500)
  server.stdin.write(createNotification('initialized', {}))
  await sleep(500)

  const demoFilePath = path.join(__dirname, '..', 'examples', 'demo.cssts')
  const demoFileUri = `file:///${demoFilePath.replace(/\\/g, '/')}`
  const demoContent = `// CSSTS Demo
import { css } from 'cssts-ts'
const buttonStyle = css { displayFlex, alignItemsCenter, bgBlue500 }
const hoverStyle = css { cursorPointer, bgBlue600 }
export { buttonStyle, hoverStyle }
`

  server.stdin.write(
    createNotification('textDocument/didOpen', {
      textDocument: {
        uri: demoFileUri,
        languageId: 'cssts',
        version: 1,
        text: demoContent,
      },
    })
  )
  await sleep(1000)

  server.stdin.write(
    createRequest('textDocument/completion', {
      textDocument: { uri: demoFileUri },
      position: { line: 2, character: 8 },
    })
  )
  await sleep(1000)

  server.stdin.write(
    createRequest('textDocument/hover', {
      textDocument: { uri: demoFileUri },
      position: { line: 2, character: 10 },
    })
  )
  await sleep(1000)

  server.stdin.write(
    createNotification('textDocument/didClose', {
      textDocument: { uri: demoFileUri },
    })
  )
  await sleep(300)

  server.stdin.write(createRequest('shutdown', null))
  await sleep(500)
  server.stdin.write(createNotification('exit', null))
  await sleep(500)

  const initResponse = responses.find((r) => r.id === 1 && r.result?.capabilities)
  if (!initResponse) {
    throw new Error('Initialize did not return capabilities')
  }

  console.log('Initialize success. Capability keys:', Object.keys(initResponse.result.capabilities))
}

main().catch((err: Error) => {
  console.error('Test failed:', err.message)
  process.exit(1)
})
