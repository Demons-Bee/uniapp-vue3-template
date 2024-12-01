type RouteType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

export enum RouteName {
  LOGIN = '/pages/login/index',
  HOME = '/pages/home/index',
}

export interface RouteParams {
  [RouteName.LOGIN]: undefined
  [RouteName.HOME]: {
    id?: string
    type?: string
  }
}

interface RouteOptions<T extends RouteName> {
  type?: RouteType
  data?: RouteParams[T]
}

interface BackOptions {
  delta?: number
  data?: Record<string, any>
}

const BACK_EVENT = 'ROUTER_BACK_DATA'
const DEBOUNCE_TIME = 300 // 防抖时间
let isNavigating = false
let timer: ReturnType<typeof setTimeout>

class Router {
  /**
   * 路由跳转
   */
  push<T extends RouteName>(name: T, options: RouteOptions<T> = {}) {
    if (isNavigating) return Promise.reject(new Error('请勿频繁点击'))
    
    return new Promise<void>((resolve, reject) => {
      isNavigating = true
      clearTimeout(timer)
      
      const { type = 'navigateTo', data } = options
      const url = this.parseUrl(name, data)

      const navigate = uni[type] as (options: UniApp.NavigateToOptions) => void
      navigate({
        url,
        success: () => resolve(),
        fail: (error) => reject(error),
        complete: () => {
          timer = setTimeout(() => {
            isNavigating = false
          }, DEBOUNCE_TIME)
        }
      })
    })
  }

  /**
   * 返回上一页
   */
  back(options: BackOptions = {}) {
    const { delta = 1, data } = options

    // 如果有数据，先发送事件
    if (data) {
      uni.$emit(BACK_EVENT, data)
    }

    return new Promise<void>((resolve, reject) => {
      uni.navigateBack({
        delta,
        success: () => resolve(),
        fail: (error: UniApp.GeneralCallbackResult) => reject(error)
      })
    })
  }

  /**
   * 监听返回数据
   */
  onBackData(callback: (data: any) => void) {
    uni.$once(BACK_EVENT, callback)
  }

  /**
   * 解析URL
   */
  private parseUrl(path: string, data?: Record<string, any>): string {
    if (!data) return path

    const query = Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&')

    return `${path}?${query}`
  }
}

export const router = new Router() 