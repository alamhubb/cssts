<script setup lang="testts">
import { ref } from 'vue'

const count = ref(0)
const message = 'Hello World'


console.log(message)

function increment() {
  count.value++
}
</script>

<template>
  <div>{{ message }} - {{ count }}</div>
</template>