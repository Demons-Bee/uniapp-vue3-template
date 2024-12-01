<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="nav-bar">
      <text class="title">首页</text>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <text class="welcome">欢迎使用</text>
      <input v-model="username" placeholder="请输入用户名" />
      <input v-model="password" placeholder="请输入密码" />
      <button @click="login">登录</button>
      <button @click="logout">退出登录</button>
      <text class="user-info">{{ userStore.userInfo }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">

import { userService } from '@/api';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const username = ref('');
const password = ref('');

onLoad(() => {
  console.log("Index Page Loaded", userStore.userInfo);
});

const login = async () => {
  try {
    const res = await userService.login({ username: username.value, password: password.value });
    userStore.setUserInfo(res.userInfo);
  } catch (error: any) {
    uni.showToast({
      title: error.message || '登录失败',
      icon: 'none'
    });
  }
};

const logout = () => {
  userStore.logout();
};
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1111c2;
  color: #b02020;
}

.nav-bar {
  @include flex(row, center, center);
  height: 88rpx;
  padding-top: var(--status-bar-height);
  background-color: #848498;
}

.title {
  font-size: 32rpx;
  font-weight: 500;
}

.content {
  @include flex(column, center, center);
  padding: 40rpx;
}

.welcome {
  font-size: 36rpx;
  color: #3da92c;
}

.user-info {
  font-size: 24rpx;
  color: #30ef8d;
}
</style>
