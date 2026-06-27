export default {
  name: "cssts-language",
  version: "0.0.1",
  description: "Qin-managed CSSTS language support and Volar language server",
  type: "library",
  entry: "cssts-language-server/src/index.ts",
  scripts: {
    build: "npm run build",
    dev: "tsx cssts-language-server/src/index.ts --stdio",
    test: "npm run test:lsp"
  },
  dependencies: {
    "@volar/language-core": "^2.4.14",
    "@volar/language-server": "^2.4.14",
    "@volar/language-service": "^2.4.14",
    "@volar/typescript": "^2.4.14",
    "cssts-compiler": "file:../cssts/cssts-compiler",
    "cssts-ts": "^0.2.87",
    "volar-service-typescript": "^0.0.62",
    "vscode-languageserver": "^9.0.1",
    "vscode-languageserver-textdocument": "^1.0.12",
    "vscode-uri": "^3.1.0"
  },
  devDependencies: {
    "typescript": "^5.8.3",
    "tsdown": "^0.20.0-beta.3",
    "tsx": "^4.19.2",
    "@types/node": "^22.15.21"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    server: "cssts-language-server/src/index.ts",
    ideaLspClient: "../qin/packages/qin-idea-plugin-debug"
  }
}
