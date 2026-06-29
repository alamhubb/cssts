# CSSTS Language Support

`cssts-language` is the Qin-managed Volar language server for `.cssts` files.
It is not a standalone editor extension package. Editor integration is provided
by the shared IDEA LSP client in `qin/packages/qin-idea-plugin-debug`.

## Supported Files

- `.cssts` files with diagnostics, completion, hover, definition, references,
  document symbols, and semantic tokens through Volar and TypeScript services.

## Architecture

The language server uses `cssts-compiler` to transform CSSTS syntax into
TypeScript virtual code. `cssts-compiler` owns the CSSTS parser and inherits the
generated Qin parser declared in `qin.config.js`; do not add a separate parser,
regex scanner, string patch, or fallback path in this package.

Node/TypeScript is used here only because Volar LSP tooling runs in that
ecosystem. Qin/CSSTS syntax authority remains in the Java parser chain that is
generated to TypeScript.

## Development

Build, test, and language-server startup all enter through Qin:

```bash
cd cssts/cssts-language
..\..\qin\qin.bat language build
..\..\qin\qin.bat language test
..\..\qin\qin.bat language server --dry-run
```

## Files

```text
cssts-language/
├── cssts-language-server/     # Volar language server
│   └── src/
│       ├── index.ts
│       ├── CsstsLanguagePlugin.ts
│       ├── CsstsLanguageServicePlugin.ts
│       └── logutil.ts
├── tests/                     # LSP and generated parser chain smokes
├── package.json               # dependency metadata only
├── qin.config.js              # canonical Qin manifest and command entrypoint
└── tsdown.config.mts          # language-server bundle config
```

## Relationship To Vite

`cssts-language` and `vite-plugin-cssts` both use `cssts-compiler`, so editor
diagnostics and build-time transforms stay aligned.

## License

MIT
