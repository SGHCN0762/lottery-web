import { ref, computed } from 'vue';
import { showSuccessToast, showFailToast, showLoadingToast } from 'vant';
import { useI18n } from 'vue-i18n';
import {
  RATIO_OPTIONS,
  WEIGHT_OPTIONS,
  STYLE_OPTIONS,
  FORMAT_OPTIONS,
  SHAPE_OPTIONS,
  ICON_OPTIONS,
  CANVAS_MAX_SIZE,
  CANVAS_MIN_SIZE,
  CANVAS_PRESET_OPTIONS,
} from '../js/constants';
import { debounce } from '@/utils/lodash/debounce';

/**
 * Logo设计器核心逻辑Hook
 * 管理画布设置、图层数据、交互操作等所有状态和方法
 */
export function useLogoDesigner() {
  const { t } = useI18n();

  /** 当前画布预设 */
  const currentPreset = ref('logo_square');
  /** 画布宽度 */
  const canvasWidth = ref(500);
  /** 画布高度 */
  const canvasHeight = ref(500);
  /** 宽高比 */
  const aspectRatio = ref(1);
  /** 是否锁定宽高比 */
  const lockAspectRatio = ref(true);

  /** 背景类型：solid/gradient/transparent */
  const backgroundType = ref('solid');
  /** 纯色背景颜色 */
  const backgroundColor = ref('#FFFFFF');
  /** 渐变起始色 */
  const gradientStartColor = ref('#1989fa');
  /** 渐变结束色 */
  const gradientEndColor = ref('#E24A90');
  /** 渐变角度 */
  const gradientAngle = ref(45);

  /** 圆角半径 */
  const borderRadius = ref(0);

  /** 导出格式：png/jpeg/webp */
  const exportFormat = ref('png');

  /** 添加图层弹窗显示状态 */
  const showAddLayerSheet = ref(false);

  /** 尺寸同步锁，防止循环更新 */
  let isSyncingSize = false;

  /**
   * 图层列表
   * 每个图层包含位置、旋转、类型、样式等属性
   */
  const layers = ref([
    {
      id: 'layer-1',
      type: 'text',
      name: t('tools.logoDesigner.layertext') + '1',
      x: 250,
      y: 250,
      visible: true,
      locked: false,
      zIndex: 1,
      rotation: 0,
      content: 'LOGO',
      font: 'Arial',
      fontSize: 48,
      color: '#333333',
      style: 'normal',
      weight: '400',
    }
  ]);

  /** 当前选中的图层ID */
  const selectedLayerId = ref('layer-1');

  /** Undo栈 - 存储历史快照 */
  const undoStack = ref([]);
  /** Redo栈 - 存储撤销后的快照 */
  const redoStack = ref([]);
  /** 是否正在执行undo/redo操作 */
  const isUndoRedo = ref(false);
  /** 最大历史记录数 */
  const MAX_HISTORY = 50;

  /**
   * 当前选中的图层对象
   * @returns {Object|null} 选中的图层或null
   */
  const selectedLayer = computed(() => 
    layers.value.find(l => l.id === selectedLayerId.value) || null
  );

  /**
   * 按zIndex升序排列的图层列表
   * zIndex越小，图层越靠下
   * @returns {Array} 排序后的图层列表
   */
  const sortedLayers = computed(() => 
    [...layers.value].sort((a, b) => a.zIndex - b.zIndex)
  );

  /**
   * 检测当前运行平台
   * @returns {string} ios/android/windows/mac/unknown
   */
  const detectPlatform = () => {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }
    
    if (/Android/.test(userAgent)) {
      return 'android';
    }
    
    if (/Windows/.test(userAgent)) {
      return 'windows';
    }
    
    if (/Mac/.test(userAgent)) {
      return 'mac';
    }
    
    return 'unknown';
  };

  /**
   * 各平台商用免费字体列表
   * 根据平台返回不同的字体选项
   */
  const commercialFreeFonts = {
    ios: [
      { name: 'PingFang SC', value: 'PingFang SC' },
      { name: 'SF Pro Display', value: 'SF Pro Display' },
      { name: 'Helvetica Neue', value: 'Helvetica Neue' },
      { name: 'Arial', value: 'Arial' },
      { name: 'Georgia', value: 'Georgia' },
    ],
    mac: [
      { name: 'PingFang SC', value: 'PingFang SC' },
      { name: 'SF Pro Display', value: 'SF Pro Display' },
      { name: 'Helvetica Neue', value: 'Helvetica Neue' },
      { name: 'Arial', value: 'Arial' },
      { name: 'Georgia', value: 'Georgia' },
    ],
    android: [
      { name: 'Noto Sans SC', value: 'Noto Sans SC' },
      { name: 'Roboto', value: 'Roboto' },
      { name: 'Arial', value: 'Arial' },
      { name: 'Georgia', value: 'Georgia' },
    ],
    windows: [
      { name: 'Microsoft YaHei', value: 'Microsoft YaHei' },
      { name: 'Segoe UI', value: 'Segoe UI' },
      { name: 'Arial', value: 'Arial' },
      { name: 'Times New Roman', value: 'Times New Roman' },
      { name: 'Georgia', value: 'Georgia' },
      { name: 'Verdana', value: 'Verdana' },
    ],
    unknown: [
      { name: 'Arial', value: 'Arial' },
      { name: 'Times New Roman', value: 'Times New Roman' },
      { name: 'Georgia', value: 'Georgia' },
      { name: 'Verdana', value: 'Verdana' },
      { name: 'Courier New', value: 'Courier New' },
    ],
  };

  /**
   * 通过Canvas检测实际可用的字体
   * 对比基准字体和测试字体的渲染宽度来判断字体是否可用
   * @param {Array} platformFonts - 平台字体列表
   * @returns {Array} 实际可用的字体列表
   */
  const detectAvailableFonts = (platformFonts) => {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const availableFonts = [];

    baseFonts.forEach(baseFont => {
      ctx.font = `16px ${baseFont}`;
      const baseWidth = ctx.measureText('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').width;

      platformFonts.forEach(font => {
        ctx.font = `16px "${font.value}", ${baseFont}`;
        const testWidth = ctx.measureText('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').width;
        if (testWidth !== baseWidth) {
          if (!availableFonts.find(f => f.value === font.value)) {
            availableFonts.push(font);
          }
        }
      });
    });

    return availableFonts.length > 0 ? availableFonts : platformFonts;
  };

  /** 当前平台 */
  const platform = typeof navigator !== 'undefined' ? detectPlatform() : 'unknown';
  /** 平台字体列表 */
  const platformFonts = commercialFreeFonts[platform];
  /** 可用字体列表 */
  const availableFonts = typeof document !== 'undefined' ? detectAvailableFonts(platformFonts) : platformFonts;
  /** 字体选项（供组件使用） */
  const fontOptions = availableFonts;

  /**
   * 图层类型选项（带国际化）
   * @returns {Array} 包含文字、形状、图标、图片四种类型
   */
  const layerTypeOptions = computed(() => [
    { name: t('tools.logoDesigner.layertext'), value: 'text' },
    { name: t('tools.logoDesigner.layershape'), value: 'shape' },
    { name: t('tools.logoDesigner.layericon'), value: 'icon' },
    { name: t('tools.logoDesigner.layerimage'), value: 'image' },
  ]);

  /**
   * 文字样式选项（带国际化）
   * @returns {Array} 正常、斜体两种样式
   */
  const styleOptions = computed(() =>
    STYLE_OPTIONS.map(opt => ({
      ...opt,
      name: t(`tools.logoDesigner.textStyle${opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}`),
    }))
  );

  /** 字重选项 */
  const weightOptions = computed(() => WEIGHT_OPTIONS);

  /**
   * 形状选项（带国际化）
   * @returns {Array} 各种形状类型
   */
  const shapeOptions = computed(() =>
    SHAPE_OPTIONS.map(opt => ({
      ...opt,
      name: t(`tools.logoDesigner.shape${opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}`),
    }))
  );

  /**
   * 图标选项（带国际化）
   * @returns {Array} 各种图标类型
   */
  const iconOptions = computed(() =>
    ICON_OPTIONS.map(opt => ({
      ...opt,
      name: t(`tools.logoDesigner.icon${opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}`),
    }))
  );

  /** 背景类型选项（带国际化） */
  const backgroundOptions = [
    { name: t('tools.logoDesigner.backgroundSolid'), value: 'solid' },
    { name: t('tools.logoDesigner.backgroundGradient'), value: 'gradient' },
    { name: t('tools.logoDesigner.backgroundTransparent'), value: 'transparent' },
  ];

  /** 宽高比选项 */
  const ratioOptions = [...RATIO_OPTIONS];

  /** 当前背景类型名称 */
  const currentBackgroundType = computed(
    () => backgroundOptions.find(o => o.value === backgroundType.value)?.name || ''
  );

  /** 当前宽高比名称 */
  const currentAspectRatio = computed(
    () =>
      ratioOptions.find(o => o.value === aspectRatio.value)?.name ||
      `${canvasWidth.value}×${canvasHeight.value}`
  );

  /** 当前导出格式名称 */
  const currentFormat = computed(
    () => FORMAT_OPTIONS.find(o => o.value === exportFormat.value)?.name || ''
  );

  /**
   * 处理画布宽度变化
   * 如果锁定宽高比，自动计算并更新高度
   * @param {number} value - 新的宽度值
   */
  const widthChange = (value) => {
    if (isSyncingSize) return;
    
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    
    isSyncingSize = true;

    canvasWidth.value = Math.min(Math.max(value, CANVAS_MIN_SIZE), CANVAS_MAX_SIZE);
    if (lockAspectRatio.value && aspectRatio.value > 0) {
      let newHeight = Math.round(canvasWidth.value / aspectRatio.value);
      if (newHeight > CANVAS_MAX_SIZE) {
        canvasHeight.value = CANVAS_MAX_SIZE;
        canvasWidth.value = Math.round(CANVAS_MAX_SIZE * aspectRatio.value);
      } else if (newHeight < CANVAS_MIN_SIZE) {
        canvasHeight.value = CANVAS_MIN_SIZE;
        canvasWidth.value = Math.round(CANVAS_MIN_SIZE * aspectRatio.value);
      } else {
        canvasHeight.value = newHeight;
      }
    }

    isSyncingSize = false;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 处理画布高度变化
   * 如果锁定宽高比，自动计算并更新宽度
   * @param {number} value - 新的高度值
   */
  const heightChange = (value) => {
    if (isSyncingSize) return;
    
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    
    isSyncingSize = true;

    canvasHeight.value = Math.min(Math.max(value, CANVAS_MIN_SIZE), CANVAS_MAX_SIZE);
    if (lockAspectRatio.value && aspectRatio.value > 0) {
      let newWidth = Math.round(canvasHeight.value * aspectRatio.value);
      if (newWidth > CANVAS_MAX_SIZE) {
        canvasWidth.value = CANVAS_MAX_SIZE;
        canvasHeight.value = Math.round(CANVAS_MAX_SIZE / aspectRatio.value);
      } else if (newWidth < CANVAS_MIN_SIZE) {
        canvasWidth.value = CANVAS_MIN_SIZE;
        canvasHeight.value = Math.round(CANVAS_MIN_SIZE / aspectRatio.value);
      } else {
        canvasWidth.value = newWidth;
      }
    }

    isSyncingSize = false;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 设置宽高比
   * @param {number} ratio - 宽高比值
   */
  const setAspectRatio = (ratio) => {
    saveSnapshot();
    aspectRatio.value = ratio;
  };

  /**
   * 更新画布背景类型
   * @param {string} type - solid/gradient/transparent
   */
  const setBackgroundType = (type) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    backgroundType.value = type;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新画布背景颜色
   * @param {string} color - 颜色值
   */
  const setBackgroundColor = (color) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    backgroundColor.value = color;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新渐变起始色
   * @param {string} color - 颜色值
   */
  const setGradientStartColor = (color) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    gradientStartColor.value = color;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新渐变结束色
   * @param {string} color - 颜色值
   */
  const setGradientEndColor = (color) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    gradientEndColor.value = color;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新渐变角度
   * @param {number} angle - 角度值
   */
  const setGradientAngle = (angle) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    gradientAngle.value = angle;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新圆角半径
   * @param {number} radius - 半径值
   */
  const setBorderRadius = (radius) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    borderRadius.value = radius;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新锁定宽高比状态
   * @param {boolean} locked - 是否锁定
   */
  const setLockAspectRatio = (locked) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    lockAspectRatio.value = locked;
    debouncedSaveParamsSnapshot();
  };

  /**
   * 处理画布预设选择
   * 更新画布尺寸和宽高比，并调整现有图层位置
   * @param {string} presetValue - 预设值
   */
  const handlePresetSelect = (presetValue) => {
    currentPreset.value = presetValue;

    if (presetValue === 'custom') {
      lockAspectRatio.value = false;
      return;
    }

    const preset = CANVAS_PRESET_OPTIONS.find(p => p.value === presetValue);
    if (preset && preset.width && preset.height) {
      canvasWidth.value = preset.width;
      canvasHeight.value = preset.height;
      aspectRatio.value = preset.ratio;
      lockAspectRatio.value = true;

      layers.value.forEach(layer => {
        layer.x = Math.min(layer.x, preset.width);
        layer.y = Math.min(layer.y, preset.height);
      });
    }
  };

  /**
   * 生成当前状态的快照
   * 包含所有图层数据和选中状态
   * @returns {Object} 状态快照
   */
  const takeSnapshot = () => {
    return {
      layers: JSON.parse(JSON.stringify(layers.value)),
      selectedLayerId: selectedLayerId.value,
      canvasWidth: canvasWidth.value,
      canvasHeight: canvasHeight.value,
      backgroundType: backgroundType.value,
      backgroundColor: backgroundColor.value,
      gradientStartColor: gradientStartColor.value,
      gradientEndColor: gradientEndColor.value,
      gradientAngle: gradientAngle.value,
      borderRadius: borderRadius.value,
    };
  };

  /**
   * 保存快照到undo栈
   * 在用户操作前调用，保存操作前的状态
   */
  const saveSnapshot = () => {
    if (isUndoRedo.value) return;
    
    const snapshot = takeSnapshot();
    
    const lastSnapshot = undoStack.value[undoStack.value.length - 1];
    if (lastSnapshot && JSON.stringify(lastSnapshot) === JSON.stringify(snapshot)) {
      return;
    }
    
    undoStack.value.push(snapshot);
    
    if (undoStack.value.length > MAX_HISTORY) {
      undoStack.value.shift();
    }
    
    redoStack.value = [];
  };

  /** 是否正在进行参数调整（用于防抖快照） */
  let isEditingParams = false;
  /** 参数调整开始时的快照 */
  let paramsStartSnapshot = null;

  /**
   * 防抖保存参数调整的最终快照
   */
  const debouncedSaveParamsSnapshot = debounce(() => {
    if (paramsStartSnapshot) {
      const currentSnapshot = takeSnapshot();
      if (JSON.stringify(paramsStartSnapshot) !== JSON.stringify(currentSnapshot)) {
        undoStack.value.push(paramsStartSnapshot);
        if (undoStack.value.length > MAX_HISTORY) {
          undoStack.value.shift();
        }
        redoStack.value = [];
      }
      paramsStartSnapshot = null;
    }
    isEditingParams = false;
  }, 500);

  /**
   * 恢复快照状态
   * @param {Object} snapshot - 状态快照
   */
  const restoreSnapshot = (snapshot) => {
    layers.value = JSON.parse(JSON.stringify(snapshot.layers));
    selectedLayerId.value = snapshot.selectedLayerId;
    canvasWidth.value = snapshot.canvasWidth;
    canvasHeight.value = snapshot.canvasHeight;
    backgroundType.value = snapshot.backgroundType;
    backgroundColor.value = snapshot.backgroundColor;
    gradientStartColor.value = snapshot.gradientStartColor;
    gradientEndColor.value = snapshot.gradientEndColor;
    gradientAngle.value = snapshot.gradientAngle;
    borderRadius.value = snapshot.borderRadius;
  };

  /**
   * 撤销操作
   * 将当前状态保存到redo栈，从undo栈弹出并恢复上一个状态
   */
  const undo = () => {
    if (undoStack.value.length === 0) return;
    
    isUndoRedo.value = true;
    
    const currentSnapshot = takeSnapshot();
    redoStack.value.push(currentSnapshot);
    
    const previousSnapshot = undoStack.value.pop();
    restoreSnapshot(previousSnapshot);
    
    isUndoRedo.value = false;
  };

  /**
   * 重做操作
   * 将当前状态保存到undo栈，从redo栈弹出并恢复状态
   */
  const redo = () => {
    if (redoStack.value.length === 0) return;
    
    isUndoRedo.value = true;
    
    const currentSnapshot = takeSnapshot();
    undoStack.value.push(currentSnapshot);
    
    const nextSnapshot = redoStack.value.pop();
    restoreSnapshot(nextSnapshot);
    
    isUndoRedo.value = false;
  };

  /**
   * 是否可以撤销
   * @returns {boolean}
   */
  const canUndo = computed(() => undoStack.value.length > 0);

  /**
   * 是否可以重做
   * @returns {boolean}
   */
  const canRedo = computed(() => redoStack.value.length > 0);

  /**
   * 生成唯一的图层ID
   * @returns {string} 图层ID
   */
  const generateLayerId = () => `layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * 添加新图层
   * 根据类型创建默认属性的图层，自动选中新图层
   * @param {string|Object} action - 图层类型或包含value的对象
   * @param {Object} [layerData] - 额外的图层数据
   */
  const addLayer = (action, layerData = null) => {
    saveSnapshot();
    const type = typeof action === 'object' ? action.value : action;
    const newZIndex = layers.value.length > 0 ? Math.max(...layers.value.map(l => l.zIndex)) + 1 : 1;

    /** 获取各类型图层的默认属性 */
    const getDefaultProps = (t) => {
      switch (t) {
        case 'text':
          return { content: 'TEXT', font: 'Arial', fontSize: 32, color: '#333333', style: 'normal', weight: '400' };
        case 'shape':
          return { shapeType: 'circle', shapeColor: '#1989fa', shapeSize: 80, shapeOpacity: 100 };
        case 'icon':
          return { iconType: 'check', iconColor: '#1989fa', iconSize: 50 };
        case 'image':
          return { imageUrl: '', imageSize: 30, imageOpacity: 100, originalImageWidth: 0, originalImageHeight: 0 };
        default:
          return {};
      }
    };

    const newLayer = {
      id: generateLayerId(),
      type,
      name: t(`tools.logoDesigner.layer${type}`) + (layers.value.length + 1),
      x: canvasWidth.value / 2,
      y: canvasHeight.value / 2,
      visible: true,
      locked: false,
      zIndex: newZIndex,
      rotation: 0,
      ...getDefaultProps(type),
      ...layerData,
    };

    layers.value.push(newLayer);
    selectedLayerId.value = newLayer.id;
    showAddLayerSheet.value = false;
  };

  /**
   * 选择图层
   * 不可选择已锁定的图层
   * @param {string} layerId - 图层ID
   */
  const selectLayer = (layerId) => {
    const layer = layers.value.find(l => l.id === layerId);
    if (layer && !layer.locked) {
      selectedLayerId.value = layerId;
    }
  };

  /**
   * 复制图层
   * 创建一个与原图层相同的新图层，生成新ID，更新名称和zIndex
   * @param {string} layerId - 要复制的图层ID
   */
  const copyLayer = (layerId) => {
    saveSnapshot();
    const sourceLayer = layers.value.find(l => l.id === layerId);
    if (!sourceLayer) return;

    const newZIndex = layers.value.length > 0 ? Math.max(...layers.value.map(l => l.zIndex)) + 1 : 1;
    
    const copiedLayer = {
      ...sourceLayer,
      id: generateLayerId(),
      name: sourceLayer.name + ' ' + t('common.copy'),
      zIndex: newZIndex,
      x: sourceLayer.x + 20,
      y: sourceLayer.y + 20,
    };

    layers.value.push(copiedLayer);
    selectedLayerId.value = copiedLayer.id;
  };

  /**
   * 删除图层
   * 至少保留一个图层，删除选中图层后自动选中其他图层
   * @param {string} layerId - 图层ID
   */
  const deleteLayer = (layerId) => {
    if (layers.value.length <= 1) {
      showFailToast(t('tools.logoDesigner.minLayerError'));
      return;
    }
    saveSnapshot();
    const index = layers.value.findIndex(l => l.id === layerId);
    if (index !== -1) {
      layers.value.splice(index, 1);
      if (selectedLayerId.value === layerId) {
        selectedLayerId.value = layers.value[0]?.id || null;
      }
    }
  };

  /**
   * 切换图层可见性
   * @param {string} layerId - 图层ID
   */
  const toggleLayerVisibility = (layerId) => {
    saveSnapshot();
    const layer = layers.value.find(l => l.id === layerId);
    if (layer) {
      layer.visible = !layer.visible;
    }
  };

  /**
   * 切换图层锁定状态
   * 锁定图层后自动取消选中
   * 注意：锁定状态不影响导出结果，不记录到历史
   * @param {string} layerId - 图层ID
   */
  const toggleLayerLock = (layerId) => {
    const layer = layers.value.find(l => l.id === layerId);
    if (layer) {
      layer.locked = !layer.locked;
      if (layer.locked && selectedLayerId.value === layerId) {
        selectedLayerId.value = layers.value.find(l => !l.locked)?.id || null;
      }
    }
  };

  /**
   * 更新图层属性
   * @param {string} layerId - 图层ID
   * @param {Object} updates - 要更新的属性对象
   */
  const updateLayer = (layerId, updates) => {
    if (!isEditingParams) {
      isEditingParams = true;
      paramsStartSnapshot = takeSnapshot();
    }
    
    const layer = layers.value.find(l => l.id === layerId);
    if (layer) {
      Object.assign(layer, updates);
    }
    
    debouncedSaveParamsSnapshot();
  };

  /**
   * 更新图层名称
   * 注意：图层名称不影响导出结果，不记录到历史
   * @param {string} layerId - 图层ID
   * @param {string} name - 新名称
   */
  const updateLayerName = (layerId, name) => {
    const layer = layers.value.find(l => l.id === layerId);
    if (layer) {
      layer.name = name;
    }
  };

  /**
   * 重新排序图层
   * 根据新顺序更新每个图层的zIndex
   * @param {Array} newOrder - 新的图层顺序
   */
  const reorderLayers = (newOrder) => {
    saveSnapshot();
    newOrder.forEach((layerData) => {
      const layer = layers.value.find(l => l.id === layerData.id);
      if (layer) {
        layer.zIndex = layerData.zIndex;
      }
    });
  };

  /**
   * 处理图片上传
   * 读取图片文件，计算缩放后的尺寸，更新图层属性
   * @param {string} layerId - 图层ID
   * @param {File} file - 图片文件
   * @returns {Promise<Image>} 图片对象
   */
  const handleImageUpload = (layerId, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // 记录原始图片尺寸
          const originalWidth = img.width;
          const originalHeight = img.height;
          const aspectRatio = originalWidth / originalHeight;

          // 计算画布短边
          const shortSide = Math.min(canvasWidth.value, canvasHeight.value);

          // 计算图片显示尺寸（默认占画布短边的30%）
          const maxDisplaySize = shortSide * 0.5;
          let displayWidth, displayHeight;

          if (img.width > maxDisplaySize || img.height > maxDisplaySize) {
            if (img.width > img.height) {
              displayWidth = maxDisplaySize;
              displayHeight = Math.round(maxDisplaySize / aspectRatio);
            } else {
              displayHeight = maxDisplaySize;
              displayWidth = Math.round(maxDisplaySize * aspectRatio);
            }
          } else {
            displayWidth = img.width;
            displayHeight = img.height;
          }

          // imageSize 为图片显示宽度相对于画布短边的百分比
          const imageSize = Math.round((displayWidth / shortSide) * 100);

          saveSnapshot();
          updateLayer(layerId, {
            imageUrl: e.target.result,
            imageSize: imageSize,
            imageOpacity: 100,
            originalImageWidth: originalWidth,
            originalImageHeight: originalHeight,
          });
          resolve(img);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  /**
   * 处理导出下载
   * 将Canvas转换为Blob并触发下载
   * @param {HTMLCanvasElement} canvas - Canvas元素
   */
  const handleDownload = (canvas) => {
    if (!canvas) return;

    showLoadingToast({ message: t('tools.logoDesigner.exporting'), duration: 0 });

    const mimeType = `image/${exportFormat.value}`;

    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `logo_${Date.now()}.${exportFormat.value}`;
        link.click();
        URL.revokeObjectURL(url);
        showSuccessToast(t('tools.logoDesigner.exportSuccess'));
      } else {
        showFailToast(t('tools.logoDesigner.exportFailed'));
      }
    }, mimeType);
  };

  /**
   * 设置导出格式
   * @param {string} format - 格式：png/jpeg/webp
   */
  const setExportFormat = (format) => {
    exportFormat.value = format;
  };

  /**
   * 重置所有设置为默认值
   * 恢复初始状态，保留一个默认文字图层
   */
  const handleReset = () => {
    saveSnapshot();
    currentPreset.value = 'logo_square';
    layers.value = [{
      id: 'layer-1',
      type: 'text',
      name: t('tools.logoDesigner.layertext') + '1',
      x: 250,
      y: 250,
      visible: true,
      locked: false,
      zIndex: 1,
      rotation: 0,
      content: 'LOGO',
      font: 'Arial',
      fontSize: 48,
      color: '#333333',
      style: 'normal',
      weight: '400',
    }];
    selectedLayerId.value = 'layer-1';
    canvasWidth.value = 500;
    canvasHeight.value = 500;
    aspectRatio.value = 1;
    lockAspectRatio.value = true;
    backgroundType.value = 'solid';
    backgroundColor.value = '#FFFFFF';
    gradientStartColor.value = '#1989fa';
    gradientEndColor.value = '#E24A90';
    gradientAngle.value = 45;
    borderRadius.value = 0;
    exportFormat.value = 'png';

    showSuccessToast(t('tools.logoDesigner.resetSuccess'));
  };

  return {
    canvasWidth,
    canvasHeight,
    lockAspectRatio,
    backgroundType,
    backgroundColor,
    gradientStartColor,
    gradientEndColor,
    gradientAngle,
    borderRadius,
    showAddLayerSheet,
    layers,
    sortedLayers,
    selectedLayerId,
    selectedLayer,
    fontOptions,
    layerTypeOptions,
    styleOptions,
    weightOptions,
    shapeOptions,
    iconOptions,
    currentBackgroundType,
    currentAspectRatio,
    currentFormat,
    currentPreset,
    widthChange,
    heightChange,
    setAspectRatio,
    setExportFormat,
    setBackgroundType,
    setBackgroundColor,
    setGradientStartColor,
    setGradientEndColor,
    setGradientAngle,
    setBorderRadius,
    setLockAspectRatio,
    handlePresetSelect,
    addLayer,
    selectLayer,
    copyLayer,
    deleteLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    updateLayerName,
    updateLayer,
    reorderLayers,
    handleImageUpload,
    handleDownload,
    handleReset,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}