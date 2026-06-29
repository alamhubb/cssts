import { defineConfig } from 'tsdown'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    entry: {
        'language-server': 'cssts-language-server/src/index.ts',
    },
    format: ['cjs'],
    dts: false,
    clean: true,
    outDir: 'dist',
    target: 'es2022',
    inlineOnly: false,
    alias: {
        'cssts-compiler': path.join(__dirname, '..', 'cssts', 'cssts-compiler', 'src', 'index.ts'),
        'cssts-ts': path.join(__dirname, '..', 'cssts', 'cssts-runtime', 'dist', 'index.mjs'),
    },
    noExternal: [
        'cssts-compiler',
        'cssts-ts',
        'vscode-uri',
    ],
})
