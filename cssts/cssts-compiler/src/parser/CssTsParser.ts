import CssTsTokenConsumer, { cssTsTokens } from "./CssTsTokenConsumer.js"
import { Subhuti, SubhutiRule } from 'subhuti'
import {
  QinParser,
  ExpressionParams as GeneratedExpressionParams,
  type ExpressionParams
} from "@qin/generated-qin-parser-ts"
import { normalizeGeneratedTokens } from "./generated-runtime-adapter.ts"

export class CssTsParserOptions<T extends CssTsTokenConsumer = CssTsTokenConsumer> {
  tokenConsumer: CssTsTokenConsumer
  tokenDefinitions: any

  constructor(tokenConsumer: CssTsTokenConsumer = new CssTsTokenConsumer(), tokenDefinitions: any = cssTsTokens) {
    this.tokenConsumer = tokenConsumer
    this.tokenDefinitions = tokenDefinitions
  }
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
  tokenConsumer: CssTsTokenConsumer

  constructor(sourceCode: string = '', options: CssTsParserOptions<T> | null = null) {
    super(sourceCode)
    const effectiveOptions: CssTsParserOptions<T> = options == null
      ? new CssTsParserOptions<T>()
      : options
    const consumer: CssTsTokenConsumer = effectiveOptions.tokenConsumer
    consumer.setParser(this)
    ;(this as any).__qin_field_tokenConsumer = consumer
    this.tokenConsumer = consumer
  }

  get parsedTokens(): any[] {
    const tokens = typeof (this as any).getParsedTokens === 'function'
      ? (this as any).getParsedTokens()
      : (this as any).__qin_field_parsedTokens
    return normalizeGeneratedTokens(tokens)
  }

  expressionParamsWith(params: ExpressionParams | null = null): ExpressionParams {
    const effectiveParams: ExpressionParams = params == null
      ? new GeneratedExpressionParams() as ExpressionParams
      : params
    return new GeneratedExpressionParams(effectiveParams.in(), effectiveParams.yield(), effectiveParams.await()) as ExpressionParams
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
    const expressionParams: ExpressionParams = this.expressionParamsWith(params)
    this.consumeIdentifierValue('css')
    if (this.tokenNameAt(1) === 'LBrace') {
      this.CssStyleObject(expressionParams)
    } else {
      this.tokenConsumer.IdentifierName()
    }
    return this.getCurCst()
  }

  /**
   * CssStyleObject - css 样式对象
   * 
   * 语法：{ element1, element2, ... }
   */
  @SubhutiRule
  CssStyleObject(params: ExpressionParams = {} as any) {
    this.tokenConsumer.LBrace()
    if (this.tokenNameAt(1) !== 'RBrace') {
      this.CssAtomList()
    }
    this.tokenConsumer.RBrace()
    return this.getCurCst()
  }

  @SubhutiRule
  CssAtomList() {
    this.tokenConsumer.IdentifierName()
    while (this.tokenNameAt(1) === 'Comma') {
      this.tokenConsumer.Comma()
      this.tokenConsumer.IdentifierName()
    }
    return this.getCurCst()
  }

  /**
   * 重写 PrimaryExpression，添加 CssExpression 支持
   * 
   * 注意：CssExpression 以 'css' 软关键字开头，
   * 必须放在 IdentifierReference 之前，否则 'css' 会被当作普通标识符
   */
  @SubhutiRule
  PrimaryExpression(params: ExpressionParams = {} as any) {
    const expressionParams: ExpressionParams = this.expressionParamsWith(params)
    if (this.matchIdentifierValue('css')) {
      return this.CssExpression(expressionParams)
    }
    return super.PrimaryExpression(expressionParams)
  }
}
