<template>
  <div class='tab-tag' v-show="currentTabs.length > 0" >
    <nv-scroll-pane class="tab-tag-wrapper">
      <router-link ref='tag' class = "tabs-view-item"  v-for = "tab in currentTabs" :to = "tab.path" :key="tab.path">
        {{ tab.name }}
        <span class="el-icon-close" @click.prevent.stop='closeTab(tab)'></span>
      </router-link>
    </nv-scroll-pane>
  </div>
</template>

<script>
  // import ScrollPane from '../../../src/components/ScrollPane'
  import store from '../store'
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapGetters, mapActions } = createNamespacedHelpers(store.name)
  export default {
    name:'ETab',
    // components: { ScrollPane },
    data () {
      return {
        currentName:'',
      }
    },
    computed: {
      // visitedViews() {
      //   return this.$store.state.app.visitedViews.slice(-30);
      // },
      // isClosabled(){
      //   return this.$store.state.app.visitedViews.length >= 2;
      // },
      // 计算当前高亮的tab
      currentTab () {
        const self = this
        return self.currentTabs.find(tab => tab.path === self.$route.fullPath )
      },
      ...mapState(['currentTabs']),
    },
    methods: {
      closeTab (tab) {
        const self = this
        const { $router, currentTab, currentTabs } = self
        if (self.currentTab === tab) {
          const index = currentTabs.indexOf(tab)
          // 如果是第一个tab
          if (index === 0) {
            const newTab = currentTabs[1]
          } else {
 
          }
          console.log("当前tab")
        }
        self.delTab(tab)
      },
      // 切换group组
      changeGroupTab (route, oldRoute) {
          this.changeTabGroup({
            group: {path:route.matched[0].path, name: route.matched[0].name}, 
            oldGroup: {path:oldRoute.matched[0].path, name: oldRoute.matched[0].name}
          })
      },
      // 插入tab至当前组
      insertTab () {
        const self = this
        const route = self.$route
        if (route.name) {
          self.addTabToGroup(route)
        }
      },
      // 从当前组删除tab
      delTab (tab) {
        this.removeTabFromGroup(tab)
      },
      ...mapActions(['addTabToGroup', 'removeTabFromGroup', 'changeTabGroup'])
    },
    watch: {
      $route(route, oldRoute) {
        // console.log(route, oldRoute)
        // 如果父路由改变, 则切换tab组
        // debugger
        if ((route.meta['$parant'] !== oldRoute.meta['$parent'])) {
          this.changeGroupTab(route, oldRoute)
        }
        // 如果没有禁止生成 tabTag 标签则插入标签
        if (!route.meta.disableTabTag) {
          this.insertTab(route)
        }
        //this.addViewTabs(route).
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab-tag {
    //display: inline-block;
    width: 100%;
    margin: 20px 0 0 20px;
  }
  .tab-tag-wrapper {
    height: 40px;
  }
  .tabs-view-item {
    display: inline-block;
    position: relative;
    height: 38px;
    line-height: 38px;
    border-width: 1px 1px 0 1px; 
    border-style: solid;
    background-color: #fff;
    vertical-align: bottom;
    padding: 0 8px;
    //margin: 4px 0 0 5px;
    border-radius: 4px 4px 0 0; 

    &.active {
      //height: 40px;
      background-color: red;
    }
  }
  .e-tabs{
    display: inline-block;
    vertical-align: top;
    //height: 40px;
    width: 100%;
    margin: 20px 0 0 20px;
    background: #f0f3f9;
    transition: all ease-in-out 0.5s;
    &__view{
      position: relative;
      display: inline-block;
      width: 200px;
      height: 40px;
      font-size: 14px;
      color:#333;
      text-align: center;
      line-height: 40px;
      //background: url(../../assets/img/ic_tab_item.png);

      &.active{
        font-size: 16px;
        color: #338bf1;
        width: 200px;
        //background: url(../../assets/img/ic_tab_item_active.png);
        background-repeat:no-repeat;
      
      }
      
      &:first-child.active{
        //background: url(../../assets/img/ic_tab_first_active.png);
        background-repeat:no-repeat;
        width:200px;
      }
      &:first-child{
        //background: url(../../assets/img/ic_tab_first.png);
        background-repeat:no-repeat;
        width:200px;
        // transform: rotateX(180deg);
        // transition: all 0.1s ease-in-out;
      }
      &--close{
        position: absolute;
        font-size: 10px;
        right: 30px;
        top: 2px;
        color: #666;
        transform: scale(0.5) rotate(90deg);
        
      }
      &--close.active{
        font-size: 10px;
          right: 40px;
          top: 2px;
          color: #666;
          transition: all 0.5s ease-in-out;
          transform: scale(0.6) rotate(270deg);
      }
    }
  }
</style>
