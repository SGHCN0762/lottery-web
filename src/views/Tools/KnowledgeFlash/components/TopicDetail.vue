<template>
  <van-popup
    :show="show"
    @update:show="$emit('update:show', $event)"
    position="bottom"
    :style="{ height: '85%' }"
    round
  >
    <div class="detail-popup" v-if="topic">
      <div class="detail-header">
        <h3 class="detail-title">{{ topic.name }}</h3>
        <button class="close-btn" @click="$emit('update:show', false)">
          <van-icon name="cross" />
        </button>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <p class="detail-desc">{{ topic.description }}</p>
        </div>

        <div v-if="topic.svgDiagram" class="detail-section">
          <h4 class="section-title">
            <van-icon name="chart-trending-o" />
            图示说明
          </h4>
          <div class="svg-container" v-html="topic.svgDiagram"></div>
        </div>

        <div v-if="topic.mnemonic" class="detail-section">
          <h4 class="section-title">
            <van-icon name="lightbulb-o" />
            速记口诀
          </h4>
          <div class="mnemonic-box">
            {{ topic.mnemonic }}
          </div>
        </div>

        <div v-if="topic.keyPoints?.length" class="detail-section">
          <h4 class="section-title">
            <van-icon name="star-o" />
            核心要点
          </h4>
          <ul class="points-list">
            <li v-for="(point, index) in topic.keyPoints" :key="index">
              <span class="point-number">{{ index + 1 }}</span>
              {{ point }}
            </li>
          </ul>
        </div>

        <div v-if="topic.formulas?.length" class="detail-section">
          <h4 class="section-title">
            <van-icon name="calculator" />
            核心公式
          </h4>
          <ul class="formulas-list">
            <li v-for="(formula, index) in topic.formulas" :key="index">
              {{ formula }}
            </li>
          </ul>
        </div>

        <div v-if="topic.examples?.length" class="detail-section">
          <h4 class="section-title">
            <van-icon name="book-open-o" />
            典型例题
          </h4>
          <ul class="examples-list">
            <li v-for="(example, index) in topic.examples" :key="index">
              {{ example }}
            </li>
          </ul>
        </div>

        <div v-if="topic.pitfalls?.length" class="detail-section">
          <h4 class="section-title">
            <van-icon name="warning-o" />
            易错点
          </h4>
          <div class="pitfalls-box">
            <span v-for="(pitfall, index) in topic.pitfalls" :key="index" class="pitfall-tag">
              {{ pitfall }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { Icon as VanIcon, Popup as VanPopup } from 'vant';

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  topic: {
    type: Object,
    default: null
  }
});

defineEmits(['update:show']);
</script>

<style lang="less" scoped>
.detail-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-primary);

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;

    .detail-title {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .close-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .detail-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);
    padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));

    .detail-section {
      margin-bottom: var(--spacing-lg);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .detail-desc {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.6;
    }

    .svg-container {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-sm);
      overflow-x: auto;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      :deep(svg) {
        display: block;
        width: 100%;
        height: auto;
        max-width: 100%;
        margin: 0 auto;
      }

      :deep(svg rect),
      :deep(svg text),
      :deep(svg line) {
        vector-effect: non-scaling-stroke;
      }
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-sm);

      :deep(.van-icon) {
        font-size: 16px;
        color: var(--color-primary);
      }
    }

    .mnemonic-box {
      background: var(--color-bg-secondary);
      border-left: 3px solid var(--color-warning, #ff976a);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .points-list,
    .formulas-list,
    .examples-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.5;
        border-bottom: 1px solid var(--color-border);

        &:last-child {
          border-bottom: none;
        }

        .point-number {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          background: var(--color-primary);
          color: #fff;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .formulas-list li {
      font-family: 'Courier New', monospace;
      color: var(--color-success, #07c160);
    }

    .pitfalls-box {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);

      .pitfall-tag {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: color-mix(in srgb, var(--color-danger, #ee0a24) 10%, transparent);
        color: var(--color-danger, #ee0a24);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
      }
    }
  }
}
</style>
