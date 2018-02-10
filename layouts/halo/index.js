import Halo from './halo'

const { loader } = window.nenv

export const layout = Halo
Object.assign(layout, {
    label:"顶部导航"
})

loader({ layout })