<template>
  <div class="preview-section">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item name="1">
        <template #title>
          <span class="collapse-title">
            <van-icon name="eye-o" />
            {{ t('tools.imageWatermark.preview') }}
          </span>
        </template>
        
        <div class="preview-content">
          <div class="preview-container">
            <div class="preview-image">
              <div class="preview-bg"></div>
              <canvas ref="previewCanvas" class="preview-canvas"></canvas>
            </div>
            <div class="preview-info">
              <van-tag type="primary" size="small">
                {{ watermarkTypeOptions.find(f => f.value === watermarkType)?.name }}
              </van-tag>
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { Collapse as VanCollapse, CollapseItem as VanCollapseItem, Tag as VanTag, Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  watermarkType: String,
  watermarkText: String,
  watermarkSize: Number,
  watermarkAngle: Number,
  watermarkOpacity: Number,
  watermarkColor: String,
  watermarkPosition: String,
  watermarkMargin: Number,
  logoUrl: String,
  logoWidth: Number,
  logoHeight: Number,
});

const activeName = ref('1');
const previewCanvas = ref(null);

const watermarkTypeOptions = [
  { name: t('tools.imageWatermark.typeTile'), value: 'tile' },
  { name: t('tools.imageWatermark.typeSingle'), value: 'single' },
  { name: t('tools.imageWatermark.typeLogo'), value: 'logo' },
];

const drawPreview = () => {
  if (!previewCanvas.value) return;

  const canvas = previewCanvas.value;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#e0e0e0';
  const gridSize = 20;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      if ((x + y) / gridSize % 2 === 0) {
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }
  }

  const fontSize = props.watermarkSize;
  const angle = (props.watermarkAngle * Math.PI) / 180;
  const opacity = props.watermarkOpacity / 100;

  const color = props.watermarkColor;
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  let finalColor;
  if (rgbaMatch) {
    finalColor = `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
  } else {
    finalColor = color;
  }

  switch (props.watermarkType) {
    case 'tile':
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = finalColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.rotate(angle);

      const text = props.watermarkText;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      const spacingX = textWidth + 30;
      const spacingY = textHeight + 30;

      const cols = Math.ceil(width / spacingX) + 2;
      const rows = Math.ceil(height / spacingY) + 2;

      for (let i = -1; i < rows; i++) {
        for (let j = -1; j < cols; j++) {
          const x = j * spacingX - width / 2;
          const y = i * spacingY - height / 2;
          ctx.fillText(text, x, y);
        }
      }

      ctx.rotate(-angle);
      break;

    case 'single':
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = finalColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const singleText = props.watermarkText;
      const singleMetrics = ctx.measureText(singleText);
      const margin = props.watermarkMargin;

      let x, y;
      switch (props.watermarkPosition) {
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

      ctx.fillText(singleText, x, y);
      break;

    case 'logo':
      if (props.logoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
          ctx.globalAlpha = opacity;

          const logoW = props.logoWidth;
          const logoH = props.logoHeight;
          const margin = props.watermarkMargin;

          let logoX, logoY;
          switch (props.watermarkPosition) {
            case 'top-left':
              logoX = margin;
              logoY = margin;
              break;
            case 'top-right':
              logoX = width - logoW - margin;
              logoY = margin;
              break;
            case 'bottom-left':
              logoX = margin;
              logoY = height - logoH - margin;
              break;
            case 'bottom-right':
              logoX = width - logoW - margin;
              logoY = height - logoH - margin;
              break;
            case 'center':
            default:
              logoX = (width - logoW) / 2;
              logoY = (height - logoH) / 2;
              break;
          }

          ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
          ctx.globalAlpha = 1;
        };
        logoImg.src = props.logoUrl;
      } else {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t('tools.imageWatermark.selectLogoFirst'), width / 2, height / 2);
      }
      break;

    default:
      break;
  }
};

watch(
  () => [
    props.watermarkType,
    props.watermarkText,
    props.watermarkSize,
    props.watermarkAngle,
    props.watermarkOpacity,
    props.watermarkColor,
    props.watermarkPosition,
    props.watermarkMargin,
    props.logoUrl,
    props.logoWidth,
    props.logoHeight,
  ],
  () => {
    nextTick(() => {
      drawPreview();
    });
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    drawPreview();
  });
});
</script>

<style lang="less" scoped>
.preview-section {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;

  :deep(.van-collapse-item__title) {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .collapse-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .preview-content {
    padding: var(--spacing-lg);
  }

  .preview-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .preview-image {
    position: relative;
    width: 100%;
    max-width: 300px;
    aspect-ratio: 4/3;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  .preview-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .preview-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview-info {
    display: flex;
    gap: var(--spacing-sm);
  }
}
</style>