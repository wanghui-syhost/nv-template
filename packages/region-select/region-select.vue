<template>
    <el-cascader
        :options="nvOptions"
        @active-item-change="handleItemChange"
        v-model="currentValue"
        :props="props"
        ></el-cascader>
</template>
<script>
//import nvInpterMixins from 'nenv/mixins/inputerMixins'
  export default {
    name: 'NvRegionSelect',
    //mixins: [nvInpterMixins],
    props: {
        value: {
            type: Array,
            required: true
        }
    },
    data() {
      return {
        nvOptions: [],
        props: {
          value: 'CODE',
          label: 'NAME',
          children: 'children'
        },
        //currentValue:["44","4406","440606"]
      };
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
    created() {
      this.init();
    }, 

    methods: {

      init(){
            const self = this;
            //获取省份列表
			unfetch("region/getAllProvince", {}).then(({ data }) => {
                self.nvOptions = data;
                if(self.currentValue && self.currentValue.length>1){
                    self.nvOptions.forEach((item,prince_index) => {
                        if(item.CODE == self.currentValue[0]){
                            //根据Pcode获取城市列表
                            unfetch("region/getChildernsByCode?CODE="+item.CODE, {}).then(({ data }) => {
                                self.nvOptions[prince_index].children = data;
                                if(self.currentValue.length>2){
                                   self.nvOptions[prince_index].children.forEach((item2,city_index) =>{
                                       if(item2.CODE == self.currentValue[1]){
                                         //根据Pcode获取区域列表
                                         unfetch("region/getChildernsByCode?CODE="+item2.CODE+"&LEVEL=3", {}).then(({ data }) => {
                                            self.nvOptions[prince_index].children[city_index].children = data;
                                         });
                                       }
                                   });
                                }
                            });
                        }
                    });
                }
		    });
      },

      handleItemChange(val) {
          
              this.nvOptions.forEach((element,index) => {
                  if(val.length == 1){
                        if(element.CODE == val[0]){
                            unfetch("region/getChildernsByCode?CODE="+element.CODE, {}).then(({ data }) => {
                                this.nvOptions[index].children = data;
                            });
                        }
                  }else if(val.length == 2) {
                        if(element.CODE == val[0]){
                            element.children.forEach((city,city_index) => {
                               if(city.CODE == val[1]){
                                    unfetch("region/getChildernsByCode?CODE="+city.CODE+"&LEVEL=3", {}).then(({ data }) => {
                                       this.nvOptions[index].children[city_index].children = data;
                                    });
                               }

                            })
                        }
                  }
              });

      },

    }
  };
</script>
<style lang="scss" scoped>

</style>


