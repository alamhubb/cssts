/**
 * 测试作用域分析功能
 */
import { CssTsCstToAst } from '../src/factory/CssTsCstToAst.ts'
import { CssTsParser } from '../src/parser/index.ts'
import { SlimeGenerator } from 'slime-generator'

const code = `
const baseStyles = css { colorRed, fontBold }
const primary = css { baseStyles, backgroundBlue }
`

console.log('输入代码:')
console.log(code)
console.log('\n' + '='.repeat(60) + '\n')

const parser = new CssTsParser(code)
const cst = parser.Program()
const transformer = new CssTsCstToAst()
const ast = transformer.toFileAst(cst)

const result = SlimeGenerator.generator(ast, parser.parsedTokens)

console.log('输出代码:')
console.log(result.code)
console.log('\n' + '='.repeat(60) + '\n')

// 检查 baseStyles 是否被正确处理
if (result.code.includes('csstsAtom.baseStyles')) {
  console.log('❌ 错误: baseStyles 被错误地转换为 csstsAtom.baseStyles')
} else if (result.code.includes('baseStyles,') || result.code.includes('baseStyles)')) {
  console.log('✅ 正确: baseStyles 保持为变量引用')
} else {
  console.log('⚠️ 未知: 请检查输出')
}
