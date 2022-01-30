import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTw from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { currency, date, randomInt } from '@/methods/filters'

defineRule('email', email)
defineRule('required', required)
defineRule('min', min)
defineRule('numeric', numeric)

configure({
  generateMessage: localize({ zh_TW: zhTw }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency,
  date,
  randomInt
}
app.use(router)
app.use(VueAxios, axios)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Loading', Loading)
app.mount('#app')
