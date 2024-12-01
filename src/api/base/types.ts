// 请求配置
export interface RequestOptions {
  baseURL?: string
  timeout?: number
  header?: Record<string, string>
}

// 请求拦截器
export interface RequestInterceptor {
  onRequest?: (options: UniApp.RequestOptions) => UniApp.RequestOptions
  onResponse?: (response: UniApp.RequestSuccessCallbackResult) => any
  onError?: (error: Error | UniApp.GeneralCallbackResult) => Promise<any>
}

// 自定义请求配置
export interface CustomRequestOptions extends UniApp.RequestOptions {
  loading?: boolean  // 是否显示加载提示
  custom?: Record<string, any>  // 自定义参数
}

// 通用响应结构
export interface ResponseData<T = any> {
  code: number      // 业务状态码
  message: string   // 业务消息
  data: T          // 业务数据
}

// 分页请求参数
export interface PageParams {
  page: number      // 页码
  pageSize: number  // 每页条数
}

// 分页响应结构
export interface PageResult<T> {
  list: T[]         // 列表数据
  total: number     // 总条数
  page: number      // 当前页码
  pageSize: number  // 每页条数
} 