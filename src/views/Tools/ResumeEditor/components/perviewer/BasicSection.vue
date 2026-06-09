<template>
  <div class="basic-section">
    <div class="basic-header">
      <div v-if="basic.avatar" class="avatar-container">
        <img :src="basic.avatar" alt="证件照" class="avatar-img" />
      </div>
      <div v-else class="avatar-placeholder">
        <van-icon name="user-o" class="avatar-icon" />
      </div>
      <div class="basic-info">
        <h1 class="name">{{ basic.name || t('resume.preview.noName') }}</h1>
        <div v-if="basic.title" class="title-text">{{ basic.title }}</div>
        <div class="contact-info">
          <span v-if="basic.phone" class="contact-item">
            <van-icon name="phone" class="contact-icon" />{{ basic.phone }}
          </span>
          <span v-if="basic.email" class="contact-item">
            <van-icon name="envelop-o" class="contact-icon" />{{ basic.email }}
          </span>
          <span v-if="basic.location" class="contact-item">
            <van-icon name="location-o" class="contact-icon" />{{ basic.location }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="basic.customFields?.length" class="custom-fields-preview">
      <div v-for="(field, index) in basic.customFields" :key="index" class="custom-field">
        <span class="field-label">{{ field.label }}：</span>
        <span class="field-value">{{ field.value }}</span>
      </div>
    </div>

    <div v-if="basic.summary" class="summary">
      <div class="summary-icon">
        <van-icon name="file-text" class="summary-icon-el" />
      </div>
      <div class="summary-content">{{ basic.summary }}</div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  basic: { type: Object, required: true },
});
</script>

<style lang="less" scoped>
.basic-section {
  border-radius: 16px;
  padding: var(--a4-margin-lg, 20px);
  border: 1px solid var(--theme-border, #e9ecef);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  margin-bottom: var(--a4-margin-lg, 24px);

  .basic-header {
    display: flex;
    gap: var(--a4-margin-lg, 20px);
    align-items: flex-start;
    margin-bottom: var(--a4-margin-md, 14px);
    padding-bottom: var(--a4-margin-md, 14px);
    border-bottom: 2px solid var(--theme-section-line, #667eea);
  }

  .avatar-placeholder {
    width: var(--a4-avatar-size, 88px);
    height: var(--a4-avatar-size, 88px);
    border-radius: 50%;
    background: linear-gradient(135deg, var(--theme-primary, #667eea) 0%, var(--theme-secondary, #764ba2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

    .avatar-icon {
      font-size: var(--a4-icon-xl, 44px);
    }
  }
  
  .avatar-container {
    width: var(--a4-avatar-size, 88px);
    height: var(--a4-avatar-size, 88px);
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .basic-info {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: var(--a4-name-size, 32px);
    font-weight: 700;
    color: var(--theme-text-primary, #1a1a2e);
    margin: 0 0 var(--a4-margin-sm, 7px) 0;
    letter-spacing: 1px;
  }

  .title-text {
    font-size: var(--a4-title-size, 15px);
    color: var(--theme-accent, #667eea);
    font-weight: 600;
    margin-bottom: var(--a4-margin-sm, 7px);
    letter-spacing: 0.5px;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: var(--a4-margin-md, 14px);

    .contact-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: var(--a4-small-size, 12px);
      color: var(--theme-text-light, #666);
      padding: 4px 10px;
      background: rgba(102, 126, 234, 0.06);
      border-radius: 12px;

      .contact-icon {
        font-size: var(--a4-icon-sm, 13px);
      }
    }
  }

  .summary {
    display: flex;
    gap: var(--a4-margin-sm, 7px);
    padding: var(--a4-margin-md, 14px);
    background: var(--theme-summary, #f8fafc);
    border-radius: 10px;
    margin-top: var(--a4-margin-md, 14px);
    border-left: 3px solid var(--theme-section-line, #667eea);

    .summary-icon {
      color: var(--theme-accent, #667eea);
      flex-shrink: 0;
      margin-top: 2px;

      .summary-icon-el {
        font-size: var(--a4-icon-md, 15px);
      }
    }

    .summary-content {
      font-size: var(--a4-content-size, 14px);
      color: var(--theme-text-secondary, #5a6672);
      line-height: 1.75;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}

.custom-fields-preview {
  margin-top: var(--a4-margin-md, 16px);
  padding: var(--a4-margin-md, 16px);
  background: var(--theme-card, #ffffff);
  border-radius: 8px;
  border: 1px solid var(--theme-border, #e9ecef);

  .custom-field {
    display: inline-block;
    margin-right: var(--a4-margin-md, 16px);
    margin-bottom: var(--a4-margin-sm, 8px);
    font-size: var(--a4-small-size, 13px);
    color: var(--theme-text-light, #666);

    .field-label { 
      font-weight: var(--font-weight-semibold);
      color: var(--theme-text-secondary, #495057);
    }
    .field-value { color: var(--theme-text-primary, #2c3e50); }
  }
}
</style>
