import { defineConfig } from 'tsdown'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    entry: {
        'extension': 'cssts-vscode-client/src/extension.ts',
        'language-server': 'cssts-language-server/src/index.ts',
    },
    format: ['cjs'],
    dts: false,
    clean: true,
    outDir: 'dist',
    target: 'es2022',
    inlineOnly: false,
    alias: {
        'cssts-ts': path.join(__dirname, '..', 'cssts', 'cssts-runtime', 'dist', 'index.js'),
    },
    noExternal: [
        /^@volar\/vscode$/,
        /^@volar\/vscode\/node$/,
        'cssts-compiler',
        'cssts-ts',
        'vscode-uri',
    ],
    external: ['vscode'],
})

