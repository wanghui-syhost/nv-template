import Home from './home.vue';

export const router = {
  path: '/',
  redirect: '/home',
  children: [{
    path: '/home',
    component: Home
  }]
}

import './style.scss'

