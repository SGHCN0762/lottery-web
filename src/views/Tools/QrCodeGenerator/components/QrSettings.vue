<template>
  <div class="qr-settings">
    <div class="settings-header" @click="toggleSettings">
      <span>{{ t('tools.qrCode.generate.advancedSettings') }}</span>
      <van-icon :name="showSettings ? 'arrow-up' : 'arrow-down'" />
    </div>

    <div v-show="showSettings" class="settings-content">
      <!-- 尺寸 -->
      <div class="setting-item">
        <label>{{ t('tools.qrCode.generate.size') }}</label>
        <van-slider
          :model-value="size"
          :min="0"
          :max="500"
          :step="1"
          @update:model-value="handleSizeChange"
        >
          <template #button>
            <div class="size-badge">{{ size }}px</div>
          </template>
        </van-slider>
      </div>

      <!-- 颜色 -->
      <div class="setting-item">
        <label>{{ t('tools.qrCode.generate.color') }}</label>
        <div class="color-row">
          <div class="color-option">
            <ColorPicker :model-value="darkColor" @update:model-value="handleDarkColorChange" />
            <span>{{ t('tools.qrCode.generate.fgColor') }}</span>
          </div>
          <div class="color-option">
            <ColorPicker :model-value="lightColor" @update:model-value="handleLightColorChange" />
            <span>{{ t('tools.qrCode.generate.bgColor') }}</span>
          </div>
        </div>
      </div>

      <!-- 容错级别 -->
      <div class="setting-item">
        <label>{{ t('tools.qrCode.generate.errorLevel') }}</label>
        <div class="error-level-options">
          <div
            v-for="option in errorLevelOptions"
            :key="option.value"
            class="level-option"
            :class="{ active: errorLevel === option.value }"
            @click="handleErrorLevelChange(option.value)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Slider as VanSlider, Icon as VanIcon } from 'vant';
import ColorPicker from '@/views/Tools/LogoDesigner/components/ColorPicker.vue';

const props = defineProps({
  showSettings: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 200,
  },
  darkColor: {
    type: String,
    default: '#000000',
  },
  lightColor: {
    type: String,
    default: '#ffffff',
  },
  errorLevel: {
    type: String,
    default: 'M',
  },
  errorLevelOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:showSettings',
  'update:size',
  'update:darkColor',
  'update:lightColor',
  'update:errorLevel',
  'change',
]);

const { t } = useI18n();

const toggleSettings = () => {
  emit('update:showSettings', !props.showSettings);
};

const handleSizeChange = (value) => {
  if(value < 100) {
    value = 100;
  }
  if(value > 400) {
    value = 400;
  }
  emit('update:size', value);
  emit('change');
};

const handleDarkColorChange = (value) => {
  emit('update:darkColor', value);
  emit('change');
};

const handleLightColorChange = (value) => {
  emit('update:lightColor', value);
  emit('change');
};

const handleErrorLevelChange = (value) => {
  emit('update:errorLevel', value);
  emit('change');
};
</script>

<style lang="less" scoped>
.qr-settings {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.settings-content {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.setting-item {
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
  }
}

.size-badge {
  background: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.color-row {
  display: flex;
  gap: var(--spacing-lg);
}

.color-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  input[type='color'] {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    border: 1px solid var(--color-border);
  }

  span {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}

.error-level-options {
  display: flex;
  gap: var(--spacing-sm);
}

.level-option {
  flex: 1;
  text-align: center;
  padding: var(--spacing-sm);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
  }

  &.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
}
</style>
