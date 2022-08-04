import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

import 'amfe-flexible'
import 'vant/lib/index.css'
import './styles/index.less'

createApp(App).use(Vant).use(router).use(store).mount('#app')
