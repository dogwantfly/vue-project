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
import { currency, date } from '@/methods/filters'
// vee-validate 基本設定
defineRule('email', email)
defineRule('required', required)
defineRule('min', min)
defineRule('numeric', numeric)

// Activate the locale
configure({
  generateMessage: localize({ zh_TW: zhTw }),
  validateOnInput: true // 調整為輸入字元立即進行驗證
})
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency,
  date
}
app.use(router)
app.use(VueAxios, axios)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Loading', Loading)
app.mount('#app')
