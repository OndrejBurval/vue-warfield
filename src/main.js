import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap"
import './firebase.js'

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAaNCpTWH00VcHh2gTKM3-7ny8aYGxk8g4',
        language: 'cz'
    },
}).mount('#app')