<template>
  <section class="app-card">
    <div class="card-header">
      <div class="app-logo">🎮</div>
      <div class="app-info">
        <h2 class="app-name">{{ t('app.name') }}</h2>
        <p class="app-version">{{ t('about.version') }} v1.0.0</p>
      </div>
    </div>
    <div class="app-description">
      <p>{{ t('about.description') }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.app-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .app-logo {
      font-size: 56px;
      margin-right: var(--spacing-md);
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    }

    .app-info {
      flex: 1;

      .app-name {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--spacing-xs) 0;
        letter-spacing: 0.5px;
      }

      .app-version {
        font-size: var(--font-size-sm);
        opacity: 0.85;
        margin: 0;
      }
    }
  }

  /* 应用简介 */
  .app-description {
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    p {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      opacity: 0.9;
      margin: 0;
    }
  }
}
</style>
