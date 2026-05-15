<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    round
    :style="{ height: '50%' }"
    @update:show="handleUpdateShow"
  >
    <div class="popup-container">
      <div class="popup-header">
        <h3>{{ title }}</h3>
        <van-icon name="cross" @click="close" />
      </div>
      <div class="popup-body">
        <p v-if="type === 'privacy'">
          {{ t('about.popup.privacy') }}
        </p>
        <p v-else-if="type === 'agreement'">
          {{ t('about.popup.agreement') }}
        </p>
        <p v-else-if="type === 'disclaimer'">
          {{ t('about.popup.disclaimer') }}
        </p>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon as VanIcon, Popup as VanPopup } from 'vant'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: '',
    validator: (value) => value === '' || ['privacy', 'agreement', 'disclaimer'].includes(value)
  }
})

const emit = defineEmits(['update:show'])

const { t } = useI18n()

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const title = computed(() => {
  const titles = {
    privacy: t('about.legal.privacy'),
    agreement: t('about.legal.agreement'),
    disclaimer: t('about.legal.disclaimer')
  }
  return titles[props.type] || ''
})

const close = () => {
  emit('update:show', false)
}

const handleUpdateShow = (value) => {
  emit('update:show', value)
}
</script>

<style lang="less" scoped>
.popup-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--color-border-light);

    h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }

    .van-icon {
      font-size: 20px;
      color: var(--color-text-tertiary);
      cursor: pointer;
      padding: var(--spacing-xs);
    }
  }

  .popup-body {
    flex: 1;
    padding: var(--spacing-xl);
    overflow-y: auto;

    p {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
      margin: 0;

      br {
        display: block;
        content: '';
        margin: var(--spacing-sm) 0;
      }
    }
  }
}
</style>
