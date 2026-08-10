<template>
  <div class="relative z-0 w-full mt-3 group">
    <input
      :id="id"
      type="number"
      :inputmode="inputMode"
      :value="modelValue"
      :step="step"
      class="rounded-none block py-1 px-0 w-full text-white bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-0 focus:border-blue-600 peer"
      :placeholder="' '"
      required
      @input="handleInput"
    />
    <label
      :for="id"
      class="peer-focus:font-medium absolute text-white dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >{{ label }}</label
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  label: string
  id: string
  step?: string
  inputMode?: 'numeric' | 'decimal'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', parseFloat(target.value) || 0)
}
</script>
