<template>
  <div class="flex flex-col justify-around min-h-screen px-4 gap-4">
    <div
      class="dark:bg-slate-900 border rounded-lg shadow dark:shadow-white dark:text-white text-center"
    >
      <div class="text-xl font-bold py-10">
        <div>{{ kzt.toLocaleString('ru-RU', { style: 'currency', currency: 'KZT' }) }}</div>
      </div>
      <hr />
      <div class="grid grid-cols-2 divide-x">
        <div class="py-4">
          <div class="text-xs">USDT</div>
          {{ usdt.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' }) }}
        </div>
        <div class="py-4">
          <div class="text-xs">Курс</div>
          {{ course.toLocaleString('ru-RU') }}
        </div>
      </div>
      <!-- <div class="dark:text-white text-center text-sm font-bold" @click="getOfCourse">
          <div v-if="ofCourse">Курс: {{ ofCourse }}</div>
          <div v-else>Обновить официальный курс</div>
        </div> -->
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="relative z-0 w-full mt-3 group">
        <input
          type="number"
          inputmode="numeric"
          v-model="rub"
          class="rounded-none block py-1 px-0 w-full text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_rub"
          class="peer-focus:font-medium absolute text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >RUB</label
        >
      </div>
      <div class="relative z-0 w-full mt-3 group">
        <input
          type="number"
          inputmode="decimal"
          step=".01"
          v-model="rub2usdt"
          name="floating_rub2usdt"
          id="floating_rub2usdt"
          class="rounded-none block py-1 px-0 w-full text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_rub2usdt"
          class="peer-focus:font-medium absolute text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >rub2usdt</label
        >
      </div>
      <div class="relative z-0 w-full mt-3 group">
        <input
          type="number"
          inputmode="decimal"
          step=".01"
          v-model="usdt2kzt"
          name="floating_usdt2kzt"
          id="floating_usdt2kzt"
          class="rounded-none block py-1 px-0 w-full text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_usdt2kzt"
          class="peer-focus:font-medium absolute text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >usdt2kzt</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ofCourse: null,
      rub: 10000,
      rub2usdt: 82.12,
      usdt2kzt: 450.84
    }
  },
  methods: {
    getOfCourse: function () {
      fetch('https://www.cbr-xml-daily.ru/latest.js')
        .then((response) => {
          if (response.ok) {
            return response.json()
          }

          throw new Error('Network response was not ok')
        })
        .then((json) => {
          this.ofCourse = json.rates.KZT
        })
        .catch((error) => {
          console.log(error)
        })
      //
    }
  },
  computed: {
    usdt: function () {
      return this.rub / this.rub2usdt
    },
    kzt: function () {
      return (this.rub / this.rub2usdt) * this.usdt2kzt
    },
    course: function () {
      return ((this.rub / this.rub2usdt) * this.usdt2kzt) / this.rub
    }
  }
}
</script>

<style scoped></style>
