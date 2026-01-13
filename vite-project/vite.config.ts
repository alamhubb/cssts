import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssTsPlugin from '../vite-plugin-cssts/src/index.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        cssTsPlugin({
            pseudoUtils: {
                hover: { filter: 'brightness(1.15)' },
                active: { filter: 'brightness(0.85)' }
            }
        }),
        vue()
    ],
    server: {
        host: "192.168.1.7"
    }
})
