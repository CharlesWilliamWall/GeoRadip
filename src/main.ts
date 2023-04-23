import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../src/App.vue'
import router from './router'

import './assets/tailwind.css'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
