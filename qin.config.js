export default {
  name: "cssts-workspace",
  version: "0.2.87",
  description: "Qin-managed CSSTS workspace",
  type: "workspace",
  scripts: {
    build: "..\\qin\\qin.bat language build --root cssts/cssts-runtime && ..\\qin\\qin.bat language build --root cssts/cssts-compiler && ..\\qin\\qin.bat language build --root vite-plugin-cssts && ..\\qin\\qin.bat language build --root language-plugin-cssts && ..\\qin\\qin.bat language build --root cssts-language && ..\\qin\\qin.bat language build --root create-cssts && ..\\qin\\qin.bat language build --root cssts-theme-element && ..\\qin\\qin.bat language build --root vite-project",
    test: "..\\qin\\qin.bat language test --root cssts/cssts-runtime && ..\\qin\\qin.bat language test --root cssts/cssts-compiler && ..\\qin\\qin.bat language test --root vite-plugin-cssts && ..\\qin\\qin.bat language test --root language-plugin-cssts && ..\\qin\\qin.bat language test --root cssts-language && ..\\qin\\qin.bat language test --root create-cssts && ..\\qin\\qin.bat language test --root cssts-theme-element && ..\\qin\\qin.bat language test --root vite-project"
  },
  workspaces: [
    "cssts/cssts-runtime",
    "cssts/cssts-compiler",
    "vite-plugin-cssts",
    "language-plugin-cssts",
    "cssts-language",
    "create-cssts",
    "cssts-theme-element",
    "vite-project"
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
