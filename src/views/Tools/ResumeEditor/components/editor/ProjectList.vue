<template>
  <div class="project-list">
    <div v-for="(project, index) in sortedItems" :key="project._id" class="project-item">
      <div class="item-content" @click="handleEdit(index)">
        <div class="item-header">
          <span class="project-name">{{ project.name }}</span>
          <span class="period">{{ project.startDate || '?' }} - {{ project.endDate || t('resume.common.present') }}</span>
        </div>
        <div v-if="project.role" class="item-title">{{ project.role }}</div>
        <div v-if="project.techStack" class="tech-stack">
          <span v-for="(tech, i) in splitTechStack(project.techStack)" :key="i" class="tech-tag">
            {{ tech }}
          </span>
        </div>
        <div v-if="project.description" class="item-desc">{{ project.description }}</div>
      </div>
      <div class="item-actions">
        <van-button size="small" type="primary" plain @click.stop="handleEdit(index)">
          {{ t('resume.common.edit') }}
        </van-button>
        <van-button size="small" type="danger" plain @click.stop="handleDeleteConfirm(index)">
          {{ t('resume.common.delete') }}
        </van-button>
      </div>
    </div>

    <van-button type="primary" plain block @click="handleAdd">
      <van-icon name="plus" />
      {{ t('resume.project.add') }}
    </van-button>

    <van-popup v-model:show="showEditPopup" position="bottom" :style="{ height: '85%' }" round>
      <div class="edit-popup">
        <van-nav-bar
          :title="isEditing ? t('resume.project.edit') : t('resume.project.add')"
          :left-text="t('resume.common.cancel')"
          :right-text="t('resume.common.save')"
          @click-left="showEditPopup = false"
          @click-right="handleSave"
        />
        <div class="edit-form">
          <van-field
            v-model="editForm.name"
            :label="t('resume.project.name')"
            :placeholder="t('resume.project.namePlaceholder')"
            required
          />
          <van-field
            v-model="editForm.role"
            :label="t('resume.project.role')"
            :placeholder="t('resume.project.rolePlaceholder')"
          />
          <van-field
            v-model="editForm.startDate"
            :label="t('resume.project.startDate')"
            :placeholder="t('resume.project.datePlaceholder')"
          />
          <van-field
            v-model="editForm.endDate"
            :label="t('resume.project.endDate')"
            :placeholder="t('resume.project.datePlaceholder')"
          />
          <van-field
            v-model="editForm.techStack"
            :label="t('resume.project.techStack')"
            :placeholder="t('resume.project.techStackPlaceholder')"
          />
          <van-field
            v-model="editForm.description"
            :label="t('resume.project.description')"
            type="textarea"
            rows="4"
            autosize
            :placeholder="t('resume.project.descriptionPlaceholder')"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { showConfirmDialog } from 'vant';
import {
  Button as VanButton,
  Field as VanField,
  Popup as VanPopup,
  NavBar as VanNavBar,
  Icon as VanIcon,
} from 'vant';
import { useListEditor, splitTechStack } from '../../hooks/useListEditor';

const { t } = useI18n();

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const {
  sortedItems,
  showEditPopup,
  isEditing,
  editForm,
  handleAdd,
  handleEdit,
  handleSave,
  handleDelete,
} = useListEditor(props, emit, {
  dateField: 'startDate',
  emptyForm: () => ({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    techStack: '',
    description: '',
  }),
  validateRequired: (form) => form.name,
});

const handleDeleteConfirm = (index) => {
  handleDelete(index, showConfirmDialog, t);
};
</script>

<style lang="less" scoped>
.project-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.project-item {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .item-content {
    padding: var(--spacing-md);
  }

  .item-actions {
    display: flex;
    gap: var(--spacing-sm);
    padding: 0 var(--spacing-md) var(--spacing-md);
    justify-content: flex-end;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xs);
    .project-name { font-weight: var(--font-weight-semibold); color: var(--color-text-primary); }
    .period { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
  }

  .item-title { font-size: var(--font-size-sm); color: var(--color-text-primary); margin-bottom: var(--spacing-xs); }
  .item-desc { font-size: var(--font-size-xs); color: var(--color-text-secondary); line-height: var(--line-height-base); margin-bottom: var(--spacing-xs); white-space: pre-wrap; word-break: break-word; }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-xs);
    .tech-label { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
    .tech-tag { padding: 2px 8px; background: rgba(24, 144, 255, 0.1); border-radius: var(--radius-sm); font-size: var(--font-size-xs); color: #1890ff; }
  }
}

.edit-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  .edit-form { flex: 1; overflow-y: auto; padding: var(--spacing-md); }
}
</style>
