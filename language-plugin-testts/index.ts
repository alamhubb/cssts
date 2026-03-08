// 只引入插件类型，确保导出对象符合 Vue 语言插件接口，避免运行时额外依赖。
import type { VueLanguagePlugin } from '@vue/language-core'
// 复用官方 SFC 解析器，保证和 Volar 对 descriptor 的理解完全一致。
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
// 统一用 glog 输出调试信息，方便在 .glog 里确认插件是否生效。
import Glog from 'glogjs'

// 固定版本号用于日志定位，排查时能明确当前运行的是哪一版代码。
const PLUGIN_VERSION = '1.0.18-testts-A-resolve-log-only'

// 初始化日志系统并开启 debug 级别，保证关键路径日志不会丢。
Glog.init({ level: 'debug' })
// 启动即打印版本日志，确认插件确实被加载。
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`)

// 只声明我们真正会访问的 script/scriptSetup 字段，降低类型复杂度。
type SfcScriptLike = {
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

// 按 VueLanguagePlugin 工厂签名创建插件实例。
const plugin: VueLanguagePlugin = ({ modules }) => {
  // 读取当前注入的 TypeScript 实例，仅用于日志确认版本。
  const ts = modules.typescript
  // 打印 TS 版本，排查环境差异。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  // 明确当前模式是 A 层：parseSFC2 改 lang + resolveEmbeddedCode 仅日志。
  Glog.info('[language-plugin-testts] mode=A_RESOLVE_LOG_ONLY (parseSFC2 alias + resolve logs, no embedded writes)')

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

    // A 层仅加日志：观察 resolveEmbeddedCode 调用顺序与 id，不修改内容。
    resolveEmbeddedCode(fileName, _sfc, embeddedFile) {
      // 先过滤，只记录脚本相关 embedded，避免日志噪音过大。
      if (!String(embeddedFile.id).includes('script')) return
      // 记录关键定位信息：文件、embedded id、当前 content 段数量。
      Glog.info(
        `[testts] resolveEmbeddedCode(A): file=${fileName}, id=${embeddedFile.id}, segments=${embeddedFile.content.length}`
      )
      // 明确不做任何写入，保持 baseline 行为不变。
      return
    },
  }
}

// 导出默认插件，供 tsconfig 的 vueCompilerOptions.plugins 加载。
export default plugin
