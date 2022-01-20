import { createApp } from 'vue'
import App from './App.vue'
import XyzUI from '@xyz-lab/ui/'

import '@xyz-lab/ui/dist/style.css'
import 'virtual:windi.css'

// Router
import { Router } from '/@/router'

const app = createApp(App)

app.use(Router)

app.use(XyzUI)

console.log(app)

app.mount('#app')
