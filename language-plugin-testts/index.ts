// 导入 Vue 的代码信息和插件类型。
import type { VueCodeInformation, VueLanguagePlugin } from '@vue/language-core'
// 导入 testts 解析和 CST->AST 工具。
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
// 导入代码生成器和 mapping 转换器。
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
// 导入增强映射类型定义。
import type { EnhancedMapping } from 'slime-generator'
// 导入日志库用于调试。
import Glog from 'glogjs'

// 定义当前插件版本号。
const PLUGIN_VERSION = '4.1.0-testts-minimal-no-defensive'

// 初始化日志级别为 debug。
Glog.init({ level: 'debug' })
// 记录插件初始化日志。
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

// 定义脚本块最小结构。
type SfcScriptLike = {
  // 脚本块名称。
  name?: string
  // 脚本语言。
  lang?: string
  // 标签属性。
  attrs?: Record<string, string | true>
  // 脚本内容。
  content?: string
}

// 定义 SFC 中关心的脚本容器。
type SfcLike = {
  // 普通 script。
  script?: SfcScriptLike | null
  // script setup。
  scriptSetup?: SfcScriptLike | null
}

// 定义转换结果结构。
type SlimeTransformResult = {
  // 转换后的代码。
  code: string
  // 归一化后的映射数组。
  mapping: EnhancedMapping[]
}

// 定义统一的代码能力开关。
const ALL_CODE_FEATURES: VueCodeInformation = {
  // 开启诊断能力。
  verification: true,
  // 开启补全能力。
  completion: true,
  // 开启语义能力。
  semantic: true,
  // 开启导航能力。
  navigation: true,
}

// 判断给定块是否是 testts。
function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  // 通过 lang 或 attrs.lang 判断 testts。
  return block?.lang === 'testts' || block?.attrs?.lang === 'testts'
}

// 获取优先处理的 testts 脚本块。
function getPrimaryTesttsBlock(sfc: SfcLike): SfcScriptLike | undefined {
  // 优先 scriptSetup。
  if (isTesttsScriptBlock(sfc.scriptSetup)) return sfc.scriptSetup ?? undefined
  // 次选 script。
  if (isTesttsScriptBlock(sfc.script)) return sfc.script ?? undefined
}

// 执行 testts 到 ts 的转换并产出 mapping。
function transformTesttsToTs(sourceCode: string): SlimeTransformResult {
  // 创建解析器。
  const parser = new SlimeParser(sourceCode)
  // 解析 Program。
  const cst = parser.Program()
  // CST 转 AST。
  const ast = SlimeCstToAstUtils.toProgram(cst)
  // 生成代码和原始 mapping。
  const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
  // 返回转换结果。
  return {
    // 返回生成代码字符串。
    code: generated.code as string,
    // 返回归一化映射。
    mapping: SlimeMappingConverter.convertMappings((generated as any).mapping),
  }
}

// 将增强映射转换为 Volar segments。
function buildSegmentsFromMapping(
  // 生成后的完整代码。
  generatedCode: string,
  // 增强映射数组。
  mapping: EnhancedMapping[],
  // 源块名称。
  sourceName: string
): (string | [string, string, number, VueCodeInformation])[] {
  // 初始化 segment 容器。
  const segments: (string | [string, string, number, VueCodeInformation])[] = []
  // 按 generated offset 排序映射。
  const sorted = [...mapping].sort((a, b) => a.generated.offset - b.generated.offset)
  // 初始化遍历游标。
  let cursor = 0

  // 遍历每个映射项。
  for (const item of sorted) {
    // 取生成起点。
    const generatedStart = item.generated.offset
    // 取生成终点。
    const generatedEnd = item.generated.offset + item.generated.length
    // 取源代码起点。
    const sourceStart = item.original.offset
    // 计算生成代码中的间隙文本。
    const gap = generatedCode.slice(cursor, generatedStart)
    // 截取映射文本。
    const mapped = generatedCode.slice(generatedStart, generatedEnd)

    // 有间隙则先写入纯文本段。
    if (gap) segments.push(gap)
    // 写入带映射的 segment。
    segments.push([mapped, sourceName, sourceStart, ALL_CODE_FEATURES])
    // 更新游标到当前终点。
    cursor = generatedEnd
  }

  // 取尾部剩余文本。
  const tail = generatedCode.slice(cursor)
  // 尾部非空则追加。
  if (tail) segments.push(tail)
  // 返回完整 segments。
  return segments
}

// 定义插件主入口。
const plugin: VueLanguagePlugin = ({ modules }) => {
  // 获取 typescript 模块。
  const ts = modules.typescript
  // 打印 typescript 版本日志。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  // 打印当前模式日志。
  Glog.info('[language-plugin-testts] mode=minimal_no_defensive')

  // 返回插件实现对象。
  return {
    // 插件名称。
    name: 'language-plugin-testts',
    // 插件 API 版本。
    version: 2.2,
    // 设置执行顺序。
    order: 10000,

    // 定义 testts 的脚本编译钩子。
    compileSFCScript(lang, script) {
      // 仅处理 testts。
      if (lang !== 'testts') return
      // 执行转换。
      const transformed = transformTesttsToTs(script)
      // 生成 TS SourceFile。
      return ts.createSourceFile('.ts', transformed.code, 99)
    },

    // 定义嵌入代码解析钩子。
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      // 仅处理 script_ts 虚拟文件。
      if (embeddedFile.id !== 'script_ts') return
      // 获取目标 testts 块。
      const target = getPrimaryTesttsBlock(sfc as SfcLike)
      // 无目标块则退出。
      if (!target) return

      // 读取源代码文本。
      const sourceCode = target.content as string
      // 计算 sourceName。
      const sourceName = target.name || (target === (sfc as SfcLike).scriptSetup ? 'scriptSetup' : 'script')
      // 执行转换。
      const transformed = transformTesttsToTs(sourceCode)
      // 构建 segments。
      const segments = buildSegmentsFromMapping(transformed.code, transformed.mapping, sourceName)

      // 写回 script_ts 内容。
      embeddedFile.content = segments as any
      // 打印转换日志。
      Glog.info(
        `[testts] resolveEmbeddedCode(script_ts) transformed: file=${fileName}, source=${sourceName}, codeLen=${transformed.code.length}, mapTokens=${transformed.mapping.length}`
      )
    },
  }
}

// 默认导出插件。
export default plugin
