<template>
  <section class="info-section">
    <div class="section-title">{{ t('about.contact.title') }}</div>
    <van-cell-group inset>
      <van-cell
        :title="t('about.contact.email')"
        icon="envelop-o"
        @click="$emit('copy-email')"
      >
        <template #default>
          <span class="contact-value">{{ contactInfo.email }}</span>
        </template>
      </van-cell>
      <van-cell
        :title="t('about.contact.phone')"
        icon="phone-o"
        @click="$emit('call-phone')"
      >
        <template #default>
          <span class="contact-value phone">{{ contactInfo.phone }}</span>
        </template>
      </van-cell>
      <van-cell
        :title="t('about.contact.workTime')"
        icon="clock-o"
        :value="contactInfo.workTime"
      />
    </van-cell-group>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant'

const { t } = useI18n()

defineProps({
  contactInfo: {
    type: Object,
    required: true,
    default: () => ({
      email: '',
      phone: '',
      workTime: ''
    })
  }
})

defineEmits(['copy-email', 'call-phone'])
</script>

<style lang="less" scoped>
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* 信息区域 */
.info-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  /* 联系方式样式 */
  .contact-value {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);

    &.phone {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }
  }
}
</style>
