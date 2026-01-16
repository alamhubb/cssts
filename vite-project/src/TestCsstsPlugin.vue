<script setup lang="cssts">
import { ref } from 'vue'

// 测试 CSSTS 语法
const count = ref(0)

// 使用 css { } 语法定义样式
const buttonStyle = css { displayFlex, alignItemsCenter, px16, py8, bgBlue500, textWhite, rounded }

// 悬停样式
const hoverStyle = css { bgBlue600, cursorPointer }

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
