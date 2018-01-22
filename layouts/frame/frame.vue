<template>
    <div id="frame" class="frame">
        <div class="frame__header-wrapper">
            <frame-header />
        </div>
        <div class="e-app-wrapper" v-show="true" :class="{'has-sidebar': hasSidebar}">
            <div class="e-sidebar-wrapper" v-if="hasSidebar">
                <frame-sidebar class="sidebar-container" :routes="childRoutes"/>
            </div>
            <div class="e-main-container" :class= "{'has-sidebar': hasSidebar } ">
                <!--e-tab v-if="isShowTabs" /-->
                <frame-main />
            </div>
        </div>
    </div>
</template>

<script>
import store from './store'
import { frameHeader, frameMain, frameSidebar, frameTab } from './components'
import vuex, { createNamespacedHelpers } from 'vuex'
const { mapState ,mapGetters, mapActions } = createNamespacedHelpers(store.name)


export default {
    name: 'Frame',
    components: {
        frameHeader,
        frameMain,
        frameSidebar,
        frameTab,
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
            return parentRoute ? parentRoute.childrens || [] : []
        },
        ...vuex.mapState('platform', {
            menus: state => state.menus
        }),
        ...mapState({
            isShowSidebar: 'isShowSidebar',
            isShowHomeNav: 'isShowHomeNav',
            isShowTabs: 'isShowTabs'
        }),
        hasSidebar () {
            return this.childRoutes.length > 0
        }
    },
    data () {
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
    .frame {
        &__header-wrapper {
            position: fixed;
            z-index: 999;
            width: 100%;    
        }
    }
    .e-app-wrapper {
        position: relative;
        padding-top: 72px;
        height: 100%;
        width: 100%;

        &:after {
            content: '';
            clear: both;
        }

        &.auto-sidebar {
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
            
            &.has-sidebar {
                margin-left: 240px;
            }
        }
    }
}
</style>
