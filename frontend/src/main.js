import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Add from './views/Add.vue';
import page404 from './views/page404.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createRouter, createWebHistory } from 'vue-router';
import single from './views/single.vue';
import Oaplikacji from './views/Oaplikacji.vue';
import dodawanie from './views/dodawanie.vue';
import edycja from './views/edycja.vue';

const app = createApp(App);

app.use(createPinia());
app.config.globalProperties.$URL = 'http://localhost:5000';
app.use(Toast, { position: POSITION.BOTTOM_RIGHT });

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Strona główna',
            component: Add,
            meta: { nav: true },
        },
        {
            path: '/single/:id',
            name: 'Pojedyńczy film',
            component: single,
            meta: { nav: true },
            props: true,
        },
        {
            path: '/Oaplikacji',
            name: 'O aplikacji',
            component: Oaplikacji,
            meta: { nav: true },
        },
        {
            path: '/dodawanie',
            name: 'Dodaj film',
            component: dodawanie,
            meta: { nav: true },
        },
        {
            path: '/edycja',
            name: 'Edytuj film',
            component: edycja,
            meta: { nav: true },
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: page404,
            meta: { nav: false },
        },
    ],
});

app.use(router);
app.mount('#app');
