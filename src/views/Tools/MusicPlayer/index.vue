<template>
  <div class="netease-music">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="artist-card">
          <div class="artist-cover">
            <span class="cover-emoji">🎤</span>
            <div class="cover-ring"></div>
          </div>
          <div class="artist-info">
            <h1 class="artist-name">周杰伦</h1>
            <p class="artist-desc">华语乐坛天王 · {{ totalSongs }} 首歌曲 · {{ albums.length }} 张专辑</p>
            <div class="artist-stats">
              <div class="stat-item">
                <span class="stat-num">3652万</span>
                <span class="stat-label">粉丝</span>
              </div>
              <div class="stat-item">
                <span class="stat-num">128亿</span>
                <span class="stat-label">播放</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="tab-bar">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Area -->
    <div class="content-area">
      <!-- Albums View -->
      <div v-if="activeTab === 'albums'" class="albums-view">
        <div class="section-header">
          <h2>全部专辑</h2>
          <span class="more">查看全部</span>
        </div>
        <div class="albums-grid">
          <div 
            v-for="album in albums" 
            :key="album.id"
            class="album-card"
            @click="openAlbum(album)"
          >
            <div class="album-cover-wrapper">
              <div class="album-cover" :style="{ background: getAlbumGradient(album.id) }">
                <span class="cover-icon">{{ album.cover }}</span>
              </div>
              <div class="album-cover-overlay">
                <span class="play-icon">▶</span>
              </div>
            </div>
            <div class="album-info">
              <h3 class="album-name">{{ album.name }}</h3>
              <p class="album-year">{{ album.year }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Songs View -->
      <div v-if="activeTab === 'songs'" class="songs-view">
        <div class="section-header">
          <h2>热门歌曲</h2>
          <button class="play-all-btn" @click="playAll">
            <span>▶</span>
            <span>播放全部</span>
          </button>
        </div>
        <div class="song-list">
          <div 
            v-for="(song, index) in allSongs" 
            :key="song.id"
            class="song-item"
            :class="{ active: currentSong?.id === song.id, playing: isPlaying && currentSong?.id === song.id }"
            @click="playSong(song)"
          >
            <div class="song-rank" :class="{ top: index < 3 }">
              {{ index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1 }}
            </div>
            <div class="song-main">
              <div class="song-info">
                <h4 class="song-title">{{ getDisplayTitle(song.title) }}</h4>
                <p class="song-meta">{{ song.album }}</p>
              </div>
            </div>
            <div class="song-duration">{{ song.duration }}</div>
            <div class="song-actions">
              <button class="action-btn" @click.stop="$emit('add', song)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Search View -->
      <div v-if="activeTab === 'search'" class="search-view">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="搜索歌曲、专辑..."
            @input="handleSearch"
          />
          <span v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</span>
        </div>
        <div v-if="filteredSongs.length > 0" class="search-results">
          <div class="result-header">
            <h3>搜索结果</h3>
            <span>{{ filteredSongs.length }} 首歌曲</span>
          </div>
          <div 
            v-for="song in filteredSongs" 
            :key="song.id"
            class="song-item"
            :class="{ active: currentSong?.id === song.id }"
            @click="playSong(song)"
          >
            <div class="song-rank">{{ getSongIndex(song) + 1 }}</div>
            <div class="song-main">
              <div class="song-info">
                <h4 class="song-title">{{ getDisplayTitle(song.title) }}</h4>
                <p class="song-meta">{{ song.album }}</p>
              </div>
            </div>
            <div class="song-duration">{{ song.duration }}</div>
          </div>
        </div>
        <div v-else class="empty-state">
          <span class="empty-icon">🎶</span>
          <p>搜索你想听的歌曲</p>
        </div>
      </div>
    </div>

    <!-- Lyrics Preview -->
    <div v-if="currentSong && lyricsWithTime.length > 0" class="lyrics-preview">
      <div class="preview-content">
        <span class="current-lyric">{{ currentLyricText }}</span>
      </div>
    </div>

    <!-- Mini Player -->
    <div v-if="currentSong" class="mini-player" @click="showFullPlayer = true">
      <div class="mini-cover-wrapper">
        <div class="mini-cover" :class="{ spinning: isPlaying }">
          <span>{{ getAlbumCover(currentSong.album) }}</span>
        </div>
      </div>
      <div class="mini-info">
        <h4 class="mini-title">{{ getDisplayTitle(currentSong.title) }}</h4>
        <p class="mini-artist">周杰伦</p>
      </div>
      <div class="mini-controls">
        <button class="control-btn" @click.stop="prevSong">⏮</button>
        <button class="control-btn play-btn" @click.stop="togglePlay">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" @click.stop="nextSong">⏭</button>
      </div>
      <div class="mini-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Full Player Modal -->
    <div v-if="showFullPlayer" class="full-player" @click.self="showFullPlayer = false">
      <div class="full-player-content">
        <!-- Top Bar -->
        <div class="player-top-bar">
          <button class="close-btn" @click="showFullPlayer = false">✕</button>
          <span class="player-title">播放中</span>
          <button class="list-btn" @click="showPlaylist = !showPlaylist">☰</button>
        </div>

        <!-- Vinyl Player -->
        <div class="vinyl-section">
          <div class="vinyl-wrapper">
            <div class="vinyl-disc" :class="{ spinning: isPlaying }">
              <div class="vinyl-center">
                <span>{{ getAlbumCover(currentSong?.album) }}</span>
              </div>
              <div class="vinyl-grooves"></div>
            </div>
            <div class="vinyl-arm" :class="{ playing: isPlaying }"></div>
          </div>
        </div>

        <!-- Song Info -->
        <div class="player-info">
          <h2 class="player-song-title">{{ getDisplayTitle(currentSong?.title) }}</h2>
          <p class="player-artist">周杰伦</p>
        </div>

        <!-- Lyrics Area -->
        <div class="lyrics-area" ref="lyricsContainer">
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

        <!-- Progress Bar -->
        <div class="player-progress">
          <span class="time-current">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seekTo">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
            <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
          </div>
          <span class="time-total">{{ formatTime(duration) }}</span>
        </div>

        <!-- Controls -->
        <div class="player-controls">
          <button class="control-btn" @click="toggleShuffle" :class="{ active: isShuffle }">🔀</button>
          <button class="control-btn" @click="prevSong">⏮</button>
          <button class="control-btn play-large-btn" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="control-btn" @click="nextSong">⏭</button>
          <button class="control-btn" @click="toggleRepeat" :class="{ active: repeatMode !== 'off' }">
            {{ repeatMode === 'one' ? '🔂' : '🔁' }}
          </button>
        </div>

        <!-- Playlist Drawer -->
        <div v-if="showPlaylist" class="playlist-drawer">
          <div class="playlist-header">
            <span>播放列表</span>
            <button @click="showPlaylist = false">✕</button>
          </div>
          <div class="playlist-content">
            <div 
              v-for="(song, index) in playlist" 
              :key="song.id"
              class="playlist-item"
              :class="{ active: currentSong?.id === song.id, playing: isPlaying && currentSong?.id === song.id }"
              @click="playSong(song)"
            >
              <span class="playlist-index">{{ index + 1 }}</span>
              <span class="playlist-title">{{ getDisplayTitle(song.title) }}</span>
              <button @click.stop="removeFromPlaylist(index)">✕</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Album Modal -->
    <div v-if="selectedAlbum" class="album-modal" @click.self="selectedAlbum = null">
      <div class="album-modal-content">
        <div class="modal-header">
          <button class="close-btn" @click="selectedAlbum = null">✕</button>
          <div class="album-header-info">
            <div class="modal-cover" :style="{ background: getAlbumGradient(selectedAlbum.id) }">
              <span>{{ selectedAlbum.cover }}</span>
            </div>
            <div class="modal-info">
              <h2>{{ selectedAlbum.name }}</h2>
              <p>{{ selectedAlbum.year }} · {{ getAlbumSongCount(selectedAlbum) }} 首歌曲</p>
            </div>
          </div>
        </div>
        <div class="modal-song-list">
          <div 
            v-for="(song, index) in getAlbumSongs(selectedAlbum)" 
            :key="song.id"
            class="song-item"
            :class="{ active: currentSong?.id === song.id }"
            @click="playSong(song); selectedAlbum = null"
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

    <!-- Audio Element -->
    <audio ref="audioElement" @timeupdate="onTimeUpdate" @ended="onSongEnded" @loadedmetadata="onLoadedMetadata">
      <source :src="currentSongUrl" type="audio/mpeg">
    </audio>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { albums, getSongUrl, getLyricUrl, getAllSongs } from './data/songs'

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
const currentSong = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isShuffle = ref(false)
const repeatMode = ref('off')
const lyricsWithTime = ref([])
const currentLyricIndex = ref(-1)
const lyricsContainer = ref(null)
const playlist = ref([])

const allSongs = computed(() => getAllSongs())
const totalSongs = computed(() => allSongs.value.length)

const currentSongUrl = computed(() => {
  if (!currentSong.value) return ''
  const baseUrl = getSongUrl(currentSong.value.album, currentSong.value.title, currentSong.value.subFolder || '')
  return baseUrl + '?t=' + Date.now()
})

const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const currentLyricText = computed(() => {
  if (currentLyricIndex.value >= 0 && lyricsWithTime.value[currentLyricIndex.value]) {
    return lyricsWithTime.value[currentLyricIndex.value].text
  }
  return ''
})

const filteredSongs = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return allSongs.value.filter(song => 
    song.title.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query)
  )
})

const getAlbumGradient = (albumId) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ]
  let hash = 0
  for (let i = 0; i < albumId.length; i++) {
    hash = albumId.charCodeAt(i) + ((hash << 5) - hash)
  }
  return gradients[Math.abs(hash) % gradients.length]
}

const getAlbumCover = (albumName) => {
  const album = albums.find(a => a.name === albumName)
  return album ? album.cover : '🎵'
}

const getDisplayTitle = (title) => {
  return title.replace(/\(.*\)/g, '').replace(/\(.*\)$/g, '').trim()
}

const getSongIndex = (song) => {
  return allSongs.value.findIndex(s => s.id === song.id)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const playSong = (song) => {
  currentSong.value = song
  audioElement.value.src = currentSongUrl.value
  audioElement.value.play()
  isPlaying.value = true
  
  if (!playlist.value.find(s => s.id === song.id)) {
    playlist.value.push(song)
  }
  
  loadLyrics(song)
}

const playAll = () => {
  if (allSongs.value.length > 0) {
    playlist.value = [...allSongs.value]
    playSong(allSongs.value[0])
  }
}

const togglePlay = () => {
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const prevSong = () => {
  if (!currentSong.value) return
  let currentIndex = playlist.value.findIndex(s => s.id === currentSong.value.id)
  let newIndex
  
  if (isShuffle.value) {
    newIndex = Math.floor(Math.random() * playlist.value.length)
  } else {
    newIndex = currentIndex > 0 ? currentIndex - 1 : playlist.value.length - 1
  }
  
  if (playlist.value[newIndex]) {
    playSong(playlist.value[newIndex])
  }
}

const nextSong = () => {
  if (!currentSong.value) return
  let currentIndex = playlist.value.findIndex(s => s.id === currentSong.value.id)
  let newIndex
  
  if (isShuffle.value) {
    newIndex = Math.floor(Math.random() * playlist.value.length)
  } else {
    newIndex = currentIndex < playlist.value.length - 1 ? currentIndex + 1 : 0
  }
  
  if (playlist.value[newIndex]) {
    playSong(playlist.value[newIndex])
  }
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const toggleRepeat = () => {
  const modes = ['off', 'all', 'one']
  const currentIndex = modes.indexOf(repeatMode.value)
  repeatMode.value = modes[(currentIndex + 1) % modes.length]
}

const seekTo = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  audioElement.value.currentTime = percent * duration.value
}

const loadLyrics = async (song) => {
  lyricsWithTime.value = []
  currentLyricIndex.value = -1
  
  if (!song.hasLyrics) {
    console.log('No lyrics available for:', song.title)
    return
  }
  
  let lrcUrl = getLyricUrl(song.album, song.title, song.subFolder || '')
  lrcUrl += '?t=' + Date.now()
  console.log('Loading lyrics from URL:', lrcUrl)
  
  try {
    const response = await fetch(lrcUrl)
    console.log('Lyrics response:', response.status, response.ok)
    console.log('Content-Type:', response.headers.get('Content-Type'))
    console.log('Content-Encoding:', response.headers.get('Content-Encoding'))
    
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer()
      console.log('Buffer size:', arrayBuffer.byteLength)
      
      const decoder = new TextDecoder('GBK')
      let text = decoder.decode(arrayBuffer)
      
      if (text.includes('�')) {
        const decoderUtf8 = new TextDecoder('utf-8')
        text = decoderUtf8.decode(arrayBuffer)
        console.log('UTF-8 decoded text preview:', text.substring(0, 100))
      }
      
      console.log('Lyrics text preview:', text.substring(0, 100))
      
      lyricsWithTime.value = parseLyrics(text)
      console.log('Parsed lyrics count:', lyricsWithTime.value.length)
    } else {
      console.log('Lyrics fetch failed:', response.status)
    }
  } catch (e) {
    console.error('Lyrics fetch error:', e)
  }
}

const parseLyrics = (text) => {
  const lines = text.split(/\r?\n/)
  const result = []
  
  lines.forEach(line => {
    line = line.trim()
    if (!line) return
    
    const timeTags = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g)
    if (!timeTags) return
    
    const textContent = line.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g, '').trim()
    
    timeTags.forEach(tag => {
      const tagMatch = tag.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
      if (tagMatch) {
        const mins = parseInt(tagMatch[1])
        const secs = parseInt(tagMatch[2])
        const msStr = tagMatch[3]
        const ms = parseInt(msStr)
        const time = mins * 60 + secs + (msStr.length === 2 ? ms / 100 : ms / 1000)
        result.push({
          time,
          text: textContent
        })
      }
    })
  })
  
  result.sort((a, b) => a.time - b.time)
  return result.length > 0 ? result : []
}

const onTimeUpdate = () => {
  currentTime.value = audioElement.value.currentTime
  updateLyrics()
}

const onLoadedMetadata = () => {
  duration.value = audioElement.value.duration
}

const onSongEnded = () => {
  if (repeatMode.value === 'one') {
    audioElement.value.currentTime = 0
    audioElement.value.play()
  } else {
    nextSong()
  }
}

const updateLyrics = () => {
  if (lyricsWithTime.value.length === 0) return
  
  const currentTimeVal = currentTime.value
  const index = lyricsWithTime.value.findIndex((line, i) => 
    currentTimeVal >= line.time && (i === lyricsWithTime.value.length - 1 || currentTimeVal < lyricsWithTime.value[i + 1].time)
  )
  
  if (index !== -1 && currentLyricIndex.value !== index) {
    currentLyricIndex.value = index
    
    nextTick(() => {
      if (lyricsContainer.value) {
        const activeLine = lyricsContainer.value.querySelector('.lyric-line.active')
        if (activeLine) {
          activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    })
  }
}

const handleSearch = () => {
}

const openAlbum = (album) => {
  selectedAlbum.value = album
}

const getAlbumSongCount = (album) => {
  if (album.subFolders) {
    return album.subFolders.reduce((sum, sub) => sum + sub.songs.length, 0)
  }
  return album.songs.length
}

const getAlbumSongs = (album) => {
  if (album.subFolders) {
    return album.subFolders.flatMap(sub => 
      sub.songs.map(song => ({ ...song, album: album.name, subFolder: sub.name }))
    )
  }
  return album.songs.map(song => ({ ...song, album: album.name, subFolder: '' }))
}

const removeFromPlaylist = (index) => {
  playlist.value.splice(index, 1)
}

onMounted(() => {
})

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value.src = ''
  }
})

watch(currentSong, () => {
  currentTime.value = 0
  duration.value = 0
})
</script>

<style lang="less" scoped>
.netease-music {
  min-height: 100vh;
  background: var(--color-bg-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding-bottom: 120px;
}

.hero-section {
  position: relative;
  padding: 20px;
  overflow: hidden;
  
  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-bg-primary) 100%);
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .artist-card {
    display: flex;
    gap: 20px;
    background: var(--color-bg-card);
    border-radius: 12px;
    padding: 20px;
    box-shadow: var(--shadow-lg);
  }
  
  .artist-cover {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .cover-emoji {
      font-size: 50px;
    }
    
    .cover-ring {
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid rgba(194, 12, 12, 0.3);
      border-radius: 12px;
    }
  }
  
  .artist-info {
    flex: 1;
    
    .artist-name {
      font-size: 24px;
      font-weight: bold;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }
    
    .artist-desc {
      font-size: 13px;
      color: var(--color-text-tertiary);
      margin: 0 0 16px;
    }
    
    .artist-stats {
      display: flex;
      gap: 30px;
      
      .stat-item {
        display: flex;
        flex-direction: column;
        
        .stat-num {
          font-size: 18px;
          font-weight: bold;
          color: var(--color-primary);
        }
        
        .stat-label {
          font-size: 11px;
          color: var(--color-text-tertiary);
          margin-top: 2px;
        }
      }
    }
  }
}

.tab-bar {
  display: flex;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  padding: 0 16px;
  
  .tab-item {
    flex: 1;
    padding: 16px 0;
    background: transparent;
    border: none;
    font-size: 15px;
    color: var(--color-text-secondary);
    font-weight: 500;
    position: relative;
    cursor: pointer;
    
    &.active {
      color: var(--color-primary);
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 3px;
        background: var(--color-primary);
        border-radius: 2px;
      }
    }
  }
}

.content-area {
  padding: 16px;
}

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
  
  .more {
    font-size: 13px;
    color: var(--color-text-tertiary);
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

.albums-view {
  .albums-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  .album-card {
    cursor: pointer;
    
    .album-cover-wrapper {
      position: relative;
      padding-top: 100%;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 8px;
      
      .album-cover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .cover-icon {
          font-size: 36px;
        }
      }
      
      .album-cover-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
        
        .play-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          margin-left: 4px;
        }
      }
      
      &:hover .album-cover-overlay {
        opacity: 1;
      }
    }
    
    .album-info {
      .album-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text-primary);
        margin: 0 0 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .album-year {
        font-size: 11px;
        color: var(--color-text-tertiary);
        margin: 0;
      }
    }
  }
}

.songs-view,
.search-view {
  .song-list,
  .search-results {
    background: var(--color-bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }
  
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
    
    &.playing .song-rank {
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
}

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

.lyrics-preview {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 89;
  text-align: center;
  animation: fadeInUp 0.3s ease;
  
  .preview-content {
    .current-lyric {
      font-size: 14px;
      color: var(--color-text-secondary);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@media (max-width: 480px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  .mini-progress {
    display: none;
  }
  
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