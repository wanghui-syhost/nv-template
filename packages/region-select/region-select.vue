<template>
    <el-cascader
        :options="options2"
        @active-item-change="handleItemChange"
        v-model="selectedOptions"
        :props="props"
        ></el-cascader>
</template>
<script>
  export default {
    name: 'NvRegionSelect',
    data() {
      return {
        options2: [],
        props: {
          value: 'CODE',
          label: 'NAME',
          children: 'children'
        },
        selectedOptions:["44","4406","440606"]
      };
    },

    created() {
      this.init();
    }, 

    methods: {

      init(){
            const self = this;
            //获取省份列表
			unfetch("region/getAllProvince", {}).then(({ data }) => {
                self.options2 = data;
                if(self.selectedOptions && self.selectedOptions.length>1){
                    self.options2.forEach((item,prince_index) => {
                        if(item.CODE == self.selectedOptions[0]){
                            //根据Pcode获取城市列表
                            unfetch("region/getChildernsByCode?CODE="+item.CODE, {}).then(({ data }) => {
                                self.options2[prince_index].children = data;
                                if(self.selectedOptions.length>2){
                                   self.options2[prince_index].children.forEach((item2,city_index) =>{
                                       if(item2.CODE == self.selectedOptions[1]){
                                         //根据Pcode获取区域列表
                                         unfetch("region/getChildernsByCode?CODE="+item2.CODE+"&LEVEL=3", {}).then(({ data }) => {
                                            self.options2[prince_index].children[city_index].children = data;
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
          
              this.options2.forEach((element,index) => {
                  if(val.length == 1){
                        if(element.CODE == val[0]){
                            unfetch("region/getChildernsByCode?CODE="+element.CODE, {}).then(({ data }) => {
                                this.options2[index].children = data;
                            });
                        }
                  }else if(val.length == 2) {
                        if(element.CODE == val[0]){
                            element.children.forEach((city,city_index) => {
                               if(city.CODE == val[1]){
                                    unfetch("region/getChildernsByCode?CODE="+city.CODE+"&LEVEL=3", {}).then(({ data }) => {
                                       this.options2[index].children[city_index].children = data;
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


