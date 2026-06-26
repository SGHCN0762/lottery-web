<template>
  <div class="settings-section">
    <ToolCard icon="setting-o" :title="t('tools.fileConverter.common.settings')">
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.gifMaker.frameDelay') }}</span>
        <van-slider
          v-model="frameDelayModel"
          :min="100"
          :max="2000"
          :step="100"
          active-color="#1989fa"
        />
        <span class="slider-value">{{ frameDelayModel }}ms</span>
      </div>
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.gifMaker.loop') }}</span>
        <van-switch v-model="loopModel" active-color="#1989fa" />
      </div>
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.gifMaker.width') }}</span>
        <van-field
          v-model="widthInput"
          type="number"
          :placeholder="t('tools.fileConverter.gifMaker.widthPlaceholder')"
          @update:model-value="handleWidthChange"
        />
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Field as VanField, Slider as VanSlider, Switch as VanSwitch } from 'vant';
  import ToolCard from '../../components/ToolCard.vue';

  const props = defineProps({
    frameDelay: {
      type: Number,
      default: 500,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    gifWidth: {
      type: Number,
      default: 0,
    },
  });

  const emit = defineEmits(['update:frameDelay', 'update:loop', 'update:gifWidth']);

  const { t } = useI18n();

  const frameDelayModel = computed({
    get: () => props.frameDelay,
    set: val => emit('update:frameDelay', val),
  });

  const loopModel = computed({
    get: () => props.loop,
    set: val => emit('update:loop', val),
  });

  const widthInput = ref(props.gifWidth || '');

  watch(
    () => props.gifWidth,
    val => {
      widthInput.value = val || '';
    }
  );

  const handleWidthChange = val => {
    const num = parseInt(val) || 0;
    emit('update:gifWidth', num);
  };

  import { computed } from 'vue';
</script>

<style lang="less" scoped>
  .settings-section {
    margin-bottom: var(--spacing-lg);

    .setting-item {
      display: flex;
      align-items: center;
      padding: 8px 0;

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }
    }

    .setting-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      flex-shrink: 0;
      min-width: 80px;
    }

    :deep(.van-slider) {
      flex: 1;
      margin: 0 12px;
    }

    .slider-value {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      min-width: 50px;
      text-align: right;
    }

    :deep(.van-switch) {
      margin-left: auto;
    }

    :deep(.van-field) {
      flex: 1;
      margin-left: 12px;
      background: transparent;
      padding: 0;

      .van-field__control {
        font-size: var(--font-size-sm);
        text-align: right;
      }
    }
  }
</style>
