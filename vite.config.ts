import path from 'path';
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      // 自动导入 Vue 和 UniApp 相关函数
      imports: [
        'vue',
        'uni-app'
      ],
      dts: 'src/auto-imports.d.ts',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/assets/img'),
    },
  },
  build: {
    // 小于此阈值的资源将被转换为 base64 编码的内联数据
    assetsInlineLimit: 4096, // 4kb
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @use "@/styles/vars.scss" as *;
          @use "@/styles/mixins.scss" as *;
          @use "@/styles/common.scss" as *;
        `
      }
    }
  }
});
