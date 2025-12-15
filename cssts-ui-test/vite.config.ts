import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// ovs 插件处理 .ovs 文件（内部已包含 cssts 插件）
import ovs from 'vite-plugin-ovs/src/index.ts'
import path from 'path'

// 指向本地 element-plus（原 cssts-ui）
const elementPlusRoot = path.resolve(__dirname, '../element-plus')
const pkgRoot = path.resolve(elementPlusRoot, 'packages')
const elementPlusNodeModules = path.resolve(elementPlusRoot, 'node_modules')

// 本地 cssts-components
const csstsComponentsRoot = path.resolve(__dirname, './cssts-components')

// 共享的伪类配置
const pseudoUtilsConfig = {
  hover: { filter: 'brightness(1.15)' },
  active: { filter: 'brightness(0.85)' },
  focus: { outline: '2px solid var(--el-color-primary-light-5, #79bbff)', 'outline-offset': '1px' },
  disabled: { opacity: '0.5', cursor: 'not-allowed', filter: 'grayscale(0.2)' }
}

export default defineConfig({
  plugins: [
    // ovs 插件处理 .ovs、.cssts、.vue 文件（内部已包含 cssts 插件）
    // cssts 插件会自动注入 esbuild 插件处理依赖扫描阶段
    ...ovs({
      cssts: {
        pseudoUtils: pseudoUtilsConfig,
        // 支持 .cssts 和 .vue 文件中的 css {} 语法
        include: ['.cssts', '.vue']
      }
    }),
    vue(),
  ],
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
      // 本地 cssts-components
      {
        find: '@cssts-ui/components',
        replacement: path.resolve(csstsComponentsRoot, 'src'),
      },
      // 第三方依赖从 element-plus 的 node_modules 解析
      {
        find: 'lodash-unified',
        replacement: path.resolve(elementPlusNodeModules, 'lodash-unified'),
      },
      {
        find: '@vueuse/core',
        replacement: path.resolve(elementPlusNodeModules, '@vueuse/core'),
      },
      {
        find: '@popperjs/core',
        replacement: path.resolve(elementPlusNodeModules, '@popperjs/core'),
      },
      {
        find: 'async-validator',
        replacement: path.resolve(elementPlusNodeModules, 'async-validator'),
      },
      {
        find: 'memoize-one',
        replacement: path.resolve(elementPlusNodeModules, 'memoize-one'),
      },
      {
        find: 'normalize-wheel-es',
        replacement: path.resolve(elementPlusNodeModules, 'normalize-wheel-es'),
      },
      {
        find: '@floating-ui/dom',
        replacement: path.resolve(elementPlusNodeModules, '@floating-ui/dom'),
      },
      {
        find: '@ctrl/tinycolor',
        replacement: path.resolve(elementPlusNodeModules, '@ctrl/tinycolor'),
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
