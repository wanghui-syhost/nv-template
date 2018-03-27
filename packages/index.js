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
import NvCard from './card'
import NvEditor from './editor'
import NvPersonchooser from './epersonchoose'
import NvDatePick from './datepicker'
//import NvChart from './chart'

const components = [
  NvCalendar,
  NvCheckbox,
  NvInput,
  NvRadio,
  NvTextarea,
  NvDynamic,
  NvCard,
  NvEditor,
  //NvChart,
  NvIframe,
  NvOrganizeUserSelector,
  NvScrollPane,
  NvSelect,
  NvUploader,
  NvUserSelector,
  NvRegionSelect,
  NvPersonchooser,
  NvDatePick
]

const install = function(Vue, opts = {}) {
  components.map(component => component.install(Vue))
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue)
}