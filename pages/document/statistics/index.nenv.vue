<template>
  <nv-layout>
    <e-charts :options="polar"></e-charts>
  </nv-layout>
</template>

<style>
.echarts {
  height: 300px;
}
</style>
<script>
import {getStatisticalPie } from './api'

export default {
  created () {
    this.getStatisticalPieMap()
  },
  data () {
    return {
      polar:{ 
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [
          {
              name:'访问来源',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                  normal: {
                      position: 'inner'
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  { value:335, name:'直达', selected:true },
                  { value:679, name:'营销广告' },
                  { value:1548, name:'搜索引擎' },
                  { value:1548, name:'搜索引擎' }
              ]
          },
          {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                  normal: {
                      formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              data:[]
          }
        ]
      }
    }
  },
  methods: {
    getStatisticalPieMap () {
      const self = this
      getStatisticalPie().then(({ data }) => {
        self.listLoading = false;
        data.list.forEach(item => {
          const { series, legend } = self.polar
          series[1].data.push({
            name: item.NAME,
            value: item.COU + 100
          })
          legend.data.push(item.NAME)
        })
      })
      .then(() => {
        // TODO 

        return
      })
      .catch(err => {
        self.listLoading = false;
        console.log(err);
      })
  
    }
  
}
  
}
</script>