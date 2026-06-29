import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 开发时使用相对路径，绕过 esbuild 解析问题
import cssTsPlugin from 'vite-plugin-cssts'
import { resolve } from 'node:path'
import {fileURLToPath} from "node:url";

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        cssTsPlugin(),  // 零配置，使用内置默认伪类样式
        vue()
    ],
    resolve: {
        alias: [
            { find: 'cssts-compiler', replacement: resolve(__dirname, '../cssts/cssts-compiler/src/index.ts') },
            { find: 'cssts-ts', replacement: resolve(__dirname, '../cssts/cssts-runtime/src/index.ts') }
        ]
    },
    optimizeDeps: {
        // 排除本地包，不进行预构建
        exclude: [
            'cssts-compiler',
            'cssts-ts'
        ]
    },
    server: {
        host: "192.168.1.7"
    }
})
