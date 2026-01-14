<script setup lang="cssts">
import { ref } from 'vue'
import { cssts } from 'cssts-ts'

defineProps<{ msg: string }>()

const count = ref(0)

// ✅ 正确语法：用逗号分隔，只使用原子类
const cardStyle = css { padding20px, borderRadius8px }

const buttonBase = css {
  padding10px,
  padding20px,
  borderRadius8px,
  borderNone,
  colorWhite,
  fontSizeLarge,
  cursorPointer
}

// 伪类样式
const button$$hover = css { backgroundColorBlue }
const button$$active = css { backgroundColorNavy }

const codeStyle = css { 
  padding2px,
  padding6px,
  borderRadius4px
}

const readTheDocs = css { colorGray }

const linkStyle = css { colorBlue }
const linkStyle$$hover = css { colorDodgerblue }
</script>

<template>
  <h1>{{ msg }}</h1>

  <div :class="cardStyle">
    <button type="button" :class="cssts.$cls(buttonBase, button$$hover, button$$active)" @click="count++">
      count is {{ count }}
    </button>
    <p>
      Edit
      <code :class="codeStyle">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a :class="cssts.$cls(linkStyle, linkStyle$$hover)" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a :class="cssts.$cls(linkStyle, linkStyle$$hover)"
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank">
      Vue Docs Scaling up Guide
    </a>.
  </p>
  <p :class="readTheDocs">Click on the Vite and Vue logos to learn more</p>
</template>
