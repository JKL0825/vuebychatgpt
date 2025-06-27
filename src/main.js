import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import {
    createPinia
} from 'pinia'

// PrimeVue core + components
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
import DatePicker from 'primevue/datepicker'
import {
    Form,
    Field
} from 'vee-validate'

// 主題 preset：Aura + 自訂色彩
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './assets/css/theme-overrides.css' // << 橘白自訂配色
import './assets/main.css'

// App 初始化
const app = createApp(App)
app.use(router)
app.use(createPinia())

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})

// 註冊元件
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('Message', Message)
app.component('DatePicker', DatePicker)
app.component('Form', Form)
app.component('Field', Field)

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '預設標題'
    next()
})

app.mount('#app')