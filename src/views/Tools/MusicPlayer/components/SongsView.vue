<template>
  <div class="songs-view">
    <div class="section-header">
      <h2>热门歌曲</h2>
      <button class="play-all-btn" @click="$emit('play-all')">
        <span>▶</span>
        <span>播放全部</span>
      </button>
    </div>
    <div class="song-list">
      <SongItem
        v-for="(song, index) in songs"
        :key="song.id"
        :song="song"
        :rank="index"
        :is-active="currentSong?.id === song.id"
        :is-playing="isPlaying"
        :show-rank="true"
        :show-album="true"
        :show-duration="true"
        :show-add="true"
        :get-display-title="getDisplayTitle"
        @click="$emit('play-song', song)"
        @add="(s) => $emit('add', s)"
      />
    </div>
  </div>
</template>

<script setup>
import SongItem from './SongItem.vue'

defineProps({
  songs: {
    type: Array,
    required: true
  },
  currentSong: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  getDisplayTitle: {
    type: Function,
    required: true
  }
})

defineEmits(['play-song', 'play-all', 'add'])
</script>

<style lang="less" scoped>
.songs-view {
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h2 {
      font-size: 18px;
      font-weight: bold;
      color: var(--color-text-primary);
      margin: 0;
    }

    .play-all-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: var(--color-primary);
      color: #fff;
      border: none;
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;

      span:first-child {
        font-size: 12px;
      }
    }
  }

  .song-list {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
