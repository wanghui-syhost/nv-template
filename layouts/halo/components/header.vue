<template>
    <header class="halo-header">
        <div class="halo-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="header.title">{{ header.title }}</a>
        </div>
        <div class="halo-header__navs">
            <el-menu class="halo-header-menu" mode="horizontal" router>
                <template v-for="menu in menus" >
                    <template v-if = "menu.linkType === '1'">
                        <el-submenu  v-if = "menu.childrens && menu.childrens.length > 0" :key="menu.menuId" :index="menu.linkUrl">
                            <template slot="title"> {{ menu.menuName }} </template>
                            <template v-for="childMenu in menu.childrens">
                                <el-menu-item :key="childMenu.menuId" :index="childMenu.linkUrl"> {{ childMenu.menuName }}</el-menu-item>
                            </template>
                        </el-submenu>
                        <el-menu-item :key="menu.menuId" :index="menu.linkUrl"  v-else>
                            {{ menu.menuName }}
                        </el-menu-item>
                    </template>
                    <li class="el-menu-item" v-else :key="menu.menuId">
                        <outer-link class="menuitem" tag = "a"  :to="menu.linkUrl">
                            <a> {{ menu.menuName }} </a>
                        </outer-link>
                    </li>
                </template>
            </el-menu>
        </div>
    </header>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
import  OuterLink from '../../components/nav-link/outer-link'
export default {
    name: 'HaloHeader',
    components: {
        OuterLink
    },
    props: {
        menus: {
            required: true
        }
    },
    data () {
        return {
            header: {
                title: nenv.project.title
            }
        }
    },
    computed: {
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName
        }),
        // 平台导航
        // ...vuex.mapState('platform', {
        //     menus: state => state.menus
        // }),
    }
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;
    }

    .halo-header {
        &__left {
            //flex-grow: 1;
            display: flex;
            align-self: center;
        }
        &__navs {
            width: 0%;
            flex-grow: 1;
        }
    }


</style>

