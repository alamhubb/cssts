# language-plugin-cssts

Vue Language Plugin for CSSTS - 为 Vue SFC 中的 `<script lang="cssts">` 提供 LSP 支持。

## 安装

```bash
npm install language-plugin-cssts -D
```

## 配置

在 `tsconfig.json` 中添加：

```json
{
  "vueCompilerOptions": {
    "plugins": ["language-plugin-cssts"]
  }
}
```

## 使用

配置完成后，即可在 Vue SFC 中使用 CSSTS：

```vue
<script setup lang="cssts">
import { ref } from 'vue'

const count = ref(0)
const buttonStyle = css { displayFlex, alignItemsCenter, bgBlue500 }
</script>

<template>
  <button :class="buttonStyle" @click="count++">
    Count: {{ count }}
  </button>
</template>
```

## 功能

- ✅ 自动补全
- ✅ 类型检查
- ✅ 跳转定义
- ✅ 悬停提示
- ✅ 错误诊断

## 注意

此插件仅提供 IDE 智能提示功能。要在 Vite 项目中编译 CSSTS，还需要安装 `vite-plugin-cssts`：

```bash
npm install vite-plugin-cssts -D
```

```ts
// vite.config.ts
import cssTsPlugin from 'vite-plugin-cssts'

export default {
  plugins: [cssTsPlugin()]
}
```
