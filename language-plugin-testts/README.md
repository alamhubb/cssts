# language-plugin-testts

Vue language plugin for `<script lang="testts">` in Vue SFC files.

## Install

```bash
npm install language-plugin-testts -D
```

## Configure in tsconfig

Use `vueCompilerOptions.plugins` so Volar and `vue-tsc` can load the plugin.

```json
{
  "vueCompilerOptions": {
    "plugins": ["language-plugin-testts"]
  }
}
```

For this monorepo local test project, the path form is also valid:

```json
{
  "vueCompilerOptions": {
    "plugins": ["../language-plugin-testts"]
  }
}
```

## Usage

```vue
<script setup lang="testts">
import { ref } from 'vue'

const count = ref(0)
console.log(me)
</script>
```

The plugin transforms `testts` to TS and provides mapping for:

- diagnostics
- completion
- navigation
- semantic features

## Editor trigger checklist

1. Open the workspace that contains the target `tsconfig`.
2. Enable `Vue - Official` (Volar).
3. Ensure the SFC block is `lang="testts"`.
4. Ensure plugin build output exists (`dist/index.mjs` or `dist/index.cjs`).
5. Reload TS Server or reload VSCode window after plugin changes.

## Local development

Build plugin output:

```bash
npm run build --workspace=cssts/language-plugin-testts
```

Watch mode:

```bash
npm run dev --workspace=cssts/language-plugin-testts
```
