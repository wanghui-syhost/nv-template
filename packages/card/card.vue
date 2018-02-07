<template>
    <div class="nv-layout" :class="{'is-card-layout': isCardLayout}">
        <slot name="default" />
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
        ...mapState(['isCardLayout'])
    }
}
</script>
<style lang="scss" scoped>
.nv-layout {
    min-height: 100%;
    background-color: #fff;
    >.search-form {
        background-color: #fff;
        padding: 20px;
        margin: 0;
        height: 40px;;
    }
    > .el-dialog__wrapper {
        background-color: transparent;
    }
    &.is-card-layout {
        background-color: transparent;
        > * {
            margin-bottom: 10px;
        }
    }
}
</style>


