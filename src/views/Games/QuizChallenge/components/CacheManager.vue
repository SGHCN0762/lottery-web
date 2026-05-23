<template>
  <div class="cache-manager">
    <van-cell-group title="题目缓存管理" inset>
      <!-- 缓存统计 -->
      <van-cell title="已缓存分类" :value="`${stats.cachedCategories} 个`" />
      
      <!-- 清除所有缓存按钮 -->
      <van-cell>
        <template #default>
          <van-button 
            type="warning" 
            size="small" 
            @click="handleClearAllCache"
            :loading="clearing"
          >
            清除所有缓存
          </van-button>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 各分类缓存详情 -->
    <van-cell-group v-if="categories.length > 0" title="分类详情" inset style="margin-top: 16px;">
      <van-cell
        v-for="cat in categories"
        :key="cat.key"
        :title="cat.name"
        :label="getCategoryLabel(cat)"
      >
        <template #right-icon>
          <van-tag v-if="cat.loaded" type="success" size="medium">已缓存</van-tag>
          <van-tag v-else-if="cat.progress.loaded > 0" type="primary" size="medium">
            {{ cat.progress.loaded }}/{{ cat.progress.total }}
          </van-tag>
          <van-tag v-else type="default" size="medium">未加载</van-tag>
          
          <van-button
            v-if="cat.loaded"
            icon="delete-o"
            plain
            size="mini"
            style="margin-left: 8px;"
            @click="handleClearCategory(cat.key)"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast, showDialog } from 'vant';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  clearCategory: {
    type: Function,
    required: true,
  },
  clearAll: {
    type: Function,
    required: true,
  },
  getStats: {
    type: Function,
    required: true,
  },
});

const stats = ref({ cachedCategories: 0, totalSize: '未知' });
const clearing = ref(false);

/**
 * 获取分类标签文本
 */
const getCategoryLabel = (cat) => {
  if (cat.loaded) {
    return `${cat.count || 0} 道题目`;
  } else if (cat.progress.loaded > 0) {
    return `加载中... ${cat.progress.loaded}/${cat.progress.total}`;
  }
  return '点击加载';
};

/**
 * 处理清除单个分类缓存
 */
const handleClearCategory = async (categoryKey) => {
  try {
    await showDialog({
      title: '确认清除',
      message: `确定要清除 "${props.categories.find(c => c.key === categoryKey)?.name}" 的缓存吗？`,
    });
    
    await props.clearCategory(categoryKey);
    showToast('缓存已清除');
    await refreshStats();
  } catch (error) {
    // 用户取消操作
  }
};

/**
 * 处理清除所有缓存
 */
const handleClearAllCache = async () => {
  try {
    await showDialog({
      title: '确认清除',
      message: '确定要清除所有题目的缓存吗？下次加载时将重新下载。',
    });
    
    clearing.value = true;
    await props.clearAll();
    showToast('所有缓存已清除');
    await refreshStats();
  } catch (error) {
    // 用户取消操作
  } finally {
    clearing.value = false;
  }
};

/**
 * 刷新缓存统计
 */
const refreshStats = async () => {
  stats.value = await props.getStats();
};

// 组件挂载时获取统计信息
onMounted(() => {
  refreshStats();
});
</script>

<style lang="less" scoped>
.cache-manager {
  padding-bottom: 20px;
}
</style>
