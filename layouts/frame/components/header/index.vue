<template>
    <header class="e-header">
        <div class="e-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="project.title">{{ project.title }}</a>
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
            <el-popover
                class="__setting-pane"
                ref="setting"
                trigger="click">
                <div class="header__setting-item">
                    <el-switch
                        inactive-text="不显示标题"
                        active-text="显示标题"
                        v-model="titleShow"/>
                </div>
                <div class="header__setting-item">
                    <el-switch 
                        active-text="大屏模式"
                        inactive-text="小屏模式"
                        v-model="limitWidth"/>
                </div>
                <div class="header__setting-item">
                    <el-switch
                        active-text="卡片布局"
                        inactive-text="传统布局"
                        v-model="cardLayout"
                    />
                </div>
            </el-popover>
            <el-button class="header__setting-btn" v-popover:setting>设置</el-button>
            <span class="e-header__loginuser" >{{ nickName }}</span>
            <span class="e-header__btn-loginout" @click="handlerLogout"> 退出 </span>
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
        titleShow: {
            set () {
                this.changeShowTitle()
            },
            get () {
                return this.isShowTitle
            }
        },
        limitWidth: {
            set () {
                this.changeLimitWidth()
            },
            get () {
                return this.isWithLimited
            }
        },
        cardLayout: {
            set () {
                this.changeLayout()
            },
            get () {
                return this.isCardLayout
            }
        },
        ...vuex.mapState('layout', ['isWithLimited']),
        ...vuex.mapState('nv-layout', ['isShowTitle', 'isCardLayout']),
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
            ['changeLayout', 'changeShowTitle']
        )
    }

}
</script>
<style  lang="scss" scoped>
.header {
    &__setting-btn {
        background: transparent;
        border: none;
        color: #fff;   
    }

    &__setting-item {
        // &:nth-last-child {
            padding-bottom: 10px;
        // }
    }
}
.e-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 1000;

    height: 62px;
    background-color: #3b8cff;
    a, & {
        color: #fff;
    }
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
        height: 33px;
        width: 33px;
        border-radius: 4px;
        vertical-align: middle;
    }
    &__title {
        font-size: 18px;
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
            // font-weight: 700;
            &::before {
                content: "";
                display: block;
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
                height: 3px;
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
