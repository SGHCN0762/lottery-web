<template>
  <div class="about-page">
    <div class="about-content">
      <!-- 功能介绍 -->
      <ToolCard class="about-card" :title="t('tools.examPrep.about.features')" icon="miniprogram-o">
        <div class="features-list">
          <div class="feature-item">
            <van-icon name="edit" class="feature-icon" color="#4CAF50" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featurePractice') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featurePracticeDesc') }}</p>
            </div>
          </div>

          <div class="feature-item">
            <van-icon name="chart-trending-o" class="feature-icon" color="#2196F3" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featureStatistics') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featureStatisticsDesc') }}</p>
            </div>
          </div>

          <div class="feature-item">
            <van-icon name="star-o" class="feature-icon" color="#FF9800" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featureCollection') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featureCollectionDesc') }}</p>
            </div>
          </div>

          <div class="feature-item">
            <van-icon name="warning-o" class="feature-icon" color="#F44336" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featureWrong') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featureWrongDesc') }}</p>
            </div>
          </div>

          <div class="feature-item">
            <van-icon name="certificate" class="feature-icon" color="#9C27B0" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featureMockExam') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featureMockExamDesc') }}</p>
            </div>
          </div>

          <div class="feature-item">
            <van-icon name="notes-o" class="feature-icon" color="#00BCD4" />
            <div class="feature-content">
              <h4 class="feature-title">{{ t('tools.examPrep.about.featureNotes') }}</h4>
              <p class="feature-description">{{ t('tools.examPrep.about.featureNotesDesc') }}</p>
            </div>
          </div>
        </div>
      </ToolCard>

      <!-- 使用说明 -->
      <ToolCard class="about-card" :title="t('tools.examPrep.about.usageGuide')" icon="question-o">
        <div class="usage-guide">
          <div class="guide-section">
            <h4 class="guide-title">{{ t('tools.examPrep.about.quickStart') }}</h4>
            <div class="guide-steps">
              <div class="guide-step">
                <span class="step-number">1</span>
                <span class="step-text">{{ t('tools.examPrep.about.step1') }}</span>
              </div>
              <div class="guide-step">
                <span class="step-number">2</span>
                <span class="step-text">{{ t('tools.examPrep.about.step2') }}</span>
              </div>
              <div class="guide-step">
                <span class="step-number">3</span>
                <span class="step-text">{{ t('tools.examPrep.about.step3') }}</span>
              </div>
              <div class="guide-step">
                <span class="step-number">4</span>
                <span class="step-text">{{ t('tools.examPrep.about.step4') }}</span>
              </div>
            </div>
          </div>

          <div class="guide-section">
            <h4 class="guide-title">{{ t('tools.examPrep.about.studyTips') }}</h4>
            <div class="tips-list">
              <div class="tip-item">
                <van-icon name="success" class="tip-icon" />
                <span class="tip-text">{{ t('tools.examPrep.about.tip1') }}</span>
              </div>
              <div class="tip-item">
                <van-icon name="success" class="tip-icon" />
                <span class="tip-text">{{ t('tools.examPrep.about.tip2') }}</span>
              </div>
              <div class="tip-item">
                <van-icon name="success" class="tip-icon" />
                <span class="tip-text">{{ t('tools.examPrep.about.tip3') }}</span>
              </div>
              <div class="tip-item">
                <van-icon name="success" class="tip-icon" />
                <span class="tip-text">{{ t('tools.examPrep.about.tip4') }}</span>
              </div>
            </div>
          </div>
        </div>
      </ToolCard>

      <!-- 技术栈 -->
      <ToolCard class="about-card" :title="t('tools.examPrep.about.techStack')" icon="good-job-o">
        <div class="tech-stack">
          <van-grid :column-num="2" :border="false">
            <van-grid-item>
              <div class="tech-item">
                <div class="tech-name">Vue 3</div>
                <div class="tech-description">{{ t('tools.examPrep.about.techVue3') }}</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="tech-item">
                <div class="tech-name">Vant UI</div>
                <div class="tech-description">{{ t('tools.examPrep.about.techVant') }}</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="tech-item">
                <div class="tech-name">IndexedDB</div>
                <div class="tech-description">{{ t('tools.examPrep.about.techIndexedDB') }}</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="tech-item">
                <div class="tech-name">Dexie.js</div>
                <div class="tech-description">{{ t('tools.examPrep.about.techDexie') }}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </ToolCard>

      <!-- 反馈与支持 -->
      <ToolCard class="about-card" :title="t('tools.examPrep.about.feedback')" icon="comment-o">
        <div class="feedback-actions">
          <van-button
            type="primary"
            size="large"
            block
            icon="envelop-o"
            @click="handleFeedback"
          >
            {{ t('tools.examPrep.about.sendFeedback') }}
          </van-button>
          <p class="feedback-description">{{ t('tools.examPrep.about.feedbackDescription') }}</p>
        </div>
      </ToolCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import {
  NavBar as VanNavBar,
  Icon as VanIcon,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Button as VanButton,
} from 'vant';
import ToolCard from '../../components/ToolCard.vue';

const { t } = useI18n();
const router = useRouter();

/**
 * 处理反馈
 */
const handleFeedback = () => {
  showToast(t('tools.examPrep.about.feedbackSent'));
  // TODO: 实现反馈功能，可以打开邮件客户端或反馈表单
};
</script>

<style lang="less" scoped>
.about-page {
  .about-content {
    padding: var(--spacing-md);

    .about-card {
      margin-bottom: var(--spacing-md);

      .features-list {
        padding: var(--spacing-md);

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          margin-bottom: var(--spacing-sm);

          &:hover {
            background: var(--color-bg-tertiary);
          }

          .feature-icon {
            font-size: 24px;
            flex-shrink: 0;
          }

          .feature-content {
            flex: 1;

            .feature-title {
              font-size: 16px;
              font-weight: 500;
              color: var(--color-text-primary);
              margin: 0 0 var(--spacing-xs) 0;
            }

            .feature-description {
              font-size: 14px;
              color: var(--color-text-secondary);
              line-height: 1.5;
              margin: 0;
            }
          }
        }
      }

      .usage-guide {
        padding: var(--spacing-md);

        .guide-section {
          margin-bottom: var(--spacing-lg);

          .guide-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-md);
          }

          .guide-steps {
            .guide-step {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              margin-bottom: var(--spacing-sm);
              padding: var(--spacing-sm);
              background: var(--color-bg-secondary);
              border-radius: var(--radius-md);

              .step-number {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: var(--color-primary);
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                flex-shrink: 0;
              }

              .step-text {
                font-size: 14px;
                color: var(--color-text-secondary);
              }
            }
          }

          .tips-list {
            .tip-item {
              display: flex;
              align-items: flex-start;
              gap: var(--spacing-sm);
              margin-bottom: var(--spacing-sm);
              font-size: 14px;
              color: var(--color-text-secondary);

              .tip-icon {
                font-size: 18px;
                color: var(--color-primary);
                flex-shrink: 0;
              }
            }
          }
        }
      }

      .tech-stack {
        padding: var(--spacing-md);

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-md);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);

          .tech-name {
            font-size: 16px;
            font-weight: 600;
            color: var(--color-text-primary);
          }

          .tech-description {
            font-size: 12px;
            color: var(--color-text-secondary);
          }
        }

        :deep(.van-grid-item__content) {
          padding: var(--spacing-sm);
        }
      }

      .feedback-actions {
        padding: var(--spacing-md);

        .feedback-description {
          font-size: 12px;
          color: var(--color-text-tertiary);
          margin-top: var(--spacing-sm);
          text-align: center;
        }

        :deep(.van-button) {
          border-radius: var(--radius-lg);
        }
      }
    }
  }
}
</style>