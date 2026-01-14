import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 开发时使用相对路径，绕过 esbuild 解析问题
import cssTsPlugin from 'vite-plugin-cssts'
import { viteMono } from 'vite-plugin-mono'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        viteMono(),  // 必须放在最前面，拦截本地包
        cssTsPlugin(),  // 零配置，使用内置默认伪类样式
        vue()],
    optimizeDeps: {
        // 排除本地包，不进行预构建
        exclude: [
            'cssts-compiler',
            'cssts-ts',
            'slime-parser',
            'slime-ast',
            'slime-generator',
            'slime-token'
        ]
    },
    server: {
        host: "192.168.1.7"
    }
})
