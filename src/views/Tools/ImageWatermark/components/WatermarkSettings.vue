<template>
  <div class="settings-section">
    <div class="settings-card">
      <div class="card-header">
        <van-icon name="setting-o" class="header-icon" />
        <span>{{ t('tools.imageWatermark.settings') }}</span>
      </div>

      <div class="settings-content">
        <div class="setting-field">
          <van-field
            :model-value="currentFormatLabel"
            readonly
            :label="t('tools.imageWatermark.format')"
            right-icon="arrow"
            @click="showFormatSheet = true"
          />
        </div>

        <div class="setting-field">
          <van-field
            :model-value="currentTypeLabel"
            readonly
            :label="t('tools.imageWatermark.type')"
            right-icon="arrow"
            @click="showTypeSheet = true"
          />
        </div>

        <template v-if="watermarkType === 'single' || watermarkType === 'logo'">
          <div class="setting-field">
            <van-field
              :model-value="currentPositionLabel"
              readonly
              :label="t('tools.imageWatermark.position')"
              right-icon="arrow"
              @click="showPositionSheet = true"
            />
          </div>
        </template>

        <template v-if="watermarkType === 'tile' || watermarkType === 'single'">
          <div class="setting-field">
            <van-field
              :model-value="watermarkText"
              :label="t('tools.imageWatermark.text')"
              :placeholder="t('tools.imageWatermark.textPlaceholder')"
              @update:model-value="$emit('update:watermark-text', $event)"
            />
          </div>
        </template>

        <template v-if="watermarkType === 'tile' || watermarkType === 'single'">
          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.size') }}</span>
              <span class="value-text">{{ watermarkSize }}%</span>
            </div>
            <van-slider
              :model-value="watermarkSize"
              :min="0"
              :max="10"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:watermark-size', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>10%</span>
            </div>
          </div>
        </template>

        <template v-if="watermarkType === 'tile'">
          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.angle') }}</span>
              <span class="value-text">{{ watermarkAngle }}°</span>
            </div>
            <van-slider
              :model-value="watermarkAngle"
              :min="-180"
              :max="180"
              :step="1"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:watermark-angle', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>-180°</span>
              <span>180°</span>
            </div>
          </div>
        </template>

        <template v-if="watermarkType === 'logo'">
          <div class="setting-item">
            <div class="logo-upload">
              <span class="label-text">{{ t('tools.imageWatermark.logo') }}</span>
              <van-uploader
                :model-value="logoFileList"
                :after-read="handleLogoRead"
                @delete="handleLogoDelete"
                :accept="'image/*'"
                :max-count="1"
                :preview-size="80"
              >
                <template #default>
                  <div class="upload-btn">
                    <van-icon name="plus" />
                  </div>
                </template>
              </van-uploader>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.logoWidth') }}</span>
              <span class="value-text">{{ logoWidth }}%</span>
            </div>
            <van-slider
              :model-value="logoWidth"
              :min="0"
              :max="100"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:logo-width', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.logoHeight') }}</span>
              <span class="value-text">{{ logoHeight }}%</span>
            </div>
            <van-slider
              :model-value="logoHeight"
              :min="0"
              :max="100"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:logo-height', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </template>

        <template v-if="(watermarkType === 'single' || watermarkType === 'logo') && watermarkPosition === 'custom'">
          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.positionX') }}</span>
              <span class="value-text">{{ customPositionX }}%</span>
            </div>
            <van-slider
              :model-value="customPositionX"
              :min="0"
              :max="100"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:custom-position-x', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.positionY') }}</span>
              <span class="value-text">{{ customPositionY }}%</span>
            </div>
            <van-slider
              :model-value="customPositionY"
              :min="0"
              :max="100"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:custom-position-y', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </template>

        <template v-if="watermarkType === 'single' || watermarkType === 'logo'">
          <div class="setting-item">
            <div class="setting-label">
              <span class="label-text">{{ t('tools.imageWatermark.margin') }}</span>
              <span class="value-text">{{ watermarkMargin }}%</span>
            </div>
            <van-slider
              :model-value="watermarkMargin"
              :min="0"
              :max="100"
              :step="0.01"
              active-color="var(--color-primary)"
              inactive-color="var(--color-border)"
              bar-height="6px"
              @update:model-value="$emit('update:watermark-margin', $event)"
            >
              <template #button>
                <div class="slider-button" />
              </template>
            </van-slider>
            <div class="value-hints">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </template>

        <div class="setting-item">
          <div class="setting-label">
            <span class="label-text">{{ t('tools.imageWatermark.opacity') }}</span>
            <span class="value-text">{{ watermarkOpacity }}%</span>
          </div>
          <van-slider
            :model-value="watermarkOpacity"
            :min="0"
            :max="100"
            :step="1"
            active-color="var(--color-primary)"
            inactive-color="var(--color-border)"
            bar-height="6px"
            @update:model-value="$emit('update:watermark-opacity', $event)"
          >
            <template #button>
              <div class="slider-button" />
            </template>
          </van-slider>
          <div class="value-hints">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <template v-if="watermarkType !== 'logo'">
          <div class="setting-field">
            <van-field
              :label="t('tools.imageWatermark.color')"
            >
              <template #input>
                <ColorPicker :model-value="watermarkColor" @update:model-value="$emit('update:watermark-color', $event)" />
              </template>
            </van-field>
          </div>
        </template>
      </div>
    </div>

    <van-action-sheet
      v-model:show="showTypeSheet"
      :actions="typeOptions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="handleTypeSelect"
    />

    <van-action-sheet
      v-model:show="showPositionSheet"
      :actions="positionOptions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="handlePositionSelect"
    />

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
  Uploader as VanUploader,
} from 'vant';
import ColorPicker from '@/views/Tools/LogoDesigner/components/ColorPicker.vue';

const { t } = useI18n();

const props = defineProps({
  watermarkType: String,
  watermarkTypeOptions: Array,
  watermarkText: String,
  watermarkSize: Number,
  watermarkAngle: Number,
  watermarkOpacity: Number,
  watermarkColor: String,
  watermarkPosition: String,
  positionOptions: Array,
  watermarkMargin: Number,
  customPositionX: Number,
  customPositionY: Number,
  logoUrl: String,
  logoWidth: Number,
  logoHeight: Number,
  outputFormat: String,
  formatOptions: Array,
});

const emit = defineEmits([
  'update:watermark-type',
  'update:watermark-text',
  'update:watermark-size',
  'update:watermark-angle',
  'update:watermark-opacity',
  'update:watermark-color',
  'update:watermark-position',
  'update:watermark-margin',
  'update:custom-position-x',
  'update:custom-position-y',
  'update:logo-width',
  'update:logo-height',
  'update:output-format',
  'update:logo',
]);

const showTypeSheet = ref(false);
const showPositionSheet = ref(false);
const showFormatSheet = ref(false);
const logoFileList = ref([]);

const typeOptions = computed(() => [
  { name: t('tools.imageWatermark.typeTile'), value: 'tile' },
  { name: t('tools.imageWatermark.typeSingle'), value: 'single' },
  { name: t('tools.imageWatermark.typeLogo'), value: 'logo' },
]);

const currentTypeLabel = computed(() => {
  const option = typeOptions.value.find(opt => opt.value === props.watermarkType);
  return option ? option.name : props.watermarkType;
});

const currentPositionLabel = computed(() => {
  const option = props.positionOptions.find(opt => opt.value === props.watermarkPosition);
  return option ? option.name : props.watermarkPosition;
});

const currentFormatLabel = computed(() => {
  const option = props.formatOptions.find(opt => opt.value === props.outputFormat);
  return option ? option.name : props.outputFormat;
});

const handleTypeSelect = (option) => {
  emit('update:watermark-type', option.value);
};

const handlePositionSelect = (option) => {
  emit('update:watermark-position', option.value);
};

const handleFormatSelect = (option) => {
  emit('update:output-format', option.value);
};

const handleLogoRead = (file) => {
  logoFileList.value = [file];
  emit('update:logo', file);
};

const handleLogoDelete = () => {
  logoFileList.value = [];
  emit('update:logo', null);
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

        .value-text {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
        }
      }

      .value-hints {
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

    .auto-switch {
      .setting-label {
        margin-bottom: var(--spacing-xs);
      }

      .auto-tip {
        font-size: var(--font-size-xs);
        color: var(--color-text-tertiary);
        line-height: 1.4;
      }
    }

    .logo-upload {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }

      :deep(.van-uploader) {
        display: flex;
        gap: var(--spacing-sm);
      }

      :deep(.van-uploader__upload) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-tertiary);
      }

      .upload-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-tertiary);
        color: var(--color-text-tertiary);
      }

      :deep(.van-uploader__preview) {
        margin: 0;
      }

      :deep(.van-uploader__preview-image) {
        width: 80px;
        height: 80px;
        padding: 0;
        margin: 0;
      }
    }

    .color-picker {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);

      input[type="color"] {
        width: 32px;
        height: 32px;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        padding: 0;
        cursor: pointer;
      }

      span {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }
  }
}
</style>