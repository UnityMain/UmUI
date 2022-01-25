import * as Vue from 'vue'
import App from '@/App.vue'
import router from '@/routes'
import store from '@/store'

//import * as echarts from "echarts";


/**自定义 */
import '@/assets/css/styles.css';
import '@/assets/css/icon.css';

import UmMenu from '@/components/um-menu/index'
import UmTable from '@/components/um-table/index'
import UmSyllabus from '@/components/um-syllabus/index'
import UmWaterfall from '@/components/um-waterfall/index'
import UmButton from '@/components/um-button/index'
import UmInput from '@/components/um-input/index'
import UmHeader from '@/components/um-header/index'
import UmMain from '@/components/um-main/index'
import UmAside from '@/components/um-aside/index'
import UmContainer from '@/components/um-container/index'
import UmFooter from '@/components/um-footer/index'
import UmCarousel from '@/components/um-carousel/index'
import UmCarouselItem from '@/components/um-carousel-item/index'

const components = [
    UmMenu, UmSyllabus,
    UmWaterfall, UmTable,
    UmButton, UmInput,
    UmHeader, UmMain,
    UmAside, UmContainer,
    UmFooter, UmCarousel,
    UmCarouselItem
]

const app = Vue.createApp(App);
app.use(store)
app.use(router)
app.mount('#app')

components.forEach(component => {
    app.component(component.name, component);
});

//app.prototype.$echarts = echarts





