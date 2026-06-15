<script setup lang="ts">
import AdSlot from './AdSlot.vue';

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  unlocked: [];
}>();

function unlock() {
  emit('unlocked');
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-[2rem] border border-luxury-line bg-luxury-panel p-5 shadow-gold">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <p class="eyebrow">ad-modal</p>
            <h2 class="section-title">查看赞助内容参考</h2>
            <p class="section-desc">广告位占位，后续接入激励广告或自营推广。</p>
          </div>
          <button class="rounded-full border border-white/10 px-3 py-1 text-sm text-white/60" @click="emit('close')">
            关闭
          </button>
        </div>

        <AdSlot slot-id="ad-modal" variant="modal" />

        <button class="gold-button mt-5 w-full justify-center" @click="unlock">
          继续查看简易金价对比参考
        </button>
      </div>
    </div>
  </Teleport>
</template>
