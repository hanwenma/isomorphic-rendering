import { createSSRApp } from 'vue'
import getRouterByEntry from './router'
import App from './App.vue'

export default function createApp () {
  const app = createSSRApp(App)

  app.use(getRouterByEntry(false))

  return {
    app
  }
}
