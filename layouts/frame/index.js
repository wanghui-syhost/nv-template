import Frame from './frame'
import store from './store'

const { loader } = window.nenv

export const layout = Frame

loader({ layout, store })

import './assets/icons/index.scss'