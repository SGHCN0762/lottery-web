<template>
  <van-action-sheet
    v-model:show="showSheet"
    :cancel-text="t('common.cancel')"
    close-on-click-action
    :actions="layerTypeOptions"
    @select="handleSelectType"
  />

  <!-- 文字输入弹窗 -->
  <van-popup v-model:show="showTextDialog" position="bottom" :style="{ height: '38%' }" round>
    <div class="edit-popup">
      <van-nav-bar
        :title="t('tools.logoDesigner.addLayerText')"
        :left-text="t('common.cancel')"
        :right-text="t('common.confirm')"
        @click-left="closeTextDialog"
        @click-right="confirmText"
      />
      <div class="edit-form">
        <van-field
          v-model="textInput"
          :placeholder="t('tools.logoDesigner.textContentPlaceholder')"
          type="textarea"
          rows="4"
          autosize
        />
      </div>
    </div>
  </van-popup>

  <!-- 隐藏的文件选择器：支持多选图片 -->
  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    multiple
    style="display: none"
    @change="handleFileChange"
  />

  <!-- 形状选择弹窗 -->
  <van-popup v-model:show="showShapeDialog" position="bottom" :style="{ height: '55%' }" round>
    <div class="edit-popup">
      <van-nav-bar
        :title="t('tools.logoDesigner.addLayerShape')"
        :left-text="t('common.cancel')"
        :right-text="t('common.confirm')"
        @click-left="closeShapeDialog"
        @click-right="confirmShape"
      />
      <div class="edit-form">
        <div class="select-grid">
          <div
            v-for="opt in shapeOptions"
            :key="opt.value"
            class="select-item"
            :class="{ active: selectedShape === opt.value }"
            @click="selectedShape = opt.value"
          >
            <ShapePreview :type="opt.value" />
            <span class="select-item-name">{{ opt.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-popup>

  <!-- 图标选择弹窗 -->
  <van-popup v-model:show="showIconDialog" position="bottom" :style="{ height: '55%' }" round>
    <div class="edit-popup">
      <van-nav-bar
        :title="t('tools.logoDesigner.addLayerIcon')"
        :left-text="t('common.cancel')"
        :right-text="t('common.confirm')"
        @click-left="closeIconDialog"
        @click-right="confirmIcon"
      />
      <div class="edit-form">
        <div class="select-grid">
          <div
            v-for="opt in iconOptions"
            :key="opt.value"
            class="select-item"
            :class="{ active: selectedIcon === opt.value }"
            @click="selectedIcon = opt.value"
          >
            <IconPreview :type="opt.value" />
            <span class="select-item-name">{{ opt.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ShapePreview from './ShapePreview.vue';
import IconPreview from './IconPreview.vue';

const { t } = useI18n();

/**
 * 组件属性定义
 * @property {Array} layerTypeOptions - 图层类型选项列表
 * @property {Array} shapeOptions - 形状选项列表
 * @property {Array} iconOptions - 图标选项列表
 */
const props = defineProps({
  layerTypeOptions: { type: Array, required: true },
  shapeOptions: { type: Array, required: true },
  iconOptions: { type: Array, required: true },
});

/**
 * 组件事件定义
 * @event layerAdded - 添加图层成功
 */
const emit = defineEmits(['layerAdded']);

/**
 * 主弹窗显示状态（双向绑定）
 */
const showSheet = defineModel('show', { type: Boolean, default: false });

/**
 * 文字输入弹窗显示状态
 */
const showTextDialog = ref(false);

/**
 * 形状选择弹窗显示状态
 */
const showShapeDialog = ref(false);

/**
 * 图标选择弹窗显示状态
 */
const showIconDialog = ref(false);

/**
 * 文字输入内容
 */
const textInput = ref('');

/**
 * 当前选中的形状类型
 */
const selectedShape = ref('circle');

/**
 * 当前选中的图标类型
 */
const selectedIcon = ref('check');

/**
 * 文件选择器引用
 */
const fileInputRef = ref(null);

/**
 * 处理图层类型选择
 * 根据选择的类型打开对应的编辑弹窗或文件选择器
 * @param {Object} action - 选中的菜单项
 */
const handleSelectType = (action) => {
  showSheet.value = false;
  const type = action.value;

  switch (type) {
    case 'text':
      textInput.value = '';
      showTextDialog.value = true;
      break;
    case 'image':
      // 直接打开文件选择器，支持多选
      fileInputRef.value?.click();
      break;
    case 'shape':
      selectedShape.value = 'circle';
      showShapeDialog.value = true;
      break;
    case 'icon':
      selectedIcon.value = 'check';
      showIconDialog.value = true;
      break;
  }
};

/**
 * 关闭文字输入弹窗
 */
const closeTextDialog = () => {
  showTextDialog.value = false;
  textInput.value = '';
};

/**
 * 确认添加文字图层
 * 如果输入为空，默认使用 'TEXT' 作为内容
 */
const confirmText = () => {
  const content = textInput.value.trim() || 'TEXT';
  showTextDialog.value = false;
  emit('layerAdded', {
    type: 'text',
    content,
    font: 'Arial',
    fontSize: 32,
    color: '#333333',
    style: 'normal',
    weight: '400',
  });
};

/**
 * 读取图片文件并转换为 DataURL
 * 同时计算缩放后的尺寸（最大300px）
 * @param {File} file - 图片文件
 * @returns {Promise<Object|null>} 包含图片URL和尺寸信息的对象
 */
const readImageData = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result || '';
    const img = new Image();
    img.onload = () => {
      const maxSize = 300;
      let width = img.width;
      let height = img.height;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      resolve({
        url: result,
        width,
        height,
        originalWidth: img.width,
        originalHeight: img.height,
      });
    };
    img.onerror = () => resolve(null);
    img.src = result;
  };
  reader.onerror = () => resolve(null);
  reader.readAsDataURL(file);
});

/**
 * 处理文件选择变化
 * 支持多选图片，每张图片单独创建一个图层
 * @param {Event} event - 文件选择事件
 */
const handleFileChange = async (event) => {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  for (const file of files) {
    const data = await readImageData(file);
    if (!data) continue;
    emit('layerAdded', {
      type: 'image',
      imageUrl: data.url,
      imageWidth: data.width,
      imageHeight: data.height,
      imageOpacity: 100,
      originalImageWidth: data.originalWidth,
      originalImageHeight: data.originalHeight,
    });
  }

  // 重置 input，允许重复选择同一文件
  event.target.value = '';
};

/**
 * 关闭形状选择弹窗
 */
const closeShapeDialog = () => {
  showShapeDialog.value = false;
};

/**
 * 确认添加形状图层
 */
const confirmShape = () => {
  showShapeDialog.value = false;
  emit('layerAdded', {
    type: 'shape',
    shapeType: selectedShape.value,
    shapeColor: '#1989fa',
    shapeSize: 80,
    shapeOpacity: 100,
  });
};

/**
 * 关闭图标选择弹窗
 */
const closeIconDialog = () => {
  showIconDialog.value = false;
};

/**
 * 确认添加图标图层
 */
const confirmIcon = () => {
  showIconDialog.value = false;
  emit('layerAdded', {
    type: 'icon',
    iconType: selectedIcon.value,
    iconColor: '#1989fa',
    iconSize: 50,
  });
};
</script>

<style lang="less" scoped>
.edit-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.edit-form {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.image-preview {
  margin-top: var(--spacing-md);
  text-align: center;

  .preview-img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
}

.select-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.select-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }

  &.active {
    border: 2px solid var(--color-primary);
  }
}

.select-item-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-align: center;
}
</style>