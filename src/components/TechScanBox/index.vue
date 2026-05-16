<template>
  <canvas ref="canvasRef" class="tech-scan-canvas"></canvas>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const props = defineProps({
    value: {
      type: [String, Number],
      required: true,
    },
    width: {
      type: Number,
      default: 60,
    },
    height: {
      type: Number,
      default: 80,
    },
    scanSpeed: {
      type: Number,
      default: 2000,
    },
    gridSize: {
      type: Number,
      default: 8,
    },
    color: {
      type: String,
      default: '#00ffff',
    },
  });

  const canvasRef = ref(null);
  let animationId = null;

  // 绘制科技感数字
  const drawTechNumber = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制网格背景
    ctx.strokeStyle = `${props.color}1a`; // 10% 透明度
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += props.gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += props.gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 设置字体
    ctx.font = `bold ${height * 0.6}px 'Courier New', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = props.value;
    const centerX = width / 2;
    const centerY = height / 2;

    // 绘制外层发光效果
    ctx.shadowColor = props.color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = `${props.color}4d`; // 30% 透明度
    ctx.fillText(text, centerX, centerY);

    // 绘制中层发光效果
    ctx.shadowBlur = 10;
    ctx.fillStyle = `${props.color}80`; // 50% 透明度
    ctx.fillText(text, centerX, centerY);

    // 绘制渐变主文字
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, props.color);
    gradient.addColorStop(1, '#0080ff');

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.fillStyle = gradient;
    ctx.fillText(text, centerX, centerY);

    // 绘制数字边缘高光
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    ctx.strokeText(text, centerX, centerY);

    // 绘制扫描线
    const scanProgress = (Date.now() % props.scanSpeed) / props.scanSpeed;
    const scanY = scanProgress * height;

    // 扫描线主体
    const scanGradient = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
    scanGradient.addColorStop(0, 'transparent');
    scanGradient.addColorStop(0.5, `${props.color}99`); // 60% 透明度
    scanGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = scanGradient;
    ctx.fillRect(0, scanY - 10, width, 20);

    // 扫描线高亮
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(0, scanY, width, 2);

    // 绘制角落装饰
    const cornerSize = 8;
    ctx.strokeStyle = `${props.color}99`; // 60% 透明度
    ctx.lineWidth = 2;

    // 左上角
    ctx.beginPath();
    ctx.moveTo(0, cornerSize);
    ctx.lineTo(0, 0);
    ctx.lineTo(cornerSize, 0);
    ctx.stroke();

    // 右上角
    ctx.beginPath();
    ctx.moveTo(width - cornerSize, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, cornerSize);
    ctx.stroke();

    // 左下角
    ctx.beginPath();
    ctx.moveTo(0, height - cornerSize);
    ctx.lineTo(0, height);
    ctx.lineTo(cornerSize, height);
    ctx.stroke();

    // 右下角
    ctx.beginPath();
    ctx.moveTo(width - cornerSize, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, height - cornerSize);
    ctx.stroke();
  };

  // 启动动画
  const startAnimation = () => {
    const animate = () => {
      drawTechNumber();
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  // 监听数值变化
  watch(
    () => props.value,
    () => {
      drawTechNumber();
    }
  );

  onMounted(() => {
    // 初始化Canvas尺寸
    if (canvasRef.value) {
      canvasRef.value.width = props.width;
      canvasRef.value.height = props.height;
    }

    drawTechNumber();
    startAnimation();
  });

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
</script>

<style lang="less" scoped>
  .tech-scan-canvas {
    display: block;
  }
</style>
