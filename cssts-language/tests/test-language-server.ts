/**
 * CSSTS Language Server 测试脚本
 * 模拟 LSP 客户端测试语言服务器功能
 */

import { spawn, ChildProcess } from 'child_process'
import * as path from 'path'
import * as readline from 'readline'
import { fileURLToPath } from 'url'

// ESM 兼容的 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// LSP 消息 ID
let messageId = 0

// 创建 LSP 消息
function createMessage(method: string, params: any): string {
  const id = ++messageId
  const message = JSON.stringify({
    jsonrpc: '2.0',
    id,
    method,
    params,
  })
  const header = `Content-Length: ${Buffer.byteLength(message)}\r\n\r\n`
  return header + message
}

// 创建 LSP 通知
function createNotification(method: string, params: any): string {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method,
    params,
  })
  const header = `Content-Length: ${Buffer.byteLength(message)}\r\n\r\n`
  return header + message
}

// 解析 LSP 响应
function parseResponse(data: string): any[] {
  const responses: any[] = []
  const parts = data.split(/Content-Length: \d+\r\n\r\n/)
  for (const part of parts) {
    if (part.trim()) {
      try {
        responses.push(JSON.parse(part))
      } catch (e) {
        // 忽略解析错误
      }
    }
  }
  return responses
}

async function main() {
  console.log('=== CSSTS Language Server Test ===\n')

  // 启动语言服务器
  const serverPath = path.join(__dirname, '..', 'dist', 'language-server.cjs')
  console.log(`Starting server: ${serverPath}`)

  const server: ChildProcess = spawn('node', [serverPath, '--stdio'], {
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  if (!server.stdin || !server.stdout || !server.stderr) {
    console.error('Failed to create server process')
    process.exit(1)
  }

  // 收集响应
  let responseBuffer = ''
  const responses: any[] = []

  server.stdout.on('data', (data: Buffer) => {
    responseBuffer += data.toString()
    const parsed = parseResponse(responseBuffer)
    responses.push(...parsed)
    
    for (const resp of parsed) {
      console.log('\n📥 Response:', JSON.stringify(resp, null, 2))
    }
  })

  server.stderr.on('data', (data: Buffer) => {
    console.error('Server stderr:', data.toString())
  })

  server.on('error', (err) => {
    console.error('Server error:', err)
  })

  server.on('exit', (code) => {
    console.log(`Server exited with code ${code}`)
  })

  // 等待服务器启动
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 1. 发送 initialize 请求
  console.log('\n📤 Sending initialize request...')
  const initializeParams = {
    processId: process.pid,
    capabilities: {
      textDocument: {
        completion: {
          completionItem: {
            snippetSupport: true,
          },
        },
        hover: {},
        definition: {},
        references: {},
      },
    },
    rootUri: `file:///${path.join(__dirname, '..').replace(/\\/g, '/')}`,
    initializationOptions: {
      typescript: {
        tsdk: path.join(__dirname, '..', 'node_modules', 'typescript', 'lib'),
      },
    },
  }

  server.stdin.write(createMessage('initialize', initializeParams))

  // 等待响应
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 2. 发送 initialized 通知
  console.log('\n📤 Sending initialized notification...')
  server.stdin.write(createNotification('initialized', {}))

  await new Promise((resolve) => setTimeout(resolve, 500))

  // 3. 打开一个 .cssts 文件
  console.log('\n📤 Opening demo.cssts file...')
  const demoFilePath = path.join(__dirname, '..', 'examples', 'demo.cssts')
  const demoFileUri = `file:///${demoFilePath.replace(/\\/g, '/')}`
  
  const demoContent = `// CSSTS Demo
import { css } from 'cssts'

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

  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 4. 请求补全
  console.log('\n📤 Requesting completion at position (4, 2)...')
  server.stdin.write(
    createMessage('textDocument/completion', {
      textDocument: { uri: demoFileUri },
      position: { line: 4, character: 2 },
    })
  )

  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 5. 请求悬停信息
  console.log('\n📤 Requesting hover at position (4, 5)...')
  server.stdin.write(
    createMessage('textDocument/hover', {
      textDocument: { uri: demoFileUri },
      position: { line: 4, character: 5 },
    })
  )

  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 6. 关闭文件
  console.log('\n📤 Closing file...')
  server.stdin.write(
    createNotification('textDocument/didClose', {
      textDocument: { uri: demoFileUri },
    })
  )

  await new Promise((resolve) => setTimeout(resolve, 500))

  // 7. 发送 shutdown 请求
  console.log('\n📤 Sending shutdown request...')
  server.stdin.write(createMessage('shutdown', null))

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 8. 发送 exit 通知
  console.log('\n📤 Sending exit notification...')
  server.stdin.write(createNotification('exit', null))

  // 等待服务器退出
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('\n=== Test Complete ===')
  console.log(`Total responses received: ${responses.length}`)

  // 检查是否收到 initialize 响应
  const initResponse = responses.find((r) => r.id === 1)
  if (initResponse?.result?.capabilities) {
    console.log('\n✅ Server initialized successfully!')
    console.log('Server capabilities:', Object.keys(initResponse.result.capabilities))
  } else {
    console.log('\n❌ Server initialization failed or no capabilities returned')
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('Test failed:', err)
  process.exit(1)
})
