const x = './frame.vue'
import _import from './_import'
const Frame = _import(x)
import store from './store'

const { loader } = window.nenv

export const layout = Frame
Object.assign(layout, {
    label: "经典布局"
})

loader({ layout, store })

import './assets/icons/index.scss'
import './index.scss'