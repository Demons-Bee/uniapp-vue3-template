import type { RequestOptions, RequestInterceptor, CustomRequestOptions, ResponseData } from './types'
import { BusinessCode } from '@/api/base/code'
import { useUserStore } from '@/stores/user'

class Request {
  private baseURL: string
  private timeout: number
  private header: Record<string, string>
  private interceptors: RequestInterceptor

  constructor(options: RequestOptions = {}) {
    this.baseURL = options.baseURL || ''
    this.timeout = options.timeout || 60000
    this.header = options.header || {}
    this.interceptors = {}
  }

  setInterceptor(interceptor: RequestInterceptor) {
    this.interceptors = interceptor
  }

  private handleOptions(options: CustomRequestOptions): UniApp.RequestOptions {
    const baseOptions: UniApp.RequestOptions = {
      url: this.baseURL + options.url,
      timeout: this.timeout,
      header: { ...this.header, ...options.header },
      method: options.method || 'GET'
    }

    if (options.data) {
      baseOptions.data = options.data
    }

    if (this.interceptors.onRequest) {
      return this.interceptors.onRequest(baseOptions)
    }

    return baseOptions
  }

  private uniRequest<T>(options: UniApp.RequestOptions): Promise<UniApp.RequestSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => resolve(res),
        fail: (err) => reject(err)
      })
    })
  }

  async request<T = any>(options: CustomRequestOptions): Promise<T> {
    try {
      if (options.loading) {
        uni.showLoading({ title: '加载中...' })
      }

      const requestOptions = this.handleOptions(options)
      const response = await this.uniRequest(requestOptions)
      
      if (this.interceptors.onResponse) {
        return this.interceptors.onResponse(response)
      }

      return response.data as T
    } catch (error) {
      if (this.interceptors.onError) {
        return this.interceptors.onError(error as UniApp.GeneralCallbackResult)
      }
      throw error
    } finally {
      if (options.loading) {
        uni.hideLoading()
      }
    }
  }

  get<T = any>(url: string, data?: any, options: Partial<CustomRequestOptions> = {}) {
    return this.request<T>({
      url,
      method: 'GET',
      data,
      ...options
    })
  }

  post<T = any>(url: string, data?: any, options: Partial<CustomRequestOptions> = {}) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...options
    })
  }
}

export const request = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  header: {
    'Content-Type': 'application/json'
  }
})

request.setInterceptor({
  onRequest: (options) => {
    const userStore = useUserStore()
    if (userStore.token) {
      options.header = {
        ...options.header,
        'Authorization': `Bearer ${userStore.token}`
      }
    }
    return options
  },
  onResponse: (response) => {
    const { statusCode, data } = response
    const resData = data as ResponseData
    
    if (statusCode === 200) {
      switch (resData.code) {
        case BusinessCode.SUCCESS:
          return resData.data
        case BusinessCode.UNAUTHORIZED:
          // 处理未授权，例如跳转登录页
          uni.navigateTo({ url: '/pages/login/index' })
          break
        case BusinessCode.FORBIDDEN:
          uni.showToast({
            title: '无权访问',
            icon: 'none'
          })
          break
        default:
          uni.showToast({
            title: resData.message || '请求失败',
            icon: 'none'
          })
      }
    }
    
    return Promise.reject(resData)
  },
  onError: async (error) => {
    uni.showToast({
      title: '网络异常',
      icon: 'none'
    })
    return Promise.reject(error)
  }
})

export default request