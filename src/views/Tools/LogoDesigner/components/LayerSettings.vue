<template>
  <ToolCard
    v-if="layer"
    icon="records-o"
    :title="t('tools.logoDesigner.layerSettings')"
    collapsible
    default-collapsed
    class="layer-settings-card"
  >
    <div class="settings-content">
      <div class="setting-field">
        <van-field
          :label="t('tools.logoDesigner.layerName')"
          :model-value="layer.name"
          @update:model-value="updateProp('name', $event)"
        />
      </div>

      <SettingSlider
        v-model="localPositionX"
        :label="t('tools.logoDesigner.positionX')"
        :min="0"
        :max="100"
        :step="0.01"
        unit="%"
        @change="updatePositionX"
      />

      <SettingSlider
        v-model="localPositionY"
        :label="t('tools.logoDesigner.positionY')"
        :min="0"
        :max="100"
        :step="0.01"
        unit="%"
        @change="updatePositionY"
      />

      <SettingSlider
        v-model="localRotation"
        :label="t('tools.logoDesigner.rotation')"
        :min="-90"
        :max="270"
        :step="1"
        unit="°"
        @change="updateProp('rotation', $event)"
      />

      <template v-if="layer.type === 'text'">
        <div class="setting-field">
          <van-field
            :label="t('tools.logoDesigner.textContent')"
            :model-value="layer.content"
            :placeholder="t('tools.logoDesigner.textContentPlaceholder')"
            @update:model-value="updateProp('content', $event)"
          />
        </div>

        <div class="setting-field">
          <van-field
            :label="t('tools.logoDesigner.font')"
            :model-value="layer.font"
            readonly
            right-icon="arrow"
            @click="showFontSheet = true"
          />
        </div>

        <SettingSlider
          v-model="localFontSize"
          :label="t('tools.logoDesigner.fontSize')"
          :min="0"
          :max="LAYER_SIZE_LIMITS.text.max"
          :step="0.01"
          unit="%"
          @change="updateFontSizeFromPercent"
        />

        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.textColor')">
            <template #input>
              <ColorPicker :model-value="layer.color" @update:model-value="updateProp('color', $event)" />
            </template>
          </van-field>
        </div>

        <div class="setting-field">
          <van-field
            :label="t('tools.logoDesigner.textStyle')"
            :model-value="currentTextStyle"
            readonly
            right-icon="arrow"
            @click="showStyleSheet = true"
          />
        </div>

        <SettingSlider
          v-model="localFontWeight"
          :label="t('tools.logoDesigner.fontWeight')"
          :min="100"
          :max="900"
          :step="100"
          @change="updateProp('weight', String($event))"
        />
      </template>

      <template v-else-if="layer.type === 'shape'">
        <div class="setting-field">
          <van-field
            :label="t('tools.logoDesigner.shape')"
            :model-value="currentShapeType"
            readonly
            right-icon="arrow"
            @click="showShapeSheet = true"
          />
        </div>

        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.shapeColor')">
            <template #input>
              <ColorPicker :model-value="layer.shapeColor" @update:model-value="updateProp('shapeColor', $event)" />
            </template>
          </van-field>
        </div>

        <SettingSlider
          v-model="localShapeSize"
          :label="t('tools.logoDesigner.shapeSize')"
          :min="0"
          :max="LAYER_SIZE_LIMITS.shape.max"
          :step="0.01"
          unit="%"
          @change="updateShapeSizeFromPercent"
        />

        <SettingSlider
          v-model="localShapeOpacity"
          :label="t('tools.logoDesigner.opacity')"
          :min="0"
          :max="100"
          :step="1"
          unit="%"
          @change="updateProp('shapeOpacity', $event)"
        />
      </template>

      <template v-else-if="layer.type === 'icon'">
        <div class="setting-field">
          <van-field
            :label="t('tools.logoDesigner.icon')"
            :model-value="currentIconType"
            readonly
            right-icon="arrow"
            @click="showIconSheet = true"
          />
        </div>

        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.iconColor')">
            <template #input>
              <ColorPicker :model-value="layer.iconColor" @update:model-value="updateProp('iconColor', $event)" />
            </template>
          </van-field>
        </div>

        <SettingSlider
          v-model="localIconSize"
          :label="t('tools.logoDesigner.iconSize')"
          :min="0"
          :max="LAYER_SIZE_LIMITS.icon.max"
          :step="0.01"
          unit="%"
          @change="updateIconSizeFromPercent"
        />
      </template>

      <template v-else-if="layer.type === 'image'">
        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.uploadImage')">
            <template #input>
              <van-uploader
                v-model="imageFileList"
                :after-read="handleImageRead"
                :before-delete="handleImageDelete"
                :accept="'image/*'"
                :max-count="1"
                :preview-size="60"
              >
                <template #default>
                  <div class="upload-btn-small">
                    <van-icon name="plus" />
                  </div>
                </template>
              </van-uploader>
            </template>
          </van-field>
        </div>

        <template v-if="layer.imageUrl">
          <SettingSlider
            v-model="localImageSize"
            :label="t('tools.logoDesigner.imageSize')"
            :min="LAYER_SIZE_LIMITS.image.min"
            :max="LAYER_SIZE_LIMITS.image.max"
            :step="0.01"
            unit="%"
            @change="updateImageSizeFromPercent"
          />

          <SettingSlider
            v-model="localImageOpacity"
            :label="t('tools.logoDesigner.opacity')"
            :min="0"
            :max="100"
            :step="1"
            unit="%"
            @change="updateImageOpacity"
          />
        </template>
      </template>
    </div>

    <van-action-sheet
      v-model:show="showFontSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="fontOptions"
      @select="handleFontSelect"
    />
    <van-action-sheet
      v-model:show="showStyleSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="styleOptions"
      @select="handleStyleSelect"
    />
    <van-action-sheet
      v-model:show="showWeightSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="weightOptions"
      @select="handleWeightSelect"
    />
    <van-action-sheet
      v-model:show="showShapeSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="shapeOptions"
      @select="handleShapeSelect"
    />
    <van-action-sheet
      v-model:show="showIconSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="iconOptions"
      @select="handleIconSelect"
    />
  </ToolCard>
</template>

<script setup>
import { ref, computed, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Field as VanField,
  ActionSheet as VanActionSheet,
  Uploader as VanUploader,
} from 'vant';
import SettingSlider from './SettingSlider.vue';
import ColorPicker from './ColorPicker.vue';
import { LAYER_SIZE_LIMITS } from '../js/constants';
import ToolCard from '../../components/ToolCard.vue';

const { t } = useI18n();

/**
 * 组件属性定义
 * @property {Object} layer - 当前选中的图层对象
 * @property {Number} canvasWidth - 画布宽度
 * @property {Number} canvasHeight - 画布高度
 * @property {Array} fontOptions - 字体选项列表
 * @property {Array} styleOptions - 文字样式选项列表
 * @property {Array} weightOptions - 字重选项列表
 * @property {Array} shapeOptions - 形状选项列表
 * @property {Array} iconOptions - 图标选项列表
 */
const props = defineProps({
  layer: { type: Object, default: null },
  canvasWidth: { type: Number, default: 300 },
  canvasHeight: { type: Number, default: 200 },
  fontOptions: { type: Array, default: () => [] },
  styleOptions: { type: Array, default: () => [] },
  weightOptions: { type: Array, default: () => [] },
  shapeOptions: { type: Array, default: () => [] },
  iconOptions: { type: Array, default: () => [] },
});

/**
 * 组件事件定义
 * @event updateLayer - 更新图层属性
 * @event imageUpload - 图片上传
 */
const emit = defineEmits(['updateLayer', 'imageUpload']);

/** 本地位置X（百分比） */
const localPositionX = ref(50);
/** 本地位置Y（百分比） */
const localPositionY = ref(50);
/** 本地旋转角度 */
const localRotation = ref(0);
/** 本地字体大小（百分比 = layer.fontSize / 画布短边 * 100） */
const localFontSize = ref(10);
/** 本地字重 */
const localFontWeight = ref(400);
/** 本地形状大小（百分比） */
const localShapeSize = ref(20);
/** 本地形状透明度 */
const localShapeOpacity = ref(100);
/** 本地图标大小（百分比） */
const localIconSize = ref(15);
/** 图片上传文件列表 */
const imageFileList = ref([]);

/** 画布短边（用于将像素转百分比） */
const canvasShortSide = computed(() => Math.max(1, Math.min(props.canvasWidth, props.canvasHeight)));

/** 本地图片大小（百分比） */
const localImageSize = ref(30);
/** 本地图片透明度 */
const localImageOpacity = ref(100);

/** 字体选择弹窗状态 */
const showFontSheet = ref(false);
/** 文字样式选择弹窗状态 */
const showStyleSheet = ref(false);
/** 字重选择弹窗状态 */
const showWeightSheet = ref(false);
/** 形状选择弹窗状态 */
const showShapeSheet = ref(false);
/** 图标选择弹窗状态 */
const showIconSheet = ref(false);

/**
 * 监听图层变化，同步本地状态
 * 将图层的绝对位置/尺寸转换为百分比显示
 * 使用深度监听确保图层属性变化时也能同步
 */
watch(
  () => props.layer,
  (newLayer) => {
    if (newLayer) {
      localPositionX.value = props.canvasWidth > 0 ? (newLayer.x / props.canvasWidth) * 100 : 50;
      localPositionY.value = props.canvasHeight > 0 ? (newLayer.y / props.canvasHeight) * 100 : 50;
      localRotation.value = newLayer.rotation || 0;
      const shortSide = Math.max(1, Math.min(props.canvasWidth, props.canvasHeight));
      localFontSize.value = ((newLayer.fontSize || 48) / shortSide) * 100;
      localFontWeight.value = parseInt(newLayer.weight) || 400;
      localShapeSize.value = ((newLayer.shapeSize || 80) / shortSide) * 100;
      localShapeOpacity.value = newLayer.shapeOpacity || 100;
      localIconSize.value = ((newLayer.iconSize || 50) / shortSide) * 100;
      localImageSize.value = newLayer.imageSize || 30;
      localImageOpacity.value = newLayer.imageOpacity || 100;
      imageFileList.value = newLayer.imageUrl ? [{ content: newLayer.imageUrl }] : [];
    }
  },
  { immediate: true, deep: true }
);

/**
 * 监听画布宽度变化，更新位置X的百分比
 */
watch(
  () => props.canvasWidth,
  () => {
    if (props.layer) {
      localPositionX.value = props.canvasWidth > 0 ? (props.layer.x / props.canvasWidth) * 100 : 50;
    }
  }
);

/**
 * 监听画布高度变化，更新位置Y的百分比
 */
watch(
  () => props.canvasHeight,
  () => {
    if (props.layer) {
      localPositionY.value = props.canvasHeight > 0 ? (props.layer.y / props.canvasHeight) * 100 : 50;
    }
  }
);

/**
 * 当前文字样式名称
 * @returns {string} 样式名称
 */
const currentTextStyle = computed(() => {
  if (!props.layer || props.layer.type !== 'text') return '';
  return props.styleOptions.find((o) => o.value === props.layer.style)?.name || '';
});

/**
 * 当前形状类型名称
 * @returns {string} 形状名称
 */
const currentShapeType = computed(() => {
  if (!props.layer || props.layer.type !== 'shape') return '';
  return props.shapeOptions.find((o) => o.value === props.layer.shapeType)?.name || '';
});

/**
 * 当前图标类型名称
 * @returns {string} 图标名称
 */
const currentIconType = computed(() => {
  if (!props.layer || props.layer.type !== 'icon') return '';
  return props.iconOptions.find((o) => o.value === props.layer.iconType)?.name || '';
});

/**
 * 更新位置X
 * 将百分比转换为绝对像素值
 * @param {number} percent - 百分比值
 */
const updatePositionX = (percent) => {
  localPositionX.value = percent;
  const newX = Math.round((percent / 100) * props.canvasWidth);
  updateProp('x', newX);
};

/**
 * 更新位置Y
 * 将百分比转换为绝对像素值
 * @param {number} percent - 百分比值
 */
const updatePositionY = (percent) => {
  localPositionY.value = percent;
  const newY = Math.round((percent / 100) * props.canvasHeight);
  updateProp('y', newY);
};

/**
 * 更新图层属性
 * @param {string} prop - 属性名
 * @param {*} value - 属性值
 */
const updateProp = (prop, value) => {
  if (props.layer) {
    emit('updateLayer', props.layer.id, { [prop]: value });
  }
};

/**
 * 将百分比转换为画布短边对应的像素值
 * @param {number} percent - 百分比（0-100）
 * @returns {number} 像素值
 */
const percentToPx = (percent) => {
  return Math.round((Number(percent) / 100) * canvasShortSide.value);
};

/**
 * 处理字体大小变化（百分比 → 像素）
 * @param {number} percent - 百分比值
 */
const updateFontSizeFromPercent = (percent) => {
  updateProp('fontSize', percentToPx(percent));
};

/**
 * 处理形状大小变化（百分比 → 像素）
 * @param {number} percent - 百分比值
 */
const updateShapeSizeFromPercent = (percent) => {
  updateProp('shapeSize', percentToPx(percent));
};

/**
 * 处理图标大小变化（百分比 → 像素）
 * @param {number} percent - 百分比值
 */
const updateIconSizeFromPercent = (percent) => {
  updateProp('iconSize', percentToPx(percent));
};

/**
 * 处理图片大小变化（百分比）
 * @param {number} percent - 百分比值
 */
const updateImageSizeFromPercent = (percent) => {
  updateProp('imageSize', Math.round(Number(percent)));
};

/**
 * 处理图片透明度变化
 * @param {number} percent - 百分比值
 */
const updateImageOpacity = (percent) => {
  updateProp('imageOpacity', Math.round(Number(percent)));
};

/**
 * 处理字体选择
 * @param {Object} option - 选中的字体选项
 */
const handleFontSelect = (option) => {
  updateProp('font', option.value);
  showFontSheet.value = false;
};

/**
 * 处理文字样式选择
 * @param {Object} option - 选中的样式选项
 */
const handleStyleSelect = (option) => {
  updateProp('style', option.value);
  showStyleSheet.value = false;
};

/**
 * 处理字重选择
 * @param {Object} option - 选中的字重选项
 */
const handleWeightSelect = (option) => {
  updateProp('weight', option.value);
  showWeightSheet.value = false;
};

/**
 * 处理形状选择
 * @param {Object} option - 选中的形状选项
 */
const handleShapeSelect = (option) => {
  updateProp('shapeType', option.value);
  showShapeSheet.value = false;
};

/**
 * 处理图标选择
 * @param {Object} option - 选中的图标选项
 */
const handleIconSelect = (option) => {
  updateProp('iconType', option.value);
  showIconSheet.value = false;
};

/**
 * 处理图片读取
 * 读取文件并转换为DataURL，同时触发上传事件
 * @param {Object} file - 文件对象
 */
const handleImageRead = (file) => {
  if (file.file && props.layer) {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.content = e.target.result;
      imageFileList.value = [file];
    };
    reader.readAsDataURL(file.file);
    emit('imageUpload', props.layer.id, file.file);
  }
};

/**
 * 处理图片删除
 * 清空文件列表并重置图片属性
 * @returns {boolean} 始终返回true允许删除
 */
const handleImageDelete = () => {
  imageFileList.value = [];
  if (props.layer) {
    emit('updateLayer', props.layer.id, { imageUrl: null, imageSize: 30 });
  }
  return true;
};
</script>

<style lang="less" scoped>
.layer-settings-card {
  margin-bottom: var(--spacing-md);
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.setting-field {
  :deep(.van-field) {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;

    &::after {
      display: none !important;
    }

    .van-field__label {
      font-size: var(--font-size-sm) !important;
      color: var(--color-text-secondary) !important;
      width: auto !important;
      min-width: 80px !important;
    }

    .van-field__value {
      font-size: var(--font-size-sm) !important;
      color: var(--color-text-primary) !important;
    }

    .van-field__right-icon {
      font-size: 14px !important;
      color: var(--color-text-tertiary) !important;
    }

    .van-field__control {
      text-align: right !important;
    }
  }
}

.upload-btn-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-tertiary);

  .van-icon-plus {
    font-size: 20px;
    color: var(--color-text-tertiary);
  }
}

:deep(.van-uploader__preview) {
  margin: 0;

  .van-uploader__preview-image {
    border-radius: var(--radius-md);
  }
}
</style>