<template>
  <div class="hero-section">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="artist-card">
        <div class="artist-cover">
          <span class="cover-emoji">{{ cover }}</span>
          <div class="cover-ring"></div>
        </div>
        <div class="artist-info">
          <h1 class="artist-name">{{ artistName }}</h1>
          <p class="artist-desc">{{ artistDesc }} · {{ totalSongs }} 首歌曲 · {{ albumCount }} 张专辑</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artistName: {
    type: String,
    default: '周杰伦'
  },
  artistDesc: {
    type: String,
    default: '华语乐坛天王'
  },
  totalSongs: {
    type: Number,
    default: 0
  },
  albumCount: {
    type: Number,
    default: 0
  },
  fansCount: {
    type: String,
    default: '3652万'
  },
  playCount: {
    type: String,
    default: '128亿'
  },
  cover: {
    type: String,
    default: '🎤'
  }
})
</script>

<style lang="less" scoped>
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
  }
}
</style>
