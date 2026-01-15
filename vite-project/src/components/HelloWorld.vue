<script setup lang="cssts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const cardStyle = css { padding20px, borderRadius8px }

// 按钮样式：使用 click 类组合（包含 hover, active, focus, disabled, cursorPointer）
const buttonStyle = css {
  padding10px,
  padding20px,
  borderRadius8px,
  borderNone,
  colorWhite,
  backgroundColorBlue,
  fontSizeLarge,
  click  // 使用类组合！
}

// 测试 ddClick：引用 click + colorRed
const ddClickStyle = css { ddClick, padding10px }

// 链接样式：添加 hover 效果
const linkStyle = css { colorBlue, csstsHover }

const codeStyle = css { padding2px, padding6px, borderRadius4px }

const readTheDocs = css { colorGray }

// 测试：合并逻辑
let cosColor = css { colorRed }
cosColor = css { colorGreen }  // 预期：应该替换为 colorGreen（同属性）

</script>

<template>
  <h1>{{ msg }}</h1>

  <!-- 测试 cosColor -->
  <div :class="cosColor">Hello World - 测试颜色合并</div>

  <div :class="cardStyle">
    <button type="button" :class="buttonStyle" @click="count++">
      count is {{ count }} (click 组合)
    </button>
    <button type="button" :class="ddClickStyle" @click="count++">
      ddClick 测试 (应该有红色文字 + hover 效果)
    </button>
    <p>
      Edit
      <code :class="codeStyle">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a :class="linkStyle" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a :class="linkStyle" href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">
      Vue Docs Scaling up Guide
    </a>.
  </p>
  <p :class="readTheDocs">Click on the Vite and Vue logos to learn more</p>
</template>
