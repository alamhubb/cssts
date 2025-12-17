<template>
  <button :class="buttonClass" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
/**
 * VueButton - 直接在 Vue 文件中使用 css {} 语法
 * 
 * ⚠️ 重要：伪类分隔符是双美元符号 $$
 */
import { computed } from 'vue'

// 基础样式（所有按钮共享）
const baseStyles = css {
  displayInlineFlex, 
  justifyContentCenter, 
  alignItemsCenter,
  paddingTop8px,
  paddingBottom8px,
  paddingLeft15px,
  paddingRight15px,
  borderRadius4px,
  cursorPointer,
  fontSize14px,
  fontWeight500,
  lineHeight1
}

// Primary 按钮样式（带伪类，使用双美元符号 $$）
const primary$$hover$$active = css { 
  baseStyles, 
  backgroundColorDodgerblue, 
  colorWhite, 
  borderNone 
}

// Success 按钮样式
const success$$hover$$active = css { 
  baseStyles, 
  backgroundColorLimegreen, 
  colorWhite, 
  borderNone 
}

// Default 按钮样式
const defaultBtn$$hover$$active = css { 
  baseStyles, 
  backgroundColorWhite, 
  colorGray, 
  borderWidth1px, 
  borderStyleSolid, 
  borderColorLightgray 
}

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})

defineEmits(['click'])

const buttonClass = computed(() => {
  if (props.type === 'primary') return primary$$hover$$active
  if (props.type === 'success') return success$$hover$$active
  return defaultBtn$$hover$$active
})
</script>
