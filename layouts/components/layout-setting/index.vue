<template>
    <div class="layout-setting">
        <el-popover
            class="layout-setting__pane"
            ref="setting"
            trigger="click">
            <div class="header__setting-item">
                <el-switch
                    inactive-text="不显示标题"
                    active-text="显示标题"
                    v-model="titleShow"/>
            </div>
            <slot name="default" />
            <div class="header__setting-item">
                <el-switch
                    active-text="卡片布局"
                    inactive-text="传统布局"
                    v-model="cardLayout"
                />
            </div>
        </el-popover>
        <el-button class="layout-setting__btn" v-popover:setting>设置</el-button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
     computed: {
        titleShow: {
            set () {
                this.changeShowTitle()
            },
            get () {
                return this.isShowTitle
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
        ...mapState('nv-layout', ['isShowTitle', 'isCardLayout']),
    },
    methods: {
        ...mapActions('nv-layout',
            ['changeLayout', 'changeShowTitle']
        )
    }
}
</script>
<style lang="scss" scoped>
    .layout-setting {
        display: inline-block;

        &__btn {
            background: transparent;
            border: none;
            color: #fff; 
        }
    }
</style>


