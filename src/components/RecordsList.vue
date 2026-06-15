<script setup lang="ts">
import type { GoldRecord } from '../types/gold';
import { formatMoney } from '../utils/calcGold';

defineProps<{
  records: GoldRecord[];
}>();

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}
</script>

<template>
  <section class="panel-card">
    <div class="mb-5">
      <p class="eyebrow">MVP 03</p>
      <h2 class="section-title">本地测算记录</h2>
      <p class="section-desc">仅保存在当前浏览器 localStorage，最多保留 10 条。</p>
    </div>

    <div v-if="records.length === 0" class="empty-box">
      暂无记录。完成输入后点击“保存测算”即可生成本地记录。
    </div>

    <ul v-else class="space-y-3">
      <li v-for="record in records" :key="record.id" class="record-item">
        <div>
          <p class="text-sm font-medium text-white">{{ formatDate(record.createdAt) }}</p>
          <p class="mt-1 text-xs text-white/[0.45]">
            金价 {{ record.input.goldPrice }} 元/克 · 克重 {{ record.input.weight }} 克
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-luxury-gold2">¥{{ formatMoney(record.costResult.averageCostPerGram) }}/克</p>
          <p class="mt-1 text-xs" :class="record.profitResult.netProfit >= 0 ? 'text-emerald-200' : 'text-red-200'">
            净收益 {{ record.profitResult.netProfit >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(record.profitResult.netProfit)) }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
