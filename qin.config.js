export default {
  name: "cssts-workspace",
  version: "0.2.87",
  description: "Qin-managed CSSTS workspace",
  type: "workspace",
  scripts: {
    build: "npm run build",
    test: "npm run build"
  },
  workspaces: [
    "cssts/cssts-runtime",
    "cssts/cssts-compiler",
    "vite-plugin-cssts",
    "language-plugin-cssts",
    "cssts-language",
    "create-cssts",
    "cssts-theme-element"
  ],
  language: {
    id: "cssts",
    extension: ".cssts",
    compiler: "cssts/cssts-compiler",
    runtime: "cssts/cssts-runtime",
    vitePlugin: "vite-plugin-cssts",
    vueLanguagePlugin: "language-plugin-cssts",
    languageServer: "cssts-language"
  }
}
