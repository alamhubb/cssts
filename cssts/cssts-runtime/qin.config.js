export default {
  name: "cssts-ts",
  version: "0.2.87",
  description: "Qin-managed CSSTS runtime package",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "tsdown",
    test: "vitest run"
  },
  devDependencies: {
    "@types/node": "^25.0.8",
    "tsdown": "^0.20.0-beta.3",
    "typescript": "^5.8.3"
  },
  language: {
    id: "cssts",
    runtime: "src/index.ts"
  }
}
