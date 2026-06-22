<template>
  <div class="export-settings">
    <div class="settings-header" @click="showSettings = !showSettings">
      <div class="header-title">
        <van-icon name="completed-o" class="header-icon" />
        <span>{{ t('tools.logoDesigner.exportSettings') }}</span>
      </div>
      <van-icon :name="showSettings ? 'arrow-up' : 'arrow-down'" />
    </div>

    <div v-show="showSettings" class="settings-content">
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
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Icon as VanIcon,
    Field as VanField,
    Button as VanButton,
    ActionSheet as VanActionSheet,
  } from 'vant';
  import { FORMAT_OPTIONS } from '../js/constants';

  const { t } = useI18n();

  const props = defineProps({
    currentFormat: { type: String, required: true },
  });

  const emit = defineEmits(['update:format', 'export', 'reset']);

  const showSettings = ref(true);
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
  .export-settings {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    overflow: hidden;
    margin-bottom: var(--spacing-md);

    .settings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      cursor: pointer;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);

      .header-title {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--color-text-primary);

        .header-icon {
          font-size: 18px;
          color: var(--color-primary);
        }
      }
    }

    .settings-content {
      padding: var(--spacing-md);
      border-top: 1px solid var(--color-border);
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
  }
</style>
