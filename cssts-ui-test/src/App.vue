<template>
  <div class="container">
    <h1>CSSTS-UI Button Test</h1>
    
    <h2>Element Plus Buttons (from npm)</h2>
    <div class="button-group">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
    </div>

    <h2>Local CSSTS-UI Buttons (from ../cssts-ui/packages)</h2>
    <div class="button-group">
      <CsstsButton>Default</CsstsButton>
      <CsstsButton type="primary">Primary</CsstsButton>
      <CsstsButton type="success">Success</CsstsButton>
    </div>

    <div class="button-group">
      <CsstsButton type="primary" :loading="loading" @click="handleClick">
        {{ loading ? 'Loading...' : 'Click Me' }}
      </CsstsButton>
      <CsstsButton type="primary" disabled>Disabled</CsstsButton>
    </div>

    <p>Click count: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 从本地 cssts-ui 导入 Button 组件
import CsstsButton from '@element-plus/components/button/src/button.vue'

const count = ref(0)
const loading = ref(false)

const handleClick = () => {
  loading.value = true
  count.value++
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<style>
.container {
  padding: 40px;
  font-family: sans-serif;
}

.button-group {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

h1 {
  color: #409eff;
}

h2 {
  color: #666;
  font-size: 16px;
  margin-top: 30px;
}
</style>
