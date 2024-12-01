import { request } from '../base/request'
import type { LoginParams, LoginResult } from '../types/user.types'
import { User } from '../models/user.model'
import { mockUserService } from '../mock/services'

const isMock = import.meta.env.VITE_USE_MOCK === 'true'

class UserService {
  async login(params: LoginParams): Promise<LoginResult> {
    if (isMock) {
      return mockUserService.login(params)
    }
    
    try {
      return await request.post('/api/login', params)
    } catch (error) {
      console.error('Login failed:', error)
      return mockUserService.login(params)
    }
  }

  async getUserInfo(): Promise<User> {
    if (isMock) {
      return mockUserService.getUserInfo()
    }
    
    try {
      const data = await request.get('/api/user/info')
      return new User(data)
    } catch (error) {
      console.error('Get user info failed:', error)
      return mockUserService.getUserInfo()
    }
  }
}

export const userService = new UserService() 