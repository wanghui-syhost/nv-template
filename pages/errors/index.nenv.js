import Err404 from './404.vue'
import Err401 from './401.vue'

export const router = [
  {
    path: '/err401',
    component: Err401,
    hidden: true,
    key: 'p-err401'
  },
  {
    path: '/err404',
    component: Err404,
    hidden: true,
    key: 'p-err404'
  },
  {
    path: '*',
    component: Err404,
    hidden: true,
    key: 'p-err404'
  }
]
