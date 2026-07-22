<template>
  <div class="albums-view">
    <div class="section-header">
      <h2>全部专辑</h2>
      <span class="more">查看全部</span>
    </div>
    <div class="albums-grid">
      <div 
        v-for="album in albums" 
        :key="album.id"
        class="album-card"
        @click="$emit('open-album', album)"
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
</template>

<script setup>
defineProps({
  albums: {
    type: Array,
    required: true
  },
  getAlbumGradient: {
    type: Function,
    required: true
  }
})

defineEmits(['open-album'])
</script>

<style lang="less" scoped>
.albums-view {
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
  }

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

@media (max-width: 480px) {
  .albums-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
