<template>
  <div class="layer-panel">
    <div class="panel-header">
      <div class="header-title">
        <van-icon name="orders-o" class="header-icon" />
        <span>{{ t('tools.logoDesigner.layers') }}</span>
      </div>
      <div class="header-suffix">
        <slot name="header-suffix"></slot>
      </div>
    </div>

    <div class="panel-content">
      <div class="layer-list" ref="layerListRef">
        <draggable
          v-model="localLayers"
          :item-key="layer => layer.id"
          :animation="200"
          :handle="'.drag-handle'"
          ghost-class="layer-ghost"
          drag-class="layer-drag"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <div
              class="layer-item"
              :class="{
                'layer-item--selected': element.id === selectedLayerId,
                'layer-item--locked': element.locked
              }"
              @click="onLayerClick(element.id)"
            >
              <div class="layer-info">
                <van-icon
                  :name="element.visible ? 'eye-o' : 'closed-eye'"
                  class="layer-icon layer-icon--visibility"
                  @click.stop="onToggleVisibility(element.id)"
                />
                <van-icon
                  name="lock"
                  class="layer-icon layer-icon--lock"
                  @click.stop="onToggleLock(element.id)"
                />
                <span class="layer-name">{{ element.name }}</span>
              </div>
              <div class="layer-controls">
                <van-icon name="ellipsis" class="layer-icon layer-icon--menu" @click.stop="onShowMenu(element.id)" />
                <div class="drag-handle">
                  <van-icon name="exchange" class="drag-icon" />
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <van-action-sheet
      v-model:show="showMenu"
      :actions="menuActions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="onMenuSelect"
    />

    <van-dialog
      v-model:show="showRenameDialog"
      :title="t('tools.logoDesigner.renameLayer')"
      show-cancel-button
      :cancel-text="t('common.cancel')"
      :confirm-text="t('common.confirm')"
      @confirm="onRenameConfirm"
      @cancel="showRenameDialog = false"
    >
      <van-field v-model="newLayerName" :placeholder="t('tools.logoDesigner.layerNamePlaceholder')" />
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import draggable from 'vuedraggable'
import {
  Icon as VanIcon,
  Button as VanButton,
  ActionSheet as VanActionSheet,
  Dialog as VanDialog,
  Field as VanField
} from 'vant'

const { t } = useI18n()

const props = defineProps({
  layers: { type: Array, required: true },
  selectedLayerId: { type: String, default: null }
})

const emit = defineEmits([
  'selectLayer',
  'deleteLayer',
  'copyLayer',
  'toggleVisibility',
  'toggleLock',
  'updateLayerName',
  'reorderLayers'
])

const layerListRef = ref(null)
const localLayers = ref([])
const showMenu = ref(false)
const showRenameDialog = ref(false)
const currentLayerId = ref(null)
const newLayerName = ref('')

watch(
  () => props.layers,
  newLayers => {
    localLayers.value = [...newLayers].sort((a, b) => b.zIndex - a.zIndex)
  },
  { immediate: true, deep: true }
)

const menuActions = computed(() => [
  { name: t('tools.logoDesigner.renameLayer'), value: 'rename' },
  { name: t('tools.logoDesigner.copyLayer'), value: 'copy' },
  { name: t('tools.logoDesigner.deleteLayer'), value: 'delete', color: '#f00' }
])

const onLayerClick = layerId => {
  emit('selectLayer', layerId)
}

const onToggleVisibility = layerId => {
  emit('toggleVisibility', layerId)
}

const onToggleLock = layerId => {
  emit('toggleLock', layerId)
}

const onShowMenu = layerId => {
  currentLayerId.value = layerId
  showMenu.value = true
}

const onMenuSelect = action => {
  showMenu.value = false
  if (action.value === 'rename') {
    const layer = props.layers.find(l => l.id === currentLayerId.value)
    if (layer) newLayerName.value = layer.name
    showRenameDialog.value = true
  } else if (action.value === 'copy') {
    emit('copyLayer', currentLayerId.value)
  } else if (action.value === 'delete') {
    emit('deleteLayer', currentLayerId.value)
  }
}

const onRenameConfirm = () => {
  if (newLayerName.value.trim()) {
    emit('updateLayerName', currentLayerId.value, newLayerName.value.trim())
  }
  showRenameDialog.value = false
}

const onDragEnd = evt => {
  if (evt.oldIndex !== evt.newIndex) {
    const newOrder = localLayers.value.map((layer, index) => ({
      ...layer,
      zIndex: localLayers.value.length - index
    }))
    emit('reorderLayers', newOrder)
  }
}
</script>

<style lang="less" scoped>
.layer-panel {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  margin-bottom: var(--spacing-md);

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);

    .header-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .header-suffix {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .header-icon {
      font-size: 18px;
      color: var(--color-primary);
    }
  }

  .panel-content {
    border-top: 1px solid var(--color-border);
  }

  .layer-list {
    padding: var(--spacing-sm) var(--spacing-md);
    max-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) transparent;
  }

  .layer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.15s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &--selected {
      background: var(--color-primary);
      color: #fff;

      .layer-icon {
        color: #fff;
      }
    }

    &--locked {
      opacity: 0.6;

      .layer-icon--lock {
        color: var(--color-primary);
      }
    }
  }

  .layer-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
    min-width: 0;

    .layer-name {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .layer-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .layer-icon {
    font-size: 16px;
    color: var(--color-text-secondary);
    padding: 4px;
    transition: color 0.2s;

    &:active {
      transform: scale(0.9);
    }

    &--menu {
      color: var(--color-text-tertiary);
    }
  }

  .drag-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: grab;
    touch-action: none;
    user-select: none;
    border-radius: var(--radius-sm);
    transition: background-color 0.2s;

    &:active {
      cursor: grabbing;
      background: var(--color-bg-tertiary);
    }
  }

  .drag-icon {
    font-size: 16px;
    transform: rotate(90deg);
  }

  .layer-ghost {
    opacity: 0.5;
    background: var(--color-primary-light, rgba(102, 126, 234, 0.1));
    border: 2px dashed var(--color-primary);
  }

  .layer-drag {
    opacity: 1;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }

  :deep(.van-dialog) {
    .van-dialog__content {
      padding: var(--spacing-md);
    }

    .van-field {
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      padding: var(--spacing-sm) var(--spacing-md);

      .van-field__control {
        font-size: var(--font-size-sm);
      }
    }
  }
}
</style>