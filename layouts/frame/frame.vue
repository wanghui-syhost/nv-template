<template>
    <div class="frame-wrapper" :class="{'width-limited': isWithLimited}">
        <div class="frame__header-wrapper">
                <frame-header :menus = "menus" @menu-change="handlerMenuChange" :active-top-menu="activeTopMenu || {}"/>
        </div>
        <div class="frame__sidebar-wrapper" v-if="hasSidebar">
            <frame-sidebar class="sidebar-container" :routes="activeTopMenu.childrens || []"/>
        </div>
        <div class="frame__body">
            <div class="frame-wrapper">
                <div class="frame-main-container" :class= "{'has-sidebar': hasSidebar } ">
                    <frame-main />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from './store'
import { frameHeader, frameMain, frameSidebar } from './components'
import vuex, { createNamespacedHelpers } from 'vuex'
const { mapState ,mapGetters, mapActions } = createNamespacedHelpers(store.name)


export default {
    name: 'Frame',
    components: {
        frameHeader,
        frameMain,
        frameSidebar,
    },
    computed: {
        activeTopMenu () {
            const { menus, $route } = this
            const fullPath = $route.fullPath
            function find (menus, callback) {
                for (const menu of menus) {
                    if (menu.linkUrl === fullPath) {
                        return menu
                    } else if (menu.childrens && find(menu.childrens)) {
                        return menu
                    }
                }
            }
            return find(menus)
        },
        ...vuex.mapState('platform', {
            menus: state => 
                [{
                    menuName: '首页',
                    linkType: '1',
                    linkUrl: '/home'
                }].concat(state.menus)
        }),
        ...mapState(['isWithLimited']),
        hasSidebar () {
            const { childrens } = this.activeTopMenu
            return childrens && childrens.length > 0
        }
    },
    data () {
        return {
            currentMenu: {},
            routers: [],
        }
    },
    methods: {
        handlerMenuChange (item) {
            const self = this
            self.currentMenu = self.menus.find(menu => item.ID === menu.ID)
        },
        ...vuex.mapActions('platform', [
            'changeTitle'
        ])
    },
    watch: {
      $route (val) {
        // this.changeTitle("这就是平台厉害的地方")
      }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.frame-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &.width-limited {
        max-width: 1200px;
        margin: 0 auto;

        padding-top: 20px;
        .frame__sidebar-wrapper {
            padding-top: 0;
            top: 82px;
        }
    }
}


.frame__sidebar-wrapper {
    width: 180px;
    position: fixed;
    top: 62px;
    padding-top: 20px;
    bottom: 0;
    z-index: 1001;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 4px 0 #BFC4B6;
    transition: all .28s ease-out;
}

.frame__body {
    position: absolute;
    width: 100%;
    top: 82px;
    bottom: 0px;
    overflow: hidden;

    .frame-main-container {
        transition: all .28s ease-out;
        position: absolute;
        top: 0;
        bottom: 0;
        width: auto;
        right: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 #bfc4b6;

        &.has-sidebar {
            margin-left: 200px;
        }
    }
}
</style>
