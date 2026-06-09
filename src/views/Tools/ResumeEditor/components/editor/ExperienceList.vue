<template>
  <div class="experience-list">
    <div v-for="(exp, index) in sortedItems" :key="exp._id" class="experience-item">
      <div class="item-content" @click="handleEdit(index)">
        <div class="item-header">
          <span class="company">{{ exp.company }}</span>
          <span class="period">{{ exp.startDate || '?' }} - {{ exp.endDate || t('resume.common.present') }}</span>
        </div>
        <div class="item-title">{{ exp.position }}</div>
        <div v-if="exp.description" class="item-desc">{{ exp.description }}</div>
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
      {{ t('resume.experience.add') }}
    </van-button>

    <van-popup v-model:show="showEditPopup" position="bottom" :style="{ height: '80%' }" round>
      <div class="edit-popup">
        <van-nav-bar
          :title="isEditing ? t('resume.experience.edit') : t('resume.experience.add')"
          :left-text="t('resume.common.cancel')"
          :right-text="t('resume.common.save')"
          @click-left="showEditPopup = false"
          @click-right="handleSave"
        />
        <div class="edit-form">
          <van-field
            v-model="editForm.company"
            :label="t('resume.experience.company')"
            :placeholder="t('resume.experience.companyPlaceholder')"
            required
          />
          <van-field
            v-model="editForm.position"
            :label="t('resume.experience.position')"
            :placeholder="t('resume.experience.positionPlaceholder')"
          />
          <van-field
            v-model="editForm.startDate"
            :label="t('resume.experience.startDate')"
            :placeholder="t('resume.experience.datePlaceholder')"
          />
          <van-field
            v-model="editForm.endDate"
            :label="t('resume.experience.endDate')"
            :placeholder="t('resume.experience.datePlaceholder')"
          />
          <van-field
            v-model="editForm.description"
            :label="t('resume.experience.description')"
            type="textarea"
            rows="4"
            autosize
            :placeholder="t('resume.experience.descriptionPlaceholder')"
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
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  }),
  validateRequired: (form) => form.company,
});

const handleDeleteConfirm = (index) => {
  handleDelete(index, showConfirmDialog, t);
};
</script>

<style lang="less" scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.experience-item {
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
    .company { font-weight: var(--font-weight-semibold); color: var(--color-text-primary); }
    .period { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
  }

  .item-title { font-size: var(--font-size-sm); color: var(--color-text-primary); margin-bottom: var(--spacing-xs); }
  .item-desc { font-size: var(--font-size-xs); color: var(--color-text-secondary); line-height: var(--line-height-base); white-space: pre-wrap; word-break: break-word; }
}

.edit-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  .edit-form { flex: 1; overflow-y: auto; padding: var(--spacing-md); }
}
</style>
