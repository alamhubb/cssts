export default {
  name: "vite-project",
  version: "0.0.0",
  description: "Qin-managed CSSTS Vue demo application",
  type: "fullstack",
  frontend: {
    srcDir: "src",
    entry: "src/main.ts",
    staticDir: "public"
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc -b && vite build",
    preview: "vite preview",
    test: "vue-tsc -b && vite build"
  },
  dependencies: {
    "cssts-ts": "file:../cssts/cssts-runtime",
    "vite-plugin-cssts": "file:../vite-plugin-cssts"
  },
  devDependencies: {
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.4",
    "@vue/tsconfig": "^0.8.1",
    "typescript": "~5.9.3",
    "vite": "^5.4.21",
    "vue": "^3.5.28",
    "vue-tsc": "^3.2.5"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    sourceDir: "src"
  }
}
