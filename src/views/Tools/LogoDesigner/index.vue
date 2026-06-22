<template>
  <div class="logo-designer">
    <LogoPreview
      ref="logoPreviewRef"
      :layers="sortedLayers"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :background-type="backgroundType"
      :background-color="backgroundColor"
      :gradient-start-color="gradientStartColor"
      :gradient-end-color="gradientEndColor"
      :gradient-angle="gradientAngle"
      :border-radius="borderRadius"
      :selected-layer-id="selectedLayerId"
      @layer-click="selectLayer"
      @update-layer="updateLayer"
    >
      <template #header-suffix>
        <van-button
          plain
          type="danger"
          size="mini"
          icon="arrow-double-left"
          :disabled="!canUndo"
          @click="undo"
        >
          {{ t('tools.logoDesigner.undo') }}
        </van-button>
        <van-button
          plain
          type="primary"
          size="mini"
          icon="arrow-double-right"
          :disabled="!canRedo"
          @click="redo"
        >
          {{ t('tools.logoDesigner.redo') }}
        </van-button>
      </template>
    </LogoPreview>

    <LayerPanel
      :layers="layers"
      :selected-layer-id="selectedLayerId"
      @select-layer="selectLayer"
      @copy-layer="copyLayer"
      @delete-layer="deleteLayer"
      @toggle-visibility="toggleLayerVisibility"
      @toggle-lock="toggleLayerLock"
      @update-layer-name="updateLayerName"
      @reorder-layers="handleReorderLayers"
    >
      <template #header-suffix>
        <van-button type="primary" size="mini" plain icon="plus" @click="showAddLayerSheet = true">
          {{ t('tools.logoDesigner.addLayer') }}
        </van-button>
      </template>
    </LayerPanel>

    <LayerSettings
      :layer="selectedLayer"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :font-options="fontOptions"
      :style-options="styleOptions"
      :weight-options="weightOptions"
      :shape-options="shapeOptions"
      :icon-options="iconOptions"
      @update-layer="updateLayer"
      @image-upload="handleImageUpload"
    />

    <CanvasSettings
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :lock-aspect-ratio="lockAspectRatio"
      :current-aspect-ratio="currentAspectRatio"
      :background-type="backgroundType"
      :background-color="backgroundColor"
      :gradient-start-color="gradientStartColor"
      :gradient-end-color="gradientEndColor"
      :gradient-angle="gradientAngle"
      :current-background-type="currentBackgroundType"
      :border-radius="borderRadius"
      :current-format="currentFormat"
      :current-preset="currentPreset"
      @width-change="widthChange"
      @height-change="heightChange"
      @ratio-select="handleRatioSelect"
      @preset-select="handlePresetSelect"
      @update:lock-aspect-ratio="setLockAspectRatio"
      @update:background-type="setBackgroundType"
      @update:border-radius="setBorderRadius"
      @update:background-color="setBackgroundColor"
      @update:gradient-start-color="setGradientStartColor"
      @update:gradient-end-color="setGradientEndColor"
      @update:gradient-angle="setGradientAngle"
    />

    <ExportSettings
      :current-format="currentFormat"
      @update:format="handleFormatChange"
      @export="handleExport"
      @reset="handleReset"
    />

    <AddLayerSheet
      v-model:show="showAddLayerSheet"
      :layer-type-options="layerTypeOptions"
      :shape-options="shapeOptions"
      :icon-options="iconOptions"
      @layer-added="handleLayerAdded"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLogoDesigner } from './hooks/useLogoDesigner';
import LogoPreview from './components/LogoPreview.vue';
import CanvasSettings from './components/CanvasSettings.vue';
import LayerPanel from './components/LayerPanel.vue';
import LayerSettings from './components/LayerSettings.vue';
import ExportSettings from './components/ExportSettings.vue';
import AddLayerSheet from './components/AddLayerSheet.vue';

const { t } = useI18n();

const {
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
} = useLogoDesigner();

const handleReorderLayers = (newOrder) => {
  reorderLayers(newOrder);
};

const logoPreviewRef = ref(null);

const handleExport = async () => {
  const canvas = await logoPreviewRef.value?.getExportCanvas();
  handleDownload(canvas);
};

const handleFormatChange = (format) => {
  setExportFormat(format);
};

const ratioMap = {
  '1': 1,
  '1.5': 1.5,
  '1.333': 1.333,
  '1.778': 1.778,
  '0.5625': 0.5625,
  '2': 2,
};

const handleRatioSelect = (ratio) => {
  const ratioValue = ratioMap[String(ratio)] || ratio;
  if (ratioValue) {
    setAspectRatio(ratioValue);
    const newHeight = Math.round(canvasWidth.value / ratioValue);
    heightChange(Math.max(100, Math.min(1920, newHeight)));
  }
};

const handleLayerAdded = (layerData) => {
  addLayer(layerData.type, layerData);
};

const handleKeydown = (e) => {
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
  
  if (ctrlKey && e.key === 'z') {
    if (e.shiftKey) {
      redo();
    } else {
      undo();
    }
    e.preventDefault();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style lang="less" scoped>
.logo-designer {
  padding: var(--spacing-md);
}
</style>