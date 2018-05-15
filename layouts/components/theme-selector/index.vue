<template>
  <div class="theme-selector">
    <a @click="openThemeDialog">切换主题色</a>
    <el-color-picker v-model="color" ></el-color-picker>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
      return {
        // color: '',
        themeDialogVisible: false
      }
  },
  computed: {
    color: {
        get () {
            return this.themePalette.primaryColor
        },
        set (val) {
            //this.theming({ palette: { primaryColor: val} })
        }
    },
    ...mapState('platform', {
      themePalette: state => state.theme.palette
    })
  },
  created () {
      console.log(this)
  },
  methods: {
      openThemeDialog () {
          this.themeDialogVisible = true
      },
      ...mapActions('platform', ['theming'])
  }
}
</script>
<style>
    .theme-selector {
        display: inline-block;
    }
</style>


