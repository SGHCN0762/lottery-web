import { ref, computed, watch, onUnmounted } from 'vue'
import { artists, getSongUrl, getAllSongs, getArtistAlbums } from '../data/songs'

export function useMusicPlayer() {
  const audioElement = ref(null)
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const isShuffle = ref(false)
  const repeatMode = ref('off')
  const playlist = ref([])
  const currentArtist = ref(artists[0])

  const allSongs = computed(() => getAllSongs(currentArtist.value?.name))
  const totalSongs = computed(() => allSongs.value.length)

  const currentSongUrl = computed(() => {
    if (!currentSong.value) return ''
    const baseUrl = getSongUrl(
      currentSong.value.artist || currentArtist.value?.name || '周杰伦',
      currentSong.value.album,
      currentSong.value.title,
      currentSong.value.subFolder || ''
    )
    return baseUrl + '?t=' + Date.now()
  })

  const progressPercent = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
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
    const albums = getArtistAlbums(currentArtist.value?.name)
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
    if (audioElement.value) {
      audioElement.value.src = currentSongUrl.value
      audioElement.value.play()
    }
    isPlaying.value = true

    if (!playlist.value.find(s => s.id === song.id)) {
      playlist.value.push(song)
    }
  }

  const playAll = () => {
    if (allSongs.value.length > 0) {
      playlist.value = [...allSongs.value]
      playSong(allSongs.value[0])
    }
  }

  const togglePlay = () => {
    if (!audioElement.value) return
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
    if (!audioElement.value) return
    const rect = event.currentTarget.getBoundingClientRect()
    const percent = (event.clientX - rect.left) / rect.width
    audioElement.value.currentTime = percent * duration.value
  }

  const onTimeUpdate = () => {
    if (audioElement.value) {
      currentTime.value = audioElement.value.currentTime
    }
  }

  const onLoadedMetadata = () => {
    if (audioElement.value) {
      duration.value = audioElement.value.duration
    }
  }

  const onSongEnded = () => {
    if (repeatMode.value === 'one') {
      if (audioElement.value) {
        audioElement.value.currentTime = 0
        audioElement.value.play()
      }
    } else {
      nextSong()
    }
  }

  const getAlbumSongCount = (album) => {
    if (album.subFolders) {
      return album.subFolders.reduce((sum, sub) => sum + sub.songs.length, 0)
    }
    return album.songs.length
  }

  const getAlbumSongs = (album) => {
    const artistName = currentArtist.value?.name || '周杰伦'
    if (album.subFolders) {
      return album.subFolders.flatMap(sub =>
        sub.songs.map(song => ({ ...song, artist: artistName, album: album.name, subFolder: sub.name }))
      )
    }
    return album.songs.map(song => ({ ...song, artist: artistName, album: album.name, subFolder: '' }))
  }

  const removeFromPlaylist = (index) => {
    playlist.value.splice(index, 1)
  }

  const setAudioElement = (el) => {
    audioElement.value = el
  }

  const setCurrentArtist = (artist) => {
    currentArtist.value = artist
    playlist.value = []
  }

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

  return {
    audioElement,
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
    onTimeUpdate,
    onLoadedMetadata,
    onSongEnded,
    getAlbumSongCount,
    getAlbumSongs,
    removeFromPlaylist,
    setAudioElement,
    setCurrentArtist,
    artists,
  }
}
