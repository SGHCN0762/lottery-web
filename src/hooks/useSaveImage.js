import { ref } from 'vue';

/**
 * 保存图片 hook - 使用 html2canvas
 * @returns {Object} - 包含保存方法和状态的对象
 */
export function useSaveImage() {
  const isSaving = ref(false);
  const error = ref(null);

  /**
   * 动态加载 html2canvas
   * @returns {Promise} - html2canvas 模块
   */
  const loadHtml2Canvas = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      return html2canvas;
    } catch (err) {
      console.error('加载 html2canvas 失败，请确保已安装依赖: npm install html2canvas');
      throw new Error('html2canvas 未安装，请先安装依赖');
    }
  };

  /**
   * 将 DOM 元素转换为 canvas
   * @param {HTMLElement} element - 要转换的 DOM 元素
   * @param {Object} options - html2canvas 配置选项
   * @returns {Promise<HTMLCanvasElement>} - canvas 元素
   */
  const convertToCanvas = async (element, options = {}) => {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error('无效的 DOM 元素');
    }

    const html2canvas = await loadHtml2Canvas();

    const defaultOptions = {
      backgroundColor: '#ffffff',
      useCORS: true,
      scale: window.devicePixelRatio || 2,
      logging: false,
    };

    return html2canvas(element, { ...defaultOptions, ...options });
  };

  /**
   * 将 canvas 转换为图片 URL
   * @param {HTMLCanvasElement} canvas - canvas 元素
   * @param {string} type - 图片类型 ('png', 'jpeg', 'webp')
   * @param {number} quality - 图片质量 (0-1)
   * @returns {string} - 图片 Data URL
   */
  const canvasToImageUrl = (canvas, type = 'png', quality = 0.92) => {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('无效的 canvas 元素');
    }

    const mimeType = `image/${type}`;
    return canvas.toDataURL(mimeType, quality);
  };

  /**
   * 下载图片
   * @param {string} url - 图片 URL
   * @param {string} filename - 文件名（不含扩展名）
   * @param {string} extension - 文件扩展名
   */
  const downloadImage = (url, filename = 'image', extension = 'png') => {
    const link = document.createElement('a');
    link.download = `${filename}.${extension}`;
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * 保存 DOM 元素为图片
   * @param {HTMLElement} element - 要保存的 DOM 元素
   * @param {Object} options - 配置选项
   * @param {string} options.filename - 文件名（默认 'image'）
   * @param {string} options.type - 图片类型（'png', 'jpeg', 'webp'，默认 'png'）
   * @param {number} options.quality - 图片质量（0-1，默认 0.92）
   * @param {Object} options.canvasOptions - html2canvas 额外配置
   * @returns {Promise<string>} - 图片 Data URL
   */
  const saveImage = async (element, options = {}) => {
    isSaving.value = true;
    error.value = null;

    try {
      const { filename = 'image', type = 'png', quality = 0.92, canvasOptions = {} } = options;

      const canvas = await convertToCanvas(element, canvasOptions);
      const imageUrl = canvasToImageUrl(canvas, type, quality);

      downloadImage(imageUrl, filename, type);

      return imageUrl;
    } catch (err) {
      error.value = err.message;
      console.error('保存图片失败:', err);
      throw err;
    } finally {
      isSaving.value = false;
    }
  };

  /**
   * 生成图片但不下载
   * @param {HTMLElement} element - 要转换的 DOM 元素
   * @param {Object} options - 配置选项
   * @param {string} options.type - 图片类型（默认 'png'）
   * @param {number} options.quality - 图片质量（默认 0.92）
   * @param {Object} options.canvasOptions - html2canvas 额外配置
   * @returns {Promise<string>} - 图片 Data URL
   */
  const generateImageUrl = async (element, options = {}) => {
    isSaving.value = true;
    error.value = null;

    try {
      const { type = 'png', quality = 0.92, canvasOptions = {} } = options;

      const canvas = await convertToCanvas(element, canvasOptions);
      return canvasToImageUrl(canvas, type, quality);
    } catch (err) {
      error.value = err.message;
      console.error('生成图片失败:', err);
      throw err;
    } finally {
      isSaving.value = false;
    }
  };

  return {
    isSaving,
    error,
    saveImage,
    generateImageUrl,
    convertToCanvas,
    canvasToImageUrl,
    downloadImage,
  };
}
