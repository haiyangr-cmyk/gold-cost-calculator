<script setup lang="ts">
import { formatMoney, formatRate, normalizeDecimalInput } from '../utils/calcGold';
import type { GoldFormValues, ProfitResult, ValidationErrors } from '../types/gold';

const props = defineProps<{
  modelValue: GoldFormValues;
  errors: ValidationErrors;
  result: ProfitResult;
  isValid: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: GoldFormValues];
}>();

function updateExpectedSellPrice(value: string) {
  emit('update:modelValue', {
    ...props.modelValue,
    expectedSellPrice: normalizeDecimalInput(value)
  });
}

function preventInvalidKey(event: KeyboardEvent) {
  if (['-', '+', 'e', 'E'].includes(event.key)) {
    event.preventDefault();
  }
}
</script>

<template>
  <section class="panel-card">
    <div class="mb-5">
      <p class="eyebrow">盈亏参考</p>
      <h2 class="section-title">简易盈亏测算</h2>
      <p class="section-desc">只基于你输入的卖出金价估算，不代表实时回收报价。</p>
    </div>

    <label class="block">
      <span class="form-label">预期卖出金价</span>
      <div class="input-wrap">
        <input
          :value="modelValue.expectedSellPrice"
          class="form-input"
          inputmode="decimal"
          autocomplete="off"
          placeholder="如 620"
          @keydown="preventInvalidKey"
          @input="updateExpectedSellPrice(($event.target as HTMLInputElement).value)"
        />
        <span class="input-suffix">元/克</span>
      </div>
      <p v-if="errors.expectedSellPrice" class="form-error">{{ errors.expectedSellPrice }}</p>
      <p v-else class="form-hint">填写你预期未来卖出的每克价格</p>
    </label>

    <div v-if="!isValid" class="mt-4 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
      完善成本和卖出金价后，即可看到毛利与净收益。
    </div>

    <div class="mt-4 grid gap-3 sm:grid-cols-3">
      <div class="metric-card">
        <span>预期卖出收入</span>
        <strong>¥{{ formatMoney(result.expectedRevenue) }}</strong>
      </div>
      <div class="metric-card">
        <span>毛利</span>
        <strong :class="result.grossProfit >= 0 ? 'text-emerald-200' : 'text-red-200'">
          {{ result.grossProfit >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(result.grossProfit)) }}
        </strong>
      </div>
      <div class="metric-card">
        <span>净收益</span>
        <strong :class="result.netProfit >= 0 ? 'text-emerald-200' : 'text-red-200'">
          {{ result.netProfit >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(result.netProfit)) }}
        </strong>
      </div>
    </div>

    <p class="mt-3 text-xs text-white/[0.45]">净收益率：{{ formatRate(result.netProfitRate) }}</p>
  </section>
</template>
