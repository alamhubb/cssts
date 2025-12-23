import { SlimeCstToAst, SlimeJavascriptCstToAstUtil } from "slime-parser"
import { SubhutiCst } from "subhuti"
import CssTsParser from "../parser/CssTsParser.js"
import {
  SlimeAstTypeName,
  type SlimeExpression,
  type SlimeStatement,
  type SlimeModuleDeclaration,
  type SlimeProgram,
  SlimeAstCreateUtils,
} from "slime-ast"
import { CSSTS_CONFIG, parseTsAtomName } from "../utils/cssClassName.js"

export interface CssStyleInfo {
  name: string
  isAtomic: boolean
  dependencies: string[]
  cssClassName: string
  loc?: any
}

export interface GroupUtilInfo {
  varName: string
  className: string
  pseudos: string[]
  atomNames: string[]
}

/**
 * CssTsCstToAst - CSS-in-TS CST 到 AST 转换器
 * 
 * 核心职责：
 * 1. 将 CssTsParser 解析出的 CST 转换为标准 ESTree AST
 * 2. 处理 css { } 表达式语法，转换为 cssts.$cls() 调用
 * 3. 收集使用的原子类名（usedAtoms），供 vite 插件生成 CSS
 * 4. 处理伪类变量（如 btn$$hover），注入运行时参数
 * 5. 作用域分析：区分局部变量和原子类名，支持自动解构
 */
export class CssTsCstToAst extends SlimeCstToAst {
  private cssStyles: Map<string, CssStyleInfo> = new Map()
  private usedAtoms: Set<string> = new Set()
  private currentVarName: string | null = null
  protected _hasCsstsSyntax = false
  private scopeStack: Set<string>[] = []

  constructor() {
    super()
  }

  private get currentScope(): Set<string> {
    if (this.scopeStack.length === 0) {
      this.scopeStack.push(new Set())
    }
    return this.scopeStack[this.scopeStack.length - 1]
  }

  private isInScope(name: string): boolean {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      if (this.scopeStack[i].has(name)) return true
    }
    return false
  }

  protected pushScope(): void {
    this.scopeStack.push(new Set())
  }

  protected popScope(): void {
    if (this.scopeStack.length > 0) this.scopeStack.pop()
  }

  protected addToScope(name: string): void {
    this.currentScope.add(name)
  }

  /**
   * 判断标识符是否是原子类名
   * 
   * 判断逻辑（作用域 + 命名规则）：
   * 1. 如果在作用域中 → 不是原子类（是变量）
   * 2. 如果符合原子类命名规则 → 是原子类
   * 3. 否则 → 不是原子类（保持原样）
   */
  private isAtomName(name: string): boolean {
    if (this.isInScope(name)) return false
    return parseTsAtomName(name) !== null
  }

  get hasCsstsSyntax(): boolean {
    return this._hasCsstsSyntax
  }

  protected resetState(): void {
    this._hasCsstsSyntax = false
    this.cssStyles.clear()
    this.usedAtoms.clear()
    this.currentVarName = null
    this.scopeStack = [new Set()]
  }

  toProgram(cst: SubhutiCst): SlimeProgram {
    this.resetState()
    return super.toProgram(cst)
  }

  getCssStyles(): Map<string, CssStyleInfo> { return this.cssStyles }
  getUsedAtoms(): Set<string> { return this.usedAtoms }
  clearUsedAtoms() { this.usedAtoms.clear() }

  toFileAst(cst: SubhutiCst): SlimeProgram {
    const program = this.toProgram(cst)
    if (this.usedAtoms.size > 0) {
      program.body = this.ensureCsstsImports(program.body)
    }
    return program
  }

  protected processCsstsPostTransform(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    if (this.usedAtoms.size > 0) return this.ensureCsstsImports(body)
    return body
  }


  protected ensureCsstsImports(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    let hasCsstsImport = false
    let hasCsstsAtomImport = false
    let hasCsstsCssImport = false

    for (const stmt of body) {
      if (stmt.type === SlimeAstTypeName.ImportDeclaration) {
        const importDecl = stmt as any
        const source = importDecl.source?.value
        if (source === 'cssts') {
          for (const spec of importDecl.specifiers || []) {
            if (spec.type === SlimeAstTypeName.ImportSpecifier) {
              if (spec.imported?.name === 'cssts' || spec.local?.name === 'cssts') {
                hasCsstsImport = true
              }
            } else if (spec.type === SlimeAstTypeName.ImportDefaultSpecifier) {
              if (spec.local?.name === 'cssts') hasCsstsImport = true
            }
          }
        }
        if (source === 'virtual:csstsAtom') hasCsstsAtomImport = true
        if (source === 'virtual:cssts.css') hasCsstsCssImport = true
      }
    }

    const newImports: SlimeModuleDeclaration[] = []
    if (!hasCsstsCssImport) newImports.push(this.createCsstsCssImport())
    if (!hasCsstsImport) newImports.push(this.createCsstsImport())
    if (!hasCsstsAtomImport) newImports.push(this.createCsstsAtomImport())

    if (newImports.length > 0) {
      let insertIndex = 0
      for (let i = 0; i < body.length; i++) {
        if (body[i].type === SlimeAstTypeName.ImportDeclaration) insertIndex = i + 1
        else break
      }
      return [...body.slice(0, insertIndex), ...newImports, ...body.slice(insertIndex)]
    }
    return body
  }

  private createCsstsImport(): SlimeModuleDeclaration {
    return {
      type: SlimeAstTypeName.ImportDeclaration,
      specifiers: [{
        type: SlimeAstTypeName.ImportSpecifier,
        imported: SlimeAstCreateUtils.createIdentifier('cssts'),
        local: SlimeAstCreateUtils.createIdentifier('cssts')
      }],
      source: SlimeAstCreateUtils.createStringLiteral('cssts-ts')
    } as any
  }

  private createCsstsAtomImport(): SlimeModuleDeclaration {
    return {
      type: SlimeAstTypeName.ImportDeclaration,
      specifiers: [{
        type: SlimeAstTypeName.ImportSpecifier,
        imported: SlimeAstCreateUtils.createIdentifier('csstsAtom'),
        local: SlimeAstCreateUtils.createIdentifier('csstsAtom')
      }],
      source: SlimeAstCreateUtils.createStringLiteral('virtual:csstsAtom')
    } as any
  }

  /** 创建 import 'virtual:cssts.css' 导入（副作用导入，无 specifiers） */
  private createCsstsCssImport(): SlimeModuleDeclaration {
    return {
      type: SlimeAstTypeName.ImportDeclaration,
      specifiers: [],
      source: SlimeAstCreateUtils.createStringLiteral('virtual:cssts.css')
    } as any
  }

  /** 收集导入的标识符到作用域 */
  createImportDeclarationAst(cst: SubhutiCst): any {
    const result = super.createImportDeclarationAst(cst)
    if (result.specifiers) {
      for (const spec of result.specifiers) {
        const localName = (spec as any).local?.name
        if (localName) this.addToScope(localName)
      }
    }
    return result
  }

  /** 收集变量声明到作用域，处理伪类变量 */
  createLexicalBindingAst(cst: SubhutiCst): any {
    const firstChild = cst.children?.[0]
    let varName: string | null = null
    if (firstChild?.name === 'BindingIdentifier') {
      const idChild = firstChild.children?.[0]
      varName = idChild?.value || idChild?.children?.[0]?.value || null
    }
    
    // 收集变量名到作用域
    if (varName) this.addToScope(varName)
    
    // 伪类变量处理
    if (varName && varName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      this.currentVarName = varName
    }
    
    const result = super.createLexicalBindingAst(cst)
    
    if (this.currentVarName && this.currentVarName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      this.usedAtoms.add(this.currentVarName)
      if (result.init && result.init.type === SlimeAstTypeName.CallExpression) {
        const callExpr = result.init as any
        if (callExpr.callee?.type === SlimeAstTypeName.MemberExpression) {
          const memberExpr = callExpr.callee as any
          if (memberExpr.object?.name === 'cssts' && memberExpr.property?.name === '$cls') {
            const groupUtilRef = this.createCsstsAtomMemberComputed(this.currentVarName)
            callExpr.arguments = [groupUtilRef, ...callExpr.arguments]
          }
        }
      }
      this.currentVarName = null
    }
    return result
  }

  protected createCsstsAtomMemberComputed(propName: string): SlimeExpression {
    const csstsAtomId = SlimeAstCreateUtils.createIdentifier('csstsAtom')
    const propLiteral = SlimeAstCreateUtils.createStringLiteral(propName)
    return {
      type: SlimeAstTypeName.MemberExpression,
      object: csstsAtomId,
      property: propLiteral,
      computed: true,
      optional: false
    } as any
  }

  createPrimaryExpressionAst(cst: SubhutiCst): SlimeExpression {
    const first = cst.children?.[0]
    if (first && first.name === CssTsParser.prototype.CssExpression.name) {
      return this.createCssExpressionAst(first)
    }
    // 调用 SlimeJavascriptCstToAstUtil 的方法，但需要避免递归
    // 由于方法拦截机制，我们需要直接处理 PrimaryExpression
    return this._createPrimaryExpressionAstOriginal(cst)
  }

  /**
   * 原始的 PrimaryExpression 处理逻辑
   * 复制自 SlimeJavascriptPrimaryExpressionCstToAst，避免方法拦截导致的递归
   */
  private _createPrimaryExpressionAstOriginal(cst: SubhutiCst): SlimeExpression {
    const first = cst.children?.[0]
    if (!first) {
      throw new Error('PrimaryExpression has no children')
    }
    
    // 根据第一个子节点的类型分发处理
    const name = first.name
    
    if (name === 'IdentifierReference') {
      return SlimeJavascriptCstToAstUtil.createIdentifierAst(first.children?.[0])
    } else if (name === 'Literal') {
      return SlimeJavascriptCstToAstUtil.createLiteralAst(first)
    } else if (name === 'ArrayLiteral') {
      return SlimeJavascriptCstToAstUtil.createArrayLiteralAst(first) as SlimeExpression
    } else if (name === 'FunctionExpression') {
      return SlimeJavascriptCstToAstUtil.createFunctionExpressionAst(first) as SlimeExpression
    } else if (name === 'ObjectLiteral') {
      return SlimeJavascriptCstToAstUtil.createObjectLiteralAst(first) as SlimeExpression
    } else if (name === 'ClassExpression') {
      return SlimeJavascriptCstToAstUtil.createClassExpressionAst(first) as SlimeExpression
    } else if (name === 'This') {
      return SlimeAstCreateUtils.createThisExpression(first.loc) as any
    } else if (name === 'RegularExpressionLiteral') {
      return SlimeJavascriptCstToAstUtil.createRegExpLiteralAst(first)
    } else if (name === 'GeneratorExpression') {
      return SlimeJavascriptCstToAstUtil.createGeneratorExpressionAst(first) as SlimeExpression
    } else if (name === 'AsyncFunctionExpression') {
      return SlimeJavascriptCstToAstUtil.createAsyncFunctionExpressionAst(first) as SlimeExpression
    } else if (name === 'AsyncGeneratorExpression') {
      return SlimeJavascriptCstToAstUtil.createAsyncGeneratorExpressionAst(first) as SlimeExpression
    } else if (name === 'CoverParenthesizedExpressionAndArrowParameterList') {
      return SlimeJavascriptCstToAstUtil.createCoverParenthesizedExpressionAndArrowParameterListAst(first)
    } else if (name === 'TemplateLiteral') {
      return SlimeJavascriptCstToAstUtil.createTemplateLiteralAst(first)
    } else if (name === 'ParenthesizedExpression') {
      return SlimeJavascriptCstToAstUtil.createParenthesizedExpressionAst(first)
    } else {
      throw new Error('未知的 PrimaryExpression 类型: ' + name)
    }
  }

  createCssExpressionAst(cst: SubhutiCst): SlimeExpression {
    this._hasCsstsSyntax = true
    const children = cst.children || []
    const styleObjectCst = children.find(c => c.name === CssTsParser.prototype.CssStyleObject.name)
    
    if (styleObjectCst) {
      const args = this.extractCssPropertyExpressions(styleObjectCst)
      return this.createCsstsClsCallWithArgs(args, cst.loc)
    }
    
    const identifierCsts = children.filter(c => c.name === 'IdentifierName')
    if (identifierCsts.length >= 2) {
      const atomCst = identifierCsts[1]
      const atomName = atomCst.value || atomCst.children?.[0]?.value || ''
      this.usedAtoms.add(atomName)
      return SlimeAstCreateUtils.createStringLiteral(atomName)
    }
    return SlimeAstCreateUtils.createStringLiteral('')
  }

  protected createCsstsClsCallWithArgs(args: SlimeExpression[], loc?: any): SlimeExpression {
    const csstsId = SlimeAstCreateUtils.createIdentifier('cssts')
    const clsId = SlimeAstCreateUtils.createIdentifier('$cls')
    const callee: SlimeExpression = {
      type: SlimeAstTypeName.MemberExpression,
      object: csstsId,
      property: clsId,
      computed: false,
      optional: false
    } as any
    return {
      type: SlimeAstTypeName.CallExpression,
      callee,
      arguments: args,
      optional: false,
      loc
    } as any
  }


  private extractCssPropertyExpressions(styleObjectCst: SubhutiCst | undefined): SlimeExpression[] {
    if (!styleObjectCst) return []
    const elementListCst = styleObjectCst.children?.find(c => c.name === 'ElementList')
    if (!elementListCst) return []
    const elements = this.processElementList(elementListCst)
    return elements.map(expr => this.transformCssPropertyExpression(expr))
  }

  private processElementList(cst: SubhutiCst): SlimeExpression[] {
    if (!cst.children) return []
    const expressions: SlimeExpression[] = []
    for (const child of cst.children) {
      if (child.name === 'Comma' || child.value === ',' || child.name === 'Elision') continue
      if (child.name === 'AssignmentExpression') {
        expressions.push(this.createAssignmentExpressionAst(child))
      } else if (child.name === 'SpreadElement') {
        expressions.push(this.createSpreadElementAst(child) as any)
      }
    }
    return expressions
  }

  createSpreadElementAst(cst: SubhutiCst): any {
    const assignExprCst = cst.children?.find(c => c.name === 'AssignmentExpression')
    if (!assignExprCst) throw new Error('SpreadElement: missing AssignmentExpression')
    const argument = this.createAssignmentExpressionAst(assignExprCst)
    return { type: SlimeAstTypeName.SpreadElement, argument, loc: cst.loc }
  }

  /**
   * 转换 css { } 内部的属性表达式
   * 
   * 使用作用域分析 + 命名规则判断：
   * - 在作用域中的标识符 → 保持原样（是变量）
   * - 符合原子类命名规则 → 转换为 csstsAtom.xxx
   * - 其他 → 保持原样
   */
  private transformCssPropertyExpression(expr: SlimeExpression): SlimeExpression {
    if (!expr) return expr

    // 标识符：使用 isAtomName 判断
    if (expr.type === SlimeAstTypeName.Identifier) {
      const name = (expr as any).name || ''
      if (name && this.isAtomName(name)) {
        this.usedAtoms.add(name)
        return this.createCsstsAtomMember(name)
      }
      // 不是原子类，保持原样（变量引用）
      return expr
    }

    // SpreadElement 保持不变
    if ((expr as any).type === SlimeAstTypeName.SpreadElement) return expr

    // LogicalExpression：递归转换右侧
    if (expr.type === SlimeAstTypeName.LogicalExpression) {
      const logicalExpr = expr as any
      return { ...logicalExpr, right: this.transformCssPropertyExpression(logicalExpr.right) }
    }

    // ConditionalExpression：递归转换两个分支
    if (expr.type === SlimeAstTypeName.ConditionalExpression) {
      const condExpr = expr as any
      return {
        ...condExpr,
        consequent: this.transformCssPropertyExpression(condExpr.consequent),
        alternate: condExpr.alternate ? this.transformCssPropertyExpression(condExpr.alternate) : condExpr.alternate
      }
    }

    // CallExpression 保持不变
    if (expr.type === SlimeAstTypeName.CallExpression) return expr

    return expr
  }

  protected createCsstsAtomMember(propName: string): SlimeExpression {
    const csstsAtomId = SlimeAstCreateUtils.createIdentifier('csstsAtom')
    const propId = SlimeAstCreateUtils.createIdentifier(propName)
    return {
      type: SlimeAstTypeName.MemberExpression,
      object: csstsAtomId,
      property: propId,
      computed: false,
      optional: false
    } as any
  }

  createAssignmentExpressionAst(cst: SubhutiCst): SlimeExpression {
    const ast = super.createAssignmentExpressionAst(cst)
    if (this.isCssReplacePattern(ast)) return this.transformToCsstsReplace(ast)
    return ast
  }

  private isCssReplacePattern(ast: any): boolean {
    if (ast.type !== SlimeAstTypeName.AssignmentExpression) return false
    if (ast.operator !== '=') return false
    if (ast.left?.type !== SlimeAstTypeName.MemberExpression) return false
    if (ast.right?.type !== SlimeAstTypeName.Literal) return false
    if (typeof ast.right?.value !== 'string') return false
    return true
  }

  private transformToCsstsReplace(ast: any): SlimeExpression {
    const memberExpr = ast.left
    const objectName: string = memberExpr.object?.name || memberExpr.object?.value || 'style'
    const propertyName: string = memberExpr.property?.name || memberExpr.property?.value || ''
    const newAtomName: string = ast.right.value || ''
    
    const csstsId = SlimeAstCreateUtils.createIdentifier('cssts')
    const replaceId = SlimeAstCreateUtils.createIdentifier('replace')
    const callee: SlimeExpression = {
      type: SlimeAstTypeName.MemberExpression,
      object: csstsId,
      property: replaceId,
      computed: false,
      optional: false
    } as any
    
    const args = [
      SlimeAstCreateUtils.createIdentifier(objectName),
      SlimeAstCreateUtils.createStringLiteral(propertyName),
      SlimeAstCreateUtils.createStringLiteral(newAtomName)
    ]
    
    const replaceCall: SlimeExpression = {
      type: SlimeAstTypeName.CallExpression,
      callee,
      arguments: args,
      optional: false
    } as any
    
    return {
      type: SlimeAstTypeName.AssignmentExpression,
      operator: '=',
      left: SlimeAstCreateUtils.createIdentifier(objectName),
      right: replaceCall,
      loc: ast.loc
    } as any
  }
}

const cssTsCstToAst = new CssTsCstToAst()
export default cssTsCstToAst
