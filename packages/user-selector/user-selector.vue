<template>
<treeselect 
  :multiple="multiple"
  :options="options"
  :normalizer="normalizer"
  placeholder="请选择"
   search-nested
  :disable-branch-nodes="true"
  :value-format="valueFormat"
  v-model="currentValue"
  @select="select"
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
  //mixins: [nvInpterMixins],
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
        type:[Object,Array,String]
      },
      valueFormat:{
        type:String,
        default:'id'
      },
      multiple:{
        type:Boolean,
        default:true
      },
      isTelephone:{
        type:Boolean,
        default:false
      }
  },


  data: () => ({
    //value:null,
    options: [],
    


  }),

  created(){
     this.getOrganizes();
  },
  
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
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
                //
                if(data){
                  data.forEach(node => {
                    me.setOra(node);
                  });
                }
                me.options =  data; 
            })
      },
      normalizer(node/*, id */) {

      var id = node.id;
      var label=node.text;
      var isDisabled = false;
     
      if(this.isTelephone && node.attributes){
        if(node.attributes.molile){
          //id = node.attributes.molile;
          label = node.text+'('+node.attributes.molile+')' ;
        }else{
           isDisabled = true;
        }

      }

      return {
        id: id,
        label: label,
        children: node.children,
        isDisabled:isDisabled
      }
    },
    select(node,id){
      this.$emit('select',node);
    },
    //设置组织
    setOra(parentNode){
      const self = this;
      if(parentNode.children){
        parentNode.children.forEach(element => {
          if(element.children){
            self.setOra(element);
          }else{
            element.parentText = parentNode.text;
          }
        });
      }
    }
  }
}


</script>

<style>
.vue-treeselect__menu{
  z-index:999999
}
</style>
