import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import csstsPlugin from 'vite-plugin-cssts'

export default defineConfig({
  plugins: [
    csstsPlugin({
      pseudoUtils: {
        hover: { filter: 'brightness(1.15)' },
        active: { filter: 'brightness(0.85)' },
        focus: { outline: '2px solid var(--el-color-primary-light-5, #79bbff)', 'outline-offset': '1px' },
        disabled: { opacity: '0.5', cursor: 'not-allowed', filter: 'grayscale(0.2)' }
      }
    }),
    vue(),
  ],
  server: {
    host: '192.168.1.7',
    port: 3001
  },
})

