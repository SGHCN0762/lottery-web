<template>
  <van-popup
    :show="visible"
    position="bottom"
    :style="{ height: '80%' }"
    round
    closeable
    @close="handleClose"
    @open="resetCrop"
  >
    <div class="cropper-popup">
      <div class="popup-header">
        <h3>{{ t('settings.adjustAvatar') }}</h3>
      </div>

      <div class="cropper-container">
        <div class="preview-area">
          <div class="preview-circle">
            <img v-if="image" :src="image" alt="预览" :style="imageStyle" />
          </div>
        </div>

        <div class="adjust-controls">
          <div class="control-item">
            <span>{{ t('settings.scale') }}</span>
            <van-slider v-model="scale" :min="0.5" :max="2" :step="0.1" />
          </div>

          <div class="control-item">
            <span>{{ t('settings.rotate') }}</span>
            <van-slider v-model="rotate" :min="0" :max="360" :step="1" />
          </div>
        </div>
      </div>

      <div class="popup-footer">
        <van-button plain round @click="handleClose">
          {{ t('common.cancel') }}
        </van-button>
        <van-button type="primary" round @click="handleConfirm">
          {{ t('common.confirm') }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import { Popup as VanPopup, Button as VanButton, Slider as VanSlider } from 'vant';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:visible', 'confirm']);

  const { t } = useI18n();

  const scale = ref(1);
  const rotate = ref(0);

  const resetCrop = () => {
    scale.value = 1;
    rotate.value = 0;
  };

  const imageStyle = computed(() => ({
    transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
    transition: 'transform 0.3s ease',
  }));

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleConfirm = () => {
    if (!props.image) {
      showToast(t('settings.selectImageFirst'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const size = 200;
      canvas.width = size;
      canvas.height = size;

      const minDim = Math.min(img.width, img.height);
      const scaleRatio = (size / minDim) * scale.value;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((rotate.value * Math.PI) / 180);

      const drawWidth = img.width * scaleRatio;
      const drawHeight = img.height * scaleRatio;
      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

      ctx.restore();
      const base64 = canvas.toDataURL('image/jpeg', 0.8);

      emit('confirm', base64);
      emit('update:visible', false);
    };

    img.src = props.image;
  };
</script>

<style lang="less" scoped>
  .cropper-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .popup-header {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      h3 {
        margin: 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        text-align: center;
      }
    }

    .cropper-container {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);

      .preview-area {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: var(--spacing-lg);

        .preview-circle {
          width: 150px;
          height: 150px;
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 2px solid var(--color-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background: var(--color-bg-tertiary);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }
      }

      .adjust-controls {
        .control-item {
          margin-bottom: var(--spacing-md);

          span {
            display: block;
            font-size: 13px;
            color: var(--color-text-secondary);
            margin-bottom: var(--spacing-xs);
          }

          :deep(.van-slider) {
            margin: 0 var(--spacing-sm);
          }
        }
      }
    }

    .popup-footer {
      padding: var(--spacing-md);
      border-top: 1px solid var(--color-border);
      display: flex;
      gap: var(--spacing-sm);

      .van-button {
        flex: 1;
      }
    }
  }
</style>
