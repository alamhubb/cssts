const createPlugin = require('./dist/index.cjs')
if (typeof createPlugin !== 'function') {
  throw new Error('Expected language-plugin-cssts default export to be a plugin factory')
}

const pluginEntries = createPlugin({
  modules: {
    typescript: { version: 'test' },
  },
})

const parserPlugin = pluginEntries.find((entry) => entry && typeof entry.parseSFC2 === 'function')
if (!parserPlugin) {
  throw new Error('Expected language-plugin-cssts to expose a parseSFC2 plugin entry')
}

const invalidVueSource = `<script setup lang="cssts">
const broken = css {
</script>
`

try {
  parserPlugin.parseSFC2('broken.vue', 'vue', invalidVueSource)
  throw new Error('Expected CSSTS transform to fail for invalid syntax')
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  if (!message.includes('CSSTS transform failed')) {
    throw error
  }
}

console.log('test-transform-error passed')
