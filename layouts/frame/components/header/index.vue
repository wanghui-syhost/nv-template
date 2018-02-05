<template>
    <header class="e-header">
        <div class="e-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="header.title">{{ header.title }}</a>
        </div>
        <div class="e-header__nav">
            <nv-scroll-pane class="header-menu-wrapper">
                <component
                    :is="navComponent(item)"
                    :to="item.linkUrl"
                    tag="div"
                    v-for = "(item, index) in menus"
                    :key="index"
                    class="e-header__nav--item"
                    :class="{active: activeTopMenu.menuId === item.menuId }"
                    @click="handlerClick(item)"
                    >
                    {{ item.menuName }}
                </component>
            </nv-scroll-pane>
        </div>
        <div class="e-header__right">
            <a>
                <i class="png-icon alarm middle" />
            </a>
            <a @click="changeSkin">
                <i class="png-icon skin middle" />
            </a>
            <span @click = "handlerMaxWidth"> 全屏/限宽 </span>
            <span @click = "handerLayout"> 切换布局 </span>
            <span class="e-header__loginuser" >{{ nickName }}</span>
            <span class="e-header__btn-loginout" @click="handlerLogout">{{ header.loginoutText }}</span>
        </div>
    </header>
</template>

<script>
import OuterLink from '../nav-link/outer-link' 
import InnerLink from '../nav-link/inner-link' 
import vuex, { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FrameHeader',
    components: { OuterLink, InnerLink },
    props: {
        header: {
            type: Object,
            default() {
                return {
                    title: nenv.project.title,
                    loginoutText: '退出',
                }
            }
        },
        menus: {
            type: Array,
            required: true,
        },
        activeTopMenu: {
            type: Object,
            required: true
        }
    },
    computed: {
        // activeTopMenu () {
        //     const { menus, $route } = this
        //     const fullPath = $route.fullPath
        //     function find (menus, callback) {
        //         for (const menu of menus) {
        //             if (menu.linkUrl === fullPath) {
        //                 return menu
        //             } else if (menu.childrens && find(menu.childrens)) {
        //                 return menu
        //             }       
        //         }
        //     }
        //     return find(menus)
        // },
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName
        })
    },
    methods: {
        // 用于计算导航的组件是什么类型的
        navComponent (item) {
            switch (item.linkType) {
                case "1":
                    return 'inner-link'
                case "2":
                    return 'outer-link'
            }
            return 'router-link'
        },
        handlerLogout () {
            const self = this
            self
              .logout()
              .then(() => {
                this.$router.push({ path: process.env.LOGIN_PATH || '/login' })
              })
        },
        handerLayout () {
            this.changeLayout()
        },
        handlerMaxWidth () {
            this.changeLimitWidth()
        },
        handlerClick (item) {
            this.$emit('menu-change', item)
        },
        changeSkin(){
            if(this.theme==''){
                this.$store.dispatch('changeTheme', 'theme');
            }else{
                this.$store.dispatch('changeTheme', '');
            }
        },
        ...mapActions(
            ['logout']
        ),
        ...mapActions('layout', 
            ['changeLimitWidth']
        ),
        ...mapActions('nv-layout',
            ['changeLayout']
        )
    }

}
</script>
<style  lang="scss" scoped>
.e-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;

    height: 62px;
    background-color: #3b8cff;
    color: #fff;
    line-height: 62px;
    padding: 0 20px;
    overflow: hidden;
    &__left {
        // float: left;
        text-align: left;
        overflow: hidden;
        margin-right: 20px;
    }                   
    &__logo {
        height: 40px;
        width: 40px;
        border-radius: 4px;
        vertical-align: middle;
    }
    &__title {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &__nav {
        //float: left;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;
        width: 100;
    }
    &__nav--item {
        position: relative;
        display: inline-block;
        text-align: center;
        opacity: 0.7;
        text-decoration: none;
        width: 64px;
        margin-right: 38px;
        &:first-child {
            width: 32px;
        }
        &.active {
            opacity: 1;
            font-weight: 700;
            &::before {
                content: "";
                display: block;
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
                height: 4px;
                border-radius: 2px;
                background: #fff;
            }
        }
        &:hover {
            opacity: 1;
            cursor: pointer;
            transform: scale(1.05, 1.05);
        }
    }
    &__right {
        // text-align: right;
        margin-left: 20px;
        // vertical-align: middle;
    }

    &__alarm {
        width: 14px;
        height: 15px;
        vertical-align: middle;
    }
    &__loginuser {
        margin-right: 24px;
    }
    &__alarm {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 20px;
    }
    &__skin {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 20px;
    }
    &__btn-loginout {
        display: inline-block;
        width: 60px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 4px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
    }
}

.header-menu-wrapper {
    height: 76px;
}
</style>
