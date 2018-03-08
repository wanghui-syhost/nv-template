<template>
    <div class="nv-layout" :class="{'is-card-layout': isCardLayout}">
        <div class="nv-layout__top" :class="{'is-title-show': isTitleShow, 'only-title': !$slots.top}" v-if="isTitleShow || $slots.top" >
            <label class="nv-layout__top-label" v-if="isTitleShow">{{ acitveMenu.crumbName }}</label>
            <slot name = "top"/>
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
    props: {
        isDynamic: false,
        prefixType: {
            type: String,
            default: '一'
        }
    },
    data () {
        return {
            isDynamicView: false,
            childCounter: 0,
            sectionChildrens: []
        }
    },
    created () {
        this.$parent.$emit('configNvlayout', this)
    },
    computed: {
        isTitleShow () {
            const self = this
            return self.isShowTitle && !self.isDynamicView
        },
        ...vuex.mapState('platform', {
            acitveMenu: state => state.acitveMenu,
        }),
        ...mapState(['isCardLayout', 'isShowTitle'])
    },
    methods: {
        addSection (child) {
            const self = this
            self.sectionChildrens.push(child)
            child.$data.prefix = self.resolveChildPrefix(self.childCounter++)
        },
        resolveChildPrefix (num) {
            const { prefixType } = this
            if (!prefixType) {
                return null
            }
            switch (prefixType) {
                case '一':
                    return ['一','二','三','四','五','六','七','八','九','十',][num]
                case 'Ⅰ':
                    return ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','Ⅺ','Ⅻ'][num]
                case '1':
                    return num + 1
            }
        }
    },
    watch: {
        prefixType (val) {
            const self = this
            self.childCounter = 0
            self.sectionChildrens.map(child => {
                child.$data.prefix = self.resolveChildPrefix(self.childCounter++)
            })
        }
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
        padding: 20px 20px 0px 20px;
        &-label {
            position: relative;
            display: inline-block;
            margin-bottom: 20px;
            &:before {
                content: "";
                position: absolute;
                left: -10px;
                width: 6px;
                border-radius: 6px;
                height: 100%;
                background-color: #3b8cff;
            }
        }
    }

    > * {
        background-color: #fff;
        margin: 0;
        // height: 40px;;
    }
    .el-dialog__wrapper {
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

        .nv-layout__top {
            padding-bottom: 20px;
            // 当仅有title 的时候
            &.only-title {
                .nv-layout__top-label {
                    margin: 0;
                }
            }
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


