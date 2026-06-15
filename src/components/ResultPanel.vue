<script setup lang="ts">
import type { CostResult } from '../types/gold';
import { formatMoney } from '../utils/calcGold';

defineProps<{
  result: CostResult;
  isValid: boolean;
}>();

const emit = defineEmits<{
  save: [];
}>();
</script>

<template>
  <section class="panel-card">
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <p class="eyebrow">实时结果</p>
        <h2 class="section-title">入手成本</h2>
      </div>
      <button class="gold-button shrink-0" :disabled="!isValid" @click="emit('save')">保存测算</button>
    </div>

    <div v-if="!isValid" class="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
      请先完善非负数字输入，系统会自动计算成本结果。
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <div class="metric-card">
        <span>原料价</span>
        <strong>¥{{ formatMoney(result.rawMaterialCost) }}</strong>
      </div>
      <div class="metric-card">
        <span>手工费合计</span>
        <strong>¥{{ formatMoney(result.craftCost) }}</strong>
      </div>
      <div class="metric-card">
        <span>溢价合计</span>
        <strong>¥{{ formatMoney(result.premiumCost) }}</strong>
      </div>
      <div class="metric-card border-luxury-gold/70 bg-luxury-gold/10">
        <span>总花费</span>
        <strong>¥{{ formatMoney(result.totalCost) }}</strong>
      </div>
    </div>

    <div class="mt-4 rounded-3xl border border-luxury-line bg-black/25 p-5">
      <p class="text-sm text-white/[0.55]">综合单克成本</p>
      <p class="mt-1 text-3xl font-semibold text-luxury-gold2">¥{{ formatMoney(result.averageCostPerGram) }}</p>
      <p class="mt-2 text-xs text-white/[0.40]">公式：总花费 ÷ 克重</p>
    </div>
  </section>
</template>
