import CssTsTokenConsumer, { cssTsTokens } from "./CssTsTokenConsumer.js"
import { Subhuti, SubhutiRule } from 'subhuti'
import type { SubhutiParserOptions } from 'subhuti'
import { SlimeParser } from "slime-parser"
import type { ExpressionParams } from "slime-parser"
import { Alternative } from "java:com.subhuti.parser"

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
export default class CssTsParser<T extends CssTsTokenConsumer = CssTsTokenConsumer> extends SlimeParser<T> {
  constructor(sourceCode: string = '', options?: SubhutiParserOptions<T>) {
    super(sourceCode, options ?? {
      tokenConsumer: CssTsTokenConsumer as any,
      tokenDefinitions: cssTsTokens
    })
  }

  /**
   * CssExpression - css 表达式
   * 
   * 语法：
   *   css { element1, element2, ... }
   *   css atomName
   */
  @SubhutiRule
  CssExpression(params: ExpressionParams = {}) {
    this.consumeIdentifierValue("css")
    this.Or(
      Alternative.of(() => this.CssStyleObject(params)),
      Alternative.of(() => this.getTokenConsumer().IdentifierName())
    )
    return this.getCurCst()
  }

  /**
   * CssStyleObject - css 样式对象
   * 
   * 语法：{ element1, element2, ... }
   */
  @SubhutiRule
  CssStyleObject(params: ExpressionParams = {}) {
    this.getTokenConsumer().LBrace()
    this.Option(() => {
      this.ElementList(params)
    })
    this.getTokenConsumer().RBrace()
    return this.getCurCst()
  }

  /**
   * 重写 PrimaryExpression，添加 CssExpression 支持
   * 
   * 注意：CssExpression 以 'css' 软关键字开头，
   * 必须放在 IdentifierReference 之前，否则 'css' 会被当作普通标识符
   */
  @SubhutiRule
  PrimaryExpression(params: ExpressionParams = {}) {
    return this.Or(
      // === 1. 硬关键字表达式 ===
      Alternative.of(() => this.getTokenConsumer().This()),

      // === 2. async 开头（软关键字，必须在 IdentifierReference 之前）===
      Alternative.of(() => this.AsyncGeneratorExpression()),
      Alternative.of(() => this.AsyncFunctionExpression()),

      // === 3. css 表达式（软关键字，必须在 IdentifierReference 之前）===
      Alternative.of(() => this.CssExpression(params)),

      // === 4. 标识符（在所有软关键字表达式之后）===
      Alternative.of(() => this.IdentifierReference(params)),

      // === 5. 字面量 ===
      Alternative.of(() => this.Literal()),

      // === 6. function 开头（硬关键字）===
      Alternative.of(() => this.GeneratorExpression()),
      Alternative.of(() => this.FunctionExpression()),

      // === 7. class 表达式（硬关键字）===
      Alternative.of(() => this.ClassExpression(params)),

      // === 8. 符号开头 ===
      Alternative.of(() => this.ArrayLiteral(params)),
      Alternative.of(() => this.ObjectLiteral(params)),
      Alternative.of(() => this.consumeRegularExpressionLiteral()),
      Alternative.of(() => this.TemplateLiteral({ ...params, Tagged: false })),
      Alternative.of(() => this.CoverParenthesizedExpressionAndArrowParameterList(params))
    )
  }
}
