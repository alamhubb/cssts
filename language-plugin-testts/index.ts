// 导入 Vue 语言插件类型，VueCodeInformation 用于描述映射能力，VueLanguagePlugin 用于定义插件入口。
import type { VueCodeInformation, VueLanguagePlugin } from '@vue/language-core'
// 导入你们的解析器，负责把 testts 源码先变成 CST。
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
// 导入你们的生成器和映射转换器，前者产出代码，后者把原始 mapping 归一化。
import { SlimeGenerator, SlimeMappingConverter } from 'slime-generator'
// 导入归一化后的映射类型，保证后续函数签名清晰且有类型约束。
import type { EnhancedMapping } from 'slime-generator'
// 导入日志库，方便你在 glog 中确认插件执行链路。
import Glog from 'glogjs'

// 插件版本号用于日志定位，方便你区分当前加载的是哪一版逻辑。
const PLUGIN_VERSION = '4.0.0-testts-resolveEmbeddedCode-script_ts-mapping'

// 初始化 glog，设置 debug 级别以便输出完整调试信息。
Glog.init({ level: 'debug' })
// 启动时打印一条版本日志，确认插件已经被 VSCode/F5 环境加载。
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

// 定义脚本块结构，覆盖 script 和 scriptSetup 里会用到的核心字段。
type SfcScriptLike = {
  // name 是 Volar 内部 block 标识，后续映射需要用它定位 source block。
  name?: string
  // lang 表示脚本语言，例如 testts / ts。
  lang?: string
  // attrs 保存原始标签属性，兼容某些场景下通过 attrs.lang 取值。
  attrs?: Record<string, string | true>
  // content 是脚本正文，transform 的输入来源。
  content?: string
}

// 定义我们在插件里关心的 SFC 结构子集，只需要 script 和 scriptSetup 即可。
type SfcLike = {
  // 普通 script 块，可能不存在。
  script?: SfcScriptLike | null
  // script setup 块，可能不存在。
  scriptSetup?: SfcScriptLike | null
}

// 定义 transform 结果结构，包含生成代码和归一化映射。
type SlimeTransformResult = {
  // 生成后的 TypeScript 文本。
  code: string
  // 归一化后的 offset mapping，用于后续转成 Volar segment。
  mapping: EnhancedMapping[]
}

// 判断一个脚本块是不是 testts，这是进入 transform 的前置条件。
function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  // 为空直接返回 false，避免后续访问空对象属性。
  if (!block) return false
  // 优先从标准 lang 字段判断，这是最常见路径。
  if (block.lang === 'testts') return true
  // 兼容 attrs.lang 的场景，防止某些 parse 形态下漏判。
  return block.attrs?.lang === 'testts'
}

// 把 testts 源码转换成 ts 代码，并把 mapping 转为统一结构。
function transformTesttsToTs(sourceCode: string): SlimeTransformResult {
  // 创建解析器实例，输入原始源码。
  const parser = new SlimeParser(sourceCode)
  // 执行 Program 入口解析，得到 CST。
  const cst = parser.Program()
  // 把 CST 转成 AST，供 generator 使用。
  const ast = SlimeCstToAstUtils.toProgram(cst)
  // 使用 SlimeGenerator 生成目标代码和原始 mapping。
  const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
  // 容错处理：如果 code 不是字符串，回退原文，避免插件崩溃。
  const transformedCode = typeof generated.code === 'string' ? generated.code : sourceCode
  // 容错处理：只有当 mapping 是数组时才进行转换，否则给空数组。
  const transformedMapping = Array.isArray((generated as any).mapping)
    // 使用官方转换器归一化 mapping，避免自定义格式偏差。
    ? SlimeMappingConverter.convertMappings((generated as any).mapping)
    // mapping 不可用时返回空映射，后续会自动走保底逻辑。
    : []
  // 返回统一结果对象，供 compile 和 resolve 两处复用。
  return {
    // 返回生成代码。
    code: transformedCode,
    // 返回归一化映射。
    mapping: transformedMapping,
  }
}

// 定义映射特性开关，告诉 Volar 这段代码可参与补全/诊断/导航/语义高亮。
const ALL_CODE_FEATURES: VueCodeInformation = {
  // 开启错误诊断映射。
  verification: true,
  // 开启补全映射。
  completion: true,
  // 开启语义映射。
  semantic: true,
  // 开启跳转/引用导航映射。
  navigation: true,
}

// 把 EnhancedMapping 转成 Volar 需要的 content segment 数组。
function buildSegmentsFromMapping(
  // 生成后的完整代码文本。
  generatedCode: string,
  // 归一化映射数组。
  mapping: EnhancedMapping[],
  // source block 名称，例如 script 或 scriptSetup。
  sourceName: string
): (string | [string, string, number, VueCodeInformation])[] {
  // 初始化 segment 容器，既可以装纯字符串，也可以装映射元组。
  const segments: (string | [string, string, number, VueCodeInformation])[] = []
  // 先过滤非法映射并按 generated offset 排序，保证拼接顺序正确。
  const sorted = mapping
    // 过滤掉缺失 offset/length 的无效项，防止切片越界或错位。
    .filter(item => {
      // 读取 source 起点。
      const sourceStart = item.original?.offset
      // 读取 generated 起点。
      const generatedStart = item.generated?.offset
      // 读取 generated 长度。
      const generatedLength = item.generated?.length
      // 仅保留三个值都合法的映射项。
      return (
        // sourceStart 必须是数字。
        typeof sourceStart === 'number' &&
        // sourceStart 不能为负。
        sourceStart >= 0 &&
        // generatedStart 必须是数字。
        typeof generatedStart === 'number' &&
        // generatedStart 不能为负。
        generatedStart >= 0 &&
        // generatedLength 必须是数字。
        typeof generatedLength === 'number' &&
        // generatedLength 必须大于 0 才有意义。
        generatedLength > 0
      )
    })
    // 用 generated offset 升序，确保代码按目标文本线性输出。
    .sort((a, b) => (a.generated.offset - b.generated.offset))

  // cursor 表示当前已经处理到 generatedCode 的哪个位置。
  let cursor = 0
  // 逐条映射构造 segment。
  for (const item of sorted) {
    // 取 source 起点，作为 Volar 映射源 offset。
    const sourceStart = item.original.offset
    // 取 generated 起点，作为目标代码切片开始。
    const generatedStart = item.generated.offset
    // 计算 generated 结束位置，作为目标代码切片结束。
    const generatedEnd = generatedStart + item.generated.length

    // 若出现重叠映射，跳过当前项，避免重复写入导致映射紊乱。
    if (generatedStart < cursor) {
      // 直接进入下一项。
      continue
    }
    // 如果映射之间有 gap，先把 gap 作为纯字符串写入，保持代码完整。
    if (generatedStart > cursor) {
      // 写入 gap 文本，这部分没有 source 映射信息。
      segments.push(generatedCode.slice(cursor, generatedStart))
    }

    // 按映射范围切出当前映射文本。
    const mappedText = generatedCode.slice(generatedStart, generatedEnd)
    // 空文本不写入，避免无效 segment。
    if (mappedText.length > 0) {
      // 写入映射 segment：文本 + sourceName + sourceOffset + 特性。
      segments.push([mappedText, sourceName, sourceStart, ALL_CODE_FEATURES])
    }
    // 更新 cursor 到当前映射结束位置。
    cursor = generatedEnd
  }

  // 末尾如果还有未覆盖文本，作为纯字符串补上，保证输出完整。
  if (cursor < generatedCode.length) {
    // 追加尾部未映射文本。
    segments.push(generatedCode.slice(cursor))
  }

  // 极端情况下如果一个 segment 都没生成，退化为整段 identity 映射。
  if (segments.length === 0) {
    // 用整段映射兜底，避免 virtual file 为空导致功能异常。
    segments.push([generatedCode, sourceName, 0, ALL_CODE_FEATURES])
  }

  // 返回供 embeddedFile.content 直接使用的 segment 数组。
  return segments
}

// 选择本次要处理的主脚本块，优先 scriptSetup，其次 script。
function getPrimaryTesttsBlock(sfc: SfcLike): SfcScriptLike | undefined {
  // scriptSetup 是 Vue3 主流写法，优先处理它可减少歧义。
  if (isTesttsScriptBlock(sfc.scriptSetup)) return sfc.scriptSetup ?? undefined
  // 如果没有 scriptSetup，再看普通 script。
  if (isTesttsScriptBlock(sfc.script)) return sfc.script ?? undefined
  // 都不是 testts 时返回 undefined，表示插件无需介入。
  return undefined
}

// 定义 VueLanguagePlugin 主体函数，接收模块上下文并返回插件实例。
const plugin: VueLanguagePlugin = ({ modules }) => {
  // 取出 TypeScript 模块，后面 compileSFCScript 要用它创建 SourceFile。
  const ts = modules.typescript
  // 记录 TS 版本，排查不同 TS 版本行为差异时很有用。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  // 明确当前模式，方便你在日志里确认跑的是哪条链路。
  Glog.info('[language-plugin-testts] mode=resolveEmbeddedCode_script_ts_with_mapping')

  // 返回插件对象，供 Vue language-core 调用。
  return {
    // 插件名称，用于日志和调试识别。
    name: 'language-plugin-testts',
    // 插件协议版本，需与当前 Vue language-tools 兼容。
    version: 2.2,
    // 设置较大的 order，保证在内置 vue-tsx 之后执行覆盖 script_ts。
    order: 10000,

    // 自定义脚本编译入口：当 lang 是 testts 时提供 TS AST。
    compileSFCScript(lang, script) {
      // 非 testts 直接放过，避免影响其他语言脚本。
      if (lang !== 'testts') return

      // 进入受保护逻辑，避免 transform 抛错导致插件整体失效。
      try {
        // 执行真实 transform，得到 TS 代码。
        const transformed = transformTesttsToTs(script)
        // 用 TS API 按 .ts 解析生成 SourceFile，供后续 range/分析链路使用。
        return ts.createSourceFile('.ts', transformed.code, 99)
      } catch (error: any) {
        // 抓取错误信息，便于日志排查具体失败原因。
        const message = error?.message || String(error)
        // 打印告警说明本次进入了 compile 回退分支。
        Glog.warn(`[testts] compileSFCScript transform failed, fallback ts parser: error=${message}`)
        // 回退为直接解析原脚本文本，保证不因为 transform 错误中断语言服务。
        return ts.createSourceFile('.ts', script, 99)
      }
    },

    // 自定义 embedded code：接管 script_ts 内容并写入 transform + mapping 结果。
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      // 只处理 script_ts，避免误改其他虚拟文件。
      if (embeddedFile.id !== 'script_ts') return

      // 选出 testts 主脚本块，没有就直接结束。
      const target = getPrimaryTesttsBlock(sfc as SfcLike)
      // 未命中 testts 块时，不做任何修改。
      if (!target) return

      // 读取源代码文本，空值时兜底为空串。
      const sourceCode = typeof target.content === 'string' ? target.content : ''
      // 计算 sourceName，优先用 block.name，否则按块类型回退。
      const sourceName = target.name || (target === (sfc as SfcLike).scriptSetup ? 'scriptSetup' : 'script')

      // 进入受保护逻辑，避免 transform 抛错破坏 embedded 输出。
      try {
        // 执行 transform 获得代码和映射。
        const transformed = transformTesttsToTs(sourceCode)
        // 把映射转成 Volar 所需 segment 结构。
        const segments = buildSegmentsFromMapping(transformed.code, transformed.mapping, sourceName)
        // 覆盖 script_ts 内容，使右侧虚拟文件展示 transform 后结果。
        embeddedFile.content = segments as any
        // 输出成功日志，带上文件、源块、代码长度、映射条数便于核查。
        Glog.info(
          `[testts] resolveEmbeddedCode(script_ts) transformed: file=${fileName}, source=${sourceName}, codeLen=${transformed.code.length}, mapTokens=${transformed.mapping.length}`
        )
      } catch (error: any) {
        // 抓取错误信息，便于排查 transform 失败原因。
        const message = error?.message || String(error)
        // 回退 identity 映射，确保语言功能可用而不是直接失效。
        embeddedFile.content = [[sourceCode, sourceName, 0, ALL_CODE_FEATURES]] as any
        // 输出失败日志，明确本次走了回退分支。
        Glog.warn(
          `[testts] resolveEmbeddedCode(script_ts) transform failed, fallback identity: file=${fileName}, source=${sourceName}, error=${message}`
        )
      }
    },
  }
}

// 导出插件默认实例，供外部配置直接引入。
export default plugin
