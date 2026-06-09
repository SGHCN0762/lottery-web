<template>
  <div class="resume-preview">
    <van-nav-bar :title="t('resume.preview.title')" closeable>
      <template #right>
        <van-icon name="cross" size="20" class="close-icon" @click="$emit('close')" />
      </template>
    </van-nav-bar>

    <div class="preview-wrapper">
      <div class="a4-container" ref="previewRef" :style="previewStyle" :class="containerClass">
        <!-- 装饰元素 -->
        <div v-if="currentDecoration" class="decoration-layer" v-html="currentDecoration" />

        <div class="a4-content">
          <template v-for="item in orderedSections" :key="item.key">
            <!-- 基本信息 -->
            <BasicSection v-if="item.key === 'basic'" :basic="resume.basic" />

            <!-- 工作经历 -->
            <ExperienceSection
              v-else-if="item.key === 'experience' && sortedExperience.length"
              :experience="sortedExperience"
            />

            <!-- 项目经历 -->
            <ProjectSection
              v-else-if="item.key === 'project' && sortedProject.length"
              :project="sortedProject"
            />

            <!-- 教育背景 -->
            <EducationSection
              v-else-if="item.key === 'education' && sortedEducation.length"
              :education="sortedEducation"
            />

            <!-- 技能 -->
            <SkillsSection
              v-else-if="item.key === 'skills' && resume.skills?.length"
              :skills="resume.skills"
            />
          </template>

          <!-- 自定义模块 -->
          <CustomSection
            v-for="section in resume.customSections"
            :key="section._id"
            :section="section"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Icon as VanIcon, NavBar as VanNavBar } from 'vant';
  import { sortByDate } from '../../hooks/useListEditor';
  import {
    resumeBackgrounds,
    resumeDecorations,
    resumeThemes,
  } from '../../constants/resumeConstants';
  import BasicSection from './BasicSection.vue';
  import ExperienceSection from './ExperienceSection.vue';
  import ProjectSection from './ProjectSection.vue';
  import EducationSection from './EducationSection.vue';
  import SkillsSection from './SkillsSection.vue';
  import CustomSection from './CustomSection.vue';

  const { t } = useI18n();

  const props = defineProps({
    resume: { type: Object, required: true },
    themeSettings: {
      type: Object,
      default: () => ({ theme: 'default', background: 'none', decoration: 'none' }),
    },
  });

  const emit = defineEmits(['close']);

  const previewRef = ref(null);
  const themes = resumeThemes;
  const backgrounds = resumeBackgrounds;
  const decorations = resumeDecorations;

  const currentThemeConfig = computed(() => {
    return themes[props.themeSettings.theme] || themes['default'];
  });

  const currentBackgroundConfig = computed(() => {
    return backgrounds[props.themeSettings.background] || backgrounds['none'];
  });

  const currentDecoration = computed(() => {
    return decorations[props.themeSettings.decoration]?.svg || '';
  });

  const containerClass = computed(() => {
    return props.themeSettings.background !== 'none' ? `bg-${props.themeSettings.background}` : '';
  });

  const previewStyle = computed(() => {
    const theme = currentThemeConfig.value;
    const bg = currentBackgroundConfig.value;
    const style = {
      '--theme-primary': theme.primaryColor,
      '--theme-secondary': theme.secondaryColor,
      '--theme-accent': theme.accentColor,
      '--theme-bg': theme.bgGradient,
      '--theme-card': theme.cardBg,
      '--theme-text-primary': theme.textPrimary,
      '--theme-text-secondary': theme.textSecondary,
      '--theme-text-light': theme.textLight,
      '--theme-border': theme.borderColor,
      '--theme-summary': theme.summaryBg,
      '--theme-skill-bg': theme.skillTagBg,
      '--theme-skill-border': theme.skillTagBorder,
      '--theme-skill-color': theme.skillTagColor,
      '--theme-section-line': theme.sectionLine,
      '--theme-item-border': theme.itemBorder,
    };

    // 应用背景样式
    if (bg.style) {
      Object.assign(style, bg.style);
    }

    return style;
  });

  const sortedExperience = computed(() => sortByDate(props.resume.experience || [], 'startDate'));
  const sortedProject = computed(() => sortByDate(props.resume.project || [], 'startDate'));
  const sortedEducation = computed(() => sortByDate(props.resume.education || [], 'startDate'));

  const orderedSections = computed(() => {
    const defaultOrder = [
      { key: 'basic', label: '基本信息', visible: true },
      { key: 'experience', label: '工作经历', visible: true },
      { key: 'project', label: '项目经历', visible: true },
      { key: 'education', label: '教育背景', visible: true },
      { key: 'skills', label: '技能特长', visible: true },
    ];

    const sectionOrder = props.themeSettings.sectionOrder;
    if (Array.isArray(sectionOrder) && sectionOrder.length > 0) {
      return sectionOrder.filter(item => item.visible !== false);
    }

    return defaultOrder;
  });
</script>

<style lang="less" scoped>
  .resume-preview {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .close-icon {
    cursor: pointer;
    padding: 4px;
    color: var(--color-text-primary);
  }

  .preview-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
  }

  /* A4 尺寸容器 - 使用手机宽度作为A4宽度，保持210:297的宽高比 */
  .a4-container {
    /* 使用手机宽度作为A4宽度 - 210/297 = 0.707 */
    width: 100vw;
    max-width: 794px; /* 桌面端最大宽度限制 */
    min-height: calc(100vw * 297 / 210); /* 保持A4宽高比 */
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: visible;
    flex-shrink: 0;
  }

  /* 桌面端适配 */
  @media screen and (min-width: 850px) {
    .a4-container {
      width: 794px;
      min-height: 1123px;
    }
  }

  /* 装饰元素层 */
  .decoration-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  /* 背景图案层 */
  .bg-pattern-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .a4-content {
    /* 边距根据宽度自适应 - 基于794px标准宽度的比例 */
    padding: calc((100vw - 32px) * 40 / 794) calc((100vw - 32px) * 48 / 794);
    width: 100%;
    min-height: calc((100vw - 32px) * 297 / 210);
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    line-height: 1.6;

    /* 字体大小根据宽度自适应 - 基于794px标准宽度的比例 */
    --a4-name-size: calc((100vw - 32px) * 32 / 794);
    --a4-section-size: calc((100vw - 32px) * 18 / 794);
    --a4-title-size: calc((100vw - 32px) * 15 / 794);
    --a4-content-size: calc((100vw - 32px) * 14 / 794);
    --a4-small-size: calc((100vw - 32px) * 12 / 794);
    --a4-period-size: calc((100vw - 32px) * 11 / 794);

    /* 子组件间距也根据宽度自适应 */
    --a4-padding-lg: calc((100vw - 32px) * 20 / 794);
    --a4-padding-md: calc((100vw - 32px) * 14 / 794);
    --a4-padding-sm: calc((100vw - 32px) * 7 / 794);
    --a4-margin-lg: calc((100vw - 32px) * 20 / 794);
    --a4-margin-md: calc((100vw - 32px) * 14 / 794);
    --a4-margin-sm: calc((100vw - 32px) * 7 / 794);

    /* 图标尺寸根据宽度自适应 */
    --a4-icon-sm: calc((100vw - 32px) * 13 / 794);
    --a4-icon-md: calc((100vw - 32px) * 15 / 794);
    --a4-icon-lg: calc((100vw - 32px) * 17 / 794);
    --a4-icon-xl: calc((100vw - 32px) * 44 / 794);

    /* 图片尺寸根据宽度自适应 */
    --a4-avatar-size: calc((100vw - 32px) * 88 / 794);

    /* 装饰元素尺寸 */
    --a4-bullet-size: calc((100vw - 32px) * 10 / 794);
    --a4-bullet-offset: calc((100vw - 32px) * 20 / 794);

    /* Vant 图标全局样式 */
    :deep(.van-icon) {
      font-size: var(--a4-icon-lg);
      color: var(--theme-accent, #667eea);
    }
  }

  /* 桌面端固定尺寸 */
  @media screen and (min-width: 850px) {
    .a4-content {
      padding: 40px 48px;
      min-height: 1123px;

      /* 桌面端固定字体大小 */
      --a4-name-size: 32px;
      --a4-section-size: 18px;
      --a4-title-size: 15px;
      --a4-content-size: 14px;
      --a4-small-size: 12px;
      --a4-period-size: 11px;

      /* 桌面端固定间距 */
      --a4-padding-lg: 20px;
      --a4-padding-md: 14px;
      --a4-padding-sm: 7px;
      --a4-margin-lg: 20px;
      --a4-margin-md: 14px;
      --a4-margin-sm: 7px;

      /* 桌面端固定图标尺寸 */
      --a4-icon-sm: 13px;
      --a4-icon-md: 15px;
      --a4-icon-lg: 17px;
      --a4-icon-xl: 44px;

      /* 桌面端固定图片尺寸 */
      --a4-avatar-size: 88px;

      /* 桌面端固定装饰元素尺寸 */
      --a4-bullet-size: 10px;
      --a4-bullet-offset: 20px;
    }
  }
  /* 打印/导出时的样式 */
  @media print {
    .resume-preview {
      background: transparent;
    }

    .a4-container {
      width: 100%;
      box-shadow: none;
      page-break-after: always;
    }
  }
</style>
