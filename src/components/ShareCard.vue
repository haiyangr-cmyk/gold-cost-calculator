<script setup lang="ts">
import { ref } from 'vue';
import type { CostResult, NumericGoldInput, ProfitResult } from '../types/gold';
import { formatMoney } from '../utils/calcGold';

const props = defineProps<{
  input: NumericGoldInput;
  costResult: CostResult;
  profitResult: ProfitResult;
  isValid: boolean;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const statusText = ref('生成 PNG 后，也可直接对下方卡片截图分享。');

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawShareImage() {
  if (!props.isValid) {
    statusText.value = '请先完善全部输入，再生成分享卡片。';
    return;
  }

  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }

  const ratio = window.devicePixelRatio || 1;
  const width = 900;
  const height = 1200;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = '300px';
  canvas.style.height = '400px';

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.scale(ratio, ratio);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0F0F0F');
  gradient.addColorStop(0.55, '#1A1710');
  gradient.addColorStop(1, '#D8B45A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255, 248, 232, 0.08)';
  drawRoundRect(ctx, 60, 80, 780, 1040, 42);
  ctx.fill();

  ctx.strokeStyle = 'rgba(243, 217, 139, 0.38)';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, 60, 80, 780, 1040, 42);
  ctx.stroke();

  ctx.fillStyle = '#F3D98B';
  ctx.font = 'bold 50px system-ui, sans-serif';
  ctx.fillText('黄金入手成本测算', 110, 170);

  ctx.fillStyle = 'rgba(255,255,255,0.62)';
  ctx.font = '28px system-ui, sans-serif';
  ctx.fillText('本地计算 · 仅供消费决策参考', 110, 220);

  const rows = [
    ['基础金价', `¥${formatMoney(props.input.goldPrice)} / 克`],
    ['黄金克重', `${formatMoney(props.input.weight)} 克`],
    ['综合单克成本', `¥${formatMoney(props.costResult.averageCostPerGram)} / 克`],
    ['总花费', `¥${formatMoney(props.costResult.totalCost)}`],
    ['预期卖出金价', `¥${formatMoney(props.input.expectedSellPrice)} / 克`],
    ['净收益', `${props.profitResult.netProfit >= 0 ? '+' : '-'}¥${formatMoney(Math.abs(props.profitResult.netProfit))}`]
  ];

  let y = 340;
  rows.forEach(([label, value], index) => {
    ctx.fillStyle = index % 2 === 0 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.04)';
    drawRoundRect(ctx, 110, y - 48, 680, 88, 24);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.58)';
    ctx.font = '28px system-ui, sans-serif';
    ctx.fillText(label, 145, y + 6);

    ctx.fillStyle = label === '净收益' && props.profitResult.netProfit < 0 ? '#FECACA' : '#FFF8E8';
    ctx.font = 'bold 32px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(value, 755, y + 6);
    ctx.textAlign = 'left';

    y += 112;
  });

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '24px system-ui, sans-serif';
  ctx.fillText('提示：实际回收价、损耗、税费、渠道规则可能影响最终收益。', 110, 1040);

  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  link.download = `黄金成本测算-${Date.now()}.png`;
  link.click();
  statusText.value = 'PNG 分享卡片已生成；移动端也可以长按卡片或系统截图。';
}
</script>

<template>
  <section class="panel-card">
    <div class="mb-5">
      <p class="eyebrow">分享卡片</p>
      <h2 class="section-title">生成结果分享卡片</h2>
      <p class="section-desc">{{ statusText }}</p>
    </div>

    <div class="share-preview">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.24em] text-luxury-gold">Gold Cost</p>
          <h3 class="mt-2 text-xl font-semibold text-white">黄金入手成本测算</h3>
        </div>
        <div class="rounded-full border border-luxury-line px-3 py-1 text-xs text-luxury-gold2">本地计算</div>
      </div>

      <div class="mt-5 grid gap-3">
        <div class="share-row">
          <span>综合单克成本</span>
          <strong>¥{{ formatMoney(costResult.averageCostPerGram) }}/克</strong>
        </div>
        <div class="share-row">
          <span>总花费</span>
          <strong>¥{{ formatMoney(costResult.totalCost) }}</strong>
        </div>
        <div class="share-row">
          <span>净收益</span>
          <strong :class="profitResult.netProfit >= 0 ? 'text-emerald-200' : 'text-red-200'">
            {{ profitResult.netProfit >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(profitResult.netProfit)) }}
          </strong>
        </div>
      </div>

      <p class="mt-5 text-xs text-white/[0.45]">仅基于手动输入数据测算，不构成投资建议。</p>
    </div>

    <canvas ref="canvasRef" class="hidden"></canvas>

    <button class="gold-button mt-4 w-full justify-center" :disabled="!isValid" @click="drawShareImage">
      生成 PNG 分享卡片
    </button>
  </section>
</template>
