import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssTsPlugin from '../vite-plugin-cssts/src/index.ts'
import { viteMono } from '../../monorepo/vite-plugin-mono/src/index'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        viteMono(),  // 必须放在最前面，拦截本地包
        cssTsPlugin({
            pseudoUtils: {
                hover: { filter: 'brightness(1.15)' },
                active: { filter: 'brightness(0.85)' }
            }
        }),
        vue()
    ],
    resolve: {
        alias: [
            { find: 'cssts-compiler', replacement: resolve(__dirname, '../cssts/cssts-compiler/src/index.ts') },
            { find: 'cssts-ts', replacement: resolve(__dirname, '../cssts/cssts-runtime/src/index.ts') },
            { find: 'slime-parser', replacement: resolve(__dirname, '../../slime/slime-parser/src/index.ts') },
            { find: 'slime-ast', replacement: resolve(__dirname, '../../slime/slime-ast/src/index.ts') },
            { find: 'slime-generator', replacement: resolve(__dirname, '../../slime/slime-generator/src/index.ts') },
            { find: 'slime-token', replacement: resolve(__dirname, '../../slime/slime-token/src/index.ts') }
        ]
    },
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
