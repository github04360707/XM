// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';

import VueAxios from 'vue-axios'

import {useRoute} from 'vue-router';
const route = useRoute();
// app.use(ElementPlus)
const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(createPinia())
app.use(router)

app.use(VueAxios,axios)
// Vue.prototype.$http = api;


app.mount('#app')
