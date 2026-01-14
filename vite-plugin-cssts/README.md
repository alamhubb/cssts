# vite-plugin-cssts

> Vite 插件，用于处理 `.cssts` 文件和 `<script lang="cssts">` 中的 `css {}` 语法，按需生成原子类 CSS

## ⚡ 快速开始

```bash
# 1. 安装（运行时依赖 cssts 会自动安装）
npm install vite-plugin-cssts -D
```

```javascript
// 2. vite.config.js - 零配置！
import cssTsPlugin from 'vite-plugin-cssts'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [cssTsPlugin(), vue()]
}
```

**就这样！** 现在可以使用 `css { }` 语法了。

---

## ✅ 功能亮点

| 功能 | 说明 |
|------|------|
| 🚀 零配置 | 安装即用，自动生成类型定义 |
| 📝 IDE 提示 | 输入原子类时自动补全 |
| 🎯 按需生成 | 只生成实际使用的 CSS |
| 🔥 HMR 支持 | 文件修改后自动热更新 |
| 📦 体积优化 | 编译器不进入生产构建 |

---

## 📁 支持的文件类型

| 文件类型 | 支持 `css {}` 语法 | 说明 |
|---------|-------------------|------|
| `.cssts` 文件 | ✅ 支持 | 独立样式文件 |
| `.vue` `<script lang="cssts">` | ✅ 支持 | Vue 单文件组件 |
| `.ts` / `.js` 文件 | ❌ 不支持 | 使用 `.cssts` 替代 |
| `.vue` `<script lang="ts">` | ❌ 不支持 | 使用 `lang="cssts"` 替代 |

## 📖 使用示例

### 方式一：在 `.cssts` 文件中使用

```typescript
// Button.cssts
// css {} 语法，自动有 IDE 类型提示
const buttonStyle = css { displayFlex, padding16px, colorWhite }

// 样式组合
const button$$hover = css { buttonStyle, cursorPointer }

export { buttonStyle, button$$hover }
```

### 方式二：在 Vue 文件中使用 `<script lang="cssts">`

```vue
<template>
  <button :class="buttonStyle">Click me</button>
</template>

<script setup lang="cssts">
// 在 <script lang="cssts"> 中可以使用 css {} 语法
const buttonStyle = css { displayInlineFlex, padding8px, borderRadius4px }
</script>
```

> **注意**：插件会自动将 `<script lang="cssts">` 转换为 `<script lang="ts">`，然后交给 Vue 编译器处理。

---

## ⚙️ 配置选项

插件配置继承 `CsstsConfig`，所有编译器配置都可以直接在顶层使用。

### 配置示例

```javascript
cssTsPlugin({
  // 编译器配置（直接在顶层，影响 IDE 提示和原子类生成）
  classPrefix: 'my-',
  dts: true,
  properties: ['width', 'height', 'margin', 'padding'],
  colors: ['red', 'blue', 'green'],
  progressiveRanges: [{ max: 100, divisors: [1] }],
  pseudoClassConfig: { hover: { opacity: '0.9' } },
  
  // 插件特有配置
  globalStyles: sharedStyles  // 可选：共享样式集合
})
```

### 常用配置项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dts` | `boolean` | `true` | 是否自动生成 .d.ts 类型定义 |
| `dtsOutputDir` | `string` | `node_modules/@types/cssts-ts` | 类型文件输出目录 |
| `classPrefix` | `string` | `''` | CSS 类名前缀 |
| `properties` | `string[]` | 所有常用属性 | 只生成指定属性的原子类 |
| `colors` | `string[]` | 常用颜色 | 只生成指定颜色 |
| `progressiveRanges` | `ProgressiveRange[]` | 默认步长规则 | 数值步长配置 |
| `pseudoClassConfig` | `PseudoUtilsConfig` | `undefined` | 伪类额外样式配置 |
| `globalStyles` | `Set<string>` | `undefined` | 共享样式集合（多插件共享） |

## 伪类语法

使用 `$$` 双美元符号分隔符定义伪类样式：

```javascript
// 变量名中的 $$hover 会生成 :hover 伪类（注意是双美元符号 $$）
const button$$hover$$active = css { cursorPointer, bgBlue600 }
```

> **重要**：伪类分隔符是 `$$`（双美元符号），不是 `$`（单美元符号）！

## 工作原理

### 类型提示

1. 插件启动时读取用户配置
2. 调用 cssts-compiler 根据配置生成类型定义
3. 写入 `node_modules/@types/cssts-ts/`
4. TypeScript 自动从 `@types` 目录发现类型

### Vue 文件处理

1. 检测 `<script lang="cssts">` 标签
2. 提取 script 内容，使用 cssts-compiler 转换
3. 将 `lang="cssts"` 改为 `lang="ts"`
4. 重建 Vue 文件，交给 Vue 编译器处理

### 依赖关系

```
vite-plugin-cssts
├── dependencies
│   ├── cssts-ts       # 运行时（会被提升到用户 node_modules）
│   └── cssts-compiler # 编译时（用于转换和生成类型）
```

用户安装 `vite-plugin-cssts` 后：
- `cssts-ts` 被 npm 提升到用户的 `node_modules/cssts-ts/`
- 用户代码可以直接 `import { cssts } from 'cssts-ts'`
- vite 打包时只打包实际 import 的代码，compiler 不会进入生产构建

## 生成的虚拟模块

### virtual:cssts.css

按需生成的 CSS 样式。

### virtual:csstsAtom

样式对象映射，用于运行时访问。

## License

MIT
