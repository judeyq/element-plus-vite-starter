import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router'
import pinia from '@/store'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import 'uno.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
