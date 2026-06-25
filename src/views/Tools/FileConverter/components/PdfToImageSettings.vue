<template>
  <div class="settings-section">
    <div class="settings-card">
      <div class="card-header">
        <van-icon name="setting-o" class="header-icon" />
        <span>{{ t('tools.fileConverter.common.settings') }}</span>
      </div>

      <div class="settings-content">
        <div class="format-field">
          <van-field
            :model-value="currentFormatLabel"
            readonly
            :label="t('tools.fileConverter.pdfToImage.outputFormat')"
            right-icon="arrow"
            @click="showFormatSheet = true"
          />
        </div>

        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.fileConverter.pdfToImage.resolution') }}</span>
            <span class="quality-value">{{ resolution }} DPI</span>
          </div>
          <van-slider
            :model-value="resolution"
            :min="72"
            :max="300"
            :step="1"
            active-color="var(--color-primary)"
            inactive-color="var(--color-border)"
            bar-height="6px"
            @update:model-value="updateResolution"
          >
            <template #button>
              <div class="slider-button" />
            </template>
          </van-slider>
          <div class="quality-hints">
            <span>72 DPI</span>
            <span>300 DPI</span>
          </div>
        </div>
      </div>
    </div>

    <van-action-sheet
      v-model:show="showFormatSheet"
      :actions="formatOptions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="handleFormatSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Icon as VanIcon,
  Slider as VanSlider,
  ActionSheet as VanActionSheet,
  Field as VanField,
} from 'vant';

const { t } = useI18n();

const props = defineProps({
  format: {
    type: String,
    default: 'png',
  },
  resolution: {
    type: Number,
    default: 150,
  },
});

const emit = defineEmits(['update:format', 'update:resolution']);

const showFormatSheet = ref(false);

const formatOptions = computed(() => [
  { name: 'JPEG', value: 'jpeg' },
  { name: 'PNG', value: 'png' },
  { name: 'WebP', value: 'webp' },
]);

const currentFormatLabel = computed(() => {
  const option = formatOptions.value.find(opt => opt.value === props.format);
  return option ? option.name : props.format;
});

const updateResolution = val => emit('update:resolution', val);

const handleFormatSelect = option => {
  emit('update:format', option.value);
};
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

        .quality-value {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
        }
      }

      .quality-hints {
        display: flex;
        justify-content: space-between;
        margin-top: var(--spacing-xs);
        font-size: var(--font-size-xs);
        color: var(--color-text-tertiary);
      }

      .slider-button {
        width: 20px;
        height: 20px;
        background: var(--color-primary);
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.4);
      }
    }

    .format-field {
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
      }
    }
  }
}
</style>