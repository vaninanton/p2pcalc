import { computed, ref } from 'vue'
import { ExchangeRateService } from '@/services/exchangeRateService'
import type { ExchangeRates, CurrencyValues } from '@/types'

export function useCurrency(initialRates: ExchangeRates) {
  const rub = ref<number>(100000)
  const rates = ref<ExchangeRates>(initialRates)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const usdt = computed<number>(() => rub.value / rates.value.rub2usdt)
  const kzt = computed<number>(() => usdt.value * rates.value.usdt2kzt)
  const course = computed<number>(() => kzt.value / rub.value)

  const currencyValues = computed<CurrencyValues>(() => ({
    rub: rub.value,
    usdt: usdt.value,
    kzt: kzt.value,
    course: course.value,
  }))

  async function loadExchangeRate(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const rub2usdt = await ExchangeRateService.fetchUSDRate()
      rates.value.rub2usdt = rub2usdt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  function updateRates(newRates: Partial<ExchangeRates>): void {
    rates.value = { ...rates.value, ...newRates }
  }

  function setRubAmount(amount: number): void {
    rub.value = amount
  }

  return {
    rub,
    rates,
    isLoading,
    error,
    usdt,
    kzt,
    course,
    currencyValues,
    loadExchangeRate,
    updateRates,
    setRubAmount,
  }
}
