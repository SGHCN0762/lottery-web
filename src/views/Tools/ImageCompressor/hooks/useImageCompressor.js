import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { showImagePreview, showSuccessToast, showFailToast, showLoadingToast } from 'vant';

export function useImageCompressor() {
  const { t } = useI18n();

  const fileList = ref([]);
  const images = ref([]);
  const quality = ref(80);
  const maxWidth = ref(1920);
  const format = ref('original');
  const keepExif = ref(false);

  const formatOptions = computed(() => [
    { name: t('tools.imageCompressor.originalFormat'), value: 'original' },
    { name: 'JPEG', value: 'jpeg' },
    { name: 'PNG', value: 'png' },
    { name: 'WebP', value: 'webp' },
  ]);

  const hasCompressedImages = computed(() => {
    return images.value.some(img => img.compressedUrl);
  });

  const handleAfterRead = async (file) => {
    const files = Array.isArray(file) ? file : [file];

    for (const f of files) {
      if (f.file && f.file.type.startsWith('image/')) {
        const url = URL.createObjectURL(f.file);
        images.value.push({
          id: Date.now() + Math.random(),
          name: f.file.name,
          url,
          originalUrl: url,
          file: f.file,
          originalSize: f.file.size,
          compressedUrl: null,
          compressedSize: null,
          ratio: null,
          compressing: false,
        });
      }
    }
  };

  const handleDelete = (file, detail) => {
    const index = detail.index;
    if (fileList.value[index]) {
      const fileName = fileList.value[index].name;
      const imgIndex = images.value.findIndex(img => img.name === fileName);
      if (imgIndex !== -1) {
        URL.revokeObjectURL(images.value[imgIndex].url);
        if (images.value[imgIndex].compressedUrl) {
          URL.revokeObjectURL(images.value[imgIndex].compressedUrl);
        }
        images.value.splice(imgIndex, 1);
      }
      fileList.value.splice(index, 1);
    }
  };

  const removeImage = (index) => {
    const img = images.value[index];
    URL.revokeObjectURL(img.url);
    if (img.compressedUrl) {
      URL.revokeObjectURL(img.compressedUrl);
    }
    images.value.splice(index, 1);
    
    const fileIndex = fileList.value.findIndex(f => f.name === img.name);
    if (fileIndex !== -1) {
      fileList.value.splice(fileIndex, 1);
    }
  };

  const clearAll = () => {
    images.value.forEach(img => {
      URL.revokeObjectURL(img.url);
      if (img.compressedUrl) {
        URL.revokeObjectURL(img.compressedUrl);
      }
    });
    images.value = [];
    fileList.value = [];
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxWidth.value) {
          height = (height * maxWidth.value) / width;
          width = maxWidth.value;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let mimeType;
        let outputFormat = format.value;

        if (outputFormat === 'original') {
          mimeType = file.type || 'image/jpeg';
          outputFormat = mimeType.split('/')[1];
        } else {
          mimeType = `image/${outputFormat}`;
        }

        const outputQuality = outputFormat === 'webp' ? quality.value / 100 : quality.value / 100;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({
                url,
                size: blob.size,
                blob,
              });
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          mimeType,
          outputQuality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressOne = async (index) => {
    const img = images.value[index];
    if (!img || img.compressing) return;

    img.compressing = true;

    try {
      const compressed = await compressImage(img.file);
      img.compressedUrl = compressed.url;
      img.compressedSize = compressed.size;
      img.ratio = Math.round((1 - compressed.size / img.originalSize) * 100);
    } catch (error) {
      console.error('Compress error:', error);
      showFailToast(t('tools.imageCompressor.compressFailed'));
    } finally {
      img.compressing = false;
    }
  };

  const compressAll = async () => {
    const loadingToast = showLoadingToast({
      message: t('tools.imageCompressor.compressing'),
      forbidClick: true,
      duration: 0,
    });

    for (let i = 0; i < images.value.length; i++) {
      const img = images.value[i];
      if (!img.compressedUrl && !img.compressing) {
        await compressOne(i);
      }
    }

    loadingToast.close();
    showSuccessToast(t('tools.imageCompressor.compressSuccess'));
  };

  const downloadImage = (img) => {
    if (!img.compressedUrl) return;

    fetch(img.compressedUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const ext = format.value === 'original' ? img.name.split('.').pop() : format.value;
        link.download = `compressed_${img.name.replace(/\.[^.]+$/, '')}.${ext}`;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        try {
          link.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          }));
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
        showFailToast(t('tools.imageCompressor.downloadFailed'));
      });
  };

  const previewImage = (img) => {
    showImagePreview({
      images: [img.originalUrl, img.compressedUrl].filter(Boolean),
      startPosition: 1,
    });
  };

  const downloadAll = async () => {
    const compressedImages = images.value.filter(img => img.compressedUrl);

    for (let i = 0; i < compressedImages.length; i++) {
      downloadImage(compressedImages[i]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return {
    fileList,
    images,
    quality,
    maxWidth,
    format,
    keepExif,
    formatOptions,
    hasCompressedImages,
    handleAfterRead,
    handleDelete,
    removeImage,
    clearAll,
    compressOne,
    compressAll,
    downloadImage,
    previewImage,
    downloadAll,
    formatSize,
  };
}