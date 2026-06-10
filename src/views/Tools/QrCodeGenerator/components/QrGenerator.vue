<template>
  <div class="qr-generator">
    <!-- 输入区域 -->
    <div class="input-section">
      <van-field
        v-model="inputText"
        type="textarea"
        rows="3"
        autosize
        :placeholder="t('tools.qrCode.generate.placeholder')"
        show-word-limit
        maxlength="500"
      />

      <!-- 快捷选项 -->
      <div class="quick-options">
        <van-button
          v-for="option in quickOptions"
          :key="option.type"
          size="small"
          plain
          @click="handleQuickOption(option.type)"
        >
          {{ option.label }}
        </van-button>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="settings-section">
      <van-cell-group inset>
        <van-cell :title="t('tools.qrCode.generate.size')">
          <van-stepper v-model="size" min="100" max="400" step="50" />
        </van-cell>
        <van-cell :title="t('tools.qrCode.generate.color')">
          <div class="color-picker">
            <input type="color" v-model="darkColor" />
            <span>{{ darkColor }}</span>
          </div>
        </van-cell>
        <van-cell :title="t('tools.qrCode.generate.bgColor')">
          <div class="color-picker">
            <input type="color" v-model="lightColor" />
            <span>{{ lightColor }}</span>
          </div>
        </van-cell>
        <van-cell :title="t('tools.qrCode.generate.errorLevel')">
          <template #right-icon>
            <van-dropdown-menu>
              <van-dropdown-item v-model="errorLevel" :options="errorLevelOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 生成按钮 -->
    <div class="action-section">
      <van-button type="primary" block :loading="generating" @click="generateQrCode">
        {{ t('tools.qrCode.generate.button') }}
      </van-button>
    </div>

    <!-- 预览区域 -->
    <div v-if="qrUrl" class="preview-section">
      <div class="qr-preview">
        <img :src="qrUrl" :style="{ width: size + 'px', height: size + 'px' }" />
      </div>
      <div class="preview-actions">
        <van-button type="primary" @click="downloadQrCode">
          {{ t('tools.qrCode.generate.download') }}
        </van-button>
        <van-button plain @click="copyQrCode">
          {{ t('tools.qrCode.generate.copy') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import QRCode from 'qrcode';
import {
  Field as VanField,
  Button as VanButton,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Stepper as VanStepper,
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  showSuccessToast,
  showFailToast,
} from 'vant';

const { t } = useI18n();
const emit = defineEmits(['generated']);

// 状态
const inputText = ref('');
const qrUrl = ref('');
const generating = ref(false);
const size = ref(200);
const darkColor = ref('#000000');
const lightColor = ref('#ffffff');
const errorLevel = ref('M');

// 错误级别选项
const errorLevelOptions = computed(() => [
  { text: 'L (7%)', value: 'L' },
  { text: 'M (15%)', value: 'M' },
  { text: 'Q (25%)', value: 'Q' },
  { text: 'H (30%)', value: 'H' },
]);

// 快捷选项
const quickOptions = computed(() => [
  { type: 'wifi', label: t('tools.qrCode.generate.wifi') },
  { type: 'phone', label: t('tools.qrCode.generate.phone') },
  { type: 'email', label: t('tools.qrCode.generate.email') },
  { type: 'sms', label: t('tools.qrCode.generate.sms') },
]);

// 快捷选项处理
const handleQuickOption = (type) => {
  switch (type) {
    case 'wifi':
      inputText.value = 'WIFI:T:WPA;S:网络名称;P:密码;;';
      break;
    case 'phone':
      inputText.value = 'tel:+8613800138000';
      break;
    case 'email':
      inputText.value = 'mailto:example@email.com?subject=主题&body=内容';
      break;
    case 'sms':
      inputText.value = 'smsto:+8613800138000:短信内容';
      break;
  }
};

// 生成二维码
const generateQrCode = async () => {
  if (!inputText.value.trim()) {
    showFailToast(t('tools.qrCode.generate.emptyInput'));
    return;
  }

  generating.value = true;

  try {
    const url = await QRCode.toDataURL(inputText.value, {
      width: size.value,
      margin: 2,
      color: {
        dark: darkColor.value,
        light: lightColor.value,
      },
      errorCorrectionLevel: errorLevel.value,
    });

    qrUrl.value = url;

    // 触发生成事件
    emit('generated', {
      text: inputText.value,
      url,
    });

    showSuccessToast(t('tools.qrCode.generate.success'));
  } catch (error) {
    console.error('Generate QR code error:', error);
    showFailToast(t('tools.qrCode.generate.failed'));
  } finally {
    generating.value = false;
  }
};

// 下载二维码
const downloadQrCode = () => {
  if (!qrUrl.value) return;

  const link = document.createElement('a');
  link.href = qrUrl.value;
  link.download = `qrcode_${Date.now()}.png`;
  link.click();
};

// 复制二维码
const copyQrCode = async () => {
  if (!qrUrl.value) return;

  try {
    const response = await fetch(qrUrl.value);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ]);
    showSuccessToast(t('tools.qrCode.generate.copied'));
  } catch (error) {
    console.error('Copy error:', error);
    showFailToast(t('tools.qrCode.generate.copyFailed'));
  }
};
</script>

<style lang="less" scoped>
.qr-generator {
  padding: var(--spacing-md);
}

.input-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-field) {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .quick-options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }
}

.settings-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-cell) {
    background: var(--color-bg-secondary);
  }

  .color-picker {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    input[type='color'] {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }

    span {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
}

.action-section {
  margin-bottom: var(--spacing-lg);
}

.preview-section {
  text-align: center;

  .qr-preview {
    background: var(--color-bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    display: inline-block;
    margin-bottom: var(--spacing-md);

    img {
      display: block;
    }
  }

  .preview-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
  }
}
</style>
