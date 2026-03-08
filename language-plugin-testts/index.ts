import type { VueLanguagePlugin } from '@vue/language-core' // 只引入插件类型，确保导出对象符合 Vue 语言插件接口，避免运行时额外依赖。
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js' // 复用官方 SFC 解析器，保证和 Volar 对 descriptor 的理解完全一致。
import Glog from 'glogjs' // 统一用 glog 输出调试信息，方便在 .glog 里确认插件是否生效。

const PLUGIN_VERSION = '1.0.17-testts-lang-alias-only' // 固定版本号用于日志定位，排查时能明确当前运行的是哪一版代码。

Glog.init({ level: 'debug' }) // 初始化日志系统并开启 debug 级别，保证关键路径日志不会丢。
Glog.info(`[language-plugin-testts v${PLUGIN_VERSION}] initialized`) // 启动即打印版本日志，确认插件确实被加载。

type SfcScriptLike = { // 只声明我们真正会访问的 script/scriptSetup 字段，降低类型复杂度。
  lang?: string // lang 是核心判定字段，用来识别 testts 或 ts。
  attrs?: Record<string, string | true> // attrs.lang 有时也会携带语言信息，所以保留这个字段。
} // 结束最小 script 块类型定义。

type ParsedSfcLike = { // 定义 parseSFC2 返回对象中我们关注的最小 descriptor 结构。
  descriptor: { // 只关心 descriptor，因为语言改写发生在这里。
    script?: SfcScriptLike | null // 普通 <script> 可能存在，也可能不存在。
    scriptSetup?: SfcScriptLike | null // <script setup> 同理，也需要同样处理。
  } // 结束 descriptor 最小结构。
} // 结束最小 SFC 解析结果类型。

function isTesttsScriptBlock(block: SfcScriptLike | null | undefined): boolean { // 抽成函数避免判定逻辑在多处重复。
  if (!block) return false // 没有脚本块直接返回 false，避免后续访问空对象。
  if (block.lang === 'testts') return true // 优先检查标准 lang 字段，这是最常见输入。
  return block.attrs?.lang === 'testts' // 兜底检查 attrs.lang，兼容解析细节差异。
} // 结束 testts 脚本块判定函数。

function patchSfcScriptLangForVolar(sfc: ParsedSfcLike): boolean { // 统一在一个函数里完成 testts->ts 改写，便于维护和复用。
  let patched = false // 用标记告诉调用方这次是否真的发生了改写。
  const blocks = [sfc.descriptor.script, sfc.descriptor.scriptSetup] // 把 script 与 scriptSetup 放到同一数组统一遍历。
  for (const block of blocks) { // 逐块处理，保证两种脚本写法都覆盖到。
    if (!isTesttsScriptBlock(block)) continue // 非 testts 块不改，避免影响普通 ts/js。
    if (block && block.lang !== 'ts') { // 只有当前不是 ts 时才改，减少不必要写操作。
      block.lang = 'ts' // 关键动作：只改语言名字，让后续链路按原生 ts 处理。
      patched = true // 记录发生过改写，用于决定是否返回 sfc 覆盖默认解析结果。
    } // 结束单个块改写逻辑。
  } // 结束所有脚本块遍历。
  return patched // 返回改写结果给 parseSFC2，避免无改动时干预默认行为。
} // 结束 lang 改写函数。

const plugin: VueLanguagePlugin = ({ modules }) => { // 按 VueLanguagePlugin 工厂签名创建插件实例。
  const ts = modules.typescript // 读取当前注入的 TypeScript 实例，仅用于日志确认版本。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`) // 打印 TS 版本，排查环境差异。
  Glog.info('[language-plugin-testts] mode=lang_alias_only (parseSFC2 only, no transform/mapping/embedded writes)') // 明确当前模式是“只改名字”，避免误判走了复杂路径。

  return { // 返回真正给 Volar 使用的插件对象。
    name: 'language-plugin-testts', // 指定插件名，便于日志与调试定位。
    version: 2.2, // 保持与既有插件接口版本一致，避免加载行为变化。
    order: -10000, // 提前执行，确保在后续处理前先把 testts 改成 ts。

    parseSFC2(fileName, languageId, content) { // 只在 parseSFC2 入口改 descriptor，不碰 embedded 内容。
      if (languageId !== 'vue') return // 非 vue 文件直接跳过，避免污染其他文件类型。

      const sfc = parseSfc(content) as ParsedSfcLike // 用官方解析器把 SFC 文本转成 descriptor 结构。
      const patched = patchSfcScriptLangForVolar(sfc) // 执行最小改写：仅 testts->ts。
      if (!patched) return // 没有 testts 就不返回，交给默认流程处理。

      Glog.info(`[testts] parseSFC2 intercepted: patched script lang testts->ts for ${fileName}`) // 输出命中日志，确认该文件确实被改写。
      return sfc // 返回改写后的 descriptor，让后续链路像原生 ts 一样工作。
    }, // 结束 parseSFC2 钩子实现。
  } // 结束插件对象。
} // 结束插件工厂函数。

export default plugin // 导出默认插件，供 tsconfig 的 vueCompilerOptions.plugins 加载。
