// 只引入插件类型，确保导出对象符合 Vue 语言插件接口，避免运行时额外依赖。
import type { VueLanguagePlugin } from '@vue/language-core'
// 复用官方 SFC 解析器，保证和 Volar 对 descriptor 的理解完全一致。
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
// C 层需要执行 parser，因此引入 slime-parser 的 parser 与 CST->AST 工具。
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
// 统一用 glog 输出调试信息，方便在 .glog 里确认插件是否生效。
import Glog from 'glogjs'

// 固定版本号用于日志定位，排查时能明确当前运行的是哪一版代码。
const PLUGIN_VERSION = '1.0.20-testts-C-parser-only'

// 初始化日志系统并开启 debug 级别，保证关键路径日志不会丢。
Glog.init({ level: 'debug' })
// 启动即打印版本日志，确认插件确实被加载。
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

// 只声明我们真正会访问的 script/scriptSetup 字段，降低类型复杂度。
type SfcScriptLike = {
  // name 用于 embedded segment 里标记来源脚本块名。
  name?: string
  // content 是脚本原文，B 层 identity 写入会直接使用它。
  content?: string
  // lang 是核心判定字段，用来识别 testts 或 ts。
  lang?: string
  // attrs.lang 有时也会携带语言信息，所以保留这个字段。
  attrs?: Record<string, string | true>
}

// 定义 parseSFC2 返回对象中我们关注的最小 descriptor 结构。
type ParsedSfcLike = {
  // 只关心 descriptor，因为语言改写发生在这里。
  descriptor: {
    // 普通 <script> 可能存在，也可能不存在。
    script?: SfcScriptLike | null
    // <script setup> 同理，也需要同样处理。
    scriptSetup?: SfcScriptLike | null
  }
}

// 抽成函数避免判定逻辑在多处重复。
function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean {
  // 没有脚本块直接返回 false，避免后续访问空对象。
  if (!block) return false
  // 优先检查标准 lang 字段，这是最常见输入。
  if (block.lang === 'testts') return true
  // 兜底检查 attrs.lang，兼容解析细节差异。
  return block.attrs?.lang === 'testts'
}

// 统一在一个函数里完成 testts->ts 改写，便于维护和复用。
function patchSfcScriptLangForVolar(sfc: ParsedSfcLike): boolean {
  // 用标记告诉调用方这次是否真的发生了改写。
  let patched = false
  // 把 script 与 scriptSetup 放到同一数组统一遍历。
  const blocks = [sfc.descriptor.script, sfc.descriptor.scriptSetup]
  // 逐块处理，保证两种脚本写法都覆盖到。
  for (const block of blocks) {
    // 非 testts 块不改，避免影响普通 ts/js。
    if (!isTesttsScriptBlock(block)) continue
    // 只有当前不是 ts 时才改，减少不必要写操作。
    if (block && block.lang !== 'ts') {
      // 关键动作：只改语言名字，让后续链路按原生 ts 处理。
      block.lang = 'ts'
      // 记录发生过改写，用于决定是否返回 sfc 覆盖默认解析结果。
      patched = true
    }
  }
  // 返回改写结果给 parseSFC2，避免无改动时干预默认行为。
  return patched
}

// 统一封装 identity 写入逻辑，避免在 resolveEmbeddedCode 中重复。
function applyIdentitySegments(
  // embeddedFile 只使用 content 字段即可满足 B 层需求。
  embeddedFile: { content: any[] },
  // scriptBlockName 用于 segment 的来源名，便于 Volar 追踪。
  scriptBlockName: string,
  // sourceCode 是原始脚本文本，B 层要求写入不变更文本。
  sourceCode: string
) {
  // features 全开，保持和默认脚本能力一致（补全/语义/导航等）。
  const features = {
    verification: true,
    completion: true,
    semantic: true,
    navigation: true,
    structure: true,
    format: true,
  }
  // 先清空已有分段，避免残留旧数据。
  embeddedFile.content.length = 0
  // 写入主段：文本原样、offset 从 0 开始，属于 identity 映射。
  embeddedFile.content.push([sourceCode, scriptBlockName, 0, features])
  // 写入收尾空段：锚定末尾偏移，兼容 Volar 对边界的处理。
  embeddedFile.content.push(['', scriptBlockName, sourceCode.length, features])
}

// C 层只执行 parser，不消费结果，用于验证 parser 本身是否影响提示链路。
function runParserOnly(sourceCode: string) {
  // 构造 parser，输入就是当前脚本原文。
  const parser = new SlimeParser(sourceCode)
  // 执行 Program 规则得到 CST。
  const cst = parser.Program()
  // 把 CST 转成 AST；结果故意不使用，仅确认链路可跑通。
  SlimeCstToAstUtils.toProgram(cst)
}

// 按 VueLanguagePlugin 工厂签名创建插件实例。
const plugin: VueLanguagePlugin = ({ modules }) => {
  // 读取当前注入的 TypeScript 实例，仅用于日志确认版本。
  const ts = modules.typescript
  // 打印 TS 版本，排查环境差异。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  // 明确当前模式是 C 层：parseSFC2 改 lang + parser only + identity 写入。
  Glog.info('[language-plugin-testts] mode=C_PARSER_ONLY (parseSFC2 alias + parser only + identity write)')

  // 返回真正给 Volar 使用的插件对象。
  return {
    // 指定插件名，便于日志与调试定位。
    name: 'language-plugin-testts',
    // 保持与既有插件接口版本一致，避免加载行为变化。
    version: 2.2,
    // 提前执行，确保在后续处理前先把 testts 改成 ts。
    order: -10000,

    // 只在 parseSFC2 入口改 descriptor，不碰 embedded 内容。
    parseSFC2(fileName, languageId, content) {
      // 非 vue 文件直接跳过，避免污染其他文件类型。
      if (languageId !== 'vue') return

      // 用官方解析器把 SFC 文本转成 descriptor 结构。
      const sfc = parseSfc(content) as ParsedSfcLike
      // 执行最小改写：仅 testts->ts。
      const patched = patchSfcScriptLangForVolar(sfc)
      // 没有 testts 就不返回，交给默认流程处理。
      if (!patched) return

      // 输出命中日志，确认该文件确实被改写。
      Glog.info(`[testts] parseSFC2 intercepted: patched script lang testts->ts for ${fileName}`)
      // 返回改写后的 descriptor，让后续链路像原生 ts 一样工作。
      return sfc
    },

    // C 层：先跑 parser（结果不用），再对脚本 embedded 写入 identity 文本。
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      // 仅处理脚本虚拟文件，避免影响模板或样式链路。
      if (embeddedFile.id !== 'script_ts' && embeddedFile.id !== 'scriptsetup_raw') return
      // 按 embedded id 优先选择对应脚本块，保证 script 与 script setup 对齐。
      const scriptBlock = embeddedFile.id === 'scriptsetup_raw'
        ? (sfc.scriptSetup || sfc.script)
        : (sfc.script || sfc.scriptSetup)
      // 只有 testts 来源脚本才接管，普通 ts/js 继续走默认流程。
      if (!isTesttsScriptBlock(scriptBlock as SfcScriptLike | null | undefined)) return
      // 拿到原文；缺失时降级为空字符串，保证结构稳定。
      const sourceCode = typeof (scriptBlock as SfcScriptLike | undefined)?.content === 'string'
        ? ((scriptBlock as SfcScriptLike).content as string)
        : ''
      // C 层只验证 parser 可执行；解析失败只记录日志，不改变输出策略。
      try {
        // 执行 parser + CST->AST，但不使用解析结果。
        runParserOnly(sourceCode)
      } catch (error: any) {
        // 收敛错误信息，避免异常中断编辑链路。
        const message = error?.message || String(error)
        // 记录 parser 失败，便于和 B 层对比。
        Glog.warn(`[testts] parser-only failed: file=${fileName}, id=${embeddedFile.id}, error=${message}`)
      }
      // 给 segment 设置稳定脚本名，缺失时用 scriptSetup 作为兜底名。
      const scriptBlockName = ((scriptBlock as SfcScriptLike | undefined)?.name || 'scriptSetup')
      // 执行 identity 写入：文本完全不变，仅显式写入 embedded content。
      applyIdentitySegments(embeddedFile as { content: any[] }, scriptBlockName, sourceCode)
      // 输出 C 层日志，确认 parser-only 与 identity 写入都已执行。
      Glog.info(
        `[testts] resolveEmbeddedCode(C): file=${fileName}, id=${embeddedFile.id}, sourceLen=${sourceCode.length}, segments=${embeddedFile.content.length}`
      )
      // 返回结束，避免额外逻辑干扰。
      return
    },
  }
}

// 导出默认插件，供 tsconfig 的 vueCompilerOptions.plugins 加载。
export default plugin
