<template>
  
</template>
<script>
import { mapState } from 'vuex'
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
        // ...mapState(name, ['isWithLimited']),
        ...mapState('nv-layout', ['isShowTitle', 'isCardLayout']),
    },
}
</script>
<style lang="scss" scoped>

</style>


