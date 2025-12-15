# CSSTS 架构设计

> 运行时、编译器、Vite 插件之间的协作关系

## CSS 语法说明

### 支持的语法：CSS 表达式

CSSTS 只支持 **css 表达式语法**，可以在任何表达式位置使用：

```typescript
// ✅ 支持：css 表达式
const buttonBase = css { colorRed, fontBold }
const styles = { primary: css { bgPrimary } }
div(class = css { primaryButton, marginTop }) {}
```

### 不支持的语法：CSS 声明

**不支持** css 声明语法（如 `css colorRed`）：

```typescript
// ❌ 不支持：css 声明语法
css colorRed  // 这种语法不被支持
```

### 设计原因

声明语法需要重写 `Statement` 和 `Declaration` 规则，会导致与标准 JavaScript 语法冲突。例如：

```typescript
// 如果支持 css 声明语法，会破坏 async function 的解析
async function foo() {}  // 可能被误解析
```

表达式语法更灵活，不会破坏 JS 兼容性，推荐使用。

## 整体架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           源代码文件                                     │
│  .cssts 文件 / .ovs 文件                                                │
│  const style = css { displayFlex, colorRed }                            │
│  const btn$$hover$$active = css { cursorPointer }                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Vite 插件层                                      │
│  ┌─────────────────────────┐    ┌─────────────────────────┐            │
│  │   vite-plugin-cssts     │    │   vite-plugin-ovs       │            │
│  │   处理 .cssts 文件       │    │   处理 .ovs 文件         │            │
│  └───────────┬─────────────┘    └───────────┬─────────────┘            │
│              │                              │                           │
│              └──────────┬───────────────────┘                           │
│                         │                                               │
│                         ▼                                               │
│              ┌─────────────────────────┐                                │
│              │  sharedStyles: Set<string>                               │
│              │  共享的样式收集器                                          │
│              │  存储所有原子类名                                          │
│              └─────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          编译器层                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  cssts-compiler                                                  │   │
│  │  • CssTsCstToAst: CST → AST 转换                                 │   │
│  │  • 收集 usedAtoms（原子类名）                                     │   │
│  │  • 生成 cssts.$cls(csstsAtom.xxx) 调用                           │   │
│  │  • 生成 CSS 规则                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              ▲                                          │
│                              │ 继承                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ovs-compiler                                                    │   │
│  │  • OvsCstToSlimeAst extends CssTsCstToAst                        │   │
│  │  • 复用父类的 css {} 语法处理                                     │   │
│  │  • 调用 processCsstsPostTransform() 添加导入                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          运行时层                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  cssts-runtime                                                   │   │
│  │  • $cls(): 合并样式对象                                           │   │
│  │  • replace(): 属性冲突检测 + 替换                                 │   │
│  │  • CSSTS_CONFIG: 分隔符配置                                       │   │
│  │    - SEPARATOR: '_' (属性_值)                                    │   │
│  │    - PSEUDO_SEPARATOR: '$$' (变量名$$伪类)                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           输出                                          │
│  • JS: import { cssts } from 'cssts'                                   │
│        import { csstsAtom } from 'virtual:csstsAtom'                   │
│        const style = cssts.$cls(csstsAtom.displayFlex, ...)            │
│                                                                         │
│  • CSS: .display_flex { display: flex; }                               │
│         .btn:hover { opacity: 0.9; }                                   │
│         .btn:active { opacity: 0.6; }                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

## 核心设计：共享样式收集器

### 问题

- `.cssts` 文件由 `vite-plugin-cssts` 处理
- `.ovs` 文件由 `vite-plugin-ovs` 处理
- 两种文件都可能使用 `css {}` 语法
- 需要统一收集所有样式，生成完整的 CSS

### 解决方案

使用共享的 `Set<string>` 作为样式收集器：

```typescript
// vite-plugin-ovs 创建共享 Set
const sharedStyles = new Set<string>()

// 传给 cssts 插件
cssTsPlugin({ globalStyles: sharedStyles })

// 传给 ovs 转换函数
vitePluginOvsTransform(code, { globalStyles: sharedStyles })
```

### 数据流

1. **vite-plugin-cssts** 处理 `.cssts` 文件时，调用 `transformCssTs()`，收集样式到 `globalStyles`
2. **vite-plugin-ovs** 处理 `.ovs` 文件时，调用 `vitePluginOvsTransform()`，收集样式到同一个 `globalStyles`
3. 虚拟模块 `virtual:cssts.css` 从 `globalStyles` 读取所有样式，生成 CSS
4. 虚拟模块 `virtual:csstsAtom` 从 `globalStyles` 读取所有样式，生成原子类对象

## 继承关系

```
SlimeCstToAst (slime-parser)
       │
       ▼
CssTsCstToAst (cssts-compiler)
  • createLexicalBindingAst() - 收集 $$ 变量
  • createCssExpressionAst() - 处理 css {} 语法
  • processCsstsPostTransform() - 添加 cssts 导入
       │
       ▼
OvsCstToSlimeAst (ovs-compiler)
  • toProgram() - 重写，处理 OVS 语法
  • 调用 processCsstsPostTransform() - 复用父类的 cssts 处理
  • 处理 OVS 特有的导入（$OvsHtmlTag 等）
```

## 分隔符配置

统一在 `cssts-runtime` 中配置：

```typescript
export const CSSTS_CONFIG = {
  // CSS 类名分隔符：property_value
  SEPARATOR: '_',
  
  // 伪类分隔符（双美元符号）：baseName$$pseudo1$$pseudo2
  PSEUDO_SEPARATOR: '$$',
}
```

### 使用示例

```typescript
// 变量名
const btn$$hover$$active = css { cursorPointer }

// 解析
parseStyleName('btn$$hover$$active')
// { baseName: 'btn', pseudos: ['hover', 'active'] }

// 生成的 CSS
// .cursor_pointer { cursor: pointer; }
// .btn:hover { opacity: 0.9; }      ← 来自 pseudoUtils 配置
// .btn:active { opacity: 0.6; }     ← 来自 pseudoUtils 配置
```

## 虚拟模块

### virtual:cssts.css

生成所有原子类的 CSS 规则：

```css
.display_flex { display: flex; }
.color_red { color: red; }
.btn:hover { opacity: 0.9; }
.btn:active { opacity: 0.6; }
```

### virtual:csstsAtom

生成原子类对象映射：

```typescript
export const csstsAtom = {
  displayFlex: { 'display_flex': true },
  colorRed: { 'color_red': true },
  // ...
}
```

## 配置示例

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import ovs from 'vite-plugin-ovs'

export default defineConfig({
  plugins: [
    ovs({
      cssts: {
        pseudoUtils: {
          hover: { opacity: '0.9' },
          active: { opacity: '0.6' },
          focus: { outline: '2px solid #79bbff' },
          disabled: { opacity: '0.5', cursor: 'not-allowed' }
        }
      }
    })
  ]
})
```

## 文件处理流程

### .cssts 文件

```
Button.cssts
    │
    ▼ vite-plugin-cssts.transform()
    │
    ├─► transformCssTs(code, { styles: globalStyles })
    │   • 解析 css {} 语法
    │   • 收集原子类名到 globalStyles
    │   • 转换为 cssts.$cls() 调用
    │
    └─► 注入 import 'virtual:cssts.css'
```

### .ovs 文件

```
Button.ovs
    │
    ▼ vite-plugin-ovs.transform()
    │
    ├─► vitePluginOvsTransform(code, { globalStyles: sharedStyles })
    │   • OvsCstToSlimeAst.toProgram()
    │     - 处理 OVS 语法（div {}, view 等）
    │     - 处理 css {} 语法（继承自 CssTsCstToAst）
    │     - 收集 usedAtoms
    │   • 写入 sharedStyles
    │
    └─► 注入 import 'virtual:cssts.css'
```
