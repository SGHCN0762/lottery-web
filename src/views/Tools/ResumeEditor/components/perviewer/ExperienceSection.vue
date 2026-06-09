<template>
  <div class="section">
    <div class="section-header">
      <van-icon name="briefcase-o" />
      <h2 class="section-title">{{ t('resume.preview.experience') }}</h2>
    </div>
    <div v-for="exp in experience" :key="exp._id" class="item experience-item">
      <div class="item-header">
        <div class="item-main">
          <span class="company">{{ exp.company || '未填写公司' }}</span>
          <span v-if="exp.position" class="position">{{ exp.position }}</span>
        </div>
        <span class="period">{{ exp.startDate || '?' }} - {{ exp.endDate || t('resume.common.present') }}</span>
      </div>
      <div v-if="exp.description" class="description">{{ exp.description }}</div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  experience: { type: Array, required: true },
});
</script>

<style lang="less" scoped>
.section {
  border-radius: 14px;
  padding: var(--a4-margin-lg, 20px);
  margin-bottom: var(--a4-margin-lg, 20px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  border: 1px solid var(--theme-border, #f0f0f0);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--a4-margin-sm, 7px);
    margin-bottom: var(--a4-margin-md, 14px);
    padding-bottom: var(--a4-margin-sm, 7px);
    border-bottom: 1px dashed var(--theme-border, #e9ecef);
  }

  .section-title {
    font-size: var(--a4-section-size, 18px);
    font-weight: 600;
    color: var(--theme-text-primary, #1a1a2e);
    margin: 0;
    letter-spacing: 0.3px;
  }
}

.item {
  margin-bottom: var(--a4-margin-lg, 20px);
  padding: var(--a4-margin-md, 14px);
  background: #fafbfc;
  border-radius: 10px;
  border-left: 3px solid var(--theme-item-border, #667eea);

  &:last-child { margin-bottom: 0; }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--a4-margin-sm, 7px);
  }

  .item-main {
    flex: 1;
    min-width: 0;
  }

  .company {
    font-weight: 600;
    color: var(--theme-text-primary, #1a1a2e);
    font-size: var(--a4-content-size, 14px);
    display: block;
  }

  .position {
    font-size: var(--a4-small-size, 12px);
    color: var(--theme-accent, #667eea);
    margin-top: 3px;
    display: block;
    font-weight: 500;
  }

  .period {
    font-size: var(--a4-period-size, 11px);
    color: var(--theme-text-light, #888);
    white-space: nowrap;
    flex-shrink: 0;
    padding: 3px 10px;
    background: rgba(102, 126, 234, 0.08);
    border-radius: 10px;
    font-weight: 500;
  }

  .description {
    font-size: var(--a4-content-size, 14px);
    color: var(--theme-text-secondary, #5a6672);
    line-height: 1.75;
    padding: var(--a4-margin-sm, 7px) var(--a4-margin-md, 14px);
    background: #ffffff;
    border-radius: 8px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
