/**
 * 阶段4: CSSTS 源码测试 (CssTsParser + CssTsCstToAst)
 * 测试 .cssts 文件的 CST → AST 转换
 *
 * 用法:
 *   tsx tests/utils/test-stage4.ts              # 从头开始测试
 *   tsx tests/utils/test-stage4.ts 100          # 从第100个开始
 *   tsx tests/utils/test-stage4.ts 100 -s       # 从第100个开始，遇错停止
 */
import { runTests, testStage2 } from 'slime-test'
import * as path from 'path'
import { fileURLToPath } from 'url'
import CssTsParser from '../../src/parser/CssTsParser'
import { CssTsCstToAst } from '../../src/factory/CssTsCstToAst'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const casesDir = path.join(__dirname, '..', 'cssts')

// 运行测试
runTests(testStage2, {
    stageName: '阶段4: CSSTS AST 转换测试',
    description: 'CST → AST 转换，验证 AST 结构正确性',
    ParserClass: CssTsParser as any,
    CstToAstClass: CssTsCstToAst,
    casesDir: casesDir,
    startFrom: 1,
    stopOnFail: true,
    fileExtension: '.cssts'
})
