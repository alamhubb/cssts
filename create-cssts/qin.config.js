export default {
  name: "create-cssts",
  version: "0.1.0",
  description: "Qin-managed CSSTS project scaffold CLI",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "tsdown",
    test: "tsdown && node tests/test-scaffold-output.mjs"
  },
  devDependencies: {
    "@types/node": "^22.8.6",
    "tsdown": "^0.20.0-beta.3",
    "typescript": "^5.6.3"
  },
  language: {
    id: "cssts",
    scaffold: "template",
    cli: "src/index.ts"
  }
}
