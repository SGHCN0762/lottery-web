<template>
  <div class="section">
    <div class="section-header">
      <van-icon name="star" />
      <h2 class="section-title">{{ t('resume.preview.skills') }}</h2>
    </div>
    <div class="skills-list">
      <span v-for="(skill, i) in skills" :key="i" class="skill-tag">{{ skill }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  skills: { type: Array, required: true },
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

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--a4-margin-sm, 7px);

  .skill-tag {
    padding: 5px 14px;
    background: rgba(102, 126, 234, 0.08);
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 20px;
    font-size: var(--a4-small-size, 12px);
    color: var(--theme-skill-color, #5a6672);
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(102, 126, 234, 0.12);
      border-color: rgba(102, 126, 234, 0.3);
    }
  }
}
</style>
