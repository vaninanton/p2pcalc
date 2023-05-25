<template>
  <div class="">
    <div class="grid grid-cols-3 gap-4">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="number"
          v-model="rub"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_rub"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >RUB</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="number"
          step=".01"
          v-model="rub2usdt"
          name="floating_rub2usdt"
          id="floating_rub2usdt"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_rub2usdt"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >rub2usdt</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="number"
          step=".01"
          v-model="usdt2kzt"
          name="floating_usdt2kzt"
          id="floating_usdt2kzt"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_usdt2kzt"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >usdt2kzt</label
        >
      </div>
    </div>
    <div class="grid gap-4">
      <div class="text-white text-center text-xl font-bold">
        <div>USDT: {{ usdt }}</div>
      </div>
      <div class="text-white text-center text-xl font-bold">
        <div>KZT: {{ kzt }}</div>
      </div>
      <div class="text-white text-center text-xl font-bold">
        <div>Курс: {{ course }}</div>
        <div @click="getOfCourse">Курс: {{ ofCourse }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ofCourse: 0,
      rub: 10000,
      rub2usdt: 82.1,
      usdt2kzt: 451.75
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
      return Math.round((this.rub / this.rub2usdt) * 100) / 100
    },
    kzt: function () {
      return Math.round((this.rub / this.rub2usdt) * this.usdt2kzt * 100) / 100
    },
    course: function () {
      return Math.round((((this.rub / this.rub2usdt) * this.usdt2kzt) / this.rub) * 100) / 100
    }
  }
}
</script>

<style scoped></style>
