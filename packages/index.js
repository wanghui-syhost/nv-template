import NvCalendar from './calendar'
import NvCheckbox from './checkbox'
import NvRadio from './radio'
import NvSelect from './select'
import NvInput from './input'
import NvTextarea from './textarea'
import NvOrganizeUserSelector from './organize-user-selector'
import NvScrollPane from './scroll-pane'
import NvUploader from './uploader'
import NvUserSelector from './user-selector'
import NvRegionSelect from './region-select'
import NvIframe from './iframe'
import NvDynamic from './dynamic'
//import NvDynamicLeger from './dynamic-ledger'

const components = [
  NvCalendar,
  NvCheckbox,
  NvInput,
  NvRadio,
  NvTextarea,
  NvDynamic,
  //NvDynamicLeger,
  NvIframe,
  NvOrganizeUserSelector,
  NvScrollPane,
  NvSelect,
  NvUploader,
  NvUserSelector,
  NvRegionSelect
]

const install = function(Vue, opts = {}) {
  components.map(component => component.install(Vue))
  //components.map(component => Vue.component(component.name, component))
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue)
}