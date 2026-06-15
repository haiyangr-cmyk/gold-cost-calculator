<script setup lang="ts">
import { normalizeDecimalInput } from '../utils/calcGold';
import type { GoldFormValues, ValidationErrors } from '../types/gold';

const props = defineProps<{
  modelValue: GoldFormValues;
  errors: ValidationErrors;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: GoldFormValues];
}>();

type FieldKey = keyof GoldFormValues;

const fields: Array<{
  key: FieldKey;
  label: string;
  suffix: string;
  placeholder: string;
  hint: string;
}> = [
  {
    key: 'goldPrice',
    label: '基础金价',
    suffix: '元/克',
    placeholder: '如 580',
    hint: '填写你看到的当日门店金价或金条金价'
  },
  {
    key: 'weight',
    label: '黄金克重',
    suffix: '克',
    placeholder: '如 20',
    hint: '填写首饰或金条实际克重'
  },
  {
    key: 'craftFee',
    label: '手工费',
    suffix: '元/克',
    placeholder: '如 35',
    hint: '按每克手工费填写；没有则填 0'
  },
  {
    key: 'premium',
    label: '品牌/渠道溢价',
    suffix: '元/克',
    placeholder: '如 10',
    hint: '按每克溢价填写；没有则填 0'
  }
];

function updateField(key: FieldKey, value: string) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: normalizeDecimalInput(value)
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
      <p class="eyebrow">MVP 01</p>
      <h2 class="section-title">黄金成本计算器</h2>
      <p class="section-desc">本地实时计算，不调用任何第三方金价接口。</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <label v-for="field in fields" :key="field.key" class="block">
        <span class="form-label">{{ field.label }}</span>
        <div class="input-wrap">
          <input
            :value="modelValue[field.key]"
            class="form-input"
            inputmode="decimal"
            autocomplete="off"
            :placeholder="field.placeholder"
            @keydown="preventInvalidKey"
            @input="updateField(field.key, ($event.target as HTMLInputElement).value)"
          />
          <span class="input-suffix">{{ field.suffix }}</span>
        </div>
        <p v-if="errors[field.key]" class="form-error">{{ errors[field.key] }}</p>
        <p v-else class="form-hint">{{ field.hint }}</p>
      </label>
    </div>
  </section>
</template>
