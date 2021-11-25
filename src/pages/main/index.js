//import Vue from 'vue'
import App from '@/app.vue';
import router from '@/routes/router.js';       // 路由列表

/**自定义 */
import '@/assets/css/styles.css';
import "@/assets/css/icon.css";

const UmMenu = resolve => require(['@/components/um-menu/index'], resolve)
const UmTable = resolve => require(['@/components/um-table/index'], resolve)
const UmSyllabus = resolve => require(['@/components/um-syllabus/index'], resolve)
const UmWaterfall = resolve => require(['@/components/um-waterfall/index'], resolve)
const UmButton = resolve => require(['@/components/um-button/index'], resolve)
const UmInput = resolve => require(['@/components/um-input/index'], resolve)
const UmHeader = resolve => require(['@/components/um-header/index'], resolve)
const UmMain = resolve => require(['@/components/um-main/index'], resolve)
const UmAside = resolve => require(['@/components/um-aside/index'], resolve)
const UmContainer = resolve => require(['@/components/um-container/index'], resolve)
const UmFooter = resolve => require(['@/components/um-footer/index'], resolve)
const UmCarousel = resolve => require(['@/components/um-carousel/index'], resolve)
const UmCarouselItem = resolve => require(['@/components/um-carousel-item/index'], resolve)


const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)

const components = [
  UmMenu, UmSyllabus,
  UmWaterfall, UmTable,
  UmButton, UmInput,
  UmHeader, UmMain,
  UmAside, UmContainer,
  UmFooter, UmCarousel,
  UmCarouselItem
]

components.forEach(component => {
  Vue.component(component.name, component);
});


const app = new Vue({
  components: { App },
  template: '<App/>',
  router
}).$mount('#app')





