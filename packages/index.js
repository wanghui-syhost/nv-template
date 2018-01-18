import NvCalendar from './calendar'
import NvCheckbox from './checkbox'
import NvOrganizeUserSelector from './organize-user-selector'
import NvRadio from './radio'
import NvSelect from './select'
import NvScrollPane from './scroll-pane'
import NvUploader from './uploader'
import NvUserSelector from './user-selector'
import NvRegionSelect from './region-select'

const components = [
  NvCalendar,
  NvCheckbox,
  NvOrganizeUserSelector,
  NvRadio,
  NvScrollPane,
  NvSelect,
  NvUploader,
  NvUserSelector,
  NvRegionSelect
]

const install = function(Vue, opts = {}) {
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue)
}