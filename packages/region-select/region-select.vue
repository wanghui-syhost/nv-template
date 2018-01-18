<template>
    <el-cascader
        :options="options2"
        @active-item-change="handleItemChange"
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
          children: 'cities'
        }
      };
    },

    created() {
      this.getAllProvince();
    }, 

    methods: {
      getAllProvince(){
			const self = this;
			unfetch("region/getAllProvince", {}).then(({ data }) => {
		        self.options2 = data;
		    });
      },
      handleItemChange(val) {
          
              this.options2.forEach((element,index) => {
                  if(val.length == 1){
                        if(element.CODE == val[0]){
                                unfetch("region/getChildernsByCode?CODE="+element.CODE, {}).then(({ data }) => {
                                console.log('index:', index);
                                console.log('dataindex:', data);
                                this.options2[index].cities = data;
                                });
                        }
                  }else if(val.length == 2) {
                        if(element.CODE == val[0]){
                            element.cities.forEach((city,city_index) => {
                               if(city.CODE == val[1]){
                                    unfetch("region/getChildernsByCode?CODE="+city.CODE+"&LEVEL=3", {}).then(({ data }) => {
                                       this.options2[index].cities[city_index].cities = data;
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


