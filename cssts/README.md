# CssTs

> CSS-in-TS：编译时原子 CSS 类管理系统

CssTs 是一个类型安全的原子 CSS 解决方案，通过 TypeScript 提供完整的 IDE 支持，在编译时生成优化的 CSS。

## 特性

- 🎯 **类型安全** - 完整的 TypeScript 类型定义，IDE 代码补全
- 🚀 **编译时优化** - CSS 在构建时按需生成，零运行时开销
- 📦 **零依赖运行时** - runtime 包无任何依赖，体积最小
- 🎨 **`$` 伪类语法** - 通过变量名声明伪类（双美元符号 `$`）
- 🧩 **简洁数据结构** - 统一的 `Set<string>` 存储，按需解析
- 💡 **全局常量提示** - 原子类声明为全局常量，IDE 自动补全

## 类型系统设计

### 核心问题：IDE 提示与编译转换的统一

用户在 `css { }` 中输入时：
1. 输入 `d` → IDE 应提示 `displayFlex`, `displayBlock` 等
2. 输入完成 `displayFlex` → 编译器转换为 `csstsAtom.displayFlex`

### 解决方案：全局常量声明

Vite 插件启动时自动生成 `.d.ts` 文件，将每个原子类声明为全局常量：

```typescript
// node_modules/@types/cssts-ts/index.d.ts（自动生成）
declare const displayFlex: { 'display_flex': true };
declare const displayBlock: { 'display_block': true };
declare const paddingTop16px: { 'padding-top_16px': true };
// ... 所有原子类
```

**只需要这一个文件**，不需要其他类型声明：
- ❌ `CsstsAtoms` 接口 - 用户不直接使用
- ❌ `declare module 'virtual:csstsAtom'` - 虚拟模块运行时由 Vite 提供

**这样设计的好处：**

1. **IDE 自动补全** - 用户在 `css { }` 中输入时，IDE 会提示所有已声明的全局常量
2. **类型安全** - 如果用户写了不存在的原子类名，IDE 不会提示，用户立即知道这不是有效的原子类
3. **编译时验证** - 编译器可以通过检查标识符是否匹配已知原子类来决定是否转换
4. **统一的数据源** - IDE 提示和编译转换使用同一份类型定义，保证一致性

**工作流程：**

```
用户输入 displayFlex
    ↓
IDE 识别为全局常量，提供补全和类型检查
    ↓
编译器识别为原子类名，转换为 csstsAtom.displayFlex
    ↓
运行时从虚拟模块获取 { 'display_flex': true }
```

## 伪类原子类

内置的伪类原子类，让元素在交互时有视觉反馈：

```typescript
// 按钮样式：添加 hover 和 active 效果
const buttonStyle = css { 
  colorWhite, 
  backgroundColorBlue, 
  csstsHover,   // hover 时亮度增加
  csstsActive   // active 时亮度降低
}

// 输入框：添加 focus 效果
const inputStyle = css { borderColorGray, cssstsFocus }
```

### 内置伪类原子类

| 原子类名 | CSS 规则 | 效果 |
|----------|----------|------|
| `csstsHover` | `.cssts-hover:hover { filter: brightness(1.15) }` | 悬停时变亮 |
| `csstsActive` | `.cssts-active:active { filter: brightness(0.85) }` | 按下时变暗 |
| `cssstsFocus` | `.cssts-focus:focus { outline: 2px solid ... }` | 聚焦时显示轮廓 |
| `csstsDisabled` | `.cssts-disabled:disabled { opacity: 0.5 ... }` | 禁用时变灰 |

### 自定义伪类样式

内置伪类提供通用效果。如需自定义伪类样式，可在 `<style>` 中编写：

```vue
<script setup lang="cssts">
const buttonStyle = css { colorWhite, backgroundColorBlue, csstsHover }
</script>

<template>
  <button :class="[buttonStyle, 'my-btn']">Click</button>
</template>

<style>
/* 自定义 hover 效果 */
.my-btn:hover {
  background-color: lightblue;
}
</style>
```

### ✅ classGroup 类组合

`classGroup` 配置可以将多个原子类（包括伪类）组合成一个新类：

```typescript
// vite.config.ts
cssTsPlugin({
  // 伪类配置
  pseudoClassConfig: {
    hover: { filter: 'brightness(1.15)' },
    active: { filter: 'brightness(0.85)' },
    focus: { outline: '2px solid var(--el-color-primary-light-5)' },
    disabled: { opacity: '0.5', cursor: 'not-allowed' }
  },
  
  // 类组合配置
  classGroup: {
    click: ['hover', 'active', 'focus', 'disabled', 'cursorPointer'],
    ddClick: ['click', 'colorRed']  // 可引用其他组合
  }
})
```

**使用**：

```typescript
// 按钮样式：使用 click 类组合
const buttonStyle = css {
  padding10px,
  borderRadius8px,
  colorWhite,
  backgroundColorBlue,
  click  // 包含 hover/active/focus/disabled 效果 + cursor: pointer
}

// 红色按钮：使用 ddClick（继承 click + 添加红色）
const redButtonStyle = css { ddClick, padding10px }
```

**生成的 CSS**：

```css
/* click 组合 */
.click:hover { filter: brightness(1.15); }
.click:active { filter: brightness(0.85); }
.click:focus { outline: 2px solid var(--el-color-primary-light-5); }
.click:disabled { opacity: 0.5; cursor: not-allowed; }
.click { cursor: pointer; }

/* ddClick 组合（展开 click 的内容 + colorRed）*/
.ddClick:hover { filter: brightness(1.15); }
.ddClick:active { filter: brightness(0.85); }
.ddClick:focus { outline: 2px solid var(--el-color-primary-light-5); }
.ddClick:disabled { opacity: 0.5; cursor: not-allowed; }
.ddClick { cursor: pointer; color: red; }
```

**处理规则**：
1. 遍历组合配置的每个元素
2. 如果在 `classGroup` 中找到 → 递归展开
3. 如果在 `pseudoClassConfig` 中找到 → 生成伪类规则
4. 如果在原子类中找到 → 使用其属性和值
5. 如果找不到 → 跳过

### 🚧 待完成功能：伪类原子类后缀

未来可能支持类似 Tailwind 的伪类语法：

```typescript
// 待定语法
const buttonStyle = css { colorWhite, colorBlue$$hover, colorNavy$$active }
// 生成：
// .cssts_color_blue$$hover:hover { color: blue }
// .cssts_color_navy$$active:active { color: navy }
```

此功能暂未实现，待后续版本支持。

## 包结构

```
cssts/
├── cssts-compiler    # 编译器：解析、转换、生成
├── cssts-runtime     # 运行时：$cls、replace、分隔符配置（包名是 cssts-ts）
└── vite-plugin-cssts # Vite 插件
```

## 快速开始

### 安装

```bash
npm install cssts-ts vite-plugin-cssts -D
```

### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import cssTsPlugin from 'vite-plugin-cssts'

export default defineConfig({
  plugins: [
    cssTsPlugin({
      pseudoUtils: {
        hover: { opacity: '0.9' },
        active: { opacity: '0.6' }
      }
    }),
  ],
})
```


### 使用

#### 支持的文件类型

| 文件类型 | 支持 css {} 语法 |
|---------|-----------------|
| `.cssts` 文件 | ✅ 支持 |
| `.vue` 文件 `<script lang="cssts">` | ✅ 支持 |
| `.ts` 文件 | ❌ 不支持 |
| `.vue` 文件 `<script lang="ts">` | ❌ 不支持 |

#### 方式一：.cssts 文件

```typescript
// Button.cssts

// 普通样式
const buttonStyle = css { displayFlex, padding16px, cursorPointer }

// 带伪类的样式（使用 $ 双美元符号）
const clickable$hover$active = css { cursorPointer, displayFlex }

// 导出使用
export { buttonStyle, clickable$hover$active }
```

#### 方式二：Vue 文件中使用 `<script lang="cssts">`

```vue
<!-- Button.vue -->
<template>
  <button :class="buttonStyle">点击我</button>
</template>

<script setup lang="cssts">
// 在 <script lang="cssts"> 中可以使用 css {} 语法
const buttonStyle = css { displayFlex, padding16px, cursorPointer }
</script>
```

> **注意**：Vite 插件会自动将 `<script lang="cssts">` 转换为 `<script lang="ts">`，然后交给 Vue 编译器处理。

#### 导入 .cssts 文件

```vue
<!-- 在普通 Vue 文件中导入 .cssts 文件 -->
<template>
  <button :class="buttonStyle">点击我</button>
</template>

<script setup>
import { buttonStyle } from './Button.cssts'
</script>
```

## 核心设计：统一的样式存储

使用单一的 `Set<string>` 存储所有样式名：

```typescript
const styles = new Set<string>()
styles.add('displayFlex')     // 原子类
styles.add('csstsHover')      // 伪类原子类
```

**优点**：
- 数据结构简单
- 自动去重
- 按需生成 CSS

## 核心概念

### 原子类（Atom）

单个 CSS 属性的类：

```typescript
displayFlex      // → .display_flex { display: flex; }
padding16px      // → .padding_16px { padding: 16px; }
colorRed         // → .color_red { color: red; }
```

### 组合样式（GroupUtil）

多个原子类的组合：

```typescript
const buttonStyle = css { displayFlex, padding16px, cursorPointer }
// 运行时：{ 'display_flex': true, 'padding_16px': true, 'cursor_pointer': true }
```

### 伪类原子类

使用内置的伪类原子类添加交互效果：

```typescript
const buttonStyle = css { 
  colorWhite, 
  backgroundColorBlue,
  csstsHover,   // hover 效果
  csstsActive   // active 效果
}
```

伪类效果来自配置（`pseudoClassConfig`），可在 vite 配置中自定义。

## 值转换规则

| 转义符 | 含义 | 示例 |
|--------|------|------|
| `p` | `.` 小数点 | `opacity0p9` → `0.9` |
| `pct` | `%` 百分号 | `width50pct` → `50%` |
| `s` | `/` 斜杠 | `aspectRatio16s9` → `16/9` |
| `N` | `-` 负数 | `zIndexN1` → `-1` |

## 架构

```
┌─────────────────────────────────────────────────────────────┐
│  .cssts 文件 / <script lang="cssts">                        │
│  const style = css { displayFlex, padding16px }             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Vite 插件层                                                 │
│  • vite-plugin-cssts: 处理 .cssts 文件和 <script lang="cssts">│
│  • 共享 globalStyles: Set<string> 收集所有样式               │
│  • 生成虚拟模块和类型定义文件                                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  编译器层                                                    │
│  • cssts-compiler: 解析 css { } 语法                        │
│  • 转换为 cssts.$cls(csstsAtom.xxx)                         │
│  • 按需解析样式名，生成 CSS                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  运行时层                                                    │
│  • cssts-ts（包名）: $cls()、replace()、CSSTS_CONFIG         │
│  • 零依赖，只做对象操作                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  输出                                                       │
│  • JS: cssts.$cls(csstsAtom.displayFlex, ...)               │
│  • CSS: .display_flex { display: flex; }                    │
└─────────────────────────────────────────────────────────────┘
```

> 详细架构说明请参考 [ARCHITECTURE.md](../ARCHITECTURE.md)

## 分隔符配置

类名分隔符在 `cssts-ts` 中配置：

```typescript
import { CSSTS_CONFIG } from 'cssts-ts'

CSSTS_CONFIG.SEPARATOR  // '_' - 类名分隔符：property_value
```

## License

MIT
