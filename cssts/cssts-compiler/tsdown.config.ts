import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/parser/index.ts', 'src/factory/index.ts', 'src/dts/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [/node_modules/],
})
