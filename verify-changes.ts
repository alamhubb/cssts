import { readFileSync } from 'fs'
import { join } from 'path'

// 验证修改是否正确
const cstsFile = 'cssts/cssts-compiler/src/factory/CssTsCstToAst.ts'
const content = readFileSync(cstsFile, 'utf-8')

console.log('📋 验证 CssTsCstToAst.ts 的修改:\n')

// 检查 1: 确保删除了 SlimeJavascriptCstToAstUtil 导入
if (content.includes('SlimeJavascriptCstToAstUtil')) {
  console.log('❌ 失败: 仍然存在 SlimeJavascriptCstToAstUtil 导入')
  process.exit(1)
} else {
  console.log('✅ 检查1通过: SlimeJavascriptCstToAstUtil 已删除')
}

// 检查 2: 确保删除了 _createPrimaryExpressionAstOriginal 方法
if (content.includes('_createPrimaryExpressionAstOriginal')) {
  console.log('❌ 失败: 仍然存在 _createPrimaryExpressionAstOriginal 方法')
  process.exit(1)
} else {
  console.log('✅ 检查2通过: _createPrimaryExpressionAstOriginal 已删除')
}

// 检查 3: 确保调用了 super.createPrimaryExpressionAst
if (!content.includes('return super.createPrimaryExpressionAst(cst)')) {
  console.log('❌ 失败: 未找到 super.createPrimaryExpressionAst 调用')
  process.exit(1)
} else {
  console.log('✅ 检查3通过: 直接调用 super.createPrimaryExpressionAst')
}

// 检查 4: 确保 createPrimaryExpressionAst 是简洁的
const match = content.match(/createPrimaryExpressionAst\(cst: SubhutiCst\): SlimeExpression \{[\s\S]*?return super\.createPrimaryExpressionAst\(cst\)[\s\S]*?\}/);
if (match) {
  const methodContent = match[0]
  const lines = methodContent.split('\n').length
  if (lines <= 10) {
    console.log(`✅ 检查4通过: createPrimaryExpressionAst 方法简洁 (${lines} 行)`)
  } else {
    console.log(`⚠️  警告: createPrimaryExpressionAst 方法仍然较长 (${lines} 行)`)
  }
} else {
  console.log('⚠️  警告: 无法精确验证方法长度')
}

console.log('\n✨ 所有核心检查都已通过!')
console.log('\n修改总结:')
console.log('- 删除了 SlimeJavascriptCstToAstUtil 导入')
console.log('- 删除了 _createPrimaryExpressionAstOriginal 方法（50+ 行代码）')
console.log('- 直接调用基类方法处理 PrimaryExpression')
console.log('- 代码更简洁，可维护性更高')
