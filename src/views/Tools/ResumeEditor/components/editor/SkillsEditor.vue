<template>
  <div class="skills-editor">
    <div class="add-skill">
      <van-field
        v-model="newSkill"
        :placeholder="t('resume.skills.placeholder')"
        @keyup.enter="handleAdd"
      >
        <template #button>
          <van-button size="small" type="primary" @click="handleAdd">
            {{ t('resume.skills.add') }}
          </van-button>
        </template>
      </van-field>
    </div>

    <div class="skills-container" v-if="skills.length > 0">
      <van-tag
        v-for="(skill, index) in skills"
        :key="index"
        type="primary"
        size="large"
        closeable
        @close="handleRemove(index)"
      >
        {{ skill }}
      </van-tag>
    </div>

    <div class="recommended-skills">
      <div class="section-title">{{ t('resume.skills.recommended') }}</div>
      <div class="recommended-list">
        <van-tag
          v-for="skill in recommendedSkills"
          :key="skill"
          plain
          type="primary"
          @click="handleAddRecommended(skill)"
        >
          {{ skill }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Tag as VanTag, Field as VanField, Button as VanButton } from 'vant';

  const { t } = useI18n();

  const props = defineProps({
    modelValue: { type: Array, default: () => [] },
  });

  const emit = defineEmits(['update:modelValue']);

  const skills = ref([...props.modelValue]);
  const newSkill = ref('');

  const recommendedSkills = [
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'SQL',
    'Docker',
    'Git',
    'Linux',
  ];

  const emitUpdate = () => {
    emit('update:modelValue', [...skills.value]);
  };

  const handleAdd = () => {
    const skill = newSkill.value.trim();
    if (skill && !skills.value.includes(skill)) {
      skills.value.push(skill);
      newSkill.value = '';
      emitUpdate();
    }
  };

  const handleRemove = index => {
    skills.value.splice(index, 1);
    emitUpdate();
  };

  const handleAddRecommended = skill => {
    if (!skills.value.includes(skill)) {
      skills.value.push(skill);
      emitUpdate();
    }
  };
</script>

<style lang="less" scoped>
  .skills-editor {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .add-skill {
    :deep(.van-field) {
      padding: 0;
    }
  }

  .recommended-skills {
    .section-title {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-sm);
    }
    .recommended-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }
  }
</style>
