import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue';
import Expenses from './components/Expenses.vue';
import SingleCategoryPage from './components/SingleCategoryPage.vue';
import { createPinia } from 'pinia';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/expenses', component: Expenses },
        { path: '/expenses/:category_id', component: SingleCategoryPage },
    ]
});

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router);
app.mount('#app')
