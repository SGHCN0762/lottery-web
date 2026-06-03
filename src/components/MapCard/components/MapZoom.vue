<template>
  <div class="map-zoom">
    <div class="zoom-btn" @click="handleZoomIn">
      <van-icon name="plus" />
    </div>
    <div class="zoom-btn" @click="handleZoomOut">
      <van-icon name="minus" />
    </div>
  </div>
</template>

<script setup>
  import { Icon as VanIcon } from 'vant';

  const props = defineProps({
    zoomIn: {
      type: Function,
      default: null,
    },
    zoomOut: {
      type: Function,
      default: null,
    },
  });

  const emit = defineEmits(['zoomIn', 'zoomOut']);

  const handleZoomIn = () => {
    if (props.zoomIn) {
      props.zoomIn();
    } else {
      emit('zoomIn');
    }
  };

  const handleZoomOut = () => {
    if (props.zoomOut) {
      props.zoomOut();
    } else {
      emit('zoomOut');
    }
  };
</script>

<style lang="less" scoped>
  .map-zoom {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    overflow: hidden;

    .zoom-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color var(--transition-fast);
      color: var(--color-text-primary);

      &:hover {
        background: var(--color-bg-tertiary);
      }

      &:active {
        background: var(--color-bg-secondary);
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border-light);
      }

      .van-icon {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>
