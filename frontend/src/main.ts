import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routers'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/userStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

//  ОБЯЗАТЕЛЬНО до router.use()
const userStore = useUserStore()
userStore.loadFromStorage()

app.use(router)
app.mount('#app')
