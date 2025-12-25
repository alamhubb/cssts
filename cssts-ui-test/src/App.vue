<template>
  <div class="container">
    <h1>CSSTS Plugin Test</h1>
    
    <!-- OVS Test 暂时禁用
    <h2>OVS Test - OVS + CSSTS 综合测试</h2>
    <OvsTest />
    -->
    
    <hr style="margin: 40px 0" />
    
    <h2>Element Plus Buttons (from npm)</h2>
    <div class="button-group">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
    </div>

    <h2>Vue Button - 直接在 .vue 中使用 css {} (from ./components/VueButton.vue)</h2>
    <div class="button-group">
      <VueButton @click="count++">Default</VueButton>
      <VueButton type="primary" @click="count++">Primary</VueButton>
      <VueButton type="success" @click="count++">Success</VueButton>
    </div>

    <p>Click count: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// OVS 组件（暂时禁用以测试纯 cssts）
// import OvsTest from './components/ovstest.ovs'
// Vue + cssts 组件 (使用 <script lang="cssts">)
import VueButton from './components/VueButton.vue'

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
