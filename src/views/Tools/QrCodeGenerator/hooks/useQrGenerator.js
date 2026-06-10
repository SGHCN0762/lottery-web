import { ref, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import QRCode from 'qrcode';
import { showSuccessToast, showFailToast } from 'vant';

export function useQrGenerator() {
  const { t } = useI18n();

  // 状态
  const inputText = ref('');
  const qrUrl = ref('');
  const generating = ref(false);
  const showSettings = ref(false);
  const size = ref(200);
  const darkColor = ref('#000000');
  const lightColor = ref('#ffffff');
  const errorLevel = ref('M');

  // 模板弹窗
  const templateDialogVisible = ref(false);
  const currentTemplateType = ref('');

  // WiFi表单
  const wifiForm = ref({
    ssid: '',
    password: '',
    type: 'WPA',
  });

  // 电话表单
  const phoneForm = ref({
    number: '',
  });

  // 邮箱表单
  const emailForm = ref({
    address: '',
    subject: '',
    body: '',
  });

  // 短信表单
  const smsForm = ref({
    number: '',
    message: '',
  });

  // WiFi类型选项
  const wifiTypeOptions = computed(() => [
    { name: 'WPA/WPA2', value: 'WPA' },
    { name: 'WEP', value: 'WEP' },
    { name: t('tools.qrCode.generate.wifiNoPassword'), value: 'nopass' },
  ]);

  // 错误级别选项
  const errorLevelOptions = computed(() => [
    { text: 'L', value: 'L' },
    { text: 'M', value: 'M' },
    { text: 'Q', value: 'Q' },
    { text: 'H', value: 'H' },
  ]);

  // 快捷选项
  const quickOptions = computed(() => [
    { type: 'wifi', label: t('tools.qrCode.generate.wifi'), customIcon: 'wifi' },
    { type: 'phone', label: t('tools.qrCode.generate.phone'), icon: 'phone-o' },
    { type: 'email', label: t('tools.qrCode.generate.email'), icon: 'envelop-o' },
    { type: 'sms', label: t('tools.qrCode.generate.sms'), icon: 'comment-o' },
  ]);

  // 当前模板
  const currentTemplate = computed(() => {
    return quickOptions.value.find(o => o.type === currentTemplateType.value);
  });

  // 防抖生成
  let debounceTimer = null;
  const debouncedGenerate = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      generateQrCode();
    }, 300);
  };

  // 生成二维码
  const generateQrCode = async () => {
    if (!inputText.value.trim()) {
      qrUrl.value = '';
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
    } catch (error) {
      console.error('Generate QR code error:', error);
      showFailToast(t('tools.qrCode.generate.failed'));
    } finally {
      generating.value = false;
    }
  };

  // 打开模板弹窗
  const openTemplateDialog = type => {
    currentTemplateType.value = type;
    templateDialogVisible.value = true;
  };

  // 应用模板
  const applyTemplate = () => {
    let content = '';

    switch (currentTemplateType.value) {
      case 'wifi':
        if (wifiForm.value.type === 'nopass') {
          content = `WIFI:T:nopass;S:${wifiForm.value.ssid};;`;
        } else {
          content = `WIFI:T:${wifiForm.value.type};S:${wifiForm.value.ssid};P:${wifiForm.value.password};;`;
        }
        break;
      case 'phone':
        content = `tel:${phoneForm.value.number}`;
        break;
      case 'email':
        let emailContent = `mailto:${emailForm.value.address}`;
        const params = [];
        if (emailForm.value.subject)
          params.push(`subject=${encodeURIComponent(emailForm.value.subject)}`);
        if (emailForm.value.body) params.push(`body=${encodeURIComponent(emailForm.value.body)}`);
        if (params.length) emailContent += '?' + params.join('&');
        content = emailContent;
        break;
      case 'sms':
        content = `smsto:${smsForm.value.number}:${smsForm.value.message}`;
        break;
    }

    inputText.value = content;
    templateDialogVisible.value = false;
    generateQrCode();
  };

  // 下载二维码
  const downloadQrCode = () => {
    if (!qrUrl.value) return;

    fetch(qrUrl.value)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qrcode_${Date.now()}.png`;
        link.style.display = 'none';
        document.body.appendChild(link);

        try {
          link.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
        } catch (e) {
          link.click();
        }

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      })
      .catch(error => {
        console.error('Download error:', error);
        showFailToast(t('tools.qrCode.generate.downloadFailed'));
      });
  };

  // 复制链接
  const copyLink = async () => {
    if (!inputText.value) return;

    try {
      await navigator.clipboard.writeText(inputText.value);
      showSuccessToast(t('tools.qrCode.generate.linkCopied'));
    } catch (error) {
      showFailToast(t('tools.qrCode.generate.copyFailed'));
    }
  };

  // 复制二维码图片
  const copyQrCode = async () => {
    if (!qrUrl.value) return;

    try {
      const response = await fetch(qrUrl.value);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      showSuccessToast(t('tools.qrCode.generate.copied'));
    } catch (error) {
      console.error('Copy error:', error);
      showFailToast(t('tools.qrCode.generate.copyFailed'));
    }
  };

  // 清理
  onUnmounted(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
  });

  return {
    // 状态
    inputText,
    qrUrl,
    generating,
    showSettings,
    size,
    darkColor,
    lightColor,
    errorLevel,

    // 模板弹窗
    templateDialogVisible,
    currentTemplateType,

    // 表单
    wifiForm,
    phoneForm,
    emailForm,
    smsForm,

    // 选项
    wifiTypeOptions,
    errorLevelOptions,
    quickOptions,
    currentTemplate,

    // 方法
    debouncedGenerate,
    generateQrCode,
    openTemplateDialog,
    applyTemplate,
    downloadQrCode,
    copyLink,
    copyQrCode,
  };
}
