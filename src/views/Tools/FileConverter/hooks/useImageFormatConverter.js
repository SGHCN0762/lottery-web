import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';

export function useImageFormatConverter() {
  const { t } = useI18n();

  const imageFileList = ref([]);
  const imageConvertList = ref([]);
  const imageOutputFormat = ref('jpeg');
  const imageQuality = ref(80);
  const convertingImages = ref(false);

  const hasConvertedImages = computed(() => {
    return imageConvertList.value.some(img => img.convertedUrl);
  });

  watch(imageOutputFormat, () => {
    imageConvertList.value.forEach(img => {
      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl);
        img.convertedUrl = null;
        img.convertedSize = 0;
        img.name = img.originalName;
      }
    });
  });

  const handleImageAfterRead = async (file) => {
    const files = Array.isArray(file) ? file : [file];

    for (const f of files) {
      if (f.file && f.file.type.startsWith('image/')) {
        const url = URL.createObjectURL(f.file);
        const id = Date.now() + Math.random();

        imageFileList.value.push({
          name: f.file.name,
          url,
        });

        imageConvertList.value.push({
          id,
          name: f.file.name,
          originalName: f.file.name,
          url,
          originalUrl: url,
          file: f.file,
          convertedUrl: null,
          convertedSize: 0,
          converting: false,
        });
      }
    }
  };

  const handleImageDelete = (file, detail) => {
    const index = detail.index;
    if (imageFileList.value[index]) {
      const fileName = imageFileList.value[index].name;
      const imgIndex = imageConvertList.value.findIndex(img => img.name === fileName);
      if (imgIndex !== -1) {
        const img = imageConvertList.value[imgIndex];
        if (img.url) URL.revokeObjectURL(img.url);
        if (img.convertedUrl) URL.revokeObjectURL(img.convertedUrl);
        imageConvertList.value.splice(imgIndex, 1);
      }
      imageFileList.value.splice(index, 1);
    }
  };

  const convertImageToFormat = (file, format, quality) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${format}`;
        const outputQuality = quality / 100;

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
              reject(new Error('Failed to convert image'));
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

  const convertOneImage = async (index) => {
    const img = imageConvertList.value[index];
    if (!img) return;

    img.converting = true;

    try {
      const converted = await convertImageToFormat(img.file, imageOutputFormat.value, imageQuality.value);
      const ext = imageOutputFormat.value;
      const baseName = img.name.replace(/\.[^.]+$/, '');

      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl);
      }

      img.convertedUrl = converted.url;
      img.convertedSize = converted.size;
      img.name = `${baseName}.${ext}`;
    } catch (error) {
      console.error('Convert error:', error);
      showFailToast(t('tools.fileConverter.imageFormat.convertFailed'));
    } finally {
      img.converting = false;
    }
  };

  const convertImageFormat = async () => {
    if (imageConvertList.value.length === 0) return;

    convertingImages.value = true;

    try {
      for (let i = 0; i < imageConvertList.value.length; i++) {
        await convertOneImage(i);
      }
      showSuccessToast(t('tools.fileConverter.imageFormat.convertSuccess'));
    } catch (error) {
      console.error('Convert error:', error);
      showFailToast(t('tools.fileConverter.imageFormat.convertFailed'));
    } finally {
      convertingImages.value = false;
    }
  };

  const downloadConvertedImage = (img) => {
    if (!img.convertedUrl) return;

    const link = document.createElement('a');
    link.href = img.convertedUrl;
    link.download = img.name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  const clearImageList = () => {
    imageConvertList.value.forEach(img => {
      if (img.url) URL.revokeObjectURL(img.url);
      if (img.convertedUrl) URL.revokeObjectURL(img.convertedUrl);
    });
    imageConvertList.value = [];
    imageFileList.value = [];
  };

  const downloadAllImages = async () => {
    const convertedImgs = imageConvertList.value.filter(img => img.convertedUrl);
    if (convertedImgs.length === 0) {
      showFailToast(t('tools.fileConverter.common.noFilesToDownload'));
      return;
    }

    for (let i = 0; i < convertedImgs.length; i++) {
      downloadConvertedImage(convertedImgs[i]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    showSuccessToast(t('tools.fileConverter.common.downloadAllSuccess'));
  };

  return {
    imageFileList,
    imageConvertList,
    imageOutputFormat,
    imageQuality,
    hasConvertedImages,
    handleImageAfterRead,
    handleImageDelete,
    convertImageFormat,
    clearImageList,
    downloadConvertedImage,
    downloadAllImages,
  };
}