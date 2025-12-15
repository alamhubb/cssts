/**
 * CSSTS 阶段3: 代码生成测试 (toFileAst 版本)
 * 测试范围: AST → JavaScript代码
 * 验证方式: 比较输入代码和输出代码的 token 序列是否一致
 * 
 * 与 test-stage3.ts 的区别：
 * - test-stage3.ts 使用 toProgram（纯 AST 转换）
 * - 本文件使用 toFileAst（包含后处理：自动导入等）
 *
 * 用法:
 *   npx tsx tests/utils/test-stage3-fileAst.ts              # 从头开始测试
 *   npx tsx tests/utils/test-stage3-fileAst.ts 10           # 从第10个开始
 *   npx tsx tests/utils/test-stage3-fileAst.ts 10 -s        # 从第10个开始，遇错停止
 */
import {runTests, testStage3} from 'slime-test/src/utils/test-framework.ts'
import CssTsParser from '../../src/parser/CssTsParser'
import {CssTsCstToAst} from '../../src/factory/CssTsCstToAst'

/**
 * 包装类：让 toProgram 内部调用 toFileAst
 * 这样可以复用测试框架的 testStage3
 * 
 * 注意：toFileAst 内部会调用 toProgram，所以需要保存原始方法避免无限递归
 */
class CssTsCstToAstFileMode extends CssTsCstToAst {
  private _originalToProgram = CssTsCstToAst.prototype.toProgram
  
  toProgram(cst: any) {
    // 先调用原始的 toProgram 做纯 AST 转换
    const program = this._originalToProgram.call(this, cst)
    
    // 复制 body 进行后处理（与 toFileAst 逻辑一致）
    let body = [...program.body]
    
    // CSSTS 后处理：添加 cssts 和 csstsAtom 导入
    body = (this as any).processCsstsPostTransform(body)
    
    // 更新 program.body
    program.body = body
    
    return program
  }
}

// 运行测试
runTests(testStage3, {
  stageName: 'CSSTS 阶段3: 代码生成测试 (toFileAst)',
  description: 'AST → JavaScript代码，比较输入/输出的 token 序列',
  ParserClass: CssTsParser as any,
  CstToAstClass: CssTsCstToAstFileMode,
  startFrom: 1,
  stopOnFail: true,
})
