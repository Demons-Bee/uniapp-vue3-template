import type { PiniaPluginContext } from 'pinia'
import { storage } from '@/utils/storage'

export interface PersistOptions {
  key?: string
  expire?: number
}

export interface PersistStrategy {
  key: string
  storage?: Storage
  paths?: string[]
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}

export function persist(context: PiniaPluginContext) {
  const { store, options } = context
  const persistOptions = options.persist

  if (persistOptions) {
    // 恢复状态
    const key = persistOptions.key || store.$id
    const savedState = storage.get(key)
    if (savedState) {
      store.$patch(savedState)
    }

    // 监听变化
    store.$subscribe(() => {
      storage.set(key, store.$state, persistOptions.expire)
    })
  }
} 