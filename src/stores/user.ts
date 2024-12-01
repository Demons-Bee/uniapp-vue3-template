import { defineStore } from 'pinia'
import type { User } from '@/api/models/user.model'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<User | null>(null)

  const isLogin = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setUserInfo(info: User) {
    userInfo.value = info
  }

  function logout() {
    token.value = ''
    userInfo.value = null
  }

  return {
    token,
    userInfo,
    isLogin,
    setToken,
    setUserInfo,
    logout
  }
}, {
  persist: {
    key: 'user_store',
    expire: 7 * 24 * 3600
  }
}) 