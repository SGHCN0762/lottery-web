<template>
  <section class="upcoming-festivals">
    <div class="section-title">
      <van-icon name="gift-o" />
      <span>{{ t("home.upcomingFestivals") }}</span>
    </div>
    <div class="festival-list">
      <div
        v-for="festival in festivals"
        :key="festival.name"
        class="festival-item"
      >
        <div class="festival-icon">{{ festival.icon }}</div>
        <div class="festival-info">
          <span class="festival-name">{{ festival.name }}</span>
          <span class="festival-date">{{ festival.date }}</span>
        </div>
        <div class="festival-countdown">
          <span class="days">{{ festival.days }}</span>
          <span class="unit">{{ t("home.daysLater") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { Icon as VanIcon } from "vant";

const { t } = useI18n();

const props = defineProps({
  festivals: {
    type: Array,
    required: true
  }
});
</script>

<style lang="less" scoped>
.upcoming-festivals {
  margin: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  .festival-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    .festival-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--color-bg-primary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-sm);
      }

      .festival-icon {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .festival-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .festival-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }

        .festival-date {
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
        }
      }

      .festival-countdown {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;

        .days {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          line-height: 1;
        }

        .unit {
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
        }
      }
    }
  }
}
</style>
