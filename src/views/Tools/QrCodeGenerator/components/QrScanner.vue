<template>
  <div class="qr-scanner">
    <!-- 主操作区域 -->
    <div class="scanner-container">
      <!-- 初始状态：选择方式 -->
      <ScannerInitial
        v-if="!scanning && !scannedResult"
        :camera-supported="checkCameraSupport()"
        @start-scan="handleStartScan"
        @upload="handleTriggerUpload"
      />

      <!-- 扫描中状态 -->
      <ScannerVideo
        v-if="scanning"
        :video-ref="videoRef"
        @stop="handleStopScan"
        @upload="handleTriggerUploadWhileScanning"
      />

      <!-- 识别结果状态 -->
      <ScannerResult
        v-if="scannedResult && !scanning"
        :result="scannedResult"
        :is-url="isUrl"
        @copy="handleCopyResult"
        @open-url="handleOpenUrl"
        @scan-again="handleScanAgain"
      />
    </div>

    <!-- 隐藏的上传控件 -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      capture="environment"
      style="display: none"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup>
import { useQrScanner } from '../hooks/useQrScanner';
import ScannerInitial from './ScannerInitial.vue';
import ScannerVideo from './ScannerVideo.vue';
import ScannerResult from './ScannerResult.vue';

const {
  videoRef,
  fileInputRef,
  scanning,
  scannedResult,
  isUrl,
  checkCameraSupport,
  handleFileSelect,
  startScanning,
  stopScanning,
  triggerUploadWhileScanning,
  copyResult,
  openUrl,
  scanAgain,
} = useQrScanner();

const handleStartScan = () => {
  startScanning();
};

const handleStopScan = () => {
  stopScanning();
};

const handleTriggerUpload = () => {
  fileInputRef.value?.click();
};

const handleTriggerUploadWhileScanning = () => {
  triggerUploadWhileScanning();
};

const handleCopyResult = () => {
  copyResult();
};

const handleOpenUrl = () => {
  openUrl();
};

const handleScanAgain = () => {
  scanAgain();
};
</script>

<style lang="less" scoped>
.qr-scanner {
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
}

.scanner-container {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
</style>
