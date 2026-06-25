import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    // GitHub Pages 部署配置：仓库名作为基础路径
    base: '/lottery-web/',

    plugins: [vue()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
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
          // 移除 console
          drop_console: true,
          // 移除 debugger
          drop_debugger: true,
          // 移除未使用的变量
          unused: true,
          // 优化布尔表达式
          booleans: true,
          // 优化条件表达式
          conditionals: true,
          // 优化比较操作
          comparisons: true,
          // 内联简单函数
          inline: true,
        },
        mangle: {
          // 混淆变量名（进一步减小体积）
          toplevel: true,
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

              // 农历计算库（较大，单独拆分）- 延迟加载
              if (id.includes('lunar-javascript')) {
                return 'vendor-lunar';
              }

              

              // 日期处理库
              if (id.includes('dayjs')) {
                return 'vendor-dayjs';
              }

              // 数字格式化库
              if (id.includes(' numeral') || id.includes('format')) {
                return 'vendor-format';
              }
            }
          },

          // 优化 chunk 文件名，使用更短的 hash
          chunkFileNames: 'assets/[name]-[hash:8].js',
          entryFileNames: 'assets/[name]-[hash:8].js',
          assetFileNames: 'assets/[name]-[hash:8].[ext]',
        },
      },

      // ========================================
      // 性能优化：CSS 相关配置
      // ========================================
      cssMinify: true, // 启用 CSS 压缩

      // ========================================
      // 性能优化：资源内联阈值
      // ========================================
      assetsInlineLimit: 4096, // 小于 4KB 的资源自动转为 base64

      // ========================================
      // 性能优化：报告压缩后的大小
      // ========================================
      reportCompressedSize: true,
    },

    // 优化开发服务器性能
    server: {
      // 启用文件系统监听优化
      watch: {
        usePolling: false,
      },
      // 开启 gzip 压缩（开发环境模拟生产环境）
      compress: true,
      port: 8888,
      host: '0.0.0.0', // 允许外部访问
    },

    // 预加载配置
    optimizeDeps: {
      // 预构建依赖 - 包含 lunar-javascript（CommonJS 需要预构建）
      include: [
        'vue',
        'vue-router',
        'pinia',
        'vant',
        'dayjs',
        'lunar-javascript',
        'pdf-lib',
        'jspdf',
      ],
    },

    // ========================================
    // 性能优化：ESBuild 配置
    // ========================================
    esbuild: {
      // 移除 console 和 debugger（生产环境）
      drop: isProd ? ['console', 'debugger'] : [],
    },
  };
});