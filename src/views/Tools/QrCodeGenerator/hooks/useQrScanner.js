import { ref, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import jsQR from 'jsqr';
import { showSuccessToast, showFailToast } from 'vant';

export function useQrScanner() {
  const { t } = useI18n();

  // 状态
  const videoRef = ref(null);
  const fileInputRef = ref(null);
  const scanning = ref(false);
  const scannedResult = ref('');
  let mediaStream = null;
  let animationFrameId = null;

  // 是否是URL
  const isUrl = computed(() => {
    if (!scannedResult.value) return false;
    try {
      new URL(scannedResult.value);
      return true;
    } catch {
      return false;
    }
  });

  // 检查是否支持摄像头
  const checkCameraSupport = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  // 检查是否是HTTPS
  const isSecureContext = () => {
    return window.isSecureContext;
  };

  // 触发上传
  const triggerUpload = () => {
    fileInputRef.value?.click();
  };

  // 处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    processImage(file);

    // 重置input
    event.target.value = '';
  };

  // 处理图片识别
  const processImage = (file) => {
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 限制图片大小，避免内存问题
        const maxDimension = 1000;
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          scannedResult.value = code.data;
          showSuccessToast(t('tools.qrCode.scan.success'));
        } else {
          showFailToast(t('tools.qrCode.scan.noQrFound'));
        }
      };

      img.onerror = () => {
        showFailToast(t('tools.qrCode.scan.failed'));
      };

      img.src = URL.createObjectURL(file);
    } catch (error) {
      console.error('Image process error:', error);
      showFailToast(t('tools.qrCode.scan.failed'));
    }
  };

  // 开始扫描
  const startScanning = async () => {
    if (!checkCameraSupport()) {
      showFailToast(t('tools.qrCode.scan.notSupported'));
      return;
    }

    if (!isSecureContext()) {
      showFailToast(t('tools.qrCode.scan.httpsRequired'));
      return;
    }

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } },
        });
      } catch {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        }
      }

      mediaStream = stream;

      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream;

        videoRef.value.play().then(() => {
          scanning.value = true;
          scannedResult.value = '';
          scanLoop();
        }).catch((playError) => {
          console.error('Video play error:', playError);
          videoRef.value.muted = true;
          videoRef.value.play().then(() => {
            scanning.value = true;
            scannedResult.value = '';
            scanLoop();
          }).catch(() => {
            stopScanning();
            showFailToast(t('tools.qrCode.scan.cameraError'));
          });
        });
      }
    } catch (error) {
      console.error('Camera error:', error);

      if (error.name === 'NotAllowedError') {
        showFailToast(t('tools.qrCode.scan.permissionDenied'));
      } else if (error.name === 'NotFoundError') {
        showFailToast(t('tools.qrCode.scan.noCameraFound'));
      } else if (error.name === 'NotSupportedError') {
        showFailToast(t('tools.qrCode.scan.notSupported'));
      } else {
        showFailToast(t('tools.qrCode.scan.cameraError'));
      }
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

  // 扫描时触发上传
  const triggerUploadWhileScanning = () => {
    stopScanning();
    setTimeout(() => {
      fileInputRef.value?.click();
    }, 300);
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
  };

  // 清理
  onUnmounted(() => {
    stopScanning();
  });

  return {
    // Ref
    videoRef,
    fileInputRef,

    // 状态
    scanning,
    scannedResult,
    isUrl,

    // 方法
    checkCameraSupport,
    triggerUpload,
    handleFileSelect,
    startScanning,
    stopScanning,
    triggerUploadWhileScanning,
    copyResult,
    openUrl,
    scanAgain,
  };
}
