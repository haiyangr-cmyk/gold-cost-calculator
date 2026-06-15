<template>
  <section id="ad-goods" class="panel-card" data-ad-slot="ad-goods">
    <div class="mb-4">
      <p class="eyebrow">ad-goods</p>
      <h2 class="section-title">黄金相关商品推荐位</h2>
      <p class="section-desc">商品分销卡片占位，后续可替换为联盟商品链接。</p>
    </div>

    <div class="grid gap-3 sm:grid-cols-3">
      <a
        href="#"
        class="goods-card"
        aria-label="投资金条商品占位"
        @click.prevent
      >
        <span class="goods-icon">Au</span>
        <strong>投资金条占位</strong>
        <small>分销链接待接入</small>
      </a>
      <a
        href="#"
        class="goods-card"
        aria-label="婚嫁三金商品占位"
        @click.prevent
      >
        <span class="goods-icon">囍</span>
        <strong>婚嫁三金占位</strong>
        <small>分销链接待接入</small>
      </a>
      <a
        href="#"
        class="goods-card"
        aria-label="黄金收纳清洁商品占位"
        @click.prevent
      >
        <span class="goods-icon">✨</span>
        <strong>清洁收纳占位</strong>
        <small>分销链接待接入</small>
      </a>
    </div>
  </section>
</template>
