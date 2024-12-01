import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import i18n from './i18n/config'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(i18n)
  return {
    app,
    i18n,
  }
}
