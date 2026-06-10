<template>
  <div class="qr-scanner">
    <!-- 扫描区域 -->
    <div class="scanner-area">
      <div v-if="!scanning && !scannedResult" class="scanner-placeholder">
        <van-icon name="scan" size="64" />
        <p>{{ t('tools.qrCode.scan.placeholder') }}</p>
        <van-button type="primary" @click="startScanning">
          {{ t('tools.qrCode.scan.start') }}
        </van-button>
      </div>

      <div v-if="scanning" class="scanner-active">
        <video ref="videoRef" class="scanner-video"></video>
        <div class="scanner-overlay">
          <div class="scanner-frame"></div>
        </div>
        <div class="scanner-actions">
          <van-button type="danger" @click="stopScanning">
            {{ t('tools.qrCode.scan.stop') }}
          </van-button>
        </div>
      </div>

      <div v-if="scannedResult && !scanning" class="scanner-result">
        <van-icon name="checked" size="48" color="var(--color-success)" />
        <p class="result-label">{{ t('tools.qrCode.scan.result') }}</p>
        <div class="result-content">
          {{ scannedResult }}
        </div>
        <div class="result-actions">
          <van-button type="primary" @click="copyResult">
            {{ t('tools.qrCode.scan.copy') }}
          </van-button>
          <van-button v-if="isUrl" type="success" @click="openUrl">
            {{ t('tools.qrCode.scan.open') }}
          </van-button>
          <van-button plain @click="scanAgain">
            {{ t('tools.qrCode.scan.again') }}
          </van-button>
        </div>
      </div>
    </div>

    <!-- 上传识别 -->
    <div class="upload-section">
      <van-uploader
        v-model="fileList"
        accept="image/*"
        :max-count="1"
        :after-read="handleUpload"
      >
        <template #default>
          <div class="upload-area">
            <van-icon name="photo-o" size="32" />
            <p>{{ t('tools.qrCode.scan.uploadTip') }}</p>
          </div>
        </template>
      </van-uploader>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import jsQR from 'jsqr';
import {
  Button as VanButton,
  Icon as VanIcon,
  Uploader as VanUploader,
  showSuccessToast,
  showFailToast,
} from 'vant';

const { t } = useI18n();

// 状态
const videoRef = ref(null);
const scanning = ref(false);
const scannedResult = ref('');
const fileList = ref([]);
let mediaStream = null;
let animationFrameId = null;

// 是否是URL
const isUrl = computed(() => {
  try {
    new URL(scannedResult.value);
    return true;
  } catch {
    return false;
  }
});

// 开始扫描
const startScanning = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream;
      videoRef.value.play();
      scanning.value = true;
      scannedResult.value = '';

      // 开始扫描循环
      scanLoop();
    }
  } catch (error) {
    console.error('Camera error:', error);
    showFailToast(t('tools.qrCode.scan.cameraError'));
  }
};

// 扫描循环
const scanLoop = () => {
  if (!scanning.value || !videoRef.value) return;

  const video = videoRef.value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  if (code) {
    scannedResult.value = code.data;
    stopScanning();
    showSuccessToast(t('tools.qrCode.scan.success'));
  } else {
    animationFrameId = requestAnimationFrame(scanLoop);
  }
};

// 停止扫描
const stopScanning = () => {
  scanning.value = false;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
};

// 上传识别
const handleUpload = async (file) => {
  if (!file.file) return;

  try {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        scannedResult.value = code.data;
        showSuccessToast(t('tools.qrCode.scan.success'));
      } else {
        showFailToast(t('tools.qrCode.scan.noQrFound'));
      }
    };

    img.src = URL.createObjectURL(file.file);
  } catch (error) {
    console.error('Upload scan error:', error);
    showFailToast(t('tools.qrCode.scan.failed'));
  }
};

// 复制结果
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(scannedResult.value);
    showSuccessToast(t('tools.qrCode.scan.copied'));
  } catch (error) {
    showFailToast(t('tools.qrCode.scan.copyFailed'));
  }
};

// 打开URL
const openUrl = () => {
  if (isUrl.value) {
    window.open(scannedResult.value, '_blank');
  }
};

// 重新扫描
const scanAgain = () => {
  scannedResult.value = '';
  startScanning();
};

// 清理
onUnmounted(() => {
  stopScanning();
});
</script>

<style lang="less" scoped>
.qr-scanner {
  padding: var(--spacing-md);
}

.scanner-area {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
}

.scanner-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);

  p {
    margin: var(--spacing-md) 0;
    font-size: var(--font-size-sm);
  }
}

.scanner-active {
  position: relative;

  .scanner-video {
    width: 100%;
    display: block;
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
    background: rgba(0, 0, 0, 0.3);

    .scanner-frame {
      width: 200px;
      height: 200px;
      border: 2px solid var(--color-primary);
      border-radius: var(--radius-md);
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    }
  }

  .scanner-actions {
    position: absolute;
    bottom: var(--spacing-md);
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
}

.scanner-result {
  padding: var(--spacing-lg);
  text-align: center;

  .result-label {
    margin: var(--spacing-sm) 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .result-content {
    background: var(--color-bg-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    word-break: break-all;
    margin-bottom: var(--spacing-md);
    max-height: 150px;
    overflow-y: auto;
  }

  .result-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }
}

.upload-section {
  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 2px dashed var(--color-border);
    color: var(--color-text-secondary);

    p {
      margin-top: var(--spacing-sm);
      font-size: var(--font-size-sm);
    }
  }
}
</style>
