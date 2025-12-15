/**
 * CSSTS 阶段4: CSSTS 语法测试
 * 测试范围: CSSTS 特有语法（css {} 表达式）
 * 验证方式: 解析 → AST → 代码生成，检查是否正确转换
 *
 * 用法:
 *   npx tsx tests/utils/test-stage4.ts              # 运行所有测试
 *   npx tsx tests/utils/test-stage4.ts -v           # 详细输出
 */
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import CssTsParser from '../../src/parser/CssTsParser'
import { CssTsCstToAst } from '../../src/factory/CssTsCstToAst'
import SlimeGenerator from 'slime-generator/src/SlimeGenerator.ts'

// ES module 兼容
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 测试目录
const TESTS_DIR = path.join(__dirname, '../cssts')

// 命令行参数
const args = process.argv.slice(2)
const verbose = args.includes('-v') || args.includes('--verbose')

interface TestResult {
  name: string
  passed: boolean
  error?: string
  input?: string
  output?: string
  usedAtoms?: string[]
}

/**
 * 运行单个测试
 */
function runTest(testDir: string): TestResult {
  const testName = path.basename(testDir)
  const inputFile = path.join(testDir, 'input.cssts')

  if (!fs.existsSync(inputFile)) {
    return { name: testName, passed: false, error: '找不到 input.cssts 文件' }
  }

  const input = fs.readFileSync(inputFile, 'utf-8')

  try {
    // 1. 解析
    const parser = new CssTsParser(input)
    const cst = parser.Program()

    if (!cst) {
      return { name: testName, passed: false, error: '解析失败：CST 为空', input }
    }

    // 2. CST → AST
    const cstToAst = new CssTsCstToAst()
    const ast = cstToAst.toFileAst(cst)

    if (!ast) {
      return { name: testName, passed: false, error: 'AST 转换失败', input }
    }

    // 3. AST → 代码
    const result = SlimeGenerator.generator(ast, parser.parsedTokens)
    const output = result.code

    // 4. 收集使用的原子类
    const usedAtoms = Array.from(cstToAst.getUsedAtoms())

    // 5. 验证输出
    // 检查是否包含 cssts.$cls 调用（如果使用了 css {} 语法）
    const hasCssSyntax = input.includes('css {') || input.includes('css{')
    if (hasCssSyntax) {
      if (!output.includes('cssts.$cls')) {
        return {
          name: testName,
          passed: false,
          error: '输出中缺少 cssts.$cls 调用',
          input,
          output,
          usedAtoms
        }
      }
      if (!output.includes('csstsAtom')) {
        return {
          name: testName,
          passed: false,
          error: '输出中缺少 csstsAtom 引用',
          input,
          output,
          usedAtoms
        }
      }
    }

    // 6. 验证导入
    if (usedAtoms.length > 0) {
      if (!output.includes("from 'cssts'") && !output.includes('from "cssts"')) {
        return {
          name: testName,
          passed: false,
          error: '输出中缺少 cssts 导入',
          input,
          output,
          usedAtoms
        }
      }
      if (!output.includes("from 'virtual:csstsAtom'") && !output.includes('from "virtual:csstsAtom"')) {
        return {
          name: testName,
          passed: false,
          error: '输出中缺少 virtual:csstsAtom 导入',
          input,
          output,
          usedAtoms
        }
      }
    }

    return {
      name: testName,
      passed: true,
      input,
      output,
      usedAtoms
    }
  } catch (e: any) {
    return {
      name: testName,
      passed: false,
      error: `异常: ${e.message}`,
      input
    }
  }
}

/**
 * 运行所有测试
 */
function runAllTests(): void {
  console.log('============================================================')
  console.log('🧪 CSSTS 阶段4: CSSTS 语法测试')
  console.log('📝 测试 css {} 表达式语法的解析和转换')
  console.log(`📁 测试目录: ${TESTS_DIR}`)
  console.log('============================================================\n')

  if (!fs.existsSync(TESTS_DIR)) {
    console.error(`❌ 测试目录不存在: ${TESTS_DIR}`)
    process.exit(1)
  }

  const testDirs = fs.readdirSync(TESTS_DIR)
    .filter(name => {
      const fullPath = path.join(TESTS_DIR, name)
      return fs.statSync(fullPath).isDirectory()
    })
    .sort()

  if (testDirs.length === 0) {
    console.error('❌ 没有找到测试用例')
    process.exit(1)
  }

  const results: TestResult[] = []

  for (const dir of testDirs) {
    const testPath = path.join(TESTS_DIR, dir)
    const result = runTest(testPath)
    results.push(result)

    if (result.passed) {
      console.log(`✅ ${result.name}`)
      if (verbose && result.usedAtoms && result.usedAtoms.length > 0) {
        console.log(`   原子类: ${result.usedAtoms.join(', ')}`)
      }
    } else {
      console.log(`❌ ${result.name}`)
      console.log(`   错误: ${result.error}`)
      if (verbose && result.input) {
        console.log(`   输入:\n${result.input.split('\n').map(l => '     ' + l).join('\n')}`)
      }
      if (verbose && result.output) {
        console.log(`   输出:\n${result.output.split('\n').map(l => '     ' + l).join('\n')}`)
      }
    }
  }

  // 统计
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length

  console.log('\n============================================================')
  console.log('📊 测试结果汇总')
  console.log('============================================================')
  console.log(`✅ 通过: ${passed}/${results.length}`)
  console.log(`❌ 失败: ${failed}/${results.length}`)

  if (failed === 0) {
    console.log('\n🎉 CSSTS 阶段4: 所有测试通过!')
  } else {
    console.log('\n⚠️  有测试失败')
    process.exit(1)
  }
  console.log('============================================================')
}

// 运行测试
runAllTests()
