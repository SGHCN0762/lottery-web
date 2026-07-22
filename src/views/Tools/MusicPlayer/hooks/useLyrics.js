import { ref, computed, nextTick } from 'vue'
import { getLyricUrl } from '../data/songs'

export function useLyrics() {
  const lyricsWithTime = ref([])
  const currentLyricIndex = ref(-1)
  const lyricsContainer = ref(null)

  const currentLyricText = computed(() => {
    if (currentLyricIndex.value >= 0 && lyricsWithTime.value[currentLyricIndex.value]) {
      return lyricsWithTime.value[currentLyricIndex.value].text
    }
    return ''
  })

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

  const loadLyrics = async (song) => {
    lyricsWithTime.value = []
    currentLyricIndex.value = -1

    if (!song.hasLyrics) {
      console.log('No lyrics available for:', song.title)
      return
    }

    let lrcUrl = getLyricUrl(song.artist || '周杰伦', song.album, song.title, song.subFolder || '')
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

  const updateLyrics = (currentTimeVal) => {
    if (lyricsWithTime.value.length === 0) return

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

  const setLyricsContainer = (el) => {
    lyricsContainer.value = el
  }

  return {
    lyricsWithTime,
    currentLyricIndex,
    lyricsContainer,
    currentLyricText,
    loadLyrics,
    updateLyrics,
    parseLyrics,
    setLyricsContainer,
  }
}
