export default {
  name: "cssts-theme-element",
  version: "0.0.1",
  description: "Qin-managed Element Plus theme package for CSSTS",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "npm run build",
    test: "npm run build"
  },
  devDependencies: {
    "tsdown": "^0.20.0-beta.3",
    "typescript": "~5.5.0"
  },
  language: {
    id: "cssts",
    theme: "element-plus",
    package: "src/index.ts"
  }
}
