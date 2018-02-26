<template>
    <header class="halo-header">
        <div class="halo-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="project.title">{{ project.title }}</a>
        </div>
        <div class="halo-header__navs">
            <nv-menu :menus="menus" />
        </div>
        <div class="halo-header__right">
            <layout-setting />
            <layout-select/>
            <logout />
        </div>
    </header>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
import navComponentMixin from '@layouts/mixins/navComponentMixin'
import Logout from '@layouts/components/logout.vue'
import LayoutSelect from '@layouts/components/layout-selector'
import LayoutSetting from '@layouts/components/layout-setting'
import menu from './menu'
// import 
import  OuterLink from '../../components/nav-link/outer-link'
export default {
    name: 'HaloHeader',
    mixins: [navComponentMixin],
    components: {
        NvMenu: menu,
        LayoutSelect,
        LayoutSetting,
        OuterLink,
        Logout
    },
    props: {
        menus: {
            required: true
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName
        })
    }
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 64px;
        background-color: #3b8cff;
    }

    .halo-header {
        &__navs {
            .el-menu {
                border: none;
                background-color: transparent;
            }
        }
    }

    .halo-header {
        &__left, &__right {
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

