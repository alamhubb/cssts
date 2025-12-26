import { transformCssTs } from 'cssts-compiler'

// 模拟 vite-plugin-cssts 的 extractVueCsstsScript 函数
function extractVueCsstsScript(code: string): {
    script: string
    start: number
    end: number
    isSetup: boolean
} | null {
    const scriptMatch = code.match(/<script(\s+setup)?[^>]*\slang\s*=\s*["']cssts["'][^>]*>([\s\S]*?)<\/script>/)
    if (!scriptMatch) return null

    const fullMatch = scriptMatch[0]
    const start = code.indexOf(fullMatch)
    const end = start + fullMatch.length
    const isSetup = scriptMatch[1] !== undefined
    const script = scriptMatch[2]

    return { script, start, end, isSetup }
}

// VueButton.vue 的完整内容
const vueFileContent = `<template>
  <button :class="buttonClass" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="cssts">
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
`

console.log('=== 步骤 1: 提取 script 内容 ===')
const scriptInfo = extractVueCsstsScript(vueFileContent)
if (!scriptInfo) {
    console.log('ERROR: 无法提取 script')
    process.exit(1)
}
console.log('提取的 script 内容:')
console.log(scriptInfo.script)
console.log('\n=== 步骤 2: 调用 transformCssTs ===')

const result = transformCssTs(scriptInfo.script, { styles: new Set() })
console.log('转换后的代码:')
console.log(result.code)

console.log('\n=== 检查 ===')
console.log('hasStyles:', result.hasStyles)
console.log('包含 cssts import:', result.code.includes("import {cssts}") || result.code.includes("import { cssts }"))
console.log('包含 csstsAtom import:', result.code.includes("import {csstsAtom}") || result.code.includes("import { csstsAtom }"))
