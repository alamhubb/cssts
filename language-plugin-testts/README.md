# language-plugin-testts

`language-plugin-testts` is a Vue language plugin for `<script setup lang="testts">`.

The plugin follows a minimal design:

- Keep Vue native language pipeline as much as possible.
- Only intercept the minimum metadata needed for `testts`.
- Avoid cache / trend / extra state in the `testts` path.

## Install

```bash
npm install language-plugin-testts -D
```

## Configure in tsconfig

Use `vueCompilerOptions.plugins` so Volar / `vue-tsc` can load the plugin.

```json
{
  "vueCompilerOptions": {
    "plugins": ["language-plugin-testts"]
  }
}
```

In this monorepo local test project, a relative path plugin is also valid:

```json
{
  "vueCompilerOptions": {
    "plugins": ["../language-plugin-testts"]
  }
}
```

## Core Design

### 1) Lang interception only (testts -> ts)

To keep template intelligence from Vue native pipeline:

- In `parseSFC2`, when `lang="testts"` is detected, patch `script/scriptSetup.lang` to `ts`.
- Keep original `attrs.lang = "testts"` unchanged.
- Use `order: -10000` to ensure this interception runs early.

Why this is needed:

- Vue template binding analysis only recognizes script langs in `js/jsx/ts/tsx`.
- If lang remains `testts`, template completion / type flow can degrade or disappear.

### 2) testts transform stays in script virtual file stage

In `resolveEmbeddedCode`:

- Only handle `embeddedFile.id === "script_ts"`.
- Identify testts by `scriptBlock.attrs.lang === "testts"` (or fallback `scriptBlock.lang === "testts"`).
- Parse -> AST -> generate -> apply mappings to `embeddedFile.content`.

### 3) No cache path in this plugin

Current `testts` path is intentionally stateless:

- No transform cache.
- No trend state.
- Focus on deterministic and debuggable behavior.

## Runtime Flow

1. Vue parses SFC.
2. Plugin intercepts `testts` lang metadata and patches it to `ts`.
3. Vue native script/template pipeline runs as TypeScript.
4. Plugin transforms `testts` code for `script_ts` and applies mapping.
5. Volar uses mapped virtual code for diagnostics/completion/navigation.

## Why this is the preferred approach

- Minimal responsibility in plugin.
- Maximum reuse of Vue native logic.
- Lower risk of regressions in template/type inference.
- Easier debugging because custom logic is isolated to one stage.

## Mapping Guarantees

The plugin currently logs mapping quality and checks:

- normalized mapping stats (`valid`, `overlapDropped`, etc.)
- source non-whitespace coverage (`sourceNonWs`)
- reconstructed virtual text consistency against generated text

These checks are diagnostic-only and do not add caching behavior.

## Usage Example

```vue
<script setup lang="testts">
import { ref } from 'vue'

const count = ref(0)
const message = 'Hello'

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }} - {{ message }}</button>
</template>
```

## Editor Checklist

1. Open the workspace that contains target `tsconfig`.
2. Enable `Vue - Official` (Volar).
3. Ensure the SFC script block is `lang="testts"`.
4. Ensure plugin build output exists (`dist/index.mjs` / `dist/index.cjs`).
5. Reload TS Server or reload VSCode window after plugin changes.

## Local Development

Build:

```bash
npm run build --workspace=cssts/language-plugin-testts
```

Watch:

```bash
npm run dev --workspace=cssts/language-plugin-testts
```

## Maintenance Notes

- The plugin currently imports `@vue/language-core/lib/utils/parseSfc.js` (deep import).
- When upgrading `@vue/language-core`, verify this internal path still exists.
- If upstream provides a stable public parse hook for this use case, prefer migrating to that API.
