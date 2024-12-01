interface StorageData<T> {
  data: T
  expire?: number
}

class Storage {
  private cache = new Map<string, ReturnType<typeof ref>>()

  /**
   * 创建响应式存储
   * @param key 键名
   * @param initialValue 初始值
   * @param expire 过期时间(秒)
   */
  reactive<T>(key: string, initialValue: T, expire?: number) {
    // 如果已经存在缓存，直接返回
    if (this.cache.has(key)) {
      return this.cache.get(key)!
    }

    // 创建响应式引用
    const data = ref<T>(this.get(key) ?? initialValue)

    // 监听变化自动存储
    watch(
      data,
      (newValue: T) => {
        this.set(key, newValue, expire)
      },
      { deep: true }
    )

    // 缓存并返回
    this.cache.set(key, data)
    return data
  }

  /**
   * 设置存储
   */
  set<T>(key: string, data: T, expire?: number) {
    const storageData: StorageData<T> = {
      data,
      expire: expire ? Date.now() + expire * 1000 : undefined
    }
    uni.setStorageSync(key, storageData)
  }

  /**
   * 获取存储
   */
  get<T>(key: string): T | null {
    const storageData = uni.getStorageSync(key) as StorageData<T>
    
    if (!storageData) return null
    if (!storageData.expire) return storageData.data
    if (Date.now() > storageData.expire) {
      this.remove(key)
      return null
    }

    return storageData.data
  }

  /**
   * 移除存储
   */
  remove(key: string) {
    uni.removeStorageSync(key)
    this.cache.delete(key)
  }

  /**
   * 清空存储
   */
  clear() {
    uni.clearStorageSync()
    this.cache.clear()
  }

  /**
   * 获取存储信息
   */
  info() {
    return uni.getStorageInfoSync()
  }
}

export const storage = new Storage() 