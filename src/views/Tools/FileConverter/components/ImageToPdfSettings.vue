<template>
  <div class="settings-section">
    <div class="settings-card">
      <div class="card-header">
        <van-icon name="setting-o" class="header-icon" />
        <span>{{ t('tools.fileConverter.common.settings') }}</span>
      </div>

      <div class="settings-content">
        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.fileConverter.imageToPdf.pageSize') }}</span>
          </div>
          <div class="radio-group">
            <div
              v-for="option in pageSizeOptions"
              :key="option.value"
              class="radio-item"
              :class="{ active: pageSize === option.value }"
              @click="updatePageSize(option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.fileConverter.imageToPdf.orientation') }}</span>
          </div>
          <div class="radio-group">
            <div
              v-for="option in orientationOptions"
              :key="option.value"
              class="radio-item"
              :class="{ active: orientation === option.value }"
              @click="updateOrientation(option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Icon as VanIcon,
} from 'vant';

const { t } = useI18n();

const props = defineProps({
  pageSize: {
    type: String,
    default: 'a4',
  },
  orientation: {
    type: String,
    default: 'portrait',
  },
});

const emit = defineEmits(['update:pageSize', 'update:orientation']);

const pageSizeOptions = computed(() => [
  { label: 'A4', value: 'a4' },
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
]);

const orientationOptions = computed(() => [
  { label: t('tools.fileConverter.imageToPdf.portrait'), value: 'portrait' },
  { label: t('tools.fileConverter.imageToPdf.landscape'), value: 'landscape' },
]);

const updatePageSize = val => emit('update:pageSize', val);
const updateOrientation = val => emit('update:orientation', val);
</script>

<style lang="less" scoped>
.settings-section {
  margin-bottom: var(--spacing-lg);

  .settings-card {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    .card-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);

      .header-icon {
        font-size: 18px;
        color: var(--color-primary);
      }
    }

    .settings-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .setting-item {
      .setting-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);

        .label-text {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

      }

      .radio-group {
        display: flex;
        gap: var(--spacing-sm);

        .radio-item {
          flex: 1;
          text-align: center;
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--color-bg-primary);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          cursor: pointer;
          transition: all 0.2s ease;

          &.active {
            background: rgba(var(--color-primary-rgb), 0.1);
            color: var(--color-primary);
            border-color: var(--color-primary);
          }
        }
      }
    }
  }
}
</style>