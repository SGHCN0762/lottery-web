<template>
  <div class="tools-page">
    <div class="page-content">
      <!-- 页面标题区域 -->
      <PageHeader :title="t('tools.title')" :subtitle="t('tools.subtitle')" />

      <!-- 工具列表 -->
      <section class="tools-section">
        <div
          v-for="tool in tools"
          :key="tool.id"
          class="tool-card"
          @click="handleSelectTool(tool)"
          role="button"
          tabindex="0"
        >
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-info">
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-description">{{ tool.description }}</p>
          </div>
          <van-icon name="arrow" class="tool-arrow" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Icon as VanIcon } from 'vant';
import PageHeader from '@/components/PageHeader/index.vue';

// ========================================
// i18n
// ========================================
const { t } = useI18n();

// ========================================
// 路由实例
// ========================================
const router = useRouter();

// ========================================
// 数据定义
// ========================================

/** 工具列表 */
const tools = computed(() => [
  {
    id: 'resume-editor',
    name: t('tools.resumeEditor.name'),
    icon: '📄',
    description: t('tools.resumeEditor.description'),
    route: 'ResumeEditor',
  },
  {
    id: 'image-compressor',
    name: t('tools.imageCompressor.name'),
    icon: '🖼️',
    description: t('tools.imageCompressor.description'),
    route: 'ImageCompressor',
  },
  {
    id: 'qr-code',
    name: t('tools.qrCode.name'),
    icon: '📱',
    description: t('tools.qrCode.description'),
    route: 'QrCodeGenerator',
  },
  {
    id: 'image-watermark',
    name: t('tools.imageWatermark.name'),
    icon: '🏷️',
    description: t('tools.imageWatermark.description'),
    route: 'ImageWatermark',
  },
  {
    id: 'logo-designer',
    name: t('tools.logoDesigner.name'),
    icon: '🎨',
    description: t('tools.logoDesigner.description'),
    route: 'LogoDesigner',
  },
  {
    id: 'json-formatter',
    name: t('tools.jsonFormatter.name'),
    icon: '🔧',
    description: t('tools.jsonFormatter.description'),
    route: 'JsonFormatter',
  },
  {
    id: 'dj-mixer',
    name: t('tools.djMixer.name'),
    icon: '🎧',
    description: t('tools.djMixer.description'),
    route: 'DJMixer',
  },
  {
    id: 'file-converter',
    name: t('tools.fileConverter.name'),
    icon: '🔄',
    description: t('tools.fileConverter.description'),
    route: 'FileConverter',
  },
  {
    id: 'exam-prep',
    name: t('tools.examPrep.name'),
    icon: '📚',
    description: t('tools.examPrep.description'),
    route: 'ExamPrep',
  },
  {
    id: 'civil-servant-exam',
    name: t('tools.civilServantExam.name'),
    icon: '📋',
    description: t('tools.civilServantExam.description'),
    route: 'CivilServantExam',
  },
  {
    id: 'knowledge-flash',
    name: t('tools.knowledgeFlash.name'),
    icon: '💡',
    description: t('tools.knowledgeFlash.description'),
    route: 'KnowledgeFlash',
  },
  {
    id: 'idiom-learning',
    name: t('tools.idiomLearning.name'),
    icon: '📖',
    description: t('tools.idiomLearning.description'),
    route: 'IdiomLearning',
  },
  {
    id: 'famous-quotes',
    name: t('tools.famousQuotes.name'),
    icon: '💬',
    description: t('tools.famousQuotes.description'),
    route: 'FamousQuotes',
  },
  {
    id: 'classical-poems',
    name: t('tools.classicalPoems.name'),
    icon: '📜',
    description: t('tools.classicalPoems.description'),
    route: 'ClassicalPoems',
  },
  {
    id: 'classical-essays',
    name: t('tools.classicalEssays.name'),
    icon: '📖',
    description: t('tools.classicalEssays.description'),
    route: 'ClassicalEssays',
  },
  {
    id: 'video-player',
    name: t('tools.videoPlayer.name'),
    icon: '📺',
    description: t('tools.videoPlayer.description'),
    route: 'VideoPlayer',
  },
]);

// ========================================
// 事件处理函数
// ========================================

/**
 * 选择工具并跳转
 * @param {Object} tool - 选中的工具对象
 */
const handleSelectTool = (tool) => {
  if (tool.route) {
    router.push({ name: tool.route });
  }
};
</script>

<style lang="less" scoped>
.tools-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.page-content {
  padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  display: flow-root;
}

.tools-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.tool-card {
  display: flex;
  align-items: center;
  background: var(--color-bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  &:active {
    transform: translateY(0);
  }

  .tool-icon {
    font-size: 2.5rem;
    margin-right: var(--spacing-lg);
    flex-shrink: 0;
  }

  .tool-info {
    flex: 1;
    min-width: 0;
  }

  .tool-name {
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
    font-weight: var(--font-weight-semibold);
  }

  .tool-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
    margin: 0;
  }

  .tool-arrow {
    color: var(--color-text-secondary);
    font-size: var(--font-size-lg);
    flex-shrink: 0;
  }
}
</style>