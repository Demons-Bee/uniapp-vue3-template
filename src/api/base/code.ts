// 业务状态码
export enum BusinessCode {
  SUCCESS = 0,        // 成功
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403,    // 禁止访问
  NOT_FOUND = 404,    // 未找到
  ERROR = 500,        // 服务器错误
  TIMEOUT = 504       // 超时
}