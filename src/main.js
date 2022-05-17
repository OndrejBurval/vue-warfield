import { createApp } from 'vue'
import App from './App.vue'


import VueGoogleMaps from '@fawmi/vue-google-maps'
import Vue3ColorPicker from "vue3-colorpicker";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import "vue3-colorpicker/style.css";

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap"
import './firebase.js'

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAaNCpTWH00VcHh2gTKM3-7ny8aYGxk8g4',
        language: 'cz'
    },
})
    .use(Vue3ColorPicker)
    .use(BootstrapIconsPlugin)
    .mount('#app')