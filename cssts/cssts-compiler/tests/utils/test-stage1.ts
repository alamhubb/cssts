/**
 * CSSTS 阶段1: CST 解析测试
 * 测试范围: 源代码 → CST
 * 验证方式: 检查解析器能否成功生成 CST
 *
 * 用法:
 *   npx tsx tests/utils/test-stage1.ts              # 从头开始测试
 *   npx tsx tests/utils/test-stage1.ts 10           # 从第10个开始
 *   npx tsx tests/utils/test-stage1.ts 10 -s        # 从第10个开始，遇错停止
 */
import { runTests, testStage1 } from 'slime-test'
import CssTsParser from '../../src/parser/CssTsParser'
import { CssTsCstToAst } from '../../src/factory/CssTsCstToAst'

// 运行测试
runTests(testStage1, {
  stageName: 'CSSTS 阶段1: CST 解析测试',
  description: '源代码 → CST，验证解析器能否成功生成 CST',
  ParserClass: CssTsParser as any,
  CstToAstClass: CssTsCstToAst,
  startFrom: 1,
  stopOnFail: true,
})
