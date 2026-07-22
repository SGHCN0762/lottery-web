<template>
  <div v-if="currentSong" class="mini-player" @click="$emit('expand')">
    <div class="mini-cover-wrapper">
      <div class="mini-cover" :class="{ spinning: isPlaying }">
        <span>{{ coverEmoji }}</span>
      </div>
    </div>
    <div class="mini-info">
      <h4 class="mini-title">{{ displayTitle }}</h4>
      <p class="mini-artist">{{ artistName }}</p>
    </div>
    <div class="mini-controls">
      <button class="control-btn" @click.stop="$emit('prev')">⏮</button>
      <button class="control-btn play-btn" @click.stop="$emit('toggle-play')">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>
      <button class="control-btn" @click.stop="$emit('next')">⏭</button>
    </div>
    <div class="mini-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentSong: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  progressPercent: {
    type: Number,
    default: 0
  },
  getDisplayTitle: {
    type: Function,
    required: true
  },
  getAlbumCover: {
    type: Function,
    required: true
  },
  artistName: {
    type: String,
    default: '周杰伦'
  }
})

defineEmits(['expand', 'prev', 'next', 'toggle-play'])

const displayTitle = computed(() => {
  if (!props.currentSong) return ''
  return props.getDisplayTitle(props.currentSong.title)
})

const coverEmoji = computed(() => {
  if (!props.currentSong) return '🎵'
  return props.getAlbumCover(props.currentSong.album)
})
</script>

<style lang="less" scoped>
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  padding-bottom: calc(0 + env(safe-area-inset-bottom));
  z-index: 90;
  cursor: pointer;

  .mini-cover-wrapper {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 12px;

    .mini-cover {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;

      &.spinning {
        animation: spin 6s linear infinite;
      }
    }
  }

  .mini-info {
    flex: 1;
    min-width: 0;

    .mini-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-primary);
      margin: 0 0 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mini-artist {
      font-size: 12px;
      color: var(--color-text-tertiary);
      margin: 0;
    }
  }

  .mini-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-right: 16px;

    .control-btn {
      background: transparent;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: var(--color-text-primary);

      &:hover {
        color: var(--color-primary);
      }

      .play-btn {
        font-size: 20px;
      }
    }
  }

  .mini-progress {
    flex: 1;
    margin-left: 12px;

    .progress-bar {
      height: 4px;
      background: var(--color-bg-tertiary);
      border-radius: 2px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: var(--color-primary);
        border-radius: 2px;
        transition: width 0.1s linear;
      }
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .mini-progress {
    display: none;
  }
}
</style>
