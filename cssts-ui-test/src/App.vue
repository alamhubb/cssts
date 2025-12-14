<template>
  <div class="container">
    <h1>CSSTS Plugin Test</h1>
    
    <h2>Element Plus Buttons (from npm)</h2>
    <div class="button-group">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
    </div>

    <h2>CSSTS Button (from ./components/CsstsButton.cssts)</h2>
    <div class="button-group">
      <CsstsButton>Default</CsstsButton>
      <CsstsButton type="primary">Primary</CsstsButton>
      <CsstsButton type="success">Success</CsstsButton>
    </div>

    <h2>OVS Button (from ./components/OvsButton.ovs)</h2>
    <div class="button-group">
      <OvsButton />
    </div>

    <p>Click count: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 从本地 cssts 组件导入
import CsstsButton from './components/CsstsButton.cssts'
// 从本地 ovs 组件导入（命名导出）
import { OvsButton } from './components/OvsButton.ovs'

const count = ref(0)
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
