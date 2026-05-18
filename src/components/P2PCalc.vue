<template>
  <div class="container mx-auto px-4">
    <div class="absolute text-white/30 top-0 right-4">{{ version }}</div>

    <div class="flex flex-col justify-around min-h-screen gap-4">
      <CurrencyDisplay :kzt="kzt" :usdt="usdt" :course="course" />

      <div class="grid grid-cols-3 gap-4">
        <CurrencyInput
          :model-value="rub"
          label="RUB"
          id="floating_rub"
          input-mode="numeric"
          @update:model-value="setRubAmount"
        />
        <CurrencyInput
          :model-value="rates.rub2usdt"
          label="rub2usdt"
          id="floating_rub2usdt"
          step=".01"
          input-mode="decimal"
          @update:model-value="(value) => updateRates({ rub2usdt: value })"
        />
        <CurrencyInput
          :model-value="rates.usdt2kzt"
          label="usdt2kzt"
          id="floating_usdt2kzt"
          step=".01"
          input-mode="decimal"
          @update:model-value="(value) => updateRates({ usdt2kzt: value })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import CurrencyDisplay from './ui/CurrencyDisplay.vue'
import CurrencyInput from './ui/CurrencyInput.vue'

const version = import.meta.env.VITE_APP_VERSION

const { rub, rates, usdt, kzt, course, setRubAmount, updateRates, loadExchangeRate } = useCurrency({
  rub2usdt: 86.6,
  usdt2kzt: 474.5,
})

onMounted(async () => {
  await loadExchangeRate()
})
</script>
