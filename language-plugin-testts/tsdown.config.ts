import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['@vue/language-core', '@vue/compiler-dom', 'cssts-compiler'],
})
