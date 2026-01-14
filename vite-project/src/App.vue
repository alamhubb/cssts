<script setup lang="cssts">
import { ref } from 'vue'
const count = ref(0)
const testStyle = css { padding20px }
</script>

<template>
  <div :class="testStyle">
    <h1>测试 CSSTS</h1>
    <button @click="count++">count is {{ count }}</button>
  </div>
</template>
