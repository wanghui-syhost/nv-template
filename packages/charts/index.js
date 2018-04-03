import 'echarts'
import ECharts from 'vue-echarts/components/ECharts'

export default {
    install (Vue) {
        Vue.component('ECharts', ECharts)
    }
}