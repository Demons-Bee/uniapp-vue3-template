import { createPinia } from 'pinia'
import { persist } from './plugins/persist'

const pinia = createPinia()
pinia.use(persist)

export default pinia 