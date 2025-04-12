import { createApp } from 'vue'
import App from './App.vue'
import "./styles/index.css"                             // 全局样式
import "animate.css";                                   // 引入 animate.css
import "virtual:svg-icons-register";                    // 本地SVG图标
import "element-plus/theme-chalk/dark/css-vars.css";    // dark 样式
import { setupElIcons } from "./plugins";
import { setupStore } from "@/store";
import { setupRouter } from "@/router";
import 'uno.css'


const app = createApp(App);
setupElIcons(app);  // 全局注册Element-plus图标
setupStore(app);    // 状态管理
setupRouter(app);   // router
app.mount("#app");
