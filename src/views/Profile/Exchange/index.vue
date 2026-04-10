<template>
  <div class="exchange-page">
    <!-- 积分余额卡片 -->
    <section class="balance-card">
      <div class="balance-info">
        <div class="label">可用积分</div>
        <div class="value">{{ availablePoints }}</div>
      </div>
      <van-button 
        type="primary" 
        size="small" 
        round
        @click="showRechargeDialog = true"
      >
        充值积分
      </van-button>
    </section>

    <!-- 分类标签 -->
    <section class="category-tabs">
      <van-tabs v-model:active="activeCategory" @change="handleCategoryChange">
        <van-tab title="全部" name="all" />
        <van-tab title="实物礼品" name="physical" />
        <van-tab title="虚拟道具" name="virtual" />
        <van-tab title="游戏特权" name="privilege" />
      </van-tabs>
    </section>

    <!-- 兑换商品列表 -->
    <section class="products-list">
      <van-empty v-if="filteredProducts.length === 0" description="暂无可兑换商品" />
      
      <div v-else class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
          @click="showProductDetail(product)"
        >
          <div class="product-image">
            <van-image
              width="100%"
              height="120"
              :src="product.image"
              fit="cover"
              radius="var(--radius-md)"
            >
              <template v-slot:error>加载失败</template>
            </van-image>
            <van-tag 
              v-if="product.hot" 
              type="danger" 
              class="hot-tag"
            >
              热门
            </van-tag>
          </div>
          
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-footer">
              <div class="product-price">
                <van-icon name="gold-coin-o" />
                <span>{{ product.price }}</span>
              </div>
              <van-button 
                type="primary" 
                size="mini" 
                round
                :disabled="availablePoints < product.price"
                @click.stop="handleExchange(product)"
              >
                立即兑换
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品详情弹窗 -->
    <van-popup
      v-model:show="showDetailPopup"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="detail-popup" v-if="currentProduct">
        <div class="popup-header">
          <h3>商品详情</h3>
          <van-icon name="cross" @click="showDetailPopup = false" />
        </div>
        
        <div class="popup-content">
          <van-image
            width="100%"
            height="200"
            :src="currentProduct.image"
            fit="contain"
            radius="var(--radius-md)"
          />
          
          <div class="detail-info">
            <h2 class="detail-name">{{ currentProduct.name }}</h2>
            <p class="detail-desc">{{ currentProduct.description }}</p>
            
            <div class="detail-specs">
              <h4>商品规格</h4>
              <p>{{ currentProduct.specs || '标准版' }}</p>
            </div>
            
            <div class="detail-rules">
              <h4>兑换规则</h4>
              <ul>
                <li>兑换后不可退换，请谨慎选择</li>
                <li>实物礼品将在3-7个工作日内发货</li>
                <li>虚拟道具将直接发放到您的账户</li>
                <li>如有疑问请联系客服</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="popup-footer">
          <div class="footer-price">
            <van-icon name="gold-coin-o" />
            <span>{{ currentProduct.price }} 积分</span>
          </div>
          <van-button
            type="primary"
            round
            :disabled="availablePoints < currentProduct.price"
            @click="handleExchange(currentProduct)"
          >
            立即兑换
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 确认兑换弹窗 -->
    <van-dialog
      v-model:show="showConfirmDialog"
      title="确认兑换"
      show-cancel-button
      @confirm="confirmExchange"
    >
      <div class="confirm-content" v-if="currentProduct">
        <p>您确定要兑换以下商品吗？</p>
        <div class="confirm-product">
          <strong>{{ currentProduct.name }}</strong>
          <div class="confirm-price">
            <van-icon name="gold-coin-o" />
            <span>{{ currentProduct.price }} 积分</span>
          </div>
        </div>
        <p class="confirm-tip">兑换后将扣除相应积分，且不可撤销</p>
      </div>
    </van-dialog>

    <!-- 充值对话框 -->
    <van-dialog
      v-model:show="showRechargeDialog"
      title="充值积分"
      show-cancel-button
      @confirm="handleRecharge"
    >
      <div class="recharge-content">
        <p>温馨提示：本平台仅供娱乐，积分不可兑换现金。</p>
        <p>测试期间，您可以点击确认免费获得100积分。</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showSuccessToast } from 'vant'
import { 
  Tabs as VanTabs,
  Tab as VanTab,
  Image as VanImage,
  Tag as VanTag,
  Button as VanButton,
  Icon as VanIcon,
  Empty as VanEmpty,
  Popup as VanPopup,
  Dialog as VanDialog
} from 'vant'

// ========================================
// 响应式数据
// ========================================
const activeCategory = ref('all')
const availablePoints = ref(0)
const showDetailPopup = ref(false)
const showConfirmDialog = ref(false)
const showRechargeDialog = ref(false)
const currentProduct = ref(null)
const allProducts = ref([])

// ========================================
// 计算属性
// ========================================
const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return allProducts.value
  }
  return allProducts.value.filter(p => p.category === activeCategory.value)
})

// ========================================
// 商品数据
// ========================================
const generateProducts = () => {
  return [
    {
      id: 1,
      name: '精美马克杯',
      description: '高品质陶瓷马克杯，容量350ml',
      price: 200,
      category: 'physical',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      hot: true,
      specs: '白色/黑色可选，容量350ml'
    },
    {
      id: 2,
      name: '定制T恤',
      description: '纯棉舒适T恤，多尺码可选',
      price: 500,
      category: 'physical',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      hot: false,
      specs: 'S/M/L/XL码，多色可选'
    },
    {
      id: 3,
      name: '幸运转盘券',
      description: '免费转动幸运转盘3次',
      price: 50,
      category: 'virtual',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      hot: true,
      specs: '有效期7天'
    },
    {
      id: 4,
      name: '答题复活卡',
      description: '答题挑战答错时可复活一次',
      price: 80,
      category: 'virtual',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpeg',
      hot: false,
      specs: '每局限用1次'
    },
    {
      id: 5,
      name: 'VIP会员（月）',
      description: '享受专属特权和额外奖励',
      price: 1000,
      category: 'privilege',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
      hot: true,
      specs: '每日签到双倍积分，专属客服'
    },
    {
      id: 6,
      name: '游戏提示卡',
      description: '数字猜猜猜可获得一次提示',
      price: 30,
      category: 'virtual',
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/orange.jpeg',
      hot: false,
      specs: '提示偏大或偏小'
    }
  ]
}

// ========================================
// 工具函数
// ========================================

/**
 * 加载数据
 */
const loadData = () => {
  // 加载用户积分
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    availablePoints.value = user.points || 1580
  } else {
    availablePoints.value = 1580
  }

  // 加载商品列表
  allProducts.value = generateProducts()
}

/**
 * 分类切换
 */
const handleCategoryChange = () => {
  console.log('切换到分类:', activeCategory.value)
}

/**
 * 显示商品详情
 */
const showProductDetail = (product) => {
  currentProduct.value = product
  showDetailPopup.value = true
}

/**
 * 处理兑换
 */
const handleExchange = (product) => {
  if (availablePoints.value < product.price) {
    showToast('积分不足')
    return
  }
  
  currentProduct.value = product
  showDetailPopup.value = false
  showConfirmDialog.value = true
}

/**
 * 确认兑换
 */
const confirmExchange = () => {
  if (!currentProduct.value) return
  
  // 扣除积分
  availablePoints.value -= currentProduct.value.price
  
  // 更新 localStorage
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    user.points = availablePoints.value
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
  
  showSuccessToast('兑换成功！')
  showConfirmDialog.value = false
  
  // TODO: 添加兑换记录
  addExchangeRecord(currentProduct.value)
}

/**
 * 添加兑换记录
 */
const addExchangeRecord = (product) => {
  const records = JSON.parse(localStorage.getItem('exchangeRecords') || '[]')
  records.unshift({
    id: Date.now(),
    productName: product.name,
    price: product.price,
    time: Date.now(),
    status: 'pending'
  })
  localStorage.setItem('exchangeRecords', JSON.stringify(records))
}

/**
 * 处理充值
 */
const handleRecharge = () => {
  // 测试期间免费赠送100积分
  availablePoints.value += 100
  
  // 更新 localStorage
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    user.points = availablePoints.value
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
  
  showSuccessToast('充值成功！获得100积分')
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>
.exchange-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   积分余额卡片
   ======================================== */
.balance-card {
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  .balance-info {
    .label {
      font-size: var(--font-size-sm);
      opacity: 0.85;
      margin-bottom: var(--spacing-xs);
    }

    .value {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
    }
  }
}

/* ========================================
   分类标签
   ======================================== */
.category-tabs {
  margin: 0 var(--spacing-md) var(--spacing-md);
}

/* ========================================
   商品列表
   ======================================== */
.products-list {
  margin: 0 var(--spacing-md);

  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    .product-card {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
      cursor: pointer;

      &:active {
        transform: scale(0.98);
      }

      .product-image {
        position: relative;

        .hot-tag {
          position: absolute;
          top: var(--spacing-xs);
          right: var(--spacing-xs);
        }
      }

      .product-info {
        padding: var(--spacing-md);

        .product-name {
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-xs) 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .product-desc {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin: 0 0 var(--spacing-sm) 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .product-price {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            color: var(--color-warning);
            font-weight: var(--font-weight-semibold);

            span {
              font-size: var(--font-size-lg);
            }
          }
        }
      }
    }
  }
}

/* ========================================
   商品详情弹窗
   ======================================== */
.detail-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .van-icon {
      font-size: 20px;
      cursor: pointer;
      color: var(--color-text-secondary);
    }
  }

  .popup-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);

    .detail-info {
      margin-top: var(--spacing-lg);

      .detail-name {
        font-size: var(--font-size-xl);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
      }

      .detail-desc {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin: 0 0 var(--spacing-lg) 0;
      }

      h4 {
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
        font-weight: var(--font-weight-semibold);
      }

      p {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin: 0 0 var(--spacing-lg) 0;
      }

      ul {
        padding-left: var(--spacing-lg);
        margin: 0;

        li {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 2;
        }
      }
    }
  }

  .popup-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    background: var(--color-bg-secondary);

    .footer-price {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--color-warning);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
  }
}

/* ========================================
   确认兑换内容
   ======================================== */
.confirm-content {
  padding: var(--spacing-lg);
  text-align: center;

  p {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0 0 var(--spacing-md) 0;
  }

  .confirm-product {
    background: var(--color-bg-tertiary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin: var(--spacing-md) 0;

    strong {
      display: block;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-xs);
    }

    .confirm-price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      color: var(--color-warning);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
    }
  }

  .confirm-tip {
    font-size: var(--font-size-xs);
    color: var(--color-danger);
  }
}

/* ========================================
   充值内容
   ======================================== */
.recharge-content {
  padding: var(--spacing-lg);

  p {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin: 0 0 var(--spacing-sm) 0;
  }
}
</style>
