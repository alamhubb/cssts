import { transformCssTs } from 'cssts-compiler'
import * as fs from 'fs'

const code = fs.readFileSync('./src/test-button.cssts', 'utf-8')
console.log('=== 输入 ===')
console.log(code)
console.log('\n=== 输出 ===')
const result = transformCssTs(code, { styles: new Set() })
console.log(result.code)
