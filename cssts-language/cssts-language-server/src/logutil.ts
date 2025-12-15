import * as fs from 'fs'
import * as path from 'path'

const LOG_FILE = path.join(__dirname, '..', '..', 'templog.txt')

export function logToFile(message: string) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}\n`
  
  try {
    fs.appendFileSync(LOG_FILE, logMessage)
  } catch (error) {
    // 忽略日志写入错误
    console.error('Failed to write log:', error)
  }
}
