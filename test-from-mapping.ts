/**
 * 调试测试：分析 from 关键字映射
 */
import { SlimeJavascriptParser, SlimeCstToAstUtils } from 'slime-parser'
import { SlimeJavascriptGeneratorUtil } from 'slime-generator'

const code = `import { ref } from 'vue'`

console.log('=== 测试代码 ===')
console.log(code)
console.log()

try {
    const parser = new SlimeJavascriptParser(code)
    const cst = parser.Program()
    const ast = SlimeCstToAstUtils.createProgramAst(cst)

    const generator = new SlimeJavascriptGeneratorUtil()
    const result = generator.generator(ast)

    console.log('生成代码:', result.code)
    console.log('Mapping 数量:', result.mapping.length)

    console.log('\n=== 所有 Mapping ===')
    result.mapping.forEach((m: any, i: number) => {
        const sourceText = code.substring(m.source.index, m.source.index + m.source.length)
        const genText = result.code.substring(m.generate.index, m.generate.index + m.generate.length)
        console.log(`[${i}] 源: "${sourceText}" (${m.source.type}) -> 生成: "${genText}" (${m.generate.type})`)
    })

    // 检查 from 是否有 mapping
    console.log('\n=== from 检查 ===')
    const fromMapping = result.mapping.find((m: any) => m.source.value === 'from')
    if (fromMapping) {
        console.log('✅ from 有映射')
        console.log('   source.type:', fromMapping.source.type)
        console.log('   generate.type:', fromMapping.generate.type)
    } else {
        console.log('❌ from 没有映射')
    }

} catch (e) {
    console.error('错误:', e)
}
