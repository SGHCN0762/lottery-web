<template>
  <div class="netease-music">
    <HeroSection
      :artist-name="currentArtist.name"
      :artist-desc="currentArtist.desc"
      :total-songs="totalSongs"
      :album-count="currentArtistAlbums.length"
      :cover="currentArtist.cover"
    />

    <div class="artist-switcher" v-if="artists.length > 1">
      <div class="artist-list">
        <button
          v-for="artist in artists"
          :key="artist.id"
          class="artist-btn"
          :class="{ active: currentArtist.id === artist.id }"
          @click="switchArtist(artist)"
        >
          <span class="artist-avatar">{{ artist.cover }}</span>
          <span class="artist-name">{{ artist.name }}</span>
        </button>
      </div>
    </div>

    <TabBar
      :tabs="tabs"
      v-model:activeTab="activeTab"
    />

    <div class="content-area">
      <AlbumsView
        v-if="activeTab === 'albums'"
        :albums="currentArtistAlbums"
        :get-album-gradient="getAlbumGradient"
        @open-album="openAlbum"
      />

      <SongsView
        v-if="activeTab === 'songs'"
        :songs="allSongs"
        :current-song="currentSong"
        :is-playing="isPlaying"
        :get-display-title="getDisplayTitle"
        @play-song="handlePlaySong"
        @play-all="playAll"
        @add="handleAddSong"
      />

      <SearchView
        v-if="activeTab === 'search'"
        v-model:search-query="searchQuery"
        :filtered-songs="filteredSongs"
        :current-song="currentSong"
        :get-display-title="getDisplayTitle"
        :get-song-index="getSongIndex"
        @play-song="handlePlaySong"
        @search="handleSearch"
      />
    </div>

    <LyricsPreview
      :visible="currentSong && lyricsWithTime.length > 0"
      :lyric-text="currentLyricText"
    />

    <MiniPlayer
      :current-song="currentSong"
      :is-playing="isPlaying"
      :progress-percent="progressPercent"
      :get-display-title="getDisplayTitle"
      :get-album-cover="getAlbumCover"
      :artist-name="currentSong?.artist || currentArtist.name"
      @expand="showFullPlayer = true"
      @prev="prevSong"
      @next="nextSong"
      @toggle-play="togglePlay"
    />

    <FullPlayer
      :visible="showFullPlayer"
      :current-song="currentSong"
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="duration"
      :progress-percent="progressPercent"
      :is-shuffle="isShuffle"
      :repeat-mode="repeatMode"
      :lyrics-with-time="lyricsWithTime"
      :current-lyric-index="currentLyricIndex"
      :playlist="playlist"
      :show-playlist="showPlaylist"
      :get-display-title="getDisplayTitle"
      :get-album-cover="getAlbumCover"
      :format-time="formatTime"
      :artist-name="currentSong?.artist || currentArtist.name"
      ref="fullPlayerRef"
      @close="showFullPlayer = false"
      @toggle-playlist="showPlaylist = !showPlaylist"
      @toggle-shuffle="toggleShuffle"
      @toggle-repeat="toggleRepeat"
      @toggle-play="togglePlay"
      @prev="prevSong"
      @next="nextSong"
      @play-song="handlePlaySong"
      @remove-from-playlist="removeFromPlaylist"
      @seek="seekTo"
    />

    <AlbumModal
      :album="selectedAlbum"
      :current-song="currentSong"
      :get-album-gradient="getAlbumGradient"
      :get-album-songs="getAlbumSongs"
      :get-album-song-count="getAlbumSongCount"
      :get-display-title="getDisplayTitle"
      @close="selectedAlbum = null"
      @play-song="handlePlaySong"
    />

    <audio ref="audioElement" @timeupdate="onAudioTimeUpdate" @ended="onSongEnded" @loadedmetadata="onLoadedMetadata">
      <source :src="currentSongUrl" type="audio/mpeg">
    </audio>
    
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { useLyrics } from './hooks/useLyrics'
import HeroSection from './components/HeroSection.vue'
import TabBar from './components/TabBar.vue'
import AlbumsView from './components/AlbumsView.vue'
import SongsView from './components/SongsView.vue'
import SearchView from './components/SearchView.vue'
import LyricsPreview from './components/LyricsPreview.vue'
import MiniPlayer from './components/MiniPlayer.vue'
import FullPlayer from './components/FullPlayer.vue'
import AlbumModal from './components/AlbumModal.vue'

const tabs = [
  { key: 'albums', label: '专辑' },
  { key: 'songs', label: '歌曲' },
  { key: 'search', label: '搜索' },
]

const activeTab = ref('albums')
const searchQuery = ref('')
const selectedAlbum = ref(null)
const showFullPlayer = ref(false)
const showPlaylist = ref(false)
const audioElement = ref(null)
const fullPlayerRef = ref(null)

const {
  currentSong,
  currentArtist,
  isPlaying,
  currentTime,
  duration,
  isShuffle,
  repeatMode,
  playlist,
  allSongs,
  totalSongs,
  currentSongUrl,
  progressPercent,
  getAlbumGradient,
  getAlbumCover,
  getDisplayTitle,
  getSongIndex,
  formatTime,
  playSong,
  playAll,
  togglePlay,
  prevSong,
  nextSong,
  toggleShuffle,
  toggleRepeat,
  seekTo,
  onLoadedMetadata,
  onSongEnded,
  getAlbumSongCount,
  getAlbumSongs,
  removeFromPlaylist,
  setAudioElement,
  setCurrentArtist,
  artists,
} = useMusicPlayer()

const {
  lyricsWithTime,
  currentLyricIndex,
  currentLyricText,
  loadLyrics,
  updateLyrics,
  setLyricsContainer,
} = useLyrics()

const currentArtistAlbums = computed(() => currentArtist.value?.albums || [])

const filteredSongs = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return allSongs.value.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query) ||
    (song.artist && song.artist.toLowerCase().includes(query))
  )
})

const handlePlaySong = (song) => {
  playSong(song)
  loadLyrics(song)
}

const handleAddSong = (song) => {
}

const handleSearch = () => {
}

const openAlbum = (album) => {
  selectedAlbum.value = album
}

const switchArtist = (artist) => {
  setCurrentArtist(artist)
  selectedAlbum.value = null
  activeTab.value = 'albums'
}

const onAudioTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
    updateLyrics(currentTime.value)
  }
}

watch(showFullPlayer, (val) => {
  if (val && fullPlayerRef.value) {
    nextTick(() => {
      if (fullPlayerRef.value.lyricsContainer) {
        setLyricsContainer(fullPlayerRef.value.lyricsContainer)
      }
    })
  }
})

onMounted(() => {
  setAudioElement(audioElement.value)
})
</script>

<style lang="less" scoped>
.netease-music {
  min-height: 100vh;
  background: var(--color-bg-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding-bottom: 120px;
}

.content-area {
  padding: 16px;
}

.artist-switcher {
  background: var(--color-bg-secondary);
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);

  .artist-list {
    display: flex;
    gap: 12px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .artist-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    border: 2px solid transparent;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: var(--color-bg-tertiary);
    }

    &.active {
      background: rgba(var(--color-primary-rgb), 0.1);
      border-color: var(--color-primary);
    }

    .artist-avatar {
      font-size: 20px;
    }

    .artist-name {
      font-size: 14px;
      color: var(--color-text-primary);
      font-weight: 500;
    }
  }
}
</style>
