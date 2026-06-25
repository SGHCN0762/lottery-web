<template>
  <div class="image-list">
    <ListHeader
      v-if="images.length > 0"
      :title="t('tools.fileConverter.common.imageList')"
      :count="images.length"
    >
      <template #actions>
        <van-button size="small" type="danger" plain @click="$emit('clear-all')">
          {{ t('tools.fileConverter.common.clearAll') }}
        </van-button>
      </template>
    </ListHeader>

    <div class="list-content">
      <van-notice-bar
        v-show="images.length > 0"
        left-icon="info-o"
        :text="t('tools.fileConverter.imageToPdf.dragTip')"
      />

      <div v-if="images.length > 0" class="list-scroll">
        <draggable
          v-model="localImages"
          item-key="id"
          :animation="200"
          ghost-class="image-ghost"
          drag-class="image-drag"
          handle=".drag-handle"
          @end="onDragEnd"
        >
          <template #item="{ element, index }">
            <div class="image-card">
              <div class="card-preview">
                <img :src="element.url" :alt="element.name" />
                <div class="page-badge">{{ index + 1 }}</div>
              </div>
              <div class="card-content">
                <div class="image-info">
                  <span class="image-name">{{ truncateName(element.name) }}</span>
                </div>
                <div class="drag-handle">
                  <van-icon name="exchange" size="16" />
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div v-else class="empty-state">
        <van-icon name="image-o" size="72" />
        <p>{{ t('tools.fileConverter.common.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Button as VanButton,
  NoticeBar as VanNoticeBar,
} from 'vant';
import draggable from 'vuedraggable';
import { truncateName } from '../utils';
import ListHeader from './ListHeader.vue';

const { t } = useI18n();

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['clear-all', 'update:images']);

const localImages = ref([...props.images]);

watch(() => props.images, (val) => {
  localImages.value = [...val];
}, { deep: true });

const onDragEnd = () => {
  emit('update:images', localImages.value);
};


</script>

<style lang="less" scoped>
.image-list {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  .list-content { 
    max-height: 500px;
    overflow-y: auto;
    padding: var(--spacing-md);
  }

  .list-scroll {
    margin-top: var(--spacing-md);
  }

  .image-card {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--color-border);
    margin-bottom: var(--spacing-md);

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      border-color: var(--color-primary-light);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
  }

  .image-ghost {
    opacity: 0.5;
    background: var(--color-primary-light);
  }

  .image-drag {
    transform: rotate(2deg);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .card-preview {
    position: relative;
    width: 100%;
    height: 160px;
    background: var(--color-bg-primary);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .page-badge {
      position: absolute;
      top: var(--spacing-xs);
      left: var(--spacing-xs);
      padding: 2px 8px;
      background: var(--color-primary);
      color: white;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-sm);
    }
  }

  .card-content {
    padding: var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .image-info {
      flex: 1;
      min-width: 0;

      .image-name {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
    }

    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--color-text-tertiary);
      cursor: grab;
      transition: all 0.2s ease;
      border-radius: var(--radius-md);

      &:hover {
        background: var(--color-bg-tertiary);
        color: var(--color-primary);
      }

      &:active {
        cursor: grabbing;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing-xl) * 2);
    color: var(--color-text-tertiary);

    .van-icon {
      margin-bottom: var(--spacing-md);
    }

    p {
      margin: 0;
    }
  }
}
</style>