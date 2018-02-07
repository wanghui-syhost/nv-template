<template>
  <div :style="size">
    <!-- <div id="myChart"  ></div> -->
  </div>
</template>

<script>
var echarts = require('echarts');

export default {
  name: 'EChart',
  props: {
    options: {
        type: Object,
        require: true
    },
    size:Object,
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const el = this.$el
      // 基于准备好的dom，初始化echarts实例
      //let myChart = echarts.init(document.getElementById('myChart'))
      let myChart = echarts.init(el)
      // 绘制图表
      myChart.setOption(this.options);
    }
  },
  watch: {
      options (val) {
        this.draw()
      }
  }
}
</script>
<style>
  #myChart{
    width: 100%;
    height: 400px;
  }

</style>


