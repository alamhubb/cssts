export default {
  name: "vite-plugin-cssts",
  version: "0.2.87",
  description: "Qin-managed Vite plugin for CSSTS",
  type: "library",
  entry: "src/index.ts",
  scripts: {
    build: "npm run build",
    test: "npm run build"
  },
  dependencies: {
    "cssts-compiler": "^0.2.87",
    "cssts-ts": "^0.2.87"
  },
  devDependencies: {
    "@types/node": "^25.0.2",
    "tsdown": "^0.20.0-beta.3",
    "typescript": "^5.8.3",
    "vite": "^6.3.5"
  },
  peerDependencies: {
    "@vue/compiler-sfc": "^3.0.0",
    "vite": "^5.0.0 || ^6.0.0"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    compiler: "cssts-compiler",
    plugin: "src/index.ts"
  }
}
