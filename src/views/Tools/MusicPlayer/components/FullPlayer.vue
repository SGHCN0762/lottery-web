<template>
  <div v-if="visible" class="full-player" @click.self="$emit('close')">
    <div class="full-player-content">
      <div class="player-top-bar">
        <button class="close-btn" @click="$emit('close')">✕</button>
        <span class="player-title">播放中</span>
        <button class="list-btn" @click="$emit('toggle-playlist')">☰</button>
      </div>

      <div class="vinyl-section">
        <div class="vinyl-wrapper">
          <div class="vinyl-disc" :class="{ spinning: isPlaying }">
            <div class="vinyl-center">
              <span>{{ coverEmoji }}</span>
            </div>
            <div class="vinyl-grooves"></div>
          </div>
          <div class="vinyl-arm" :class="{ playing: isPlaying }"></div>
        </div>
      </div>

      <div class="player-info">
        <h2 class="player-song-title">{{ displayTitle }}</h2>
        <p class="player-artist">{{ artistName }}</p>
      </div>

      <div class="lyrics-area" ref="lyricsContainerRef">
        <div 
          v-for="(line, index) in lyricsWithTime" 
          :key="index"
          class="lyric-line"
          :class="{ active: currentLyricIndex === index }"
          :style="{ animationDelay: line.time + 's' }"
        >
          {{ line.text }}
        </div>
        <div v-if="lyricsWithTime.length === 0" class="no-lyrics">
          <span>暂无歌词</span>
        </div>
      </div>

      <div class="player-progress">
        <span class="time-current">{{ formatTime(currentTime) }}</span>
        <div class="progress-bar" @click="handleSeek">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
        </div>
        <span class="time-total">{{ formatTime(duration) }}</span>
      </div>

      <div class="player-controls">
        <button class="control-btn" @click="$emit('toggle-shuffle')" :class="{ active: isShuffle }">🔀</button>
        <button class="control-btn" @click="$emit('prev')">⏮</button>
        <button class="control-btn play-large-btn" @click="$emit('toggle-play')">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" @click="$emit('next')">⏭</button>
        <button class="control-btn" @click="$emit('toggle-repeat')" :class="{ active: repeatMode !== 'off' }">
          {{ repeatMode === 'one' ? '🔂' : '🔁' }}
        </button>
      </div>

      <div v-if="showPlaylist" class="playlist-drawer">
        <div class="playlist-header">
          <span>播放列表</span>
          <button @click="$emit('toggle-playlist')">✕</button>
        </div>
        <div class="playlist-content">
          <div 
            v-for="(song, index) in playlist" 
            :key="song.id"
            class="playlist-item"
            :class="{ active: currentSong?.id === song.id, playing: isPlaying && currentSong?.id === song.id }"
            @click="$emit('play-song', song)"
          >
            <span class="playlist-index">{{ index + 1 }}</span>
            <span class="playlist-title">{{ getDisplayTitle(song.title) }}</span>
            <button @click.stop="$emit('remove-from-playlist', index)">✕</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  currentSong: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  currentTime: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  progressPercent: {
    type: Number,
    default: 0
  },
  isShuffle: {
    type: Boolean,
    default: false
  },
  repeatMode: {
    type: String,
    default: 'off'
  },
  lyricsWithTime: {
    type: Array,
    default: () => []
  },
  currentLyricIndex: {
    type: Number,
    default: -1
  },
  playlist: {
    type: Array,
    default: () => []
  },
  showPlaylist: {
    type: Boolean,
    default: false
  },
  getDisplayTitle: {
    type: Function,
    required: true
  },
  getAlbumCover: {
    type: Function,
    required: true
  },
  formatTime: {
    type: Function,
    required: true
  },
  artistName: {
    type: String,
    default: '周杰伦'
  }
})

const emit = defineEmits([
  'close',
  'toggle-playlist',
  'toggle-shuffle',
  'toggle-repeat',
  'toggle-play',
  'prev',
  'next',
  'play-song',
  'remove-from-playlist',
  'seek'
])

const lyricsContainerRef = ref(null)

const displayTitle = computed(() => {
  if (!props.currentSong) return ''
  return props.getDisplayTitle(props.currentSong.title)
})

const coverEmoji = computed(() => {
  if (!props.currentSong) return '🎵'
  return props.getAlbumCover(props.currentSong.album)
})

const handleSeek = (event) => {
  emit('seek', event)
}

defineExpose({
  lyricsContainer: lyricsContainerRef
})
</script>

<style lang="less" scoped>
.full-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 200;
  display: flex;
  align-items: flex-end;

  .full-player-content {
    width: 100%;
    background: linear-gradient(180deg, var(--color-bg-tertiary) 0%, var(--color-bg-secondary) 100%);
    border-radius: 20px 20px 0 0;
    padding: 20px;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .player-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .close-btn,
    .list-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-bg-tertiary);
      border: none;
      color: var(--color-text-primary);
      font-size: 14px;
      cursor: pointer;
    }

    .player-title {
      font-size: 14px;
      color: var(--color-text-secondary);
    }
  }

  .vinyl-section {
    text-align: center;
    margin-bottom: 24px;

    .vinyl-wrapper {
      position: relative;
      display: inline-block;
    }

    .vinyl-disc {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle at center, #1a1a1a 0%, #1a1a1a 15%, #333 16%, #1a1a1a 17%, #333 18%, #1a1a1a 19%, #333 20%, #1a1a1a 21%, #333 22%, #1a1a1a 23%, #333 24%, #1a1a1a 25%, #333 26%, #1a1a1a 27%, #333 28%, #1a1a1a 29%, #333 30%, #1a1a1a 31%, #333 32%, #1a1a1a 33%, #333 34%, #1a1a1a 35%, #333 36%, #1a1a1a 37%, #333 38%, #1a1a1a 39%, #333 40%, #1a1a1a 100%);
      position: relative;

      .vinyl-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
      }

      .vinyl-grooves {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 3px);
      }

      &.spinning {
        animation: spin 3s linear infinite;
      }
    }

    .vinyl-arm {
      position: absolute;
      top: -20px;
      right: -30px;
      width: 80px;
      height: 120px;
      border-top: 3px solid var(--color-text-secondary);
      border-right: 3px solid var(--color-text-secondary);
      border-radius: 0 100px 0 0;
      transform-origin: top right;
      transform: rotate(-30deg);
      transition: transform 0.3s;

      &.playing {
        transform: rotate(-10deg);
      }
    }
  }

  .player-info {
    text-align: center;
    margin-bottom: 20px;

    .player-song-title {
      font-size: 22px;
      font-weight: bold;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }

    .player-artist {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }

  .lyrics-area {
    height: 180px;
    overflow-y: auto;
    text-align: center;
    margin-bottom: 20px;

    .lyric-line {
      padding: 8px 0;
      font-size: 14px;
      color: var(--color-text-tertiary);
      transition: all 0.3s;

      &.active {
        color: var(--color-text-primary);
        font-size: 18px;
        font-weight: 500;
        transform: scale(1.05);
      }
    }

    .no-lyrics {
      padding: 40px 0;
      color: var(--color-text-quaternary);
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-border);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-text-tertiary);
      border-radius: 2px;
    }
  }

  .player-progress {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    .time-current,
    .time-total {
      font-size: 12px;
      color: var(--color-text-secondary);
      min-width: 40px;
    }

    .progress-bar {
      flex: 1;
      height: 6px;
      background: var(--color-border);
      border-radius: 3px;
      position: relative;
      cursor: pointer;

      .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 3px;
        transition: width 0.1s linear;
      }

      .progress-thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 14px;
        height: 14px;
        background: var(--color-text-primary);
        border-radius: 50%;
        box-shadow: var(--shadow-sm);
        transition: left 0.1s linear;
      }
    }
  }

  .player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;

    .control-btn {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--color-text-secondary);
      transition: color 0.2s;

      &:hover {
        color: var(--color-text-primary);
      }

      &.active {
        color: var(--color-primary);
      }

      .play-large-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: var(--gradient-primary);
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  .playlist-drawer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    max-width: 300px;
    background: var(--color-bg-card);
    border-radius: 20px 0 0 20px;
    box-shadow: var(--shadow-xl);
    z-index: 10;

    .playlist-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid var(--color-border);

      span {
        font-size: 16px;
        font-weight: bold;
        color: var(--color-text-primary);
      }

      button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--color-bg-tertiary);
        border: none;
        color: var(--color-text-primary);
        font-size: 14px;
        cursor: pointer;
      }
    }

    .playlist-content {
      padding: 12px 0;
      max-height: calc(100% - 70px);
      overflow-y: auto;

      .playlist-item {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: var(--color-bg-tertiary);
        }

        &.active {
          background: rgba(var(--color-primary-rgb), 0.1);
        }

        .playlist-index {
          width: 24px;
          font-size: 13px;
          color: var(--color-text-tertiary);
        }

        .playlist-title {
          flex: 1;
          font-size: 14px;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        button {
          background: transparent;
          border: none;
          color: var(--color-text-tertiary);
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .vinyl-disc {
    width: 200px !important;
    height: 200px !important;

    .vinyl-center {
      width: 70px !important;
      height: 70px !important;
      font-size: 32px !important;
    }
  }
}
</style>
