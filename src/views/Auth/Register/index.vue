<template>
  <div class="register-page">
    <!-- Logo区域 - 放大Logo，突出品牌 -->
    <section class="logo-section">
      <div class="logo-container">
        <div class="logo-icon">
          <img src="@/assets/logo.svg" alt="瑶光神域 Logo" class="app-logo" />
        </div>
      </div>
    </section>

    <!-- 注册表单组件 -->
    <RegisterForm 
      @register-success="handleRegisterSuccess"
      @show-agreement="showAgreement"
      @go-to-login="goToLogin"
    />

    <!-- 其他登录方式组件 -->
    <SocialLogin @social-login="handleSocialLogin" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { showDialog } from 'vant'
import { useThemeStore } from '@/stores/theme'
import RegisterForm from './components/RegisterForm.vue'
import SocialLogin from './components/SocialLogin.vue'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 主题管理
// ========================================
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// ========================================
// 事件处理函数
// ========================================

/**
 * 注册成功处理
 */
const handleRegisterSuccess = () => {
  // 跳转到登录页
  setTimeout(() => {
    router.push({ name: 'Login' })
  }, 1000)
}

/**
 * 显示协议
 * @param {String} type - 协议类型
 */
const showAgreement = (type) => {
  const titles = {
    user: t('auth.userAgreement'),
    privacy: t('auth.privacyPolicy')
  }
  
  showDialog({
    title: titles[type],
    message: `${t('auth.agreementContent')}`,
    confirmButtonText: t('common.confirm')
  })
}

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push({ name: 'Login' })
}

/**
 * 处理社交登录
 * @param {String} platform - 社交平台
 */
const handleSocialLogin = (platform) => {
  console.log(`使用 ${platform} 登录`)
  // TODO: 调用后端社交登录接口
}
</script>

<style lang="less" scoped>
.register-page {
  min-height: 100vh;
  background: var(--color-bg-primary, #f5f5f7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-md);
  transition: background-color 0.3s ease;
  overflow: hidden;
}

/* ========================================
   Logo区域 - 超大Logo，突出品牌
   ======================================== */
.logo-section {
  text-align: center;
  margin-bottom: 16px;

  .logo-container {
    .logo-icon {
      margin-bottom: 8px;
      
      .app-logo {
        width: 140px;
        height: 140px;
        object-fit: contain;
        animation: subtlePulse 4s ease-in-out infinite;
      }
    }
  }
}

@keyframes subtlePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}
</style>