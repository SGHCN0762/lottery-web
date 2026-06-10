<template>
  <div class="qr-input-section">
    <div class="section-title">{{ t('tools.qrCode.generate.content') }}</div>

    <van-field
      :model-value="inputText"
      type="textarea"
      rows="3"
      autosize
      :placeholder="t('tools.qrCode.generate.placeholder')"
      show-word-limit
      maxlength="500"
      @update:model-value="handleInput"
    />

    <!-- 快捷模板 -->
    <div class="quick-templates">
      <div class="template-label">{{ t('tools.qrCode.generate.quickTemplate') }}</div>
      <div class="template-grid">
        <div
          v-for="option in quickOptions"
          :key="option.type"
          class="template-item"
          @click="handleTemplateClick(option.type)"
        >
          <div v-if="option?.customIcon" :class="[option.customIcon]"></div>
          <van-icon v-else :name="option.icon" size="24" />
          <span>{{ option.label }}</span>
        </div>
      </div>
    </div>

    <!-- 生成按钮 -->
    <div class="action-section">
      <van-button type="primary" block :loading="generating" @click="handleGenerate">
        {{ t('tools.qrCode.generate.button') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Field as VanField, Button as VanButton, Icon as VanIcon } from 'vant';

const props = defineProps({
  inputText: {
    type: String,
    default: '',
  },
  quickOptions: {
    type: Array,
    default: () => [],
  },
  generating: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:inputText', 'generate', 'templateClick']);

const { t } = useI18n();

const handleInput = (value) => {
  emit('update:inputText', value);
};

const handleGenerate = () => {
  emit('generate');
};

const handleTemplateClick = (type) => {
  emit('templateClick', type);
};
</script>

<style lang="less" scoped>
.qr-input-section {
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

:deep(.van-field) {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);

  &:focus-within {
    border-color: var(--color-primary);
  }
}

.quick-templates {
  margin-top: var(--spacing-md);
}

.template-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.template-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-bg-tertiary);
  }

  span {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-top: var(--spacing-xs);
  }

  .wifi {
    height: 24px;
    width: 24px;
    background-image: url('../assets/wifi.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.action-section {
  margin-top: var(--spacing-md);
}
</style>
