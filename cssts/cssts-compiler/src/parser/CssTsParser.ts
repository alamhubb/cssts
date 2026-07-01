import CssTsTokenConsumer, { cssTsTokens } from "./CssTsTokenConsumer.js"
import { Subhuti, SubhutiRule } from 'subhuti'
import type { SubhutiParserOptions } from 'subhuti'
import {
  QinParser,
  ExpressionParams as GeneratedExpressionParams,
  TemplateLiteralParams as GeneratedTemplateLiteralParams,
  type ExpressionParams
} from "@qin/generated-qin-parser-ts"
import { normalizeGeneratedTokens } from "./generated-runtime-adapter.ts"

const expressionParamsCache = new Map<string, any>()
const templateLiteralParamsCache = new Map<string, any>()

function expressionParamsWith(params: any = {}, overrides: Record<string, boolean> = {}) {
  const read = (key: string, defaultValue = false) => {
    const value = params?.[key]
    if (typeof value === 'function') return !!value.call(params)
    if (typeof value === 'boolean') return value
    const qinValue = params?.[`__qin_${key}`]
    if (typeof qinValue === 'function') return !!qinValue.call(params)
    return defaultValue
  }
  const inValue = Object.prototype.hasOwnProperty.call(overrides, 'In')
    ? !!overrides.In
    : read('in', true)
  const yieldValue = Object.prototype.hasOwnProperty.call(overrides, 'Yield')
    ? !!overrides.Yield
    : read('yield')
  const awaitValue = Object.prototype.hasOwnProperty.call(overrides, 'Await')
    ? !!overrides.Await
    : read('await')
  const key = `${inValue}:${yieldValue}:${awaitValue}`
  let stableParams = expressionParamsCache.get(key)
  if (!stableParams) {
    stableParams = new GeneratedExpressionParams(inValue, yieldValue, awaitValue)
    expressionParamsCache.set(key, stableParams)
  }
  return stableParams
}

function templateLiteralParamsWith(params: any = {}, tagged = false) {
  const expressionParams = expressionParamsWith(params)
  const inValue = typeof (expressionParams as any).__qin_in === 'function' ? !!(expressionParams as any).__qin_in() : true
  const yieldValue = typeof (expressionParams as any).__qin_yield === 'function' ? !!(expressionParams as any).__qin_yield() : false
  const awaitValue = typeof (expressionParams as any).__qin_await === 'function' ? !!(expressionParams as any).__qin_await() : false
  const key = `${inValue}:${yieldValue}:${awaitValue}:${tagged}`
  let stableParams = templateLiteralParamsCache.get(key)
  if (!stableParams) {
    stableParams = new GeneratedTemplateLiteralParams(inValue, yieldValue, awaitValue, tagged)
    templateLiteralParamsCache.set(key, stableParams)
  }
  return stableParams
}

/**
 * CssTsParser - CSS-in-TS 样式解析器
 * 
 * 支持的语法：
 * 
 * css 表达式 - 在任何表达式位置使用：
 *   const buttonBase = css { colorRed, fontBold }
 *   const styles = { primary: css { bgPrimary } }
 *   div(class = css { primaryButton, marginTop }) {}
 * 
 * 注意：不支持 css 声明语法（如 `css colorRed`），
 * 因为声明语法需要重写 Statement/Declaration 规则，
 * 会导致与标准 JS 语法冲突（如 async function）。
 * 推荐使用表达式语法，更灵活且不会破坏 JS 兼容性。
 */
@Subhuti
export default class CssTsParser<T extends CssTsTokenConsumer = CssTsTokenConsumer> extends QinParser<T> {
  constructor(sourceCode: string = '', options?: SubhutiParserOptions<T>) {
    super(sourceCode)
    const Consumer = (options?.tokenConsumer ?? CssTsTokenConsumer) as any
    const consumer = new Consumer()
    consumer.setParser(this)
    ;(this as any).__qin_field_tokenConsumer = consumer
    ;(this as any).tokenConsumer = consumer
  }

  get parsedTokens(): any[] {
    const tokens = typeof (this as any).getParsedTokens === 'function'
      ? (this as any).getParsedTokens()
      : (this as any).__qin_field_parsedTokens
    return normalizeGeneratedTokens(tokens)
  }

  /**
   * CssExpression - css 表达式
   * 
   * 语法：
   *   css { element1, element2, ... }
   *   css atomName
   */
  @SubhutiRule
  CssExpression(params: ExpressionParams = {} as any) {
    const expressionParams = expressionParamsWith(params) as ExpressionParams
    this.consumeIdentifierValue('css')
    this.Or(
      () => this.CssStyleObject(expressionParams),
      () => this.tokenConsumer.IdentifierName()
    )
    return this.curCst
  }

  /**
   * CssStyleObject - css 样式对象
   * 
   * 语法：{ element1, element2, ... }
   */
  @SubhutiRule
  CssStyleObject(params: ExpressionParams = {} as any) {
    const expressionParams = expressionParamsWith(params) as ExpressionParams
    this.tokenConsumer.LBrace()
    this.Option(() => {
      this.Or(
        () => this.ElementList(expressionParams),
        () => this.CssAtomList()
      )
    })
    this.tokenConsumer.RBrace()
    return this.curCst
  }

  @SubhutiRule
  CssAtomList() {
    this.tokenConsumer.IdentifierName()
    this.Many(() => {
      this.tokenConsumer.Comma()
      this.tokenConsumer.IdentifierName()
    })
    return this.curCst
  }

  /**
   * 重写 PrimaryExpression，添加 CssExpression 支持
   * 
   * 注意：CssExpression 以 'css' 软关键字开头，
   * 必须放在 IdentifierReference 之前，否则 'css' 会被当作普通标识符
   */
  @SubhutiRule
  PrimaryExpression(params: ExpressionParams = {} as any) {
    const expressionParams = expressionParamsWith(params) as ExpressionParams
    return this.Or(
      // === 1. 硬关键字表达式 ===
      () => this.tokenConsumer.This(),

      // === 2. async 开头（软关键字，必须在 IdentifierReference 之前）===
      () => this.AsyncGeneratorExpression(),
      () => this.AsyncFunctionExpression(),

      // === 3. css 表达式（软关键字，必须在 IdentifierReference 之前）===
      () => this.CssExpression(expressionParams),

      // === 4. 标识符（在所有软关键字表达式之后）===
      () => this.IdentifierReference(expressionParams),

      // === 5. 字面量 ===
      () => this.Literal(),

      // === 6. function 开头（硬关键字）===
      () => this.GeneratorExpression(),
      () => this.FunctionExpression(),

      // === 7. class 表达式（硬关键字）===
      () => this.ClassExpression(expressionParams),

      // === 8. 符号开头 ===
      () => this.ArrayLiteral(expressionParams),
      () => this.ObjectLiteral(expressionParams),
      () => this.consumeRegularExpressionLiteral(),
      () => this.TemplateLiteral(templateLiteralParamsWith(expressionParams, false) as any),
      () => this.CoverParenthesizedExpressionAndArrowParameterList(expressionParams)
    )
  }
}
