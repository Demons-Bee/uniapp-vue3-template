# Uni-App Vue3 项目模板

基于 Vue3 + TypeScript + Vite + Pinia 的 uni-app 项目模板，集成了完整的开发框架和工具链。

## 技术栈

- Vue 3.4 - 渲染框架
- TypeScript 4.9 - 类型支持
- Vite 5.2 - 构建工具
- Pinia 2.1 - 状态管理
- SCSS - 样式预处理器
- ESLint + Prettier - 代码规范
- Uni-App - 跨端框架

## 项目结构
```bash
.
├── .vscode/                # VSCode 配置
│   └── settings.json       # 编辑器设置
├── dist/                   # 构建输出目录
│   ├── build/             # 构建文件
│   └── zips/              # 打包文件
├── scripts/               # 构建脚本
│   └── build-zip.js       # 打包脚本
├── src/                   # 源代码
│   ├── api/              # API 接口相关
│   │   ├── base/        # 基础请求封装
│   │   │   ├── code.ts  # 状态码定义
│   │   │   ├── request.ts # 请求类封装
│   │   │   └── types.ts # 请求相关类型
│   │   ├── mock/        # Mock 数据
│   │   │   ├── constants.ts # Mock 常量
│   │   │   └── services.ts  # Mock 服务
│   │   ├── models/      # 数据模型
│   │   ├── services/    # 业务服务
│   │   └── types/       # 类型定义
│   ├── pages/           # 页面文件
│   │   ├── index/      # 首页
│   │   └── login/      # 登录页
│   ├── static/         # 静态资源
│   │   ├── images/     # 图片资源
│   │   └── tabbar/     # TabBar 图标
│   ├── stores/         # Pinia 状态管理
│   │   ├── plugins/    # Pinia 插件
│   │   ├── index.ts    # Store 入口
│   │   └── user.ts     # 用户状态
│   ├── styles/         # 全局样式
│   │   ├── common.scss # 公共样式
│   │   ├── mixins.scss # 混入
│   │   └── vars.scss   # 变量
│   ├── utils/          # 工具函数
│   │   ├── request/    # 请求工具
│   │   └── router.ts   # 路由工具
│   ├── App.vue         # 应用入口
│   ├── auto-imports.d.ts # 自动导入类型
│   ├── env.d.ts        # 环境变量类型
│   ├── main.ts         # 主入口
│   ├── manifest.json   # 应用配置
│   ├── pages.json      # 页面配置
│   └── uni.scss        # uni-app 样式变量
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── .env.example        # 环境变量示例
├── .eslintrc.js       # ESLint 配置
├── .gitignore         # Git 忽略文件
├── .prettierrc        # Prettier 配置
├── package.json       # 项目配置
├── README.md          # 项目说明
├── tsconfig.json      # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

## 核心功能

### 请求封装 (src/api/base/request.ts)
- 统一的请求拦截器
- 响应数据处理
- 错误处理
- Token 注入
- Loading 控制

### 路由管理 (src/utils/router.ts)
- 类型安全的路由跳转
- 参数类型检查
- 防抖处理
- 页面返回数据传递

### 状态管理 (src/stores/)
- Pinia 状态管理
- 持久化支持
- 类型安全

### Mock 数据 (src/api/mock/)
- 本地模拟数据
- 可配置的响应延迟
- 环境变量控制

### 样式管理
- SCSS 预处理
- Mixins 复用
- 主题变量
- 响应式支持

## 开发指南

### 安装依赖
```bash
npm install
```

### 开发
```bash
H5
npm run dev:h5

微信小程序
npm run dev:mp-weixin
```

### 构建
```bash
H5
npm run build:h5

微信小程序
npm run build:mp-weixin
```

### 类型检查
```bash
npm run type-check
```

## 环境变量

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 注意事项

1. 确保已安装相关编辑器插件
   - Volar
   - ESLint
   - Prettier

2. 遵循项目的代码规范和提交规范

3. 使用 TypeScript 编写代码，确保类型安全

4. 合理使用 Mock 数据进行开发调试