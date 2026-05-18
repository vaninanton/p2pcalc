<template>
  <div
    class="bg-white/25 dark:bg-slate-900/25 border rounded-lg shadow-sm dark:shadow-white text-center"
  >
    <div class="text-xl font-bold py-10">
      <div>{{ formattedKzt }}</div>
    </div>
    <hr />
    <div class="grid grid-cols-2 divide-x">
      <div class="py-4">
        <div class="text-xs">USDT</div>
        {{ formattedUsdt }}
      </div>
      <div class="py-4">
        <div class="text-xs">Курс</div>
        {{ formattedCourse }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  kzt: number
  usdt: number
  course: number
}>()

const formattedKzt = computed<string>(() =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT' }).format(
    Number.isFinite(props.kzt) ? props.kzt : 0,
  ),
)

const formattedUsdt = computed<string>(() =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD' }).format(
    Number.isFinite(props.usdt) ? props.usdt : 0,
  ),
)

const formattedCourse = computed<string>(() =>
  new Intl.NumberFormat('ru-RU').format(Number.isFinite(props.course) ? props.course : 0),
)
</script>
