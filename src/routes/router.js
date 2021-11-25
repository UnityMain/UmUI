
import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/views/home.vue';
import Main from '@/views/main.vue';
import Dnf from '@/views/dnf.vue';
import Edg from '@/views/edg.vue';

Vue.use(Router);

export default new Router(
  {
    routes: [
      {
        path: '/',
        component: Home,
        children: [
          {
            path: '',
            component: Main,
            children: [
              {
                path: '',
                component: Edg
              }
            ]
          },
          {
            path: '/main',
            component: Main,
            children: [
              {
                path: '',
                component: Edg
              }
            ]
          },
          {
            path: '/dnf',
            component: Dnf,
          }
        ]
      },
      {
        path: '/EDG.html',
        component: Edg
      }
    ]
  }
)