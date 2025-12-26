import { transformCssTs } from 'cssts-compiler'

// 模拟 Vue 文件 script 内容（有已存在的 import）
const code = `import { computed } from 'vue'
const a = css { displayFlex }`

const result = transformCssTs(code, { styles: new Set() })
console.log('=== OUTPUT ===')
console.log(result.code)
