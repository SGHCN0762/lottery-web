<template>
  <div class="scanner-video-wrapper">
    <video ref="videoRef" class="scanner-video"></video>

    <div class="scanner-overlay">
      <div class="scanner-frame">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        <div class="scan-line"></div>
      </div>
    </div>

    <div class="scanning-actions">
      <van-button
        type="danger"
        size="small"
        @click="handleStop"
      >
        {{ t('tools.qrCode.scan.stop') }}
      </van-button>
      <van-button
        size="small"
        icon="photo-o"
        @click="handleUpload"
      >
        {{ t('tools.qrCode.scan.uploadTip') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';

const props = defineProps({
  videoRef: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['stop', 'upload']);

const { t } = useI18n();

const handleStop = () => {
  emit('stop');
};

const handleUpload = () => {
  emit('upload');
};
</script>

<style lang="less" scoped>
.scanner-video-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  min-height: 300px;

  .scanner-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);

    .scanner-frame {
      position: relative;
      width: 200px;
      height: 200px;

      .corner {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 3px solid var(--color-primary);

        &.top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        &.top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }

        &.bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }

        &.bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }
      }

      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
        box-shadow: 0 0 10px var(--color-primary);
        animation: scanMove 2s linear infinite;
      }
    }
  }

  .scanning-actions {
    position: absolute;
    bottom: var(--spacing-md);
    left: var(--spacing-md);
    right: var(--spacing-md);
    display: flex;
    gap: var(--spacing-sm);

    :deep(.van-button) {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
    }
  }
}

@keyframes scanMove {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
