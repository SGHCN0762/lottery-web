<template>
  <div class="note-editor">
    <!-- 工具栏 -->
    <div class="toolbar">
      <van-button size="small" plain icon="clock-o" @click="insertTime">
        {{ t('tools.examPrep.noteEditor.insertTime') }}
      </van-button>
      <van-button size="small" plain icon="bookmark-o" @click="insertTag">
        {{ t('tools.examPrep.noteEditor.insertTag') }}
      </van-button>
      <van-button size="small" plain icon="delete" @click="clearContent">
        {{ t('tools.examPrep.noteEditor.clear') }}
      </van-button>
    </div>

    <!-- 笔记内容输入 -->
    <van-field
      v-model="noteContent"
      rows="8"
      autosize
      type="textarea"
      :placeholder="t('tools.examPrep.noteEditor.placeholder')"
      show-word-limit
      maxlength="2000"
      class="note-input"
      @update:model-value="handleContentChange"
    />

    <!-- 已保存笔记列表 -->
    <div v-if="savedNotes.length > 0" class="saved-notes-section">
      <div class="section-header">
        <span>{{ t('tools.examPrep.noteEditor.savedNotes') }}</span>
        <van-button size="mini" plain @click="toggleNotesList">
          {{ showNotesList ? t('tools.examPrep.noteEditor.hide') : t('tools.examPrep.noteEditor.show') }}
        </van-button>
      </div>
      <van-collapse-transition>
        <div v-show="showNotesList" class="notes-list">
          <van-cell
            v-for="note in savedNotes"
            :key="note.id"
            :title="getNotePreview(note.content)"
            :label="formatDate(note.createdAt)"
            :value="note.type"
            is-link
            @click="handleSelectNote(note)"
          >
            <template #right-icon>
              <van-icon name="delete" @click.stop="handleDeleteNote(note)" />
            </template>
          </van-cell>
        </div>
      </van-collapse-transition>
    </div>

    <!-- 底部操作栏 -->
    <div class="editor-actions">
      <van-button size="small" @click="handleCancel">
        {{ t('tools.examPrep.noteEditor.cancel') }}
      </van-button>
      <van-button type="primary" size="small" :loading="saving" @click="handleSave">
        {{ t('tools.examPrep.noteEditor.save') }}
      </van-button>
    </div>

    <!-- 自动保存提示 -->
    <div v-if="autoSaveStatus" class="auto-save-tip">
      <van-icon name="success" color="#52c41a" />
      <span>{{ autoSaveStatus }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { showToast, showConfirmDialog } from 'vant';
import {
  Field as VanField,
  Button as VanButton,
  Icon as VanIcon,
  Cell as VanCell,
} from 'vant';
import { useDatabase } from '../hooks/useDatabase';
import { formatDate } from '../utils/helpers';
import { NOTE_TYPES } from '../utils/constants';

const props = defineProps({
  questionId: {
    type: String,
    required: true,
  },
  initialContent: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['save', 'cancel']);

const { t } = useI18n();
const db = useDatabase();

// 状态变量
const noteContent = ref('');
const saving = ref(false);
const autoSaveStatus = ref('');
const savedNotes = ref([]);
const showNotesList = ref(false);

// 自动保存定时器
let autoSaveTimer = null;
const AUTO_SAVE_DELAY = 3000; // 3秒后自动保存

// 初始化内容
const initContent = () => {
  noteContent.value = props.initialContent;
};

// 加载已保存的笔记
const loadSavedNotes = async () => {
  try {
    const notes = await db.getNotesByQuestionId(props.questionId);
    savedNotes.value = notes;
  } catch (error) {
    console.error('加载笔记失败:', error);
  }
};

// 处理内容变化
const handleContentChange = () => {
  // 设置自动保存
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  autoSaveTimer = setTimeout(() => {
    autoSave();
  }, AUTO_SAVE_DELAY);
};

// 自动保存
const autoSave = async () => {
  if (!noteContent.value.trim()) return;

  try {
    // 查找是否有现有笔记
    const existingNotes = await db.getNotesByQuestionId(props.questionId);

    if (existingNotes.length > 0) {
      // 更新现有笔记
      await db.updateNote(existingNotes[0].id, {
        content: noteContent.value,
      });
    } else {
      // 创建新笔记
      await db.addNote({
        questionId: props.questionId,
        type: NOTE_TYPES.TEXT,
        content: noteContent.value,
      });
    }

    autoSaveStatus.value = t('tools.examPrep.noteEditor.autoSaved');

    // 3秒后清除提示
    setTimeout(() => {
      autoSaveStatus.value = '';
    }, 3000);

    // 重新加载笔记列表
    await loadSavedNotes();
  } catch (error) {
    console.error('自动保存失败:', error);
  }
};

// 插入时间
const insertTime = () => {
  const now = formatDate(new Date(), 'YYYY-MM-DD HH:mm');
  noteContent.value += `\n[${now}] `;
};

// 插入标签
const insertTag = () => {
  noteContent.value += '\n#知识点 ';
};

// 清空内容
const clearContent = async () => {
  try {
    await showConfirmDialog({
      title: t('tools.examPrep.noteEditor.clearConfirmTitle'),
      message: t('tools.examPrep.noteEditor.clearConfirmMessage'),
    });

    noteContent.value = '';
    showToast(t('tools.examPrep.noteEditor.cleared'));
  } catch (error) {
    // 用户取消
  }
};

// 显示/隐藏笔记列表
const toggleNotesList = () => {
  showNotesList.value = !showNotesList.value;
};

// 获取笔记预览
const getNotePreview = (content) => {
  if (!content) return '';
  return content.length > 30 ? content.substring(0, 30) + '...' : content;
};

// 选择笔记
const handleSelectNote = (note) => {
  noteContent.value = note.content;
  showToast(t('tools.examPrep.noteEditor.noteLoaded'));
};

// 删除笔记
const handleDeleteNote = async (note) => {
  try {
    await showConfirmDialog({
      title: t('tools.examPrep.noteEditor.deleteConfirmTitle'),
      message: t('tools.examPrep.noteEditor.deleteConfirmMessage'),
    });

    await db.deleteNote(note.id);
    showToast(t('tools.examPrep.noteEditor.noteDeleted'));

    // 重新加载笔记列表
    await loadSavedNotes();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除笔记失败:', error);
      showToast(t('tools.examPrep.noteEditor.deleteError'));
    }
  }
};

// 手动保存
const handleSave = async () => {
  if (!noteContent.value.trim()) {
    showToast(t('tools.examPrep.noteEditor.emptyContent'));
    return;
  }

  saving.value = true;

  try {
    // 查找是否有现有笔记
    const existingNotes = await db.getNotesByQuestionId(props.questionId);

    if (existingNotes.length > 0) {
      // 更新现有笔记
      await db.updateNote(existingNotes[0].id, {
        content: noteContent.value,
      });
    } else {
      // 创建新笔记
      await db.addNote({
        questionId: props.questionId,
        type: NOTE_TYPES.TEXT,
        content: noteContent.value,
      });
    }

    showToast(t('tools.examPrep.noteEditor.saved'));

    emit('save', {
      questionId: props.questionId,
      content: noteContent.value,
    });
  } catch (error) {
    console.error('保存笔记失败:', error);
    showToast(t('tools.examPrep.noteEditor.saveError'));
  } finally {
    saving.value = false;
  }
};

// 取消编辑
const handleCancel = () => {
  emit('cancel');
};

// 监听 props 变化
watch(() => props.questionId, () => {
  initContent();
  loadSavedNotes();
});

watch(() => props.initialContent, (newContent) => {
  noteContent.value = newContent;
});

// 初始化
onMounted(() => {
  initContent();
  loadSavedNotes();
});

// 清理
onUnmounted(() => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
});
</script>

<style lang="less" scoped>
.note-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .toolbar {
    display: flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
  }

  .note-input {
    flex: 1;
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
  }

  .saved-notes-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm);
      background: var(--color-bg-primary);
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .notes-list {
      margin-top: var(--spacing-xs);

      :deep(.van-cell) {
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-xs);

        .van-cell__value {
          font-size: 12px;
          color: var(--color-text-secondary);
        }

        .van-icon-delete {
          color: #f5222d;
          margin-left: var(--spacing-sm);
        }
      }
    }
  }

  .editor-actions {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) 0;

    .van-button {
      flex: 1;
    }
  }

  .auto-save-tip {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(82, 196, 26, 0.1);
    border-radius: var(--radius-md);
    font-size: 12px;
    color: #52c41a;
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (max-width: 375px) {
  .note-editor {
    .toolbar {
      flex-wrap: wrap;
    }
  }
}
</style>