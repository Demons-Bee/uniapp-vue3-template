import { createI18n } from 'vue-i18n'
import enLocale from './locales/en.json'
import zhLocale from './locales/zh-Hans.json'

const messages = {
  en: enLocale,
  'zh-Hans': zhLocale,
}

const i18n = createI18n({
  locale: uni.getLocale(), // 获取设备语言
  fallbackLocale: 'en', // 设置备用语言
  messages,
  legacy: false, // 使用Composition API
  globalInjection: true, // 全局注入 $t 函数
})

export default i18n
