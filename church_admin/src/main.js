import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Quasar, Notify } from 'quasar'
import mitt from 'mitt'

import App from './App.vue'
import router from './router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './assets/main.css'

import VueApexCharts from "vue3-apexcharts";


import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendarDay.js'
import '@quasar/quasar-ui-qcalendar/src/css/calendar-day.sass'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

app.use(VueApexCharts);

const emitter = mitt()
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Quasar, {
    plugins: {
       Notify
    } // import Quasar plugins and add here
})
app.provide('emitter', emitter)

// Use Vuetify
const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify)

app.mount('#app')
