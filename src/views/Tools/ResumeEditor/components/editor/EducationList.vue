<template>
  <div class="education-list">
    <div v-for="(edu, index) in sortedItems" :key="edu._id" class="education-item">
      <div class="item-content" @click="handleEdit(index)">
        <div class="item-header">
          <span class="school">{{ edu.school }}</span>
          <span class="period">{{ edu.startDate || '?' }} - {{ edu.endDate || t('resume.common.present') }}</span>
        </div>
        <div class="item-title">{{ edu.major }} {{ edu.degree ? `- ${edu.degree}` : '' }}</div>
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
      {{ t('resume.education.add') }}
    </van-button>

    <van-popup v-model:show="showEditPopup" position="bottom" :style="{ height: '80%' }" round>
      <div class="edit-popup">
        <van-nav-bar
          :title="isEditing ? t('resume.education.edit') : t('resume.education.add')"
          :left-text="t('resume.common.cancel')"
          :right-text="t('resume.common.save')"
          @click-left="showEditPopup = false"
          @click-right="handleSave"
        />
        <div class="edit-form">
          <van-field
            v-model="editForm.school"
            :label="t('resume.education.school')"
            :placeholder="t('resume.education.schoolPlaceholder')"
            required
          />
          <van-field
            v-model="editForm.major"
            :label="t('resume.education.major')"
            :placeholder="t('resume.education.majorPlaceholder')"
          />
          <van-field
            v-model="editForm.degree"
            :label="t('resume.education.degree')"
            :placeholder="t('resume.education.degreePlaceholder')"
          />
          <van-field
            v-model="editForm.startDate"
            :label="t('resume.education.startDate')"
            :placeholder="t('resume.education.datePlaceholder')"
          />
          <van-field
            v-model="editForm.endDate"
            :label="t('resume.education.endDate')"
            :placeholder="t('resume.education.datePlaceholder')"
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
import { useListEditor } from '../../hooks/useListEditor';

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
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
  }),
  validateRequired: (form) => form.school,
});

const handleDeleteConfirm = (index) => {
  handleDelete(index, showConfirmDialog, t);
};
</script>

<style lang="less" scoped>
.education-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.education-item {
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
    .school { font-weight: var(--font-weight-semibold); color: var(--color-text-primary); }
    .period { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
  }

  .item-title { font-size: var(--font-size-sm); color: var(--color-text-primary); }
}

.edit-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  .edit-form { flex: 1; overflow-y: auto; padding: var(--spacing-md); }
}
</style>
