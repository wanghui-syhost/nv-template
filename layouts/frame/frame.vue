<template>
    <div id="frame">
        <div class="frame-header">
            <e-header v-if="isShowHeader" />
        </div>
        <div class="e-app-wrapper" v-show="true">
            <div class="e-sidebar-wrapper" v-if="isShowSidebar">
                <e-sidebar class="sidebar-container" :routes="childRoutes" />
            </div>
            <div class="e-main-container">
                <e-tab v-if="isShowTabs" />
                <e-main />
            </div>
        </div>
    </div>
</template>

<script>
import store from './store'
import { EHeader, EMain, ESidebar, ETab } from './components'
import vuex, { createNamespacedHelpers } from 'vuex'
const { mapState ,mapGetters, mapActions } = createNamespacedHelpers(store.name)


export default {
    name: 'Frame',
    components: {
        EHeader,
        ESidebar,
        EMain,
        ETab,
    },
    computed: {
        childRoutes () {
            const self = this
            const { menus, $route } = self
            const rules = /\/[^/]*/
            const parentPath = rules.exec($route.path)[0]
            const parentRoute = menus.find(m => {
               return  rules.exec(m.linkUrl)[0] === parentPath
            })
            if (parentRoute && parentRoute.childrens) {
                return parentRoute.childrens
            } else {
                return []
            }
        },
        ...vuex.mapState('platform', {
            menus: state => state.menus
        }),
        ...mapState({
            isShowSidebar: 'isShowSidebar',
            isShowHomeNav: 'isShowHomeNav',
            isShowHeader: 'isShowHeader',
            isShowTabs: 'isShowTabs'
        })
    },
    data() {
        return {
            current_routers: [],
            routers: [],
            isHome: true,
        }
    },
    methods: {
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
#frame {
    .frame-header {
        position: fixed;
        z-index: 999;
        width: 100%;
    }
    .e-app-wrapper {
        //@include clearfix;
        position: relative;
        padding-top: 72px;
        height: 100%;
        width: 100%;
        &:after {
          clear: both;
        }
        &.hideSidebar {
            .e-sidebar-wrapper {
                transform: translate(-140px, 0);
                .e-sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .e-sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .e-main-container {
                margin-left: 40px;
            }
        }
        .e-sidebar-wrapper {
            width: 240px;
            position: fixed;
            top: 72px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            background-color: #fff;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .e-sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 72px;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
        }
        .e-main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 240px;
        }
    }
}
</style>
