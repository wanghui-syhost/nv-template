<template>
 
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
    name: 'callback2',
    title:'登录',
    meta: { nvPermisson: false },
    computed: {
        ...mapState('user', {
            user: state => state.profile
        }),
        token () {
            return this.$route.query.token;
        }
    },
    created(){
        alert(this.token)
        alert(localStorage.getItem("user.token"))
        // localStorage.setItem("user.token1", this.token)
        this.userInfo(this.token)
    },
    methods: {
        ...mapActions(['userInfo']),
    }
    
   
}
</script>
<style lang="sass" scoped>

</style>


