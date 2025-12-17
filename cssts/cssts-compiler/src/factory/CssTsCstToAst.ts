import { SlimeCstToAst } from "slime-parser/src/language/SlimeCstToAstUtil.ts"
import SubhutiCst from "subhuti/src/struct/SubhutiCst.ts"
import CssTsParser from "../parser/CssTsParser.js"
import { SlimeNodeType } from "slime-ast/src/SlimeNodeType.ts"
import {
  type SlimeExpression,
  type SlimeStatement,
  type SlimeModuleDeclaration,
  type SlimeProgram,
} from "slime-ast/src/SlimeESTree.ts"
import SlimeNodeCreate from "slime-ast/src/SlimeNodeCreate.ts"
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
 * 4. 处理伪类变量（如 btn$hover），注入运行时参数
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
      if (stmt.type === SlimeNodeType.ImportDeclaration) {
        const importDecl = stmt as any
        const source = importDecl.source?.value
        if (source === 'cssts') {
          for (const spec of importDecl.specifiers || []) {
            if (spec.type === SlimeNodeType.ImportSpecifier) {
              if (spec.imported?.name === 'cssts' || spec.local?.name === 'cssts') {
                hasCsstsImport = true
              }
            } else if (spec.type === SlimeNodeType.ImportDefaultSpecifier) {
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
        if (body[i].type === SlimeNodeType.ImportDeclaration) insertIndex = i + 1
        else break
      }
      return [...body.slice(0, insertIndex), ...newImports, ...body.slice(insertIndex)]
    }
    return body
  }

  private createCsstsImport(): SlimeModuleDeclaration {
    return {
      type: SlimeNodeType.ImportDeclaration,
      specifiers: [{
        type: SlimeNodeType.ImportSpecifier,
        imported: SlimeNodeCreate.createIdentifier('cssts'),
        local: SlimeNodeCreate.createIdentifier('cssts')
      }],
      source: SlimeNodeCreate.createStringLiteral('cssts')
    } as any
  }

  private createCsstsAtomImport(): SlimeModuleDeclaration {
    return {
      type: SlimeNodeType.ImportDeclaration,
      specifiers: [{
        type: SlimeNodeType.ImportSpecifier,
        imported: SlimeNodeCreate.createIdentifier('csstsAtom'),
        local: SlimeNodeCreate.createIdentifier('csstsAtom')
      }],
      source: SlimeNodeCreate.createStringLiteral('virtual:csstsAtom')
    } as any
  }

  /** 创建 import 'virtual:cssts.css' 导入（副作用导入，无 specifiers） */
  private createCsstsCssImport(): SlimeModuleDeclaration {
    return {
      type: SlimeNodeType.ImportDeclaration,
      specifiers: [],
      source: SlimeNodeCreate.createStringLiteral('virtual:cssts.css')
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
      if (result.init && result.init.type === SlimeNodeType.CallExpression) {
        const callExpr = result.init as any
        if (callExpr.callee?.type === SlimeNodeType.MemberExpression) {
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
    const csstsAtomId = SlimeNodeCreate.createIdentifier('csstsAtom')
    const propLiteral = SlimeNodeCreate.createStringLiteral(propName)
    return {
      type: SlimeNodeType.MemberExpression,
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
    return super.createPrimaryExpressionAst(cst)
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
      return SlimeNodeCreate.createStringLiteral(atomName)
    }
    return SlimeNodeCreate.createStringLiteral('')
  }

  protected createCsstsClsCallWithArgs(args: SlimeExpression[], loc?: any): SlimeExpression {
    const csstsId = SlimeNodeCreate.createIdentifier('cssts')
    const clsId = SlimeNodeCreate.createIdentifier('$cls')
    const callee: SlimeExpression = {
      type: SlimeNodeType.MemberExpression,
      object: csstsId,
      property: clsId,
      computed: false,
      optional: false
    } as any
    return {
      type: SlimeNodeType.CallExpression,
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
    return { type: SlimeNodeType.SpreadElement, argument, loc: cst.loc }
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
    if (expr.type === SlimeNodeType.Identifier) {
      const name = (expr as any).name || ''
      if (name && this.isAtomName(name)) {
        this.usedAtoms.add(name)
        return this.createCsstsAtomMember(name)
      }
      // 不是原子类，保持原样（变量引用）
      return expr
    }

    // SpreadElement 保持不变
    if ((expr as any).type === SlimeNodeType.SpreadElement) return expr

    // LogicalExpression：递归转换右侧
    if (expr.type === SlimeNodeType.LogicalExpression) {
      const logicalExpr = expr as any
      return { ...logicalExpr, right: this.transformCssPropertyExpression(logicalExpr.right) }
    }

    // ConditionalExpression：递归转换两个分支
    if (expr.type === SlimeNodeType.ConditionalExpression) {
      const condExpr = expr as any
      return {
        ...condExpr,
        consequent: this.transformCssPropertyExpression(condExpr.consequent),
        alternate: condExpr.alternate ? this.transformCssPropertyExpression(condExpr.alternate) : condExpr.alternate
      }
    }

    // CallExpression 保持不变
    if (expr.type === SlimeNodeType.CallExpression) return expr

    return expr
  }

  protected createCsstsAtomMember(propName: string): SlimeExpression {
    const csstsAtomId = SlimeNodeCreate.createIdentifier('csstsAtom')
    const propId = SlimeNodeCreate.createIdentifier(propName)
    return {
      type: SlimeNodeType.MemberExpression,
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
    if (ast.type !== SlimeNodeType.AssignmentExpression) return false
    if (ast.operator !== '=') return false
    if (ast.left?.type !== SlimeNodeType.MemberExpression) return false
    if (ast.right?.type !== SlimeNodeType.Literal) return false
    if (typeof ast.right?.value !== 'string') return false
    return true
  }

  private transformToCsstsReplace(ast: any): SlimeExpression {
    const memberExpr = ast.left
    const objectName: string = memberExpr.object?.name || memberExpr.object?.value || 'style'
    const propertyName: string = memberExpr.property?.name || memberExpr.property?.value || ''
    const newAtomName: string = ast.right.value || ''
    
    const csstsId = SlimeNodeCreate.createIdentifier('cssts')
    const replaceId = SlimeNodeCreate.createIdentifier('replace')
    const callee: SlimeExpression = {
      type: SlimeNodeType.MemberExpression,
      object: csstsId,
      property: replaceId,
      computed: false,
      optional: false
    } as any
    
    const args = [
      SlimeNodeCreate.createIdentifier(objectName),
      SlimeNodeCreate.createStringLiteral(propertyName),
      SlimeNodeCreate.createStringLiteral(newAtomName)
    ]
    
    const replaceCall: SlimeExpression = {
      type: SlimeNodeType.CallExpression,
      callee,
      arguments: args,
      optional: false
    } as any
    
    return {
      type: SlimeNodeType.AssignmentExpression,
      operator: '=',
      left: SlimeNodeCreate.createIdentifier(objectName),
      right: replaceCall,
      loc: ast.loc
    } as any
  }
}

const cssTsCstToAst = new CssTsCstToAst()
export default cssTsCstToAst
