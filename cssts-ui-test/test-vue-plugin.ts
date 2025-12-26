// 完整模拟 vite-plugin-cssts 对 Vue 文件的处理流程
import { transformCssTs } from 'cssts-compiler'
import * as fs from 'fs'

// 模拟 extractVueCsstsScript
function extractVueCsstsScript(code: string): {
    script: string
    start: number
    end: number
    isSetup: boolean
} | null {
    const scriptMatch = code.match(/<script(\s+setup)?[^>]*\slang\s*=\s*["']cssts["'][^>]*>([\s\S]*?)<\/script>/)
    if (!scriptMatch) return null

    const fullMatch = scriptMatch[0]
    const start = code.indexOf(fullMatch)
    const end = start + fullMatch.length
    const isSetup = scriptMatch[1] !== undefined
    const script = scriptMatch[2]

    return { script, start, end, isSetup }
}

// 模拟 rebuildVueFile
function rebuildVueFile(
    originalCode: string,
    scriptInfo: { start: number; end: number; isSetup: boolean },
    newScriptContent: string
): string {
    const before = originalCode.slice(0, scriptInfo.start)
    const after = originalCode.slice(scriptInfo.end)

    const setupAttr = scriptInfo.isSetup ? ' setup' : ''
    const newOpenTag = `<script${setupAttr} lang="ts">`

    return `${before}${newOpenTag}\n${newScriptContent}\n</script>${after}`
}

// 读取实际的 VueButton.vue
const vueCode = fs.readFileSync('./src/components/VueButton.vue', 'utf-8')

console.log('=== 步骤 1: 提取 script ===')
const vueScriptInfo = extractVueCsstsScript(vueCode)
if (!vueScriptInfo) {
    console.log('ERROR: 无法提取 script')
    process.exit(1)
}
console.log('提取的 script（前 200 字符）:')
console.log(vueScriptInfo.script.substring(0, 200))

console.log('\n=== 步骤 2: transformCssTs ===')
const globalStyles = new Set<string>()
const result = transformCssTs(vueScriptInfo.script, { styles: globalStyles })
console.log('转换后的代码（前 500 字符）:')
console.log(result.code.substring(0, 500))

console.log('\n=== 步骤 3: rebuildVueFile ===')
const finalCode = rebuildVueFile(vueCode, vueScriptInfo, result.code)
console.log('最终 Vue 文件 script 部分：')
// 提取 <script> 到 </script> 部分
const scriptMatch = finalCode.match(/<script[^>]*>([\s\S]*?)<\/script>/)
if (scriptMatch) {
    console.log(scriptMatch[0].substring(0, 800))
}

console.log('\n=== 检查 ===')
console.log('result.code 包含 cssts import:', result.code.includes("import {cssts}"))
console.log('finalCode 包含 cssts import:', finalCode.includes("import {cssts}"))
