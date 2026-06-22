<template>
  <div class="canvas-settings">
    <div class="settings-header" @click="showSettings = !showSettings">
      <div class="header-title">
        <van-icon name="description-o" class="header-icon" />
        <span>{{ t('tools.logoDesigner.settings') }}</span>
      </div>
      <van-icon :name="showSettings ? 'arrow-up' : 'arrow-down'" />
    </div>

    <div v-show="showSettings" class="settings-content">
      <div class="setting-field">
        <van-field
          :model-value="currentPresetName"
          readonly
          right-icon="arrow"
          :label="t('tools.logoDesigner.canvasPreset')"
          @click="showPresetSheet = true"
        />
      </div>

      <template v-if="isCustomPreset">
        <div class="setting-field">
          <van-field
            :model-value="currentAspectRatio"
            readonly
            :label="t('tools.logoDesigner.aspectRatio')"
            right-icon="arrow"
            @click="showRatioSheet = true"
          />
        </div>

        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.lockAspectRatio')">
            <template #input>
              <van-switch
                :model-value="lockAspectRatio"
                size="20px"
                active-color="var(--color-primary)"
                inactive-color="var(--color-border)"
                @update:model-value="$emit('update:lockAspectRatio', $event)"
              />
            </template>
          </van-field>
        </div>

        <SettingSlider
          v-model="localWidth"
          :label="t('tools.logoDesigner.canvasWidth')"
          :min="100"
          :max="1920"
          :step="1"
          unit="px"
          @change="debouncedWidthChange"
        />

        <SettingSlider
          v-model="localHeight"
          :label="t('tools.logoDesigner.canvasHeight')"
          :min="100"
          :max="1920"
          :step="1"
          unit="px"
          @change="debouncedHeightChange"
        />
      </template>

      <div v-if="!isCustomPreset" class="preset-size-info">
        <span>{{ canvasWidth }} × {{ canvasHeight }} px</span>
      </div>

      <div class="setting-field">
        <van-field
          :model-value="currentBackgroundType"
          readonly
          right-icon="arrow"
          :label="t('tools.logoDesigner.backgroundType')"
          @click="showBgSheet = true"
        />
      </div>

      <div v-if="backgroundType === 'solid'" class="setting-field">
        <van-field :label="t('tools.logoDesigner.backgroundColor')">
          <template #input>
            <ColorPicker v-model="localBackgroundColor" @update:model-value="handleBackgroundColorChange" />
          </template>
        </van-field>
      </div>

      <template v-if="backgroundType === 'gradient'">
        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.gradientStartColor')">
            <template #input>
              <ColorPicker v-model="localGradientStartColor" @update:model-value="handleGradientStartColorChange" />
            </template>
          </van-field>
        </div>
        <div class="setting-field">
          <van-field :label="t('tools.logoDesigner.gradientEndColor')">
            <template #input>
              <ColorPicker v-model="localGradientEndColor" @update:model-value="handleGradientEndColorChange" />
            </template>
          </van-field>
        </div>
        <SettingSlider
          v-model="localGradientAngle"
          :label="t('tools.logoDesigner.gradientAngle')"
          :min="0"
          :max="360"
          :step="1"
          unit="°"
          @change="handleGradientAngleChange"
        />
      </template>

      <SettingSlider
        v-model="localBorderRadius"
        :label="t('tools.logoDesigner.borderRadius')"
        :min="BORDER_RADIUS_LIMITS.min"
        :max="BORDER_RADIUS_LIMITS.max"
        :step="0.01"
        unit="%"
        @change="handleBorderRadiusChange"
      />
    </div>

    <van-action-sheet
      v-model:show="showPresetSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="presetOptions"
      @select="handlePresetSelect"
    />

    <van-action-sheet
      v-model:show="showBgSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="backgroundOptions"
      @select="handleBgTypeSelect"
    />

    <van-action-sheet
      v-model:show="showRatioSheet"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      :actions="ratioOptions"
      @select="onRatioSelect"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Icon as VanIcon,
  Field as VanField,
  Switch as VanSwitch,
  ActionSheet as VanActionSheet,
} from 'vant';
import { debounce } from '@/utils/lodash/debounce';
import { RATIO_OPTIONS, SIZE_CHANGE_DEBOUNCE, CANVAS_PRESET_OPTIONS, BORDER_RADIUS_LIMITS } from '../js/constants';
import SettingSlider from './SettingSlider.vue';
import ColorPicker from './ColorPicker.vue';

const { t } = useI18n();

/**
 * 组件属性定义
 * @property {String} backgroundType - 背景类型：solid/gradient/transparent
 * @property {String} backgroundColor - 纯色背景颜色
 * @property {String} gradientStartColor - 渐变起始颜色
 * @property {String} gradientEndColor - 渐变结束颜色
 * @property {Number} gradientAngle - 渐变角度
 * @property {String} currentBackgroundType - 当前背景类型名称（已国际化）
 * @property {Number} canvasWidth - 画布宽度
 * @property {Number} canvasHeight - 画布高度
 * @property {Boolean} lockAspectRatio - 是否锁定宽高比
 * @property {String} currentAspectRatio - 当前宽高比名称（已国际化）
 * @property {Number} borderRadius - 圆角半径（像素）
 * @property {String} currentPreset - 当前画布预设
 */
const props = defineProps({
  backgroundType: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  gradientStartColor: { type: String, required: true },
  gradientEndColor: { type: String, required: true },
  gradientAngle: { type: Number, required: true },
  currentBackgroundType: { type: String, required: true },
  canvasWidth: { type: Number, required: true },
  canvasHeight: { type: Number, required: true },
  lockAspectRatio: { type: Boolean, required: true },
  currentAspectRatio: { type: String, required: true },
  borderRadius: { type: Number, required: true },
  currentPreset: { type: String, default: 'logo_square' },
});

/**
 * 组件事件定义
 * @event update:backgroundType - 更新背景类型
 * @event update:backgroundColor - 更新背景颜色
 * @event update:gradientStartColor - 更新渐变起始颜色
 * @event update:gradientEndColor - 更新渐变结束颜色
 * @event update:gradientAngle - 更新渐变角度
 * @event update:lockAspectRatio - 更新宽高比锁定状态
 * @event update:borderRadius - 更新圆角半径
 * @event widthChange - 宽度变化（防抖）
 * @event heightChange - 高度变化（防抖）
 * @event ratioSelect - 选择宽高比
 * @event presetSelect - 选择画布预设
 */
const emit = defineEmits([
  'update:backgroundType',
  'update:backgroundColor',
  'update:gradientStartColor',
  'update:gradientEndColor',
  'update:gradientAngle',
  'update:lockAspectRatio',
  'update:borderRadius',
  'widthChange',
  'heightChange',
  'ratioSelect',
  'presetSelect',
]);

/** 设置面板展开状态 */
const showSettings = ref(false);

/** 本地宽度值（用于双向绑定） */
const localWidth = ref(props.canvasWidth);
/** 本地高度值（用于双向绑定） */
const localHeight = ref(props.canvasHeight);
/** 本地渐变角度值 */
const localGradientAngle = ref(props.gradientAngle);
/** 本地圆角半径（百分比，相对画布短边） */
const localBorderRadius = ref(percentFromPx(props.borderRadius, props.canvasWidth, props.canvasHeight));
/** 本地背景颜色值 */
const localBackgroundColor = ref(props.backgroundColor);
/** 本地渐变起始颜色值 */
const localGradientStartColor = ref(props.gradientStartColor);
/** 本地渐变结束颜色值 */
const localGradientEndColor = ref(props.gradientEndColor);

/** 预设选择弹窗状态 */
const showPresetSheet = ref(false);
/** 背景类型选择弹窗状态 */
const showBgSheet = ref(false);
/** 宽高比选择弹窗状态 */
const showRatioSheet = ref(false);

/** 是否为自定义预设 */
const isCustomPreset = computed(() => props.currentPreset === 'custom');

/** 当前预设名称（已国际化） */
const currentPresetName = computed(() => {
  const preset = CANVAS_PRESET_OPTIONS.find(p => p.value === props.currentPreset);
  return preset ? t(`tools.logoDesigner.presets.${preset.value}`) : t('tools.logoDesigner.presets.custom');
});

/** 预设选项列表（已国际化） */
const presetOptions = computed(() =>
  CANVAS_PRESET_OPTIONS.map(opt => ({
    name: t(`tools.logoDesigner.presets.${opt.value}`, opt.name),
    value: opt.value,
    subname: opt.width && opt.height ? `${opt.width} × ${opt.height} px` : t('tools.logoDesigner.presets.customSubname'),
  }))
);

/** 背景类型选项列表（已国际化） */
const backgroundOptions = [
  { name: t('tools.logoDesigner.backgroundSolid'), value: 'solid' },
  { name: t('tools.logoDesigner.backgroundGradient'), value: 'gradient' },
  { name: t('tools.logoDesigner.backgroundTransparent'), value: 'transparent' },
];

/** 宽高比选项列表 */
const ratioOptions = [...RATIO_OPTIONS];

/** 监听画布宽度变化，同步到本地 */
watch(() => props.canvasWidth, (val) => {
  localWidth.value = val;
});

/** 监听画布高度变化，同步到本地 */
watch(() => props.canvasHeight, (val) => {
  localHeight.value = val;
});

/** 监听渐变角度变化，同步到本地 */
watch(() => props.gradientAngle, (val) => {
  localGradientAngle.value = val;
});

/**
 * 监听圆角半径变化，同步到本地
 * 将像素值转换为画布短边的百分比
 */
watch(() => props.borderRadius, (val) => {
  localBorderRadius.value = percentFromPx(val, props.canvasWidth, props.canvasHeight);
});

/**
 * 监听画布尺寸变化，重新计算圆角半径百分比
 */
watch([() => props.canvasWidth, () => props.canvasHeight], () => {
  localBorderRadius.value = percentFromPx(props.borderRadius, props.canvasWidth, props.canvasHeight);
});

/** 监听背景颜色变化，同步到本地 */
watch(() => props.backgroundColor, (val) => {
  localBackgroundColor.value = val;
});

/** 监听渐变起始颜色变化，同步到本地 */
watch(() => props.gradientStartColor, (val) => {
  localGradientStartColor.value = val;
});

/** 监听渐变结束颜色变化，同步到本地 */
watch(() => props.gradientEndColor, (val) => {
  localGradientEndColor.value = val;
});

/** 防抖处理宽度变化 */
const debouncedWidthChange = debounce((value) => {
  emit('widthChange', value);
}, SIZE_CHANGE_DEBOUNCE);

/** 防抖处理高度变化 */
const debouncedHeightChange = debounce((value) => {
  emit('heightChange', value);
}, SIZE_CHANGE_DEBOUNCE);

/** 处理预设选择 */
const handlePresetSelect = (opt) => {
  emit('presetSelect', opt.value);
  showPresetSheet.value = false;
};

/** 处理背景类型选择 */
const handleBgTypeSelect = (opt) => {
  emit('update:backgroundType', opt.value);
  showBgSheet.value = false;
};

/** 处理宽高比选择 */
const onRatioSelect = (opt) => {
  emit('ratioSelect', opt.value);
  emit('update:lockAspectRatio', opt.value !== 0);
  showRatioSheet.value = false;
};

/** 处理背景颜色变化 */
const handleBackgroundColorChange = (val) => {
  emit('update:backgroundColor', val);
};

/** 处理渐变起始颜色变化 */
const handleGradientStartColorChange = (val) => {
  emit('update:gradientStartColor', val);
};

/** 处理渐变结束颜色变化 */
const handleGradientEndColorChange = (val) => {
  emit('update:gradientEndColor', val);
};

/** 处理渐变角度变化 */
const handleGradientAngleChange = (val) => {
  emit('update:gradientAngle', val);
};

/** 处理圆角半径变化（百分比 → 像素） */
const handleBorderRadiusChange = (val) => {
  const shortSide = Math.max(1, Math.min(props.canvasWidth, props.canvasHeight));
  emit('update:borderRadius', Math.round((Number(val) / 100) * shortSide));
};

/**
 * 将像素值转换为画布短边的百分比
 * @param {number} px - 像素值
 * @param {number} w - 画布宽度
 * @param {number} h - 画布高度
 * @returns {number} 百分比值
 */
function percentFromPx(px, w, h) {
  const shortSide = Math.max(1, Math.min(w || 0, h || 0));
  return (Number(px || 0) / shortSide) * 100;
}
</script>

<style lang="less" scoped>
.canvas-settings {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  margin-bottom: var(--spacing-md);

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);

    .header-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--color-text-primary);

      .header-icon {
        font-size: 18px;
        color: var(--color-primary);
      }
    }
  }

  .settings-content {
    padding: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .preset-size-info {
    padding: var(--spacing-sm);
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-md);
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
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
}
</style>