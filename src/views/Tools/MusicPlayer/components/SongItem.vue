<template>
  <div 
    class="song-item"
    :class="{ active: isActive, playing: isPlaying && isActive }"
    @click="$emit('click')"
  >
    <div v-if="showRank" class="song-rank" :class="{ top: rank < 3 }">
      {{ rank < 3 ? ['🥇', '🥈', '🥉'][rank] : rank + 1 }}
    </div>
    <div v-if="showIndex" class="song-index">{{ rank + 1 }}</div>
    <div class="song-main">
      <div class="song-info">
        <h4 class="song-title">{{ displayTitle }}</h4>
        <p v-if="showAlbum" class="song-meta">{{ song.album }}</p>
      </div>
    </div>
    <div v-if="showDuration" class="song-duration">{{ song.duration }}</div>
    <div v-if="showAdd" class="song-actions">
      <button class="action-btn" @click.stop="$emit('add', song)">+</button>
    </div>
    <div v-if="showRemove" class="song-actions">
      <button class="action-btn" @click.stop="$emit('remove')">✕</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  showRank: {
    type: Boolean,
    default: false
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  showAlbum: {
    type: Boolean,
    default: false
  },
  showDuration: {
    type: Boolean,
    default: true
  },
  showAdd: {
    type: Boolean,
    default: false
  },
  showRemove: {
    type: Boolean,
    default: false
  },
  getDisplayTitle: {
    type: Function,
    default: (title) => title
  }
})

defineEmits(['click', 'add', 'remove'])

const displayTitle = computed(() => props.getDisplayTitle(props.song.title))
</script>

<style lang="less" scoped>
.song-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--color-bg-tertiary);
  }

  &.active {
    background: rgba(194, 12, 12, 0.05);
  }

  &.playing .song-rank,
  &.playing .song-index {
    color: var(--color-primary);
  }

  .song-rank {
    width: 24px;
    font-size: 14px;
    color: var(--color-text-tertiary);
    text-align: center;

    &.top {
      font-size: 16px;
    }
  }

  .song-index {
    width: 24px;
    font-size: 13px;
    color: var(--color-text-tertiary);
  }

  .song-main {
    flex: 1;
    padding: 0 12px;
  }

  .song-info {
    .song-title {
      font-size: 15px;
      color: var(--color-text-primary);
      margin: 0 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .song-meta {
      font-size: 12px;
      color: var(--color-text-tertiary);
      margin: 0;
    }
  }

  .song-duration {
    font-size: 13px;
    color: var(--color-text-tertiary);
    margin-right: 12px;
  }

  .song-actions {
    .action-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--color-bg-tertiary);
      border: none;
      color: var(--color-text-secondary);
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: var(--color-primary);
        color: #fff;
      }
    }
  }
}
</style>
