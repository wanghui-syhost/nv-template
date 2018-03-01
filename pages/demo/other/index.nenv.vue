<template>
  <div class="supervise">
     <section>
        <h3>1.切换标签页标题</h3>
        <el-button type="primary" size="small" @click="changeTitle('切换后的新标题')">点击改变title</el-button>
    </section>
      <h3>2. 禁止open</h3>
      <a ref="x" :href="url" target="__blank" > open</a>
      <button @click="testClick"> 禁止windows open</button>
      <router-view></router-view>
  </div>
</template>

<script>
import vuex, { mapActions } from 'vuex'
export default {
  name: 'Supervise',
  data(){
      return {
          url: '/download'
      }
  },
  methods: {
    ...mapActions('platform', [
        'changeTitle'
    ]),
    testClick () {
      window.open('x')
    }
  }
}
</script>
<style lang="scss">
</style>


