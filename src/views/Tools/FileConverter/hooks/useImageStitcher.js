import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';

export function useImageStitcher() {
  const { t } = useI18n();

  const imageFiles = ref([]);
  const direction = ref('horizontal'); // horizontal | vertical
  const spacing = ref(0);
  const backgroundColor = ref('#ffffff');
  const stitching = ref(false);

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

  const updateImageList = (newList) => {
    imageFiles.value = newList;
  };

  const stitchImages = async () => {
    if (imageFiles.value.length < 2) {
      showFailToast(t('tools.fileConverter.imageStitch.needMoreImages'));
      return;
    }

    stitching.value = true;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const images = await Promise.all(
        imageFiles.value.map(f => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = f.url;
          });
        })
      );

      const validImages = images.filter(Boolean);
      if (validImages.length < 2) {
        showFailToast(t('tools.fileConverter.imageStitch.loadFailed'));
        return;
      }

      const isHorizontal = direction.value === 'horizontal';
      const spacingPx = spacing.value;

      let totalWidth = 0;
      let totalHeight = 0;
      let maxSize = 0;

      if (isHorizontal) {
        validImages.forEach(img => {
          totalWidth += img.width;
          totalHeight = Math.max(totalHeight, img.height);
        });
        totalWidth += spacingPx * (validImages.length - 1);
      } else {
        validImages.forEach(img => {
          totalHeight += img.height;
          totalWidth = Math.max(totalWidth, img.width);
        });
        totalHeight += spacingPx * (validImages.length - 1);
      }

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      ctx.fillStyle = backgroundColor.value;
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      let x = 0;
      let y = 0;

      validImages.forEach((img, index) => {
        if (isHorizontal) {
          ctx.drawImage(img, x, (totalHeight - img.height) / 2);
          x += img.width + (index < validImages.length - 1 ? spacingPx : 0);
        } else {
          ctx.drawImage(img, (totalWidth - img.width) / 2, y);
          y += img.height + (index < validImages.length - 1 ? spacingPx : 0);
        }
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `stitched_${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
          showSuccessToast(t('tools.fileConverter.imageStitch.stitchSuccess'));
        } else {
          showFailToast(t('tools.fileConverter.imageStitch.stitchFailed'));
        }
        stitching.value = false;
      }, 'image/png');
    } catch (error) {
      console.error('Stitch error:', error);
      showFailToast(t('tools.fileConverter.imageStitch.stitchFailed'));
      stitching.value = false;
    }
  };

  const previewStitched = async () => {
    if (imageFiles.value.length < 2) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const images = await Promise.all(
      imageFiles.value.map(f => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = f.url;
        });
      })
    );

    const validImages = images.filter(Boolean);
    if (validImages.length < 2) return null;

    const isHorizontal = direction.value === 'horizontal';
    const spacingPx = spacing.value;

    let totalWidth = 0;
    let totalHeight = 0;

    if (isHorizontal) {
      validImages.forEach(img => {
        totalWidth += img.width;
        totalHeight = Math.max(totalHeight, img.height);
      });
      totalWidth += spacingPx * (validImages.length - 1);
    } else {
      validImages.forEach(img => {
        totalHeight += img.height;
        totalWidth = Math.max(totalWidth, img.width);
      });
      totalHeight += spacingPx * (validImages.length - 1);
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.fillStyle = backgroundColor.value;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    let x = 0;
    let y = 0;

    validImages.forEach((img, index) => {
      if (isHorizontal) {
        ctx.drawImage(img, x, (totalHeight - img.height) / 2);
        x += img.width + (index < validImages.length - 1 ? spacingPx : 0);
      } else {
        ctx.drawImage(img, (totalWidth - img.width) / 2, y);
        y += img.height + (index < validImages.length - 1 ? spacingPx : 0);
      }
    });

    return canvas.toDataURL('image/png');
  };

  return {
    imageFiles,
    direction,
    spacing,
    backgroundColor,
    stitching,
    handleImagesChange,
    removeImage,
    clearAll,
    updateImageList,
    stitchImages,
    previewStitched,
  };
}
