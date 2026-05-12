<template>
  <section class="other-login">
    <div class="divider">
      <span>{{ t('auth.otherLoginMethods') }}</span>
    </div>
    <div class="social-login">
      <div class="social-item" @click="handleSocialLogin('wechat')">
        <van-icon name="wechat" size="28" color="#07C160" />
      </div>
      <div class="social-item" @click="handleSocialLogin('qq')">
        <van-icon name="qq" size="28" color="#12B7F5" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Icon as VanIcon } from 'vant'

const emit = defineEmits(['social-login'])
const { t } = useI18n()

/**
 * 处理社交登录
 * @param {String} platform - 社交平台
 */
const handleSocialLogin = (platform) => {
  console.log(`使用 ${platform} 登录`)
  emit('social-login', platform)
  // TODO: 调用后端社交登录接口
}
</script>

<style lang="less" scoped>
.other-login {
  width: 100%;
  max-width: 380px;

  .divider {
    display: flex;
    align-items: center;
    margin: 16px 0;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--color-border, #e5e5ea);
      transition: background-color 0.3s ease;
    }

    span {
      padding: 0 var(--spacing-md);
      font-size: 12px;
      color: var(--color-text-secondary, #86868b);
      font-weight: 400;
      transition: color 0.3s ease;
    }
  }

  .social-login {
    display: flex;
    justify-content: center;
    gap: 16px;

    .social-item {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-bg-card, white);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-light, 0 2px 8px rgba(0, 0, 0, 0.08));
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.95);
        box-shadow: var(--shadow-light, 0 1px 4px rgba(0, 0, 0, 0.08));
      }
    }
  }
}
</style>