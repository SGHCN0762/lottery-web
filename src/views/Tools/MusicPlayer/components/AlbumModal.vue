<template>
  <div v-if="album" class="album-modal" @click.self="$emit('close')">
    <div class="album-modal-content">
      <div class="modal-header">
        <button class="close-btn" @click="$emit('close')">✕</button>
        <div class="album-header-info">
          <div class="modal-cover" :style="{ background: getAlbumGradient(album.id) }">
            <span>{{ album.cover }}</span>
          </div>
          <div class="modal-info">
            <h2>{{ album.name }}</h2>
            <p>{{ album.year }} · {{ songCount }} 首歌曲</p>
          </div>
        </div>
      </div>
      <div class="modal-song-list">
        <div 
          v-for="(song, index) in albumSongs" 
          :key="song.id"
          class="song-item"
          :class="{ active: currentSong?.id === song.id }"
          @click="handlePlaySong(song)"
        >
          <span class="song-index">{{ index + 1 }}</span>
          <div class="song-info">
            <h4>{{ getDisplayTitle(song.title) }}</h4>
          </div>
          <span class="song-duration">{{ song.duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  album: {
    type: Object,
    default: null
  },
  currentSong: {
    type: Object,
    default: null
  },
  getAlbumGradient: {
    type: Function,
    required: true
  },
  getAlbumSongs: {
    type: Function,
    required: true
  },
  getAlbumSongCount: {
    type: Function,
    required: true
  },
  getDisplayTitle: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['close', 'play-song'])

const albumSongs = computed(() => {
  if (!props.album) return []
  return props.getAlbumSongs(props.album)
})

const songCount = computed(() => {
  if (!props.album) return 0
  return props.getAlbumSongCount(props.album)
})

const handlePlaySong = (song) => {
  emit('play-song', song)
  emit('close')
}
</script>

<style lang="less" scoped>
.album-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 150;

  .album-modal-content {
    width: 100%;
    background: var(--color-bg-secondary);
    border-radius: 20px 20px 0 0;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
    position: relative;

    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-bg-tertiary);
      border: none;
      color: var(--color-text-secondary);
      font-size: 14px;
      cursor: pointer;
    }

    .album-header-info {
      display: flex;
      gap: 16px;

      .modal-cover {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
      }

      .modal-info {
        h2 {
          font-size: 20px;
          font-weight: bold;
          color: var(--color-text-primary);
          margin: 0 0 8px;
        }

        p {
          font-size: 14px;
          color: var(--color-text-tertiary);
          margin: 0;
        }
      }
    }
  }

  .modal-song-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;

    .song-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;

      &:hover {
        background: var(--color-bg-tertiary);
      }

      .song-index {
        width: 24px;
        font-size: 13px;
        color: var(--color-text-tertiary);
      }

      .song-info {
        flex: 1;

        h4 {
          font-size: 15px;
          color: var(--color-text-primary);
          margin: 0;
        }
      }

      .song-duration {
        font-size: 13px;
        color: var(--color-text-tertiary);
      }
    }
  }
}
</style>
