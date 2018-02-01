<template>
    <div class="frame-wrapper">
        <div class="frame__header-wrapper">
                <frame-header />
        </div>
        <div class="frame__sidebar-wrapper" v-if="hasSidebar">
            <frame-sidebar class="sidebar-container" :routes="childRoutes"/>
        </div>
        <div id="frame" class="frame">
            <div class="frame-wrapper">
                <div class="e-main-container" :class= "{'has-sidebar': hasSidebar } ">
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

.frame-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}


.frame__sidebar-wrapper {
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

#frame {
    
    position: absolute;
    width: 100%;
    top: 70px;
    bottom: 0px;
    overflow: hidden;
    background-color: red;

    .frame {
        &__header-wrapper {
            position: fixed;
            z-index: 999;
            width: 100%;    
        }

        &__sidebar-wrapper {
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
    }
    // .e-app-wrapper {
    //     position: relative;
    //     // padding-top: 72px;
    //     height: 100%;
    //     width: 100%;

    //     &:after {
    //         content: '';
    //         clear: both;
    //     }

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
            transition: all .28s ease-out;

            position: absolute;
            top: 0;
            bottom: 0;
            width: auto;
            right: 0;
            left: 0;
            overflow-x: hidden;
            overflow-y: auto;

            &.has-sidebar {
                margin-left: 240px;
            }
        }
    // }
}
</style>
