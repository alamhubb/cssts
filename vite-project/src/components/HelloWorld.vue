<script setup lang="cssts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const cardStyle = css { padding20px, borderRadius8px }

// 先定义伪类样式
const button$$hover = css { backgroundColorBlue }
const button$$active = css { backgroundColorNavy }

// 再定义合并样式（引用已定义的伪类）
const buttonStyle = css {
  padding10px,
  padding20px,
  borderRadius8px,
  borderNone,
  colorWhite,
  fontSizeLarge,
  cursorPointer,
  button$$hover,
  button$$active
}

// 先定义伪类
const linkStyle$$hover = css { colorDodgerblue }
// 再定义合并样式
const linkStyle = css { colorBlue, linkStyle$$hover }

const codeStyle = css { padding2px, padding6px, borderRadius4px }

const readTheDocs = css { colorGray }
</script>

<template>
  <h1>{{ msg }}</h1>

  <div :class="cardStyle">
    <button type="button" :class="buttonStyle" @click="count++">
      count is {{ count }}
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
    <a :class="linkStyle"
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank">
      Vue Docs Scaling up Guide
    </a>.
  </p>
  <p :class="readTheDocs">Click on the Vite and Vue logos to learn more</p>
</template>
