import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ovs from 'vite-plugin-ovs'

export default defineConfig({
  plugins: [
    // ovs 插件内置 cssts 支持，处理 .ovs / .cssts / <script lang="cssts">
    ovs(),
    vue(),
  ],
  server: {
    host: '192.168.1.7',
    port: 3001
  },
})
