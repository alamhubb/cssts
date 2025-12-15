# CSSTS 架构设计

> 运行时、编译器、Vite 插件之间的协作关系

## ⚠️ 重要：伪类分隔符是双美元符号 `$$`

**伪类语法使用双美元符号 `$$`，不是单美元符号 `$`！**

```typescript
// ✅ 正确：使用双美元符号 $$
const primary$$hover$$active = css { backgroundColorBlue }

// ❌ 错误：使用单美元符号 $（伪类不会生效！）
const primary$hover$active = css { backgroundColorBlue }
```

分隔符配置来自 `cssts-runtime`：

```typescript
import { CSSTS_CONFIG } from 'cssts'
console.log(CSSTS_CONFIG.PSEUDO_SEPARATOR)  // '$$'
```

---

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
│  │    - PSEUDO_SEPARATOR: '$$' (变量名$$伪类)                       │   │
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
// 变量名（使用双美元符号 $$ 分隔伪类）
const btn$$hover$$active = css { cursorPointer }

// 解析
parseStyleName('btn$$hover$$active')
// { baseName: 'btn', pseudos: ['hover', 'active'] }

// 生成的 CSS
// .cursor_pointer { cursor: pointer; }
// .btn:hover { opacity: 0.9; }      ← 来自 pseudoUtils 配置
// .btn:active { opacity: 0.6; }     ← 来自 pseudoUtils 配置
```


## 自动解构：作用域分析 + 命名规则

### 问题背景

在 `css { }` 表达式中，用户可能混合使用原子类名和变量：

```typescript
const baseStyles = css { colorRed, fontBold }
const primary = css { baseStyles, backgroundBlue }  // baseStyles 是变量，不是原子类
```

编译器需要区分：
- **原子类名**（如 `colorRed`）→ 转换为 `csstsAtom.colorRed`
- **变量引用**（如 `baseStyles`）→ 保持原样，运行时自动解构

### 解决方案：作用域分析 + 命名规则

采用两层判断机制：

```
css { xxx } 内的标识符判断流程：

1. 先查作用域：xxx 在当前作用域中声明过吗？
   ├─ 是 → 保持原样（是变量或导入）
   └─ 否 → 继续判断

2. 再查命名规则：parseTsAtomName(xxx) 能解析吗？
   ├─ 能 → 转换为 csstsAtom.xxx（是原子类）
   └─ 不能 → 保持原样（未知标识符）
```

### 作用域收集

在 CST 遍历过程中实时收集：

1. **Import 声明**：`import { someStyle } from './styles'` → 收集 `someStyle`
2. **变量声明**：`const baseStyles = ...` → 收集 `baseStyles`
3. **函数参数**：`function foo(style) {}` → 收集 `style`
4. **块级作用域**：进入 `{}` 时 push 新作用域，离开时 pop

### 命名规则判断

使用 `parseTsAtomName()` 函数判断是否符合原子类命名规则：

```typescript
parseTsAtomName('colorRed')      // { property: 'color', value: 'red' } ✓
parseTsAtomName('displayFlex')   // { property: 'display', value: 'flex' } ✓
parseTsAtomName('baseStyles')    // null ✗ (不以 CSS 属性名开头)
parseTsAtomName('myVariable')    // null ✗
```

### 设计原因

1. **作用域优先**：确保用户声明的变量不会被误转换
2. **命名规则兜底**：对于不在作用域中的标识符，用命名规则判断是否是原子类
3. **一遍遍历**：作用域分析是实时的，不需要两遍遍历
4. **安全降级**：不符合任何规则的标识符保持原样，避免运行时错误

### 示例

```typescript
import { sharedStyle } from './shared'

const baseStyles = css { colorRed, fontBold }
const primary = css { baseStyles, backgroundBlue, sharedStyle, unknownThing }
```

| 标识符 | 作用域检查 | 命名规则检查 | 结果 |
|--------|-----------|-------------|------|
| `colorRed` | ✗ 不在作用域 | ✓ 能解析 | `csstsAtom.colorRed` |
| `fontBold` | ✗ 不在作用域 | ✓ 能解析 | `csstsAtom.fontBold` |
| `baseStyles` | ✓ 在作用域中 | - | 保持原样 |
| `backgroundBlue` | ✗ 不在作用域 | ✓ 能解析 | `csstsAtom.backgroundBlue` |
| `sharedStyle` | ✓ 在作用域中（import） | - | 保持原样 |
| `unknownThing` | ✗ 不在作用域 | ✗ 不能解析 | 保持原样 |

### 运行时支持

`$cls()` 函数已支持递归解构对象：

```typescript
// 运行时 processValue 函数
function processValue(value: ClassValue, result: ClassObject): void {
  // ...
  if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      if (val) {
        if (typeof val === 'object' && val !== null) {
          processValue(val as ClassValue, result)  // 递归解构
        } else {
          result[key] = true
        }
      }
    }
  }
}
```

所以 `cssts.$cls(baseStyles, csstsAtom.backgroundBlue)` 会正确合并 `baseStyles` 对象中的所有样式。

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

## Vite 两阶段处理架构

### 为什么需要处理两个阶段？

Vite 启动时有两个关键阶段：

```
1. 依赖预构建（optimizeDeps）  ← esbuild 直接解析文件
2. 文件转换（transform）       ← Vite 插件在这里工作
```

**问题**：esbuild 在依赖预构建阶段会解析 `.vue` 文件来分析 import 语句，但它不认识 `css {}` 语法，会报错：

```
Expected ";" but found "{"
const baseStyles = css {
                      ^
```

### 解决方案：一个插件，两阶段处理

`vite-plugin-cssts` 通过 `config` 钩子自动注入 esbuild 插件，同时处理两个阶段：

```
源文件 (VueButton.vue)
    │
    ├─→ esbuild 依赖扫描（内存中，只读）
    │     └─ cssts esbuild 插件：css {} → {}（简单替换）
    │     └─ esbuild 解析 import 语句
    │     └─ 结果用于依赖分析，然后丢弃
    │
    └─→ Vite transform（内存中）
          └─ cssts Vite 插件：正确转换 css {} 语法
          └─ 生成样式类名和 CSS
          └─ 返回给浏览器
```

**关键点**：
- 两个阶段都是**独立读取源文件**，互不影响
- esbuild 阶段的处理**不会修改磁盘上的源文件**
- esbuild 阶段只需要让语法合法即可，真正的转换在 transform 阶段

### 插件实现

```typescript
export default function cssTsPlugin(options): Plugin {
  return {
    name: 'vite-plugin-cssts',
    enforce: 'pre',

    // 1. 通过 config 钩子注入 esbuild 插件
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [{
              name: 'cssts-esbuild',
              setup(build) {
                // 处理 .vue 文件，将 css {} 替换为 {}
                build.onLoad({ filter: /\.vue$/ }, async (args) => {
                  const code = fs.readFileSync(args.path, 'utf-8')
                  if (!hasCssSyntax(code)) return null
                  
                  const transformed = code.replace(/css\s*\{[^}]*\}/g, '{}')
                  return { contents: transformed, loader: 'text' }
                })
              }
            }]
          }
        }
      }
    },

    // 2. 正常的 transform 处理
    transform(code, id) {
      // 真正转换 css {} 语法
    }
  }
}
```

### 为什么这样设计？

1. **用户体验**：只需配置一个插件，不需要手动配置 esbuild
2. **关注点分离**：esbuild 阶段只做"让语法合法"，transform 阶段做"正确转换"
3. **不影响源码**：所有处理都在内存中，源文件保持不变

---

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

### .vue 文件

```
Button.vue
    │
    ├─► esbuild 依赖扫描阶段（内存中）
    │   • cssts esbuild 插件拦截
    │   • 将 css {} 替换为 {}（简单替换，让 esbuild 能解析）
    │   • 结果只用于依赖分析，不保存
    │
    └─► Vite transform 阶段（内存中）
        │
        ▼ vite-plugin-cssts.transform()
        │
        ├─► 提取 <script> 内容
        ├─► transformCssTs(scriptContent, { styles: globalStyles })
        │   • 解析 css {} 语法
        │   • 收集原子类名到 globalStyles
        │   • 转换为 cssts.$cls() 调用
        ├─► 重建 .vue 文件（替换 <script> 内容）
        │
        └─► 注入 import 'virtual:cssts.css'
```


## 常见问题与修复记录

### 问题 1：包名导入错误

**问题描述**：
`cssts-compiler` 中导入 `CSSTS_CONFIG` 时使用了错误的包名。

**错误代码**：
```typescript
// ❌ 错误：包名不存在
import { CSSTS_CONFIG } from "cssts-runtime"
```

**正确代码**：
```typescript
// ✅ 正确：使用实际的包名
import { CSSTS_CONFIG } from "cssts"
```

**问题原因**：
- `cssts-runtime` 包的 `package.json` 中 `name` 字段是 `"cssts"`，不是 `"cssts-runtime"`
- 目录名和包名不一致，容易混淆
- 在 monorepo 中，workspace 链接使用的是 `package.json` 中的 `name` 字段

**如何避免**：
1. 导入前检查目标包的 `package.json` 中的 `name` 字段
2. 包目录名应与 `package.json` 中的 `name` 保持一致
3. 在 monorepo 中，使用 `npm ls` 或查看 `node_modules` 中的符号链接确认包名

**相关文件**：
- `cssts/packages/cssts-runtime/package.json` - 包名定义为 `"cssts"`
- `cssts/packages/cssts-compiler/src/utils/cssClassName.ts` - 导入 `CSSTS_CONFIG`

---

### 问题 2：伪类分隔符使用错误

**问题描述**：
组件代码中使用的伪类分隔符与配置不匹配，导致伪类样式不生效。

**错误示例**：
```typescript
// 配置中定义的分隔符是双美元符号
CSSTS_CONFIG.PSEUDO_SEPARATOR = '$$'

// 组件中错误使用单美元符号
const primary$hover$active = css { ... }  // ❌ 不匹配，伪类不生效
```

**正确示例**：
```typescript
// 配置中定义的分隔符是双美元符号
CSSTS_CONFIG.PSEUDO_SEPARATOR = '$$'

// 组件中使用双美元符号
const primary$$hover$$active = css { ... }  // ✅ 匹配，伪类生效
```

**问题原因**：
- `CSSTS_CONFIG.PSEUDO_SEPARATOR` 的值决定了编译器如何解析变量名中的伪类
- 如果组件代码使用的分隔符与配置不匹配，编译器无法识别伪类部分
- 伪类样式不会被生成，hover/active 等效果失效

**如何避免**：
1. 在编写组件前，先确认 `CSSTS_CONFIG.PSEUDO_SEPARATOR` 的值（当前是 `$$`）
2. 保持团队内分隔符使用的一致性
3. 在文档中明确说明当前使用的分隔符

**当前配置**：
```typescript
// cssts-runtime/src/index.ts
export const CSSTS_CONFIG = {
  SEPARATOR: '_',           // CSS 类名分隔符：property_value
  PSEUDO_SEPARATOR: '$$',   // 伪类分隔符：baseName$$pseudo1$$pseudo2
}
```

**伪类语法示例**：
```typescript
// 单个伪类
const btn$$hover = css { cursorPointer }
// 生成：.btn:hover { filter: brightness(1.15); }

// 多个伪类
const primary$$hover$$active = css { backgroundColorBlue }
// 生成：
// .primary:hover { filter: brightness(1.15); }
// .primary:active { filter: brightness(0.85); }
```

**相关文件**：
- `cssts/packages/cssts-runtime/src/index.ts` - `CSSTS_CONFIG` 定义
- `cssts/packages/cssts-compiler/src/factory/CssTsCstToAst.ts` - 伪类解析逻辑
- `vite.config.ts` - `pseudoUtils` 配置伪类效果

---

### 调试技巧

**检查伪类样式是否生效**：

1. 打开浏览器 DevTools
2. 在 Console 中运行：
```javascript
// 查找所有 :hover 和 :active 规则
for (const sheet of document.styleSheets) {
  try {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText?.includes(':hover') || 
          rule.selectorText?.includes(':active')) {
        console.log(rule.selectorText, rule.style.cssText)
      }
    }
  } catch (e) {}
}
```

3. 检查是否有类似以下的规则：
```css
.primary:hover { filter: brightness(1.15); }
.primary:active { filter: brightness(0.85); }
```

**检查元素的 class 属性**：
```javascript
document.querySelector('button').className
// 应该包含基础类名，如 "primary display_inline-flex ..."
```


---

## cssts-language 包

### 概述

`cssts-language` 是一个 VSCode 扩展，为 `.cssts` 文件提供语言服务支持（LSP）。基于 [Volar](https://github.com/volarjs/volar.js) 框架构建。

### 功能

- **语法高亮**：通过 TextMate 语法定义
- **智能补全**：CSS 属性名、值的自动补全
- **悬停提示**：显示 CSS 属性的文档
- **跳转到定义**：支持变量和导入的跳转
- **查找引用**：查找样式变量的所有引用
- **语义令牌**：更精确的语法着色

### 目录结构

```
cssts-language/
├── cssts-language-server/     # 语言服务器
│   └── src/
│       ├── index.ts           # 服务器入口
│       ├── CsstsLanguagePlugin.ts  # Volar 语言插件
│       └── logutil.ts         # 日志工具
├── cssts-vscode-client/       # VSCode 客户端扩展
│   └── src/
│       └── extension.ts       # 扩展入口
├── syntaxes/                  # TextMate 语法定义
│   └── cssts.tmLanguage.json
├── examples/                  # 示例文件
│   └── demo.cssts
├── language-configuration.json # 语言配置（括号匹配、注释等）
├── package.json               # 扩展清单
├── tsdown.config.ts           # 构建配置
└── README.md
```

### 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        VSCode                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  cssts-vscode-client (extension.ts)                      │   │
│  │  • 启动语言客户端                                         │   │
│  │  • 连接语言服务器                                         │   │
│  │  • 获取 TypeScript SDK 路径                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ IPC                               │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  cssts-language-server (index.ts)                        │   │
│  │  • 基于 @volar/language-server                           │   │
│  │  • 创建 TypeScript 项目                                   │   │
│  │  • 注册语言插件                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CsstsLanguagePlugin                                     │   │
│  │  • getLanguageId(): 识别 .cssts 文件                     │   │
│  │  • createVirtualCode(): 创建虚拟 TypeScript 代码         │   │
│  │  • typescript.extraFileExtensions: 注册 .cssts 扩展名   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 工作原理

1. **文件识别**：当用户打开 `.cssts` 文件时，VSCode 根据 `package.json` 中的语言配置识别文件类型

2. **语法高亮**：TextMate 语法定义 (`cssts.tmLanguage.json`) 提供基础的语法着色

3. **语言服务**：
   - 客户端启动语言服务器进程
   - 服务器加载 `CsstsLanguagePlugin`
   - 插件将 `.cssts` 文件映射为虚拟 TypeScript 文件
   - TypeScript 语言服务提供智能功能

4. **虚拟代码映射**：
   - `.cssts` 文件内容直接作为 TypeScript 处理
   - 创建 1:1 的源码映射
   - 所有 TypeScript 功能（补全、诊断等）自动可用

### 开发

```bash
# 进入目录
cd cssts/cssts-language

# 安装依赖
npm install

# 构建
npm run build

# 在 VSCode 中按 F5 启动扩展开发主机
```

### 打包发布

```bash
npm run package
# 生成 cssts-language-x.x.x.vsix 文件
```

### 依赖

- `@volar/language-core` - Volar 语言核心
- `@volar/language-server` - Volar 语言服务器
- `@volar/vscode` - Volar VSCode 集成
- `volar-service-typescript` - TypeScript 语言服务
- `vscode-languageclient` - LSP 客户端
- `vscode-languageserver` - LSP 服务器
