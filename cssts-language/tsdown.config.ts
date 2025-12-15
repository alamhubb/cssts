import { defineConfig } from 'tsdown'

export default defineConfig([
  // VSCode 扩展入口
  {
    entry: {
      'extension': 'cssts-vscode-client/src/extension.ts',
    },
    outDir: 'dist',
    format: 'cjs',
    platform: 'node',
    external: ['vscode'],
    clean: false,
    dts: false,
    sourcemap: true,
  },
  // 语言服务器入口
  {
    entry: {
      'language-server': 'cssts-language-server/src/index.ts',
    },
    outDir: 'dist',
    format: 'cjs',
    platform: 'node',
    clean: false,
    dts: true,
    sourcemap: true,
  },
])
