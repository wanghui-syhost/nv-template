import NvUploader from './uploader'

NvUploader.install = function(Vue) {
  Vue.components(NvUploader.name, NvUploader)
}

export default NvUploader