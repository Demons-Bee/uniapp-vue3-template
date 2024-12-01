import type { PageParams } from '../base/types'
import type { UserInfo } from '../models/user.model'

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录返回结果
export interface LoginResult {
  token: string
  userInfo: {
    id: number
    username: string
    nickname: string
    avatar: string
    mobile: string
    status: number
    createTime: string
  }
}

// 修改密码参数
export interface UpdatePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

// 修改用户信息参数
export interface UpdateUserInfoParams {
  nickname?: string
  avatar?: string
  mobile?: string
}

// 用户列表查询参数
export interface UserListParams extends PageParams {
  keyword?: string
  status?: number
} 