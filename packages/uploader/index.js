import NvUploader from './uploader'

NvUploader.install = function(Vue) {
  Vue.component(NvUploader.name, NvUploader)
}

export default NvUploader