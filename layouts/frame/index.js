const x = './frame.vue'
import _import from './_import'
const Frame = _import(x)
import store from './store'

const { loader } = window.nenv

export const layout = Frame

loader({ layout, store })

import './assets/icons/index.scss'
import './index.scss'