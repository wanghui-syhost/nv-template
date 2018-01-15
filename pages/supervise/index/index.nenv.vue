<template>
  <div class="supervise">
      <h3>supervise 监察执法</h3>
      <a ref="x" :href="url" target="__blank" > x</a>
      <button @click="testClick"> 禁止windows open</button>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Supervise',
  data(){
      return {
          url: '/download'
      }
  },
  methods: {
    testClick () {
      window.open('x')
    }
  }
}
</script>
<style lang="scss">
</style>


