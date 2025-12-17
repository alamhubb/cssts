import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssTsPlugin from 'vite-plugin-cssts'

// 共享的伪类配置
const pseudoUtilsConfig = {
  hover: { filter: 'brightness(1.15)' },
  active: { filter: 'brightness(0.85)' },
  focus: { outline: '2px solid var(--el-color-primary-light-5, #79bbff)', 'outline-offset': '1px' },
  disabled: { opacity: '0.5', cursor: 'not-allowed', filter: 'grayscale(0.2)' }
}

export default defineConfig({
  plugins: [
    // cssts 插件处理 .cssts 文件和 <script lang="cssts"> 的 Vue 文件
    cssTsPlugin({
      pseudoUtils: pseudoUtilsConfig,
    }),
    vue(),
  ],
  server: {
    port: 3001
  },
})
