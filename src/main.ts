import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import * as ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/message.scss';
import i18n from './plugins/i18n'
import './styles/index.scss'
//import 'element-plus/dist/index.css'
//import "uno.css";
import router from "./router/index";
import App from './App.vue'

// console.log(process.env.NODE_ENV);
const app = createApp(App)
// 版本號
app.provide('$version', 1);
// store pinia 持久化
// app.use(createPinia())
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 多國語言
app.use(i18n)
app.use(ElementPlus)
// icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
     app.component(key, component)
}
app.use(router)
app.mount('#app')
