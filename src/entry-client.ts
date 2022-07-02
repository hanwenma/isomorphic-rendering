import { createSSRApp } from 'vue'
import App from './App.vue'
import getRouterByEntry from './router'

const app = createSSRApp(App)

app.use(getRouterByEntry(true))

app.mount('#app')
