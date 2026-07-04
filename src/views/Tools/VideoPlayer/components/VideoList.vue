<template>
  <div class="video-list-container">
    <van-tabs v-model:active="activeCategory" title-active-color="#3b82f6" title-inactive-color="#999">
      <van-tab
        v-for="category in categories"
        :key="category.id"
        :title="`${category.name} (${getCategoryCount(category.id)})`"
        :name="category.id"
      >
        <div class="video-grid">
          <div
            v-for="video in filteredVideos"
            :key="video.id"
            class="video-card"
            :class="{ 'card-active': selectedVideo?.id === video.id }"
            @click="$emit('select', video)"
          >
            <div class="video-thumbnail">
              <img :src="video.poster" :alt="video.title" />
              <div class="duration-badge">{{ video.duration }}</div>
              <div class="play-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="video-info">
              <h4 class="video-title">{{ video.title }}</h4>
              <p class="video-meta">
                <span class="video-category">{{ getCategoryName(video.category) }}</span>
                <span class="video-views">{{ video.views }} 播放</span>
              </p>
            </div>
          </div>
        </div>

        <div class="empty-state" v-if="filteredVideos.length === 0">
          <div class="empty-icon">📺</div>
          <p class="empty-text">暂无视频</p>
          <p class="empty-hint">该分类下还没有视频内容</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Tabs as VanTabs, Tab as VanTab } from 'vant';

const props = defineProps({
  videos: {
    type: Array,
    default: () => []
  },
  selectedVideo: {
    type: Object,
    default: null
  }
});

defineEmits(['select']);

const categories = [
  { id: 'all', name: '全部' },
  { id: 'xingce', name: '行测' },
  { id: 'shenlun', name: '申论' },
  { id: 'common', name: '常识' },
  { id: 'interview', name: '面试' },
];

const activeCategory = ref('all');

const filteredVideos = computed(() => {
  if (activeCategory.value === 'all') {
    return props.videos;
  }
  return props.videos.filter(video => video.category === activeCategory.value);
});

const getCategoryCount = (categoryId) => {
  if (categoryId === 'all') {
    return props.videos.length;
  }
  return props.videos.filter(v => v.category === categoryId).length;
};

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};
</script>

<style lang="less" scoped>
.video-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.video-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 2px solid transparent;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-border-light);
  }

  &.card-active {
    border-color: var(--color-primary);
    box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.2);
  }
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all var(--transition-base);
  }

  &:hover img {
    transform: scale(1.1);
    filter: brightness(0.8);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    pointer-events: none;
  }
}

.duration-badge {
  position: absolute;
  bottom: var(--spacing-sm);
  right: var(--spacing-sm);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: var(--font-size-xs);
  padding: 3px 8px;
  border-radius: 4px;
  font-family: var(--font-family-mono);
  backdrop-filter: blur(4px);
  z-index: 1;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-lg);
  z-index: 2;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-primary);
    margin-left: 3px;
  }

  .video-card:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.video-info {
  padding: var(--spacing-md);
}

.video-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0;
}

.video-category {
  padding: 2px 6px;
  background: var(--color-bg-tertiary);
  border-radius: 2px;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.empty-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-xs) 0;
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
}
</style>
