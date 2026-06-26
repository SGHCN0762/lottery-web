import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import GIF from 'gif.js/dist/gif.js';

export function useGifMaker() {
  const { t } = useI18n();

  const imageFiles = ref([]);
  const frameDelay = ref(500);
  const loop = ref(true);
  const gifWidth = ref(0);
  const making = ref(false);

  const handleImagesChange = (files) => {
    const newFiles = files.filter(f => f.file && f.file.type.startsWith('image/'));
    newFiles.forEach(f => {
      const url = URL.createObjectURL(f.file);
      imageFiles.value.push({
        id: Date.now() + Math.random(),
        name: f.file.name,
        url,
        file: f.file,
      });
    });
  };

  const removeImage = (index) => {
    const file = imageFiles.value[index];
    if (file) {
      URL.revokeObjectURL(file.url);
      imageFiles.value.splice(index, 1);
    }
  };

  const clearAll = async () => {
    imageFiles.value.forEach(f => URL.revokeObjectURL(f.url));
    imageFiles.value = [];
  };

  const reorderImages = (newList) => {
    imageFiles.value = newList;
  };

  const makeGif = async () => {
    if (imageFiles.value.length < 2) {
      showFailToast(t('tools.fileConverter.gifMaker.needMoreImages'));
      return;
    }

    making.value = true;

    return new Promise((resolve) => {
      let timeoutId = null;
      let hasFinished = false;

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        hasFinished = true;
        making.value = false;
      };

      const handleSuccess = (blob) => {
        if (hasFinished) return;
        cleanup();
        try {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `animated_${Date.now()}.gif`;
          link.click();
          URL.revokeObjectURL(url);
          showSuccessToast(t('tools.fileConverter.gifMaker.makeSuccess'));
        } catch (e) {
          console.error('GIF download error:', e);
          showFailToast(t('tools.fileConverter.gifMaker.makeFailed'));
        }
        resolve();
      };

      const handleError = (error) => {
        if (hasFinished) return;
        cleanup();
        console.error('GIF error:', error);
        showFailToast(t('tools.fileConverter.gifMaker.makeFailed'));
        resolve();
      };

      timeoutId = setTimeout(() => {
        if (!hasFinished) {
          cleanup();
          showFailToast(t('tools.fileConverter.gifMaker.makeFailed'));
          resolve();
        }
      }, 60000);

      const firstImg = new Image();
      firstImg.onload = async () => {
        try {
          let width = gifWidth.value || firstImg.width;
          let height = gifWidth.value ? Math.round(width * (firstImg.height / firstImg.width)) : firstImg.height;

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });

          const gif = new GIF({
            workers: 2,
            quality: 10,
            width,
            height,
            repeat: loop.value ? 0 : -1,
            workerScript: (import.meta.env.BASE_URL || '/') + 'gif.worker.js',
          });

          gif.on('finished', handleSuccess);
          gif.on('error', handleError);

          for (const file of imageFiles.value) {
            await new Promise((imgResolve) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);

                if (img.width / img.height > width / height) {
                  const h = Math.round(width * (img.height / img.width));
                  ctx.drawImage(img, 0, (height - h) / 2, width, h);
                } else {
                  const w = Math.round(height * (img.width / img.height));
                  ctx.drawImage(img, (width - w) / 2, 0, w, height);
                }

                gif.addFrame(ctx, { copy: true, delay: frameDelay.value });
                imgResolve();
              };
              img.onerror = () => {
                imgResolve();
              };
              img.src = file.url;
            });
          }

          gif.render();
        } catch (error) {
          handleError(error);
        }
      };

      firstImg.onerror = () => {
        handleError(new Error('Failed to load first image'));
      };

      firstImg.src = imageFiles.value[0].url;
    });
  };

  return {
    imageFiles,
    frameDelay,
    loop,
    gifWidth,
    making,
    handleImagesChange,
    removeImage,
    clearAll,
    reorderImages,
    makeGif,
  };
}
