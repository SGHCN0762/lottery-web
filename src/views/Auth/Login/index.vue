<template>
  <div class="login-page">
    <!-- Logo区域 -->
    <LogoSection />

    <!-- 登录表单卡片 -->
    <LoginForm 
      ref="loginFormRef"
      @login-success="handleLoginSuccess"
      @forgot-password="handleForgotPassword"
      @go-register="goToRegister"
    />

    <!-- 其他登录方式 -->
    <SocialLogin @social-login="handleSocialLogin" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import LogoSection from './components/LogoSection.vue'
import LoginForm from './components/LoginForm.vue'
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
// 组件引用
// ========================================
const loginFormRef = ref(null)

// ========================================
// 事件处理函数
// ========================================

/**
 * 处理登录成功回调
 */
const handleLoginSuccess = ({ token, userInfo }) => {
  // 这里可以执行额外的登录后逻辑，比如跳转
  setTimeout(() => {
    router.push({ name: 'Home' })
  }, 1000)
}

/**
 * 处理忘记密码
 */
const handleForgotPassword = () => {
  showToast(t('auth.contactSupport'))
}

/**
 * 跳转到注册页面
 */
const goToRegister = () => {
  router.push({ name: 'Register' })
}

/**
 * 处理第三方登录
 * @param {String} platform - 平台类型
 */
const handleSocialLogin = (platform) => {
  console.log('Social login clicked:', platform)
  // 可以在这里添加更复杂的第三方登录逻辑
}

// ========================================
// 生命周期钩子
// ========================================
onMounted(() => {
  // 页面加载时，如果记住了手机号，自动填充
  const rememberedPhone = localStorage.getItem('rememberedPhone')
  if (rememberedPhone && loginFormRef.value) {
    loginFormRef.value.formData.phone = rememberedPhone
    loginFormRef.value.formData.rememberMe = true
  }
})
</script>

<style lang="less" scoped>
.login-page {
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
</style>