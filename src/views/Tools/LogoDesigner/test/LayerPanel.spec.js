import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import LayerPanel from '../components/LayerPanel.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      tools: {
        logoDesigner: {
          layers: '图层',
          addLayer: '添加图层',
          renameLayer: '重命名图层',
          deleteLayer: '删除图层',
          layerNamePlaceholder: '请输入图层名称'
        }
      },
      common: {
        cancel: '取消',
        confirm: '确认'
      }
    }
  }
})

const mockLayers = [
  { id: '1', name: '图层1', zIndex: 3, visible: true, locked: false },
  { id: '2', name: '图层2', zIndex: 2, visible: true, locked: false },
  { id: '3', name: '图层3', zIndex: 1, visible: false, locked: true }
]

describe('LayerPanel', () => {
  it('should render correctly', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    expect(wrapper.find('.panel-header').exists()).toBe(true)
    expect(wrapper.find('.layer-list').exists()).toBe(true)
    expect(wrapper.findAll('.layer-item').length).toBe(3)
  })

  it('should emit selectLayer when clicking layer', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const firstLayer = wrapper.findAll('.layer-item')[0]
    firstLayer.trigger('click')
    expect(wrapper.emitted('selectLayer')).toBeTruthy()
    expect(wrapper.emitted('selectLayer')[0]).toEqual(['1'])
  })

  it('should emit toggleVisibility when clicking visibility icon', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const visibilityIcon = wrapper.find('.layer-icon--visibility')
    visibilityIcon.trigger('click')
    expect(wrapper.emitted('toggleVisibility')).toBeTruthy()
    expect(wrapper.emitted('toggleVisibility')[0]).toEqual(['1'])
  })

  it('should emit toggleLock when clicking lock icon', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const lockIcon = wrapper.find('.layer-icon--lock')
    lockIcon.trigger('click')
    expect(wrapper.emitted('toggleLock')).toBeTruthy()
    expect(wrapper.emitted('toggleLock')[0]).toEqual(['1'])
  })

  it('should show selected style when layer is selected', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers, selectedLayerId: '2' }
    })
    const layers = wrapper.findAll('.layer-item')
    expect(layers[0].classes()).not.toContain('layer-item--selected')
    expect(layers[1].classes()).toContain('layer-item--selected')
    expect(layers[2].classes()).not.toContain('layer-item--selected')
  })

  it('should show locked style when layer is locked', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const layers = wrapper.findAll('.layer-item')
    expect(layers[0].classes()).not.toContain('layer-item--locked')
    expect(layers[1].classes()).not.toContain('layer-item--locked')
    expect(layers[2].classes()).toContain('layer-item--locked')
  })

  it('should show correct visibility icon for visible layer', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const icons = wrapper.findAll('.layer-icon--visibility')
    expect(icons.length).toBe(3)
  })

  it('should show correct lock icon for locked layer', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const icons = wrapper.findAll('.layer-icon--lock')
    expect(icons.length).toBe(3)
  })

  it('should emit showAddLayerSheet when clicking add button', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const addButton = wrapper.find('.van-button')
    addButton.trigger('click')
    expect(wrapper.emitted('showAddLayerSheet')).toBeTruthy()
    expect(wrapper.emitted('showAddLayerSheet')[0]).toEqual([true])
  })

  it('should emit reorderLayers when dragging ends with changed index', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const draggable = wrapper.findComponent({ name: 'draggable' })
    draggable.vm.$emit('end', { oldIndex: 0, newIndex: 1 })
    expect(wrapper.emitted('reorderLayers')).toBeTruthy()
    expect(wrapper.emitted('reorderLayers')[0][0].length).toBe(3)
  })

  it('should not emit reorderLayers when dragging ends with same index', () => {
    const wrapper = mount(LayerPanel, {
      global: { plugins: [i18n] },
      props: { layers: mockLayers }
    })
    const draggable = wrapper.findComponent({ name: 'draggable' })
    draggable.vm.$emit('end', { oldIndex: 0, newIndex: 0 })
    expect(wrapper.emitted('reorderLayers')).toBeFalsy()
  })
})