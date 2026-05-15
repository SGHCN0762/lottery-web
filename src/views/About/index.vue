<template>
  <div class="about-page">
    <!-- 应用信息卡片 -->
    <AppCard />

    <!-- 健康游戏倡议 -->
    <HealthSection />

    <!-- 法律条款 -->
    <LegalSection @show-popup="showPopup" />

    <!-- 联系我们 -->
    <ContactSection 
      :contact-info="contactInfo" 
      @copy-email="handleCopyEmail" 
      @call-phone="handleCallPhone" 
    />

    <!-- 弹窗组件 -->
    <LegalPopup 
      v-model:show="popupVisible" 
      :type="currentPopup" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import AppCard from './components/AppCard.vue'
import HealthSection from './components/HealthSection.vue'
import LegalSection from './components/LegalSection.vue'
import ContactSection from './components/ContactSection.vue'
import LegalPopup from './components/LegalPopup.vue'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 联系信息
// ========================================
const contactInfo = ref({
  email: 'support@entertainment-app.com',
  phone: '400-888-9999',
  workTime: '周一至周五 9:00-18:00'
})

// ========================================
// 弹窗状态
// ========================================
const popupVisible = ref(false)
const currentPopup = ref('')

// ========================================
// 事件处理函数
// ========================================

/**
 * 显示弹窗
 * @param {string} type - 弹窗类型
 */
const showPopup = (type) => {
  currentPopup.value = type
  popupVisible.value = true
}

/** 复制邮箱 */
const handleCopyEmail = () => {
  navigator.clipboard.writeText(contactInfo.value.email)
  showToast({ message: t('about.emailCopied'), icon: 'success' })
}

/** 拨打电话 */
const handleCallPhone = () => {
  window.location.href = `tel:${contactInfo.value.phone}`
}
</script>

<style lang="less" scoped>
.about-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}
</style>
