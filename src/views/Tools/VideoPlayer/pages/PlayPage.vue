<template>
  <div class="video-play-page">
    <div class="page-content">
      <div class="player-section" v-if="currentVideo">
        <VideoPlayer
          :current-video="currentVideo"
          :autoplay="true"
          @video-ended="handleVideoEnded"
          @video-error="handleVideoError"
          ref="videoPlayerRef"
        />

        <div class="video-info">
          <div class="info-header">
            <h2 class="video-title">{{ currentVideo.title }}</h2>
            <button class="back-btn" @click="goBack">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
          </div>
          <p class="video-description">{{ currentVideo.description }}</p>
          <div class="video-meta">
            <span class="meta-badge">{{ getCategoryName(currentVideo.category) }}</span>
            <span class="meta-item">{{ currentVideo.views }} 播放</span>
            <span class="meta-divider">·</span>
            <span class="meta-item">{{ currentVideo.segments ? `${currentVideo.segments.length} 个切片` : currentVideo.duration }}</span>
          </div>
        </div>
      </div>

      <div class="playlist-section">
        <div class="playlist-header">
          <h3 class="playlist-title">{{ t('tools.videoPlayer.playlist') }}</h3>
          <span class="playlist-count">{{ videos.length }} 个视频</span>
        </div>
        <div class="playlist-list">
          <div
            v-for="(video, index) in videos"
            :key="video.id"
            class="playlist-item"
            :class="{ 'item-active': currentVideo?.id === video.id }"
            @click="selectVideo(video)"
          >
            <span class="playlist-index">{{ index + 1 }}</span>
            <div class="playlist-thumbnail">
              <img :src="video.poster" :alt="video.title" />
              <div class="duration-overlay">{{ video.segments ? `${video.segments.length}片` : video.duration }}</div>
            </div>
            <div class="playlist-content">
              <span class="playlist-title-text">{{ video.title }}</span>
              <span class="playlist-category">{{ getCategoryName(video.category) }}</span>
            </div>
            <svg v-if="currentVideo?.id === video.id && isPlaying" class="playing-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="empty-tip" v-if="!currentVideo">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
        </svg>
        <p>{{ t('tools.videoPlayer.noVideos') }}</p>
        <button class="empty-btn" @click="goBack">返回视频列表</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import VideoPlayer from '../components/VideoPlayer.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const videoData = [
  {
    id: 1,
    title: '数量组合刷题一',
    description: '行测数量关系刷题视频，共11个切片，讲解数量组合相关题目',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=公务员考试行测数量关系数学公式视频封面，数字计算风格，专业教育风格&image_size=landscape_16_9',
    category: 'xingce',
    duration: '',
    views: '1',
    segments: [
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/1.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/2.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/3.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/4.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/5.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/6.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/7.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/8.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/9.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/10.mp4',
      'https://raw.githubusercontent.com/SGHCN0762/video-quantitative-relationship-1/v1.0.1/数量组合刷题一/11.mp4',
    ],
  },
  
];

const categories = [
  { id: 'all', name: '全部' },
  { id: 'xingce', name: '行测' },
  { id: 'shenlun', name: '申论' },
  { id: 'common', name: '常识' },
  { id: 'interview', name: '面试' },
];

const videoPlayerRef = ref(null);
const videos = ref(videoData);
const isPlaying = ref(false);

const currentVideo = computed(() => {
  const videoId = parseInt(route.params.id);
  return videos.value.find(v => v.id === videoId) || null;
});

watch(currentVideo, (newVideo) => {
  isPlaying.value = !!newVideo;
});

const selectVideo = (video) => {
  isPlaying.value = true;
  router.push(`/tools/video-player/play/${video.id}`);
};

const handleVideoEnded = () => {
  isPlaying.value = false;
  const currentIndex = videos.value.findIndex(v => v.id === currentVideo.value?.id);
  if (currentIndex < videos.value.length - 1) {
    const nextVideo = videos.value[currentIndex + 1];
    setTimeout(() => {
      router.push(`/tools/video-player/play/${nextVideo.id}`);
    }, 500);
  }
};

const handleVideoError = () => {
  console.error('视频播放出错');
};

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

const goBack = () => {
  router.push('/tools/video-player');
};
</script>

<style lang="less" scoped>
.video-play-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.page-content {
  padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
}

.player-section {
  margin-bottom: var(--spacing-lg);
}

.video-info {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-md);
  border: 1px solid var(--color-border);
}

.info-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.video-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.back-btn {
  background: var(--color-bg-tertiary);
  border: none;
  color: var(--color-text-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;

  &:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.video-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--spacing-md) 0;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.meta-badge {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
}

.meta-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.meta-divider {
  color: var(--color-text-tertiary);
}

.playlist-section {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
}

.playlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.playlist-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.playlist-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.playlist-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--color-bg-secondary);

  &:hover {
    background: var(--color-bg-tertiary);
    transform: translateX(4px);
  }

  &.item-active {
    background: var(--color-primary-light);
    border-left: 3px solid var(--color-primary);

    .playlist-title-text {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }
  }
}

.playlist-index {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border-radius: 50%;
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
}

.playlist-thumbnail {
  width: 80px;
  height: 45px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.duration-overlay {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 4px;
  border-radius: 2px;
  font-family: var(--font-family-mono);
}

.playlist-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.playlist-title-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playlist-category {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.playing-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.empty-tip {
  text-align: center;
  padding: var(--spacing-xl) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);

  svg {
    width: 64px;
    height: 64px;
    color: var(--color-text-tertiary);
  }

  p {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
    margin: 0;
  }
}

.empty-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--color-primary-dark);
  }
}

@media (min-width: 768px) {
  .page-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: var(--spacing-lg);
  }

  .player-section {
    margin-bottom: 0;
    grid-column: 1;
  }

  .playlist-section {
    grid-column: 2;
    grid-row: 1;
    position: sticky;
    top: calc(var(--spacing-md) + env(safe-area-inset-top, 0px));
    max-height: calc(100vh - var(--spacing-xl) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
  }

  .playlist-list {
    max-height: calc(100vh - 200px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
  }
}
</style>