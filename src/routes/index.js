import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home.vue';
import Main from '@/views/main.vue';
import Dnf from '@/views/dnf.vue';
import Edg from '@/views/edg.vue';
import Echart from '@/views/echart.vue';
import Login from '@/views/login.vue';


const routes = [
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
    path: '/login',
    component: Login
  },

  {
    path: '/EDG.html',
    component: Edg
  },
  {
    path: '/echart.html',
    component: Echart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router