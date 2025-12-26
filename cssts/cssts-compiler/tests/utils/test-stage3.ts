/**
 * CSSTS 阶段3: 代码生成测试
 * 测试范围: AST → JavaScript代码
 * 验证方式: 比较输入代码和输出代码的 token 序列是否一致
 * 前提: 阶段1、2已通过（CST和AST可以正常生成）
 *
 * 用法:
 *   tsx tests/utils/test-stage3.ts              # 从头开始测试
 *   tsx tests/utils/test-stage3.ts 10           # 从第10个开始
 *   tsx tests/utils/test-stage3.ts 10 -s        # 从第10个开始，遇错停止
 */
import { runTests, testStage3 } from 'slime-test'
import CssTsParser from '../../src/parser/CssTsParser'
import { CssTsCstToAst } from '../../src/factory/CssTsCstToAstUtils'

// 运行测试
runTests(testStage3, {
  stageName: 'CSSTS 阶段3: 代码生成测试',
  description: 'AST → JavaScript代码，比较输入/输出的 token 序列',
  ParserClass: CssTsParser as any,
  CstToAstClass: CssTsCstToAst,
  startFrom: 1,
  stopOnFail: true,
})
