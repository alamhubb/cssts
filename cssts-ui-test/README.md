# CSSTS UI Test

> OVS + CSSTS 综合测试项目

## 项目关系

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Slime (底层解析器)                             │
│  • 高容错的 JS/TS 解析器，适用于编辑器场景                                 │
│  • 提供 CST → AST 转换                                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           CSSTS (样式层)                                 │
│  • CSS-in-TypeScript 原子类                                             │
│  • css {} 语法                                                          │
│  • 类型安全的样式                                                        │
│  • $ 伪类语法                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           OVS (UI 层)                                    │
│  • 声明式 UI 语法 (Vue DSL)                                              │
│  • tag(props) {} 语法                                                   │
│  • view 组件定义                                                         │
│  • 原生 if/for 控制流                                                    │
│  • OvsCstToSlimeAst extends CssTsCstToAst (继承 CSSTS 编译器)            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       vite-plugin-ovs                                    │
│  • 内置 cssts 支持                                                       │
│  • 处理 .ovs / .cssts 文件                                               │
│  • 处理 <script lang="cssts">                                           │
│  • 共享样式收集器                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## Vite 配置

只需配置 `vite-plugin-ovs`，它内部已集成 cssts 支持：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ovsPlugin from 'vite-plugin-ovs'

export default defineConfig({
  plugins: [
    ovsPlugin({
      cssts: {
        pseudoUtils: {
          hover: { filter: 'brightness(1.15)' },
          active: { filter: 'brightness(0.85)' },
          focus: { outline: '2px solid #79bbff' },
          disabled: { opacity: '0.5', cursor: 'not-allowed' }
        }
      }
    }),
    vue(),
  ],
})
```

## 支持的文件类型

| 文件类型 | 说明 |
|---------|------|
| `.ovs` | OVS 声明式 UI + css {} 样式 |
| `.cssts` | 纯 CSSTS 样式文件 |
| `.vue` + `<script lang="cssts">` | Vue SFC 中使用 css {} |

## 示例组件

### OVS 组件 (`ovstest.ovs`)

```javascript
import { ref } from 'vue'

// 定义样式
const btnPrimary$hover$active = css {
  displayInlineFlex,
  paddingTop10px,
  paddingBottom10px,
  paddingLeft20px,
  paddingRight20px,
  backgroundColorDodgerblue,
  colorWhite,
  borderRadius6px,
  cursorPointer
}

// 定义组件
view MyButton(props) {
  const count = ref(0)
  
  button(class = btnPrimary$hover$active, onClick() { count.value++ }) {
    `点击次数: ${count.value}`
  }
}

export default MyButton
```

### Vue + CSSTS (`VueButton.vue`)

```vue
<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>

<script setup lang="cssts">
import { computed } from 'vue'

const primary$hover$active = css { 
  backgroundColorDodgerblue, 
  colorWhite 
}

const buttonClass = computed(() => primary$hover$active)
</script>
```

## OVS 语法特性

- **声明式 UI**: `tag(props) { content }`
- **原生控制流**: 直接使用 `if/for`
- **view 组件**: `view Name(props) { }`
- **css {} 原子类**: 类型安全的样式
- **$ 伪类**: `name$hover$active` 自动生成伪类样式

## 目录结构

```
cssts-ui-test/
├── src/
│   ├── components/
│   │   ├── ovstest.ovs        # OVS + CSSTS 综合示例
│   │   ├── CsstsButton.ovs    # OVS 按钮组件
│   │   ├── CsstsButton.cssts  # CSSTS 按钮组件
│   │   └── VueButton.vue      # Vue + CSSTS 按钮
│   ├── App.vue
│   └── main.ts
├── vite.config.ts
└── package.json
```
