import Home from './home.vue';

const platform = window.platform

// const layoutName = 'Frame'
// const { loadPackage, getLayout } = platform

// const router = {
//   path: '/',
//   redirect: '/home',
//   name: 'Home',
//   hidden: true,
//   key: 'f-home',
//   component: getLayout(layoutName),
//   children: [{
//     path: 'home',
//     component: Home
//   }]
// }
export const router = {
  path: '/',
  redirect: '/home',
  children: [{
    path: 'home',
    component: Home,
    meta: { nosideBar: true }
  }]
}

import './style.scss'

