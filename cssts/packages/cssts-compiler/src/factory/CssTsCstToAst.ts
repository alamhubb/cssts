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
import { CSSTS_CONFIG } from "../utils/cssClassName.js"

/**
 * CSS 样式声明信息
 * 用于收集和跟踪文件中使用的 CSS 样式
 */
export interface CssStyleInfo {
  name: string           // 样式名称
  isAtomic: boolean      // 是否为原子类
  dependencies: string[] // 依赖的其他样式
  cssClassName: string   // 生成的 CSS 类名
  loc?: any              // 源码位置信息
}

/**
 * GroupUtil 信息（带 $$ 伪类分隔符的变量声明）
 * 
 * 用于处理如 `const btn$$hover$$active = css { ... }` 这样的伪类样式声明
 * 伪类分隔符 $$ 用于在变量名中编码伪类信息，运行时会解析并生成对应的 CSS 伪类规则
 */
export interface GroupUtilInfo {
  varName: string        // 原始变量名（如 btn$$hover$$active）
  className: string      // CSS 类名（如 btn）
  pseudos: string[]      // 伪类列表（如 ['hover', 'active']）
  atomNames: string[]    // 包含的原子类名
}


/**
 * CssTsCstToAst - CSS-in-TS CST 到 AST 转换器
 * 
 * 核心职责：
 * 1. 将 CssTsParser 解析出的 CST 转换为标准 ESTree AST
 * 2. 处理 css { } 表达式语法，转换为 cssts.$cls() 调用
 * 3. 收集使用的原子类名（usedAtoms），供 vite 插件生成 CSS
 * 4. 处理伪类变量（如 btn$$hover），注入运行时参数
 * 
 * 设计原则：
 * - 继承 SlimeCstToAst，复用标准 ES2025 语法的转换逻辑
 * - 只重写需要特殊处理的方法，保持最小侵入性
 * - 分离纯转换（toProgram）和完整转换（toFileAst），支持不同使用场景
 * 
 * 继承关系：
 * SlimeCstToAst (ES2025) → CssTsCstToAst (CSSTS) → OvsCstToSlimeAst (OVS)
 */
export class CssTsCstToAst extends SlimeCstToAst {
  /**
   * 收集的 CSS 样式信息
   * 用于后续生成 CSS 规则和类型定义
   */
  private cssStyles: Map<string, CssStyleInfo> = new Map()
  
  /**
   * 收集使用的原子类名
   * 
   * 为什么需要：vite 插件需要知道哪些原子类被使用，才能生成对应的 CSS 规则
   * 为什么用 Set：自动去重，同一个原子类可能在多处使用
   */
  private usedAtoms: Set<string> = new Set()
  
  /**
   * 临时存储当前正在处理的变量名
   * 
   * 为什么需要：处理伪类变量时，需要在 createLexicalBindingAst 中
   * 先记录变量名，然后在处理初始化表达式时使用
   * 
   * 为什么这样实现：CST 遍历是深度优先的，变量名在初始化表达式之前解析，
   * 需要临时存储以便后续使用
   */
  private currentVarName: string | null = null

  /**
   * 标记是否使用了 CSSTS 特有语法
   * 
   * 为什么需要：用于验证转换结果的正确性，
   * 如果使用了 css { } 语法但 usedAtoms 为空，说明转换有问题
   */
  protected _hasCsstsSyntax = false

  constructor() {
    super()
  }

  /**
   * 获取是否使用了 CSSTS 语法
   * 
   * 为什么是 getter：只读属性，外部只能查询不能修改
   */
  get hasCsstsSyntax(): boolean {
    return this._hasCsstsSyntax
  }


  /**
   * 重置所有状态
   * 
   * 为什么需要：每次转换新文件前必须重置状态，否则会累积之前文件的数据
   * 为什么是 protected：子类（如 OvsCstToSlimeAst）需要重写此方法来重置自己的状态
   */
  protected resetState(): void {
    this._hasCsstsSyntax = false
    this.cssStyles.clear()
    this.usedAtoms.clear()
    this.currentVarName = null
  }

  /**
   * 重写 toProgram，在转换前重置状态
   * 
   * 为什么需要重写：每次转换新文件前必须重置 CSSTS 特有的状态
   * 为什么先调用 resetState：确保每次转换都是干净的起点
   * 为什么再调用 super.toProgram：复用父类的标准 ES2025 转换逻辑
   */
  toProgram(cst: SubhutiCst): SlimeProgram {
    this.resetState()
    return super.toProgram(cst)
  }

  /**
   * 获取收集的 CSS 样式信息
   * 
   * 为什么需要：供外部（如 vite 插件）获取样式信息，生成 CSS 规则
   */
  getCssStyles(): Map<string, CssStyleInfo> {
    return this.cssStyles
  }

  /**
   * 获取使用的原子类名集合
   * 
   * 为什么需要：供外部（如 vite 插件）获取原子类名，生成 CSS 和类型定义
   */
  getUsedAtoms(): Set<string> {
    return this.usedAtoms
  }

  /**
   * 清空 usedAtoms
   * 
   * 为什么需要：vite 插件在处理每个文件前需要清空，避免累积
   * 为什么单独提供：与 resetState 不同，这个方法只清空 usedAtoms，
   * 用于外部调用（如 vitePluginOvsTransform），不影响其他状态
   */
  clearUsedAtoms() {
    this.usedAtoms.clear()
  }




  /**
   * 面向文件的完整 AST 转换：CST → AST + 后处理
   * 
   * 为什么需要：实际编译时需要完整的可执行代码，包括必要的导入语句
   * 
   * 职责：
   * 1. 调用 toProgram 做纯 AST 转换
   * 2. 如果使用了 CSSTS 语法，自动添加 cssts 和 csstsAtom 导入
   * 
   * 适用场景：vite 插件、实际编译
   * 
   * 为什么这样设计：
   * - 复用 toProgram 的转换逻辑
   * - 后处理逻辑集中在一处，易于维护
   * - 子类可以重写 toProgram 而不影响后处理
   */
  toFileAst(cst: SubhutiCst): SlimeProgram {
    // 先调用 toProgram 做纯 AST 转换
    const program = this.toProgram(cst)
    
    // CSSTS 后处理：添加 cssts 和 csstsAtom 导入
    // 只有在实际使用了原子类时才添加导入，避免无用导入
    if (this.usedAtoms.size > 0) {
      program.body = this.ensureCsstsImports(program.body)
    }
    
    return program
  }

  /**
   * 处理 cssts 相关的后处理逻辑
   * 
   * 为什么需要：子类（如 OvsCstToSlimeAst）可能重写 toProgram，
   * 但仍需要复用 CSSTS 的导入处理逻辑
   * 
   * 为什么是 protected：只供子类调用，不对外暴露
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
   * 
   * 为什么需要：css { } 语法转换后会生成 cssts.$cls(csstsAtom.xxx) 调用，
   * 必须有对应的导入才能运行
   * 
   * 为什么检查已有导入：用户可能已经手动导入了 cssts，避免重复导入
   * 
   * 为什么插入到现有导入之后：保持代码风格一致，所有导入语句放在一起
   * 
   * 为什么是 protected：子类可能需要重写或扩展导入逻辑
   */
  protected ensureCsstsImports(body: Array<SlimeStatement | SlimeModuleDeclaration>): Array<SlimeStatement | SlimeModuleDeclaration> {
    let hasCsstsImport = false
    let hasCsstsAtomImport = false

    // 检查是否已有导入
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

    // 创建缺失的导入
    const newImports: SlimeModuleDeclaration[] = []
    
    if (!hasCsstsImport) {
      newImports.push(this.createCsstsImport())
    }
    
    if (!hasCsstsAtomImport) {
      newImports.push(this.createCsstsAtomImport())
    }

    // 插入到现有导入之后
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


  /**
   * 创建 cssts 导入语句：import { cssts } from 'cssts'
   * 
   * 为什么需要：cssts.$cls() 调用需要 cssts 对象
   * 为什么是 private：只在内部使用，不需要子类重写
   */
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

  /**
   * 创建 csstsAtom 导入语句：import { csstsAtom } from 'virtual:csstsAtom'
   * 
   * 为什么需要：csstsAtom.xxx 引用需要 csstsAtom 对象
   * 为什么是 virtual: 前缀：这是 vite 虚拟模块，由 vite-plugin-cssts 动态生成
   * 为什么是 private：只在内部使用，不需要子类重写
   */
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


  /**
   * 重写 createLexicalBindingAst，捕获带 $$ 伪类分隔符的变量声明
   * 
   * 为什么需要重写：
   * 1. 检测伪类变量（如 btn$$hover$$active）
   * 2. 收集伪类变量名到 usedAtoms
   * 3. 注入 csstsAtom['varName'] 作为 cssts.$cls() 的第一个参数
   * 
   * 处理流程：
   * 1. 提取变量名
   * 2. 如果包含 $$，记录到 currentVarName
   * 3. 调用父类方法处理（会触发 createCssExpressionAst）
   * 4. 如果是伪类变量，修改生成的 cssts.$cls() 调用，注入伪类参数
   * 
   * 为什么这样实现：
   * - 利用 CST 遍历的深度优先特性，变量名先于初始化表达式处理
   * - 通过 currentVarName 临时存储，在处理完初始化表达式后使用
   * - 最小侵入性，只在必要时修改 AST
   */
  createLexicalBindingAst(cst: SubhutiCst): any {
    // 提取变量名
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
    
    // 调用父类方法处理（会递归处理初始化表达式）
    const result = super.createLexicalBindingAst(cst)
    
    // 如果是伪类变量，收集到 usedAtoms 并注入参数
    if (this.currentVarName && this.currentVarName.includes(CSSTS_CONFIG.PSEUDO_SEPARATOR)) {
      // 收集伪类样式名到 usedAtoms，供 vite 插件生成对应的 CSS 规则
      this.usedAtoms.add(this.currentVarName)
      
      // 注入 csstsAtom['varName'] 作为 cssts.$cls() 的第一个参数
      // 这样运行时可以获取伪类配置信息
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
      
      // 清空临时变量
      this.currentVarName = null
    }
    
    return result
  }


  /**
   * 创建 csstsAtom['propName'] 计算属性访问表达式
   * 
   * 为什么需要：伪类变量名包含 $$，不能用点号访问（csstsAtom.btn$$hover 语法错误）
   * 为什么用计算属性：csstsAtom['btn$$hover$$active'] 是合法的 JS 语法
   * 为什么是 protected：子类可能需要复用此方法
   * 
   * @param propName 属性名（如 'btn$$hover$$active'）
   * @returns MemberExpression AST 节点
   */
  protected createCsstsAtomMemberComputed(propName: string): SlimeExpression {
    const csstsAtomId = SlimeNodeCreate.createIdentifier('csstsAtom')
    const propLiteral = SlimeNodeCreate.createStringLiteral(propName)
    return {
      type: SlimeNodeType.MemberExpression,
      object: csstsAtomId,
      property: propLiteral,
      computed: true,  // 使用计算属性访问 []
      optional: false
    } as any
  }

  /**
   * 重写 createPrimaryExpressionAst，处理 CssExpression
   * 
   * 为什么需要重写：CssExpression 是 CSSTS 特有语法，父类不认识
   * 
   * 处理逻辑：
   * 1. 检查第一个子节点是否是 CssExpression
   * 2. 如果是，调用 createCssExpressionAst 处理
   * 3. 否则，调用父类方法处理标准 ES 语法
   * 
   * 为什么这样实现：最小侵入性，只拦截 CssExpression，其他表达式交给父类
   */
  createPrimaryExpressionAst(cst: SubhutiCst): SlimeExpression {
    const first = cst.children?.[0]
    if (first && first.name === CssTsParser.prototype.CssExpression.name) {
      return this.createCssExpressionAst(first)
    }
    return super.createPrimaryExpressionAst(cst)
  }


  /**
   * 处理 CssExpression CST，转换为 cssts.$cls() 调用
   * 
   * 为什么需要：这是 CSSTS 的核心转换逻辑
   * 
   * 输入语法：
   * - css { colorRed, fontBold }  → 样式对象形式
   * - css atomName                → 单个原子类形式（较少使用）
   * 
   * 输出：
   * - 样式对象形式 → cssts.$cls(csstsAtom.colorRed, csstsAtom.fontBold)
   * - 单个原子类形式 → 字符串字面量 "atomName"
   * 
   * 为什么转换为 cssts.$cls()：
   * - 运行时合并多个样式对象
   * - 支持条件样式、展开语法等高级特性
   * - 类型安全，csstsAtom 有完整的类型定义
   */
  createCssExpressionAst(cst: SubhutiCst): SlimeExpression {
    // 标记使用了 CSSTS 语法
    this._hasCsstsSyntax = true

    const children = cst.children || []
    const styleObjectCst = children.find(c => c.name === CssTsParser.prototype.CssStyleObject.name)
    
    // 样式对象形式：css { colorRed, fontBold }
    if (styleObjectCst) {
      const args = this.extractCssPropertyExpressions(styleObjectCst)
      return this.createCsstsClsCallWithArgs(args, cst.loc)
    }
    
    // 单个原子类形式：css atomName
    const identifierCsts = children.filter(c => c.name === 'IdentifierName')
    if (identifierCsts.length >= 2) {
      const atomCst = identifierCsts[1]  // 第一个是 'css' 关键字，第二个是原子类名
      const atomName = atomCst.value || atomCst.children?.[0]?.value || ''
      this.usedAtoms.add(atomName)
      return SlimeNodeCreate.createStringLiteral(atomName)
    }
    
    // 兜底：返回空字符串
    return SlimeNodeCreate.createStringLiteral('')
  }

  /**
   * 创建 cssts.$cls(...args) 调用表达式
   * 
   * 为什么需要：统一生成 cssts.$cls() 调用的逻辑
   * 为什么是 protected：子类可能需要复用或扩展
   * 
   * @param args 参数列表（csstsAtom.xxx 表达式）
   * @param loc 源码位置信息
   * @returns CallExpression AST 节点
   */
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


  /**
   * 从 CssStyleObject CST 中提取属性表达式列表
   * 
   * 为什么需要：css { } 内部是 ElementList，需要提取并转换每个元素
   * 
   * 处理流程：
   * 1. 找到 ElementList 子节点
   * 2. 调用 processElementList 提取所有表达式
   * 3. 对每个表达式调用 transformCssPropertyExpression 转换
   * 
   * 为什么是 private：只在内部使用，不需要子类重写
   */
  private extractCssPropertyExpressions(styleObjectCst: SubhutiCst | undefined): SlimeExpression[] {
    if (!styleObjectCst) return []

    const elementListCst = styleObjectCst.children?.find(c => c.name === 'ElementList')
    if (!elementListCst) return []

    const elements = this.processElementList(elementListCst)
    return elements.map(expr => this.transformCssPropertyExpression(expr))
  }

  /**
   * 处理 ElementList CST，提取所有表达式
   * 
   * 为什么需要：ElementList 包含逗号分隔的表达式，需要过滤逗号并提取表达式
   * 
   * 支持的元素类型：
   * - AssignmentExpression：普通表达式（如 colorRed, condition && fontBold）
   * - SpreadElement：展开语法（如 ...baseStyles）
   * 
   * 为什么是 private：只在内部使用，不需要子类重写
   */
  private processElementList(cst: SubhutiCst): SlimeExpression[] {
    if (!cst.children) return []

    const expressions: SlimeExpression[] = []
    
    for (const child of cst.children) {
      // 跳过逗号和省略元素
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


  /**
   * 处理 SpreadElement CST，转换为 SpreadElement AST
   * 
   * 为什么需要：支持 css { ...baseStyles, colorRed } 展开语法
   * 
   * 为什么不直接用父类方法：父类的 createSpreadElementAst 可能不存在或签名不同，
   * 这里提供一个简单的实现
   */
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

  /**
   * 转换 css { } 内部的属性表达式
   * 
   * 为什么需要：css { } 内部的标识符需要转换为 csstsAtom.xxx 引用
   * 
   * 转换规则：
   * - Identifier（如 colorRed）→ csstsAtom.colorRed
   * - SpreadElement（如 ...base）→ 保持不变
   * - LogicalExpression（如 condition && colorRed）→ 递归转换右侧
   * - ConditionalExpression（如 cond ? colorRed : fontBold）→ 递归转换两个分支
   * - CallExpression（如 getStyle()）→ 保持不变（动态样式）
   * 
   * 为什么这样设计：
   * - 只转换需要转换的部分，保持其他表达式不变
   * - 支持条件样式、逻辑表达式等高级用法
   * - 递归处理嵌套表达式
   */
  private transformCssPropertyExpression(expr: SlimeExpression): SlimeExpression {
    if (!expr) return expr

    // 标识符 → csstsAtom.xxx
    if (expr.type === SlimeNodeType.Identifier) {
      const name = (expr as any).name || ''
      if (name) {
        this.usedAtoms.add(name)
        return this.createCsstsAtomMember(name)
      }
    }

    // SpreadElement 保持不变
    if ((expr as any).type === SlimeNodeType.SpreadElement) {
      return expr
    }

    // LogicalExpression：递归转换右侧
    // 如 condition && colorRed → condition && csstsAtom.colorRed
    if (expr.type === SlimeNodeType.LogicalExpression) {
      const logicalExpr = expr as any
      return {
        ...logicalExpr,
        right: this.transformCssPropertyExpression(logicalExpr.right)
      }
    }

    // ConditionalExpression：递归转换两个分支
    // 如 cond ? colorRed : fontBold → cond ? csstsAtom.colorRed : csstsAtom.fontBold
    if (expr.type === SlimeNodeType.ConditionalExpression) {
      const condExpr = expr as any
      return {
        ...condExpr,
        consequent: this.transformCssPropertyExpression(condExpr.consequent),
        alternate: condExpr.alternate ? this.transformCssPropertyExpression(condExpr.alternate) : condExpr.alternate
      }
    }

    // CallExpression 保持不变（动态样式）
    if (expr.type === SlimeNodeType.CallExpression) {
      return expr
    }

    // 其他表达式保持不变
    return expr
  }


  /**
   * 创建 csstsAtom.propName 点号访问表达式
   * 
   * 为什么需要：将原子类名转换为 csstsAtom 对象的属性访问
   * 为什么用点号访问：原子类名是合法的标识符（如 colorRed），可以用点号访问
   * 为什么是 protected：子类可能需要复用此方法
   * 
   * @param propName 属性名（如 'colorRed'）
   * @returns MemberExpression AST 节点
   */
  protected createCsstsAtomMember(propName: string): SlimeExpression {
    const csstsAtomId = SlimeNodeCreate.createIdentifier('csstsAtom')
    const propId = SlimeNodeCreate.createIdentifier(propName)
    
    return {
      type: SlimeNodeType.MemberExpression,
      object: csstsAtomId,
      property: propId,
      computed: false,  // 使用点号访问 .
      optional: false
    } as any
  }

  /**
   * 重写 createAssignmentExpressionAst，检测并转换 CSS 替换模式
   * 
   * 为什么需要重写：支持 style.color = 'newColor' 这样的 CSS 属性替换语法
   * 
   * CSS 替换模式：
   * - 输入：style.color = 'colorBlue'
   * - 输出：style = cssts.replace(style, 'color', 'colorBlue')
   * 
   * 为什么需要这个功能：
   * - 支持动态修改样式对象的某个属性
   * - 自动处理属性冲突检测
   * - 保持类型安全
   */
  createAssignmentExpressionAst(cst: SubhutiCst): SlimeExpression {
    const ast = super.createAssignmentExpressionAst(cst)
    
    // 检测是否是 CSS 替换模式
    if (this.isCssReplacePattern(ast)) {
      return this.transformToCsstsReplace(ast)
    }
    
    return ast
  }


  /**
   * 检测是否是 CSS 替换模式
   * 
   * 模式：obj.prop = 'stringValue'
   * - 左侧是 MemberExpression
   * - 操作符是 =
   * - 右侧是字符串字面量
   * 
   * 为什么这样检测：
   * - 只有这种特定模式才需要转换
   * - 避免误转换其他赋值表达式
   */
  private isCssReplacePattern(ast: any): boolean {
    if (ast.type !== SlimeNodeType.AssignmentExpression) return false
    if (ast.operator !== '=') return false
    if (ast.left?.type !== SlimeNodeType.MemberExpression) return false
    if (ast.right?.type !== SlimeNodeType.Literal) return false
    if (typeof ast.right?.value !== 'string') return false
    return true
  }

  /**
   * 将 CSS 替换模式转换为 cssts.replace() 调用
   * 
   * 转换：
   * - 输入：style.color = 'colorBlue'
   * - 输出：style = cssts.replace(style, 'color', 'colorBlue')
   * 
   * 为什么这样转换：
   * - cssts.replace() 会检测属性冲突并正确替换
   * - 返回新的样式对象，保持不可变性
   * - 类型安全，编译时检查属性名和值
   */
  private transformToCsstsReplace(ast: any): SlimeExpression {
    const memberExpr = ast.left
    const objectName: string = memberExpr.object?.name || memberExpr.object?.value || 'style'
    const propertyName: string = memberExpr.property?.name || memberExpr.property?.value || ''
    const newAtomName: string = ast.right.value || ''
    
    // 创建 cssts.replace 调用
    const csstsId = SlimeNodeCreate.createIdentifier('cssts')
    const replaceId = SlimeNodeCreate.createIdentifier('replace')
    const callee: SlimeExpression = {
      type: SlimeNodeType.MemberExpression,
      object: csstsId,
      property: replaceId,
      computed: false,
      optional: false
    } as any
    
    // 参数：(style, 'color', 'colorBlue')
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
    
    // 返回 style = cssts.replace(...)
    return {
      type: SlimeNodeType.AssignmentExpression,
      operator: '=',
      left: SlimeNodeCreate.createIdentifier(objectName),
      right: replaceCall,
      loc: ast.loc
    } as any
  }

}

/**
 * 默认导出单例实例
 * 
 * 为什么导出单例：大多数场景只需要一个实例，避免重复创建
 * 为什么同时导出类：某些场景需要创建新实例或继承
 */
const cssTsCstToAst = new CssTsCstToAst()
export default cssTsCstToAst
