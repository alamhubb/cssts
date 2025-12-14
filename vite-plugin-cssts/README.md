# vite-plugin-cssts

> Vite 插件，用于处理 `css {}` 语法并按需生成原子类 CSS

## 核心设计理念

本插件是 CssTs 系统的核心，负责：

1. **编译时转换** - 将 `css { displayFlex }` 转换为 `cssts.$cls(csstsAtom.displayFlex)`
2. **虚拟文件生成** - 生成 `virtual:csstsAtom` 和 `virtual:cssts.css`
3. **按需生成** - 只生成项目中使用的原子类
4. **`$$` 伪类语法** - 解析变量名中的 `$$` 标记，生成伪类样式

## ⚠️ `$$` 伪类语法（核心功能！）

> **重要：使用 `$$` 双美元符号，不是单个 `$`！**

### 实现原理（简单直接）

生成 CSS 时，检测变量名是否包含 `$$`：

1. 解析变量名：`primary$$hover$$active` → 类名 `primary`，伪类 `['hover', 'active']`
2. 生成普通样式：`.primary { ... }`（原子类组合）
3. 生成伪类样式：`.primary:hover { ... }`、`.primary:active { ... }`（从配置读取属性）

不需要收集器、不需要全局状态，就是在生成 CSS 的那一刻直接处理。

### 基本用法

```typescript
// .cssts 文件中

// 普通样式类
const clickable = css { cursorPointer, displayFlex }
// 生成：.clickable { cursor: pointer; display: flex; }

// 带伪类的样式类（使用 $$ 双美元符号）
const clickable$$hover = css { cursorPointer, displayFlex }
// 生成：
// .clickable { cursor: pointer; display: flex; }     ← 普通样式（来自 css {}）
// .clickable:hover { opacity: 0.9; }                 ← 伪类样式（来自配置）
```

### 伪类属性来自配置

`:hover` 的 CSS 属性不是来自 `css { }` 里的内容，而是来自插件配置：

```typescript
// vite.config.ts
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
// .myButton:hover { opacity: 0.9; }
// .myButton:active { opacity: 0.6; }
// .myButton:focus { outline: 2px solid blue; }
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

## 安装

```bash
npm install vite-plugin-cssts -D
```

## 使用

### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import cssTsPlugin from 'vite-plugin-cssts'

export default defineConfig({
  plugins: [
    cssTsPlugin({
      classPrefix: 'cu-', // 可选：CSS 类名前缀
      pseudoUtils: {
        hover: { opacity: '0.9' },
        active: { opacity: '0.6' },
        focus: { outline: '2px solid blue' }
      }
    }),
  ],
})
```

### 使用 css {} 语法

```typescript
// 在 .cssts 文件中

// 普通样式
const buttonStyle = css { displayFlex, padding16px }

// 带伪类的样式（使用 $$ 双美元符号）
const clickableButton$$hover$$active = css { displayFlex, cursorPointer }
```

## 生成的虚拟文件

### virtual:csstsAtom

```typescript
export const csstsAtom = {
  displayFlex: { 'display_flex': true },
  colorRed: { 'color_red': true },
}
```

### virtual:cssts.css

```css
/* Atom 样式 */
.display_flex { display: flex; }
.color_red { color: red; }

/* 带伪类的样式 */
.buttonBase { cursor: pointer; display: flex; }
.buttonBase:hover { opacity: 0.9; }
.buttonBase:active { opacity: 0.6; }
```

## 工作流程

```
1. 解析 .cssts 文件
   ↓
2. 检测变量名中的 $$ 标记
   • clickable$$hover → 类名: clickable, 伪类: [hover]
   ↓
3. 生成 CSS
   • .clickable { ... }           ← 来自 css {}
   • .clickable:hover { ... }     ← 来自配置
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `classPrefix` | `string` | `''` | CSS 类名前缀 |
| `pseudoUtils` | `PseudoUtilsConfig` | `defaultPseudoUtils` | 伪类配置 |

### pseudoUtils 配置

```typescript
// 伪类配置定义 $$ 语法使用的伪类属性（双美元符号）
cssTsPlugin({
  pseudoUtils: {
    hover: { opacity: '0.9' },
    active: { opacity: '0.6' },
    focus: { outline: '2px solid blue' },
    disabled: { opacity: '0.5', cursor: 'not-allowed' }
  }
})
```

## License

MIT
