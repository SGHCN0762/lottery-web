<template>
  <ToolCard
    icon="eye-o"
    :title="t('tools.logoDesigner.preview')"
    class="logo-preview-card"
  >
    <template #headerRight>
      <slot name="header-suffix"></slot>
    </template>

    <div class="preview-container">
      <canvas
        ref="canvasRef"
        @click="handleCanvasClick"
        @mousedown="handlePointerDown"
        @touchstart="handlePointerDown"
      />
    </div>
  </ToolCard>
</template>

<script setup>
  import { ref, watch, onMounted, nextTick, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { LAYER_SIZE_LIMITS } from '../js/constants';
  import ToolCard from '../../components/ToolCard.vue';

  const { t } = useI18n();

  /**
   * 组件属性定义
   * @property {Array} layers - 图层列表
   * @property {Number} canvasWidth - 画布宽度（像素）
   * @property {Number} canvasHeight - 画布高度（像素）
   * @property {String} backgroundType - 背景类型：solid/gradient/transparent
   * @property {String} backgroundColor - 纯色背景颜色
   * @property {String} gradientStartColor - 渐变起始色
   * @property {String} gradientEndColor - 渐变结束色
   * @property {Number} gradientAngle - 渐变角度（0-360）
   * @property {Number} borderRadius - 圆角半径（像素）
   * @property {String} selectedLayerId - 当前选中图层ID
   */
  const props = defineProps({
    layers: { type: Array, required: true },
    canvasWidth: { type: Number, required: true },
    canvasHeight: { type: Number, required: true },
    backgroundType: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    gradientStartColor: { type: String, required: true },
    gradientEndColor: { type: String, required: true },
    gradientAngle: { type: Number, required: true },
    borderRadius: { type: Number, required: true },
    selectedLayerId: { type: String, default: null },
  });

  /**
   * 组件事件定义
   * @event canvasReady - 画布初始化完成
   * @event layerClick - 点击图层
   * @event updateLayer - 更新图层属性
   */
  const emit = defineEmits(['canvasReady', 'layerClick', 'updateLayer']);

  /** Canvas元素引用 */
  const canvasRef = ref(null);
  /** 图片缓存Map，避免重复加载 */
  const imageCache = ref(new Map());
  /** 待处理的重绘请求ID */
  let pendingRedraw = null;
  /** 是否正在重绘中 */
  let isRedrawing = false;

  const isDragging = ref(false);
  const isScaling = ref(false);
  const isRotating = ref(false);
  const dragStartX = ref(0);
  const dragStartY = ref(0);
  const layerStartX = ref(0);
  const layerStartY = ref(0);
  const scaleStartDistance = ref(0);
  const scaleStartSize = ref(0);
  const rotationStartAngle = ref(0);
  const layerStartRotation = ref(0);
  const twoFingerStartAngle = ref(0);
  const activeLayerId = ref(null);
  const resizeHandle = ref(null);
  const resizeStartX = ref(0);
  const resizeStartY = ref(0);
  const layerStartWidth = ref(0);
  const layerStartHeight = ref(0);

  /**
   * 绘制Logo主方法
   * 依次绘制背景、边框和所有图层
   */
  const drawLogo = async () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const {
      canvasWidth,
      canvasHeight,
      backgroundType,
      backgroundColor,
      gradientStartColor,
      gradientEndColor,
      gradientAngle,
      borderRadius,
    } = props;

    // 调整画布尺寸
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();

    // 根据背景类型绘制背景
    if (backgroundType === 'gradient') {
      // 计算渐变方向向量
      const angle = (gradientAngle * Math.PI) / 180;
      const x1 = canvasWidth / 2 - (Math.cos(angle) * canvasWidth) / 2;
      const y1 = canvasHeight / 2 - (Math.sin(angle) * canvasHeight) / 2;
      const x2 = canvasWidth / 2 + (Math.cos(angle) * canvasWidth) / 2;
      const y2 = canvasHeight / 2 + (Math.sin(angle) * canvasHeight) / 2;
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, gradientStartColor);
      gradient.addColorStop(1, gradientEndColor);
      ctx.fillStyle = gradient;
    } else if (backgroundType === 'solid') {
      ctx.fillStyle = backgroundColor;
    } else {
      // 透明背景直接绘制图层
      ctx.restore();
      await drawLayers();
      return;
    }

    // 绘制背景
    if (borderRadius > 0) {
      // borderRadius 存储的是像素值（相对于画布短边的百分比 × 短边）
      // rx/ry 直接使用 borderRadius，让100%时 rx=canvasWidth, ry=canvasHeight 形成完整的圆/椭圆
      const rx = borderRadius;
      const ry = borderRadius;
      roundRect(ctx, 0, 0, canvasWidth, canvasHeight, rx, ry);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    ctx.restore();
    // 绘制所有图层
    await drawLayers();
  };

  /**
   * 请求重绘画布
   * 使用 requestAnimationFrame 节流，避免频繁重绘
   */
  const requestRedraw = () => {
    if (pendingRedraw) return;
    pendingRedraw = requestAnimationFrame(async () => {
      pendingRedraw = null;
      if (isRedrawing) return;
      isRedrawing = true;
      try {
        await drawLogo();
      } finally {
        isRedrawing = false;
      }
    });
  };

  /**
   * 获取图层边界矩形
   * 根据图层类型计算宽高，返回左上角坐标和尺寸
   * @param {Object} layer - 图层对象
   * @param {CanvasRenderingContext2D} [ctx] - Canvas上下文，用于精确测量文字宽度
   * @returns {Object} 包含x, y, width, height的边界对象
   */
  const getLayerBounds = (layer, ctx = null) => {
    let width, height;
    switch (layer.type) {
      case 'text':
        const fontSize = layer.fontSize || 32;
        // 有ctx时精确测量文字宽度，否则估算
        if (ctx) {
          ctx.font = `${layer.weight} ${layer.style} ${fontSize}px ${layer.font}`;
          width = ctx.measureText(layer.content || '').width;
        } else {
          width = fontSize * (layer.content?.length || 1) * 0.6;
        }
        height = fontSize * 1.2;
        break;
      case 'shape':
        width = layer.shapeSize || 80;
        height = layer.shapeSize || 80;
        break;
      case 'icon':
        width = layer.iconSize || 50;
        height = layer.iconSize || 50;
        break;
      case 'image':
        // 使用 imageSize（百分比）和原始宽高比计算实际显示尺寸
        const imagePercent = layer.imageSize || 30;
        const shortSide = Math.min(props.canvasWidth, props.canvasHeight);
        const displayWidth = (imagePercent / 100) * shortSide;
        const originalW = layer.originalImageWidth || 100;
        const originalH = layer.originalImageHeight || 100;
        const imgAspectRatio = originalW / originalH;
        width = displayWidth;
        height = displayWidth / imgAspectRatio;
        break;
      default:
        width = 50;
        height = 50;
    }
    // 返回左上角坐标（图层中心点减去半宽高）
    return {
      x: layer.x - width / 2,
      y: layer.y - height / 2,
      width,
      height,
    };
  };

  /**
   * 绘制选中框
   * 包括虚线边框、8个缩放手柄和顶部旋转手柄
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} layer - 图层对象
   */
  const drawSelectionBox = (ctx, layer) => {
    const bounds = getLayerBounds(layer, ctx);
    const padding = 4;
    const handleSize = 8;

    const cx = layer.x;
    const cy = layer.y;
    const rotation = ((layer.rotation || 0) * Math.PI) / 180;

    // 应用图层旋转变换
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.translate(-cx, -cy);

    // 绘制虚线边框
    ctx.strokeStyle = '#1989fa';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(
      bounds.x - padding,
      bounds.y - padding,
      bounds.width + padding * 2,
      bounds.height + padding * 2
    );
    ctx.setLineDash([]);

    // 绘制8个缩放手柄（4个角 + 4个边中点）
    ctx.fillStyle = '#1989fa';
    const hx1 = bounds.x - padding - handleSize / 2;
    const hy1 = bounds.y - padding - handleSize / 2;
    const hx2 = bounds.x + bounds.width + padding - handleSize / 2;
    const hy2 = bounds.y + bounds.height + padding - handleSize / 2;
    const hcx = bounds.x + bounds.width / 2 - handleSize / 2;
    const hcy = bounds.y + bounds.height / 2 - handleSize / 2;

    // 角手柄
    ctx.fillRect(hx1, hy1, handleSize, handleSize);
    ctx.fillRect(hx2, hy1, handleSize, handleSize);
    ctx.fillRect(hx1, hy2, handleSize, handleSize);
    ctx.fillRect(hx2, hy2, handleSize, handleSize);

    // 边手柄
    ctx.fillRect(hcx, hy1, handleSize, handleSize);
    ctx.fillRect(hcx, hy2, handleSize, handleSize);
    ctx.fillRect(hx1, hcy, handleSize, handleSize);
    ctx.fillRect(hx2, hcy, handleSize, handleSize);

    // 绘制旋转手柄（顶部中心向上延伸的圆圈）
    const handleTopX = bounds.x + bounds.width / 2;
    const handleTopY = bounds.y - padding;
    const handleLineLength = 24;
    const handleCircleRadius = 7;

    ctx.strokeStyle = '#1989fa';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(handleTopX, handleTopY);
    ctx.lineTo(handleTopX, handleTopY - handleLineLength);
    ctx.stroke();

    // 旋转手柄圆圈
    ctx.beginPath();
    ctx.arc(handleTopX, handleTopY - handleLineLength, handleCircleRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#1989fa';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  /**
   * 获取缩放手柄在画布中的实际位置
   * 考虑图层旋转，将本地坐标转换为世界坐标
   * @param {Object} layer - 图层对象
   * @param {string} handle - 手柄名称：top-left/top-right/bottom-left/bottom-right/top/bottom/left/right
   * @returns {Object|null} 手柄位置对象（包含x, y, radius）或null
   */
  const getResizeHandlePosition = (layer, handle) => {
    const bounds = getLayerBounds(layer);
    const padding = 4;

    let localX, localY;
    switch (handle) {
      case 'top-left':
        localX = bounds.x - padding;
        localY = bounds.y - padding;
        break;
      case 'top-right':
        localX = bounds.x + bounds.width + padding;
        localY = bounds.y - padding;
        break;
      case 'bottom-left':
        localX = bounds.x - padding;
        localY = bounds.y + bounds.height + padding;
        break;
      case 'bottom-right':
        localX = bounds.x + bounds.width + padding;
        localY = bounds.y + bounds.height + padding;
        break;
      case 'top':
        localX = bounds.x + bounds.width / 2;
        localY = bounds.y - padding;
        break;
      case 'bottom':
        localX = bounds.x + bounds.width / 2;
        localY = bounds.y + bounds.height + padding;
        break;
      case 'left':
        localX = bounds.x - padding;
        localY = bounds.y + bounds.height / 2;
        break;
      case 'right':
        localX = bounds.x + bounds.width + padding;
        localY = bounds.y + bounds.height / 2;
        break;
      default:
        return null;
    }

    // 应用旋转变换，将本地坐标转换为世界坐标
    const rotation = ((layer.rotation || 0) * Math.PI) / 180;
    const dx = localX - layer.x;
    const dy = localY - layer.y;
    return {
      x: layer.x + dx * Math.cos(rotation) - dy * Math.sin(rotation),
      y: layer.y + dx * Math.sin(rotation) + dy * Math.cos(rotation),
      radius: 6,
    };
  };

  /**
   * 检测点击位置是否命中缩放手柄
   * @param {number} x - 点击X坐标
   * @param {number} y - 点击Y坐标
   * @param {Object} layer - 图层对象
   * @returns {string|null} 命中的手柄名称或null
   */
  const hitTestResizeHandle = (x, y, layer) => {
    if (!layer) return null;
    const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom', 'left', 'right'];
    for (const handle of handles) {
      const pos = getResizeHandlePosition(layer, handle);
      if (pos) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        // 使用扩大2倍的检测区域，提高点击精度
        if (Math.sqrt(dx * dx + dy * dy) <= pos.radius * 2) {
          return handle;
        }
      }
    }
    return null;
  };

  /**
   * 获取旋转手柄在画布中的实际位置
   * 考虑图层旋转，将本地坐标转换为世界坐标
   * @param {Object} layer - 图层对象
   * @returns {Object} 手柄位置对象（包含x, y, radius）
   */
  const getRotationHandlePosition = (layer) => {
    const bounds = getLayerBounds(layer);
    const padding = 4;
    const handleLineLength = 24;
    const handleCircleRadius = 7;

    // 旋转手柄在图层顶部中心向上延伸的位置
    const localX = bounds.x + bounds.width / 2;
    const localY = bounds.y - padding - handleLineLength;

    // 应用旋转变换
    const rotation = ((layer.rotation || 0) * Math.PI) / 180;
    const dx = localX - layer.x;
    const dy = localY - layer.y;
    return {
      x: layer.x + dx * Math.cos(rotation) - dy * Math.sin(rotation),
      y: layer.y + dx * Math.sin(rotation) + dy * Math.cos(rotation),
      radius: handleCircleRadius + 4,
    };
  };

  /**
   * 检测点击位置是否命中旋转手柄
   * @param {number} x - 点击X坐标
   * @param {number} y - 点击Y坐标
   * @param {Object} layer - 图层对象
   * @returns {boolean} 是否命中
   */
  const hitTestRotationHandle = (x, y, layer) => {
    if (!layer) return false;
    const handle = getRotationHandlePosition(layer);
    const dx = x - handle.x;
    const dy = y - handle.y;
    return Math.sqrt(dx * dx + dy * dy) <= handle.radius * 2;
  };

  /**
   * 绘制所有图层
   * 按zIndex升序绘制，可见图层才会被绘制
   * @param {boolean} [showSelection=true] - 是否显示选中框
   */
  const drawLayers = async (showSelection = true) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sortedLayers = [...props.layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    for (const layer of sortedLayers) {
      if (!layer.visible) continue;

      ctx.save();

      const rotation = ((layer.rotation || 0) * Math.PI) / 180;
      if (rotation !== 0) {
        ctx.translate(layer.x, layer.y);
        ctx.rotate(rotation);
        ctx.translate(-layer.x, -layer.y);
      }

      switch (layer.type) {
        case 'text':
          drawTextLayer(ctx, layer);
          break;
        case 'shape':
          drawShapeLayer(ctx, layer);
          break;
        case 'icon':
          drawIconLayer(ctx, layer);
          break;
        case 'image':
          await drawImageLayer(ctx, layer);
          break;
      }

      ctx.restore();
    }

    if (showSelection) {
      const selectedLayer = props.layers.find(l => l.id === props.selectedLayerId);
      if (selectedLayer && selectedLayer.visible) {
        ctx.save();
        drawSelectionBox(ctx, selectedLayer);
        ctx.restore();
      }
    }
  };

  const drawTextLayer = (ctx, layer) => {
    ctx.font = `${layer.weight} ${layer.style} ${layer.fontSize}px ${layer.font}`;
    ctx.fillStyle = layer.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(layer.content || '', layer.x, layer.y);
  };

  const drawShapeLayer = (ctx, layer) => {
    ctx.globalAlpha = layer.shapeOpacity / 100;
    ctx.fillStyle = layer.shapeColor;

    const size = layer.shapeSize || 80;
    drawShape(ctx, layer.x, layer.y, size, layer.shapeType);
  };

  const drawIconLayer = (ctx, layer) => {
    ctx.fillStyle = layer.iconColor;
    const size = layer.iconSize || 50;
    drawIcon(ctx, layer.iconType, layer.x, layer.y, size);
  };

  const drawImageLayer = (ctx, layer) => {
    return new Promise((resolve) => {
      if (!layer.imageUrl) {
        resolve();
        return;
      }

      ctx.globalAlpha = (layer.imageOpacity || 100) / 100;

      // 使用 imageSize（百分比）和原始宽高比计算实际显示尺寸
      const imagePercent = layer.imageSize || 30;
      const shortSide = Math.min(props.canvasWidth, props.canvasHeight);
      const displayWidth = (imagePercent / 100) * shortSide;
      const originalW = layer.originalImageWidth || 100;
      const originalH = layer.originalImageHeight || 100;
      const imgAspectRatio = originalW / originalH;
      const width = displayWidth;
      const height = displayWidth / imgAspectRatio;

      const cachedImg = imageCache.value.get(layer.imageUrl);
      if (cachedImg) {
        ctx.drawImage(
          cachedImg,
          layer.x - width / 2,
          layer.y - height / 2,
          width,
          height
        );
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageCache.value.set(layer.imageUrl, img);
        ctx.drawImage(
          img,
          layer.x - width / 2,
          layer.y - height / 2,
          width,
          height
        );
        resolve();
      };
      img.onerror = () => {
        resolve();
      };
      img.src = layer.imageUrl;
    });
  };

  const drawShape = (ctx, x, y, size, shapeType) => {
    ctx.beginPath();
    switch (shapeType) {
      case 'circle':
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(x - size / 2, y - size / 2, size, size);
        break;
      case 'triangle':
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.closePath();
        break;
      case 'diamond':
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x + size / 2, y);
        ctx.lineTo(x, y + size / 2);
        ctx.lineTo(x - size / 2, y);
        ctx.closePath();
        break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const px = x + (size / 2) * Math.cos(angle);
          const py = y + (size / 2) * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 'star':
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? size / 2 : size / 4;
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          const px = x + radius * Math.cos(angle);
          const py = y + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      default:
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
  };

  const drawIcon = (ctx, type, x, y, size) => {
    const lineWidth = Math.max(2, size / 10);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ctx.fillStyle;

    ctx.beginPath();
    const half = size / 2;
    const quarter = size / 4;

    switch (type) {
      case 'check':
        ctx.moveTo(x - quarter, y);
        ctx.lineTo(x - quarter / 2, y + quarter / 2);
        ctx.lineTo(x + quarter, y - quarter / 2);
        break;
      case 'cross':
        ctx.moveTo(x - quarter, y - quarter);
        ctx.lineTo(x + quarter, y + quarter);
        ctx.moveTo(x + quarter, y - quarter);
        ctx.lineTo(x - quarter, y + quarter);
        break;
      case 'plus':
        ctx.moveTo(x - quarter, y);
        ctx.lineTo(x + quarter, y);
        ctx.moveTo(x, y - quarter);
        ctx.lineTo(x, y + quarter);
        break;
      case 'minus':
        ctx.moveTo(x - quarter, y);
        ctx.lineTo(x + quarter, y);
        break;
      case 'circle':
        ctx.arc(x, y, quarter, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(x - quarter, y - quarter, half, half);
        break;
      default:
        ctx.arc(x, y, quarter, 0, Math.PI * 2);
    }
    ctx.stroke();
  };

  /**
   * 绘制圆角矩形
   * 使用贝塞尔曲线绘制平滑圆角，支持 x/y 方向分别的圆角半径
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {number} x - 左上角X坐标
   * @param {number} y - 左上角Y坐标
   * @param {number} width - 宽度
   * @param {number} height - 高度
   * @param {number} rx - X方向圆角半径
   * @param {number} ry - Y方向圆角半径
   */
  const roundRect = (ctx, x, y, width, height, rx, ry) => {
    // 限制 rx/ry 在有效范围内
    rx = Math.min(rx, width);
    ry = Math.min(ry, height);

    // 如果圆角足够大（接近或超过矩形尺寸的一半），绘制为圆角胶囊形状
    if (rx >= width / 2 && ry >= height / 2) {
      // 使用两个半圆+两条直线的方式绘制
      ctx.beginPath();
      if (rx >= width && ry >= height) {
        // 完整的圆/椭圆
        ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      } else if (rx >= width / 2 && ry >= height / 2) {
        // 圆角胶囊形状：上方半圆
        ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      } else {
        // 标准圆角矩形
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + width - rx, y);
        ctx.arcTo(x + width, y, x + width, y + ry, ry);
        ctx.lineTo(x + width, y + height - ry);
        ctx.arcTo(x + width, y + height, x + width - rx, y + height, ry);
        ctx.lineTo(x + rx, y + height);
        ctx.arcTo(x, y + height, x, y + height - ry, ry);
        ctx.lineTo(x, y + ry);
        ctx.arcTo(x, y, x + rx, y, ry);
      }
      ctx.closePath();
      return;
    }

    // 标准圆角矩形
    ctx.beginPath();
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + width - rx, y);
    ctx.arcTo(x + width, y, x + width, y + ry, ry);
    ctx.lineTo(x + width, y + height - ry);
    ctx.arcTo(x + width, y + height, x + width - rx, y + height, ry);
    ctx.lineTo(x + rx, y + height);
    ctx.arcTo(x, y + height, x, y + height - ry, ry);
    ctx.lineTo(x, y + ry);
    ctx.arcTo(x, y, x + rx, y, ry);
    ctx.closePath();
  };

  /**
   * 将鼠标/触摸事件坐标转换为画布坐标
   * 处理画布缩放，确保坐标映射正确
   * @param {Event} e - 鼠标或触摸事件
   * @returns {Object} 画布坐标对象（x, y）
   */
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.value;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // 支持触摸和鼠标事件
    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  /**
   * 计算双指触摸距离
   * @param {Event} e - 触摸事件
   * @returns {number} 两指之间的距离
   */
  const getTouchDistance = (e) => {
    if (!e.touches || e.touches.length < 2) return 0;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * 检测点击位置命中的图层
   * 从顶层图层（zIndex最大）开始检测，考虑图层旋转
   * @param {number} x - 画布X坐标
   * @param {number} y - 画布Y坐标
   * @returns {Object|null} 命中的图层对象或null
   */
  const hitTestLayer = (x, y) => {
    // 按zIndex降序排列，优先检测顶层图层
    const sortedLayers = [...props.layers].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

    for (const layer of sortedLayers) {
      if (!layer.visible || layer.locked) continue;

      let hit = false;
      // 将点击坐标转换到图层本地坐标系（考虑旋转）
      const rotation = ((layer.rotation || 0) * Math.PI) / 180;
      const dx = x - layer.x;
      const dy = y - layer.y;
      const localX = dx * Math.cos(rotation) + dy * Math.sin(rotation);
      const localY = -dx * Math.sin(rotation) + dy * Math.cos(rotation);

      const bounds = getLayerBounds(layer);

      // 根据图层类型采用不同的检测方式
      switch (layer.type) {
        case 'text':
          // 文字使用矩形检测
          hit =
            localX >= -bounds.width / 2 &&
            localX <= bounds.width / 2 &&
            localY >= -bounds.height / 2 &&
            localY <= bounds.height / 2;
          break;
        case 'shape':
          // 形状使用圆形检测（以图层中心为圆心）
          hit = Math.sqrt(Math.pow(x - layer.x, 2) + Math.pow(y - layer.y, 2)) < bounds.width / 2;
          break;
        case 'icon':
          // 图标使用圆形检测
          hit = Math.sqrt(Math.pow(x - layer.x, 2) + Math.pow(y - layer.y, 2)) < bounds.width / 2;
          break;
        case 'image':
          const padding = 10;
          hit =
            localX >= -bounds.width / 2 - padding &&
            localX <= bounds.width / 2 + padding &&
            localY >= -bounds.height / 2 - padding &&
            localY <= bounds.height / 2 + padding;
          break;
      }

      if (hit) return layer;
    }
    return null;
  };

  const getLayerSize = (layer) => {
    switch (layer.type) {
      case 'text':
        return layer.fontSize || 32;
      case 'shape':
        return layer.shapeSize || 80;
      case 'icon':
        return layer.iconSize || 50;
      case 'image':
        // imageSize 是百分比，返回基于画布短边的像素值
        const imgPercent = layer.imageSize || 30;
        const imgShortSide = Math.min(props.canvasWidth, props.canvasHeight);
        return (imgPercent / 100) * imgShortSide;
      default:
        return 50;
    }
  };

  /**
   * 获取双指触摸中心点
   * @param {Event} e - 触摸事件
   * @returns {Object|null} 中心点坐标或null
   */
  const getTouchCenter = (e) => {
    if (!e.touches || e.touches.length < 2) return null;
    return {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
    };
  };

  /**
   * 获取双指连线的角度
   * @param {Event} e - 触摸事件
   * @returns {number} 角度（度）
   */
  const getTwoFingerAngle = (e) => {
    if (!e.touches || e.touches.length < 2) return 0;
    const dx = e.touches[1].clientX - e.touches[0].clientX;
    const dy = e.touches[1].clientY - e.touches[0].clientY;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  /**
   * 处理鼠标按下和触摸开始事件
   * 支持双指缩放旋转、单指旋转手柄、缩放手柄拖拽、图层拖拽四种交互模式
   * @param {Event} e - 鼠标或触摸事件
   */
  const handlePointerDown = (e) => {
    // 双指操作：同时支持缩放和旋转
    if (e.touches && e.touches.length === 2) {
      e.preventDefault();

      const center = getTouchCenter(e);
      if (center) {
        const rect = canvasRef.value?.getBoundingClientRect();
        if (rect) {
          const scaleX = canvasRef.value.width / rect.width;
          const scaleY = canvasRef.value.height / rect.height;
          const canvasX = (center.x - rect.left) * scaleX;
          const canvasY = (center.y - rect.top) * scaleY;
          // 检测中心点是否命中图层
          const hitLayer = hitTestLayer(canvasX, canvasY);
          if (hitLayer && !hitLayer.locked && hitLayer.visible) {
            isScaling.value = true;
            isRotating.value = true;
            activeLayerId.value = hitLayer.id;
            // 记录初始状态
            scaleStartDistance.value = getTouchDistance(e);
            scaleStartSize.value = getLayerSize(hitLayer);
            twoFingerStartAngle.value = getTwoFingerAngle(e);
            layerStartRotation.value = hitLayer.rotation || 0;
            emit('layerClick', hitLayer.id);
            return;
          }
        }
      }

      // 中心点未命中图层时，操作当前选中图层
      const layer = props.layers.find(l => l.id === props.selectedLayerId);
      if (!layer || layer.locked || !layer.visible) return;

      isScaling.value = true;
      isRotating.value = true;
      activeLayerId.value = layer.id;
      scaleStartDistance.value = getTouchDistance(e);
      scaleStartSize.value = getLayerSize(layer);
      twoFingerStartAngle.value = getTwoFingerAngle(e);
      layerStartRotation.value = layer.rotation || 0;
      return;
    }

    // 单指操作：鼠标或单点触摸
    const { x, y } = getCanvasCoordinates(e);
    const selectedLayer = props.layers.find(l => l.id === props.selectedLayerId);

    // 优先检测旋转手柄
    if (selectedLayer && selectedLayer.visible && !selectedLayer.locked) {
      if (hitTestRotationHandle(x, y, selectedLayer)) {
        e.preventDefault();
        isRotating.value = true;
        activeLayerId.value = selectedLayer.id;
        // 记录初始角度
        rotationStartAngle.value = (Math.atan2(y - selectedLayer.y, x - selectedLayer.x) * 180) / Math.PI;
        layerStartRotation.value = selectedLayer.rotation || 0;
        emit('layerClick', selectedLayer.id);
        return;
      }
    }

    // 检测缩放手柄
    if (selectedLayer && selectedLayer.visible && !selectedLayer.locked) {
      const handle = hitTestResizeHandle(x, y, selectedLayer);
      if (handle) {
        e.preventDefault();
        isScaling.value = true;
        activeLayerId.value = selectedLayer.id;
        resizeHandle.value = handle;
        // 记录初始状态
        resizeStartX.value = x;
        resizeStartY.value = y;
        layerStartWidth.value = getLayerSize(selectedLayer);
        layerStartHeight.value = getLayerSize(selectedLayer);
        layerStartX.value = selectedLayer.x;
        layerStartY.value = selectedLayer.y;
        return;
      }
    }

    // 检测图层点击（拖拽）
    const layer = hitTestLayer(x, y);
    if (layer) {
      e.preventDefault();
      isDragging.value = true;
      activeLayerId.value = layer.id;
      // 记录初始状态
      dragStartX.value = x;
      dragStartY.value = y;
      layerStartX.value = layer.x;
      layerStartY.value = layer.y;
      emit('layerClick', layer.id);
    }
  };

  /**
   * 处理鼠标移动和触摸移动事件
   * 根据当前交互模式执行对应的操作：双指缩放旋转、鼠标缩放、旋转手柄旋转、图层拖拽
   * @param {Event} e - 鼠标或触摸事件
   */
  const handlePointerMove = (e) => {
    // 双指操作：同时进行缩放和旋转
    if (e.touches && e.touches.length === 2 && (isScaling.value || isRotating.value)) {
      e.preventDefault();
      const layer = props.layers.find(l => l.id === activeLayerId.value);
      if (!layer) return;

      // 根据双指距离变化计算缩放比例
      const currentDistance = getTouchDistance(e);
      if (scaleStartDistance.value > 0 && currentDistance > 0) {
        const scale = currentDistance / scaleStartDistance.value;
        const shortSide = Math.min(props.canvasWidth, props.canvasHeight);
        const newSize = Math.round(scaleStartSize.value * scale);
        const updates = {};

        // 根据图层类型设置不同的尺寸限制（从常量读取）
        const limit = LAYER_SIZE_LIMITS[layer.type] || { min: 0, max: 100 };
        const minSizePx = (limit.min / 100) * shortSide;
        const maxSizePx = (limit.max / 100) * shortSide;
        const clampedSize = Math.max(minSizePx, Math.min(maxSizePx, newSize));

        switch (layer.type) {
          case 'text':
            updates.fontSize = Math.round(clampedSize);
            break;
          case 'shape':
            updates.shapeSize = Math.round(clampedSize);
            break;
          case 'icon':
            updates.iconSize = Math.round(clampedSize);
            break;
          case 'image':
            updates.imageSize = Math.max(limit.min, Math.min(limit.max, Math.round((clampedSize / shortSide) * 100)));
            break;
        }
        emit('updateLayer', layer.id, updates);
      }

      // 根据双指连线角度变化计算旋转角度
      const currentAngle = getTwoFingerAngle(e);
      const angleDelta = currentAngle - twoFingerStartAngle.value;
      const newRotation = layerStartRotation.value + angleDelta;
      emit('updateLayer', layer.id, { rotation: Math.round(newRotation * 10) / 10 });
      return;
    }

    // 鼠标缩放操作（拖拽手柄）
    if (isScaling.value && activeLayerId.value && resizeHandle.value && !e.touches) {
      handleMouseResize(e);
      return;
    }

    // 旋转操作（拖拽旋转手柄）
    if (isRotating.value && activeLayerId.value) {
      e.preventDefault();
      const { x, y } = getCanvasCoordinates(e);
      const layer = props.layers.find(l => l.id === activeLayerId.value);
      if (!layer) return;
      // 计算当前鼠标位置相对于图层中心的角度
      const currentAngle = (Math.atan2(y - layer.y, x - layer.x) * 180) / Math.PI;
      const angleDelta = currentAngle - rotationStartAngle.value;
      const newRotation = layerStartRotation.value + angleDelta;
      emit('updateLayer', layer.id, { rotation: Math.round(newRotation * 10) / 10 });
      return;
    }

    // 拖拽操作
    if (!isDragging.value || !activeLayerId.value) return;

    const { x, y } = getCanvasCoordinates(e);
    const dx = x - dragStartX.value;
    const dy = y - dragStartY.value;

    // 限制图层位置在画布范围内
    const newX = Math.max(0, Math.min(props.canvasWidth, layerStartX.value + dx));
    const newY = Math.max(0, Math.min(props.canvasHeight, layerStartY.value + dy));

    emit('updateLayer', activeLayerId.value, { x: newX, y: newY });
  };

  /**
   * 处理鼠标缩放操作（拖拽缩放手柄）
   * 考虑图层旋转，将屏幕坐标变化转换为图层本地坐标变化
   * @param {Event} e - 鼠标事件
   */
  const handleMouseResize = (e) => {
    if (!isScaling.value || !activeLayerId.value || !resizeHandle.value) return;

    e.preventDefault();
    const { x, y } = getCanvasCoordinates(e);
    const layer = props.layers.find(l => l.id === activeLayerId.value);
    if (!layer) return;

    // 获取图层旋转角度
    const rotation = ((layer.rotation || 0) * Math.PI) / 180;
    // 计算屏幕坐标变化
    const dxScreen = x - resizeStartX.value;
    const dyScreen = y - resizeStartY.value;
    
    // 使用逆旋转矩阵将屏幕坐标变化转换为图层本地坐标变化
    // 这样拖拽方向与视觉方向一致，不受旋转影响
    const dx = dxScreen * Math.cos(rotation) + dyScreen * Math.sin(rotation);
    const dy = -dxScreen * Math.sin(rotation) + dyScreen * Math.cos(rotation);

    const handle = resizeHandle.value;
    const updates = {};

    // 计算画布短边用于尺寸限制
    const shortSide = Math.min(props.canvasWidth, props.canvasHeight);

    // 根据图层类型设置不同的尺寸限制（从常量读取）
    const limit = LAYER_SIZE_LIMITS[layer.type] || { min: 0, max: 100 };
    const minSizePx = (limit.min / 100) * shortSide;
    const maxSizePx = (limit.max / 100) * shortSide;

    // 根据手柄位置计算宽度变化
    if (handle.includes('left') || handle.includes('right')) {
      const widthDelta = (handle.includes('right') ? dx : -dx);
      const newWidth = Math.max(minSizePx, Math.min(maxSizePx, layerStartWidth.value + widthDelta));
      updates.width = Math.round(newWidth);
    }

    // 根据手柄位置计算高度变化
    if (handle.includes('top') || handle.includes('bottom')) {
      const heightDelta = (handle.includes('bottom') ? dy : -dy);
      const newHeight = Math.max(minSizePx, Math.min(maxSizePx, layerStartHeight.value + heightDelta));
      updates.height = Math.round(newHeight);
    }

    const currentSize = getLayerSize(layer);
    const newSize = updates.width || updates.height || currentSize;

    // 根据图层类型更新对应的尺寸属性
    switch (layer.type) {
      case 'text':
        updates.fontSize = Math.round(Math.max(minSizePx, Math.min(maxSizePx, newSize)));
        break;
      case 'shape':
        updates.shapeSize = Math.round(Math.max(minSizePx, Math.min(maxSizePx, newSize)));
        break;
      case 'icon':
        updates.iconSize = Math.round(Math.max(minSizePx, Math.min(maxSizePx, newSize)));
        break;
      case 'image':
        updates.imageSize = Math.max(limit.min, Math.min(limit.max, Math.round((newSize / shortSide) * 100)));
        break;
    }

    emit('updateLayer', layer.id, updates);
  };

  const handlePointerUp = () => {
    isDragging.value = false;
    isScaling.value = false;
    isRotating.value = false;
    activeLayerId.value = null;
    resizeHandle.value = null;
  };

  const handleCanvasClick = e => {
    if (isDragging.value || isScaling.value || isRotating.value) return;

    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      return;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
      return;
    }

    const layer = hitTestLayer(x, y);

    if (layer) {
      emit('layerClick', layer.id);
    }
  };

  watch(
    () => ({
      layers: props.layers,
      canvasWidth: props.canvasWidth,
      canvasHeight: props.canvasHeight,
      backgroundType: props.backgroundType,
      backgroundColor: props.backgroundColor,
      gradientStartColor: props.gradientStartColor,
      gradientEndColor: props.gradientEndColor,
      gradientAngle: props.gradientAngle,
      borderRadius: props.borderRadius,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor,
      selectedLayerId: props.selectedLayerId,
    }),
    requestRedraw,
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => {
      drawLogo();
      if (canvasRef.value) {
        emit('canvasReady', canvasRef.value);
      }
    });

    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('mouseup', handlePointerUp);
    document.addEventListener('touchmove', handlePointerMove, { passive: false });
    document.addEventListener('touchend', handlePointerUp);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    if (pendingRedraw) {
      cancelAnimationFrame(pendingRedraw);
      pendingRedraw = null;
    }
    document.removeEventListener('mousemove', handlePointerMove);
    document.removeEventListener('mouseup', handlePointerUp);
    document.removeEventListener('touchmove', handlePointerMove);
    document.removeEventListener('touchend', handlePointerUp);
    document.removeEventListener('wheel', handleWheel);
    document.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = (e) => {
    const layer = props.layers.find(l => l.id === props.selectedLayerId);
    if (!layer || layer.locked || !layer.visible) return;

    if ((e.ctrlKey || e.metaKey)) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newRotation = Math.round((layer.rotation || 0) - 15);
        emit('updateLayer', layer.id, { rotation: newRotation });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newRotation = Math.round((layer.rotation || 0) + 15);
        emit('updateLayer', layer.id, { rotation: newRotation });
      }
    }
  };

  const handleWheel = (e) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      return;
    }

    e.preventDefault();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const hitLayer = hitTestLayer(x, y);
    const layer = hitLayer || props.layers.find(l => l.id === props.selectedLayerId);

    if (!layer || layer.locked || !layer.visible) return;

    const delta = e.deltaY > 0 ? -1 : 1;
    const scaleFactor = 1 + delta * 0.05;

    const shortSide = Math.min(props.canvasWidth, props.canvasHeight);
    const updates = {};
    const currentSize = getLayerSize(layer);
    const newSize = Math.round(currentSize * scaleFactor);

    // 根据图层类型设置不同的尺寸限制（从常量读取）
    const limit = LAYER_SIZE_LIMITS[layer.type] || { min: 0, max: 100 };
    const minSizePx = (limit.min / 100) * shortSide;
    const maxSizePx = (limit.max / 100) * shortSide;
    const clampedSize = Math.max(minSizePx, Math.min(maxSizePx, newSize));

    switch (layer.type) {
      case 'text':
        updates.fontSize = Math.round(clampedSize);
        break;
      case 'shape':
        updates.shapeSize = Math.round(clampedSize);
        break;
      case 'icon':
        updates.iconSize = Math.round(clampedSize);
        break;
      case 'image':
        updates.imageSize = Math.max(limit.min, Math.min(limit.max, Math.round((clampedSize / shortSide) * 100)));
        break;
    }

    emit('updateLayer', layer.id, updates);

    if (hitLayer && hitLayer.id !== props.selectedLayerId) {
      emit('layerClick', hitLayer.id);
    }
  };

  const getExportCanvas = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const {
      canvasWidth,
      canvasHeight,
      backgroundType,
      backgroundColor,
      gradientStartColor,
      gradientEndColor,
      gradientAngle,
      borderRadius,
    } = props;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.save();

    if (backgroundType === 'gradient') {
      const angle = (gradientAngle * Math.PI) / 180;
      const x1 = canvasWidth / 2 - (Math.cos(angle) * canvasWidth) / 2;
      const y1 = canvasHeight / 2 - (Math.sin(angle) * canvasHeight) / 2;
      const x2 = canvasWidth / 2 + (Math.cos(angle) * canvasWidth) / 2;
      const y2 = canvasHeight / 2 + (Math.sin(angle) * canvasHeight) / 2;
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, gradientStartColor);
      gradient.addColorStop(1, gradientEndColor);
      ctx.fillStyle = gradient;
    } else if (backgroundType === 'solid') {
      ctx.fillStyle = backgroundColor;
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.restore();
      await drawLayersOnCanvas(ctx, false);
      return canvas;
    }

    if (borderRadius > 0) {
      const rx = borderRadius;
      const ry = borderRadius;
      roundRect(ctx, 0, 0, canvasWidth, canvasHeight, rx, ry);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    ctx.restore();
    await drawLayersOnCanvas(ctx, false);
    return canvas;
  };

  const drawLayersOnCanvas = async (ctx, showSelection = true) => {
    const sortedLayers = [...props.layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    for (const layer of sortedLayers) {
      if (!layer.visible) continue;

      ctx.save();

      const rotation = ((layer.rotation || 0) * Math.PI) / 180;
      if (rotation !== 0) {
        ctx.translate(layer.x, layer.y);
        ctx.rotate(rotation);
        ctx.translate(-layer.x, -layer.y);
      }

      switch (layer.type) {
        case 'text':
          drawTextLayer(ctx, layer);
          break;
        case 'shape':
          drawShapeLayer(ctx, layer);
          break;
        case 'icon':
          drawIconLayer(ctx, layer);
          break;
        case 'image':
          await drawImageLayer(ctx, layer);
          break;
      }

      ctx.restore();
    }
  };

  defineExpose({
    getCanvas: () => canvasRef.value,
    getExportCanvas,
  });
</script>

<style lang="less" scoped>
  .logo-preview-card {
    margin-bottom: var(--spacing-md);

    :deep(.card-body) {
      padding: 0;
    }
  }

  .preview-container {
    display: flex;
    justify-content: center;
    padding: var(--spacing-md);
    background: repeating-conic-gradient(
        var(--color-bg-tertiary) 0% 25%,
        var(--color-bg-secondary) 0% 50%
      )
      50% / 16px 16px;
    border-radius: var(--radius-lg);
    align-items: center;

    canvas {
      max-width: 100%;
      height: auto;
      cursor: pointer;
    }
  }
</style>
