<script setup lang="cssts">
import { ref } from 'vue'

// 测试 CSSTS 语法
const count = ref(0)

console.log(count)

// 使用 css { } 语法定义样式
const buttonStyle = css { displayFlex, alignItemsCenter, paddingX16px, paddingY8px, backgroundColorBlue, colorWhite, borderRadius8px }

// 悬停样式
const hoverStyle = css { backgroundColorNavy, cursorPointer }

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <h1>CSSTS Language Plugin Test</h1>
    <button :class="[buttonStyle, hoverStyle]" @click="increment">
      Count: {{ count }}
    </button>
  </div>
</template>
