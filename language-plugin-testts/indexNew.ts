// 只引入插件类型，确保导出对象符合 Vue 语言插件接口，避免运行时额外依赖。
import type { VueLanguagePlugin } from '@vue/language-core'
// 复用官方 SFC 解析器，保证和 Volar 对 descriptor 的理解完全一致。
import { parse as parseSfc } from '@vue/language-core/lib/utils/parseSfc.js'
// C 层需要执行 parser，因此引入 slime-parser 的 parser 与 CST->AST 工具。
import { SlimeParser, SlimeCstToAstUtils } from 'slime-parser'
// G 层需要真实生成代码，因此引入 slime-generator。
import { SlimeGenerator } from 'slime-generator'
// 统一用 glog 输出调试信息，方便在 .glog 里确认插件是否生效。
import Glog from 'glogjs'

// 固定版本号用于日志定位，排查时能明确当前运行的是哪一版代码。
const PLUGIN_VERSION = '1.0.22-testts-G-script-ts-only'

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

// 定义 generator 返回 mapping 的最小结构，便于后续统一处理。
type RawMapping = {
  // source 保存原始文本坐标。
  source?: { index?: number, length?: number }
  // generate 保存生成文本坐标。
  generate?: { index?: number, length?: number }
}

// 归一化后的 mapping 结构，字段均为已校验的数字坐标。
type NormalizedMapping = {
  // 原文起始 offset。
  sourceStart: number
  // 原文结束 offset。
  sourceEnd: number
  // 生成文本起始 offset。
  generatedStart: number
  // 生成文本结束 offset。
  generatedEnd: number
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

// 真实执行 parse + ast + generate，返回生成文本与原始 mapping。
function runRealTransform(sourceCode: string): { generatedCode: string, rawMappings: RawMapping[], changed: boolean } {
  // 构造 parser，输入就是当前脚本原文。
  const parser = new SlimeParser(sourceCode)
  // 执行 Program 规则得到 CST。
  const cst = parser.Program()
  // 把 CST 转成 AST，供 generator 使用。
  const ast = SlimeCstToAstUtils.toProgram(cst)
  // 执行代码生成，得到生成文本与 mapping。
  const generated = SlimeGenerator.generator(ast, parser.parsedTokens)
  // 兜底确保 generatedCode 永远是字符串。
  const generatedCode = typeof generated.code === 'string' ? generated.code : sourceCode
  // 兜底确保 mappings 永远是数组。
  const rawMappings = Array.isArray(generated.mapping) ? (generated.mapping as RawMapping[]) : []
  // 标记生成文本是否与原文不同，便于日志观察行为。
  const changed = generatedCode !== sourceCode
  // 返回 transform 结果给 resolveEmbeddedCode。
  return { generatedCode, rawMappings, changed }
}

// 过滤并归一化 raw mapping，移除无效区间与重叠区间。
function normalizeMappings(
  // 原始 mapping 数组。
  rawMappings: RawMapping[],
  // 原文总长度，用于越界校验。
  sourceLength: number,
  // 生成文本总长度，用于越界校验。
  generatedLength: number
): NormalizedMapping[] {
  // 先收集通过基础校验的 mapping。
  const normalized: NormalizedMapping[] = []
  // 遍历原始 mapping 并做数值化与边界校验。
  for (const mapping of rawMappings) {
    // 读取 source 起点。
    const sourceStart = Number(mapping.source?.index)
    // 读取 source 长度。
    const sourceLen = Number(mapping.source?.length)
    // 读取 generate 起点。
    const generatedStart = Number(mapping.generate?.index)
    // 读取 generate 长度。
    const generatedLen = Number(mapping.generate?.length)
    // 任何非数字输入都直接丢弃。
    if (!Number.isFinite(sourceStart) || !Number.isFinite(sourceLen) || !Number.isFinite(generatedStart) || !Number.isFinite(generatedLen)) continue
    // 非正长度区间直接丢弃。
    if (sourceLen <= 0 || generatedLen <= 0) continue
    // 计算 source 结束位置。
    const sourceEnd = sourceStart + sourceLen
    // 计算 generate 结束位置。
    const generatedEnd = generatedStart + generatedLen
    // 任一越界都丢弃，避免写入非法区间。
    if (sourceStart < 0 || generatedStart < 0 || sourceEnd > sourceLength || generatedEnd > generatedLength) continue
    // 收集有效区间。
    normalized.push({ sourceStart, sourceEnd, generatedStart, generatedEnd })
  }
  // 按生成区间排序，便于后续去重叠和按顺序写入。
  normalized.sort((a, b) => {
    // 优先按生成起点排序。
    if (a.generatedStart !== b.generatedStart) return a.generatedStart - b.generatedStart
    // 起点相同则按终点排序。
    return a.generatedEnd - b.generatedEnd
  })
  // 二次过滤：去掉与前一区间重叠的映射，保证输出单调。
  const nonOverlapping: NormalizedMapping[] = []
  // 记录上一个区间的生成终点。
  let lastGeneratedEnd = -1
  // 顺序扫描并剔除重叠段。
  for (const mapping of normalized) {
    // 与已有区间重叠则跳过。
    if (mapping.generatedStart < lastGeneratedEnd) continue
    // 保留当前区间。
    nonOverlapping.push(mapping)
    // 更新终点游标。
    lastGeneratedEnd = mapping.generatedEnd
  }
  // 返回最终可用 mapping。
  return nonOverlapping
}

// 按 mapping 将生成文本写入 embedded content，同时保留未映射 gap 文本。
function applyMappedSegments(
  // 目标 embedded file（只使用 content）。
  embeddedFile: { content: any[] },
  // segment 来源块名。
  scriptBlockName: string,
  // 生成后的完整文本。
  generatedCode: string,
  // 已归一化映射区间。
  mappings: NormalizedMapping[]
): { mappedSegments: number, gapSegments: number } {
  // features 与 identity 保持一致，保证能力面不变。
  const features = {
    verification: true,
    completion: true,
    semantic: true,
    navigation: true,
    structure: true,
    format: true,
  }
  // 清空旧内容，准备写入新分段。
  embeddedFile.content.length = 0
  // 记录映射段数量。
  let mappedSegments = 0
  // 记录 gap 段数量。
  let gapSegments = 0
  // 生成文本游标。
  let lastGeneratedEnd = 0
  // 顺序应用每一个 mapping。
  for (const mapping of mappings) {
    // 若当前 mapping 前存在 gap，先写入纯文本 gap。
    if (mapping.generatedStart > lastGeneratedEnd) {
      // 取出 gap 文本。
      const gapText = generatedCode.slice(lastGeneratedEnd, mapping.generatedStart)
      // 仅非空文本才写入。
      if (gapText) {
        // gap 写为纯字符串段（无映射）。
        embeddedFile.content.push(gapText)
        // 统计 gap 数量。
        gapSegments++
      }
    }
    // 取出当前 mapping 对应的生成文本。
    const mappedText = generatedCode.slice(mapping.generatedStart, mapping.generatedEnd)
    // 空文本段直接跳过，避免噪音映射。
    if (!mappedText) {
      // 推进游标避免重复处理。
      lastGeneratedEnd = Math.max(lastGeneratedEnd, mapping.generatedEnd)
      // 继续下一个映射。
      continue
    }
    // 写入映射主段，锚定到 sourceStart。
    embeddedFile.content.push([mappedText, scriptBlockName, mapping.sourceStart, features])
    // 写入空尾段，锚定到 sourceEnd，维持边界行为稳定。
    embeddedFile.content.push(['', scriptBlockName, mapping.sourceEnd, features])
    // 统计映射段数量。
    mappedSegments++
    // 推进游标到当前映射末尾。
    lastGeneratedEnd = Math.max(lastGeneratedEnd, mapping.generatedEnd)
  }
  // 若末尾仍有未映射文本，作为 tail gap 写入。
  if (lastGeneratedEnd < generatedCode.length) {
    // 取出 tail 文本。
    const tailText = generatedCode.slice(lastGeneratedEnd)
    // 非空才写入，避免空串段。
    if (tailText) {
      // 写入 tail 纯文本段。
      embeddedFile.content.push(tailText)
      // 统计 gap 数量。
      gapSegments++
    }
  }
  // 返回写入统计，便于日志分析。
  return { mappedSegments, gapSegments }
}

// 按 VueLanguagePlugin 工厂签名创建插件实例。
const plugin: VueLanguagePlugin = ({ modules }) => {
  // 读取当前注入的 TypeScript 实例，仅用于日志确认版本。
  const ts = modules.typescript
  // 打印 TS 版本，排查环境差异。
  Glog.info(`[language-plugin-testts] Plugin loaded, TypeScript version: ${ts?.version || 'unknown'}`)
  // 明确当前模式：仅 script_ts 做 G 变换，scriptsetup_raw 保持默认行为。
  Glog.info('[language-plugin-testts] mode=G_REAL_TRANSFORM_SCRIPT_TS_ONLY (transform/mapping only for script_ts)')

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

    // G 层：仅对 script_ts 执行真实 transform，成功应用 mapping，失败回退 identity。
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      // 只处理 script_ts，避免污染 scriptsetup_raw 展示层。
      if (embeddedFile.id !== 'script_ts') return
      // 对应到 SFC 的主脚本来源，优先 script setup。
      const scriptBlock = (sfc.scriptSetup || sfc.script)
      // 只有 testts 来源脚本才接管，普通 ts/js 继续走默认流程。
      if (!isTesttsScriptBlock(scriptBlock as SfcScriptLike | null | undefined)) return
      // 拿到原文；缺失时降级为空字符串，保证结构稳定。
      const sourceCode = typeof (scriptBlock as SfcScriptLike | undefined)?.content === 'string'
        ? ((scriptBlock as SfcScriptLike).content as string)
        : ''
      // 给 segment 设置稳定脚本名，缺失时用 scriptSetup 作为兜底名。
      const scriptBlockName = ((scriptBlock as SfcScriptLike | undefined)?.name || 'scriptSetup')
      // 真实 transform 过程全部放在 try 内，异常时统一回退 identity。
      try {
        // 执行 parse+ast+generate，拿到生成文本与原始 mapping。
        const transformed = runRealTransform(sourceCode)
        // 对 mapping 做归一化与清洗，避免非法区间影响服务。
        const mappings = normalizeMappings(transformed.rawMappings, sourceCode.length, transformed.generatedCode.length)
        // 只要生成文本为空或 mapping 为空，就回退 identity 保持稳定。
        if (!transformed.generatedCode.length || mappings.length === 0) {
          // 记录回退原因，方便定位是生成空还是 mapping 丢失。
          Glog.warn(
            `[testts] resolveEmbeddedCode(G) fallback identity: file=${fileName}, id=${embeddedFile.id}, `
            + `srcLen=${sourceCode.length}, genLen=${transformed.generatedCode.length}, rawMappings=${transformed.rawMappings.length}, validMappings=${mappings.length}`
          )
          // 回退到 identity，确保提示链路不断。
          applyIdentitySegments(embeddedFile as { content: any[] }, scriptBlockName, sourceCode)
          // 回退后直接结束。
          return
        }
        // 应用 mapping 分段写入，生成最终 embedded 内容。
        const applied = applyMappedSegments(
          embeddedFile as { content: any[] },
          scriptBlockName,
          transformed.generatedCode,
          mappings
        )
        // 输出 G 层日志，记录 transform 与 mapping 的关键统计。
        Glog.info(
          `[testts] resolveEmbeddedCode(G): file=${fileName}, id=${embeddedFile.id}, `
          + `srcLen=${sourceCode.length}, genLen=${transformed.generatedCode.length}, changed=${transformed.changed}, `
          + `rawMappings=${transformed.rawMappings.length}, validMappings=${mappings.length}, `
          + `mappedSegments=${applied.mappedSegments}, gapSegments=${applied.gapSegments}, segments=${embeddedFile.content.length}`
        )
      } catch (error: any) {
        // 收敛错误信息，避免异常中断编辑链路。
        const message = error?.message || String(error)
        // 记录 transform 异常并回退 identity。
        Glog.warn(`[testts] resolveEmbeddedCode(G) transform failed: file=${fileName}, id=${embeddedFile.id}, error=${message}`)
        // 异常时必须回退 identity，确保语法提示不中断。
        applyIdentitySegments(embeddedFile as { content: any[] }, scriptBlockName, sourceCode)
      }
      // 返回结束，避免额外逻辑干扰。
      return
    },
  }
}

// 导出默认插件，供 tsconfig 的 vueCompilerOptions.plugins 加载。
export default plugin
