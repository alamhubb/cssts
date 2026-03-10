<script setup lang="cssts">
import { ref } from 'vue'

const count = ref(0)
const message = 'Hello CSSTS'

const cardStyle = css {
  displayFlex,
  flexDirectionColumn,
  alignItemsCenter,
  gap12px,
  padding16px,
  borderRadius8px,
  borderStyleSolid,
  borderWidth1px,
  borderColorLightgray,
  backgroundColorWhite
}

const countStyle = css {
  fontSize20px,
  fontWeight700,
  colorBlue
}

const button$$hover = css { backgroundColorNavy }

const buttonStyle = css {
  paddingX12px,
  paddingY8px,
  borderNone,
  borderRadius6px,
  backgroundColorBlue,
  colorWhite,
  cursorPointer,
  button$$hover
}

console.log(count)

function increment() {
  count.value++
}

console.log(message)
</script>

<template>
  <div :class="cardStyle">
    <div>{{ message }}</div>
    <div :class="countStyle">Count: {{ count }}</div>
    <button :class="buttonStyle" @click="increment">+1</button>
  </div>
</template>
