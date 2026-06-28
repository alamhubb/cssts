export default {
  name: "{{projectName}}",
  version: "0.0.0",
  description: "Qin-managed CSSTS Vue application",
  type: "fullstack",
  frontend: {
    entry: "src/main.ts"
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc --build && vite build",
    preview: "vite preview",
    test: "vue-tsc --build && vite build"
  },
  dependencies: {
    "vue": "^3.5.25"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^6.0.2",
    "typescript": "~5.9.0",
    "vite": "^6.3.5",
    "vue-tsc": "^3.1.5"
  },
  language: {
    id: "cssts",
    extension: ".cssts",
    sourceDir: "src"
  }
}
