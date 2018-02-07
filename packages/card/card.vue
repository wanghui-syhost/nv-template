<template>
    <div class="nv-layout" :class="{'is-card-layout': isCardLayout}">
        <div>
            <div class="nv-layout__top">
                <label class="nv-layout__top-label" v-if="isShowTitle">{{ acitveMenu.menuName }}</label>
                <slot name = "top"/>
            </div>
        </div>
        <div class="nv-layout__main">
            <slot name="default" />
        </div>
    </div>
</template>
<script>
import store from './store'
import vuex, { createNamespacedHelpers } from 'vuex'
const { mapState ,mapGetters, mapActions } = createNamespacedHelpers(store.name)
export default {
    name: 'NvLayout',
    data () {
        return {
            
        }
    },
    computed: {
        ...vuex.mapState('platform', {
            acitveMenu: state => state.acitveMenu,
        }),
        ...mapState(['isCardLayout', 'isShowTitle'])
    }
}
</script>
<style lang="scss" scoped>
.nv-layout {
    min-height: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(226, 226, 226, 0.5);
    border-radius: 4px;

    &__top {
        padding: 20px;
        &-lable {
            
        }
    }

    > * {
        background-color: #fff;
        margin: 0;
        height: 40px;;
    }
    > .el-dialog__wrapper {
        background-color: transparent;
    }

    &__main { 
        padding: 20px
    }

    &.is-card-layout {
        background-color: transparent;
        > * {
            margin-bottom: 10px;
        }

        .nv-layout__main {
            padding: 0px;
            background-color: transparent;
            > * {
                background-color: #fff;
                padding: 20px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>


