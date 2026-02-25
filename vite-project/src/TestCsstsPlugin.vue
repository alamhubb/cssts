<script setup lang="cssts">
import { ref } from 'vue'

const count = ref(0)
const message = 'Hello World'

console.log(message)

function increment() {
  count.value+
}

console.log(message)
</script>

<template>
  <div>{{ message }} - {{ count }}</div>
</template>
