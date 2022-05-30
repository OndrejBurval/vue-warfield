import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import './firebase.js'

import VueGoogleMaps from '@fawmi/vue-google-maps'
import Popper from "vue3-popper";

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap"
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAaNCpTWH00VcHh2gTKM3-7ny8aYGxk8g4',
        language: 'cz'
    },
})
    .use(router)
    .use(Vue3ColorPicker)
    .use(BootstrapIconsPlugin)
    .mount('#app')

app.component("Popper", Popper);
