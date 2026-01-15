import { defineConfig } from 'tsdown'

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
    external: ['vscode'],
})

