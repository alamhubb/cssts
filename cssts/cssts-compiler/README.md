# cssts-compiler

> CssTs 编译器 - 解析、转换、生成

## 📚 文档导航

- **[配置系统](./CONFIG.md)** - 详细的配置指南和最佳实践
- **[核心 API](#核心-api)** - 编译器 API 文档
- **[类型定义生成](#类型定义生成)** - 生成 `.d.ts` 文件

## ⚠️ 重要：伪类分隔符是双美元符号

使用两个美元符号标记伪类（不是单个美元符号）：

```typescript
// ✅ 正确：使用两个美元符号
const btn$$hover$$active = css { cursorPointer }

// ❌ 错误：使用单个美元符号（伪类不会生效！）
const btn$hover$active = css { cursorPointer }
```

分隔符配置来自 `cssts-runtime`：`CSSTS_CONFIG.PSEUDO_SEPARATOR = '$$'`

---

## 核心职责

`cssts-compiler` 负责所有**编译时**的工作：

1. **解析** - 解析 `.cssts` 文件中的 `css { }` 语法
2. **转换** - CST 到 AST 转换，生成 `csstsAtom.xxx` 引用
3. **CSS 生成** - 根据使用的样式生成 CSS
4. **类型生成** - 生成 `.d.ts` 类型定义文件

## 模块结构

```
cssts-compiler/
├── parser/          # 解析器（CssTsParser）
├── factory/         # AST 转换器（CssTsCstToAst）
├── transform/       # 核心转换功能（transformCssTs）
├── generator/       # 类型定义生成器
├── utils/           # 工具函数（getCssClassName 等）
└── types/           # 生成的 .d.ts 文件输出目录
```

## 分隔符配置

从 `cssts` 导入统一的分隔符配置：

```typescript
import { CSSTS_CONFIG } from 'cssts'

CSSTS_CONFIG.SEPARATOR        // '_'   - 类名分隔符
CSSTS_CONFIG.PSEUDO_SEPARATOR // '$'  - 伪类分隔符（双美元符号）
```

> **注意**：包名是 `cssts`，不是 `cssts-runtime`（目录名和包名不一致）

## 核心设计：统一的样式存储

使用单一的 `Set<string>` 存储所有样式名，按需解析：

```typescript
// 存储
const styles = new Set<string>()
styles.add('displayFlex')                    // 普通原子类
styles.add('clickable$$hover$$active')       // 带伪类的样式（双美元符号）

// 解析
parseStyleName('displayFlex')
// { baseName: 'displayFlex', pseudos: [] }

parseStyleName('clickable$$hover$$active')
// { baseName: 'clickable', pseudos: ['hover', 'active'] }
```

**优点**：
- 数据结构简单（只有一个 `Set<string>`）
- 不存储冗余数据
- 按需解析，更灵活

## 核心 API

### transformCssTs - 单文件转换

```typescript
import { transformCssTs, type TransformContext } from 'cssts-compiler'

// 创建上下文（多文件共享）
const context: TransformContext = {
  styles: new Set<string>()
}

// 转换 .cssts 文件
const result = transformCssTs(code, context)
// result.code - 转换后的 JS 代码
// result.hasStyles - 是否有样式

// context.styles 会被自动填充（包括 $ 伪类样式）
```

### parseStyleName - 样式名解析

```typescript
import { parseStyleName } from 'cssts-compiler'

// 普通原子类
parseStyleName('displayFlex')
// { baseName: 'displayFlex', pseudos: [] }

// 带伪类的样式（双美元符号）
parseStyleName('clickable$$hover$$active')
// { baseName: 'clickable', pseudos: ['hover', 'active'] }
```

### generateStylesCss - CSS 生成

```typescript
import { generateStylesCss } from 'cssts-compiler'

const css = generateStylesCss(
  styles,       // Set<string>
  pseudoUtils,  // 伪类配置（可选）
  prefix        // 类名前缀（可选）
)
```

### generateCsstsAtomModule - 虚拟模块生成

```typescript
import { generateCsstsAtomModule } from 'cssts-compiler'

const moduleCode = generateCsstsAtomModule(
  styles,  // Set<string>
  prefix   // 类名前缀（可选）
)
```

## 类型定义生成

用于生成 `.d.ts` 文件（输出到 `cssts-compiler/types/`）：

```typescript
import { 
  generateAtoms,
  generateCsstsAtomsDts,
  generateGlobalDts,
  generate
} from 'cssts-compiler'

// 根据配置生成所有原子类定义
const atoms = generateAtoms()

// 生成 CsstsAtoms.d.ts
const atomsDts = generateCsstsAtomsDts(atoms)

// 或者一次性生成所有文件
await generate() // 输出到 cssts-compiler/types/
```

## 伪类语法

使用两个美元符号标记伪类：

```typescript
// 输入
const clickable$$hover$$active = css { cursorPointer, displayFlex }

// 解析
parseStyleName('clickable$$hover$$active')
// { baseName: 'clickable', pseudos: ['hover', 'active'] }
```

### 生成的 CSS

```css
/* 原子类（来自 css {}） */
.cursor_pointer { cursor: pointer; }
.display_flex { display: flex; }

/* 伪类样式（来自配置） */
.clickable:hover { opacity: 0.9; }
.clickable:active { opacity: 0.6; }
```

## 类名生成规则

### 最长前缀匹配

```typescript
getCssClassName('backgroundColorRed')
// 匹配 "backgroundColor" → "background-color"
// 值 "Red" → "red"
// 结果: "background-color_red"
```

### 值转换规则

| 转义符 | 含义 | 示例 |
|--------|------|------|
| `p` | `.` 小数点 | `0p9` → `0.9` |
| `pct` | `%` 百分号 | `50pct` → `50%` |
| `s` | `/` 斜杠 | `16s9` → `16/9` |
| `N` | `-` 负数 | `N1` → `-1` |

## License

MIT
