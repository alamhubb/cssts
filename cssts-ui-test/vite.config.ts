import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const csststUiRoot = path.resolve(__dirname, '../cssts-ui')
const pkgRoot = path.resolve(csststUiRoot, 'packages')
const csststUiNodeModules = path.resolve(csststUiRoot, 'node_modules')

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001
  },
  resolve: {
    alias: [
      // 内部包别名 - 指向 cssts-ui 的 packages
      {
        find: '@element-plus/components',
        replacement: path.resolve(pkgRoot, 'components'),
      },
      {
        find: '@element-plus/hooks',
        replacement: path.resolve(pkgRoot, 'hooks'),
      },
      {
        find: '@element-plus/utils',
        replacement: path.resolve(pkgRoot, 'utils'),
      },
      {
        find: '@element-plus/constants',
        replacement: path.resolve(pkgRoot, 'constants'),
      },
      {
        find: '@element-plus/directives',
        replacement: path.resolve(pkgRoot, 'directives'),
      },
      {
        find: '@element-plus/locale',
        replacement: path.resolve(pkgRoot, 'locale'),
      },
      {
        find: '@element-plus/theme-chalk',
        replacement: path.resolve(pkgRoot, 'theme-chalk'),
      },
      // 第三方依赖从 cssts-ui 的 node_modules 解析
      {
        find: 'lodash-unified',
        replacement: path.resolve(csststUiNodeModules, 'lodash-unified'),
      },
      {
        find: '@vueuse/core',
        replacement: path.resolve(csststUiNodeModules, '@vueuse/core'),
      },
      {
        find: '@popperjs/core',
        replacement: path.resolve(csststUiNodeModules, '@popperjs/core'),
      },
      {
        find: 'async-validator',
        replacement: path.resolve(csststUiNodeModules, 'async-validator'),
      },
      {
        find: 'memoize-one',
        replacement: path.resolve(csststUiNodeModules, 'memoize-one'),
      },
      {
        find: 'normalize-wheel-es',
        replacement: path.resolve(csststUiNodeModules, 'normalize-wheel-es'),
      },
      {
        find: '@floating-ui/dom',
        replacement: path.resolve(csststUiNodeModules, '@floating-ui/dom'),
      },
      {
        find: '@ctrl/tinycolor',
        replacement: path.resolve(csststUiNodeModules, '@ctrl/tinycolor'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
