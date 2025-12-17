# vite-plugin-cssts

> Vite 插件，用于处理 `.cssts` 和 `.vue` 文件中的 `css {}` 语法，按需生成原子类 CSS

## 安装

只需安装一个包，运行时依赖 `cssts` 会自动安装：

```bash
npm install vite-plugin-cssts -D
```

## 零配置类型提示

插件启动时会自动生成类型定义到 `node_modules/@types/cssts/`，TypeScript 自动发现，无需任何配置。

## 使用

### 配置 Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssTsPlugin from 'vite-plugin-cssts'

export default defineConfig({
  plugins: [
    cssTsPlugin(),
    vue(),
  ],
})
```

### 在代码中使用

```javascript
import { cssts } from 'cssts'

// css {} 语法，自动有类型提示
const buttonStyle = css { displayFlex, padding16px, colorWhite }

// 运行时 API
const merged = cssts.$cls(buttonStyle, anotherStyle)
```

### 在 .vue 文件中使用

```vue
<template>
  <button :class="buttonStyle">Click me</button>
</template>

<script setup>
const buttonStyle = css { displayInlineFlex, padding8px, borderRadius4px }
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `classPrefix` | `string` | `''` | CSS 类名前缀 |
| `include` | `string[]` | `['.cssts', '.vue']` | 处理的文件扩展名 |
| `pseudoUtils` | `PseudoUtilsConfig` | `undefined` | 伪类配置 |
| `dts` | `boolean` | `true` | 是否自动生成类型定义 |

## 伪类语法

使用 `$` 分隔符定义伪类样式：

```javascript
// 变量名中的 $hover 会生成 :hover 伪类
const button$hover$active = css { cursorPointer, bgBlue600 }
```

## 工作原理

### 类型提示

1. 插件启动时读取用户配置
2. 调用 cssts-compiler 根据配置生成类型定义
3. 写入 `node_modules/@types/cssts/`
4. TypeScript 自动从 `@types` 目录发现类型

### 依赖关系

```
vite-plugin-cssts
├── dependencies
│   ├── cssts          # 运行时（会被提升到用户 node_modules）
│   └── cssts-compiler # 编译时（用于转换和生成类型）
```

用户安装 `vite-plugin-cssts` 后：
- `cssts` 被 npm 提升到用户的 `node_modules/cssts/`
- 用户代码可以直接 `import { cssts } from 'cssts'`
- vite 打包时只打包实际 import 的代码，compiler 不会进入生产构建

## 生成的虚拟模块

### virtual:cssts.css

按需生成的 CSS 样式。

### virtual:csstsAtom

样式对象映射，用于运行时访问。

## License

MIT
