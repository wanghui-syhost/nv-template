<template>
<treeselect
  :multiple="multiple"
  :options="options"
  :normalizer="normalizer"
  placeholder="请选择"
   search-nested
  :disable-branch-nodes="true"
  v-model="value"
  />
</template>

<script>
  import nvInpterMixins from 'nenv/mixins/inputerMixins'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

export default {
  name: 'NvUserSelector',
    // register the component
  components: { Treeselect },
  mixins: [nvInpterMixins],
  props:{
      // 请求参数
      reqOpt: {
        type: Object,
        default () {
          return {
            url: '/user/organize/all',
          }
        }
      },
      organizeId: {
        type: Object,
        default () {
          return {
            id: ""
          }
        }
      },
      value:{
        type:Object
      },
      multiple:{
        type:Boolean,
        default:true
      }
  },

  model:{
       prop:'value',
       event:'change'
  },

  data: () => ({

    options: [],

    normalizer(node/*, id */) {
      return {
        id: node.id,
        label: node.text,
        children: node.children
      }
    },

  }),

  created(){
     this.getOrganizes();
  },

  methods: {
      //获取组织
      getOrganizes(){
        let me = this
        unfetch.get(me.reqOpt.url, {
            params: {
                ORGANIZE_ID: me.reqOpt.organizeId
                }
            }).then(function ({data}) {          
                me.options =  data; 
            })
      }
  }
}


</script>