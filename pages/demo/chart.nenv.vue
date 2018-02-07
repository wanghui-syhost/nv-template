<template>
    <div id="chart-div" >
        <e-chart :options= "chartOptions" class="chart-option" />
    </div>
</template>
<script>
import EChart from "@project/component/e-chart";
export default {
   components: { EChart },
    data() {
        return {
             //图表
            chartOptions: {},
        }
    },
    methods: {
        const options = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      }
    }
}
</script>

<style lang="scss" scoped>

</style>

