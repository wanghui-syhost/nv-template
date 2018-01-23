<template>
    <header>
        <div class="e-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="header.title">{{ header.title }}</a>
        </div>
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
                <outer-link class="menuitem" tag = "a" v-else :key="menu.menuId" :to="menu.linkUrl">
                    <a> {{ menu.menuName }} </a>
                </outer-link>
            </template>
        </el-menu>
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

