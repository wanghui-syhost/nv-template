<template>
  <div class="theme-selector">
    <a @click="openThemeDialog">切换主题色</a>
    <el-color-picker ref="picker" class="theme-pick" v-model="color" size="mini"></el-color-picker>
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
            this.theming({ palette: { primaryColor: val} })
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
          //this.themeDialogVisible = true
          console.log(this.$refs.picker.$el)
      },
      ...mapActions('platform', ['theming'])
  }
}
</script>
<style>
    .theme-selector {
        display: inline-block;
    }
    .theme-pick {
        vertical-align: middle;
    }
</style>


