<script setup lang="cssts">
import { ref } from 'vue'

// 测试 CSSTS 语法
const count = ref(0)

console.l
</script>

<template>
  <div>
    <h1>CSSTS Language Plugin Test</h1>
    <button :class="[buttonStyle, hoverStyle]" @click="increment">
      Count: {{ count }}
    </button>
  </div>
</template>
