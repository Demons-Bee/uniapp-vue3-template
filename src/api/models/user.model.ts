// 用户基础信息
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  mobile: string
  status: number
  createTime: string
}

// 用户详细信息
export class User implements UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  mobile: string
  status: number
  createTime: string

  constructor(data: UserInfo) {
    this.id = data.id
    this.username = data.username
    this.nickname = data.nickname
    this.avatar = data.avatar
    this.mobile = data.mobile
    this.status = data.status
    this.createTime = data.createTime
  }

  // 获取状态文本
  get statusText(): string {
    return this.status === 1 ? '启用' : '禁用'
  }

  // 获取头像完整地址
  get avatarUrl(): string {
    return this.avatar.startsWith('http') 
      ? this.avatar 
      : import.meta.env.VITE_API_URL + this.avatar
  }

  // 格式化创建时间
  get formatCreateTime(): string {
    return new Date(this.createTime).toLocaleString()
  }
} 