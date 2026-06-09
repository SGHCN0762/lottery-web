<template>
  <div class="theme-settings">
    <div class="setting-section">
      <div class="section-title">
        <van-icon name="palette-o" />
        <span>{{ t('resume.theme.title') }}</span>
      </div>
      <div class="theme-grid">
        <div
          v-for="(theme, key) in themes"
          :key="key"
          :class="['theme-card', { active: currentTheme === key }]"
          @click="selectTheme(key)"
        >
          <div
            class="theme-preview"
            :style="{
              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
            }"
          >
            <div class="theme-lines">
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="line line-3"></div>
            </div>
          </div>
          <span class="theme-name">{{ theme.name }}</span>
          <van-icon v-if="currentTheme === key" name="success" class="check-icon" />
        </div>
      </div>
    </div>

    <div class="setting-section">
      <div class="section-title">
        <van-icon name="photo-o" />
        <span>{{ t('resume.background.title') }}</span>
      </div>
      <div class="background-grid">
        <div
          v-for="(bg, key) in backgrounds"
          :key="key"
          :class="['bg-card', { active: currentBackground === key }]"
          @click="selectBackground(key)"
        >
          <div class="bg-preview" :style="bg.style">
            <div v-if="bg.svg" class="bg-pattern" v-html="bg.svg"></div>
          </div>
          <span class="bg-name">{{ bg.name }}</span>
          <van-icon v-if="currentBackground === key" name="success" class="check-icon" />
        </div>
      </div>
    </div>

    <div class="setting-section">
      <div class="section-title">
        <van-icon name="cluster-o" />
        <span>{{ t('resume.decoration.title') }}</span>
      </div>
      <div class="decoration-grid">
        <div
          v-for="(deco, key) in decorations"
          :key="key"
          :class="['deco-card', { active: currentDecoration === key }]"
          @click="selectDecoration(key)"
        >
          <div class="deco-preview" v-html="deco.preview"></div>
          <span class="deco-name">{{ deco.name }}</span>
          <van-icon v-if="currentDecoration === key" name="success" class="check-icon" />
        </div>
      </div>
    </div>

    <div class="setting-section">
      <div class="section-title">
        <van-icon name="apps-o" />
        <span>{{ t('resume.layout.title') }}</span>
        <div class="lock-icon" @click="toggleLock">
          <svg v-if="isLocked" class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <svg v-else class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        </div>
      </div>
      <div class="lock-tip" v-if="isLocked">
        <van-icon name="info-o" />
        <span>点击右上角锁图标解锁后拖拽排序</span>
      </div>

      <div class="order-list" :class="{ locked: isLocked }">
        <draggable
          v-model="sectionOrder"
          item-key="key"
          ghost-class="ghost"
          animation="200"
          :disabled="isLocked"
        >
          <template #item="{ element }">
            <div class="order-item">
              <van-icon name="wap-nav" class="drag-icon" :class="{ disabled: isLocked }" />
              <span class="order-label">{{ element.label }}</span>
              <van-switch v-model="element.visible" size="20px" :disabled="isLocked" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Icon as VanIcon, Switch as VanSwitch } from 'vant';
  import draggable from 'vuedraggable';
  import { resumeThemes, resumeBackgrounds, resumeDecorations } from '../../constants/resumeConstants';

  const { t } = useI18n();

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({
        theme: 'default',
        background: 'none',
        decoration: 'none',
        sectionOrder: [],
      }),
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const themes = resumeThemes;
  const backgrounds = resumeBackgrounds;
  const decorations = resumeDecorations;

  const currentTheme = ref(props.modelValue.theme || 'default');
  const currentBackground = ref(props.modelValue.background || 'none');
  const currentDecoration = ref(props.modelValue.decoration || 'none');
  const isLocked = ref(true);

  const toggleLock = () => {
    isLocked.value = !isLocked.value;
  };

  const defaultSectionOrder = [
    { key: 'basic', label: '基本信息', visible: true },
    { key: 'experience', label: '工作经历', visible: true },
    { key: 'project', label: '项目经历', visible: true },
    { key: 'education', label: '教育背景', visible: true },
    { key: 'skills', label: '技能特长', visible: true },
  ];

  const sectionOrder = ref(
    props.modelValue.sectionOrder?.length ? props.modelValue.sectionOrder : defaultSectionOrder
  );

  const selectTheme = key => {
    currentTheme.value = key;
    emitChange();
  };

  const selectBackground = key => {
    currentBackground.value = key;
    emitChange();
  };

  const selectDecoration = key => {
    currentDecoration.value = key;
    emitChange();
  };

  const emitChange = () => {
    emit('update:modelValue', {
      theme: currentTheme.value,
      background: currentBackground.value,
      decoration: currentDecoration.value,
      sectionOrder: sectionOrder.value,
    });
  };

  watch(
    () => props.modelValue,
    newVal => {
      if (newVal) {
        currentTheme.value = newVal.theme || 'default';
        currentBackground.value = newVal.background || 'none';
        currentDecoration.value = newVal.decoration || 'none';
        if (newVal.sectionOrder?.length) {
          sectionOrder.value = newVal.sectionOrder;
        }
      }
    },
    { deep: true }
  );

  watch(sectionOrder, emitChange, { deep: true });
</script>

<style lang="less" scoped>
  .theme-settings {
  }

  .setting-section {
    margin-bottom: var(--spacing-xl);
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: var(--spacing-md);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
  }

  .theme-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
  }

  .theme-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.active {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }

    .theme-preview {
      height: 60px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-lines {
      width: 60%;
      padding: 8px;

      .line {
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 2px;
        margin-bottom: 4px;

        &:last-child {
          margin-bottom: 0;
          width: 60%;
        }
      }
    }

    .theme-name {
      display: block;
      text-align: center;
      padding: 6px;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      background-color: var(--color-bg-primary);
    }

    .check-icon {
      position: absolute;
      top: 4px;
      right: 4px;
      color: #fff;
      background: var(--color-primary);
      border-radius: 50%;
      padding: 2px;
      font-size: 12px;
    }
  }

  .background-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm);
  }

  .bg-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &.active {
      border-color: var(--color-primary);
    }

    .bg-preview {
      height: 70px;
      position: relative;
      overflow: hidden;

      .bg-pattern {
        position: absolute;
        inset: 0;
        opacity: 1;
      }
    }

    .bg-name {
      display: block;
      text-align: center;
      padding: 4px;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      background-color: var(--color-bg-primary);
    }

    .check-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #fff;
      background: var(--color-primary);
      border-radius: 50%;
      padding: 2px;
      font-size: 10px;
    }
  }

  .decoration-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm);
  }

  .deco-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    background-color: var(--color-bg-primary);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &.active {
      border-color: var(--color-primary);
    }

    .deco-preview {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
      
      :deep(svg) {
        width: 48px;
        height: 48px;
      }
    }

    .deco-name {
      display: block;
      text-align: center;
      padding: 4px;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }

    .check-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #fff;
      background: var(--color-primary);
      border-radius: 50%;
      padding: 2px;
      font-size: 10px;
    }
  }

  .order-list {
    background-color: var(--color-bg-primary);
    border-radius: 8px;
    overflow: hidden;

    &.locked {
      opacity: 0.7;
      pointer-events: none;

      .order-item {
        cursor: default;
      }
    }
  }

  .order-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    transition: all 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--color-bg-secondary);
    }

    .drag-icon {
      color: var(--color-text-light);
      cursor: grab;
      font-size: 20px;
      transition: color 0.2s ease;

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .order-label {
      flex: 1;
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
    }
  }

  .ghost {
    opacity: 0.5;
    background: var(--color-primary-light);
  }

  .lock-icon {
    margin-left: auto;
    width: 18px;
    height: 18px;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);
    }

    .icon-svg {
      width: 100%;
      height: 100%;
    }
  }

  .lock-tip {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    margin-bottom: var(--spacing-sm);
    background-color: rgba(102, 126, 234, 0.1);
    border-radius: 6px;
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);

    .van-icon {
      font-size: 14px;
      color: var(--color-primary);
    }
  }
</style>
