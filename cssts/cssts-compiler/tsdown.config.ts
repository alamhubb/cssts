import {defineConfig} from 'tsdown'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    target: 'es2022',
    external: [/^(@qin\/generated-qin-parser-ts|cssts-ts|glogjs|slime-ast|slime-generator|subhuti)(\/.*)?$/],
})

