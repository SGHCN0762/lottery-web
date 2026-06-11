<template>
  <div class="scanner-video-wrapper">
    <video ref="localVideoRef" class="scanner-video" autoplay playsinline muted></video>

    <div class="scanner-overlay">
      <div class="scanner-frame">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        <div class="scan-line"></div>
      </div>
    </div>

    <van-icon class="stop-btn" name="clear" size="24" color="white" @click="handleStop" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  setVideoElement: {
    type: Function,
    default: null,
  },
  initCamera: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(['stop', 'upload']);

const localVideoRef = ref(null);

onMounted(() => {
  if (props.setVideoElement && localVideoRef.value) {
    props.setVideoElement(localVideoRef.value);
  }
  
  if (props.initCamera) {
    props.initCamera();
  }
});

const handleStop = () => {
  emit('stop');
};
</script>

<style lang="less" scoped>
.scanner-video-wrapper {
  position: relative;
  width: calc(100vw - 2 * var(--spacing-md));
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
        animation: scanMove 1.5s ease-in-out infinite;
      }
    }
  }

  .stop-btn {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    z-index: 1;
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
