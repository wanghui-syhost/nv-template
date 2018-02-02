import NvCard from './card'
import store from './store'
NvCard.install = function (Vue) {
    Vue.component(NvCard.name, NvCard)
}

nenv.loader({ store })

export default NvCard