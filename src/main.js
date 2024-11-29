import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const app = createApp(App);

app.use(router);
app.mount('#app');
