<template>
  <div class="search-view">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input 
        type="text" 
        :value="searchQuery"
        placeholder="搜索歌曲、专辑..."
        @input="handleInput"
      />
      <span v-if="searchQuery" class="clear-btn" @click="$emit('update:searchQuery', '')">✕</span>
    </div>
    <div v-if="filteredSongs.length > 0" class="search-results">
      <div class="result-header">
        <h3>搜索结果</h3>
        <span>{{ filteredSongs.length }} 首歌曲</span>
      </div>
      <SongItem
        v-for="song in filteredSongs"
        :key="song.id"
        :song="song"
        :rank="getSongIndex(song)"
        :is-active="currentSong?.id === song.id"
        :show-index="true"
        :show-album="true"
        :show-duration="true"
        :get-display-title="getDisplayTitle"
        @click="$emit('play-song', song)"
      />
    </div>
    <div v-else class="empty-state">
      <span class="empty-icon">🎶</span>
      <p>搜索你想听的歌曲</p>
    </div>
  </div>
</template>

<script setup>
import SongItem from './SongItem.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  filteredSongs: {
    type: Array,
    required: true
  },
  currentSong: {
    type: Object,
    default: null
  },
  getDisplayTitle: {
    type: Function,
    required: true
  },
  getSongIndex: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['update:searchQuery', 'play-song', 'search'])

const handleInput = (e) => {
  emit('update:searchQuery', e.target.value)
  emit('search')
}
</script>

<style lang="less" scoped>
.search-view {
  .search-box {
    display: flex;
    align-items: center;
    background: var(--color-bg-secondary);
    border-radius: 25px;
    padding: 10px 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .search-icon {
      font-size: 16px;
      margin-right: 10px;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      background: transparent;
    }

    .clear-btn {
      font-size: 14px;
      color: var(--color-text-tertiary);
      cursor: pointer;
    }
  }

  .search-results {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0;
    }

    span {
      font-size: 12px;
      color: var(--color-text-tertiary);
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 0;

    .empty-icon {
      font-size: 48px;
      display: block;
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
      color: var(--color-text-tertiary);
      margin: 0;
    }
  }
}
</style>
