import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署配置：仓库名作为基础路径
  base: '/lottery-web/',
  
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  build: {
    // 提高代码块大小警告阈值到 1000KB (压缩前)
    chunkSizeWarningLimit: 1000,
    
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    
    // 启用 sourcemap（生产环境可关闭）
    sourcemap: false,
    
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: true,
        // 移除 debugger
        drop_debugger: true,
      },
    },
    
    rollupOptions: {
      output: {
        // 手动代码分割配置 - 将第三方库精细分离
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Vue Router 路由（优先匹配）
            if (id.includes('vue-router')) {
              return 'vendor-router';
            }
            
            // Pinia 状态管理（优先匹配）
            if (id.includes('pinia')) {
              return 'vendor-pinia';
            }
            
            // Vue I18n 国际化（优先匹配）
            if (id.includes('vue-i18n')) {
              return 'vendor-i18n';
            }
            
            // Vue 核心库及 @vue 命名空间（排除 devtools）
            if ((id.includes('/vue/') || id === 'vue') && !id.includes('@vue/devtools')) {
              return 'vendor-vue-core';
            }
            
            if (id.includes('@vue/') && !id.includes('@vue/devtools')) {
              return 'vendor-vue-core';
            }
            
            // Vant UI 组件库
            if (id.includes('vant')) {
              return 'vendor-vant';
            }
            
            // 农历计算库（较大，单独拆分）
            if (id.includes('lunar-javascript')) {
              return 'vendor-lunar';
            }
            
            // Lodash 工具库
            if (id.includes('lodash-es')) {
              return 'vendor-lodash';
            }
            
            // 日期处理库
            if (id.includes('dayjs')) {
              return 'vendor-dayjs';
            }
          }
        },
        
        // 优化 chunk 文件名，使用更短的 hash
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
      },
    },
  },
  
  // 优化开发服务器性能
  server: {
    // 启用文件系统监听优化
    watch: {
      usePolling: false,
    },
  },
  
  // 预加载配置
  optimizeDeps: {
    // 预构建依赖
    include: [
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n',
      'vant',
    ],
  },
})