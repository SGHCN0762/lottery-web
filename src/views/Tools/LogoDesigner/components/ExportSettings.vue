<template>
  <ToolCard
    icon="completed-o"
    :title="t('tools.logoDesigner.exportSettings')"
    collapsible
    class="export-settings-card"
  >
    <div class="settings-content">
      <div class="setting-field">
        <van-field
          :label="t('tools.logoDesigner.exportFormat')"
          :model-value="currentFormat"
          readonly
          right-icon="arrow"
          @click="showFormatSheet = true"
        />
      </div>

      <div class="export-actions">
        <van-button type="primary" block @click="handleExport">
          {{ t('tools.logoDesigner.export') }}
        </van-button>
        <van-button block @click="$emit('reset')">
          {{ t('tools.logoDesigner.reset') }}
        </van-button>
      </div>
    </div>

    <van-action-sheet
      v-model:show="showFormatSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="formatOptions"
      @select="handleFormatSelect"
    />
  </ToolCard>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Field as VanField,
    Button as VanButton,
    ActionSheet as VanActionSheet,
  } from 'vant';
  import { FORMAT_OPTIONS } from '../js/constants';
  import ToolCard from '../../components/ToolCard.vue';

  const { t } = useI18n();

  const props = defineProps({
    currentFormat: { type: String, required: true },
  });

  const emit = defineEmits(['update:format', 'export', 'reset']);

  const showFormatSheet = ref(false);

  const formatOptions = computed(() => FORMAT_OPTIONS);

  const handleFormatSelect = option => {
    emit('update:format', option.value);
    showFormatSheet.value = false;
  };

  const handleExport = () => {
    emit('export');
  };
</script>

<style lang="less" scoped>
  .export-settings-card {
    margin-bottom: var(--spacing-md);
  }

  .settings-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .setting-field {
    margin-bottom: var(--spacing-sm);

    :deep(.van-field) {
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      border: none !important;

      &::after {
        display: none !important;
      }

      .van-field__label {
        font-size: var(--font-size-sm) !important;
        color: var(--color-text-secondary) !important;
        width: auto !important;
        min-width: 80px !important;
      }

      .van-field__value {
        font-size: var(--font-size-sm) !important;
        color: var(--color-text-primary) !important;
      }

      .van-field__right-icon {
        font-size: 14px !important;
        color: var(--color-text-tertiary) !important;
      }

      .van-field__control {
        text-align: right !important;
      }
    }

    .unit-text {
      font-size: var(--font-size-sm);
      color: var(--color-text-tertiary);
    }
  }

  .export-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    :deep(.van-button) {
      height: 40px;
      line-height: 40px;
      font-size: var(--font-size-sm);
      border-radius: var(--radius-md);
    }
  }
</style>
