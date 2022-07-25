import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import { Skeletor } from 'vue-skeletor';
import Placeholder from './components/common/Placeholder';
import VLazyImage from "v-lazy-image";
import 'vue-select/dist/vue-select.css';

import 'vue-skeletor/dist/vue-skeletor.css';
import './styles/app.css'



const app = createApp(App)
app.use(router)
app.component('v-select', vSelect)
app.component('Skeletor', Skeletor);
app.component('Placeholder', Placeholder);
app.component('v-lazy-image', VLazyImage);
app.mount('#app')
