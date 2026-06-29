import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const LOG_FILE = path.join(os.tmpdir(), 'cssts-language-server.log')

export function logToFile(message: string) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}\n`
  
  try {
    fs.appendFileSync(LOG_FILE, logMessage)
  } catch (error) {
    // Logging must not affect LSP behavior.
    console.error('Failed to write log:', error)
  }
}
