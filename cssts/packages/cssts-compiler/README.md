# cssts-compiler

> CssTs 编译器 - 解析器、AST 转换器与类型生成器

## 核心设计理念

`cssts-compiler` 负责所有**编译时**的工作：

1. **解析** - 解析 `css { }` 语法
2. **转换** - CST 到 AST 转换，生成 `csstsAtom.xxx` 引用
3. **类名生成** - 将 TS 变量名转换为 CSS 类名

## ⚠️ `$$` 伪类语法

> **重要：使用 `$$` 双美元符号，不是单个 `$`！**

### 解析规则

```typescript
// 变量名格式：{className}$${pseudo1}$${pseudo2}...（双美元符号）
'clickable$$hover'              // className: 'clickable', pseudos: ['hover']
'myButton$$hover$$active'       // className: 'myButton', pseudos: ['hover', 'active']
'btn$$hover$$active$$focus'     // className: 'btn', pseudos: ['hover', 'active', 'focus']
```

### 实现原理（简单直接）

生成 CSS 时，检测变量名是否包含 `$$`：

1. 解析变量名：`primary$$hover$$active` → 类名 `primary`，伪类 `['hover', 'active']`
2. 生成普通样式：`.primary { ... }`（原子类组合）
3. 生成伪类样式：`.primary:hover { ... }`、`.primary:active { ... }`（从配置读取属性）

不需要收集器、不需要全局状态。

### 生成的 CSS

伪类的 CSS 属性来自配置，不是来自 `css { }` 内容：

```typescript
// 配置
pseudoUtils: {
  hover: { opacity: '0.9' },
  active: { opacity: '0.6' }
}

// 输入（使用 $$ 双美元符号）
const clickable$$hover$$active = css { cursorPointer, displayFlex }

// 生成的 CSS
.clickable { cursor: pointer; display: flex; }  // 来自 css {}
.clickable:hover { opacity: 0.9; }              // 来自配置
.clickable:active { opacity: 0.6; }             // 来自配置
```

## 分隔符常量

```typescript
// cssts-runtime 定义，compiler 导入使用
import { CSSTS_SEPARATOR, CSSTS_PSEUDO_SEPARATOR } from 'cssts-runtime'

CSSTS_SEPARATOR = '_'           // 类名分隔符：property_value
CSSTS_PSEUDO_SEPARATOR = '$$'   // 伪类分隔符：className$$pseudo
```

## 核心 API

### CssTsParser - 解析器

```typescript
import { CssTsParser } from 'cssts-compiler'

const parser = new CssTsParser(`
  const style = css { displayFlex, colorRed }
`)
const cst = parser.Program()
```

### CssTsCstToAst - AST 转换器

```typescript
import { CssTsCstToAst } from 'cssts-compiler'

const transformer = new CssTsCstToAst(getCssClassName)
const ast = transformer.toProgram(cst)

// 获取使用的原子类
const usedAtoms = transformer.getUsedAtoms()
// Set { 'displayFlex', 'colorRed' }
```

### parsePseudoFromVarName - 伪类解析

```typescript
// 使用 CSSTS_PSEUDO_SEPARATOR 分割（双美元符号）
parsePseudoFromVarName('clickable$$hover$$active')
// 返回: { className: 'clickable', pseudos: ['hover', 'active'] }

parsePseudoFromVarName('buttonStyle')
// 返回: { className: 'buttonStyle', pseudos: [] }
```

## 类名生成规则

### 最长前缀匹配

```typescript
// 输入: "backgroundColorRed"
// 按长度降序匹配，找到 "backgroundColor" → "background-color"
// 值部分: "Red" → "red"
// 输出: "background-color_red"
```

### 值转换规则

| 转义符 | 含义 | 示例 |
|--------|------|------|
| `p` | `.` 小数点 | `0p9` → `0.9` |
| `pct` | `%` 百分号 | `50pct` → `50%` |
| `s` | `/` 斜杠 | `16s9` → `16/9` |
| `N` | `-` 负数 | `N1` → `-1` |

## 许可证

MIT
