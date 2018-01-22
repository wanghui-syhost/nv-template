import NvLedger from './components/ledger'
NvLedger.install =  function (Vue) {
    Vue.component(NvLedger.name, NvLedger)
}

export default NvLedger