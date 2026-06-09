<template>
  <div class="section">
    <div class="section-header">
      <van-icon name="graduation-cap" />
      <h2 class="section-title">{{ t('resume.preview.education') }}</h2>
    </div>
    <div v-for="edu in education" :key="edu._id" class="item">
      <div class="item-header">
        <div class="item-main">
          <span class="school">{{ edu.school || '未填写学校' }}</span>
          <span class="major">{{ edu.major || '' }}<span v-if="edu.degree"> - {{ edu.degree }}</span></span>
        </div>
        <span class="period">{{ edu.startDate || '?' }} - {{ edu.endDate || t('resume.common.present') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  education: { type: Array, required: true },
});
</script>

<style lang="less" scoped>
.section {
  border-radius: 12px;
  padding: var(--a4-margin-lg, 24px);
  margin-bottom: var(--a4-margin-lg, 24px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--theme-border, #f0f0f0);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--a4-margin-sm, 7px);
    margin-bottom: var(--a4-margin-md, 14px);
    padding-bottom: var(--a4-margin-sm, 7px);
    color: var(--theme-accent, #667eea);
    border-bottom: 1px dashed var(--theme-border, #e9ecef);
  }

  .section-title {
    font-size: var(--a4-section-size, 18px);
    font-weight: var(--font-weight-bold);
    color: var(--theme-text-primary, #2c3e50);
    margin: 0;
  }
}

.item {
  margin-bottom: var(--a4-margin-lg, 24px);
  padding: var(--a4-margin-md, 16px);
  background: var(--theme-card, #ffffff);
  border-left: 3px solid var(--theme-item-border, #667eea);
  border-radius: 10px;

  &:last-child { margin-bottom: 0; }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--a4-margin-sm, 8px);
  }

  .item-main {
    flex: 1;
    min-width: 0;
  }

  .school {
    font-weight: var(--font-weight-bold);
    color: var(--theme-text-primary, #2c3e50);
    font-size: var(--a4-content-size, 14px);
    display: block;
  }

  .major {
    font-size: var(--a4-small-size, 13px);
    color: var(--theme-accent, #667eea);
    margin-top: 2px;
    display: block;
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
}
</style>
