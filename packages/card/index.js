import NvCard from './card'
import NvLayoutSection from './section'
import store from './store'
NvCard.install = function (Vue) {
    Vue.component(NvLayoutSection.name, NvLayoutSection)
    Vue.component(NvCard.name, NvCard)
}

nenv.loader({ store })

export default NvCard