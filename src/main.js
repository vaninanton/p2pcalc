import './assets/main.css'

import { createApp } from 'vue'
import { init, animate, resize } from './animate'
import BinanceCalc from './components/BinanceCalc.vue'

const app = createApp(BinanceCalc)

app.mount('#app')

init('absolute top-0 left-0 w-screen h-screen z-[-10]')
animate()
window.onresize = resize;
