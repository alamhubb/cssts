# CssTs

> CSS-in-TS：编译时原子 CSS 类管理系统

CssTs 是一个类型安全的原子 CSS 解决方案，通过 TypeScript 提供完整的 IDE 支持，在编译时生成优化的 CSS。

## ⚠️ 重要：伪类语法使用 `$$`（双美元符号）！

```typescript
// ✅ 正确：使用 $$ 双美元符号
const primary$$hover$$active = css { ... }

// ❌ 错误：不要使用单个 $
const primary$hover$active = css { ... }
```

分隔符定义在 `cssts-runtime`：`CSSTS_PSEUDO_SEPARATOR = '$$'`

## 特性

- 🎯 **类型安全** - 完整的 TypeScript 类型定义，IDE 代码补全
- 🚀 **编译时优化** - CSS 在构建时按需生成，零运行时开销
- 🔧 **灵活配置** - 属性 → 单位 → 配置的直观配置结构
- ⚡ **冲突处理** - 智能检测并替换同属性样式
- 📦 **零依赖运行时** - runtime 包无任何依赖，体积最小，只做对象操作
- 🧩 **两层架构** - Atom + GroupUtil 简洁组合
- 🎨 **`$$` 伪类语法** - 通过变量名声明伪类（双美元符号），配置定义伪类属性

## 核心架构：两层样式系统

```
┌─────────────────────────────────────────────────────────────┐
│  GroupUtil（组合工具）- .cssts 文件                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  clickable = css { cursorPointer, ... }              │   │
│  │  clickable$$hover = css { cursorPointer, ... }      │   │
│  │  组合多个原子类，可选添加伪类（使用 $$ 双美元符号）   │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Atom（原子类）- 配置生成                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  opacity_0.9, cursor_pointer, display_flex          │   │
│  │  单个 CSS 属性的原子类                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## `$$` 伪类语法

### 实现原理（简单直接）

生成 CSS 时，检测变量名是否包含 `$$`：

1. 解析变量名：`primary$$hover$$active` → 类名 `primary`，伪类 `['hover', 'active']`
2. 生成普通样式：`.primary { ... }`（原子类组合）
3. 生成伪类样式：`.primary:hover { ... }`、`.primary:active { ... }`（从配置读取属性）

就这么简单，不需要收集器、不需要全局状态。

### 基本用法

```typescript
// .cssts 文件中

// 普通样式类（无伪类）
const clickable = css { cursorPointer, displayFlex }
// 生成：.clickable { cursor: pointer; display: flex; }

// 带伪类的样式类（使用 $$ 双美元符号）
const clickable$$hover = css { cursorPointer, displayFlex }
// 生成：
// .clickable { cursor: pointer; display: flex; }     ← 普通样式
// .clickable:hover { opacity: 0.9; }                 ← 伪类样式（来自配置）
```

### 伪类属性来自配置

`:hover` 的 CSS 属性不是来自 `css { }` 里的内容，而是来自配置：

```typescript
// vite.config.ts 配置
cssTsPlugin({
  pseudoUtils: {
    hover: { opacity: '0.9' },
    active: { opacity: '0.6' },
    focus: { outline: '2px solid blue' },
    disabled: { opacity: '0.5', cursor: 'not-allowed' }
  }
})
```

### 多伪类支持

```typescript
// 多个伪类用 $$ 链式追加（双美元符号）
const myButton$$hover$$active$$focus = css { cursorPointer, padding8px }

// 生成：
// .myButton { cursor: pointer; padding: 8px; }
// .myButton:hover { opacity: 0.9; }      ← 来自配置
// .myButton:active { opacity: 0.6; }     ← 来自配置
// .myButton:focus { outline: 2px solid blue; }  ← 来自配置
```

### 完整示例

```typescript
// CsstsButton.cssts（使用 $$ 双美元符号）
const buttonBase$$hover$$active = css { 
  displayInlineFlex, 
  justifyContentCenter, 
  padding8px,
  cursorPointer
}

// 生成的 CSS：
// .buttonBase { display: inline-flex; justify-content: center; padding: 8px; cursor: pointer; }
// .buttonBase:hover { opacity: 0.9; }
// .buttonBase:active { opacity: 0.6; }
```

### 类名格式

| 类型 | 格式 | 示例 | CSS 选择器 |
|------|------|------|-----------|
| 普通 Atom | `{属性}_{值}` | `opacity_0.9` | `.opacity_0\.9` |
| GroupUtil | 自定义名 | `clickable` | `.clickable` |
| GroupUtil + 伪类 | 自定义名 + `$$伪类` | `clickable$$hover` | `.clickable` + `.clickable:hover` |

## 值转换规则

| 转义符 | 含义 | 示例 |
|--------|------|------|
| `p` | `.` 小数点 | `opacity0p9` → `0.9` |
| `pct` | `%` 百分号 | `width50pct` → `50%` |
| `s` | `/` 斜杠 | `aspectRatio16s9` → `16/9` |
| `N` | `-` 负数 | `zIndexN1` → `-1` |

## 分隔符常量

```typescript
// cssts-runtime/src/index.ts
export const CSSTS_SEPARATOR = '_'           // 类名分隔符：property_value
export const CSSTS_PSEUDO_SEPARATOR = '$$'   // 伪类分隔符：className$$pseudo
```

## 配置系统

```typescript
interface CsstsConfig {
  properties: {
    [property: string]: {
      zero?: boolean
      px?: UnitConfig
      rem?: UnitConfig
    }
  }
  
  // 伪类配置（$$ 语法使用，双美元符号）
  pseudoUtils?: {
    [pseudo: string]: { [property: string]: string }
  }
}
```

## 快速开始

```bash
npm install cssts cssts-runtime cssts-compiler
```

```typescript
// .cssts 文件

// 普通样式
const buttonStyle = css { displayFlex, padding16px }

// 带伪类的样式（使用 $$ 双美元符号）
const clickableButton$$hover$$active = css { displayFlex, cursorPointer }

// 在 Vue 中使用
<template>
  <button :class="clickableButton$$hover$$active">点击我</button>
</template>
```

## 许可证

MIT
