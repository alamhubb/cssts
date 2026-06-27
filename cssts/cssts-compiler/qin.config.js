export default {
  name: "cssts-compiler",
  version: "0.2.87",
  description: "Qin-managed CSSTS parser and compiler package",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "npm run build",
    test: "npm run test"
  },
  dependencies: {
    "@qin/generated-qin-parser-ts": "file:../../../qin/packages/qin-language/generated/qin-parser-ts",
    "cssts-ts": "^0.2.87",
    "glogjs": "file:../../../glogjs",
    "slime-ast": "^0.2.7",
    "slime-generator": "^0.2.7",
    "slime-parser": "file:../../../slime/slime-parser",
    "slime-token": "^0.2.7",
    "subhuti": "file:../../../subhuti"
  },
  devDependencies: {
    "css-tree": "^3.1.0",
    "slime-test": "^0.2.7",
    "tsdown": "^0.20.0-beta.3",
    "typescript": "^5.8.3"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    parser: "@qin/generated-qin-parser-ts",
    compiler: "src/index.ts"
  }
}
