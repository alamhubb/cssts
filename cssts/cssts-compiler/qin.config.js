export default {
  name: "cssts-compiler",
  version: "0.2.87",
  description: "Qin-managed CSSTS parser and compiler package",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "tsdown",
    test: "tsx tests/test-generated-parser-chain.ts && tsdown"
  },
  dependencies: {
    "@qin/generated-qin-parser-ts": "file:../../../qin/packages/qin-language/generated/qin-parser-ts",
    "cssts-ts": "^0.2.87",
    "glogjs": "file:../../../glogjs",
    "slime-ast": "file:../../../slime/slime-ast",
    "slime-generator": "file:../../../slime/slime-generator",
    "slime-parser": "file:../../../slime/slime-parser",
    "slime-token": "file:../../../slime/slime-token",
    "subhuti": "file:../../../subhuti"
  },
  devDependencies: {
    "css-tree": "^3.1.0",
    "slime-test": "file:../../../slime/slime-test",
    "tsdown": "^0.20.0-beta.3",
    "tsx": "^4.19.2",
    "typescript": "^5.8.3"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    parser: "@qin/generated-qin-parser-ts",
    compiler: "src/index.ts"
  }
}
