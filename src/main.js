import './assets/main.css'

import { createApp } from 'vue'
import { init, animate, resize } from './animate'
import P2PCalc from './components/P2PCalc.vue'

const app = createApp(P2PCalc)

app.mount('#app')

init('absolute top-0 left-0 w-screen h-screen -z-10')
animate()
window.onresize = resize
