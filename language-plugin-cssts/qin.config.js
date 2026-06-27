export default {
  name: "language-plugin-cssts",
  version: "0.2.87",
  description: "Qin-managed Vue language plugin for CSSTS",
  type: "library",
  entry: "index.ts",
  scripts: {
    build: "npm run build",
    test: "node test-transform-error.cjs"
  },
  dependencies: {
    "cssts-compiler": "^0.2.87",
    "find-up": "^8.0.0",
    "glogjs": "file:../../glogjs",
    "pkg-dir": "^4.2.0",
    "slime-generator": "^0.2.87"
  },
  devDependencies: {
    "@types/node": "^22.10.4",
    "@vue/language-core": "^3.2.2",
    "tsdown": "^0.20.0-beta.3",
    "typescript": "^5.8.3"
  },
  peerDependencies: {
    "@vue/language-core": "^3.0.0"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    vueScriptLang: "cssts",
    plugin: "index.ts"
  }
}
