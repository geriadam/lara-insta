import { createApp } from 'vue';
import 'flowbite';
import App from './App.vue';
import '../css/app.css';

import store from './store'
import router from './router'

// Subscriber runs for every vuex mutation
// After commit this store.subscribe will run
import subsriber from './store/subscriber'

subsriber()

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
    createApp(App).use(store).use(router).mount('#app')
})