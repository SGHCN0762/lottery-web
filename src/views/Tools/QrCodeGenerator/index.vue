<template>
  <div class="qr-code-generator">
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab :title="t('tools.qrCode.tabs.generate')">
        <QrGenerator />
      </van-tab>
      <van-tab :title="t('tools.qrCode.tabs.scan')">
        <QrScanner />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tab as VanTab, Tabs as VanTabs } from 'vant';
import QrGenerator from './components/QrGenerator.vue';
import QrScanner from './components/QrScanner.vue';

const { t } = useI18n();

const activeTab = ref(0);
</script>

<style lang="less" scoped>
.qr-code-generator {
  min-height: 100%;
  background: var(--color-bg-primary);
}

:deep(.van-tabs__wrap) {
  background: var(--color-bg-secondary);
}

:deep(.van-tab) {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

:deep(.van-tab--active) {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

:deep(.van-tabs__line) {
  background: var(--color-primary);
}
</style>
