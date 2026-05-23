<template>
  <van-dialog
    :show="visible"
    :title="t('settings.changeNickname')"
    show-cancel-button
    @update:show="handleClose"
    @confirm="handleConfirm"
  >
    <van-field
      v-model="tempNickname"
      :placeholder="t('settings.nicknamePlaceholder')"
      maxlength="20"
      show-word-limit
    />
  </van-dialog>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import { Dialog as VanDialog, Field as VanField } from 'vant';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    currentNickname: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:visible', 'confirm']);

  const { t } = useI18n();

  const tempNickname = ref('');

  watch(
    () => props.visible,
    val => {
      if (val) {
        tempNickname.value = props.currentNickname;
      }
    }
  );

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleConfirm = () => {
    if (!tempNickname.value.trim()) {
      showToast(t('settings.nicknameEmpty'));
      return;
    }

    emit('confirm', tempNickname.value.trim());
  };
</script>
