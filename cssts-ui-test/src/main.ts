import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// virtual:cssts.css 会在 .cssts 文件中自动注入
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
