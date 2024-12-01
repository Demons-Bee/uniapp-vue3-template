import { MOCK_USER, MOCK_DELAY } from './constants'
import type { LoginParams, LoginResult } from '../types/user.types'
import { User } from '../models/user.model'

export const mockUserService = {
  async login(params: LoginParams): Promise<LoginResult> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    if (params.username === 'admin' && params.password === '123456') {
      return {
        token: MOCK_USER.token,
        userInfo: MOCK_USER.userInfo
      }
    }
    
    throw new Error('用户名或密码错误')
  },

  async getUserInfo(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    return new User(MOCK_USER.userInfo)
  }
} 