<template>
  <div class="qr-generator">
    <!-- 预览区域 -->
    <QrPreview
      :qr-url="qrUrl"
      @download="handleDownload"
      @copy-link="handleCopyLink"
      @copy-qr-code="handleCopyQrCode"
    />

    <!-- 输入区域 -->
    <QrInput
      v-model:input-text="inputText"
      :quick-options="quickOptions"
      :generating="generating"
      @generate="handleGenerate"
      @template-click="handleTemplateClick"
    />

    <!-- 设置选项 -->
    <QrSettings
      v-model:show-settings="showSettings"
      v-model:size="size"
      v-model:dark-color="darkColor"
      v-model:light-color="lightColor"
      v-model:error-level="errorLevel"
      :error-level-options="errorLevelOptions"
      @change="handleSettingsChange"
    />

    <!-- 模板弹窗 -->
    <QrTemplateDialog
      v-model:show="templateDialogVisible"
      v-model:wifi-form="wifiForm"
      v-model:phone-form="phoneForm"
      v-model:email-form="emailForm"
      v-model:sms-form="smsForm"
      :template-type="currentTemplateType"
      :current-template="currentTemplate"
      :wifi-type-options="wifiTypeOptions"
      @apply="handleApplyTemplate"
    />
  </div>
</template>

<script setup>
import { useQrGenerator } from '../hooks/useQrGenerator';
import QrPreview from './QrPreview.vue';
import QrInput from './QrInput.vue';
import QrSettings from './QrSettings.vue';
import QrTemplateDialog from './QrTemplateDialog.vue';

const {
  inputText,
  qrUrl,
  generating,
  showSettings,
  size,
  darkColor,
  lightColor,
  errorLevel,
  templateDialogVisible,
  currentTemplateType,
  wifiForm,
  phoneForm,
  emailForm,
  smsForm,
  wifiTypeOptions,
  errorLevelOptions,
  quickOptions,
  currentTemplate,
  debouncedGenerate,
  generateQrCode,
  openTemplateDialog,
  applyTemplate,
  downloadQrCode,
  copyLink,
  copyQrCode,
} = useQrGenerator();

const handleGenerate = () => {
  generateQrCode();
};

const handleSettingsChange = () => {
  debouncedGenerate();
};

const handleTemplateClick = (type) => {
  openTemplateDialog(type);
};

const handleApplyTemplate = () => {
  applyTemplate();
};

const handleDownload = () => {
  downloadQrCode();
};

const handleCopyLink = () => {
  copyLink();
};

const handleCopyQrCode = () => {
  copyQrCode();
};
</script>

<style lang="less" scoped>
.qr-generator {
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
}
</style>
