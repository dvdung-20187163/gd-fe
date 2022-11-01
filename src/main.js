import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vi from 'element-plus/es/locale/lang/vi'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, {
    locale: vi
});
app.mount('#app')

