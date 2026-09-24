import { SlimeCstToAst, SlimeCstToAstUtils, registerSlimeCstToAstUtil } from "@qin/generated-qin-parser-ts/SlimeCstToAstBridge"
import { __QinJavaUtilList } from "@qin/java-sdk-js"
import { SubhutiCst } from "subhuti"
import {
  type SlimeExpression,
  type SlimeStatement,
  type SlimeModuleDeclaration,
  type SlimeProgram,
} from "slime-ast"
import { com_slime_parser_cstToAst_SlimeAstCreateUtils as SlimeAstCreateUtils } from "@qin/generated-qin-parser-ts/SlimeAstCreateUtils"
import { com_slime_ast_nodes_misc_Program as GeneratedSlimeProgram } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/Program"
import { com_slime_ast_SourceLocation as SlimeSourceLocation } from "@qin/generated-qin-parser-ts/com/slime/ast/SourceLocation"
import { com_slime_ast_nodes_expressions_Identifier as GeneratedSlimeIdentifier } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/expressions/Identifier"
import { com_slime_ast_nodes_expressions_Literal as GeneratedSlimeLiteral } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/expressions/Literal"
import { com_slime_ast_nodes_expressions_CallExpression as GeneratedSlimeCallExpression } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/expressions/CallExpression"
import { com_slime_ast_nodes_expressions_MemberExpression as GeneratedSlimeMemberExpression } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/expressions/MemberExpression"
import { com_slime_ast_nodes_expressions_AssignmentExpression as GeneratedSlimeAssignmentExpression } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/expressions/AssignmentExpression"
import { com_slime_ast_nodes_declarations_ClassDeclaration as GeneratedSlimeClassDeclaration } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/declarations/ClassDeclaration"
import { com_slime_ast_AstNode as GeneratedSlimeAstNode } from "@qin/generated-qin-parser-ts/com/slime/ast/AstNode"
import { com_slime_ast_nodes_modules_ImportDeclaration as GeneratedSlimeImportDeclaration } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/modules/ImportDeclaration"
import { com_slime_ast_nodes_misc_ImportSpecifier as GeneratedSlimeImportSpecifier } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/ImportSpecifier"
import { com_slime_ast_nodes_misc_ImportDefaultSpecifier as GeneratedSlimeImportDefaultSpecifier } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/ImportDefaultSpecifier"
import { com_slime_ast_nodes_misc_ImportNamespaceSpecifier as GeneratedSlimeImportNamespaceSpecifier } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/ImportNamespaceSpecifier"
import { com_slime_ast_nodes_misc_VariableDeclarator as GeneratedSlimeVariableDeclarator } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/VariableDeclarator"
import { com_slime_ast_nodes_misc_SpreadElement as GeneratedSlimeSpreadElement } from "@qin/generated-qin-parser-ts/com/slime/ast/nodes/misc/SpreadElement"
import { com_subhuti_struct_SubhutiSourceLocation as SubhutiSourceLocation } from "@qin/generated-qin-parser-ts/SubhutiSourceLocation"
import { normalizeGeneratedAst } from "../parser/generated-runtime-adapter.js"
import { CSSTS_CONFIG, isBuiltinAtom } from "../utils/cssClassName.js"

const QIN_OBJECT_INTERNAL_PREFIX = "__QinObject_"

declare function __qin_cst_name_of__(cst: any): any
declare function __qin_ast_type_of__(node: any): any

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
 * 2. 处理 css { } 表达式语法，转换为 cssts.merge() 调用
 * 3. 收集使用的原子类名（usedAtoms），供 vite 插件生成 CSS
 * 4. 处理伪类变量（如 btn$$hover），注入运行时参数
 * 5. 作用域分析：区分局部变量和原子类名，支持自动解构
 */
export class CssTsCstToAst extends SlimeCstToAst {
  private cssStyles: Map<string, CssStyleInfo> = new Map()
  private usedAtoms: Set<string> = new Set()
  private cssSyntaxExpressions: Set<SlimeExpression> = new Set()
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

  private cstChildren(cst: SubhutiCst | undefined | null): SubhutiCst[] {
    if (cst == null) return []
    const children = cst.getChildren()
    if (children == null) return []
    const result: SubhutiCst[] = []
    for (let i = 0; i < children.size(); i++) {
      result.push(children.get(i))
    }
    return result
  }

  private cstName(cst: any): string {
    const value = __qin_cst_name_of__(cst)
    return value == null ? '' : '' + value
  }

  private findChildByName(children: SubhutiCst[], name: string): SubhutiCst | undefined {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.getName() === name) return child
    }
    return undefined
  }

  private findChildByNameOrValue(children: SubhutiCst[], name: string, value: string): SubhutiCst | undefined {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.getName() === name || child.getValue() === value) return child
    }
    return undefined
  }

  protected javaListToArray<T = any>(list: __QinJavaUtilList<T> | null | undefined): T[] {
    if (list == null) return []
    const result: T[] = []
    for (let i = 0; i < list.size(); i++) {
      result.push(list.get(i))
    }
    return result
  }

  private sourceLocationOf(loc: SubhutiSourceLocation | null | undefined, type?: string, value?: string): SubhutiSourceLocation | null {
    if (loc == null) return null
    const start = loc.start()
    const end = loc.end()
    if (start == null || end == null) return null
    const resolvedType: string | null = type != null ? type : loc.getType()
    if (value !== undefined) {
      return SubhutiSourceLocation.ofWithValue(resolvedType ?? null, value, start, end)
    }
    return resolvedType != null && resolvedType.length > 0
      ? SubhutiSourceLocation.of(resolvedType, start, end)
      : SubhutiSourceLocation.of(start, end)
  }

  private slimeLocationOf(loc: SlimeSourceLocation | null | undefined, type?: string, value?: string): SlimeSourceLocation | null {
    if (loc == null) return null
    const start = loc.start()
    const end = loc.end()
    if (start == null || end == null) return null
    const resolvedType: string | null = type != null ? type : loc.type()
    const resolvedValue: string | null = value !== undefined ? value : loc.value()
    return new SlimeSourceLocation(resolvedType, resolvedValue, start, end)
  }

  private generatorLoc(loc: SubhutiSourceLocation | SlimeSourceLocation | null | undefined, value?: string, type?: string): any {
    if (loc == null) return undefined
    if (loc instanceof SlimeSourceLocation) {
      const slimeLoc = this.slimeLocationOf(loc, type, value)
      if (slimeLoc == null) return undefined
      const start = slimeLoc.start()
      const end = slimeLoc.end()
      return {
        type: slimeLoc.type(),
        value: slimeLoc.value(),
        newLine: false,
        index: start.index(),
        length: Math.max(0, end.index() - start.index()),
        start: { line: start.line(), column: start.column(), index: start.index() },
        end: { line: end.line(), column: end.column(), index: end.index() },
        filename: null,
        identifierName: null
      }
    }
    const subhutiLoc = this.sourceLocationOf(loc, type, value)
    if (subhutiLoc == null) return undefined
    const start = subhutiLoc.start()
    const end = subhutiLoc.end()
    return {
      type: subhutiLoc.getType(),
      value: subhutiLoc.getValue(),
      newLine: subhutiLoc.getNewLine(),
      index: start.index(),
      length: Math.max(0, end.index() - start.index()),
      start: { line: start.line(), column: start.column(), index: start.index() },
      end: { line: end.line(), column: end.column(), index: end.index() },
      filename: subhutiLoc.getFilename(),
      identifierName: subhutiLoc.getIdentifierName()
    }
  }

  private identifier(name: string, loc?: SubhutiSourceLocation | SlimeSourceLocation | null): any {
    const resolvedLoc = loc instanceof SlimeSourceLocation ? loc : this.sourceLocationOf(loc)
    return SlimeAstCreateUtils.createIdentifier(name, resolvedLoc as any)
  }

  private stringLiteral(value: string, loc?: SubhutiSourceLocation | SlimeSourceLocation | null): any {
    const resolvedLoc = loc instanceof SlimeSourceLocation ? loc : this.sourceLocationOf(loc)
    return SlimeAstCreateUtils.createStringLiteral(value, resolvedLoc as any, JSON.stringify(value))
  }

  private identifierName(expr: GeneratedSlimeIdentifier | null | undefined): string {
    if (expr == null) return ''
    return expr.name()
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
   * 判断逻辑（作用域 + 白名单）：
   * 1. 如果在作用域中 → 不是原子类（是变量）
   * 2. 如果在内置原子类白名单中 → 是原子类
   * 3. 否则 → 不是原子类（保持原样）
   */
  private isAtomName(name: string): boolean {
    if (this.isInScope(name)) return false
    return isBuiltinAtom(name)
  }

  get hasCsstsSyntax(): boolean {
    return this._hasCsstsSyntax
  }

  protected resetState(): void {
    this._hasCsstsSyntax = false
    this.cssStyles.clear()
    this.usedAtoms.clear()
    this.cssSyntaxExpressions.clear()
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

  private isGeneratedExpressionAst(value: any): boolean {
    const astType = __qin_ast_type_of__(value)
    if (astType !== null && astType !== undefined && ('' + astType).length > 0) return true
    return value instanceof GeneratedSlimeAstNode
      || value instanceof GeneratedSlimeIdentifier
      || value instanceof GeneratedSlimeLiteral
      || value instanceof GeneratedSlimeCallExpression
      || value instanceof GeneratedSlimeMemberExpression
      || value instanceof GeneratedSlimeAssignmentExpression
  }

  toFileAst(cst: SubhutiCst): SlimeProgram {
    this.resetState()
    const generatedProgram: GeneratedSlimeProgram = super.toProgram(cst) as GeneratedSlimeProgram
    if (this.usedAtoms.size > 0) {
      const body = this.ensureCsstsImports(this.javaListToArray(generatedProgram.body()))
      return SlimeAstCreateUtils.createProgram(body as any, generatedProgram.sourceType(), generatedProgram.location()) as SlimeProgram
    }
    return generatedProgram as any
  }

  protected processCsstsPostTransform(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    if (this.usedAtoms.size > 0) {
      return this.ensureCsstsImports(body)
    }
    return body
  }


  /**
   * 确保 CSSTS 相关的导入语句存在
   * 
   * 当使用了 css {} 语法时，需要添加以下三个导入：
   * 1. import 'virtual:cssts.css'        - 虚拟 CSS 模块，包含生成的原子类样式
   * 2. import {cssts} from 'cssts-ts'    - CSSTS 运行时，提供 merge 等方法
   * 3. import {csstsAtom} from 'virtual:csstsAtom' - 原子类名映射对象
   * 
   * 为什么分开判断每个导入：
   * - 虽然使用 css {} 语法时通常需要全部三个导入
   * - 但用户可能手动添加了其中某些导入（如从 cssts-ts 导入其他内容）
   * - 分开检查可以避免重复导入，同时确保不遗漏任何必需的导入
   * - 这种细粒度的检查也便于未来扩展（如某些场景只需要部分导入）
   */
  protected ensureCsstsImports(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    let hasCsstsImport = false
    let hasCsstsAtomImport = false
    let hasCsstsCssImport = false

    // 遍历现有导入，检查是否已存在 CSSTS 相关导入
    for (const stmt of body) {
      if (stmt instanceof GeneratedSlimeImportDeclaration) {
        const importDecl: GeneratedSlimeImportDeclaration = stmt
        const sourceLiteral: GeneratedSlimeLiteral = importDecl.source()
        const sourceValue = sourceLiteral.value()
        const source: string = sourceValue == null ? '' : String(sourceValue)

        // 只检查 cssts-ts 导入（运行时）
        if (source === 'cssts-ts') {
          const specifiers: Array<GeneratedSlimeAstNode> = this.javaListToArray(importDecl.specifiers())
          for (const spec of specifiers) {
            // 注意：spec 可能是 { specifier: {...}, commaToken: ... } 结构
            const actualSpec: GeneratedSlimeAstNode = spec

            if (actualSpec instanceof GeneratedSlimeImportSpecifier) {
              const namedSpec: GeneratedSlimeImportSpecifier = actualSpec
              const importedName: string = this.identifierName(namedSpec.imported())
              const localName: string = this.identifierName(namedSpec.local())
              if (importedName === 'cssts' || localName === 'cssts') {
                hasCsstsImport = true
              }
            } else if (actualSpec instanceof GeneratedSlimeImportDefaultSpecifier) {
              const defaultSpec: GeneratedSlimeImportDefaultSpecifier = actualSpec
              const localName: string = this.identifierName(defaultSpec.local())
              if (localName === 'cssts') hasCsstsImport = true
            }
          }
        }

        // 检查虚拟模块导入
        if (source === 'virtual:csstsAtom') hasCsstsAtomImport = true
        if (source === 'virtual:cssts.css') hasCsstsCssImport = true
      }
    }

    // 按需添加缺失的导入
    const newImports: SlimeModuleDeclaration[] = []
    if (!hasCsstsCssImport) newImports.push(this.createCsstsCssImport())
    if (!hasCsstsImport) newImports.push(this.createCsstsImport())
    if (!hasCsstsAtomImport) newImports.push(this.createCsstsAtomImport())

    // 将新导入插入到现有导入语句之后
    if (newImports.length > 0) {
      let insertIndex = 0
      for (let i = 0; i < body.length; i++) {
        if (body[i] instanceof GeneratedSlimeImportDeclaration) insertIndex = i + 1
        else break
      }
      return [...body.slice(0, insertIndex), ...newImports, ...body.slice(insertIndex)]
    }
    return body
  }

  private createCsstsImport(): SlimeModuleDeclaration {
    const imported = this.identifier('cssts') as GeneratedSlimeIdentifier
    const local = this.identifier('cssts') as GeneratedSlimeIdentifier
    const specifier = new GeneratedSlimeImportSpecifier(imported, local, null)
    return SlimeAstCreateUtils.createImportDeclaration([specifier], this.stringLiteral('cssts-ts'), null) as SlimeModuleDeclaration
  }

  private createCsstsAtomImport(): SlimeModuleDeclaration {
    const imported = this.identifier('csstsAtom') as GeneratedSlimeIdentifier
    const local = this.identifier('csstsAtom') as GeneratedSlimeIdentifier
    const specifier = new GeneratedSlimeImportSpecifier(imported, local, null)
    return SlimeAstCreateUtils.createImportDeclaration([specifier], this.stringLiteral('virtual:csstsAtom'), null) as SlimeModuleDeclaration
  }

  /** 创建 import 'virtual:cssts.css' 导入（副作用导入，无 specifiers） */
  private createCsstsCssImport(): SlimeModuleDeclaration {
    return SlimeAstCreateUtils.createImportDeclaration([], this.stringLiteral('virtual:cssts.css'), null) as SlimeModuleDeclaration
  }

  /** 收集导入的标识符到作用域 */
  createImportDeclarationAst(cst: SubhutiCst): any {
    const result: GeneratedSlimeImportDeclaration = super.createImportDeclarationAst(cst) as GeneratedSlimeImportDeclaration
    const specifiers: Array<GeneratedSlimeAstNode> = this.javaListToArray(result.specifiers())
    for (const spec of specifiers) {
      const actualSpec: GeneratedSlimeAstNode = spec
      if (actualSpec instanceof GeneratedSlimeImportSpecifier) {
        const namedSpec: GeneratedSlimeImportSpecifier = actualSpec
        const localName: string = this.identifierName(namedSpec.local())
        if (localName.length > 0) this.addToScope(localName)
      } else if (actualSpec instanceof GeneratedSlimeImportDefaultSpecifier) {
        const defaultSpec: GeneratedSlimeImportDefaultSpecifier = actualSpec
        const localName: string = this.identifierName(defaultSpec.local())
        if (localName.length > 0) this.addToScope(localName)
      } else if (actualSpec instanceof GeneratedSlimeImportNamespaceSpecifier) {
        const namespaceSpec: GeneratedSlimeImportNamespaceSpecifier = actualSpec
        const localName: string = this.identifierName(namespaceSpec.local())
        if (localName.length > 0) this.addToScope(localName)
      }
    }
    return result
  }

  /** 收集变量声明到作用域，处理伪类变量 */
  createLexicalBindingAst(cst: SubhutiCst): any {
    const firstChild = this.cstChildren(cst)[0]
    let varName: string | null = null
    if (firstChild != null && firstChild.getName() === 'BindingIdentifier') {
      const idChild = this.cstChildren(firstChild)[0]
      if (idChild != null) {
        const directName = idChild.getValue()
        if (directName != null && directName.length > 0) {
          varName = directName
        } else {
          const nestedIdChild = this.cstChildren(idChild)[0]
          if (nestedIdChild != null) {
            const nestedName = nestedIdChild.getValue()
            if (nestedName != null && nestedName.length > 0) varName = nestedName
          }
        }
      }
    }

    // 收集变量名到作用域
    if (varName != null && varName.length > 0) this.addToScope(varName)

    // 伪类变量处理
    if (varName != null && varName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      this.currentVarName = varName
    }

    const result: GeneratedSlimeVariableDeclarator = super.createLexicalBindingAst(cst) as GeneratedSlimeVariableDeclarator

    if (this.currentVarName != null && this.currentVarName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      this.usedAtoms.add(this.currentVarName)
      const initExpression: SlimeExpression = result.init() as SlimeExpression
      if (initExpression instanceof GeneratedSlimeCallExpression) {
        const callExpr: GeneratedSlimeCallExpression = initExpression
        const calleeExpression: SlimeExpression = callExpr.callee() as SlimeExpression
        if (calleeExpression instanceof GeneratedSlimeMemberExpression) {
          const memberExpr: GeneratedSlimeMemberExpression = calleeExpression
          const objectExpression = memberExpr.object()
          const propertyExpression = memberExpr.property()
          const objectName: string = objectExpression instanceof GeneratedSlimeIdentifier ? this.identifierName(objectExpression) : ''
          const propertyName: string = propertyExpression instanceof GeneratedSlimeIdentifier ? this.identifierName(propertyExpression) : ''
          if (objectName === 'cssts' && propertyName === 'merge') {
            const groupUtilRef = this.createCsstsAtomMember(this.currentVarName)
            const newArgs = [groupUtilRef, ...this.javaListToArray(callExpr.arguments())]
            const newInit = SlimeAstCreateUtils.createCallExpression(calleeExpression as any, newArgs as any, callExpr.optional(), callExpr.location())
            const next = SlimeAstCreateUtils.createVariableDeclarator(result.id(), newInit, result.typeAnnotation(), result.location())
            this.currentVarName = null
            return next
          }
        }
      }
      this.currentVarName = null
    }
    return result
  }



  createPrimaryExpressionAst(cst: any): SlimeExpression {
    if (this.isGeneratedExpressionAst(cst)) return normalizeGeneratedAst(cst) as SlimeExpression
    if (this.cstName(cst) === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first != null && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    // 直接调用基类逻辑，不再进行拦截复制
    return super.createPrimaryExpressionAst(cst)
  }

  createExpressionAst(cst: any): SlimeExpression {
    if (this.isGeneratedExpressionAst(cst)) return normalizeGeneratedAst(cst) as SlimeExpression
    if (this.cstName(cst) === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first != null && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    return super.createExpressionAst(cst)
  }

  createExpressionAstUncached(cst: any): SlimeExpression {
    if (this.isGeneratedExpressionAst(cst)) return normalizeGeneratedAst(cst) as SlimeExpression
    if (this.cstName(cst) === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first != null && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    return super.createExpressionAstUncached(cst)
  }

  createStatementListItemAst(cst: SubhutiCst): Array<SlimeStatement> {
    const qinObject = this.findDirectQinObjectDeclaration(cst)
    if (qinObject != null) {
      return this.createQinObjectNodes(qinObject) as any
    }
    return super.createStatementListItemAst(cst)
  }

  createDeclarationAst(cst: SubhutiCst): any {
    const qinObject = this.unwrapQinObjectDeclaration(cst)
    if (qinObject != null) {
      return this.createQinObjectNodes(qinObject)[0]
    }
    return super.createDeclarationAst(cst)
  }

  createCssExpressionAst(cst: SubhutiCst): SlimeExpression {
    this._hasCsstsSyntax = true
    const children = this.cstChildren(cst)
    const styleObjectCst = this.findChildByName(children, 'CssStyleObject')

    // 提取 css 关键字的位置
    const cssTokenCst = this.findChildByNameOrValue(children, 'Css', 'css')
    const cssTokenLoc = cssTokenCst != null ? cssTokenCst.getLoc() : undefined

    if (styleObjectCst != null) {
      // 提取 { 和 } 的位置
      const styleChildren = this.cstChildren(styleObjectCst)
      const lBraceCst = this.findChildByNameOrValue(styleChildren, 'LBrace', '{')
      const rBraceCst = this.findChildByNameOrValue(styleChildren, 'RBrace', '}')
      const lBraceLoc = lBraceCst != null ? lBraceCst.getLoc() : undefined
      const rBraceLoc = rBraceCst != null ? rBraceCst.getLoc() : undefined

      const args = this.extractCssPropertyExpressions(styleObjectCst)
      const callExpr = this.createCsstsClsCallWithArgs(args, cst.getLoc(), cssTokenLoc, lBraceLoc, rBraceLoc)

        // 添加标记：标识这是 css 语法生成的表达式
        this.cssSyntaxExpressions.add(callExpr)

      return callExpr
    }

    let identifierCount = 0
    let atomCst: SubhutiCst = cst
    for (const child of children) {
      if (child.getName() === 'IdentifierName') {
        if (identifierCount === 1) atomCst = child
        identifierCount++
      }
    }
    if (identifierCount >= 2) {
      const directAtomName = atomCst.getValue()
      let atomName = ''
      if (directAtomName != null && directAtomName.length > 0) {
        atomName = directAtomName
      } else {
        const nestedAtomCst = this.cstChildren(atomCst)[0]
        if (nestedAtomCst != null) {
          const nestedAtomName = nestedAtomCst.getValue()
          if (nestedAtomName != null) atomName = nestedAtomName
        }
      }
      this.usedAtoms.add(atomName)
      return this.stringLiteral(atomName, atomCst.getLoc())
    }
    return this.stringLiteral('', cst.getLoc())
  }

  /**
   * 创建 cssts.merge(...) 调用
   * 
   * @param args 参数列表
   * @param loc 整体位置
   * @param cssTokenLoc css keyword location for the generated cssts.merge mapping
   * @param lBraceLoc `{` location for the generated `(` mapping
   * @param rBraceLoc `}` location for the generated `)` mapping
   */
  protected createCsstsClsCallWithArgs(
    args: SlimeExpression[],
    loc?: SubhutiSourceLocation | null,
    cssTokenLoc?: SubhutiSourceLocation | null,
    lBraceLoc?: SubhutiSourceLocation | null,
    rBraceLoc?: SubhutiSourceLocation | null
  ): SlimeExpression {
    // 创建 cssts.merge 的 loc：都使用 css 关键字的位置
    // 这样 css -> cssts.merge 形成完整的映射
    const csstsLoc = this.sourceLocationOf(cssTokenLoc, 'IdentifierName', 'cssts')

    // `.` 也使用 css 关键字的位置
    // `merge` 也使用 css 关键字的位置
    const mergeLoc = this.sourceLocationOf(cssTokenLoc, 'IdentifierName', 'merge')

    const csstsId = SlimeAstCreateUtils.createIdentifier('cssts', csstsLoc)
    const clsId = SlimeAstCreateUtils.createIdentifier('merge', mergeLoc)

    const callee = SlimeAstCreateUtils.createMemberExpression(csstsId, clsId, false, false, csstsLoc) as any
    const callExpr = SlimeAstCreateUtils.createCallExpression(callee, args as any, false, this.sourceLocationOf(loc)) as any
    return callExpr
  }


  private extractCssPropertyExpressions(styleObjectCst: SubhutiCst | undefined): SlimeExpression[] {
    if (styleObjectCst == null) return []
    const styleChildren = this.cstChildren(styleObjectCst)
    const elementListCst = this.findChildByName(styleChildren, 'ElementList')
    if (elementListCst == null) {
      const atomListCst = this.findChildByName(styleChildren, 'CssAtomList')
      return this.processCssAtomList(atomListCst)
    }
    const elements = this.processElementList(elementListCst)
    const transformed: SlimeExpression[] = []
    for (let i = 0; i < elements.length; i++) {
      transformed.push(this.transformCssPropertyExpression(elements[i]))
    }
    return transformed
  }

  private extractCstValue(cst: SubhutiCst | undefined): string {
    if (cst == null) return ''
    const value = cst.getValue()
    if (value !== undefined && value !== null) return String(value)
    let result = ''
    const children = this.cstChildren(cst)
    for (let i = 0; i < children.length; i++) {
      result += this.extractCstValue(children[i])
    }
    return result
  }

  private processCssAtomList(cst: SubhutiCst | undefined): SlimeExpression[] {
    if (cst == null) return []
    const expressions: SlimeExpression[] = []
    for (const child of this.cstChildren(cst)) {
      if (child.getName() === 'Comma' || child.getValue() === ',') {
        continue
      }
      if (child.getName() === 'IdentifierName') {
        const name = this.extractCstValue(child)
        expressions.push(this.transformCssPropertyExpression(
          SlimeAstCreateUtils.createIdentifier(name, this.sourceLocationOf(child.getLoc()))
        ))
      }
    }
    return expressions
  }

  /**
   * 处理 ElementList，提取表达式并保留逗号位置信息
   * 逗号位置会被附加到前一个表达式的 commaToken 属性上
   */
  private processElementList(cst: SubhutiCst): SlimeExpression[] {
    const children = this.cstChildren(cst)
    if (children.length === 0) return []
    const expressions: SlimeExpression[] = []

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const childName = child.getName()
      const childValue = child.getValue()

      // 处理逗号：将其位置附加到前一个表达式
      if (childName === 'Comma' || childValue === ',') {
        continue
      }

      // 跳过 Elision
      if (childName === 'Elision') continue

      // 处理表达式
      if (childName === 'AssignmentExpression') {
        expressions.push(this.createAssignmentExpressionAst(child))
      } else if (childName === 'SpreadElement') {
        expressions.push(this.createSpreadElementAst(child) as any)
      }
    }
    return expressions
  }

  createSpreadElementAst(cst: SubhutiCst): any {
    const assignExprCst = this.findChildByName(this.cstChildren(cst), 'AssignmentExpression')
    if (assignExprCst == null) throw new Error('SpreadElement: missing AssignmentExpression')
    const argument = this.createAssignmentExpressionAst(assignExprCst)
    return new GeneratedSlimeSpreadElement(argument, SlimeAstCreateUtils.toSourceLocation(this.sourceLocationOf(cst.getLoc()) as any))
  }

  /**
   * 转换 css { } 内部的表达式
   * 
   * 规则：
   * - 标识符 + 是全局样式类 → csstsAtom.xxx
   * - 其他 → 保持原样
   */
  private transformCssPropertyExpression(expr: SlimeExpression): SlimeExpression {
    if (expr == null) return expr

    // 标识符：判断是否是全局样式类
    if (expr instanceof GeneratedSlimeIdentifier) {
      const identifierExpr: GeneratedSlimeIdentifier = expr
      const name = this.identifierName(identifierExpr)
      if (name.length > 0 && this.isAtomName(name)) {
        // 是全局样式类：转换为 csstsAtom.xxx
        // 保留原始标识符的 loc，用于 source map 映射
        this.usedAtoms.add(name)
        const result = this.createCsstsAtomMember(name, identifierExpr.location())
        // 保留原始表达式的 commaToken（逗号位置信息）
        return result
      }
      // 不是样式类（变量引用）：保持原样
      return expr
    }

    // 逻辑表达式：递归处理两侧

    // 三元表达式：递归处理三个部分

    // 函数调用：递归处理参数
    // 其他：保持原样（字符串、展开等）
    return expr
  }

  /**
   * 创建 csstsAtom.xxx 成员表达式
   * @param propName 属性名（原子类名）
   * @param propLoc 原始标识符的位置信息，用于 source map 映射
   */
  protected createCsstsAtomMember(propName: string, propLoc?: SubhutiSourceLocation | SlimeSourceLocation | null): SlimeExpression {
    // Keep injected tokens aligned to the same source position as the atom name,
    // so virtual output does not split after `csstsAtom.`.
    const sourcePropLoc = propLoc instanceof SlimeSourceLocation ? propLoc : this.sourceLocationOf(propLoc)
    const atomLoc = sourcePropLoc instanceof SlimeSourceLocation
      ? this.slimeLocationOf(sourcePropLoc, 'IdentifierName', 'csstsAtom')
      : this.sourceLocationOf(sourcePropLoc, 'IdentifierName', 'csstsAtom')

    const csstsAtomId = SlimeAstCreateUtils.createIdentifier('csstsAtom', atomLoc)
    // 传递原始 loc，确保 property 能正确映射回源代码
    const propId = SlimeAstCreateUtils.createIdentifier(propName, sourcePropLoc)
    const member = SlimeAstCreateUtils.createMemberExpression(csstsAtomId, propId, false, false, sourcePropLoc) as any
    return member
  }

  createAssignmentExpressionAst(cst: any): SlimeExpression {
    if (this.isGeneratedExpressionAst(cst)) return normalizeGeneratedAst(cst) as SlimeExpression
    const ast = super.createAssignmentExpressionAst(cst)

    // 如果右侧是 css 语法，转换为带合并的 merge
    if (ast instanceof GeneratedSlimeAssignmentExpression) {
      const assignmentAst: GeneratedSlimeAssignmentExpression = ast
      const rightExpression: SlimeExpression = assignmentAst.right() as SlimeExpression
      if (this.cssSyntaxExpressions.has(rightExpression)) {
        return this.transformToCssMerge(assignmentAst)
      }
    }

    return ast
  }

  /**
   * 转换为带合并的 merge 调用
   * 
   * 输入：leftExpr = cssts.merge(a, b, c)
   * 输出：leftExpr = cssts.merge(leftExpr, a, b, c)
   * 
   * 支持任意左侧表达式：
   * - style = css { } → style = merge(style, ...)
   * - obj.style = css { } → obj.style = merge(obj.style, ...)
   */
  private transformToCssMerge(ast: GeneratedSlimeAssignmentExpression): SlimeExpression {
    const leftExpr = ast.left()
    const right = ast.right()
    if (right instanceof GeneratedSlimeCallExpression) {
      const rightCall: GeneratedSlimeCallExpression = right
      const rightArgs = this.javaListToArray(rightCall.arguments())

    // 复用 createCsstsClsCallWithArgs，将左侧表达式作为第一个参数
      const mergeCall = SlimeAstCreateUtils.createCallExpression(rightCall.callee() as any, [leftExpr as any, ...rightArgs] as any, rightCall.optional(), rightCall.location())

      return new GeneratedSlimeAssignmentExpression(ast.operator(), leftExpr, mergeCall, ast.location()) as any
    }
    return ast as any
  }

  private createQinObjectNodes(qinObject: SubhutiCst): any[] {
    const body = qinObject.getName() === 'QinObjectDeclarationBody'
      ? qinObject
      : this.findFirstByName(qinObject, 'QinObjectDeclarationBody') ?? qinObject
    const binding = this.findFirstByName(body, 'BindingIdentifier')
    if (binding == null) {
      throw new Error('Qin object declaration must have a binding identifier')
    }

    const publicId = this.createBindingIdentifierAst(binding)
    const publicIdentifier: GeneratedSlimeIdentifier = publicId as GeneratedSlimeIdentifier
    const publicName = this.identifierName(publicIdentifier)
    if (publicName.length === 0) {
      throw new Error('Qin object declaration must have a binding identifier name')
    }

    const internalName = `${QIN_OBJECT_INTERNAL_PREFIX}${publicName}`
    const publicLoc = publicIdentifier.location()
    const internalClassId = SlimeAstCreateUtils.createIdentifier(internalName, publicLoc)
    const parsedClass: GeneratedSlimeClassDeclaration = this.createClassDeclarationAst(body) as GeneratedSlimeClassDeclaration
    const internalClass = SlimeAstCreateUtils.createClassDeclaration(
      internalClassId,
      parsedClass.superClass(),
      parsedClass.body(),
      parsedClass.decorators() ?? [],
      parsedClass.typeParameters(),
      parsedClass.implementsTypes() ?? [],
      this.sourceLocationOf(body.getLoc())
    )

    const initializer = SlimeAstCreateUtils.createNewExpression(
      SlimeAstCreateUtils.createIdentifier(internalName, publicLoc),
      [],
      false,
      publicLoc
    )
    const declarator = SlimeAstCreateUtils.createVariableDeclarator(
      publicId,
      initializer,
      publicLoc
    )
    const singleton = SlimeAstCreateUtils.createVariableDeclaration(
      [declarator],
      'const',
      this.sourceLocationOf(qinObject.getLoc())
    )

    return [internalClass, singleton]
  }

  private findDirectQinObjectDeclaration(cst: SubhutiCst): SubhutiCst | undefined {
    for (const child of this.cstChildren(cst)) {
      const qinObject = this.unwrapQinObjectDeclaration(child)
      if (qinObject != null) return qinObject
    }
    return undefined
  }

  private unwrapQinObjectDeclaration(cst: SubhutiCst): SubhutiCst | undefined {
    const name = cst.getName()
    if (name === 'QinObjectDeclaration' || name === 'QinObjectDeclarationBody') {
      return cst
    }
    if (name === 'Declaration') {
      const first = this.cstChildren(cst)[0]
      if (first != null && (first.getName() === 'QinObjectDeclaration' || first.getName() === 'QinObjectDeclarationBody')) {
        return first
      }
    }
    return undefined
  }

  private findFirstByName(cst: SubhutiCst | undefined, name: string): SubhutiCst | undefined {
    if (cst == null) return undefined
    if (cst.getName() === name) return cst
    for (const child of this.cstChildren(cst)) {
      const found = this.findFirstByName(child, name)
      if (found != null) return found
    }
    return undefined
  }


}

// ==================== 全局注册机制 ====================
// Use an explicit facade so imports keep calling the currently registered instance.

let _cssTsCstToAstUtils: CssTsCstToAst | null = null

function getCssTsCstToAstUtils(): CssTsCstToAst {
  if (_cssTsCstToAstUtils == null) {
    const instance = new CssTsCstToAst()
    registerCssTsCstToAst(instance)
  }
  return _cssTsCstToAstUtils
}

/**
 * 注册 CssTsCstToAst 实例到全局
 * 
 * 子类构造函数会自动调用此方法，所以会注册最终的子类实例
 * 父层（generated SlimeCstToAstBridge）的注册已通过 super() 中的父类构造函数自动完成
 */
export function registerCssTsCstToAst(instance: CssTsCstToAst): void {
  _cssTsCstToAstUtils = instance
  registerSlimeCstToAstUtil(instance)
}

export const CssTsCstToAstUtils = {
  toFileAst(cst: SubhutiCst): SlimeProgram {
    return getCssTsCstToAstUtils().toFileAst(cst)
  },

  getUsedAtoms(): Set<string> {
    return getCssTsCstToAstUtils().getUsedAtoms()
  },

  clearUsedAtoms(): void {
    getCssTsCstToAstUtils().clearUsedAtoms()
  },

  getCssStyles(): Map<string, CssStyleInfo> {
    return getCssTsCstToAstUtils().getCssStyles()
  },

  get hasCsstsSyntax(): boolean {
    return getCssTsCstToAstUtils().hasCsstsSyntax
  },
}
