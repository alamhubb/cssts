<script setup lang="cssts">
import { ref } from 'vue'
import { cssts } from 'cssts-ts'

defineProps<{ msg: string }>()

const count = ref(0)

// 使用 cssts 定义样式
const cardStyle = css { padding20px, borderRadius8px, backgroundColor$242424 }
const button$$hover$$active = css { 
  padding10px20px, 
  borderRadius8px, 
  borderNone, 
  backgroundColor$646cff, 
  colorWhite, 
  fontSizeLarge, 
  cursorPointer 
}
const codeStyle = css { backgroundColor$2d2d2d, padding2px6px, borderRadius4px }
const readTheDocs = css { color$888 }
const linkStyle$$hover = css { color$646cff }
</script>

<template>
  <h1>{{ msg }}</h1>

  <div :class="cardStyle">
    <button type="button" :class="cssts.$cls(button$$hover$$active)" @click="count++">
      count is {{ count }}
    </button>
    <p>
      Edit
      <code :class="codeStyle">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a :class="cssts.$cls(linkStyle$$hover)" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a :class="cssts.$cls(linkStyle$$hover)"
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank">
      Vue Docs Scaling up Guide
    </a>.
  </p>
  <p :class="readTheDocs">Click on the Vite and Vue logos to learn more</p>
</template>
