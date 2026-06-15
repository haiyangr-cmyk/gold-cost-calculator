<script setup lang="ts">
import { goodsAds } from '../utils/goodsAds';
import { trackEvent } from '../utils/analytics';

function trackGoodsClick(itemId: string) {
  trackEvent('click_goods_card', {
    item_id: itemId
  });
}
</script>

<template>
  <section id="ad-goods" class="panel-card" data-ad-slot="ad-goods">
    <div class="mb-4">
      <p class="eyebrow">ad-goods</p>
      <h2 class="section-title">黄金相关商品推荐</h2>
      <p class="section-desc">广告 / 推广 / 分销链接。购买前请自行核对商品信息与价格。</p>
    </div>

    <div class="grid gap-3 sm:grid-cols-3">
      <a
        v-for="item in goodsAds"
        :key="item.id"
        :href="item.href"
        class="goods-card"
        target="_blank"
        rel="nofollow sponsored noopener"
        :aria-label="item.title"
        @click="trackGoodsClick(item.id)"
      >
        <span class="goods-icon">{{ item.icon }}</span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.desc }}</small>
      </a>
    </div>
  </section>
</template>
