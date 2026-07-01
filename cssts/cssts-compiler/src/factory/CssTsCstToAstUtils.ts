import { SlimeCstToAst, SlimeCstToAstUtils, registerSlimeCstToAstUtil } from "@qin/generated-qin-parser-ts/SlimeCstToAstBridge"
import { SubhutiCst } from "subhuti"
import CssTsParser from "../parser/CssTsParser.js"
import {
  SlimeAstTypeName,
  type SlimeExpression,
  type SlimeStatement,
  type SlimeModuleDeclaration,
  type SlimeProgram,
} from "slime-ast"
import { com_slime_parser_cstToAst_SlimeAstCreateUtils as SlimeAstCreateUtils } from "@qin/generated-qin-parser-ts/SlimeAstCreateUtils"
import { com_subhuti_struct_SubhutiSourceLocation as SubhutiSourceLocation } from "@qin/generated-qin-parser-ts/SubhutiSourceLocation"
import { CSSTS_CONFIG, isBuiltinAtom } from "../utils/cssClassName.js"
import { CsstsInit } from "../init/CsstsInit.js"
import { normalizeGeneratedAst } from "../parser/generated-runtime-adapter.js"

const QIN_OBJECT_INTERNAL_PREFIX = "__QinObject_"
let _csstsRuntimeAtomsInitialized = false

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
// 版本号，用于确认使用的是最新版本
const CSSTS_COMPILER_VERSION = '2.1.1-commaToken-fix'

export class CssTsCstToAst extends SlimeCstToAst {
  private cssStyles: Map<string, CssStyleInfo> = new Map()
  private usedAtoms: Set<string> = new Set()
  private currentVarName: string | null = null
  protected _hasCsstsSyntax = false
  private scopeStack: Set<string>[] = []
  private static _loggedVersion = false

  constructor() {
    super()
    if (!_csstsRuntimeAtomsInitialized) {
      CsstsInit.init({ dts: false } as any)
      _csstsRuntimeAtomsInitialized = true
    }
    // 版本日志（只打印一次）
    if (!CssTsCstToAst._loggedVersion) {
      console.error(`[cssts-compiler] v${CSSTS_COMPILER_VERSION} - 100% mapping coverage`)
      CssTsCstToAst._loggedVersion = true
    }
    // 注册当前实例到 cssts 全局
    registerCssTsCstToAst(this)
  }

  private get currentScope(): Set<string> {
    if (this.scopeStack.length === 0) {
      this.scopeStack.push(new Set())
    }
    return this.scopeStack[this.scopeStack.length - 1]
  }

  private cstChildren(cst: SubhutiCst | undefined | null): SubhutiCst[] {
    if (!cst) return []
    const node = cst as any
    const children = Array.isArray(node.children) ? node.children : node.getChildren?.()
    if (!children) return []
    if (Array.isArray(children)) return children
    if (Array.isArray(children.__items)) return children.__items
    if (typeof children.size === 'function' && typeof children.get === 'function') {
      const result: SubhutiCst[] = []
      for (let i = 0; i < children.size(); i++) {
        result.push(children.get(i))
      }
      return result
    }
    return typeof children[Symbol.iterator] === 'function' ? Array.from(children) : []
  }

  private javaListToArray<T = any>(list: any): T[] {
    if (!list) return []
    if (Array.isArray(list)) return list as T[]
    if (Array.isArray(list.__items)) return list.__items as T[]
    if (typeof list.size === 'function' && typeof list.get === 'function') {
      const result: T[] = []
      for (let i = 0; i < list.size(); i++) {
        result.push(list.get(i))
      }
      return result
    }
    return typeof list[Symbol.iterator] === 'function' ? Array.from(list) as T[] : []
  }

  private setGeneratedList(owner: any, fieldName: string, values: any[]): void {
    const publicValue = owner?.[fieldName]
    const escapedFieldName = fieldName === 'arguments' ? '__qin_arguments' : fieldName
    const qinFieldName = `__qin_field_${escapedFieldName}`
    const current = publicValue && typeof publicValue !== 'function'
      ? publicValue
      : owner?.[`__${fieldName}`] ?? owner?.[qinFieldName]
    if (current && Array.isArray(current.__items)) {
      current.__items = values
      owner[fieldName] = values
      return
    }
    owner[fieldName] = values
    if (qinFieldName in owner) {
      owner[qinFieldName] = values
    }
    if (`__${fieldName}` in owner) {
      owner[`__${fieldName}`] = values
    }
  }

  private sourceLocationOf(loc: any, type?: string, value?: string): any {
    if (!loc) return null
    const start = typeof loc.start === 'function' ? loc.start() : loc.start
    const end = typeof loc.end === 'function' ? loc.end() : loc.end
    if (!start || !end) return null
    const resolvedType = type ?? (typeof loc.getType === 'function' ? loc.getType() : loc.type)
    if (value !== undefined) {
      return SubhutiSourceLocation.ofWithValue(resolvedType ?? null, value, start, end)
    }
    return resolvedType
      ? SubhutiSourceLocation.of(resolvedType, start, end)
      : SubhutiSourceLocation.of(start, end)
  }

  private sourceLocFromAstLoc(loc: any): any {
    if (!loc) return null
    const start = loc.start
    const end = loc.end
    if (!start || !end) return null
    return SubhutiSourceLocation.ofWithValue(
      typeof loc.type === 'function' ? loc.type() : loc.type ?? null,
      typeof loc.value === 'function' ? loc.value() : loc.value ?? null,
      start,
      end
    )
  }

  private generatorLoc(loc: any, value?: string, type?: string): any {
    if (!loc) return undefined
    const subhutiLoc = this.sourceLocationOf(loc, type, value)
    if (!subhutiLoc) return undefined
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

  private identifier(name: string, loc?: any): any {
    return SlimeAstCreateUtils.createIdentifier(name, this.sourceLocationOf(loc))
  }

  private stringLiteral(value: string, loc?: any): any {
    return SlimeAstCreateUtils.createStringLiteral(value, this.sourceLocationOf(loc), JSON.stringify(value))
  }

  private astType(expr: any): string {
    if (!expr) return ''
    const rawType = typeof expr.type === 'function' ? expr.type() : expr.type
    if (typeof rawType === 'string') return rawType
    const enumName = typeof rawType?.name === 'function'
      ? rawType.name()
      : typeof rawType?.toString === 'function'
        ? String(rawType)
        : ''
    if (enumName) {
      return enumName.toLowerCase().replace(/(^|_)([a-z])/g, (_match: string, _sep: string, char: string) => char.toUpperCase())
    }
    const recordName = expr.__qinJavaRecordClass
    return typeof recordName === 'string' ? recordName.slice(recordName.lastIndexOf('.') + 1) : ''
  }

  private identifierName(expr: any): string {
    if (!expr) return ''
    if (typeof expr.__name === 'string') return expr.__name
    if (typeof expr.name === 'function') return expr.name()
    return typeof expr.name === 'string' ? expr.name : ''
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
      const normalizedProgram = normalizeGeneratedAst(program as any) as any
      const body = this.ensureCsstsImports(this.javaListToArray(normalizedProgram.body))
      this.setGeneratedList(program as any, 'body', body)
    }
    return normalizeGeneratedAst(program as any) as SlimeProgram
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
      if (stmt.type === SlimeAstTypeName.ImportDeclaration) {
        const importDecl = stmt as any
        const source = importDecl.source?.value

        // 只检查 cssts-ts 导入（运行时）
        if (source === 'cssts-ts') {
          for (const spec of importDecl.specifiers || []) {
            // 注意：spec 可能是 { specifier: {...}, commaToken: ... } 结构
            const actualSpec = spec.specifier || spec

            if (actualSpec.type === SlimeAstTypeName.ImportSpecifier) {
              if (actualSpec.imported?.name === 'cssts' || actualSpec.local?.name === 'cssts') {
                hasCsstsImport = true
              }
            } else if (actualSpec.type === SlimeAstTypeName.ImportDefaultSpecifier) {
              if (actualSpec.local?.name === 'cssts') hasCsstsImport = true
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
        imported: this.identifier('cssts'),
        local: this.identifier('cssts')
      }],
      source: this.stringLiteral('cssts-ts')
    } as any
  }

  private createCsstsAtomImport(): SlimeModuleDeclaration {
    return {
      type: SlimeAstTypeName.ImportDeclaration,
      specifiers: [{
        type: SlimeAstTypeName.ImportSpecifier,
        imported: this.identifier('csstsAtom'),
        local: this.identifier('csstsAtom')
      }],
      source: this.stringLiteral('virtual:csstsAtom')
    } as any
  }

  /** 创建 import 'virtual:cssts.css' 导入（副作用导入，无 specifiers） */
  private createCsstsCssImport(): SlimeModuleDeclaration {
    return {
      type: SlimeAstTypeName.ImportDeclaration,
      specifiers: [],
      source: this.stringLiteral('virtual:cssts.css')
    } as any
  }

  /** 收集导入的标识符到作用域 */
  createImportDeclarationAst(cst: SubhutiCst): any {
    const result = super.createImportDeclarationAst(cst)
    for (const spec of this.javaListToArray(result.specifiers ?? (result as any).__specifiers)) {
      const normalizedSpec = normalizeGeneratedAst(spec as any) as any
      const localName = normalizedSpec.local?.name
      if (localName) this.addToScope(localName)
    }
    return result
  }

  /** 收集变量声明到作用域，处理伪类变量 */
  createLexicalBindingAst(cst: SubhutiCst): any {
    const firstChild = this.cstChildren(cst)[0]
    let varName: string | null = null
    if (firstChild?.getName() === 'BindingIdentifier') {
      const idChild = this.cstChildren(firstChild)[0]
      varName = idChild?.getValue() || this.cstChildren(idChild)[0]?.getValue() || null
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
          if (memberExpr.object?.name === 'cssts' && memberExpr.property?.name === 'merge') {
            const groupUtilRef = this.createCsstsAtomMember(this.currentVarName)
            callExpr.arguments = [groupUtilRef, ...callExpr.arguments]
          }
        }
      }
      this.currentVarName = null
    }
    return result
  }



  createPrimaryExpressionAst(cst: SubhutiCst): SlimeExpression {
    if (cst.getName() === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    // 直接调用基类逻辑，不再进行拦截复制
    return super.createPrimaryExpressionAst(cst)
  }

  createExpressionAst(cst: SubhutiCst): SlimeExpression {
    if (cst.getName() === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    return super.createExpressionAst(cst)
  }

  createExpressionAstUncached(cst: SubhutiCst): SlimeExpression {
    if (cst.getName() === "CssExpression") {
      return this.createCssExpressionAst(cst)
    }
    const first = this.cstChildren(cst)[0]
    if (first && first.getName() === "CssExpression") {
      return this.createCssExpressionAst(first)
    }
    return super.createExpressionAstUncached(cst)
  }

  createStatementListItemAst(cst: SubhutiCst): Array<SlimeStatement> {
    const qinObject = this.findDirectQinObjectDeclaration(cst)
    if (qinObject) {
      return this.createQinObjectNodes(qinObject) as any
    }
    return super.createStatementListItemAst(cst)
  }

  createDeclarationAst(cst: SubhutiCst): any {
    const qinObject = this.unwrapQinObjectDeclaration(cst)
    if (qinObject) {
      return this.createQinObjectNodes(qinObject)[0]
    }
    return super.createDeclarationAst(cst)
  }

  createCssExpressionAst(cst: SubhutiCst): SlimeExpression {
    this._hasCsstsSyntax = true
    const children = this.cstChildren(cst)
    const styleObjectCst = children.find(c =>
      c.getName() === CssTsParser.prototype.CssStyleObject?.name || c.getName() === 'CssStyleObject'
    )

    // 提取 css 关键字的位置
    const cssTokenCst = children.find(c => c.getName() === 'Css' || c.getValue() === 'css')
    const cssTokenLoc = cssTokenCst?.getLoc()

    if (styleObjectCst) {
      // 提取 { 和 } 的位置
      const lBraceCst = this.cstChildren(styleObjectCst).find(c => c.getName() === 'LBrace' || c.getValue() === '{')
      const rBraceCst = this.cstChildren(styleObjectCst).find(c => c.getName() === 'RBrace' || c.getValue() === '}')
      const lBraceLoc = lBraceCst?.getLoc()
      const rBraceLoc = rBraceCst?.getLoc()

      const args = this.extractCssPropertyExpressions(styleObjectCst)
      const callExpr = this.createCsstsClsCallWithArgs(args, cst.getLoc(), {
        cssTokenLoc,
        lBraceLoc,
        rBraceLoc
      })

        // 添加标记：标识这是 css 语法生成的表达式
        ; (callExpr as any).__isCssSyntax = true

      return callExpr
    }

    const identifierCsts = children.filter(c => c.getName() === 'IdentifierName')
    if (identifierCsts.length >= 2) {
      const atomCst = identifierCsts[1]
      const atomName = atomCst.getValue() || this.cstChildren(atomCst)[0]?.getValue() || ''
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
   * @param tokenLocs CSSTS 语法 token 位置，用于 source map 映射
   *   - cssTokenLoc: css 关键字位置 -> 对应生成代码中的 "cssts.merge"
   *   - lBraceLoc: { 位置 -> 对应生成代码中的 "("
   *   - rBraceLoc: } 位置 -> 对应生成代码中的 ")"
   */
  protected createCsstsClsCallWithArgs(
    args: SlimeExpression[],
    loc?: any,
    tokenLocs?: {
      cssTokenLoc?: any
      lBraceLoc?: any
      rBraceLoc?: any
    }
  ): SlimeExpression {
    // 创建 cssts.merge 的 loc：都使用 css 关键字的位置
    // 这样 css -> cssts.merge 形成完整的映射
    const csstsLoc = this.sourceLocationOf(tokenLocs?.cssTokenLoc, 'IdentifierName', 'cssts')

    // `.` 也使用 css 关键字的位置
    // `merge` 也使用 css 关键字的位置
    const mergeLoc = this.sourceLocationOf(tokenLocs?.cssTokenLoc, 'IdentifierName', 'merge')

    const csstsId = SlimeAstCreateUtils.createIdentifier('cssts', csstsLoc)
    const clsId = SlimeAstCreateUtils.createIdentifier('merge', mergeLoc)

    const callee = SlimeAstCreateUtils.createMemberExpression(csstsId, clsId, false, false, csstsLoc) as any
    callee.dotToken = tokenLocs?.cssTokenLoc ? { loc: this.generatorLoc(tokenLocs.cssTokenLoc, '.', 'Dot') } : undefined

    const callExpr = SlimeAstCreateUtils.createCallExpression(callee, args as any, false, this.sourceLocationOf(loc)) as any
    callExpr.lParenToken = tokenLocs?.lBraceLoc ? { loc: this.generatorLoc(tokenLocs.lBraceLoc, '(', 'LParen') } : undefined
    callExpr.rParenToken = tokenLocs?.rBraceLoc ? { loc: this.generatorLoc(tokenLocs.rBraceLoc, ')', 'RParen') } : undefined
    return callExpr
  }


  private extractCssPropertyExpressions(styleObjectCst: SubhutiCst | undefined): SlimeExpression[] {
    if (!styleObjectCst) return []
    const elementListCst = this.cstChildren(styleObjectCst).find(c => c.getName() === 'ElementList')
    if (!elementListCst) {
      const atomListCst = this.cstChildren(styleObjectCst).find(c => c.getName() === 'CssAtomList')
      return this.processCssAtomList(atomListCst)
    }
    const elements = this.processElementList(elementListCst)
    return elements.map(expr => this.transformCssPropertyExpression(expr))
  }

  private extractCstValue(cst: SubhutiCst | undefined): string {
    if (!cst) return ''
    const value = cst.getValue()
    if (value !== undefined && value !== null) return String(value)
    return this.cstChildren(cst).map(child => this.extractCstValue(child)).join('')
  }

  private processCssAtomList(cst: SubhutiCst | undefined): SlimeExpression[] {
    if (!cst) return []
    const expressions: SlimeExpression[] = []
    for (const child of this.cstChildren(cst)) {
      if (child.getName() === 'Comma' || child.getValue() === ',') {
        if (expressions.length > 0) {
          const lastExpr = expressions[expressions.length - 1] as any
          lastExpr.commaToken = { loc: child.getLoc() }
        }
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
    if (!children.length) return []
    const expressions: SlimeExpression[] = []

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const childName = child.getName()
      const childValue = child.getValue()

      // 处理逗号：将其位置附加到前一个表达式
      if (childName === 'Comma' || childValue === ',') {
        if (expressions.length > 0) {
          const lastExpr = expressions[expressions.length - 1] as any
          lastExpr.commaToken = { loc: child.getLoc() }
        }
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
    const assignExprCst = this.cstChildren(cst).find(c => c.getName() === 'AssignmentExpression')
    if (!assignExprCst) throw new Error('SpreadElement: missing AssignmentExpression')
    const argument = this.createAssignmentExpressionAst(assignExprCst)
    return { type: SlimeAstTypeName.SpreadElement, argument, loc: cst.getLoc() }
  }

  /**
   * 转换 css { } 内部的表达式
   * 
   * 规则：
   * - 标识符 + 是全局样式类 → csstsAtom.xxx
   * - 其他 → 保持原样
   */
  private transformCssPropertyExpression(expr: SlimeExpression): SlimeExpression {
    if (!expr) return expr

    // 标识符：判断是否是全局样式类
    if (this.astType(expr) === SlimeAstTypeName.Identifier) {
      const name = this.identifierName(expr)
      if (name && this.isAtomName(name)) {
        // 是全局样式类：转换为 csstsAtom.xxx
        // 保留原始标识符的 loc，用于 source map 映射
        this.usedAtoms.add(name)
        const result = this.createCsstsAtomMember(name, (expr as any).loc)
        // 保留原始表达式的 commaToken（逗号位置信息）
        if ((expr as any).commaToken) {
          (result as any).commaToken = (expr as any).commaToken
        }
        return result
      }
      // 不是样式类（变量引用）：保持原样
      return expr
    }

    // 逻辑表达式：递归处理两侧
    if (this.astType(expr) === SlimeAstTypeName.LogicalExpression) {
      const logicalExpr = expr as any
      logicalExpr.left = this.transformCssPropertyExpression(logicalExpr.left)
      logicalExpr.right = this.transformCssPropertyExpression(logicalExpr.right)
      if ('__left' in logicalExpr) logicalExpr.__left = logicalExpr.left
      if ('__right' in logicalExpr) logicalExpr.__right = logicalExpr.right
      return logicalExpr
    }

    // 三元表达式：递归处理三个部分
    if (this.astType(expr) === SlimeAstTypeName.ConditionalExpression) {
      const condExpr = expr as any
      condExpr.test = this.transformCssPropertyExpression(condExpr.test)
      condExpr.consequent = this.transformCssPropertyExpression(condExpr.consequent)
      condExpr.alternate = condExpr.alternate ? this.transformCssPropertyExpression(condExpr.alternate) : condExpr.alternate
      if ('__test' in condExpr) condExpr.__test = condExpr.test
      if ('__consequent' in condExpr) condExpr.__consequent = condExpr.consequent
      if ('__alternate' in condExpr) condExpr.__alternate = condExpr.alternate
      return condExpr
    }

    // 函数调用：递归处理参数
    if (this.astType(expr) === SlimeAstTypeName.CallExpression) {
      const callExpr = expr as any
      const args = this.javaListToArray(callExpr.arguments ?? callExpr.__arguments)
        .map((arg: any) => this.transformCssPropertyExpression(arg))
      this.setGeneratedList(callExpr, 'arguments', args)
      return callExpr
    }

    // 其他：保持原样（字符串、展开等）
    return expr
  }

  /**
   * 创建 csstsAtom.xxx 成员表达式
   * @param propName 属性名（原子类名）
   * @param propLoc 原始标识符的位置信息，用于 source map 映射
   */
  protected createCsstsAtomMember(propName: string, propLoc?: any): SlimeExpression {
    // Keep injected tokens aligned to the same source position as the atom name,
    // so virtual output does not split after `csstsAtom.`.
    const sourcePropLoc = this.sourceLocFromAstLoc(propLoc) ?? this.sourceLocationOf(propLoc)
    const atomLoc = this.sourceLocationOf(sourcePropLoc, 'IdentifierName', 'csstsAtom')

    const csstsAtomId = SlimeAstCreateUtils.createIdentifier('csstsAtom', atomLoc)
    // 传递原始 loc，确保 property 能正确映射回源代码
    const propId = SlimeAstCreateUtils.createIdentifier(propName, sourcePropLoc)
    const member = SlimeAstCreateUtils.createMemberExpression(csstsAtomId, propId, false, false, sourcePropLoc) as any
    member.dotToken = sourcePropLoc ? { loc: this.generatorLoc(sourcePropLoc, '.', 'Dot') } : undefined
    return member
  }

  createAssignmentExpressionAst(cst: SubhutiCst): SlimeExpression {
    const ast = super.createAssignmentExpressionAst(cst)

    // 如果右侧是 css 语法，转换为带合并的 merge
    if (ast.right?.__isCssSyntax) {
      return this.transformToCssMerge(ast)
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
  private transformToCssMerge(ast: any): SlimeExpression {
    const leftExpr = ast.left
    const rightArgs = ast.right.arguments || []

    // 复用 createCsstsClsCallWithArgs，将左侧表达式作为第一个参数
    const mergeCall = this.createCsstsClsCallWithArgs([leftExpr, ...rightArgs], ast.loc)

    return {
      type: SlimeAstTypeName.AssignmentExpression,
      operator: '=',
      left: leftExpr,
      right: mergeCall,
      loc: ast.loc
    } as any
  }

  private createQinObjectNodes(qinObject: SubhutiCst): any[] {
    const body = qinObject.getName() === 'QinObjectDeclarationBody'
      ? qinObject
      : this.findFirstByName(qinObject, 'QinObjectDeclarationBody') ?? qinObject
    const binding = this.findFirstByName(body, 'BindingIdentifier')
    if (!binding) {
      throw new Error('Qin object declaration must have a binding identifier')
    }

    const publicId = this.createBindingIdentifierAst(binding)
    const publicName = this.identifierName(publicId)
    if (!publicName) {
      throw new Error('Qin object declaration must have a binding identifier name')
    }

    const internalName = `${QIN_OBJECT_INTERNAL_PREFIX}${publicName}`
    const publicLoc = this.sourceLocFromAstLoc(publicId.loc)
    const internalClassId = SlimeAstCreateUtils.createIdentifier(internalName, publicLoc)
    const parsedClass = this.createClassDeclarationAst(body) as any
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
      if (qinObject) return qinObject
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
      if (first?.getName() === 'QinObjectDeclaration' || first?.getName() === 'QinObjectDeclarationBody') {
        return first
      }
    }
    return undefined
  }

  private findFirstByName(cst: SubhutiCst | undefined, name: string): SubhutiCst | undefined {
    if (!cst) return undefined
    if (cst.getName() === name) return cst
    for (const child of this.cstChildren(cst)) {
      const found = this.findFirstByName(child, name)
      if (found) return found
    }
    return undefined
  }


}

// ==================== 全局注册机制 ====================
// Use an explicit facade so imports keep calling the currently registered instance.

let _cssTsCstToAstUtils: CssTsCstToAst

_cssTsCstToAstUtils = new CssTsCstToAst()

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

export const CssTsCstToAstUtils = {} as CssTsCstToAst

function bindCssTsCstToAstUtilsForwarders() {
  let proto: any = CssTsCstToAst.prototype
  const stopProto = Object.getPrototypeOf(SlimeCstToAst.prototype)
  while (proto != null && proto !== stopProto) {
    for (const prop of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, prop)
      if (prop === 'constructor' || typeof descriptor?.value !== 'function') {
        continue
      }
      ;(CssTsCstToAstUtils as any)[prop] = function (...args: any[]) {
        return (_cssTsCstToAstUtils as any)[prop](...args)
      }
    }
    proto = Object.getPrototypeOf(proto)
  }
}

bindCssTsCstToAstUtilsForwarders()
