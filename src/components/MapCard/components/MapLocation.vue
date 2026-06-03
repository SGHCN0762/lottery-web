<template>
  <div class="map-location" @click="handleLocationClick">
    <van-icon name="location-o" />
  </div>
</template>

<script setup>
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  backToLocation: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(['backToLocation']);

const handleLocationClick = () => {
  if (props.backToLocation) {
    props.backToLocation();
  } else {
    emit('backToLocation');
  }
};
</script>

<style lang="less" scoped>
.map-location {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-text-primary);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--color-border-light);

  &:hover {
    background: var(--color-bg-tertiary);
  }

  &:active {
    background: var(--color-bg-secondary);
    transform: scale(0.92);
  }

  .van-icon {
    font-size: 16px;
  }
}
</style>
