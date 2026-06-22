/**
 * 音频引擎 Composable
 * 使用 Web Audio API 管理双轨音频播放
 */
import { ref, shallowRef } from 'vue'

let audioContext = null
const deckA = shallowRef(null)
const deckB = shallowRef(null)
const deckASource = shallowRef(null)
const deckBSource = shallowRef(null)
const deckAGain = shallowRef(null)
const deckBGain = shallowRef(null)
const deckAAnalyser = shallowRef(null)
const deckBAnalyser = shallowRef(null)
const masterGain = shallowRef(null)
const masterAnalyser = shallowRef(null)

const deckAState = ref({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  pitch: 0,
  eq: { high: 0, mid: 0, low: 0 },
  trackUrl: null,
  trackName: null,
  bpm: 120,
})

const deckBState = ref({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  pitch: 0,
  eq: { high: 0, mid: 0, low: 0 },
  trackUrl: null,
  trackName: null,
  bpm: 120,
})

const crossfader = ref(0)
const masterBpm = ref(120)
const isInitialized = ref(false)
const isRecording = ref(false)
const recordedBlob = shallowRef(null)

const effectsState = ref({
  filterHighPass: 0,
  filterLowPass: 0,
  echo: { enabled: false, time: 0.3, feedback: 0.4 },
  reverb: { enabled: false, time: 1.5, mix: 0.3 },
  flanger: { enabled: false, time: 0.002, depth: 0.5 },
})

let updateInterval = null
let mediaRecorder = null
let recordedChunks = []

function getAudioContext() {
  try {
    if (!audioContext) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) {
        throw new Error('Web Audio API not supported')
      }
      audioContext = new Ctx()
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    return audioContext
  } catch (e) {
    console.error('Failed to create AudioContext:', e)
    return null
  }
}

export function useAudioEngine() {
  function initDeck(deck) {
    try {
      const ctx = getAudioContext()
      const audioEl = deck === 'A' ? deckA.value : deckB.value

      if (!ctx || !audioEl) return

      // 创建 master gain 和 analyser
      if (!masterGain.value) {
        masterGain.value = ctx.createGain()
        masterAnalyser.value = ctx.createAnalyser()
        masterAnalyser.value.fftSize = 2048
        masterGain.value.connect(masterAnalyser.value)
        masterAnalyser.value.connect(ctx.destination)
      }

      if (deck === 'A' && !deckASource.value) {
        deckASource.value = ctx.createMediaElementSource(audioEl)
        deckAGain.value = ctx.createGain()
        deckAAnalyser.value = ctx.createAnalyser()
        deckAAnalyser.value.fftSize = 2048

        deckASource.value.connect(deckAGain.value)
        deckAGain.value.connect(deckAAnalyser.value)
        deckAAnalyser.value.connect(masterGain.value)
      } else if (deck === 'B' && !deckBSource.value) {
        deckBSource.value = ctx.createMediaElementSource(audioEl)
        deckBGain.value = ctx.createGain()
        deckBAnalyser.value = ctx.createAnalyser()
        deckBAnalyser.value.fftSize = 2048

        deckBSource.value.connect(deckBGain.value)
        deckBGain.value.connect(deckBAnalyser.value)
        deckBAnalyser.value.connect(masterGain.value)
      }
    } catch (e) {
      console.error('Failed to init deck:', e)
    }
  }

  function loadTrack(deck, file) {
    try {
      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (!audioEl) return

      if (deck === 'A' && deckASource.value) {
        try {
          deckASource.value.disconnect()
        } catch (e) {}
        deckASource.value = null
      } else if (deck === 'B' && deckBSource.value) {
        try {
          deckBSource.value.disconnect()
        } catch (e) {}
        deckBSource.value = null
      }

      const url = URL.createObjectURL(file)
      audioEl.src = url

      const state = deck === 'A' ? deckAState.value : deckBState.value
      state.trackUrl = url
      state.trackName = file.name
      state.isPlaying = false
      state.currentTime = 0

      audioEl.load()

      audioEl.onloadedmetadata = () => {
        if (deck === 'A') {
          deckAState.value.duration = audioEl.duration
        } else {
          deckBState.value.duration = audioEl.duration
        }
        initDeck(deck)
      }
    } catch (e) {
      console.error('Failed to load track:', e)
    }
  }

  function play(deck) {
    try {
      const ctx = getAudioContext()
      if (ctx && ctx.state === 'suspended') {
        ctx.resume()
      }

      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (audioEl) {
        const playPromise = audioEl.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (deck === 'A') {
                deckAState.value.isPlaying = true
              } else {
                deckBState.value.isPlaying = true
              }
            })
            .catch((e) => {
              console.error('Play failed:', e)
            })
        }
      }
    } catch (e) {
      console.error('Play error:', e)
    }
  }

  function pause(deck) {
    try {
      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (audioEl) {
        audioEl.pause()
        if (deck === 'A') {
          deckAState.value.isPlaying = false
        } else {
          deckBState.value.isPlaying = false
        }
      }
    } catch (e) {
      console.error('Pause error:', e)
    }
  }

  function seek(deck, time) {
    try {
      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (audioEl) {
        audioEl.currentTime = time
        if (deck === 'A') {
          deckAState.value.currentTime = time
        } else {
          deckBState.value.currentTime = time
        }
      }
    } catch (e) {
      console.error('Seek error:', e)
    }
  }

  function setVolume(deck, volume) {
    try {
      const gainNode = deck === 'A' ? deckAGain.value : deckBGain.value
      if (gainNode) {
        gainNode.gain.value = volume
        if (deck === 'A') {
          deckAState.value.volume = volume
        } else {
          deckBState.value.volume = volume
        }
      }
    } catch (e) {
      console.error('Set volume error:', e)
    }
  }

  function setPitch(deck, pitch) {
    try {
      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (audioEl) {
        const rate = 1 + pitch / 100
        audioEl.playbackRate = Math.max(0.5, Math.min(1.5, rate))
        if (deck === 'A') {
          deckAState.value.pitch = pitch
        } else {
          deckBState.value.pitch = pitch
        }
      }
    } catch (e) {
      console.error('Set pitch error:', e)
    }
  }

  function setEQ(deck, band, value) {
    if (deck === 'A') {
      deckAState.value.eq[band] = value
    } else {
      deckBState.value.eq[band] = value
    }
  }

  function setCrossfader(value) {
    try {
      crossfader.value = value
      const volumeA = value <= 0 ? 1 : 1 - value
      const volumeB = value >= 0 ? 1 : 1 + value

      if (deckAGain.value) {
        deckAGain.value.gain.value = deckAState.value.volume * volumeA
      }
      if (deckBGain.value) {
        deckBGain.value.gain.value = deckBState.value.volume * volumeB
      }
    } catch (e) {
      console.error('Set crossfader error:', e)
    }
  }

  function updateTime(deck) {
    try {
      const audioEl = deck === 'A' ? deckA.value : deckB.value
      if (audioEl) {
        if (deck === 'A') {
          deckAState.value.currentTime = audioEl.currentTime
        } else {
          deckBState.value.currentTime = audioEl.currentTime
        }
      }
    } catch (e) {
      // 静默处理
    }
  }

  function getAnalyser(deck) {
    return deck === 'A' ? deckAAnalyser.value : deckBAnalyser.value
  }

  function getAudioElement(deck) {
    return deck === 'A' ? deckA.value : deckB.value
  }

  // 录音功能
  function startRecording() {
    try {
      const ctx = getAudioContext()
      if (!ctx || !masterGain.value) {
        console.warn('Audio not ready, please load and play a track first')
        return false
      }

      // 清除之前的数据
      recordedChunks = []
      recordedBlob.value = null

      // 创建 MediaStreamDestination
      const dest = ctx.createMediaStreamDestination()
      masterGain.value.connect(dest)

      // 创建 MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm'

      mediaRecorder = new MediaRecorder(dest.stream, { mimeType })

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: mimeType })
          recordedBlob.value = blob
        }
        isRecording.value = false
      }

      mediaRecorder.start(100) // 每100ms收集一次数据
      isRecording.value = true
      return true
    } catch (e) {
      console.error('Start recording error:', e)
      isRecording.value = false
      return false
    }
  }

  function stopRecording() {
    try {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop()
      }
    } catch (e) {
      console.error('Stop recording error:', e)
      isRecording.value = false
    }
  }

  function downloadRecording() {
    try {
      if (!recordedBlob.value) {
        console.warn('No recording to download')
        return false
      }

      const url = URL.createObjectURL(recordedBlob.value)
      const a = document.createElement('a')
      a.href = url
      a.download = `dj-mix-${Date.now()}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return true
    } catch (e) {
      console.error('Download recording error:', e)
      return false
    }
  }

  function init() {
    try {
      if (isInitialized.value) return

      if (!deckA.value) {
        deckA.value = new Audio()
      }
      if (!deckB.value) {
        deckB.value = new Audio()
      }

      if (updateInterval) {
        clearInterval(updateInterval)
      }
      updateInterval = setInterval(() => {
        updateTime('A')
        updateTime('B')
      }, 100)

      isInitialized.value = true
    } catch (e) {
      console.error('Failed to initialize audio engine:', e)
    }
  }

  return {
    deckAState,
    deckBState,
    crossfader,
    masterBpm,
    effectsState,
    isInitialized,
    isRecording,
    recordedBlob,
    init,
    loadTrack,
    play,
    pause,
    seek,
    setVolume,
    setPitch,
    setEQ,
    setCrossfader,
    getAnalyser,
    getAudioElement,
    startRecording,
    stopRecording,
    downloadRecording,
  }
}