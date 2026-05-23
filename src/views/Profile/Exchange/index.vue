<template>
  <div class="exchange-page">
    <!-- 积分余额卡片 -->
    <section class="balance-card">
      <div class="balance-info">
        <div class="label">{{ t('exchange.availablePoints') }}</div>
        <div class="value">{{ availablePoints }}</div>
      </div>
      <van-button type="primary" size="small" round @click="showRechargeDialog = true">
        {{ t('exchange.rechargePoints') }}
      </van-button>
    </section>

    <!-- 分类标签 -->
    <section class="category-tabs">
      <van-tabs v-model:active="activeCategory" @change="handleCategoryChange">
        <van-tab :title="t('exchange.categories.all')" name="all" />
        <van-tab :title="t('exchange.categories.physical')" name="physical" />
        <van-tab :title="t('exchange.categories.virtual')" name="virtual" />
        <van-tab :title="t('exchange.categories.privilege')" name="privilege" />
      </van-tabs>
    </section>

    <!-- 兑换商品列表 -->
    <section class="products-list">
      <van-empty v-if="filteredProducts.length === 0" :description="t('exchange.noExchangeableProducts')" />

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
              <template v-slot:error>{{ t('exchange.loadFailed') }}</template>
            </van-image>
            <van-tag v-if="product.hot" type="danger" class="hot-tag"> {{ t('exchange.hot') }} </van-tag>
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
                {{ t('exchange.exchangeNow') }}
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品详情弹窗 -->
    <van-popup v-model:show="showDetailPopup" round position="bottom" :style="{ height: '70%' }">
      <div class="detail-popup" v-if="currentProduct">
        <div class="popup-header">
          <h3>{{ t('exchange.productDetails') }}</h3>
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
              <h4>{{ t('exchange.specifications') }}</h4>
              <p>{{ currentProduct.specs || t('exchange.standardEdition') }}</p>
            </div>

            <div class="detail-rules">
              <h4>{{ t('exchange.rules') }}</h4>
              <ul>
                <li>{{ t('exchange.exchangeRulesList.noRefund') }}</li>
                <li>{{ t('exchange.exchangeRulesList.physicalShipping') }}</li>
                <li>{{ t('exchange.exchangeRulesList.virtualDelivery') }}</li>
                <li>{{ t('exchange.exchangeRulesList.contactSupport') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="popup-footer">
          <div class="footer-price">
            <van-icon name="gold-coin-o" />
            <span>{{ currentProduct.price }} {{ t('exchange.pointsUnit') }}</span>
          </div>
          <van-button
            type="primary"
            round
            :disabled="availablePoints < currentProduct.price"
            @click="handleExchange(currentProduct)"
          >
            {{ t('exchange.exchangeNow') }}
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 确认兑换弹窗 -->
    <van-dialog
      v-model:show="showConfirmDialog"
      :title="t('exchange.confirmExchangeTitle')"
      show-cancel-button
      @confirm="confirmExchange"
    >
      <div class="confirm-content" v-if="currentProduct">
        <p>{{ t('exchange.confirmExchangeMessage') }}</p>
        <div class="confirm-product">
          <strong>{{ currentProduct.name }}</strong>
          <div class="confirm-price">
            <van-icon name="gold-coin-o" />
            <span>{{ currentProduct.price }} {{ t('exchange.pointsUnit') }}</span>
          </div>
        </div>
        <p class="confirm-tip">{{ t('exchange.confirmExchangeTip') }}</p>
      </div>
    </van-dialog>

    <!-- 充值对话框 -->
    <van-dialog
      v-model:show="showRechargeDialog"
      :title="t('exchange.rechargeDialogTitle')"
      show-cancel-button
      @confirm="handleRecharge"
    >
      <div class="recharge-content">
        <p>{{ t('exchange.rechargeDialogMessage1') }}</p>
        <p>{{ t('exchange.rechargeDialogMessage2') }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast, showSuccessToast } from 'vant';
  import {
    Tabs as VanTabs,
    Tab as VanTab,
    Image as VanImage,
    Tag as VanTag,
    Button as VanButton,
    Icon as VanIcon,
    Empty as VanEmpty,
    Popup as VanPopup,
    Dialog as VanDialog,
  } from 'vant';

  // ========================================
  // 国际化
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 响应式数据
  // ========================================
  const activeCategory = ref('all');
  const availablePoints = ref(0);
  const showDetailPopup = ref(false);
  const showConfirmDialog = ref(false);
  const showRechargeDialog = ref(false);
  const currentProduct = ref(null);
  const allProducts = ref([]);

  // ========================================
  // 计算属性
  // ========================================
  const filteredProducts = computed(() => {
    if (activeCategory.value === 'all') {
      return allProducts.value;
    }
    return allProducts.value.filter(p => p.category === activeCategory.value);
  });

  // ========================================
  // 商品数据
  // ========================================
  const generateProducts = () => {
    return [
      {
        id: 1,
        name: t('exchange.products.mug.name'),
        description: t('exchange.products.mug.description'),
        price: 200,
        category: 'physical',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        hot: true,
        specs: t('exchange.products.mug.specs'),
      },
      {
        id: 2,
        name: t('exchange.products.tshirt.name'),
        description: t('exchange.products.tshirt.description'),
        price: 500,
        category: 'physical',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        hot: false,
        specs: t('exchange.products.tshirt.specs'),
      },
      {
        id: 3,
        name: t('exchange.products.wheelTicket.name'),
        description: t('exchange.products.wheelTicket.description'),
        price: 50,
        category: 'virtual',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        hot: true,
        specs: t('exchange.products.wheelTicket.specs'),
      },
      {
        id: 4,
        name: t('exchange.products.reviveCard.name'),
        description: t('exchange.products.reviveCard.description'),
        price: 80,
        category: 'virtual',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpeg',
        hot: false,
        specs: t('exchange.products.reviveCard.specs'),
      },
      {
        id: 5,
        name: t('exchange.products.vipMonthly.name'),
        description: t('exchange.products.vipMonthly.description'),
        price: 1000,
        category: 'privilege',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
        hot: true,
        specs: t('exchange.products.vipMonthly.specs'),
      },
      {
        id: 6,
        name: t('exchange.products.hintCard.name'),
        description: t('exchange.products.hintCard.description'),
        price: 30,
        category: 'virtual',
        image: 'https://fastly.jsdelivr.net/npm/@vant/assets/orange.jpeg',
        hot: false,
        specs: t('exchange.products.hintCard.specs'),
      },
    ];
  };

  // ========================================
  // 工具函数
  // ========================================

  /**
   * 加载数据
   */
  const loadData = () => {
    // 加载用户积分
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      availablePoints.value = user.points || 1580;
    } else {
      availablePoints.value = 1580;
    }

    // 加载商品列表
    allProducts.value = generateProducts();
  };

  /**
   * 分类切换
   */
  const handleCategoryChange = () => {};

  /**
   * 显示商品详情
   */
  const showProductDetail = product => {
    currentProduct.value = product;
    showDetailPopup.value = true;
  };

  /**
   * 处理兑换
   */
  const handleExchange = product => {
    if (availablePoints.value < product.price) {
      showToast(t('exchange.insufficientPoints'));
      return;
    }

    currentProduct.value = product;
    showDetailPopup.value = false;
    showConfirmDialog.value = true;
  };

  /**
   * 确认兑换
   */
  const confirmExchange = () => {
    if (!currentProduct.value) return;

    // 扣除积分
    availablePoints.value -= currentProduct.value.price;

    // 更新 localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.points = availablePoints.value;
      localStorage.setItem('userInfo', JSON.stringify(user));
    }

    showSuccessToast(t('exchange.exchangeSuccess'));
    showConfirmDialog.value = false;

    // TODO: 添加兑换记录
    addExchangeRecord(currentProduct.value);
  };

  /**
   * 添加兑换记录
   */
  const addExchangeRecord = product => {
    const records = JSON.parse(localStorage.getItem('exchangeRecords') || '[]');
    records.unshift({
      id: Date.now(),
      productName: product.name,
      price: product.price,
      time: Date.now(),
      status: 'pending',
    });
    localStorage.setItem('exchangeRecords', JSON.stringify(records));
  };

  /**
   * 处理充值
   */
  const handleRecharge = () => {
    // 测试期间免费赠送100积分
    availablePoints.value += 100;

    // 更新 localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.points = availablePoints.value;
      localStorage.setItem('userInfo', JSON.stringify(user));
    }

    showSuccessToast(t('exchange.rechargeSuccess'));
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadData();
  });
</script>

<style lang="less" scoped>
  .exchange-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: var(--spacing-lg);
  }

  /* ========================================
   积分余额卡片
   ======================================== */
  .balance-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .balance-info {
      .label {
        font-size: 12px;
        opacity: 0.85;
        margin-bottom: 2px;
      }

      .value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
      }
    }
  }

  /* ========================================
   分类标签
   ======================================== */
  .category-tabs {
    margin: 0 var(--spacing-sm) var(--spacing-sm);
  }

  /* ========================================
   商品列表
   ======================================== */
  .products-list {
    margin: 0 var(--spacing-sm);

    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-sm);

      .product-card {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: transform var(--transition-fast);
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
          padding: var(--spacing-sm);

          .product-name {
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-semibold);
            color: var(--color-text-primary);
            margin: 0 0 3px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .product-desc {
            font-size: 11px;
            color: var(--color-text-secondary);
            margin: 0 0 var(--spacing-xs) 0;
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
                font-size: var(--font-size-md);
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
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      h3 {
        margin: 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
      }

      .van-icon {
        font-size: 18px;
        cursor: pointer;
        color: var(--color-text-secondary);
      }
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);

      .detail-info {
        margin-top: var(--spacing-md);

        .detail-name {
          font-size: var(--font-size-lg);
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .detail-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0 0 var(--spacing-md) 0;
        }

        h4 {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-xs) 0;
          font-weight: var(--font-weight-semibold);
        }

        p {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0 0 var(--spacing-md) 0;
        }

        ul {
          padding-left: var(--spacing-md);
          margin: 0;

          li {
            font-size: 13px;
            color: var(--color-text-secondary);
            line-height: 1.8;
          }
        }
      }
    }

    .popup-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      border-top: 1px solid var(--color-border);
      background: var(--color-bg-secondary);

      .footer-price {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--color-warning);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
      }
    }
  }

  /* ========================================
   确认兑换内容
   ======================================== */
  .confirm-content {
    padding: var(--spacing-md);
    text-align: center;

    p {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .confirm-product {
      background: var(--color-bg-tertiary);
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      margin: var(--spacing-sm) 0;

      strong {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        margin-bottom: 3px;
      }

      .confirm-price {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        color: var(--color-warning);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-semibold);
      }
    }

    .confirm-tip {
      font-size: 11px;
      color: var(--color-danger);
    }
  }

  /* ========================================
   充值内容
   ======================================== */
  .recharge-content {
    padding: var(--spacing-md);

    p {
      font-size: 13px;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin: 0 0 var(--spacing-xs) 0;
    }
  }
</style>
