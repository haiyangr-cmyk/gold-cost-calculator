<script setup lang="ts">
withDefaults(
  defineProps<{
    slotId: 'ad-top' | 'ad-footer' | 'ad-modal';
    variant?: 'top' | 'footer' | 'modal';
  }>(),
  {
    variant: 'top'
  }
);
</script>

<template>
  <section
    :id="slotId"
    class="ad-shell"
    :class="{
      'min-h-[72px] rounded-3xl border border-luxury-line bg-white/5 p-3': variant === 'top',
      'min-h-[64px] rounded-none border-t border-luxury-line bg-luxury-black/95 px-4 py-3 backdrop-blur': variant === 'footer',
      'min-h-[220px] rounded-3xl border border-dashed border-luxury-line bg-black/20 p-4': variant === 'modal'
    }"
    :data-ad-slot="slotId"
  >
    <!-- Google AdSense 适配预留：
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    -->
    <div class="flex h-full min-h-[48px] items-center justify-center text-center">
      <div>
        <p class="text-xs uppercase tracking-[0.28em] text-luxury-gold">{{ slotId }}</p>
        <p class="mt-1 text-xs text-white/[0.45]">广告位占位，后续接入 Google AdSense / 商品分销</p>
      </div>
    </div>
  </section>
</template>
