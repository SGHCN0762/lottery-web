<template>
  <div class="settings-section">
    <ToolCard icon="setting-o" :title="t('tools.fileConverter.common.settings')">
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
    </ToolCard>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ToolCard from '../../components/ToolCard.vue';

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
</style>