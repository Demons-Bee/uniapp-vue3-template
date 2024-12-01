/// <reference types="@dcloudio/types" />
/// <reference types="@vue/runtime-core" />
/// <reference types="vite/client" />

declare module 'vue' {
  export * from '@vue/runtime-core'
  export { createSSRApp } from '@dcloudio/uni-app'
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
