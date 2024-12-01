<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="nav-bar">
      <view class="nav-content">
        <text class="title">{{ $t('home.title') }}</text>
        <view class="lang-switcher" @click="toggleLang()">
          <text>{{ locale === 'zh-Hans' ? 'English' : '中文' }}</text>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <text class="welcome">{{ $t('common.welcome') }}</text>
      <input v-model="username" :placeholder="$t('common.username')" />
      <input v-model="password" :placeholder="$t('common.password')" />
      <button v-if="!userStore.userInfo" @click="login" class="auth-btn">
        {{ $t('common.login') }}
      </button>
      <button v-else @click="logout" class="auth-btn">
        {{ $t('common.logout') }}
      </button>
      <text class="user-info">{{ userStore.userInfo }}</text>
    </view>

  </view>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { userService } from '@/api'
import { useUserStore } from '@/stores/user'

const { t, locale } = useI18n()
const userStore = useUserStore()
const username = ref('')
const password = ref('')

onLoad(() => {
  console.log("Index Page Loaded", userStore.userInfo)
})

const login = async () => {
  try {
    const res = await userService.login({
      username: username.value,
      password: password.value
    })
    userStore.setUserInfo(res.userInfo)
  } catch (error: any) {
    uni.showToast({
      title: error.message || t('common.loginFailed'),
      icon: 'none'
    })
  }
}

const logout = () => {
  userStore.logout()
}

const toggleLang = () => {
  const newLang = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans'
  changeLang(newLang)
}

const changeLang = (lang: string) => {
  locale.value = lang
  uni.setLocale(lang)
  // 持久化保存语言设置
  uni.setStorageSync('locale', lang)
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(to top, #e2abde, #ffffff);
  color: #fbfbfb;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    animation: particles 20s infinite forwards;
    background-image: radial-gradient(circle at 65% 35%, rgba(177, 68, 68, 0.8) 0%, transparent 10%),
      radial-gradient(circle at 15% 45%, rgba(122, 50, 50, 0.7) 0%, transparent 15%),
      radial-gradient(circle at 90% 75%, rgba(9, 42, 125, 0.6) 0%, transparent 20%),
      radial-gradient(circle at 30% 85%, rgba(7, 79, 50, 0.5) 0%, transparent 25%),
      radial-gradient(circle at 45% 25%, rgba(20, 132, 142, 0.4) 0%, transparent 30%);
  }

  @keyframes particles {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0.8;
    }

    25% {
      transform: translate(30px, -20px) scale(1.2);
      opacity: 0.6;
    }

    50% {
      transform: translate(-40px, 35px) scale(1.5);
      opacity: 0.4;
    }

    75% {
      transform: translate(25px, 45px) scale(1.3);
      opacity: 0.6;
    }

    100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.8;
    }
  }
}

.nav-bar {
  @include flex(row, center, center);
  height: 88rpx;
  padding-top: var(--status-bar-height);
  background: linear-gradient(to right, #ffeb3b, #4caf50, #2196f3);

  .nav-content {
    width: 100%;
    padding: 0 30rpx;
    @include flex(row, center, center);
    position: relative;

    .title {
      font-size: 36rpx;
      font-weight: 600;
      color: #fff;
    }

    .lang-switcher {
      position: absolute;
      right: 30rpx;
    }
  }

  .lang-switcher {
    @include flex(row, center, center);
    gap: 6rpx;
    padding: 8rpx 12rpx;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    &:active {
      transform: scale(0.95);
    }

    text {
      font-size: 24rpx;
      color: #fff;
    }
  }
}

.content {
  @include flex(column, center, center);
  padding: 40rpx;

  input {
    width: 100%;
    height: 88rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
    padding: 0 20rpx;
    color: #333;
    transition: all 0.3s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
      transform: translateY(-2rpx);
    }

    &::placeholder {
      color: #999;
    }
  }

  .auth-btn {
    width: 100%;
    height: 88rpx;
    margin: 20rpx 0;
    background: linear-gradient(45deg, #2196f3, #4caf50);
    color: white;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: 500;
    box-shadow: 0 4rpx 12rpx rgba(33, 150, 243, 0.3);
    transition: all 0.3s ease;

    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 8rpx rgba(33, 150, 243, 0.2);
    }
  }
}

.welcome {
  font-size: 36rpx;
  background: linear-gradient(to right, #1524ca, #ff6b6b, #4caf50, #ffeb3b);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20rpx;
  animation: shine 3s ease-in-out infinite;
  background-size: 200% auto;

  @keyframes shine {
    0% {
      background-position: 0% center;
    }

    50% {
      background-position: 100% center;
    }

    100% {
      background-position: 0% center;
    }
  }

}

.user-info {
  font-size: 34rpx;
  color: #7030ef;
  font-weight: bold;
}

.lang-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .popup-content {
    background: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    width: 80%;
    max-width: 300rpx;

    .lang-item {
      padding: 10rpx 20rpx;
      border-radius: 5rpx;
      margin-bottom: 10rpx;

      &.active {
        background: #f0f0f0;
      }
    }
  }
}
</style>
