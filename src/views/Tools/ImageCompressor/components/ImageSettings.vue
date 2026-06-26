<template>
  <div class="settings-section">
    <ToolCard icon="setting-o" :title="t('tools.imageCompressor.settings')">
      <div class="settings-content">
        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.imageCompressor.quality') }}</span>
            <span class="quality-value">{{ quality }}%</span>
          </div>
          <van-slider
            :model-value="quality"
            :min="10"
            :max="100"
            :step="5"
            active-color="var(--color-primary)"
            inactive-color="var(--color-border)"
            bar-height="6px"
            @update:model-value="updateQuality"
          >
            <template #button>
              <div class="slider-button" />
            </template>
          </van-slider>
          <div class="quality-hints">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.imageCompressor.maxWidth') }}</span>
            <span class="width-value">{{ maxWidth }}px</span>
          </div>
          <van-slider
            :model-value="maxWidth"
            :min="100"
            :max="4000"
            :step="100"
            active-color="var(--color-primary)"
            inactive-color="var(--color-border)"
            bar-height="6px"
            @update:model-value="updateMaxWidth"
          >
            <template #button>
              <div class="slider-button" />
            </template>
          </van-slider>
          <div class="quality-hints">
            <span>100px</span>
            <span>4000px</span>
          </div>
        </div>

        <div class="format-field">
          <van-field
            :model-value="currentFormatLabel"
            readonly
            :label="t('tools.imageCompressor.format')"
            right-icon="arrow"
            @click="showFormatSheet = true"
          />
        </div>
        <div class="format-field">
          <van-field :label="t('tools.imageCompressor.keepExif')">
            <template #input>
              <van-switch
                :model-value="keepExif"
                size="20px"
                active-color="var(--color-primary)"
                inactive-color="var(--color-border)"
                @update:model-value="updateKeepExif"
              />
            </template>
          </van-field>
        </div>
      </div>
    </ToolCard>

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
    Slider as VanSlider,
    Switch as VanSwitch,
    ActionSheet as VanActionSheet,
    Field as VanField,
  } from 'vant';
  import ToolCard from '../../components/ToolCard.vue';

  const { t } = useI18n();

  const props = defineProps({
    quality: {
      type: Number,
      default: 80,
    },
    maxWidth: {
      type: Number,
      default: 1920,
    },
    format: {
      type: String,
      default: 'original',
    },
    keepExif: {
      type: Boolean,
      default: false,
    },
    formatOptions: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits([
    'update:quality',
    'update:maxWidth',
    'update:format',
    'update:keepExif',
  ]);

  const showFormatSheet = ref(false);

  const currentFormatLabel = computed(() => {
    const option = props.formatOptions.find(opt => opt.value === props.format);
    return option ? option.name : props.format;
  });

  const updateQuality = val => emit('update:quality', val);
  const updateMaxWidth = val => emit('update:maxWidth', val);
  const updateFormat = val => emit('update:format', val);
  const updateKeepExif = val => emit('update:keepExif', val);

  const handleFormatSelect = option => {
    updateFormat(option.value);
  };
</script>

<style lang="less" scoped>
  .settings-section {
    margin-bottom: var(--spacing-lg);
    .settings-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

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

          .quality-value,
          .width-value {
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
        }
      }
    }
  }
</style>
