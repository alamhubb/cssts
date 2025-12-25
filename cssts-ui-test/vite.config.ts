import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ovsPlugin from 'vite-plugin-ovs'

export default defineConfig({
  plugins: [
    // ovs 插件内置 cssts 支持，处理 .ovs / .cssts / <script lang="cssts">
    ovsPlugin({
      cssts: {
        pseudoUtils: {
          hover: { filter: 'brightness(1.15)' },
          active: { filter: 'brightness(0.85)' },
          focus: { outline: '2px solid var(--el-color-primary-light-5, #79bbff)', 'outline-offset': '1px' },
          disabled: { opacity: '0.5', cursor: 'not-allowed', filter: 'grayscale(0.2)' }
        }
      }
    }),
    vue(),
  ],
  server: {
    port: 3001
  },
})
