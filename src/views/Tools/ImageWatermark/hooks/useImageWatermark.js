import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { showImagePreview, showSuccessToast, showFailToast, showLoadingToast } from 'vant';

export function useImageWatermark() {
  const { t } = useI18n();

  const fileList = ref([]);
  const images = ref([]);
  
  const watermarkType = ref('tile');
  const watermarkText = ref('© My Watermark');
  const watermarkColor = ref('#FFFFFF');
  const watermarkSize = ref(3.3); // 百分比值，默认约3.3%
  const watermarkAngle = ref(-45);
  const watermarkOpacity = ref(60);
  const watermarkPosition = ref('top-right');
  const watermarkMargin = ref(2); // 百分比值，默认2%
  const customPositionX = ref(50);
  const customPositionY = ref(50);
  const logoFile = ref(null);
  const logoUrl = ref(null);
  const logoWidth = ref(12); // 百分比值，默认12%
  const logoHeight = ref(12); // 百分比值
  const logoRatio = ref(1);
  const logoOriginalWidth = ref(100);
  const logoOriginalHeight = ref(100);
  const outputFormat = ref('original');
  
  let isSyncing = false;
  
  const parseColorWithOpacity = (color, opacity) => {
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
      return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
    }
    return color;
  };
  
  const autoAdaptSettings = (width, height) => {
    const minDimension = Math.min(width, height);
    
    switch (watermarkType.value) {
      case 'tile':
        watermarkSize.value = Math.round((1 / 30) * 100 * 10) / 10;
        break;
      case 'single':
        watermarkSize.value = Math.round((1 / 15) * 100 * 10) / 10;
        watermarkMargin.value = 2;
        break;
      case 'logo': {
        let targetPercentage = 12;
        if (logoOriginalWidth.value > 0 && minDimension > 0) {
          const originalPercentage = (logoOriginalWidth.value / minDimension) * 100;
          targetPercentage = Math.min(targetPercentage, originalPercentage, 20);
        }
        logoWidth.value = Math.round(targetPercentage * 10) / 10;
        logoHeight.value = Math.round(targetPercentage * logoRatio.value * 10) / 10;
        watermarkMargin.value = 2;
        break;
      }
    }
  };
  
  const maxLogoSize = 100; // 最大百分比限制（相对于图片短边）
  
  watch(logoWidth, (newWidth) => {
    if (!isSyncing && logoRatio.value > 0) {
      isSyncing = true;
      let newHeight = Math.round(newWidth * logoRatio.value * 10) / 10;
      
      // 如果计算出的高度超出最大限制，按最大高度重新计算宽度
      if (newHeight > maxLogoSize) {
        logoHeight.value = maxLogoSize;
        logoWidth.value = Math.min(Math.round(maxLogoSize / logoRatio.value * 10) / 10, maxLogoSize);
      } else {
        logoHeight.value = newHeight;
      }
      isSyncing = false;
    }
  });
  
  watch(logoHeight, (newHeight) => {
    if (!isSyncing && logoRatio.value > 0) {
      isSyncing = true;
      let newWidth = Math.round(newHeight / logoRatio.value * 10) / 10;
      
      // 如果计算出的宽度超出最大限制，按最大宽度重新计算高度
      if (newWidth > maxLogoSize) {
        logoWidth.value = maxLogoSize;
        logoHeight.value = Math.min(Math.round(maxLogoSize * logoRatio.value * 10) / 10, maxLogoSize);
      } else {
        logoWidth.value = newWidth;
      }
      isSyncing = false;
    }
  });

  const watermarkTypeOptions = computed(() => [
    { name: t('tools.imageWatermark.typeTile'), value: 'tile' },
    { name: t('tools.imageWatermark.typeSingle'), value: 'single' },
    { name: t('tools.imageWatermark.typeLogo'), value: 'logo' },
  ]);

  const positionOptions = computed(() => [
    { name: t('tools.imageWatermark.positionTopLeft'), value: 'top-left' },
    { name: t('tools.imageWatermark.positionTopRight'), value: 'top-right' },
    { name: t('tools.imageWatermark.positionBottomLeft'), value: 'bottom-left' },
    { name: t('tools.imageWatermark.positionBottomRight'), value: 'bottom-right' },
    { name: t('tools.imageWatermark.positionCenter'), value: 'center' },
    { name: t('tools.imageWatermark.positionCustom'), value: 'custom' },
  ]);

  const formatOptions = computed(() => [
    { name: t('tools.imageWatermark.originalFormat'), value: 'original' },
    { name: 'JPEG', value: 'jpeg' },
    { name: 'PNG', value: 'png' },
    { name: 'WebP', value: 'webp' },
  ]);

  const hasWatermarkedImages = computed(() => {
    return images.value.some(img => img.watermarkedUrl);
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
          watermarkedUrl: null,
          watermarking: false,
        });
        
        const img = new Image();
        img.onload = () => {
          autoAdaptSettings(img.naturalWidth, img.naturalHeight);
        };
        img.src = url;
      }
    }
  };

  const handleLogoUpload = (file) => {
    if (file && file.file && file.file.type.startsWith('image/')) {
      logoFile.value = file.file;
      logoUrl.value = URL.createObjectURL(file.file);
      
      const img = new Image();
      img.onload = () => {
        logoOriginalWidth.value = img.width;
        logoOriginalHeight.value = img.height;
        logoRatio.value = img.height / img.width;
        
        if (images.value.length > 0) {
          const firstImg = new Image();
          firstImg.onload = () => {
            autoAdaptSettings(firstImg.naturalWidth, firstImg.naturalHeight);
          };
          firstImg.src = images.value[0].url;
        }
      };
      img.src = logoUrl.value;
    }
  };

  const handleDelete = (file, detail) => {
    const index = detail.index;
    if (fileList.value[index]) {
      const fileName = fileList.value[index].name;
      const imgIndex = images.value.findIndex(img => img.name === fileName);
      if (imgIndex !== -1) {
        URL.revokeObjectURL(images.value[imgIndex].url);
        if (images.value[imgIndex].watermarkedUrl) {
          URL.revokeObjectURL(images.value[imgIndex].watermarkedUrl);
        }
        images.value.splice(imgIndex, 1);
      }
      fileList.value.splice(index, 1);
    }
  };

  const removeImage = (index) => {
    const img = images.value[index];
    URL.revokeObjectURL(img.url);
    if (img.watermarkedUrl) {
      URL.revokeObjectURL(img.watermarkedUrl);
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
      if (img.watermarkedUrl) {
        URL.revokeObjectURL(img.watermarkedUrl);
      }
    });
    images.value = [];
    fileList.value = [];
  };

  const clearLogo = () => {
    if (logoUrl.value) {
      URL.revokeObjectURL(logoUrl.value);
    }
    logoFile.value = null;
    logoUrl.value = null;
  };

  const addTileWatermark = (ctx, width, height) => {
    const minDimension = Math.min(width, height);
    const fontSize = Math.max(Math.round((watermarkSize.value / 100) * minDimension), 12);
    const angle = (watermarkAngle.value * Math.PI) / 180;
    const opacity = watermarkOpacity.value / 100;
    const finalColor = parseColorWithOpacity(watermarkColor.value, opacity);

    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = finalColor;

    const text = watermarkText.value;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const rotatedWidth = Math.abs(textWidth * cosA) + Math.abs(textHeight * sinA);
    const rotatedHeight = Math.abs(textWidth * sinA) + Math.abs(textHeight * cosA);

    const spacingX = rotatedWidth * 1.3;
    const spacingY = rotatedHeight * 1.3;

    const cols = Math.ceil(width / spacingX) + 3;
    const rows = Math.ceil(height / spacingY) + 3;
    
    const offsetX = (width - (cols - 1) * spacingX) / 2;
    const offsetY = (height - (rows - 1) * spacingY) / 2;

    for (let i = -1; i < rows; i++) {
      for (let j = -1; j < cols; j++) {
        const x = offsetX + j * spacingX;
        const y = offsetY + i * spacingY;
        
        if (x > -rotatedWidth * 0.5 && x < width + rotatedWidth * 0.5 &&
            y > -rotatedHeight * 0.5 && y < height + rotatedHeight * 0.5) {
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
    }
  };

  const addSingleTextWatermark = (ctx, width, height) => {
    const minDimension = Math.min(width, height);
    const fontSize = Math.max(Math.round((watermarkSize.value / 100) * minDimension), 12);
    const opacity = watermarkOpacity.value / 100;
    const margin = Math.round((watermarkMargin.value / 100) * minDimension);
    const finalColor = parseColorWithOpacity(watermarkColor.value, opacity);

    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = finalColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = watermarkText.value;
    let x, y;
    
    if (watermarkPosition.value === 'custom') {
      x = (customPositionX.value / 100) * width;
      y = (customPositionY.value / 100) * height;
    } else {
      switch (watermarkPosition.value) {
        case 'top-left':
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          x = margin;
          y = margin;
          break;
        case 'top-right':
          ctx.textAlign = 'right';
          ctx.textBaseline = 'top';
          x = width - margin;
          y = margin;
          break;
        case 'bottom-left':
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          x = margin;
          y = height - margin;
          break;
        case 'bottom-right':
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          x = width - margin;
          y = height - margin;
          break;
        case 'center':
        default:
          x = width / 2;
          y = height / 2;
          break;
      }
    }

    ctx.fillText(text, x, y);
  };

  const addLogoWatermark = (ctx, width, height, resolve, reject) => {
    if (!logoFile.value) {
      reject(new Error('No logo selected'));
      return;
    }

    const minDimension = Math.min(width, height);
    const margin = Math.round((watermarkMargin.value / 100) * minDimension);
    const logoW = Math.round((logoWidth.value / 100) * minDimension);
    const logoH = Math.round((logoHeight.value / 100) * minDimension);
    const opacity = watermarkOpacity.value / 100;

    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    
    logoImg.onload = () => {
      ctx.globalAlpha = opacity;

      let x, y;
      
      if (watermarkPosition.value === 'custom') {
        x = (customPositionX.value / 100) * width - logoW / 2;
        y = (customPositionY.value / 100) * height - logoH / 2;
      } else {
        switch (watermarkPosition.value) {
          case 'top-left':
            x = margin;
            y = margin;
            break;
          case 'top-right':
            x = width - logoW - margin;
            y = margin;
            break;
          case 'bottom-left':
            x = margin;
            y = height - logoH - margin;
            break;
          case 'bottom-right':
            x = width - logoW - margin;
            y = height - logoH - margin;
            break;
          case 'center':
          default:
            x = (width - logoW) / 2;
            y = (height - logoH) / 2;
            break;
        }
      }

      ctx.drawImage(logoImg, x, y, logoW, logoH);
      ctx.globalAlpha = 1;
      
      resolve();
    };

    logoImg.onerror = () => {
      reject(new Error('Failed to load logo'));
    };

    logoImg.src = logoUrl.value;
  };

  const addWatermark = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const processWatermark = () => {
            let mimeType;
            let outputFormatValue = outputFormat.value;

            if (outputFormatValue === 'original') {
              mimeType = file.type || 'image/jpeg';
              outputFormatValue = mimeType.split('/')[1];
            } else {
              mimeType = `image/${outputFormatValue}`;
            }

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  resolve({
                    url,
                    blob,
                  });
                } else {
                  reject(new Error('Failed to add watermark'));
                }
              },
              mimeType,
              0.95
            );
          };

          switch (watermarkType.value) {
            case 'tile':
              addTileWatermark(ctx, width, height);
              processWatermark();
              break;
            case 'single':
              addSingleTextWatermark(ctx, width, height);
              processWatermark();
              break;
            case 'logo':
              addLogoWatermark(ctx, width, height, processWatermark, reject);
              break;
            default:
              addTileWatermark(ctx, width, height);
              processWatermark();
          }
        } catch (error) {
          reject(new Error('Canvas processing error: ' + error.message));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const addWatermarkOne = async (index) => {
    const img = images.value[index];
    if (!img || img.watermarking) return;

    if (watermarkType.value === 'logo' && !logoFile.value) {
      showFailToast(t('tools.imageWatermark.selectLogoFirst'));
      return;
    }

    img.watermarking = true;

    try {
      const watermarked = await addWatermark(img.file);
      img.watermarkedUrl = watermarked.url;
    } catch (error) {
      console.error('Watermark error:', error);
      showFailToast(t('tools.imageWatermark.watermarkFailed'));
    } finally {
      img.watermarking = false;
    }
  };

  const addWatermarkAll = async () => {
    if (watermarkType.value === 'logo' && !logoFile.value) {
      showFailToast(t('tools.imageWatermark.selectLogoFirst'));
      return;
    }

    const loadingToast = showLoadingToast({
      message: t('tools.imageWatermark.watermarking'),
      forbidClick: true,
      duration: 0,
    });

    for (let i = 0; i < images.value.length; i++) {
      const img = images.value[i];
      if (!img.watermarking) {
        if (img.watermarkedUrl) {
          URL.revokeObjectURL(img.watermarkedUrl);
          img.watermarkedUrl = null;
        }
        await addWatermarkOne(i);
      }
    }

    loadingToast.close();
    showSuccessToast(t('tools.imageWatermark.watermarkSuccess'));
  };

  const downloadImage = (img) => {
    return new Promise((resolve) => {
      if (!img.watermarkedUrl) {
        resolve(false);
        return;
      }

      const ext = outputFormat.value === 'original' ? img.name.split('.').pop() : outputFormat.value;
      const fileName = `watermarked_${img.name.replace(/\.[^.]+$/, '')}.${ext}`;

      // 获取 blob
      fetch(img.watermarkedUrl)
        .then(response => response.blob())
        .then(blob => {
          // 移动端兼容处理
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          
          if (isMobile && navigator.share) {
            // 移动端使用 Web Share API
            const file = new File([blob], fileName, { type: blob.type });
            navigator.share({
              files: [file],
              title: fileName,
            }).then(() => {
              resolve(true);
            }).catch(() => {
              // 如果用户取消分享，尝试传统下载方式
              resolve(downloadBlob(blob, fileName));
            });
          } else {
            // 桌面端使用传统下载方式
            resolve(downloadBlob(blob, fileName));
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  };

  const downloadBlob = (blob, fileName) => {
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // 移动端需要直接调用 click
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      return true;
    } catch (e) {
      console.error('Download error:', e);
      return false;
    }
  };

  const previewImage = (img) => {
    showImagePreview({
      images: [img.originalUrl, img.watermarkedUrl].filter(Boolean),
      startPosition: img.watermarkedUrl ? 1 : 0,
    });
  };

  const downloadAll = async () => {
    const watermarkedImages = images.value.filter(img => img.watermarkedUrl);
    
    if (watermarkedImages.length === 0) {
      showFailToast(t('tools.imageWatermark.noImagesToDownload'));
      return;
    }

    const loadingToast = showLoadingToast({
      message: t('tools.imageWatermark.downloading'),
      forbidClick: true,
      duration: 0,
    });

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && watermarkedImages.length > 1 && navigator.share) {
      // 移动端多图使用 Web Share API
      try {
        const files = await Promise.all(
          watermarkedImages.map(async (img) => {
            const response = await fetch(img.watermarkedUrl);
            const blob = await response.blob();
            const ext = outputFormat.value === 'original' ? img.name.split('.').pop() : outputFormat.value;
            const fileName = `watermarked_${img.name.replace(/\.[^.]+$/, '')}.${ext}`;
            return new File([blob], fileName, { type: blob.type });
          })
        );
        
        await navigator.share({
          files: files,
          title: 'Watermarked Images',
        });
        
        loadingToast.close();
        showSuccessToast(t('tools.imageWatermark.downloadAllSuccess'));
        return;
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('Share error:', e);
        }
        // 如果分享失败，尝试逐个下载
      }
    }

    // 逐个下载
    let successCount = 0;
    // 移动端需要更长的间隔时间
    const delay = isMobile ? 1000 : Math.max(300, Math.min(1000, watermarkedImages.length * 100));

    for (let i = 0; i < watermarkedImages.length; i++) {
      const success = await downloadImage(watermarkedImages[i]);
      if (success) {
        successCount++;
      }
      if (i < watermarkedImages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    loadingToast.close();
    
    if (successCount === watermarkedImages.length) {
      showSuccessToast(t('tools.imageWatermark.downloadAllSuccess'));
    } else if (successCount > 0) {
      showSuccessToast(t('tools.imageWatermark.partialDownload', { count: successCount }));
    } else {
      showFailToast(t('tools.imageWatermark.downloadAllFailed'));
    }
  };

  return {
    fileList,
    images,
    watermarkType,
    watermarkTypeOptions,
    watermarkText,
    watermarkColor,
    watermarkSize,
    watermarkAngle,
    watermarkOpacity,
    watermarkPosition,
    positionOptions,
    watermarkMargin,
    customPositionX,
    customPositionY,
    logoFile,
    logoUrl,
    logoWidth,
    logoHeight,
    outputFormat,
    formatOptions,
    hasWatermarkedImages,
    handleAfterRead,
    handleLogoUpload,
    handleDelete,
    removeImage,
    clearAll,
    clearLogo,
    addWatermarkOne,
    addWatermarkAll,
    downloadImage,
    previewImage,
    downloadAll,
  };
}