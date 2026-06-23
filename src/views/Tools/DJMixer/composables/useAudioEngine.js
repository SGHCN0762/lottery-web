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

// EQ 滤波器节点
const deckAHighFilter = shallowRef(null)
const deckAMidFilter = shallowRef(null)
const deckALowFilter = shallowRef(null)
const deckBHighFilter = shallowRef(null)
const deckBMidFilter = shallowRef(null)
const deckBLowFilter = shallowRef(null)

// 效果器节点
const effectGain = shallowRef(null)
const delayNode = shallowRef(null)
const delayFeedback = shallowRef(null)
const delayGain = shallowRef(null)
const reverbNode = shallowRef(null)
const reverbGain = shallowRef(null)
const flangerNode = shallowRef(null)
const flangerGain = shallowRef(null)
const filterHighPass = shallowRef(null)
const filterLowPass = shallowRef(null)

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
  loop: { enabled: false, start: 0, end: 8 },
  cuePoints: [],
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
  loop: { enabled: false, start: 0, end: 8 },
  cuePoints: [],
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
let flangerOscillator = null

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

function createEQFilters(ctx) {
  const filters = {
    high: ctx.createBiquadFilter(),
    mid: ctx.createBiquadFilter(),
    low: ctx.createBiquadFilter(),
  }
  filters.high.type = 'highshelf'
  filters.high.frequency.value = 3000
  filters.high.gain.value = 0

  filters.mid.type = 'peaking'
  filters.mid.frequency.value = 1000
  filters.mid.Q.value = 1
  filters.mid.gain.value = 0

  filters.low.type = 'lowshelf'
  filters.low.frequency.value = 200
  filters.low.gain.value = 0

  return filters
}

function createEffectNodes(ctx) {
  if (!effectGain.value) {
    effectGain.value = ctx.createGain()
    effectGain.value.gain.value = 0

    delayNode.value = ctx.createDelay(5)
    delayNode.value.delayTime.value = 0.3

    delayFeedback.value = ctx.createGain()
    delayFeedback.value.gain.value = 0.4

    delayGain.value = ctx.createGain()
    delayGain.value.gain.value = 0

    reverbNode.value = ctx.createConvolver()
    reverbGain.value = ctx.createGain()
    reverbGain.value.gain.value = 0

    flangerNode.value = ctx.createDelay(0.02)
    flangerNode.value.delayTime.value = 0.002

    flangerGain.value = ctx.createGain()
    flangerGain.value.gain.value = 0

    filterHighPass.value = ctx.createBiquadFilter()
    filterHighPass.value.type = 'highpass'
    filterHighPass.value.frequency.value = 0

    filterLowPass.value = ctx.createBiquadFilter()
    filterLowPass.value.type = 'lowpass'
    filterLowPass.value.frequency.value = ctx.sampleRate / 2

    delayNode.value.connect(delayFeedback.value)
    delayFeedback.value.connect(delayNode.value)
    delayNode.value.connect(delayGain.value)
    delayGain.value.connect(effectGain.value)

    reverbNode.value.connect(reverbGain.value)
    reverbGain.value.connect(effectGain.value)

    flangerNode.value.connect(flangerGain.value)
    flangerGain.value.connect(effectGain.value)
  }
}

function generateReverbImpulse(ctx, duration, decay) {
  const length = ctx.sampleRate * duration
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
  const left = impulse.getChannelData(0)
  const right = impulse.getChannelData(1)

  for (let i = 0; i < length; i++) {
    const n = length - i
    left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
  }

  return impulse
}

export function useAudioEngine() {
  function initDeck(deck) {
    try {
      const ctx = getAudioContext()
      const audioEl = deck === 'A' ? deckA.value : deckB.value

      if (!ctx || !audioEl) return

      createEffectNodes(ctx)

      if (!masterGain.value) {
        masterGain.value = ctx.createGain()
        masterAnalyser.value = ctx.createAnalyser()
        masterAnalyser.value.fftSize = 2048

        masterGain.value.connect(filterHighPass.value)
        filterHighPass.value.connect(filterLowPass.value)
        filterLowPass.value.connect(masterAnalyser.value)
        masterAnalyser.value.connect(ctx.destination)

        effectGain.value.connect(filterHighPass.value)
      }

      if (deck === 'A' && !deckASource.value) {
        deckASource.value = ctx.createMediaElementSource(audioEl)
        deckAGain.value = ctx.createGain()
        deckAAnalyser.value = ctx.createAnalyser()
        deckAAnalyser.value.fftSize = 2048

        const eq = createEQFilters(ctx)
        deckAHighFilter.value = eq.high
        deckAMidFilter.value = eq.mid
        deckALowFilter.value = eq.low

        deckASource.value.connect(deckAHighFilter.value)
        deckAHighFilter.value.connect(deckAMidFilter.value)
        deckAMidFilter.value.connect(deckALowFilter.value)
        deckALowFilter.value.connect(deckAGain.value)
        deckAGain.value.connect(deckAAnalyser.value)
        deckAAnalyser.value.connect(masterGain.value)

        deckASource.value.connect(delayNode.value)
        deckASource.value.connect(reverbNode.value)
        deckASource.value.connect(flangerNode.value)
      } else if (deck === 'B' && !deckBSource.value) {
        deckBSource.value = ctx.createMediaElementSource(audioEl)
        deckBGain.value = ctx.createGain()
        deckBAnalyser.value = ctx.createAnalyser()
        deckBAnalyser.value.fftSize = 2048

        const eq = createEQFilters(ctx)
        deckBHighFilter.value = eq.high
        deckBMidFilter.value = eq.mid
        deckBLowFilter.value = eq.low

        deckBSource.value.connect(deckBHighFilter.value)
        deckBHighFilter.value.connect(deckBMidFilter.value)
        deckBMidFilter.value.connect(deckBLowFilter.value)
        deckBLowFilter.value.connect(deckBGain.value)
        deckBGain.value.connect(deckBAnalyser.value)
        deckBAnalyser.value.connect(masterGain.value)

        deckBSource.value.connect(delayNode.value)
        deckBSource.value.connect(reverbNode.value)
        deckBSource.value.connect(flangerNode.value)
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
        deckAGain.value = null
        deckAAnalyser.value = null
        deckAHighFilter.value = null
        deckAMidFilter.value = null
        deckALowFilter.value = null
      } else if (deck === 'B' && deckBSource.value) {
        try {
          deckBSource.value.disconnect()
        } catch (e) {}
        deckBSource.value = null
        deckBGain.value = null
        deckBAnalyser.value = null
        deckBHighFilter.value = null
        deckBMidFilter.value = null
        deckBLowFilter.value = null
      }

      const url = URL.createObjectURL(file)
      audioEl.src = url

      const state = deck === 'A' ? deckAState.value : deckBState.value
      state.trackUrl = url
      state.trackName = file.name
      state.isPlaying = false
      state.currentTime = 0
      state.loop.enabled = false

      audioEl.load()

      audioEl.onloadedmetadata = () => {
        if (deck === 'A') {
          deckAState.value.duration = audioEl.duration
        } else {
          deckBState.value.duration = audioEl.duration
        }
        initDeck(deck)
      }

      audioEl.ontimeupdate = () => {
        const state = deck === 'A' ? deckAState.value : deckBState.value
        state.currentTime = audioEl.currentTime
        if (state.loop.enabled && audioEl.currentTime >= state.loop.end) {
          audioEl.currentTime = state.loop.start
        }
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
    try {
      const state = deck === 'A' ? deckAState.value : deckBState.value
      state.eq[band] = value

      let filter
      if (deck === 'A') {
        filter = band === 'high' ? deckAHighFilter.value :
                 band === 'mid' ? deckAMidFilter.value : deckALowFilter.value
      } else {
        filter = band === 'high' ? deckBHighFilter.value :
                 band === 'mid' ? deckBMidFilter.value : deckBLowFilter.value
      }

      if (filter) {
        filter.gain.value = value
      }
    } catch (e) {
      console.error('Set EQ error:', e)
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

  function setLoop(deck, enabled, start, end) {
    const state = deck === 'A' ? deckAState.value : deckBState.value
    state.loop.enabled = enabled
    state.loop.start = start || state.currentTime
    state.loop.end = end || Math.min(state.currentTime + 8, state.duration)
  }

  function setCuePoint(deck, time, label) {
    const state = deck === 'A' ? deckAState.value : deckBState.value
    state.cuePoints.push({ time, label: label || `CUE ${state.cuePoints.length + 1}` })
    state.cuePoints.sort((a, b) => a.time - b.time)
  }

  function goToCuePoint(deck, index) {
    const state = deck === 'A' ? deckAState.value : deckBState.value
    if (state.cuePoints[index]) {
      seek(deck, state.cuePoints[index].time)
    }
  }

  function clearCuePoints(deck) {
    const state = deck === 'A' ? deckAState.value : deckBState.value
    state.cuePoints = []
  }

  function setEffect(type, enabled, params) {
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      createEffectNodes(ctx)

      if (type === 'echo') {
        effectsState.value.echo.enabled = enabled
        effectsState.value.echo = { ...effectsState.value.echo, ...params }

        if (delayNode.value) {
          delayNode.value.delayTime.value = effectsState.value.echo.time
          delayFeedback.value.gain.value = effectsState.value.echo.feedback
        }
        if (delayGain.value) {
          delayGain.value.gain.value = enabled ? 0.5 : 0
        }
      } else if (type === 'reverb') {
        effectsState.value.reverb.enabled = enabled
        effectsState.value.reverb = { ...effectsState.value.reverb, ...params }

        if (reverbNode.value && enabled) {
          reverbNode.value.buffer = generateReverbImpulse(ctx, effectsState.value.reverb.time, 2)
        }
        if (reverbGain.value) {
          reverbGain.value.gain.value = enabled ? effectsState.value.reverb.mix : 0
        }
      } else if (type === 'flanger') {
        effectsState.value.flanger.enabled = enabled
        effectsState.value.flanger = { ...effectsState.value.flanger, ...params }

        if (flangerGain.value) {
          flangerGain.value.gain.value = enabled ? 0.3 : 0
        }

        if (enabled && !flangerOscillator) {
          flangerOscillator = ctx.createOscillator()
          flangerOscillator.type = 'sine'
          flangerOscillator.frequency.value = 0.5

          const lfoGain = ctx.createGain()
          lfoGain.gain.value = effectsState.value.flanger.depth * 0.005

          flangerOscillator.connect(lfoGain)
          lfoGain.connect(flangerNode.value.delayTime)
          flangerOscillator.start()
        } else if (!enabled && flangerOscillator) {
          flangerOscillator.stop()
          flangerOscillator = null
        }
      } else if (type === 'filterHighPass') {
        effectsState.value.filterHighPass = params.value
        if (filterHighPass.value) {
          filterHighPass.value.frequency.value = params.value * 20000
        }
      } else if (type === 'filterLowPass') {
        effectsState.value.filterLowPass = params.value
        if (filterLowPass.value) {
          filterLowPass.value.frequency.value = ctx.sampleRate / 2 * (1 - params.value) + 100
        }
      }
    } catch (e) {
      console.error('Set effect error:', e)
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

  function startRecording() {
    try {
      const ctx = getAudioContext()
      if (!ctx || !masterGain.value) {
        console.warn('Audio not ready, please load and play a track first')
        return false
      }

      recordedChunks = []
      recordedBlob.value = null

      const dest = ctx.createMediaStreamDestination()
      filterLowPass.value.connect(dest)

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

      mediaRecorder.start(100)
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
    setLoop,
    setCuePoint,
    goToCuePoint,
    clearCuePoints,
    setEffect,
    getAnalyser,
    getAudioElement,
    startRecording,
    stopRecording,
    downloadRecording,
  }
}