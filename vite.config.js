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
  }
})