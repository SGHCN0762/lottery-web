<template>
  <div class="custom-sections-editor">
    <div class="section-list">
      <div v-for="(section, index) in customSections" :key="section._id" class="section-item">
        <div class="section-header">
          <van-field 
            v-model="section.title" 
            placeholder="模块标题" 
            @update:model-value="handleUpdate"
          />
          <van-button icon="delete" size="small" type="danger" plain @click="handleDeleteSection(index)" />
        </div>
        
        <div class="section-items">
          <div v-for="(item, itemIndex) in section.items" :key="item._id" class="item-row">
            <van-field 
              v-model="item.label" 
              placeholder="标签" 
              class="item-label"
              @update:model-value="handleUpdate"
            />
            <van-field 
              v-model="item.value" 
              placeholder="内容" 
              type="textarea"
              :rows="2"
              class="item-value"
              @update:model-value="handleUpdate"
            />
            <van-button icon="delete" size="small" type="danger" plain @click="handleDeleteItem(index, itemIndex)" />
          </div>
          
          <van-button type="primary" plain size="small" @click="handleAddItem(index)" block>
            <van-icon name="plus" /> 添加字段
          </van-button>
        </div>
      </div>
      
      <van-button type="primary" plain @click="handleAddSection" block>
        <van-icon name="plus" /> 添加自定义模块
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { Field as VanField, Button as VanButton, Icon as VanIcon } from 'vant';
import { generateId } from '../../hooks/useListEditor';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const customSections = props.modelValue;

watch(customSections, (newVal) => {
  emit('update:modelValue', newVal);
}, { deep: true });

const handleUpdate = () => {
  emit('update:modelValue', [...customSections]);
};

const handleAddSection = () => {
  customSections.push({
    _id: generateId(),
    title: '新模块',
    icon: 'file-o',
    items: [],
  });
  handleUpdate();
};

const handleDeleteSection = (index) => {
  customSections.splice(index, 1);
  handleUpdate();
};

const handleAddItem = (sectionIndex) => {
  customSections[sectionIndex].items.push({
    _id: generateId(),
    label: '',
    value: '',
  });
  handleUpdate();
};

const handleDeleteItem = (sectionIndex, itemIndex) => {
  customSections[sectionIndex].items.splice(itemIndex, 1);
  handleUpdate();
};
</script>

<style lang="less" scoped>
.custom-sections-editor {
  .section-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .section-item {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);

    .section-header {
      display: flex;
      gap: var(--spacing-sm);
      align-items: center;
      margin-bottom: var(--spacing-md);

      .van-field {
        flex: 1;
      }
    }

    .section-items {
      .item-row {
        display: flex;
        gap: var(--spacing-sm);
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);

        .item-label {
          flex: 1;
          min-width: 80px;
        }

        .item-value {
          flex: 2;
        }
      }
    }
  }
}
</style>
