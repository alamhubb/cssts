// 测试 UniApp index.vue 中的 CSSTS 代码解析
import { transformCssTs } from 'cssts-compiler'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从文件读取 CSSTS 代码
const uniappScript = fs.readFileSync(path.join(__dirname, 'test-uniapp.cssts'), 'utf-8')

console.log('=== 测试 UniApp index.vue 的 CSSTS 代码 ===')
console.log('输入代码长度:', uniappScript.length)
console.log('输入代码:')
console.log(uniappScript)

try {
  const globalStyles = new Set<string>()
  const result = transformCssTs(uniappScript, { styles: globalStyles })
  
  console.log('\n=== 转换成功 ===')
  console.log('转换后代码长度:', result.code.length)
  console.log('转换后代码:')
  console.log(result.code)
  console.log('\n收集的样式:', [...globalStyles])
} catch (e: any) {
  console.log('\n=== 转换失败 ===')
  console.log('错误信息:', e.message)
  console.log('错误堆栈:', e.stack)
}
