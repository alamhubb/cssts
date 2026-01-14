/**
 * 测试 cssts 编译
 */

import { transformCssTs } from 'cssts-compiler'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 读取测试文件
const testFile = join(__dirname, 'test-compile.cssts')
const content = readFileSync(testFile, 'utf-8')

console.log('==== 原始代码 ====')
console.log(content)
console.log('\n' + '='.repeat(80) + '\n')

// 编译
const context = { styles: new Set() }
try {
    const result = transformCssTs(content, context)

    console.log('==== 编译后代码 ====')
    console.log(result.code)
    console.log('\n' + '='.repeat(80) + '\n')

    console.log('==== 收集的样式 ====')
    const styles = [...context.styles].sort()
    console.log(`共 ${styles.length} 个样式:`)
    styles.forEach(s => console.log(`  - ${s}`))
    console.log('\n' + '='.repeat(80) + '\n')

    console.log('==== 编译结果 ====')
    console.log('✅ 编译成功!')
    console.log(`✅ 收集了 ${context.styles.size} 个样式`)
    console.log(`✅ 代码行数: ${result.code.split('\n').length}`)

    // 写入编译结果
    const outputFile = join(__dirname, 'test-compile.output.js')
    writeFileSync(outputFile, result.code, 'utf-8')
    console.log(`✅ 编译结果已保存到: test-compile.output.js`)

} catch (error) {
    console.error('\n' + '='.repeat(80))
    console.error('==== ❌ 编译错误 ====')
    console.error(error)
    console.error('='.repeat(80))
    process.exit(1)
}
