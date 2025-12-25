/**
 * 阶段4: subhuti 源码测试 (SlimeParser + SlimeCstToAst + SlimeGenerator)
 * 功能与 stage3 一致，测试目录为 subhuti/src
 *
 * 用法:
 *   tsx tests/utils/test-stage4.ts              # 从头开始测试
 *   tsx tests/utils/test-stage4.ts 100          # 从第100个开始
 *   tsx tests/utils/test-stage4.ts 100 -s       # 从第100个开始，遇错停止
 */
import { runTests, testStage3 } from 'slime-test'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const casesDir = path.join(__dirname, '..', 'cssts')

// 运行测试
runTests(testStage3, {
    stageName: '阶段4: slime-ast 源码测试',
    description: 'CST 生成测试',
    casesDir: casesDir,
    startFrom: 1,
    stopOnFail: true,
    fileExtension: '.cssts'
})
