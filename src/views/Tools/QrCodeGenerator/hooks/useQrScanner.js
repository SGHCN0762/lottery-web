import { ref, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import jsQR from 'jsqr';
import { showSuccessToast, showFailToast } from 'vant';

export function useQrScanner() {
  const { t } = useI18n();

  // 状态
  let videoElement = null;
  const fileInputRef = ref(null);
  const scanning = ref(false);
  const scannedResult = ref('');
  let mediaStream = null;
  let animationFrameId = null;
  let timeoutTimer = null;
  
  // 扫描超时时间（秒）
  const SCAN_TIMEOUT = 60;

  // 设置视频元素
  const setVideoElement = (element) => {
    videoElement = element;
  };

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

  // 开始扫描（显示视频组件）
  const startScanning = () => {
    if (!checkCameraSupport()) {
      showFailToast(t('tools.qrCode.scan.notSupported'));
      return;
    }
    
    // 停止之前的扫描循环
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    
    // 停止之前的媒体流
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    
    // 清除之前的超时计时器
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
      timeoutTimer = null;
    }
    
    scannedResult.value = '';
    scanning.value = true;
  };

  // 初始化摄像头（在视频组件挂载后调用）
  const initCamera = async () => {
    if (!videoElement) {
      console.error('Video element not found');
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
      videoElement.srcObject = mediaStream;
      
      videoElement.play().then(() => {
        // 启动超时计时器
        timeoutTimer = setTimeout(() => {
          stopScanning();
          showFailToast(t('tools.qrCode.scan.timeout'));
        }, SCAN_TIMEOUT * 1000);
        
        scanLoop();
      }).catch((playError) => {
        console.error('Video play error:', playError);
        stopScanning();
        showFailToast(t('tools.qrCode.scan.cameraError'));
      });
    } catch (error) {
      console.error('Camera error:', error);
      scanning.value = false;

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
    if (!scanning.value || !videoElement) return;

    const video = videoElement;
    
    // 确保视频已准备好
    if (!video.videoWidth || !video.videoHeight) {
      animationFrameId = requestAnimationFrame(scanLoop);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code && code.data) {
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
    
    // 清除超时计时器
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
      timeoutTimer = null;
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
  };

  // 清理
  onUnmounted(() => {
    stopScanning();
  });

  return {
    // Ref
    fileInputRef,

    // 状态
    scanning,
    scannedResult,
    isUrl,

    // 方法
    checkCameraSupport,
    setVideoElement,
    triggerUpload,
    handleFileSelect,
    startScanning,
    initCamera,
    stopScanning,
    copyResult,
    openUrl,
    scanAgain,
  };
}
