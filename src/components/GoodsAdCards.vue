<script setup lang="ts">
import { trackEvent } from '../utils/analytics';

const articleCards = [
  {
    id: 'gold_craft_fee',
    icon: '工',
    title: '黄金手工费怎么算？',
    desc: '看懂按克收费和真实成本',
    href: '/articles/gold-craft-fee.html'
  },
  {
    id: 'wedding_gold_budget',
    icon: '囍',
    title: '婚嫁三金预算怎么估？',
    desc: '先算克重、工费和总花费',
    href: '/articles/wedding-gold-budget.html'
  },
  {
    id: 'gold_recycling_price',
    icon: '回',
    title: '回收价为什么更低？',
    desc: '理解买入价与回收价差异',
    href: '/articles/gold-recycling-price.html'
  }
];

function trackArticleClick(articleId: string) {
  trackEvent('click_article_card', {
    article_id: articleId
  });
}
</script>

<template>
  <section class="panel-card">
    <div class="mb-4">
      <p class="eyebrow">延伸阅读</p>
      <h2 class="section-title">黄金知识与买金避坑</h2>
      <p class="section-desc">围绕手工费、婚嫁预算和回收差价，帮你更好理解黄金真实成本。</p>
    </div>

    <div class="grid gap-3 sm:grid-cols-3">
      <a
        v-for="item in articleCards"
        :key="item.id"
        :href="item.href"
        class="goods-card"
        :aria-label="item.title"
        @click="trackArticleClick(item.id)"
      >
        <span class="goods-icon">{{ item.icon }}</span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.desc }}</small>
      </a>
    </div>
  </section>
</template>
