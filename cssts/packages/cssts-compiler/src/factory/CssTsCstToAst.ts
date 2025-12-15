import { SlimeCstToAst } from "slime-parser/src/language/SlimeCstToAstUtil.ts"
import SubhutiCst from "subhuti/src/struct/SubhutiCst.ts"
import CssTsParser from "../parser/CssTsParser.js"
import { SlimeNodeType } from "slime-ast/src/SlimeNodeType.ts"
import {
  type SlimeExpression,
  type SlimeStatement,
  type SlimeModuleDeclaration,
  type SlimeProgram,
  SlimeProgramSourceType,
} from "slime-ast/src/SlimeESTree.ts"
import SlimeParser from "slime-parser/src/language/es2025/SlimeParser.ts"
import SlimeNodeCreate from "slime-ast/src/SlimeNodeCreate.ts"
import { getCssClassName, CSSTS_CONFIG } from "../utils/cssClassName.js"

/**
 * CSS 样式声明信息
 */
export interface CssStyleInfo {
  name: string
  isAtomic: boolean
  dependencies: string[]
  cssClassName: string
  loc?: any
}

/**
 * GroupUtil 信息（带 $$ 伪类的变量声明）
 */
export interface GroupUtilInfo {
  varName: string        // 原始变量名（如 base$$hover$$active）
  className: string      // CSS 类名（如 base）
  pseudos: string[]      // 伪类列表（如 ['hover', 'active']）
  atomNames: string[]    // 包含的原子类名
}

/**
 * CssTsCstToAst - CSS-in-TS CST 到 AST 转换器
 */
export class CssTsCstToAst extends SlimeCstToAst {
  private cssStyles: Map<string, CssStyleInfo> = new Map()
  private usedAtoms: Set<string> = new Set()
  
  // 临时存储当前正在处理的变量名（用于收集 $$ 变量）
  private currentVarName: string | null = null

  constructor() {
    super()
  }


  getCssStyles(): Map<string, CssStyleInfo> {
    return this.cssStyles
  }

  clearCssStyles() {
    this.cssStyles.clear()
  }

  getUsedAtoms(): Set<string> {
    return this.usedAtoms
  }

  clearUsedAtoms() {
    this.usedAtoms.clear()
  }

  toProgram(cst: SubhutiCst): SlimeProgram {
    // 支持 Program 和 Module 两种入口
    const programName = SlimeParser.prototype.Program?.name || 'Program'
    const moduleName = SlimeParser.prototype.Module?.name || 'Module'
    
    if (cst.name !== programName && cst.name !== moduleName) {
      throw new Error(`Expected ${programName} or ${moduleName}, got ${cst.name}`)
    }

    if (!cst.children || cst.children.length === 0) {
      return SlimeNodeCreate.createProgram([], SlimeProgramSourceType.Module)
    }

    const hashbangCommentName = 'HashbangComment'
    const moduleBodyName = SlimeParser.prototype.ModuleBody?.name || 'ModuleBody'
    const scriptBodyName = SlimeParser.prototype.ScriptBody?.name || 'ScriptBody'
    const moduleItemListName = SlimeParser.prototype.ModuleItemList?.name || 'ModuleItemList'
    const statementListName = SlimeParser.prototype.StatementList?.name || 'StatementList'

    let bodyChild: SubhutiCst | null = null
    for (const child of cst.children) {
      if (child.name === hashbangCommentName) continue
      bodyChild = child
      break
    }

    if (!bodyChild) {
      return SlimeNodeCreate.createProgram([], SlimeProgramSourceType.Module)
    }

    let body: Array<SlimeStatement | SlimeModuleDeclaration> = []
    let sourceType: SlimeProgramSourceType = SlimeProgramSourceType.Module

    if (bodyChild.name === moduleBodyName) {
      const moduleItemList = bodyChild.children?.[0]
      if (moduleItemList && moduleItemList.name === moduleItemListName) {
        body = this.createModuleItemListAst(moduleItemList)
      }
      sourceType = SlimeProgramSourceType.Module
    } else if (bodyChild.name === moduleItemListName) {
      body = this.createModuleItemListAst(bodyChild)
      sourceType = SlimeProgramSourceType.Module
    } else if (bodyChild.name === scriptBodyName) {
      const statementList = bodyChild.children?.[0]
      if (statementList && statementList.name === statementListName) {
        body = this.createStatementListAst(statementList)
      }
      sourceType = SlimeProgramSourceType.Script
    } else if (bodyChild.name === statementListName) {
      body = this.createStatementListAst(bodyChild)
      sourceType = SlimeProgramSourceType.Script
    }

    if (this.usedAtoms.size > 0) {
      body = this.ensureCsstsImports(body)
    }

    const program = SlimeNodeCreate.createProgram(body, sourceType)
    program.loc = cst.loc
    return program
  }

  /**
   * 处理 cssts 相关的后处理逻辑
   * 子类（如 OvsCstToSlimeAst）可以在自己的 toProgram 中调用此方法
   * 
   * @param body 已转换的 AST body
   * @returns 添加了 cssts 导入的 body
   */
  protected processCsstsPostTransform(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    if (this.usedAtoms.size > 0) {
      return this.ensureCsstsImports(body)
    }
    return body
  }

  /**
   * 确保有 cssts 和 csstsAtom 的导入
   */
  protected ensureCsstsImports(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    let hasCsstsImport = false
    let hasCsstsAtomImport = false

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
              if (spec.local?.name === 'cssts') {
                hasCsstsImport = true
              }
            }
          }
        }
        if (source === 'virtual:csstsAtom') {
          hasCsstsAtomImport = true
        }
      }
    }

    const newImports: SlimeModuleDeclaration[] = []
    
    if (!hasCsstsImport) {
      newImports.push(this.createCsstsImport())
    }
    
    if (!hasCsstsAtomImport) {
      newImports.push(this.createCsstsAtomImport())
    }

    if (newImports.length > 0) {
      let insertIndex = 0
      for (let i = 0; i < body.length; i++) {
        if (body[i].type === SlimeNodeType.ImportDeclaration) {
          insertIndex = i + 1
        } else {
          break
        }
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

  createDeclarationAst(cst: SubhutiCst): any {
    const first = cst.children?.[0]
    if (first && first.name === CssTsParser.prototype.CssDeclaration.name) {
      return this.createCssDeclarationAst(first)
    }
    return super.createDeclarationAst(cst)
  }
  
  /**
   * 重写 createLexicalBindingAst，捕获带 $$ 的 const/let 变量声明
   */
  createLexicalBindingAst(cst: SubhutiCst): any {
    // 获取变量名
    const firstChild = cst.children?.[0]
    let varName: string | null = null
        
    if (firstChild?.name === 'BindingIdentifier') {
      const idChild = firstChild.children?.[0]
      varName = idChild?.value || idChild?.children?.[0]?.value || null
    }
    
    // 如果变量名包含 $$（伪类分隔符），设置当前变量名
    if (varName && varName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      this.currentVarName = varName
    }
    
    // 调用父类方法处理
    const result = super.createLexicalBindingAst(cst)
    
    // 如果是 $$ 变量，收集到 usedAtoms 并注入参数
    if (this.currentVarName && this.currentVarName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      // 收集伪类样式名到 usedAtoms
      this.usedAtoms.add(this.currentVarName)
      
      // 注入 csstsAtom['varName'] 作为 cssts.$cls() 的第一个参数
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

  protected createCsstsClsCall(properties: string[], loc?: any): SlimeExpression {
    const csstsId = SlimeNodeCreate.createIdentifier('cssts')
    const clsId = SlimeNodeCreate.createIdentifier('$cls')
    const callee: SlimeExpression = {
      type: SlimeNodeType.MemberExpression,
      object: csstsId,
      property: clsId,
      computed: false,
      optional: false
    } as any
    
    const args = properties.map(prop => this.createCsstsAtomMember(prop))
    
    return {
      type: SlimeNodeType.CallExpression,
      callee,
      arguments: args,
      optional: false,
      loc
    } as any
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
      if (child.name === 'Comma' || child.value === ',' || child.name === 'Elision') {
        continue
      }
      
      if (child.name === 'AssignmentExpression') {
        const expr = this.createAssignmentExpressionAst(child)
        expressions.push(expr)
      } else if (child.name === 'SpreadElement') {
        const expr = this.createSpreadElementAst(child)
        expressions.push(expr as any)
      }
    }

    return expressions
  }

  createSpreadElementAst(cst: SubhutiCst): any {
    const assignExprCst = cst.children?.find(c => c.name === 'AssignmentExpression')
    if (!assignExprCst) {
      throw new Error('SpreadElement: missing AssignmentExpression')
    }
    
    const argument = this.createAssignmentExpressionAst(assignExprCst)
    return {
      type: SlimeNodeType.SpreadElement,
      argument,
      loc: cst.loc
    }
  }

  private transformCssPropertyExpression(expr: SlimeExpression): SlimeExpression {
    if (!expr) return expr

    if (expr.type === SlimeNodeType.Identifier) {
      const name = (expr as any).name || ''
      if (name) {
        this.usedAtoms.add(name)
        return this.createCsstsAtomMember(name)
      }
    }

    if ((expr as any).type === SlimeNodeType.SpreadElement) {
      return expr
    }

    if (expr.type === SlimeNodeType.LogicalExpression) {
      const logicalExpr = expr as any
      return {
        ...logicalExpr,
        right: this.transformCssPropertyExpression(logicalExpr.right)
      }
    }

    if (expr.type === SlimeNodeType.ConditionalExpression) {
      const condExpr = expr as any
      return {
        ...condExpr,
        consequent: this.transformCssPropertyExpression(condExpr.consequent),
        alternate: condExpr.alternate ? this.transformCssPropertyExpression(condExpr.alternate) : condExpr.alternate
      }
    }

    if (expr.type === SlimeNodeType.CallExpression) {
      return expr
    }

    return expr
  }

  /**
   * 创建 csstsAtom.xxx 成员访问表达式
   */
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
    
    if (this.isCssReplacePattern(ast)) {
      return this.transformToCsstsReplace(ast)
    }
    
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

  createStatementListItemAst(cst: SubhutiCst): SlimeStatement[] {
    this.checkCstName(cst, SlimeParser.prototype.StatementListItem.name)

    if (!cst.children || cst.children.length === 0) {
      return []
    }

    const child = cst.children[0]

    if (child.name === SlimeParser.prototype.Statement.name) {
      const statementChild = child.children?.[0]

      if (statementChild && statementChild.name === CssTsParser.prototype.CssDeclarationStatement.name) {
        const cssDecl = statementChild.children?.find(
          c => c.name === CssTsParser.prototype.CssDeclaration.name
        )
        if (cssDecl) {
          const ast = this.createCssDeclarationAst(cssDecl)
          return ast ? [ast] : []
        }
        return []
      }
    }

    return super.createStatementListItemAst(cst)
  }

  createCssDeclarationAst(cst: SubhutiCst): SlimeStatement | null {
    const children = cst.children || []

    const styleNameCst = children[1]
    if (!styleNameCst) {
      throw new Error('CssDeclaration: missing style name')
    }
    const styleName: string = styleNameCst.value || styleNameCst.children?.[0]?.value || ''

    const assignIndex = children.findIndex(c => c.value === '=' || c.name === 'Assign')
    const hasValue = assignIndex !== -1

    if (hasValue) {
      const styleObjectCst = children.find(c => c.name === CssTsParser.prototype.CssStyleObject.name)
      const dependencies = this.extractCssProperties(styleObjectCst)

      if (styleName) {
        this.cssStyles.set(styleName, {
          name: styleName,
          isAtomic: false,
          dependencies,
          cssClassName: getCssClassName(styleName),
          loc: cst.loc
        })
      }

      return this.createCssConstDeclaration(styleName, dependencies, cst.loc)
    } else {
      if (styleName) {
        this.cssStyles.set(styleName, {
          name: styleName,
          isAtomic: true,
          dependencies: [],
          cssClassName: getCssClassName(styleName),
          loc: cst.loc
        })
      }

      return {
        type: SlimeNodeType.EmptyStatement,
        loc: cst.loc
      } as any
    }
  }

  private extractCssProperties(styleObjectCst: SubhutiCst | undefined): string[] {
    if (!styleObjectCst) return []

    const properties: string[] = []
    const elementListCst = styleObjectCst.children?.find(c => c.name === 'ElementList')

    if (elementListCst && elementListCst.children) {
      for (const child of elementListCst.children) {
        if (child.name === 'Comma' || child.value === ',') continue
        
        if (child.name === 'AssignmentExpression') {
          const name = this.extractIdentifierName(child)
          if (name) {
            properties.push(name)
          }
        }
      }
    }

    return properties
  }

  private extractIdentifierName(cst: SubhutiCst): string | null {
    if (!cst) return null
    
    if (cst.name === 'IdentifierName') {
      return cst.value || cst.children?.[0]?.value || null
    }
    
    if (cst.children && cst.children.length > 0) {
      return this.extractIdentifierName(cst.children[0])
    }
    
    return null
  }

  private createCssConstDeclaration(
    styleName: string,
    dependencies: string[],
    loc?: any
  ): SlimeStatement {
    const properties = dependencies.map((dep, i) => {
      const id = SlimeNodeCreate.createIdentifier(dep)
      const prop = SlimeNodeCreate.createPropertyAst(id, { ...id })
      prop.shorthand = true
      return SlimeNodeCreate.createObjectPropertyItem(
        prop,
        i < dependencies.length - 1 ? { type: 'Comma', value: ',' } as any : undefined
      )
    })

    const objectExpr = SlimeNodeCreate.createObjectExpression(properties)

    const declarator = SlimeNodeCreate.createVariableDeclarator(
      SlimeNodeCreate.createIdentifier(styleName),
      { type: 'Assign', value: '=' } as any,
      objectExpr
    )

    const declaration = SlimeNodeCreate.createVariableDeclaration(
      { type: 'Const', value: 'const' } as any,
      [declarator]
    )

    declaration.loc = loc
    return declaration
  }

  private checkCstName(cst: SubhutiCst, expectedName: string) {
    if (cst.name !== expectedName) {
      throw new Error(`Expected ${expectedName}, got ${cst.name}`)
    }
  }
}

const cssTsCstToAst = new CssTsCstToAst()
export default cssTsCstToAst
