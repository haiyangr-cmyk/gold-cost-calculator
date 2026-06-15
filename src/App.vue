<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CalculatorForm from './components/CalculatorForm.vue';
import GoodsAdCards from './components/GoodsAdCards.vue';
import ProfitEstimator from './components/ProfitEstimator.vue';
import RecordsList from './components/RecordsList.vue';
import ResultPanel from './components/ResultPanel.vue';
import ShareCard from './components/ShareCard.vue';
import SiteLinks from './components/SiteLinks.vue';
import {
  calculateGoldCost,
  calculateProfit,
  formatMoney,
  validateForm
} from './utils/calcGold';
import { getGoldRecords, saveGoldRecord } from './utils/storage';
import type { GoldFormValues, GoldRecord } from './types/gold';
import { trackEvent } from './utils/analytics';

const form = ref<GoldFormValues>({
  goldPrice: '580',
  weight: '20',
  craftFee: '35',
  premium: '0',
  expectedSellPrice: '620'
});

const records = ref<GoldRecord[]>([]);
const saveNotice = ref('');

onMounted(() => {
  records.value = getGoldRecords();
});

const validation = computed(() => validateForm(form.value));

const costResult = computed(() =>
  calculateGoldCost({
    goldPrice: validation.value.numeric.goldPrice,
    weight: validation.value.numeric.weight,
    craftFee: validation.value.numeric.craftFee,
    premium: validation.value.numeric.premium
  })
);

const profitResult = computed(() => calculateProfit(validation.value.numeric, costResult.value));

const sellPriceDiff = computed(() => validation.value.numeric.expectedSellPrice - validation.value.numeric.goldPrice);

function saveCurrentRecord() {
  if (!validation.value.isProfitValid) {
    saveNotice.value = '请先完善所有输入后再保存测算。';
    return;
  }

  const record: GoldRecord = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    input: validation.value.numeric,
    costResult: costResult.value,
    profitResult: profitResult.value
  };

  records.value = saveGoldRecord(record);
  saveNotice.value = '已保存到本地测算记录，最多保留最近 10 条。';

  trackEvent('save_record', {
    gold_price: validation.value.numeric.goldPrice,
    weight: validation.value.numeric.weight,
    total_cost: costResult.value.totalCost,
    average_cost_per_gram: costResult.value.averageCostPerGram,
    net_profit: profitResult.value.netProfit
  });
}
</script>

<template>
  <main class="min-h-screen bg-luxury-black pb-16 text-white">
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-luxury-gold/15 blur-3xl"></div>
      <div class="absolute right-0 top-48 h-96 w-96 rounded-full bg-luxury-gold2/10 blur-3xl"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <header class="py-8 sm:py-12">
        <p class="eyebrow">生活成本实验室｜黄金篇</p>
        <div class="mt-3 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              黄金入手成本
              <span class="gold-text">测算计算器</span>
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-white/[0.58] sm:text-base">
              面向黄金首饰、投资金条、婚嫁囤金场景。输入金价、克重、手工费和溢价，即时得到总花费、综合单克成本与预期卖出盈亏。
            </p>
          </div>

          <div class="rounded-[2rem] border border-luxury-line bg-white/[0.04] p-5 shadow-gold">
            <p class="text-sm text-white/50">当前综合单克成本</p>
            <p class="mt-2 text-4xl font-semibold text-luxury-gold2">
              ¥{{ formatMoney(costResult.averageCostPerGram) }}
            </p>
            <p class="mt-2 text-xs text-white/[0.42]">全部计算逻辑在浏览器本地完成</p>
          </div>
        </div>
      </header>

      <div class="grid gap-5 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div class="space-y-5">
          <CalculatorForm v-model="form" :errors="validation.errors" />
          <ProfitEstimator
            v-model="form"
            :errors="validation.errors"
            :result="profitResult"
            :is-valid="validation.isProfitValid"
          />
          <div v-if="saveNotice" class="rounded-2xl border border-luxury-line bg-luxury-gold/10 p-4 text-sm text-luxury-gold2">
            {{ saveNotice }}
          </div>
        </div>

        <div class="space-y-5">
          <ResultPanel :result="costResult" :is-valid="validation.isCostValid" @save="saveCurrentRecord" />

          <GoodsAdCards />

          <section class="panel-card">
            <div>
              <p class="eyebrow">成本参考</p>
              <h2 class="section-title">买入价与预期卖出价对比</h2>
              <p class="section-desc">仅比较你输入的基础金价与预期卖出金价，不接入外部实时行情。</p>
            </div>

            <div class="mt-4 rounded-3xl border border-luxury-line bg-black/25 p-5">
              <p class="text-sm text-white/[0.55]">预期卖出金价 - 当前基础金价</p>
              <p
                class="mt-2 text-3xl font-semibold"
                :class="sellPriceDiff >= 0 ? 'text-emerald-200' : 'text-red-200'"
              >
                {{ sellPriceDiff >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(sellPriceDiff)) }}/克
              </p>
              <p class="mt-2 text-xs text-white/[0.42]">
                这是基于手动输入数据的简易参考，不代表实时金价、回收价或投资建议。
              </p>
            </div>
          </section>
        </div>
      </div>

      <div class="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <RecordsList :records="records" />
        <ShareCard
          :input="validation.numeric"
          :cost-result="costResult"
          :profit-result="profitResult"
          :is-valid="validation.isProfitValid"
        />
      </div>

      <SiteLinks />
    </div>
  </main>
</template>
