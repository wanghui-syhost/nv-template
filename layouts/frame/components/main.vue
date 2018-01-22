<template>
    <section class="main">
        <transition name="fade" mode="out-in">
              <router-view />
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'FrameMain',  
    }
</script>
<style scoped lang="scss">
    .main{
        padding-left:20px;
    }

    .fade-enter-active, .fade-leave-active {
        // margin-top: 0px;
        // transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        //margin-top: 500px;
        //opacity: 0;
    }
</style>

