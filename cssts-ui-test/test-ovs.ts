// 测试 vite-plugin-ovs 使用的完整转换流程
import { vitePluginOvsTransform } from 'ovs-compiler'

const code = `import { computed } from 'vue'
const baseStyles = css {
  displayInlineFlex
}

const buttonClass = computed(() => baseStyles)
`

console.log('=== 输入 ===')
console.log(code)
console.log('\n=== 使用 ovs-compiler 转换 ===')

const result = vitePluginOvsTransform(code, { globalStyles: new Set() })
console.log(result.code)

console.log('\n=== 检查 ===')
console.log('包含 cssts import:', result.code.includes("import {cssts}") || result.code.includes('cssts'))
console.log('包含 csstsAtom import:', result.code.includes("csstsAtom"))
